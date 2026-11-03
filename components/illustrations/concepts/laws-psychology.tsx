/** Plates: laws-psychology. Authored to docs/ILLUSTRATION_SYSTEM.md rules. */
import type { CSSProperties } from "react";
import type { IllustrationEntry } from "../illustration-types";
import { Arrow, Box, C, CurveArrow, Cursor, Dim, HatchDefs, Label, Lines, Node, STROKE, Window } from "../primitives";

/* ---------------- Steering law: moving through a constrained tunnel ---------------- */
const steerPath = "M52 110 C 90 104, 120 116, 160 108 S 214 112, 228 112 C 236 140, 222 170, 232 200 S 226 230, 230 244";

const steeringLaw: IllustrationEntry = {
  slug: "steering-law",
  title: "Steering law plate",
  description:
    "An L-shaped tunnel, like a cascading menu: a horizontal corridor followed by a vertical one. A dotted path runs through the tunnel without touching the walls, ending at a pointer. Dimension lines mark the tunnel's length A and width W; movement time grows with the ratio A divided by W.",
  animated: true,
  Art: ({ detail, animate }) => (
    <g>
      <path d="M40 88 H254 V262 H206 V132 H40 Z" fill={C.soft} stroke={C.line} strokeWidth={STROKE.main} strokeLinejoin="round" />
      <path d={steerPath} fill="none" stroke={C.line} strokeWidth={STROKE.main} strokeLinecap="round" strokeDasharray="1 6" />
      <circle cx="52" cy="110" r="6" fill={C.paper} stroke={C.line} strokeWidth={STROKE.main} />
      <rect x="206" y="232" width="48" height="30" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      <g style={animate ? { offsetPath: `path("${steerPath}")`, offsetRotate: "0deg" } : undefined} className={animate ? "anim-travel" : undefined}>
        <Cursor x={animate ? 0 : 228} y={animate ? 0 : 242} />
      </g>
      <Dim x1={40} y1={68} x2={254} y2={68} label="A  path length" show={detail} />
      <Dim x1={272} y1={88} x2={272} y2={132} label="W" show={detail} offset={8} />
      <Label x={330} y={160} show={detail} tone="line" size={12}>
        MT = a + b·A/W
      </Label>
      <Label x={330} y={180} show={detail} tone="mute">
        narrower = slower
      </Label>
    </g>
  ),
};

/* ---------------- Keystroke-Level Model: operators on a timeline ---------------- */
const KLM_PX = 53; // px per second
const klmOps: { op: string; t: number; mental?: boolean }[] = [
  { op: "M", t: 1.35, mental: true },
  { op: "P", t: 1.1 },
  { op: "B", t: 0.1 },
  { op: "B", t: 0.1 },
  { op: "H", t: 0.4 },
  { op: "M", t: 1.35, mental: true },
  { op: "K", t: 0.28 },
  { op: "K", t: 0.28 },
  { op: "K", t: 0.28 },
  { op: "K", t: 0.28 },
];

const keystrokeLevelModel: IllustrationEntry = {
  slug: "keystroke-level-model",
  title: "Keystroke-Level Model plate",
  description:
    "A timeline of operator blocks whose widths are proportional to their standard times: mental preparation (M, 1.35 s), point (P, 1.1 s), two button actions (B, 0.1 s each), home hands (H, 0.4 s), another M and four keystrokes (K, 0.28 s each). A bracket above sums them to about 5.5 seconds of predicted expert execution time.",
  Art: ({ detail }) => {
    let x = 52;
    const blocks = klmOps.map((o) => {
      const w = o.t * KLM_PX;
      const b = { ...o, x, w };
      x += w;
      return b;
    });
    const end = x;
    return (
      <g>
        {blocks.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={120} width={b.w} height={56} fill={b.mental ? C.soft : C.base} stroke={C.line} strokeWidth={STROKE.fine} />
            {b.w > 12 && (
              <text x={b.x + b.w / 2} y={153} textAnchor="middle" fontSize={b.w > 40 ? 16 : 11} fill={b.mental ? C.line : C.paper} fontFamily="var(--font-plex-mono), monospace">
                {b.op}
              </text>
            )}
          </g>
        ))}
        <line x1={52} y1={204} x2={end + 6} y2={204} stroke={C.line} strokeWidth={STROKE.fine} />
        {[0, 1, 2, 3, 4, 5].map((s) => (
          <g key={s}>
            <line x1={52 + s * KLM_PX} y1={200} x2={52 + s * KLM_PX} y2={208} stroke={C.line} strokeWidth={STROKE.fine} />
            <Label x={52 + s * KLM_PX} y={224} show={detail} tone="mute">
              {s}s
            </Label>
          </g>
        ))}
        <Dim x1={52} y1={96} x2={end} y2={96} label="≈ 5.5 s predicted" show={detail} />
        <Label x={52} y={262} anchor="start" show={detail} tone="mute">
          M think · P point · B click · H home · K key
        </Label>
        <Label x={blocks[2].x + 6} y={112} show={detail} anchor="middle" tone="mute">
          BB
        </Label>
      </g>
    );
  },
};

