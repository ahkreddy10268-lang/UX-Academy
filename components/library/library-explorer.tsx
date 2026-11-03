"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { KnowledgeCard, type CardData } from "@/components/knowledge/knowledge-card";
import { snippet, useSearch } from "@/components/search/use-search";
import { DifficultyMark, EvidenceMark, TypeMark } from "@/components/ui/marks";
import { catClass } from "@/lib/content/categories";
import { DIFFICULTY_LABEL, EVIDENCE_LABEL, TYPE_LABEL } from "@/lib/content/labels";
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
  method?: string;
};

type View = "grid" | "list" | "az";
type Scope = "published" | "all" | "planned";
type Filters = { q: string; domain: string; type: string; level: string; evidence: string; scope: Scope; feature: string; view: View };

const DEFAULTS: Filters = { q: "", domain: "", type: "", level: "", evidence: "", scope: "published", feature: "", view: "grid" };
const KEYS = Object.keys(DEFAULTS) as (keyof Filters)[];

function readParams(sp: URLSearchParams): Filters {
  const f = { ...DEFAULTS };
  for (const k of KEYS) {
    const v = sp.get(k);
    if (v !== null) (f as Record<string, string>)[k] = v;
  }
  if (!["grid", "list", "az"].includes(f.view)) f.view = "grid";
  if (!["published", "all", "planned"].includes(f.scope)) f.scope = "published";
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
}: {
  docs: LibraryDoc[];
  domains: { id: string; title: string }[];
  plates: Record<string, ReactNode>;
  typeCounts: { type: string; label: string; description: string; count: number }[];
}) {
  const params = useSearchParams();
  const [f, setF] = useState<Filters>(() => readParams(new URLSearchParams(params.toString())));
  const [drawer, setDrawer] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const search = useSearch(f.q);
  const ids = useId();
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setF((s) => ({ ...s, [k]: v }));

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
    if (f.type && d.type !== f.type && !d.secondary.includes(f.type as KnowledgeType)) return false;
    if (f.level && d.difficulty !== f.level) return false;
    if (f.evidence && d.evidence !== f.evidence) return false;
    if (f.feature === "formula" && !d.hasCalculator) return false;
    if (f.feature === "lab" && !d.hasLab) return false;
    return true;
  });
  const published = results.filter((r) => r.doc.status !== "planned");
  const planned = results.filter((r) => r.doc.status === "planned");
  const active = KEYS.filter((k) => !["q", "view"].includes(k) && f[k] !== DEFAULTS[k]).length;
  const noFilters = !f.q && active === 0;

  const control = "mt-1 h-10 w-full rounded-sm border border-line-control bg-surface px-2 text-sm";
  const filterFields = (prefix: string) => (
    <div className="space-y-5">
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
              <input type="radio" name={`${prefix}-scope`} checked={f.scope === v} onChange={() => set("scope", v)} /> {l}
            </label>
          ))}
        </div>
      </fieldset>
      {(
        [
          ["domain", "Subject", [["", "All subjects"], ...domains.map((d) => [d.id, d.title])]],
          ["type", "Knowledge type", [["", "All types"], ...[...new Set(docs.map((d) => d.type))].sort().map((t) => [t, TYPE_LABEL[t]])]],
          ["level", "Starting level", [["", "Any level"], ...(["beginner", "intermediate", "advanced"] as const).map((l) => [l, DIFFICULTY_LABEL[l]])]],
          ["evidence", "Evidence", [["", "Any evidence"], ...Object.entries(EVIDENCE_LABEL)]],
          ["feature", "Includes", [["", "Anything"], ["formula", "A calculator"], ["lab", "An interactive lab"]]],
        ] as [keyof Filters, string, string[][]][]
      ).map(([k, label, opts]) => (
        <div key={k}>
          <label htmlFor={`${prefix}-${k}`} className="text-sm font-medium">
            {label}
          </label>
          <select id={`${prefix}-${k}`} className={control} value={f[k]} onChange={(e) => set(k, e.target.value as never)}>
            {opts.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      ))}
      {active > 0 && (
        <button type="button" className="text-sm text-accent-ink underline" onClick={() => setF((s) => ({ ...DEFAULTS, q: s.q, view: s.view }))}>
          Clear {active} {active === 1 ? "filter" : "filters"}
        </button>
      )}
    </div>
  );

  const toCard = (d: LibraryDoc): CardData => ({ ...d, planned: d.status === "planned" });

  return (
    <div>
      {/* Search + type discovery */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
        <div>
          <label htmlFor={`${ids}-q`} className="text-sm font-medium">
            Search the library
          </label>
          <input
            id={`${ids}-q`}
            type="search"
            value={f.q}
            onChange={(e) => set("q", e.target.value)}
            placeholder="Titles, definitions, full text…"
            className="mt-1 h-11 w-full rounded-sm border border-line-control bg-surface px-3 text-base"
          />
        </div>
        <nav aria-label="Browse by knowledge type" className="min-w-0">
          <p className="text-sm font-medium">Browse by what it is</p>
          <ul className="mt-1 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {typeCounts.map((t) => {
              const on = f.type === t.type;
              return (
                <li key={t.type} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={on}
                    title={t.description}
                    onClick={() => set("type", on ? "" : t.type)}
                    className={`inline-flex h-11 items-center gap-2 rounded-sm border px-3 text-sm transition-colors ${on ? "border-ink bg-ink text-paper" : "border-rule bg-surface text-ink-2 hover:border-ink-3 hover:text-ink"}`}
                  >
                    {t.label}
                    <span className={`formula text-xs ${on ? "text-paper/80" : "text-ink-3"}`}>{t.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-24">{filterFields("side")}</div>
        </aside>

        <section aria-label="Results" className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3">
            <p className="text-sm text-ink-2" aria-live="polite">
              {f.q.trim() && search.status === "loading" ? "Searching…" : `${results.length} ${results.length === 1 ? "result" : "results"}`}
              {f.q.trim() && ` for “${f.q.trim()}”`}
              {planned.length > 0 && published.length > 0 && ` · ${planned.length} planned`}
            </p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setDrawer(true)} className="inline-flex h-9 items-center rounded-sm border border-rule px-3 text-sm font-medium lg:hidden">
                Filters{active ? ` (${active})` : ""}
              </button>
              <div role="group" aria-label="View" className="flex rounded-sm border border-rule p-0.5 text-sm">
                {(["grid", "list", "az"] as const).map((v) => (
                  <button key={v} type="button" aria-pressed={f.view === v} onClick={() => set("view", v)} className={`h-8 rounded-xs px-2.5 ${f.view === v ? "bg-ink text-paper" : "text-ink-2 hover:bg-sunken"}`}>
                    {v === "grid" ? "Grid" : v === "list" ? "List" : "A–Z"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {search.status === "error" && <p className="mt-4 text-sm text-accent-ink">Full-text search is unavailable right now.</p>}

          {results.length === 0 ? (
            <div className="mt-10 rounded-sm border border-dashed border-rule-strong px-6 py-12 text-center">
              <p className="t-sub">Nothing matches these filters.</p>
              <p className="mt-1 text-sm text-ink-2">
                {f.scope === "published" ? "Try including planned topics, or clear a filter." : "Clear a filter or broaden your search."}
              </p>
              {active > 0 && (
                <button type="button" className="mt-4 h-9 rounded-sm border border-rule px-3 text-sm" onClick={() => setF((s) => ({ ...DEFAULTS, q: s.q, view: s.view }))}>
                  Clear filters
                </button>
              )}
            </div>
          ) : f.view === "az" ? (
            <AzIndex docs={results.map((r) => r.doc)} />
          ) : f.view === "list" ? (
            <ul className="divide-y divide-rule">
              {results.map(({ doc: d, snip }) => (
                <li key={d.slug} className={`${catClass(d.domain)} grid gap-4 py-5 sm:grid-cols-[7rem_minmax(0,1fr)]`}>
                  <div className="hidden overflow-hidden rounded-xs border border-rule sm:block">{plates[d.slug] ?? <div className="aspect-[4/3] bg-c-wash" />}</div>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <TypeMark type={d.type} secondary={d.secondary} />
                      <span className="text-xs text-c-ink">{d.subject}</span>
                    </div>
                    <h2 className="mt-1">
                      <Link href={`/library/${d.slug}`} className={`t-section text-xl hover:text-accent-ink ${d.status === "planned" ? "text-ink-2" : ""}`}>
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
            <div className="pt-6">
              {published.length > 0 && (
                <ul className="grid grid-flow-dense grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {published.map(({ doc: d, snip }, i) => {
                    const featured = noFilters && i === 0;
                    const variant = featured ? "featured" : d.hasCalculator ? "formula" : "standard";
                    return (
                      <li key={d.slug} className={featured ? "sm:col-span-2" : ""}>
                        <KnowledgeCard d={{ ...toCard(d), summary: snip ?? d.summary }} variant={variant} plate={plates[d.slug]} headingLevel={2} />
                      </li>
                    );
                  })}
                </ul>
              )}
              {planned.length > 0 && (
                <section aria-labelledby={`${ids}-planned`} className="mt-12">
                  <h2 id={`${ids}-planned`} className="t-sub text-base">
                    Planned topics <span className="text-ink-3">· {planned.length} · not yet researched</span>
                  </h2>
                  <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,100vw)] max-w-none bg-paper p-0 text-ink backdrop:bg-ink/30"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-rule px-5 py-4">
            <p className="t-sub">Filters</p>
            <button type="button" onClick={() => setDrawer(false)} className="h-9 rounded-sm px-3 text-sm font-medium hover:bg-sunken">
              Done
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">{filterFields("drawer")}</div>
          <div className="border-t border-rule px-5 py-3">
            <button type="button" onClick={() => setDrawer(false)} className="h-11 w-full rounded-sm bg-ink text-sm font-medium text-paper">
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
            <h2 id={`az-${k}`} className="t-section scroll-mt-24 border-b border-rule pb-1 text-2xl text-accent">
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
