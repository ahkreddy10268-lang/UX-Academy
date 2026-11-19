# Open issues

The single register of unresolved items. Details stay in the linked review or report; this file says what is open, whether it blocks, and what closes it. Update it when an item opens or closes (move closed items to § Closed with the commit that closed them).

Severity: critical · major · moderate · minor (see the `ux-academy-workflow` skill § 5). **Blocks publication** = blocks pushing or publishing the affected work.

Last updated: 2026-11-18, after the error-fix pass (`732077a`).

## Cycle and process

| ID | Description | Files | Severity | Blocks publication | Status | Required action | Related |
|---|---|---|---|---|---|---|---|
| C1-1 | **Decided 2026-11-17:** Cycle 2 begins with an improvement-only batch; no new topics. Scope proposal awaiting review: `docs/CYCLE_2_IMPROVEMENT_PROPOSAL.md`. Original: The § 9.3 stop rule was triggered in Batch 1 (`constraints` 5 rework commits; `feedback-principle`, `interaction-states` 2 each). The rule makes the next cycle an improvement cycle "until resolved". | `docs/BALANCED_DEVELOPMENT_PLAN.md` § 9.3; `docs/CYCLE_1_BALANCE_REVIEW.md` § 9 | moderate | No (blocks Cycle 2 new-topic planning) | Decided; scope awaiting owner approval | Owner reviews and approves the improvement-batch scope. Record the decision in DECISION_LOG when the batch is approved. | Cycle 1 review; D-129 |
| C1-2 | I1 coveredBy checks. **Done 2026-11-17** (see § Closed). | — | — | — | Closed | — | Cycle 1 review; I1 |
| C1-3 | Clusters A and E were untouched in Cycle 1; the plan requires every cluster within two cycles. | `docs/BALANCED_DEVELOPMENT_PLAN.md` § 2 | minor | No | Addressed in the provisional Cycle 3 plan (B5 = A, B8 = E; D-131) | Confirm with the pre-cycle checks. (Cycle 2 is the improvement phase IB1–IB4; the first new-topic cycle after it is Cycle 3.) | Cycle 1 review; D-131 |
| C3-1 | **B4 placement to confirm.** The owner kept Accessibility "explicitly scheduled for Cycle 3", but under the same day's numbering Cycle 3 is the B6/B5/B8 cycle, and a cycle has three slots. Recorded as: B4 Accessibility in code is the first batch of the new-topic cycle after Cycle 3, unless the owner places it otherwise. The pre-cycle dependency check must also confirm that delaying B4 leaves no critical path or prerequisite gap (B4 feeds B19 and, loosely, B10 per D-129 § 8). | `docs/DECISION_LOG.md` D-131 | minor | No | Awaiting owner confirmation | Owner confirms B4's cycle; dependency check reports the gap result. | D-129 § 5, § 8; D-131 |
| C3-2 | **Cluster rotation after an improvement-only cycle.** If the improvement-only Cycle 2 counts toward "every cluster within two cycles", clusters B and D (touched only in Cycle 1) would need a Cycle 3 batch, which the provisional plan (C, A, E) does not have. If only new-topic cycles count, the cycle after Cycle 3 must touch B and D. D-129 does not say which; this is not decided here. | `docs/BALANCED_DEVELOPMENT_PLAN.md` § 2.3 | minor | No | Awaiting owner interpretation | Owner states how improvement-only cycles count for the cluster rule before Cycle 3 is confirmed. | D-129; D-131 |
| P-1 | `80f8058`, `8c7408e`, `a7c4937` pushed 2026-11-17 on owner approval; the I1 commit is local only. | — | — | — | Awaiting owner approval (I1 commit) | Push only on explicit approval. | Batch 3 |

## Improvement Batch 1 — open items and exclusions

