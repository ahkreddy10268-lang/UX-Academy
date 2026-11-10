# Topic research matrix — all 29 Design Systems topics

> Phase 1 blueprint. Checked against the live taxonomy (`content/taxonomy.ts`, generated `docs/KNOWLEDGE_TAXONOMY.md`) on 2026-11-10: **29 topics, 2 published (`design-system`, `design-tokens`), 27 planned.** IDs and types below are the canonical ones. Nothing here is content; it specifies what each future entry must teach and what it rests on.

**Reading the rows.**
- *Rule kinds* are labelled: **[standard]** normative (WCAG), **[platform]** platform convention, **[system]** a reference system's own rule, **[industry]** strong cross-system practice, **[context]** depends on the product, **[team]** a local decision.
- *Sources*: registry IDs that already exist are in `code`; proposed new records are marked **new** and listed in [SOURCE_AND_EVIDENCE_PLAN.md](SOURCE_AND_EVIDENCE_PLAN.md).
- *Visuals*: L1 plate (every published entry needs one, tested), L2 explanation, L3 explorer or lab. "Justified" means the knowledge benefits from it; otherwise none is planned.
- *Academy links*: `/system/...` pages are UX Academy's own design system, used as a case study, never as the definition.

---

## A. System foundations (8)

### 1. `design-system` — Design System · concept · **published**
- **Purpose:** know what a design system contains and why it is more than a component library; decide whether one is worth its cost.
- **Core concepts:** principles, design language, foundations, tokens, components, patterns, documentation, governance; style guide vs UI kit vs component library vs pattern library; system as product.
- **Status of teaching:** published (session 22) with plate and two L2 figures. Phase 2 action: add the good/bad and when-not sections from the new lesson specification, link to the curriculum stages, and reference UX4G as a public-service case.
- **Principles and rules:** a system serves products, not itself **[industry]**; documentation and governance are part of the system **[system: Atlassian About, GOV.UK community]**.
- **Use / not use:** multiple teams building similar interfaces; vs a single short-lived site where a style sheet is enough.
- **Comparison:** two teams building the same checkout, one with shared components and tokens, one copying screens; show divergence after one brand change.
- **Correction exercise:** turn an inconsistent screen set into an inventory and a first token list.
- **References:** `govuk-design-system`, `carbon-design-system`, `uswds`, `adobe-spectrum`, `frost-2016`, `kholmatova-2017`, `curtis-2009`, `semver-2`; **new** `ux4g-design-system`.
- **Dependencies:** none (entry point). **Visuals:** existing L1 + 2 L2; L3 = Architecture Explorer (planned).
- **Assessment:** classify artefacts (style guide, UI kit, library, system); write a one-page case for or against a system.
- **Academy links:** `/system` overview as a worked case.

### 2. `atomic-design` — Atomic Design · **methodology** · planned
- **Purpose:** use Frost's five-stage model to reason about composition, and know where strict classification stops helping.
- **Core concepts:** atoms, molecules, organisms, templates, pages; interface inventory; composition vs classification; alternatives (feature-based, compound components, primitives + patterns).
- **Principles and rules:** compose from smaller parts **[industry]**; the stages are a mental model, not a folder structure required by anyone **[industry]**.
- **Use:** teaching composition; auditing duplication; early system design. **Not use:** forcing every component into exactly one stage (debates over whether a card is a molecule or organism waste time); naming code packages after chemistry when the team does not think that way.
- **Comparison:** the same search header classified two ways; show that both work and that the argument adds no user value.
- **Correction exercise:** re-group an over-nested "atoms" folder into usable composition levels.
- **References:** `frost-2016` (primary); **new** chapter-level page references from Frost's online book when written.
- **Dependencies:** `design-system`. **Type note:** methodology → procedural completeness gate requires method detail (procedure, participants, duration, outputs); use the interface inventory as the procedure.
- **Visuals:** L1 exists (planned-topic plate, labelled planned; becomes the entry plate); L2 hierarchy (composition tree) justified; L3 not justified.
- **Assessment:** decompose a real screen; justify one boundary decision.
- **Academy links:** `/system/components/card`, `/system/patterns/concept-page`.

### 3. `design-language` — Design Language · concept · planned
- **Purpose:** explain how brand and interaction intent become consistent interface decisions without forcing uniformity.
- **Core concepts:** brand vs visual language vs interaction language; principles; voice and tone; consistency vs sameness; language across platforms.
- **Principles and rules:** principles must guide a decision someone can check **[industry]**; attention hierarchy: one high-attention element per view **[system: Spectrum]**.
- **Use:** multi-product organisations, rebrands. **Not use:** writing principles that cannot decide anything ("delightful", "simple") without examples of what they rule out.
- **Comparison:** two principle lists for the same product: vague adjectives vs principles with "this, not that" examples.
- **Correction exercise:** rewrite three vague principles into decision-guiding ones with a counter-example each.
- **References:** `adobe-spectrum` (attention hierarchy page, **new** page-level record), `uswds` (design principles), `fluent-2`, `apple-hig`.
- **Dependencies:** `design-system`. **Visuals:** L1 plate; L2 conceptual (brand → language → foundations); L3 none.
- **Assessment:** critique a principle set; apply it to judge two designs.
- **Academy links:** `/system` principles block; `docs/DESIGN_SYSTEM.md` v4 direction.

