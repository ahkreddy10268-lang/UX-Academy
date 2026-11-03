/**
 * The first set of concept plates (the 15 flagship illustrations, minus Fitts).
 * Each draws the concept's *mechanism*, not a decorative metaphor.
 */
import type { IllustrationEntry } from "../illustration-types";
import { Arrow, Box, C, CurveArrow, Cursor, HatchDefs, Label, Lines, Node, STROKE, Window } from "../primitives";

/* ---------------- Hick-Hyman law: each doubling of choices adds one bit ---------------- */
export const hickHyman: IllustrationEntry = {
  slug: "hick-hyman-law",
  title: "Hick-Hyman law plate",
  description:
    "A binary decision tree grows from one stimulus on the left into 2, 4 and then 8 alternatives. Each level is labelled as one more bit of information, showing that decision time grows with the logarithm of the number of equally likely choices. One path through the tree is highlighted.",
  animated: true,
  explorer: "hick",
  Art: ({ detail, animate }) => {
    const cols = [70, 160, 250, 330];
    const ys = (n: number) => Array.from({ length: n }, (_, i) => 150 + (i - (n - 1) / 2) * (n === 8 ? 30 : n === 4 ? 56 : 90));
    const levels = [1, 2, 4, 8].map((n, li) => ys(n).map((y) => ({ x: cols[li], y })));
    const chosen = [0, 1, 2, 5];
    return (
      <g>
        {levels.slice(1).map((lvl, li) =>
          lvl.map((p, i) => {
            const parent = levels[li][Math.floor(i / 2)];
            const onPath = chosen[li] === Math.floor(i / 2) && chosen[li + 1] === i;
            return <line key={`${li}-${i}`} x1={parent.x} y1={parent.y} x2={p.x} y2={p.y} stroke={onPath ? C.ink : C.mute} strokeWidth={onPath ? STROKE.main : STROKE.fine} />;
          }),
        )}
        {levels.map((lvl, li) =>
          lvl.map((p, i) => (
            <Node
              key={`${li}-${i}`}
              cx={p.x}
              cy={p.y}
              r={li === 3 ? 7 : 9}
              fill={chosen[li] === i ? C.base : C.surface}
              className={animate && chosen[li] === i ? `anim-fade anim-delay-${li + 1}` : undefined}
            />
          )),
        )}
        {[1, 2, 3].map((b, i) => (
          <Label key={b} x={(cols[i] + cols[i + 1]) / 2} y={276} show={detail}>
            +1 bit
          </Label>
        ))}
        {[1, 2, 4, 8].map((n, i) => (
          <Label key={n} x={cols[i]} y={22} show={detail} tone="line">
            n = {n}
          </Label>
        ))}
      </g>
    );
  },
};

