# Cycle 2 — consolidated improvement plan (for one owner approval)

Status: **proposed; awaiting approval. Nothing in it is started.** It supersedes `docs/CYCLE_2_IMPROVEMENT_PROPOSAL.md`. Basis: D-129 § 9.3 (Batch 1 triggered the stop rule, so Cycle 2 is improvement-only until this plan is done), `docs/OPEN_ISSUES.md`, and the generated `docs/CONTENT_COVERAGE.md` at `47f4fbe` (102 published; evidence target 101/102; visual target 92/102; Practice developing 12; Editorial developing 1).

No new topics, no taxonomy, D-129 or learning-path changes. The 78-plate marker backlog stays outside the plan.

## 1. Plan at a glance

| Batch | Scope | Entries touched | Closes |
|---|---|---|---|
| **IB2** Evidence, source and Practice hygiene | Source corrections already identified; Practice gaps; small relation fixes | about 25 | N-2, N-4, B3-o2 (where accessible), B1 optional relations, B2-O-3, `w3c-wcag-22` note, DEF-2 |
| **IB3** Detailed diagrams A (research and evaluation methods) | One Level-2 figure each | 5 | part of DEF-1 |
| **IB4** Detailed diagrams B (frameworks, models, theory) | One Level-2 figure each | 5 | rest of DEF-1 |

Expected end state if every item succeeds: visual target 92 → **102/102**, Practice developing 12 → **0**, evidence target stays **101/102**, Editorial stays 101 unless `brooke-2013` is read. The two unmet items are source-access limits, not defects (§ 5).

## 2. IB2 — Evidence, source and Practice hygiene (small, first)

**Practice (DEF-2; 12 entries).** The gaps are small and exact: `aesthetic-usability-effect`, `confidence-intervals`, `doherty-threshold`, `sample-size-estimation` and `user-centred-design` lack quiz questions at a third level (they have two); `doherty-threshold`, `jakobs-law`, `mental-models`, `net-promoter-score`, `recognition-over-recall`, `signifiers`, `steering-law` and `teslers-law` have two flashcards, not three. Each new item must be answerable from the entry's own cited content, with one correct option and an explanation. Acceptance: Practice rated complete on all 12.

**Source and citation fixes (evidence).**
- N-2: retarget the unread `ericsson-simon-1993` in `think-aloud-protocol`, `interaction-design-discipline`, `human-computer-interaction` to what was actually read, or reword to the claim the abstract supports.
- N-4: check `brooke-1996` claims in `system-usability-scale` against the chapter if a copy can be read; otherwise record the limit.
- `brooke-2013` and B3-o2 (abstract-only sources: Redish, Seckler, Bargas-Avila, Shneiderman 1982, ISO 24495-1): one reasonable access attempt each; if unreadable, document and stop.
- Record note on `w3c-wcag-22` (B1-W).

**Relations (optional links, minor).** Reciprocal links B1-FP-6, C-4, IS-2, D-2 and the `mental-models` → think-aloud link (B2-O-3), added only where they help a learner.

**Out of IB2:** B1-DM-1 (course-reading copy), B1-IS-1 (evidence class), B1-D-1 (path), HEART second primary source: owner-level decisions, listed in § 5.

## 3. IB3 and IB4 — the ten detailed diagrams (DEF-1)

Each figure follows `docs/DIAGRAM_DESIGN_GUIDELINES.md` and the Visual Knowledge Engine rules: objective, takeaway, ordered text version, verification kind, sources from the entry's own references, one figure at a time, never a blanket restyle.

- **IB3 (methods):** `usability-testing`, `cognitive-walkthrough`, `card-sorting`, `ab-testing`, `keystroke-level-model`.
- **IB4 (frameworks, models, theory):** `atomic-design`, `jobs-to-be-done`, `gulfs-of-execution-and-evaluation`, `working-memory-model`, `heart-framework`.

A figure may show only what the entry's sources support; numbers drawn come from `lib/formulas`. Acceptance per figure: D-129 visual target met, figure tests pass, labels at the rendered-pixel minimums at 390 and 1440, axe 0.

## 4. Working protocol for the whole improvement cycle (to stop review loops)

1. **One implementation commit and one formal review per batch**, in separate commits, targeted at the touched entries only. No repeated repository audits; unchanged areas reuse the QA ledger.
2. **Outcome vocabulary:** PASS, PASS WITH DOCUMENTED LIMITATIONS, or REWORK REQUIRED. A batch closes as PASS WITH DOCUMENTED LIMITATIONS when every critical, major and moderate finding is fixed or explicitly accepted and the rest are in `OPEN_ISSUES.md`.
3. **Only critical or major findings** (false or fabricated content, a broken build, an accessibility failure, a security issue) reopen a closed batch. Moderate findings are fixed once, in the review commit. Minors go to the register.
4. **Source-access gaps get one reasonable attempt** (a search plus a direct fetch of the best candidates). If a source still cannot be read, the entry states what could not be confirmed and the gap goes in the register. No relabelling, no inferred citations, no evidence-class changes to reach a target.
5. **Records:** one state update per batch (PROJECT_STATE, OPEN_ISSUES, QA ledger, PROGRESS), written with the review commit. No cosmetic or repeat documentation commits.
6. **Stops:** the owner is asked only (a) once now to approve this plan, and (b) at the end of IB4, or earlier if a critical or major defect appears. Pushes to `claude/batch1-constraints` after each batch's review commit are covered by the plan approval if no critical or major finding is open; `main`, PR #2 and production are never touched.

## 5. Accepted limitations carried through the cycle (not scheduled, not forced)

| Item | Status |
|---|---|
| HEART evidence target (`heart-framework`, one primary source) | Accepted gap; revisit only if a second primary or standard source is found. Owner decision on whether the target fits a single-paper framework, if wanted. |
| `brooke-2013` verification; SUS Editorial developing | One access attempt in IB2; otherwise accepted. |
| Doherty year (1982) and form number unconfirmed | Accepted; confirm if a readable first-party copy appears. |
| 78-plate marker backlog (TD-1) | Separate technical debt; changes shared plate components; needs its own scheduling decision. |
| Screen-reader, physical-device and independent expert testing | Not available in the environment; remains untested and stated as such. |
| Owner-level items B1-DM-1, B1-IS-1, B1-D-1 | Remain with the owner; unaffected. |

## 6. After the cycle

When IB4 closes, the stop rule is resolved. Cycle 2 new-topic planning would then be a separate request: it must satisfy the cluster rule (A and E must be touched), re-run dependency analysis, and keep the domain caps (`docs/BALANCED_DEVELOPMENT_PLAN.md` § 2). It is **not** authorised or started by this plan.

## 7. The one decision requested

Approve this plan as written (IB2 → IB3 → IB4 under the protocol in § 4), or amend it in one reply. Approval covers implementing and reviewing all three batches and pushing each to `claude/batch1-constraints`.
