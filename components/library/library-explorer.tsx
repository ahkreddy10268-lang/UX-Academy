"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { KnowledgeCard, type CardData } from "@/components/knowledge/knowledge-card";
import { snippet, useSearch } from "@/components/search/use-search";
import { DifficultyMark, EvidenceMark, TypeMark } from "@/components/ui/marks";
import { catClass } from "@/lib/content/categories";
import { Icon } from "@/components/shell/icons";
import { DIFFICULTY_LABEL, EVIDENCE_LABEL, EVIDENCE_ORDER, TYPE_LABEL } from "@/lib/content/labels";
import type { ContentStatus, Difficulty, EvidenceClass, KnowledgeType } from "@/lib/content/schema";

export type LibraryDoc = {
  slug: string;
  title: string;
  summary: string;
  type: KnowledgeType;
  secondary: KnowledgeType[];
  domain: string;
  subject: string;
  subcategory: string;
  difficulty?: Difficulty;
  evidence?: EvidenceClass;
  status: ContentStatus;
  alt: string[];
  expression?: string;
  hasCalculator?: boolean;
  hasLab?: boolean;
  hasVisual?: boolean;
  method?: CardData["method"];
  refs?: number;
  connections?: number;
};

type View = "grid" | "list" | "az";
type Scope = "published" | "all" | "planned";
type Sort = "" | "title" | "evidence" | "level" | "subject";
type Filters = { q: string; domain: string; sub: string; type: string; level: string; evidence: string; scope: Scope; feature: string; sort: Sort; view: View };

const DEFAULTS: Filters = { q: "", domain: "", sub: "", type: "", level: "", evidence: "", scope: "published", feature: "", sort: "", view: "grid" };
const SORT_LABEL: Record<Exclude<Sort, "">, string> = { title: "Title A–Z", evidence: "Evidence strength", level: "Starting level", subject: "Subject" };
const LEVEL_ORDER = ["beginner", "intermediate", "advanced"];
const PAGE = 24;
const FEATURED = "fitts-law";
const KEYS = Object.keys(DEFAULTS) as (keyof Filters)[];

function readParams(sp: URLSearchParams): Filters {
  const f = { ...DEFAULTS };
  for (const k of KEYS) {
    const v = sp.get(k);
    if (v !== null) (f as Record<string, string>)[k] = v;
  }
  if (!["grid", "list", "az"].includes(f.view)) f.view = "grid";
  if (!["published", "all", "planned"].includes(f.scope)) f.scope = "published";
  if (!["", "title", "evidence", "level", "subject"].includes(f.sort)) f.sort = "";
  if (!f.domain) f.sub = "";
  return f;
}

