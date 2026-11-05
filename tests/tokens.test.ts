/**
 * Design-token contrast gate. Parses app/globals.css (the single token source)
 * and checks every text and control token against every surface and pastel wash
 * it can sit on, in both themes. Dark washes are color-mix() expressions, so
 * they are resolved here with the same sRGB mix the browser uses.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { contrastRatio } from "../lib/formulas/visual";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

function block(selectorStart: string): Record<string, string> {
  const i = css.indexOf(selectorStart);
  if (i < 0) throw new Error(`token block not found: ${selectorStart}`);
  const open = css.indexOf("{", i);
  const close = css.indexOf("}", open);
  const out: Record<string, string> = {};
  for (const m of css.slice(open + 1, close).matchAll(/--([\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
function resolve(tokens: Record<string, string>, v: string): string {
  const ref = v.match(/^var\(--([\w-]+)\)$/);
  if (ref) return resolve(tokens, tokens[ref[1]]);
  const mix = v.match(/^color-mix\(in srgb, var\(--([\w-]+)\) (\d+)%, var\(--([\w-]+)\)\)$/);
  if (mix) {
    const a = hex(resolve(tokens, `var(--${mix[1]})`));
    const b = hex(resolve(tokens, `var(--${mix[3]})`));
    const p = Number(mix[2]) / 100;
    return "#" + a.map((x, i) => Math.round(x * p + b[i] * (1 - p)).toString(16).padStart(2, "0")).join("");
  }
  if (!/^#[0-9a-f]{6}$/i.test(v)) throw new Error(`unresolvable token value ${v}`);
  return v;
}

const themes = {
  light: block(":root {\n  color-scheme: light;"),
  dark: block(':root[data-theme="dark"]'),
};
const CATS = ["core", "rose", "violet", "teal", "blue", "amber", "green", "peach", "cyan", "indigo", "slate"];

describe.each(Object.entries(themes))("%s theme tokens", (_name, t) => {
  const v = (k: string) => resolve(t, `var(--${k})`);
  const surfaces = ["paper", "surface", "soft", "sunken", "accent-wash"];
  const washes = CATS.map((c) => `cat-${c}-wash`);

  it.each(["ink", "ink-2", "ink-3", "accent", "accent-ink"])("%s text ≥ 4.5:1 on every surface and wash", (tok) => {
    for (const bg of [...surfaces, ...washes]) expect(contrastRatio(v(tok), v(bg)), `${tok} on ${bg}`).toBeGreaterThanOrEqual(4.5);
  });
  it.each(["ok", "warn", "info", "error", "evidence", "planned", "published"])("semantic %s ≥ 4.5:1 on base surfaces and its own wash", (tok) => {
    const washes: Record<string, string> = { ok: "ok-wash", warn: "warn-wash", info: "info-wash", error: "error-wash", evidence: "evidence-wash" };
    for (const bg of ["paper", "surface", "soft", "sunken", ...(washes[tok] ? [washes[tok]] : [])]) expect(contrastRatio(v(tok), v(bg)), `${tok} on ${bg}`).toBeGreaterThanOrEqual(4.5);
  });
  // Planned cards always also say "planned" in text, so the dashed outline is a redundant cue (not WCAG 1.4.11 essential); it must still be clearly visible.
  it("planned dashed outlines stay visible (≥ 2.2:1) on the surfaces they sit on", () => {
    for (const bg of ["surface", "soft"]) expect(contrastRatio(v("planned-line"), v(bg)), bg).toBeGreaterThanOrEqual(2.2);
  });
  it("rubric ≥ 4.5:1 on base surfaces", () => {
    for (const bg of ["paper", "surface", "soft", "sunken"]) expect(contrastRatio(v("rubric"), v(bg)), bg).toBeGreaterThanOrEqual(4.5);
  });
  it("control borders ≥ 3:1 on base surfaces (WCAG 1.4.11)", () => {
    for (const bg of ["paper", "surface", "soft", "sunken"]) expect(contrastRatio(v("line-control"), v(bg)), bg).toBeGreaterThanOrEqual(3);
  });
  it.each(CATS)("cat-%s ink ≥ 4.5:1 on its wash and on the surface", (c) => {
    expect(contrastRatio(v(`cat-${c}-ink`), v(`cat-${c}-wash`))).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(v(`cat-${c}-ink`), v("surface"))).toBeGreaterThanOrEqual(4.5);
  });
  it("text on the action colour ≥ 4.5:1", () => {
    const onAccent = _name === "light" ? v("surface") : v("paper");
    expect(contrastRatio(onAccent, v("accent"))).toBeGreaterThanOrEqual(4.5);
  });
});

describe("theme parity", () => {
  it("dark theme defines every light colour token", () => {
    const missing = Object.keys(themes.light).filter((k) => !(k in themes.dark) && !k.startsWith("grad-"));
    expect(missing).toEqual([]);
  });
  it("the media-query dark block matches the explicit dark block", () => {
    const media = block(':root:not([data-theme="light"])');
    expect(media).toEqual(themes.dark);
  });
});

describe("visualisation canvas tokens (theme-independent, D-086)", () => {
  const viz = block(":root {\n  /* Visualisation canvas */");
  const v = (k: string) => resolve(viz, `var(--${k})`);
  const surfaces = ["viz-bg", "viz-surface-1", "viz-surface-2", "viz-surface-3"];
  it.each(["viz-text", "viz-text-2", "viz-text-3"])("%s ≥ 4.5:1 on every viz surface", (tok) => {
    for (const bg of surfaces) expect(contrastRatio(v(tok), v(bg)), `${tok} on ${bg}`).toBeGreaterThanOrEqual(4.5);
  });
  it.each(["viz-accent", "viz-positive", "viz-warning"])("%s ≥ 4.5:1 on every viz surface (used for labels)", (tok) => {
    for (const bg of surfaces) expect(contrastRatio(v(tok), v(bg)), `${tok} on ${bg}`).toBeGreaterThanOrEqual(4.5);
  });
  it("structural edges stay visible (≥ 3:1 for the bright edge on the canvas)", () => {
    expect(contrastRatio(v("viz-edge-hi"), v("viz-bg"))).toBeGreaterThanOrEqual(3);
  });
  it("is not redefined by the dark theme (one canvas in both themes)", () => {
    expect(Object.keys(themes.dark).filter((k) => k.startsWith("viz-"))).toEqual([]);
  });
});
