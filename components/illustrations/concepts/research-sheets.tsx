/**
 * Cycle 1, Batch 2 plates (D-129): UX research foundations — think-aloud
 * protocol, tree testing, contextual inquiry and in-depth interviews.
 * Instructional sheets (D-089); explanations live in each plate's figure key
 * (D-101), never as microtext in the drawing. All sessions, quotes and
 * numbers drawn here are illustrative unless the key says otherwise.
 */
import type { IllustrationEntry } from "../illustration-types";
import { taskSuccess } from "../../../lib/formulas/stats";
import { Marker, Pointer, S, TextBar, UiFrame, UiText, Verdict } from "../system/sheet";
import { Card } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ------------------------------------------------------------------ */
/* Think-aloud: what the participant does and says, on one clock         */
/* ------------------------------------------------------------------ */
/** Seconds after 0:40 → x on the timeline (0:40 = 76, 1:10 = 370). */
const tx = (s: number) => 76 + (s - 40) * 9.8;

function Block({ from, to, y, label, tone = "soft", dashed = false }: { from: number; to: number; y: number; label?: string; tone?: "soft" | "accent" | "none"; dashed?: boolean }) {
  const x = tx(from);
  const w = tx(to) - x;
  return (
    <g>
      <rect x={x} y={y} width={w} height={20} rx={4} fill={tone === "accent" ? S.accent : tone === "soft" ? S.soft : "none"} stroke={tone === "accent" ? S.accent : S.ruleStrong} strokeWidth="0.9" strokeDasharray={dashed ? "3 2.5" : undefined} {...hair} />
      {label && (
        <UiText x={x + w / 2} y={y + 14.5} anchor="middle" weight={tone === "accent" ? 700 : 400} tone={tone === "accent" ? "surface" : dashed ? "ink2" : "ink"}>
          {label}
        </UiText>
      )}
    </g>
  );
}

function Line({ y, t, who, text, tone = "ink" }: { y: number; t: string; who: string; text: string; tone?: "ink" | "ink2" | "accent" }) {
  return (
    <g>
      <UiText x={220} y={y} mono tone="ink3">
        {t}
      </UiText>
      <UiText x={254} y={y} weight={700} tone={tone === "accent" ? "accent" : "ink2"}>
        {who}
      </UiText>
      <UiText x={268} y={y} tone={tone}>
        {text}
      </UiText>
    </g>
  );
}