### 4. `design-tokens` — Design Tokens · concept · **published**
- **Purpose:** named records of design decisions, transformed for every platform.
- **Phase 2 action:** keep; add explicit cross-links to `primitive-tokens`, `semantic-tokens`, `theme-architecture`; add the DTCG status wording, Resolver module (**new** record) and the M3 three-class example; good/bad on hard-coded values vs tokens.
- **References (existing):** `dtcg-format-2025`, `dtcg-2026-thank-you-jina`, `material-3`, `fluent-2`, `carbon-design-system`, `figma-learn`.
- **Visuals:** existing L1; L3 = Design Token Lab.

### 5. `primitive-tokens` — Primitive Tokens · concept · planned
- **Purpose:** know what belongs in the raw-value tier and how much abstraction it needs.
- **Core concepts:** colour ramps, spacing and type values, radius, elevation values; naming by value scale (e.g. `blue-600`, `space-4`); also called global (Fluent), reference (M3), base (DTCG non-normative note).
- **Principles and rules:** primitives describe *what a value is*, not *where it is used* **[industry]**; components should not consume primitives directly when a semantic role exists **[system: Atlassian "choose a token rather than a shade"]**.
- **Use:** every token architecture with more than one theme or brand. **Not use:** a tiny single-theme product, where a short list of semantic values is clearer; naming primitives by purpose (`blue-button`) which mixes tiers.
- **Comparison:** a palette named `primary-light`, `primary-lighter` vs a numbered ramp; show what breaks when a second brand arrives.
- **Correction exercise:** rename a mixed-tier token list into a clean primitive ramp.
- **References:** `fluent-2` (global tokens; **new** page record), `material-3` (reference tokens; **new** page record), `dtcg-format-2025`, `uswds` (grades).
- **Dependencies:** `design-tokens`. **Visuals:** L1 plate (ramp as a ruler); L2 comparison; L3 = Token Lab.
- **Assessment:** build a 9-step neutral ramp and justify the naming scheme.
- **Academy links:** `app/globals.css` neutrals via `/system/foundations/colour`.

### 6. `semantic-tokens` — Semantic Tokens · concept · planned
- **Purpose:** name decisions by role so components and themes stay stable when values change.
- **Core concepts:** purpose-based names; aliasing to primitives; roles for surface, text, border, action, feedback, state; accessible pairs (on-colour); component tier.
- **Principles and rules:** the name says the role, the value can change **[industry]**; use roles in their intended pairs to keep contrast **[system: M3 colour roles]**; accent colours without meaning must not carry meaning **[system: Atlassian]**; WCAG 1.4.3 and 1.4.11 for every pair **[standard]**.
- **Use:** theming, dark mode, multi-brand. **Not use:** creating a semantic token for every single component property (token explosion); semantic names that describe appearance (`color.red`).
- **Comparison:** a dark theme built by overriding component colours one by one vs by remapping roles.
- **Correction exercise:** a text-on-surface pair that fails 4.5:1 in dark mode; trace it to a mapping and fix the mapping, not the component.
- **References:** `dtcg-format-2025`, `material-3`, `fluent-2` (alias tokens), `atlassian-design` (**new** colour page record), `carbon-design-system` (role-based tokens; **new** themes page record), `w3c-wcag-22`.
- **Dependencies:** `primitive-tokens`. **Visuals:** L1; L2 relationship (primitive → semantic → component); L3 = Token Lab (mapping errors).
- **Assessment:** map 12 semantic roles for two themes; verify contrast with `lib/formulas` contrast calculation.
- **Academy links:** `/system/foundations/colour` (ink, paper, accent roles); `colour-contrast-ratio`.

