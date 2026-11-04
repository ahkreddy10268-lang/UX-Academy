/**
 * Editorial technical illustration kit (docs/ILLUSTRATION_SYSTEM.md § Editorial
 * technical system). Shared, server-renderable SVG primitives:
 *  - isometric projection (30°), boxes, and planes for drawing 2D content onto
 *    an isometric surface;
 *  - interface fragments (windows, text bars, buttons, charts);
 *  - human figures with real joints and poses, in a range of skin and hair tones;
 *  - devices, furniture, connectors, markers and contact shadows.
 * Colour comes only from the --ill-* roles in app/globals.css; linework uses the
 * .e / .m / .h classes so strokes stay hairline at every size.
 */
import type { ReactNode, SVGProps } from "react";

export type Pt = readonly [number, number];
const COS = 0.866;
const SIN = 0.5;

/** Project an isometric point (x right-down, y left-down, z up) from origin o. */
export const iso = (o: Pt, x: number, y: number, z = 0): Pt => [o[0] + (x - y) * COS, o[1] + (x + y) * SIN - z];
const pts = (a: Pt[]) => a.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

export const V = {
  plate: "var(--ill-plate)",
  edge: "var(--ill-edge)",
  mid: "var(--ill-mid)",
  lo: "var(--ill-lo)",
  hi: "var(--ill-hi)",
  top: "var(--ill-top)",
  left: "var(--ill-left)",
  right: "var(--ill-right)",
  focal: "var(--ill-focal)",
  focalL: "var(--ill-focal-left)",
  focalR: "var(--ill-focal-right)",
  deep: "var(--ill-deep)",
  nTop: "var(--ill-n-top)",
  nLeft: "var(--ill-n-left)",
  nRight: "var(--ill-n-right)",
  shadow: "var(--ill-shadow)",
  act: "var(--ill-act)",
  actWash: "var(--ill-act-wash)",
  good: "var(--ill-good)",
  cloth: "var(--ill-cloth-dark)",
} as const;

export type Tone = "neutral" | "cat" | "focal" | { top: string; left: string; right: string };
const TONES = {
  neutral: { top: V.nTop, left: V.nLeft, right: V.nRight },
  cat: { top: V.top, left: V.left, right: V.right },
  focal: { top: V.focal, left: V.focalL, right: V.focalR },
};
const toneOf = (t: Tone) => (typeof t === "string" ? TONES[t] : t);

/** The 400 × 300 (4:3) canvas every path scene uses. */
export function Canvas({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <svg viewBox="0 0 400 300" className="ill block h-auto w-full" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      <rect width="400" height="300" fill={V.plate} />
      {children}
    </svg>
  );
}

/** A box with three visible faces. */
export function IsoBox({ o, x = 0, y = 0, z = 0, w, d, h, tone = "neutral", edge = true }: { o: Pt; x?: number; y?: number; z?: number; w: number; d: number; h: number; tone?: Tone; edge?: boolean }) {
  const t = toneOf(tone);
  const P = (a: number, b: number, c: number) => iso(o, a, b, c);
  const top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const left = [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)];
  const right = [P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)];
  const cls = edge ? "e" : undefined;
  return (
    <g>
      <polygon points={pts(left)} fill={t.left} className={cls} />
      <polygon points={pts(right)} fill={t.right} className={cls} />
      <polygon points={pts(top)} fill={t.top} className={cls} />
    </g>
  );
}

/** Soft contact shadow on the ground under an object. */
export function IsoShadow({ o, x, y, w, d, spread = 4 }: { o: Pt; x: number; y: number; w: number; d: number; spread?: number }) {
  const p = [iso(o, x - spread, y + spread * 0.4, 0), iso(o, x + w + spread * 0.6, y + spread * 0.4, 0), iso(o, x + w + spread * 0.6, y + d + spread, 0), iso(o, x - spread, y + d + spread, 0)];
  return <polygon points={pts(p)} fill={V.shadow} />;
}

