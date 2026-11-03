"use client";

import { useId, useState } from "react";
import { gridColumns } from "@/lib/formulas/visual";

const BREAKPOINTS = [
  { min: 0, name: "Compact", columns: 4, gutter: 16, margin: 16 },
  { min: 600, name: "Medium", columns: 8, gutter: 24, margin: 32 },
  { min: 1024, name: "Expanded", columns: 12, gutter: 24, margin: 48 },
];

/** Card spans per breakpoint: how many columns each block takes. */
const BLOCKS = [
  { label: "Hero", span: [4, 8, 8] },
  { label: "Aside", span: [4, 8, 4] },
  { label: "Card", span: [4, 4, 4] },
  { label: "Card", span: [4, 4, 4] },
  { label: "Card", span: [4, 8, 4] },
];

export function ResponsiveLab() {
  const [width, setWidth] = useState(820);
  const id = useId();
  const bpIndex = BREAKPOINTS.reduce((acc, b, i) => (width >= b.min ? i : acc), 0);
  const bp = BREAKPOINTS[bpIndex];
  const grid = gridColumns(width, bp.columns, bp.gutter, bp.margin);
  const scale = Math.min(1, 900 / width);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="space-y-5">
          <div>
            <label htmlFor={id} className="flex justify-between text-sm font-medium">
              <span>Viewport width</span>
              <span className="formula tabular text-ink-2">{width}px</span>
            </label>
            <input id={id} type="range" min={320} max={1440} step={10} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-2 w-full" />
            <div className="mt-1 flex justify-between text-[11px] text-ink-3">
              <span>320</span>
              <span>600</span>
              <span>1024</span>
              <span>1440</span>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4 rounded-sm border border-rule bg-soft p-4" aria-live="polite">
            {[
              ["Breakpoint", `${bp.name} (≥ ${bp.min}px)`],
              ["Columns", bp.columns],
              ["Gutter / margin", `${bp.gutter} / ${bp.margin}px`],
              ["Column width", `${grid.column.toFixed(1)}px`],
            ].map(([k, v]) => (
              <div key={k as string} className="flex flex-col-reverse">
                <dt className="t-caption">{k}</dt>
                <dd className="formula text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-ink-2">
            Watch the moment the layout crosses a breakpoint: the column count changes and blocks re-span. Between breakpoints, columns stretch fluidly — that is where line lengths and image crops quietly break.
          </p>
        </div>
        <div className="overflow-hidden rounded-sm border border-rule bg-sunken p-4" role="img" aria-label={`Simulated ${width}px layout: ${bp.columns} columns of ${grid.column.toFixed(0)} pixels.`}>
          <div className="mx-auto origin-top-left" style={{ width: width * scale }}>
            <div className="relative bg-surface" style={{ paddingLeft: bp.margin * scale, paddingRight: bp.margin * scale, paddingTop: 12, paddingBottom: 12 }}>
              <div className="absolute inset-y-0 flex" style={{ left: bp.margin * scale, right: bp.margin * scale, gap: bp.gutter * scale }} aria-hidden>
                {Array.from({ length: bp.columns }).map((_, i) => (
                  <div key={i} className="flex-1 bg-accent-wash" />
                ))}
              </div>
              <div className="relative grid" style={{ gridTemplateColumns: `repeat(${bp.columns}, minmax(0, 1fr))`, columnGap: bp.gutter * scale, rowGap: 10 }}>
                {BLOCKS.map((b, i) => (
                  <div key={i} className="flex h-14 items-center justify-center rounded-xs border border-line-control bg-surface/90 text-xs text-ink-2" style={{ gridColumn: `span ${Math.min(bp.columns, b.span[bpIndex])}` }}>
                    {b.label} · {Math.min(bp.columns, b.span[bpIndex])} col
                  </div>
                ))}
              </div>
            </div>
          </div>
          {scale < 1 && <p className="mt-2 text-center text-[11px] text-ink-3">Shown at {Math.round(scale * 100)}% to fit</p>}
        </div>
      </div>
    </div>
  );
}
