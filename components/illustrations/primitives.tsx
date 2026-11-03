/**
 * Shared drawing primitives. Every plate is built from these so stroke
 * weights, annotation typography and arrowheads stay consistent.
 * Colours come only from CSS variables:
 *   C.base (solid category shape) · C.soft (secondary) · C.ink (category line/text)
 *   C.line (neutral ink line) · C.mute (secondary neutral) · C.paper (knock-out)
 */
import type { ReactNode, SVGProps } from "react";

export const C = {
  base: "var(--c)",
  soft: "var(--c-soft)",
  wash: "var(--c-wash)",
  ink: "var(--c-ink)",
  line: "var(--ink)",
  mute: "var(--ink-3)",
  paper: "var(--paper)",
  surface: "var(--surface)",
} as const;

export const STROKE = { main: 2.25, fine: 1.25, hair: 0.9 } as const;

type G = SVGProps<SVGGElement>;

/** Monospaced annotation label (only rendered when `show`). */
export function Label({
  x,
  y,
  children,
  anchor = "middle",
  show = true,
  size = 11,
  tone = "ink",
  weight = 500,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  show?: boolean;
  size?: number;
  tone?: "ink" | "line" | "mute";
  weight?: number;
}) {
  if (!show) return null;
  const fill = tone === "ink" ? C.ink : tone === "line" ? C.line : C.mute;
  return (
    <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight={weight} fontFamily="var(--font-plex-mono), ui-monospace, monospace" style={{ letterSpacing: "0.02em" }}>
      {children}
    </text>
  );
}

/** Engineering-style dimension line with end ticks and a centred label. */
export function Dim({
  x1,
  y1,
  x2,
  y2,
  label,
  show = true,
  offset = -8,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: ReactNode;
  show?: boolean;
  offset?: number;
}) {
  if (!show) return null;
  const horizontal = Math.abs(y2 - y1) < Math.abs(x2 - x1);
  const t = 5;
  return (
    <g stroke={C.ink} strokeWidth={STROKE.fine} fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {horizontal ? (
        <>
          <line x1={x1} y1={y1 - t} x2={x1} y2={y1 + t} />
          <line x1={x2} y1={y2 - t} x2={x2} y2={y2 + t} />
        </>
      ) : (
        <>
          <line x1={x1 - t} y1={y1} x2={x1 + t} y2={y1} />
          <line x1={x2 - t} y1={y2} x2={x2 + t} y2={y2} />
        </>
      )}
      {label && (
        <g stroke="none">
          {horizontal ? (
            <Label x={(x1 + x2) / 2} y={(y1 + y2) / 2 + offset}>
              {label}
            </Label>
          ) : (
            <Label x={(x1 + x2) / 2 + (offset < 0 ? -10 : 10)} y={(y1 + y2) / 2 + 4} anchor={offset < 0 ? "end" : "start"}>
              {label}
            </Label>
          )}
        </g>
      )}
    </g>
  );
}

/** Arrow from (x1,y1) to (x2,y2) with a solid head. */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = C.line,
  width = STROKE.fine,
  head = 7,
  dashed = false,
  ...rest
}: { x1: number; y1: number; x2: number; y2: number; color?: string; width?: number; head?: number; dashed?: boolean } & G) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - Math.cos(a) * head;
  const hy = y2 - Math.sin(a) * head;
  const p = (ang: number) => `${hx + Math.cos(ang) * head * 0.55},${hy + Math.sin(ang) * head * 0.55}`;
  return (
    <g {...rest}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth={width} strokeDasharray={dashed ? "4 4" : undefined} />
      <polygon points={`${x2},${y2} ${p(a + Math.PI / 2)} ${p(a - Math.PI / 2)}`} fill={color} />
    </g>
  );
}

/** Curved arrow along a quadratic path. */
export function CurveArrow({ d, tip, angle, color = C.line, width = STROKE.fine, dashed = false, ...rest }: { d: string; tip: [number, number]; angle: number; color?: string; width?: number; dashed?: boolean } & G) {
  const [x, y] = tip;
  const h = 7;
  const p = (ang: number) => `${x - Math.cos(angle) * h + Math.cos(ang) * h * 0.55},${y - Math.sin(angle) * h + Math.sin(ang) * h * 0.55}`;
  return (
    <g {...rest}>
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dashed ? "4 4" : undefined} />
      <polygon points={`${x},${y} ${p(angle + Math.PI / 2)} ${p(angle - Math.PI / 2)}`} fill={color} />
    </g>
  );
}

/** A pointer cursor glyph with its tip at (x, y). */
export function Cursor({ x, y, scale = 1, ...rest }: { x: number; y: number; scale?: number } & G) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} {...rest}>
      <path d="M0 0 L0 19 L4.6 14.6 L8 22 L11 20.6 L7.7 13.4 L13.6 13.4 Z" fill={C.line} stroke={C.paper} strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  );
}

/** Circle node with neutral outline. */
export function Node({ cx, cy, r = 8, fill = C.base, stroke = C.line, width = STROKE.fine, ...rest }: { cx: number; cy: number; r?: number; fill?: string; stroke?: string; width?: number } & SVGProps<SVGCircleElement>) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={width} {...rest} />;
}

/** Rounded-corner rectangle with outline — the generic "UI element". */
export function Box({
  x,
  y,
  w,
  h,
  fill = C.surface,
  stroke = C.line,
  r = 3,
  width = STROKE.fine,
  dashed = false,
  ...rest
}: { x: number; y: number; w: number; h: number; fill?: string; stroke?: string; r?: number; width?: number; dashed?: boolean } & SVGProps<SVGRectElement>) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={width} strokeDasharray={dashed ? "4 3" : undefined} {...rest} />;
}

/** A miniature browser/app window frame used for interface examples. */
export function Window({ x, y, w, h, children, fill = C.surface }: { x: number; y: number; w: number; h: number; children?: ReactNode; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={fill} stroke={C.line} strokeWidth={STROKE.fine} />
      <line x1={x} y1={y + 14} x2={x + w} y2={y + 14} stroke={C.line} strokeWidth={STROKE.hair} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 8 + i * 7} cy={y + 7} r={2} fill={C.mute} />
      ))}
      {children}
    </g>
  );
}

/** Horizontal text-line placeholders (skeleton copy). */
export function Lines({ x, y, w, n = 3, gap = 8, color = C.mute, last = 0.6 }: { x: number; y: number; w: number; n?: number; gap?: number; color?: string; last?: number }) {
  return (
    <g stroke={color} strokeWidth={2.2} strokeLinecap="round" opacity={0.55}>
      {Array.from({ length: n }).map((_, i) => (
        <line key={i} x1={x} y1={y + i * gap} x2={x + (i === n - 1 ? w * last : w)} y2={y + i * gap} />
      ))}
    </g>
  );
}

/** Diagonal hatching fill (for "extraneous", "unknown" or "removed" regions). */
export function HatchDefs({ id, color = C.ink, gap = 6 }: { id: string; color?: string; gap?: number }) {
  return (
    <defs>
      <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2={gap} stroke={color} strokeWidth="1.4" />
      </pattern>
    </defs>
  );
}

export const rad = (deg: number) => (deg * Math.PI) / 180;
