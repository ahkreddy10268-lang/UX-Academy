/**
 * Visual Learning System — the three independent dimensions (D-089;
 * docs/ILLUSTRATION_SYSTEM.md § Visual Learning System).
 *
 *  A. Category — WHAT a figure teaches (12 illustration categories). This is
 *     presentation metadata for figures; it is NOT the knowledge taxonomy,
 *     which stays frozen in content/taxonomy.ts.
 *  B. Method — HOW it teaches (5 canonical explanation methods).
 *  C. Language — HOW it looks (canvas + kit; see IllustrationEntry.canvas).
 *
 * Levels (1 Understand · 2 Explore · 3 Experiment) are a fourth axis already
 * carried by the registries. Techniques (annotation, measurement, charts…)
 * are compositional tools, not methods.
 */
import type { VisualType } from "../visual-explanations/types";

export const VISUAL_CATEGORIES = [
  { id: "ux-concept", title: "UX Concept Illustrations", scope: "UX principles, laws, cognitive effects, mental models, perception, behaviour, affordances and signifiers as concepts, design principles." },
  { id: "ui-anatomy", title: "UI Anatomy Illustrations", scope: "UI components and controls, interface regions, states, layout structure, anatomy, spacing and dimensions." },
  { id: "ux-process", title: "UX Process Illustrations", scope: "UX lifecycle, user- and human-centred design, design thinking, Double Diamond, discovery, ideation, prototyping, validation, iteration." },
  { id: "user-research", title: "User Research Illustrations", scope: "Interviews, surveys, observation, field studies, planning, sampling, affinity mapping, synthesis, personas, evidence, ethics." },
  { id: "information-architecture", title: "Information Architecture Illustrations", scope: "Organisation, labelling, navigation and search systems, taxonomies, hierarchies, sitemaps, findability, information scent." },
  { id: "interaction-design", title: "Interaction Design Illustrations", scope: "Interaction models, actions and responses, feedback, system status, states and transitions, constraints, error prevention and recovery, direct manipulation." },
  { id: "wireframe-prototyping", title: "Wireframe & Prototyping Illustrations", scope: "Wireframe fidelity, prototypes, task flows, paper prototypes, iteration and validation." },
  { id: "visual-design", title: "Visual Design & Composition Illustrations", scope: "Visual hierarchy, typography, colour, contrast, grids, alignment, spacing, Gestalt, composition, balance, negative space." },
  { id: "design-systems", title: "Design Systems Illustrations", scope: "Tokens, foundations, components, patterns, variants, governance, documentation, versioning, design-to-code." },
  { id: "usability-accessibility", title: "Usability & Accessibility Illustrations", scope: "Usability, effectiveness, efficiency and satisfaction, accessibility principles, WCAG, assistive technology, barriers, accommodation." },
  { id: "responsive-adaptive", title: "Responsive & Adaptive Design Illustrations", scope: "Responsive and adaptive layouts, breakpoints, fluid grids, viewport behaviour, reflow, content prioritisation, device differences." },
  { id: "evaluation-optimization", title: "UX Evaluation & Optimization Illustrations", scope: "Heuristic evaluation, usability testing, metrics and formulas, analytics, A/B testing, task success, experiments, improvement cycles." },
] as const;
export type VisualCategory = (typeof VISUAL_CATEGORIES)[number]["id"];

export const EXPLANATION_METHODS = [
  { id: "conceptual", title: "Conceptual & Metaphorical", purpose: "Make an abstract concept understandable; label metaphors as metaphors and show the real mechanism." },
  { id: "process", title: "Process & Sequential", purpose: "Show what happens over time: stages, decisions, feedback loops, inputs and outputs." },
  { id: "relationship", title: "Relationship & Systems", purpose: "Show how components connect and influence each other: dependencies, boundaries, feedback." },
  { id: "comparison", title: "Comparison & Contrast", purpose: "Show a meaningful difference in the same context, what changed and why it matters." },
  { id: "hierarchy", title: "Hierarchy & Classification", purpose: "Show organisation, levels and grouping with correct parent-child relations." },
] as const;
export type ExplanationMethod = (typeof EXPLANATION_METHODS)[number]["id"];

/** Default method for each Level-2 visual type; a figure may override it. */
export const METHOD_FOR_TYPE: Record<VisualType, ExplanationMethod> = {
  isometric: "relationship",
  system: "relationship",
  process: "process",
  timeline: "process",
  journey: "process",
  decision: "process",
  comparison: "comparison",
  conceptual: "conceptual",
  formula: "conceptual",
  "annotated-interface": "conceptual",
  hierarchy: "hierarchy",
};

/** Compositional techniques: tools inside a method, never a sixth method. */
export const TECHNIQUES = ["interface-anatomy", "numbered-annotation", "measurement", "chart", "timeline", "decision-tree", "state-machine", "exploded-layers", "routed-connectors", "good-bad", "code-mapping", "spatial-map"] as const;
export type Technique = (typeof TECHNIQUES)[number];

/** Canvases (dimension C): pastel (earlier plates), viz (dark technical), sheet (light instructional, theme-aware). */
export const CANVASES = ["pastel", "viz", "sheet"] as const;
