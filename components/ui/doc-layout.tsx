/**
 * Documentation layout shared by the AI pattern library and the design-system
 * docs (v4, D-097): a reading column with a sticky "On this page" list on wide
 * screens, previous/next navigation, and the recurring documentation blocks
 * (do and don't, anatomy, states, checklist). Server components.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { TocSpy } from "./toc-spy";

export type TocItem = [id: string, label: string];

const TOC_FROM = {
  lg: { grid: "lg:grid-cols-[minmax(0,1fr)_14rem]", show: "lg:block" },
  xl: { grid: "xl:grid-cols-[minmax(0,1fr)_14rem]", show: "xl:block" },
} as const;

/**
 * `tocFrom` sets the width at which the sticky list appears. Long pages whose
 * reading column would be squeezed at 1024 px (the guides) use "xl" and offer
 * their own contents disclosure below it. Links in the list are marked
 * `aria-current="location"` for the section in view (TocSpy).
 */
export function DocLayout({ toc, children, aside, tocFrom = "lg" }: { toc: TocItem[]; children: ReactNode; aside?: ReactNode; tocFrom?: keyof typeof TOC_FROM }) {
  const bp = TOC_FROM[tocFrom];
  return (
    <div className={`grid gap-10 ${bp.grid}`}>
      <div className="min-w-0 space-y-14">{children}</div>
      {/* A plain wrapper: the nav inside is the landmark, so the shell's sidebar stays the only complementary region. */}
      <div className={`hidden ${bp.show}`}>
        <nav aria-label="On this page" data-toc className="sticky top-24 max-h-[calc(100dvh-7rem)] space-y-0.5 overflow-y-auto overscroll-contain border-l border-rule pl-4 text-sm">
          <p className="label mb-2">On this page</p>
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="-ml-2 flex min-h-6 items-center rounded-xs py-0.5 pl-2 text-ink-2 hover:text-ink aria-[current=location]:bg-soft aria-[current=location]:font-semibold aria-[current=location]:text-ink">
              {label}
            </a>
          ))}
          {aside && <div className="pt-4">{aside}</div>}
        </nav>
      </div>
      <TocSpy />
    </div>
  );
}

/** One documentation section with a mono kicker and an anchored heading. */
export function DocSection({ id, kicker, title, children }: { id: string; kicker?: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      {kicker && <p className="label mb-2">{kicker}</p>}
      <h2 id={id} className="t-section scroll-mt-24 text-[1.5rem]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-ink">{children}</div>
    </section>
  );
}

export function DoDont({ good, poor, goodLabel = "Do", poorLabel = "Don't" }: { good: ReactNode[]; poor: ReactNode[]; goodLabel?: string; poorLabel?: string }) {
  const col = (items: ReactNode[], ok: boolean, label: string) => (
    <div className={`rounded-md border p-4 ${ok ? "border-ok/40 bg-ok-wash" : "border-error/40 bg-error-wash"}`}>
      <p className={`flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] ${ok ? "text-ok" : "text-error"}`}>
        <span aria-hidden>{ok ? "✓" : "✕"}</span>
        {label}
      </p>
      <ul className="mt-2 space-y-2 text-sm text-ink">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {col(good, true, goodLabel)}
      {col(poor, false, poorLabel)}
    </div>
  );
}

export function DefinitionTable({ rows, head }: { rows: [ReactNode, ReactNode][]; head: [string, string] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-rule" tabIndex={0} role="group" aria-label={`${head[0]} and ${head[1]}`}>
      <table className="w-full min-w-[28rem] text-left text-sm">
        <thead className="bg-soft">
          <tr>
            <th scope="col" className="label px-4 py-2.5 !text-ink-2">
              {head[0]}
            </th>
            <th scope="col" className="label px-4 py-2.5 !text-ink-2">
              {head[1]}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {rows.map(([a, b], i) => (
            <tr key={i} className="align-top">
              <th scope="row" className="w-1/3 px-4 py-2.5 font-semibold text-ink">
                {a}
              </th>
              <td className="px-4 py-2.5 text-ink-2">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ol className="divide-y divide-rule rounded-md border border-rule bg-surface">
      {items.map((t, i) => (
        <li key={t} className="flex gap-3 px-4 py-2.5 text-sm text-ink">
          <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-xs border border-line-control font-mono text-[11px] text-ink-3">
            {i + 1}
          </span>
          {t}
        </li>
      ))}
    </ol>
  );
}

export function PrevNext({ prev, next }: { prev?: { href: string; label: string }; next?: { href: string; label: string } }) {
  if (!prev && !next) return null;
  return (
    <nav aria-label="Previous and next" className="grid gap-3 border-t border-rule pt-6 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="card block p-4">
          <span className="label">Previous</span>
          <span className="t-sub mt-1 block text-ink">← {prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="card block p-4 text-right">
          <span className="label">Next</span>
          <span className="t-sub mt-1 block text-ink">{next.label} →</span>
        </Link>
      )}
    </nav>
  );
}
