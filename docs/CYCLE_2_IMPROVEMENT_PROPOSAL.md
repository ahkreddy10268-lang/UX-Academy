# Cycle 2 improvement batch — proposed scope (for owner review)

Status: **proposal only. Nothing in it has been started.** Owner decision 2026-11-17: Cycle 2 begins with an improvement-only batch (plan § 9.3 stop rule); no new Cycle 2 topics are selected or produced. All figures come from the generated `docs/CONTENT_COVERAGE.md` at the I1 commit and from `docs/OPEN_ISSUES.md`.

## 1. What "remaining quality-gate regressions" means here

No published entry fails a test or a hard gate: `npm run check` is 586/586, and Explanation is complete on 102/102. The shortfalls are against the D-129 **targets** and the maturity ratings, plus known defects. Nothing below is a regression introduced by Cycle 1 (the 11 below-target entries and the marker backlog all pre-date it).

| Measure | Now | Source |
|---|---|---|
| D-129 visual target | 92 / 102 meet | CONTENT_COVERAGE § Targets |
| D-129 evidence target | 100 / 102 meet | same |
| Practice developing | 12 entries | CONTENT_COVERAGE § Maturity |
| Editorial developing | 4 entries | same |
| Evidence developing | 38 entries | same (rating, not a D-129 target) |
| Plate markers clipped | 152 in 78 plates | `docs/VISUAL_QA.md` (TD-1) |
| Sources awaiting verification | 4 records | OPEN_ISSUES TD-3 |

## 2. Candidate work, in recommended priority

**Priority 1 — meets a stated D-129 target, small (2 entries).**
- `mapping`: evidence target misses "two evidence points".
- `heart-framework`: evidence target misses "two primary or standard sources" and the visual target misses a detailed diagram.

**Priority 2 — visual target, the largest block (10 entries need a Level-2 diagram; `heart-framework` is counted above).** `ab-testing`, `atomic-design`, `card-sorting`, `cognitive-walkthrough`, `gulfs-of-execution-and-evaluation`, `jobs-to-be-done`, `keystroke-level-model`, `usability-testing`, `working-memory-model`. Method, theory, model and framework families need one each. These are real figures with verified content (CLAUDE.md figure rules), so they are the costly part: one at a time, never a blanket restyle. Suggested split into two improvement batches of about five.

**Priority 3 — maturity ratings that are cheap and bounded.**
- Editorial developing (4): `doherty-threshold`, `keystroke-level-model`, `shneiderman-golden-rules`, `system-usability-scale`. Likely tied to the 4 sources awaiting verification (TD-3: `brooke-2013`, `doherty-thadani-1982`, `kieras-2001-klm`, `shneiderman-golden-rules-page`); each needs a real verification attempt, not a status edit.
- Practice developing (12): `aesthetic-usability-effect`, `confidence-intervals`, `doherty-threshold`, `jakobs-law`, `mental-models`, `net-promoter-score`, `recognition-over-recall`, `sample-size-estimation`, `signifiers`, `steering-law`, `teslers-law`, `user-centred-design`.

**Priority 4 — accuracy fixes already identified in reviews (small, no new content).**
- B2-O-1: `usability-testing` cites the unread Ericsson & Simon 1993; retarget to `ericsson-simon-1980`.
- B3-o1: Easy Read in `plain-language` has no source.
- Optional reciprocal relations (B1-FP-6, C-4, IS-2, D-2) and the `mental-models` think-aloud link (B2-O-3).
- `w3c-wcag-22` record note (B1-W).

**Priority 5 — visual defect backlog (TD-1).** 152 clipped markers in 78 plates. Its exclusion from the Cycle 1 batch briefs was an owner decision, so it is listed, not scheduled. It is mechanical and could be one dedicated task; it changes shared plate components, so it invalidates inherited browser QA and would need the full suite.

**Not proposed (no evidence they are defects):** the 38 evidence-developing entries (D-129 judges evidence by class and the nature of the claims, not by this rating) and re-working the 5 Batch 1 entries.

## 3. Constraints that shape the scope

- Plan § 9.3: no new topics in this batch. Plan § 2: one batch per domain per cycle and no domain above 40 % still apply to the improvement cycle if the work is counted by domain. Priority 2 spans Research, Methods, Cognition, Design Systems and Metrics, which is naturally balanced.
- Cluster A and E coverage (C1-3) belongs to the later new-topic part of Cycle 2, not this batch.
- Owner-decision items stay owner decisions: `interaction-states` evidence class (B1-IS-1), `discoverability` in a path (B1-D-1), Hutchins et al. copy (B1-DM-1). Learning paths and D-129 are not changed.

## 4. Decisions needed from the owner

1. Which priorities are in the improvement batch (recommended: 1 and 4, then Priority 2 in two batches, with Priority 3's source verification alongside the entries it affects).
2. Whether the marker backlog (Priority 5) is scheduled now or stays deferred.
3. Whether improvement batches are reviewed with the same five-dimension review before push.

Recommended first batch: **Priority 1 + Priority 4 + the Editorial-developing entries** (about 10 entries touched, no new figures): small, high value, and it gets the quality targets closer before the figure-heavy batches.
