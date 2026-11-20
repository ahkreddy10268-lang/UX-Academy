/**
 * Cycle 3, Batch B6 plates (D-129, D-131): findability. Instructional sheets
 * (D-089); explanations live in each plate's figure key (D-101), never as
 * microtext in the drawing. The need, the labels and the ratings drawn here are
 * illustrative; the curve is a schematic, not measured data.
 */
import type { IllustrationEntry } from "../illustration-types";
import { Marker, S, UiChip, UiText, Verdict } from "../system/sheet";
import { Card } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** One link with a three-dot scent estimate for the stated need. */
function LinkRow({ y, label, dots }: { y: number; label: string; dots: 1 | 2 | 3 }) {
  return (
    <g>
      <rect x={20} y={y} width={164} height={24} rx={5} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <UiText x={30} y={y + 17}>
        {label}
      </UiText>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={150 + i * 12} cy={y + 12} r={4.2} fill={i < dots ? S.ink : S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
      ))}
    </g>
  );
}

/** One cell of the diet grid: a verdict and its word. */
function Cell({ x, y, ok, word }: { x: number; y: number; ok: boolean; word: string }) {
  return (
    <g>
      <rect x={x} y={y} width={62} height={34} rx={5} fill={ok ? S.okWash : S.soft} stroke={ok ? S.ok : S.ruleStrong} strokeWidth="0.9" {...hair} />
      <Verdict x={x + 15} y={y + 17} ok={ok} r={8} />
      <UiText x={x + 28} y={y + 22} weight={ok ? 700 : 400}>
        {word}
      </UiText>
    </g>
  );
}

export const informationForagingPlate: IllustrationEntry = {
  slug: "information-foraging-theory",
  title: "Information foraging theory plate",
  canvas: "sheet",
  description:
    "Three decisions of information foraging, drawn for one illustrative need, 'Sunday hours'. Top left, 'Which link?': three links with three-dot scent estimates for that need — 'Opening hours' three filled dots, 'Our services' two, 'Your visit' one. Top right, 'What to consume?': a two-by-two grid of content (good or thin) against effort to reach it (low or high). Only good content that is low effort is marked 'Eat' with a tick; the other three cells are marked 'Skip' with a cross. Bottom, 'When to leave this site?': a schematic curve of gain rising and flattening over time on one site, with two dashed vertical lines on it. The earlier one, labelled 'Easy to switch', is marked 'leave here'; the later one, labelled 'Hard to switch', is also marked 'leave here'.",
  key: [
    { n: "1", label: "Scent: which path", detail: "the visitor judges each link against the need, from its label and context; the dots are one person's estimate for this need, not a property of the link" },
    { n: "2", label: "Diet: what to consume", detail: "content is worth consuming when it looks good and is easy to reach; good but hard to find, or easy but thin, is skipped (Nielsen's account)" },
    { n: "3", label: "Patch leaving: when to go", detail: "the easier it is to reach another source, the sooner a visitor is expected to leave this one; a schematic of the reasoning, not measured data (Nielsen's reading)" },
    { n: "4", label: "An estimate, not the truth", detail: "the true value of a page is known only after reading it, so scent can be wrong" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* 1 — scent: which link */}
      <Card x={8} y={8} w={188} h={146} title="Which link?">
        <UiText x={20} y={48} tone="ink2">
          Need: Sunday hours
        </UiText>
        <LinkRow y={58} label="Opening hours" dots={3} />
        <LinkRow y={88} label="Our services" dots={2} />
        <LinkRow y={118} label="Your visit" dots={1} />
      </Card>

      {/* 2 — diet: what to consume */}
      <Card x={204} y={8} w={188} h={146} title="What to consume?">
        <UiText x={252} y={48} tone="ink2">
          Effort to reach
        </UiText>
        <UiText x={212} y={66} tone="ink2">
          Content
        </UiText>
        <UiText x={281} y={66} anchor="middle" tone="ink2">
          Low
        </UiText>
        <UiText x={353} y={66} anchor="middle" tone="ink2">
          High
        </UiText>
        <UiText x={212} y={96} tone="ink2">
          Good
        </UiText>
        <UiText x={212} y={136} tone="ink2">
          Thin
        </UiText>
        <Cell x={250} y={74} ok word="Eat" />
        <Cell x={322} y={74} ok={false} word="Skip" />
        <Cell x={250} y={114} ok={false} word="Skip" />
        <Cell x={322} y={114} ok={false} word="Skip" />
      </Card>

      {/* 3 — patch leaving: when to go */}
      <Card x={8} y={162} w={384} h={130} title="When to leave this site?">
        <line x1={24} y1={268} x2={376} y2={268} stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <line x1={24} y1={268} x2={24} y2={196} stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <UiText x={32} y={208} tone="ink2">
          Gain
        </UiText>
        <UiText x={376} y={286} anchor="end" tone="ink2">
          Time on this site
        </UiText>
        <path d="M28 266 C 70 214, 120 200, 200 196 S 330 190, 372 188" fill="none" stroke={S.accent} strokeWidth="1.8" {...hair} />
        <line x1={100} y1={206} x2={100} y2={268} stroke={S.ink2} strokeWidth="1" strokeDasharray="4 3" {...hair} />
        <line x1={270} y1={192} x2={270} y2={268} stroke={S.ink2} strokeWidth="1" strokeDasharray="4 3" {...hair} />
        <circle cx={100} cy={206} r={4} fill={S.ink} />
        <circle cx={270} cy={192} r={4} fill={S.ink} />
        <UiText x={108} y={236} tone="ink2">
          leave here
        </UiText>
        <UiText x={108} y={254} weight={700}>
          Easy to switch
        </UiText>
        <UiText x={278} y={236} tone="ink2">
          leave here
        </UiText>
        <UiText x={278} y={254} weight={700}>
          Hard to switch
        </UiText>
      </Card>

      {detail && (
        <>
          <Marker x={184} y={20} n={1} />
          <Marker x={380} y={20} n={2} />
          <Marker x={380} y={174} n={3} />
          <Marker x={172} y={46} n={4} />
        </>
      )}
    </g>
  ),
};

