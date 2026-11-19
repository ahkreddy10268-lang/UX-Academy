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


/* ------------------------------------------------------------------ */
/* Design thinking: seven phases, three lenses                          */
/* ------------------------------------------------------------------ */
const PHASES = ["Frame", "Gather", "Synthesise", "Generate", "Make", "Test", "Share"];
/** Phase index → x along the phase line (32 … 368). */
const px = (i: number) => 32 + i * 56;
/** Alternating heights: widening phases sit high, narrowing phases low. */
const py = (i: number) => (i % 2 === 0 ? 92 : 112);

export const designThinkingPlate: IllustrationEntry = {
  slug: "design-thinking",
  title: "Design thinking plate",
  canvas: "sheet",
  description:
    "Top, 'Seven phases, not a straight line': seven numbered points joined by a zigzag line — Frame, Gather, Synthesise, Generate, Make, Test, Share — with labels alternately above and below, and a dashed arrow from below Test curving back to below Generate, marked 'learn and loop'. Bottom, 'Three lenses': three overlapping circles labelled Desirable, Feasible and Viable, with the overlap marked as the target, and beside them the three questions: matters to people? can we build it? can it succeed and last? A note in the key says usability is a separate question the lenses leave out.",
  key: [
    { n: "1", label: "Create, then make choices", detail: "the line rises and falls: going wide for ideas and insight, then narrowing to decide (IDEO's description)" },
    { n: "2", label: "Phases are for teaching", detail: "IDEO's seven phases, or the d.school's five modes, are a structure for learning; in practice teams loop back when testing teaches them something" },
    { n: "3", label: "Three lenses", detail: "desirable for people, feasible with technology and capabilities, viable within the organisation's constraints; ideas are weighed on all three" },
    { n: "4", label: "Not a lens: usability", detail: "whether people can use the solution is a separate risk, so usability testing is still needed" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={8} w={384} h={164} title="Seven phases, not a straight line">
        <path d={PHASES.map((_, i) => `${i ? "L" : "M"}${px(i)} ${py(i)}`).join(" ")} fill="none" stroke={S.ink2} strokeWidth="1.3" {...hair} />
        <path d={`M${px(5)} 142 C ${px(5)} 158, ${px(3)} 158, ${px(3)} 142`} fill="none" stroke={S.accent} strokeWidth="1.4" strokeDasharray="4 3" {...hair} />
        <path d={`M${px(3) - 4} 147 l4 -6 l4 6`} fill="none" stroke={S.accent} strokeWidth="1.4" {...hair} />
        <UiText x={px(4)} y={167} anchor="middle" tone="accent">
          learn and loop
        </UiText>
        {PHASES.map((p, i) => (
          <g key={p}>
            <circle cx={px(i)} cy={py(i)} r={7} fill={S.surface} stroke={S.ink} strokeWidth="1.3" {...hair} />
            <UiText x={px(i)} y={i % 2 === 0 ? py(i) - 14 : py(i) + 24} anchor="middle" weight={600}>
              {p}
            </UiText>
          </g>
        ))}
      </Card>
      <Card x={8} y={180} w={384} h={112} title="Three lenses">
        <circle cx={66} cy={236} r={26} fill={S.soft} stroke={S.ink2} strokeWidth="1" opacity={0.9} {...hair} />
        <circle cx={100} cy={236} r={26} fill={S.soft} stroke={S.ink2} strokeWidth="1" opacity={0.9} {...hair} />
        <circle cx={83} cy={262} r={26} fill={S.soft} stroke={S.ink2} strokeWidth="1" opacity={0.9} {...hair} />
        <circle cx={83} cy={245} r={6} fill={S.accent} />
        <UiText x={150} y={226} weight={700}>
          Desirable
        </UiText>
        <UiText x={234} y={226} tone="ink2">
          matters to people?
        </UiText>
        <UiText x={150} y={252} weight={700}>
          Feasible
        </UiText>
        <UiText x={234} y={252} tone="ink2">
          can we build it?
        </UiText>
        <UiText x={150} y={278} weight={700}>
          Viable
        </UiText>
        <UiText x={234} y={278} tone="ink2">
          can it last?
        </UiText>
      </Card>
      {detail && (
        <>
          <Marker x={380} y={20} n={1} />
          <Marker x={380} y={150} n={2} />
          <Marker x={380} y={192} n={3} />
          <Marker x={380} y={280} n={4} />
        </>
      )}
    </g>
  ),
};


/* ------------------------------------------------------------------ */
/* Design processes: three models, one shared shape                     */
/* ------------------------------------------------------------------ */
const PROC_ROWS: [string, string[], string[], string[]][] = [
  ["Understand", ["Discover"], ["Gather"], ["Context", "of use"]],
  ["Frame", ["Define"], ["Frame,", "synthesise"], ["Require-", "ments"]],
  ["Create", ["Develop"], ["Generate,", "make"], ["Design", "solutions"]],
  ["Test", ["Deliver"], ["Test"], ["Evaluate"]],
];
const procX = [112, 208, 304];

function ProcCell({ x, y, lines }: { x: number; y: number; lines: string[] }) {
  return (
    <g>
      <rect x={x} y={y} width={88} height={52} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      {lines.map((l, i) => (
        <UiText key={l} x={x + 44} y={y + (lines.length === 1 ? 31 : 23 + i * 17)} anchor="middle">
          {l}
        </UiText>
      ))}
    </g>
  );
}

export const designProcessesPlate: IllustrationEntry = {
  slug: "design-processes",
  title: "Design process plate",
  canvas: "sheet",
  description:
    "A table comparing three process models row by row. Columns: Double Diamond, Design thinking (IDEO's phases) and ISO human-centred design. Rows are the shared activities. Understand: Discover / Gather / Context of use. Frame: Define / Frame, synthesise / Requirements. Create: Develop / Generate, make / Design solutions. Test: Deliver / Test / Evaluate. On the left, a dashed arrow runs from the Test row back up to the Understand row, labelled iterate.",
  key: [
    { n: "1", label: "Different names", detail: "three widely used models, from the Design Council, IDEO and ISO 9241-210, each with its own vocabulary" },
    { n: "2", label: "One shared shape", detail: "each row is an activity all three include: understand the situation, frame the problem, create options, make and test" },
    { n: "3", label: "Not a one-way trip", detail: "all three are iterative: what testing reveals can send the team back to understanding" },
  ],
  Art: ({ detail }) => (
    <g>
      <UiText x={156} y={24} anchor="middle" weight={700}>
        Double
      </UiText>
      <UiText x={156} y={40} anchor="middle" weight={700}>
        Diamond
      </UiText>
      <UiText x={252} y={24} anchor="middle" weight={700}>
        Design
      </UiText>
      <UiText x={252} y={40} anchor="middle" weight={700}>
        thinking
      </UiText>
      <UiText x={348} y={24} anchor="middle" weight={700}>
        ISO human-
      </UiText>
      <UiText x={348} y={40} anchor="middle" weight={700}>
        centred
      </UiText>
      {PROC_ROWS.map(([label, a, b, c], r) => (
        <g key={label}>
          <UiText x={32} y={82 + r * 62} weight={600} tone="ink2">
            {label}
          </UiText>
          <ProcCell x={procX[0]} y={52 + r * 62} lines={a} />
          <ProcCell x={procX[1]} y={52 + r * 62} lines={b} />
          <ProcCell x={procX[2]} y={52 + r * 62} lines={c} />
        </g>
      ))}
      <path d="M22 264 C 8 264, 8 78, 22 78" fill="none" stroke={S.accent} strokeWidth="1.4" strokeDasharray="4 3" {...hair} />
      <path d="M17 73 l5 5 l-5 5" fill="none" stroke={S.accent} strokeWidth="1.4" {...hair} />
      <UiText x={32} y={176} tone="accent">
        iterate
      </UiText>
      {detail && (
        <>
          <Marker x={14} y={14} n={1} />
          <Marker x={98} y={120} n={2} />
          <Marker x={60} y={290} n={3} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* UX lifecycle: five phases, research throughout                       */
/* ------------------------------------------------------------------ */
const LIFE: [string, string, string][] = [
  ["Discovery", "What problem, for whom?", "build nothing"],
  ["Alpha", "Which solution works?", "throw away"],
  ["Beta", "Works for real users?", "private, public"],
  ["Live", "Still working?", "measure"],
  ["Retire", "Need met after?", "hand over"],
];
const ly = (i: number) => 10 + i * 46;

export const uxLifecyclePlate: IllustrationEntry = {
  slug: "ux-lifecycle",
  title: "UX lifecycle plate",
  canvas: "sheet",
  description:
    "Five phases as rows from top to bottom, each with its UX question: Discovery — what problem, for whom? Alpha — which solution works? Beta — works for real users? Live — still working? Retire — need met after? Small 'go or stop' decision diamonds sit between the rows. Down the right edge, one tall band reads 'User research in every phase'.",
  key: [
    { n: "1", label: "Before building", detail: "discovery learns about users, the problem and constraints, and builds nothing" },
    { n: "2", label: "Cheap options", detail: "alpha prototypes several solutions to test the riskiest assumptions, then throws the code away" },
    { n: "3", label: "Decisions between phases", detail: "each phase ends in go, change or stop; stopping after discovery is a valid result" },
    { n: "4", label: "After release", detail: "live keeps researching, measuring and improving; retirement plans how the need will be met afterwards" },
    { n: "5", label: "Research throughout", detail: "user research runs through every phase, not only the first (GOV.UK service manual)" },
  ],
  Art: ({ detail }) => (
    <g>
      {LIFE.map(([name, q], i) => (
        <g key={name}>
          <rect x={30} y={ly(i)} width={290} height={36} rx={7} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
          <UiText x={42} y={ly(i) + 23} weight={700}>
            {name}
          </UiText>
          <UiText x={124} y={ly(i) + 23}>
            {q}
          </UiText>
          {i < LIFE.length - 1 && (
            <path d={`M18 ${ly(i) + 34} l6 6 l-6 6 l-6 -6 z`} fill={S.accentWash} stroke={S.accent} strokeWidth="1" {...hair} />
          )}
        </g>
      ))}
      <path d="M18 18 V228" stroke={S.ink2} strokeWidth="1" {...hair} />
      <rect x={328} y={10} width={62} height={220} rx={7} fill={S.accentWash} stroke={S.accent} strokeWidth="1.1" {...hair} />
      {["User", "research", "in every", "phase"].map((w, i) => (
        <UiText key={w} x={359} y={98 + i * 18} anchor="middle" weight={600}>
          {w}
        </UiText>
      ))}
      <UiText x={30} y={262} tone="ink2">
        Each phase ends in a decision: go, change or stop.
      </UiText>
      {detail && (
        <>
          <Marker x={30} y={10} n={1} />
          <Marker x={30} y={56} n={2} />
          <Marker x={14} y={284} n={3} />
          <Marker x={30} y={148} n={4} />
          <Marker x={359} y={250} n={5} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* UX maturity: six stages, four factors                                */
/* ------------------------------------------------------------------ */
const STAGES = ["Absent", "Limited", "Emergent", "Structured", "Integrated", "User-driven"];

export const uxMaturityPlate: IllustrationEntry = {
  slug: "ux-maturity",
  title: "UX maturity plate",
  canvas: "sheet",
  description:
    "Left, a staircase of six numbered steps rising to the right; a dashed arrow from step 6 back down to step 4 is labelled 'can slip back'. Right, the stage names in order: 1 Absent, 2 Limited, 3 Emergent, 4 Structured, 5 Integrated, 6 User-driven. Below, four chips side by side under the heading 'Four factors reinforce each other': Strategy, Culture, Process, Outcomes.",
  key: [
    { n: "1", label: "Six stages", detail: "NN/g's model, from UX being ignored to user research driving strategy; most organisations that function acceptably sit at structured" },
    { n: "2", label: "One step at a time", detail: "the realistic goal is the next stage; moving up one level can take years" },
    { n: "3", label: "It can fall", detail: "growth, acquisitions or leadership changes can shift attention away from users and lower maturity" },
    { n: "4", label: "Four factors", detail: "strategy, culture, process and outcomes reinforce each other; methods alone do not make an organisation mature" },
  ],
  Art: ({ detail }) => (
    <g>
      {STAGES.map((st, i) => (
        <g key={st}>
          <rect x={16 + i * 34} y={176 - (i + 1) * 22} width={34} height={(i + 1) * 22} fill={i === 3 ? S.accentWash : S.soft} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
          <UiText x={33 + i * 34} y={194 - (i + 1) * 22} anchor="middle" weight={700}>
            {String(i + 1)}
          </UiText>
          <UiText x={240} y={40 + i * 24} weight={i === 3 ? 700 : 400}>
            {`${i + 1}  ${st}`}
          </UiText>
        </g>
      ))}
      <path d="M203 32 C 214 20, 188 20, 152 60" fill="none" stroke={S.ink2} strokeWidth="1.2" strokeDasharray="4 3" {...hair} />
      <path d="M150 52 l2 8 l8 -3" fill="none" stroke={S.ink2} strokeWidth="1.2" {...hair} />
      <UiText x={104} y={34} tone="ink2">
        can slip back
      </UiText>
      <UiText x={16} y={212} weight={600}>
        Four factors reinforce each other
      </UiText>
      {["Strategy", "Culture", "Process", "Outcomes"].map((f, i) => (
        <g key={f}>
          <rect x={16 + i * 94} y={226} width={86} height={34} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
          <UiText x={59 + i * 94} y={248} anchor="middle">
            {f}
          </UiText>
        </g>
      ))}
      {detail && (
        <>
          <Marker x={380} y={36} n={1} />
          <Marker x={380} y={160} n={2} />
          <Marker x={88} y={30} n={3} />
          <Marker x={380} y={212} n={4} />
        </>
      )}
    </g>
  ),
};


/* ------------------------------------------------------------------ */
/* Experience design: Why → What → How                                  */
/* ------------------------------------------------------------------ */
const LEVELS: [string, string, string][] = [
  ["Why", "needs, emotions, meaning", "feel close to a partner far away"],
  ["What", "functionality", "share one photo a day"],
  ["How", "operation", "one tap from the lock screen"],
];

export const experienceDesignPlate: IllustrationEntry = {
  slug: "experience-design",
  title: "Experience design plate",
  canvas: "sheet",
  description:
    "Three stacked bands with arrows pointing down from each to the next. Why — needs, emotions, meaning — example: feel close to a partner far away. What — functionality — example: share one photo a day. How — operation — example: one tap from the lock screen. On the right, a long bracket labelled 'Experience design' spans all three bands and is marked 'starts here' at the Why; a short bracket spans only the How, and a note below reads 'Interaction design works mainly on the How.'",
  key: [
    { n: "1", label: "Start with the Why", detail: "the needs, emotions and meaning of the activity; Hassenzahl argues that need fulfilment is what makes an experience pleasurable" },
    { n: "2", label: "Then the What", detail: "the functions that can create that experience, chosen after the Why rather than from the technology" },
    { n: "3", label: "Then the How", detail: "how people operate the product, the typical realm of interaction design" },
    { n: "4", label: "Different scopes", detail: "experience design spans all three levels; interaction design works mainly on the How (example is illustrative)" },
  ],
  Art: ({ detail }) => (
    <g>
      {LEVELS.map(([name, what, ex], i) => (
        <g key={name}>
          <rect x={12} y={14 + i * 92} width={286} height={72} rx={8} fill={i === 0 ? S.accentWash : S.surface} stroke={i === 0 ? S.accent : S.ruleStrong} strokeWidth={i === 0 ? 1.3 : 0.9} {...hair} />
          <UiText x={26} y={42 + i * 92} size={16} weight={700}>
            {name}
          </UiText>
          <UiText x={86} y={42 + i * 92} tone="ink2">
            {what}
          </UiText>
          <UiText x={26} y={68 + i * 92}>
            {ex}
          </UiText>
          {i < 2 && <path d={`M155 ${88 + i * 92} v14 m-5 -6 l5 6 l5 -6`} fill="none" stroke={S.ink2} strokeWidth="1.3" {...hair} />}
        </g>
      ))}
      <path d="M304 16 h8 V266 h-8" fill="none" stroke={S.accent} strokeWidth="1.5" {...hair} />
      <UiText x={318} y={100} weight={700} tone="accent">
        Experience
      </UiText>
      <UiText x={318} y={118} weight={700} tone="accent">
        design
      </UiText>
      <UiText x={318} y={40} tone="accent">
        starts
      </UiText>
      <UiText x={318} y={56} tone="accent">
        here
      </UiText>
      <path d="M326 200 h8 V266 h-8" fill="none" stroke={S.ink2} strokeWidth="1.3" {...hair} />
      <UiText x={12} y={292} tone="ink2">
        Interaction design works mainly on the How.
      </UiText>
      {detail && (
        <>
          <Marker x={286} y={26} n={1} />
          <Marker x={286} y={118} n={2} />
          <Marker x={286} y={210} n={3} />
          <Marker x={386} y={166} n={4} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Product design: two meanings, one product team                       */
/* ------------------------------------------------------------------ */
function Role({ x, y, w, title, lines, accent = false }: { x: number; y: number; w: number; title: string; lines: string[]; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={70} rx={7} fill={accent ? S.accentWash : S.surface} stroke={accent ? S.accent : S.ruleStrong} strokeWidth={accent ? 1.3 : 0.9} {...hair} />
      <UiText x={x + 10} y={y + 22} weight={700}>
        {title}
      </UiText>
      {lines.map((l, i) => (
        <UiText key={l} x={x + 10} y={y + 42 + i * 17} tone="ink2">
          {l}
        </UiText>
      ))}
    </g>
  );
}

export const productDesignPlate: IllustrationEntry = {
  slug: "product-design",
  title: "Product design plate",
  canvas: "sheet",
  description:
    "Two panels. Left, 'Industrial design': the outline of a kettle with three labels — appearance, function, manufacture. Right, 'Digital product team': three role cards around a central 'Product' box. Product manager: value, viability. Designer, the product designer (highlighted): usability, experience. Engineer, the lead engineer: feasibility. Lines join each role to the product.",
  key: [
    { n: "1", label: "The older meaning", detail: "industrial design of physical products, typically focused on appearance, functionality and manufacturability (IDSA)" },
    { n: "2", label: "The digital role", detail: "in software teams the product designer is responsible for usability and accountable for the product's experience (Cagan)" },
    { n: "3", label: "Shared ownership", detail: "value and viability sit with the product manager, feasibility with the lead engineer; the three work side by side" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={8} w={140} h={284} title="Industrial design">
        <path d="M40 150 q0 -48 38 -48 q38 0 38 48 v54 h-76 z" fill={S.soft} stroke={S.ink2} strokeWidth="1.3" {...hair} />
        <path d="M116 120 q22 4 18 36 q-2 14 -18 18" fill="none" stroke={S.ink2} strokeWidth="1.3" {...hair} />
        <path d="M42 138 l-20 -16 l4 -6 l20 14" fill={S.soft} stroke={S.ink2} strokeWidth="1.3" {...hair} />
        <UiText x={20} y={236}>
          appearance
        </UiText>
        <UiText x={20} y={256}>
          function
        </UiText>
        <UiText x={20} y={276}>
          manufacture
        </UiText>
      </Card>
      <Card x={156} y={8} w={236} h={284} title="Digital product team">
        <rect x={234} y={130} width={80} height={40} rx={7} fill={S.ink} />
        <UiText x={274} y={155} anchor="middle" weight={700} tone="surface">
          Product
        </UiText>
        <path d="M274 130 V110 M254 170 V180 H219 V190 M294 170 V180 H332 V190" fill="none" stroke={S.ink2} strokeWidth="1.1" {...hair} />
        <Role x={199} y={40} w={150} title="Product manager" lines={["value,", "viability"]} />
        <Role x={164} y={190} w={110} title="Designer" lines={["usability,", "experience"]} accent />
        <Role x={278} y={190} w={108} title="Engineer" lines={["feasibility"]} />
      </Card>
      {detail && (
        <>
          <Marker x={134} y={64} n={1} />
          <Marker x={164} y={276} n={2} />
          <Marker x={380} y={20} n={3} />
        </>
      )}
    </g>
  ),
};

/** designThinkingPlate is registered through core-plates.tsx, where the earlier planned-topic plate was. */
const plates: IllustrationEntry[] = [usefulnessPlate, desirabilityPlate, designProcessesPlate, uxLifecyclePlate, uxMaturityPlate, experienceDesignPlate, productDesignPlate];
export default plates;