/* ---------------- Gestalt principles: four grouping cues ---------------- */
export const gestalt: IllustrationEntry = {
  slug: "gestalt-principles",
  title: "Gestalt principles plate",
  description:
    "Four small panels. Proximity: identical dots grouped into pairs by spacing. Similarity: a grid where alternate columns are filled, read as columns. Closure: three arcs that the eye completes into a circle. Common region: dots inside two outlined areas read as two groups.",
  explorer: "gestalt",
  Art: ({ detail }) => {
    const dot = (x: number, y: number, fill: string = C.line, key?: string) => <circle key={key ?? `${x}-${y}`} cx={x} cy={y} r={6} fill={fill} />;
    return (
      <g>
        <line x1="200" y1="24" x2="200" y2="276" stroke={C.mute} strokeWidth={STROKE.hair} strokeDasharray="2 4" />
        <line x1="24" y1="150" x2="376" y2="150" stroke={C.mute} strokeWidth={STROKE.hair} strokeDasharray="2 4" />
        {/* proximity */}
        {[0, 1, 2].map((r) => [48, 66, 112, 130, 164].slice(0, 4).map((x) => dot(x, 58 + r * 26, C.line, `p${r}${x}`)))}
        {/* similarity */}
        {[0, 1, 2].map((r) => [0, 1, 2, 3, 4].map((c) => dot(242 + c * 26, 58 + r * 26, c % 2 ? C.base : C.line, `s${r}${c}`)))}
        {/* closure */}
        <g fill="none" stroke={C.line} strokeWidth={STROKE.main * 1.6} strokeLinecap="round">
          <path d="M 64 196 A 44 44 0 0 1 128 190" />
          <path d="M 142 222 A 44 44 0 0 1 112 258" />
          <path d="M 70 256 A 44 44 0 0 1 56 210" />
        </g>
        {/* common region */}
        <rect x="226" y="186" width="58" height="66" rx="8" fill={C.soft} stroke={C.ink} strokeWidth={STROKE.fine} />
        <rect x="296" y="186" width="58" height="66" rx="8" fill={C.soft} stroke={C.ink} strokeWidth={STROKE.fine} />
        {[240, 268, 310, 338].flatMap((x) => [204, 234].map((y) => dot(x, y, C.line, `r${x}${y}`)))}
        <Label x={36} y={38} anchor="start" show={detail}>proximity</Label>
        <Label x={232} y={38} anchor="start" show={detail}>similarity</Label>
        <Label x={36} y={174} anchor="start" show={detail}>closure</Label>
        <Label x={232} y={174} anchor="start" show={detail}>common region</Label>
      </g>
    );
  },
};

/* ---------------- Cognitive load theory: a vessel with limited capacity ---------------- */
export const cognitiveLoad: IllustrationEntry = {
  slug: "cognitive-load-theory",
  title: "Cognitive load theory plate",
  description:
    "Two working-memory vessels with the same capacity line. In the left vessel, intrinsic load (solid) plus a large extraneous load (hatched) overflows the capacity line, leaving no room for learning. In the right vessel, extraneous load has been reduced, so intrinsic load and germane processing (outlined) fit beneath the line.",
  explorer: "cognitive-load",
  Art: ({ detail }) => {
    const vessel = (x: number, segs: { h: number; kind: "intrinsic" | "extraneous" | "germane" }[]) => {
      let y = 250;
      return (
        <g>
          {segs.map((s, i) => {
            y -= s.h;
            const fill = s.kind === "intrinsic" ? C.base : s.kind === "extraneous" ? "url(#cl-hatch)" : C.surface;
            return <rect key={i} x={x + 6} y={y} width={88} height={s.h} fill={fill} stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray={s.kind === "germane" ? "4 3" : undefined} />;
          })}
          <path d={`M${x} 70 V250 H${x + 100} V70`} fill="none" stroke={C.line} strokeWidth={STROKE.main} />
        </g>
      );
    };
    return (
      <g>
        <HatchDefs id="cl-hatch" />
        <line x1="40" y1="100" x2="360" y2="100" stroke={C.ink} strokeWidth={STROKE.fine} strokeDasharray="6 4" />
        {vessel(70, [{ h: 70, kind: "intrinsic" }, { h: 110, kind: "extraneous" }, { h: 22, kind: "germane" }])}
        {vessel(230, [{ h: 70, kind: "intrinsic" }, { h: 26, kind: "extraneous" }, { h: 52, kind: "germane" }])}
        <Arrow x1={182} y1={175} x2={218} y2={175} />
        <Label x={360} y={94} anchor="end" show={detail}>capacity</Label>
        <Label x={120} y={272} show={detail}>overloaded</Label>
        <Label x={280} y={272} show={detail}>redesigned</Label>
        <Label x={50} y={40} anchor="start" show={detail} tone="mute">■ intrinsic  ▨ extraneous  ┅ germane</Label>
      </g>
    );
  },
};

