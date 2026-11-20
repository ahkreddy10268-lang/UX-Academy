"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { CVD_LABEL, simulateCvd, type CvdType } from "@/lib/formulas/colour-vision";
import {
  HARMONIES,
  HARMONY_INFO,
  baseIndex,
  colourFormats,
  editColour,
  generatedColours,
  hexToHsl,
  hslToHex,
  paletteColours,
  regenerate,
  type Harmony,
  type PaletteState,
} from "@/lib/formulas/colour";
import { ColourWheel } from "./colour-wheel";
import { ColourField, CopyButton, Note, useAnnounce } from "./shared";

function Slider({ label, value, min, max, unit, onChange }: { label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)_4.5rem] items-center gap-3">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input id={id} type="range" min={min} max={max} value={Math.round(value)} onChange={(e) => onChange(Number(e.target.value))} aria-valuetext={`${Math.round(value)}${unit}`} className="w-full accent-[var(--accent)]" />
      <input
        type="number"
        aria-label={`${label} value`}
        min={min}
        max={max}
        value={Math.round(value)}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, v)));
        }}
        className="field formula h-9 px-2 text-right"
      />
    </div>
  );
}

function Swatch({ index, hex, generated, edited, isBase, sim, onEdit, onRestore }: { index: number; hex: string; generated: string; edited: boolean; isBase: boolean; sim: string | null; onEdit: (hex: string) => void; onRestore: () => void }) {
  const f = colourFormats(hex);
  const hsl = hexToHsl(hex);
  return (
    <li className="min-w-0 overflow-hidden rounded-md border border-rule bg-surface">
      <div className="relative h-20" style={{ background: sim ?? hex }}>
        <span className="formula absolute left-2 top-2 rounded-xs bg-surface/90 px-1.5 text-xs font-semibold text-ink">
          {index + 1}
          {isBase && " · base"}
        </span>
        {sim && <span className="absolute bottom-2 left-2 rounded-xs bg-surface/90 px-1.5 text-xs text-ink">simulated</span>}
      </div>
      <div className="space-y-2 p-3">
        <ColourField label={`Colour ${index + 1}`} value={hex} onChange={onEdit} compact />
        <dl className="formula grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-1.5 text-xs text-ink-2">
          <dt className="text-ink-3">RGB</dt>
          <dd>{f.rgb.slice(4, -1).replace(/,/g, "")}</dd>
          <dt className="text-ink-3">HSL</dt>
          <dd>{`${Math.round(hsl.h)}° ${Math.round(hsl.s)}% ${Math.round(hsl.l)}%`}</dd>
          <dt className="text-ink-3">Lum.</dt>
          <dd>{f.luminance.toFixed(3)}</dd>
        </dl>
        <details className="group text-sm">
          <summary className="cursor-pointer text-ink-2 hover:text-ink">Adjust H, S, L</summary>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {(["h", "s", "l"] as const).map((k) => (
              <label key={k} className="text-xs text-ink-3">
                {k.toUpperCase()}
                <input
                  type="number"
                  min={0}
                  max={k === "h" ? 359 : 100}
                  value={Math.round(hsl[k])}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (Number.isFinite(v)) onEdit(hslToHex({ ...hsl, [k]: v }));
                  }}
                  className="field formula mt-0.5 h-8 px-1.5"
                  aria-label={`Colour ${index + 1} ${k === "h" ? "hue" : k === "s" ? "saturation" : "lightness"}`}
                />
              </label>
            ))}
          </div>
        </details>
        <div className="flex flex-wrap items-center gap-1.5">
          <CopyButton text={f.hex} what={`colour ${index + 1}, ${f.hex}`} label="Copy" className="btn btn-tertiary btn-sm" />
          {edited && (
            <button type="button" className="btn btn-tertiary btn-sm" onClick={onRestore} title={`Generated value ${generated}`}>
              Restore
            </button>
          )}
          {edited && <span className="label">Edited</span>}
        </div>
      </div>
    </li>
  );
}

