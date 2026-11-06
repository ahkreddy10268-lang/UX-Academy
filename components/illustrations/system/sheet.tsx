/**
 * Instructional sheet kit (D-089; docs/ILLUSTRATION_SYSTEM.md § Visual
 * Learning System). For figures that teach by showing an interface, a
 * measurement, a sequence or a correction on a light/dark theme-aware sheet.
 * Colour comes only from application tokens (they follow the active theme);
 * strokes are non-scaling hairlines. Interface text is drawn as SVG text
 * because it is part of the depicted interface; explanatory labels appear only
 * in the hero variant and the plate's description carries the meaning.
 */
import type { ReactNode } from "react";

export const S = {
  surface: "var(--surface)",
  soft: "var(--soft)",
  sunken: "var(--sunken)",
  rule: "var(--rule)",
  ruleStrong: "var(--rule-strong)",
  control: "var(--line-control)",
  ink: "var(--ink)",
  ink2: "var(--ink-2)",
  ink3: "var(--ink-3)",
  accent: "var(--accent)",
  accentInk: "var(--accent-ink)",
  accentWash: "var(--accent-wash)",
  ok: "var(--ok)",
  okWash: "var(--ok-wash)",
  error: "var(--error)",
  errorWash: "var(--error-wash)",
  c: "var(--c)",
  cInk: "var(--c-ink)",
  cWash: "var(--c-wash)",
} as const;

const MONO = "var(--font-plex-mono), ui-monospace, monospace";
const SANS = "var(--font-plex-sans), ui-sans-serif, system-ui, sans-serif";
const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** The sheet: surface with a fine construction grid. */
export function SheetCanvas({ w, h, grid = true }: { w: number; h: number; grid?: boolean }) {
  return (
    <g>
      <rect width={w} height={h} fill={S.surface} />
      {grid && (
        <g opacity="0.55">
          {Array.from({ length: Math.floor(w / 20) }, (_, i) => (
            <line key={`x${i}`} x1={(i + 1) * 20} y1={0} x2={(i + 1) * 20} y2={h} stroke={S.rule} strokeWidth="0.5" />
          ))}
          {Array.from({ length: Math.floor(h / 20) }, (_, i) => (
            <line key={`y${i}`} x1={0} y1={(i + 1) * 20} x2={w} y2={(i + 1) * 20} stroke={S.rule} strokeWidth="0.5" />
          ))}
        </g>
      )}
    </g>
  );
}

/** Text drawn as part of a depicted interface. */
export function UiText({ x, y, children, size = 7, weight = 400, tone = "ink", anchor = "start", mono = false }: { x: number; y: number; children: ReactNode; size?: number; weight?: number; tone?: "ink" | "ink2" | "ink3" | "accent" | "surface" | "ok" | "error"; anchor?: "start" | "middle" | "end"; mono?: boolean }) {
  const fill = { ink: S.ink, ink2: S.ink2, ink3: S.ink3, accent: S.accentInk, surface: S.surface, ok: S.ok, error: S.error }[tone];
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} fontFamily={mono ? MONO : SANS}>
      {children}
    </text>
  );
}

/** A browser or app frame with a title bar. Children are drawn in frame coordinates. */
export function UiFrame({ x, y, w, h, url, children, shadow = true }: { x: number; y: number; w: number; h: number; url?: string; children?: ReactNode; shadow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {shadow && <rect x={1.5} y={3} width={w} height={h} rx={6} fill="var(--ill-shadow)" />}
      <rect width={w} height={h} rx={6} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
      <path d={`M0 14 H${w}`} stroke={S.rule} strokeWidth="0.8" {...hair} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={8 + i * 6} cy={7} r={1.6} fill={S.ruleStrong} />
      ))}
      {url && (
        <g>
          <rect x={30} y={3.5} width={Math.min(110, w - 40)} height={7} rx={3.5} fill={S.soft} />
          <UiText x={35} y={8.8} size={4.6} tone="ink3" mono>
            {url}
          </UiText>
        </g>
      )}
      <g transform="translate(0 14)">{children}</g>
    </g>
  );
}

/** A button: primary (filled), secondary (outlined) or ghost (text). */
export function UiButton({ x, y, w, h = 14, label, variant = "primary", focus = false }: { x: number; y: number; w: number; h?: number; label: string; variant?: "primary" | "secondary" | "ghost"; focus?: boolean }) {
  return (
    <g>
      {focus && <rect x={x - 2.5} y={y - 2.5} width={w + 5} height={h + 5} rx={h / 2 + 2.5} fill="none" stroke={S.accent} strokeWidth="1.2" {...hair} />}
      {variant !== "ghost" && <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={variant === "primary" ? S.accent : S.surface} stroke={variant === "primary" ? S.accent : S.control} strokeWidth="0.8" {...hair} />}
      <UiText x={x + w / 2} y={y + h / 2 + 2.3} size={6.2} weight={600} tone={variant === "primary" ? "surface" : "accent"} anchor="middle">
        {label}
      </UiText>
    </g>
  );
}

/** A labelled text field. */
export function UiField({ x, y, w, label, value, state = "default" }: { x: number; y: number; w: number; label: string; value?: string; state?: "default" | "focus" | "error" }) {
  const stroke = state === "focus" ? S.accent : state === "error" ? S.error : S.control;
  return (
    <g>
      <UiText x={x} y={y} size={5.4} weight={600} tone="ink2">
        {label}
      </UiText>
      <rect x={x} y={y + 3} width={w} height={13} rx={3} fill={S.surface} stroke={stroke} strokeWidth={state === "default" ? 0.8 : 1.2} {...hair} />
      {value && (
        <UiText x={x + 4} y={y + 11.6} size={6} tone="ink">
          {value}
        </UiText>
      )}
    </g>
  );
}