/* ---------------- Miller's law: chunking ---------------- */
export const millers: IllustrationEntry = {
  slug: "millers-law",
  title: "Miller's law plate",
  description:
    "Top: nine separate digits in a long row, each a separate item to hold in memory. Bottom: the same nine digits grouped into three chunks, which is far easier to remember. A note reads that modern estimates put working-memory capacity near four chunks.",
  explorer: "chunking",
  Art: ({ detail, animate }) => {
    const digits = "415926535".split("");
    return (
      <g fontFamily="var(--font-plex-mono), monospace">
        {digits.map((d, i) => (
          <g key={i}>
            <rect x={34 + i * 37} y={62} width={30} height={40} rx={3} fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
            <text x={49 + i * 37} y={89} textAnchor="middle" fontSize="18" fill={C.line}>
              {d}
            </text>
          </g>
        ))}
        <Arrow x1={200} y1={116} x2={200} y2={150} />
        {[0, 1, 2].map((g) => (
          <g key={g} className={animate ? `anim-drift anim-delay-${g + 1}` : undefined}>
            <rect x={42 + g * 112} y={168} width={92} height={56} rx={6} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} />
            <text x={88 + g * 112} y={204} textAnchor="middle" fontSize="20" fill={C.paper} letterSpacing="3">
              {digits.slice(g * 3, g * 3 + 3).join("")}
            </text>
          </g>
        ))}
        <Label x={200} y={44} show={detail}>9 items</Label>
        <Label x={200} y={250} show={detail}>3 chunks · capacity ≈ 4 chunks (Cowan 2001)</Label>
      </g>
    );
  },
};

/* ---------------- Jakob's law: transferred expectations ---------------- */
export const jakobs: IllustrationEntry = {
  slug: "jakobs-law",
  title: "Jakob's law plate",
  description:
    "Three faded windows on the left represent the other sites people already use; they share a layout with the logo at top left, navigation top right and a search field. On the right, your site uses the same layout. Dashed lines connect matching positions, showing users carry expectations across products.",
  Art: ({ detail }) => {
    const skeleton = (x: number, y: number, w: number, strong: boolean) => (
      <g opacity={strong ? 1 : 0.55}>
        <Window x={x} y={y} w={w} h={w * 0.78} />
        <rect x={x + 8} y={y + 22} width={w * 0.22} height={8} fill={strong ? C.base : C.soft} />
        <Lines x={x + w * 0.55} y={y + 26} w={w * 0.36} n={1} />
        <rect x={x + 8} y={y + 40} width={w - 16} height={10} rx={2} fill="none" stroke={C.line} strokeWidth={STROKE.hair} />
        <Lines x={x + 8} y={y + 62} w={w - 16} n={3} gap={9} />
      </g>
    );
    return (
      <g>
        {skeleton(30, 64, 110, false)}
        {skeleton(44, 82, 110, false)}
        {skeleton(58, 100, 110, false)}
        {skeleton(226, 70, 150, true)}
        <g stroke={C.ink} strokeWidth={STROKE.fine} strokeDasharray="3 4" fill="none">
          <path d="M90 126 C 160 110, 190 100, 240 96" />
          <path d="M150 128 C 200 120, 260 104, 320 100" />
          <path d="M120 146 C 180 150, 210 124, 240 116" />
        </g>
        <Label x={98} y={240} show={detail}>sites people already know</Label>
        <Label x={300} y={210} show={detail}>your site</Label>
      </g>
    );
  },
};

