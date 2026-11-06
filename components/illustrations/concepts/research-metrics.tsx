/** Plates: research-metrics. Authored to docs/ILLUSTRATION_SYSTEM.md rules. */
import type { ReactNode } from "react";
import { nasaTlxRaw, nps, susScore } from "../../../lib/formulas/questionnaires";
import { taskSuccess } from "../../../lib/formulas/stats";
import type { IllustrationEntry } from "../illustration-types";
import { usabilityTestingPlate } from "./foundation-sheets";
import { Arrow, Box, C, HatchDefs, Label, Lines, Node, STROKE, Window } from "../primitives";

/** Deterministic pseudo-random numbers so plates are stable between renders. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** Gaussian curve path over [mean − 3sd, mean + 3sd]. */
function bell(mean: number, sd: number, base: number, height: number) {
  const pts: string[] = [];
  for (let x = mean - 3 * sd; x <= mean + 3 * sd + 0.01; x += sd / 6) {
    const y = base - height * Math.exp(-((x - mean) ** 2) / (2 * sd * sd));
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

const tick = (x: number, y: number, color: string = C.paper) => (
  <path d={`M${x - 4} ${y} l3 3.5 6 -7`} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
);
const cross = (x: number, y: number, color: string = C.line) => (
  <path d={`M${x - 4} ${y - 4} l8 8 M${x + 4} ${y - 4} l-8 8`} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
);

/* ---------------- Heuristic evaluation: the evaluator effect ---------------- */
const problems = [
  [56, 98],
  [150, 94],
  [72, 140],
  [132, 132],
  [158, 172],
  [60, 202],
  [110, 190],
  [150, 216],
];
const found = [
  [1, 2, 4, 6],
  [2, 3, 5, 6],
  [1, 4, 7, 8],
];

const heuristicEvaluation: IllustrationEntry = {
  slug: "heuristic-evaluation",
  title: "Heuristic evaluation plate",
  description:
    "On the left, an interface with eight usability problems marked as numbered dots. On the right, a grid shows which problems each of three independent evaluators found: each finds a different half, and only the combined row at the bottom covers all eight. This is the evaluator effect — several evaluators find far more than any one.",
  Art: ({ detail }) => (
    <g>
      <Window x={28} y={58} w={150} h={180}>
        <rect x={38} y={80} width={60} height={9} fill={C.soft} />
        <Lines x={38} y={114} w={130} n={2} gap={10} />
        <Box x={38} y={152} w={130} h={26} r={2} fill="none" width={STROKE.hair} />
        <Lines x={38} y={222} w={90} n={1} />
      </Window>
      {problems.map(([x, y], i) => (
        <g key={i}>
          <Node cx={x} cy={y} r={detail ? 8 : 6} fill={C.base} />
          {detail && (
            <text x={x} y={y + 3.5} textAnchor="middle" fontSize={9} fontWeight={600} fill={C.paper} fontFamily="var(--font-plex-mono), ui-monospace, monospace">
              {i + 1}
            </text>
          )}
        </g>
      ))}
      {[...found, [1, 2, 3, 4, 5, 6, 7, 8]].map((row, r) => {
        const y = r < 3 ? 76 + r * 28 : 76 + 3 * 28 + 16;
        return (
          <g key={r}>
            {Array.from({ length: 8 }, (_, c) => {
              const on = row.includes(c + 1);
              return <rect key={c} x={222 + c * 18} y={y} width={14} height={20} fill={on ? (r === 3 ? C.ink : C.base) : C.surface} stroke={C.line} strokeWidth={STROKE.hair} />;
            })}
            <Label x={214} y={y + 14} anchor="end" show={detail} tone="line">
              {r < 3 ? `E${r + 1}` : "all"}
            </Label>
          </g>
        );
      })}
      <line x1={218} y1={174} x2={366} y2={174} stroke={C.line} strokeWidth={STROKE.fine} />
      {Array.from({ length: 8 }, (_, c) => (
        <Label key={c} x={229 + c * 18} y={68} show={detail} size={9} tone="mute">
          {c + 1}
        </Label>
      ))}
      <Label x={294} y={236} show={detail}>
        each evaluator finds 4 of 8
      </Label>
      <Label x={294} y={252} show={detail} tone="mute">
        together they find all 8
      </Label>
    </g>
  ),
};

/* ---------------- Cognitive walkthrough: four questions at every step ---------------- */
const cognitiveWalkthrough: IllustrationEntry = {
  slug: "cognitive-walkthrough",
  title: "Cognitive walkthrough plate",
  description:
    "A task drawn as four action steps joined by arrows. Under each step is a column of four check boxes, one per walkthrough question: will the user try the right effect, notice the action, associate it with their goal, and see progress. All are ticked except one box under step three, marked as a failure story.",
  Art: ({ detail }) => {
    const xs = [124, 204, 284, 362];
    return (
      <g>
        {xs.map((x, i) => (
          <g key={i}>
            <Box x={x - 28} y={64} w={56} h={44} fill={i === 2 ? C.soft : C.surface} />
            <Lines x={x - 19} y={80} w={38} n={2} gap={10} />
            {i < 3 && <Arrow x1={x + 30} y1={86} x2={xs[i + 1] - 31} y2={86} />}
            <Label x={x} y={54} show={detail} tone="line">
              step {i + 1}
            </Label>
            <line x1={x} y1={110} x2={x} y2={130} stroke={C.mute} strokeWidth={STROKE.hair} strokeDasharray="2 3" />
            {[0, 1, 2, 3].map((q) => {
              const fail = i === 2 && q === 1;
              const y = 140 + q * 26;
              return (
                <g key={q}>
                  <rect x={x - 9} y={y - 9} width={18} height={18} rx={2} fill={fail ? C.paper : C.base} stroke={fail ? C.ink : C.line} strokeWidth={fail ? STROKE.main : STROKE.fine} />
                  {fail ? cross(x, y, C.ink) : tick(x, y)}
                </g>
              );
            })}
          </g>
        ))}
        {["goal", "notice", "link", "progress"].map((q, i) => (
          <Label key={q} x={24} y={144 + i * 26} anchor="start" show={detail} tone="mute" size={10}>
            Q{i + 1} {q}
          </Label>
        ))}
        <Label x={320} y={262} show={detail}>
          failure story
        </Label>
        <line x1={294} y1={166} x2={316} y2={250} stroke={C.ink} strokeWidth={STROKE.hair} strokeDasharray="3 3" style={detail ? undefined : { display: "none" }} />
      </g>
    );
  },
};


/* ---------------- Card sorting: piles and a similarity matrix ---------------- */
const groupOf = [0, 0, 0, 1, 1, 2];
const sim = (a: number, b: number) => {
  if (a === b) return 1;
  if (groupOf[a] === groupOf[b]) return 0.85;
  if ((a === 2 && b === 3) || (a === 3 && b === 2)) return 0.4;
  return 0.12;
};

const cardSorting: IllustrationEntry = {
  slug: "card-sorting",
  title: "Card sorting plate",
  description:
    "Loose topic cards at the top left are sorted by participants into three piles below. On the right, a similarity matrix records how often each pair of cards was placed together: darker cells mean the pair was grouped together more often, revealing three clusters that suggest categories for the navigation.",
  Art: ({ detail }) => {
    const card = (x: number, y: number, rot = 0, fill: string = C.surface, key?: string) => (
      <g key={key} transform={`rotate(${rot} ${x + 20} ${y + 13})`}>
        <rect x={x} y={y} width={40} height={26} rx={2} fill={fill} stroke={C.line} strokeWidth={STROKE.fine} />
        <Lines x={x + 6} y={y + 9} w={28} n={2} gap={8} />
      </g>
    );
    const piles = [
      { x: 30, n: 3 },
      { x: 96, n: 2 },
      { x: 162, n: 1 },
    ];
    return (
      <g>
        {card(34, 46, -8, C.surface, "l1")}
        {card(82, 40, 5, C.surface, "l2")}
        {card(126, 50, -3, C.surface, "l3")}
        {card(60, 78, 9, C.surface, "l4")}
        {card(110, 84, -6, C.surface, "l5")}
        <Arrow x1={106} y1={124} x2={106} y2={150} />
        {piles.map((p, i) => (
          <g key={i}>
            {Array.from({ length: p.n }, (_, k) => card(p.x + k * 4, 166 + k * 8, 0, k === p.n - 1 ? C.base : C.soft, `p${i}${k}`))}
          </g>
        ))}
        <Label x={106} y={240} show={detail} size={10}>
          participants&apos; piles
        </Label>
        {Array.from({ length: 6 }, (_, r) =>
          Array.from({ length: r + 1 }, (_, c) => (
            <rect key={`${r}-${c}`} x={234 + c * 22} y={58 + r * 22} width={20} height={20} fill={C.base} fillOpacity={sim(r, c)} stroke={C.line} strokeWidth={STROKE.hair} />
          )),
        )}
        <path d="M232 56 V192 H368" fill="none" stroke={C.line} strokeWidth={STROKE.fine} />
        {Array.from({ length: 6 }, (_, i) => (
          <Label key={i} x={244 + i * 22} y={206} show={detail} size={9} tone="mute">
            {String.fromCharCode(65 + i)}
          </Label>
        ))}
        <Label x={300} y={232} show={detail} size={10}>
          how often pairs were grouped
        </Label>
      </g>
    );
  },
};

/* ---------------- System Usability Scale ---------------- */
const susResponses = [4, 2, 4, 1, 5, 2, 4, 2, 4, 2];

const systemUsabilityScale: IllustrationEntry = {
  slug: "system-usability-scale",
  title: "System Usability Scale plate",
  description:
    "Ten questionnaire items, each answered on a five-point scale. Odd items are positively worded and even items negatively worded, marked plus and minus, so agreement alternates sides. The answers converge into a single score on a 0–100 bar — here 80 — with the published average of about 68 marked; the score is a relative measure, not a percentage.",
  Art: ({ detail }) => {
    const score = susScore(susResponses).score;
    const bx = (v: number) => 238 + v * 1.3;
    return (
      <g>
        {susResponses.map((r, i) => {
          const y = 46 + i * 21;
          return (
            <g key={i}>
              <Label x={36} y={y + 4} anchor="end" show={detail} size={9} tone="mute">
                {i + 1}
              </Label>
              <line x1={52} y1={y} x2={140} y2={y} stroke={C.mute} strokeWidth={STROKE.hair} />
              {[1, 2, 3, 4, 5].map((v) => (
                <circle key={v} cx={52 + (v - 1) * 22} cy={y} r={v === r ? 5.5 : 3.5} fill={v === r ? C.base : C.surface} stroke={C.line} strokeWidth={STROKE.hair} />
              ))}
              <g stroke={C.ink} strokeWidth={1.6} strokeLinecap="round">
                <line x1={154} y1={y} x2={162} y2={y} />
                {i % 2 === 0 && <line x1={158} y1={y - 4} x2={158} y2={y + 4} />}
              </g>
              <line x1={170} y1={y} x2={214} y2={150} stroke={C.mute} strokeWidth={STROKE.hair} />
            </g>
          );
        })}
        <Arrow x1={214} y1={150} x2={232} y2={150} />
        <rect x={238} y={142} width={130} height={16} fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
        <rect x={238} y={142} width={score * 1.3} height={16} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
        <line x1={bx(68)} y1={132} x2={bx(68)} y2={168} stroke={C.ink} strokeWidth={STROKE.main} strokeDasharray="3 2" />
        <Label x={bx(score)} y={126} show={detail} size={16} tone="line" weight={600}>
          {score}
        </Label>
        <Label x={bx(68)} y={184} show={detail} size={10}>
          ≈68 average
        </Label>
        <Label x={238} y={202} show={detail} size={9} tone="mute">
          0
        </Label>
        <Label x={368} y={202} show={detail} size={9} tone="mute">
          100
        </Label>
        <Label x={303} y={226} show={detail} size={10} tone="mute">
          a score, not a percentage
        </Label>
        <Label x={96} y={268} show={detail} size={10}>
          1 ··· 5 agreement
        </Label>
      </g>
    );
  },
};

/* ---------------- NASA-TLX ---------------- */
const tlx = [55, 10, 45, 30, 50, 25];

const nasaTlx: IllustrationEntry = {
  slug: "nasa-tlx",
  title: "NASA-TLX plate",
  description:
    "Six vertical bars rate workload on a 0–100 scale for mental demand, physical demand, temporal demand, performance, effort and frustration. Mental demand is the tallest. A dashed line across the bars marks the raw TLX score, the simple mean of the six ratings, about 36.",
  Art: ({ detail }) => {
    const mean = nasaTlxRaw(tlx);
    const y = (v: number) => 236 - v * 1.6;
    const max = Math.max(...tlx);
    return (
      <g>
        <line x1={46} y1={236} x2={370} y2={236} stroke={C.line} strokeWidth={STROKE.fine} />
        <line x1={46} y1={76} x2={370} y2={76} stroke={C.mute} strokeWidth={STROKE.hair} strokeDasharray="2 4" />
        {tlx.map((v, i) => {
          const x = 66 + i * 50;
          return (
            <g key={i}>
              <rect x={x} y={y(v)} width={30} height={v * 1.6} fill={v === max ? C.base : C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
              <Label x={x + 15} y={254} show={detail} size={10} tone="line">
                {["MD", "PD", "TD", "OP", "EF", "FR"][i]}
              </Label>
            </g>
          );
        })}
        <line x1={50} y1={y(mean)} x2={366} y2={y(mean)} stroke={C.ink} strokeWidth={STROKE.main} strokeDasharray="7 4" />
        <Label x={366} y={100} anchor="end" show={detail}>
          raw TLX = mean ≈ {mean.toFixed(1)}
        </Label>
        <line x1={358} y1={106} x2={358} y2={y(mean) - 3} stroke={C.ink} strokeWidth={STROKE.hair} strokeDasharray="2 2" style={detail ? undefined : { display: "none" }} />
        <Label x={42} y={80} anchor="end" show={detail} size={9} tone="mute">
          100
        </Label>
        <Label x={42} y={240} anchor="end" show={detail} size={9} tone="mute">
          0
        </Label>
        <Label x={208} y={274} show={detail} size={10} tone="mute">
          MD mental · PD physical · TD temporal
        </Label>
        <Label x={208} y={288} show={detail} size={10} tone="mute">
          OP performance · EF effort · FR frustration
        </Label>
      </g>
    );
  },
};

/* ---------------- Net Promoter Score ---------------- */
const netPromoterScore: IllustrationEntry = {
  slug: "net-promoter-score",
  title: "Net Promoter Score plate",
  description:
    "An eleven-point 0–10 recommendation scale split into detractors (0–6, hatched), passives (7–8, plain) and promoters (9–10, solid). Below, a bar shows the share of each group in a sample of responses: 50% promoters, 30% passives and 20% detractors. The score subtracts detractors from promoters, giving +30; passives are ignored.",
  Art: ({ detail }) => {
    const r = nps(50, 30, 20);
    const cell = (i: number): ReactNode => (i <= 6 ? "url(#net-promoter-score-hatch)" : i <= 8 ? C.surface : C.base);
    const w = 308;
    const seg = [r.promoterShare * w, r.passiveShare * w, r.detractorShare * w];
    return (
      <g>
        <HatchDefs id="net-promoter-score-hatch" />
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i}>
            <rect x={46 + i * 28} y={58} width={28} height={34} fill={cell(i) as string} stroke={C.line} strokeWidth={STROKE.fine} />
            <rect x={46 + i * 28 + 7} y={66} width={14} height={18} fill={i <= 6 ? C.paper : "none"} style={detail ? undefined : { display: "none" }} />
            {detail && (
              <text x={60 + i * 28} y={80} textAnchor="middle" fontSize={10} fontWeight={500} fill={i >= 9 ? C.paper : C.line} fontFamily="var(--font-plex-mono), ui-monospace, monospace">
                {i}
              </text>
            )}
          </g>
        ))}
        <Label x={46 + 3.5 * 28} y={112} show={detail} size={10}>
          detractors 0–6
        </Label>
        <Label x={46 + 8 * 28} y={112} show={detail} size={10}>
          passives
        </Label>
        <Label x={46 + 10 * 28} y={126} show={detail} size={10}>
          promoters
        </Label>
        <Arrow x1={200} y1={122} x2={200} y2={150} />
        <rect x={46} y={160} width={seg[0]} height={28} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
        <rect x={46 + seg[0]} y={160} width={seg[1]} height={28} fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
        <rect x={46 + seg[0] + seg[1]} y={160} width={seg[2]} height={28} fill="url(#net-promoter-score-hatch)" stroke={C.line} strokeWidth={STROKE.fine} />
        <Label x={46 + seg[0] / 2} y={206} show={detail} size={10}>
          {Math.round(r.promoterShare * 100)}%
        </Label>
        <Label x={46 + seg[0] + seg[1] / 2} y={206} show={detail} size={10} tone="mute">
          {Math.round(r.passiveShare * 100)}%
        </Label>
        <Label x={46 + seg[0] + seg[1] + seg[2] / 2} y={206} show={detail} size={10}>
          {Math.round(r.detractorShare * 100)}%
        </Label>
        <Label x={200} y={248} show={detail} size={13} tone="line" weight={600}>
          NPS = {Math.round(r.promoterShare * 100)} − {Math.round(r.detractorShare * 100)} = +{Math.round(r.nps)}
        </Label>
      </g>
    );
  },
};

