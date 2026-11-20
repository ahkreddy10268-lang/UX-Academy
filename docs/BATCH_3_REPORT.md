# Cycle 1, Batch 3 — UX writing foundations (D-129)

_Session 49, 2026-11-16. Branch `claude/batch1-constraints`. Committed locally on top of `8cbd4ad`, not pushed. The final SHA is given in docs/PROGRESS.md (session 49) and in the hand-over message, because a commit cannot contain its own hash._

## 1. Scope

Slot G: UX Writing & Content Design, an empty domain that grows from 0 to 5 published entries. All five topics sit under Interface writing, as in the frozen taxonomy. Entries were produced one at a time: sources → entry → plate → practice → relations → targeted tests → rendered check.

## 2. Published entries

| Route | Type | Evidence class | D-129 targets |
|---|---|---|---|
| `/library/ux-writing` | discipline | professional guideline | Visual met (plate) · Evidence met |
| `/library/content-design` | discipline | professional guideline | Visual met (plate) · Evidence met |
| `/library/plain-language` | principle | professional guideline | Visual met (plate) · Evidence met |
| `/library/microcopy` | pattern | professional guideline | Visual met (plate) · Evidence met |
| `/library/error-messages` | pattern | professional guideline | Visual met (plate) · Evidence met |

There is also a new comparison, `/compare/ux-writing-vs-content-design` (`content/comparisons.ts`). It is the plan's batch asset and settles the boundary between the two that was on the watch list.

`error-messages` links to `/guides/nielsen-heuristics#h9` through the existing `guide` field; this is verified on the rendered page. That covers the plan's other asset.

## 3. Sources and verification limits

43 new records are in `content/sources/ux-writing.ts`:

- 6 were DOI-verified against Crossref.
- 32 were reported URL-reachable by `sources:verify`.
- 1 was refused by its site: ISO's page returns 403 to automated requests.
- 4 are book records checked against Open Library and not read.

Every note says what was actually read.

**Read in full:**
- **GOV.UK:** the Service Manual's "Writing for user interfaces"; eight pages of content and publishing guidance (content design, user needs, planning, managing, retiring, accessibility, translations, clear language); and the Design System's error message and error summary components.
- **NN/g:** seven articles (UX writing study guide, how users read 1997, tone of voice, content strategy, content audits, plain language for experts, placeholders).
- **WCAG 2.2 Understanding documents:** 3.1.5, 3.3.1, 3.3.2 and 3.3.3.
- **Other pages:** Content Design London (2 pages), PLAIN's "What is plain language?", the US Plain Writing Act text, Digital.gov's "Test for understanding", OWASP's authentication cheat sheet, Porter 2009, Lovinger 2012, and the Mailchimp and Microsoft style guides.

**Abstracts only:** Redish 1981 and 2000, Seckler et al. 2014, Bargas-Avila et al. 2007. For Shneiderman 1982, only the opening was available. The full texts were blocked to automated access, so claims attributed to these papers stay within what the abstracts say.

**Records only, never cited for content:**
- **Not read:** Flesch 1948 (no abstract available) and ISO 24495-1:2023 (paid; site refused access).
- **Books:** Podmajersky 2019, Richards 2017, Halvorson 2009 and Yifrah 2017.

**Not used:** `iplfederation.org` served unrelated content on 2026-11-16. The IPLF definition is cited through PLAIN's page.

**Commercial interests disclosed in notes:**
- Content Design London sells training.
- The NN/g 1997 figures come from an old practitioner study with sample sizes not given.
- Company style guides are cited as examples of practice, not as evidence.

**Limits on the evidence:**
- The 80% preference figure for clear legal language is GOV.UK's report; the page does not name the underlying study.
- No controlled study of content design or UX writing as a whole was found.
- Wording evidence is scarce. All five entries say so and use the professional-guideline evidence class.

## 4. Plates

Five plates are in `components/illustrations/concepts/content-sheets.tsx`. They are registered in `_fragments.ts` and `visual-register.ts`, all scenarios are labelled illustrative, and each has a text description and a figure key.

