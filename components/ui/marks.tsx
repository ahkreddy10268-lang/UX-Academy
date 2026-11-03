import type { ContentStatus, Difficulty, EvidenceClass, KnowledgeType } from "@/lib/content/schema";
import {
  DIFFICULTY_LABEL,
  EVIDENCE_DESCRIPTION,
  EVIDENCE_LABEL,
  EVIDENCE_ORDER,
  STATUS_LABEL,
  TYPE_DESCRIPTION,
  TYPE_LABEL,
} from "@/lib/content/labels";

/** Knowledge type — set as a typographic label, never a coloured chip. */
export function TypeMark({ type, secondary = [] }: { type: KnowledgeType; secondary?: KnowledgeType[] }) {
  return (
    <span className="inline-flex items-baseline gap-1.5" title={TYPE_DESCRIPTION[type]}>
      <span className="label !text-accent">{TYPE_LABEL[type]}</span>
      {secondary.length > 0 && <span className="label">· {secondary.map((t) => TYPE_LABEL[t]).join(" · ")}</span>}
    </span>
  );
}

/**
 * Evidence class. Glyph: three bars filled according to the class's position
 * on the evidence scale. Always accompanied by the text label (not colour-only).
 */
export function EvidenceMark({ evidence, showLabel = true }: { evidence: EvidenceClass; showLabel?: boolean }) {
  const rank = EVIDENCE_ORDER.indexOf(evidence);
  const filled = evidence === "contested" ? 0 : rank <= 1 ? 3 : rank <= 4 ? 2 : 1;
  return (
    <span className="inline-flex items-center gap-2 text-sm text-ink-2" title={EVIDENCE_DESCRIPTION[evidence]}>
      <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden className="shrink-0">
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={i * 5}
            y={8 - i * 4}
            width="4"
            height={4 + i * 4}
            className={i < filled ? "fill-ink-2" : "fill-none stroke-ink-3"}
            strokeWidth="1"
          />
        ))}
        {evidence === "contested" && <path d="M0 11 L14 1" className="stroke-accent" strokeWidth="1.5" />}
      </svg>
      {showLabel && <span>{EVIDENCE_LABEL[evidence]}</span>}
    </span>
  );
}

const STATUS_TONE: Record<ContentStatus, string> = {
  planned: "text-ink-3 border-rule",
  "research-pending": "text-ink-3 border-rule",
  "research-completed": "text-info border-info/40",
  drafted: "text-warn border-warn/40",
  reviewed: "text-info border-info/40",
  published: "text-ok border-ok/40",
};

export function StatusMark({ status }: { status: ContentStatus }) {
  return (
    <span className={`inline-flex items-center rounded-xs border px-1.5 py-px text-xs font-medium ${STATUS_TONE[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

export function DifficultyMark({ level }: { level: Difficulty }) {
  const n = level === "beginner" ? 1 : level === "intermediate" ? 2 : 3;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink-2">
      <span aria-hidden className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-2 w-2 rounded-full border border-ink-2 ${i <= n ? "bg-ink-2" : ""}`} />
        ))}
      </span>
      {DIFFICULTY_LABEL[level]}
    </span>
  );
}
