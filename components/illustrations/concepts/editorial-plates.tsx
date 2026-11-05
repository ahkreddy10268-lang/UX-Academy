/**
 * Concept plates in the editorial technical style (illustration v5.1 pilot):
 * Human-Computer Interaction, Cognitive Load Theory, Fitts's law, Mental Models
 * and Usability Testing. Drawn with the shared kit on the standard 400 × 300
 * plate; labels appear only in the hero variant (`detail`). Each drawing is
 * checked against its entry (see the comment on each plate).
 */
import { Bars, Bubble, Check, Figure, Flow, IsoBox, IsoShadow, Laptop, Pill, Plant, V, Win, iso, plane, type Pt } from "../system/kit";
import type { IllustrationEntry } from "../illustration-types";
import { Cursor, Label } from "../primitives";

const at = (o: Pt, x: number, y: number, z = 0) => iso(o, x, y, z);

/* ---------------------------------------------------------------- */
/* Human-Computer Interaction — an ecosystem, not a line            */
/* ---------------------------------------------------------------- */
const hciPlate: IllustrationEntry = {
  slug: "human-computer-interaction",
  title: "Human-computer interaction plate",
  description:
    "At the centre, a person uses a screen on a raised platform: the interaction. Around it, four smaller platforms hold the person's abilities (a head with a lightbulb-like focus), the task (a checklist card), the technology (a device and input) and the context (a clock and a building). Dashed links join every element to the centre and to its neighbours, forming a ring rather than a line, and a small chart beside the centre stands for evaluation feeding back into design.",
  explorer: "hci-methods",
  Art: ({ detail }) => {
    const o: Pt = [200, 96];
    const sat = (x: number, y: number) => at(o, x + 14, y + 14, 6);
    const centre = at(o, 30, 30, 12);
    const S = { human: sat(-62, 10), task: sat(10, -62), tech: sat(82, 10), ctx: sat(10, 82) };
    const ring = [S.human, S.task, S.tech, S.ctx, S.human];
    return (
      <g transform="translate(-74 -36) scale(1.37)">
        {/* ring of mutual influence */}
        <path d={`M${ring.map((p) => p.join(" ")).join(" L")}`} fill="none" className="m" strokeDasharray="3 3" />
        {Object.values(S).map((p, i) => (
          <line key={i} x1={p[0]} y1={p[1]} x2={centre[0]} y2={centre[1]} className="m" strokeDasharray="2 2.5" />
        ))}
        {/* satellites */}
        {(
          [
            [-62, 10, "cat"],
            [10, -62, "cat"],
            [82, 10, "cat"],
            [10, 82, "cat"],
          ] as const
        ).map(([x, y, t], i) => (
          <g key={i}>
            <IsoShadow o={o} x={x} y={y} w={28} d={28} spread={2} />
            <IsoBox o={o} x={x} y={y} z={0} w={28} d={28} h={6} tone={t} />
          </g>
        ))}
        {/* person (abilities) */}
        <g transform={`translate(${S.human[0]} ${S.human[1] - 6})`}>
          <circle cx={0} cy={-14} r={9} fill="var(--ill-skin-2)" className="e" />
          <path d="M-9 -16 C -9 -26, 9 -26, 9 -15 C 4 -19, -4 -19, -9 -16 Z" fill="var(--ill-hair-1)" className="e" />
          <path d="M-14 6 C -14 -4, 14 -4, 14 6 Z" fill={V.focalL} className="e" />
        </g>
        {/* task */}
        <g transform={plane.left(o, 13, -48, 30)}>
          <Win w={22} h={24} bar={false}>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={3} y={4 + i * 6.5} width={3.6} height={3.6} rx={0.6} fill={i < 2 ? V.focal : V.hi} className="h" />
                <rect x={9} y={5 + i * 6.5} width={10 - i * 2} height={1.6} rx={0.8} fill={V.mid} />
              </g>
            ))}
          </Win>
        </g>
        {/* technology */}
        <IsoBox o={o} x={88} y={16} z={6} w={16} d={12} h={1.4} tone="neutral" />
        <IsoBox o={o} x={88} y={14.6} z={7.4} w={16} d={1.4} h={12} tone="neutral" />
        <g transform={plane.left(o, 89, 16, 18.4)}>
          <rect width={14} height={10} rx={0.8} fill={V.hi} className="m" />
          <rect x={2} y={6} width={7} height={2.4} rx={1.2} fill={V.focal} />
        </g>
        {/* context */}
        <IsoBox o={o} x={18} y={88} z={6} w={12} d={12} h={20} tone="neutral" />
        {[10, 16, 22].map((z) => (
          <g key={z} transform={plane.left(o, 20, 100, z + 6)}>
            <rect width={3} height={3} fill={V.top} className="h" />
            <rect x={5} width={3} height={3} fill={V.top} className="h" />
          </g>
        ))}
        <g transform={`translate(${S.ctx[0] + 26} ${S.ctx[1] - 18})`}>
          <circle r={7} fill={V.hi} className="e" />
          <path d="M0 0 v-4.4 M0 0 l3.2 2" className="e" fill="none" />
        </g>
        {/* the interaction at the centre */}
        <IsoShadow o={o} x={0} y={0} w={60} d={60} spread={5} />
        <IsoBox o={o} x={0} y={0} z={0} w={60} d={60} h={12} tone="focal" />
        <IsoBox o={o} x={22} y={14} z={12} w={22} d={3} h={30} tone="neutral" />
        <g transform={plane.left(o, 24, 17, 40)}>
          <rect width={18} height={26} rx={1} fill={V.hi} className="m" />
          <Bars x={3} y={4} w={10} n={2} gap={3.4} />
          <Pill x={3} y={17} w={12} h={4} />
        </g>
        {(() => {
          const [x, y] = at(o, 34, 40, 12);
          return <Figure x={x} y={y} s={0.95} pose="reach" flip skin={3} hair="curly" hairTone={1} top={V.right} />;
        })()}
        {/* evaluation feeding back */}
        <g transform={`translate(${centre[0] - 112} ${centre[1] + 40})`}>
          <rect width={36} height={26} rx={3} fill={V.hi} className="e" />
          {[8, 13, 10, 18].map((h, i) => (
            <rect key={i} x={5 + i * 7.4} y={22 - h} width={4.4} height={h} rx={0.8} fill={i === 3 ? V.focal : V.right} className="h" />
          ))}
        </g>
        <Flow d={`M${centre[0] - 76} ${centre[1] + 50} C ${centre[0] - 56} ${centre[1] + 50}, ${centre[0] - 40} ${centre[1] + 40}, ${centre[0] - 30} ${centre[1] + 30}`} tip={[centre[0] - 30, centre[1] + 30]} angle={-0.8} />
        <Label x={S.human[0] - 4} y={S.human[1] + 30} size={7.5} show={detail}>person</Label>
        <Label x={S.task[0] + 34} y={S.task[1] - 22} size={7.5} show={detail}>task</Label>
        <Label x={S.tech[0] + 26} y={S.tech[1] - 22} size={7.5} show={detail}>technology</Label>
        <Label x={S.ctx[0] + 38} y={S.ctx[1] + 14} size={7.5} show={detail}>context</Label>
        <Label x={centre[0] + 10} y={centre[1] + 62} size={7.5} show={detail} tone="ink">interaction</Label>
        <Label x={centre[0] - 94} y={centre[1] + 76} size={7.5} show={detail} tone="mute">evaluation</Label>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Cognitive Load Theory — intrinsic and extraneous load, schemas    */
