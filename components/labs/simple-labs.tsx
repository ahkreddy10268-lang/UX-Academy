"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { contrastRatio, parseHex, toHex, wcagChecks, type RGB } from "@/lib/formulas/visual";
import { modularScale, SCALE_RATIOS } from "@/lib/formulas/visual";
import { actions } from "@/lib/store/store";
import { useLocalJson, writeLocal } from "@/lib/store/local";
import { Bars } from "./charts";

const box = "rounded-sm border border-rule bg-surface";
const ctl = "mt-1 h-10 w-full rounded-sm border border-line-control bg-surface px-2 text-sm";

function Slider({ label, value, min, max, step = 1, onChange, unit = "" }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; unit?: string }) {
  const id = `s-${label.replace(/\W+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="flex justify-between text-sm font-medium">
        <span>{label}</span>
        <span className="formula tabular text-ink-2">
          {value}
          {unit}
        </span>
      </label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 w-full" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contrast lab                                                         */
/* ------------------------------------------------------------------ */

function rgbToHsl({ r, g, b }: RGB) {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === R ? (G - B) / d + (G < B ? 6 : 0) : max === G ? (B - R) / d + 2 : (R - G) / d + 4;
  return { h: h * 60, s, l };
}
function hslToRgb(h: number, s: number, l: number): RGB {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

/** Nearest colour (same hue & saturation) whose lightness reaches the target ratio. */
function nearestPassing(fg: RGB, bg: RGB, target: number): RGB | null {
  const { h, s, l } = rgbToHsl(fg);
  let best: RGB | null = null;
  let bestDist = Infinity;
  for (let i = 0; i <= 1000; i++) {
    const L = i / 1000;
    const c = hslToRgb(h, s, L);
    if (contrastRatio(c, bg) >= target && Math.abs(L - l) < bestDist) {
      best = c;
      bestDist = Math.abs(L - l);
    }
  }
  return best;
}

export function ContrastLab() {
  const [fg, setFg] = useState("#5f5a52");
  const [bg, setBg] = useState("#ffffff");
  const [target, setTarget] = useState(4.5);
  const valid = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(fg.trim()) && /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(bg.trim());
  const ratio = valid ? contrastRatio(parseHex(fg), parseHex(bg)) : NaN;
  const suggestion = valid && ratio < target ? nearestPassing(parseHex(fg), parseHex(bg), target) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <div className="space-y-4">
        {(
          [
            ["Text colour", fg, setFg],
            ["Background", bg, setBg],
          ] as const
        ).map(([label, v, set]) => (
          <div key={label}>
            <label className="text-sm font-medium" htmlFor={`cl-${label}`}>
              {label}
            </label>
            <div className="mt-1 flex gap-2">
              <input aria-label={`${label} picker`} type="color" value={valid ? toHex(parseHex(v)) : "#000000"} onChange={(e) => set(e.target.value)} className="h-10 w-12 rounded-xs border border-line-control" />
              <input id={`cl-${label}`} value={v} onChange={(e) => set(e.target.value)} className="formula h-10 flex-1 rounded-sm border border-line-control bg-surface px-3" />
            </div>
          </div>
        ))}
        <div>
          <label htmlFor="cl-target" className="text-sm font-medium">
            Target
          </label>
          <select id="cl-target" className={ctl} value={target} onChange={(e) => setTarget(Number(e.target.value))}>
            <option value={4.5}>4.5:1 — AA normal text</option>
            <option value={3}>3:1 — AA large text / UI components</option>
            <option value={7}>7:1 — AAA normal text</option>
          </select>
        </div>
        {!valid && <p role="alert" className="text-sm text-accent-ink">Enter colours as #rgb or #rrggbb.</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <button type="button" className="text-accent-ink underline" onClick={() => (setFg("#8a8a8a"), setBg("#ffffff"))}>
            Show a failing example
          </button>
          <button type="button" className="text-accent-ink underline" onClick={() => (setFg("#ffffff"), setBg("#d9534f"))}>
            Try white on a mid red
          </button>
        </div>
      </div>
      {valid && (
        <div className="space-y-6">
          <div className="rounded-sm border border-rule p-6" style={{ background: toHex(parseHex(bg)), color: toHex(parseHex(fg)) }}>
            <p className="text-2xl font-semibold">Large heading text (24px bold)</p>
            <p className="mt-2 text-base">Body text at 16px. Readers with low vision, older eyes, or a sunlit phone screen depend on luminance contrast.</p>
            <p className="mt-2 text-xs">Small 12px caption text — the most fragile case.</p>
            <button type="button" className="mt-4 rounded-xs border-2 px-3 py-1.5 text-sm font-medium" style={{ borderColor: toHex(parseHex(fg)) }}>
              Button outline
            </button>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <p className="formula text-4xl">{ratio.toFixed(2)}:1</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {wcagChecks(ratio).map((c) => (
                <li key={c.id}>
                  <span className={c.pass ? "text-ok" : "text-accent-ink"}>{c.pass ? "Pass" : "Fail"}</span> <span className="text-ink-2">{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
          {ratio < target && (
            <div className={`${box} p-4 text-sm`}>
              {suggestion ? (
                <p className="flex flex-wrap items-center gap-3">
                  <span>Nearest passing text colour with the same hue and saturation:</span>
                  <span className="inline-block h-5 w-5 rounded-xs border border-rule" style={{ background: toHex(suggestion) }} />
                  <span className="formula">{toHex(suggestion)}</span>
                  <span className="text-ink-3">({contrastRatio(suggestion, parseHex(bg)).toFixed(2)}:1)</span>
                  <button type="button" className="text-accent-ink underline" onClick={() => setFg(toHex(suggestion))}>
                    Apply
                  </button>
                </p>
              ) : (
                <p>No lightness of this hue reaches {target}:1 on this background — change the background.</p>
              )}
            </div>
          )}
          <p className="text-sm text-ink-3">
            The ratio ignores font weight beyond WCAG&apos;s “large text” definition, anti-aliasing and surrounding colours. Passing is necessary, not sufficient, for readable text.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Gestalt lab                                                          */
/* ------------------------------------------------------------------ */

export function GestaltLab() {
  const [gap, setGap] = useState(0);
  const [similarity, setSimilarity] = useState<"none" | "columns" | "rows">("none");
  const [shape, setShape] = useState(false);
  const [region, setRegion] = useState(false);
  const [connect, setConnect] = useState(false);
  const cols = 8;
  const rows = 4;
  const step = 34;
  const x = (c: number) => 24 + c * step + Math.floor(c / 2) * gap;
  const y = (r: number) => 24 + r * step;
  const width = x(cols - 1) + 24;

  const cues = [
    gap > 6 && "proximity groups the dots into column pairs",
    similarity === "columns" && "similarity of colour groups alternate columns",
    similarity === "rows" && "similarity of colour groups rows",
    shape && "similarity of shape groups rows",
    region && "common region encloses column pairs",
    connect && "uniform connectedness links row neighbours into pairs",
  ].filter(Boolean) as string[];

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div className="space-y-5">
        <Slider label="Proximity: gap between column pairs" value={gap} min={0} max={30} onChange={setGap} unit="px" />
        <div>
          <label htmlFor="g-sim" className="text-sm font-medium">
            Similarity of colour
          </label>
          <select id="g-sim" className={ctl} value={similarity} onChange={(e) => setSimilarity(e.target.value as "none")}>
            <option value="none">All the same</option>
            <option value="columns">Alternate columns</option>
            <option value="rows">Alternate rows</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={shape} onChange={(e) => setShape(e.target.checked)} /> Similarity of shape (squares on odd rows)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={region} onChange={(e) => setRegion(e.target.checked)} /> Common region (boxes around column pairs)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={connect} onChange={(e) => setConnect(e.target.checked)} /> Connectedness (lines between row pairs)
        </label>
      </div>
      <div>
        <div className={`${box} overflow-x-auto p-4`}>
          <svg viewBox={`0 0 ${width} ${y(rows - 1) + 24}`} className="h-auto w-full max-w-[640px]" role="img" aria-label={`Dot grid. Active cues: ${cues.join("; ") || "none — a uniform grid"}.`}>
            {region &&
              Array.from({ length: cols / 2 }).map((_, p) => (
                <rect key={p} x={x(p * 2) - 14} y={10} width={x(p * 2 + 1) - x(p * 2) + 28} height={y(rows - 1) - y(0) + 28} rx="4" className="fill-sunken stroke-rule-strong" />
              ))}
            {connect &&
              Array.from({ length: rows }).flatMap((_, r) =>
                Array.from({ length: cols / 2 }).map((_, p) => <line key={`${r}-${p}`} x1={x(p * 2 + 1)} x2={x(p * 2 + 2 < cols ? p * 2 + 2 : p * 2 + 1)} y1={y(r)} y2={y(r)} className="stroke-ink-2" strokeWidth="2" />),
              )}
            {Array.from({ length: rows }).flatMap((_, r) =>
              Array.from({ length: cols }).map((_, c) => {
                const dark = similarity === "columns" ? c % 2 === 0 : similarity === "rows" ? r % 2 === 0 : true;
                const cls = dark ? "fill-ink" : "fill-accent";
                return shape && r % 2 === 0 ? <rect key={`${r}-${c}`} x={x(c) - 8} y={y(r) - 8} width="16" height="16" className={cls} /> : <circle key={`${r}-${c}`} cx={x(c)} cy={y(r)} r="8" className={cls} />;
              }),
            )}
          </svg>
        </div>
        <div className="mt-4 text-sm text-ink-2" aria-live="polite">
          {cues.length ? (
            <>
              <p className="font-medium text-ink">Cues now active</p>
              <ul className="mt-1 list-disc pl-5">
                {cues.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              {cues.length > 1 && <p className="mt-2">When cues compete, which grouping wins depends on their relative strength — try weakening one until the other takes over.</p>}
            </>
          ) : (
            <p>A uniform grid: you may see rows, columns, or nothing in particular. Add one cue at a time.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Visual hierarchy lab                                                 */
/* ------------------------------------------------------------------ */

type El = { id: string; label: string; text: string; size: number; weight: number; contrast: number; space: number };

export function HierarchyLab() {
  const initial: El[] = [
    { id: "eyebrow", label: "Category label", text: "Annual plan", size: 12, weight: 600, contrast: 60, space: 4 },
    { id: "title", label: "Title", text: "Team workspace", size: 26, weight: 600, contrast: 100, space: 8 },
    { id: "price", label: "Price", text: "£12 per person / month", size: 18, weight: 500, contrast: 90, space: 12 },
    { id: "body", label: "Description", text: "Shared libraries, version history and admin controls for teams up to 50.", size: 15, weight: 400, contrast: 70, space: 16 },
    { id: "cta", label: "Button", text: "Start free trial", size: 15, weight: 600, contrast: 100, space: 0 },
  ];
  const [els, setEls] = useState(initial);
  const [sel, setSel] = useState("title");
  const cur = els.find((e) => e.id === sel)!;
  const set = (k: keyof El) => (v: number) => setEls((xs) => xs.map((e) => (e.id === sel ? { ...e, [k]: v } : e)));
  // Teaching heuristic: salience ≈ size × weight factor × contrast, with a small boost for being first.
  const order = [...els]
    .map((e, i) => ({ e, s: e.size * (e.weight / 400) * (e.contrast / 100) * (e.id === "cta" ? 1.25 : 1) + (i === 0 ? 0.5 : 0) }))
    .sort((a, b) => b.s - a.s);

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div className="space-y-4">
        <div>
          <label htmlFor="h-el" className="text-sm font-medium">
            Element
          </label>
          <select id="h-el" className={ctl} value={sel} onChange={(e) => setSel(e.target.value)}>
            {els.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
        <Slider label="Size" value={cur.size} min={10} max={40} onChange={set("size")} unit="px" />
        <Slider label="Weight" value={cur.weight} min={300} max={700} step={100} onChange={set("weight")} />
        <Slider label="Contrast (ink strength)" value={cur.contrast} min={40} max={100} step={5} onChange={set("contrast")} unit="%" />
        <Slider label="Space after" value={cur.space} min={0} max={40} onChange={set("space")} unit="px" />
        <button type="button" className="text-sm text-accent-ink underline" onClick={() => setEls(initial)}>
          Reset
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_14rem]">
        <div className={`${box} p-6`}>
          {els.map((e) =>
            e.id === "cta" ? (
              <button key={e.id} type="button" className="rounded-sm bg-accent px-4 py-2 text-surface" style={{ fontSize: e.size, fontWeight: e.weight, opacity: e.contrast / 100 }}>
                {e.text}
              </button>
            ) : (
              <p key={e.id} style={{ fontSize: e.size, fontWeight: e.weight, color: `color-mix(in srgb, var(--ink) ${e.contrast}%, var(--paper))`, marginBottom: e.space, lineHeight: 1.3 }}>
                {e.text}
              </p>
            ),
          )}
        </div>
        <div>
          <p className="label">Predicted reading order</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
            {order.map(({ e }) => (
              <li key={e.id}>{e.label}</li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-ink-3">A simple size × weight × contrast heuristic for teaching — not an eye-tracking model. Position, colour, imagery and task goals also steer attention.</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Progressive disclosure lab                                           */
/* ------------------------------------------------------------------ */

const SETTINGS = [
  { g: "Essentials", items: ["Display name", "Email address", "Time zone"] },
  { g: "Notifications", items: ["Email digests", "Mention alerts", "Weekly summary", "Quiet hours"] },
  { g: "Advanced", items: ["API tokens", "Webhook URL", "Data retention (days)", "Export format", "Single sign-on", "Audit log level", "Beta features"] },
];

export function DisclosureLab() {
  const [mode, setMode] = useState<"all" | "advanced" | "staged">("all");
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const groups = mode === "all" ? SETTINGS : mode === "advanced" ? (open ? SETTINGS : SETTINGS.slice(0, 2)) : [SETTINGS[stage]];
  const visible = groups.reduce((s, g) => s + g.items.length, 0);
  const total = SETTINGS.reduce((s, g) => s + g.items.length, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div className="space-y-4">
        <fieldset>
          <legend className="text-sm font-medium">Presentation</legend>
          {(
            [
              ["all", "Everything at once"],
              ["advanced", "Advanced section collapsed"],
              ["staged", "Staged (one step at a time)"],
            ] as const
          ).map(([v, l]) => (
            <label key={v} className="mt-2 flex items-center gap-2 text-sm">
              <input type="radio" name="disc" checked={mode === v} onChange={() => (setMode(v), setStage(0), setOpen(false))} /> {l}
            </label>
          ))}
        </fieldset>
        <p className="formula text-sm">
          {visible} of {total} controls visible
        </p>
        <p className="text-sm text-ink-2">
          {mode === "all" && "Everything is discoverable, but the seven rarely used controls compete for attention with the three everyone needs."}
          {mode === "advanced" && "Frequent settings come first; rare ones are one click away. The risk: if users need an advanced setting often, hiding it adds cost — the split must follow real usage data."}
          {mode === "staged" && "Staging suits linear tasks such as setup wizards. It hurts when users need to compare or edit across stages."}
        </p>
      </div>
      <div className={`${box} p-6`}>
        {groups.map((g) => (
          <fieldset key={g.g} className="mb-6 last:mb-0">
            <legend className="label">{g.g}</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {g.items.map((i) => (
                <label key={i} className="text-sm">
                  {i}
                  <input className="mt-1 h-9 w-full rounded-xs border border-line-control bg-surface px-2" />
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        {mode === "advanced" && (
          <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="text-sm font-medium text-accent-ink underline">
            {open ? "Hide advanced settings" : "Show advanced settings (7)"}
          </button>
        )}
        {mode === "staged" && (
          <div className="mt-4 flex items-center justify-between border-t border-rule pt-4">
            <span className="text-sm text-ink-3">
              Step {stage + 1} of {SETTINGS.length}
            </span>
            <div className="flex gap-2">
              <button type="button" disabled={stage === 0} onClick={() => setStage((s) => s - 1)} className="h-9 rounded-sm border border-rule px-3 text-sm disabled:opacity-40">
                Back
              </button>
              <button type="button" disabled={stage === SETTINGS.length - 1} onClick={() => setStage((s) => s + 1)} className="h-9 rounded-sm bg-accent px-3 text-sm text-surface disabled:opacity-40">
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feedback & system status lab                                         */
/* ------------------------------------------------------------------ */

export function FeedbackLab() {
  const [latency, setLatency] = useState(1.5);
  const [strategy, setStrategy] = useState<"none" | "spinner" | "progress" | "optimistic">("spinner");
  const [fail, setFail] = useState(false);
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [saved, setSaved] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setState("pending");
    setProgress(0);
    if (strategy === "optimistic") setSaved(true);
    const ms = latency * 1000;
    if (strategy === "progress") for (let i = 1; i <= 10; i++) timers.current.push(setTimeout(() => setProgress(i * 10), (ms / 10) * i));
    timers.current.push(
      setTimeout(() => {
        if (fail) {
          setState("error");
          if (strategy === "optimistic") setSaved(false);
        } else {
          setState("success");
          setSaved(true);
        }
      }, ms),
    );
  }

  const band = latency <= 0.1 ? "≈ 0.1 s: feels instantaneous; no indicator needed." : latency <= 1 ? "≤ 1 s: flow of thought is kept, but delay is noticed. Avoid flashing a spinner for a few hundred milliseconds." : latency <= 10 ? "1–10 s: attention starts to wander. Show that work is happening; a spinner is the minimum." : "> 10 s: users switch tasks. Show progress and expected time, and let them do something else.";

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div className="space-y-4">
        <Slider label="Server latency" value={latency} min={0.1} max={12} step={0.1} onChange={setLatency} unit=" s" />
        <div>
          <label htmlFor="fb-s" className="text-sm font-medium">
            Feedback strategy
          </label>
          <select id="fb-s" className={ctl} value={strategy} onChange={(e) => setStrategy(e.target.value as "none")}>
            <option value="none">No feedback</option>
            <option value="spinner">Indeterminate spinner</option>
            <option value="progress">Determinate progress</option>
            <option value="optimistic">Optimistic update</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} /> Make the request fail
        </label>
        <p className="text-sm text-ink-2">{band}</p>
        <p className="text-xs text-ink-3">Bands follow Nielsen&apos;s (1993) response-time guidance — rules of thumb, not perceptual laws.</p>
      </div>
      <div className={`${box} p-6`}>
        <p className="label">Document · Q3 research plan</p>
        <p className="mt-2 text-sm text-ink-2">Status: {saved ? "All changes saved" : "Unsaved changes"}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button type="button" onClick={run} disabled={state === "pending" && strategy !== "none"} className="inline-flex h-10 items-center gap-2 rounded-sm bg-accent px-4 text-sm font-medium text-surface disabled:opacity-70">
            {state === "pending" && strategy === "spinner" && <span aria-hidden className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper border-t-transparent" />}
            {state === "pending" && strategy !== "none" && strategy !== "optimistic" ? "Saving…" : "Save"}
          </button>
          <span role="status" className="text-sm">
            {state === "pending" && strategy === "optimistic" && <span className="text-ink-2">Saved (confirming…)</span>}
            {state === "success" && strategy !== "none" && <span className="text-ok">Saved.</span>}
            {state === "error" && (
              <span className="text-accent-ink">
                Couldn&apos;t save — check your connection.{" "}
                <button type="button" className="underline" onClick={run}>
                  Try again
                </button>
              </span>
            )}
          </span>
        </div>
        {state === "pending" && strategy === "progress" && (
          <div className="mt-4">
            <div className="h-1.5 overflow-hidden rounded-full bg-sunken" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Saving progress">
              <div className="h-full bg-accent transition-[width]" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-1 text-xs text-ink-3">About {Math.max(0, Math.ceil(latency * (1 - progress / 100)))} s remaining</p>
          </div>
        )}
        <div className="mt-6 border-t border-rule pt-4 text-sm text-ink-2">
          {strategy === "none" && "With no feedback, users can't tell whether the click registered — they click again, or leave."}
          {strategy === "spinner" && "A spinner says 'working' but not 'how long'. Fine for 1–10 s."}
          {strategy === "progress" && "Determinate progress sets expectations for long operations — only honest if progress can actually be measured."}
          {strategy === "optimistic" && "Optimistic UI shows success immediately and reconciles later. Excellent for low-risk, usually-successful actions; on failure you must roll back visibly — try it with failure on."}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Serial position lab                                                  */
/* ------------------------------------------------------------------ */

const WORD_POOL = ["anchor", "basket", "candle", "dolphin", "engine", "forest", "garden", "hammer", "island", "jacket", "kettle", "ladder", "marble", "needle", "orange", "pillow", "quarry", "ribbon", "saddle", "tunnel", "velvet", "window", "yogurt", "zipper", "bottle", "carpet", "feather", "harbor", "lemon", "mirror"];
const LIST_LEN = 12;
const STORE = "ux-academy:serial-position";
type Totals = { runs: number; counts: number[] };
const EMPTY_TOTALS: Totals = { runs: 0, counts: Array(LIST_LEN).fill(0) };
const isTotals = (v: unknown): v is Totals => Boolean(v && typeof v === "object" && Array.isArray((v as Totals).counts) && (v as Totals).counts.length === LIST_LEN);

export function SerialPositionLab() {
  const [list, setList] = useState<string[]>([]);
  const [shown, setShown] = useState(-1);
  const [phase, setPhase] = useState<"ready" | "showing" | "recall" | "scored">("ready");
  const [answer, setAnswer] = useState("");
  const [hits, setHits] = useState<boolean[]>([]);
  const totals = useLocalJson<Totals>(STORE, EMPTY_TOTALS, isTotals);

  useEffect(() => {
    if (phase !== "showing") return;
    const t = setTimeout(() => {
      if (shown + 1 >= LIST_LEN) setPhase("recall");
      else setShown((s) => s + 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [phase, shown]);

  function start() {
    const pool = [...WORD_POOL].sort(() => Math.random() - 0.5);
    setList(pool.slice(0, LIST_LEN));
    setShown(0);
    setAnswer("");
    setPhase("showing");
  }

  function score() {
    const said = new Set(answer.toLowerCase().split(/[\s,;]+/).filter(Boolean));
    const h = list.map((w) => said.has(w));
    setHits(h);
    const next = { runs: totals.runs + 1, counts: totals.counts.map((c, i) => c + (h[i] ? 1 : 0)) };
    writeLocal(STORE, JSON.stringify(next));
    actions.recordLabRun("serial-position-lab", `${h.filter(Boolean).length}/${LIST_LEN} recalled`);
    setPhase("scored");
  }

  const rates = totals.counts.map((c) => (totals.runs ? c / totals.runs : 0));

  return (
    <div className="space-y-8">
      <div className={`${box} p-6`}>
        {phase === "ready" && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-ink-2">{LIST_LEN} words will appear one per second. Then type every word you remember, in any order.</p>
            <button type="button" onClick={start} className="h-10 rounded-sm bg-accent px-4 text-sm font-medium text-surface">
              Start
            </button>
          </div>
        )}
        {phase === "showing" && (
          <p className="display py-10 text-center text-4xl" aria-live="assertive">
            {list[shown] ?? ""}
          </p>
        )}
        {phase === "recall" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              score();
            }}
          >
            <label htmlFor="sp-recall" className="text-sm font-medium">
              Type the words you remember
            </label>
            <textarea id="sp-recall" autoFocus rows={3} value={answer} onChange={(e) => setAnswer(e.target.value)} className="mt-1 w-full rounded-sm border border-line-control bg-surface px-3 py-2" />
            <button className="mt-3 h-10 rounded-sm bg-accent px-4 text-sm font-medium text-surface">Score my recall</button>
          </form>
        )}
        {phase === "scored" && (
          <div>
            <p className="font-medium">
              You recalled {hits.filter(Boolean).length} of {LIST_LEN}.
            </p>
            <ol className="mt-3 flex flex-wrap gap-2 text-sm">
              {list.map((w, i) => (
                <li key={w} className={`rounded-xs border px-2 py-0.5 ${hits[i] ? "border-ok text-ok" : "border-rule text-ink-3"}`}>
                  {i + 1}. {w}
                  <span className="sr-only">{hits[i] ? " recalled" : " missed"}</span>
                </li>
              ))}
            </ol>
            <button type="button" onClick={start} className="mt-4 h-9 rounded-sm border border-rule px-3 text-sm font-medium">
              Another list
            </button>
          </div>
        )}
      </div>
      {totals.runs > 0 && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <Bars values={rates} labels={rates.map((_, i) => String(i + 1))} max={1} yLabel="Recall rate" title={`Recall rate by list position across ${totals.runs} runs: ${rates.map((r, i) => `position ${i + 1} ${Math.round(r * 100)}%`).join(", ")}`} />
          <div className="text-sm text-ink-2">
            <p>
              Across <strong>{totals.runs}</strong> {totals.runs === 1 ? "run" : "runs"}. A U-shape — high at both ends, lower in the middle — is the serial position curve: primacy at the start, recency at the end.
            </p>
            <p className="mt-2 text-ink-3">With fewer than about five runs the curve is mostly noise.</p>
            <button
              type="button"
              className="mt-3 text-accent-ink underline"
              onClick={() => writeLocal(STORE, null)}
            >
              Clear my data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Type scale & responsive lab                                          */
/* ------------------------------------------------------------------ */

export function TypeScaleLab() {
  const [base, setBase] = useState(17);
  const [ratio, setRatio] = useState(1.25);
  const [viewport, setViewport] = useState(720);
  const [lineHeight, setLineHeight] = useState(1.55);
  const [measure, setMeasure] = useState(66);
  const steps = useMemo(() => modularScale(base, ratio, 1, 4), [base, ratio]);
  const size = (i: number) => steps.find((s) => s.step === i)!.size;
  const fluidMin = 360;
  const fluidMax = 1280;
  const clamp = (i: number) => {
    const max = size(i);
    const min = Math.max(base, max * 0.78);
    const slope = (max - min) / (fluidMax - fluidMin);
    const intercept = min - slope * fluidMin;
    return `clamp(${(min / 16).toFixed(3)}rem, ${(intercept / 16).toFixed(3)}rem + ${(slope * 100).toFixed(3)}vw, ${(max / 16).toFixed(3)}rem)`;
  };
  const chars = Math.round(Math.min(measure, (viewport - 48) / (base * 0.5)));

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <Slider label="Base size" value={base} min={14} max={22} onChange={setBase} unit="px" />
        <div>
          <label htmlFor="ts-r" className="text-sm font-medium">
            Ratio
          </label>
          <select id="ts-r" className={ctl} value={ratio} onChange={(e) => setRatio(Number(e.target.value))}>
            {SCALE_RATIOS.map((s) => (
              <option key={s.name} value={s.ratio}>
                {s.name} ({s.ratio.toFixed(3)})
              </option>
            ))}
          </select>
        </div>
        <Slider label="Viewport" value={viewport} min={320} max={1280} step={10} onChange={setViewport} unit="px" />
        <Slider label="Line height" value={lineHeight} min={1.1} max={2} step={0.05} onChange={setLineHeight} />
        <Slider label="Max measure" value={measure} min={40} max={100} onChange={setMeasure} unit="ch" />
      </div>
      <div tabIndex={0} role="group" aria-label="Type preview at the chosen viewport width" className="overflow-x-auto rounded-sm border border-rule bg-sunken p-4">
        <div className="mx-auto bg-surface p-6 shadow-raise" style={{ width: viewport, maxWidth: "100%" }}>
          <div className="font-serif" style={{ maxWidth: `${measure}ch` }}>
            <p style={{ fontSize: size(4), lineHeight: 1.1 }}>Designing for reading</p>
            <p className="mt-3" style={{ fontSize: size(2), lineHeight: 1.25 }}>
              Scale, measure and rhythm
            </p>
            <p className="mt-4" style={{ fontSize: base, lineHeight }}>
              A type scale relates every size to every other by a constant ratio, so hierarchy feels deliberate rather than accidental. Line length — the measure — matters as much: lines that are too long make
              it hard to find the start of the next one; lines that are too short break the rhythm of reading.
            </p>
            <p className="mt-3 text-ink-2" style={{ fontSize: size(-1), lineHeight: 1.4 }}>
              Caption at step −1 · {size(-1).toFixed(1)}px
            </p>
          </div>
        </div>
      </div>
      <p className={`text-sm ${chars < 45 || chars > 80 ? "text-warn" : "text-ink-2"}`}>
        ≈ {chars} characters per line at this viewport. Typographic convention favours roughly 45–75 for continuous reading (Bringhurst); it is guidance, not a measured optimum.
      </p>
      <details className="rounded-sm border border-rule p-4">
        <summary className="cursor-pointer text-sm font-medium">Fluid CSS for this scale ({fluidMin}–{fluidMax}px viewports)</summary>
        <pre tabIndex={0} className="formula mt-3 overflow-x-auto text-xs leading-relaxed text-ink-2">
          {[4, 3, 2, 1].map((i) => `--step-${i}: ${clamp(i)};`).join("\n")}
          {`\n--step-0: ${(base / 16).toFixed(3)}rem;`}
        </pre>
        <p className="mt-2 text-xs text-ink-3">Each step shrinks to 78% of its size at the smallest viewport (never below the base) and reaches the full scale at the largest.</p>
      </details>
    </div>
  );
}
