# Open issues

The single register of unresolved items. Details stay in the linked review or report; this file says what is open, whether it blocks, and what closes it. Update it when an item opens or closes (move closed items to § Closed with the commit that closed them).

Severity: critical · major · moderate · minor (see the `ux-academy-workflow` skill § 5). **Blocks publication** = blocks pushing or publishing the affected work.

Last updated: 2026-11-17, at the formal closure of Improvement Batch 1 (accepted with documented limitations). Follow-ups are scheduled in `docs/CYCLE_2_IMPROVEMENT_PLAN.md`, pending approval.

## Cycle and process

| ID | Description | Files | Severity | Blocks publication | Status | Required action | Related |
|---|---|---|---|---|---|---|---|
| C1-1 | **Decided 2026-11-17:** Cycle 2 begins with an improvement-only batch; no new topics. Scope proposal awaiting review: `docs/CYCLE_2_IMPROVEMENT_PROPOSAL.md`. Original: The § 9.3 stop rule was triggered in Batch 1 (`constraints` 5 rework commits; `feedback-principle`, `interaction-states` 2 each). The rule makes the next cycle an improvement cycle "until resolved". | `docs/BALANCED_DEVELOPMENT_PLAN.md` § 9.3; `docs/CYCLE_1_BALANCE_REVIEW.md` § 9 | moderate | No (blocks Cycle 2 new-topic planning) | Decided; scope awaiting owner approval | Owner reviews and approves the improvement-batch scope. Record the decision in DECISION_LOG when the batch is approved. | Cycle 1 review; D-129 |
| C1-2 | I1 coveredBy checks. **Done 2026-11-17** (see § Closed). | — | — | — | Closed | — | Cycle 1 review; I1 |
| C1-3 | Clusters A and E were untouched in Cycle 1; the plan requires every cluster within two cycles. | `docs/BALANCED_DEVELOPMENT_PLAN.md` § 2 | minor | No | Constraint for Cycle 2 planning | Cycle 2 plan must include a batch in A and in E. | Cycle 1 review |
| P-1 | `80f8058`, `8c7408e`, `a7c4937` pushed 2026-11-17 on owner approval; the I1 commit is local only. | — | — | — | Awaiting owner approval (I1 commit) | Push only on explicit approval. | Batch 3 |

## Improvement Batch 1 — open items and exclusions

| ID | Description | Severity | Blocks publication | Status | Required action |
|---|---|---|---|---|---|
| IB1-2 | `heart-framework` has one primary source (Rodden, Hutchinson & Fu 2010); D-129 evidence target not met. Two independent sources read and added as `explanatory` (Open Targets case study; Microsoft HEART documentation); no independent peer-reviewed evaluation could be read (one application study was blocked, HTTP 403). Owner decision 2026-11-17: keep the target, no class change, document the gap. | minor | No | Documented gap | Revisit only if a second primary or standard source can be read and verified. |
| IB1-5 | `system-usability-scale` Editorial stays developing: `brooke-2013` could not be read. | minor | No | Open | See TD-3 and N-1. |
| N-1 | ~~`system-usability-scale` attributed a claim to the unread Brooke (2013).~~ **Resolved in `35cf36b`** (attribution removed). | moderate | No | Closed | — |
| N-2 | The unread 1993 book `ericsson-simon-1993` is still cited by `think-aloud-protocol`, `interaction-design-discipline`, `human-computer-interaction`. | minor | No | Open | Review in a later improvement batch. |
| N-3 | ~~`doherty-threshold` lead presented 400 ms as the claim.~~ **Resolved in `35cf36b`**. Year (1982) and form number still not confirmed in the copy read. | minor | No | Closed (year/form open) | Confirm when a readable first-party copy is available. |
| N-4 | `brooke-1996` is a `bibliographic` record; SUS cites it for several statements and whether they were checked against the chapter is not recorded. | minor | No | Open observation | Check against the chapter if accessible. |
| EX-1 | Excluded from Improvement Batch 1 by owner decision (2026-11-17), preserved here: B2-O-3 (optional `mental-models` → think-aloud link), B2-O-4 (e2e `role="status"` hardening), B3-o2 (full-text reads of abstract-only sources), the ten diagrams (DEF-1), twelve Practice entries (DEF-2), the 78-plate marker backlog (TD-1). | — | No | Preserved | Consider in subsequent improvement work. |

## Deferred by owner decision (2026-11-17) — not dropped

| ID | Description | Severity | Blocks publication | Status | Required action |
|---|---|---|---|---|---|
| DEF-1 | Ten detailed (Level-2) diagrams below the D-129 visual target: `ab-testing`, `atomic-design`, `card-sorting`, `cognitive-walkthrough`, `gulfs-of-execution-and-evaluation`, `heart-framework`, `jobs-to-be-done`, `keystroke-level-model`, `usability-testing`, `working-memory-model`. | minor | No | Deferred to a later improvement batch | Consider in subsequent improvement work. |
| DEF-2 | Twelve entries with developing Practice: `aesthetic-usability-effect`, `confidence-intervals`, `doherty-threshold`, `jakobs-law`, `mental-models`, `net-promoter-score`, `recognition-over-recall`, `sample-size-estimation`, `signifiers`, `steering-law`, `teslers-law`, `user-centred-design`. | minor | No | Deferred to a later improvement batch | Consider in subsequent improvement work. |
| DEF-3 | Five coveredBy candidates left planned: Empty-State Writing, State Transitions, Utility, Usefulness, Desirability. | minor | No | Intentional | Revisit only if a host is extended to explain the topic; never changed to reach a count. |

