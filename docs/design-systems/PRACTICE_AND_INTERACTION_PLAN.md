# Practice and interaction plan — labs, workshops and capstone

> Phase 1 plan, 2026-11-10. Nothing here is implemented. Each experience is justified by what it teaches that a static figure cannot. Existing labs and workshops are reused where they already teach the skill. Calculated outputs use only `lib/formulas`; every simulation is labelled as a simulation, and nothing is presented as user-research data.

**Existing assets to reuse:** labs `type-scale-lab`, `contrast-lab`, `colour-lab`, `cvd-lab`, `responsive-lab`, `hierarchy-lab`, `gestalt-lab`; workshops `accessible-component`, `interface-critique`; `/system` live examples; `lib/formulas/visual.ts` (contrast, modular scale, grid).

**Priority order for building:** 2 → 6 → 5 → 8 → 1 → 3 → 7 → 4 → 9 (Token Lab and State Playground teach the two ideas learners most often get wrong; the capstone depends on the rest).

---

## 1. Design System Architecture Explorer

- **Purpose:** show how a decision travels Principles → Design language → Foundations → Tokens → Components → Patterns → Products, and how product feedback returns.
- **Learning objective:** predict what a change at one layer affects, and where a change should be made.
- **Flow:** choose a layer; select a decision (e.g. "primary action colour"); the explorer highlights its dependents downstream; switch on "change" to see affected components and patterns; a feedback route shows a product issue returning to the system.
- **Inputs:** layer and decision chosen from a fixed, illustrative model.
- **Outputs:** highlighted dependency path; a short explanation per affected node.
- **Evaluation:** three prediction questions ("If the spacing base changes, which of these change?") scored against the model.
- **Limitations:** the model is a teaching simplification; real systems have cross-cutting dependencies (content, motion) not drawn.
- **Connects to:** `design-system` (existing L1 plate and architecture figure), Stage 1.

## 2. Design Token Lab (highest priority)

- **Purpose:** practise primitive and semantic tiers and their mapping.
- **Learning objective:** create primitives, map semantic roles to them, switch themes and find mapping errors.
- **Flow:** (a) a neutral and an accent ramp are given as primitives; (b) the learner maps 10 semantic roles (surface, text, text-subtle, border, action, on-action, success, error, focus, disabled) for light and dark; (c) a live preview card and form update; (d) the lab checks every text/surface pair with the contrast formula and flags failures; (e) "find the bug" mode presents a broken mapping to repair.
- **Inputs:** role → primitive assignments; theme switch.
- **Outputs:** preview; pass/fail per pair with the computed ratio (`lib/formulas/visual.ts`); a token file view in DTCG-style JSON with aliases.
- **Evaluation:** all pairs meet WCAG thresholds (4.5:1 text, 3:1 non-text) in both themes; no component uses a primitive directly.
- **Limitations:** colour only; no typography or spacing tokens; contrast is necessary but not sufficient for accessibility.
- **Connects to:** `design-tokens`, `primitive-tokens`, `semantic-tokens`, `theme-architecture`, `colour-contrast-ratio`.

## 3. Theme and Multi-Brand Playground

- **Purpose:** see what a theme or brand may change and what must stay fixed.
- **Flow:** choose brand A/B and light/dark/high-contrast; edit one foundation token; affected components highlight; a "consistency check" lists what changed in behaviour (should be nothing) and what changed in value.
- **Inputs:** brand, theme, one token edit.
- **Outputs:** component previews; list of affected tokens and components; broken mappings flagged.
- **Evaluation:** learner identifies which changes belong in a brand layer and which would fork behaviour.
- **Limitations:** two illustrative brands; does not model governance cost.
- **Connects to:** `theme-architecture`, `multi-brand-systems`.

## 4. Visual Scale Workshop

- **Purpose:** see how scale decisions change a real composition.
- **Built from:** `type-scale-lab` (type ratio), `contrast-lab` and `colour-lab` (colour), `responsive-lab` (layout), plus new spacing and elevation panels.
- **Flow:** one article and one dashboard composition; adjust spacing base and steps, type ratio, elevation levels and icon size; side panel shows rule violations (off-scale values, elevation with no meaning, text below minimum size).
- **Outputs:** composition preview; scale sheet export (text).
- **Evaluation:** a short rubric: grouping readable, hierarchy clear, values on scale, contrast passes.
- **Limitations:** aesthetic quality is judged by rubric, not computed.
- **Connects to:** Stage 3 topics.