### 7. `theme-architecture` — Theme Architecture · concept · planned
- **Purpose:** design themes as complete, testable remappings, not paint jobs.
- **Core concepts:** light, dark, high contrast, density; theme inheritance and overrides; theme completeness testing; platform differences (Windows reversed states); DTCG Resolver sets and modifiers.
- **Principles and rules:** a theme changes values, not role names **[system: Carbon, Fluent]**; every theme must meet contrast on its own **[standard]**; system appearance preferences (prefers-color-scheme, increased contrast) should be respected **[platform]**.
- **Use:** products that must follow OS appearance, or serve several contexts. **Not use:** adding a theme no one maintains; partial dark modes that leave components unthemed.
- **Comparison:** a dark theme made by inverting colours vs one designed with its own surface steps and elevation.
- **Correction exercise:** find the three components that ignore the theme in an illustrative audit and decide whether to fix tokens or components.
- **References:** `carbon-design-system` (themes), `fluent-2` (tokens and theming), `apple-hig` (colour), `dtcg-format-2025` + **new** `dtcg-resolver-2025`, `w3c-wcag-22`.
- **Dependencies:** `semantic-tokens`. **Visuals:** L1; L2 process (resolution order); L3 = Theme and Multi-Brand Playground.
- **Assessment:** a theme completeness checklist applied to `/system` in both themes.
- **Academy links:** UX Academy's light/dark tokens and `tests/tokens.test.ts` as a real completeness gate.

### 8. `multi-brand-systems` — Multi-Brand Systems · concept · planned
- **Purpose:** share a core while letting brands differ where they must.
- **Core concepts:** shared core vs brand extensions; brand token layers; white labelling; what must not vary (accessibility, behaviour, semantics); governance boundaries.
- **Principles and rules:** vary values, not behaviour **[industry]**; brand layers override semantic values, never component internals **[industry]**.
- **Use:** groups of products or clients on one platform. **Not use:** forking components per brand; a second brand that is really a new product needing its own system.
- **Comparison:** two brands that forked a button vs two brands that remapped tokens; count the maintenance points after one accessibility fix.
- **Correction exercise:** consolidate three forked components into one with brand tokens.
- **References:** `fluent-2` (branded themes), `carbon-design-system` (core and product extensions), `material-3` (theming); **gap:** no reference documents a full multi-brand governance model on the pages read.
- **Dependencies:** `theme-architecture`, `design-governance`. **Placement:** Stage 5 (see curriculum), because it depends on governance.
- **Visuals:** L1; L2 relationship (core + brand layers); L3 = Playground (brand switch).
- **Assessment:** propose a brand-layer boundary for a fictional two-brand bank, with what is fixed and why.

---

## B. Scales and visual systems (6)

### 9. `spacing-scales` — Spacing Scales · concept · planned
- **Purpose:** choose and apply a spacing scale that produces rhythm and grouping.
- **Core concepts:** base unit; scale steps; internal vs external spacing; grouping by proximity; responsive spacing; density; optical adjustment.
- **Principles and rules:** spacing communicates grouping (Gestalt proximity) **[industry, evidence: perception research]**; use the scale, deviate only for optical reasons and document why **[system: Carbon]**; scales may be fixed (Carbon) or responsive (GOV.UK) **[context]**. No universal base: 4 px (UX4G), 5 px (GOV.UK), 8 px (Atlassian, USWDS) are each coherent.
- **Use:** every system. **Not use:** applying the scale where optical alignment fails (icons in round buttons); using spacing tokens as layout widths.
- **Comparison:** a form with equal gaps everywhere vs inner gaps smaller than outer gaps.
- **Correction exercise:** fix a card with seven different spacing values to four scale steps.
- **References:** `atlassian-design` (**new** spacing page), `carbon-design-system` (**new** spacing page), `govuk-design-system` (**new** spacing page), `uswds` (**new** spacing units page), **new** `ux4g-spacing`; `gestalt-principles` entry for proximity.
- **Dependencies:** `primitive-tokens`, `gestalt-principles`. **Visuals:** L1; L2 comparison; L3 = Visual Scale Workshop (reuse `responsive-lab` mechanics where possible).
- **Assessment:** spacing redline review of a screen.
- **Academy links:** `/system/foundations/spacing-layout`.

### 10. `typography-scales` — Typography Scales · concept · planned
- **Purpose:** define type roles that carry hierarchy and stay readable at every size and platform.
- **Core concepts:** roles (display, heading, body, label, code); size, line height, weight, tracking; responsive type; platform ramps; Dynamic Type; rem units for user resizing.
- **Principles and rules:** name styles by role, not size **[industry]**; text must resize to 200% (WCAG 1.4.4) and survive text spacing (1.4.12) **[standard]**; follow platform text styles on native platforms **[platform: Apple]**.
- **Use:** every system with more than one text level. **Not use:** dozens of one-off sizes; a modular ratio applied without checking real content (overlaps `modular-type-scale`, which is the calculation technique).
- **Comparison:** a page using size alone for headings vs semantic heading roles with consistent levels.
- **Correction exercise:** map 11 ad-hoc sizes to 6 roles.
- **References:** `material-3` (type scale tokens, **new** page), `fluent-2` (**new** typography page), `atlassian-design` (**new** typography page), `govuk-design-system` (**new** type scale page), `apple-hig` (**new** typography page), `bringhurst-2012`, `w3c-wcag-22`.
- **Dependencies:** `primitive-tokens`, `modular-type-scale` (link, not duplicate). **Visuals:** L1; L2 hierarchy; L3 reuse `type-scale-lab`.
- **Assessment:** a type ramp for web and mobile with justification.
- **Academy links:** `/system/foundations/typography`.

