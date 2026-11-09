/**
 * Instructional sheet kit (D-089; docs/ILLUSTRATION_SYSTEM.md § Visual
 * Learning System). For figures that teach by showing an interface, a
 * measurement, a sequence or a correction on a light/dark theme-aware sheet.
 * Colour comes only from application tokens (they follow the active theme);
 * strokes are non-scaling hairlines.
 *
 * Text standard (D-101): the hero plate renders about 314 CSS px wide on a
 * 390 px phone (scale 0.785), so every SVG text is at least T.min = 13 units
 * (≈ 10.2 CSS px there) and marker numerals 15 units (≈ 11.8 px). Only
 * essential interface strings and marker numerals are drawn as text;
 * explanations live in the plate's HTML `key`, and non-essential interface copy
 * is drawn as text bars. tests/illustrations.test.ts enforces the minimum.
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
/** Minimum and preferred SVG text sizes for sheet plates (plate units, 400-unit-wide viewBox). */
export const T = { min: 13, ui: 13, strong: 16, title: 17, marker: 16 } as const;

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
export function UiText({ x, y, children, size = T.ui, weight = 400, tone = "ink", anchor = "start", mono = false }: { x: number; y: number; children: ReactNode; size?: number; weight?: number; tone?: "ink" | "ink2" | "ink3" | "accent" | "surface" | "ok" | "error"; anchor?: "start" | "middle" | "end"; mono?: boolean }) {
  const fill = { ink: S.ink, ink2: S.ink2, ink3: S.ink3, accent: S.accentInk, surface: S.surface, ok: S.ok, error: S.error }[tone];
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} fontFamily={mono ? MONO : SANS}>
      {children}
    </text>
  );
}

/** A browser or app frame with a 22-unit title bar. Children are drawn in frame coordinates below the bar. The address bar is drawn as a pill without text (decorative). */
export function UiFrame({ x, y, w, h, children, shadow = true }: { x: number; y: number; w: number; h: number; url?: string; children?: ReactNode; shadow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {shadow && <rect x={1.5} y={3} width={w} height={h} rx={8} fill="var(--ill-shadow)" />}
      <rect width={w} height={h} rx={8} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
      <path d={`M0 22 H${w}`} stroke={S.rule} strokeWidth="0.8" {...hair} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={12 + i * 9} cy={11} r={2.6} fill={S.ruleStrong} />
      ))}
      {w > 120 && <rect x={46} y={6} width={Math.min(120, w - 60)} height={10} rx={5} fill={S.soft} />}
      <g transform="translate(0 22)">{children}</g>
    </g>
  );
}

/** A button: primary (filled), secondary (outlined) or ghost (text). Height 26, label 13. */
export function UiButton({ x, y, w, h = 26, label, variant = "primary", focus = false }: { x: number; y: number; w: number; h?: number; label: string; variant?: "primary" | "secondary" | "ghost"; focus?: boolean }) {
  return (
    <g>
      {focus && <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={9} fill="none" stroke={S.accent} strokeWidth="1.4" {...hair} />}
      {variant !== "ghost" && <rect x={x} y={y} width={w} height={h} rx={6} fill={variant === "primary" ? S.ink : S.surface} stroke={variant === "primary" ? S.ink : S.control} strokeWidth="0.9" {...hair} />}
      <UiText x={x + w / 2} y={y + h / 2 + 4.6} weight={600} tone={variant === "primary" ? "surface" : "ink"} anchor="middle">
        {label}
      </UiText>
    </g>
  );
}

/** A labelled text field: label 13 above a 28-unit control. */
export function UiField({ x, y, w, label, value, state = "default" }: { x: number; y: number; w: number; label: string; value?: string; state?: "default" | "focus" | "error" }) {
  const stroke = state === "focus" ? S.accent : state === "error" ? S.error : S.control;
  return (
    <g>
      <UiText x={x} y={y} weight={600} tone="ink2">
        {label}
      </UiText>
      <rect x={x} y={y + 6} width={w} height={28} rx={5} fill={S.surface} stroke={stroke} strokeWidth={state === "default" ? 0.9 : 1.4} {...hair} />
      {value && (
        <UiText x={x + 8} y={y + 25}>
          {value}
        </UiText>
      )}
    </g>
  );
}

