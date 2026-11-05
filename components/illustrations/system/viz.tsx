/**
 * Dark technical editorial kit (illustration v6, D-086;
 * docs/ILLUSTRATION_SYSTEM.md § Dark technical editorial).
 *
 * Builds on the isometric projection in ./kit (`iso`, `plane`) and adds what
 * the v5 kit lacked: graphite materials with tonal gradients, a single
 * illuminated layer, exploded stacks, iso-aligned routed connectors with
 * junctions and blocked routes, flat module cards, technical labels set on
 * isometric planes, bracket annotations and contact shadows.
 *
 * Colour comes only from the --viz-* tokens in app/globals.css. Gradient ids
 * are scoped by the plate's `uid`, so several plates on one page never collide.
 * Everything renders on the server.
 */
import type { ReactNode } from "react";
import { iso, plane, type Pt } from "./kit";

export const Z = {
  bg: "var(--viz-bg)",
  s1: "var(--viz-surface-1)",
  s2: "var(--viz-surface-2)",
  s3: "var(--viz-surface-3)",
  edge: "var(--viz-edge)",
  edgeSoft: "var(--viz-edge-soft)",
  edgeHi: "var(--viz-edge-hi)",
  grid: "var(--viz-grid)",
  text: "var(--viz-text)",
  text2: "var(--viz-text-2)",
  text3: "var(--viz-text-3)",
  accent: "var(--viz-accent)",
  accentDeep: "var(--viz-accent-deep)",
  accentSoft: "var(--viz-accent-soft)",
  glow: "var(--viz-accent-glow)",
  positive: "var(--viz-positive)",
  positiveSoft: "var(--viz-positive-soft)",
  warning: "var(--viz-warning)",
  warningSoft: "var(--viz-warning-soft)",
  shadow: "var(--viz-shadow)",
} as const;

const MONO = "var(--font-plex-mono), ui-monospace, monospace";
const SANS = "var(--font-plex-sans), ui-sans-serif, system-ui, sans-serif";
const pts = (a: Pt[]) => a.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
const id = (uid: string, name: string) => `${uid}-${name}`;
const url = (uid: string, name: string) => `url(#${id(uid, name)})`;