export const thinkAloudPlate: IllustrationEntry = {
  slug: "think-aloud-protocol",
  title: "Think-aloud protocol plate",
  canvas: "sheet",
  description:
    "An illustrative think-aloud session on a library catalogue. Top left, the catalogue: a search field containing 'climate', the line '412 results', a filter column with 'Format' and 'Year', and a list of results with a pointer over them. Top right, a time-stamped transcript: at 0:41 the participant (P) says 'Try climate…'; at 0:48, '412? Too many.'; from 0:55 there is a 9-second silence; at 1:04 the moderator (M) says only 'Keep talking.'; at 1:07 the participant says 'No way to pick just books?' — while the Format filter, which does exactly that, is on screen. Bottom, a timeline from 0:40 to 1:10 with two lanes on one clock: 'Does' (type, scroll, hover) and 'Says' (speech marked P, a dashed silent gap, the moderator's short prompt marked M, speech again).",
  key: [
    { n: "1", label: "The task", detail: "the participant works on a realistic goal — here, finding books on a topic — while the screen is recorded" },
    { n: "2", label: "Talk shows expectation", detail: "'412? Too many.' tells you how they read the result count, which the clicks alone would not" },
    { n: "3", label: "Silence, then a neutral reminder", detail: "after a pause the moderator says only 'Keep talking' — no hint, no question about the interface" },
    { n: "4", label: "Talk contradicts the screen", detail: "they say there is no way to choose books while the Format filter is visible: the filter is not being noticed or not understood — a finding" },
    { n: "5", label: "One clock, two tracks", detail: "actions and words are time-stamped together, so each problem is tied to the moment it happened and the evidence for it" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* the interface under test */}
      <UiFrame x={8} y={8} w={196} h={170}>
        <rect x={12} y={10} width={138} height={26} rx={5} fill={S.surface} stroke={S.accent} strokeWidth="1.3" {...hair} />
        <UiText x={22} y={28}>
          climate
        </UiText>
        <UiText x={12} y={56} mono tone="ink2">
          412 results
        </UiText>
        <line x1={12} y1={66} x2={184} y2={66} stroke={S.rule} strokeWidth="0.8" {...hair} />
        <UiText x={12} y={86} weight={600}>
          Format
        </UiText>
        <path d="M63 80 l3.5 3.5 l3.5 -3.5" fill="none" stroke={S.ink} strokeWidth="1.2" {...hair} />
        <UiText x={12} y={110} weight={600}>
          Year
        </UiText>
        <path d="M47 104 l3.5 3.5 l3.5 -3.5" fill="none" stroke={S.ink} strokeWidth="1.2" {...hair} />
        {[78, 100, 122].map((y) => (
          <g key={y}>
            <TextBar x={96} y={y} w={84} strong />
            <TextBar x={96} y={y + 9} w={60} />
          </g>
        ))}
        <Pointer x={160} y={112} />
      </UiFrame>

      {/* the transcript */}
      <Card x={210} y={8} w={182} h={170} title="Transcript">
        <Line y={54} t="0:41" who="P" text="“Try climate…”" />
        <Line y={78} t="0:48" who="P" text="“412? Too many.”" />
        <UiText x={220} y={102} mono tone="ink3">
          0:55
        </UiText>
        <UiText x={254} y={102} tone="ink2">
          silence, 9 s
        </UiText>
        <Line y={126} t="1:04" who="M" text="“Keep talking.”" tone="accent" />
        <Line y={150} t="1:07" who="P" text="“No way to pick" />
        <UiText x={268} y={170}>
          just books?”
        </UiText>
      </Card>

      {/* one clock, two tracks */}
      <rect x={8} y={186} width={384} height={106} rx={7} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <UiText x={18} y={226} weight={600}>
        Does
      </UiText>
      <UiText x={18} y={258} weight={600}>
        Says
      </UiText>
      <Block from={40} to={44} y={212} label="type" />
      <Block from={52} to={62} y={212} label="scroll" />
      <Block from={65} to={70} y={212} label="hover" />
      <Block from={41} to={44} y={244} label="P" />
      <Block from={48} to={51} y={244} label="P" />
      <Block from={55} to={64} y={244} label="silent" tone="none" dashed />
      <Block from={64} to={66} y={244} label="M" tone="accent" />
      <Block from={67} to={70} y={244} label="P" />
      <line x1={76} y1={272} x2={370} y2={272} stroke={S.ink3} strokeWidth="0.9" {...hair} />
      {[40, 50, 60, 70].map((s) => (
        <g key={s}>
          <line x1={tx(s)} y1={269} x2={tx(s)} y2={275} stroke={S.ink3} strokeWidth="0.9" {...hair} />
          <UiText x={tx(s)} y={288} mono tone="ink3" anchor="middle">
            {s === 40 ? "0:40" : s === 50 ? "0:50" : s === 60 ? "1:00" : "1:10"}
          </UiText>
        </g>
      ))}

      {detail && (
        <>
          <Marker x={164} y={53} n={1} />
          <Marker x={204} y={74} n={2} />
          <Marker x={204} y={122} n={3} />
          <Marker x={90} y={110} n={4} />
          <Marker x={20} y={198} n={5} />
        </>
      )}
    </g>
  ),
};


/* ------------------------------------------------------------------ */
/* Tree testing: one task, a text-only tree, and the per-task results     */
/* ------------------------------------------------------------------ */
const TT_N = 50;
const TT_SUCCESS = 34;
const TT_DIRECT = 21;
const TT_FIRST: [string, number][] = [
  ["Home & property", 29],
  ["Environment", 15],
  ["Your council", 6],
];
const ttSuccess = taskSuccess(TT_SUCCESS, TT_N);
const pct = (k: number) => `${Math.round((k / TT_N) * 100)}\u202f%`;
/** Proportion 0–1 → x on the results scale (226 … 382). */
const sx = (p: number) => 226 + p * 156;

function Chevron({ x, y, open }: { x: number; y: number; open: boolean }) {
  return <path d={open ? `M${x} ${y - 3} l3.5 3.5 l3.5 -3.5` : `M${x + 1} ${y - 5} l3.5 3.5 l-3.5 3.5`} fill="none" stroke={S.ink} strokeWidth="1.2" {...hair} />;
}