### 11. `colour-systems` — Colour Systems · concept · planned
- **Purpose:** build colour as roles and pairs that work across themes and never carry meaning alone.
- **Core concepts:** primitive ramps vs semantic roles; brand, neutral, action, feedback; surface and text roles; on-colour pairs; light/dark; contrast; colour meaning; accent without meaning.
- **Principles and rules:** never rely on colour alone (WCAG 1.4.1) **[standard]**; text 4.5:1, large text and non-text 3:1 **[standard]**; don't assign new meanings to established colours **[system: GOV.UK]**; grade-difference contrast naming **[system: USWDS]**.
- **Use:** every system. **Not use:** status shown only by hue; brand colour for large surfaces where it reduces legibility **[system: Fluent]**.
- **Comparison:** an error shown only by red text vs red plus icon plus message.
- **Correction exercise:** a dashboard legend that relies on hue; redesign with labels and patterns.
- **References:** `material-3` (**new** colour roles page), `fluent-2` (**new** colour page), `atlassian-design` (colour), `uswds` (**new** colour page), `govuk-design-system` (**new** colour page), `apple-hig` (**new** colour page), `w3c-wcag-22`.
- **Dependencies:** `semantic-tokens`, `colour-contrast-ratio`. **Visuals:** L1; L2 relationship (roles and pairs); L3 reuse `contrast-lab`, `colour-lab`, `cvd-lab`.
- **Assessment:** colour role map with contrast proof in both themes.
- **Academy links:** `/system/foundations/colour`; `colour-contrast-ratio`.

### 12. `elevation-systems` — Elevation Systems · concept · planned
- **Purpose:** use depth to show layering and hierarchy, not decoration.
- **Core concepts:** z-axis levels; shadow ramps; tonal elevation; overlays; dark-theme elevation; strokes as an alternative.
- **Principles and rules:** few levels, each with a meaning **[system: M3]**; elevation tokens name levels and platforms render them **[system: M3]**; shadows and strokes vary by platform **[system: Fluent]**.
- **Use:** overlays, menus, dialogs, draggable items. **Not use:** shadows on everything; elevation that implies interactivity on static content.
- **Comparison:** a dashboard where every card floats vs one where only the dialog is elevated.
- **Correction exercise:** reduce an eight-shadow UI to three levels with stated meaning.
- **References:** `material-3` (**new** elevation page), `fluent-2` (**new** elevation page), `atlassian-design` (elevation tokens).
- **Dependencies:** `semantic-tokens`, `theme-architecture`. **Visuals:** L1 (side view of levels); L2 comparison; L3 part of Visual Scale Workshop.
- **Assessment:** elevation map for a product with menu, dialog and toast.
- **Academy links:** `/system/foundations/shape-elevation`.

### 13. `icon-systems` — Icon Systems · concept · planned
- **Purpose:** keep icons consistent, recognisable and accessible.
- **Core concepts:** family, grid and sizes; stroke vs fill; optical alignment with text; metaphors and familiarity; labels and icon-only controls; RTL mirroring; licensing and source governance.
- **Principles and rules:** icon-only controls need an accessible name (WCAG 4.1.2) **[standard]**; prefer labelled icons where meaning is not universal **[industry]**; SF Symbols licence restricts use **[platform: Apple]**.
- **Use:** systems with repeated actions and status. **Not use:** icons as decoration beside every heading; mixing families.
- **Comparison:** toolbar of unlabelled novel icons vs labelled common icons.
- **Correction exercise:** audit a mixed icon set and choose one family and sizes.
- **References:** `apple-hig` (**new** SF Symbols page), `material-3`; `iconography` (Visual domain, planned) — **scope boundary:** `iconography` covers visual design of icons; `icon-systems` covers the system (sets, sizes, naming, governance).
- **Dependencies:** `spacing-scales`, `typography-scales`. **Visuals:** L1; L2 annotated (grid and keylines); L3 none.
- **Assessment:** icon specification sheet.
- **Academy links:** `/system/foundations/iconography`; `components/shell/icons.tsx` rules.

