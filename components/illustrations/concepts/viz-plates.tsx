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
        <Slab o={o} uid={uid} x={0} y={0} z={zC} w={W} d={D} h={5} label={detail ? undefined : undefined} />
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
        <ModuleCard o={o} uid={uid} x={-74} y={74} w={30} d={16} label={detail ? "Search" : undefined} tab={false} />
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
            <Tag x={iso(o, W, 0, zN + 4)[0] + 10} y={iso(o, W, 0, zN + 4)[1] + 4} text="navigation" />
            <Tag x={iso(o, W, 0, zO + 5)[0] + 10} y={iso(o, W, 0, zO + 5)[1] + 4} text="organisation · labels" tone="accent" />
            <Tag x={iso(o, W, 0, zC + 5)[0] + 10} y={iso(o, W, 0, zC + 5)[1] + 4} text="content" />
            <Tag x={searchFrom[0] - 4} y={searchFrom[1] + 18} text="search: a second route" />
            <Tag x={browse[0][0] + 8} y={browse[0][1] - 12} text="browse route" tone="accent" />
            <Tag x={browse[3][0] + 10} y={browse[3][1] + 14} text="destination" tone="accent" />
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
  Art: ({ detail }) => {
    const cw = 74;
    const ch = 62;
    const gap = 16;
    const x0 = 22;
    const y0 = 96;
    const cx = (i: number) => x0 + i * (cw + gap);
    const fx = cx(2);
    const fy = 208;
    const states = ["ready", "pressed", "processing", "paid"];
    const card = (x: number, y: number, tone: "accent" | "neutral" | "positive" | "warning") => (
      <rect x={x} y={y} width={cw} height={ch} rx={6} fill={tone === "warning" ? Z.warningSoft : Z.s2} stroke={tone === "accent" ? Z.accent : tone === "positive" ? Z.positive : tone === "warning" ? Z.warning : Z.edge} strokeWidth="0.9" vectorEffect="non-scaling-stroke" className={tone === "accent" ? "glow-soft" : undefined} />
    );
    const bar = (x: number, y: number, w: number, tone: "text2" | "text3" = "text3") => <rect x={x} y={y} width={w} height={2.2} rx={1.1} fill={tone === "text2" ? Z.text2 : Z.text3} />;
    const btn = (x: number, y: number, kind: "outline" | "fill" | "disabled", label: string) => (
      <g>
        <rect x={x} y={y} width={52} height={13} rx={6.5} fill={kind === "fill" ? Z.accent : kind === "disabled" ? Z.s3 : Z.bg} stroke={kind === "disabled" ? Z.edge : Z.accent} strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
        <text x={x + 26} y={y + 8.8} textAnchor="middle" fontSize={5.8} fontWeight={600} fill={kind === "fill" ? Z.bg : kind === "disabled" ? Z.text3 : Z.accent} fontFamily="var(--font-plex-sans), sans-serif">
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
        {bar(cx(0) + 10, y0 + 12, 40, "text2")}
        {bar(cx(0) + 10, y0 + 18, 28)}
        {btn(cx(0) + 11, y0 + 36, "outline", "Pay £45")}
        {/* pressed */}
        {card(cx(1), y0, "accent")}
        {bar(cx(1) + 10, y0 + 12, 40, "text2")}
        {bar(cx(1) + 10, y0 + 18, 28)}
        {btn(cx(1) + 11, y0 + 36, "fill", "Pay £45")}
        <path transform={`translate(${cx(1) + 46} ${y0 + 42}) scale(0.8)`} d="M0 0 L0 12 L3.2 9.2 L5.6 14 L7.6 13 L5.2 8.4 L9.4 8.4 Z" fill={Z.text} stroke={Z.bg} strokeWidth="0.8" />
        {/* processing */}
        {card(cx(2), y0, "accent")}
        {bar(cx(2) + 10, y0 + 12, 40, "text2")}
        <circle cx={cx(2) + 18} cy={y0 + 30} r={5} fill="none" stroke={Z.edge} strokeWidth="1.4" />
        <path d={`M${cx(2) + 18} ${y0 + 25} A5 5 0 0 1 ${cx(2) + 23} ${y0 + 30}`} fill="none" stroke={Z.accent} strokeWidth="1.4" strokeLinecap="round" />
        <text x={cx(2) + 28} y={y0 + 32} fontSize={5.6} fill={Z.text2} fontFamily="var(--font-plex-sans), sans-serif">
          Paying…
        </text>
        {btn(cx(2) + 11, y0 + 42, "disabled", "Pay £45")}
        {/* paid: feedback */}
        {card(cx(3), y0, "positive")}
        <circle cx={cx(3) + 16} cy={y0 + 18} r={6} fill={Z.positiveSoft} stroke={Z.positive} strokeWidth="0.9" />
        <path d={`M${cx(3) + 13} ${y0 + 18} l2.2 2.2 l4.2 -4.4`} fill="none" stroke={Z.positive} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <text x={cx(3) + 26} y={y0 + 20} fontSize={6.2} fontWeight={600} fill={Z.text} fontFamily="var(--font-plex-sans), sans-serif">
          Paid £45
        </text>
        {bar(cx(3) + 10, y0 + 34, 46, "text2")}
        {bar(cx(3) + 10, y0 + 40, 34)}
        {bar(cx(3) + 10, y0 + 46, 24)}
        {/* failure and recovery */}
        <Route points={[[cx(2) + cw / 2, y0 + ch], [cx(2) + cw / 2, fy]]} kind="blocked" end="none" />
        {card(fx, fy, "warning")}
        <text x={fx + 10} y={fy + 16} fontSize={6.2} fontWeight={600} fill={Z.warning} fontFamily="var(--font-plex-sans), sans-serif">
          Not confirmed
        </text>
        {bar(fx + 10, fy + 24, 50, "text2")}
        {bar(fx + 10, fy + 30, 36)}
        <rect x={fx + 11} y={fy + 40} width={52} height={13} rx={6.5} fill="none" stroke={Z.text2} strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
        <text x={fx + 37} y={fy + 48.8} textAnchor="middle" fontSize={5.6} fontWeight={600} fill={Z.text} fontFamily="var(--font-plex-sans), sans-serif">
          Check status
        </text>
        <Route points={[[fx, fy + ch / 2], [cx(0) + cw / 2, fy + ch / 2], [cx(0) + cw / 2, y0 + ch]]} kind="neutral-dashed" r={6} end="arrow" />
        {detail && (
          <g>
            {states.map((t, i) => (
              <Tag key={t} x={cx(i)} y={y0 - 8} text={`${String(i + 1).padStart(2, "0")} ${t}`} tone={i === 3 ? "positive" : i ? "accent" : "text2"} />
            ))}
            <Tag x={fx + cw / 2 - 6} y={fy - 10} text="timeout · state unknown" tone="warning" anchor="end" />
            <Tag x={cx(0) + cw / 2 + 6} y={fy + ch / 2 + 12} text="recover: check status" />
            <Tag x={cx(1) - 4} y={y0 - 26} text="action" tone="accent" anchor="middle" />
            <Tag x={cx(3) + cw / 2} y={y0 - 26} text="feedback" tone="positive" anchor="middle" />
            <Tag x={x0} y={40} text="ONE CONTROL · FOUR STATES · ONE RECOVERY PATH" tone="text" />
          </g>
        )}
      </g>
    );
  },
};