/* ---------------- Doherty threshold: response-time axis ---------------- */
const tx = (t: number) => 40 + ((Math.log10(t) + 1.3) / 2.6) * 320;

const dohertyThreshold: IllustrationEntry = {
  slug: "doherty-threshold",
  title: "Doherty threshold plate",
  description:
    "Above, a person and a system exchange requests and responses in a loop. Below, a logarithmic response-time axis is shaded into bands at 0.1, 1 and 10 seconds, the guidance often given for instant, flowing and attention-losing delays. A marker at about 400 milliseconds shows the threshold reported in Doherty and Thadani's 1982 IBM report — a productivity rule of thumb, not a perceptual law.",
  animated: true,
  Art: ({ detail, animate }) => {
    const bands = [
      [0.05, 0.1, 0.9],
      [0.1, 1, 0.6],
      [1, 10, 0.35],
      [10, 20, 0.12],
    ];
    return (
      <g>
        <Node cx={110} cy={84} r={16} fill={C.surface} width={STROKE.main} />
        <Box x={268} y={66} w={44} h={36} fill={C.surface} width={STROKE.main} />
        <CurveArrow d="M128 74 C 180 44, 220 44, 264 74" tip={[264, 74]} angle={0.6} />
        <CurveArrow d="M266 96 C 220 128, 176 128, 130 96" tip={[130, 96]} angle={-2.5} className={animate ? "anim-fade" : undefined} />
        {bands.map(([a, b, o], i) => (
          <rect key={i} x={tx(a)} y={172} width={tx(b) - tx(a)} height={44} fill={C.soft} opacity={o} />
        ))}
        <line x1={40} y1={216} x2={360} y2={216} stroke={C.line} strokeWidth={STROKE.main} />
        {[0.1, 1, 10].map((t) => (
          <line key={t} x1={tx(t)} y1={172} x2={tx(t)} y2={222} stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray="3 3" />
        ))}
        <line x1={tx(0.4)} y1={160} x2={tx(0.4)} y2={222} stroke={C.ink} strokeWidth={STROKE.main * 1.4} />
        <rect x={tx(0.4) - 7} y={150} width={14} height={14} transform={`rotate(45 ${tx(0.4)} 157)`} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
        <Label x={tx(0.1)} y={238} show={detail}>0.1 s</Label>
        <Label x={tx(1)} y={238} show={detail}>1 s</Label>
        <Label x={tx(10)} y={238} show={detail}>10 s</Label>
        <Label x={tx(0.4)} y={140} show={detail} tone="line">≈ 400 ms</Label>
        <Label x={200} y={268} show={detail} tone="mute">response time (log scale) · bands are guidance</Label>
        <Label x={110} y={124} show={detail} tone="mute">user</Label>
        <Label x={290} y={124} show={detail} tone="mute">system</Label>
      </g>
    );
  },
};