/* (checked against the entry: intrinsic = element interactivity;    */
/*  extraneous = presentation; working memory limited for novel       */
/*  information; schemas in long-term memory reduce the load)         */
/* ---------------------------------------------------------------- */
const cltPlate: IllustrationEntry = {
  slug: "cognitive-load-theory",
  title: "Cognitive load theory plate",
  description:
    "On the left a page presents information: a cluster of linked elements (the material itself, intrinsic load) mixed with decorative clutter and a legend placed far from its chart (extraneous load). The elements travel toward a narrow aperture in the middle, working memory, where only a few fit at once and the clutter competes for the same space. On the right, long-term memory holds a schema that bundles several elements into one; an arrow returns from it to the aperture, because known schemas let an expert treat many elements as one.",
  explorer: "cognitive-load",
  Art: ({ detail }) => {
    const nodes: [number, number][] = [
      [52, 106],
      [78, 96],
      [70, 126],
      [96, 116],
      [88, 142],
    ];
    return (
      <g>
        {/* the presented page */}
        <rect x={24} y={58} width={112} height={160} rx={6} fill={V.hi} className="e" />
        <rect x={24} y={58} width={112} height={12} rx={6} fill={V.top} className="h" />
        {/* intrinsic: linked elements */}
        {[[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [2, 4]].map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={V.deep} strokeWidth={1.2} />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5.5} fill={V.focal} className="e" />
        ))}
        {/* extraneous: clutter and a split legend */}
        <rect x={104} y={80} width={22} height={14} rx={2} fill="none" className="m" strokeDasharray="2 2" />
        <path d="M110 160 l6 -10 l6 10 Z M34 168 h18 M34 174 h12" fill="none" className="m" />
        <rect x={34} y={186} width={30} height={20} rx={2} fill={V.top} className="h" />
        <rect x={98} y={190} width={28} height={16} rx={2} fill="none" className="m" strokeDasharray="2 2" />
        <path d="M64 196 C 76 206, 88 206, 98 198" fill="none" className="h" strokeDasharray="1.5 2" />
        {/* the aperture: limited working memory */}
        <path d="M174 70 C 210 112, 210 150, 174 206" fill="none" className="e" strokeWidth={2} />
        <path d="M238 70 C 202 112, 202 150, 238 206" fill="none" className="e" strokeWidth={2} />
        {[124, 140, 156].map((y, i) => (
          <circle key={y} cx={206} cy={y} r={5.5} fill={i < 2 ? V.focal : V.hi} className="e" />
        ))}
        <rect x={198} y={104} width={16} height={10} rx={2} fill="none" className="m" strokeDasharray="2 2" />
        <Flow d="M136 120 C 156 118, 172 124, 196 126" tip={[196, 126]} angle={0.05} />
        <Flow d="M136 196 C 160 190, 178 170, 196 160" tip={[196, 160]} angle={-0.5} />
        {/* long-term memory and a schema */}
        <rect x={264} y={86} width={112} height={118} rx={8} fill={V.top} className="e" />
        <g transform="translate(292 108)">
          <rect x={-10} y={-10} width={70} height={56} rx={14} fill={V.focalL} opacity={0.3} />
          {[[0, 12], [24, 0], [18, 26], [42, 18], [36, 40]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={4.5} fill={V.focal} className="e" />
          ))}
          <path d="M0 12 L24 0 L42 18 L36 40 L18 26 Z" fill="none" stroke={V.deep} strokeWidth={1} />
        </g>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={280 + i * 30} y={176} width={22} height={14} rx={3} fill={V.hi} className="h" />
        ))}
        <Flow d="M238 140 L264 140" tip={[264, 140]} angle={0} dashed={false} />
        <Flow d="M264 164 C 248 176, 232 176, 220 164" tip={[220, 164]} angle={-2.3} />
        <Label x={66} y={86} show={detail} tone="ink">intrinsic</Label>
        <Label x={80} y={232} show={detail} tone="mute">extraneous</Label>
        <Label x={206} y={232} show={detail} tone="ink">working memory</Label>
        <Label x={320} y={222} show={detail}>schemas (LTM)</Label>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Fitts's law — distance, width, aimed movement, time               */
