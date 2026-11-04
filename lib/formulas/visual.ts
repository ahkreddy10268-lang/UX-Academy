/** Visual design mathematics: WCAG contrast, modular scales, grids. */
import { FormulaInputError, assertInteger, assertNonNegative, assertPositive } from "./math";

export type RGB = { r: number; g: number; b: number };

export function parseHex(input: string): RGB {
  const hex = input.trim().replace(/^#/, "");
  const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new FormulaInputError(`"${input}" is not a valid hex colour (use #rgb or #rrggbb).`);
  return { r: parseInt(full.slice(0, 2), 16), g: parseInt(full.slice(2, 4), 16), b: parseInt(full.slice(4, 6), 16) };
}

export function toHex({ r, g, b }: RGB): string {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

/** sRGB channel linearisation (IEC 61966-2-1 threshold 0.04045; WCAG 2.x text cites 0.03928 — identical for 8-bit input). */
function linear(channel8: number): number {
  const c = channel8 / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(rgb: RGB): number {
  return 0.2126 * linear(rgb.r) + 0.7152 * linear(rgb.g) + 0.0722 * linear(rgb.b);
}

export function contrastRatio(a: RGB | string, b: RGB | string): number {
  const la = relativeLuminance(typeof a === "string" ? parseHex(a) : a);
  const lb = relativeLuminance(typeof b === "string" ? parseHex(b) : b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/* ---------------- HSV (hue, saturation, value) ---------------- */

/**
 * HSV → sRGB (8-bit). Hue in degrees [0, 360), saturation and value in [0, 1].
 * HSV is a cylindrical re-arrangement of RGB (Smith 1978 hexcone); its "value"
 * is max(R, G, B), not perceived lightness.
 */
export function hsvToRgb(h: number, s: number, v: number): RGB {
  if (![h, s, v].every(Number.isFinite)) throw new FormulaInputError("Hue, saturation and value must be numbers.");
  if (s < 0 || s > 1 || v < 0 || v > 1) throw new FormulaInputError("Saturation and value must be between 0 and 1.");
  const hh = (((h % 360) + 360) % 360) / 60;
  const c = v * s;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = v - c;
  const [r, g, b] = hh < 1 ? [c, x, 0] : hh < 2 ? [x, c, 0] : hh < 3 ? [0, c, x] : hh < 4 ? [0, x, c] : hh < 5 ? [x, 0, c] : [c, 0, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

/** sRGB (8-bit) → HSV with hue in degrees, saturation and value in [0, 1]. Hue is 0 for greys. */
export function rgbToHsv({ r, g, b }: RGB): { h: number; s: number; v: number } {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const d = max - min;
  let h = 0;
  if (d > 0) {
    if (max === R) h = 60 * (((G - B) / d) % 6);
    else if (max === G) h = 60 * ((B - R) / d + 2);
    else h = 60 * ((R - G) / d + 4);
  }
  return { h: (h + 360) % 360, s: max === 0 ? 0 : d / max, v: max };
}

/** Pass/fail against WCAG 2.x thresholds. Ratios are compared unrounded, as WCAG requires. */
export function wcagChecks(ratio: number) {
  return [
    { id: "1.4.3-normal", label: "Normal text — AA (1.4.3)", threshold: 4.5, pass: ratio >= 4.5 },
    { id: "1.4.3-large", label: "Large text — AA (1.4.3)", threshold: 3, pass: ratio >= 3 },
    { id: "1.4.6-normal", label: "Normal text — AAA (1.4.6)", threshold: 7, pass: ratio >= 7 },
    { id: "1.4.6-large", label: "Large text — AAA (1.4.6)", threshold: 4.5, pass: ratio >= 4.5 },
    { id: "1.4.11", label: "UI components & graphics — AA (1.4.11)", threshold: 3, pass: ratio >= 3 },
  ];
}

/* ---------------- Modular scale ---------------- */

export const SCALE_RATIOS = [
  { name: "Minor second", ratio: 16 / 15, label: "16:15" },
  { name: "Major second", ratio: 9 / 8, label: "9:8" },
  { name: "Minor third", ratio: 6 / 5, label: "6:5" },
  { name: "Major third", ratio: 5 / 4, label: "5:4" },
  { name: "Perfect fourth", ratio: 4 / 3, label: "4:3" },
  { name: "Augmented fourth", ratio: Math.SQRT2, label: "1:√2" },
  { name: "Perfect fifth", ratio: 3 / 2, label: "3:2" },
  { name: "Golden ratio", ratio: (1 + Math.sqrt(5)) / 2, label: "1:φ" },
] as const;

/** sizes for steps from `down` below to `up` above the base: sizeᵢ = base × ratioⁱ */
export function modularScale(base: number, ratio: number, down = 2, up = 6) {
  assertPositive(base, "Base size");
  assertPositive(ratio, "Ratio");
  if (ratio <= 1) throw new FormulaInputError("Ratio must be greater than 1.");
  assertInteger(down, "Steps below");
  assertInteger(up, "Steps above");
  const steps = [];
  for (let i = -down; i <= up; i++) steps.push({ step: i, size: base * ratio ** i });
  return steps;
}

/* ---------------- Grid ---------------- */

export function gridColumns(container: number, columns: number, gutter: number, margin: number) {
  assertPositive(container, "Container width");
  assertInteger(columns, "Columns", 1);
  assertNonNegative(gutter, "Gutter");
  assertNonNegative(margin, "Margin");
  const column = (container - 2 * margin - (columns - 1) * gutter) / columns;
  if (column <= 0) throw new FormulaInputError("Gutters and margins leave no room for columns.");
  const span = (k: number) => k * column + (k - 1) * gutter;
  return { column, span, spans: Array.from({ length: columns }, (_, i) => ({ columns: i + 1, width: span(i + 1) })) };
}

/** Greatest-common-divisor reduction of an aspect ratio, e.g. 1920×1080 → 16:9 */
export function aspectRatio(width: number, height: number) {
  assertInteger(width, "Width", 1);
  assertInteger(height, "Height", 1);
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const g = gcd(width, height);
  return { w: width / g, h: height / g, decimal: width / height };
}
