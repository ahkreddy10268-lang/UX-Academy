/**
 * UX & UI Fundamentals domain-completion plates (owner request 2026-11-19,
 * D-132). Instructional sheets (D-089); explanations live in each plate's
 * figure key (D-101), never as microtext in the drawing. Products, words and
 * numbers drawn here are illustrative unless the key says otherwise.
 */
import type { IllustrationEntry } from "../illustration-types";
import { Marker, S, UiText, Verdict } from "../system/sheet";
import { Card } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ------------------------------------------------------------------ */
/* Usefulness: utility × usability                                      */
/* ------------------------------------------------------------------ */
function Quad({ x, y, title, lines, ok }: { x: number; y: number; title: string; lines: string[]; ok: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={156} height={120} rx={7} fill={ok ? S.okWash : S.surface} stroke={ok ? S.ok : S.ruleStrong} strokeWidth={ok ? 1.3 : 0.9} {...hair} />
      <UiText x={x + 12} y={y + 26} size={16} weight={700}>
        {title}
      </UiText>
      {lines.map((l, i) => (
        <UiText key={l} x={x + 12} y={y + 52 + i * 18} tone="ink2">
          {l}
        </UiText>
      ))}
      <Verdict x={x + 136} y={y + 100} ok={ok} />
    </g>
  );
}

export const usefulnessPlate: IllustrationEntry = {
  slug: "usefulness",
  title: "Usefulness plate",
  canvas: "sheet",
  description:
    "A two-by-two grid. Rows are utility: 'Right functions' on top, 'Wrong functions' below. Columns are usability: 'Hard to use' on the left, 'Easy to use' on the right. Top right, the only cell with a tick: 'Useful' — does the job, easily. Top left, with a cross: 'Buried' — everything needed is there, but people cannot reach it. Bottom right, with a cross: 'Easy, wrong job' — smooth to use, but not what people need. Bottom left, with a cross: 'Neither'.",
  key: [
    { n: "1", label: "Utility", detail: "whether the design provides the functions people need, judged against their needs, not against a feature count" },
    { n: "2", label: "Usability", detail: "how easily and pleasantly people can use the functions that are there" },
    { n: "3", label: "Usefulness", detail: "only the cell with both: Nielsen's usefulness = utility + usability, for particular people and tasks" },
    { n: "4", label: "Two different fixes", detail: "a utility gap needs different functions; a usability gap needs a better design of the functions you have" },
  ],
  Art: ({ detail }) => (
    <g>
      <UiText x={150} y={22} anchor="middle" weight={600}>
        Hard to use
      </UiText>
      <UiText x={314} y={22} anchor="middle" weight={600}>
        Easy to use
      </UiText>
      <UiText x={8} y={88} weight={600}>
        Right
      </UiText>
      <UiText x={8} y={105} weight={600}>
        functions
      </UiText>
      <UiText x={8} y={214} weight={600}>
        Wrong
      </UiText>
      <UiText x={8} y={231} weight={600}>
        functions
      </UiText>
      <Quad x={72} y={36} title="Buried" lines={["Everything needed", "is there, but out", "of reach"]} ok={false} />
      <Quad x={236} y={36} title="Useful" lines={["Does the job,", "easily"]} ok />
      <Quad x={72} y={164} title="Neither" lines={["Wrong job, and", "hard to use"]} ok={false} />
      <Quad x={236} y={164} title="Easy, wrong job" lines={["Smooth to use,", "but not what", "people need"]} ok={false} />
      {detail && (
        <>
          <Marker x={36} y={150} n={1} />
          <Marker x={380} y={14} n={2} />
          <Marker x={378} y={52} n={3} />
          <Marker x={36} y={276} n={4} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Desirability: product reaction words                                 */
/* ------------------------------------------------------------------ */
const WORDS: [string, boolean][] = [
  ["Calm", true],
  ["Busy", false],
  ["Clean", true],
  ["Cheap", false],
  ["Fresh", true],
  ["Dated", false],
  ["Clear", true],
  ["Boring", false],
  ["Friendly", true],
  ["Confusing", false],
];
const RESULTS: [string, number][] = [
  ["Calm", 14],
  ["Clear", 11],
  ["Fresh", 8],
  ["Friendly", 7],
  ["Cheap", 6],
];
const N = 20;

function Chip({ x, y, word, picked }: { x: number; y: number; word: string; picked: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={84} height={26} rx={5} fill={picked ? S.accentWash : S.surface} stroke={picked ? S.accent : S.ruleStrong} strokeWidth={picked ? 1.3 : 0.9} {...hair} />
      <UiText x={x + 8} y={y + 18} weight={picked ? 700 : 400} tone={picked ? "ink" : "ink2"}>
        {word}
      </UiText>
      {picked && <path d={`M${x + 72} ${y + 13} l3 3.4 l5.5 -6.4`} fill="none" stroke={S.accent} strokeWidth="1.5" {...hair} />}
    </g>
  );
}

export const desirabilityPlate: IllustrationEntry = {
  slug: "desirability",
  title: "Desirability plate",
  canvas: "sheet",
  description: `An illustrative product-reaction-word study. Left, 'Pick five words': ten word cards in two columns — Calm, Busy, Clean, Cheap, Fresh, Dated, Clear, Boring, Friendly, Confusing — of which one participant's five choices (Calm, Clean, Fresh, Clear, Friendly) are bold and ticked. Right, 'Chosen by (of ${N})': bars for the most-chosen words — ${RESULTS.map(([w, k]) => `${w} ${Math.round((k / N) * 100)} %`).join(", ")} — with Cheap, a word the team had listed as a risk, among them.`,
  key: [
    { n: "1", label: "A balanced list", detail: "positive, negative and neutral words, shortened from the original 118 and shown in random order" },
    { n: "2", label: "Pick five", detail: "each person chooses the five words that best describe the design, then says why" },
    { n: "3", label: "Percent per word", detail: "report the share of people who chose each word, with the sample size; compare versions or groups" },
    { n: "4", label: "Unwanted words", detail: "a negative word such as 'Cheap' appearing in the top results is a finding, which is why the list must include such words" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={8} w={188} h={284} title="Pick five words">
        {WORDS.map(([w, picked], i) => (
          <Chip key={w} x={i % 2 === 0 ? 14 : 106} y={48 + Math.floor(i / 2) * 46} word={w} picked={picked} />
        ))}
      </Card>
      <Card x={204} y={8} w={188} h={284} title={`Chosen by (of ${N})`}>
        {RESULTS.map(([w, k], i) => (
          <g key={w}>
            <UiText x={218} y={56 + i * 48} weight={w === "Cheap" ? 700 : 400}>
              {w}
            </UiText>
            <UiText x={380} y={56 + i * 48} mono anchor="end">
              {`${Math.round((k / N) * 100)} %`}
            </UiText>
            <rect x={218} y={64 + i * 48} width={162} height={10} rx={3} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
            <rect x={218} y={64 + i * 48} width={(k / N) * 162} height={10} rx={3} fill={w === "Cheap" ? S.error : S.ink2} />
          </g>
        ))}
      </Card>
      {detail && (
        <>
          <Marker x={184} y={20} n={1} />
          <Marker x={100} y={282} n={2} />
          <Marker x={380} y={20} n={3} />
          <Marker x={300} y={284} n={4} />
        </>
      )}
    </g>
  ),
};

const plates: IllustrationEntry[] = [usefulnessPlate, desirabilityPlate];
export default plates;
