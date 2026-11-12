"use client";

import { useId, useMemo, useState } from "react";
import {
  PRIMITIVES,
  PRIMITIVE_NAMES,
  ROLES,
  THEME_IDS,
  THEMES,
  THRESHOLDS,
  checkPairs,
  resolveTheme,
  toCss,
  toDtcg,
  toTailwind,
  type Mapping,
  type Palette,
  type PrimitiveName,
  type Role,
  type ThemeId,
} from "@/lib/formulas/tokens";

const THEME_LABEL: Record<ThemeId, string> = { light: "Light", dark: "Dark", "high-contrast": "High contrast" };
const FORMATS = [
  { id: "dtcg", label: "DTCG JSON" },
  { id: "css", label: "CSS variables" },
  { id: "tailwind", label: "Tailwind v4" },
] as const;
type Format = (typeof FORMATS)[number]["id"];
const HEX = /^#[0-9a-fA-F]{6}$/;

const cloneThemes = (): Record<ThemeId, Mapping> => ({ light: { ...THEMES.light }, dark: { ...THEMES.dark }, "high-contrast": { ...THEMES["high-contrast"] } });

/**
 * Design Token Lab: switch themes, remap roles to primitives, edit a primitive's
 * value and see the preview, the contrast of every documented pair and the
 * exported token files update together. Contrast is computed with lib/formulas.
 */
