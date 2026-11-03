/**
 * Formula verification. Expected values come from independent references:
 * statistical tables, worked examples in the cited literature, and hand
 * calculation shown inline. Never adjust an expectation to match the code
 * without re-deriving it.
 */
import { describe, expect, it } from "vitest";
import { FormulaInputError, linearFit, normalCdf, normalInv, parseNumberList, tCdf, tInv } from "./math";
import { effectiveWidth, fittsId, hickInformation, hickInformationEqual, klmTotal, parseKlm, steeringId, throughput } from "./pointing";
import { ces, csat, nasaTlxRaw, nasaTlxWeighted, nps, npsFromRatings, susScore, tlxWeightsFromPairs, umuxLite, TLX_PAIRS } from "./questionnaires";
import {
  ciMean,
  cohensD,
  correlation,
  customerRetentionRate,
  descriptive,
  errorRate,
  funnel,
  participantsForDiscovery,
  problemDiscovery,
  retention,
  sampleSizeMean,
  sampleSizeProportion,
  sampleSizeTwoProportions,
  stickiness,
  taskSuccess,
  timeOnTask,
  twoProportionTest,
} from "./stats";
import { aspectRatio, contrastRatio, gridColumns, modularScale, parseHex, relativeLuminance, wcagChecks } from "./visual";

describe("distributions", () => {
  it("normal CDF matches tables", () => {
    expect(normalCdf(0)).toBeCloseTo(0.5, 7);
    expect(normalCdf(1.96)).toBeCloseTo(0.975, 4);
    expect(normalCdf(-1.645)).toBeCloseTo(0.05, 3);
  });
  it("inverse normal matches tables", () => {
    expect(normalInv(0.975)).toBeCloseTo(1.959964, 5);
    expect(normalInv(0.8)).toBeCloseTo(0.841621, 5);
    expect(normalInv(0.995)).toBeCloseTo(2.575829, 5);
  });
  it("Student t critical values match tables", () => {
    expect(tInv(0.975, 9)).toBeCloseTo(2.262157, 4);
    expect(tInv(0.975, 4)).toBeCloseTo(2.776445, 4);
    expect(tInv(0.975, 29)).toBeCloseTo(2.04523, 4);
    expect(tInv(0.95, 1)).toBeCloseTo(6.313752, 3);
    expect(tCdf(2.262157, 9)).toBeCloseTo(0.975, 5);
  });
  it("linear regression recovers an exact line", () => {
    const fit = linearFit([1, 2, 3, 4], [3, 5, 7, 9]);
    expect(fit.slope).toBeCloseTo(2);
    expect(fit.intercept).toBeCloseTo(1);
    expect(fit.r2).toBeCloseTo(1);
  });
  it("parses number lists and rejects junk", () => {
    expect(parseNumberList("1, 2\n3;4  5")).toEqual([1, 2, 3, 4, 5]);
    expect(() => parseNumberList("1, two")).toThrow(FormulaInputError);
  });
});

describe("Fitts's law", () => {
  it("Shannon ID: log2(D/W + 1)", () => {
    expect(fittsId(300, 20)).toBeCloseTo(4, 10); // log2(16)
    expect(fittsId(400, 40)).toBeCloseTo(3.459432, 5); // log2(11)
  });
  it("original and Welford formulations", () => {
    expect(fittsId(160, 20, "original")).toBeCloseTo(4, 10); // log2(16)
    expect(fittsId(300, 20, "welford")).toBeCloseTo(Math.log2(15.5), 10);
  });
  it("only the D/W ratio matters", () => expect(fittsId(150, 30)).toBeCloseTo(fittsId(300, 60), 12));
  it("effective width and throughput", () => {
    expect(effectiveWidth(10)).toBeCloseTo(41.33, 6);
    expect(throughput(4, 0.8)).toBeCloseTo(5, 10);
  });
  it("rejects invalid input", () => {
    expect(() => fittsId(0, 10)).toThrow(FormulaInputError);
    expect(() => fittsId(100, -1)).toThrow(FormulaInputError);
  });
});

