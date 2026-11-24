/**
 * Weber's law — Level-2 measurement and range figure (illustrative curves).
 * 1. A discrimination trial: reference against comparison.
 * 2. A psychometric function at reference 100; the threshold is read at the
 *    75 % criterion (ΔI = 2, matching k = 0.02).
 * 3. Weber fraction across references: the ideal flat k = 0.02 and a
 *    generalised form ΔI = k·I + c whose fraction rises at low intensity, the
 *    kind of deviation reported for many senses (Penconek 2025).
 * Every number is computed by lib/formulas/psychophysics; nothing is data.
 */
import {
  differenceThreshold,
  generalisedWeberThreshold,
  intensityAtCriterion,
  psychometricNormal,
  weberFraction,
} from "@/lib/formulas/psychophysics";

const SANS = "var(--font-plex-sans), sans-serif";
const MONO = "var(--font-plex-mono), monospace";

// Psychometric function at reference 100, spread chosen so the 75 % threshold is 2 (k = 0.02).
const Z75 = intensityAtCriterion({ mu: 0, sigma: 1 }, 0.75);
const PF = { mu: 100, sigma: 2 / Z75 };
const JND = differenceThreshold(PF, 0.75);
const X75 = intensityAtCriterion(PF, 0.75);
const pfX = (v: number) => 40 + ((v - 94) * 300) / 12;
const pfY = (p: number) => 222 - p * 110;
const PF_PATH = Array.from({ length: 49 }, (_, i) => 94 + i * 0.25)
  .map((v, i) => `${i ? "L" : "M"}${pfX(v).toFixed(1)} ${pfY(psychometricNormal(v, PF)).toFixed(1)}`)
  .join(" ");

// Weber fraction across references (log axis 10–500).
const K = 0.02;
const C = 1;
const lx = (i: number) => 40 + ((Math.log10(i) - 1) * 300) / Math.log10(50);
const fy = (f: number) => 400 - f * 780;
const REFS = Array.from({ length: 41 }, (_, i) => 10 * Math.pow(50, i / 40));
const GEN_PATH = REFS.map((i, n) => `${n ? "L" : "M"}${lx(i).toFixed(1)} ${fy(weberFraction(generalisedWeberThreshold(i, K, C), i)).toFixed(1)}`).join(" ");
const F10 = weberFraction(generalisedWeberThreshold(10, K, C), 10);
const fmt = (v: number) => `${+v.toFixed(2)}`;