/* ---------------- Tesler's law: complexity is conserved ---------------- */
const teslersLaw: IllustrationEntry = {
  slug: "teslers-law",
  title: "Tesler's law plate",
  description:
    "A balance beam on a central pivot. The left pan, labelled user, holds two complexity blocks; the right pan, labelled system, holds six, three of which have been moved across from the user side, shown by dashed arrows. The total number of blocks is unchanged: complexity can be moved, but not removed.",
  Art: ({ detail }) => {
    const lx = 92;
    const ly = 128;
    const rx = 308;
    const ry = 162;
    const block = (x: number, y: number, moved: boolean, k: string) => <rect key={k} x={x} y={y} width={18} height={18} fill={moved ? "url(#teslers-law-hatch)" : C.base} stroke={C.line} strokeWidth={STROKE.fine} />;
    return (
      <g>
        <HatchDefs id="teslers-law-hatch" />
        <path d="M200 145 L184 236 H216 Z" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} strokeLinejoin="round" />
        <line x1={60} y1={ly} x2={340} y2={ry} stroke={C.line} strokeWidth={STROKE.main * 1.4} strokeLinecap="round" />
        <circle cx="200" cy="145" r="5" fill={C.line} />
        <line x1={60} y1={240} x2={340} y2={240} stroke={C.line} strokeWidth={STROKE.fine} />
        {/* pans */}
        <path d={`M${lx - 32} ${ly} h64`} stroke={C.line} strokeWidth={STROKE.main} />
        <path d={`M${rx - 34} ${ry} h68`} stroke={C.line} strokeWidth={STROKE.main} />
        {block(lx - 20, ly - 19, false, "l1")}
        {block(lx + 2, ly - 19, false, "l2")}
        {[0, 1, 2].map((i) => block(rx - 30 + i * 20, ry - 19, false, `r${i}`))}
        {[0, 1, 2].map((i) => block(rx - 30 + i * 20, ry - 39, true, `m${i}`))}
        {/* ghost slots where moved blocks were */}
        {[0, 1, 2].map((i) => (
          <rect key={`g${i}`} x={lx - 30 + i * 20} y={ly - 40} width={18} height={18} fill="none" stroke={C.mute} strokeWidth={STROKE.fine} strokeDasharray="3 3" />
        ))}
        <CurveArrow d="M112 74 C 170 40, 240 44, 298 100" tip={[298, 100]} angle={0.95} dashed />
        <Label x={lx} y={166} show={detail}>user</Label>
        <Label x={rx} y={196} show={detail}>system</Label>
        <Label x={200} y={30} show={detail} tone="line">complexity moved, not removed</Label>
        <Label x={200} y={266} show={detail} tone="mute">same total before and after: 8 blocks</Label>
      </g>
    );
  },
};

/* ---------------- Serial position effect: the U-shaped curve ---------------- */
const recall = [0.82, 0.68, 0.55, 0.44, 0.38, 0.35, 0.34, 0.37, 0.45, 0.62, 0.8, 0.9];

const serialPositionEffect: IllustrationEntry = {
  slug: "serial-position-effect",
  title: "Serial position effect plate",
  description:
    "A bar chart of recall probability for twelve list positions. Bars are tall for the first few items (primacy) and the last few items (recency), and lower in the middle, forming a U-shaped curve traced by a line across the bar tops.",
  animated: true,
  Art: ({ detail, animate }) => {
    const x0 = 60;
    const bw = 22;
    const gap = 3.5;
    const base = 230;
    const h = 170;
    const tops = recall.map((r, i) => [x0 + i * (bw + gap) + bw / 2, base - r * h]);
    const d = "M" + tops.map((p) => p.join(" ")).join(" L");
    return (
      <g>
        <line x1={x0 - 10} y1={base} x2={x0 + 12 * (bw + gap)} y2={base} stroke={C.line} strokeWidth={STROKE.fine} />
        <line x1={x0 - 10} y1={50} x2={x0 - 10} y2={base} stroke={C.line} strokeWidth={STROKE.fine} />
        {recall.map((r, i) => {
          const end = i < 3 || i > 8;
          return <rect key={i} x={x0 + i * (bw + gap)} y={base - r * h} width={bw} height={r * h} fill={end ? C.base : C.soft} stroke={C.line} strokeWidth={STROKE.fine} />;
        })}
        <path d={d} fill="none" stroke={C.ink} strokeWidth={STROKE.main} strokeDasharray="5 4" className={animate ? "anim-draw" : undefined} style={animate ? ({ "--len": 360 } as CSSProperties) : undefined} />
        <Label x={x0 + 1.5 * (bw + gap)} y={74} show={detail} tone="line">primacy</Label>
        <Label x={x0 + 10.2 * (bw + gap)} y={60} show={detail} tone="line">recency</Label>
        <Label x={210} y={254} show={detail} tone="mute">list position →</Label>
        <Label x={x0 - 6} y={42} anchor="start" show={detail} tone="mute">recall ↑</Label>
      </g>
    );
  },
};

