/** Standardised questionnaires: SUS, UMUX-LITE, NASA-TLX, and customer metrics NPS, CSAT, CES. */
import { FormulaInputError, assertInteger, assertNonNegative, normalInv } from "./math";

/* ---------------- System Usability Scale (Brooke 1996) ---------------- */

export function susScore(responses: number[]): { score: number; contributions: number[] } {
  if (responses.length !== 10) throw new FormulaInputError("SUS needs exactly 10 responses.");
  const contributions = responses.map((r, i) => {
    if (!Number.isInteger(r) || r < 1 || r > 5) throw new FormulaInputError(`Item ${i + 1} must be a whole number from 1 to 5.`);
    // Items 1,3,5,7,9 (index even) are positively worded; 2,4,6,8,10 negatively worded.
    return i % 2 === 0 ? r - 1 : 5 - r;
  });
  return { score: contributions.reduce((s, c) => s + c, 0) * 2.5, contributions };
}

/** Mean SUS across respondents. */
export function susMean(sets: number[][]): number {
  if (!sets.length) throw new FormulaInputError("Enter at least one respondent.");
  return sets.reduce((s, r) => s + susScore(r).score, 0) / sets.length;
}

/* ---------------- UMUX-LITE (Lewis, Utesch & Maher 2013) ---------------- */

export function umuxLite(item1: number, item2: number) {
  for (const [v, label] of [
    [item1, "Item 1"],
    [item2, "Item 2"],
  ] as const)
    if (!Number.isInteger(v) || v < 1 || v > 7) throw new FormulaInputError(`${label} must be a whole number from 1 to 7.`);
  const raw = ((item1 - 1 + (item2 - 1)) / 12) * 100;
  return { raw, adjusted: 0.65 * raw + 22.9 };
}

/* ---------------- NASA-TLX (Hart & Staveland 1988) ---------------- */

export const TLX_SCALES = ["Mental Demand", "Physical Demand", "Temporal Demand", "Performance", "Effort", "Frustration"] as const;

export function nasaTlxRaw(ratings: number[]): number {
  if (ratings.length !== 6) throw new FormulaInputError("NASA-TLX needs six subscale ratings.");
  ratings.forEach((r, i) => {
    if (!Number.isFinite(r) || r < 0 || r > 100) throw new FormulaInputError(`${TLX_SCALES[i]} must be between 0 and 100.`);
  });
  return ratings.reduce((s, r) => s + r, 0) / 6;
}

/** Weighted TLX: weights come from 15 pairwise comparisons (each 0–5, summing to 15). */
export function nasaTlxWeighted(ratings: number[], weights: number[]): number {
  nasaTlxRaw(ratings);
  if (weights.length !== 6) throw new FormulaInputError("Six weights are needed.");
  weights.forEach((w, i) => {
    if (!Number.isInteger(w) || w < 0 || w > 5) throw new FormulaInputError(`Weight for ${TLX_SCALES[i]} must be a whole number from 0 to 5.`);
  });
  const total = weights.reduce((s, w) => s + w, 0);
  if (total !== 15) throw new FormulaInputError(`Weights must sum to 15 (the number of pairwise comparisons); they sum to ${total}.`);
  return ratings.reduce((s, r, i) => s + r * weights[i], 0) / 15;
}

/** Derive weights from the 15 pairwise choices: each choice names the scale judged more important. */
export function tlxWeightsFromPairs(choices: number[]): number[] {
  if (choices.length !== 15) throw new FormulaInputError("All 15 pairwise comparisons must be answered.");
  const w = [0, 0, 0, 0, 0, 0];
  choices.forEach((c) => {
    if (!Number.isInteger(c) || c < 0 || c > 5) throw new FormulaInputError("Invalid pairwise choice.");
    w[c]++;
  });
  return w;
}

export const TLX_PAIRS: [number, number][] = (() => {
  const pairs: [number, number][] = [];
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) pairs.push([i, j]);
  return pairs;
})();

/* ---------------- Net Promoter Score (Reichheld 2003) ---------------- */

export function nps(promoters: number, passives: number, detractors: number, confidence = 0.95) {
  assertInteger(promoters, "Promoters");
  assertInteger(passives, "Passives");
  assertInteger(detractors, "Detractors");
  const n = promoters + passives + detractors;
  if (n === 0) throw new FormulaInputError("Enter at least one response.");
  const pP = promoters / n;
  const pD = detractors / n;
  const score = pP - pD; // −1 … +1
  // Variance of the per-respondent score (+1, 0, −1)
  const variance = pP + pD - score * score;
  const se = Math.sqrt(variance / n);
  const z = normalInv(1 - (1 - confidence) / 2);
  return {
    n,
    promoterShare: pP,
    passiveShare: passives / n,
    detractorShare: pD,
    nps: score * 100,
    marginOfError: z * se * 100,
    low: Math.max(-100, (score - z * se) * 100),
    high: Math.min(100, (score + z * se) * 100),
  };
}

/** Classify 0–10 ratings into promoters (9–10), passives (7–8), detractors (0–6). */
export function npsFromRatings(ratings: number[]) {
  let p = 0;
  let pa = 0;
  let d = 0;
  ratings.forEach((r, i) => {
    if (!Number.isInteger(r) || r < 0 || r > 10) throw new FormulaInputError(`Rating ${i + 1} must be a whole number 0–10.`);
    if (r >= 9) p++;
    else if (r >= 7) pa++;
    else d++;
  });
  return nps(p, pa, d);
}

/* ---------------- CSAT & CES ---------------- */

/** CSAT from counts of ratings 1–5 (index 0 = rating 1). Top-two-box (4 and 5) share. */
export function csat(counts: number[]) {
  if (counts.length !== 5) throw new FormulaInputError("Enter counts for ratings 1 to 5.");
  counts.forEach((c, i) => assertInteger(c, `Count for rating ${i + 1}`));
  const n = counts.reduce((s, c) => s + c, 0);
  if (!n) throw new FormulaInputError("Enter at least one response.");
  const satisfied = counts[3] + counts[4];
  const mean = counts.reduce((s, c, i) => s + c * (i + 1), 0) / n;
  return { n, csat: (satisfied / n) * 100, mean };
}

/** CES from counts of 7-point agreement ratings (index 0 = 1 strongly disagree … 6 = 7 strongly agree). */
export function ces(counts: number[]) {
  if (counts.length !== 7) throw new FormulaInputError("Enter counts for ratings 1 to 7.");
  counts.forEach((c, i) => assertNonNegative(c, `Count for rating ${i + 1}`));
  const n = counts.reduce((s, c) => s + c, 0);
  if (!n) throw new FormulaInputError("Enter at least one response.");
  const mean = counts.reduce((s, c, i) => s + c * (i + 1), 0) / n;
  const agree = counts[4] + counts[5] + counts[6];
  return { n, mean, agreeShare: (agree / n) * 100 };
}