/** A small selectable chip (date, filter, tab). */
export function UiChip({ x, y, w, label, selected = false, disabled = false }: { x: number; y: number; w: number; label: string; selected?: boolean; disabled?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={12} rx={3} fill={selected ? S.accentWash : disabled ? S.sunken : S.surface} stroke={selected ? S.accent : S.control} strokeWidth={selected ? 1.1 : 0.7} strokeDasharray={disabled ? "1.6 1.4" : undefined} {...hair} />
      <UiText x={x + w / 2} y={y + 8} size={5.4} weight={selected ? 600 : 400} tone={selected ? "accent" : disabled ? "ink3" : "ink"} anchor="middle">
        {label}
      </UiText>
    </g>
  );
}

/**
 * Dimension line with end ticks and a value chip (measurement technique).
 * Horizontal or vertical, from (x1,y1) to (x2,y2).
 */
export function Measure({ x1, y1, x2, y2, value, tone = "ink", offset = 0, show = true }: { x1: number; y1: number; x2: number; y2: number; value?: string; tone?: "ink" | "accent" | "ok" | "error"; offset?: number; show?: boolean }) {
  const c = { ink: S.ink2, accent: S.accent, ok: S.ok, error: S.error }[tone];
  const horiz = Math.abs(y2 - y1) < Math.abs(x2 - x1);
  const t = 3;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const chipW = value ? value.length * 3.6 + 6 : 0;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="0.8" {...hair} />
      {horiz ? (
        <path d={`M${x1} ${y1 - t}V${y1 + t}M${x2} ${y2 - t}V${y2 + t}`} stroke={c} strokeWidth="0.8" {...hair} />
      ) : (
        <path d={`M${x1 - t} ${y1}H${x1 + t}M${x2 - t} ${y2}H${x2 + t}`} stroke={c} strokeWidth="0.8" {...hair} />
      )}
      {value && show && (
        <g transform={`translate(${mx + (horiz ? 0 : offset)} ${my + (horiz ? offset : 0)})`}>
          <rect x={-chipW / 2} y={-5} width={chipW} height={10} rx={2} fill={c} />
          <text x={0} y={2.4} textAnchor="middle" fontSize={6} fontWeight={600} fill={S.surface} fontFamily={MONO}>
            {value}
          </text>
        </g>
      )}
    </g>
  );
}

/** Numbered marker, optionally with a leader to the thing it names (dot at the target). */
export function Marker({ x, y, n, to, tone = "ink" }: { x: number; y: number; n: number | string; to?: [number, number]; tone?: "ink" | "accent" }) {
  const fill = tone === "accent" ? S.accent : S.ink;
  return (
    <g>
      {to && (
        <g>
          <line x1={x} y1={y} x2={to[0]} y2={to[1]} stroke={S.ink2} strokeWidth="0.7" {...hair} />
          <circle cx={to[0]} cy={to[1]} r={1.5} fill={S.ink2} />
        </g>
      )}
      <circle cx={x} cy={y} r={6} fill={fill} />
      <text x={x} y={y + 2.3} textAnchor="middle" fontSize={6.4} fontWeight={700} fill={S.surface} fontFamily={SANS}>
        {n}
      </text>
    </g>
  );
}

/** Good/poor verdict badge: tick or cross, never colour alone. */
export function Verdict({ x, y, ok, r = 7 }: { x: number; y: number; ok: boolean; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={ok ? S.okWash : S.errorWash} stroke={ok ? S.ok : S.error} strokeWidth="0.9" {...hair} />
      {ok ? (
        <path d={`M${x - r * 0.4} ${y} l${r * 0.28} ${r * 0.3} l${r * 0.55} -${r * 0.62}`} fill="none" stroke={S.ok} strokeWidth="1.4" {...hair} />
      ) : (
        <path d={`M${x - r * 0.35} ${y - r * 0.35} L${x + r * 0.35} ${y + r * 0.35} M${x + r * 0.35} ${y - r * 0.35} L${x - r * 0.35} ${y + r * 0.35}`} stroke={S.error} strokeWidth="1.4" {...hair} />
      )}
    </g>
  );
}

/** Short explanatory label (hero only), in the annotation voice. */
export function Note({ x, y, children, show = true, anchor = "start", tone = "ink2" }: { x: number; y: number; children: ReactNode; show?: boolean; anchor?: "start" | "middle" | "end"; tone?: "ink" | "ink2" | "accent" | "ok" | "error" }) {
  if (!show) return null;
  const fill = { ink: S.ink, ink2: S.ink2, accent: S.accentInk, ok: S.ok, error: S.error }[tone];
  return (
    <text x={x} y={y} fontSize={7.2} fill={fill} textAnchor={anchor} fontFamily={MONO} letterSpacing="0.02em">
      {children}
    </text>
  );
}

/** A pointer cursor at (x, y). */
export function Pointer({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 0 L0 12 L3.2 9.2 L5.6 14 L7.6 13 L5.2 8.4 L9.4 8.4 Z" fill={S.ink} stroke={S.surface} strokeWidth="0.8" strokeLinejoin="round" />;
}