/** Flat floor tile with a fine grid: anchors a scene in space. */
export function IsoFloor({ o, w, d, step = 20, tone = V.top, x0 = 0, y0 = 0 }: { o: Pt; w: number; d: number; step?: number; tone?: string; x0?: number; y0?: number }) {
  const lines: ReactNode[] = [];
  for (let i = step; i < w; i += step) lines.push(<line key={`x${i}`} x1={iso(o, x0 + i, y0)[0]} y1={iso(o, x0 + i, y0)[1]} x2={iso(o, x0 + i, y0 + d)[0]} y2={iso(o, x0 + i, y0 + d)[1]} className="h" />);
  for (let j = step; j < d; j += step) lines.push(<line key={`y${j}`} x1={iso(o, x0, y0 + j)[0]} y1={iso(o, x0, y0 + j)[1]} x2={iso(o, x0 + w, y0 + j)[0]} y2={iso(o, x0 + w, y0 + j)[1]} className="h" />);
  return (
    <g>
      <polygon points={pts([iso(o, x0, y0), iso(o, x0 + w, y0), iso(o, x0 + w, y0 + d), iso(o, x0, y0 + d)])} fill={tone} className="m" />
      {lines}
    </g>
  );
}

/** Transforms that place 2D content (u right, v down) on an isometric surface. */
export const plane = {
  /** Lying flat on z: u → +x, v → +y. */
  top: (o: Pt, x: number, y: number, z = 0) => {
    const [X, Y] = iso(o, x, y, z);
    return `matrix(${COS},${SIN},${-COS},${SIN},${X},${Y})`;
  },
  /** Standing on the y = const face (faces lower-left): u → +x, v → down. */
  left: (o: Pt, x: number, y: number, z: number) => {
    const [X, Y] = iso(o, x, y, z);
    return `matrix(${COS},${SIN},0,1,${X},${Y})`;
  },
  /** Standing on the x = const face (faces lower-right): u → −y (screen right), v → down. Origin at the face's left (largest y) top corner. */
  right: (o: Pt, x: number, y: number, z: number) => {
    const [X, Y] = iso(o, x, y, z);
    return `matrix(${COS},${-SIN},0,1,${X},${Y})`;
  },
};

/* ------------------------------------------------------------------ */
/* Interface fragments (2D, drawn in panel coordinates)                 */
/* ------------------------------------------------------------------ */

export function Win({ w, h, children, fill = V.hi, bar = true, r = 3 }: { w: number; h: number; children?: ReactNode; fill?: string; bar?: boolean; r?: number }) {
  return (
    <g>
      <rect width={w} height={h} rx={r} fill={fill} className="e" />
      {bar && (
        <g>
          <line x1={0} y1={7} x2={w} y2={7} className="h" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={5 + i * 4.5} cy={3.6} r={1.2} fill={V.lo} />
          ))}
        </g>
      )}
      {children}
    </g>
  );
}

/** Text placeholder bars (no readable text: the drawing never carries meaning in words). */
export function Bars({ x, y, w, n = 3, gap = 5, h = 2.2, fill = V.mid, last = 0.62 }: { x: number; y: number; w: number; n?: number; gap?: number; h?: number; fill?: string; last?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x} y={y + i * gap} width={i === n - 1 ? w * last : w} height={h} rx={h / 2} fill={fill} opacity={0.7} />
      ))}
    </g>
  );
}

export function Pill({ x, y, w, h = 6, fill = V.focal, line = true }: { x: number; y: number; w: number; h?: number; fill?: string; line?: boolean }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} className={line ? "e" : undefined} />;
}

export function Check({ x, y, s = 1, color = V.good }: { x: number; y: number; s?: number; color?: string }) {
  return <path d={`M${x - 2.6 * s} ${y} l${1.9 * s} ${1.9 * s} l${3.6 * s} ${-4 * s}`} fill="none" stroke={color} strokeWidth={1.6 * s} strokeLinecap="round" strokeLinejoin="round" />;
}

/** Numbered focal marker (decorative numeral; meaning is carried by the page text). */
export function Marker({ x, y, n, r = 5.5 }: { x: number; y: number; n: number | string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={V.focal} className="e" />
      <text x={x} y={y + 2.6} textAnchor="middle" fontSize={r * 1.25} fontWeight={600} fill={V.hi} fontFamily="var(--font-plex-mono), ui-monospace, monospace">
        {n}
      </text>
    </g>
  );
}

