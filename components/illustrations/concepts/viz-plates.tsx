/**
 * Knowledge plates in the dark technical editorial system (illustration v6,
 * D-086; docs/ILLUSTRATION_SYSTEM.md § Dark technical editorial). Each plate
 * is composed for its subject from ./system/viz; colour comes only from
 * --viz-* tokens; the hero carries numbered markers explained by the HTML
 * figure key (D-101), never microtext.
 */
import type { IllustrationEntry } from "../illustration-types";
import { iso, plane, type Pt } from "../system/kit";
import { Bloom, Callout, ContactShadow, Guides, isoRoute, ModuleCard, Route, Slab, VizMarker, Z } from "../system/viz";

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
  key: [
    { n: "1", label: "Alternative presentations", detail: "captions; text that resizes and reflows" },
    { n: "2", label: "Interface", detail: "what people see and operate, with visible focus" },
    { n: "3", label: "Accessibility tree", detail: "names, roles and states that assistive technologies read" },
    { n: "4", label: "Structure", detail: "content and semantic HTML the tree is built from" },
    { n: "5", label: "Access channels", detail: "keyboard, switch, screen reader, voice control, magnifier" },
    { n: "6", label: "Barrier", detail: "a drag-only control: the switch route stops short" },
    { n: "7", label: "Status announced", detail: "accessible feedback from the system" },
  ],
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
        <Slab o={o} uid={uid} x={0} y={0} z={0} w={W * 0.48} d={D} h={5} />
        <Slab o={o} uid={uid} x={W * 0.52} y={0} z={0} w={W * 0.48} d={D} h={5} />
        <Guides o={o} corners={corners} z0={5} z1={zLit} />
        {/* access channels: technologies people use, as modules level with the tree */}
        {channels.map((c, i) => (
          <g key={c} transform={`translate(0 ${-zc})`}>
            <ModuleCard o={o} uid={uid} x={cardX(i)} y={cardY0} w={9} d={cardD} axis="y" state={i === 1 ? "blocked" : "base"} />
          </g>
        ))}
        {[0, 2, 3, 4].map((i) => (
          <Route key={i} points={route(i)} kind="accent" r={3} />
        ))}
        <Route points={blocked} kind="blocked" r={3} />
        {/* the accessibility tree: the layer assistive technologies read and operate */}
        <Slab o={o} uid={uid} x={0} y={0} z={zLit} w={W} d={D} h={6} state="lit" />
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
        <Slab o={o} uid={uid} x={0} y={0} z={zTop} w={W * 0.48} d={D} h={4} />
        <Slab o={o} uid={uid} x={W * 0.52} y={0} z={zTop} w={W * 0.48} d={D} h={4} />
        {/* accessible feedback: a status message announced to assistive technology */}
        <Route points={fb} kind="positive" r={3} end="none" />
        <Callout x={fb[2][0] - 10} y={fb[2][1] - 22} w={62} h={22} tone="positive">
          <path d={`M${fb[2][0] - 4} ${fb[2][1] - 11} l3 3 l6 -6.5`} fill="none" stroke={Z.positive} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x={fb[2][0] + 9} y={fb[2][1] - 15} width={36} height={2.2} rx={1.1} fill={Z.text2} />
          <rect x={fb[2][0] + 9} y={fb[2][1] - 9} width={24} height={2.2} rx={1.1} fill={Z.text3} />
        </Callout>
        {detail && (
          <g>
            <VizMarker x={right(zTop + 4)[0] + 14} y={right(zTop + 4)[1]} n={1} />
            <VizMarker x={right(zUi + 3)[0] + 14} y={right(zUi + 3)[1]} n={2} tone="accent" />
            <VizMarker x={right(zLit + 6)[0] + 14} y={right(zLit + 6)[1] + 22} n={3} tone="accent" />
            <VizMarker x={right(5)[0] + 14} y={right(5)[1]} n={4} />
            <VizMarker x={iso(o, cardX(4) + 9, cardY0 + cardD, zc)[0] + 12} y={iso(o, cardX(4) + 9, cardY0 + cardD, zc)[1] + 14} n={5} />
            <VizMarker x={iso(o, -14, 60.4, zc)[0] - 26} y={iso(o, -14, 60.4, zc)[1] - 30} n={6} tone="warning" to={[iso(o, -14, 60.4, zc)[0] - 2, iso(o, -14, 60.4, zc)[1] - 5]} />
            <VizMarker x={fb[2][0] + 62} y={fb[2][1] - 11} n={7} tone="positive" />
          </g>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Information architecture — four systems and one route            */
/* (checked against the entry: organisation, labelling, navigation   */
/*  and search systems (Rosenfeld, Morville & Arango); findability    */
/*  depends on how they work together; browsing and searching are     */
/*  different routes to the same content)                             */
/* ---------------------------------------------------------------- */
export const informationArchitecturePlate: IllustrationEntry = {
  slug: "information-architecture",
  title: "Information architecture plate",
  canvas: "viz",
  description:
    "An exploded view of a website's information architecture in three layers. At the top, the navigation system: a menu bar of four sections with one section active. In the middle, the organisation and labelling systems: a tree in which each node carries a short label. At the base, the content: a grid of pages, one of which is the destination. A browse route, illuminated, drops from the active menu section to its node in the tree, follows the tree down to a leaf and drops again to the destination page; each step matches a label the person can recognise. A second, dashed route runs from a search module beside the stack straight to the same page: searching reaches content without walking the hierarchy. Findability depends on the four systems agreeing.",
  key: [
    { n: "1", label: "Navigation system", detail: "the menu; one section is active" },
    { n: "2", label: "Organisation and labelling", detail: "a tree of labelled groups" },
    { n: "3", label: "Content", detail: "the pages themselves" },
    { n: "4", label: "Browse route", detail: "each step matches a label the person recognises" },
    { n: "5", label: "Search", detail: "a second route that skips the hierarchy" },
    { n: "6", label: "Destination", detail: "both routes reach the same page" },
  ],
  Art: ({ detail, uid = "p" }) => {
    const o: Pt = [196, 150];
    const W = 92;
    const D = 64;
    const zC = 0;
    const zO = 50;
    const zN = 96;
    // shared coordinates so routes drop vertically between layers
    const tab = [62, 12] as const; // active section (x, y on the plane)
    const node = tab; // its node in the tree
    const leaf = [74, 46] as const;
    const dest = leaf; // destination page
    const tree: [readonly [number, number], readonly [number, number]][] = [
      [[46, 6], [22, 22]],
      [[46, 6], node],
      [[22, 22], [12, 46]],
      [[22, 22], [34, 46]],
      [node, [56, 46]],
      [node, leaf],
    ];
    const onPath = (a: readonly [number, number], b: readonly [number, number]) => (a === node && b === leaf) || (a[0] === 46 && b === node);
    const pt = (u: number, v: number, z: number) => iso(o, u, v, z);
    const browse = [pt(tab[0], tab[1], zN + 4), pt(node[0], node[1], zO + 5), pt(leaf[0], leaf[1], zO + 5), pt(dest[0], dest[1], zC + 5)];
    const searchFrom = iso(o, -44, 82, zC + 2.2);
    const search = isoRoute(o, [
      [-44, 82, zC + 2.2],
      [dest[0], 82, zC + 2.2],
      [dest[0], dest[1] + 4, zC + 5],
    ]);
    const [bx, by] = iso(o, W / 2, D / 2, zO);
    return (
      <g transform="translate(-6 -6) scale(1.04)">
        <Bloom uid={uid} x={bx} y={by} rx={80} ry={40} />
        <ContactShadow o={o} x={0} y={0} w={W} d={D} spread={8} />
        {/* content */}
        <Slab o={o} uid={uid} x={0} y={0} z={zC} w={W} d={D} h={5} />
        <g transform={plane.top(o, 0, 0, zC + 5)}>
          {Array.from({ length: 4 }, (_, i) =>
            Array.from({ length: 3 }, (_, j) => {
              const u = 6 + i * 22;
              const v = 8 + j * 18;
              const isDest = Math.abs(u + 8 - dest[0]) < 9 && Math.abs(v + 6 - dest[1]) < 8;
              return <rect key={`${i}${j}`} x={u} y={v} width={16} height={12} rx={1.4} fill={isDest ? Z.accent : Z.s1} stroke={isDest ? Z.accent : Z.edge} strokeWidth="0.5" vectorEffect="non-scaling-stroke" className={isDest ? "glow-soft" : undefined} />;
            }),
          )}
        </g>
        <Guides o={o} corners={[[0, D], [W, D], [W, 0]]} z0={zC + 5} z1={zO} />
        {/* search: a second route to the same content */}
        <ModuleCard o={o} uid={uid} x={-74} y={74} w={30} d={16} tab={false} />
        <Route points={search} kind="neutral-dashed" r={3} end="dot" />
        {/* organisation + labelling */}
        <Slab o={o} uid={uid} x={0} y={0} z={zO} w={W} d={D} h={5} state="glass" />
        <g transform={plane.top(o, 0, 0, zO + 5)}>
          {tree.map(([a, b], i) => (
            <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={onPath(a, b) ? Z.accent : Z.edgeHi} strokeWidth={onPath(a, b) ? 1.2 : 0.6} vectorEffect="non-scaling-stroke" />
          ))}
          {[[46, 6], [22, 22], node, [12, 46], [34, 46], [56, 46], leaf].map(([u, v], i) => {
            const hot = (u === node[0] && v === node[1]) || (u === leaf[0] && v === leaf[1]) || u === 46;
            return (
              <g key={i}>
                <rect x={u - 6} y={v - 2.6} width={12} height={5.2} rx={1.4} fill={hot ? Z.accentSoft : Z.s2} stroke={hot ? Z.accent : Z.edge} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                <rect x={u - 3.6} y={v - 0.5} width={7.2} height={1} rx={0.5} fill={hot ? Z.accent : Z.text3} />
              </g>
            );
          })}
        </g>
        <Guides o={o} corners={[[0, D], [W, D], [W, 0]]} z0={zO + 5} z1={zN} />
        {/* navigation */}
        <Slab o={o} uid={uid} x={0} y={0} z={zN} w={W} d={D} h={4} />
        <g transform={plane.top(o, 0, 0, zN + 4)}>
          <rect x={4} y={4} width={W - 8} height={16} rx={2} fill={Z.s1} stroke={Z.edge} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          {[16, 38, 62, 82].map((u) => (
            <rect key={u} x={u - 8} y={9} width={16} height={6} rx={1.4} fill={u === tab[0] ? Z.accent : Z.s3} stroke={u === tab[0] ? Z.accent : Z.edge} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        {/* the browse route through matching labels */}
        <Route points={browse} kind="accent" r={2} end="dot" />
        {detail && (
          <g>
            <VizMarker x={iso(o, W, 0, zN + 4)[0] + 16} y={iso(o, W, 0, zN + 4)[1]} n={1} />
            <VizMarker x={iso(o, W, 0, zO + 5)[0] + 16} y={iso(o, W, 0, zO + 5)[1]} n={2} tone="accent" />
            <VizMarker x={iso(o, W, 0, zC + 5)[0] + 16} y={iso(o, W, 0, zC + 5)[1]} n={3} />
            <VizMarker x={browse[0][0] - 16} y={browse[0][1] - 18} n={4} tone="accent" to={[browse[0][0], browse[0][1]]} />
            <VizMarker x={searchFrom[0] - 4} y={searchFrom[1] + 22} n={5} />
            <VizMarker x={browse[3][0] + 18} y={browse[3][1] + 16} n={6} tone="accent" to={[browse[3][0], browse[3][1]]} />
          </g>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
/* Interaction design — one control through its states               */
/* (checked against the entry: action, system processing, state       */
/*  change, feedback, next action; a timeout leaves the state unknown, */
/*  so recovery checks status rather than paying again; the control is */
/*  an illustrative example of the general loop)                       */
/* ---------------------------------------------------------------- */
export const interactionDesignPlate: IllustrationEntry = {
  slug: "interaction-design-discipline",
  title: "Interaction design plate",
  canvas: "viz",
  description:
    "One payment control shown in four successive states joined by an illuminated route: ready, with a Pay £45 button; pressed, with the pointer on it as the person acts; processing, with the button disabled, a progress ring and the words Paying…; and paid, with a tick, the amount and a reference: the feedback that closes the loop. From the processing state a dashed coral branch leads down to a failed state, Not confirmed, where the screen offers Check status instead of paying again; a dashed route returns from it to the start of the sequence. The states are an illustrative example of the general interaction loop: action, system response, state change, feedback and the next action.",
  key: [
    { n: "1", label: "Ready", detail: "the control invites the action" },
    { n: "2", label: "Pressed", detail: "the person acts" },
    { n: "3", label: "Processing", detail: "the system responds; the button is disabled" },
    { n: "4", label: "Paid", detail: "feedback closes the loop" },
    { n: "5", label: "Timeout", detail: "the state is unknown, not failed" },
    { n: "6", label: "Recover", detail: "check status rather than pay again" },
  ],
  Art: ({ detail }) => {
    const cw = 84;
    const ch = 76;
    const gap = 12;
    const x0 = 14;
    const y0 = 50;
    const cx = (i: number) => x0 + i * (cw + gap);
    const fw = 124;
    const fx = cx(2) + cw / 2 - fw / 2;
    const fy = 182;
    const SANS = "var(--font-plex-sans), sans-serif";
    const card = (x: number, y: number, tone: "accent" | "neutral" | "positive" | "warning", w = cw) => (
      <rect x={x} y={y} width={w} height={ch} rx={6} fill={tone === "warning" ? Z.warningSoft : Z.s2} stroke={tone === "accent" ? Z.accent : tone === "positive" ? Z.positive : tone === "warning" ? Z.warning : Z.edge} strokeWidth="0.9" vectorEffect="non-scaling-stroke" className={tone === "accent" ? "glow-soft" : undefined} />
    );
    const bar = (x: number, y: number, w: number, tone: "text2" | "text3" = "text3") => <rect x={x} y={y} width={w} height={3} rx={1.5} fill={tone === "text2" ? Z.text2 : Z.text3} />;
    const btn = (x: number, y: number, kind: "outline" | "fill" | "disabled" | "neutral", label: string, w = 64) => (
      <g>
        <rect x={x} y={y} width={w} height={22} rx={11} fill={kind === "fill" ? Z.accent : kind === "disabled" ? Z.s3 : Z.bg} stroke={kind === "disabled" ? Z.edge : kind === "neutral" ? Z.text2 : Z.accent} strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
        <text x={x + w / 2} y={y + 15.4} textAnchor="middle" fontSize={13} fontWeight={600} fill={kind === "fill" ? Z.bg : kind === "disabled" ? Z.text3 : kind === "neutral" ? Z.text : Z.accent} fontFamily={SANS}>
          {label}
        </text>
      </g>
    );
    const mid = y0 + ch / 2;
    return (
      <g>
        {/* the route through the states */}
        {[0, 1, 2].map((i) => (
          <Route key={i} points={[[cx(i) + cw, mid], [cx(i + 1), mid]]} kind={i < 2 ? "accent" : "positive"} end="arrow" />
        ))}
        {/* ready */}
        {card(cx(0), y0, "neutral")}
        {bar(cx(0) + 10, y0 + 14, 50, "text2")}
        {bar(cx(0) + 10, y0 + 23, 34)}
        {btn(cx(0) + 10, y0 + 42, "outline", "Pay £45")}
        {/* pressed */}
        {card(cx(1), y0, "accent")}
        {bar(cx(1) + 10, y0 + 14, 50, "text2")}
        {bar(cx(1) + 10, y0 + 23, 34)}
        {btn(cx(1) + 10, y0 + 42, "fill", "Pay £45")}
        <path d={`M${cx(1) + 70} ${y0 + 56} l0 13 l3.4 -3 l2.6 5.2 l2.2 -1.1 l-2.6 -5 l4.6 0 Z`} fill={Z.text} stroke={Z.bg} strokeWidth="0.8" />
        {/* processing */}
        {card(cx(2), y0, "accent")}
        {bar(cx(2) + 10, y0 + 14, 50, "text2")}
        <circle cx={cx(2) + 15} cy={y0 + 32} r={6} fill="none" stroke={Z.edge} strokeWidth="1.6" />
        <path d={`M${cx(2) + 15} ${y0 + 26} A6 6 0 0 1 ${cx(2) + 21} ${y0 + 32}`} fill="none" stroke={Z.accent} strokeWidth="1.6" strokeLinecap="round" />
        <text x={cx(2) + 25} y={y0 + 36.5} fontSize={13} fill={Z.text2} fontFamily={SANS}>
          Paying…
        </text>
        {btn(cx(2) + 10, y0 + 46, "disabled", "Pay £45")}
        {/* paid: feedback */}
        {card(cx(3), y0, "positive")}
        <circle cx={cx(3) + 14} cy={y0 + 20} r={7} fill={Z.positiveSoft} stroke={Z.positive} strokeWidth="0.9" />
        <path d={`M${cx(3) + 10.6} ${y0 + 20} l2.4 2.4 l4.6 -4.8`} fill="none" stroke={Z.positive} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x={cx(3) + 25} y={y0 + 24.5} fontSize={13} fontWeight={600} fill={Z.text} fontFamily={SANS}>
          Paid £45
        </text>
        {bar(cx(3) + 10, y0 + 42, 60, "text2")}
        {bar(cx(3) + 10, y0 + 51, 44)}
        {bar(cx(3) + 10, y0 + 60, 30)}
        {/* failure and recovery */}
        <Route points={[[cx(2) + cw / 2, y0 + ch], [cx(2) + cw / 2, fy]]} kind="blocked" end="none" />
        {card(fx, fy, "warning", fw)}
        <text x={fx + 12} y={fy + 22} fontSize={13} fontWeight={600} fill={Z.warning} fontFamily={SANS}>
          Not confirmed
        </text>
        {bar(fx + 12, fy + 31, 70, "text2")}
        {btn(fx + 12, fy + 44, "neutral", "Check status", 100)}
        <Route points={[[fx, fy + ch / 2], [cx(0) + cw / 2, fy + ch / 2], [cx(0) + cw / 2, y0 + ch]]} kind="neutral-dashed" r={6} end="arrow" />
        {detail && (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <VizMarker key={i} x={cx(i) + cw / 2} y={y0 - 18} n={i + 1} tone={i === 3 ? "positive" : i ? "accent" : "text"} />
            ))}
            <VizMarker x={cx(2) + cw / 2 + 18} y={(y0 + ch + fy) / 2} n={5} tone="warning" />
            <VizMarker x={(fx + cx(0) + cw / 2) / 2} y={fy + ch / 2} n={6} />
          </g>
        )}
      </g>
    );
  },
};

/* ---------------------------------------------------------------- */
export const designSystemPlate: IllustrationEntry = {
  slug: "design-system",
  title: "Design system plate",
  canvas: "viz",
  description:
    "An exploded view of a design system in four layers, with one design decision traced through it. At the base, foundations and tokens: a row of colour swatches, a spacing scale and type samples; one swatch, the main action colour, is lit. Above it, components: a text input, a toggle and a button that uses the lit colour. Above that, a pattern: a sign-up form made from those components, whose button is the same component. At the top, three products (a website, a mobile app and a staff tool) each show that button. An illuminated route rises from the swatch through the button and the form, then branches into all three products: change the decision once and every product that takes the release receives it. A principles card on the ground feeds the foundations. Beside the stack, a vertical spine stands for documentation and governance and is linked to every layer; a dashed route carries feedback from the products back to the spine, which releases changes into the layers. The layers are a teaching model, not a fixed order of construction.",
  key: [
    { n: "1", label: "Foundations and tokens", detail: "one decision, the action colour, is lit and traced upward" },
    { n: "2", label: "Components", detail: "the button consumes the token" },
    { n: "3", label: "Patterns", detail: "a sign-up form made of the components" },
    { n: "4", label: "Products", detail: "website, app and staff tool all receive the change" },
    { n: "5", label: "Documentation and governance", detail: "linked to every layer; releases changes" },
    { n: "6", label: "Feedback", detail: "products report back to the system" },
    { n: "7", label: "Principles and needs", detail: "the ground the foundations stand on" },
  ],
  Art: ({ detail, uid = "p" }) => {
    const o: Pt = [150, 156];
    const W = 84;
    const D = 56;
    const h = 4;
    const zF = 0;
    const zC = 46;
    const zP = 92;
    const zR = 138;
    const key: [number, number] = [40, 40]; // the traced decision sits at the same plane position on every layer
    const products: [number, number][] = [
      [0, 22],
      [29, 51],
      [58, 80],
    ];
    const pc = (p: [number, number]) => (p[0] + p[1]) / 2;
    const fine = { strokeWidth: 0.5, vectorEffect: "non-scaling-stroke" as const };
    const spineX = 54;
    const zU = -22;
    const route = isoRoute(o, [
      [key[0], key[1], zF + h],
      [key[0], key[1], zC + h],
      [key[0], key[1], zP + h],
      [key[0], key[1], zR - 10],
    ]);
    const branch = (u: number) =>
      isoRoute(o, [
        [key[0], key[1], zR - 10],
        [u, key[1], zR - 10],
        [u, key[1], zR + 3],
      ]);
    return (
      <g transform="translate(14 6)">
        <Bloom uid={uid} x={iso(o, key[0], key[1], zC)[0]} y={iso(o, key[0], key[1], zC)[1]} rx={70} ry={52} />
        <ContactShadow o={o} x={-10} y={-8} w={W + 20} d={D + 18} spread={6} />

        {/* documentation and governance, behind every layer */}
        <Slab o={o} uid={uid} x={spineX} y={-24} z={zU} w={26} d={6} h={zR + h + 12 - zU} state="dim" />
        {/* principles and needs: the ground the system stands on */}
        <Slab o={o} uid={uid} x={-10} y={-8} z={zU} w={W + 20} d={D + 18} h={3} state="dim" />
        <Guides o={o} corners={[[0, D], [W, D]]} z0={zU + 3} z1={zF} />

        {/* foundations and tokens */}
        <Slab o={o} uid={uid} x={0} y={0} z={zF} w={W} d={D} h={h} state="glass" />
        <g transform={plane.top(o, 0, 0, zF + h)}>
          {[12, 26, 40, 54, 68].map((u, i) => (
            <rect key={u} x={u - 5} y={key[1] - 5} width={10} height={10} rx={1.4} fill={u === key[0] ? Z.accent : [Z.s3, Z.edgeHi, Z.accent, Z.text3, Z.s2][i]} stroke={u === key[0] ? Z.accent : Z.edge} {...fine} className={u === key[0] ? "glow-soft" : undefined} opacity={u === key[0] ? 1 : 0.75} />
          ))}
          {[4, 8, 12, 18, 26].map((w, i) => (
            <rect key={w} x={8 + [0, 6, 16, 30, 50][i]} y={10} width={w} height={4} rx={0.6} fill={Z.edgeHi} opacity={0.7} />
          ))}
          {[30, 22, 16].map((w, i) => (
            <rect key={w} x={8 + i * 24} y={22} width={w * 0.6} height={6 - i * 1.4} rx={0.6} fill={Z.text3} opacity={0.8} />
          ))}
        </g>
        <Guides o={o} corners={[[0, D], [W, D], [W, 0]]} z0={zF + h} z1={zC} />

        {/* components */}
        <Slab o={o} uid={uid} x={0} y={0} z={zC} w={W} d={D} h={h} />
        <g transform={plane.top(o, 0, 0, zC + h)}>
          <rect x={8} y={10} width={42} height={10} rx={1.6} fill={Z.s1} stroke={Z.edgeHi} {...fine} />
          <rect x={11} y={13.6} width={16} height={2.4} rx={1} fill={Z.text3} />
          <rect x={58} y={11} width={16} height={8} rx={4} fill={Z.s1} stroke={Z.edgeHi} {...fine} />
          <circle cx={70} cy={15} r={2.6} fill={Z.edgeHi} />
          <rect x={key[0] - 12} y={key[1] - 4.5} width={24} height={9} rx={4.5} fill={Z.accent} className="glow-soft" />
          <rect x={key[0] - 6} y={key[1] - 0.8} width={12} height={1.6} rx={0.8} fill={Z.bg} />
          <rect x={60} y={key[1] - 4.5} width={18} height={9} rx={4.5} fill="none" stroke={Z.edgeHi} {...fine} />
        </g>
        <Guides o={o} corners={[[0, D], [W, D], [W, 0]]} z0={zC + h} z1={zP} />

        {/* pattern: a sign-up form made of the components */}
        <Slab o={o} uid={uid} x={0} y={0} z={zP} w={W} d={D} h={h} />
        <g transform={plane.top(o, 0, 0, zP + h)}>
          <rect x={14} y={4} width={56} height={48} rx={2} fill={Z.s1} stroke={Z.edge} {...fine} />
          <rect x={20} y={8} width={20} height={2.6} rx={1} fill={Z.text2} />
          {[14, 25].map((v) => (
            <rect key={v} x={20} y={v} width={44} height={7} rx={1.2} fill={Z.s2} stroke={Z.edgeHi} {...fine} />
          ))}
          <rect x={key[0] - 12} y={key[1] - 4.5} width={24} height={9} rx={4.5} fill={Z.accent} className="glow-soft" />
        </g>
        <Guides o={o} corners={[[0, D], [W, D], [W, 0]]} z0={zP + h} z1={zR} />

        {/* the traced decision rising to the pattern and branching */}
        <Route points={route} kind="accent" r={2} end="none" />

        {/* products */}
        {products.map((p, i) => (
          <g key={i}>
            <Slab o={o} uid={uid} x={p[0]} y={0} z={zR} w={p[1] - p[0]} d={D} h={h} />
            <g transform={plane.top(o, p[0], 0, zR + h)}>
              <rect x={2} y={3} width={p[1] - p[0] - 4} height={5} rx={1} fill={Z.s1} stroke={Z.edge} {...fine} />
              {[14, 22].map((v) => (
                <rect key={v} x={3} y={v} width={p[1] - p[0] - 8} height={2.4} rx={1} fill={Z.text3} opacity={0.7} />
              ))}
              <rect x={pc(p) - p[0] - 7} y={key[1] - 3.5} width={14} height={7} rx={3.5} fill={Z.accent} className="glow-soft" />
            </g>
          </g>
        ))}
        {products.map((p, i) => (
          <Route key={i} points={branch(pc(p))} kind="accent" r={2} end="dot" />
        ))}

        {/* links from the spine to every layer, and feedback from the products */}
        {[zF + h, zC + h, zP + h].map((z) => (
          <Route key={z} points={isoRoute(o, [[spineX + 13, -18, z], [spineX + 13, 0, z]])} kind="neutral" r={1} end="dot" />
        ))}
        <Route points={isoRoute(o, [[pc(products[2]), 0, zR + h], [pc(products[2]), -21, zR + h + 12]])} kind="neutral-dashed" r={2} end="arrow" />

        {detail && (
          <g>
            <VizMarker x={iso(o, 0, D, zF + h)[0] - 16} y={iso(o, 0, D, zF + h)[1] + 2} n={1} tone="accent" />
            <VizMarker x={iso(o, 0, D, zC + h)[0] - 16} y={iso(o, 0, D, zC + h)[1]} n={2} />
            <VizMarker x={iso(o, 0, D, zP + h)[0] - 16} y={iso(o, 0, D, zP + h)[1]} n={3} />
            <VizMarker x={iso(o, 0, D, zR + h)[0] - 16} y={iso(o, 0, D, zR + h)[1]} n={4} />
            <VizMarker x={iso(o, spineX + 26, -24, zR)[0] + 16} y={iso(o, spineX + 26, -24, zR)[1]} n={5} />
            <VizMarker x={iso(o, pc(products[2]), -21, zR + h + 12)[0] - 18} y={iso(o, pc(products[2]), -21, zR + h + 12)[1] - 8} n={6} />
            <VizMarker x={iso(o, -10, D + 10, zU + 3)[0] - 16} y={iso(o, -10, D + 10, zU + 3)[1] + 4} n={7} />
          </g>
        )}
      </g>
    );
  },
};
