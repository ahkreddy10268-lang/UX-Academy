"use client";

import Link from "next/link";
import { useId } from "react";
import { contrastReport, pairContrasts } from "@/lib/formulas/colour";
import { NEUTRALS } from "./interface-preview";
import { Chip, ColourField, Note } from "./shared";

function Picker({ label, value, onChange, colours }: { label: string; value: string; onChange: (hex: string) => void; colours: string[] }) {
  const id = useId();
  return (
    <div className="min-w-0 space-y-2">
      <ColourField label={label} value={value} onChange={onChange} />
      <div>
        <label htmlFor={id} className="sr-only">
          {label} from palette or neutrals
        </label>
        <select
          id={id}
          className="field h-9 w-full"
          value=""
          onChange={(e) => {
            if (e.target.value) onChange(e.target.value);
          }}
        >
          <option value="">Choose from palette or neutrals…</option>
          {colours.map((c, i) => (
            <option key={`p${i}`} value={c}>
              Palette colour {i + 1} · {c}
            </option>
          ))}
          {NEUTRALS.map((n) => (
            <option key={n.hex} value={n.hex}>
              {n.name} · {n.hex}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function ContrastPanel({ fg, bg, setFg, setBg, colours }: { fg: string; bg: string; setFg: (v: string) => void; setBg: (v: string) => void; colours: string[] }) {
  const r = contrastReport(fg, bg);
  const pairs = pairContrasts(colours);
  const rows = [
    { title: "Text", items: r.checks.filter((c) => c.id.startsWith("text") || c.id.startsWith("large")) },
    { title: "Non-text", items: r.checks.filter((c) => c.id === "non-text-aa") },
  ];
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-end">
        <Picker label="Foreground (text or icon)" value={fg} onChange={setFg} colours={colours} />
        <button
          type="button"
          className="btn btn-secondary btn-sm justify-self-start md:mb-12"
          onClick={() => {
            setFg(bg);
            setBg(fg);
          }}
        >
          ⇄ Swap
        </button>
        <Picker label="Background" value={bg} onChange={setBg} colours={colours} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <div className="min-w-0 space-y-3 rounded-lg border border-rule-strong p-5" style={{ background: bg, color: fg }} aria-label="Contrast preview" role="group">
          <p className="text-base">Normal text, 16 px regular. Most interface copy is this size or smaller, so it needs the stricter threshold.</p>
          <p className="text-[24px] leading-tight">Large text, 24 px (18 pt) regular</p>
          <p className="text-[18.67px] font-bold leading-tight">Large text, 18.66 px (14 pt) bold</p>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <span className="inline-flex h-9 items-center rounded-md border-2 px-4 text-sm font-semibold" style={{ borderColor: fg }}>
              Outlined button
            </span>
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
              <circle cx="12" cy="12" r="9" fill="none" stroke={fg} strokeWidth="2" />
              <path d="m8 12 3 3 5-6" fill="none" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm">Icon and component boundary</span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="label">Contrast ratio</p>
          <p className="formula mt-1 text-4xl text-ink" aria-hidden>
            {r.display}
          </p>
          <p role="status" className="sr-only">
            Contrast ratio {r.display}. Normal text {r.checks[0].pass ? "passes" : "fails"} AA. Large text {r.checks[2].pass ? "passes" : "fails"} AA. Non-text {r.checks[4].pass ? "passes" : "fails"} AA.
          </p>
          <p className="mt-1 text-xs text-ink-3">Shown truncated to two decimals; pass or fail is decided on the exact value.</p>
          {rows.map((g) => (
            <table key={g.title} className="mt-3 w-full text-left text-sm">
              <caption className="label text-left">{g.title}</caption>
              <tbody className="divide-y divide-rule">
                {g.items.map((c) => (
                  <tr key={c.id}>
                    <th scope="row" className="py-1.5 pr-2 font-normal text-ink">
                      {c.label} · {c.level}
                      <span className="block text-xs text-ink-3">
                        {c.threshold}:1 · SC {c.criterion}
                      </span>
                    </th>
                    <td className={`py-1.5 text-right font-semibold ${c.pass ? "text-ok" : "text-error"}`}>
                      <span aria-hidden>{c.pass ? "✓ " : "✕ "}</span>
                      {c.pass ? "Pass" : "Fail"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
          <p className="mt-2 text-xs text-ink-3">WCAG has no AAA level for non-text contrast; 1.4.11 is an AA criterion.</p>
        </div>
      </div>

      {colours.length > 1 && (
        <section aria-labelledby="cs-pairs">
          <h2 id="cs-pairs" className="t-sub">
            Every pair in the palette
          </h2>
          <p className="mt-1 max-w-read text-sm text-ink-2">One passing pair says nothing about the others. Use the pairs that pass for text, and keep the rest for areas, borders and decoration — or adjust lightness.</p>
          <div className="relative mt-3 overflow-x-auto rounded-md border border-rule" tabIndex={0} role="region" aria-label="Contrast of every palette pair">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <thead className="bg-soft">
                <tr>
                  {["Pair", "Ratio", "Normal text AA", "Large text / UI AA", ""].map((h, i) => (
                    <th key={i} scope="col" className="label px-3 py-2 !text-ink-2">
                      {h || <span className="sr-only">Use</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {pairs.map((p) => {
                  const rep = contrastReport(colours[p.a], colours[p.b]);
                  return (
                    <tr key={`${p.a}-${p.b}`}>
                      <th scope="row" className="px-3 py-2 font-normal">
                        <span className="flex items-center gap-1.5">
                          <Chip hex={colours[p.a]} size="h-5 w-5" />
                          <Chip hex={colours[p.b]} size="h-5 w-5" />
                          <span className="formula text-xs text-ink-2">
                            {p.a + 1} & {p.b + 1}
                          </span>
                        </span>
                      </th>
                      <td className="formula px-3 py-2">{rep.display}</td>
                      <td className="px-3 py-2">{rep.checks[0].pass ? "✓ Pass" : "✕ Fail"}</td>
                      <td className="px-3 py-2">{rep.checks[2].pass ? "✓ Pass" : "✕ Fail"}</td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          className="btn btn-tertiary btn-sm"
                          onClick={() => {
                            setFg(colours[p.a]);
                            setBg(colours[p.b]);
                          }}
                          aria-label={`Check colours ${p.a + 1} and ${p.b + 1}`}
                        >
                          Check
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <Note title="Why contrast matters, and what it does not tell you">
        <p>
          Text and controls have to be distinguishable from what is behind them for people with low vision, older eyes, colour-vision differences, or a phone in sunlight. WCAG 2.2 measures this with the contrast ratio of relative luminance: 4.5:1 for normal text, 3:1 for large text (at least 18 pt, or 14 pt bold) and 3:1 for the
          parts of controls and graphics people need to see. A pass is necessary, not sufficient: it does not check size, weight, spacing, colour-only meaning, focus visibility or anything else that makes an interface accessible. Read{" "}
          <Link className="link" href="/library/colour-contrast-ratio">
            Colour contrast ratio
          </Link>
          ,{" "}
          <Link className="link" href="/library/wcag">
            WCAG
          </Link>{" "}
          and{" "}
          <Link className="link" href="/library/accessibility-concept">
            Accessibility
          </Link>
          ; the{" "}
          <Link className="link" href="/labs/cvd-lab">
            colour vision deficiency simulator
          </Link>{" "}
          shows pairs that differ only by hue.
        </p>
      </Note>
    </div>
  );
}
