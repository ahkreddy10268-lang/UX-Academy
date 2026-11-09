/**
 * Fitts's law — two Level-2 visuals with different jobs:
 *  1. Formula anatomy: each symbol of MT = a + b·log₂(D/W + 1) tied to the
 *     geometry it measures.
 *  2. Interface comparison: the same action placed two ways, with the index of
 *     difficulty computed by lib/formulas (no time is claimed, because time
 *     needs a and b fitted to a device and person).
 */
import { fittsId } from "@/lib/formulas/pointing";
import { Cursor } from "../../illustrations/primitives";
import { ComparisonDiagram } from "../diagrams/comparison";
import { FormulaAnatomy } from "../diagrams/formula-anatomy";

/** Geometry in the sheet language: text ≥ 15 units in a 360-unit viewBox, so ≥ 12 px in a phone-width panel (D-101). */
function Geometry() {
  const SANS = "var(--font-plex-sans), sans-serif";
  const MONO = "var(--font-plex-mono), monospace";
  const sx = 46;
  const sy = 140;
  const tx = 262;
  const tw = 40;
  const tcx = tx + tw / 2;
  const mark = (x: number, y: number, n: number) => (
    <g key={n}>
      <circle cx={x} cy={y} r={12} fill="var(--accent)" />
      <text x={x} y={y + 5.4} textAnchor="middle" fontSize="15" fontWeight={600} fill="var(--surface)" fontFamily={MONO}>
        {n}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 230" className="h-auto w-full" role="img" aria-label="A start point on the left, a vertical target bar on the right. Marker 3 labels the distance D from the start to the target's centre; marker 4 labels the target width W measured along the direction of movement.">
      <rect x={tx} y={44} width={tw} height={140} rx={4} fill="var(--accent-wash)" stroke="var(--accent)" strokeWidth={1.2} />
      <line x1={tcx} y1={44} x2={tcx} y2={196} stroke="var(--rule-strong)" strokeWidth={1} strokeDasharray="3 3" />
      <path d={`M${sx} ${sy} C 110 64, 200 64, ${tcx - 4} 108`} fill="none" stroke="var(--ink-2)" strokeWidth={1.6} strokeDasharray="1 6" strokeLinecap="round" />
      <circle cx={sx} cy={sy} r={7} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.6} />
      <circle cx={sx} cy={sy} r={2.4} fill="var(--ink)" />
      <text x={sx} y={sy + 28} textAnchor="middle" fontSize="15" fill="var(--ink-2)" fontFamily={SANS}>
        start
      </text>
      <Cursor x={tcx - 6} y={104} />
      {/* D: start to the target's centre */}
      <path d={`M${sx} 206 H${tcx} M${sx} 199 V213 M${tcx} 199 V213`} stroke="var(--ink)" strokeWidth={1.2} fill="none" />
      <text x={(sx + tcx) / 2 + 20} y={226} fontSize="15" fontWeight={600} fill="var(--ink)" fontFamily={MONO}>
        D
      </text>
      {/* W: width along the direction of movement */}
      <path d={`M${tx} 26 H${tx + tw} M${tx} 19 V33 M${tx + tw} 19 V33`} stroke="var(--ink)" strokeWidth={1.2} fill="none" />
      <text x={tcx} y={16} textAnchor="middle" fontSize="15" fontWeight={600} fill="var(--ink)" fontFamily={MONO}>
        W
      </text>
      {mark((sx + tcx) / 2, 206, 3)}
      {mark(tx + tw + 22, 26, 4)}
    </svg>
  );
}

export function FittsAnatomy() {
  return (
    <FormulaAnatomy
      terms={[{ text: "MT" }, { text: "=" }, { text: "a", marker: 1 }, { text: "+" }, { text: "b", marker: 2 }, { text: "·" }, { text: "log₂(" }, { text: "D", marker: 3 }, { text: "/" }, { text: "W", marker: 4 }, { text: "+ 1)" }]}
      legend={[
        { marker: 1, symbol: "a (s)", meaning: "Intercept: the part of the time that does not grow with difficulty, often attributed to reacting, starting and pressing. Fitted to data for one device and group of people." },
        { marker: 2, symbol: "b (s/bit)", meaning: "Slope: extra time for each bit of difficulty. Also fitted, never universal." },
        { marker: 3, symbol: "D", meaning: "Distance from the start point to the centre of the target." },
        { marker: 4, symbol: "W", meaning: "Width of the target measured along the direction of movement." },
      ]}
      visual={<Geometry />}
    />
  );
}