/* ---------------- Von Restorff effect: the isolated item ---------------- */
const vonRestorffEffect: IllustrationEntry = {
  slug: "von-restorff-effect",
  title: "Von Restorff effect plate",
  description:
    "A row of seven identical outlined squares with one item that differs: a larger filled circle in the fifth position. Below the row, bars show how likely each item is to be remembered; the isolated item's bar is clearly taller than the rest.",
  Art: ({ detail, animate }) => {
    const xs = [48, 92, 136, 180, 224, 268, 312];
    const odd = 4;
    const rec = [0.34, 0.3, 0.28, 0.3, 0.86, 0.3, 0.36];
    return (
      <g>
        {xs.map((x, i) =>
          i === odd ? (
            <circle key={i} cx={x + 18} cy={96} r={22} fill={C.base} stroke={C.line} strokeWidth={STROKE.main} className={animate ? "anim-pulse" : undefined} />
          ) : (
            <rect key={i} x={x + 6} y={84} width={24} height={24} fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
          ),
        )}
        <line x1={44} y1={238} x2={356} y2={238} stroke={C.line} strokeWidth={STROKE.fine} />
        {xs.map((x, i) => (
          <rect key={i} x={x + 8} y={238 - rec[i] * 90} width={20} height={rec[i] * 90} fill={i === odd ? C.base : C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
        ))}
        <line x1={44} y1={136} x2={356} y2={136} stroke={C.mute} strokeWidth={STROKE.hair} strokeDasharray="2 4" />
        <Label x={200} y={52} show={detail}>items studied</Label>
        <Label x={200} y={262} show={detail} tone="mute">later recall — the distinctive item stands out</Label>
      </g>
    );
  },
};

/* ---------------- Aesthetic-usability effect: perceived vs measured ---------------- */
const aestheticUsabilityEffect: IllustrationEntry = {
  slug: "aesthetic-usability-effect",
  title: "Aesthetic-usability effect plate",
  description:
    "Two versions of the same interface: on the left a plain, misaligned layout; on the right a polished, aligned one. Beneath each are two bars. The measured-usability bars are equal height, joined by a dashed line, while the perceived-usability bar is higher for the attractive version: people tend to rate attractive designs as more usable even when performance is the same.",
  Art: ({ detail }) => {
    const pair = (x: number, perceived: number) => (
      <g>
        <rect x={x} y={250 - perceived} width={26} height={perceived} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
        <rect x={x + 34} y={250 - 56} width={26} height={56} fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
      </g>
    );
    return (
      <g>
        {/* plain version */}
        <Window x={40} y={44} w={130} h={104} fill={C.surface}>
          <line x1={52} y1={74} x2={118} y2={70} stroke={C.mute} strokeWidth={4} strokeLinecap="round" />
          <line x1={58} y1={90} x2={150} y2={92} stroke={C.mute} strokeWidth={2.2} strokeLinecap="round" />
          <line x1={50} y1={104} x2={132} y2={101} stroke={C.mute} strokeWidth={2.2} strokeLinecap="round" />
          <rect x={64} y={118} width={34} height={14} fill="none" stroke={C.mute} strokeWidth={STROKE.fine} transform="rotate(-3 81 125)" />
        </Window>
        {/* polished version */}
        <Window x={230} y={44} w={130} h={104} fill={C.surface}>
          <rect x={242} y={68} width={56} height={10} fill={C.base} />
          <Lines x={242} y={92} w={104} n={2} gap={11} />
          <rect x={242} y={118} width={44} height={16} rx={3} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
        </Window>
        <line x1={44} y1={250} x2={356} y2={250} stroke={C.line} strokeWidth={STROKE.fine} />
        {pair(76, 48)}
        {pair(266, 92)}
        <line x1={110} y1={194} x2={300} y2={194} stroke={C.ink} strokeWidth={STROKE.fine} strokeDasharray="5 4" />
        <Label x={205} y={188} show={detail}>measured: same</Label>
        <Label x={200} y={274} show={detail} tone="mute">■ perceived usability   □ measured usability</Label>
      </g>
    );
  },
};

/* ---------------- Choice overload: a contested effect ---------------- */
const choiceOverload: IllustrationEntry = {
  slug: "choice-overload",
  title: "Choice overload plate",
  description:
    "Left, a small set of six options leads to a confident choice, marked with a filled dot. Right, a large set of twenty-four options leads to an uncertain outcome, marked with a question mark. Along the bottom, a forest-plot style interval spans zero, showing that across many studies the average effect is close to zero and highly variable — the effect is contested.",
  Art: ({ detail }) => {
    const grid = (x: number, y: number, cols: number, rows: number, s: number, k: string) =>
      Array.from({ length: cols * rows }).map((_, i) => (
        <rect key={`${k}${i}`} x={x + (i % cols) * (s + 4)} y={y + Math.floor(i / cols) * (s + 4)} width={s} height={s} rx={2} fill={i === 2 && k === "a" ? C.base : C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
      ));
    return (
      <g>
        {grid(44, 60, 3, 2, 22, "a")}
        <Arrow x1={130} y1={86} x2={156} y2={86} />
        <circle cx={170} cy={86} r={9} fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
        {grid(196, 44, 6, 4, 14, "b")}
        <Arrow x1={310} y1={86} x2={330} y2={86} />
        <circle cx={346} cy={86} r={13} fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} strokeDasharray="3 3" />
        <text x={346} y={92} textAnchor="middle" fontSize="16" fill={C.ink} fontFamily="var(--font-newsreader), serif">
          ?
        </text>
        {/* forest-plot: effect size around zero */}
        <line x1={60} y1={210} x2={340} y2={210} stroke={C.line} strokeWidth={STROKE.fine} />
        <line x1={200} y1={170} x2={200} y2={226} stroke={C.ink} strokeWidth={STROKE.fine} strokeDasharray="3 3" />
        {[
          [132, 238, 176],
          [158, 300, 188],
          [96, 214, 200],
        ].map(([a, b, y], i) => (
          <g key={i}>
            <line x1={a} y1={y} x2={b} y2={y} stroke={C.mute} strokeWidth={STROKE.fine} />
            <circle cx={(a + b) / 2} cy={y} r={3} fill={C.mute} />
          </g>
        ))}
        <line x1={150} y1={232} x2={262} y2={232} stroke={C.line} strokeWidth={STROKE.main} />
        <rect x={200} y={225} width={14} height={14} transform="rotate(45 207 232)" fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
        <Label x={200} y={162} show={detail} tone="mute">0</Label>
        <Label x={200} y={268} show={detail} tone="line">pooled effect ≈ 0, wide variation — contested</Label>
        <Label x={84} y={134} show={detail}>6 options</Label>
        <Label x={250} y={134} show={detail}>24 options</Label>
      </g>
    );
  },
};

/* ---------------- Working memory model (Baddeley & Hitch; Baddeley 2000) ---------------- */
const workingMemoryModel: IllustrationEntry = {
  slug: "working-memory-model",
  title: "Working memory model plate",
  description:
    "A central executive box at the top controls three subsystems below it: the phonological loop on the left, drawn with a looping rehearsal arrow; the episodic buffer in the middle; and the visuospatial sketchpad on the right, drawn as a small grid. A long-term memory band runs along the bottom, connected to all three.",
  Art: ({ detail, animate }) => (
    <g>
      <Box x={140} y={36} w={120} h={44} fill={C.base} width={STROKE.main} />
      <Box x={30} y={128} w={100} h={56} fill={C.surface} />
      <Box x={150} y={128} w={100} h={56} fill={C.soft} />
      <Box x={270} y={128} w={100} h={56} fill={C.surface} />
      <Arrow x1={170} y1={80} x2={96} y2={124} />
      <Arrow x1={200} y1={80} x2={200} y2={124} />
      <Arrow x1={230} y1={80} x2={304} y2={124} />
      {/* rehearsal loop */}
      <CurveArrow d="M60 160 C 60 140, 100 140, 100 160 C 100 176, 70 176, 66 166" tip={[66, 166]} angle={-1.9} className={animate ? "anim-fade" : undefined} />
      {/* sketchpad grid */}
      <g stroke={C.line} strokeWidth={STROKE.hair}>
        {[0, 1, 2, 3].map((i) => (
          <line key={`v${i}`} x1={296 + i * 16} y1={140} x2={296 + i * 16} y2={172} />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`h${i}`} x1={296} y1={140 + i * 16} x2={344} y2={140 + i * 16} />
        ))}
      </g>
      <rect x={312} y={140} width={16} height={16} fill={C.base} />
      {/* buffer: binding of strands */}
      <circle cx={186} cy={156} r={10} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
      <circle cx={214} cy={156} r={10} fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
      <rect x={30} y={226} width={340} height={28} rx={3} fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray="4 3" />
      {[80, 200, 320].map((x) => (
        <line key={x} x1={x} y1={206} x2={x} y2={226} stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray="2 3" />
      ))}
      <Label x={200} y={30} show={detail}>central executive</Label>
      <Label x={80} y={200} show={detail} size={10}>phonological loop</Label>
      <Label x={200} y={200} show={detail} size={10}>episodic buffer</Label>
      <Label x={320} y={200} show={detail} size={10}>sketchpad</Label>
      <Label x={200} y={244} show={detail} tone="line">long-term memory</Label>
    </g>
  ),
};