describe("Hick-Hyman law", () => {
  it("equal probabilities: log2 n", () => {
    expect(hickInformationEqual(8)).toBeCloseTo(3, 10);
    expect(hickInformationEqual(1)).toBe(0);
    expect(hickInformationEqual(7, "hick")).toBeCloseTo(3, 10); // log2(7+1)
  });
  it("unequal probabilities give less information than equal", () => {
    expect(hickInformation([0.5, 0.25, 0.125, 0.125]).H).toBeCloseTo(1.75, 10);
    expect(hickInformation([1, 1, 1, 1]).H).toBeCloseTo(2, 10);
    expect(hickInformation([2, 1, 1]).normalised).toEqual([0.5, 0.25, 0.25]);
  });
});

describe("Steering law & KLM", () => {
  it("steering ID sums L/W over segments", () => {
    expect(steeringId([{ length: 200, width: 20 }, { length: 100, width: 25 }])).toBeCloseTo(14, 10);
  });
  it("parses KLM sequences with repeats and response time", () => {
    const steps = parseKlm("M P BB H 4K R(0.5)", 0.2);
    const { total, byOperator } = klmTotal(steps);
    // 1.35 + 1.1 + 0.2 + 0.4 + 0.8 + 0.5
    expect(total).toBeCloseTo(4.35, 10);
    expect(byOperator.K).toBeCloseTo(0.8, 10);
  });
  it("rejects unknown operators", () => expect(() => parseKlm("M X")).toThrow(FormulaInputError));
});

