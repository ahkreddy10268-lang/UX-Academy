# Proposal — five-stage Design Systems learning path

> Session 33, 2026-11-11. **Proposal only; nothing in `content/learning-paths.ts`, routes or the schema has changed.** Awaiting owner approval (README § Decisions needed, item 1).

## Scope: one learning path, not the taxonomy

The five-stage restructure applies to the **Design Systems learning path** (`content/learning-paths.ts`, id `design-systems`, served at `/learn/design-systems`). It does not regroup the 20 taxonomy domains. Those stay as they are: frozen in `content/taxonomy.ts` and already mapped onto the 12 learning areas of `/learn` (D-100), which this proposal does not touch.

## Current path (4 stages, 22 of 29 Design Systems topics)

| # | Stage | Level | Steps |
|---|---|---|---|
| 1 | Understand the system | beginner | design-system, design-tokens |
| 2 | Foundations and architecture | intermediate | design-language, primitive-tokens, semantic-tokens, theme-architecture, colour-systems, typography-scales, *modular-type-scale*, spacing-scales, *colour-contrast-ratio* |
| 3 | Components and patterns | intermediate | atomic-design, component-libraries, component-architecture, variants, component-properties, component-state-management, *interaction-states*, empty-states, error-states |
| 4 | Governance and operations | advanced | design-governance, design-system-versioning, design-qa, design-system-audits, multi-brand-systems |

*Italic* = supporting topic from another domain. Missing: elevation-systems, icon-systems, responsive-systems, data-tables, loading-states, skeleton-screens, progressive-loading.

## Proposed path (5 stages, all 29 topics)

| # | Stage | Level | Design Systems topics | Supporting topics | Practice |
|---|---|---|---|---|---|
| 1 | Understand the system | beginner | design-system ✅, design-language ✅, atomic-design ✅ | — | (Architecture Explorer, when built) |
| 2 | Tokens and themes | beginner | design-tokens ✅, primitive-tokens ✅, semantic-tokens ✅, theme-architecture ✅ | colour-contrast-ratio ✅ | `token-lab` ✅ |
| 3 | Scales and visual systems | intermediate | spacing-scales, typography-scales, colour-systems, elevation-systems, icon-systems, responsive-systems | modular-type-scale ✅ | `type-scale-lab`, `contrast-lab` |
| 4 | Components and patterns | intermediate | component-libraries, component-architecture, variants, component-properties, component-state-management, empty-states, loading-states, skeleton-screens, progressive-loading, error-states, data-tables | interaction-states | `accessible-component` |
| 5 | Governance and operations | advanced | design-governance, design-system-versioning, design-qa, design-system-audits, multi-brand-systems | — | (Audit Simulator, when built) |

✅ = published today. Counts: 3 + 4 + 6 + 11 + 5 = **29**. Stages 1 and 2 are now **fully published** (7 of 7), so a learner can finish the first two stages today.

**Why this order:** the dependency map in CURRICULUM_ARCHITECTURE.md. Tokens need the system model; scales consume tokens; components consume scales; `multi-brand-systems` depends on governance, so it stays last. Stage 2 is set to `beginner` so that Stages 1–2 lead with beginner explanations, as the curriculum intends; every published entry in Stages 1–2 has beginner-level quiz questions, so both level tests have material.

## Effect on URLs, navigation and stored progress

| Surface | Effect |
|---|---|
| Canonical slugs, `/library/[slug]` | **None.** No slug is renamed, moved or removed. |
| `/learn/design-systems` | Same URL; it lists five stages instead of four. |
| `/learn/design-systems/lesson/[slug]` | Same URLs (keyed by slug). Seven lessons become reachable from the path; previous/next links follow the new order. |
| `/learn/design-systems/level/[n]` | `n` runs 1–5 instead of 1–4. **Levels 2–4 change meaning** (for example, level 3 becomes Scales instead of Components), and level 5 is new. These pages are generated from the stage list, so none breaks, but a bookmarked level URL would open a different stage. No stored state is keyed by level number. |
| Path explorer (`components/learn/path-explorer.tsx`) | **None.** It is organised by system layer, not by stage. |
| Path artwork (`path-art`, `art/fit.ts`) | **None.** Keyed by path id. |
| Local progress (`lib/store`, `ux-academy:v1`) | **None.** Completion and reading levels are keyed by entry slug, quiz history by question id, flashcards by card id; nothing is keyed by stage index. Path progress is recalculated from the new step list, so learners keep everything they have done, and newly added published steps count at once. |
| Tests | `tests/learning.test.ts` keeps passing: level-question counting is per stage, and visuals are checked per lesson slug. A new assertion is proposed: "the design-systems path places all 29 topics of the domain exactly once." |

**Optional mitigation for level URLs:** none is needed for stored data. If bookmark stability matters, the level page could show a one-line note ("This path was reorganised on …") for a release cycle. This is not recommended unless asked, because nothing is lost.

## What approval would change

1. Edit the `design-systems` record in `content/learning-paths.ts` to the five stages above. This is a content edit, with no schema or route changes.
2. Add the path-coverage assertion to `tests/learning.test.ts`.
3. Update the path's `completion` when the capstone exists. Until then, keep the two current items.
4. Run `npm run check`, build, the e2e and keyboard suites, and a crawl of `/learn/design-systems/level/1–5`.