/** Two placements of the same "Save" action; distances and widths are stated in the visual. */
const BEFORE = { D: 480, W: 20 };
const AFTER = { D: 80, W: 48 };

function Dialog({ variant }: { variant: "before" | "after" }) {
  const after = variant === "after";
  return (
    <svg viewBox="0 0 320 190" className="h-auto w-full" role="img" aria-label={after ? "A form whose Save button sits directly under the last field, full width." : "A form whose only Save control is a small icon in the far top-right corner."}>
      <rect x={10} y={10} width={300} height={170} rx={10} fill="var(--surface)" stroke="var(--rule-strong)" />
      <rect x={10} y={10} width={300} height={32} rx={10} fill="var(--soft)" />
      <text x={24} y={31} fontSize="15" fontWeight={600} fill="var(--ink-2)" fontFamily="var(--font-plex-sans), sans-serif">Edit profile</text>
      {[54, 84, 114].map((y) => (
        <rect key={y} x={24} y={y} width={272} height={20} rx={5} fill="var(--soft)" stroke="var(--line-control)" strokeWidth={0.8} />
      ))}
      {after ? (
        <>
          <rect x={24} y={142} width={272} height={30} rx={6} fill="var(--accent)" />
          <text x={160} y={162} textAnchor="middle" fontSize="15" fontWeight={600} fill="var(--surface)" fontFamily="var(--font-plex-sans), sans-serif">Save</text>
          <path d="M200 124 L200 140" stroke="var(--ink)" strokeWidth={1.5} strokeDasharray="1 4" strokeLinecap="round" />
          <Cursor x={198} y={150} />
        </>
      ) : (
        <>
          <rect x={284} y={16} width={20} height={20} rx={4} fill="var(--accent)" />
          <path d="M200 124 C 240 90, 270 50, 292 28" fill="none" stroke="var(--ink)" strokeWidth={1.5} strokeDasharray="1 4" strokeLinecap="round" />
          <Cursor x={290} y={26} />
        </>
      )}
      <circle cx={200} cy={124} r={4} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.5} />
    </svg>
  );
}

export function FittsComparison() {
  const before = fittsId(BEFORE.D, BEFORE.W);
  const after = fittsId(AFTER.D, AFTER.W);
  return (
    <ComparisonDiagram
      before={{
        title: "Save as a small icon in the far corner",
        visual: <Dialog variant="before" />,
        points: [
          { label: "Problem", text: "People finishing the last field travel across the whole dialog and slow down to land on a 20 px icon." },
          { label: "Why", text: <>The pointer starts {BEFORE.D} px away and the target is {BEFORE.W} px wide along the approach: ID = log₂({BEFORE.D}/{BEFORE.W} + 1) = <span className="formula">{before.toFixed(2)} bits</span>.</> },
        ],
      }}
      after={{
        title: "Save as a full-width button below the last field",
        visual: <Dialog variant="after" />,
        points: [
          { label: "Intervention", text: "Place the primary action where the task ends and make it larger along the direction people approach it." },
          { label: "Why it helps", text: <>Distance {AFTER.D} px, width along a vertical approach {AFTER.W} px: ID = log₂({AFTER.D}/{AFTER.W} + 1) = <span className="formula">{after.toFixed(2)} bits</span>.</> },
        ],
      }}
      effect={
        <>
          The index of difficulty falls from {before.toFixed(2)} to {after.toFixed(2)} bits. How many milliseconds that saves depends on <em>a</em> and <em>b</em> for the device and person — measure your own in the Fitts&apos;s law lab. Size is not everything: a full-width
          button must still look like the primary action.
        </>
      }
      effectKind="computed"
    />
  );
}
