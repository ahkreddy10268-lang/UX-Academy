# Cycle 1 — Batch 3 review and balance review (D-129)

_Session 50, 2026-11-17. This covers the Batch 3 review (plan § 9.3, "after every batch") and the Cycle 1 balance review ("after every cycle"). Batch 1 and Batch 2 reviews are not repeated; see docs/BATCH_1_REVIEW.md and docs/BATCH_2_REVIEW.md._

## 0. Baseline

- **Branch:** `claude/batch1-constraints`.
- **Commit reviewed:** HEAD `80f80585b3dff5825162e30c6a52361df76cd66e` (`80f8058`), one commit ahead of `origin` (`8cbd4ad`). The working tree was clean at the start.
- **Read:**
  - docs/BATCH_3_REPORT.md;
  - docs/BALANCED_DEVELOPMENT_PLAN.md §§ 2, 7, 9.2, 9.3 and 10;
  - D-129 in docs/DECISION_LOG.md;
  - the five entry files, `content/sources/ux-writing.ts`, `components/illustrations/concepts/content-sheets.tsx`, the comparison in `content/comparisons.ts`, and the four integration edits.
- **Approved Cycle 1 scope:** exactly **14 topics**, as listed in plan § 10. B1 has 5 (feedback-principle, constraints, direct-manipulation, interaction-states, discoverability); B2 has 4 (think-aloud-protocol, tree-testing, contextual-inquiry, in-depth-interviews); B3 has 5 (ux-writing, content-design, plain-language, microcopy, error-messages).
- **Corrections:** made in the review commit on top of `80f8058`. All checks in § 6 were run on the corrected tree.

## 1. Batch 3 review findings

Severity follows the earlier reviews:
- **Critical:** false or harmful content, or a broken build.
- **Major:** a claim contradicted by its source, or a gate failure.
- **Moderate:** a citation that does not support its sentence, an unsupported generalisation in a teaching claim, a relation in the wrong direction, or a figure inconsistent with its text.
- **Minor:** imprecision or wording.

### Moderate — all fixed

