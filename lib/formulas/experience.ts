/**
 * Retrospective evaluation models (Kahneman, Fredrickson, Schreiber & Redelmeier 1993;
 * Redelmeier & Kahneman 1996). The peak-end average is a descriptive regularity of
 * remembered ratings, not a precise predictor for any individual.
 */
import { FormulaInputError, assertFinite } from "./math";

export function peakEnd(moments: number[], mode: "max" | "min" = "max") {
  if (moments.length < 2) throw new FormulaInputError("Enter at least two moments.");
  moments.forEach((m, i) => assertFinite(m, `Moment ${i + 1}`));
  const peakValue = mode === "max" ? Math.max(...moments) : Math.min(...moments);
  const peakIndex = moments.indexOf(peakValue);
  const end = moments[moments.length - 1];
  const mean = moments.reduce((s, m) => s + m, 0) / moments.length;
  return { peakIndex, peakValue, end, peakEndAverage: (peakValue + end) / 2, mean, total: mean * moments.length };
}

/** Chunk a string of symbols into groups of `size` (chunking illustration for Miller/Cowan). */
export function chunk(symbols: string, size: number): string[] {
  if (!Number.isInteger(size) || size < 1) throw new FormulaInputError("Chunk size must be a whole number of at least 1.");
  const clean = symbols.replace(/\s+/g, "");
  const out: string[] = [];
  for (let i = 0; i < clean.length; i += size) out.push(clean.slice(i, i + size));
  return out;
}

/**
 * Practice curves (Newell & Rosenbloom 1980/1981; Heathcote, Brown & Mewhort 2000;
 * Evans, Brown, Mewhort & Heathcote 2018). Descriptive models of how a performance
 * time changes with practice trials; parameters must be fitted to data and none is
 * universal.
 */
export type PowerPracticeParams = { A: number; B: number; alpha: number; E?: number };
export type ExponentialPracticeParams = { A: number; B: number; r: number };
export type DelayedExponentialPracticeParams = ExponentialPracticeParams & { tau: number };

function assertTrial(n: number, label = "Trial number") {
  assertFinite(n, label);
  if (n < 0) throw new FormulaInputError(`${label} cannot be negative.`);
}

/** General power law of practice: T(N) = A + B(N + E)^(-alpha). With A = E = 0 this is the simple form T = B·N^(-alpha). */
export function practicePower(n: number, { A, B, alpha, E = 0 }: PowerPracticeParams): number {
  assertTrial(n);
  [A, B, alpha, E].forEach((v, i) => assertFinite(v, ["A", "B", "alpha", "E"][i]));
  if (alpha <= 0) throw new FormulaInputError("The exponent alpha must be positive.");
  if (n + E <= 0) throw new FormulaInputError("N + E must be greater than zero.");
  return A + B * Math.pow(n + E, -alpha);
}

/** Exponential law of practice: T(N) = A + B·e^(-rN). */
export function practiceExponential(n: number, { A, B, r }: ExponentialPracticeParams): number {
  assertTrial(n);
  [A, B, r].forEach((v, i) => assertFinite(v, ["A", "B", "r"][i]));
  if (r <= 0) throw new FormulaInputError("The rate r must be positive.");
  return A + B * Math.exp(-r * n);
}

/** Delayed exponential (Evans et al. 2018): T(N) = A + B(tau + 1)/(tau + e^(rN)); tau = 0 gives the exponential. */
export function practiceDelayedExponential(n: number, { A, B, r, tau }: DelayedExponentialPracticeParams): number {
  assertTrial(n);
  [A, B, r, tau].forEach((v, i) => assertFinite(v, ["A", "B", "r", "tau"][i]));
  if (r <= 0) throw new FormulaInputError("The rate r must be positive.");
  if (tau < 0) throw new FormulaInputError("The delay tau cannot be negative.");
  return A + (B * (tau + 1)) / (tau + Math.exp(r * n));
}

/** Sample a practice function at trials from..to (inclusive, whole steps). */
export function practiceCurve(fn: (n: number) => number, from: number, to: number): { n: number; t: number }[] {
  if (!Number.isInteger(from) || !Number.isInteger(to) || to < from) throw new FormulaInputError("Give whole trial numbers with to ≥ from.");
  const out: { n: number; t: number }[] = [];
  for (let n = from; n <= to; n++) out.push({ n, t: fn(n) });
  return out;
}

/** Point-by-point mean of several curves sampled at the same trials (group averaging). */
export function meanCurve(curves: { n: number; t: number }[][]): { n: number; t: number }[] {
  if (!curves.length) throw new FormulaInputError("Give at least one curve.");
  const len = curves[0].length;
  if (curves.some((c) => c.length !== len)) throw new FormulaInputError("Curves must have the same length.");
  return curves[0].map((p, i) => ({ n: p.n, t: curves.reduce((s, c) => s + c[i].t, 0) / curves.length }));
}
