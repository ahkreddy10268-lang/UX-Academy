/**
 * Concept plates in the editorial technical style (illustration v5.1 pilot):
 * Human-Computer Interaction, Cognitive Load Theory, Fitts's law, Mental Models
 * and Usability Testing. Drawn with the shared kit on the standard 400 × 300
 * plate; labels appear only in the hero variant (`detail`). Each drawing is
 * checked against its entry (see the comment on each plate).
 */
import { Bars, Bubble, Check, Figure, Flow, IsoBox, IsoShadow, Laptop, Pill, V, Win, iso, plane, type Pt } from "../system/kit";
import type { IllustrationEntry } from "../illustration-types";
import { Label } from "../primitives";

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



export { cltPlate, hciPlate, mentalPlate, usabilityPlate };
