/**
 * HTML/CSS primitives for visual explanations. Diagrams are built from real
 * text and layout (not raster images or text-in-SVG where avoidable), so they
 * reflow on phones, stay searchable, scale with the reader's font size and are
 * read in order by assistive technology. SVG is used only for shapes and
 * connectors, coloured through CSS variables (docs/DIAGRAM_DESIGN_GUIDELINES.md).
 */
import type { ReactNode } from "react";

/** Numbered marker linking a diagram part to its legend entry. */
export function Marker({ n, tone = "accent" }: { n: number | string; tone?: "accent" | "c" | "ink" }) {
  const cls = tone === "c" ? "bg-c-ink text-surface" : tone === "ink" ? "bg-ink text-surface" : "bg-accent text-surface";
  return (
    <span aria-hidden className={`formula inline-grid h-6 min-w-6 shrink-0 place-items-center rounded-full px-1 text-xs font-semibold leading-none ${cls}`}>
      {n}
    </span>
  );
}

export type LegendItem = { key: ReactNode; label: ReactNode };

export function Legend({ items, title = "Key" }: { items: LegendItem[]; title?: string }) {
  return (
    <div>
      <p className="label">{title}</p>
      <ul className="mt-2 grid gap-x-6 gap-y-1.5 text-sm text-ink-2 @2xl:grid-cols-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">{it.key}</span>
            <span>{it.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Directional connector that turns from horizontal (wide screens) to vertical (phones). */
/** `turn` sets the container width at which the arrow turns from pointing down to pointing right. */
export function FlowArrow({ label, turn = "@3xl:rotate-0", fixed }: { label?: string; turn?: string; fixed?: "right" | "down" }) {
  const rotation = fixed === "right" ? "" : fixed === "down" ? "rotate-90" : `rotate-90 ${turn}`;
  return (
    <span className="flex items-center justify-center gap-1 text-ink-3" aria-hidden>
      <svg viewBox="0 0 24 24" className={`h-6 w-6 ${rotation}`} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h17M14 6l6 6-6 6" />
      </svg>
      {label && <span className="text-xs font-medium">{label}</span>}
    </span>
  );
}

/** A labelled node: the basic unit of system and hierarchy diagrams. */
export function DiagramNode({ title, children, tone = "surface", className = "" }: { title: ReactNode; children?: ReactNode; tone?: "surface" | "wash" | "soft" | "accent"; className?: string }) {
  const bg = tone === "wash" ? "bg-c-wash" : tone === "soft" ? "bg-soft" : tone === "accent" ? "bg-accent-wash" : "bg-surface";
  return (
    <div className={`rounded-md border border-rule ${bg} p-3 ${className}`}>
      <p className="t-sub text-sm text-ink">{title}</p>
      {children && <div className="mt-1 text-sm text-ink-2">{children}</div>}
    </div>
  );
}

/** Small pill tag used for modes, systems and statuses inside diagrams. */
export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "c" | "accent" }) {
  const cls = tone === "c" ? "bg-c-wash text-c-ink" : tone === "accent" ? "bg-accent-wash text-accent-ink" : "bg-sunken text-ink-2";
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>{children}</span>;
}

/** "Illustrative" badge — required on any scenario that is an example rather than a finding. */
export function IllustrativeBadge({ children = "Illustrative example" }: { children?: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-dashed border-planned-line px-2 py-0.5 text-xs font-medium text-planned">{children}</span>;
}