/* ---------------- Mental models ---------------- */
export const mentalModels: IllustrationEntry = {
  slug: "mental-models",
  title: "Mental models plate",
  description:
    "On the left, the user's mental model: a simple chain of three nodes. On the right, the system's actual structure: a denser network. Between them sits the interface, the system image, through which the user builds and tests their model. A gap is marked where the two models disagree.",
  Art: ({ detail }) => {
    const sys = [
      [300, 80], [352, 110], [282, 140], [340, 170], [300, 210], [356, 230], [262, 196],
    ];
    const links = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 6], [3, 4], [4, 5], [3, 5], [6, 4]];
    return (
      <g>
        {/* user's model */}
        <rect x="26" y="60" width="118" height="180" rx="59" fill={C.soft} opacity="0.55" />
        <Node cx={85} cy={95} r={11} />
        <Node cx={85} cy={150} r={11} />
        <Node cx={85} cy={205} r={11} />
        <Arrow x1={85} y1={107} x2={85} y2={137} />
        <Arrow x1={85} y1={162} x2={85} y2={192} />
        {/* system image */}
        <rect x="168" y="80" width="52" height="140" rx="4" fill={C.surface} stroke={C.line} strokeWidth={STROKE.main} />
        <Lines x={176} y={100} w={36} n={6} gap={18} />
        {/* system */}
        {links.map(([a, b], i) => (
          <line key={i} x1={sys[a][0]} y1={sys[a][1]} x2={sys[b][0]} y2={sys[b][1]} stroke={C.line} strokeWidth={STROKE.fine} />
        ))}
        {sys.map(([x, y], i) => (
          <Node key={i} cx={x} cy={y} r={8} fill={i === 6 ? C.paper : C.base} strokeDasharray={i === 6 ? "3 2" : undefined} />
        ))}
        <Arrow x1={148} y1={150} x2={166} y2={150} dashed />
        <Arrow x1={240} y1={150} x2={222} y2={150} dashed />
        <Label x={85} y={262} show={detail}>user&apos;s model</Label>
        <Label x={194} y={242} show={detail}>interface</Label>
        <Label x={312} y={262} show={detail}>system</Label>
        <Label x={248} y={214} anchor="end" show={detail} tone="mute">gap</Label>
      </g>
    );
  },
};

/* ---------------- Affordances: action possibilities ---------------- */
export const affordances: IllustrationEntry = {
  slug: "affordances",
  title: "Affordances plate",
  description:
    "Three physical-looking controls, each with the action it makes possible drawn as a dotted motion: a knob with a curved rotate arrow, a slider with a sideways slide arrow, and a raised button with a downward press arrow. Affordances are relations between an object's properties and what an agent can do with it.",
  Art: ({ detail, animate }) => (
    <g>
      {/* knob */}
      <circle cx="80" cy="150" r="40" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <line x1="80" y1="150" x2="80" y2="118" stroke={C.paper} strokeWidth="4" strokeLinecap="round" />
      <CurveArrow d="M 44 98 A 62 62 0 0 1 128 106" tip={[128, 106]} angle={0.75} dashed />
      {/* slider */}
      <rect x="160" y="146" width="96" height="8" rx="4" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
      <rect x="186" y="132" width="20" height="36" rx="3" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} className={animate ? "anim-sway" : undefined} />
      <Arrow x1={170} y1={112} x2={248} y2={112} dashed />
      {/* push button */}
      <rect x="292" y="168" width="70" height="16" rx="2" fill={C.soft} stroke={C.line} strokeWidth={STROKE.fine} />
      <rect x="300" y="138" width="54" height="30" rx="4" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <Arrow x1={327} y1={88} x2={327} y2={128} dashed />
      <Label x={80} y={228} show={detail}>turn</Label>
      <Label x={208} y={228} show={detail}>slide</Label>
      <Label x={327} y={228} show={detail}>press</Label>
      <Label x={200} y={268} show={detail} tone="mute">what the object makes possible for this agent</Label>
    </g>
  ),
};

