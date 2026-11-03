/**
 * Formula anatomy: the expression set large, each term numbered, with the
 * numbers repeated on a geometric drawing and in a key — so symbol, meaning
 * and picture can be read together.
 */
import type { ReactNode } from "react";
import { Marker } from "../primitives";

export type Term = { text: string; marker?: number };

export function FormulaAnatomy({ terms, legend: keyItems, visual }: { terms: Term[]; legend: { marker: number; symbol: string; meaning: ReactNode }[]; visual: ReactNode }) {
  return (
    <div className="grid gap-6 @2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @2xl:items-center">
      <div className="min-w-0">
        <p role="img" className="formula flex flex-wrap items-start justify-center gap-x-1.5 gap-y-3 rounded-lg bg-sunken px-4 py-6 text-xl text-ink ring-1 ring-rule sm:text-2xl" aria-label={terms.map((t) => t.text).join(" ")}>
          {terms.map((t, i) => (
            <span key={i} className="inline-flex flex-col items-center gap-1.5" aria-hidden>
              <span className={t.marker ? "rounded-sm bg-surface px-1 ring-1 ring-rule" : ""}>{t.text}</span>
              {t.marker !== undefined ? <Marker n={t.marker} /> : <span className="h-5" />}
            </span>
          ))}
        </p>
        <dl className="mt-4 space-y-2.5 text-sm">
          {keyItems.map((k) => (
            <div key={k.marker} className="flex gap-3">
              <dt className="flex shrink-0 items-center gap-2">
                <Marker n={k.marker} />
                <span className="formula w-20 text-ink">{k.symbol}</span>
              </dt>
              <dd className="text-ink-2">{k.meaning}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="min-w-0 overflow-hidden rounded-lg border border-rule bg-c-wash">{visual}</div>
    </div>
  );
}