/* ---------------- Recognition over recall ---------------- */
const recognitionOverRecall: IllustrationEntry = {
  slug: "recognition-over-recall",
  title: "Recognition over recall plate",
  description:
    "Left, a menu window lists visible options and a pointer selects one of them: the user only has to recognise the right choice. Right, an empty command line with a blinking caret gives no cues, so the user must recall the exact command from memory, shown by an empty dashed thought region.",
  animated: true,
  Art: ({ detail, animate }) => (
    <g>
      <Window x={36} y={56} w={146} h={170} fill={C.surface}>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={46} y={82 + i * 26} width={126} height={20} rx={2} fill={i === 2 ? C.base : "none"} stroke={i === 2 ? C.line : "none"} strokeWidth={STROKE.fine} />
            <line x1={54} y1={92 + i * 26} x2={54 + [70, 56, 84, 62, 74][i]} y2={92 + i * 26} stroke={i === 2 ? C.paper : C.mute} strokeWidth={2.4} strokeLinecap="round" />
          </g>
        ))}
        <Cursor x={150} y={140} />
      </Window>
      <Window x={218} y={56} w={146} h={170} fill={C.surface}>
        <text x={230} y={104} fontSize="14" fill={C.line} fontFamily="var(--font-plex-mono), monospace">
          &gt;
        </text>
        <rect x={244} y={92} width={8} height={15} fill={C.line} className={animate ? "anim-blink" : undefined} />
        <rect x={234} y={134} width={114} height={70} rx={30} fill="none" stroke={C.mute} strokeWidth={STROKE.fine} strokeDasharray="4 4" />
        <text x={291} y={176} textAnchor="middle" fontSize="22" fill={C.mute} fontFamily="var(--font-newsreader), serif">
          ?
        </text>
      </Window>
      <Label x={109} y={252} show={detail}>recognise</Label>
      <Label x={291} y={252} show={detail}>recall</Label>
    </g>
  ),
};

