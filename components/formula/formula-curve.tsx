"use client";
/**
 * "How the result responds" curves for selected formulas. Every point is
 * computed by the tested functions in lib/formulas, sampled over a range.
 * Each chart has a text summary and a small data table alternative.
 */
import { useState } from "react";
import { fittsId, hickInformationEqual } from "@/lib/formulas/pointing";
import { problemDiscovery, sampleSizeTwoProportions } from "@/lib/formulas/stats";
import { modularScale } from "@/lib/formulas/visual";

type Series = { name: string; points: [number, number][] };
type Preset = { title: string; x: string; y: string; series: Series[]; note: string; yMax?: number };

const range = (a: number, b: number, step: number) => Array.from({ length: Math.floor((b - a) / step) + 1 }, (_, i) => a + i * step);

const PRESETS: Record<string, () => Preset> = {
  fitts: () => ({
    title: "Index of difficulty as target width grows",
    x: "Target width W (px)",
    y: "ID (bits)",
    series: [200, 400, 800].map((D) => ({ name: `D = ${D}`, points: range(8, 160, 4).map((W) => [W, fittsId(D, W)] as [number, number]) })),
    note: "Gains flatten logarithmically: enlarging a tiny target helps far more than enlarging an already large one.",
  }),
  "hick-hyman": () => ({
    title: "Information as the number of equally likely choices grows",
    x: "Choices n",
    y: "H (bits)",
    series: [{ name: "log₂ n", points: range(1, 32, 1).map((n) => [n, hickInformationEqual(n)] as [number, number]) }],
    note: "Each doubling of choices adds one bit — 16 options carry only one bit more than 8.",
  }),
  "problem-discovery": () => ({
    title: "Chance of observing a problem at least once",
    x: "Participants n",
    y: "P(seen ≥ once)",
    yMax: 1,
    series: [0.31, 0.15, 0.05].map((p) => ({ name: `p = ${p}`, points: range(1, 20, 1).map((n) => [n, problemDiscovery(p, n)] as [number, number]) })),
    note: "Common problems surface quickly; rare problems (p = 0.05) need far more participants. Five users is not a universal answer.",
  }),
  "sample-size": () => ({
    title: "Participants per group to detect a lift from a 10% baseline",
    x: "Target rate p₂ (%)",
    y: "n per group",
    series: [{ name: "α 0.05, power 0.8", points: range(11, 20, 0.5).map((p) => [p, sampleSizeTwoProportions(0.1, p / 100)] as [number, number]) }],
    note: "Halving the difference you want to detect roughly quadruples the sample you need.",
  }),
  "modular-scale": () => ({
    title: "Type sizes along a modular scale from 16px",
    x: "Step",
    y: "Size (px)",
    series: [1.125, 1.25, 1.5].map((r) => ({ name: `ratio ${r}`, points: modularScale(16, r, 2, 6).map((s) => [s.step, s.size] as [number, number]) })),
    note: "Larger ratios separate levels faster — fewer steps fit before headings become very large.",
  }),
};



const DASH = ["", "6 4", "2 4"];

export function FormulaCurve({ calculator }: { calculator: string }) {
  const [table, setTable] = useState(false);
  const make = PRESETS[calculator];
  if (!make) return null;
  const p = make();
  const all = p.series.flatMap((s) => s.points);
  const xMin = Math.min(...all.map((a) => a[0]));
  const xMax = Math.max(...all.map((a) => a[0]));
  const yMax = p.yMax ?? Math.max(...all.map((a) => a[1])) * 1.08;
  const W = 560;
  const H = 260;
  const m = { l: 56, r: 96, t: 16, b: 42 };
  const sx = (x: number) => m.l + ((x - xMin) / (xMax - xMin || 1)) * (W - m.l - m.r);
  const sy = (y: number) => H - m.b - (y / yMax) * (H - m.t - m.b);
  const fmt = (v: number) => (Math.abs(v) >= 100 ? Math.round(v).toLocaleString("en-GB") : Number(v.toFixed(2)).toString());

  return (
    <figure className="rounded-sm border border-rule bg-surface p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="t-sub text-sm">{p.title}</span>
        <button type="button" onClick={() => setTable((t) => !t)} aria-expanded={table} className="tap text-xs text-ink-2 underline">
          {table ? "Hide data" : "Show data"}
        </button>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-auto w-full" role="img" aria-label={`${p.title}. ${p.note}`}>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={sy(t * yMax)} y2={sy(t * yMax)} stroke="var(--rule)" />
            <text x={m.l - 8} y={sy(t * yMax) + 4} textAnchor="end" fontSize="11" fill="var(--ink-3)" fontFamily="var(--font-plex-mono)">
              {fmt(t * yMax)}
            </text>
          </g>
        ))}
        {[0, 0.5, 1].map((t) => (
          <text key={t} x={sx(xMin + t * (xMax - xMin))} y={H - m.b + 18} textAnchor="middle" fontSize="11" fill="var(--ink-3)" fontFamily="var(--font-plex-mono)">
            {fmt(xMin + t * (xMax - xMin))}
          </text>
        ))}
        <text x={(m.l + W - m.r) / 2} y={H - 6} textAnchor="middle" fontSize="12" fill="var(--ink-2)">
          {p.x}
        </text>
        <text transform={`translate(14 ${(m.t + H - m.b) / 2}) rotate(-90)`} textAnchor="middle" fontSize="12" fill="var(--ink-2)">
          {p.y}
        </text>
        {p.series.map((s, i) => {
          const last = s.points[s.points.length - 1];
          return (
            <g key={s.name}>
              <path d={"M" + s.points.map(([x, y]) => `${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`).join(" L")} fill="none" stroke={i === 0 ? "var(--c)" : "var(--ink-2)"} strokeWidth="2.25" strokeDasharray={DASH[i]} />
              <text x={sx(last[0]) + 6} y={sy(last[1]) + 4} fontSize="11" fill="var(--ink-2)" fontFamily="var(--font-plex-mono)">
                {s.name}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-sm text-ink-2">{p.note}</p>
      {table && (
        <div className="mt-3 max-h-56 overflow-auto" tabIndex={0} role="group" aria-label="Curve data">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-ink-3">
                <th className="py-1 pr-3 font-medium">{p.x}</th>
                {p.series.map((s) => (
                  <th key={s.name} className="py-1 pr-3 font-medium">
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="formula tabular">
              {p.series[0].points.map(([x], r) => (
                <tr key={x} className="border-t border-rule">
                  <td className="py-0.5 pr-3">{fmt(x)}</td>
                  {p.series.map((s) => (
                    <td key={s.name} className="py-0.5 pr-3">
                      {s.points[r] ? fmt(s.points[r][1]) : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </figure>
  );
}
