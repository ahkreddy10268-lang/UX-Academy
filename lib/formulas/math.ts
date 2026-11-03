/**
 * Numerical foundations: normal and Student-t distributions, implemented from
 * standard published algorithms so calculators need no dependencies.
 */

export class FormulaInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FormulaInputError";
  }
}

export function assertFinite(value: number, label: string): void {
  if (!Number.isFinite(value)) throw new FormulaInputError(`${label} must be a number.`);
}
export function assertPositive(value: number, label: string): void {
  assertFinite(value, label);
  if (value <= 0) throw new FormulaInputError(`${label} must be greater than zero.`);
}
export function assertNonNegative(value: number, label: string): void {
  assertFinite(value, label);
  if (value < 0) throw new FormulaInputError(`${label} cannot be negative.`);
}
export function assertInteger(value: number, label: string, min = 0): void {
  assertFinite(value, label);
  if (!Number.isInteger(value) || value < min)
    throw new FormulaInputError(`${label} must be a whole number${min > 0 ? ` of at least ${min}` : ""}.`);
}
export function assertProbability(value: number, label: string, open = false): void {
  assertFinite(value, label);
  if (open ? value <= 0 || value >= 1 : value < 0 || value > 1)
    throw new FormulaInputError(`${label} must be ${open ? "strictly between 0 and 1" : "between 0 and 1"}.`);
}

export const log2 = (x: number) => Math.log(x) / Math.LN2;
export const round = (x: number, digits = 4) => {
  const f = 10 ** digits;
  return Math.round(x * f) / f;
};

/* ---------------- Normal distribution ---------------- */

/** erf via W. J. Cody-style rational approximation (|error| < 1.2e-7) — Numerical Recipes erfc. */
export function erf(x: number): number {
  const z = Math.abs(x);
  const t = 1 / (1 + 0.5 * z);
  const r =
    t *
    Math.exp(
      -z * z -
        1.26551223 +
        t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
    );
  return x >= 0 ? 1 - r : r - 1;
}

export function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

/** Inverse standard normal CDF — Acklam's algorithm (relative error < 1.15e-9). */
export function normalInv(p: number): number {
  assertProbability(p, "Probability", true);
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const low = 0.02425;
  if (p < low) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - low) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  const q = p - 0.5;
  const r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

/* ---------------- Student's t distribution ---------------- */

function logGamma(x: number): number {
  // Lanczos approximation (g = 7, n = 9)
  const g = 7;
  const coef = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  x -= 1;
  let a = coef[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += coef[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

/** Continued fraction for the regularised incomplete beta (modified Lentz). */
function betaContinuedFraction(a: number, b: number, x: number): number {
  const maxIter = 300;
  const eps = 3e-14;
  const tiny = 1e-300;
  let c = 1;
  let d = 1 - ((a + b) * x) / (a + 1);
  if (Math.abs(d) < tiny) d = tiny;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= maxIter; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((a + m2 - 1) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < tiny) d = tiny;
    c = 1 + aa / c;
    if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (a + b + m) * x) / ((a + m2) * (a + m2 + 1));
    d = 1 + aa * d;
    if (Math.abs(d) < tiny) d = tiny;
    c = 1 + aa / c;
    if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < eps) break;
  }
  return h;
}

export function regularizedBeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const lnBt = logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x);
  const bt = Math.exp(lnBt);
  if (x < (a + 1) / (a + b + 2)) return (bt * betaContinuedFraction(a, b, x)) / a;
  return 1 - (bt * betaContinuedFraction(b, a, 1 - x)) / b;
}

/** CDF of Student's t with df degrees of freedom. */
export function tCdf(t: number, df: number): number {
  assertPositive(df, "Degrees of freedom");
  const x = df / (df + t * t);
  const tail = 0.5 * regularizedBeta(x, df / 2, 0.5);
  return t >= 0 ? 1 - tail : tail;
}

/** Inverse CDF of Student's t (bisection on tCdf; accurate to ~1e-10). */
export function tInv(p: number, df: number): number {
  assertProbability(p, "Probability", true);
  assertPositive(df, "Degrees of freedom");
  let lo = -1e3;
  let hi = 1e3;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (tCdf(mid, df) < p) lo = mid;
    else hi = mid;
    if (hi - lo < 1e-12) break;
  }
  return (lo + hi) / 2;
}

/** Two-sided p-value for a t statistic. */
export function tTwoSidedP(t: number, df: number): number {
  return 2 * (1 - tCdf(Math.abs(t), df));
}

/** Two-sided p-value for a z statistic. */
export function zTwoSidedP(z: number): number {
  return 2 * (1 - normalCdf(Math.abs(z)));
}

/** Simple least-squares linear regression. */
export function linearFit(xs: number[], ys: number[]) {
  if (xs.length !== ys.length) throw new FormulaInputError("x and y must have the same number of values.");
  const n = xs.length;
  if (n < 2) throw new FormulaInputError("At least two data points are needed.");
  const mx = xs.reduce((s, x) => s + x, 0) / n;
  const my = ys.reduce((s, y) => s + y, 0) / n;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    sxx += (xs[i] - mx) ** 2;
    sxy += (xs[i] - mx) * (ys[i] - my);
    syy += (ys[i] - my) ** 2;
  }
  if (sxx === 0) throw new FormulaInputError("x values must not all be identical.");
  const slope = sxy / sxx;
  const intercept = my - slope * mx;
  const r = syy === 0 ? 0 : sxy / Math.sqrt(sxx * syy);
  return { slope, intercept, r, r2: r * r, n, meanX: mx, meanY: my };
}

/** Parse a list of numbers from free text (commas, spaces, new lines). */
export function parseNumberList(text: string): number[] {
  const parts = text
    .split(/[\s,;]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const nums = parts.map(Number);
  const bad = parts.filter((_, i) => !Number.isFinite(nums[i]));
  if (bad.length) throw new FormulaInputError(`Not a number: ${bad.slice(0, 3).join(", ")}`);
  return nums;
}
