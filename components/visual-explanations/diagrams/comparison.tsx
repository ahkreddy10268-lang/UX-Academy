/**
 * Before-and-after comparison (spec Part 05 D): original state → problem →
 * cause → intervention → improved state → effect. The effect line states what
 * kind of claim it is, so an illustration is never mistaken for a finding.
 */
import type { ReactNode } from "react";

export type ComparisonSide = { title: string; visual: ReactNode; points: { label: string; text: ReactNode }[] };

const EFFECT_KIND = {
  computed: "Computed with the tested formula",
  illustrative: "Illustrative — not a measured result",
  measured: "Measured result (see the cited source)",
} as const;

export function ComparisonDiagram({ before, after, effect, effectKind }: { before: ComparisonSide; after: ComparisonSide; effect: ReactNode; effectKind: keyof typeof EFFECT_KIND }) {
  const side = (s: ComparisonSide, tone: "before" | "after") => (
    <section aria-label={s.title} className={`min-w-0 rounded-lg border p-4 ${tone === "before" ? "border-rule bg-soft" : "border-ok/40 bg-ok-wash"}`}>
      <p className={`label ${tone === "after" ? "!text-ok" : ""}`}>{tone === "before" ? "Before" : "After"}</p>
      <p className="t-sub mt-1 text-base">{s.title}</p>
      <div className="mt-3 overflow-hidden rounded-md border border-rule bg-surface">{s.visual}</div>
      <dl className="mt-3 space-y-2 text-sm">
        {s.points.map((p) => (
          <div key={p.label}>
            <dt className="font-semibold text-ink">{p.label}</dt>
            <dd className="text-ink-2">{p.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
  return (
    <div className="space-y-3">
      <div className="grid gap-3 @xl:grid-cols-2">
        {side(before, "before")}
        {side(after, "after")}
      </div>
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">Effect. </span>
        {effect} <span className="text-xs text-ink-3">({EFFECT_KIND[effectKind]})</span>
      </p>
    </div>
  );
}