export function TokenLab() {
  const id = useId();
  const [theme, setTheme] = useState<ThemeId>("light");
  const [mappings, setMappings] = useState(cloneThemes);
  const [palette, setPalette] = useState<Palette>({ ...PRIMITIVES });
  const [editing, setEditing] = useState<PrimitiveName>("blue.600");
  const [draft, setDraft] = useState<string>(PRIMITIVES["blue.600"]);
  const [format, setFormat] = useState<Format>("dtcg");
  const [copied, setCopied] = useState("");

  const mapping = mappings[theme];
  const resolved = useMemo(() => resolveTheme(mapping, palette), [mapping, palette]);
  const results = useMemo(() => checkPairs(resolved, THRESHOLDS[theme]), [resolved, theme]);
  const passing = results.filter((r) => r.pass).length;
  const exported = useMemo(() => {
    if (format === "dtcg") return toDtcg(mapping, palette);
    if (format === "css") return toCss(resolved, theme === "light" ? ':root,\n[data-theme="light"]' : `[data-theme="${theme}"]`);
    return `/* Role variables per theme (see the CSS tab), exposed to Tailwind as utilities */\n${toTailwind()}`;
  }, [format, mapping, palette, resolved, theme]);

  const v = (r: Role) => resolved[r];
  const setRole = (role: Role, prim: PrimitiveName) => setMappings((m) => ({ ...m, [theme]: { ...m[theme], [role]: prim } }));
  const applyDraft = (value: string) => {
    setDraft(value);
    if (HEX.test(value)) setPalette((p) => ({ ...p, [editing]: value.toLowerCase() }));
  };
  const reset = () => {
    setMappings(cloneThemes());
    setPalette({ ...PRIMITIVES });
    setDraft(PRIMITIVES[editing]);
  };
  const breakIt = () => {
    setTheme("dark");
    setMappings((m) => ({ ...m, dark: { ...m.dark, "text.subtle": "grey.700", "action.background": "blue.600" } }));
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(exported);
      setCopied(`Copied ${FORMATS.find((f) => f.id === format)!.label}.`);
    } catch {
      setCopied("Copy is not available here; select the text instead.");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_minmax(0,1fr)]">
      <div className="min-w-0 space-y-6">
        <fieldset>
          <legend className="text-sm font-medium">Theme</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {THEME_IDS.map((t) => (
              <button key={t} type="button" aria-pressed={theme === t} onClick={() => setTheme(t)} className="chip h-9 hover:border-rule-strong hover:text-ink">
                {THEME_LABEL[t]}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-3">
            Target: text {THRESHOLDS[theme].text}:1{theme === "high-contrast" ? " (WCAG 2.2 SC 1.4.6, AAA)" : " (SC 1.4.3, AA)"}; non-text {THRESHOLDS[theme].nonText}:1 (SC 1.4.11, AA).
          </p>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium">Edit a primitive</legend>
          <label htmlFor={`${id}-prim`} className="mt-2 block text-xs text-ink-2">
            Primitive
          </label>
          <select
            id={`${id}-prim`}
            className="field mt-1 w-full"
            value={editing}
            onChange={(e) => {
              const n = e.target.value as PrimitiveName;
              setEditing(n);
              setDraft(palette[n]);
            }}
          >
            {PRIMITIVE_NAMES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <div className="mt-2 flex gap-2">
            <input aria-label={`${editing} colour picker`} type="color" value={palette[editing]} onChange={(e) => applyDraft(e.target.value)} className="h-10 w-12 shrink-0 rounded-xs border border-line-control" />
            <input id={`${id}-hex`} aria-label={`${editing} hex value`} value={draft} onChange={(e) => applyDraft(e.target.value.trim())} className="field formula min-w-0 flex-1" />
          </div>
          {!HEX.test(draft) && (
            <p role="alert" className="mt-1 text-xs text-error">
              Enter a colour as #rrggbb.
            </p>
          )}
          <p className="mt-2 text-xs text-ink-3">Every role mapped to {editing} changes in every theme that uses it — the reason a primitive should never be edited to fix one theme.</p>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium">Map roles to primitives ({THEME_LABEL[theme]})</legend>
          <div className="mt-2 divide-y divide-rule rounded-sm border border-rule">
            {ROLES.map((r) => (
              <div key={r} className="flex items-center gap-2 px-3 py-2">
                <span aria-hidden className="h-4 w-4 shrink-0 rounded-xs border border-rule-strong" style={{ background: v(r) }} />
                <label htmlFor={`${id}-${r}`} className="formula min-w-0 flex-1 truncate text-xs">
                  {r}
                </label>
                <select id={`${id}-${r}`} className="field formula h-9 w-32 text-xs" value={mapping[r]} onChange={(e) => setRole(r, e.target.value as PrimitiveName)}>
                  {PRIMITIVE_NAMES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={breakIt}>
            Show a broken dark mapping
          </button>
          <button type="button" className="btn btn-tertiary btn-sm" onClick={reset}>
            Reset all
          </button>
        </div>
      </div>

      <div className="min-w-0 space-y-8">
        <p role="status" className="text-sm text-ink-2">
          {THEME_LABEL[theme]} theme: {passing} of {results.length} pairs pass.
        </p>

        <section aria-label="Component preview" className="rounded-md border border-rule p-5" style={{ background: v("surface.default") }}>
          <div className="rounded-md p-4" style={{ background: v("surface.raised"), color: v("text.default") }}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-lg font-semibold">Middlemarch</p>
              <span className="rounded-full border px-2 py-0.5 text-xs" style={{ borderColor: v("border.control"), color: v("text.default") }}>
                Due Friday
              </span>
            </div>
            <p className="mt-1 text-sm" style={{ color: v("text.subtle") }}>
              George Eliot · renewed once
            </p>
            <label className="mt-4 block text-sm" htmlFor={`${id}-preview-input`}>
              Renew until
            </label>
            <input
              id={`${id}-preview-input`}
              defaultValue="26 Nov"
              className="mt-1 h-10 w-full max-w-60 rounded-sm border-2 px-2 text-sm"
              style={{ borderColor: v("border.control"), background: v("surface.default"), color: v("text.default") }}
            />
            <p className="mt-2 text-sm" style={{ color: v("text.danger") }}>
              <span aria-hidden>⚠ </span>
              <span className="font-medium">Error:</span> this book has a hold and cannot be renewed.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex h-10 items-center rounded-sm px-4 text-sm font-semibold" style={{ background: v("action.background"), color: v("action.text") }}>
                Renew
              </span>
              <span
                className="inline-flex h-10 items-center rounded-sm px-4 text-sm font-semibold"
                style={{ background: v("action.background"), color: v("action.text"), outline: `2px solid ${v("focus.ring")}`, outlineOffset: 3 }}
              >
                Renew (focused)
              </span>
            </div>
          </div>
        </section>

        <div className="overflow-x-auto rounded-md border border-rule" tabIndex={0} role="group" aria-label="Contrast of each documented pair">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead className="bg-soft">
              <tr>
                <th scope="col" className="label px-3 py-2 !text-ink-2">Pair</th>
                <th scope="col" className="label px-3 py-2 !text-ink-2">Kind</th>
                <th scope="col" className="label px-3 py-2 !text-ink-2">Ratio</th>
                <th scope="col" className="label px-3 py-2 !text-ink-2">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {results.map((p) => (
                <tr key={`${p.fg}-${p.bg}`}>
                  <td className="formula px-3 py-2 text-xs">
                    {p.fg} on {p.bg}
                  </td>
                  <td className="px-3 py-2 text-ink-2">{p.kind}</td>
                  <td className="formula px-3 py-2">
                    {p.ratio.toFixed(2)}:1 <span className="text-ink-3">/ {p.min}</span>
                  </td>
                  <td className={`px-3 py-2 font-medium ${p.pass ? "text-ok" : "text-error"}`}>{p.pass ? "✓ Pass" : "✕ Fail"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div role="group" aria-label="Export format" className="flex flex-wrap items-center gap-1.5">
            {FORMATS.map((f) => (
              <button key={f.id} type="button" aria-pressed={format === f.id} onClick={() => setFormat(f.id)} className="chip h-9 hover:border-rule-strong hover:text-ink">
                {f.label}
              </button>
            ))}
            <button type="button" className="btn btn-secondary btn-sm ml-auto" onClick={copy}>
              Copy
            </button>
          </div>
          <p role="status" className="mt-1 min-h-5 text-xs text-ink-3">
            {copied}
          </p>
          <pre tabIndex={0} aria-label={`Exported tokens, ${FORMATS.find((f) => f.id === format)!.label}`} className="formula mt-2 max-h-96 overflow-auto rounded-md border border-rule bg-soft p-4 text-xs leading-relaxed text-ink">
            <code>{exported}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