export function WeberMeasurement() {
  return (
    <svg
      viewBox="0 0 360 470"
      className="h-auto w-full"
      role="img"
      aria-label="An illustrative three-part figure. 1: a trial compares a reference of 100 units with a comparison between 94 and 106, and asks which is greater. 2: a psychometric function rises from near 0 to near 1 as the comparison increases; it crosses 50 percent at 100 and 75 percent at 102, so the threshold at the 75 percent criterion is 2 units, a Weber fraction of 0.02. 3: Weber fraction plotted against reference intensity from 10 to 500 on a log scale. The ideal Weber's law is a flat dashed line at 0.02. A generalised form with an added constant rises to 0.12 at the lowest reference and approaches 0.02 at high references, the kind of low-intensity deviation reported for many senses."
    >
      <text x={0} y={16} fontSize="15" fontWeight={600} fill="var(--ink)" fontFamily={SANS}>1 · Compare, many times</text>
      <rect x={0} y={28} width={112} height={34} rx={6} fill="none" stroke="var(--rule-strong)" />
      <text x={56} y={50} textAnchor="middle" fontSize="15" fill="var(--ink)" fontFamily={SANS}>Reference 100</text>
      <rect x={120} y={28} width={154} height={34} rx={6} fill="none" stroke="var(--rule-strong)" />
      <text x={197} y={50} textAnchor="middle" fontSize="15" fill="var(--ink)" fontFamily={SANS}>Comparison 94–106</text>
      <text x={282} y={50} fontSize="15" fill="var(--ink-2)" fontFamily={SANS}>Greater?</text>

      <text x={0} y={92} fontSize="15" fontWeight={600} fill="var(--ink)" fontFamily={SANS}>2 · Read the threshold</text>
      <line x1={40} y1={104} x2={40} y2={222} stroke="var(--rule-strong)" strokeWidth={1} />
      <line x1={40} y1={222} x2={344} y2={222} stroke="var(--rule-strong)" strokeWidth={1} />
      <text x={34} y={pfY(1) + 5} textAnchor="end" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>1</text>
      <text x={34} y={pfY(0.75) + 5} textAnchor="end" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>.75</text>
      <text x={34} y={pfY(0.5) + 5} textAnchor="end" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>.5</text>
      <line x1={40} y1={pfY(0.75)} x2={pfX(X75)} y2={pfY(0.75)} stroke="var(--ink-2)" strokeWidth={1} strokeDasharray="4 4" />
      <line x1={40} y1={pfY(0.5)} x2={pfX(PF.mu)} y2={pfY(0.5)} stroke="var(--ink-2)" strokeWidth={1} strokeDasharray="4 4" />
      <line x1={pfX(PF.mu)} y1={pfY(0.5)} x2={pfX(PF.mu)} y2={222} stroke="var(--ink-2)" strokeWidth={1} strokeDasharray="4 4" />
      <line x1={pfX(X75)} y1={pfY(0.75)} x2={pfX(X75)} y2={222} stroke="var(--ink-2)" strokeWidth={1} strokeDasharray="4 4" />
      <path d={PF_PATH} fill="none" stroke="var(--ink)" strokeWidth={2.4} />
      <line x1={pfX(PF.mu)} y1={212} x2={pfX(X75)} y2={212} stroke="var(--accent)" strokeWidth={3} />
      <text x={pfX(X75) + 8} y={203} fontSize="15" fill="var(--ink)" fontFamily={SANS}>{`ΔI = ${fmt(JND)} at 75 %`}</text>
      <text x={pfX(94)} y={240} textAnchor="middle" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>94</text>
      <text x={pfX(PF.mu)} y={240} textAnchor="middle" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>100</text>
      <text x={pfX(106)} y={240} textAnchor="middle" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>106</text>
      <text x={0} y={262} fontSize="15" fill="var(--ink-2)" fontFamily={SANS}>{`Share judged greater · ΔI / I = ${fmt(JND / PF.mu)}`}</text>

      <text x={0} y={296} fontSize="15" fontWeight={600} fill="var(--ink)" fontFamily={SANS}>3 · Repeat across the range</text>
      <line x1={40} y1={304} x2={40} y2={400} stroke="var(--rule-strong)" strokeWidth={1} />
      <line x1={40} y1={400} x2={344} y2={400} stroke="var(--rule-strong)" strokeWidth={1} />
      <text x={34} y={fy(K) + 5} textAnchor="end" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>{fmt(K)}</text>
      <text x={34} y={fy(F10) + 5} textAnchor="end" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>{fmt(F10)}</text>
      <line x1={lx(10)} y1={fy(K)} x2={lx(500)} y2={fy(K)} stroke="var(--ink-2)" strokeWidth={2} strokeDasharray="7 5" />
      <path d={GEN_PATH} fill="none" stroke="var(--ink)" strokeWidth={2.4} />
      <text x={lx(10)} y={418} textAnchor="middle" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>10</text>
      <text x={lx(100)} y={418} textAnchor="middle" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>100</text>
      <text x={lx(500)} y={418} textAnchor="middle" fontSize="14" fill="var(--ink-2)" fontFamily={MONO}>500</text>
      <text x={150} y={330} fontSize="15" fill="var(--ink)" fontFamily={SANS}>ΔI = kI + c: rises</text>
      <text x={150} y={348} fontSize="15" fill="var(--ink)" fontFamily={SANS}>at low intensity</text>
      <g fontSize="15" fontFamily={SANS} fill="var(--ink)">
        <line x1={0} y1={440} x2={20} y2={440} stroke="var(--ink-2)" strokeWidth={2} strokeDasharray="7 5" />
        <text x={26} y={445}>{"ideal Weber's law"}</text>
        <line x1={170} y1={440} x2={190} y2={440} stroke="var(--ink)" strokeWidth={2.4} />
        <text x={196} y={445}>with a deviation</text>
      </g>
      <text x={0} y={466} fontSize="15" fill="var(--ink-2)" fontFamily={SANS}>Reference I, log scale · schematic, not data</text>
    </svg>
  );
}
