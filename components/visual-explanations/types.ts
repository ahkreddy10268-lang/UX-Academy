/**
 * Visual Knowledge Engine — types (docs/VISUAL_KNOWLEDGE_SYSTEM.md).
 * Presentation metadata only: academic content stays in /content; a visual
 * explanation references an entry by slug and never duplicates its claims.
 */
import type { ComponentType } from "react";

/** The visual strategy chosen for what the knowledge *is* (spec Part 05). */
export type VisualType =
  | "isometric"
  | "system"
  | "process"
  | "comparison"
  | "conceptual"
  | "formula"
  | "annotated-interface"
  | "journey"
  | "decision"
  | "hierarchy";

/** 1 quick visual · 2 detailed explanation · 3 interactive model (spec Part 06). */
export type VisualLevel = 1 | 2 | 3;

export type VisualExplanation = {
  /** Stable id, e.g. "double-diamond.process". */
  id: string;
  /** The knowledge entry this explains. */
  slug: string;
  type: VisualType;
  level: VisualLevel;
  title: string;
  /** What am I looking at? — one sentence. */
  objective: string;
  /** What should I understand after looking at it? — one sentence. */
  takeaway: string;
  /** Text alternative: the diagram read in order. Also the mobile/list fallback. */
  summary: string[];
  /** "content-checked": every label restates the entry's sourced content. "illustrative": an example scenario, labelled as such. */
  verification: "content-checked" | "illustrative";
  /** Source ids the labels rest on (must be in the entry's references). */
  sources: string[];
  Component: ComponentType;
};

export const VISUAL_TYPE_LABEL: Record<VisualType, string> = {
  isometric: "Exploded interface",
  system: "System diagram",
  process: "Process diagram",
  comparison: "Before and after",
  conceptual: "Conceptual model",
  formula: "Formula anatomy",
  "annotated-interface": "Annotated interface",
  journey: "Journey map",
  decision: "Decision tree",
  hierarchy: "Hierarchy diagram",
};