/** Three-dot rating used for both the estimate and the true value. */
function Dots({ x, y, n }: { x: number; y: number; n: 0 | 1 | 2 | 3 }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + i * 12} cy={y} r={4.2} fill={i < n ? S.ink : S.surface} stroke={S.ink2} strokeWidth="1" {...hair} />
      ))}
    </g>
  );
}

/** A link as a visitor meets it: a label, a snippet and a scent estimate. */
function ResultCard({ y, label, snippet, dots }: { y: number; label: string; snippet: string; dots: 1 | 2 | 3 }) {
  return (
    <g>
      <rect x={18} y={y} width={226} height={50} rx={5} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <UiText x={28} y={y + 21} weight={700} tone="accent">
        {label}
      </UiText>
      <UiText x={28} y={y + 39} tone="ink2">
        {snippet}
      </UiText>
      <Dots x={214} y={y + 25} n={dots} />
    </g>
  );
}

export const informationScentPlate: IllustrationEntry = {
  slug: "information-scent",
  title: "Information scent plate",
  canvas: "sheet",
  description:
    "Information scent for one illustrative need, 'return a faulty kettle'. Left, 'Before the click': two links as a visitor sees them, each with a bold label, a snippet and a three-dot estimate. 'Returns and refunds', snippet 'Free return label', is rated three dots. 'Kettle broken? Read this', snippet 'Our new range is here', is rated two dots. Arrows lead right to 'After the click', which shows what each page actually holds: the first leads to a returns form, marked with a tick and 'Task done'; the second leads to a sales page, marked with a cross and 'Goes back'. Bottom, 'Scent comes from': five chips, 'Label', 'Snippet', 'Image', 'Context' and 'What you know'.",
  key: [
    { n: "1", label: "The need", detail: "scent is judged against what this visitor wants now; with another need, the same links would be rated differently" },
    { n: "2", label: "The cues", detail: "the label and the snippet are what the visitor can judge before clicking; a vague or promotional label gives little to go on" },
    { n: "3", label: "The estimate", detail: "the dots are one visitor's estimate of how well each page will meet the need, made before the click; the ratings are illustrative" },
    { n: "4", label: "The true value", detail: "only known after the click; a label that promises more than the page holds can win the click and still send the visitor back, at a cost to trust (Budiu)" },
    { n: "5", label: "Where scent comes from", detail: "what the visitor sees (label, accompanying text and image, page context) and what they already know about the brand or subject (Budiu)" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={8} w={384} h={40} tone="soft">
        <UiText x={20} y={33} weight={600}>
          Need: return a faulty kettle
        </UiText>
      </Card>

      {/* before the click: cues and estimates */}
      <Card x={8} y={56} w={244} h={156} title="Before the click">
        <ResultCard y={90} label="Returns and refunds" snippet="Free return label" dots={3} />
        <ResultCard y={148} label="Kettle broken? Read this" snippet="Our new range is here" dots={2} />
      </Card>

      {/* arrows to the destinations */}
      {[115, 173].map((cy) => (
        <g key={cy}>
          <line x1={246} y1={cy} x2={266} y2={cy} stroke={S.ink2} strokeWidth="1.1" {...hair} />
          <path d={`M262 ${cy - 4} L268 ${cy} L262 ${cy + 4}`} fill="none" stroke={S.ink2} strokeWidth="1.1" {...hair} />
        </g>
      ))}

      {/* after the click: what the page holds */}
      <Card x={270} y={56} w={122} h={156} title="After the click">
        <Verdict x={290} y={110} ok />
        <UiText x={304} y={108} weight={700}>
          Returns form
        </UiText>
        <UiText x={304} y={126} tone="ink2">
          Task done
        </UiText>
        <Verdict x={290} y={168} ok={false} />
        <UiText x={304} y={166} weight={700}>
          Sales page
        </UiText>
        <UiText x={304} y={184} tone="ink2">
          Goes back
        </UiText>
      </Card>

      {/* sources of scent */}
      <Card x={8} y={220} w={384} h={72} title="Scent comes from">
        <UiChip x={20} y={254} w={50} label="Label" />
        <UiChip x={76} y={254} w={64} label="Snippet" />
        <UiChip x={146} y={254} w={54} label="Image" />
        <UiChip x={206} y={254} w={66} label="Context" />
        <UiChip x={278} y={254} w={104} label="What you know" />
      </Card>

      {detail && (
        <>
          <Marker x={380} y={20} n={1} />
          <Marker x={150} y={72} n={2} />
          <Marker x={238} y={68} n={3} />
          <Marker x={380} y={200} n={4} />
          <Marker x={380} y={232} n={5} />
        </>
      )}
    </g>
  ),
};

const plates: IllustrationEntry[] = [informationForagingPlate, informationScentPlate];
export default plates;
