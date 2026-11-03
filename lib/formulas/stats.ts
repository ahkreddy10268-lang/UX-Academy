/** Statistics and usability/product metrics. */
import {
  FormulaInputError,
  assertInteger,
  assertNonNegative,
  assertPositive,
  assertProbability,
  linearFit,
  normalInv,
  tInv,
  tTwoSidedP,
  zTwoSidedP,
} from "./math";

const zFor = (confidence: number) => {
  assertProbability(confidence, "Confidence level", true);
  return normalInv(1 - (1 - confidence) / 2);
};

/* ---------------- Descriptive statistics ---------------- */

export function descriptive(values: number[]) {
  const n = values.length;
  if (n < 1) throw new FormulaInputError("Enter at least one value.");
  const sorted = [...values].sort((a, b) => a - b);
  const mean = values.reduce((s, v) => s + v, 0) / n;
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const freq = new Map<number, number>();
  values.forEach((v) => freq.set(v, (freq.get(v) ?? 0) + 1));
  const maxFreq = Math.max(...freq.values());
  const modes = maxFreq > 1 ? [...freq.entries()].filter(([, f]) => f === maxFreq).map(([v]) => v).sort((a, b) => a - b) : [];
  const ss = values.reduce((s, v) => s + (v - mean) ** 2, 0);
  const sampleVariance = n > 1 ? ss / (n - 1) : NaN;
  return {
    n,
    mean,
    median,
    modes,
    min: sorted[0],
    max: sorted[n - 1],
    range: sorted[n - 1] - sorted[0],
    sampleVariance,
    sampleSd: Math.sqrt(sampleVariance),
    populationVariance: ss / n,
    populationSd: Math.sqrt(ss / n),
  };
}

/* ---------------- Confidence interval for a mean (t) ---------------- */

export function ciMean(mean: number, sd: number, n: number, confidence = 0.95) {
  assertNonNegative(sd, "Standard deviation");
  assertInteger(n, "Sample size n", 2);
  assertProbability(confidence, "Confidence level", true);
  const df = n - 1;
  const t = tInv(1 - (1 - confidence) / 2, df);
  const se = sd / Math.sqrt(n);
  const margin = t * se;
  return { mean, se, t, df, margin, low: mean - margin, high: mean + margin };
}

export function ciMeanFromValues(values: number[], confidence = 0.95) {
  const d = descriptive(values);
  if (d.n < 2) throw new FormulaInputError("At least two values are needed for a confidence interval.");
  return { ...ciMean(d.mean, d.sampleSd, d.n, confidence), sd: d.sampleSd, n: d.n };
}

/* ---------------- Task success: adjusted-Wald interval ---------------- */

export function taskSuccess(successes: number, attempts: number, confidence = 0.95) {
  assertInteger(successes, "Successes");
  assertInteger(attempts, "Attempts", 1);
  if (successes > attempts) throw new FormulaInputError("Successes cannot exceed attempts.");
  const z = zFor(confidence);
  const p = successes / attempts;
  const nAdj = attempts + z * z;
  const pAdj = (successes + (z * z) / 2) / nAdj;
  const margin = z * Math.sqrt((pAdj * (1 - pAdj)) / nAdj);
  return { p, pAdj, z, low: Math.max(0, pAdj - margin), high: Math.min(1, pAdj + margin) };
}

/* ---------------- Time on task ---------------- */

export function timeOnTask(times: number[], confidence = 0.95) {
  times.forEach((t, i) => assertPositive(t, `Time ${i + 1}`));
  const d = descriptive(times);
  const logs = times.map(Math.log);
  const ld = descriptive(logs);
  const geometricMean = Math.exp(ld.mean);
  let low = NaN;
  let high = NaN;
  if (d.n >= 2) {
    const ci = ciMean(ld.mean, ld.sampleSd, ld.n, confidence);
    low = Math.exp(ci.low);
    high = Math.exp(ci.high);
  }
  return { n: d.n, mean: d.mean, median: d.median, geometricMean, low, high, sd: d.sampleSd };
}

