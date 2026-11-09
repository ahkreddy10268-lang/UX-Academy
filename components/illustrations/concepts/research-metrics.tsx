/** Plates: research-metrics. Authored to docs/ILLUSTRATION_SYSTEM.md rules. */
import type { IllustrationEntry } from "../illustration-types";
import { usabilityTestingPlate } from "./foundation-sheets";
import { C, Label, STROKE } from "../primitives";
import { heuristicEvaluationPlate as heuristicEvaluation } from "./learning-sheets";
import { susPlate as systemUsabilityScale } from "./learning-sheets";
import { cognitiveWalkthroughPlate as cognitiveWalkthrough } from "./learning-sheets";
import { taskSuccessPlate as taskSuccessRate } from "./learning-sheets";
import { nasaTlxPlate as nasaTlx } from "./learning-sheets";
import { sampleSizePlate as sampleSizeEstimation } from "./learning-sheets";
import { abTestingPlate as abTesting } from "./learning-sheets";
import { cardSortingPlate as cardSorting } from "./learning-sheets";
import { npsPlate as netPromoterScore } from "./learning-sheets";

const ci = [
  [-18, 40],
  [10, 36],
  [-6, 42],
  [24, 38],
  [-30, 40],
  [4, 34],
  [64, 38],
  [-12, 44],
  [16, 36],
  [-2, 40],
  [30, 42],
  [-22, 38],
];

const confidenceIntervals: IllustrationEntry = {
  slug: "confidence-intervals",
  title: "Confidence intervals plate",
  description:
    "A vertical dashed line marks the true population mean. Twelve horizontal intervals, each from a different random sample, are stacked beneath it; each has its sample mean as a dot. Eleven intervals cross the true mean and one, highlighted, misses it — a 95% procedure captures the true value in about 95% of repeated samples, not with 95% probability in any single interval.",
  Art: ({ detail }) => (
    <g>
      <line x1={200} y1={40} x2={200} y2={258} stroke={C.line} strokeWidth={STROKE.main} strokeDasharray="6 4" />
      {ci.map(([off, half], i) => {
        const y = 54 + i * 17;
        const c = 200 + off;
        const miss = c - half > 200 || c + half < 200;
        return (
          <g key={i}>
            <line x1={c - half} y1={y} x2={c + half} y2={y} stroke={miss ? C.ink : C.line} strokeWidth={miss ? 4 : STROKE.fine * 1.4} />
            <line x1={c - half} y1={y - 4} x2={c - half} y2={y + 4} stroke={miss ? C.ink : C.line} strokeWidth={STROKE.fine} />
            <line x1={c + half} y1={y - 4} x2={c + half} y2={y + 4} stroke={miss ? C.ink : C.line} strokeWidth={STROKE.fine} />
            <circle cx={c} cy={y} r={miss ? 5 : 3.6} fill={miss ? C.paper : C.base} stroke={C.line} strokeWidth={STROKE.fine} />
          </g>
        );
      })}
      <Label x={200} y={32} show={detail} tone="line">
        true mean
      </Label>
      <Label x={312} y={160} anchor="start" show={detail} size={10}>
        misses
      </Label>
      <Label x={200} y={280} show={detail} size={10} tone="mute">
        11 of 12 intervals capture it
      </Label>
    </g>
  ),
};

const plates: IllustrationEntry[] = [
  heuristicEvaluation,
  cognitiveWalkthrough,
  usabilityTestingPlate,
  cardSorting,
  systemUsabilityScale,
  nasaTlx,
  netPromoterScore,
  taskSuccessRate,
  abTesting,
  confidenceIntervals,
  sampleSizeEstimation,
];
export default plates;
