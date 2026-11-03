/**
 * Colour-vision-deficiency simulation — Machado, Oliveira & Fernandes (2009),
 * "A Physiologically-based Model for Simulation of Color Vision Deficiency",
 * IEEE TVCG 15(6):1291–1298, doi:10.1109/TVCG.2009.113.
 *
 * The matrices are the authors' published severity-1.0 (dichromacy) matrices,
 * cross-checked against the colorspacious reference implementation, and are
 * applied to *linear* sRGB as that implementation does. Intermediate
 * severities are not offered: the paper tabulates them separately and they
 * are not a linear blend of identity and dichromacy.
 */
import { parseHex, toHex, type RGB } from "./visual";

export type CvdType = "protanopia" | "deuteranopia" | "tritanopia";
type M3 = readonly [readonly [number, number, number], readonly [number, number, number], readonly [number, number, number]];

export const MACHADO_2009_SEVERITY_1: Record<CvdType, M3> = {
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
};

export const CVD_LABEL: Record<CvdType, string> = {
  protanopia: "Protanopia (no L-cones, “red”)",
  deuteranopia: "Deuteranopia (no M-cones, “green”)",
  tritanopia: "Tritanopia (no S-cones, “blue”)",
};

const toLinear = (c8: number) => {
  const c = c8 / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const toGamma = (l: number) => {
  const c = Math.min(1, Math.max(0, l));
  return 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
};

/** Simulate how an sRGB colour appears with the given dichromacy. Out-of-gamut results are clipped. */
export function simulateCvd(colour: string | RGB, type: CvdType): string {
  const { r, g, b } = typeof colour === "string" ? parseHex(colour) : colour;
  const lin = [toLinear(r), toLinear(g), toLinear(b)];
  const m = MACHADO_2009_SEVERITY_1[type];
  const out = m.map((row) => row[0] * lin[0] + row[1] * lin[1] + row[2] * lin[2]);
  return toHex({ r: toGamma(out[0]), g: toGamma(out[1]), b: toGamma(out[2]) });
}

/* ---------------- Perceptual difference (CIE 1976 L*a*b*, D65) ---------------- */

export type Lab = { L: number; a: number; b: number };

/** sRGB (8-bit) → CIE L*a*b* with the D65 white point (IEC 61966-2-1 matrix, CIE 1976 formulas). */
export function srgbToLab(colour: string | RGB): Lab {
  const { r, g, b } = typeof colour === "string" ? parseHex(colour) : colour;
  const [R, G, B] = [toLinear(r), toLinear(g), toLinear(b)];
  const X = 0.4124564 * R + 0.3575761 * G + 0.1804375 * B;
  const Y = 0.2126729 * R + 0.7151522 * G + 0.072175 * B;
  const Z = 0.0193339 * R + 0.119192 * G + 0.9503041 * B;
  const [Xn, Yn, Zn] = [0.95047, 1, 1.08883];
  const e = 216 / 24389;
  const k = 24389 / 27;
  const f = (t: number) => (t > e ? Math.cbrt(t) : (k * t + 16) / 116);
  const [fx, fy, fz] = [f(X / Xn), f(Y / Yn), f(Z / Zn)];
  return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

/** CIE 1976 colour difference ΔE*ab — Euclidean distance in L*a*b*. Simple, not perceptually uniform at large differences. */
export function deltaE76(x: string | RGB, y: string | RGB): number {
  const p = srgbToLab(x);
  const q = srgbToLab(y);
  return Math.hypot(p.L - q.L, p.a - q.a, p.b - q.b);
}
