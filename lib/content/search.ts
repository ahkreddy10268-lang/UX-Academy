/** Builds the client search index documents (served statically at /search-index.json). */
import {
  comparisons,
  domainById,
  entries,
  glossary,
  labs,
  learningPaths,
  libraryFormulas,
  subcategoryTitle,
  taxonomyItems,
  titleFor,
  workshops,
} from "./index";
import { collectStrings, richToPlain } from "./rich";

export type SearchDoc = {
  id: string;
  kind: "entry" | "planned" | "glossary" | "formula" | "lab" | "comparison" | "workshop" | "path";
  title: string;
  href: string;
  type?: string; // knowledge type for entries/planned
  context: string; // breadcrumb-ish location shown in results
  alternateNames?: string;
  summary: string;
  tags?: string;
  body?: string;
};

const plain = (s: string) => richToPlain(s, titleFor);

export function buildSearchDocs(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const e of entries) {
    const d = domainById.get(e.domain);
    docs.push({
      id: `entry:${e.slug}`,
      kind: "entry",
      title: e.title,
      href: `/library/${e.slug}`,
      type: e.primaryType,
      context: [d?.shortTitle, subcategoryTitle(e.domain, e.subcategory)].filter(Boolean).join(" › "),
      alternateNames: e.alternateNames.join(" · "),
      summary: e.summary,
      tags: e.tags.join(" "),
      body: [
        plain(e.definition),
        ...collectStrings(e.levels).map(plain),
        ...collectStrings(e.application).map(plain),
        ...(e.origin ? collectStrings(e.origin).map(plain) : []),
        ...e.formulas.flatMap((f) => [f.name, f.expression, ...f.variables.map((v) => v.name), ...f.interpretation.map(plain)]),
        ...(e.method ? e.method.procedure : []),
        plain(e.evidenceNote),
        ...e.whenToUse,
        ...e.limitations,
        ...e.misconceptions.flatMap((m) => [m.myth, plain(m.reality)]),
      ]
        .join(" ")
        .slice(0, 16000),
    });
  }
  for (const t of taxonomyItems.filter((t) => !t.entry)) {
    const d = domainById.get(t.domain);
    docs.push({
      id: `planned:${t.slug}`,
      kind: "planned",
      title: t.title,
      href: `/library/${t.slug}`,
      type: t.type,
      context: [d?.shortTitle, subcategoryTitle(t.domain, t.subcategory)].filter(Boolean).join(" › "),
      summary: t.aliases?.length ? `Planned topic — research pending. Also known as ${t.aliases.join(", ")}.` : "Planned topic — research pending.",
    });
  }
  for (const g of glossary)
    docs.push({ id: `glossary:${g.slug}`, kind: "glossary", title: g.term, href: `/glossary#${g.slug}`, context: "Glossary", summary: g.definition });
  for (const f of libraryFormulas)
    docs.push({ id: `formula:${f.id}`, kind: "formula", title: f.name, href: `/formulas/${f.id}`, context: "Formula Lab", summary: f.expression, body: f.summary });
  for (const l of labs)
    docs.push({ id: `lab:${l.id}`, kind: "lab", title: l.title, href: `/labs/${l.id}`, context: "Labs", summary: l.summary });
  for (const c of comparisons)
    docs.push({ id: `comparison:${c.id}`, kind: "comparison", title: c.title, href: `/compare/${c.id}`, context: "Comparisons", summary: plain(c.summary) });
  for (const w of workshops)
    docs.push({ id: `workshop:${w.id}`, kind: "workshop", title: w.title, href: `/practice/workshops/${w.id}`, context: "Workshop", summary: plain(w.brief[0]) });
  for (const p of learningPaths)
    docs.push({ id: `path:${p.id}`, kind: "path", title: p.title, href: `/learn/${p.id}`, context: "Learning path", summary: p.summary });
  return docs;
}