| ID | Description | Severity | Blocks publication | Status | Required action |
|---|---|---|---|---|---|
| IB1-2 | `heart-framework` has one primary source (Rodden, Hutchinson & Fu 2010); D-129 evidence target not met. Two independent sources read and added as `explanatory` (Open Targets case study; Microsoft HEART documentation); no independent peer-reviewed evaluation could be read (one application study was blocked, HTTP 403). Owner decision 2026-11-17: keep the target, no class change, document the gap. | minor | No | Documented gap | Revisit only if a second primary or standard source can be read and verified. |
| IB1-5 | `system-usability-scale` Editorial stays developing: `brooke-2013` could not be read. | minor | No | Open | See TD-3 and N-1. |
| N-1 | ~~`system-usability-scale` attributed a claim to the unread Brooke (2013).~~ **Resolved in `35cf36b`** (attribution removed). | moderate | No | Closed | — |
| N-2 | ~~`ericsson-simon-1993` cited by three entries.~~ **Closed in IB2 (`2216116`)**: two entries and the HCI explorer now cite the 1980 abstract; `think-aloud-protocol` keeps a labelled bibliographic mention. | minor | No | Closed | — |
| N-3 | ~~`doherty-threshold` lead presented 400 ms as the claim.~~ **Resolved in `35cf36b`**. Year (1982) and form number still not confirmed in the copy read. | minor | No | Closed (year/form open) | Confirm when a readable first-party copy is available. |
| N-4 | ~~`brooke-1996` read status unknown.~~ **Closed in IB2**: read from a third-party copy and the SUS statements confirmed; record stays `bibliographic` (not the publisher's edition). | minor | No | Closed | — |
| EX-1 | Excluded from Improvement Batch 1 by owner decision (2026-11-17), preserved here: B2-O-3 (optional `mental-models` → think-aloud link), B2-O-4 (e2e `role="status"` hardening), B3-o2 (full-text reads of abstract-only sources), the ten diagrams (DEF-1), twelve Practice entries (DEF-2), the 78-plate marker backlog (TD-1). | — | No | Preserved | Consider in subsequent improvement work. |

## Deferred by owner decision (2026-11-17) — not dropped

| ID | Description | Severity | Blocks publication | Status | Required action |
|---|---|---|---|---|---|
| DEF-1 | ~~Ten detailed (Level-2) diagrams below the D-129 visual target.~~ **Closed in IB3 (`8863945`) and IB4 (`4f844f5`)**: D-129 visual target 102/102. | minor | No | Closed | — |
| DEF-2 | ~~Twelve entries with developing Practice.~~ **Closed in IB2**: Practice complete 102/102. | minor | No | Closed | — |
| DEF-3 | Five coveredBy candidates left planned: Empty-State Writing, State Transitions, Utility, Usefulness, Desirability. | minor | No | Intentional | Revisit only if a host is extended to explain the topic; never changed to reach a count. |

## Technical debt

| ID | Description | Files | Severity | Blocks publication | Status | Required action | Related |
|---|---|---|---|---|---|---|---|
| TD-1 | ~~152 numbered plate markers in 78 plates clipped at the viewBox edge.~~ **Closed in `732077a`** (2026-11-18): the marker primitives keep the whole marker inside the 400 × 300 viewBox; a sweep of all 583 plate pages finds 0 markers outside and 0 clipped text. Regression test `tests/plate-markers.test.ts`. | `components/illustrations/system/*` | moderate | No | Closed | — | VISUAL_QA |
| TD-2 | 11 published entries are below their D-129 targets; all pre-date Cycle 1. | `docs/CONTENT_COVERAGE.md` § Targets | minor | No | Open | Address in improvement batches. | D-129; Cycle 1 review |
| TD-3 | `brooke-2013` still awaiting verification (the article could not be read; see IB1-5). The other three records were verified in Improvement Batch 1 (`3d5aa38`). Eight URLs still block automated checks. | `content/sources/**` | minor | No | Partly closed (3 of 4) | Read Brooke (2013) from a copy that can be fetched, or decide N-1. | Improvement Batch 1 report |
| TD-4 | ~~`confidence-intervals` plate text 7.9 px at 390 px.~~ **Closed in `732077a`**: labels raised to `T.min`; the same sweep found and fixed `serial-position-effect` (8.6 px). No plate page now has visible text under 10 px at 390 px. | `components/illustrations/concepts/*` | minor | No | Closed | — | IB2 review |
| TD-5 | ~~Interactive explorers used 11-unit labels (9.8 px on a 390 px phone).~~ **Closed 2026-11-18**: the seven explorer labels and the dimension label use `T.min` (11.6 px at 390 px); the Fitts explorer's start and W′ labels reposition so no text leaves the canvas at any slider value (checked at every slider extreme on all three explorers). | `components/illustrations/interactive/explorers.tsx`, `components/illustrations/primitives.tsx` | minor | No | Closed | — | 2026-11-18 sweep |

## Fixed 2026-11-18 (`732077a`)

- **SEC-1** Next.js 16.4.4 advisory GHSA-mfr8-8qww-v76h (moderate) — upgraded to 16.4.6 with `eslint-config-next` to match; dev-only minimatch advisory fixed by `npm audit fix`. `npm audit`: 0 vulnerabilities. The CLI security notice that made every build exit 1 once no longer appears.
- **IB3-F1** Level-2 text versions double-numbered items — the list keeps ordered semantics without visible automatic numbers.
- **DSA-1** `design-system-audits` plate label "reach →" was clipped at the bottom edge — moved inside.
- **QA-1** `e2e-redesign` expected 18 concepts with a detailed diagram; IB3 and IB4 made it 28, and the earlier ledger marked the suite as inherited when it should have been rerun. Expectation updated to the verified 28.

## Batch 3 (UX writing) — minors

| ID | Description | Files | Severity | Blocks publication | Status | Required action | Related |
|---|---|---|---|---|---|---|---|
| B3-o1 | ~~`plain-language` Easy Read unsourced.~~ **Closed in `3d5aa38`** (Inclusion Europe standards read and cited), pending owner review. | `content/knowledge/content/plain-language.ts` | minor | No | Closed | — | Improvement Batch 1 report IB1-4 |
| B3-o2 | Partly closed in IB2: `shneiderman-1982` read in full (author's copy). `redish-1981`, `redish-2000`, `seckler-2014-web-forms`, `bargas-avila-2007`, `iso-24495-1-2023`: one access attempt each (403 / paywall / unreadable); abstract-only limits stay. | `content/sources/ux-writing.ts` | minor | No | Open (limit documented) | Only if a readable copy becomes available. | IB2 review |
| B3-o3 | Linked planned targets remain planned: `tone-of-voice`, `content-strategy`, `form-design`, `readability-formulas`, `cognitive-accessibility`, `deceptive-patterns`, `content-audit`. | `content/taxonomy.ts` | minor | No | Open (expected) | Covered by future batches. | CYCLE_1_BALANCE_REVIEW § 1 |

## Batch 2 (UX research) — minors

| ID | Description | Files | Severity | Blocks publication | Status | Required action | Related |
|---|---|---|---|---|---|---|---|
| B2-O-1 | ~~`usability-testing` cited the unread Ericsson & Simon 1993.~~ **Closed in `3d5aa38`** (retargeted to the DOI-verified 1980 paper, abstract read), pending owner review. | `content/knowledge/research/usability-testing.ts` | minor | No | Closed | — | Improvement Batch 1 report IB1-3 |
| B2-O-2 | Validation-study searches for tree testing and contextual inquiry were not systematic. | — | minor | No | Open | Systematic search if the owner wants it. | BATCH_2_REVIEW § 4 |
| B2-O-3 | ~~`mental-models` think-aloud link.~~ **Closed in IB2** (prose link added). | minor | No | Closed | — |
| B2-O-4 | Optional e2e hardening (`role="status"`). | `tests/browser/` | minor | No | Open (optional) | Harden the selector. | BATCH_2_REVIEW |

## Batch 1 (interaction principles) — minors

| ID | Description | Severity | Blocks publication | Status | Required action |
|---|---|---|---|---|---|
| B1-FP-6 | ~~No link back from `doherty-threshold`.~~ **Closed in IB2.** | minor | No | Closed | — |
| B1-C-4 | ~~No links back to `constraints`.~~ **Closed in IB2.** | minor | No | Closed | — |
| B1-DM-1 | Hutchins, Hollan & Norman (1985) read from a course-reading copy; 13 claims + the L2 figure rely on it. | minor | No | Owner decision | Confirm against a publisher/library copy if wanted. |
| B1-IS-1 | `interaction-states` evidence class `official-standard` is a judgement call. | minor | No | Owner decision | Owner confirms the class. |
| B1-IS-2 | ~~No link back from `colour-contrast-ratio`.~~ **Closed in IB2.** | minor | No | Closed | — |
| B1-D-1 | `discoverability` is in no learning path. | minor | No | Owner decision (paths are reserved to the plan) | Owner decides. |
| B1-D-2 | ~~No link back from `cognitive-walkthrough`.~~ **Closed in IB2.** | minor | No | Closed | — |
| B1-W | ~~`w3c-wcag-22` note.~~ **Closed in IB2**: status re-checked 2026-11-17. | minor | No | Closed | — |

Details: `docs/BATCH_1_REVIEW.md` §§ 3, 7, 9.

## Testing gaps

| ID | Description | Severity | Blocks publication | Status | Required action |
|---|---|---|---|---|---|
| T-1 | No screen-reader, physical-device or independent expert testing (the container has none). Keyboard, accessibility-tree, emulation and axe suites pass. | minor (stated limitation) | No | Open | Manual testing by the owner or a tester. |

## Product known issues

The UI known issues (static lesson rail on phones, chip-row scrolling, steering-lab keyboard, HTTP 200 on unknown dynamic slugs, etc.) are kept in `docs/ROADMAP.md` § Known issues and not duplicated here.

## Closed

- **IB1-1, IB1-3, IB1-4, IB1-5 (3 of 4), B2-O-1, B3-o1, N-1, N-3** — Improvement Batch 1 accepted by the owner 2026-11-17 with corrections (`3d5aa38`, `35cf36b`).
- **C1-2 — I1 coveredBy checks** (2026-11-17). Reconciled: 13 candidates (plan § 7.3 marks 9; my first report said 10 and missed `utility`, `usefulness`, `desirability`; the owner's "11" matches no list in the repository). 8 applied (ISO/IEC 40500, Success Criteria, Conformance Levels → `wcag`; Effectiveness, Efficiency, Satisfaction → `usability`; Margin of Error → `confidence-intervals`; Emphasis → `visual-hierarchy`); 5 deferred and left planned (Empty-State Writing, State Transitions, Utility, Usefulness, Desirability). Addressed within 10 → 18. Full table with reasons: `docs/CONTENT_AUDIT.md` session 51.