/* ---------------- Signifiers: perceivable cues ---------------- */
export const signifiers: IllustrationEntry = {
  slug: "signifiers",
  title: "Signifiers plate",
  description:
    "Two versions of the same flat rectangle. The left one has no cues, so it is unclear whether it can be clicked; a question mark sits beside it. The right one adds signifiers: a label, an underline, a chevron, a raised edge and a pointer cursor, each pointing to how the element should be used.",
  explorer: "signifiers",
  Art: ({ detail }) => (
    <g>
      <rect x="40" y="120" width="120" height="44" rx="2" fill={C.soft} />
      <text x="100" y="98" textAnchor="middle" fontSize="34" fill={C.mute} fontFamily="var(--font-newsreader), serif">
        ?
      </text>
      <rect x="236" y="124" width="124" height="44" rx="4" fill={C.ink} opacity="0.25" />
      <rect x="232" y="118" width="124" height="44" rx="4" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
      <Lines x={246} y={140} w={64} n={1} color={C.paper} last={1} />
      <path d="M328 133 l8 7 -8 7" fill="none" stroke={C.paper} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="246" y1="176" x2="310" y2="176" stroke={C.ink} strokeWidth={STROKE.main} />
      <Cursor x={330} y={150} />
      <Arrow x1={200} y1={141} x2={222} y2={141} />
      <Label x={100} y={196} show={detail}>no cue</Label>
      <Label x={294} y={210} show={detail}>cues show how to use it</Label>
    </g>
  ),
};

/* ---------------- Peak-end rule ---------------- */
export const peakEnd: IllustrationEntry = {
  slug: "peak-end-rule",
  title: "Peak-end rule plate",
  description:
    "A line chart of moment-to-moment experience over time. The most intense moment (the peak) and the final moment (the end) are marked. A dashed horizontal line at their average shows the remembered rating, which differs from the shaded area that represents the total experience.",
  animated: true,
  explorer: "peak-end",
  Art: ({ detail, animate }) => {
    const pts = [[40, 190], [80, 170], [120, 178], [160, 120], [190, 70], [220, 140], [260, 160], [300, 150], [340, 110], [360, 112]];
    const d = "M" + pts.map((p) => p.join(" ")).join(" L");
    const peak = pts[4];
    const end = pts[9];
    const remembered = (peak[1] + end[1]) / 2;
    return (
      <g>
        <path d={`${d} L360 240 L40 240 Z`} fill={C.soft} opacity="0.5" />
        <line x1="40" y1="240" x2="366" y2="240" stroke={C.line} strokeWidth={STROKE.fine} />
        <line x1="40" y1="40" x2="40" y2="240" stroke={C.line} strokeWidth={STROKE.fine} />
        <path d={d} fill="none" stroke={C.line} strokeWidth={STROKE.main} strokeLinejoin="round" className={animate ? "anim-draw" : undefined} style={animate ? ({ "--len": 480 } as React.CSSProperties) : undefined} />
        <line x1="40" y1={remembered} x2="366" y2={remembered} stroke={C.ink} strokeWidth={STROKE.fine} strokeDasharray="6 4" />
        <circle cx={peak[0]} cy={peak[1]} r="9" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
        <circle cx={end[0]} cy={end[1]} r="9" fill={C.base} stroke={C.line} strokeWidth={STROKE.main} />
        <Label x={peak[0]} y={peak[1] - 16} show={detail} tone="line">peak</Label>
        <Label x={end[0]} y={end[1] + 26} show={detail} tone="line">end</Label>
        <Label x={362} y={remembered - 8} anchor="end" show={detail}>remembered ≈ (peak + end) / 2</Label>
        <Label x={360} y={262} anchor="end" show={detail} tone="mute">time →</Label>
      </g>
    );
  },
};

