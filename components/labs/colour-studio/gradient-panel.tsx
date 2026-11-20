"use client";

import { useId } from "react";
import { gradientCss, gradientJson, type GradientStop } from "@/lib/formulas/colour";
import { ColourField, CopyButton, Note, downloadText, useAnnounce } from "./shared";

export type GradientState = { stops: GradientStop[]; angle: number };
export const DEFAULT_GRADIENT: GradientState = {
  angle: 90,
  stops: [
    { colour: "#264653", position: 0 },
    { colour: "#e9c46a", position: 100 },
  ],
};

const PRESETS = [
  [0, "To top"],
  [90, "To right"],
  [135, "Diagonal"],
  [180, "To bottom"],
] as const;

export function GradientPanel({ gradient, setGradient, colours }: { gradient: GradientState; setGradient: (g: GradientState) => void; colours: string[] }) {
  const announce = useAnnounce();
  const id = useId();
  const { stops, angle } = gradient;
  const css = gradientCss(stops, angle);
  const setStop = (i: number, s: Partial<GradientStop>) => setGradient({ ...gradient, stops: stops.map((x, j) => (j === i ? { ...x, ...s } : x)) });

  return (
    <div className="space-y-6">
      {/* the preview uses exactly the CSS shown below */}
      <div className="h-40 rounded-lg border border-rule-strong shadow-card sm:h-48" style={{ background: css }} role="img" aria-label={`Gradient preview: ${css}`} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
        <section aria-labelledby={`${id}-stops`} className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id={`${id}-stops`} className="t-sub">
              Colour stops · {stops.length}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                disabled={stops.length >= 6}
                onClick={() => {
                  const sorted = [...stops].sort((a, b) => a.position - b.position);
                  let gap = 0;
                  let at = 50;
                  for (let i = 1; i < sorted.length; i++)
                    if (sorted[i].position - sorted[i - 1].position > gap) {
                      gap = sorted[i].position - sorted[i - 1].position;
                      at = Math.round((sorted[i].position + sorted[i - 1].position) / 2);
                    }
                  setGradient({ ...gradient, stops: [...stops, { colour: colours[0] ?? "#888888", position: at }] });
                  announce(`Added a stop at ${at}%.`);
                }}
              >
                Add stop
              </button>
              <button
                type="button"
                className="btn btn-tertiary btn-sm"
                disabled={colours.length < 2}
                onClick={() => {
                  const cs = colours.slice(0, 6);
                  setGradient({ ...gradient, stops: cs.map((c, i) => ({ colour: c, position: Math.round((i / (cs.length - 1)) * 100) })) });
                  announce(`Stops set from ${cs.length} palette colours.`);
                }}
              >
                Use palette
              </button>
            </div>
          </div>
          <ol className="space-y-3">
            {stops.map((s, i) => (
              <li key={i} className="grid gap-3 rounded-md border border-rule bg-surface p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,12rem)_auto] sm:items-end">
                <ColourField label={`Stop ${i + 1} colour`} value={s.colour} onChange={(c) => setStop(i, { colour: c })} />
                <div>
                  <label htmlFor={`${id}-pos-${i}`} className="field-label">
                    Position
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input id={`${id}-pos-${i}`} type="range" min={0} max={100} value={s.position} onChange={(e) => setStop(i, { position: Number(e.target.value) })} aria-valuetext={`${s.position}%`} className="min-w-0 flex-1 accent-[var(--accent)]" />
                    <span className="w-20 shrink-0">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={s.position}
                      aria-label={`Stop ${i + 1} position, percent`}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (Number.isFinite(v)) setStop(i, { position: Math.min(100, Math.max(0, v)) });
                      }}
                      className="field formula h-9 px-2 text-right"
                    />
                    </span>
                  </div>
                </div>
                <button type="button" className="btn btn-tertiary btn-sm" disabled={stops.length <= 2} onClick={() => setGradient({ ...gradient, stops: stops.filter((_, j) => j !== i) })} aria-label={`Remove stop ${i + 1}`}>
                  Remove
                </button>
              </li>
            ))}
          </ol>
        </section>

        <div className="min-w-0 space-y-4">
          <div>
            <label htmlFor={`${id}-angle`} className="field-label">
              Direction: {angle}°
            </label>
            <input id={`${id}-angle`} type="range" min={0} max={359} value={angle} onChange={(e) => setGradient({ ...gradient, angle: Number(e.target.value) })} aria-valuetext={`${angle} degrees`} className="mt-2 w-full accent-[var(--accent)]" />
            <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Direction presets">
              {PRESETS.map(([a, label]) => (
                <button key={a} type="button" aria-pressed={angle === a} onClick={() => setGradient({ ...gradient, angle: a })} className="chip h-8 hover:border-rule-strong hover:text-ink">
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-3">CSS angles: 0° points up, 90° points right, increasing clockwise.</p>
          </div>
          <div>
            <p className="field-label">CSS</p>
            <pre tabIndex={0} aria-label="Gradient CSS" className="formula mt-1 overflow-x-auto whitespace-pre-wrap break-all rounded-md border border-rule bg-soft p-3 text-xs text-ink">
              <code>background: {css};</code>
            </pre>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <CopyButton text={`background: ${css};`} what="gradient CSS" label="Copy CSS" />
              <CopyButton text={gradientJson(stops, angle)} what="gradient JSON" label="Copy JSON" className="btn btn-tertiary btn-sm" />
              <button type="button" className="btn btn-tertiary btn-sm" onClick={() => downloadText("gradient.json", gradientJson(stops, angle), "application/json")}>
                Download JSON
              </button>
            </div>
          </div>
        </div>
      </div>

      <Note title="Gradients in interfaces">
        <p>
          Colours between stops are interpolated in sRGB by default, so two saturated complementary stops pass through a muddy middle; adding a stop in between, or choosing neighbouring hues, keeps it clean. Text placed on a gradient must meet contrast against <em>every</em> part of it that the text covers — check the
          lightest and darkest points in the Contrast tab.
        </p>
      </Note>
    </div>
  );
}