### 14. `responsive-systems` — Responsive Systems · concept · planned
- **Purpose:** define how foundations and components adapt to space, input and context.
- **Core concepts:** fluid vs fixed; breakpoints from content; size classes; container queries; reflow; touch vs pointer; density; component-level responsiveness.
- **Principles and rules:** reflow at 320 CSS px without two-dimensional scrolling (WCAG 1.4.10) **[standard]**; target size at least 24 × 24 CSS px (2.5.8) **[standard]**; decide layout by size class, not device **[platform: Apple]**; no universal breakpoints **[industry]**.
- **Use:** every web system; native apps with multiple sizes. **Not use:** breakpoints copied from a framework without checking content; hiding essential content on small screens.
- **Comparison:** a data table squeezed on mobile vs stacked with labels.
- **Correction exercise:** fix a layout that breaks at 320 px.
- **References:** `w3c-wcag-22`, `apple-hig` (**new** layout page), `uswds` (stacked table), `govuk-design-system` (responsive spacing); `responsive-breakpoints`, `responsive-composition`, `responsive-development` (planned, other domains) — link, don't duplicate.
- **Dependencies:** spacing, typography. **Visuals:** L1 (fills the Responsive & Adaptive illustration category gap, D-109); L2 process; L3 reuse `responsive-lab`.
- **Assessment:** responsive behaviour spec for three components.
- **Academy links:** `/system/foundations/spacing-layout`.

---

## C. Components and patterns (11)

### 15. `component-libraries` — Component Libraries · concept · planned
- **Purpose:** organise, publish and maintain shared components in design and code.
- **Core concepts:** design library vs code library; parity; discoverability; publishing; version alignment; contribution; reuse vs creating new.
- **Principles and rules:** check for an existing component before making one **[system: GOV.UK "Unique"]**; use native or platform components unless there is a justified need **[platform: Apple, APG table note]**; done means usage, style, code and accessibility guidance **[system: Carbon]**.
- **Use:** several teams or products. **Not use:** building a library before patterns repeat; wrapping every native element.
- **Comparison:** a library with three near-identical buttons vs one documented button.
- **Correction exercise:** merge duplicates using the GOV.UK criteria.
- **References:** `govuk-design-system` (**new** contribution criteria page), `carbon-design-system` (**new** contributing page), `figma-learn`, `apple-hig`.
- **Dependencies:** `design-system`. **Visuals:** L1; L2 relationship (design ↔ code parity); L3 none.
- **Academy links:** `/system/components/*` as a small published library.

### 16. `component-architecture` — Component Architecture · concept · planned
- **Purpose:** design components as contracts with clear anatomy, responsibilities and boundaries.
- **Core concepts:** anatomy; composition (slots, children); responsibility; extension vs modification; design-to-code contract; over-abstraction.
- **Principles and rules:** a component has one job **[industry]**; expose composition rather than flags for every case **[industry]**; a role is a promise of behaviour **[informative: APG]**.
- **Use:** any reusable component. **Not use:** a "mega-component" with 30 props; abstracting before two real uses exist.
- **Comparison:** a card with 14 boolean props vs a card with header/body/actions slots.
- **Correction exercise:** split an over-configured component.
- **References:** `w3c-aria-apg` (**new** Read Me First page), `adobe-spectrum` (anatomy sections), `carbon-design-system`; `design-to-development-handoff` (planned) as link.
- **Dependencies:** `component-libraries`, `atomic-design`. **Visuals:** L1; L2 annotated anatomy; L3 = Component Specification Workshop.
- **Academy links:** `/system/components/button` anatomy.

### 17. `variants` — Variants · concept · planned
- **Purpose:** create variants only for real differences in purpose or emphasis.
- **Core concepts:** emphasis (primary, secondary, tertiary); size; semantic intent (danger); variant explosion; decision rules; variants vs states.
- **Principles and rules:** variants change *what* a component is for, states change *what is happening now* **[industry; system: Spectrum page structure]**; one primary action per area **[system: Atlassian]**; avoid multiple default buttons **[system: GOV.UK]**.
- **Use:** recurring differences in emphasis or intent. **Not use:** a variant per screen; "hover" as a variant.
- **Comparison:** a button set with 18 variants vs 4 variants × sizes with clear rules.
- **Correction exercise:** reduce variants with a decision table.
- **References:** `govuk-design-system` (button), `atlassian-design` (button usage), `adobe-spectrum`, `uswds`.
- **Dependencies:** `component-architecture`. **Visuals:** L1; L2 comparison (variant matrix); L3 part of State Playground.
- **Academy links:** `.btn` family in `/system/components/button`.