/* ---------------- Task success rate with an adjusted-Wald interval ---------------- */
const attempts = [1, 1, 0, 1, 1, 1, 0, 1, 1, 0];

const taskSuccessRate: IllustrationEntry = {
  slug: "task-success-rate",
  title: "Task success rate plate",
  description:
    "Ten task attempts drawn as squares: seven ticked successes and three crossed failures. Below, a 0–100% axis shows the observed success rate of 70% as a dot, with a wide bar for the 95% adjusted-Wald confidence interval, roughly 39% to 90% — with only ten participants the true rate is uncertain.",
  Art: ({ detail }) => {
    const x = attempts.filter(Boolean).length;
    const ts = taskSuccess(x, attempts.length);
    const ax = (p: number) => 50 + p * 300;
    return (
      <g>
        {attempts.map((a, i) => (
          <g key={i}>
            <rect x={53 + i * 30} y={62} width={24} height={24} rx={2} fill={a ? C.base : C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
            {a ? tick(65 + i * 30, 74) : cross(65 + i * 30, 74)}
          </g>
        ))}
        <Label x={200} y={112} show={detail} tone="line">
          {x} of {attempts.length} succeeded
        </Label>
        <line x1={50} y1={190} x2={350} y2={190} stroke={C.line} strokeWidth={STROKE.fine} />
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={ax(t)} y1={185} x2={ax(t)} y2={195} stroke={C.line} strokeWidth={STROKE.hair} />
            <Label x={ax(t)} y={212} show={detail} size={9} tone="mute">
              {t * 100}%
            </Label>
          </g>
        ))}
        <line x1={ax(ts.low)} y1={160} x2={ax(ts.high)} y2={160} stroke={C.ink} strokeWidth={5} strokeLinecap="butt" />
        <line x1={ax(ts.low)} y1={150} x2={ax(ts.low)} y2={170} stroke={C.ink} strokeWidth={STROKE.main} />
        <line x1={ax(ts.high)} y1={150} x2={ax(ts.high)} y2={170} stroke={C.ink} strokeWidth={STROKE.main} />
        <Node cx={ax(ts.p)} cy={160} r={8} fill={C.base} width={STROKE.main} />
        <Label x={ax(ts.low)} y={144} show={detail} size={10}>
          {Math.round(ts.low * 100)}%
        </Label>
        <Label x={ax(ts.high)} y={144} show={detail} size={10}>
          {Math.round(ts.high * 100)}%
        </Label>
        <Label x={200} y={246} show={detail}>
          observed 70% · 95% adjusted-Wald interval
        </Label>
      </g>
    );
  },
};

