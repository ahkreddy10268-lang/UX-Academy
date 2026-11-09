"use client";
/**
 * Colour-vision-deficiency simulation lab. Every simulated colour comes from
 * lib/formulas/colour-vision.ts (Machado et al. 2009, severity 1.0) and every
 * ratio from lib/formulas/visual.ts. It is a simulation: it approximates
 * dichromacy on a standard sRGB display and measures nobody.
 */
import { useId, useState } from "react";
import { CVD_LABEL, deltaE76, simulateCvd, type CvdType } from "@/lib/formulas/colour-vision";
import { contrastRatio, parseHex } from "@/lib/formulas/visual";

const TYPES: CvdType[] = ["protanopia", "deuteranopia", "tritanopia"];
const DEFAULT = [
  { hex: "#2e7d32", label: "Success" },
  { hex: "#c62828", label: "Error" },
  { hex: "#f9a825", label: "Warning" },
  { hex: "#1565c0", label: "Info" },
];

const valid = (h: string) => {
  try {
    parseHex(h);
    return true;
  } catch {
    return false;
  }
};

export function CvdLab() {
  const [palette, setPalette] = useState(DEFAULT);
  const [fg, setFg] = useState("#1f2532");
  const [bg, setBg] = useState("#ffffff");
  const ids = useId();
  const ok = palette.filter((p) => valid(p.hex));
  const textOk = valid(fg) && valid(bg);
  const views: { key: string; name: string; map: (h: string) => string }[] = [
    { key: "normal", name: "Typical colour vision", map: (h) => h },
    ...TYPES.map((t) => ({ key: t, name: CVD_LABEL[t], map: (h: string) => simulateCvd(h, t) })),
  ];

  function closest(map: (h: string) => string) {
    let best: { a: string; b: string; dE: number } | undefined;
    for (let i = 0; i < ok.length; i++)
      for (let j = i + 1; j < ok.length; j++) {
        const dE = deltaE76(map(ok[i].hex), map(ok[j].hex));
        if (!best || dE < best.dE) best = { a: ok[i].label, b: ok[j].label, dE };
      }
    return best;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <fieldset className="rounded-xl border border-rule bg-surface p-5 shadow-card">
          <legend className="sr-only">Your colours</legend>
          <p className="t-sub text-base">Your palette</p>
          <p className="mt-1 text-sm text-ink-2">Enter the colours of a chart, status set or brand palette.</p>
          <ul className="mt-4 space-y-3">
            {palette.map((p, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1fr)] items-center gap-2">
                <input
                  type="color"
                  aria-label={`${p.label} colour picker`}
                  value={valid(p.hex) ? p.hex : "#000000"}
                  onChange={(e) => setPalette((ps) => ps.map((x, k) => (k === i ? { ...x, hex: e.target.value } : x)))}
                  className="h-10 w-10 cursor-pointer rounded-sm border border-line-control bg-surface"
                />
                <input
                  aria-label={`Name of colour ${i + 1}`}
                  value={p.label}
                  onChange={(e) => setPalette((ps) => ps.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)))}
                  className="field min-w-0"
                />
                <input
                  aria-label={`Hex value of ${p.label}`}
                  value={p.hex}
                  aria-invalid={!valid(p.hex)}
                  onChange={(e) => setPalette((ps) => ps.map((x, k) => (k === i ? { ...x, hex: e.target.value } : x)))}
                  className="field formula min-w-0 aria-[invalid=true]:border-warn"
                />
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <button type="button" disabled={palette.length >= 6} onClick={() => setPalette((ps) => [...ps, { hex: "#6a1b9a", label: `Colour ${ps.length + 1}` }])} className="btn btn-secondary btn-sm">
              Add colour
            </button>
            <button type="button" onClick={() => { setPalette(DEFAULT); setFg("#1f2532"); setBg("#ffffff"); }} className="h-9 rounded-sm px-3 text-sm text-ink-2 hover:bg-sunken">
              Reset
            </button>
          </div>
          <p className="t-sub mt-6 text-base">Text pair</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(
              [
                ["Text", fg, setFg],
                ["Background", bg, setBg],
              ] as const
            ).map(([label, v, set]) => (
              <div key={label}>
                <label htmlFor={`${ids}-${label}`} className="text-xs font-medium text-ink-2">
                  {label}
                </label>
                <input id={`${ids}-${label}`} value={v} aria-invalid={!valid(v)} onChange={(e) => set(e.target.value)} className="field formula mt-1 w-full aria-[invalid=true]:border-warn" />
              </div>
            ))}
          </div>
        </fieldset>

        <div className="min-w-0 space-y-3" aria-live="polite">
          {views.map((v) => {
            const pair = closest(v.map);
            const ratio = textOk ? contrastRatio(v.map(fg), v.map(bg)) : NaN;
            return (
              <section key={v.key} aria-label={v.name} className="rounded-xl border border-rule bg-surface p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="t-sub text-sm">{v.name}</h3>
                  {pair && (
                    <p className="text-xs text-ink-2">
                      Most alike: {pair.a} / {pair.b} · <span className="formula">ΔE*ab {pair.dE.toFixed(1)}</span>
                    </p>
                  )}
                </div>
                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 2xl:grid-cols-6">
                  {ok.map((p) => {
                    const c = v.map(p.hex);
                    return (
                      <li key={p.label + p.hex} className="overflow-hidden rounded-md ring-1 ring-rule">
                        <span aria-hidden className="block h-12" style={{ background: c }} />
                        <span className="block px-2 py-1.5 text-xs">
                          <span className="block truncate font-medium text-ink">{p.label}</span>
                          <span className="formula block text-ink-3">{c}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {textOk && (
                  <p className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-sm px-3 py-1.5 ring-1 ring-rule" style={{ color: v.map(fg), background: v.map(bg) }}>
                      Sample text Aa
                    </span>
                    <span className="formula text-ink-2">{ratio.toFixed(2)}:1</span>
                    <span className="text-xs text-ink-3">{ratio >= 4.5 ? "meets 4.5:1 for body text" : ratio >= 3 ? "meets 3:1 for large text only" : "below 3:1"}</span>
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg bg-soft p-5 text-sm text-ink-2 ring-1 ring-rule">
        <p className="t-sub text-ink">Interpreting the simulation</p>
        <p className="mt-2">
          Luminance contrast barely changes under dichromacy — the matrices preserve neutrals and mostly redistribute hue — which is why the text
          pair&apos;s WCAG ratio holds up while red/green <em>hue</em> distinctions collapse. “Most alike” is the pair with the smallest CIE 1976 colour
          difference (ΔE*ab) in each view: compare it with the typical-vision row. A pair that falls close together under a simulation needs a second
          cue — a label, shape, position or pattern (WCAG 1.4.1 Use of Color). ΔE*ab is a simple measure and is not perceptually uniform for large
          differences. This approximates full dichromacy on a standard display; anomalous trichromacy is milder and far more common, and real perception
          varies with the screen, light and person.
        </p>
      </div>
    </div>
  );
}