### 18. `component-properties` — Component Properties · concept · planned
- **Purpose:** expose configuration that is safe, discoverable and consistent across design and code.
- **Core concepts:** boolean, text, instance-swap and variant properties (as supported by the design tool; verify against current Figma documentation at writing time); naming; required vs optional; safe defaults; impossible combinations; parity with code props.
- **Principles and rules:** defaults should be the correct choice for most uses **[industry]**; prevent invalid combinations rather than document them **[industry]**.
- **Use:** any reusable component. **Not use:** exposing styling overrides as properties; properties that only one screen needs.
- **Comparison:** properties `isBlue`, `bigText`, `noBorder` vs `variant`, `size`, `icon`.
- **Correction exercise:** rename and constrain a confusing property set.
- **References:** `figma-learn` (**new** component properties page), `carbon-design-system` (code/props). **Gap:** no reference system documents property design principles in depth on the pages read.
- **Dependencies:** `variants`. **Visuals:** L1; L2 annotated; L3 within Specification Workshop.

### 19. `component-state-management` — Component State Management · concept · planned
- **Purpose:** specify every state a component can be in, how it changes and how it is announced.
- **Scope note:** in this taxonomy the topic means interaction and UI states of components (design-system sense), not application data stores. The entry must say so in its first paragraph to avoid confusion with engineering "state management".
- **Core concepts:** default, hover, focus, pressed, selected, active, disabled, loading, success, error, empty, expanded/collapsed, validation; transitions; focus behaviour; keyboard; announcements (WCAG 4.1.3).
- **Principles and rules:** visible focus (2.4.7) and focus not obscured (2.4.11) **[standard]**; selected and focused must look different **[system: Atlassian]**; states show with more than one cue **[system: M3]**; disabled buttons are often better avoided **[system: Atlassian, GOV.UK]**.
- **Use:** every interactive component. **Not use:** states drawn in design but impossible in code; "disabled" to hide errors.
- **Comparison:** a toggle specified only in default vs a full state matrix with keyboard and screen-reader notes.
- **Correction exercise:** complete a state matrix from a single mock.
- **References:** `w3c-wcag-22`, `w3c-aria-apg`, `material-3` (**new** states page), `atlassian-design`, `apple-hig` (buttons); `interaction-states`, `state-transitions` (planned, Interaction domain) — link.
- **Dependencies:** `variants`, `interaction-states` (concept). **Visuals:** L1; L2 process (state machine); L3 = Component State Playground (highest priority lab in Stage 4).

### 20. `data-tables` — Data Tables · pattern · planned
- **Purpose:** present and act on tabular data that people can scan, compare and operate.
- **Core concepts:** table vs grid; static vs interactive; sorting; filtering; pagination; row and bulk actions; density; empty/loading/error; responsive tables; accessible table semantics; when a list or cards fit better.
- **Principles and rules:** use native `table` semantics; a static table is not a widget **[informative: APG]**; a grid needs arrow-key navigation the author builds **[informative: APG]**; sort state announced (`aria-sort`) **[system: Carbon]**; reflow exception for data tables in 1.4.10 **[standard]**.
- **Use:** comparison across rows and columns. **Not use:** layout; one-column lists; mobile-first content that is read, not compared.
- **Comparison:** a `div` grid with click-only sorting vs a native table with sortable headers.
- **Correction exercise:** make a hover-only row-action table keyboard operable.
- **References:** `carbon-design-system` (**new** data table pages), `uswds` (**new** table page), `w3c-aria-apg` (**new** table and grid pages), `w3c-wcag-22`.
- **Dependencies:** component states, empty/loading/error states. **Visuals:** L1; L2 annotated; L3 within Pattern Composition Workshop.
- **Academy links:** `/system/components/table`.

### 21. `empty-states` — Empty States · pattern · planned
- **Purpose:** turn "nothing here" into orientation and a next step that fits the reason it is empty.
- **Core concepts:** first use, no results, no data, no access, cleared/completed, error-caused; guidance; primary action; starter content.
- **Principles and rules:** the empty state replaces the element that would show **[system: Carbon]**; say why it is empty and what to do **[industry]**; decorative illustration gets empty alt text **[system: Carbon; standard 1.1.1]**.
- **Use:** any collection that can be empty. **Not use:** one generic illustration for every cause; an empty state for an error (that is an error state).
- **Comparison:** "No items" with a mascot vs "No results for 'invoce' — check spelling or clear filters".
- **Correction exercise:** write empty states for four causes in one product.
- **References:** `carbon-design-system` (**new** empty states page).
- **Dependencies:** `component-state-management`. **Visuals:** L1; L2 decision tree (which empty state); L3 within Pattern Workshop.
- **Academy links:** `/system/patterns/empty-states`.

