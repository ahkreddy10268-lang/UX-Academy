"use client";

import Link from "next/link";
import { useId, useState } from "react";

export type GlossaryItem = { term: string; slug: string; definition: string; see: { title: string; href: string; planned: boolean }[]; source?: string; hasEntry: boolean };

export function GlossaryBrowser({ items }: { items: GlossaryItem[] }) {
  const [q, setQ] = useState("");
  const id = useId();
  const t = q.trim().toLowerCase();
  const shown = items.filter((g) => !t || g.term.toLowerCase().includes(t) || g.definition.toLowerCase().includes(t));
  const groups = new Map<string, GlossaryItem[]>();
  for (const g of shown) {
    const k = /[a-z]/i.test(g.term[0]) ? g.term[0].toUpperCase() : "#";
    (groups.get(k) ?? groups.set(k, []).get(k)!).push(g);
  }
  return (
    <div>
      <div className="sticky top-[68px] z-10 -mx-4 border-b border-rule bg-surface/95 px-4 py-3 sm:mx-0 sm:px-0">
        <div className="flex flex-wrap items-center gap-4">
          <label htmlFor={id} className="sr-only">
            Filter terms
          </label>
          <input id={id} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter terms and definitions…" className="field w-full max-w-xs" />
          <nav aria-label="Letters" className="flex flex-wrap gap-0.5">
            {[...groups.keys()].map((k) => (
              <a key={k} href={`#letter-${k}`} className="formula inline-flex h-8 w-8 items-center justify-center rounded-xs text-sm text-ink-2 hover:bg-sunken hover:text-ink">
                {k}
              </a>
            ))}
          </nav>
          <p className="text-sm text-ink-3" aria-live="polite">
            {shown.length} of {items.length}
          </p>
        </div>
      </div>
      {shown.length === 0 && (
        <p className="mt-10 text-ink-2">
          No term matches “{q}”. Try the{" "}
          <Link className="link" href={`/library?q=${encodeURIComponent(q)}`}>
            library search
          </Link>
          , which searches full articles.
        </p>
      )}
      <div className="max-w-[54rem]">
        {[...groups.entries()].map(([k, terms]) => (
          <section key={k} aria-labelledby={`letter-${k}`} className="pt-10">
            <h2 id={`letter-${k}`} className="t-section scroll-mt-36 text-3xl text-accent">
              {k}
            </h2>
            <dl className="mt-3 divide-y divide-rule border-t border-rule">
              {terms.map((g) => (
                <div key={g.slug} id={g.slug} className="grid scroll-mt-36 gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="t-sub text-ink">
                    {g.term}
                    {g.hasEntry && <span className="ml-2 align-middle text-[11px] font-medium uppercase tracking-[0.08em] text-accent-ink">entry</span>}
                  </dt>
                  <dd>
                    <p className="text-ink-2">{g.definition}</p>
                    {(g.see.length > 0 || g.source) && (
                      <p className="mt-1.5 text-sm text-ink-3">
                        {g.see.length > 0 && (
                          <>
                            Related:{" "}
                            {g.see.map((s, i) => (
                              <span key={s.href}>
                                {i > 0 && ", "}
                                <Link href={s.href} className={s.planned ? "underline decoration-dotted" : "link"}>
                                  {s.title}
                                </Link>
                              </span>
                            ))}
                          </>
                        )}
                        {g.source && <span>{g.see.length ? " · " : ""}Source: {g.source}</span>}
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