/** A selectable chip (time slot, filter, tab): 24 high, label 13. Disabled chips are dashed and struck through, so the state never rests on colour. */
export function UiChip({ x, y, w, label, selected = false, disabled = false }: { x: number; y: number; w: number; label: string; selected?: boolean; disabled?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={24} rx={5} fill={selected ? S.accentWash : disabled ? S.sunken : S.surface} stroke={selected ? S.accent : S.control} strokeWidth={selected ? 1.4 : 0.8} strokeDasharray={disabled ? "2 1.8" : undefined} {...hair} />
      <UiText x={x + w / 2} y={y + 16.5} weight={selected ? 700 : 400} tone={selected ? "accent" : disabled ? "ink3" : "ink"} anchor="middle">
        {label}
      </UiText>
      {disabled && <line x1={x + 8} y1={y + 12} x2={x + w - 8} y2={y + 12} stroke={S.ink3} strokeWidth="0.9" {...hair} />}
    </g>
  );
}

/** Greeked copy: a line of text drawn as a bar, for interface copy that is not essential. */
export function TextBar({ x, y, w, strong = false }: { x: number; y: number; w: number; strong?: boolean }) {
  return <rect x={x} y={y} width={w} height={5} rx={2.5} fill={strong ? S.ink3 : S.ruleStrong} opacity={strong ? 0.55 : 0.8} />;
}

/**
 * Dimension line with end ticks and a value chip (measurement technique).
 * Horizontal or vertical, from (x1,y1) to (x2,y2).
 */
export function Measure({ x1, y1, x2, y2, value, tone = "ink", offset = 0, show = true }: { x1: number; y1: number; x2: number; y2: number; value?: string; tone?: "ink" | "accent" | "ok" | "error"; offset?: number; show?: boolean }) {
  const c = { ink: S.ink2, accent: S.accent, ok: S.ok, error: S.error }[tone];
  const horiz = Math.abs(y2 - y1) < Math.abs(x2 - x1);
  const t = 5;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const chipW = value ? value.length * 7.8 + 12 : 0;
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
          <rect x={-chipW / 2} y={-10} width={chipW} height={20} rx={4} fill={c} />
          <text x={0} y={4.6} textAnchor="middle" fontSize={T.min} fontWeight={600} fill={S.surface} fontFamily={MONO}>
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
          <line x1={x} y1={y} x2={to[0]} y2={to[1]} stroke={S.ink2} strokeWidth="0.9" {...hair} />
          <circle cx={to[0]} cy={to[1]} r={2.2} fill={S.ink2} />
        </g>
      )}
      <circle cx={x} cy={y} r={11} fill={fill} stroke={S.surface} strokeWidth="1.5" {...hair} />
      <text x={x} y={y + 5.6} textAnchor="middle" fontSize={T.marker} fontWeight={700} fill={S.surface} fontFamily={SANS}>
        {n}
      </text>
    </g>
  );
}

/** Good/poor verdict badge: tick or cross, never colour alone. */
export function Verdict({ x, y, ok, r = 9 }: { x: number; y: number; ok: boolean; r?: number }) {
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

/** A pointer cursor at (x, y), drawn at size s without a scale transform (the text test forbids scaled groups). */
export function Pointer({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const pts: [number, number][] = [[0, 0], [0, 12], [3.2, 9.2], [5.6, 14], [7.6, 13], [5.2, 8.4], [9.4, 8.4]];
  const d = pts.map(([a, b], i) => `${i ? "L" : "M"}${(x + a * s).toFixed(2)} ${(y + b * s).toFixed(2)}`).join(" ") + " Z";
  return <path d={d} fill={S.ink} stroke={S.surface} strokeWidth="0.8" strokeLinejoin="round" />;
}