### 22. `loading-states` — Loading States · pattern · planned
- **Purpose:** keep people oriented and in control while the system works.
- **Core concepts:** immediate feedback; short vs long waits; determinate vs indeterminate; blocking vs background; cancellation; status announcements; reduced motion; misleading progress.
- **Principles and rules:** show something as soon as possible; prefer determinate progress when duration is known; offer cancel when safe **[platform: Apple]**; announce status without moving focus (4.1.3) **[standard]**; response-time limits **[research: `nielsen-1993-response-times`; rule of thumb: `doherty-threshold`]**; percent-done indicators **[research: `myers-1985`]**.
- **Use:** any operation that is not instant. **Not use:** a full-screen spinner for a partial update; fake progress bars that move regardless of work.
- **Comparison:** a blocking spinner for a 200 ms search vs an inline, non-blocking indicator.
- **Correction exercise:** redesign a long export from a modal spinner to a background task with progress and cancel.
- **References:** `apple-hig` (**new** loading and progress pages), `myers-1985`, `nielsen-1993-response-times`, `doherty-thadani-1982`, `w3c-wcag-22`.
- **Dependencies:** `component-state-management`. **Visuals:** L1; L2 decision tree (wait length × blocking); L3 within State Playground.
- **Academy links:** `/system/components/progress`; `doherty-threshold`.

### 23. `error-states` — Error States · pattern · planned
- **Purpose:** prevent, explain and help recover from errors at field, component and page level.
- **Scope boundary:** `error-messages` (UX Writing, planned) owns the wording; `error-prevention` and `error-recovery` (Interaction, planned) own the principles; `error-states` owns the visual and structural pattern in a system. Link all three.
- **Core concepts:** validation, system, network, permission errors; recoverable vs unrecoverable; inline vs summary vs page; error identification; suggestions; announcements.
- **Principles and rules:** identify the error in text (3.3.1) and suggest a fix (3.3.3) **[standard]**; don't rely on colour (1.4.1) **[standard]**; error summary links to fields **[system: GOV.UK validation pattern]**.
- **Use:** every input and every operation that can fail. **Not use:** errors shown before the person has had a chance to answer; generic "Something went wrong" without next step.
- **Comparison:** red border only vs message, icon, summary and focus management.
- **Correction exercise:** fix a form's validation flow end to end.
- **References:** `govuk-design-system` (**new** error message and validation pages), `w3c-wcag-22`, `carbon-design-system`.
- **Dependencies:** `component-state-management`, `empty-states`. **Visuals:** L1; L2 comparison; L3 within Pattern Workshop.
- **Academy links:** `/system/components/field`, `/system/patterns/empty-states`.

### 24. `skeleton-screens` — Skeleton Screens · pattern · planned
- **Purpose:** show the layout of coming content to reduce disorientation and layout shift.
- **Core concepts:** placeholders matching final layout; perceived waiting; layout stability; when skeletons help and when they mislead.
- **Principles and rules:** use skeletons for content whose layout is known **[system: Carbon data table "skeleton states instead of spinners"]**; respect reduced motion for shimmer **[standard 2.3.3 AAA / platform settings]**; **evidence gap:** peer-reviewed evidence that skeletons shorten *perceived* time is not yet gathered — the entry must not claim it until sources are verified.
- **Use:** lists, cards, tables with predictable layout. **Not use:** unknown layouts; very short waits; actions (use button loading state).
- **Comparison:** a skeleton that matches the final table vs a generic grey block that jumps on load.
- **Correction exercise:** align a skeleton with real content dimensions.
- **References:** `carbon-design-system`, `apple-hig` (placeholders); **research question** open (see source plan).
- **Dependencies:** `loading-states`. **Visuals:** L1; L2 comparison; L3 within State Playground.

### 25. `progressive-loading` — Progressive Loading · pattern · planned
- **Purpose:** deliver the most useful content first and the rest as needed, without losing context.
- **Core concepts:** progressive rendering; lazy loading; incremental and infinite loading; prioritisation; network constraints; user control; accessibility of inserted content.
- **Principles and rules:** let people keep working while content loads **[platform: Apple]**; don't move focus or content unexpectedly **[standard: 2.4.3, 3.2.x]**; announce additions politely **[standard 4.1.3]**.
- **Use:** large feeds, images, dashboards on slow networks. **Not use:** content people need to compare or print as a whole; infinite scroll where the footer or position matters.
- **Comparison:** infinite scroll that hides the footer and loses position vs "Load more" with retained position.
- **Correction exercise:** choose between pagination, load more and infinite scroll for three tasks.
- **References:** `apple-hig` (loading), `w3c-wcag-22`; **gap:** web performance sources (e.g. browser vendor documentation on lazy loading) to be added when the entry is written.
- **Dependencies:** `loading-states`, `skeleton-screens`. **Visuals:** L1; L2 process; L3 none.

---

## D. Governance and operations (4)

