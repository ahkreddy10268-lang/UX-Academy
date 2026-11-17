# Cycle 2 — consolidated improvement report

Scope: the improvement-only phase of Cycle 2 that D-129 § 9.3 required after Improvement Batch 1 (batches IB2, IB3 and IB4, `docs/CYCLE_2_IMPROVEMENT_PLAN.md`, approved 2026-11-17). Each batch has its own review (`docs/CYCLE_2_IB2_REVIEW.md`, `…IB3_REVIEW.md`, `…IB4_REVIEW.md`); Improvement Batch 1 is in `docs/CYCLE_2_IMPROVEMENT_BATCH_1_REPORT.md`. No new topics, taxonomy, D-129 or learning-path changes. **Outcome: accepted with documented limitations.** The phase stops here; no new topics have been selected.

## 1. What was completed

| Batch | Commit | What changed |
|---|---|---|
| Improvement Batch 1 | `3d5aa38`, `35cf36b` | `mapping` evidence points separated; `usability-testing` citation retargeted; `plain-language` Easy Read sourced (Inclusion Europe); three Editorial sources read and verified with limits; HEART: two independent sources added (explanatory); SUS: unsupported Brooke 2013 attribution removed; Doherty lead presents 400 ms as a commonly repeated interpretation. |
| IB2 hygiene | `2216116` | Practice gaps closed on 12 entries (5 third-level quiz questions, 8 flashcards); `ericsson-simon-1993` citations retargeted in 3 places; Brooke 1996 and Shneiderman 1982 read; access attempts recorded for five abstract-only sources; `w3c-wcag-22` status re-checked; five reciprocal relations and a prose link; review script flashcard check fixed. |
| IB3 diagrams | `8863945` | Level-2 figures for `usability-testing`, `cognitive-walkthrough`, `card-sorting`, `ab-testing`, `keystroke-level-model`. |
| IB4 diagrams | `4f844f5` | Level-2 figures for `atomic-design`, `jobs-to-be-done`, `gulfs-of-execution-and-evaluation`, `working-memory-model`, `heart-framework`. |

Each figure restates only its entry's own content and cited sources; the KLM numbers come from `lib/formulas`.

## 2. Final coverage (generated `docs/CONTENT_COVERAGE.md`)

| Measure | Before the improvement phase | Now |
|---|---:|---:|
| Published entries | 102 | 102 (no new topics) |
| D-129 visual target | 92 / 102 | **102 / 102** |
| D-129 evidence target | 100 / 102 | **101 / 102** |
| Practice rated complete | 90 | **102 / 102** |
| Editorial rated complete | 98 | **101 / 102** |
| Evidence rated complete | 64 | 65 (37 developing; a rating, not a D-129 target) |
| Sources in the registry | 492 | 495 |
| Addressed within another entry (I1) | 10 | 18 |

The Visual maturity rating (plate, diagram and interactive model) is a stricter, separate view and is unchanged in kind: 9 complete; D-129 judges visuals by the target view above.

## 3. Remaining evidence gap and documented limitations (all in `docs/OPEN_ISSUES.md`)

- **HEART evidence target (IB1-2).** One primary source; the independent material (a practitioner case study, vendor documentation) is explanatory, not primary. No class change or relabelling. Owner decision if the target should fit single-paper frameworks.
- **`brooke-2013` unverified.** The article cannot be fetched (404 at both known locations); `system-usability-scale` Editorial stays developing; no claim rests on it.
- **Doherty:** the 1982 year and form number are not confirmed in the scan read; the 400 ms figure was not found in it.
- **Abstract-only sources.** Redish 1981 and 2000, Seckler 2014, Bargas-Avila 2007 and ISO 24495-1 were not retrievable (one attempt each); claims stay limited to the abstracts. Brooke 1996 was read from a third-party copy, not the publisher's edition.
- **Plate backlog (TD-1)** and the `confidence-intervals` plate text size at 390 px (TD-4) are untouched.
- **Minor and owner items:** presentation of the Level-2 text version numbering (IB3-F1); B1-DM-1, B1-IS-1, B1-D-1 (owner decisions); B2-O-2, B2-O-4, B3-o3; one HCI sentence's citation placement (IB2-F1).
- **Figures are text-and-box layouts**, like the existing Level-2 figures, not drawn diagrams.

## 4. QA results and untested areas (see `docs/QA_VERIFICATION_LEDGER.md`)

- **Run on every batch:** `npm run check` 586/586 (lint clean), `test:taxonomy`, `docs:generate`, `build` 995/995 (each build exited 1 once because the Next.js CLI printed an upgrade notice, then passed on the identical rerun; the notice was not acted on), the integrity script on the touched entries, and the per-entry browser review with the project's axe-core 4.14.0: axe 0 and no overflow on every touched page. IB3 and IB4 figures were also measured at 390 and 1440 px, light and dark: 40/40.
- **Failures that remain** are plate-geometry only, on pages already in the backlog.
- **Inherited, not rerun** in this phase: e2e, e2e-redesign, atlas (rerun once in the I1 commit), keyboard, devices, colour-studio, crawl; no shared layout, route or taxonomy file changed.
- **Not tested:** screen readers, physical devices, independent expert review.
- **Process incident:** a stale `next-server` process once served a mixed build and hid three new figures from a first browser pass; found and fixed within IB3 (noted in the ledger).

## 5. Next step

Cycle 2 new-topic planning is a separate request, not started or authorised by this report. It must satisfy the cluster rule (clusters A and E must be touched), re-run the dependency analysis and keep the domain caps (`docs/BALANCED_DEVELOPMENT_PLAN.md` § 2). The final remote commit and preview status are reported in the hand-off message and in `docs/PROJECT_STATE.md`.