/* ---------------- Gulfs of execution and evaluation ---------------- */
const gulfs: IllustrationEntry = {
  slug: "gulfs-of-execution-and-evaluation",
  title: "Gulfs of execution and evaluation plate",
  description:
    "A person on the left and a system on the right, connected by an action cycle. The upper arc runs from the person's goal to the system through intention, action specification and execution; the lower arc returns through perception, interpretation and comparison. Each arc crosses a hatched gap — the gulf of execution above and the gulf of evaluation below.",
  Art: ({ detail }) => (
    <g>
      <HatchDefs id="gulfs-hatch" />
      <rect x={186} y={52} width={30} height={60} fill="url(#gulfs-hatch)" stroke={C.ink} strokeWidth={STROKE.fine} />
      <rect x={186} y={190} width={30} height={60} fill="url(#gulfs-hatch)" stroke={C.ink} strokeWidth={STROKE.fine} />
      <Node cx={62} cy={150} r={26} fill={C.base} width={STROKE.main} />
      <Box x={308} y={118} w={64} h={64} fill={C.surface} width={STROKE.main} />
      <Lines x={318} y={138} w={44} n={3} gap={12} />
      <CurveArrow d="M80 128 C 120 70, 270 60, 316 114" tip={[316, 114]} angle={0.85} width={STROKE.main} />
      <CurveArrow d="M318 186 C 270 244, 126 240, 82 174" tip={[82, 174]} angle={-2.2} width={STROKE.main} />
      {[
        [118, 92],
        [160, 76],
        [244, 76],
        [244, 226],
        [158, 226],
        [114, 210],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4.5} fill={C.paper} stroke={C.line} strokeWidth={STROKE.fine} />
      ))}
      <Label x={200} y={40} show={detail} tone="line">gulf of execution</Label>
      <Label x={200} y={272} show={detail} tone="line">gulf of evaluation</Label>
      <Label x={62} y={196} show={detail}>goal</Label>
      <Label x={340} y={200} show={detail}>system</Label>
      <Label x={214} y={128} show={detail} tone="mute" size={10}>intend · specify · act</Label>
      <Label x={214} y={182} show={detail} tone="mute" size={10}>perceive · interpret</Label>
    </g>
  ),
};