## Technical debt

| ID | Description | Files | Severity | Blocks publication | Status | Required action | Related |
|---|---|---|---|---|---|---|---|
| TD-1 | 152 numbered plate markers in 78 plates extend past the 400 × 300 viewBox and are clipped (audit 2026-11-16). Shows up as entry-review failures on pre-existing entries (e.g. error-recovery 3, error-prevention 1, nielsen-usability-heuristics 1). | `docs/VISUAL_QA.md` (full list); `components/illustrations/**` | moderate | No (pre-existing; new plates are clean) | Open; excluded from batch scope by owner | A dedicated marker-fix task when the owner authorises it. | VISUAL_QA; Batch 1 review |
| TD-2 | 11 published entries are below their D-129 targets; all pre-date Cycle 1. | `docs/CONTENT_COVERAGE.md` § Targets | minor | No | Open | Address in improvement batches. | D-129; Cycle 1 review |
| TD-3 | `brooke-2013` still awaiting verification (the article could not be read; see IB1-5). The other three records were verified in Improvement Batch 1 (`3d5aa38`). Eight URLs still block automated checks. | `content/sources/**` | minor | No | Partly closed (3 of 4) | Read Brooke (2013) from a copy that can be fetched, or decide N-1. | Improvement Batch 1 report |

## Batch 3 (UX writing) — minors

| ID | Description | Files | Severity | Blocks publication | Status | Required action | Related |
|---|---|---|---|---|---|---|---|
| B3-o1 | ~~`plain-language` Easy Read unsourced.~~ **Closed in `3d5aa38`** (Inclusion Europe standards read and cited), pending owner review. | `content/knowledge/content/plain-language.ts` | minor | No | Closed | — | Improvement Batch 1 report IB1-4 |
| B3-o2 | Redish 1981/2000, Seckler 2014, Bargas-Avila 2007 read as abstracts; Shneiderman 1982 opening only; ISO 24495-1 not read. Claims are limited accordingly. | `content/sources/ux-writing.ts` | minor | No | Open | Read full texts where accessible. | CYCLE_1_BALANCE_REVIEW § 1 |
| B3-o3 | Linked planned targets remain planned: `tone-of-voice`, `content-strategy`, `form-design`, `readability-formulas`, `cognitive-accessibility`, `deceptive-patterns`, `content-audit`. | `content/taxonomy.ts` | minor | No | Open (expected) | Covered by future batches. | CYCLE_1_BALANCE_REVIEW § 1 |

## Batch 2 (UX research) — minors

| ID | Description | Files | Severity | Blocks publication | Status | Required action | Related |
|---|---|---|---|---|---|---|---|
| B2-O-1 | ~~`usability-testing` cited the unread Ericsson & Simon 1993.~~ **Closed in `3d5aa38`** (retargeted to the DOI-verified 1980 paper, abstract read), pending owner review. | `content/knowledge/research/usability-testing.ts` | minor | No | Closed | — | Improvement Batch 1 report IB1-3 |
| B2-O-2 | Validation-study searches for tree testing and contextual inquiry were not systematic. | — | minor | No | Open | Systematic search if the owner wants it. | BATCH_2_REVIEW § 4 |
| B2-O-3 | `mental-models` mentions think-aloud without a link. | `mental-models` entry | minor | No | Open (optional) | Add the link. | BATCH_2_REVIEW |
| B2-O-4 | Optional e2e hardening (`role="status"`). | `tests/browser/` | minor | No | Open (optional) | Harden the selector. | BATCH_2_REVIEW |

## Batch 1 (interaction principles) — minors

| ID | Description | Severity | Blocks publication | Status | Required action |
|---|---|---|---|---|---|
| B1-FP-6 | `feedback-principle` → `doherty-threshold` has no link back. | minor | No | Open (optional) | Reciprocal relation. |
| B1-C-4 | `constraints` → `jakobs-law`, `user-control-and-freedom` have no link back. | minor | No | Open (optional) | Reciprocal relations. |
| B1-DM-1 | Hutchins, Hollan & Norman (1985) read from a course-reading copy; 13 claims + the L2 figure rely on it. | minor | No | Owner decision | Confirm against a publisher/library copy if wanted. |
| B1-IS-1 | `interaction-states` evidence class `official-standard` is a judgement call. | minor | No | Owner decision | Owner confirms the class. |
| B1-IS-2 | `interaction-states` → `colour-contrast-ratio` has no link back. | minor | No | Open (optional) | Reciprocal relation. |
| B1-D-1 | `discoverability` is in no learning path. | minor | No | Owner decision (paths are reserved to the plan) | Owner decides. |
| B1-D-2 | `discoverability` → `cognitive-walkthrough` has no link back. | minor | No | Open (optional) | Reciprocal relation. |
| B1-W | `w3c-wcag-22` record still notes "status should be re-checked". | minor | No | Open | Update the record. |

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
