# Project state

The current state in one page. Read it first every session, then verify it against `git` (the repo wins; record any discrepancy here). Update it at the end of every meaningful task. History lives in `docs/PROGRESS.md`; decisions in `docs/DECISION_LOG.md`; open items in `docs/OPEN_ISSUES.md`; test results in `docs/QA_VERIFICATION_LEDGER.md`.

Last updated: **2026-11-17**.

## Repository

| Item | Value | Verified |
|---|---|---|
| Working branch | `claude/batch1-constraints` | 2026-11-17 |
| Pushed HEAD | `9931f1a` (owner-approved push of the I1 commit); remote HEAD equalled local HEAD after the push | 2026-11-17 (`git ls-remote`) |
| Local HEAD | `9931f1a` + one unpushed documentation commit (coveredBy reconciliation, Improvement Batch 1 scope, state records) | 2026-11-17 |
| `origin/main` | `b788511`, unchanged | 2026-11-17 (`git ls-remote`) |
| PR #2 | open, not merged; head `a1f6373` unchanged | 2026-11-17 (GitHub API + `git ls-remote`) |
| Vercel preview for `9931f1a` | `dpl_E8tGMEEDuf7MG5ec9FMhGV2WkLUU`, READY (preview only; nothing deployed to production) | 2026-11-17 |

## Content strategy and cycle

- Strategy: **D-129** (`docs/BALANCED_DEVELOPMENT_PLAN.md`). Taxonomy v1.0 frozen.
- **Cycle 1 complete** (Batches 1–3 reviewed; 88 → 102 published). Cycle 1 review: IMPROVEMENT REQUIRED (`docs/CYCLE_1_BALANCE_REVIEW.md`).
- **Owner decisions 2026-11-17:** (1) Cycle 2 begins with an improvement-only batch under the § 9.3 stop rule; no Cycle 2 topics selected; (2) I1 coveredBy checks authorised and done; (3) push of the three commits approved and done.
- **I1 result:** 13 candidates verified; 8 now `coveredBy`, 5 deferred and left planned (addressed within 10 → 18; published still 102). Details in `docs/CONTENT_AUDIT.md` session 51.

## Current approved task

None in progress. Improvement Batch 1 scope is prepared; implementation is **not** started.

## Next authorised action

**Wait for the owner to review `docs/CYCLE_2_IMPROVEMENT_BATCH_1_SCOPE.md`** (scope, acceptance criteria, three decisions). Do not implement the batch, select Cycle 2 topics, or push the documentation commit until instructed.

Owner decisions on record (2026-11-17): Cycle 2 begins with an improvement-only batch; Batch 1 scope = `mapping` and `heart-framework` evidence gaps, small accuracy fixes (B2-O-1, B3-o1), four Editorial improvements after source verification. Deferred, not dropped: ten diagrams (DEF-1), twelve Practice entries (DEF-2). Marker backlog (TD-1) separate. No new taxonomy topics.

## Open follow-ups

See `docs/OPEN_ISSUES.md`.
