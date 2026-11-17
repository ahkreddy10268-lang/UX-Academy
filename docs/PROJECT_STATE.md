# Project state

The current state in one page. Read it first every session, then verify it against `git` (the repo wins; record any discrepancy here). Update it at the end of every meaningful task. History lives in `docs/PROGRESS.md`; decisions in `docs/DECISION_LOG.md`; open items in `docs/OPEN_ISSUES.md`; test results in `docs/QA_VERIFICATION_LEDGER.md`.

Last updated: **2026-11-17**.

## Repository

| Item | Value | Verified |
|---|---|---|
| Working branch | `claude/batch1-constraints` | 2026-11-17 (`git branch --show-current`) |
| Local HEAD | `8c7408e` — Cycle 1, Batch 3 review and Cycle 1 balance review | 2026-11-17 |
| Uncommitted | Memory and skill files of the infrastructure task (committed locally with this update; see § Latest task) | 2026-11-17 |
| Remote branch `origin/claude/batch1-constraints` | `8cbd4ad` (Batch 2 review) — local is ahead by `80f8058`, `8c7408e` and the infrastructure commit | 2026-11-17 (`git ls-remote`) |
| `origin/main` | `b788511` (unchanged) | 2026-11-17 (`git ls-remote`) |
| PR #2 (`ahkreddy10268-lang/UX-Academy`) | head `a1f6373`; open and unmerged when last read via the GitHub API on 2026-11-16. Head ref unchanged on 2026-11-17 (`git ls-remote`); open/merged state not re-read since. Not to be modified. | 2026-11-16 / 2026-11-17 |
| Vercel preview for `8cbd4ad` | `dpl_6zLCiS3JNG6aKAz13XZtRWtEH4z4`, READY | 2026-11-16 |
| Vercel preview for later commits | none (not pushed) | — |

## Content strategy and cycle

- Strategy: **D-129** balanced development (`docs/BALANCED_DEVELOPMENT_PLAN.md`). Taxonomy v1.0 frozen (20 domains).
- **Cycle 1** — three batches, all produced and reviewed:

| Batch | Topics | Production | Review | Pushed |
|---|---|---|---|---|
| 1 Interaction principles | feedback-principle, constraints, direct-manipulation, interaction-states, discoverability | `3177819`…`fd86db0` | `07fa577` PASS WITH MINOR FOLLOW-UPS (`docs/BATCH_1_REVIEW.md`) | Yes |
| 2 UX research foundations | think-aloud-protocol, tree-testing, contextual-inquiry, in-depth-interviews | `bf39a79` | `8cbd4ad` PASS WITH MINOR FOLLOW-UPS (`docs/BATCH_2_REVIEW.md`) | Yes (approved) |
| 3 UX writing foundations | ux-writing, content-design, plain-language, microcopy, error-messages | `80f8058` (`docs/BATCH_3_REPORT.md`) | `8c7408e` PASS WITH MINOR FOLLOW-UPS (`docs/CYCLE_1_BALANCE_REVIEW.md`) | **No — awaiting approval** |

- **Cycle 1 balance review** (`8c7408e`): **IMPROVEMENT REQUIRED** — 88 → 102 published entries, caps respected, three paths at 100 %, no regressions; but the § 9.3 stop rule was triggered by Batch 1 (C1-1) and I1 coveredBy checks are not done (C1-2).
- **Cycle 2: not authorised** for new-topic planning. Clusters A and E must be included when it is planned (C1-3).

## Latest decisions

- D-129 (2026-11-12) balanced development; D-130 Colour Studio is a tool lab. See `docs/DECISION_LOG.md`.
- Owner, 2026-11-16: Batch 2 approved and closed; push of `bf39a79` + `8cbd4ad` approved and done; Batch 3 authorised.
- Pending owner decisions: C1-1 (stop rule), I1 authorisation (C1-2), push of `80f8058` + `8c7408e` (P-1), and the Batch 1 owner items (B1-DM-1, B1-IS-1, B1-D-1).

## Latest task

**Persistent project memory and reusable skill** (owner request, 2026-11-17; infrastructure only — no entries, paths, UI, gates or history changed): created `.claude/skills/ux-academy-workflow/SKILL.md`, this file, `docs/QA_VERIFICATION_LEDGER.md`, `docs/OPEN_ISSUES.md`; updated `CLAUDE.md` (session start + QA convention) and `tests/browser/README.md`; added the reusable review tools `scripts/entry-integrity.ts` and `tests/browser/entry-review.cjs`. Committed locally; not pushed.

## Current approved task

None in progress. The infrastructure task is complete and awaits the owner's review.

## Next authorised action

**Wait for the owner.** The owner's next decisions, in the order the Cycle 1 review recommends:
1. Decide how the § 9.3 stop rule applies (C1-1).
2. Authorise I1 coveredBy checks (C1-2).
3. Approve or withhold the push of the local commits (P-1).

Do not push, merge, plan or start Cycle 2, or start any batch until instructed.

## Open follow-ups

See `docs/OPEN_ISSUES.md`: C1-1…C1-3, P-1, TD-1 (78-plate marker backlog), TD-2, TD-3, B3-o1…o3, B2-O-1…O-4, Batch 1 minors, T-1 (no screen-reader/device testing).
