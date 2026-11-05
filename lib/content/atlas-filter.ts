/**
 * Knowledge Atlas data shapes, counting, search and filters. Pure and
 * dependency-free (types only), so the client explorer can import it without
 * pulling the content library into the browser bundle. The tree itself is
 * built on the server by `buildAtlas()` in ./atlas.
 */
import type { Palette } from "./categories";
import { TOPIC_STATUSES, type TopicStatus } from "./topic-status";

export type AtlasTopic = {
  slug: string;
  title: string;
  type: string;
  status: TopicStatus;
  /** Where the topic row links: its entry, its planned-topic page, or (addressed) the entry that explains it. */
  href: string;
  aliases?: string[];
  /** For addressed-within topics: the canonical entry that covers them. */
  coveredBy?: { slug: string; title: string };
};
export type AtlasSubcategory = { id: string; title: string; topics: AtlasTopic[] };
export type AtlasDomain = { id: string; n: number; title: string; shortTitle: string; description: string; palette: Palette; subcategories: AtlasSubcategory[] };
export type Atlas = { domains: AtlasDomain[]; typeLabels: Record<string, string> };

export type StatusCounts = Record<TopicStatus, number>;
export const emptyCounts = (): StatusCounts => Object.fromEntries(TOPIC_STATUSES.map((s) => [s, 0])) as StatusCounts;

export function countTopics(topics: AtlasTopic[]): StatusCounts {
  const c = emptyCounts();
  for (const t of topics) c[t.status]++;
  return c;
}
export const domainTopics = (d: AtlasDomain) => d.subcategories.flatMap((s) => s.topics);

/* ------------------------------------------------------------------ */
/* Search and filters                                                   */
/* ------------------------------------------------------------------ */

export type AtlasFilters = { q: string; status: TopicStatus | ""; type: string; domain: string };
export const NO_FILTERS: AtlasFilters = { q: "", status: "", type: "", domain: "" };

/** Case- and accent-insensitive form used for matching. */
export const fold = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/** Read filters from URL parameters, dropping anything invalid. */
export function readAtlasParams(p: URLSearchParams, atlas: Atlas): AtlasFilters {
  const status = p.get("status") ?? "";
  const type = p.get("type") ?? "";
  const domain = p.get("domain") ?? "";
  return {
    q: (p.get("q") ?? "").slice(0, 120),
    status: (TOPIC_STATUSES as readonly string[]).includes(status) ? (status as TopicStatus) : "",
    type: type in atlas.typeLabels ? type : "",
    domain: atlas.domains.some((d) => d.id === domain) ? domain : "",
  };
}

export function atlasQuery(f: AtlasFilters): string {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.status) p.set("status", f.status);
  if (f.type) p.set("type", f.type);
  if (f.domain) p.set("domain", f.domain);
  const s = p.toString();
  return s ? `?${s}` : "";
}

export const isFiltering = (f: AtlasFilters) => Boolean(f.q.trim() || f.status || f.type || f.domain);

export type MatchedTopic = AtlasTopic & { aliasHit?: string };
export type FilteredSub = AtlasSubcategory & { topics: MatchedTopic[]; nameHit: boolean };
export type FilteredDomain = Omit<AtlasDomain, "subcategories"> & { subcategories: FilteredSub[]; nameHit: boolean };

/**
 * Which branches a query and filters reveal. A query matches a domain (title,
 * short title or description), a subcategory (title) or a topic (title or an
 * alias). A matching domain or subcategory shows all of its topics; otherwise
 * only matching topics are shown, each with its domain and subcategory as
 * context. Status, type and domain filters always apply to topics.
 */
export function filterAtlas(atlas: Atlas, f: AtlasFilters): FilteredDomain[] {
  const terms = fold(f.q).split(/\s+/).filter(Boolean);
  const hit = (s: string) => terms.length > 0 && terms.every((t) => fold(s).includes(t));
  const keep = (t: AtlasTopic) => (!f.status || t.status === f.status) && (!f.type || t.type === f.type);
  const out: FilteredDomain[] = [];
  for (const d of atlas.domains) {
    if (f.domain && d.id !== f.domain) continue;
    const dHit = hit(`${d.title} ${d.shortTitle} ${d.description}`);
    const subs: FilteredSub[] = [];
    for (const s of d.subcategories) {
      const sHit = hit(s.title);
      const topics: MatchedTopic[] = [];
      for (const t of s.topics) {
        if (!keep(t)) continue;
        const titleHit = hit(t.title);
        const alias = terms.length && !titleHit ? t.aliases?.find(hit) : undefined;
        if (!terms.length || dHit || sHit || titleHit || alias) topics.push(alias ? { ...t, aliasHit: alias } : t);
      }
      if (topics.length) subs.push({ ...s, topics, nameHit: sHit });
    }
    if (subs.length) out.push({ ...d, subcategories: subs, nameHit: dHit });
  }
  return out;
}

/** Split text around query terms so matches can be emphasised. */
export function highlightParts(text: string, q: string): { text: string; hit: boolean }[] {
  const terms = fold(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return [{ text, hit: false }];
  const f = fold(text);
  // fold() keeps length for Latin text after removing combining marks; fall back to no highlight if it does not.
  if (f.length !== text.length) return [{ text, hit: false }];
  const marks = new Array<boolean>(text.length).fill(false);
  for (const t of terms) {
    let i = f.indexOf(t);
    while (i >= 0) {
      for (let k = i; k < i + t.length; k++) marks[k] = true;
      i = f.indexOf(t, i + t.length);
    }
  }
  const parts: { text: string; hit: boolean }[] = [];
  for (let i = 0; i < text.length; i++) {
    const last = parts[parts.length - 1];
    if (last && last.hit === marks[i]) last.text += text[i];
    else parts.push({ text: text[i], hit: marks[i] });
  }
  return parts;
}