/* (drawn proportionally: D = 200, W = 24, so ID = log₂(D/W + 1) ≈ 3.2 bits) */
/* ---------------------------------------------------------------- */
const fittsPath = "M76 170 C 130 112, 214 104, 270 146 S 282 160, 278 156";
const fittsPlate: IllustrationEntry = {
  slug: "fitts-law",
  title: "Fitts's law plate",
  description:
    "A screen shows a start point and a tall target 200 units away and 24 units wide. A pointer follows a fast curved movement toward the target and then small corrective adjustments near it. Dimension lines mark the distance D and the width W. Beside the screen, a small chart plots movement time against the index of difficulty as a straight rising line, with this movement's point (about 3.2 bits) highlighted: time grows with the logarithm of distance over width.",
  animated: true,
  explorer: "fitts",
  Art: ({ detail, animate }) => (
    <g>
      {/* the screen */}
      <rect x={30} y={44} width={276} height={196} rx={8} fill={V.hi} className="e" />
      <rect x={30} y={44} width={276} height={14} rx={8} fill={V.top} className="h" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={42 + i * 7} cy={51} r={2} fill={V.lo} />
      ))}
      {/* effective landing zone and the target */}
      <rect x={258} y={78} width={36} height={140} fill={V.left} opacity={0.5} />
      <rect x={264} y={78} width={24} height={140} rx={2} fill={V.focal} className="e" />
      {/* the movement: ballistic phase, then corrections */}
      <path d={fittsPath} fill="none" stroke={V.deep} strokeWidth={1.6} strokeDasharray="1.2 4" strokeLinecap="round" />
      <circle cx={76} cy={170} r={7} fill={V.hi} className="e" />
      <circle cx={76} cy={170} r={2.6} fill={V.edge} />
      <g style={animate ? { offsetPath: `path("${fittsPath}")`, offsetRotate: "0deg" } : undefined} className={animate ? "anim-travel" : undefined}>
        <Cursor x={animate ? 0 : 278} y={animate ? 0 : 156} />
      </g>
      {/* dimensions: D from start to target centre, W across the target */}
      <line x1={76} y1={230} x2={276} y2={230} className="e" />
      <line x1={76} y1={225} x2={76} y2={235} className="e" />
      <line x1={276} y1={225} x2={276} y2={235} className="e" />
      <line x1={264} y1={70} x2={288} y2={70} className="e" />
      <line x1={264} y1={66} x2={264} y2={74} className="e" />
      <line x1={288} y1={66} x2={288} y2={74} className="e" />
      {/* movement time against index of difficulty */}
      <g transform="translate(318 96)">
        <rect width={70} height={96} rx={5} fill={V.hi} className="e" />
        <line x1={10} y1={82} x2={62} y2={82} className="m" />
        <line x1={10} y1={82} x2={10} y2={10} className="m" />
        <line x1={12} y1={70} x2={60} y2={22} stroke={V.deep} strokeWidth={1.4} />
        {[[16, 66], [26, 56], [44, 38], [56, 26]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 2 ? 4 : 2.2} fill={i === 2 ? V.focal : V.right} className="e" />
        ))}
      </g>
      <Label x={176} y={252} show={detail}>D distance</Label>
      <Label x={276} y={62} show={detail}>W</Label>
      <Label x={76} y={194} show={detail} tone="mute">start</Label>
      <Label x={353} y={208} show={detail} tone="mute">time vs ID</Label>
      <Label x={168} y={34} show={detail} tone="ink">MT = a + b · log₂(D/W + 1)</Label>
    </g>
  ),
};

