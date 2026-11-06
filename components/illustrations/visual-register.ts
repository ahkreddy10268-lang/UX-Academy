/**
 * Visual register: one record per registered Level-1 plate (tested), carrying
 * the figure's category and method (docs/ILLUSTRATION_SYSTEM.md § Visual
 * Learning System) and the library audit verdict of 2026-11-06:
 *   retain  — already teaches the concept and fits the system;
 *   refine  — sound composition, needs the current language (canvas, linework, annotation);
 *   replace — the composition itself is inadequate (generic, people instead of the mechanism, or misleading).
 * The migrated style is not recorded here: it is read from the plate's `canvas`.
 * Order follows the audit, not priority; priority comes from learning paths.
 */
import type { ExplanationMethod, Technique, VisualCategory } from "./visual-taxonomy";

export type VisualRecord = {
  category: VisualCategory;
  secondary?: VisualCategory[];
  method: ExplanationMethod;
  secondaryMethods?: ExplanationMethod[];
  techniques?: Technique[];
  review: "retain" | "refine" | "replace";
  note: string;
};

const r = (category: VisualCategory, method: ExplanationMethod, review: VisualRecord["review"], note: string, extra: Partial<VisualRecord> = {}): VisualRecord => ({ category, method, review, note, ...extra });

export const visualRegister: Record<string, VisualRecord> = {
  /* ---- pilots (v6) ---- */
  "fitts-law": r("ux-concept", "conceptual", "retain", "Pilot: target geometry with measured D, W, approach and the Shannon ID computed by lib/formulas.", { secondary: ["ui-anatomy"], techniques: ["measurement", "numbered-annotation"] }),
  "ui-design": r("ui-anatomy", "relationship", "retain", "Pilot: a realistic booking screen with numbered decisions, spacing measures and system feedback.", { secondaryMethods: ["conceptual"], techniques: ["interface-anatomy", "numbered-annotation", "measurement"] }),
  "double-diamond": r("ux-process", "process", "retain", "Pilot: two diamonds with divergence/convergence, four phases, outputs at each boundary and an iteration return.", { techniques: ["timeline"] }),
  "information-architecture": r("information-architecture", "hierarchy", "retain", "Pilot: organisation tree with labels, navigation, search and one traced route to a destination.", { secondaryMethods: ["relationship"], techniques: ["routed-connectors", "exploded-layers"] }),
  "accessibility-concept": r("usability-accessibility", "relationship", "retain", "Pilot: exploded access architecture; routes into the accessibility tree; one blocked route.", { secondaryMethods: ["comparison"], techniques: ["exploded-layers", "routed-connectors"] }),
  "interaction-design-discipline": r("interaction-design", "process", "retain", "Pilot: one control through idle, pressed, processing, done and failed-with-recovery states.", { secondaryMethods: ["relationship"], techniques: ["state-machine", "interface-anatomy"] }),

  /* ---- entry plates in the earlier pastel style ---- */
  "hick-hyman-law": r("ux-concept", "conceptual", "refine", "Binary tree of bits is accurate; needs the current linework and a link to choice count.", { techniques: ["decision-tree"] }),
  "gestalt-principles": r("visual-design", "comparison", "refine", "Four dot panels are correct but generic; show grouping inside a real interface fragment."),
  "cognitive-load-theory": r("ux-concept", "conceptual", "refine", "Sound mechanism (aperture, schema); redraw in the current language."),
  "millers-law": r("ux-concept", "comparison", "refine", "Chunking comparison is right; the note about four chunks must stay."),
  "jakobs-law": r("ux-concept", "comparison", "refine", "Familiar layouts transfer; needs realistic interfaces rather than placeholder windows."),
  "mental-models": r("ux-concept", "relationship", "replace", "Relies on a person figure; show conceptual model, system image and user model as a system."),
  affordances: r("ux-concept", "comparison", "replace", "Three isolated controls read as icons; show perceived versus actual action possibilities in context.", { secondary: ["interaction-design"] }),
  signifiers: r("interaction-design", "comparison", "replace", "A question mark beside a bar does not teach; show signifier present versus absent on one control."),
  "peak-end-rule": r("ux-concept", "conceptual", "refine", "Curve with peak and end is correct; keep it illustrative and label it so.", { techniques: ["chart"] }),
  "nielsen-usability-heuristics": r("evaluation-optimization", "hierarchy", "refine", "Ten-tile grid is an index, not an explanation; tie tiles to interface examples.", { secondary: ["usability-accessibility"] }),
  "steering-law": r("ux-concept", "conceptual", "refine", "Tunnel geometry is right; add width and length measures.", { techniques: ["measurement"] }),
  "keystroke-level-model": r("evaluation-optimization", "process", "refine", "Operator sequence is correct; needs real operator labels and timing scale.", { techniques: ["timeline"] }),
  "doherty-threshold": r("interaction-design", "conceptual", "refine", "Response-time scale is useful; mark it as the original claim's context, not a law."),
  "teslers-law": r("ux-concept", "comparison", "refine", "Balance metaphor is a metaphor; label it and show where complexity moves."),
  "serial-position-effect": r("ux-concept", "conceptual", "retain", "U-shaped recall chart communicates the effect clearly.", { techniques: ["chart"] }),
  "von-restorff-effect": r("ux-concept", "comparison", "refine", "Isolated item and recall bars are clear; refine linework."),
  "aesthetic-usability-effect": r("ux-concept", "comparison", "refine", "Two windows and bars; needs a realistic pair of interfaces."),
  "choice-overload": r("ux-concept", "comparison", "refine", "Assortment sizes are shown; avoid implying a universal effect (the entry reports mixed evidence)."),
  "working-memory-model": r("ux-concept", "relationship", "refine", "Components present; redraw as a system with the episodic buffer."),
  "recognition-over-recall": r("ux-concept", "comparison", "refine", "Menu versus blank prompt is right; make the interfaces believable."),
  "gulfs-of-execution-and-evaluation": r("interaction-design", "process", "refine", "Loop with two gulfs is correct; redraw with interface states."),
  "shneiderman-golden-rules": r("evaluation-optimization", "hierarchy", "refine", "Eight icons around a number read as an icon set; tie rules to interface cases."),
  "heuristic-evaluation": r("evaluation-optimization", "process", "refine", "Evaluators and merged findings are right; refine."),
  "cognitive-walkthrough": r("evaluation-optimization", "process", "refine", "Step questions per action are right; refine."),
  "usability-testing": r("evaluation-optimization", "process", "replace", "Room scene with people; show the interface under test, observed behaviour and findings.", { secondary: ["user-research"] }),
  "card-sorting": r("user-research", "hierarchy", "refine", "Cards into groups and a similarity matrix: correct; refine."),
  "system-usability-scale": r("evaluation-optimization", "conceptual", "refine", "Ten alternating items to a score is accurate; refine as an instrument diagram.", { techniques: ["chart"] }),
  "nasa-tlx": r("evaluation-optimization", "conceptual", "refine", "Six subscales as bars; label them.", { techniques: ["chart"] }),
  "net-promoter-score": r("evaluation-optimization", "conceptual", "refine", "Scale split into groups is right; refine.", { techniques: ["chart"] }),
  "task-success-rate": r("evaluation-optimization", "conceptual", "refine", "Successes with an interval: correct; refine.", { techniques: ["chart"] }),
  "ab-testing": r("evaluation-optimization", "comparison", "refine", "Two variants and distributions: correct; refine.", { techniques: ["chart"] }),
  "confidence-intervals": r("evaluation-optimization", "conceptual", "retain", "Repeated intervals around a true value: clear and accurate.", { techniques: ["chart"] }),
  "sample-size-estimation": r("evaluation-optimization", "comparison", "refine", "Sample spread versus interval width: correct; refine.", { techniques: ["chart"] }),
  usability: r("usability-accessibility", "relationship", "replace", "Three bars and a path are too generic for effectiveness, efficiency and satisfaction in a context of use."),
  "user-centred-design": r("ux-process", "process", "refine", "ISO cycle with users at the centre; avoid the people icon as the centre."),
  "user-experience": r("ux-concept", "relationship", "replace", "Abstract chart and windows do not show before, during and after use."),
  "human-computer-interaction": r("ux-concept", "relationship", "replace", "People figures carry the meaning; show person, task, technology and context as a system.", { secondary: ["interaction-design"] }),
  "jobs-to-be-done": r("user-research", "relationship", "refine", "Job, solution and outcome flow is right; refine.", { secondary: ["ux-process"] }),
  "heart-framework": r("evaluation-optimization", "hierarchy", "refine", "Goals-signals-metrics grid is correct; refine.", { techniques: ["chart"] }),
  "progressive-disclosure": r("interaction-design", "comparison", "refine", "Primary and deferred options: correct; refine."),
  wcag: r("usability-accessibility", "hierarchy", "replace", "Temple-with-pillars metaphor is a cliché; show principles, guidelines and success criteria as a hierarchy."),
  "colour-contrast-ratio": r("visual-design", "comparison", "refine", "Pair and ratio scale are right; refine with real text samples.", { secondary: ["usability-accessibility"], techniques: ["good-bad", "measurement"] }),
  "visual-hierarchy": r("visual-design", "comparison", "refine", "Numbered attention order on a page is the right idea; refine.", { techniques: ["numbered-annotation"] }),
  "modular-type-scale": r("visual-design", "hierarchy", "refine", "Ratio-driven sizes are shown; add the ratio and step labels.", { techniques: ["measurement"] }),
  "design-tokens": r("design-systems", "hierarchy", "refine", "Primitive to semantic to component is right; refine into a traced decision.", { secondaryMethods: ["relationship"] }),

  /* ---- planned-topic plates ---- */
  "design-thinking": r("ux-process", "process", "refine", "Five-mode cycle is acceptable for a planned topic; refine when the entry is written."),
  "atomic-design": r("design-systems", "hierarchy", "refine", "Atoms to pages flow is correct; refine when the entry is written."),
  "human-centred-design": r("ux-process", "process", "refine", "Concentric context is acceptable for a planned topic; refine with the entry."),

  /* ---- subject plates ---- */
  foundations: r("ux-concept", "relationship", "refine", "Subject identity plate; migrate after entry plates."),
  "laws-effects": r("ux-concept", "conceptual", "refine", "Scatter with trend is generic for the whole subject; migrate later.", { techniques: ["chart"] }),
  psychology: r("ux-concept", "conceptual", "refine", "Grid with attention focus; migrate later."),
  heuristics: r("evaluation-optimization", "comparison", "refine", "Inspection of a screen; migrate later."),
  research: r("user-research", "relationship", "refine", "Generic people icons; replace with research artefacts when migrated."),
  frameworks: r("ux-process", "conceptual", "refine", "Scaffold metaphor; migrate later."),
  interaction: r("interaction-design", "process", "refine", "Pointer, control, return arrow; migrate later."),
  visual: r("visual-design", "comparison", "refine", "Composition blocks; migrate later."),
  "type-colour": r("visual-design", "hierarchy", "refine", "Letterform and colour ramp; migrate later."),
  "design-systems": r("design-systems", "relationship", "refine", "Tokens to components; migrate later."),
  accessibility: r("usability-accessibility", "relationship", "refine", "Several access modes into one screen; migrate later."),
  content: r("ui-anatomy", "comparison", "refine", "Form with focused field and microcopy; migrate later."),
  product: r("ux-process", "process", "refine", "Discovery to metric; migrate later."),
  service: r("ux-process", "relationship", "refine", "Front stage and back stage; migrate later."),
  metrics: r("evaluation-optimization", "conceptual", "refine", "Distribution with interval; migrate later.", { techniques: ["chart"] }),
  dataviz: r("visual-design", "comparison", "refine", "Chart types; migrate later.", { techniques: ["chart"] }),
  ethics: r("ux-concept", "process", "refine", "Path with obstacle; migrate later."),
  emerging: r("interaction-design", "process", "refine", "Conversational turns; migrate later."),
  practice: r("wireframe-prototyping", "relationship", "refine", "Wireframe to specification; migrate later.", { secondary: ["design-systems"] }),
  ia: r("information-architecture", "hierarchy", "refine", "Columns with a found item; migrate later."),
};
