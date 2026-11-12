/**
 * Editorial callouts (v4). Each role has a coloured rule, a glyph and a written
 * label, so the role is never carried by colour alone. Use them for the
 * moments a reader should notice — never box every paragraph.
 * Tones reuse the pastel washes as *content-role* identity (DECISION_LOG D-030);
 * they never encode evidence strength or status.
 */
import type { ReactNode } from "react";

export type CalloutRole = "definition" | "analogy" | "example" | "note" | "formula" | "application" | "research" | "limitation" | "misconception";

const ROLE: Record<CalloutRole, { label: string; cls: string; glyph: string }> = {
  definition: { label: "Definition", cls: "cat-indigo", glyph: "≡" },
  analogy: { label: "An analogy", cls: "cat-violet", glyph: "≈" },
  example: { label: "Everyday examples", cls: "cat-teal", glyph: "→" },
  note: { label: "Note", cls: "cat-slate", glyph: "i" },
  formula: { label: "Formula", cls: "cat-blue", glyph: "ƒ" },
  application: { label: "In practice", cls: "cat-green", glyph: "✓" },
  research: { label: "Research findings", cls: "cat-cyan", glyph: "§" },
  limitation: { label: "Limitations", cls: "cat-amber", glyph: "!" },
  misconception: { label: "Common misreading", cls: "cat-rose", glyph: "×" },
};

/**
 * `landmark={false}` renders a note instead of a complementary landmark, for
 * long pages that repeat a role many times (axe: landmarks must be unique).
 */
export function Callout({ role, label, children, className = "", landmark = true }: { role: CalloutRole; label?: string; children: ReactNode; className?: string; landmark?: boolean }) {
  const r = ROLE[role];
  const Tag = landmark ? "aside" : "div";
  return (
    <Tag role={landmark ? undefined : "note"} className={`${r.cls} rounded-md border border-rule border-l-[3px] border-l-c bg-soft p-5 ${className}`} aria-label={label ?? r.label}>
      <p className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink-2">
        <span aria-hidden className="grid h-5 w-5 place-items-center rounded-xs bg-c-wash font-mono text-[11px] normal-case tracking-normal text-c-ink">
          {r.glyph}
        </span>
        {label ?? r.label}
      </p>
      <div className="mt-3 text-ink">{children}</div>
    </Tag>
  );
}
