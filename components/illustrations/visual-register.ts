/**
 * Visual register: one record per registered Level-1 plate (tested), carrying
 * the figure's category and method (docs/ILLUSTRATION_SYSTEM.md § Visual
 * Learning System) and the library audit verdict of 2026-11-06:
 *   retain  — already teaches the concept and fits the system;
 *   refine  — sound composition, needs the current language (canvas, linework, annotation);
 *   replace — the composition itself is inadequate (generic, people instead of the mechanism, or misleading).
 * The migrated style is not recorded here: it is read from the plate's `canvas`.
 * Session 25 (D-105) migrated every "refine" plate to the sheet and set it to
 * "retain"; two earlier-style plates are retained by decision.
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
  "hick-hyman-law": r("ux-concept", "conceptual", "retain", "Sheet (S25): 2, 4 and 8 choices as 1, 2 and 3 bits (lib/formulas) on a straight RT line; known mappings only.", { techniques: ["chart", "numbered-annotation"] }),
  "gestalt-principles": r("visual-design", "comparison", "retain", "Sheet (S25): the same six chips grouped four ways — proximity, similarity, common region, connectedness.", { techniques: ["good-bad", "numbered-annotation"] }),
  "cognitive-load-theory": r("ux-concept", "conceptual", "retain", "Sheet (S25): a chart with a separated legend feeding four working-memory slots (intrinsic, extraneous, free) and schema cards.", { techniques: ["numbered-annotation", "interface-anatomy"] }),
  "millers-law": r("ux-concept", "comparison", "retain", "Sheet (S25): eleven digits overflow four slots; chunk() recodes them into three units; not a menu rule.", { techniques: ["numbered-annotation"] }),
  "jakobs-law": r("ux-concept", "comparison", "retain", "Sheet (S25): three shops share conventions; your shop following them versus breaking them.", { techniques: ["good-bad", "interface-anatomy"] }),
  "mental-models": r("ux-concept", "relationship", "retain", "Replaced (D-093): conceptual model → editor screen (system image, saved state not shown) → user's model with one wrong link and one missing part; the direct channel crossed out.", { techniques: ["interface-anatomy", "good-bad"] }),
  affordances: r("ux-concept", "comparison", "retain", "Replaced (D-093): a phone inbox with a perceptible, a hidden and a false affordance, sorted into Gaver's possible × perceived grid.", { secondary: ["interaction-design"], secondaryMethods: ["hierarchy"], techniques: ["interface-anatomy", "numbered-annotation", "good-bad"] }),
  signifiers: r("interaction-design", "comparison", "retain", "Replaced (D-093): the same export control with the same hit area, without cues and with four numbered redundant signifiers.", { techniques: ["interface-anatomy", "numbered-annotation", "good-bad"] }),
  "peak-end-rule": r("ux-concept", "conceptual", "retain", "Sheet (S25): two experiences, peak and end circled, remembered values from lib/formulas peakEnd; duration neglect.", { techniques: ["chart", "numbered-annotation"] }),
  "nielsen-usability-heuristics": r("evaluation-optimization", "hierarchy", "retain", "Sheet (S25): ten numbered tabs beside a screen where five heuristics are visible; the key lists all ten.", { secondary: ["usability-accessibility"], techniques: ["interface-anatomy", "numbered-annotation"] }),
  "steering-law": r("ux-concept", "conceptual", "retain", "Sheet (S25): two tunnels with A/W from lib/formulas steeringId and a cascading menu as a tunnel.", { techniques: ["measurement", "numbered-annotation"] }),
  "keystroke-level-model": r("evaluation-optimization", "process", "retain", "Sheet (S25): renaming a file as M P BB H M 10K, times from lib/formulas parseKlm/klmTotal.", { techniques: ["timeline", "measurement"] }),
  "doherty-threshold": r("interaction-design", "conceptual", "retain", "Sheet (S25): fast and slow exchanges on a log time axis with the ~0.4 s mark labelled a rule of thumb.", { techniques: ["chart", "timeline"] }),
  "teslers-law": r("ux-concept", "comparison", "retain", "Sheet (S25): one phone field two ways above equal-length complexity bars split person/app/platform (illustrative).", { techniques: ["good-bad", "interface-anatomy"] }),
  "serial-position-effect": r("ux-concept", "conceptual", "retain", "U-shaped recall chart communicates the effect clearly.", { techniques: ["chart"] }),
  "von-restorff-effect": r("ux-concept", "comparison", "retain", "Sheet (S25): uniform list, list with an isolate, illustrative later recall, and an all-emphasised list.", { techniques: ["good-bad", "numbered-annotation"] }),
  "aesthetic-usability-effect": r("ux-concept", "comparison", "retain", "Sheet (S25): the same form plain and polished, same task outcome, illustrative perceived-ease bars.", { techniques: ["good-bad", "interface-anatomy"] }),
  "choice-overload": r("ux-concept", "comparison", "retain", "Sheet (S25): 6 versus 24 options, an illustrative spread of effects around zero, and the moderating conditions.", { techniques: ["chart", "numbered-annotation"] }),
  "working-memory-model": r("ux-concept", "relationship", "retain", "Sheet (S25): central executive, phonological loop, episodic buffer (2000), sketchpad and long-term memory.", { techniques: ["numbered-annotation"] }),
  "recognition-over-recall": r("ux-concept", "comparison", "retain", "Sheet (S25): a bare command prompt versus a menu whose visible options cue the answer.", { techniques: ["good-bad", "interface-anatomy"] }),
  "gulfs-of-execution-and-evaluation": r("interaction-design", "process", "retain", "Sheet (S25): goal and heating app across a shaded gulf; mapped controls and stated feedback bridge it.", { techniques: ["interface-anatomy", "numbered-annotation"] }),
  "shneiderman-golden-rules": r("evaluation-optimization", "hierarchy", "retain", "Sheet (S25): a three-screen delete dialogue placing seven of the eight rules; the key lists all eight.", { techniques: ["interface-anatomy", "numbered-annotation"] }),
  "heuristic-evaluation": r("evaluation-optimization", "process", "retain", "Sheet (S25): three evaluators' illustrative findings merged into one list with a missed problem and a severity scale.", { techniques: ["numbered-annotation"] }),
  "cognitive-walkthrough": r("evaluation-optimization", "process", "retain", "Sheet (S25): one step of a task with the four questions, answers and a failure story.", { techniques: ["interface-anatomy", "decision-tree"] }),
  "usability-testing": r("evaluation-optimization", "process", "retain", "Replaced (D-093): task card → interface under test with numbered observations → session timeline with time on task → findings by severity linked to evidence; illustrative session.", { secondary: ["user-research"], techniques: ["interface-anatomy", "timeline", "measurement"] }),
  "card-sorting": r("user-research", "hierarchy", "retain", "Sheet (S25): cards, one participant's named groups, and an illustrative agreement matrix.", { techniques: ["chart", "numbered-annotation"] }),
  "system-usability-scale": r("evaluation-optimization", "conceptual", "retain", "Sheet (S25): a completed ten-item questionnaire converted to a score by lib/formulas susScore.", { techniques: ["chart", "numbered-annotation"] }),
  "nasa-tlx": r("evaluation-optimization", "conceptual", "retain", "Sheet (S25): six 0–100 subscales with illustrative ratings and Raw TLX from lib/formulas nasaTlxRaw.", { techniques: ["chart", "measurement"] }),
  "net-promoter-score": r("evaluation-optimization", "conceptual", "retain", "Sheet (S25): the 0–10 scale in three groups, an illustrative sample and NPS with margin from lib/formulas nps.", { techniques: ["chart", "measurement"] }),
  "task-success-rate": r("evaluation-optimization", "conceptual", "retain", "Sheet (S25): ten illustrative attempts and 7/10 with its adjusted-Wald interval from lib/formulas taskSuccess.", { techniques: ["chart", "measurement"] }),
  "ab-testing": r("evaluation-optimization", "comparison", "retain", "Sheet (S25): random assignment to A and B, one metric, and the difference with a 95% CI from twoProportionTest.", { techniques: ["chart", "good-bad"] }),
  "confidence-intervals": r("evaluation-optimization", "conceptual", "retain", "Repeated intervals around a true value: clear and accurate.", { techniques: ["chart"] }),
  "sample-size-estimation": r("evaluation-optimization", "comparison", "retain", "Sheet (S25): discovery, estimation and comparison answers from lib/formulas, with dots in proportion.", { techniques: ["chart", "numbered-annotation"] }),
  usability: r("usability-accessibility", "relationship", "retain", "Replaced (D-093): one ticket machine in two contexts of use, each measured for effectiveness, efficiency and satisfaction; step counts follow the drawn routes.", { secondaryMethods: ["comparison"], techniques: ["interface-anatomy", "measurement", "good-bad"] }),
  "user-centred-design": r("ux-process", "process", "retain", "Sheet (S25): four ISO 9241-210 activities with artefacts, a requirements-met decision and iteration paths.", { techniques: ["timeline", "numbered-annotation"] }),
  "user-experience": r("ux-concept", "process", "retain", "Replaced (D-093): four touchpoints of one train journey before, during and after use, with the person's responses below a line separating what a team designs from what happens in the person.", { secondaryMethods: ["relationship"], techniques: ["interface-anatomy", "timeline"] }),
  "human-computer-interaction": r("ux-concept", "relationship", "retain", "Replaced (D-093): person, task, technology and context around the interaction loop; a changed context (desk → moving car) shifts two links; study–design–evaluate cycle.", { secondary: ["interaction-design"], techniques: ["routed-connectors"] }),
  "jobs-to-be-done": r("user-research", "relationship", "retain", "Sheet (S25): circumstance → job (functional, emotional, social) → competing solutions, illustrative.", { secondary: ["ux-process"], techniques: ["routed-connectors", "numbered-annotation"] }),
  "heart-framework": r("evaluation-optimization", "hierarchy", "retain", "Sheet (S25): HEART rows by Goals–Signals–Metrics columns, one illustrative row filled, one category skipped.", { techniques: ["numbered-annotation"] }),
  "progressive-disclosure": r("interaction-design", "comparison", "retain", "Sheet (S25): one export dialog collapsed and expanded, essential options unchanged.", { techniques: ["interface-anatomy", "good-bad"] }),
  wcag: r("usability-accessibility", "hierarchy", "retain", "Replaced (D-093): principles → guidelines (13, collapsed by range) → five real success criteria with levels; A ⊂ AA ⊂ AAA nest with AA as the usual target; non-normative Techniques."),
  "colour-contrast-ratio": r("visual-design", "comparison", "retain", "Sheet (S25): two fixed sample greys on white with ratios from lib/formulas contrastRatio (--sample-*, D-106).", { secondary: ["usability-accessibility"], techniques: ["measurement", "chart"] }),
  "visual-hierarchy": r("visual-design", "comparison", "retain", "Sheet (S25): the same event card flat and ordered, with the reading path drawn.", { techniques: ["good-bad", "interface-anatomy"] }),
  "modular-type-scale": r("visual-design", "hierarchy", "retain", "Sheet (S25): specimens at base × 1.25ⁱ from lib/formulas modularScale, and roles that use them.", { techniques: ["measurement", "numbered-annotation"] }),
  "design-system": r("design-systems", "relationship", "retain", "Exploded foundations · components · patterns · products with one decision traced from a token into three products; documentation and governance spine linked to every layer; feedback route back to the spine.", { secondaryMethods: ["hierarchy"], techniques: ["exploded-layers", "routed-connectors"] }),
  "design-tokens": r("design-systems", "hierarchy", "retain", "Sheet (S25): primitive → semantic → component references, the button they produce and platform outputs.", { secondaryMethods: ["relationship"], techniques: ["code-mapping", "routed-connectors"] }),
  "primitive-tokens": r("design-systems", "hierarchy", "retain", "Sheet (B1): a grey ramp numbered with gaps, semantic roles choosing steps, a crossed component-to-primitive link, and a spacing scale.", { secondaryMethods: ["relationship"], techniques: ["routed-connectors", "numbered-annotation"] }),
  "semantic-tokens": r("design-systems", "relationship", "retain", "Sheet (B1): one column of role names mapped to light and dark primitives, a contrast pair, and components that point only at roles.", { secondaryMethods: ["comparison"], techniques: ["routed-connectors", "code-mapping"] }),
  "theme-architecture": r("design-systems", "comparison", "retain", "Sheet (S32): one card component in light, dark and high-contrast themes drawn in the lessons' sample colours, the shared role names, each theme's mapping and two theme axes in resolution order.", { secondaryMethods: ["hierarchy"], techniques: ["code-mapping", "numbered-annotation"] }),
  "visibility-of-system-status": r("interaction-design", "process", "retain", "Sheet (S29): feedback matched to duration on a 0.1 / 1 / 10 s timeline, from pressed state to determinate progress with Cancel, and an announced status message.", { techniques: ["timeline", "interface-anatomy", "numbered-annotation"] }),
  "user-control-and-freedom": r("interaction-design", "conceptual", "retain", "Sheet (S29): immediate removal with a visible Undo, Escape and ⌘Z as exits, and a labelled Cancel against an ambiguous ×.", { secondaryMethods: ["comparison"], techniques: ["interface-anatomy", "good-bad", "numbered-annotation"] }),
  "consistency-principle": r("ux-concept", "comparison", "retain", "Sheet (S29): one action shown three ways across three screens versus one component, name and position on all three.", { secondary: ["design-systems"], techniques: ["good-bad", "numbered-annotation"] }),
  "error-prevention": r("interaction-design", "comparison", "retain", "Sheet (S29): slips prevented by a date constraint and a forgiving card-number format; a mistake prevented by previewing the consequence of a delete.", { techniques: ["interface-anatomy", "good-bad", "numbered-annotation"] }),
  "mapping": r("interaction-design", "comparison", "retain", "Sheet (S30): cooker knobs in a line with crossing links versus knobs arranged like the rings; directional slider and plus-above-minus conventions.", { secondary: ["ux-concept"], techniques: ["good-bad", "numbered-annotation"] }),
  "flexibility-and-efficiency-of-use": r("interaction-design", "relationship", "retain", "Sheet (S30): a menu path showing its shortcut and the shortcut itself converging on one result, with keystroke-level-model times from lib/formulas.", { secondaryMethods: ["comparison"], techniques: ["interface-anatomy", "measurement", "numbered-annotation"] }),
  "aesthetic-and-minimalist-design": r("visual-design", "comparison", "retain", "Sheet (S30): a cluttered home screen versus one that keeps the primary tasks labelled and defers secondary content behind one link.", { techniques: ["good-bad", "interface-anatomy", "numbered-annotation"] }),
  "error-recovery": r("interaction-design", "process", "retain", "Sheet (S31): a failed form with a linked error summary, a precise inline message with icon, kept input, and the three steps recognise, diagnose, recover.", { secondaryMethods: ["relationship"], techniques: ["interface-anatomy", "numbered-annotation"] }),
  "help-and-documentation": r("ux-concept", "hierarchy", "retain", "Sheet (S31): help at four depths on one screen — inline hint, toggletip, non-modal panel, full article — each linking to the next.", { secondary: ["interaction-design"], techniques: ["interface-anatomy", "numbered-annotation"] }),

  /* ---- planned-topic plates ---- */
  "design-thinking": r("ux-process", "process", "retain", "Sheet (S25, planned topic, labelled): five stages with artefacts and iteration returns.", { techniques: ["timeline", "numbered-annotation"] }),
  "atomic-design": r("design-systems", "hierarchy", "retain", "Sheet (S25, planned topic, labelled): atoms → molecule → organism → template → page, each built from the last.", { techniques: ["interface-anatomy", "numbered-annotation"] }),
  "human-centred-design": r("ux-process", "process", "retain", "Sheet (S25, planned topic, labelled): users, people affected and context as rings with an iterating path.", { techniques: ["numbered-annotation"] }),

  /* ---- subject plates ---- */
  foundations: r("ux-concept", "relationship", "retain", "Sheet (S25, subject): interface inside the experience band, an approach loop and a history line.", { techniques: ["numbered-annotation"] }),
  "laws-effects": r("ux-concept", "conceptual", "retain", "Sheet (S25, subject): six tiles for the domain's families, ending with evidence labels.", { techniques: ["numbered-annotation"] }),
  psychology: r("ux-concept", "conceptual", "retain", "Sheet (S25, subject): memory slots, a cue–action–outcome loop, pop-out search and a reach arc.", { techniques: ["numbered-annotation"] }),
  heuristics: r("evaluation-optimization", "comparison", "retain", "Sheet (S25, subject): a checklist held against a form, with one failing principle traced to its field.", { techniques: ["interface-anatomy", "numbered-annotation"] }),
  research: r("user-research", "relationship", "retain", "Sheet (S25, subject): plan and consent, interview and survey, clustered notes and a finding, a test task.", { techniques: ["numbered-annotation"] }),
  frameworks: r("ux-process", "conceptual", "retain", "Sheet (S25, subject): a process framework, a mapping workshop row and an analytical operator model.", { techniques: ["timeline", "numbered-annotation"] }),
  interaction: r("interaction-design", "process", "retain", "Sheet (S25, subject): one button's states, three input modalities and an easing curve.", { techniques: ["state-machine", "numbered-annotation"] }),
  visual: r("visual-design", "comparison", "retain", "Sheet (S25, subject): an article card on a four-column grid with shared edges, spacing and element samples.", { techniques: ["measurement", "interface-anatomy"] }),
  "type-colour": r("visual-design", "hierarchy", "retain", "Sheet (S25, subject): a type specimen on its metrics, a lightness ramp and a contrast pair.", { techniques: ["measurement", "numbered-annotation"] }),
  "design-systems": r("design-systems", "relationship", "retain", "Sheet (S25, subject): tokens, scale, component parts and a release card with a feedback loop.", { techniques: ["numbered-annotation"] }),
  accessibility: r("usability-accessibility", "relationship", "retain", "Sheet (S25, subject): one button reached by screen reader, keyboard, magnification and captions; a conformance badge.", { techniques: ["interface-anatomy", "routed-connectors"] }),
  content: r("ui-anatomy", "comparison", "retain", "Sheet (S25, subject): a sign-in form whose label, hint, error and verb do the work, and a style-guide card.", { techniques: ["interface-anatomy", "numbered-annotation"] }),
  product: r("ux-process", "process", "retain", "Sheet (S25, subject): problem, goal, roadmap, story and outcome with a return to discovery.", { techniques: ["timeline", "numbered-annotation"] }),
  service: r("ux-process", "relationship", "retain", "Sheet (S25, subject): a three-step service blueprint with the line of visibility.", { techniques: ["spatial-map", "numbered-annotation"] }),
  metrics: r("evaluation-optimization", "conceptual", "retain", "Sheet (S25, subject): a questionnaire item, a funnel, two estimates with intervals, and a formula card.", { techniques: ["chart", "numbered-annotation"] }),
  dataviz: r("visual-design", "comparison", "retain", "Sheet (S25, subject): the same four values as a table, bars and areas, and a line with an uncertainty band.", { techniques: ["chart", "good-bad"] }),
  ethics: r("ux-concept", "process", "retain", "Sheet (S25, subject): a nudging and an even-handed consent dialog, and the people affected.", { techniques: ["good-bad", "interface-anatomy"] }),
  emerging: r("interaction-design", "process", "retain", "Sheet (S25, subject): an AI answer with sources and uncertainty, a voice request and an anchored spatial label.", { techniques: ["interface-anatomy", "numbered-annotation"] }),
  practice: r("wireframe-prototyping", "relationship", "retain", "Sheet (S25, subject): a redlined design, its HTML, a loading timeline and a delivery board.", { secondary: ["design-systems"], techniques: ["code-mapping", "timeline"] }),
  ia: r("information-architecture", "hierarchy", "retain", "Sheet (S25): an indented site structure, the navigation bar and breadcrumb, and search reaching the same page.", { techniques: ["spatial-map", "numbered-annotation"] }),
};