/** Gradients the kit references. The plate renders this once per viz canvas. */
export function VizDefs({ uid }: { uid: string }) {
  return (
    <>
      <linearGradient id={id(uid, "top")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={Z.s3} />
        <stop offset="1" stopColor={Z.s2} />
      </linearGradient>
      <linearGradient id={id(uid, "side")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={Z.s2} />
        <stop offset="1" stopColor={Z.s1} />
      </linearGradient>
      <linearGradient id={id(uid, "lit")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={Z.accent} />
        <stop offset="1" stopColor={Z.accentDeep} />
      </linearGradient>
      <linearGradient id={id(uid, "glass")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={Z.accentSoft} stopOpacity="0.9" />
        <stop offset="1" stopColor={Z.s1} stopOpacity="0.55" />
      </linearGradient>
      <radialGradient id={id(uid, "bloom")}>
        <stop offset="0" stopColor={Z.glow} />
        <stop offset="1" stopColor={Z.glow} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={id(uid, "vignette")} cx="0.55" cy="0.45" r="0.75">
        <stop offset="0" stopColor={Z.s1} />
        <stop offset="1" stopColor={Z.bg} />
      </radialGradient>
      <pattern id={id(uid, "cells")} width="4" height="4" patternUnits="userSpaceOnUse">
        <path d="M4 0H0V4" fill="none" stroke={Z.edgeSoft} strokeWidth="0.4" />
      </pattern>
    </>
  );
}

/** The viz canvas background: vignette plus a faint engineering grid. */
export function VizCanvas({ uid, w, h, grid = true }: { uid: string; w: number; h: number; grid?: boolean }) {
  return (
    <g>
      <rect width={w} height={h} fill={url(uid, "vignette")} />
      {grid && (
        <g opacity="0.9">
          {Array.from({ length: Math.floor(w / 20) }, (_, i) => (
            <line key={`x${i}`} x1={(i + 1) * 20} y1={0} x2={(i + 1) * 20} y2={h} stroke={Z.grid} strokeWidth="0.5" />
          ))}
          {Array.from({ length: Math.floor(h / 20) }, (_, i) => (
            <line key={`y${i}`} x1={0} y1={(i + 1) * 20} x2={w} y2={(i + 1) * 20} stroke={Z.grid} strokeWidth="0.5" />
          ))}
        </g>
      )}
    </g>
  );
}

export type SlabState = "base" | "lit" | "glass" | "dim";

/**
 * An isometric slab: the basic unit of exploded architecture. `base` is
 * graphite with tonal gradients and a fine inner highlight; `lit` is the single
 * illuminated functional layer; `glass` is a translucent layer outlined in the
 * accent; `dim` recedes.
 */
export function Slab({ o, uid, x = 0, y = 0, z = 0, w, d, h, state = "base", label, labelTone, sub, labelSize = 6.2 }: { o: Pt; uid: string; x?: number; y?: number; z?: number; w: number; d: number; h: number; state?: SlabState; label?: string; labelTone?: "text" | "accent" | "dark"; sub?: string; labelSize?: number }) {
  const P = (a: number, b: number, c: number) => iso(o, a, b, c);
  const top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const left = [P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)];
  const right = [P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)];
  const stroke = state === "lit" || state === "glass" ? Z.accent : state === "dim" ? Z.edgeSoft : Z.edge;
  const fills =
    state === "lit"
      ? { top: url(uid, "lit"), left: Z.accentDeep, right: Z.accentSoft }
      : state === "glass"
        ? { top: url(uid, "glass"), left: Z.accentSoft, right: Z.s1 }
        : state === "dim"
          ? { top: Z.s1, left: Z.bg, right: Z.bg }
          : { top: url(uid, "top"), left: url(uid, "side"), right: Z.s1 };
  const tone = labelTone ?? (state === "lit" ? "dark" : state === "glass" ? "accent" : "text");
  const fill = tone === "accent" ? Z.accent : tone === "dark" ? Z.bg : Z.text;
  return (
    <g className={state === "lit" ? "glow" : undefined}>
      <polygon points={pts(left)} fill={fills.left} stroke={stroke} strokeWidth="0.7" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <polygon points={pts(right)} fill={fills.right} stroke={stroke} strokeWidth="0.7" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <polygon points={pts(top)} fill={fills.top} stroke={stroke} strokeWidth="0.8" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      {state === "base" && <polyline points={pts([P(x + 1.2, y + d - 0.8, z + h), P(x + w - 0.8, y + d - 0.8, z + h), P(x + w - 0.8, y + 1.2, z + h)])} fill="none" stroke={Z.edgeHi} strokeWidth="0.5" opacity="0.6" vectorEffect="non-scaling-stroke" />}
      {label && (
        <g transform={plane.top(o, x + w / 2, y + d / 2, z + h)}>
          <text x={0} y={sub ? -1 : 2.2} textAnchor="middle" fontSize={labelSize} fontWeight={600} fill={fill} fontFamily={SANS} letterSpacing="0.02em">
            {label}
          </text>
          {sub && (
            <text x={0} y={6} textAnchor="middle" fontSize={4.2} fill={tone === "dark" ? Z.bg : Z.text2} fontFamily={MONO}>
              {sub}
            </text>
          )}
        </g>
      )}
    </g>
  );
}

/** Soft contact shadow under a slab or stack. */
export function ContactShadow({ o, x, y, w, d, spread = 6 }: { o: Pt; x: number; y: number; w: number; d: number; spread?: number }) {
  const p = [iso(o, x - spread, y - spread * 0.3, 0), iso(o, x + w + spread, y - spread * 0.3, 0), iso(o, x + w + spread, y + d + spread, 0), iso(o, x - spread, y + d + spread, 0)];
  return <polygon points={pts(p)} fill={Z.shadow} opacity="0.55" />;
}

/** Bloom behind a focal object (keep to one per figure). */
export function Bloom({ uid, x, y, rx, ry }: { uid: string; x: number; y: number; rx: number; ry: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={url(uid, "bloom")} />;
}

/** Vertical alignment guides between exploded layers. */
export function Guides({ o, corners, z0, z1 }: { o: Pt; corners: [number, number][]; z0: number; z1: number }) {
  return (
    <g>
      {corners.map(([x, y], i) => {
        const a = iso(o, x, y, z0);
        const b = iso(o, x, y, z1);
        return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={Z.edge} strokeWidth="0.5" strokeDasharray="1.5 2" vectorEffect="non-scaling-stroke" />;
      })}
    </g>
  );
}

export type RouteKind = "accent" | "positive" | "blocked" | "neutral" | "neutral-dashed";

/** Orthogonal path through screen points with rounded corners. */
export function roundedPath(points: Pt[], r = 4): string {
  if (points.length < 2) return "";
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const l1 = Math.hypot(cx - px, cy - py) || 1;
    const l2 = Math.hypot(nx - cx, ny - cy) || 1;
    const k1 = Math.min(r, l1 / 2);
    const k2 = Math.min(r, l2 / 2);
    d += ` L${(cx - ((cx - px) / l1) * k1).toFixed(1)} ${(cy - ((cy - py) / l1) * k1).toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${(cx + ((nx - cx) / l2) * k2).toFixed(1)} ${(cy + ((ny - cy) / l2) * k2).toFixed(1)}`;
  }
  const last = points[points.length - 1];
  return `${d} L${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
}

/**
 * A routed connector. Kinds carry meaning beyond colour: accent = active,
 * accessible route (solid, illuminated); positive = successful outcome (solid);
 * blocked = barrier (dashed, ends in a cross); neutral = structural relation
 * (hairline), neutral-dashed = dependency or reference.
 */
export function Route({ points, kind = "accent", r = 4, end = "dot" }: { points: Pt[]; kind?: RouteKind; r?: number; end?: "dot" | "none" | "cross" | "arrow" }) {
  const d = roundedPath(points, r);
  const cls = kind === "accent" ? "va" : kind === "positive" ? "vp" : kind === "blocked" ? "vw" : "vn";
  const last = points[points.length - 1];
  const prev = points[points.length - 2] ?? last;
  const ang = Math.atan2(last[1] - prev[1], last[0] - prev[0]);
  const colour = kind === "accent" ? Z.accent : kind === "positive" ? Z.positive : kind === "blocked" ? Z.warning : Z.edgeHi;
  const terminal = kind === "blocked" ? "cross" : end;
  return (
    <g>
      <path d={d} className={`${cls} ${kind === "accent" ? "glow-soft" : ""}`} strokeDasharray={kind === "neutral-dashed" ? "2 2" : undefined} />
      <Junction x={points[0][0]} y={points[0][1]} kind={kind} />
      {terminal === "dot" && <Junction x={last[0]} y={last[1]} kind={kind} />}
      {terminal === "cross" && (
        <g transform={`translate(${last[0]} ${last[1]})`}>
          <circle r={3.6} fill={Z.warningSoft} stroke={Z.warning} strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
          <path d="M-1.6 -1.6 L1.6 1.6 M1.6 -1.6 L-1.6 1.6" stroke={Z.warning} strokeWidth="1.1" strokeLinecap="round" />
        </g>
      )}
      {terminal === "arrow" && (
        <polygon
          points={pts([last, [last[0] - Math.cos(ang - 0.5) * 4, last[1] - Math.sin(ang - 0.5) * 4], [last[0] - Math.cos(ang + 0.5) * 4, last[1] - Math.sin(ang + 0.5) * 4]])}
          fill={colour}
        />
      )}
    </g>
  );
}

/** A junction node on a route. */
export function Junction({ x, y, kind = "accent" }: { x: number; y: number; kind?: RouteKind }) {
  const c = kind === "accent" ? Z.accent : kind === "positive" ? Z.positive : kind === "blocked" ? Z.warning : Z.edgeHi;
  return <circle cx={x} cy={y} r={1.6} fill={c} className={kind === "accent" ? "glow-soft" : undefined} />;
}

/** Route through isometric points (x, y, z), so connectors follow the same grid as the slabs. */
export const isoRoute = (o: Pt, p: [number, number, number][]): Pt[] => p.map(([x, y, z]) => iso(o, x, y, z));

/**
 * A flat module card lying on the ground plane (like an input or service
 * module): graphite with a cell texture, an index tab and a label set on the plane.
 */
export function ModuleCard({ o, uid, x, y, w, d, label, state = "base", tab = true, axis = "x" }: { o: Pt; uid: string; x: number; y: number; w: number; d: number; label?: string; state?: "base" | "blocked" | "active"; tab?: boolean; /** Direction the card runs and its label reads: "x" (down-right) or "y" (up-right, toward the back). */ axis?: "x" | "y" }) {
  const edge = state === "blocked" ? Z.warning : state === "active" ? Z.accent : Z.edge;
  return (
    <g>
      <Slab o={o} uid={uid} x={x} y={y} z={0} w={w} d={d} h={2.2} state="base" />
      <g transform={plane.top(o, x, y, 2.2)}>
        <rect x={0.8} y={0.8} width={w - 1.6} height={d - 1.6} rx={1} fill={url(uid, "cells")} opacity="0.7" />
        <rect x={0} y={0} width={w} height={d} rx={1.2} fill="none" stroke={edge} strokeWidth="0.7" vectorEffect="non-scaling-stroke" strokeDasharray={state === "blocked" ? "2 1.6" : undefined} />
        {tab && (axis === "x" ? <rect x={2.4} y={d - 4} width={5} height={1.6} rx={0.8} fill={state === "blocked" ? Z.warning : Z.accent} /> : <rect x={w - 4} y={d - 7.4} width={1.6} height={5} rx={0.8} fill={state === "blocked" ? Z.warning : Z.accent} />)}
        {label &&
          (axis === "x" ? (
            <text x={w / 2 + 3} y={d / 2 + 2} textAnchor="middle" fontSize={5.4} fontWeight={600} fill={Z.text} fontFamily={SANS}>
              {label}
            </text>
          ) : (
            <text transform={`translate(${w / 2 + 1.9} ${d / 2 - 2}) rotate(-90)`} textAnchor="middle" fontSize={5.4} fontWeight={600} fill={Z.text} fontFamily={SANS}>
              {label}
            </text>
          ))}
      </g>
    </g>
  );
}

/** Small monospace technical label in screen space, with an optional leader to its subject. */
export function Tag({ x, y, text, tone = "text2", anchor = "start", show = true, leader, index }: { x: number; y: number; text: string; tone?: "text" | "text2" | "accent" | "positive" | "warning"; anchor?: "start" | "middle" | "end"; show?: boolean; leader?: Pt; index?: string }) {
  if (!show) return null;
  const fill = tone === "text" ? Z.text : tone === "accent" ? Z.accent : tone === "positive" ? Z.positive : tone === "warning" ? Z.warning : Z.text2;
  return (
    <g>
      {leader && <line x1={leader[0]} y1={leader[1]} x2={x + (anchor === "end" ? 2 : anchor === "start" ? -2 : 0)} y2={y - 2.4} stroke={Z.edge} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />}
      <text x={x} y={y} textAnchor={anchor} fontSize={6.4} fill={fill} fontFamily={MONO} letterSpacing="0.04em">
        {index && <tspan fill={Z.text3}>{index} </tspan>}
        {text}
      </text>
    </g>
  );
}

/** Corner brackets framing an annotation area (decision and callout groups). */
export function Brackets({ x, y, w, h, l = 4, tone = "edge" }: { x: number; y: number; w: number; h: number; l?: number; tone?: "edge" | "accent" | "positive" | "warning" }) {
  const c = tone === "accent" ? Z.accent : tone === "positive" ? Z.positive : tone === "warning" ? Z.warning : Z.edgeHi;
  const d = `M${x} ${y + l}V${y}H${x + l} M${x + w - l} ${y}H${x + w}V${y + l} M${x + w} ${y + h - l}V${y + h}H${x + w - l} M${x + l} ${y + h}H${x}V${y + h - l}`;
  return <path d={d} fill="none" stroke={c} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />;
}

/** A floating 2D callout card in screen space (status, metric or outcome). */
export function Callout({ x, y, w, h, tone = "neutral", children }: { x: number; y: number; w: number; h: number; tone?: "neutral" | "accent" | "positive" | "warning"; children?: ReactNode }) {
  const edge = tone === "accent" ? Z.accent : tone === "positive" ? Z.positive : tone === "warning" ? Z.warning : Z.edge;
  const fill = tone === "positive" ? Z.positiveSoft : tone === "warning" ? Z.warningSoft : tone === "accent" ? Z.accentSoft : Z.s2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={fill} stroke={edge} strokeWidth="0.8" vectorEffect="non-scaling-stroke" className={tone === "accent" ? "glow-soft" : undefined} />
      {children}
    </g>
  );
}
