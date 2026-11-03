/**
 * Editorial callouts (v3). Each role has its own pastel field and a written
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

export function Callout({ role, label, children, className = "" }: { role: CalloutRole; label?: string; children: ReactNode; className?: string }) {
  const r = ROLE[role];
  return (
    <aside className={`${r.cls} rounded-lg bg-c-wash p-5 ${className}`} aria-label={label ?? r.label}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.06em] text-c-ink">
        <span aria-hidden className="grid h-5 w-5 place-items-center rounded-full bg-surface font-mono text-[11px] normal-case tracking-normal">
          {r.glyph}
        </span>
        {label ?? r.label}
      </p>
      <div className="mt-3 text-ink">{children}</div>
    </aside>
  );
}
