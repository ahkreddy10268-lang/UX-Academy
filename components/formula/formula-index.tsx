"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";

export type FormulaRow = { id: string; name: string; expression: string; summary: string; host: string; hasEntry: boolean; group: string; cat: string };

/** Searchable Formula Lab index with category navigation. Plates are server-rendered slots. */
export function FormulaIndex({ rows, groups, plates }: { rows: FormulaRow[]; groups: { title: string; description: string }[]; plates: Record<string, ReactNode> }) {
  const [q, setQ] = useState("");
  const id = useId();
  const term = q.trim().toLowerCase();
  const match = (r: FormulaRow) => !term || [r.name, r.expression, r.summary, r.host].some((s) => s.toLowerCase().includes(term));
  const shown = rows.filter(match);

  return (
    <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
      <aside className="mb-8 lg:mb-0">
        <div className="rounded-lg border border-rule bg-soft p-4 lg:sticky lg:top-24">
          <label htmlFor={`${id}-q`} className="text-sm font-medium">
            Find a formula
          </label>
          <input id={`${id}-q`} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. SUS, contrast, power" className="field mt-1 w-full" />
          <nav aria-label="Formula categories" className="mt-6">
            <p className="label">Categories</p>
            <ul className="mt-2 space-y-1 text-sm">
              {groups.map((g) => (
                <li key={g.title}>
                  <a href={`#g-${g.title.replace(/\W+/g, "-")}`} className="flex justify-between rounded-xs border-l-2 border-transparent py-1.5 pl-3 pr-2 text-ink-2 hover:border-accent hover:bg-soft hover:text-ink">
                    {g.title}
                    <span className="formula text-xs text-ink-3">{rows.filter((r) => r.group === g.title && match(r)).length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      <div className="min-w-0 space-y-14">
        <p className="sr-only" aria-live="polite">
          {shown.length} formulas
        </p>
        {groups.map((g) => {
          const items = shown.filter((r) => r.group === g.title);
          if (!items.length) return null;
          return (
            <section key={g.title} id={`g-${g.title.replace(/\W+/g, "-")}`} aria-labelledby={`h-${g.title.replace(/\W+/g, "-")}`} className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-3">
                <h2 id={`h-${g.title.replace(/\W+/g, "-")}`} className="t-section text-xl">
                  {g.title}
                </h2>
                <p className="text-sm text-ink-3">{g.description}</p>
              </div>
              <ul className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {items.map((r) => (
                  <li key={r.id} className={`${r.cat} card group relative grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 p-3`}>
                    <div className="overflow-hidden rounded-xs border border-rule">{plates[r.id]}</div>
                    <div className="min-w-0">
                      <h3 className="t-sub text-base text-ink group-hover:text-accent-ink">
                        <Link href={`/formulas/${r.id}`} className="after:absolute after:inset-0">
                          {r.name}
                        </Link>
                      </h3>
                      <p className="formula mt-1 truncate text-xs text-ink-2" title={r.expression}>
                        {r.expression}
                      </p>
                      <p className="mt-1.5 text-xs text-ink-3">{r.hasEntry ? `From the entry: ${r.host}` : "Formula specification"}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {shown.length === 0 && (
          <div className="rounded-lg border border-dashed border-rule-strong bg-soft p-10 text-center">
            <p className="t-sub">No formula matches “{q}”.</p>
            <button type="button" onClick={() => setQ("")} className="mt-3 text-sm text-accent-ink underline">
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
