/**
 * Psychophysics: Weber's law and discrimination thresholds.
 *
 * Weber's law in threshold form: ΔI = k·I, so ΔI / I = k. k (the Weber fraction)
 * depends on modality, task and threshold criterion; no value here is universal.
 * The generalised form ΔI = k·I + c (reported by Penconek 2025 as Fechner's
 * generalisation) lets the Weber fraction rise at low intensities (k + c/I).
 * Thresholds are estimated from a psychometric function; here a cumulative
 * normal is used as an illustrative shape, not a fitted model.
 */
import { FormulaInputError, assertFinite, assertPositive, assertProbability, normalCdf, normalInv } from "./math";

/** Weber's law, threshold form: the difference threshold ΔI = k·I. */
export function weberThreshold(intensity: number, k: number): number {
  assertPositive(intensity, "Reference intensity I");
  assertPositive(k, "Weber fraction k");
  return k * intensity;
}

/** The Weber fraction ΔI / I for a measured threshold. */
export function weberFraction(deltaI: number, intensity: number): number {
  assertPositive(deltaI, "Difference threshold ΔI");
  assertPositive(intensity, "Reference intensity I");
  return deltaI / intensity;
}

/** Generalised form ΔI = k·I + c (c ≥ 0); the Weber fraction is then k + c / I. */
export function generalisedWeberThreshold(intensity: number, k: number, c: number): number {
  assertPositive(intensity, "Reference intensity I");
  assertPositive(k, "Weber fraction k");
  assertFinite(c, "Constant c");
  if (c < 0) throw new FormulaInputError("The constant c cannot be negative.");
  return k * intensity + c;
}

export type PsychometricParams = { mu: number; sigma: number };

/**
 * Illustrative psychometric function: probability of judging the comparison
 * greater than the reference, as a cumulative normal centred on mu (the point
 * of subjective equality) with spread sigma.
 */
export function psychometricNormal(x: number, { mu, sigma }: PsychometricParams): number {
  assertFinite(x, "Comparison intensity");
  assertFinite(mu, "mu");
  assertPositive(sigma, "sigma");
  return normalCdf((x - mu) / sigma);
}

/** Comparison intensity at which the psychometric function reaches probability p. */
export function intensityAtCriterion({ mu, sigma }: PsychometricParams, p: number): number {
  assertFinite(mu, "mu");
  assertPositive(sigma, "sigma");
  assertProbability(p, "Criterion p", true);
  return mu + sigma * normalInv(p);
}

/** Difference threshold defined as the distance from the 50 % point to criterion p (often 0.75). */
export function differenceThreshold(params: PsychometricParams, p = 0.75): number {
  if (p <= 0.5) throw new FormulaInputError("The criterion must be above 0.5.");
  return intensityAtCriterion(params, p) - params.mu;
}
