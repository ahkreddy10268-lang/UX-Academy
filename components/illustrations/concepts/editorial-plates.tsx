/**
 * Concept plate in the editorial technical style (illustration v5.1 pilot):
 * Cognitive Load Theory, the last of the five v5.1 pilots still in use (the
 * others were replaced under D-089/D-093). Drawn with the shared kit on the
 * standard 400 × 300 plate; labels appear only in the hero variant (`detail`).
 */
import { Flow, V } from "../system/kit";
import type { IllustrationEntry } from "../illustration-types";
import { Label } from "../primitives";

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

export { cltPlate };