/* ---------------- Double Diamond ---------------- */
export const doubleDiamond: IllustrationEntry = {
  slug: "double-diamond",
  title: "Double Diamond plate",
  description:
    "Two diamonds side by side. Each widens to explore many options, drawn as scattered dots, then narrows to a single point. The first diamond covers Discover and Define the problem; the second covers Develop and Deliver the solution. A dashed arrow loops back, indicating iteration.",
  Art: ({ detail, animate }) => {
    const dots = (cx: number) =>
      [[-40, -18], [-30, 20], [-12, -34], [-4, 6], [14, -14], [22, 30], [36, -4], [-22, -2]].map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx} cy={150 + dy} r={4.5} fill={C.base} className={animate ? `anim-fade anim-delay-${(i % 4) + 1}` : undefined} />
      ));
    return (
      <g>
        <path d="M30 150 L110 70 L190 150 L110 230 Z" fill={C.soft} stroke={C.line} strokeWidth={STROKE.main} />
        <path d="M210 150 L290 70 L370 150 L290 230 Z" fill={C.soft} stroke={C.line} strokeWidth={STROKE.main} />
        <line x1="110" y1="70" x2="110" y2="230" stroke={C.line} strokeWidth={STROKE.hair} strokeDasharray="3 4" />
        <line x1="290" y1="70" x2="290" y2="230" stroke={C.line} strokeWidth={STROKE.hair} strokeDasharray="3 4" />
        {dots(110)}
        {dots(290)}
        <circle cx="200" cy="150" r="7" fill={C.paper} stroke={C.line} strokeWidth={STROKE.main} />
        <CurveArrow d="M 290 244 C 250 290, 150 290, 112 246" tip={[112, 246]} angle={-2.1} dashed />
        <Label x={70} y={52} show={detail}>discover</Label>
        <Label x={150} y={52} show={detail}>define</Label>
        <Label x={250} y={52} show={detail}>develop</Label>
        <Label x={330} y={52} show={detail}>deliver</Label>
      </g>
    );
  },
};

/* ---------------- Design thinking (planned topic): a non-linear loop ---------------- */
export const designThinking: IllustrationEntry = {
  slug: "design-thinking",
  title: "Design thinking plate",
  description:
    "Five stages placed around a loop: empathise, define, ideate, prototype and test. Arrows run forward around the loop, and dashed arrows jump backwards from test to earlier stages, showing the process is iterative rather than linear.",
  Art: ({ detail }) => {
    const names = ["empathise", "define", "ideate", "prototype", "test"];
    const pts = names.map((_, i) => {
      const a = -Math.PI / 2 + (i / 5) * Math.PI * 2;
      return [200 + Math.cos(a) * 100, 150 + Math.sin(a) * 100];
    });
    return (
      <g>
        <circle cx="200" cy="150" r="100" fill="none" stroke={C.mute} strokeWidth={STROKE.fine} />
        {pts.map(([x, y], i) => (
          <g key={i}>
            <Node cx={x} cy={y} r={18} fill={i === 4 ? C.base : C.surface} width={STROKE.main} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill={C.line} fontFamily="var(--font-plex-mono), monospace">
              {i + 1}
            </text>
            <Label x={x} y={y + (y > 150 ? 36 : -26)} show={detail}>{names[i]}</Label>
          </g>
        ))}
        <Arrow x1={pts[4][0] + 10} y1={pts[4][1] - 14} x2={pts[1][0] - 16} y2={pts[1][1] + 8} dashed color={C.ink} />
        <Arrow x1={pts[4][0] + 16} y1={pts[4][1] - 4} x2={pts[2][0] - 18} y2={pts[2][1]} dashed color={C.ink} />
      </g>
    );
  },
};