/* ---------------------------------------------------------------- */
/* Mental models — Norman's three models                            */
/* (designer's conceptual model → system image → user's mental model; */
/*  the designer and user communicate only through the system image)  */
/* ---------------------------------------------------------------- */
const graph = (x: number, y: number, variant: "full" | "user") => {
  const n: [number, number][] = [
    [0, 0],
    [26, -8],
    [12, 20],
    [38, 16],
  ];
  const e: [number, number, boolean][] = variant === "full" ? [[0, 1, true], [0, 2, true], [1, 3, true], [2, 3, true]] : [[0, 1, true], [0, 2, true], [1, 2, false]];
  return (
    <g transform={`translate(${x} ${y})`}>
      {e.map(([a, b, ok], i) => (
        <line key={i} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke={ok ? V.deep : V.focalR} strokeWidth={1.3} strokeDasharray={ok ? undefined : "2.5 2"} />
      ))}
      {n.map(([cx, cy], i) => (variant === "user" && i === 3 ? <circle key={i} cx={cx} cy={cy} r={4.6} fill="none" className="m" strokeDasharray="2 2" /> : <circle key={i} cx={cx} cy={cy} r={4.6} fill={V.focal} className="e" />))}
    </g>
  );
};
const mentalPlate: IllustrationEntry = {
  slug: "mental-models",
  title: "Mental models plate",
  description:
    "Three models side by side. On the left, the designer's conceptual model is a complete diagram on a drafting board. In the middle, the system image is the product itself, an appliance with a screen, the only thing the user can see and use. On the right, a person studies the product and forms a mental model in a thought bubble that is incomplete: one part is missing and one connection is wrong. Arrows run from designer to product and from product to person; there is no direct line from designer to person.",
  Art: ({ detail }) => {
    const o: Pt = [200, 120];
    const [px, py] = at(o, 128, 54);
    return (
      <g transform="translate(-80 -16) scale(1.32)">
        {/* designer's conceptual model on a drafting board */}
        <IsoShadow o={o} x={-110} y={-10} w={54} d={40} spread={3} />
        <IsoBox o={o} x={-110} y={-10} z={0} w={54} d={40} h={16} tone="neutral" />
        <g transform={plane.top(o, -106, -6, 16)}>
          <rect width={46} height={32} rx={1} fill={V.top} className="e" />
          <g transform="translate(-6 -4) scale(1)">{graph(10, 16, "full")}</g>
        </g>
        {/* the system image: an appliance with a screen */}
        <IsoShadow o={o} x={0} y={0} w={34} d={26} spread={3} />
        <IsoBox o={o} x={0} y={0} z={0} w={34} d={26} h={44} tone="cat" />
        <g transform={plane.left(o, 4, 26, 40)}>
          <rect width={26} height={18} rx={1.5} fill={V.hi} className="e" />
          <rect x={4} y={4} width={12} height={3} rx={1} fill={V.edge} opacity={0.8} />
          <Pill x={4} y={10} w={10} h={4} />
          <circle cx={21} cy={12} r={2.6} fill={V.focal} className="e" />
          <circle cx={13} cy={30} r={4} fill={V.hi} className="e" />
        </g>
        {/* the user and their mental model */}
        <Figure x={px} y={py} s={1.05} pose="point" flip skin={4} hair="bun" hairTone={1} top={V.right} />
        <Bubble x={px - 10} y={py - 132} w={68} h={48} tail="left">
          {graph(px + 4, py - 110, "user")}
        </Bubble>
        {/* the only channels: designer → system → user */}
        <Flow d={`M${at(o, -60, 0, 24)[0]} ${at(o, -60, 0, 24)[1] - 6} C ${at(o, -40, -10, 60)[0]} ${at(o, -40, -10, 60)[1]}, ${at(o, -10, -8, 66)[0]} ${at(o, -10, -8, 66)[1]}, ${at(o, 4, 0, 50)[0]} ${at(o, 4, 0, 50)[1]}`} tip={at(o, 4, 0, 50)} angle={0.6} dashed={false} />
        <Flow d={`M${at(o, 36, 18, 30)[0]} ${at(o, 36, 18, 30)[1]} C ${at(o, 60, 34, 40)[0]} ${at(o, 60, 34, 40)[1]}, ${at(o, 80, 50, 40)[0]} ${at(o, 80, 50, 40)[1]}, ${px - 22} ${py - 62}`} tip={[px - 22, py - 62]} angle={0.4} dashed={false} />
        {(() => {
          const a = at(o, -82, 30, 0);
          const b: Pt = [px - 8, py - 4];
          const m: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 22];
          return (
            <g>
              <path d={`M${a[0]} ${a[1] + 4} Q ${m[0]} ${m[1] + 22} ${b[0]} ${b[1]}`} fill="none" className="m" strokeDasharray="2 3" />
              <circle cx={m[0]} cy={m[1] + 11} r={5} fill={V.hi} className="e" />
              <path d={`M${m[0] - 2.6} ${m[1] + 8.4} l5.2 5.2 m0 -5.2 l-5.2 5.2`} stroke={V.edge} strokeWidth={1.3} />
            </g>
          );
        })()}
        <Label x={at(o, -83, 10, 0)[0] - 4} y={at(o, -83, 30, 0)[1] + 26} size={8} show={detail}>conceptual model</Label>
        <Label x={at(o, 17, 13, 0)[0] - 6} y={at(o, 17, 26, 0)[1] + 22} size={8} show={detail}>system image</Label>
        <Label x={px + 24} y={py - 138} size={8} show={detail} tone="ink">mental model</Label>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Usability testing — participant, task, observation, evidence      */
/* ---------------------------------------------------------------- */
const usabilityPlate: IllustrationEntry = {
  slug: "usability-testing",
  title: "Usability testing plate",
  description:
    "A participant works through a task card at a laptop while a facilitator beside them takes notes. Above them, a strip records the observed behaviour over time, with a hesitation and an error marked. Arrows lead from the strip to evidence, a quoted comment and a time measure, and from the evidence to a short list of findings rated by severity.",
  Art: ({ detail }) => {
    const o: Pt = [150, 150];
    const [px, py] = at(o, 30, 46);
    const [fx, fy] = at(o, 70, 54);
    return (
      <g>
        {/* the session (scaled up so the people read at card size) */}
        <g transform="translate(-96 -66) scale(1.45)">
        <IsoShadow o={o} x={10} y={10} w={60} d={30} spread={5} />
        {[[12, 38], [66, 38], [66, 12]].map(([x, y], i) => (
          <IsoBox key={i} o={o} x={x} y={y} z={0} w={2} d={2} h={20} />
        ))}
        <IsoBox o={o} x={10} y={10} z={20} w={60} d={30} h={2} tone="neutral" />
        <Laptop o={o} x={20} y={16} z={22} w={24} d={16} screenH={15}>
          <Bars x={3} y={3} w={12} n={2} gap={3.4} />
          <Pill x={3} y={9} w={8} h={3} />
        </Laptop>
        <g transform={plane.top(o, 50, 18, 22.1)}>
          <rect width={14} height={18} rx={1} fill={V.hi} className="e" />
          <Check x={5} y={6} s={0.5} />
          <rect x={7} y={4.6} width={5} height={1.2} rx={0.6} fill={V.mid} />
          <rect x={3} y={9} width={9} height={1.2} rx={0.6} fill={V.mid} />
        </g>
        <Figure x={px} y={py} s={1} pose="seated" skin={2} hair="long" hairTone={2} top={V.right} />
        <Figure x={fx} y={fy} s={1} pose="seated" flip skin={4} hair="crop" hairTone={1} top={V.focal}>
          <rect x={7} y={-33} width={9} height={11} rx={1} fill={V.hi} className="e" />
        </Figure>
        </g>
        {/* observed behaviour over time */}
        <g transform="translate(40 22)">
          <rect width={170} height={40} rx={5} fill={V.hi} className="e" />
          <line x1={10} y1={22} x2={160} y2={22} className="m" />
          {[18, 40, 76, 104, 140].map((x, i) => (
            <circle key={x} cx={x} cy={22} r={i === 2 ? 6 : 3} fill={i === 2 ? V.hi : V.focal} className="e" strokeDasharray={i === 2 ? "1.5 1.5" : undefined} />
          ))}
          <path d="M100 17 l8 8 m0 -8 l-8 8" stroke={V.edge} strokeWidth={1.5} />
        </g>
        {/* evidence */}
        <Bubble x={238} y={30} w={58} h={22} tail="none">
          <rect x={244} y={37} width={40} height={2.4} rx={1.2} fill={V.mid} />
          <rect x={244} y={43} width={28} height={2.4} rx={1.2} fill={V.mid} opacity={0.6} />
        </Bubble>
        <g transform="translate(238 60)">
          <rect width={58} height={30} rx={4} fill={V.hi} className="e" />
          <circle cx={14} cy={15} r={9} fill={V.top} className="e" />
          <path d="M14 15 v-6 M14 15 l4 3" className="e" fill="none" />
          <rect x={28} y={12} width={22} height={6} rx={1} fill={V.focal} />
        </g>
        {/* findings by severity */}
        <g transform="translate(314 30)">
          <rect width={72} height={96} rx={5} fill={V.hi} className="e" />
          {[3, 3, 2, 1].map((sev, i) => (
            <g key={i}>
              {[0, 1, 2].map((k) => (
                <circle key={k} cx={10 + k * 5} cy={18 + i * 20} r={2.1} fill={k < sev ? V.focal : V.top} className="h" />
              ))}
              <rect x={28} y={16.6 + i * 20} width={36 - i * 4} height={2.8} rx={1.4} fill={V.mid} />
            </g>
          ))}
        </g>
        <Flow d="M210 40 L236 40" tip={[236, 40]} angle={0} dashed={false} />
        <Flow d="M296 60 L312 60" tip={[312, 60]} angle={0} dashed={false} />
        <Flow d={`M${px * 1.45 - 96} ${py * 1.45 - 66 - 92} C ${px * 1.45 - 96} 90, 90 84, 100 66`} tip={[100, 64]} angle={-1.3} />
        <Label x={125} y={76} show={detail} tone="mute">observed behaviour</Label>
        <Label x={267} y={104} show={detail} tone="mute">evidence</Label>
        <Label x={350} y={140} show={detail} tone="ink">findings</Label>
        <Label x={px * 1.45 - 80} y={py * 1.45 - 6} show={detail}>participant and task</Label>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* User Interface Design — the interface as the meeting surface      */
/* (checked against the entry: the interface is the layer a person   */
/*  perceives and acts on; the system stays behind it; a task drives */
/*  the encounter and a context surrounds it; input goes in, feedback */
/*  comes back through the same surface)                              */
/* ---------------------------------------------------------------- */
const uiDesignPlate: IllustrationEntry = {
  slug: "ui-design",
  title: "User interface design plate",
  description:
    "A person stands in front of an upright screen panel and reaches toward its primary button. The panel is the interface: a heading, a text field, two choice chips with one selected, and a button with a focus ring. Behind the panel, to the right, a large block of stacked layers stands for the system: data and logic the person never sees directly. Two arrows join panel and system, one carrying the person's input in and one bringing feedback back to the screen. Above the person, a thought card shows the task as a short checklist. The whole scene sits inside a dashed boundary on the floor, with a plant, marking the context of use: where, when and under what conditions the task happens.",
  Art: ({ detail }) => {
    const o: Pt = [196, 104];
    const ring = [at(o, -64, -44), at(o, 134, -44), at(o, 134, 112), at(o, -64, 112)];
    const [ux, uy] = at(o, 30, 82);
    const sysIn = at(o, 86, 32, 42);
    const sysOut = at(o, 96, 32, 14);
    const panIn = at(o, 56, 38, 52);
    const panOut = at(o, 56, 38, 26);
    return (
      <g transform="translate(-58 -10) scale(1.26)">
        {/* context: the boundary of use */}
        <path d={`M${ring.map((p) => p.join(" ")).join(" L")} Z`} fill={V.top} fillOpacity={0.35} className="m" strokeDasharray="4 3" />
        <Plant o={o} x={-50} y={96} />
        {/* the system: layers behind the surface */}
        <IsoShadow o={o} x={84} y={-12} w={40} d={44} spread={4} />
        {[0, 16, 32].map((z, i) => (
          <IsoBox key={z} o={o} x={84} y={-12} z={z} w={40} d={44} h={14} tone={i === 2 ? "cat" : "neutral"} />
        ))}
        {[0, 16, 32].map((z) => (
          <g key={z} transform={plane.right(o, 124, 32, z + 11)}>
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={6 + k * 5} cy={4} r={1.3} fill={V.mid} />
            ))}
            <rect x={22} y={3} width={16} height={2} rx={1} fill={V.mid} opacity={0.7} />
          </g>
        ))}
        {/* the interface: the surface the person perceives and acts on */}
        <IsoShadow o={o} x={2} y={36} w={52} d={6} spread={3} />
        <IsoBox o={o} x={22} y={34} z={0} w={12} d={8} h={2} tone="neutral" />
        <IsoBox o={o} x={27} y={37} z={2} w={2} d={2} h={8} tone="neutral" />
        <IsoBox o={o} x={2} y={37} z={10} w={52} d={3} h={62} tone="focal" />
        <g transform={plane.left(o, 4, 40, 70)}>
          <rect width={48} height={58} rx={1.5} fill={V.hi} className="m" />
          <rect x={4} y={5} width={24} height={4} rx={1} fill={V.edge} opacity={0.85} />
          <rect x={4} y={12} width={34} height={1.8} rx={0.9} fill={V.mid} />
          <rect x={4} y={19} width={40} height={8} rx={1.5} fill={V.hi} className="e" />
          <rect x={7} y={22.2} width={14} height={1.8} rx={0.9} fill={V.mid} />
          <Pill x={4} y={31} w={16} h={6} fill={V.focal} />
          <Check x={9} y={34} s={0.5} color={V.hi} />
          <Pill x={23} y={31} w={16} h={6} fill={V.hi} />
          <rect x={4} y={44} width={40} height={9} rx={4.5} fill="none" stroke={V.act} strokeWidth={1} strokeDasharray="2 1.4" />
          <Pill x={6} y={45.5} w={36} h={6} fill={V.act} />
        </g>
        {/* input in, feedback back */}
        <Flow d={`M${panIn[0]} ${panIn[1]} L ${sysIn[0]} ${sysIn[1]}`} tip={sysIn} angle={Math.atan2(sysIn[1] - panIn[1], sysIn[0] - panIn[0])} dashed={false} />
        <Flow d={`M${sysOut[0]} ${sysOut[1]} L ${panOut[0]} ${panOut[1]}`} tip={panOut} angle={Math.atan2(panOut[1] - sysOut[1], panOut[0] - sysOut[0])} />
        {/* the person and the task */}
        <IsoShadow o={o} x={24} y={76} w={14} d={10} spread={2} />
        <Figure x={ux} y={uy} s={1.02} pose="reach" skin={2} hair="short" hairTone={3} top={V.right} />
        <Bubble x={ux - 74} y={uy - 98} w={44} h={34} tail="right">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={ux - 68} y={uy - 92 + i * 9.5} width={5} height={5} rx={0.8} fill={i === 0 ? V.focal : V.hi} className="h" />
              <rect x={ux - 60} y={uy - 90.4 + i * 9.5} width={22 - i * 4} height={1.8} rx={0.9} fill={V.mid} />
            </g>
          ))}
        </Bubble>
        <Label x={ux - 4} y={uy + 18} size={7.5} show={detail}>user</Label>
        <Label x={ux - 52} y={uy - 104} size={7.5} show={detail}>task</Label>
        <Label x={at(o, 2, 40, 76)[0] + 18} y={at(o, 2, 40, 76)[1] - 4} size={7.5} show={detail} tone="ink">interface</Label>
        <Label x={at(o, 104, -12, 48)[0]} y={at(o, 104, -12, 48)[1] - 8} size={7.5} show={detail}>system</Label>
        <Label x={ring[2][0] - 34} y={ring[2][1] - 6} size={7.5} show={detail} tone="mute">context of use</Label>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Interaction Design — two sides of an ongoing exchange             */
/* (checked against the entry: a person acts, the system changes     */
/*  state and responds, the person interprets the response and acts   */
/*  again; the loop repeats, and feedback reports the new state)      */
/* ---------------------------------------------------------------- */
const interactionDesignPlate: IllustrationEntry = {
  slug: "interaction-design-discipline",
  title: "Interaction design plate",
  description:
    "A person stands on a platform on the left and points across to a machine on a platform on the right. The two are joined by a loop of two arrows. The upper arrow runs from the person to the machine and carries a small pressed-button token: the action. The lower arrow runs back from the machine to the person and carries a speech bubble with a tick: the feedback. On the machine's face, a column of three state lights has the middle one lit beside a short label bar, and a display shows a progress bar, so the machine's current state is visible. A thought bubble above the person shows a target symbol for their goal. The loop has no start or end, showing that the exchange repeats.",
  Art: ({ detail }) => {
    const o: Pt = [196, 128];
    const [px, py] = at(o, -54, 40);
    const top: Pt = [132, 54];
    const sysTop: Pt = [252, 46];
    const sysLow: Pt = [262, 140];
    const low: Pt = [150, 150];
    return (
      <g transform="translate(-71 6) scale(1.416)">
        {/* the two sides */}
        <IsoShadow o={o} x={-74} y={22} w={40} d={36} spread={4} />
        <IsoBox o={o} x={-74} y={22} z={0} w={40} d={36} h={6} tone="cat" />
        <IsoShadow o={o} x={40} y={-36} w={44} d={40} spread={4} />
        <IsoBox o={o} x={40} y={-36} z={0} w={44} d={40} h={6} tone="cat" />
        {/* the system: a machine whose state is visible */}
        <IsoBox o={o} x={48} y={-28} z={6} w={30} d={24} h={58} tone="neutral" />
        <g transform={plane.left(o, 50, -4, 60)}>
          <rect width={26} height={20} rx={1.2} fill={V.hi} className="m" />
          <rect x={3} y={4} width={14} height={2} rx={1} fill={V.mid} />
          <rect x={3} y={10} width={20} height={4} rx={2} fill={V.top} className="h" />
          <rect x={3} y={10} width={12} height={4} rx={2} fill={V.focal} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={5} cy={27 + i * 7} r={2.4} fill={i === 1 ? V.focal : V.hi} className="e" />
              <rect x={10} y={26 + i * 7} width={i === 1 ? 13 : 9} height={2} rx={1} fill={i === 1 ? V.edge : V.mid} opacity={i === 1 ? 0.85 : 0.6} />
            </g>
          ))}
        </g>
        {/* the person and their goal */}
        <Figure x={px} y={py} s={1.08} pose="point" skin={3} hair="long" hairTone={2} top={V.right} />
        <Bubble x={px - 34} y={py - 104} w={30} h={24} tail="right">
          <circle cx={px - 19} cy={py - 92} r={8} fill={V.hi} className="e" />
          <circle cx={px - 19} cy={py - 92} r={4.6} fill={V.top} className="h" />
          <circle cx={px - 19} cy={py - 92} r={1.8} fill={V.focal} />
        </Bubble>
        {/* the loop: action out, feedback back */}
        <Flow d={`M${top[0]} ${top[1]} C ${top[0] + 30} ${top[1] - 34}, ${sysTop[0] - 40} ${sysTop[1] - 34}, ${sysTop[0]} ${sysTop[1]}`} tip={sysTop} angle={0.75} dashed={false} />
        <Flow d={`M${sysLow[0]} ${sysLow[1]} C ${sysLow[0] - 20} ${sysLow[1] + 34}, ${low[0] + 44} ${low[1] + 30}, ${low[0]} ${low[1]}`} tip={low} angle={Math.PI + 0.9} />
        <g transform="translate(184 26)">
          <rect x={-12} y={-6} width={24} height={12} rx={6} fill={V.act} className="e" />
          <circle cx={4} cy={0} r={2.6} fill={V.hi} />
        </g>
        <Bubble x={186} y={160} w={24} h={16} tail="none">
          <Check x={198} y={168.5} s={0.7} />
        </Bubble>
        <Label x={px - 26} y={py + 22} size={7.5} show={detail}>person</Label>
        <Label x={px - 40} y={py - 90} size={7.5} show={detail} tone="mute" anchor="end">goal</Label>
        <Label x={184} y={13} size={7.5} show={detail} tone="ink">action</Label>
        <Label x={at(o, 62, -4, 0)[0] + 22} y={at(o, 62, -4, 0)[1] + 25} size={7.5} show={detail}>system state</Label>
        <Label x={198} y={190} size={7.5} show={detail} tone="ink">feedback</Label>
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Accessibility — barriers, supports and participation              */
/* (checked against the entry: access arises between people, tasks,  */
/*  environments and technology; barriers are design decisions;       */
/*  supports and alternatives open routes; the aim is participation;  */
/*  several modes of access, not one stereotype)                      */
/* ---------------------------------------------------------------- */
const accessibilityPlate: IllustrationEntry = {
  slug: "accessibility-concept",
  title: "Accessibility plate",
  description:
    "A raised platform stands for participation: two people meet on it. Two routes lead up. On the left a flight of steps, a barrier for some people; on the right a gentle ramp with a level landing, a support that everyone can use. In front, a person uses a public kiosk whose screen shows a captioned message; above it, small badges show several ways of interacting with the same service: captions, speech, braille and a keyboard. The picture places barriers and supports in the environment and the system, and shows more than one way to take part.",
  Art: ({ detail }) => {
    const o: Pt = [128, 96];
    const P = (x: number, y: number, z = 0) => at(o, x, y, z);
    const pts = (a: Pt[]) => a.map((p) => p.join(",")).join(" ");
    const rz = (y: number) => 18 - ((y - 8) / 52) * 18; // ramp height at depth y
    const [ax, ay] = P(16, 18, 18);
    const [bx, by] = P(38, 24, 18);
    const [kx, ky] = P(122, 40);
    const scr = P(136, 22, 44);
    return (
      <g transform="translate(-36 28) scale(1.36)">
        <IsoShadow o={o} x={-6} y={-6} w={88} d={74} spread={6} />
        {/* participation: the shared platform */}
        <IsoBox o={o} x={0} y={0} z={0} w={60} d={44} h={18} tone="cat" />
        {/* support: a level landing and a gentle ramp with a handrail */}
        <IsoBox o={o} x={60} y={0} z={0} w={14} d={8} h={18} tone="neutral" />
        <polygon points={pts([P(74, 60, 0), P(74, 8, 18), P(74, 8, 0)])} fill={V.nRight} className="e" />
        <polygon points={pts([P(60, 60, 0), P(74, 60, 0), P(74, 8, 18), P(60, 8, 18)])} fill={V.top} className="e" />
        {[20, 32, 44].map((y) => (
          <line key={y} x1={P(60, y, rz(y))[0]} y1={P(60, y, rz(y))[1]} x2={P(74, y, rz(y))[0]} y2={P(74, y, rz(y))[1]} className="h" />
        ))}
        <path d={`M${P(74, 58, 10).join(" ")} L${P(74, 8, 28).join(" ")} L${P(74, 0, 28).join(" ")}`} fill="none" stroke={V.edge} strokeWidth={1.4} strokeLinecap="round" />
        {/* barrier for some: steps */}
        {(
          [
            [44, 12],
            [50, 8],
            [56, 4],
          ] as const
        ).map(([y, h]) => (
          <IsoBox key={y} o={o} x={8} y={y} z={0} w={28} d={6} h={h} tone="neutral" />
        ))}
        {/* two people meeting on the platform */}
        <Figure x={ax} y={ay} s={0.95} pose="stand" skin={1} hair="crop" hairTone={4} top={V.right} />
        <Figure x={bx} y={by} s={0.95} pose="hold" flip skin={3} hair="long" hairTone={1} top={V.focal} />
        <Bubble x={ax - 30} y={ay - 78} w={26} h={15} tail="right">
          <rect x={ax - 26} y={ay - 73} width={17} height={1.8} rx={0.9} fill={V.mid} />
          <rect x={ax - 26} y={ay - 69} width={11} height={1.8} rx={0.9} fill={V.mid} />
        </Bubble>
        {/* a public kiosk and the person using it */}
        <IsoShadow o={o} x={132} y={18} w={10} d={8} spread={2} />
        <IsoBox o={o} x={134} y={20} z={0} w={6} d={4} h={28} tone="neutral" />
        <IsoBox o={o} x={128} y={22} z={28} w={20} d={2} h={18} tone="focal" />
        <g transform={plane.left(o, 129, 24, 45)}>
          <rect width={18} height={16} rx={1} fill={V.hi} className="m" />
          <rect x={2} y={3} width={12} height={1.6} rx={0.8} fill={V.mid} />
          <rect x={2} y={10} width={14} height={4} rx={0.6} fill={V.edge} opacity={0.85} />
          <rect x={3} y={11.2} width={9} height={1.5} rx={0.75} fill={V.hi} />
        </g>
        <Figure x={kx} y={ky} s={1} pose="reach" skin={2} hair="bun" hairTone={3} top={V.right} />
        {/* several ways to interact with the same service */}
        {(["CC", "speech", "braille", "keys"] as const).map((k, i) => {
          const x = scr[0] - 2 + i * 19;
          const y = scr[1] - 34;
          return (
            <g key={k} transform={`translate(${x} ${y})`}>
              <rect x={-8} y={-7} width={16} height={14} rx={3} fill={V.hi} className="e" />
              {k === "CC" && (
                <text x={0} y={2.6} textAnchor="middle" fontSize={7} fontWeight={600} fill={V.edge} fontFamily="var(--font-plex-mono), ui-monospace, monospace">
                  CC
                </text>
              )}
              {k === "speech" && <path d="M-4 -1 v2 M-1.5 -3 v6 M1 -2 v4 M3.5 -0.5 v1" stroke={V.edge} strokeWidth={1.2} strokeLinecap="round" />}
              {k === "braille" && [0, 1, 2].map((r) => [0, 1].map((c) => <circle key={`${r}${c}`} cx={-1.8 + c * 3.6} cy={-3.4 + r * 3.4} r={0.95} fill={r === 1 && c === 1 ? V.top : V.edge} />))}
              {k === "keys" && [0, 1, 2].map((c) => <rect key={c} x={-5.2 + c * 3.6} y={-1.6} width={2.8} height={3.2} rx={0.5} fill="none" stroke={V.edge} strokeWidth={0.9} />)}
            </g>
          );
        })}
        <Label x={P(22, 62, 0)[0] - 10} y={P(22, 62, 0)[1] + 14} size={7} show={detail}>barrier for some</Label>
        <Label x={P(74, 60, 0)[0] + 18} y={P(74, 60, 0)[1] + 14} size={7} show={detail}>support for all</Label>
        <Label x={P(30, 0, 18)[0] + 4} y={P(30, 0, 18)[1] - 74} size={7} show={detail} tone="ink">participation</Label>
        <Label x={scr[0] + 26} y={scr[1] - 47} size={7} show={detail} tone="mute">many ways to interact</Label>
      </g>
    );
  },
};

export { accessibilityPlate, cltPlate, fittsPlate, hciPlate, interactionDesignPlate, mentalPlate, uiDesignPlate, usabilityPlate };