## 5. Component Specification Workshop

- **Purpose:** write a component as a contract.
- **Extends:** the existing `accessible-component` workshop.
- **Steps:** purpose and non-purpose → anatomy → properties (names, types, defaults, invalid combinations) → variants (with the reason for each) → state matrix (visual, keyboard, announcement) → accessibility (WCAG criteria) → responsive behaviour → usage and when-not → design/code contract.
- **Outputs:** a specification document in the Academy's workshop response store (local-first).
- **Evaluation:** checklist from TOPIC_LESSON_SPECIFICATION.md §7 plus peer-style self review with model answers.
- **Limitations:** no code generation; the learner's own design tool is used for visuals.
- **Connects to:** `component-architecture`, `variants`, `component-properties`, `component-state-management`; `/system/components/button` as the worked example.

## 6. Component State Playground

- **Purpose:** show that a correct default state is not a complete component.
- **Flow:** operate a toggle, a text field, a button with loading, and a disclosure with mouse, keyboard and a simulated screen-reader log; reveal each state and its transition; a "missing state" mode hides states and asks the learner to find what is undefined.
- **Inputs:** pointer and keyboard events; state toggles.
- **Outputs:** state diagram highlighting the current state; an announcement log describing what a screen reader would be told (labelled as a simulation of intended announcements, not real assistive-technology output).
- **Evaluation:** identify missing states and transitions in two broken components.
- **Limitations:** the announcement log is not a screen reader; real testing remains necessary.
- **Connects to:** `component-state-management`, `loading-states`, `error-states`, `interaction-states`.

## 7. Pattern Composition Workshop

- **Purpose:** choose and compose components to solve a task, judged by task fit rather than looks.
- **Tasks:** registration, sign-in, search and filtering, multi-step form, data exploration, confirmation, recovery from errors.
- **Flow:** pick components from a palette; arrange; define empty, loading and error behaviour; answer task-fit questions.
- **Evaluation:** rubric per task (e.g. error summary links to fields; empty state names its cause; table only when comparison is needed).
- **Limitations:** compositions are schematic.
- **Connects to:** Stage 4 patterns; `/system/patterns/*`.

## 8. Design System Audit Simulator

- **Purpose:** practise auditing and prioritising.
- **Material:** a clearly labelled **fictional** system with seeded problems: duplicated components, off-scale tokens, missing states, contrast failures, undocumented components, unclear ownership, design-code mismatch.
- **Flow:** inventory → log findings with evidence → rate impact and effort → prioritise → write the summary.
- **Evaluation:** compare findings with the seeded list; score reasoning, not only recall; no universal maturity score is produced.
- **Limitations:** fictional; real audits involve people and politics the simulator cannot model.
- **Connects to:** `design-system-audits`, `design-qa`, `design-governance`.

## 9. Capstone — create a mini design system

**Deliverables (each builds on a stage):**
1. Brief and principles (Stage 1)
2. Architecture and design language (Stage 1)
3. Token structure and one theme, with contrast proof (Stage 2)
4. Foundations: spacing, type, colour, elevation, icons, responsive rules (Stage 3)
5. Three components with full specifications and two patterns (Stage 4)
6. Documentation pages for one component and one pattern, using the Academy's documentation blocks as a model
7. Accessibility guidelines with WCAG criteria
8. Governance proposal: contribution criteria, decision rights, versioning policy (Stage 5)
9. Quality checklist and a short self-audit

**Evaluation:** a rubric aligned to the lesson checklist; each criterion has examples of meets / partly / not yet. Model answers based on an illustrative product (a library services app, consistent with examples elsewhere in the Academy).

**Limitations:** self-assessed; the Academy has no accounts or reviewers by design.

## Shared example contexts

Use a small set of consistent, clearly illustrative products across topics so learners recognise them: a **library services app** (already used across the Academy), a **banking dashboard**, a **government appointment service**, an **e-commerce checkout**, a **SaaS project tool**, and a **two-brand product family** for multi-brand topics. Real reference systems are cited for documented practice; their screens are never copied.