/* ---------------- Error rate ---------------- */

export function errorRate(errors: number, opportunities: number, attempts: number, usersWithError?: number, users?: number) {
  assertInteger(errors, "Errors");
  assertInteger(opportunities, "Error opportunities", 1);
  assertInteger(attempts, "Task attempts", 1);
  const result = { perOpportunity: errors / opportunities, perAttempt: errors / attempts, shareOfUsers: NaN };
  if (usersWithError !== undefined && users !== undefined) {
    assertInteger(users, "Users", 1);
    assertInteger(usersWithError, "Users with at least one error");
    if (usersWithError > users) throw new FormulaInputError("Users with an error cannot exceed users.");
    result.shareOfUsers = usersWithError / users;
  }
  return result;
}

/* ---------------- Funnel & retention ---------------- */

export function funnel(counts: number[]) {
  if (counts.length < 2) throw new FormulaInputError("Enter at least two funnel steps.");
  counts.forEach((c, i) => assertNonNegative(c, `Step ${i + 1}`));
  if (counts[0] === 0) throw new FormulaInputError("The first step must be greater than zero.");
  counts.forEach((c, i) => {
    if (i > 0 && c > counts[i - 1]) throw new FormulaInputError(`Step ${i + 1} is larger than step ${i}; a funnel cannot grow between steps.`);
  });
  const steps = counts.map((c, i) => ({
    count: c,
    stepConversion: i === 0 ? 1 : counts[i - 1] ? c / counts[i - 1] : 0,
    dropOff: i === 0 ? 0 : counts[i - 1] ? 1 - c / counts[i - 1] : 0,
    cumulative: c / counts[0],
  }));
  return { steps, overall: counts[counts.length - 1] / counts[0] };
}

export function retention(start: number, retained: number) {
  assertInteger(start, "Customers at start", 1);
  assertInteger(retained, "Retained customers");
  if (retained > start) throw new FormulaInputError("Retained customers cannot exceed the starting cohort.");
  return { retention: retained / start, churn: 1 - retained / start };
}

/** Customer retention rate (CRR) = (end − new) / start. */
export function customerRetentionRate(start: number, end: number, acquired: number) {
  assertInteger(start, "Customers at start", 1);
  assertInteger(end, "Customers at end");
  assertInteger(acquired, "New customers acquired");
  if (acquired > end) throw new FormulaInputError("New customers cannot exceed customers at the end of the period.");
  const crr = (end - acquired) / start;
  if (crr > 1) throw new FormulaInputError("Retained customers (end − new) cannot exceed customers at start.");
  return { crr, churn: 1 - crr };
}

export function stickiness(dau: number, mau: number) {
  assertNonNegative(dau, "DAU");
  assertPositive(mau, "MAU");
  if (dau > mau) throw new FormulaInputError("Average DAU cannot exceed MAU.");
  return dau / mau;
}

/* ---------------- Two-proportion test (A/B) ---------------- */

export function twoProportionTest(x1: number, n1: number, x2: number, n2: number, confidence = 0.95) {
  assertInteger(n1, "Visitors in A", 1);
  assertInteger(n2, "Visitors in B", 1);
  assertInteger(x1, "Conversions in A");
  assertInteger(x2, "Conversions in B");
  if (x1 > n1 || x2 > n2) throw new FormulaInputError("Conversions cannot exceed visitors.");
  const p1 = x1 / n1;
  const p2 = x2 / n2;
  const pooled = (x1 + x2) / (n1 + n2);
  const sePooled = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2));
  const z = sePooled === 0 ? 0 : (p2 - p1) / sePooled;
  const p = sePooled === 0 ? 1 : zTwoSidedP(z);
  const seDiff = Math.sqrt((p1 * (1 - p1)) / n1 + (p2 * (1 - p2)) / n2);
  const zc = zFor(confidence);
  const diff = p2 - p1;
  return {
    p1,
    p2,
    diff,
    relativeLift: p1 === 0 ? NaN : diff / p1,
    z,
    pValue: p,
    low: diff - zc * seDiff,
    high: diff + zc * seDiff,
    significant: p < 1 - confidence,
  };
}

