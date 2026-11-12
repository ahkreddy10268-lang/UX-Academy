# Implementation roadmap — Phase 2 onwards

> Phase 1 output, 2026-11-10. Batches follow the curriculum dependencies and `docs/CONTENT_AUDIT.md` §6 (Tier 5 lists `atomic-design`, `semantic-tokens`, `component-architecture`, `design-governance` first). One fully researched entry at a time, sources verified first, every gate green before the next. Nothing in this file is implemented yet.

## Working rules for every batch

- Read the entry's matrix row (TOPIC_RESEARCH_MATRIX.md) and the lesson specification before writing.
- Add and verify any new source records first (`npm run sources:verify -- <ids>`).
- Write the entry in `content/knowledge/design-systems/<slug>.ts`; run `npm run content:index`.
- Add the Level-1 plate (sheet canvas, figure key, register record) and any Level-2 figure (declares `language`).
- Link `/system` pages as case studies; add typed `relations`.
- Run `npm run check`, `npm run build`, `npm run docs:generate`; browser suites for UI changes.
- Update `docs/PROGRESS.md`, `docs/CONTENT_AUDIT.md` §6 and `docs/DECISION_LOG.md`.
- Commit only with the owner's approval.

## Batch 1 — Token architecture core (recommended first)

- **Scope:** `semantic-tokens`, then `primitive-tokens`.
- **Why first:** they are the most frequent misconception in design-system practice (mixing value and role), they complete the story the published `design-tokens` entry starts, `semantic-tokens` is already next in CONTENT_AUDIT Tier 5, and the Token Lab — the highest-value interactive — depends on them.
- **Required files:** two entries; plates in `components/illustrations/concepts/learning-sheets.tsx`; register records; one Level-2 relationship figure (primitive → semantic → component, `viz`) and one comparison figure (`sheet`); source records `dtcg-color-2025`, `m3-color-roles`, `fluent-2-tokens`, `carbon-themes`, `atlassian-color`, `ux4g-tokens` (as needed).
- **Research dependencies:** verified DTCG Color module; M3 colour roles (render method noted); Fluent tokens.
- **Content dependencies:** `design-tokens` (published), `colour-contrast-ratio` (published).
- **Design deliverables:** plates with keys; comparison of overridden-components dark mode vs remapped roles.
- **Testing:** content gates, plate-text test, visuals test, contrast numbers from `lib/formulas`.
- **Acceptance:** both entries published with every gate; quiz at three levels; correction exercise; `/system/foundations/colour` linked; `design-tokens` updated with cross-links and DTCG Resolver mention.

## Batch 2 — Theme architecture and Token Lab

- **Scope:** `theme-architecture`; Design Token Lab (L3).
- **Files:** entry; lab component in `components/labs/`, lab record in `content/labs.ts`; source `dtcg-resolver-2025`.
- **Acceptance:** lab computes contrast with `lib/formulas`; labelled as a simulation of mapping, not a measurement of users; keyboard and reduced-motion tests pass.

## Batch 3 — Understand the system

- **Scope:** `design-language`, `atomic-design` (methodology: method detail required), path restructure to five stages in `content/learning-paths.ts`.
- **Acceptance:** path test passes with all 29 topics placed; atomic-design planned plate becomes the entry plate (remove the "planned" tag from the drawing when published).

## Batch 4 — Scales

- **Scope:** `spacing-scales`, `typography-scales`, `colour-systems`, `elevation-systems`, `icon-systems`, `responsive-systems`.
- **Notes:** typography links `modular-type-scale` rather than repeating the calculation; `responsive-systems` publishes the first plate in the Responsive & Adaptive illustration category (closes the D-109 gap); Visual Scale Workshop assembled from existing labs.

## Batch 5 — Components

- **Scope:** `component-libraries`, `component-architecture`, `variants`, `component-properties`, `component-state-management`; Component Specification Workshop (extend `accessible-component`); Component State Playground (L3).
- **Notes:** state management entry opens with the scope note (UI states, not application data).

## Batch 6 — Patterns

- **Scope:** `empty-states`, `loading-states`, `skeleton-screens`, `progressive-loading`, `error-states`, `data-tables`; Pattern Composition Workshop.
- **Research dependency:** skeleton-screen evidence search (open question 1) before `skeleton-screens` is published.

## Batch 7 — Governance and operations

- **Scope:** `design-governance`, `design-system-versioning`, `design-qa`, `design-system-audits`, `multi-brand-systems`; Audit Simulator; Theme Playground brand mode.
- **Research dependency:** multi-brand governance source (open question 3).

## Batch 8 — Capstone and path completion

- **Scope:** capstone workshop; Architecture Explorer; path completion criteria updated.

## Owner decisions that affect batches

1. Approve or reject the optional `practice` block on entries (structured comparisons and corrections) before Batch 1, because it changes how every entry stores its good/poor examples.
2. Approve the five-stage path restructure (Batch 3) or keep the four-stage path with the seven missing topics added.
3. Decide whether page-level source records are preferred over root records with precise notes.

## Suggested order summary

| Batch | Topics | New L3 | Depends on |
|---|---|---|---|
| 1 | semantic-tokens, primitive-tokens | — | design-tokens |
| 2 | theme-architecture | Token Lab | Batch 1 |
| 3 | design-language, atomic-design (+ path) | — | design-system |
| 4 | six scales | Visual Scale Workshop (reuse) | Batches 1–2 |
| 5 | five component topics | State Playground, Spec Workshop | Batch 4 |
| 6 | six patterns | Pattern Workshop | Batch 5 |
| 7 | four operations + multi-brand | Audit Simulator, brand mode | Batch 6 |
| 8 | capstone | Architecture Explorer | all |
