/**
 * Knowledge plates in the dark technical editorial system (illustration v6,
 * D-086; docs/ILLUSTRATION_SYSTEM.md § Dark technical editorial). Each plate
 * is composed for its subject from ./system/viz; colour comes only from
 * --viz-* tokens; labels appear in the hero variant.
 */
import type { IllustrationEntry } from "../illustration-types";
import { iso, plane, type Pt } from "../system/kit";
import { Bloom, Callout, ContactShadow, Guides, isoRoute, ModuleCard, Route, Slab, Tag, Z } from "../system/viz";

/* ---------------------------------------------------------------- */
/* Accessibility — an exploded digital service and its access routes */
/* (checked against the entry: access arises between people, their   */
/*  technologies and the system; assistive technologies reach a       */
/*  product through its semantic structure and accessibility tree;    */
/*  captions and resizable text are alternative presentations;        */
/*  status must be announced; a drag-only control is a barrier for    */
/*  keyboard and switch users)                                        */
/* ---------------------------------------------------------------- */
export const accessibilityPlate: IllustrationEntry = {
  slug: "accessibility-concept",
  title: "Accessibility plate",
  canvas: "viz",
  description:
    "An exploded view of a digital service as stacked layers: content and semantic HTML at the base; above them the illuminated accessibility tree of names, roles and states; above that the interface people see and operate; and at the top two alternative presentations, captions and resizable text. On the left, five access channels lie as modules: keyboard, switch, screen reader, voice control and magnifier. Four of them are joined to the accessibility tree by solid illuminated routes. The switch route is dashed and stops at a cross before it reaches the service, marking a barrier: a drag-only control with no keyboard or switch alternative. A callout to the right shows a status message announced to assistive technology, the system's accessible feedback.",
  Art: ({ detail, uid = "p" }) => {
    const o: Pt = [206, 166];
    const W = 70;
    const D = 50;
    const zLit = 42;
    const zUi = 80;
    const zTop = 114;
    const channels = ["Keyboard", "Switch", "Screen reader", "Voice control", "Magnifier"];
    const cardX = (i: number) => -84 + i * 15;
    const cardY0 = 74;
    const cardD = 46;
    const zc = zLit; // channel modules float level with the accessibility tree
    // Routes run in that plane as a non-crossing bundle: back along -y, across along +x, then into the tree's front face.
    const route = (i: number) => {
      const xc = cardX(i) + 4.5;
      const yk = 57 + i * 3.4;
      const xi = 8 + i * 13;
      return isoRoute(o, [
        [xc, cardY0, zc + 2.2],
        [xc, yk, zc + 2.2],
        [xi, yk, zc + 2.2],
        [xi, D, zc + 2.8],
      ]);
    };
    const blocked = isoRoute(o, [
      [cardX(1) + 4.5, cardY0, zc + 2.2],
      [cardX(1) + 4.5, 57 + 3.4, zc + 2.2],
      [-14, 57 + 3.4, zc + 2.2],
    ]);
    const fb0 = iso(o, W, D * 0.5, zLit + 3);
    const fb = [fb0, [fb0[0] + 30, fb0[1]] as Pt, [fb0[0] + 30, fb0[1] - 14] as Pt];
    const [bx, by] = iso(o, W / 2, D / 2, zLit + 3);
    const corners: [number, number][] = [
      [0, D],
      [W, D],
      [W, 0],
    ];
    const right = (z: number) => iso(o, W, 0, z);
    return (
      <g transform="translate(-14 -21) scale(1.11)">
        <Bloom uid={uid} x={bx} y={by} rx={96} ry={44} />
        <ContactShadow o={o} x={0} y={0} w={W} d={D} spread={8} />
        {/* base layers: content and semantic structure */}
        <Slab o={o} uid={uid} x={0} y={0} z={0} w={W * 0.48} d={D} h={5} label={detail ? "Content" : undefined} labelSize={5} />
        <Slab o={o} uid={uid} x={W * 0.52} y={0} z={0} w={W * 0.48} d={D} h={5} label={detail ? "Semantics" : undefined} labelSize={5} />
        <Guides o={o} corners={corners} z0={5} z1={zLit} />
        {/* access channels: technologies people use, as modules level with the tree */}
        {channels.map((c, i) => (
          <g key={c} transform={`translate(0 ${-zc})`}>
            <ModuleCard o={o} uid={uid} x={cardX(i)} y={cardY0} w={9} d={cardD} axis="y" label={detail ? c : undefined} state={i === 1 ? "blocked" : "base"} />
          </g>
        ))}
        {[0, 2, 3, 4].map((i) => (
          <Route key={i} points={route(i)} kind="accent" r={3} />
        ))}
        <Route points={blocked} kind="blocked" r={3} />
        {/* the accessibility tree: the layer assistive technologies read and operate */}
        <Slab o={o} uid={uid} x={0} y={0} z={zLit} w={W} d={D} h={6} state="lit" label={detail ? "Accessibility tree" : undefined} sub={detail ? "names · roles · states" : undefined} />
        <Guides o={o} corners={corners} z0={zLit + 6} z1={zUi} />
        {/* the interface people see and operate, with a visible focus */}
        <Slab o={o} uid={uid} x={0} y={0} z={zUi} w={W} d={D} h={3} state="glass" />
        <g transform={plane.top(o, 6, 5, zUi + 3)}>
          <rect x={0} y={0} width={W - 12} height={7} rx={1.2} fill={Z.s2} stroke={Z.edge} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <rect x={3} y={2.6} width={20} height={1.8} rx={0.9} fill={Z.text2} />
          <rect x={0} y={11} width={W - 12} height={7} rx={1.2} fill={Z.s1} stroke={Z.accent} strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
          <rect x={-1.6} y={9.4} width={W - 8.8} height={10.2} rx={2} fill="none" stroke={Z.accent} strokeWidth="0.6" strokeDasharray="1.6 1.2" vectorEffect="non-scaling-stroke" />
          <rect x={0} y={22} width={W - 12} height={7} rx={1.2} fill={Z.s1} stroke={Z.edge} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <rect x={0} y={33} width={24} height={6} rx={3} fill={Z.accent} />
        </g>
        <Guides o={o} corners={corners} z0={zUi + 3} z1={zTop} />
        {/* alternative presentations */}
        <Slab o={o} uid={uid} x={0} y={0} z={zTop} w={W * 0.48} d={D} h={4} label={detail ? "Captions" : undefined} labelSize={5.4} />
        <Slab o={o} uid={uid} x={W * 0.52} y={0} z={zTop} w={W * 0.48} d={D} h={4} label={detail ? "Text size" : undefined} labelSize={5.4} sub={detail ? "reflow · zoom" : undefined} />
        {/* accessible feedback: a status message announced to assistive technology */}
        <Route points={fb} kind="positive" r={3} end="none" />
        <Callout x={fb[2][0] - 10} y={fb[2][1] - 22} w={62} h={22} tone="positive">
          <path d={`M${fb[2][0] - 4} ${fb[2][1] - 11} l3 3 l6 -6.5`} fill="none" stroke={Z.positive} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x={fb[2][0] + 9} y={fb[2][1] - 15} width={36} height={2.2} rx={1.1} fill={Z.text2} />
          <rect x={fb[2][0] + 9} y={fb[2][1] - 9} width={24} height={2.2} rx={1.1} fill={Z.text3} />
        </Callout>
        {detail && (
          <g>
            <Tag x={fb[2][0] + 6} y={fb[2][1] + 10} text="status announced" tone="positive" />
            <Tag x={iso(o, cardX(4) + 9, cardY0 + cardD, zc)[0] + 6} y={iso(o, cardX(4) + 9, cardY0 + cardD, zc)[1] + 10} text="ACCESS CHANNELS" />
            <Tag x={iso(o, -14, 60.4, zc)[0] - 30} y={iso(o, -14, 60.4, zc)[1] - 44} text="barrier: drag-only control" tone="warning" anchor="middle" leader={[iso(o, -14, 60.4, zc)[0] - 2, iso(o, -14, 60.4, zc)[1] - 5]} />
            <Tag x={right(zTop + 4)[0] + 10} y={right(zTop + 4)[1] + 4} text="alternatives" />
            <Tag x={right(zUi + 3)[0] + 10} y={right(zUi + 3)[1] + 4} text="interface · focus" tone="accent" />
            <Tag x={right(5)[0] + 10} y={right(5)[1] + 4} text="structure" />
          </g>
        )}
      </g>
    );
  },
};