/* ---------------- A/B testing ---------------- */
const abTesting: IllustrationEntry = {
  slug: "ab-testing",
  title: "A/B testing plate",
  description:
    "Users stream in from the left and are randomly split between two variants of a page, A and B, which differ only in one design change. On the right, two overlapping distributions show the uncertainty in each variant's conversion rate; B's is shifted higher, and the overlap is what a significance test weighs.",
  animated: true,
  Art: ({ detail, animate }) => (
    <g>
      <Node cx={36} cy={150} r={10} fill={C.surface} width={STROKE.main} />
      <path d="M46 150 C 80 150, 82 92, 112 92" fill="none" stroke={C.line} strokeWidth={STROKE.fine} />
      <path d="M46 150 C 80 150, 82 208, 112 208" fill="none" stroke={C.line} strokeWidth={STROKE.fine} />
      <g className={animate ? "anim-drift" : undefined}>
        {[
          [62, 140],
          [72, 118],
          [84, 102],
          [72, 182],
          [84, 198],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3.2} fill={C.ink} />
        ))}
      </g>
      <Window x={112} y={62} w={78} h={62}>
        <Lines x={120} y={86} w={60} n={2} gap={8} />
        <Box x={120} y={102} w={34} h={14} fill={C.soft} r={2} />
      </Window>
      <Window x={112} y={178} w={78} h={62}>
        <Lines x={120} y={202} w={60} n={2} gap={8} />
        <Box x={120} y={218} w={46} h={14} fill={C.base} r={2} />
      </Window>
      <Label x={151} y={54} show={detail} tone="line">
        A
      </Label>
      <Label x={151} y={258} show={detail} tone="line">
        B
      </Label>
      <line x1={214} y1={226} x2={374} y2={226} stroke={C.line} strokeWidth={STROKE.fine} />
      <path d={bell(270, 22, 226, 120)} fill={C.soft} fillOpacity={0.75} stroke={C.line} strokeWidth={STROKE.fine} />
      <path d={bell(318, 22, 226, 120)} fill={C.base} fillOpacity={0.55} stroke={C.line} strokeWidth={STROKE.fine} />
      <line x1={270} y1={100} x2={270} y2={226} stroke={C.line} strokeWidth={STROKE.hair} strokeDasharray="3 3" />
      <line x1={318} y1={100} x2={318} y2={226} stroke={C.line} strokeWidth={STROKE.hair} strokeDasharray="3 3" />
      <Label x={270} y={94} show={detail} size={10}>
        A
      </Label>
      <Label x={318} y={94} show={detail} size={10}>
        B
      </Label>
      <Label x={294} y={246} show={detail} size={10} tone="mute">
        conversion rate →
      </Label>
      <Label x={36} y={176} show={detail} size={10} tone="mute">
        users
      </Label>
      <Label x={294} y={70} show={detail} size={10}>
        random split · one change
      </Label>
    </g>
  ),
};