function Bar({ y, p, low, high }: { y: number; p: number; low?: number; high?: number }) {
  return (
    <g>
      <rect x={226} y={y} width={156} height={10} rx={3} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
      <rect x={226} y={y} width={p * 156} height={10} rx={3} fill={S.ink2} />
      {low !== undefined && high !== undefined && (
        <path d={`M${sx(low)} ${y - 4}V${y + 14}M${sx(low)} ${y + 5}H${sx(high)}M${sx(high)} ${y - 4}V${y + 14}`} stroke={S.accent} strokeWidth="1.6" {...hair} />
      )}
    </g>
  );
}

export const treeTestingPlate: IllustrationEntry = {
  slug: "tree-testing",
  title: "Tree testing plate",
  canvas: "sheet",
  description: `An illustrative tree test of a council website. Top left, a task card: 'Your rubbish wasn't taken this week. Find out which day it should be picked up.' Below it, the tree as plain text with no design or search: Your council (closed), Environment (opened, then left — marked 'back'), Home & property (open), Waste & recycling (open) and the leaf Bin days, chosen as the answer and marked with a tick. Right, the results for this task from ${TT_N} participants: success ${TT_SUCCESS} of ${TT_N} (${pct(TT_SUCCESS)}) with a 95 % interval from ${Math.round(ttSuccess.low * 100)} % to ${Math.round(ttSuccess.high * 100)} % drawn across the bar; direct success ${TT_DIRECT} of ${TT_N} (${pct(TT_DIRECT)}); and first clicks — Home & property ${pct(TT_FIRST[0][1])}, Environment ${pct(TT_FIRST[1][1])}, Your council ${pct(TT_FIRST[2][1])}.`,
  key: [
    { n: "1", label: "A goal, not a label", detail: "the task never uses 'bin', 'waste' or 'collection', so people must understand the tree, not match words" },
    { n: "2", label: "The tree alone", detail: "category names only — no layout, visual design, search or content — so results reflect organisation and labels" },
    { n: "3", label: "A first click, then back", detail: "this participant tried Environment first and backtracked: an indirect path, even though the answer was found" },
    { n: "4", label: "The chosen answer", detail: "the participant picks the place they would expect to find it; the researcher marked correct answers in advance" },
    { n: "5", label: "Success with its interval", detail: `${TT_SUCCESS} of ${TT_N} ended at Bin days; the 95 % adjusted-Wald interval (lib/formulas) shows how precise ${pct(TT_SUCCESS)} is` },
    { n: "6", label: "Directness", detail: "only those who went straight there without backtracking — effort, which success alone hides" },
    { n: "7", label: "First clicks", detail: "where people expected the answer to be; a third started in Environment, a hint that the top-level labels overlap" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* the task */}
      <Card x={8} y={8} w={188} h={104} title="Task 3 of 10">
        <UiText x={20} y={50}>
          Your rubbish wasn’t
        </UiText>
        <UiText x={20} y={67}>
          taken this week. Find
        </UiText>
        <UiText x={20} y={84}>
          out which day it should
        </UiText>
        <UiText x={20} y={101}>
          be picked up.
        </UiText>
      </Card>

      {/* the tree, text only */}
      <Card x={8} y={120} w={188} h={172}>
        <Chevron x={18} y={144} open={false} />
        <UiText x={30} y={145}>
          Your council
        </UiText>
        <Chevron x={18} y={169} open />
        <UiText x={30} y={170} tone="ink2">
          Environment
        </UiText>
        <UiText x={112} y={170} mono tone="ink2">
          ↩ back
        </UiText>
        <Chevron x={18} y={194} open />
        <UiText x={30} y={195} weight={600}>
          Home &amp; property
        </UiText>
        <Chevron x={34} y={219} open />
        <UiText x={46} y={220} weight={600}>
          Waste &amp; recycling
        </UiText>
        <rect x={56} y={230} width={92} height={24} rx={5} fill={S.accentWash} stroke={S.accent} strokeWidth="1.3" {...hair} />
        <UiText x={64} y={247} weight={700}>
          Bin days
        </UiText>
        <Verdict x={136} y={242} ok />
        <UiText x={64} y={278} tone="ink2">
          Bulky items
        </UiText>
        {/* the participant's path down the tree */}
        <path d="M14 196 V244 H54" fill="none" stroke={S.accent} strokeWidth="1.3" {...hair} />
      </Card>

      {/* results for this task */}
      <Card x={204} y={8} w={188} h={284} title={`Results · ${TT_N} people`}>
        <UiText x={226} y={58} weight={600}>
          Success
        </UiText>
        <UiText x={382} y={58} mono anchor="end">
          {pct(TT_SUCCESS)}
        </UiText>
        <Bar y={66} p={TT_SUCCESS / TT_N} low={ttSuccess.low} high={ttSuccess.high} />
        <UiText x={226} y={104} weight={600}>
          Direct
        </UiText>
        <UiText x={382} y={104} mono anchor="end">
          {pct(TT_DIRECT)}
        </UiText>
        <Bar y={112} p={TT_DIRECT / TT_N} />
        <line x1={216} y1={140} x2={380} y2={140} stroke={S.rule} strokeWidth="0.8" {...hair} />
        <UiText x={226} y={162} weight={600}>
          First click
        </UiText>
        {TT_FIRST.map(([label, k], i) => (
          <g key={label}>
            <UiText x={226} y={186 + i * 34} tone="ink2">
              {label}
            </UiText>
            <UiText x={382} y={186 + i * 34} mono anchor="end">
              {pct(k)}
            </UiText>
            <Bar y={193 + i * 34} p={k / TT_N} />
          </g>
        ))}
      </Card>

      {detail && (
        <>
          <Marker x={184} y={20} n={1} />
          <Marker x={184} y={132} n={2} />
          <Marker x={184} y={166} n={3} />
          <Marker x={170} y={242} n={4} />
          <Marker x={212} y={54} n={5} />
          <Marker x={212} y={100} n={6} />
          <Marker x={212} y={158} n={7} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Contextual inquiry: the real desk, field notes, the session rhythm    */
/* ------------------------------------------------------------------ */
function Step({ x, w, label }: { x: number; w: number; label: string }) {
  return (
    <g>
      <rect x={x} y={198} width={w} height={28} rx={5} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <UiText x={x + w / 2} y={217} anchor="middle" weight={600}>
        {label}
      </UiText>
    </g>
  );
}

function Principle({ x, w, label }: { x: number; w: number; label: string }) {
  return (
    <g>
      <rect x={x} y={254} width={w} height={26} rx={13} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
      <UiText x={x + w / 2} y={272} anchor="middle">
        {label}
      </UiText>
    </g>
  );
}

function NoteRow({ y, label, children, struck = false }: { y: number; label: string; children: string; struck?: boolean }) {
  return (
    <g>
      <UiText x={224} y={y} mono tone="ink3">
        {label}
      </UiText>
      <UiText x={272} y={y} tone={struck ? "ink3" : "ink"}>
        {children}
      </UiText>
      {struck && <line x1={272} y1={y - 4.5} x2={272 + children.length * 6.2} y2={y - 4.5} stroke={S.ink2} strokeWidth="1.2" {...hair} />}
    </g>
  );
}

export const contextualInquiryPlate: IllustrationEntry = {
  slug: "contextual-inquiry",
  title: "Contextual inquiry plate",
  canvas: "sheet",
  description:
    "An illustrative contextual inquiry at a clinic reception desk. Top left, the booking system on the receptionist's monitor: a week grid from Monday to Friday with one slot selected and a pointer on it, and a yellow sticky note stuck to the screen reading 'Dr Shah — no Fri pm'. Top right, the researcher's field notes in rows: 'saw' — checks a note; 'asked' — 'What's on it?'; 'guess' — 'No rota data?', struck through; 'she' — 'Rota's wrong'; and the conclusion '→ data trust'. Bottom, the rhythm of the session — Watch, Ask, Interpret, Check, with a dashed arrow back to Watch — and four principles as labels: Context, Partnership, Interpretation, Focus.",
  key: [
    { n: "1", label: "Context", detail: "the session happens at the real desk, during real bookings — not in a meeting room" },
    { n: "2", label: "A workaround in plain sight", detail: "the sticky note is something she would never mention in an interview; it is how the work actually gets done" },
    { n: "3", label: "Ask as it happens", detail: "the researcher notes what was seen and asks about it at once, as an apprentice would" },
    { n: "4", label: "Interpretation, corrected", detail: "the researcher's guess ('the system has no rota data') is struck out when she corrects it: the rota exists but is often wrong, so the problem is trust in the data" },
    { n: "5", label: "The rhythm", detail: "watch, ask, interpret, check — then back to watching the work" },
    { n: "6", label: "Four principles", detail: "context, partnership, interpretation and focus, as practitioners summarise the method" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* the booking system at the real desk */}
      <UiFrame x={8} y={8} w={196} h={162}>
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
          <UiText key={d} x={30 + i * 34} y={24} mono tone="ink2" anchor="middle">
            {d}
          </UiText>
        ))}
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4].map((c) => (
            <rect key={`${r}-${c}`} x={15 + c * 34} y={34 + r * 24} width={30} height={18} rx={3} fill={r === 1 && c === 2 ? S.accentWash : S.soft} stroke={r === 1 && c === 2 ? S.accent : S.rule} strokeWidth={r === 1 && c === 2 ? 1.3 : 0.7} {...hair} />
          )),
        )}
        <Pointer x={88} y={70} />
      </UiFrame>
      <rect x={128} y={104} width={74} height={46} rx={2} fill={S.cWash} stroke={S.c} strokeWidth="0.9" {...hair} />
      <UiText x={136} y={123} weight={600}>
        Dr Shah
      </UiText>
      <UiText x={136} y={141}>
        no Fri pm
      </UiText>

      {/* field notes */}
      <Card x={212} y={8} w={180} h={162} title="Field notes">
        <NoteRow y={54} label="saw">
          checks a note
        </NoteRow>
        <NoteRow y={78} label="asked">
          “What’s on it?”
        </NoteRow>
        <NoteRow y={102} label="guess" struck>
          “No rota data?”
        </NoteRow>
        <NoteRow y={126} label="she">
          “Rota’s wrong”
        </NoteRow>
        <UiText x={272} y={154} weight={700}>
          → data trust
        </UiText>
      </Card>

      {/* the rhythm and the principles */}
      <rect x={8} y={184} width={384} height={108} rx={7} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <Step x={32} w={68} label="Watch" />
      <Step x={118} w={54} label="Ask" />
      <Step x={190} w={88} label="Interpret" />
      <Step x={296} w={66} label="Check" />
      {[
        [100, 118],
        [172, 190],
        [278, 296],
      ].map(([a, b]) => (
        <g key={a}>
          <line x1={a + 2} y1={212} x2={b - 3} y2={212} stroke={S.ink2} strokeWidth="1.1" {...hair} />
          <polygon points={`${b - 2},212 ${b - 8},208.5 ${b - 8},215.5`} fill={S.ink2} />
        </g>
      ))}
      <path d="M329 226 V240 H66 V231" fill="none" stroke={S.ink2} strokeWidth="1.1" strokeDasharray="3 2.5" {...hair} />
      <polygon points="66,227 62.5,233 69.5,233" fill={S.ink2} />
      <Principle x={32} w={68} label="Context" />
      <Principle x={106} w={94} label="Partnership" />
      <Principle x={206} w={110} label="Interpretation" />
      <Principle x={322} w={58} label="Focus" />

      {detail && (
        <>
          <Marker x={190} y={22} n={1} />
          <Marker x={120} y={127} n={2} />
          <Marker x={212} y={62} n={3} />
          <Marker x={212} y={112} n={4} />
          <Marker x={18} y={212} n={5} />
          <Marker x={18} y={267} n={6} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* In-depth interviews: guide, two questions compared, quotes to a theme */
/* ------------------------------------------------------------------ */
function QA({ y, q, a, ok }: { y: number; q: [string, string]; a: [string, string?]; ok: boolean }) {
  return (
    <g>
      <rect x={204} y={y} width={188} height={a[1] ? 92 : 78} rx={7} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <UiText x={216} y={y + 24} mono weight={700} tone="ink3">
        Q
      </UiText>
      <UiText x={232} y={y + 24}>
        {q[0]}
      </UiText>
      <UiText x={232} y={y + 41}>
        {q[1]}
      </UiText>
      <UiText x={216} y={y + 64} mono weight={700} tone="ink3">
        A
      </UiText>
      <UiText x={232} y={y + 64} tone="ink2">
        {a[0]}
      </UiText>
      {a[1] && (
        <UiText x={232} y={y + 81} tone="ink2">
          {a[1]}
        </UiText>
      )}
      <Verdict x={378} y={y + 18} ok={ok} />
    </g>
  );
}

const QUOTES = ["“I hate reminding them”", "“took a week to pay”", "“I just let it go”"];

export const inDepthInterviewsPlate: IllustrationEntry = {
  slug: "in-depth-interviews",
  title: "In-depth interviews plate",
  canvas: "sheet",
  description:
    "An illustrative interview study about splitting costs with friends. Top left, an interview guide: a goal — how groups split costs — then 1 Warm-up; 2 'Last time you split…', with nested follow-ups 'Who paid first?' and 'What then?'; and 3 Probes, 'Tell me more'. Top right, two questions compared. Marked with a cross: 'Would you use auto-split?' answered 'Yes, probably.' Marked with a tick: 'Tell me about the last time you split a bill' answered 'I paid. Two took a week to pay me.' Bottom, three quotes from different interviews — 'I hate reminding them', 'took a week to pay', 'I just let it go' — bracketed together into one theme: 'Chasing friends for money is awkward'.",
  key: [
    { n: "1", label: "Goals first", detail: "the guide starts from what the team needs to learn, not from a list of questions" },
    { n: "2", label: "Episodes, with nested follow-ups", detail: "main questions ask about a specific past event; follow-ups sit underneath, to use only if the story does not cover them" },
    { n: "3", label: "Hypothetical: weak data", detail: "'Would you use…?' invites a polite yes that predicts little about behaviour" },
    { n: "4", label: "A specific episode: rich data", detail: "the last real occasion brings back who, what, how long — detail you can build on" },
    { n: "5", label: "Quotes across interviews", detail: "statements from different participants are coded for what they have in common" },
    { n: "6", label: "A theme", detail: "constructed by the researcher from the coded quotes; it states a pattern, not how many people share it" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* the guide */}
      <Card x={8} y={8} w={188} h={180} title="Interview guide">
        <UiText x={20} y={52} mono tone="ink3">
          goal
        </UiText>
        <UiText x={58} y={52} weight={600}>
          How groups split
        </UiText>
        <UiText x={58} y={69} weight={600}>
          costs
        </UiText>
        <line x1={20} y1={80} x2={184} y2={80} stroke={S.rule} strokeWidth="0.8" {...hair} />
        <UiText x={20} y={100}>
          1  Warm-up
        </UiText>
        <UiText x={20} y={122} weight={600}>
          2  Last time you split…
        </UiText>
        <UiText x={36} y={142} tone="ink2">
          ↳ Who paid first?
        </UiText>
        <UiText x={36} y={160} tone="ink2">
          ↳ What then?
        </UiText>
        <UiText x={20} y={180}>
          3  Probes: “Tell me more”
        </UiText>
      </Card>

      {/* two questions compared */}
      <QA y={8} q={["Would you use", "auto-split?"]} a={["“Yes, probably.”"]} ok={false} />
      <QA y={94} q={["Tell me about the last", "time you split a bill."]} a={["“I paid. Two took", "a week to pay me.”"]} ok />

      {/* quotes to a theme */}
      <rect x={8} y={196} width={384} height={96} rx={7} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      {QUOTES.map((q, i) => (
        <g key={q}>
          <rect x={30} y={206 + i * 28} width={168} height={22} rx={4} fill={S.soft} stroke={S.rule} strokeWidth="0.8" {...hair} />
          <UiText x={38} y={222 + i * 28}>
            {q}
          </UiText>
        </g>
      ))}
      <path d="M204 217 H212 V273 H204 M212 245 H226" fill="none" stroke={S.ink2} strokeWidth="1.1" {...hair} />
      <polygon points="232,245 225,241.5 225,248.5" fill={S.ink2} />
      <rect x={236} y={214} width={146} height={62} rx={6} fill={S.accentWash} stroke={S.accent} strokeWidth="1.2" {...hair} />
      <UiText x={246} y={234} mono tone="ink2">
        theme
      </UiText>
      <UiText x={246} y={252} weight={700}>
        Chasing friends for
      </UiText>
      <UiText x={246} y={269} weight={700}>
        money is awkward
      </UiText>

      {detail && (
        <>
          <Marker x={184} y={20} n={1} />
          <Marker x={184} y={118} n={2} />
          <Marker x={204} y={50} n={3} />
          <Marker x={204} y={140} n={4} />
          <Marker x={18} y={217} n={5} />
          <Marker x={380} y={226} n={6} />
        </>
      )}
    </g>
  ),
};

const plates: IllustrationEntry[] = [thinkAloudPlate, treeTestingPlate, contextualInquiryPlate, inDepthInterviewsPlate];
export default plates;