/** Dashed connector with a small arrowhead at the end. */
export function Flow({ d, tip, angle, dashed = true }: { d: string; tip?: Pt; angle?: number; dashed?: boolean }) {
  const h = 3.6;
  return (
    <g>
      <path d={d} fill="none" className="m" strokeDasharray={dashed ? "2.5 2.5" : undefined} />
      {tip && angle !== undefined && (
        <polygon
          points={pts([tip, [tip[0] - Math.cos(angle - 0.45) * h, tip[1] - Math.sin(angle - 0.45) * h], [tip[0] - Math.cos(angle + 0.45) * h, tip[1] - Math.sin(angle + 0.45) * h]])}
          fill={V.mid}
        />
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Human figures                                                        */
/* ------------------------------------------------------------------ */

type J = readonly [number, number];
type Pose = { head: J; sh: [J, J]; hip: [J, J]; el: [J, J]; ha: [J, J]; kn: [J, J]; ft: [J, J] };
const STAND: Pose = { head: [0, -57], sh: [[-6.6, -48], [6.6, -48]], hip: [[-3.6, -28], [3.6, -28]], el: [[-8.4, -37.5], [8.4, -37.5]], ha: [[-8.6, -28.5], [8.6, -28.5]], kn: [[-3.6, -14], [3.6, -14]], ft: [[-3.8, -0.5], [3.8, -0.5]] };
export const POSES = {
  stand: STAND,
  /** Right hand raised toward something in front (to the right). */
  point: { ...STAND, el: [[-8.4, -37.5], [12.5, -43]], ha: [[-8.6, -28.5], [20, -46]] },
  /** Both hands in front of the chest (holding a phone or card). */
  hold: { ...STAND, el: [[-8.6, -37], [8.6, -37]], ha: [[-2.5, -40.5], [3.5, -41.5]] },
  /** Right hand reaching forward at waist height (touching a kiosk or screen). */
  reach: { ...STAND, el: [[-8.4, -37.5], [11, -38]], ha: [[-8.6, -28.5], [18.5, -36]] },
  /** Seated, both hands forward on a desk. */
  seated: { head: [1, -50], sh: [[-5.6, -41], [7.2, -41]], hip: [[-2.2, -22], [4.6, -22]], el: [[-1.5, -31], [11.5, -31]], ha: [[9, -29.5], [17, -29.5]], kn: [[8, -22.5], [12.5, -22.5]], ft: [[9, -1], [13.5, -1]] },
  /** Walking to the right. */
  walk: { ...STAND, el: [[-9, -38], [7, -36.5]], ha: [[-11, -30], [10.5, -29]], kn: [[-1, -14.5], [5, -14]], ft: [[-6.5, -0.5], [8.5, -0.5]] },
} satisfies Record<string, Pose>;

export type Skin = 1 | 2 | 3 | 4;
export type Hair = "short" | "long" | "bun" | "curly" | "crop" | "none";

function Limb({ a, b, c, w, fill }: { a: J; b: J; c: J; w: number; fill: string }) {
  const d = `M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]}`;
  return (
    <g>
      <path d={d} fill="none" stroke={V.edge} strokeWidth={w + 1.3} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={fill} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function HairShape({ style, h, color }: { style: Hair; h: J; color: string }) {
  const [x, y] = h;
  if (style === "none") return null;
  if (style === "curly")
    return (
      <g fill={color} className="e">
        {[-4.2, -1.4, 1.6, 4.4].map((dx, i) => (
          <circle key={i} cx={x + dx} cy={y - 4 + (i % 2) * 0.8} r={2.8} />
        ))}
      </g>
    );
  if (style === "long") return <path d={`M${x - 5.6} ${y + 5} C${x - 7} ${y - 6} ${x - 3} ${y - 7.6} ${x} ${y - 7.4} C${x + 4} ${y - 7.6} ${x + 7} ${y - 5} ${x + 5.8} ${y + 6} L${x + 3.4} ${y + 1} L${x - 3.2} ${y - 2.2} Z`} fill={color} className="e" />;
  if (style === "bun")
    return (
      <g fill={color} className="e">
        <circle cx={x + 1} cy={y - 8.4} r={2.6} />
        <path d={`M${x - 5.2} ${y - 0.5} C${x - 5.6} ${y - 7} ${x + 5.6} ${y - 7.6} ${x + 5.3} ${y - 0.8} C${x + 2} ${y - 4} ${x - 2} ${y - 4} ${x - 5.2} ${y - 0.5} Z`} />
      </g>
    );
  if (style === "crop") return <path d={`M${x - 5} ${y - 1.6} C${x - 4.6} ${y - 6.6} ${x + 4.6} ${y - 6.6} ${x + 5} ${y - 1.6} C${x + 2} ${y - 4} ${x - 2} ${y - 4} ${x - 5} ${y - 1.6} Z`} fill={color} className="e" />;
  return <path d={`M${x - 5.4} ${y + 0.6} C${x - 6} ${y - 7} ${x + 5.6} ${y - 7.8} ${x + 5.6} ${y - 1} L${x + 4.6} ${y - 2.6} C${x + 1} ${y - 3.8} ${x - 2.6} ${y - 3} ${x - 5.4} ${y + 0.6} Z`} fill={color} className="e" />;
}

/**
 * A person, drawn at about 62 units tall (feet at y = 0). Joints are real, so
 * hands meet the objects they use. `flip` mirrors the figure to face left.
 */
export function Figure({ x, y, s = 1, pose = "stand", skin = 2, hair = "short", hairTone = 1, top = V.focal, bottom = V.cloth, flip = false, children, ...rest }: { x: number; y: number; s?: number; pose?: keyof typeof POSES; skin?: Skin; hair?: Hair; hairTone?: 1 | 2 | 3 | 4; top?: string; bottom?: string; flip?: boolean; children?: ReactNode } & SVGProps<SVGGElement>) {
  const p: Pose = POSES[pose];
  const sk = `var(--ill-skin-${skin})`;
  const hc = `var(--ill-hair-${hairTone})`;
  const torso = `M${p.sh[0][0] - 0.6} ${p.sh[0][1] + 1} C${p.sh[0][0]} ${p.sh[0][1] - 2} ${p.sh[1][0]} ${p.sh[1][1] - 2} ${p.sh[1][0] + 0.6} ${p.sh[1][1] + 1} L${p.hip[1][0] + 1.4} ${p.hip[1][1] + 1} L${p.hip[0][0] - 1.4} ${p.hip[0][1] + 1} Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} {...rest}>
      {/* far leg and arm first, so the body overlaps them */}
      <Limb a={p.hip[0]} b={p.kn[0]} c={p.ft[0]} w={4.2} fill={bottom} />
      <ellipse cx={p.ft[0][0] + 1.2} cy={p.ft[0][1]} rx={2.8} ry={1.4} fill={V.edge} />
      <Limb a={p.hip[1]} b={p.kn[1]} c={p.ft[1]} w={4.2} fill={bottom} />
      <ellipse cx={p.ft[1][0] + 1.2} cy={p.ft[1][1]} rx={2.8} ry={1.4} fill={V.edge} />
      <Limb a={p.sh[0]} b={p.el[0]} c={p.ha[0]} w={3.4} fill={top} />
      <path d={torso} fill={top} className="e" />
      <rect x={p.head[0] - 1.4} y={p.head[1] + 4} width={2.8} height={4} fill={sk} />
      <circle cx={p.head[0]} cy={p.head[1]} r={5.2} fill={sk} className="e" />
      <HairShape style={hair} h={p.head} color={hc} />
      {children}
      <Limb a={p.sh[1]} b={p.el[1]} c={p.ha[1]} w={3.4} fill={top} />
      <circle cx={p.ha[0][0]} cy={p.ha[0][1]} r={1.7} fill={sk} className="e" />
      <circle cx={p.ha[1][0]} cy={p.ha[1][1]} r={1.7} fill={sk} className="e" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Devices and furniture                                                */
/* ------------------------------------------------------------------ */

/** Desk: a slab on four legs. */
export function Desk({ o, x, y, w, d, h = 24, tone = "neutral" as Tone }: { o: Pt; x: number; y: number; w: number; d: number; h?: number; tone?: Tone }) {
  return (
    <g>
      <IsoShadow o={o} x={x} y={y} w={w} d={d} />
      {[[x + 1, y + d - 3], [x + w - 3, y + d - 3], [x + w - 3, y + 1]].map(([a, b], i) => (
        <IsoBox key={i} o={o} x={a} y={b} z={0} w={2} d={2} h={h - 2} />
      ))}
      <IsoBox o={o} x={x} y={y} z={h - 2} w={w} d={d} h={2} tone={tone} />
    </g>
  );
}

/** Laptop on a surface at height z, screen standing along its back edge. */
export function Laptop({ o, x, y, z, w = 30, d = 20, screenH = 20, children }: { o: Pt; x: number; y: number; z: number; w?: number; d?: number; screenH?: number; children?: ReactNode }) {
  return (
    <g>
      <IsoBox o={o} x={x} y={y} z={z} w={w} d={d} h={1.4} tone="neutral" />
      <g transform={plane.top(o, x + 3, y + 5, z + 1.45)}>
        <rect width={w - 6} height={d - 9} rx={1} fill={V.nLeft} className="h" />
      </g>
      <IsoBox o={o} x={x} y={y - 1.2} z={z + 1.4} w={w} d={1.2} h={screenH} tone="neutral" />
      <g transform={plane.left(o, x + 1.6, y, z + 1.4 + screenH - 1.6)}>
        <rect width={w - 3.2} height={screenH - 3.2} rx={0.8} fill={V.hi} className="m" />
        {children}
      </g>
    </g>
  );
}

/** Monitor on a stand. Children are drawn on the screen (u right, v down; w × h). */
export function Monitor({ o, x, y, z, w = 40, h = 26, children }: { o: Pt; x: number; y: number; z: number; w?: number; h?: number; children?: ReactNode }) {
  return (
    <g>
      <IsoBox o={o} x={x + w / 2 - 6} y={y - 4} z={z} w={12} d={8} h={1} />
      <IsoBox o={o} x={x + w / 2 - 1.2} y={y - 1} z={z + 1} w={2.4} d={1.6} h={8} />
      <IsoBox o={o} x={x} y={y - 1.4} z={z + 8} w={w} d={1.4} h={h} />
      <g transform={plane.left(o, x + 1.4, y, z + 8 + h - 1.4)}>
        <rect width={w - 2.8} height={h - 2.8} rx={0.8} fill={V.hi} className="m" />
        {children}
      </g>
    </g>
  );
}

/** A phone held flat in 2D (front view). Content area is 12 × 21 from (1.5, 3). */
export function Phone({ x, y, s = 1, rot = 0, children }: { x: number; y: number; s?: number; rot?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-7.5} y={-13.5} width={15} height={27} rx={2.6} fill={V.edge} />
      <rect x={-6.2} y={-11.6} width={12.4} height={22.4} rx={1.4} fill={V.hi} />
      <g transform="translate(-6.2 -11.6)">{children}</g>
    </g>
  );
}

export function Plant({ o, x, y, z = 0 }: { o: Pt; x: number; y: number; z?: number }) {
  const [px, py] = iso(o, x + 3, y + 3, z + 8);
  return (
    <g>
      <IsoBox o={o} x={x} y={y} z={z} w={6} d={6} h={8} tone="cat" />
      <g fill={V.right} className="e">
        <ellipse cx={px - 3} cy={py - 6} rx={3} ry={6} transform={`rotate(-24 ${px - 3} ${py - 6})`} />
        <ellipse cx={px + 3} cy={py - 7} rx={3} ry={7} transform={`rotate(20 ${px + 3} ${py - 7})`} />
        <ellipse cx={px} cy={py - 9} rx={2.6} ry={8} />
      </g>
    </g>
  );
}

/** A wall clock, flat on a vertical left-facing wall. */
export function Clock({ o, x, y, z, r = 8 }: { o: Pt; x: number; y: number; z: number; r?: number }) {
  return (
    <g transform={plane.left(o, x, y, z)}>
      <circle cx={r} cy={r} r={r} fill={V.hi} className="e" />
      <path d={`M${r} ${r} L${r} ${r * 0.42} M${r} ${r} L${r * 1.45} ${r * 1.15}`} className="e" fill="none" />
    </g>
  );
}

export const ui = { Win, Bars, Pill, Check };

/* ------------------------------------------------------------------ */
/* Scene helpers added for the path artwork                             */
/* ------------------------------------------------------------------ */

/** Scenes are composed in a 296 × 222 design space and scaled to the 400 × 300 canvas. */
export function Scene({ children, k = 1.35, dx = 0, dy = 0 }: { children: ReactNode; k?: number; dx?: number; dy?: number }) {
  return <g transform={`translate(${dx} ${dy}) scale(${k})`}>{children}</g>;
}

/** A wall: a vertical plane on the y = const (back-left) or x = const (back-right) side. */
export function Wall({ o, side, len, h, x = 0, y = 0, fill = V.nTop }: { o: Pt; side: "left" | "right"; len: number; h: number; x?: number; y?: number; fill?: string }) {
  return side === "left" ? (
    <g transform={plane.left(o, x, y, h)}>
      <rect width={len} height={h} fill={fill} className="m" />
    </g>
  ) : (
    <g transform={plane.right(o, x, y + len, h)}>
      <rect width={len} height={h} fill={fill} className="m" />
    </g>
  );
}

/** Chair; `back` puts the backrest on the +x or +y side (the side away from what the sitter faces). */
export function Chair({ o, x, y, h = 14, tone = "cat" as Tone, back = "x" }: { o: Pt; x: number; y: number; h?: number; tone?: Tone; back?: "x" | "y" | "none" }) {
  return (
    <g>
      <IsoShadow o={o} x={x} y={y} w={12} d={12} spread={2} />
      <IsoBox o={o} x={x + 5} y={y + 5} z={0} w={2} d={2} h={h - 2} />
      {back === "y" && <IsoBox o={o} x={x} y={y + 10} z={h} w={12} d={2} h={14} tone={tone} />}
      <IsoBox o={o} x={x} y={y} z={h - 2} w={12} d={12} h={2} tone={tone} />
      {back === "x" && <IsoBox o={o} x={x + 10} y={y} z={h} w={2} d={12} h={14} tone={tone} />}
    </g>
  );
}

/** Sticky note lying on a vertical left-facing wall (u right, v down). */
export function Sticky({ x, y, w = 11, fill = V.left, rot = 0 }: { x: number; y: number; w?: number; fill?: string; rot?: number }) {
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + w / 2})`}>
      <rect x={x} y={y} width={w} height={w} rx={0.8} fill={fill} className="e" />
      <rect x={x + 2} y={y + 3} width={w - 4} height={1.2} rx={0.6} fill={V.mid} opacity={0.7} />
      <rect x={x + 2} y={y + 5.6} width={(w - 4) * 0.6} height={1.2} rx={0.6} fill={V.mid} opacity={0.7} />
    </g>
  );
}

/** Speech or system bubble (2D). */
export function Bubble({ x, y, w, h, tail = "left", fill = V.hi, children }: { x: number; y: number; w: number; h: number; tail?: "left" | "right" | "none"; fill?: string; children?: ReactNode }) {
  const t = tail === "left" ? `M${x + 6} ${y + h} l-4 6 l10 -6` : tail === "right" ? `M${x + w - 6} ${y + h} l4 6 l-10 -6` : "";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={fill} className="e" />
      {t && <path d={t} fill={fill} className="e" />}
      {t && <line x1={tail === "left" ? x + 3 : x + w - 15} y1={y + h} x2={tail === "left" ? x + 15 : x + w - 3} y2={y + h} stroke={fill} strokeWidth={1.6} />}
      {children}
    </g>
  );
}
