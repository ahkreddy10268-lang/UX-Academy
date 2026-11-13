/**
 * Colour Studio mathematics: HSL conversion, hue harmonies, contrast reports,
 * exports, gradients and image quantisation. Pure functions; the UI never
 * computes colour itself. Hex parsing, sRGB → luminance and the WCAG contrast
 * ratio live in ./visual and are reused here, not reimplemented.
 *
 * Colour model: opaque sRGB, 8 bits per channel. HSL is a cylindrical
 * re-arrangement of RGB; equal hue angles are a *mathematical* relationship,
 * not equal perceived differences, and HSL lightness is not perceived
 * lightness (yellow and blue at the same L differ greatly in luminance).
 */
import { FormulaInputError } from "./math";
import { contrastRatio, parseHex, relativeLuminance, toHex, type RGB } from "./visual";

export type HSL = { h: number; s: number; l: number }; // h in degrees [0, 360), s and l in percent [0, 100]

/* ---------------- parsing and conversion ---------------- */

/** Validate a user-entered colour. Accepts #rgb, #rrggbb, rgb and rrggbb; returns lower-case #rrggbb. */
export function normaliseHex(input: string): { ok: true; hex: string } | { ok: false; error: string } {
  const raw = input.trim();
  if (!raw) return { ok: false, error: "Enter a colour, for example #2a9d8f." };
  if (!/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(raw)) return { ok: false, error: `“${raw}” is not a hex colour. Use 3 or 6 hex digits, for example #2a9d8f.` };
  return { ok: true, hex: toHex(parseHex(raw)) };
}

/** Wrap any finite angle into [0, 360). */
export function wrapHue(h: number): number {
  if (!Number.isFinite(h)) throw new FormulaInputError("Hue must be a number.");
  const w = ((h % 360) + 360) % 360;
  return w === 360 ? 0 : w;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** sRGB (8-bit) → HSL. Hue is 0 for greys. */
export function rgbToHsl({ r, g, b }: RGB): HSL {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d > 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === R) h = 60 * (((G - B) / d) % 6);
    else if (max === G) h = 60 * ((B - R) / d + 2);
    else h = 60 * ((R - G) / d + 4);
  }
  return { h: wrapHue(h), s: s * 100, l: l * 100 };
}