export function PalettePanel({ palette, setPalette }: { palette: PaletteState; setPalette: (p: PaletteState) => void }) {
  const announce = useAnnounce();
  const helpId = useId();
  const [cvd, setCvd] = useState<CvdType | "none">("none");
  const colours = paletteColours(palette);
  const generated = generatedColours(palette);
  const bi = palette.custom ? -1 : baseIndex(palette.mode);
  const base = palette.base;

  const setBase = (b: Partial<typeof base>) => setPalette(regenerate(palette, { base: { ...base, ...b } }));
  const setMode = (m: Harmony) => {
    setPalette(regenerate(palette, { mode: m }));
    announce(`${HARMONY_INFO[m].label} harmony. ${HARMONY_INFO[m].rule}`);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        <div className="space-y-3">
          <ColourWheel base={base} colours={colours} baseIndex={bi} onBase={(hs) => setBase(hs)} describedBy={helpId} />
          <p id={helpId} className="text-center text-xs text-ink-3">
            Drag on the wheel, or focus it and use the arrow keys: left and right change hue, up and down change saturation; hold Shift for larger steps.
          </p>
        </div>
        <div className="min-w-0 space-y-5">
          <fieldset>
            <legend className="field-label">Harmony</legend>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {HARMONIES.map((m) => (
                <button key={m} type="button" aria-pressed={!palette.custom && palette.mode === m} onClick={() => setMode(m)} className="chip h-9 hover:border-rule-strong hover:text-ink">
                  {HARMONY_INFO[m].label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-ink-2">{palette.custom ? "A custom palette (from an image or a file). Choose a harmony to generate one from the base colour again." : HARMONY_INFO[palette.mode].rule}</p>
          </fieldset>
          <div className="space-y-2.5">
            <p className="field-label">Base colour</p>
            <Slider label="Hue" value={base.h} min={0} max={359} unit="°" onChange={(h) => setBase({ h })} />
            <Slider label="Saturation" value={base.s} min={0} max={100} unit="%" onChange={(s) => setBase({ s })} />
            <Slider label="Lightness" value={base.l} min={0} max={100} unit="%" onChange={(l) => setBase({ l })} />
            {!palette.custom && palette.mode === "analogous" && <Slider label="Spread" value={palette.spread} min={5} max={60} unit="°" onChange={(spread) => setPalette(regenerate(palette, { spread }))} />}
            <div className="max-w-xs">
              <ColourField label="Base as hex" value={hslToHex(base)} onChange={(hex) => setPalette(regenerate(palette, { base: hexToHsl(hex) }))} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                const next = regenerate(palette, { base: { h: Math.floor(Math.random() * 360), s: 35 + Math.floor(Math.random() * 45), l: 30 + Math.floor(Math.random() * 35) } });
                setPalette({ ...next, overrides: {} });
                announce("Generated a new base colour.");
              }}
            >
              Generate another
            </button>
            <button
              type="button"
              className="btn btn-tertiary btn-sm"
              disabled={Object.keys(palette.overrides).length === 0}
              onClick={() => {
                setPalette({ ...palette, overrides: {} });
                announce("Restored the generated colours.");
              }}
            >
              Restore generated colours
            </button>
          </div>
        </div>
      </div>

      <section aria-labelledby="cs-swatches">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="cs-swatches" className="t-sub">
            Palette · {colours.length} colours
          </h2>
          <div className="flex flex-wrap items-end gap-2">
            <label className="text-sm text-ink-2">
              <span className="field-label">Colour-vision preview</span>
              <select className="field mt-1 h-9" value={cvd} onChange={(e) => setCvd(e.target.value as CvdType | "none")}>
                <option value="none">Off</option>
                {(Object.keys(CVD_LABEL) as CvdType[]).map((t) => (
                  <option key={t} value={t}>
                    {CVD_LABEL[t]}
                  </option>
                ))}
              </select>
            </label>
            <CopyButton text={colours.join(", ")} what="all hex values" label="Copy all HEX" />
          </div>
        </div>
        {cvd !== "none" && <p className="mt-2 text-sm text-ink-2">Swatches show an approximation of dichromacy (Machado et al. 2009). It is not what any individual sees and is not proof of accessibility; values below stay the real colours.</p>}
        <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(8.25rem,1fr))] gap-3">
          {colours.map((hex, i) => (
            <Swatch
              key={i}
              index={i}
              hex={hex}
              generated={generated[i]}
              edited={palette.overrides[i] !== undefined}
              isBase={i === bi}
              sim={cvd === "none" ? null : simulateCvd(hex, cvd)}
              onEdit={(v) => setPalette(editColour(palette, i, v))}
              onRestore={() => {
                const o = { ...palette.overrides };
                delete o[i];
                setPalette({ ...palette, overrides: o });
                announce(`Colour ${i + 1} restored to ${generated[i]}.`);
              }}
            />
          ))}
        </ul>
      </section>

      <Note title="What the harmony does — and does not — guarantee">
        <p>
          Harmonies are <strong>angles on the HSL hue circle</strong>: exact, repeatable relationships. They are a starting point, not a guarantee that colours look good together or work in an interface. HSL hue steps are not equal perceived steps, and HSL lightness is not perceived lightness — compare the
          luminance of a yellow and a blue at the same L. A usable palette also needs neutrals, a clear hierarchy and enough contrast between the colours that sit on each other; check that in the preview below and in the Contrast tab. See{" "}
          <Link className="link" href="/library/colour-systems">
            Colour systems
          </Link>{" "}
          and{" "}
          <Link className="link" href="/library/visual-hierarchy">
            Visual hierarchy
          </Link>
          .
        </p>
      </Note>
    </div>
  );
}