/* ---------------- Confidence intervals: coverage in repeated samples ---------------- */
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

/* ---------------- Sample size: interval width shrinks with √n ---------------- */
const rows = [
  { n: 10, y: 80, half: 64 },
  { n: 40, y: 150, half: 32 },
  { n: 160, y: 220, half: 16 },
];

const sampleSizeEstimation: IllustrationEntry = {
  slug: "sample-size-estimation",
  title: "Sample size estimation plate",
  description:
    "Three rows of increasing sample size — 10, 40 and 160 observations — drawn as clouds of dots. Beside each, the confidence interval for the mean narrows: every fourfold increase in sample size halves the interval's width, because precision grows with the square root of n.",
  Art: ({ detail }) => (
    <g>
      <line x1={290} y1={50} x2={290} y2={246} stroke={C.mute} strokeWidth={STROKE.fine} strokeDasharray="4 4" />
      {rows.map((r, i) => {
        const rand = rng(17 + i * 101);
        return (
          <g key={r.n}>
            {Array.from({ length: r.n }, (_, k) => (
              <circle key={k} cx={34 + rand() * 140} cy={r.y - 18 + rand() * 36} r={r.n > 50 ? 1.9 : 3} fill={C.ink} />
            ))}
            <Arrow x1={186} y1={r.y} x2={206} y2={r.y} />
            <rect x={290 - r.half} y={r.y - 9} width={r.half * 2} height={18} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
            <line x1={290} y1={r.y - 13} x2={290} y2={r.y + 13} stroke={C.line} strokeWidth={STROKE.main} />
            <Label x={34} y={r.y - 26} anchor="start" show={detail} size={10} tone="line">
              n = {r.n}
            </Label>
          </g>
        );
      })}
      <Label x={290} y={44} show={detail} size={10} tone="mute">
        interval for the mean
      </Label>
      <Label x={200} y={272} show={detail}>
        4× the sample → half the width
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