- **UX writing:** intent → interface words (label, hint, outcome-named button) → result. Below, the button-to-confirmation echo compared with "Submit" / "Transaction successful".
- **Content design:** user need → format (a checker, not a longer page) → structure (content model) → create → deliver across channels → evaluate → maintain.
- **Plain language:** a council letter before and after (main point first, structured action, consequence kept). Below, a readability score as a prompt compared with a paraphrase test as evidence.
- **Microcopy:** one checkout field with label, hint ("why we ask"), button and confirmation, each mapped to the question it answers. Below, a placeholder-only field compared with a visible label.
- **Error messages:** fails (colour is not enough) → error summary → message at the field with `Error:` and the entry kept → confirmed resolution.

Rendered at 1440, 768 and 390 px in light and dark:
- Plate text is at least 10.2 px at 390 px.
- No text is clipped.
- All 30 markers sit inside the viewBox.

There are no Level-2 figures. D-129 requires only a plate for disciplines, patterns and principles, and the comparison page covers the planned asset.

## 5. Practice

Each entry has:
- 3 exercises, including at least one correction exercise.
- 4 quiz questions at beginner, intermediate and advanced, each with exactly one correct option.
- 5 flashcards.
- 3–4 dos and 3–4 don'ts.
- 1 worked example (text).

The worked examples:
- **UX writing:** a transfer flow, before and after, moment by moment.
- **Content design:** a content-design brief, from need to owner.
- **Plain language:** a benefit-letter paragraph, before and after.
- **Microcopy:** every string for one field, with accessibility notes.
- **Error messages:** five rewrites plus associated markup and an error summary.

The activities cover rewriting confusing language, mapping content to needs, simplifying without losing meaning, labels and calls to action, blame-oriented errors, accessibility problems in interface text, and comparing wording choices in context.

## 6. Relations and integration

Each new entry has 6 outgoing relations, and every target resolves to a taxonomy topic. Planned targets are `tone-of-voice`, `content-strategy`, `content-audit`, `cognitive-accessibility`, `readability-formulas`, `deceptive-patterns` and `form-design`.

The new entries link to each other in their intended direction: UX writing → applied in → microcopy; plain language → applied in → content design and UX writing; microcopy → related to → error messages.

Three existing incoming relations to error messages were already in the correct direction (from error-recovery, error-states and microcopy) and were left alone.

Integration links (D-129 plan § 7.4) are one phrase each, made where existing text already named the topic:
- `error-recovery` (definition): error messages, plain language
- `nielsen-usability-heuristics`: error messages
- `error-prevention`: error messages
- `aesthetic-and-minimalist-design`: plain language

No other existing entry was changed, and no prerequisites of existing entries were modified. The research-ledger comment now records that all Cycle 1 topics are published.

## 7. Coverage (generated)

| Measure | Before Batch 3 (`8cbd4ad`) | After |
|---|---|---|
| Published | 97 / 561 (17.3%) | **102 / 561 (18.2%)** |
| Domains with no published entry | 6 | **5** |
| UX Writing & Content Design | 0 / 18 | **5 / 18 (28%)** |
| D-129 Visual target | 87 / 97 | **92 / 102** |
| D-129 Evidence target | 95 / 97 | **100 / 102** |
| Entries below a target | 11 | 11 (unchanged; none new) |
| Learning paths | — | unchanged (none of the five topics is a path step) |

## 8. QA

**Run in this batch, on the final tree:**

| Check | Result |
|---|---|
| `npm run check` (index, typecheck, tests, lint) | 22 files, 586 tests pass, lint clean |
| `npm run test:taxonomy` | all checks pass |
| Targeted integrity script (5 entries) | no cited source missing from references, no reference unused, no unresolved link, relation target or prerequisite; Level-2 none; plates registered |
| `npm run build` | 995/995 pages |
| e2e | 44/44 |
| e2e-redesign | 66/66 (detailed-diagram count unchanged at 18) |
| atlas | 36/36 |
| keyboard | 45/45 |
| devices | 155/155 |
| colour-studio | 46/46 |
| a11y (axe) | 0 violations |
| crawl | 0 problems |
| Per-page review, 5 new entries | 40/40 checks pass |
| Per-page review, 4 entries that gained links | `aesthetic-and-minimalist-design` 8/8; the other three fail only on pre-existing marker overflow (below) |
| Comparison page and error-messages guide link | axe 0, no overflow at 1440 light and 390 dark; guide link present |