/* ---------------- Effect size ---------------- */

export function cohensD(m1: number, s1: number, n1: number, m2: number, s2: number, n2: number) {
  assertNonNegative(s1, "SD of group 1");
  assertNonNegative(s2, "SD of group 2");
  assertInteger(n1, "n of group 1", 2);
  assertInteger(n2, "n of group 2", 2);
  const pooled = Math.sqrt(((n1 - 1) * s1 ** 2 + (n2 - 1) * s2 ** 2) / (n1 + n2 - 2));
  if (pooled === 0) throw new FormulaInputError("Pooled standard deviation is zero; effect size is undefined.");
  const d = (m1 - m2) / pooled;
  const j = 1 - 3 / (4 * (n1 + n2) - 9);
  return { d, g: d * j, pooledSd: pooled };
}

export function describeEffect(d: number): string {
  const a = Math.abs(d);
  if (a < 0.2) return "below Cohen's 'small' benchmark (0.2)";
  if (a < 0.5) return "around Cohen's 'small' benchmark (0.2–0.5)";
  if (a < 0.8) return "around Cohen's 'medium' benchmark (0.5–0.8)";
  return "at or above Cohen's 'large' benchmark (0.8)";
}

/* ---------------- Sample size ---------------- */

export function sampleSizeProportion(p: number, margin: number, confidence = 0.95) {
  assertProbability(p, "Expected proportion");
  assertProbability(margin, "Margin of error", true);
  const z = zFor(confidence);
  return Math.ceil((z * z * p * (1 - p)) / (margin * margin));
}

export function sampleSizeMean(sd: number, margin: number, confidence = 0.95) {
  assertPositive(sd, "Standard deviation");
  assertPositive(margin, "Margin of error");
  const z = zFor(confidence);
  return Math.ceil(((z * sd) / margin) ** 2);
}

export function sampleSizeTwoProportions(p1: number, p2: number, alpha = 0.05, power = 0.8) {
  assertProbability(p1, "Baseline rate", true);
  assertProbability(p2, "Expected rate", true);
  assertProbability(alpha, "Significance level α", true);
  assertProbability(power, "Power", true);
  if (p1 === p2) throw new FormulaInputError("The two rates must differ to detect an effect.");
  const za = normalInv(1 - alpha / 2);
  const zb = normalInv(power);
  const pbar = (p1 + p2) / 2;
  const n = (za * Math.sqrt(2 * pbar * (1 - pbar)) + zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2 / (p1 - p2) ** 2;
  return Math.ceil(n);
}

/* ---------------- Problem discovery (Nielsen & Landauer 1993; Virzi 1992) ---------------- */

export function problemDiscovery(p: number, n: number) {
  assertProbability(p, "Problem occurrence probability p", true);
  assertInteger(n, "Participants n", 1);
  return 1 - (1 - p) ** n;
}

export function participantsForDiscovery(p: number, goal: number) {
  assertProbability(p, "Problem occurrence probability p", true);
  assertProbability(goal, "Discovery goal", true);
  return Math.ceil(Math.log(1 - goal) / Math.log(1 - p));
}

/* ---------------- Correlation & regression ---------------- */

export function correlation(xs: number[], ys: number[]) {
  if (xs.length < 3) throw new FormulaInputError("At least three pairs are needed.");
  const fit = linearFit(xs, ys);
  const df = fit.n - 2;
  const t = Math.abs(fit.r) >= 1 ? Infinity : (fit.r * Math.sqrt(df)) / Math.sqrt(1 - fit.r ** 2);
  const pValue = Number.isFinite(t) ? tTwoSidedP(t, df) : 0;
  return { ...fit, t, df, pValue };
}