function toQuery(f: Filters) {
  const sp = new URLSearchParams();
  for (const k of KEYS) if (f[k] !== DEFAULTS[k]) sp.set(k, f[k]);
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export function LibraryExplorer({
  docs,
  domains,
  plates,
  typeCounts,
  subcategories,
}: {
  docs: LibraryDoc[];
  domains: { id: string; title: string; short: string }[];
  subcategories: { id: string; title: string; domain: string }[];
  plates: Record<string, ReactNode>;
  typeCounts: { type: string; label: string; description: string; count: number }[];
}) {
  const params = useSearchParams();
  const [f, setF] = useState<Filters>(() => readParams(new URLSearchParams(params.toString())));
  const [drawer, setDrawer] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const search = useSearch(f.q);
  const ids = useId();
  const [shown, setShown] = useState(PAGE);
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => {
    setShown(PAGE);
    setF((s) => ({ ...s, [k]: v, ...(k === "domain" ? { sub: "" } : {}) }));
  };

  // Mirror filters into the URL without a navigation (shareable, no RSC round-trip).
  // Next's App Router integrates window.history.replaceState with useSearchParams.
  useEffect(() => {
    const next = `${window.location.pathname}${toQuery(f)}`;
    if (next !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(null, "", next);
  }, [f]);

  useEffect(() => {
    const d = drawerRef.current;
    if (!d) return;
    if (drawer && !d.open) d.showModal();
    if (!drawer && d.open) d.close();
  }, [drawer]);

  const bySlug = useMemo(() => new Map(docs.map((d) => [d.slug, d])), [docs]);
  const base = useMemo(() => {
    if (!f.q.trim()) return docs.map((doc) => ({ doc, snip: undefined as string | undefined }));
    return search.hits
      .filter((h) => h.kind === "entry" || h.kind === "planned")
      .map((h) => ({ doc: bySlug.get(h.href.replace("/library/", ""))!, snip: snippet(h, h.terms, 180) }))
      .filter((x) => x.doc);
  }, [f.q, docs, search.hits, bySlug]);

  const results = base.filter(({ doc: d }) => {
    if (f.scope === "published" && d.status === "planned") return false;
    if (f.scope === "planned" && d.status !== "planned") return false;
    if (f.domain && d.domain !== f.domain) return false;
    if (f.sub && d.subcategory !== f.sub) return false;
    if (f.type && d.type !== f.type && !d.secondary.includes(f.type as KnowledgeType)) return false;
    if (f.level && d.difficulty !== f.level) return false;
    if (f.evidence && d.evidence !== f.evidence) return false;
    if (f.feature === "formula" && !d.hasCalculator) return false;
    if (f.feature === "lab" && !d.hasLab) return false;
    if (f.feature === "visual" && !d.hasVisual) return false;
    return true;
  });
  const sort = f.sort || (f.q.trim() ? "" : "title");
  if (sort) {
    const ev = (d: LibraryDoc) => (d.evidence ? EVIDENCE_ORDER.indexOf(d.evidence) : 99);
    const lv = (d: LibraryDoc) => (d.difficulty ? LEVEL_ORDER.indexOf(d.difficulty) : 9);
    const byTitle = (a: LibraryDoc, b: LibraryDoc) => a.title.localeCompare(b.title, "en", { sensitivity: "base" });
    const cmp: Record<string, (a: LibraryDoc, b: LibraryDoc) => number> = {
      title: byTitle,
      evidence: (a, b) => ev(a) - ev(b) || byTitle(a, b),
      level: (a, b) => lv(a) - lv(b) || byTitle(a, b),
      subject: (a, b) => a.subject.localeCompare(b.subject) || byTitle(a, b),
    };
    results.sort((a, b) => cmp[sort](a.doc, b.doc));
  }
  const published = results.filter((r) => r.doc.status !== "planned");
  // With nothing chosen, the flagship concept leads as the featured card.
  if (!f.q && KEYS.every((k) => k === "view" || f[k] === DEFAULTS[k])) {
    const i = published.findIndex((r) => r.doc.slug === FEATURED);
    if (i > 0) published.unshift(...published.splice(i, 1));
  }
  const planned = results.filter((r) => r.doc.status === "planned");
  const active = KEYS.filter((k) => !["q", "view", "sort"].includes(k) && f[k] !== DEFAULTS[k]).length;
  const subOptions = subcategories.filter((x) => x.domain === f.domain && docs.some((d) => d.subcategory === x.id && d.domain === f.domain));
  const domainCounts = new Map(domains.map((d) => [d.id, docs.filter((x) => x.domain === d.id && x.status !== "planned").length]));
  const noFilters = !f.q && active === 0;

  const control = "mt-1 h-10 w-full rounded-sm border border-line-control bg-surface px-2.5 text-sm";
  const selects: [keyof Filters, string, string[][], boolean?][] = [
    ["domain", "Subject", [["", "All subjects"], ...domains.map((d) => [d.id, d.title])]],
    ["sub", "Subcategory", [["", f.domain ? "All subcategories" : "Choose a subject first"], ...subOptions.map((x) => [x.id, x.title])], !f.domain],
    ["type", "Type", [["", "All types"], ...[...new Set(docs.map((d) => d.type))].sort().map((t) => [t, TYPE_LABEL[t]])]],
    ["level", "Level", [["", "Any level"], ...(["beginner", "intermediate", "advanced"] as const).map((l) => [l, DIFFICULTY_LABEL[l]])]],
    ["evidence", "Evidence", [["", "Any evidence"], ...Object.entries(EVIDENCE_LABEL)]],
    ["feature", "Includes", [["", "Anything"], ["formula", "A calculator"], ["lab", "An interactive lab"], ["visual", "A detailed diagram"]]],
    ["scope", "Status", [["published", "Researched"], ["all", "Researched + planned"], ["planned", "Planned only"]]],
  ];
  const filterFields = (prefix: string, layout: "bar" | "stack") => (
    <div className={layout === "bar" ? "grid grid-cols-4 gap-3 xl:grid-cols-7" : "space-y-4"}>
      {selects.map(([k, label, opts, disabled]) => (
        <div key={k} className="min-w-0">
          <label htmlFor={`${prefix}-${k}`} className="text-xs font-medium text-ink-2">
            {label}
          </label>
          <select id={`${prefix}-${k}`} disabled={disabled} className={`${control} disabled:opacity-60`} value={f[k]} onChange={(e) => set(k, e.target.value as never)}>
            {opts.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
  const clear = () => {
    setShown(PAGE);
    setF((s) => ({ ...DEFAULTS, q: s.q, view: s.view, sort: s.sort }));
  };

  const toCard = (d: LibraryDoc): CardData => ({ ...d, planned: d.status === "planned" });

  return (
    <div>
      {/* Search, subject overview, type discovery, filters */}
      <div className="panel p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <label htmlFor={`${ids}-q`} className="text-xs font-medium text-ink-2">
              Search the library
            </label>
            <div className="relative mt-1">
              <Icon name="search" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
              <input
                id={`${ids}-q`}
                type="search"
                value={f.q}
                onChange={(e) => set("q", e.target.value)}
                placeholder="Titles, definitions, full text…"
                className="h-11 w-full rounded-sm border border-line-control bg-surface pl-10 pr-3 text-base"
              />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <div className="min-w-0">
              <label htmlFor={`${ids}-sort`} className="text-xs font-medium text-ink-2">
                Sort
              </label>
              <select id={`${ids}-sort`} className={`${control} h-11`} value={f.sort} onChange={(e) => set("sort", e.target.value as Sort)}>
                <option value="">{f.q.trim() ? "Best match" : "Title A–Z"}</option>
                {Object.entries(SORT_LABEL)
                  .filter(([k]) => f.q.trim() || k !== "title")
                  .map(([k, l]) => (
                    <option key={k} value={k}>
                      {l}
                    </option>
                  ))}
              </select>
            </div>
            <button type="button" onClick={() => setDrawer(true)} className="inline-flex h-11 items-center gap-2 rounded-sm border border-line-control bg-surface px-3 text-sm font-medium lg:hidden">
              <Icon name="filter" size={18} />
              Filters{active ? ` (${active})` : ""}
            </button>
          </div>
        </div>

        <nav aria-label="Browse by subject" className="mt-4 min-w-0">
          <p className="text-xs font-medium text-ink-2">Subjects</p>
          <ul className="mt-1.5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {domains
              .filter((d) => (domainCounts.get(d.id) ?? 0) > 0)
              .map((d) => {
                const on = f.domain === d.id;
                return (
                  <li key={d.id} className={`${catClass(d.id)} shrink-0`}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => set("domain", on ? "" : d.id)}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-sm transition-colors ${on ? "border-c bg-c-wash font-semibold text-c-ink" : "border-rule bg-surface text-ink-2 hover:border-rule-strong hover:text-ink"}`}
                    >
                      <span aria-hidden className="h-2 w-2 rounded-full bg-c" />
                      {d.short}
                      <span className="tabular text-xs text-ink-3">{domainCounts.get(d.id)}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </nav>

        <nav aria-label="Browse by knowledge type" className="mt-3 min-w-0">
          <p className="text-xs font-medium text-ink-2">What it is</p>
          <ul className="mt-1.5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {typeCounts.map((t) => {
              const on = f.type === t.type;
              return (
                <li key={t.type} className="shrink-0">
                  <button type="button" aria-pressed={on} title={t.description} onClick={() => set("type", on ? "" : t.type)} className="chip h-9 hover:border-rule-strong hover:text-ink">
                    {t.label}
                    <span className="tabular text-xs text-ink-3">{t.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div role="group" aria-label="Filters" className="mt-4 hidden border-t border-rule pt-4 lg:block">
          {filterFields("bar", "bar")}
        </div>
      </div>

      <div className="mt-6">
        <section aria-label="Results" className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
            <p className="text-sm text-ink-2" aria-live="polite">
              {f.q.trim() && search.status === "loading" ? "Searching…" : `${results.length} ${results.length === 1 ? "result" : "results"}`}
              {f.q.trim() && ` for “${f.q.trim()}”`}
              {planned.length > 0 && published.length > 0 && ` · ${planned.length} planned`}
            </p>
            <div className="flex items-center gap-3">
              {active > 0 && (
                <button type="button" className="text-sm font-medium text-accent-ink hover:underline" onClick={clear}>
                  Clear {active} {active === 1 ? "filter" : "filters"}
                </button>
              )}
              <div role="group" aria-label="View" className="flex rounded-sm border border-rule bg-soft p-0.5 text-sm">
                {(["grid", "list", "az"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={f.view === v}
                    onClick={() => set("view", v)}
                    className={`inline-flex h-8 items-center gap-1.5 rounded-xs px-2.5 ${f.view === v ? "bg-surface font-semibold text-accent-ink shadow-card" : "text-ink-2 hover:text-ink"}`}
                  >
                    <Icon name={v} size={16} />
                    {v === "grid" ? "Grid" : v === "list" ? "List" : "A–Z"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {search.status === "error" && <p className="mt-4 text-sm text-accent-ink">Full-text search is unavailable right now.</p>}

          {results.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed border-rule-strong bg-soft px-6 py-12 text-center">
              <p className="t-sub">Nothing matches these filters.</p>
              <p className="mt-1 text-sm text-ink-2">
                {f.scope === "published" ? "Try including planned topics, or clear a filter." : "Clear a filter or broaden your search."}
              </p>
              {active > 0 && (
                <button type="button" className="mt-4 h-9 rounded-sm border border-line-control bg-surface px-3 text-sm" onClick={clear}>
                  Clear filters
                </button>
              )}
            </div>
          ) : f.view === "az" ? (
            <AzIndex docs={results.map((r) => r.doc)} />
          ) : f.view === "list" ? (
            <ul className="panel mt-3 divide-y divide-rule overflow-hidden">
              {results.slice(0, f.scope === "published" ? undefined : shown * 4).map(({ doc: d, snip }) => (
                <li key={d.slug} className={`${catClass(d.domain)} grid gap-4 px-4 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:px-5`}>
                  <div className="hidden overflow-hidden rounded-sm border border-rule sm:block">{plates[d.slug] ?? <div className="aspect-[4/3] bg-c-wash" />}</div>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <TypeMark type={d.type} secondary={d.secondary} />
                      <span className="rounded-full bg-c-wash px-2 py-0.5 text-xs font-semibold text-c-ink">{d.subject}</span>
                    </div>
                    <h2 className="mt-1">
                      <Link href={`/library/${d.slug}`} className={`t-sub text-lg hover:text-accent-ink ${d.status === "planned" ? "text-ink-2" : ""}`}>
                        {d.title}
                      </Link>
                    </h2>
                    {d.status === "planned" ? (
                      <p className="mt-1 text-sm text-ink-3">Planned topic — not yet researched.</p>
                    ) : (
                      <>
                        <p className="mt-1 max-w-read text-ink-2">{snip ?? d.summary}</p>
                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                          {d.evidence && <EvidenceMark evidence={d.evidence} />}
                          {d.difficulty && <DifficultyMark level={d.difficulty} />}
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="@container pt-3">
              {published.length > 0 && (
                <>
                  <ul className="grid grid-flow-dense grid-cols-[minmax(0,1fr)] gap-4 @min-[36rem]:grid-cols-2 @min-[52rem]:grid-cols-3 @min-[66rem]:grid-cols-4">
                    {published.slice(0, shown).map(({ doc: d, snip }, i) => {
                      const featured = noFilters && !f.sort && i === 0;
                      return (
                        <li key={d.slug} className={featured ? "col-span-full" : ""}>
                          <KnowledgeCard d={{ ...toCard(d), summary: snip ?? d.summary }} variant={featured ? "featured" : undefined} plate={plates[d.slug]} headingLevel={2} />
                        </li>
                      );
                    })}
                  </ul>
                  {published.length > shown && (
                    <div className="mt-6 flex flex-col items-center gap-2">
                      <button type="button" onClick={() => setShown((n) => n + PAGE)} className="inline-flex h-10 items-center rounded-sm border border-line-control bg-surface px-4 text-sm font-medium hover:border-ink-3">
                        Show {Math.min(PAGE, published.length - shown)} more
                      </button>
                      <p className="tabular text-xs text-ink-3">
                        Showing {shown} of {published.length}
                      </p>
                    </div>
                  )}
                </>
              )}
              {planned.length > 0 && (
                <section aria-labelledby={`${ids}-planned`} className="mt-12">
                  <h2 id={`${ids}-planned`} className="t-sub text-base">
                    Planned topics <span className="text-ink-3">· {planned.length} · not yet researched</span>
                  </h2>
                  <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 @min-[36rem]:grid-cols-2 @min-[52rem]:grid-cols-3 @min-[66rem]:grid-cols-4">
                    {planned.slice(0, 120).map(({ doc: d }) => (
                      <li key={d.slug} className="relative">
                        <KnowledgeCard d={toCard(d)} variant="planned" />
                      </li>
                    ))}
                  </ul>
                  {planned.length > 120 && <p className="mt-3 text-sm text-ink-3">Showing 120 of {planned.length}. Narrow by subject or use the A–Z view to see all.</p>}
                </section>
              )}
            </div>
          )}
        </section>
      </div>

      <dialog
        ref={drawerRef}
        onClose={() => setDrawer(false)}
        aria-label="Filters"
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,100vw)] max-w-none border-l border-rule bg-surface p-0 text-ink shadow-dialog"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-rule px-5 py-4">
            <p className="t-sub">Filters</p>
            <button type="button" onClick={() => setDrawer(false)} className="h-9 rounded-sm px-3 text-sm font-medium hover:bg-sunken">
              Done
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {filterFields("drawer", "stack")}
            {active > 0 && (
              <button type="button" className="mt-5 text-sm font-medium text-accent-ink underline" onClick={clear}>
                Clear {active} {active === 1 ? "filter" : "filters"}
              </button>
            )}
          </div>
          <div className="border-t border-rule px-5 py-3">
            <button type="button" onClick={() => setDrawer(false)} className="h-11 w-full rounded-sm bg-accent text-sm font-medium text-surface hover:bg-accent-ink">
              Show {results.length} {results.length === 1 ? "result" : "results"}
            </button>
          </div>
        </div>
      </dialog>
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
          <a key={k} href={`#az-${k}`} className="formula inline-flex h-9 w-9 items-center justify-center rounded-xs text-sm text-ink-2 hover:bg-sunken hover:text-ink">
            {k}
          </a>
        ))}
      </nav>
      <div className="mt-6 columns-1 gap-10 sm:columns-2 xl:columns-3">
        {[...groups.entries()].map(([k, ds]) => (
          <section key={k} className="mb-6 break-inside-avoid">
            <h2 id={`az-${k}`} className="t-editorial scroll-mt-24 border-b border-rule pb-1 text-2xl text-rubric">
              {k}
            </h2>
            <ul className="mt-2 space-y-1">
              {ds.map((d) => (
                <li key={d.slug} className={`${catClass(d.domain)} flex items-baseline justify-between gap-3`}>
                  <span className="flex min-w-0 items-baseline gap-2">
                    {d.status !== "planned" && <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-c" />}
                    <Link href={`/library/${d.slug}`} className={d.status === "planned" ? "truncate text-ink-2 hover:text-ink" : "link truncate"}>
                      {d.title}
                    </Link>
                  </span>
                  <span className="shrink-0 text-xs text-ink-3">{d.status === "planned" ? "planned" : TYPE_LABEL[d.type]}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
