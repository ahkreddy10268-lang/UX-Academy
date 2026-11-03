"use client";

/**
 * Minimal, accessible charts for lab results. Each chart is decorative-plus:
 * the same data is always available as a table next to it (role="img" + label).
 */

type Point = { x: number; y: number; label?: string };

function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  return Math.ceil(v / p) * p;
}

export function ScatterFit({
  points,
  fit,
  xLabel,
  yLabel,
  title,
}: {
  points: Point[];
  fit?: { slope: number; intercept: number };
  xLabel: string;
  yLabel: string;
  title: string;
}) {
  const W = 520;
  const H = 300;
  const m = { l: 56, r: 16, t: 16, b: 44 };
  const xMax = niceMax(Math.max(...points.map((p) => p.x), 1));
  const yMax = niceMax(Math.max(...points.map((p) => p.y), fit ? fit.intercept + fit.slope * xMax : 0, 1));
  const sx = (x: number) => m.l + (x / xMax) * (W - m.l - m.r);
  const sy = (y: number) => H - m.b - (y / yMax) * (H - m.t - m.b);
  const ticks = (max: number) => [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title} className="h-auto w-full max-w-[520px]">
      {ticks(yMax).map((t) => (
        <g key={`y${t}`}>
          <line x1={m.l} x2={W - m.r} y1={sy(t)} y2={sy(t)} className="stroke-rule" />
          <text x={m.l - 8} y={sy(t) + 4} textAnchor="end" className="fill-ink-3 font-mono text-[11px]">
            {Number(t.toPrecision(3))}
          </text>
        </g>
      ))}
      {ticks(xMax).map((t) => (
        <text key={`x${t}`} x={sx(t)} y={H - m.b + 18} textAnchor="middle" className="fill-ink-3 font-mono text-[11px]">
          {Number(t.toPrecision(3))}
        </text>
      ))}
      <line x1={m.l} x2={W - m.r} y1={H - m.b} y2={H - m.b} className="stroke-ink-3" />
      <text x={(m.l + W - m.r) / 2} y={H - 6} textAnchor="middle" className="fill-ink-2 text-[12px]">
        {xLabel}
      </text>
      <text transform={`translate(14 ${(m.t + H - m.b) / 2}) rotate(-90)`} textAnchor="middle" className="fill-ink-2 text-[12px]">
        {yLabel}
      </text>
      {fit && (
        <line x1={sx(0)} y1={sy(fit.intercept)} x2={sx(xMax)} y2={sy(fit.intercept + fit.slope * xMax)} className="stroke-accent" strokeWidth="2" />
      )}
      {points.map((p, i) => (
        <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r="4.5" className="fill-ink stroke-paper" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

export function Bars({ values, labels, title, yLabel, max }: { values: number[]; labels: string[]; title: string; yLabel: string; max?: number }) {
  const W = 520;
  const H = 220;
  const m = { l: 44, r: 8, t: 12, b: 36 };
  const top = max ?? niceMax(Math.max(...values, 1));
  const bw = (W - m.l - m.r) / values.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title} className="h-auto w-full max-w-[520px]">
      {[0, 0.5, 1].map((t) => (
        <g key={t}>
          <line x1={m.l} x2={W - m.r} y1={H - m.b - t * (H - m.t - m.b)} y2={H - m.b - t * (H - m.t - m.b)} className="stroke-rule" />
          <text x={m.l - 6} y={H - m.b - t * (H - m.t - m.b) + 4} textAnchor="end" className="fill-ink-3 font-mono text-[11px]">
            {Number((t * top).toPrecision(2))}
          </text>
        </g>
      ))}
      {values.map((v, i) => {
        const h = (v / top) * (H - m.t - m.b);
        return (
          <g key={i}>
            <rect x={m.l + i * bw + 3} y={H - m.b - h} width={bw - 6} height={h} className="fill-ink-2" />
            <text x={m.l + i * bw + bw / 2} y={H - m.b + 16} textAnchor="middle" className="fill-ink-3 font-mono text-[11px]">
              {labels[i]}
            </text>
          </g>
        );
      })}
      <text transform={`translate(12 ${(m.t + H - m.b) / 2}) rotate(-90)`} textAnchor="middle" className="fill-ink-2 text-[12px]">
        {yLabel}
      </text>
    </svg>
  );
}