The per-page review covers six viewport/theme combinations per page: axe, overflow, page errors, plate text, clipping, markers, links and adding flashcards by keyboard.

**Pre-existing, not changed:** `error-recovery` (3 markers), `error-prevention` (1) and `nielsen-usability-heuristics` (1) have markers outside their viewBox. Their counts match the 78-plate backlog in docs/VISUAL_QA.md exactly. Their plate files were not touched.

**During production:** targeted vitest runs and `render-plates` visual checks after each entry, plus one intermediate build after the first two entries (16/16 per-page checks).

**Untested:** real screen readers, physical devices, and review by an independent subject expert.

## 9. Known limitations and follow-ups

- Wording evidence is mostly professional guidance; three entries depend on abstracts for their research claims.
- ISO 24495-1 was not read, so its principles are not described.
- No readability calculator exists. The plan defers it to Phase 2, so the entry describes formulas without computing them.
- Planned targets now linked from these entries (`tone-of-voice`, `content-strategy`, `form-design` and others) remain planned.
- The 78-plate marker backlog is unchanged.

## 10. Unchanged

D-129, docs/BALANCED_DEVELOPMENT_PLAN.md, the decision log, `content/learning-paths.ts`, gate code (`completeness.ts`, `targets.ts`) and all tests are unchanged since `8cbd4ad`. Batch 1 and Batch 2 content was not rewritten; only the four one-phrase links above were added. Nothing was pushed or merged, and Cycle 2 was not started.

## 11. Cycle 1 completion: data for the balance review

All three Cycle 1 batches are implemented. Batches 1 and 2 are reviewed and pushed; Batch 3 awaits review.

**Topic count.** The plan defines **14** Cycle 1 topics (5 + 4 + 5), not 15. All 14 are published, and the research ledger is empty.

| Batch | Slot | Domain | Topics | Domain published before → after |
|---|---|---|---|---|
| B1 | H | Interaction Design | feedback-principle, constraints, direct-manipulation, interaction-states, discoverability | 5 → 10 |
| B2 | R | UX Research | think-aloud-protocol, tree-testing, contextual-inquiry, in-depth-interviews | 5 → 9 |
| B3 | G | UX Writing & Content Design | ux-writing, content-design, plain-language, microcopy, error-messages | 0 → 5 |

**Cycle totals.**
- Published entries went from 88 to **102** (15.7% → 18.2%); the plan projected 102.
- Domains with no published entry went from 6 to **5**.

**Cycle 1 caps.**

| Cap | Result |
|---|---|
| One batch per domain | Met |
| Largest domain share of the cycle | Interaction Design and UX Writing each 5 of 14 (36%), within the 40% cap |
| Other domains | Unchanged in Cycle 1 |

**Learning paths at 100%: 3, as projected.**
- UX Design Fundamentals, which reached 100% in Batch 2.
- Usability Engineering, which reached 100% in Batch 2.
- Design Systems, which reached 100% in Batch 1.

**Quality gates held.**
- All 14 entries are complete on Explanation, Practice and Editorial.
- All 14 meet their D-129 Visual and Evidence targets.
- No gate or test was weakened.
- No Cycle 1 entry is among the 11 entries below target. All 11 predate the cycle.

**Domains still empty:** Service Design & Systems Thinking, Data Visualisation, Ethical & Responsible Design, Emerging & Specialised Disciplines, Design Practice & Technical Literacy.

**Inputs the review may want:**
- The improvement pass is due every second cycle.
- The 11 below-target entries and the 78-plate marker backlog are both open.
- Review follow-ups are still open from Batch 1 (docs/BATCH_1_REVIEW.md) and Batch 2 (4 minor items in docs/BATCH_2_REVIEW.md).

Cycle 2 topics were not selected and the schedule was not changed.