/** HSL → sRGB (8-bit, rounded). Saturation and lightness are clamped to [0, 100]. */
export function hslToRgb({ h, s, l }: HSL): RGB {
  if (![h, s, l].every(Number.isFinite)) throw new FormulaInputError("Hue, saturation and lightness must be numbers.");
  const S = clamp(s, 0, 100) / 100;
  const L = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * L - 1)) * S;
  const hh = wrapHue(h) / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = L - c / 2;
  const [r, g, b] = hh < 1 ? [c, x, 0] : hh < 2 ? [x, c, 0] : hh < 3 ? [0, c, x] : hh < 4 ? [0, x, c] : hh < 5 ? [x, 0, c] : [c, 0, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

export const hslToHex = (c: HSL) => toHex(hslToRgb(c));
export const hexToHsl = (hex: string) => rgbToHsl(parseHex(hex));

/** Display strings for a colour, from its hex value. */
export function colourFormats(hex: string) {
  const rgb = parseHex(hex);
  const hsl = rgbToHsl(rgb);
  return {
    hex: toHex(rgb),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
    luminance: relativeLuminance(rgb),
  };
}

/* ---------------- harmonies ---------------- */

export const HARMONIES = ["complementary", "analogous", "monochromatic", "triadic", "split-complementary", "tetradic"] as const;
export type Harmony = (typeof HARMONIES)[number];

export const HARMONY_INFO: Record<Harmony, { label: string; rule: string }> = {
  complementary: { label: "Complementary", rule: "The base hue and the hue opposite it (180° apart)." },
  analogous: { label: "Analogous", rule: "Neighbouring hues: the base and hues one and two steps of the chosen spread on each side." },
  monochromatic: { label: "Monochromatic", rule: "One hue; lightness varies in even steps around the base, saturation stays the same." },
  triadic: { label: "Triadic", rule: "Three hues evenly spaced, 120° apart." },
  "split-complementary": { label: "Split-complementary", rule: "The base hue and the two hues either side of its complement (180° ± 30°)." },
  tetradic: { label: "Tetradic (square)", rule: "Four hues 90° apart: two complementary pairs." },
};

/** Hue offsets (degrees) from the base for each harmony. `spread` is the analogous step. */
export function harmonyOffsets(mode: Harmony, spread = 30): number[] {
  switch (mode) {
    case "complementary":
      return [0, 180];
    case "analogous":
      if (!Number.isFinite(spread) || spread < 5 || spread > 60) throw new FormulaInputError("Analogous spread must be between 5° and 60°.");
      return [-2 * spread, -spread, 0, spread, 2 * spread];
    case "monochromatic":
      return [0, 0, 0, 0, 0];
    case "triadic":
      return [0, 120, 240];
    case "split-complementary":
      return [0, 150, 210];
    case "tetradic":
      return [0, 90, 180, 270];
  }
}

/** Index of the base colour within a harmony's palette. */
export const baseIndex = (mode: Harmony) => (mode === "analogous" || mode === "monochromatic" ? 2 : 0);

/**
 * Generate a harmony from a base colour. Hue relations are exact angles in
 * HSL; saturation and lightness are kept from the base, except in
 * monochromatic mode, where lightness steps by `monoStep` (default 15) around
 * the base and is clamped to [5, 95].
 */
export function harmony(base: HSL, mode: Harmony, opts: { spread?: number; monoStep?: number } = {}): HSL[] {
  const b = { h: wrapHue(base.h), s: clamp(base.s, 0, 100), l: clamp(base.l, 0, 100) };
  if (mode === "monochromatic") {
    const step = opts.monoStep ?? 15;
    return [-2, -1, 0, 1, 2].map((k) => ({ h: b.h, s: b.s, l: clamp(b.l + k * step, 5, 95) }));
  }
  return harmonyOffsets(mode, opts.spread).map((o) => ({ h: wrapHue(b.h + o), s: b.s, l: b.l }));
}

/* ---------------- palette state ---------------- */

export type PaletteState = {
  base: HSL;
  mode: Harmony;
  spread: number;
  /** A palette that does not come from a harmony (image extraction, import). Overrides the harmony. */
  custom: string[] | null;
  /** Individually edited colours by index; kept until restored. */
  overrides: Record<number, string>;
};

export const DEFAULT_PALETTE: PaletteState = { base: { h: 190, s: 45, l: 32 }, mode: "analogous", spread: 30, custom: null, overrides: {} };

/** The generated colours before individual edits. */
export function generatedColours(p: PaletteState): string[] {
  return p.custom ? [...p.custom] : harmony(p.base, p.mode, { spread: p.spread }).map(hslToHex);
}

/** The palette as shown: generated colours with individual edits applied. */
export function paletteColours(p: PaletteState): string[] {
  return generatedColours(p).map((c, i) => p.overrides[i] ?? c);
}

/** Edit one colour; other colours are untouched. Invalid input throws and leaves the state unchanged. */
export function editColour(p: PaletteState, index: number, input: string): PaletteState {
  const n = normaliseHex(input);
  if (!n.ok) throw new FormulaInputError(n.error);
  const count = generatedColours(p).length;
  if (!Number.isInteger(index) || index < 0 || index >= count) throw new FormulaInputError(`There is no colour ${index + 1} in this palette.`);
  return { ...p, overrides: { ...p.overrides, [index]: n.hex } };
}

/** Change base, harmony or spread. Edits are kept only where their index still exists. */
export function regenerate(p: PaletteState, change: Partial<Pick<PaletteState, "base" | "mode" | "spread">>): PaletteState {
  const next: PaletteState = { ...p, ...change, custom: null };
  const count = generatedColours(next).length;
  const overrides = Object.fromEntries(Object.entries(p.custom ? {} : p.overrides).filter(([k]) => Number(k) < count));
  return { ...next, overrides };
}

/* ---------------- contrast ---------------- */

export type ContrastCheck = { id: string; label: string; level: "AA" | "AAA"; threshold: number; pass: boolean; criterion: string };

/**
 * Contrast of a foreground on a background against WCAG 2.2. The ratio is
 * compared unrounded; `display` is truncated (not rounded) to two decimals,
 * so a failing 4.499:1 is never shown as 4.50:1.
 */
export function contrastReport(foreground: string, background: string) {
  const ratio = contrastRatio(parseHex(foreground), parseHex(background));
  const display = `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;
  const checks: ContrastCheck[] = [
    { id: "text-aa", label: "Normal text", level: "AA", threshold: 4.5, pass: ratio >= 4.5, criterion: "1.4.3 Contrast (Minimum)" },
    { id: "text-aaa", label: "Normal text", level: "AAA", threshold: 7, pass: ratio >= 7, criterion: "1.4.6 Contrast (Enhanced)" },
    { id: "large-aa", label: "Large text", level: "AA", threshold: 3, pass: ratio >= 3, criterion: "1.4.3 Contrast (Minimum)" },
    { id: "large-aaa", label: "Large text", level: "AAA", threshold: 4.5, pass: ratio >= 4.5, criterion: "1.4.6 Contrast (Enhanced)" },
    { id: "non-text-aa", label: "UI components and graphics", level: "AA", threshold: 3, pass: ratio >= 3, criterion: "1.4.11 Non-text Contrast" },
  ];
  return { ratio, display, checks };
}

/** Every pair of distinct palette colours with its contrast ratio, highest first. */
export function pairContrasts(colours: string[]) {
  const out: { a: number; b: number; ratio: number }[] = [];
  for (let i = 0; i < colours.length; i++) for (let j = i + 1; j < colours.length; j++) out.push({ a: i, b: j, ratio: contrastRatio(colours[i], colours[j]) });
  return out.sort((x, y) => y.ratio - x.ratio);
}

/* ---------------- roles and exports ---------------- */

export const ROLES = ["primary", "on-primary", "secondary", "accent", "background", "surface", "heading", "text"] as const;
export type Role = (typeof ROLES)[number];
export const ROLE_LABEL: Record<Role, string> = {
  primary: "Primary action",
  "on-primary": "Text on primary",
  secondary: "Secondary action",
  accent: "Accent",
  background: "Page background",
  surface: "Surface (cards)",
  heading: "Headings",
  text: "Body text",
};

export function cssVariables(colours: string[], roles?: Partial<Record<Role, string>>): string {
  const lines = colours.map((c, i) => `  --palette-${i + 1}: ${toHex(parseHex(c))};`);
  if (roles) for (const r of ROLES) if (roles[r]) lines.push(`  --color-${r}: ${toHex(parseHex(roles[r]!))};`);
  return `:root {\n${lines.join("\n")}\n}\n`;
}

export function paletteJson(p: PaletteState, roles?: Partial<Record<Role, string>>): string {
  const colours = paletteColours(p).map((hex) => {
    const f = colourFormats(hex);
    const rgb = parseHex(hex);
    const hsl = rgbToHsl(rgb);
    return { hex: f.hex, rgb: [rgb.r, rgb.g, rgb.b], hsl: [Math.round(hsl.h), Math.round(hsl.s), Math.round(hsl.l)] };
  });
  return JSON.stringify(
    {
      format: "ux-academy-colour-studio",
      version: 1,
      source: p.custom ? "custom" : "harmony",
      harmony: p.custom ? null : { mode: p.mode, base: hslToHex(p.base), spread: p.mode === "analogous" ? p.spread : undefined },
      colours,
      roles: roles ?? {},
    },
    null,
    2,
  );
}

/** Read a palette exported by paletteJson. Throws with a readable message on anything else. */
export function parsePaletteJson(text: string): { colours: string[]; roles: Partial<Record<Role, string>> } {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new FormulaInputError("This file is not valid JSON.");
  }
  const d = data as { format?: unknown; colours?: unknown; roles?: unknown };
  if (d?.format !== "ux-academy-colour-studio" || !Array.isArray(d.colours) || d.colours.length < 1 || d.colours.length > 12) throw new FormulaInputError("This file is not a Colour Studio palette.");
  const colours = d.colours.map((c: unknown) => {
    const n = normaliseHex(typeof c === "string" ? c : String((c as { hex?: unknown })?.hex ?? ""));
    if (!n.ok) throw new FormulaInputError("The palette contains an invalid colour.");
    return n.hex;
  });
  const roles: Partial<Record<Role, string>> = {};
  if (d.roles && typeof d.roles === "object")
    for (const r of ROLES) {
      const v = (d.roles as Record<string, unknown>)[r];
      if (typeof v === "string") {
        const n = normaliseHex(v);
        if (n.ok) roles[r] = n.hex;
      }
    }
  return { colours, roles };
}

/* ---------------- gradients ---------------- */

export type GradientStop = { colour: string; position: number }; // position in percent [0, 100]

/** CSS linear-gradient for the stops (sorted by position) and angle (degrees, CSS convention: 0deg = to top, 90deg = to right). */
export function gradientCss(stops: GradientStop[], angle: number): string {
  if (stops.length < 2) throw new FormulaInputError("A gradient needs at least two colour stops.");
  if (!Number.isFinite(angle)) throw new FormulaInputError("The angle must be a number.");
  const parts = [...stops]
    .sort((a, b) => a.position - b.position)
    .map((s) => {
      if (!Number.isFinite(s.position) || s.position < 0 || s.position > 100) throw new FormulaInputError("Stop positions must be between 0% and 100%.");
      return `${toHex(parseHex(s.colour))} ${Math.round(s.position * 10) / 10}%`;
    });
  return `linear-gradient(${Math.round(wrapHue(angle))}deg, ${parts.join(", ")})`;
}

export function gradientJson(stops: GradientStop[], angle: number): string {
  return JSON.stringify(
    { format: "ux-academy-gradient", version: 1, type: "linear", angle: Math.round(wrapHue(angle)), stops: [...stops].sort((a, b) => a.position - b.position).map((s) => ({ colour: toHex(parseHex(s.colour)), position: s.position })), css: gradientCss(stops, angle) },
    null,
    2,
  );
}

/* ---------------- image quantisation (median cut) ---------------- */

/**
 * Median cut (Heckbert 1982): repeatedly split the box of pixels with the
 * widest channel range at that channel's median until there are `k` boxes;
 * each box's mean colour is one palette colour, ordered by how many pixels it
 * represents. Deterministic for a given input.
 * `pixels` is RGBA bytes (as from ImageData); pixels with alpha < 128 are ignored.
 */
export function medianCut(pixels: ArrayLike<number>, k: number): { hex: string; share: number }[] {
  if (!Number.isInteger(k) || k < 1 || k > 16) throw new FormulaInputError("Choose between 1 and 16 colours.");
  if (pixels.length % 4 !== 0) throw new FormulaInputError("Pixel data must be RGBA.");
  const px: [number, number, number][] = [];
  for (let i = 0; i < pixels.length; i += 4) if (pixels[i + 3] >= 128) px.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
  if (px.length === 0) throw new FormulaInputError("The image has no opaque pixels to sample.");
  type Box = [number, number, number][];
  const range = (box: Box, c: 0 | 1 | 2) => {
    let lo = 255;
    let hi = 0;
    for (const p of box) {
      if (p[c] < lo) lo = p[c];
      if (p[c] > hi) hi = p[c];
    }
    return hi - lo;
  };
  const widest = (box: Box): { c: 0 | 1 | 2; r: number } => {
    const rs = [range(box, 0), range(box, 1), range(box, 2)];
    const c = (rs[0] >= rs[1] && rs[0] >= rs[2] ? 0 : rs[1] >= rs[2] ? 1 : 2) as 0 | 1 | 2;
    return { c, r: rs[c] };
  };
  const boxes: Box[] = [px];
  while (boxes.length < k) {
    let best = -1;
    let bestR = 0;
    boxes.forEach((b, i) => {
      if (b.length < 2) return;
      const { r } = widest(b);
      if (r > bestR) {
        bestR = r;
        best = i;
      }
    });
    if (best < 0) break; // every box is a single colour: fewer distinct colours than k
    const box = boxes[best];
    const { c } = widest(box);
    box.sort((a, b) => a[c] - b[c] || a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
    // Split at the median *value*, keeping equal values together, so one dominant colour is
    // never divided between two boxes (an index split averages it with its neighbours).
    const v = box[Math.floor(box.length / 2)][c];
    let cut = box.findIndex((p) => p[c] >= v);
    if (cut <= 0) cut = box.findIndex((p) => p[c] > v);
    if (cut <= 0) cut = Math.floor(box.length / 2);
    boxes.splice(best, 1, box.slice(0, cut), box.slice(cut));
  }
  return boxes
    .map((b) => {
      const sum = b.reduce((s, p) => [s[0] + p[0], s[1] + p[1], s[2] + p[2]], [0, 0, 0]);
      return { hex: toHex({ r: sum[0] / b.length, g: sum[1] / b.length, b: sum[2] / b.length }), share: b.length / px.length };
    })
    .sort((a, b) => b.share - a.share || a.hex.localeCompare(b.hex));
}

/** Dimensions that fit inside `max` on the longest side, never upscaling. */
export function fitWithin(width: number, height: number, max: number): { width: number; height: number } {
  if (!(width > 0 && height > 0)) throw new FormulaInputError("The image has no size.");
  const s = Math.min(1, max / Math.max(width, height));
  return { width: Math.max(1, Math.round(width * s)), height: Math.max(1, Math.round(height * s)) };
}
