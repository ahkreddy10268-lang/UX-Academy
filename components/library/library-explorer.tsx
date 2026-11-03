"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";
import { snippet, useSearch } from "@/components/search/use-search";
import { DifficultyMark, EvidenceMark, StatusMark, TypeMark } from "@/components/ui/marks";
import { EVIDENCE_LABEL, TYPE_LABEL } from "@/lib/content/labels";
import type { ContentStatus, Difficulty, EvidenceClass, KnowledgeType } from "@/lib/content/schema";

export type LibraryDoc = {
  slug: string;
  title: string;
  summary: string;
  type: KnowledgeType;
  secondary: KnowledgeType[];
  domain: string;
  subcategory: string;
  difficulty?: Difficulty;
  evidence?: EvidenceClass;
  status: ContentStatus;
  alt: string[];
  hasFormula?: boolean;
  hasLab?: boolean;
};

type DomainOpt = { id: string; title: string; subcategories: { id: string; title: string }[] };

export function LibraryExplorer({ docs, domains }: { docs: LibraryDoc[]; domains: DomainOpt[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [domain, setDomain] = useState(params.get("domain") ?? "");
  const [type, setType] = useState(params.get("type") ?? "");
  const [difficulty, setDifficulty] = useState("");
  const [evidence, setEvidence] = useState("");
  const [scope, setScope] = useState<"published" | "all" | "planned">((params.get("scope") as "all") ?? "published");
  const [feature, setFeature] = useState("");
  const [view, setView] = useState<"list" | "az">("list");
  const search = useSearch(query);
  const ids = useId();

  // Keep the URL shareable without adding history entries.
  useEffect(() => {
    const sp = new URLSearchParams();
    if (query) sp.set("q", query);
    if (domain) sp.set("domain", domain);
    if (type) sp.set("type", type);
    if (scope !== "published") sp.set("scope", scope);
    const qs = sp.toString();
    router.replace(qs ? `/library?${qs}` : "/library", { scroll: false });
  }, [query, domain, type, scope, router]);

  const bySlug = useMemo(() => new Map(docs.map((d) => [d.slug, d])), [docs]);
  const domainTitle = useMemo(() => new Map(domains.map((d) => [d.id, d.title])), [domains]);
  const subTitle = useMemo(() => new Map(domains.flatMap((d) => d.subcategories.map((s) => [`${d.id}/${s.id}`, s.title]))), [domains]);

  const base: { doc: LibraryDoc; snip?: string }[] = useMemo(() => {
    if (!query.trim()) return docs.map((doc) => ({ doc }));
    return search.hits
      .filter((h) => h.kind === "entry" || h.kind === "planned")
      .map((h) => ({ doc: bySlug.get(h.href.replace("/library/", ""))!, snip: snippet(h, h.terms, 200) }))
      .filter((x) => x.doc);
  }, [query, docs, search.hits, bySlug]);

  const results = base.filter(({ doc: d }) => {
    if (scope === "published" && d.status === "planned") return false;
    if (scope === "planned" && d.status !== "planned") return false;
    if (domain && d.domain !== domain) return false;
    if (type && d.type !== type && !d.secondary.includes(type as KnowledgeType)) return false;
    if (difficulty && d.difficulty !== difficulty) return false;
    if (evidence && d.evidence !== evidence) return false;
    if (feature === "formula" && !d.hasFormula) return false;
    if (feature === "lab" && !d.hasLab) return false;
    return true;
  });

  const typesPresent = [...new Set(docs.map((d) => d.type))].sort();
  const anyFilter = domain || type || difficulty || evidence || feature || scope !== "published";

  const select = "mt-1 h-10 w-full rounded-sm border border-line-control bg-surface px-2 text-sm";

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside aria-label="Filters" className="space-y-5">
        <div>
          <label htmlFor={`${ids}-q`} className="text-sm font-medium">
            Search
          </label>
          <input
            id={`${ids}-q`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Titles, definitions, full text…"
            className="mt-1 h-10 w-full rounded-sm border border-line-control bg-surface px-3 text-base"
          />
        </div>
        <fieldset>
          <legend className="text-sm font-medium">Show</legend>
          <div className="mt-2 space-y-1.5 text-sm">
            {(
              [
                ["published", "Researched entries"],
                ["all", "Entries and planned topics"],
                ["planned", "Planned topics only"],
              ] as const
            ).map(([v, l]) => (
              <label key={v} className="flex items-center gap-2">
                <input type="radio" name="scope" checked={scope === v} onChange={() => setScope(v)} /> {l}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor={`${ids}-d`} className="text-sm font-medium">
            Subject
          </label>
          <select id={`${ids}-d`} className={select} value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="">All subjects</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${ids}-t`} className="text-sm font-medium">
            Knowledge type
          </label>
          <select id={`${ids}-t`} className={select} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All types</option>
            {typesPresent.map((t) => (
              <option key={t} value={t}>
                {TYPE_LABEL[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${ids}-l`} className="text-sm font-medium">
            Starting level
          </label>
          <select id={`${ids}-l`} className={select} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Any level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${ids}-e`} className="text-sm font-medium">
            Evidence
          </label>
          <select id={`${ids}-e`} className={select} value={evidence} onChange={(e) => setEvidence(e.target.value)}>
            <option value="">Any evidence</option>
            {Object.entries(EVIDENCE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${ids}-f`} className="text-sm font-medium">
            Includes
          </label>
          <select id={`${ids}-f`} className={select} value={feature} onChange={(e) => setFeature(e.target.value)}>
            <option value="">Anything</option>
            <option value="formula">A formula & calculator</option>
            <option value="lab">An interactive lab</option>
          </select>
        </div>
        {anyFilter && (
          <button
            type="button"
            className="text-sm text-accent-ink underline"
            onClick={() => {
              setDomain("");
              setType("");
              setDifficulty("");
              setEvidence("");
              setFeature("");
              setScope("published");
            }}
          >
            Clear filters
          </button>
        )}
      </aside>

      <section aria-label="Results" className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3">
          <p className="text-sm text-ink-2" aria-live="polite">
            {query.trim() && search.status === "loading" ? "Searching…" : `${results.length} ${results.length === 1 ? "result" : "results"}`}
            {query.trim() && ` for “${query.trim()}”`}
          </p>
          <div role="group" aria-label="View" className="flex gap-1 text-sm">
            {(["list", "az"] as const).map((v) => (
              <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={`h-8 rounded-xs px-2.5 ${view === v ? "bg-ink text-paper" : "text-ink-2 hover:bg-sunken"}`}>
                {v === "list" ? "List" : "A–Z index"}
              </button>
            ))}
          </div>
        </div>

        {search.status === "error" && <p className="mt-4 text-sm text-accent-ink">Full-text search is unavailable: {search.error}</p>}

        {results.length === 0 ? (
          <div className="mt-10 rounded-sm border border-dashed border-rule-strong px-6 py-10 text-center">
            <p className="font-medium">Nothing matches these filters.</p>
            <p className="mt-1 text-sm text-ink-2">Try including planned topics, or clear a filter.</p>
          </div>
        ) : view === "az" ? (
          <AzIndex docs={results.map((r) => r.doc)} />
        ) : (
          <ul className="divide-y divide-rule">
            {results.map(({ doc: d, snip }) => (
              <li key={d.slug} className="py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <TypeMark type={d.type} secondary={d.secondary} />
                  <span className="text-xs text-ink-3">
                    {domainTitle.get(d.domain)} › {subTitle.get(`${d.domain}/${d.subcategory}`)}
                  </span>
                </div>
                <h2 className="mt-1.5">
                  <Link href={`/library/${d.slug}`} className={`display text-xl hover:text-accent-ink ${d.status === "planned" ? "text-ink-2" : ""}`}>
                    {d.title}
                  </Link>
                </h2>
                {d.status === "planned" ? (
                  <p className="mt-1 text-sm text-ink-3">Planned topic — research pending.</p>
                ) : (
                  <>
                    <p className="mt-1 max-w-read text-ink-2">{snip ?? d.summary}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      {d.evidence && <EvidenceMark evidence={d.evidence} />}
                      {d.difficulty && <DifficultyMark level={d.difficulty} />}
                      {d.status !== "published" && <StatusMark status={d.status} />}
                      {d.hasFormula && <span className="text-sm text-ink-3">Calculator</span>}
                      {d.hasLab && <span className="text-sm text-ink-3">Interactive lab</span>}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function AzIndex({ docs }: { docs: LibraryDoc[] }) {
  const groups = new Map<string, LibraryDoc[]>();
  for (const d of [...docs].sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }))) {
    const ch = d.title[0].toUpperCase();
    const key = /[A-Z]/.test(ch) ? ch : "#";
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(d);
  }
  return (
    <div className="pt-4">
      <nav aria-label="Letters" className="flex flex-wrap gap-1">
        {[...groups.keys()].map((k) => (
          <a key={k} href={`#az-${k}`} className="formula inline-flex h-8 w-8 items-center justify-center rounded-xs text-sm text-ink-2 hover:bg-sunken hover:text-ink">
            {k}
          </a>
        ))}
      </nav>
      <div className="mt-6 columns-1 gap-10 sm:columns-2">
        {[...groups.entries()].map(([k, ds]) => (
          <section key={k} className="mb-6 break-inside-avoid">
            <h2 id={`az-${k}`} className="display scroll-mt-24 border-b border-rule pb-1 text-xl text-accent">
              {k}
            </h2>
            <ul className="mt-2 space-y-1">
              {ds.map((d) => (
                <li key={d.slug} className="flex items-baseline justify-between gap-3">
                  <Link href={`/library/${d.slug}`} className={d.status === "planned" ? "text-ink-2 hover:text-ink" : "link"}>
                    {d.title}
                  </Link>
                  <span className="text-xs text-ink-3">{d.status === "planned" ? "planned" : TYPE_LABEL[d.type]}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