/* ---------------- Nielsen's ten usability heuristics ---------------- */
export const nielsenHeuristics: IllustrationEntry = {
  slug: "nielsen-usability-heuristics",
  title: "Nielsen's usability heuristics plate",
  description:
    "A grid of ten numbered tiles, one glyph per heuristic: a progress bar for system status, a folder for real-world match, an undo arrow for user control, matching shapes for consistency, a guard rail for error prevention, a visible menu for recognition, a lightning shortcut for flexibility, a single line for minimalist design, an exclamation mark for error recovery, and a question mark for help.",
  Art: ({ detail }) => {
    const glyph = (i: number, x: number, y: number) => {
      const s = { stroke: C.line, strokeWidth: STROKE.main, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
      switch (i) {
        case 0: return <g><rect x={x - 18} y={y - 4} width={36} height={8} rx={4} {...s} /><rect x={x - 18} y={y - 4} width={22} height={8} rx={4} fill={C.base} /></g>;
        case 1: return <path d={`M${x - 16} ${y - 10} h12 l4 5 h16 v17 h-32 z`} {...s} />;
        case 2: return <g><path d={`M${x + 12} ${y + 8} a12 12 0 1 0 -12 -12`} {...s} /><path d={`M${x - 6} ${y - 10} l6 6 6 -6`} {...s} transform={`rotate(-90 ${x} ${y - 4})`} /></g>;
        case 3: return <g>{[-12, 0, 12].map((d) => <rect key={d} x={x + d - 4} y={y - 4} width={8} height={8} fill={C.base} />)}</g>;
        case 4: return <g><line x1={x - 16} y1={y + 8} x2={x + 16} y2={y + 8} {...s} /><line x1={x - 12} y1={y + 8} x2={x - 12} y2={y - 8} {...s} /><line x1={x + 12} y1={y + 8} x2={x + 12} y2={y - 8} {...s} /><line x1={x - 16} y1={y - 4} x2={x + 16} y2={y - 4} {...s} /></g>;
        case 5: return <g><rect x={x - 14} y={y - 12} width={28} height={24} rx={2} {...s} />{[-5, 1, 7].map((d) => <line key={d} x1={x - 8} y1={y + d} x2={x + 8} y2={y + d} {...s} strokeWidth={1.6} />)}</g>;
        case 6: return <path d={`M${x + 3} ${y - 13} l-11 15 h9 l-4 11 11 -15 h-9 z`} fill={C.base} stroke={C.line} strokeWidth={STROKE.fine} strokeLinejoin="round" />;
        case 7: return <line x1={x - 14} y1={y} x2={x + 14} y2={y} {...s} />;
        case 8: return <g><circle cx={x} cy={y} r={13} {...s} /><line x1={x} y1={y - 6} x2={x} y2={y + 2} {...s} /><circle cx={x} cy={y + 7} r={1.6} fill={C.line} /></g>;
        default: return <g><circle cx={x} cy={y} r={13} {...s} /><path d={`M${x - 4} ${y - 4} a4 4 0 1 1 5 4 v3`} {...s} /><circle cx={x + 1} cy={y + 8} r={1.6} fill={C.line} /></g>;
      }
    };
    return (
      <g>
        {Array.from({ length: 10 }).map((_, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const x = 40 + col * 66;
          const y = 58 + row * 104;
          return (
            <g key={i}>
              <rect x={x} y={y} width={56} height={84} rx={3} fill={i === 0 ? C.soft : C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
              <text x={x + 6} y={y + 14} fontSize="10" fill={C.ink} fontFamily="var(--font-plex-mono), monospace">
                {String(i + 1).padStart(2, "0")}
              </text>
              {glyph(i, x + 28, y + 48)}
            </g>
          );
        })}
        <Label x={200} y={278} show={detail} tone="mute">ten broad rules of thumb for evaluating an interface</Label>
      </g>
    );
  },
};

/* ---------------- Information architecture (domain): hierarchy & wayfinding ---------------- */
export const informationArchitecture: IllustrationEntry = {
  slug: "ia",
  title: "Information architecture plate",
  description:
    "A site hierarchy drawn as a tree: one home node at the top, three sections, and leaf pages beneath. One route from home to a leaf page is highlighted, and the highlighted leaf is marked as the current location, like a breadcrumb trail.",
  Art: ({ detail }) => {
    const root = [200, 60];
    const mids = [[90, 140], [200, 140], [310, 140]];
    const leaves = [[50, 220], [90, 220], [130, 220], [170, 220], [230, 220], [280, 220], [320, 220], [360, 220]];
    const parent = [0, 0, 0, 1, 1, 2, 2, 2];
    return (
      <g>
        {mids.map(([x, y], i) => <line key={i} x1={root[0]} y1={root[1]} x2={x} y2={y} stroke={i === 1 ? C.ink : C.line} strokeWidth={i === 1 ? STROKE.main * 1.3 : STROKE.fine} />)}
        {leaves.map(([x, y], i) => <line key={i} x1={mids[parent[i]][0]} y1={mids[parent[i]][1]} x2={x} y2={y} stroke={i === 4 ? C.ink : C.line} strokeWidth={i === 4 ? STROKE.main * 1.3 : STROKE.fine} />)}
        <Box x={root[0] - 22} y={root[1] - 14} w={44} h={28} fill={C.base} />
        {mids.map(([x, y], i) => <Box key={i} x={x - 18} y={y - 12} w={36} h={24} fill={i === 1 ? C.base : C.surface} />)}
        {leaves.map(([x, y], i) => <Box key={i} x={x - 12} y={y - 10} w={24} h={20} fill={i === 4 ? C.base : C.surface} />)}
        <circle cx="230" cy="250" r="5" fill={C.ink} />
        <Label x={230} y={272} show={detail}>you are here</Label>
        <Label x={200} y={30} show={detail} tone="mute">home › section › page</Label>
      </g>
    );
  },
};

/* ---------------- Atomic design (planned topic) ---------------- */
export const atomicDesign: IllustrationEntry = {
  slug: "atomic-design",
  title: "Atomic design plate",
  description:
    "Five stages from left to right, joined by arrows: an atom (a single circle), a molecule (three joined circles), an organism (a group of molecules in a panel), a template (a wireframe page layout) and a page (the template filled with content).",
  Art: ({ detail }) => {
    const ys = 150;
    return (
      <g>
        <Node cx={36} cy={ys} r={10} />
        <Arrow x1={52} y1={ys} x2={68} y2={ys} />
        <g>
          <line x1="80" y1={ys} x2="106" y2={ys - 14} stroke={C.line} strokeWidth={STROKE.fine} />
          <line x1="80" y1={ys} x2="106" y2={ys + 14} stroke={C.line} strokeWidth={STROKE.fine} />
          <Node cx={80} cy={ys} r={8} />
          <Node cx={106} cy={ys - 14} r={7} fill={C.soft} />
          <Node cx={106} cy={ys + 14} r={7} fill={C.soft} />
        </g>
        <Arrow x1={120} y1={ys} x2={136} y2={ys} />
        <rect x="142" y={ys - 34} width="62" height="68" rx="3" fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
        {[0, 1].map((r) => (
          <g key={r}>
            <Node cx={156} cy={ys - 16 + r * 32} r={6} />
            <rect x="168" y={ys - 21 + r * 32} width="28" height="10" fill={C.soft} />
          </g>
        ))}
        <Arrow x1={210} y1={ys} x2={226} y2={ys} />
        <rect x="232" y={ys - 44} width="66" height="88" rx="3" fill="none" stroke={C.line} strokeWidth={STROKE.fine} strokeDasharray="4 3" />
        <rect x="238" y={ys - 38} width="54" height="12" fill="none" stroke={C.line} strokeWidth={STROKE.hair} />
        <rect x="238" y={ys - 20} width="26" height="46" fill="none" stroke={C.line} strokeWidth={STROKE.hair} />
        <rect x="268" y={ys - 20} width="24" height="46" fill="none" stroke={C.line} strokeWidth={STROKE.hair} />
        <Arrow x1={304} y1={ys} x2={320} y2={ys} />
        <rect x="326" y={ys - 44} width="66" height="88" rx="3" fill={C.surface} stroke={C.line} strokeWidth={STROKE.fine} />
        <rect x="332" y={ys - 38} width="54" height="12" fill={C.base} />
        <rect x="332" y={ys - 20} width="26" height="46" fill={C.soft} />
        <Lines x={362} y={ys - 14} w={22} n={5} gap={8} />
        {["atom", "molecule", "organism", "template", "page"].map((t, i) => (
          <Label key={t} x={[36, 94, 173, 265, 359][i]} y={ys + 70} show={detail}>{t}</Label>
        ))}
      </g>
    );
  },
};

export const corePlates = [hickHyman, gestalt, cognitiveLoad, millers, jakobs, mentalModels, affordances, signifiers, peakEnd, doubleDiamond, designThinking, nielsenHeuristics, informationArchitecture, atomicDesign];