/* ---------------- Shneiderman's eight golden rules: a ring of eight ---------------- */
const shneidermanGoldenRules: IllustrationEntry = {
  slug: "shneiderman-golden-rules",
  title: "Shneiderman's eight golden rules plate",
  description:
    "Eight small discs arranged in a ring around a central number eight, each holding a glyph for one rule: matching squares for consistency, a widening wedge for universal usability, a speech mark for feedback, a closed bracket for dialogue closure, a guard for error prevention, an undo arrow for reversal, a hand-held lever for user control, and stacked cards for reducing memory load.",
  Art: ({ detail }) => {
    const n = 8;
    const R = 102;
    const cx = 200;
    const cy = 150;
    const s = { stroke: C.line, strokeWidth: STROKE.main, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    const names = ["consistency", "universal usability", "feedback", "closure", "prevent errors", "easy reversal", "user in control", "less memory load"];
    const glyph = (i: number, x: number, y: number) => {
      switch (i) {
        case 0:
          return <g>{[-9, 3].map((d) => <rect key={d} x={x + d} y={y - 4} width={7} height={7} fill={C.base} stroke={C.line} strokeWidth={STROKE.hair} />)}</g>;
        case 1:
          return <path d={`M${x - 10} ${y} L${x + 9} ${y - 8} V${y + 8} Z`} {...s} />;
        case 2:
          return <path d={`M${x - 9} ${y - 7} h18 v11 h-10 l-5 5 v-5 h-3 z`} {...s} />;
        case 3:
          return <g><path d={`M${x - 6} ${y - 8} h-4 v16 h4 M${x + 6} ${y - 8} h4 v16 h-4`} {...s} /><circle cx={x} cy={y} r={2.4} fill={C.line} /></g>;
        case 4:
          return <path d={`M${x} ${y - 10} l9 4 v5 c0 6 -4 9 -9 11 c-5 -2 -9 -5 -9 -11 v-5 z`} {...s} />;
        case 5:
          return <g><path d={`M${x + 8} ${y + 6} a9 9 0 1 0 -9 -11`} {...s} /><path d={`M${x - 4} ${y - 9} l-1 5 l5 1`} {...s} /></g>;
        case 6:
          return <g><line x1={x - 8} y1={y + 8} x2={x + 6} y2={y - 6} {...s} /><circle cx={x + 7} cy={y - 7} r={3.5} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} /><line x1={x - 10} y1={y + 9} x2={x + 2} y2={y + 9} {...s} /></g>;
        default:
          return <g>{[0, 4].map((d) => <rect key={d} x={x - 8 + d} y={y - 8 + d} width={12} height={12} rx={1.5} fill={d ? C.surface : C.soft} stroke={C.line} strokeWidth={STROKE.fine} />)}</g>;
      }
    };
    return (
      <g>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.mute} strokeWidth={STROKE.fine} strokeDasharray="2 5" />
        <circle cx={cx} cy={cy} r={30} fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
        <text x={cx} y={cy + 11} textAnchor="middle" fontSize="32" fill={C.paper} fontFamily="var(--font-newsreader), serif">
          8
        </text>
        {Array.from({ length: n }).map((_, i) => {
          const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
          const x = cx + Math.cos(a) * R;
          const y = cy + Math.sin(a) * R;
          const lx = cx + Math.cos(a) * (R + 36);
          const ly = cy + Math.sin(a) * (R + 30) + 4;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={20} fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
              {glyph(i, x, y)}
              <Label x={lx} y={ly} show={detail && (i === 0 || i === 4)} size={10}>
                {names[i]}
              </Label>
            </g>
          );
        })}
      </g>
    );
  },
};

const plates: IllustrationEntry[] = [
  steeringLaw,
  keystrokeLevelModel,
  dohertyThreshold,
  teslersLaw,
  serialPositionEffect,
  vonRestorffEffect,
  aestheticUsabilityEffect,
  choiceOverload,
  workingMemoryModel,
  recognitionOverRecall,
  gulfs,
  shneidermanGoldenRules,
];
export default plates;