| # | File(s) | Finding | Fix |
|---|---|---|---|
| M1 | `content/knowledge/content/ux-writing.ts` (evidence), `microcopy.ts` (evidence) | Seckler et al. 2014 was described as a set of guidelines "covering wording" and "including labelling and instructions". Only the abstract was read; the 20 guidelines were not. | Both now say the guidelines were not read and the effect is of the whole set. |
| M2 | `microcopy.ts` (definition, period, attribution note, reference note), `ux-writing.ts` (history), `content/sources/ux-writing.ts` | Porter 2009 was said to have "helped popularise" or be "often credited" with popularising the term. No source read establishes this. | Porter is now described as "an early post"; no claim of coinage or popularising. |
| M3 | `ux-writing.ts`, `microcopy.ts`, `plain-language.ts`, `content-design.ts` (relations) | Four relations misstated: (1) `ux-writing → applied-in → feedback-principle` and (2) `microcopy → applied-in → visibility-of-system-status` reversed the project convention that a principle is applied in a practice; (3) `plain-language → measured-by → readability-formulas` contradicted the entry's own argument that formulas do not measure understanding; (4) `content-design → derived-from → user-centred-design` asserted a lineage no source documents. | All four are now `related-to`, with notes kept or clarified. |
| M4 | `content-design.ts` (origin, advanced) | The origin period said "early 2010s", contradicting the entry's own note that the sources give no date. "Draws on UCD" was cited to NN/g's content-strategy article, which does not say so. | Period now says GDS, undated in the sources read. The UCD link is restated as a shared premise, cited to GOV.UK's user-needs guidance. |
| M5 | `components/illustrations/concepts/content-sheets.tsx` (error-messages plate) | The "Recover" panel showed "Error:" as visible text, while the key and the GOV.UK source describe a visually hidden prefix. | The visible message no longer includes it; a cross icon gives a non-colour cue; the key and description explain the hidden prefix. Re-rendered and checked. |
| M6 | `microcopy.ts` (practice, don't) | The tooltip claim was cited to NN/g's placeholder article, which does not discuss tooltips. | The citation now covers the placeholder clause only; the tooltip clause is stated as reasoning (no hover on touch screens). |

### Minor — fixed

| # | File | Finding |
|---|---|---|
| m1 | `microcopy.ts` | Alternate name "Microcontent" removed. NN/g uses it for headlines and titles, not interface strings. |
| m2 | `error-messages.ts` | A garbled quiz explanation for the "Error 401" option was rewritten. |
| m3 | `error-messages.ts` | "(1990)" in the origin period removed; this entry does not cite the 1990 source. |
| m4 | `plain-language.ts` | An unsourced assertion that shortening sentences makes text "choppy" was reworded and tied to Redish's advice. |
| m5 | `plain-language.ts` | A specific drug–food interaction in an example solution was replaced with a placeholder and labelled illustrative. |
| m6 | `ux-writing.ts` | The heart-rate figure in an exercise solution is now labelled illustrative, with clinician-owned wording. |
| m7 | `content-design.ts` | An interpretive statement about what Halvorson "established" now restates her definition. |
| m8 | `ux-writing.ts` | A debate claimed "practitioner sources consistently argue…" from one source; it now attributes the view to Winters. |

### Minor — open (follow-ups, not blocking)

| # | Item |
|---|---|
| o1 | `plain-language.ts` describes Easy Read in general terms without a source. |
| o2 | Four research sources (Redish 1981 and 2000, Seckler 2014, Bargas-Avila 2007) were read as abstracts and Shneiderman 1982 only in its opening; ISO 24495-1 was not read. Claims are limited accordingly. Reading the full texts, where accessible, would strengthen the entries. |
| o3 | Linked planned targets (`tone-of-voice`, `content-strategy`, `form-design`, `readability-formulas`, `cognitive-accessibility`, `deceptive-patterns`, `content-audit`) remain planned topics. |

**Counts:** 0 critical, 0 major, 6 moderate (all fixed), 8 minor fixed, 3 minor open.

### Required distinctions — verified in the content

- **UX writing vs content design vs microcopy.**
  - The `ux-writing` definition places microcopy as its main output and content design as the wider practice.
  - `content-design` "Beyond the interface" and the misconception "a new name for copywriting" set the wider scope.
  - Microcopy flashcard 5 states the relationship.
  - The comparison page `/compare/ux-writing-vs-content-design` covers scope, outputs and failures.
- **Plain language vs simplistic writing; readability scores.**
  - The definition is outcome-based: find, understand, use, for an intended audience.
  - Misconceptions cover "dumbing down", scores as proof, never using the passive, and banning technical terms.
  - The advanced section gives Redish's limitations of formulas, with sources.
  - The plate shows a score as a prompt and a paraphrase test as evidence.
  - Exercise 2 is a good score paired with a failed test.
- **Error prevention vs recovery.**
  - The `error-messages` relation is `contrasts-with → error-prevention`.
  - The advanced section explains "Prevention first, recovery always".
  - `error-recovery → applied-in → error-messages` is the existing, correct direction.
- **Accessibility.**
  - Covers WCAG 3.3.1, 3.3.2, 3.3.3 (including the security exception), 3.1.5 and 4.1.3.
  - Covers the error summary with focus, page-title prefix, associated messages and the hidden prefix.
  - Covers placeholder-only labels, link text out of context, no colour or position references, and translations on separate pages.
  - Exercise 2 of `error-messages` is an accessibility audit.
- **Professional decisions.** Every entry has a correction exercise and a scenario that requires a choice with trade-offs:
  - format and channel for scan fasting;
  - a security vs usability password-reset message;
  - tone across three moments;
  - plain language for pharmacists vs patients;
  - reassurance that must be true, with a test plan.

## 2. Individual entry decisions

| Entry | Explanation | Evidence | Practice | Visual | Editorial | Decision |
|---|---|---|---|---|---|---|
| ux-writing | complete | guideline target met; claims match what was read after M1/M2 | 3 ex · 4 quiz · 5 cards | plate; text ≥ 10.2 px at 390; markers inside | relations corrected (M3) | **Pass** |
| content-design | complete | guideline target met after M4; origin honest about dating | 3 ex · 4 quiz · 5 cards | plate | relation corrected (M3) | **Pass** |
| plain-language | complete | guideline target met; ISO cited as a record only | 3 ex · 4 quiz · 5 cards | plate | relation corrected (M3); o1 open | **Pass** |
| microcopy | complete | guideline target met after M1, M2 and M6 | 3 ex · 4 quiz · 5 cards | plate | relation corrected (M3) | **Pass** |
| error-messages | complete | guideline target met; WCAG and OWASP read in full | 3 ex · 4 quiz · 5 cards | plate corrected (M5) | links to guide `#h9` | **Pass** |

## 3. Cycle 1 coverage calculations

Every figure below was computed from the repository, not taken from the report.

| Measure | Baseline | Now | Method |
|---|---|---|---|
| Published entries | **88** at `3177819^` | **102** at HEAD | `git grep -c 'status: "published"'` across `content/knowledge/**/*.ts` at each commit |
| Change | — | **+14** | equals the 14 approved topics, all published (unique, checked against the loader) |
| Share of 561 topics | 15.7 % | 18.2 % | |
| Empty domains | 6 | 5 | generated CONTENT_COVERAGE.md |
| Empty + Seeded domains | 12 | 10 | stage rule, plan § 9.1 |
| Empty subcategories | 42 / 73 | 39 / 73 | CONTENT_COVERAGE.md at `3177819^` and now |

On the baseline commit: `3177819` adopted D-129 and published feedback-principle in the same commit. Its parent (88) is therefore the correct pre-cycle baseline, and 88 + 14 = 102.

## 4. Domain distribution and caps

| Domain (cluster) | Cycle 1 entries | Share of 14 | Before → after | Stage before → after |
|---|---:|---:|---|---|
| Interaction Design (B) | 5 | 5 / 14 = **35.71 %** | 5 → 10 of 23 (43 %) | Developing → Developing; F topics form-design, touch-target-size and keyboard-interactions are unpublished, so not Established |
| UX Research (D) | 4 | 4 / 14 = 28.57 % | 5 → 9 of 57 (16 %) | Seeded → Developing |
| UX Writing & Content Design (C) | 5 | 5 / 14 = **35.71 %** | 0 → 5 of 18 (28 %) | Empty → Developing; all five F topics published |

| Rule (plan § 2 and § 9.3) | Result |
|---|---|
| Domains touched ≥ 3 | 3 — **met** |
| No domain > 40 % of the cycle's entries | Maximum 35.71 % (rounded to 36 % in the report — **correct**) — **met** |
| At most one batch per domain per cycle | B1, B2 and B3 are in different domains — **met** |
| Every cluster touched at least once every two cycles | Clusters B, C and D were touched. **A (Human foundations) and E (Strategy & context) were not**, so they must be touched in Cycle 2 for this rule to hold. This constrains Cycle 2 planning; it is not a Cycle 1 failure. |
| Empty and Seeded domains must not increase and should fall | 12 → 10 — **met** |
| Empty subcategories must not increase | 42 → 39 — **met** |
| G-slot quality rule (B3) | Foundational topics chosen (plan § 8 F list); all targets met; vocabulary and boundaries defined (comparison page); each entry links to a published entry outside the domain (e.g. error-recovery, wcag, signifiers, user-centred-design); no topic cut — **met** |

## 5. Learning-path verification

Path steps were checked against published entries through the loader (`content/learning-paths.ts` × `lib/content`).

| Path | Steps published | Complete |
|---|---|---|
| UX Design Fundamentals | 18 / 18 | 100 % |
| Usability Engineering | 12 / 12 | 100 % |
| Design Systems | 32 / 32 | 100 % |

All three meet the completion criterion: every planned step is a published lesson.

**No path regressed** from baseline (`3177819^`) to now:

| Path | Baseline | Now |
|---|---|---|
| UX Design Fundamentals | 94 % | 100 % |
| Usability Engineering | 92 % | 100 % |
| Design Systems | 97 % | 100 % |
| Interaction Design | 70 % | 87 % |
| UX Research | 31 % | 50 % |
| HCI Fundamentals | 54 % | 62 % |
| Product Design | 57 % | 64 % |
| UI Design Fundamentals | 59 % | 65 % |
| Information Architecture | 14 % | 21 % |

The other paths are unchanged. `content/learning-paths.ts` has no changes since `8cbd4ad` (git diff).

## 6. Quality gates and QA

| Check (plan § 9.3) | Result |
|---|---|
| Zero gate regressions | **Met** — `npm run check` and `test:taxonomy` pass; maturity *developing* counts unchanged since baseline: Evidence 38 → 38, Practice 12 → 12, Editorial 4 → 4 |
| 100 % of new entries meet their type targets | **Met** — all 14 Cycle 1 entries; none is among the 11 below target (A/B Testing, Atomic Design, Card Sorting, Cognitive Walkthrough, Gulfs of Execution and Evaluation, HEART, Jobs To Be Done, KLM, Mapping, Usability Testing, Working Memory Model — all pre-cycle) |
| Evidence-developing entries whose class allows complete must not grow | **Met** — total Evidence-developing unchanged at 38, and no Cycle 1 entry is Evidence-developing |
| Paths: no regression | **Met** (§ 5) |
| Re-run the dependency analysis and re-rank the next H slot | **Not run** — this belongs to Cycle 2 planning, which this review is not authorised to start |
| **Stop rule:** "a batch's entries need more than one rework pass" → the next cycle is an improvement cycle | **Triggered in Batch 1.** From git history, excluding commits that only added reciprocal links: constraints had 5 rework commits (`84b78a1`, `e4cc463`, `64fc726`, `36290b2`, `fd86db0`); feedback-principle 2 (`36290b2`, `fd86db0`); interaction-states 2 (`2602105`, `36290b2`). Batch 2 entries had exactly one review pass (`8cbd4ad`), and Batch 3 entries one (this review). |
| **I1** "Docs & coverage hygiene", approved as part of Cycle 1 (plan § 10 table; § 11 item 4) | **Partly done.** Docs reconciliation was done at approval (`3177819`). The coveredBy checks for hosts already published (wcag, confidence-intervals, usability, empty-states, visual-hierarchy; plan § 7.3) were **not done**: `content/taxonomy.ts` has no commits since `3177819`, and "addressed within" stays at 10. |

**QA run in this review, on the corrected tree:**

| Check | Result |
|---|---|
| `npm run check` | 22 files, 586 tests, lint clean |
| `test:taxonomy` | pass |
| `docs:generate` | run |
| Build | 995/995 pages. The first run exited 1 after prerendering, on a notice printed by the Next.js CLI; the identical rerun exited 0. |
| e2e-redesign | 66/66 |
| a11y (axe) | 0 violations |
| Per-page review, five entries (6 viewport/theme combinations each) | 40/40 |
| Comparison page and error-messages page | axe 0, no overflow, guide link present |
| Integrity script, five entries | clean |
| Error-messages plate | re-rendered and inspected |

**Inherited from `80f8058`, not affected by text and plate corrections:** e2e 44/44, atlas 36/36, keyboard 45/45, devices 155/155, colour-studio 46/46, crawl 0.

**Untested:** real screen readers (NVDA, JAWS, VoiceOver, TalkBack), physical devices, and review by an independent subject expert.

## 7. Outstanding issues

| ID | Severity | Item | Blocks |
|---|---|---|---|
| C1-1 | Process | Stop rule triggered by Batch 1 rework (§ 6) | Next-cycle type (owner decision) |
| C1-2 | Process | I1 coveredBy checks not done (§ 6) | Cycle 1 completeness |
| C1-3 | Planning | Clusters A and E untouched; must be touched in Cycle 2 | Cycle 2 plan |
| TD-1 | Technical debt | 78-plate marker backlog (docs/VISUAL_QA.md). Pages checked in Batch 3: error-recovery (3 markers), error-prevention (1), nielsen-usability-heuristics (1); counts match the log. Not fixed, per scope. | No |
| TD-2 | Coverage | 11 entries below a D-129 target, all predating Cycle 1 | No |
| B3-o1…o3 | Minor | § 1 open items | No |
| B1, B2 | Minor | Open follow-ups in BATCH_1_REVIEW.md and BATCH_2_REVIEW.md (4 minor in B2) | No |
| Test gap | Limitation | Screen-reader, physical-device and expert-review testing not done | No (stated) |

## 8. Batch 3 decision

**PASS WITH MINOR FOLLOW-UPS.** All six moderate findings are fixed. Three minor items stay open; none blocks publication.

## 9. Cycle 1 decision

**IMPROVEMENT REQUIRED.**

The cycle met its coverage and balance rules:
- 14 of 14 topics published;
- 88 → 102 published entries;
- caps respected;
- three paths at 100 %;
- no regressions;
- all new entries meet their targets.

However, two requirements in D-129's own plan are not met:
- **The § 9.3 stop rule was triggered by Batch 1.** Some of its entries needed more than one rework pass, and the rule says the next cycle is an improvement cycle (no new topics) until resolved. The rework itself is resolved (Batch 1 was approved), but the rule's consequence for Cycle 2 needs an owner decision. This review cannot waive it.
- **I1**, approved as part of Cycle 1, is incomplete: the coveredBy checks were not done.

## 10. Is Cycle 2 authorised for planning?

**Not for new-topic batches yet.** The recommended order:
1. The owner decides how the stop rule applies: either Cycle 2 begins with an improvement batch, or the owner records that resolving the Batch 1 rework satisfies "until resolved".
2. Complete I1 (the coveredBy checks), which is small and already defined in plan § 7.3.
3. Then plan Cycle 2 against the cluster constraint (A and E must be touched) and a re-run dependency analysis.

Planning the improvement work in steps 1–2 is within the existing roadmap and can be authorised now. No Cycle 2 topics were selected, D-129 and the roadmap are unchanged, and nothing was pushed.
