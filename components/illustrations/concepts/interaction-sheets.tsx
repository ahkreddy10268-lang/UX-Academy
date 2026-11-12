/**
 * Cycle 1, Batch 1 plates (D-129): interaction principles of feedback and
 * state. Instructional sheets (D-089); explanations live in each plate's
 * figure key (D-101), never as microtext in the drawing.
 */
import type { IllustrationEntry } from "../illustration-types";
import { Marker, Pointer, S, TextBar, UiButton, UiText, Verdict } from "../system/sheet";
import { Card, head } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={S.ink2} strokeWidth="1.1" {...hair} />
      <polygon points={head(x2, y2, (x2 - x1) / len, (y2 - y1) / len)} fill={S.ink2} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Feedback: the action–result loop and three qualities of feedback      */
/* ------------------------------------------------------------------ */
export const feedbackPrinciplePlate: IllustrationEntry = {
  slug: "feedback-principle",
  title: "Feedback plate",
  canvas: "sheet",
  description:
    "Top row, a loop of three panels joined by arrows. Act: a pointer presses an Add button. System: out of sight, the basket changes from 1 to 2 items. Feedback: a tick with the word 'Added' and a badge showing 2. A dashed arrow runs from the feedback back under the panels to the button, closing the loop: the person compares what they see with what they meant to do. Bottom row, three comparisons. Immediate: a button already reading 'Adding…'. Informative: 'Done' marked with a cross beside 'Jacket added' marked with a tick. Proportionate: a small dialog over a dimmed screen marked with a cross beside a single inline line marked with a tick.",
  key: [
    { n: "1", label: "Act", detail: "the person does something — here, presses Add" },
    { n: "2", label: "The system changes", detail: "the basket goes from 1 to 2 items, which the person cannot see directly" },
    { n: "3", label: "Feedback", detail: "the interface shows the result: a confirmation and the new count" },
    { n: "4", label: "Evaluate", detail: "the person compares the feedback with what they intended, which closes the loop" },
    { n: "5", label: "Immediate", detail: "the control responds at once, before the work has finished" },
    { n: "6", label: "Informative", detail: "'Jacket added' says what changed; 'Done' does not" },
    { n: "7", label: "Proportionate", detail: "a routine action gets an inline message, not a blocking dialog" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* the loop */}
      <Card x={12} y={34} w={112} h={86} title="Act">
        <UiButton x={24} y={72} w={88} label="Add" />
        <Pointer x={84} y={92} />
      </Card>
      <Arrow x1={126} y1={84} x2={142} y2={84} />
      <Card x={144} y={34} w={112} h={86} title="System">
        <UiText x={156} y={84} mono tone="ink2">
          basket
        </UiText>
        <UiText x={156} y={106} weight={600} size={16}>
          1 → 2
        </UiText>
      </Card>
      <Arrow x1={258} y1={84} x2={274} y2={84} />
      <Card x={276} y={34} w={112} h={86} title="Feedback">
        <Verdict x={296} y={80} ok />
        <UiText x={312} y={85} weight={600}>
          Added
        </UiText>
        <circle cx={366} cy={102} r={11} fill={S.accent} />
        <UiText x={366} y={107} anchor="middle" weight={600} tone="surface">
          2
        </UiText>
      </Card>
      <path d="M332 122 V146 H68 V128" fill="none" stroke={S.ink2} strokeWidth="1.1" strokeDasharray="4 3" {...hair} />
      <polygon points={head(68, 123, 0, -1)} fill={S.ink2} />

      {/* three qualities */}
      <rect x={12} y={170} width={112} height={110} rx={8} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
      <UiButton x={24} y={212} w={88} label="Adding…" />

      <rect x={144} y={170} width={112} height={110} rx={8} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
      <Verdict x={160} y={204} ok={false} />
      <UiText x={176} y={209} tone="ink2">
        Done
      </UiText>
      <Verdict x={160} y={244} ok />
      <UiText x={176} y={249} weight={600}>
        Jacket added
      </UiText>

      <rect x={276} y={170} width={112} height={110} rx={8} fill={S.soft} stroke={S.rule} strokeWidth="0.9" {...hair} />
      <rect x={286} y={184} width={44} height={60} rx={4} fill={S.ink} opacity={0.35} />
      <rect x={292} y={200} width={32} height={26} rx={3} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <TextBar x={296} y={210} w={22} />
      <Verdict x={308} y={262} ok={false} />
      <TextBar x={340} y={210} w={38} />
      <Verdict x={358} y={262} ok />

      {detail && (
        <>
          <Marker x={12} y={34} n={1} />
          <Marker x={144} y={34} n={2} />
          <Marker x={276} y={34} n={3} />
          <Marker x={200} y={146} n={4} />
          <Marker x={12} y={170} n={5} />
          <Marker x={144} y={170} n={6} />
          <Marker x={276} y={170} n={7} />
        </>
      )}
    </g>
  ),
};

const plates: IllustrationEntry[] = [feedbackPrinciplePlate];
export default plates;
