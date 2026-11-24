/**
 * Power law of practice — Level-2 model comparison (illustrative curves).
 * Top: power, exponential and delayed-exponential forms (Evans et al. 2018)
 * from the same starting time and asymptote. Bottom: two individual
 * exponential learners and their point-by-point average, the averaging
 * artefact described by Heathcote et al. (2000). Every curve is computed by
 * lib/formulas; parameters are illustrative, not fitted to data.
 */
import {
  meanCurve,
  practiceCurve,
  practiceDelayedExponential,
  practiceExponential,
  practicePower,
} from "@/lib/formulas/experience";

const SANS = "var(--font-plex-sans), sans-serif";
const MONO = "var(--font-plex-mono), monospace";
const N_MAX = 40;
const x = (n: number) => 40 + ((n - 1) * 300) / (N_MAX - 1);

// Same start (14 s on trial 1) and asymptote (2 s) for all three forms.
const POWER = practiceCurve((n) => practicePower(n, { A: 2, B: 12, alpha: 0.5 }), 1, N_MAX);
const EXPO = practiceCurve((n) => practiceExponential(n, { A: 2, B: 13.53, r: 0.12 }), 1, N_MAX);
const DELAYED = practiceCurve((n) => practiceDelayedExponential(n, { A: 2, B: 12.16, r: 0.25, tau: 20 }), 1, N_MAX);

// Two exponential learners with different rates, and their average.
const FAST = practiceCurve((n) => practiceExponential(n, { A: 2, B: 12, r: 0.6 }), 1, N_MAX);
const SLOW = practiceCurve((n) => practiceExponential(n, { A: 2, B: 12, r: 0.06 }), 1, N_MAX);
const AVG = meanCurve([FAST, SLOW]);

const path = (pts: { n: number; t: number }[], y: (t: number) => number) =>
  pts.map((p, i) => `${i ? "L" : "M"}${x(p.n).toFixed(1)} ${y(p.t).toFixed(1)}`).join(" ");

const yA = (t: number) => 150 - t * 8;
const yB = (t: number) => 346 - t * 7;

function Axes({ top, bottom }: { top: number; bottom: number }) {
  return (
    <g>
      <line x1={40} y1={top} x2={40} y2={bottom} stroke="var(--rule-strong)" strokeWidth={1} />
      <line x1={40} y1={bottom} x2={344} y2={bottom} stroke="var(--rule-strong)" strokeWidth={1} />
      <text x={36} y={top + 12} textAnchor="end" fontSize="15" fill="var(--ink-2)" fontFamily={SANS}>time</text>
      <text x={344} y={bottom + 17} textAnchor="end" fontSize="15" fill="var(--ink-2)" fontFamily={SANS}>trials →</text>
    </g>
  );
}

export function PracticeModels() {
  return (
    <svg
      viewBox="0 0 360 430"
      className="h-auto w-full"
      role="img"
      aria-label="Two illustrative charts of time against practice trials. Top: three curves starting at the same time and approaching the same floor. The power curve (solid) drops steeply then flattens slowly; the exponential (dashed) drops more evenly and flattens sooner; the delayed exponential (dotted) stays high for several trials, then falls quickly. Bottom: a fast and a slow exponential learner (thin solid) and their average (thick dashed), which follows neither learner's curve."
    >
      <text x={0} y={16} fontSize="15" fontWeight={600} fill="var(--ink)" fontFamily={SANS}>Three forms, same start (illustrative)</text>
      <Axes top={28} bottom={150} />
      <path d={path(POWER, yA)} fill="none" stroke="var(--ink)" strokeWidth={2.2} />
      <path d={path(EXPO, yA)} fill="none" stroke="var(--ink-2)" strokeWidth={2} strokeDasharray="7 5" />
      <path d={path(DELAYED, yA)} fill="none" stroke="var(--accent)" strokeWidth={2.4} strokeDasharray="1.5 4" strokeLinecap="round" />
      <g fontSize="15" fontFamily={SANS} fill="var(--ink)">
        <line x1={0} y1={184} x2={20} y2={184} stroke="var(--ink)" strokeWidth={2.2} />
        <text x={26} y={189}>power</text>
        <line x1={92} y1={184} x2={112} y2={184} stroke="var(--ink-2)" strokeWidth={2} strokeDasharray="7 5" />
        <text x={118} y={189}>exponential</text>
        <line x1={222} y1={184} x2={242} y2={184} stroke="var(--accent)" strokeWidth={2.4} strokeDasharray="1.5 4" strokeLinecap="round" />
        <text x={248} y={189}>delayed</text>
      </g>
      <text x={0} y={210} fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>N^−α · e^−rN · (τ+1)/(τ+e^rN)</text>

      <text x={0} y={244} fontSize="15" fontWeight={600} fill="var(--ink)" fontFamily={SANS}>Averaging two exponential learners</text>
      <Axes top={254} bottom={346} />
      <path d={path(FAST, yB)} fill="none" stroke="var(--ink-2)" strokeWidth={1.3} />
      <path d={path(SLOW, yB)} fill="none" stroke="var(--ink-2)" strokeWidth={1.3} />
      <path d={path(AVG, yB)} fill="none" stroke="var(--ink)" strokeWidth={2.6} strokeDasharray="7 5" />
      <g fontSize="15" fontFamily={SANS} fill="var(--ink)">
        <line x1={0} y1={384} x2={20} y2={384} stroke="var(--ink-2)" strokeWidth={1.3} />
        <text x={26} y={389}>two learners</text>
        <line x1={150} y1={384} x2={170} y2={384} stroke="var(--ink)" strokeWidth={2.6} strokeDasharray="7 5" />
        <text x={176} y={389}>their average</text>
      </g>
      <text x={0} y={418} fontSize="15" fill="var(--ink-2)" fontFamily={SANS}>The average matches neither learner</text>
    </svg>
  );
}