### 26. `design-governance` — Design Governance · strategy · planned
- **Purpose:** decide who decides, how changes are proposed and reviewed, and how exceptions work.
- **Core concepts:** ownership; decision rights; contribution; review; release authority; local exceptions; core vs product decisions; adoption.
- **Principles and rules:** staged criteria: useful and unique before building; usable, consistent and versatile before publishing **[system: GOV.UK]**; definition of done across usage, style, code, accessibility **[system: Carbon]**; maturity labels and "nothing removed without a migration path" **[system: UX4G]**.
- **Use:** any system used by more than its makers. **Not use:** committee approval for trivial fixes; governance that blocks urgent accessibility repairs.
- **Comparison:** a request process with no criteria vs GOV.UK's staged criteria.
- **Correction exercise:** write a contribution process for a 3-team organisation.
- **References:** `govuk-design-system` (**new** contribution criteria), `carbon-design-system` (**new** contributing), **new** `ux4g-governance`, `curtis-2009` (scope only).
- **Dependencies:** `component-libraries`. **Visuals:** L1; L2 process (contribution flow, exists for `design-system.contribution`, link it); L3 none (scenario exercises instead).

### 27. `design-system-versioning` — Design System Versioning · strategy · planned
- **Purpose:** release changes so consumers can predict impact and migrate safely.
- **Core concepts:** semantic versioning; release notes; breaking changes; deprecation; migration guides; design-library and package coordination; multi-platform releases.
- **Principles and rules:** major versions signal breaking changes **[standard-like specification: `semver-2`]**; deprecate before removing **[system: UX4G, Carbon migration]**; changelog per component **[system: GOV.UK, Atlassian]**.
- **Use:** packaged distributions. **Not use / limits:** SemVer does not fit a design library without code, or a monorepo released continuously; tokens consumed as copied values cannot be versioned.
- **Comparison:** a release note "various fixes" vs a note listing the change, impact and migration.
- **Correction exercise:** classify ten changes as major, minor or patch and write the migration note.
- **References:** `semver-2`, `govuk-design-system` (**new** releases page), `carbon-design-system` (**new** migration guide), `atlassian-design` (changelog).
- **Dependencies:** `design-governance`. **Visuals:** L1; L2 timeline; L3 none.

### 28. `design-qa` — Design QA · strategy · planned
- **Purpose:** check that what ships matches the system and works for people.
- **Core concepts:** design review; visual regression; interaction QA; accessibility QA (automated + manual); responsive QA; design-to-code parity; token compliance; acceptance criteria; release readiness.
- **Principles and rules:** automated accessibility checks find only part of the problems **[industry]**; per-component test status (automated + manual screen reader) **[system: Carbon]**; lint rules for tokens **[system: Atlassian tooling]**.
- **Use:** every release. **Not use:** QA only on desktop light theme; screenshots without criteria.
- **Comparison:** a QA checklist of "looks right" vs criteria tied to tokens, states, keyboard and widths.
- **Correction exercise:** write acceptance criteria for a component.
- **References:** `carbon-design-system` (**new** data table accessibility page as a test-status example), `w3c-wcag-22`, `w3c-understanding-wcag-22`.
- **Dependencies:** components, states. **Visuals:** L1; L2 process; L3 none.
- **Academy links:** UX Academy's own QA (tests/browser, plate-text tests) as a documented case.

### 29. `design-system-audits` — Design System Audits · strategy · planned
- **Purpose:** inventory a system and its products, find problems and prioritise improvements with reasons.
- **Core concepts:** interface inventory; duplication; inconsistency; adoption; accessibility; documentation coverage; maintenance; product impact; cost and return; prioritisation.
- **Principles and rules:** measure against defined criteria, not a universal score **[industry; system: USWDS maturity model has no score]**; record evidence and date for every finding **[industry]**.
- **Use:** before a rebuild, at scale-up, after a merger. **Not use:** audits without owners for follow-up; vanity metrics such as component count.
- **Comparison:** an audit that lists "inconsistent buttons" vs one that counts variants, names their screens, rates impact and proposes a fix.
- **Correction exercise:** prioritise ten findings with impact and effort.
- **References:** `frost-2016` (interface inventory), `uswds` (**new** maturity model page), this repository's own audit history (ILLUSTRATION_COVERAGE) as a worked internal example; UX4G dated findings as an external case.
- **Dependencies:** governance, QA. **Visuals:** L1; L2 hierarchy (finding → severity → action); L3 = Audit Simulator.

---

## Summary counts

| Subcategory | Topics | Published | Planned | L3 justified |
|---|---:|---:|---:|---|
| System foundations | 8 | 2 | 6 | Token Lab; Theme Playground; Architecture Explorer |
| Scales & visual systems | 6 | 0 | 6 | reuse type-scale, contrast, colour, cvd, responsive labs |
| Components & patterns | 11 | 0 | 11 | State Playground; Specification and Pattern workshops |
| Governance & operations | 4 | 0 | 4 | Audit Simulator |
| **Total** | **29** | **2** | **27** | |