describe("questionnaires", () => {
  it("SUS: neutral responses give 50, best 100, worst 0", () => {
    expect(susScore(Array(10).fill(3)).score).toBe(50);
    expect(susScore([5, 1, 5, 1, 5, 1, 5, 1, 5, 1]).score).toBe(100);
    expect(susScore([1, 5, 1, 5, 1, 5, 1, 5, 1, 5]).score).toBe(0);
  });
  it("SUS mixed example computed by hand", () => {
    // contributions: 3,3,2,3,3,2,3,4,2,3 = 28 → 70
    expect(susScore([4, 2, 3, 2, 4, 3, 4, 1, 3, 2]).score).toBe(70);
  });
  it("SUS rejects out-of-range and wrong length", () => {
    expect(() => susScore([1, 2, 3])).toThrow(FormulaInputError);
    expect(() => susScore([6, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toThrow(FormulaInputError);
  });
  it("UMUX-LITE raw and adjusted", () => {
    const r = umuxLite(7, 7);
    expect(r.raw).toBe(100);
    expect(r.adjusted).toBeCloseTo(87.9, 10);
    expect(umuxLite(4, 4).raw).toBe(50);
  });
  it("NASA-TLX raw and weighted", () => {
    expect(nasaTlxRaw([60, 10, 40, 30, 50, 20])).toBeCloseTo(35, 10);
    // weights sum 15: 5,0,3,2,4,1 → (300+0+120+60+200+20)/15 = 46.666…
    expect(nasaTlxWeighted([60, 10, 40, 30, 50, 20], [5, 0, 3, 2, 4, 1])).toBeCloseTo(46.6667, 3);
    expect(() => nasaTlxWeighted([60, 10, 40, 30, 50, 20], [5, 5, 5, 5, 5, 5])).toThrow(FormulaInputError);
  });
  it("TLX has 15 pairs and pairwise weights sum to 15", () => {
    expect(TLX_PAIRS).toHaveLength(15);
    const w = tlxWeightsFromPairs(TLX_PAIRS.map(([a]) => a));
    expect(w.reduce((s, x) => s + x, 0)).toBe(15);
    expect(w).toEqual([5, 4, 3, 2, 1, 0]);
  });
  it("NPS = %promoters − %detractors", () => {
    const r = nps(50, 30, 20);
    expect(r.nps).toBeCloseTo(30, 10);
    // variance = .5 + .2 − .09 = .61; se = sqrt(.61/100) = .0781; MoE = 1.96 × 7.81 ≈ 15.31
    expect(r.marginOfError).toBeCloseTo(15.31, 1);
    expect(npsFromRatings([10, 9, 8, 7, 6, 0]).nps).toBeCloseTo(0, 10);
  });
  it("CSAT top-two-box and CES mean", () => {
    const c = csat([5, 5, 10, 40, 40]);
    expect(c.csat).toBe(80);
    expect(c.mean).toBeCloseTo((5 + 10 + 30 + 160 + 200) / 100, 10);
    const e = ces([0, 0, 0, 10, 20, 50, 20]);
    expect(e.mean).toBeCloseTo((40 + 100 + 300 + 140) / 100, 10);
    expect(e.agreeShare).toBe(90);
  });
});

describe("usability metrics", () => {
  it("adjusted-Wald interval for 4/5 (Sauro & Lewis example ≈ 36%–98%)", () => {
    const r = taskSuccess(4, 5);
    expect(r.p).toBe(0.8);
    expect(r.low).toBeCloseTo(0.3596, 3);
    expect(r.high).toBeCloseTo(0.9797, 3);
  });
  it("adjusted-Wald never leaves [0, 1]", () => {
    const r = taskSuccess(5, 5);
    expect(r.high).toBeLessThanOrEqual(1);
    expect(taskSuccess(0, 5).low).toBeGreaterThanOrEqual(0);
  });
  it("time on task: geometric mean ≤ arithmetic mean", () => {
    const r = timeOnTask([20, 30, 40, 120]);
    expect(r.geometricMean).toBeCloseTo((20 * 30 * 40 * 120) ** 0.25, 8);
    expect(r.geometricMean).toBeLessThan(r.mean);
    expect(r.low).toBeLessThan(r.geometricMean);
    expect(r.high).toBeGreaterThan(r.geometricMean);
  });
  it("error rate", () => {
    const r = errorRate(6, 60, 20, 4, 10);
    expect(r.perOpportunity).toBeCloseTo(0.1);
    expect(r.perAttempt).toBeCloseTo(0.3);
    expect(r.shareOfUsers).toBeCloseTo(0.4);
  });
  it("problem discovery: 1 − (1 − p)^n", () => {
    expect(problemDiscovery(0.31, 5)).toBeCloseTo(1 - 0.69 ** 5, 10); // ≈ 0.8436
    expect(participantsForDiscovery(0.31, 0.85)).toBe(6); // ln(.15)/ln(.69) = 5.11 → 6
  });
});

describe("product metrics", () => {
  it("funnel conversion and drop-off", () => {
    const f = funnel([1000, 400, 100]);
    expect(f.steps[1].stepConversion).toBeCloseTo(0.4);
    expect(f.steps[2].dropOff).toBeCloseTo(0.75);
    expect(f.overall).toBeCloseTo(0.1);
    expect(() => funnel([100, 200])).toThrow(FormulaInputError);
  });
  it("retention, churn, CRR and stickiness", () => {
    expect(retention(200, 150).churn).toBeCloseTo(0.25);
    expect(customerRetentionRate(1000, 1100, 200).crr).toBeCloseTo(0.9);
    expect(stickiness(2000, 10000)).toBeCloseTo(0.2);
  });
});

describe("statistics", () => {
  it("descriptive statistics", () => {
    const d = descriptive([2, 4, 4, 4, 5, 5, 7, 9]);
    expect(d.mean).toBe(5);
    expect(d.median).toBe(4.5);
    expect(d.modes).toEqual([4]);
    expect(d.populationSd).toBeCloseTo(2, 10);
    expect(d.sampleVariance).toBeCloseTo(32 / 7, 10);
  });
  it("t confidence interval for a mean", () => {
    // mean 50, sd 10, n 10 → t(.975, 9) = 2.262157 × 3.162278 = 7.1535
    const r = ciMean(50, 10, 10);
    expect(r.margin).toBeCloseTo(7.1535, 3);
  });
  it("two-proportion z-test (200/1000 vs 250/1000)", () => {
    const r = twoProportionTest(200, 1000, 250, 1000);
    // pooled .225; se = sqrt(.225 × .775 × .002) = .018674; z = .05/.018674 = 2.6775
    expect(r.z).toBeCloseTo(2.6775, 3);
    expect(r.pValue).toBeCloseTo(0.00742, 4);
    expect(r.relativeLift).toBeCloseTo(0.25, 10);
    expect(r.significant).toBe(true);
  });
  it("Cohen's d and Hedges' g", () => {
    const r = cohensD(10, 2, 20, 8, 2, 20);
    expect(r.d).toBeCloseTo(1, 10);
    expect(r.g).toBeCloseTo(1 - 3 / (4 * 40 - 9), 10);
  });
  it("sample sizes", () => {
    expect(sampleSizeProportion(0.5, 0.05)).toBe(385); // 384.15 → 385
    expect(sampleSizeMean(15, 5)).toBe(35); // (1.96×3)^2 = 34.57 → 35
    // 10% → 12%, α .05, power .8: ≈ 3841 per group (standard tables give ≈3839–3843)
    const n = sampleSizeTwoProportions(0.1, 0.12);
    expect(n).toBeGreaterThan(3830);
    expect(n).toBeLessThan(3850);
  });
  it("correlation with t-test", () => {
    const r = correlation([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]);
    expect(r.r).toBeCloseTo(0.7746, 3); // r = 6 / sqrt(10 × 6)
    expect(r.df).toBe(3);
    expect(r.pValue).toBeGreaterThan(0.1);
  });
});

describe("visual mathematics", () => {
  it("parses hex", () => {
    expect(parseHex("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(() => parseHex("#ggg")).toThrow(FormulaInputError);
  });
  it("relative luminance endpoints", () => {
    expect(relativeLuminance(parseHex("#000"))).toBe(0);
    expect(relativeLuminance(parseHex("#fff"))).toBeCloseTo(1, 10);
  });
  it("contrast ratios match WCAG reference values", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 10);
    expect(contrastRatio("#ffffff", "#ffffff")).toBeCloseTo(1, 10);
    expect(contrastRatio("#767676", "#ffffff")).toBeCloseTo(4.54, 2); // smallest grey passing AA on white
    expect(contrastRatio("#777777", "#ffffff")).toBeCloseTo(4.48, 2); // fails AA
    expect(contrastRatio("#777", "#fff")).toBeCloseTo(contrastRatio("#fff", "#777"), 12);
  });
  it("threshold checks use unrounded ratios", () => {
    const fails = wcagChecks(contrastRatio("#777777", "#ffffff"));
    expect(fails.find((c) => c.id === "1.4.3-normal")!.pass).toBe(false);
    expect(fails.find((c) => c.id === "1.4.3-large")!.pass).toBe(true);
  });
  it("modular scale", () => {
    const s = modularScale(16, 1.25, 1, 2);
    expect(s.map((x) => x.size)).toEqual([12.8, 16, 20, 25]);
  });
  it("grid columns", () => {
    const g = gridColumns(1200, 12, 24, 0);
    expect(g.column).toBeCloseTo(78, 10);
    expect(g.span(3)).toBeCloseTo(282, 10);
    expect(() => gridColumns(100, 12, 24, 0)).toThrow(FormulaInputError);
  });
  it("aspect ratio", () => expect(aspectRatio(1920, 1080)).toMatchObject({ w: 16, h: 9 }));
});

import { chunk, peakEnd } from "./experience";

describe("experience models", () => {
  it("peak-end average uses the most intense and the final moment", () => {
    const r = peakEnd([2, 3, 9, 4, 5]);
    expect(r.peakIndex).toBe(2);
    expect(r.peakEndAverage).toBe(7); // (9 + 5) / 2
    expect(r.mean).toBeCloseTo(4.6, 10);
  });
  it("supports pain ratings where the peak is the minimum", () => {
    expect(peakEnd([0, -8, -2], "min").peakEndAverage).toBe(-5);
  });
  it("adding a milder final period lowers remembered pain though total pain grows (cold-pressor pattern)", () => {
    const short = peakEnd([-6, -8, -8], "min");
    const long = peakEnd([-6, -8, -8, -5], "min");
    expect(long.peakEndAverage).toBeGreaterThan(short.peakEndAverage);
    expect(long.total).toBeLessThan(short.total);
  });
  it("chunks symbols", () => {
    expect(chunk("415 926 535", 3)).toEqual(["415", "926", "535"]);
    expect(chunk("12345", 2)).toEqual(["12", "34", "5"]);
    expect(() => chunk("123", 0)).toThrow();
  });
});
