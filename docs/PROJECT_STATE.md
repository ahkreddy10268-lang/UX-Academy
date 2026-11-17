# Project state

The current state in one page. Read it first every session, then verify it against `git` (the repo wins; record any discrepancy here). Update it at the end of every meaningful task. History lives in `docs/PROGRESS.md`; decisions in `docs/DECISION_LOG.md`; open items in `docs/OPEN_ISSUES.md`; test results in `docs/QA_VERIFICATION_LEDGER.md`.

Last updated: **2026-11-17**.

## Repository

| Item | Value | Verified |
|---|---|---|
| Working branch | `claude/batch1-constraints` | 2026-11-17 |
| Pushed HEAD | `d01dcc2` (owner-authorised push of Improvement Batch 1: `3d5aa38`, `5d9e804`, `35cf36b`, `d01dcc2`); remote HEAD equalled local HEAD after the push | 2026-11-17 (`git ls-remote`) |
| Local HEAD | `d01dcc2` plus this state-record commit (local only, not pushed) | 2026-11-17 |
| `origin/main` | `b788511`, unchanged | 2026-11-17 (`git ls-remote`) |
| PR #2 | open, not merged; head `a1f6373` unchanged | 2026-11-17 (GitHub API + `git ls-remote`) |
| Vercel preview for `d01dcc2` | `dpl_E2nXhv9rgnPWiMkwtTkVfkBu9LCt`, READY (preview only; nothing in production) | 2026-11-17 |

## Content strategy and cycle

- Strategy: **D-129** (`docs/BALANCED_DEVELOPMENT_PLAN.md`). Taxonomy v1.0 frozen.
- **Cycle 1 complete** (Batches 1–3 reviewed; 88 → 102 published). Cycle 1 review: IMPROVEMENT REQUIRED (`docs/CYCLE_1_BALANCE_REVIEW.md`).
- **Owner decisions 2026-11-17:** (1) Cycle 2 begins with an improvement-only batch under the § 9.3 stop rule; no Cycle 2 topics selected; (2) I1 coveredBy checks authorised and done; (3) push of the three commits approved and done.
- **I1 result:** 13 candidates verified; 8 now `coveredBy`, 5 deferred and left planned (addressed within 10 → 18; published still 102). Details in `docs/CONTENT_AUDIT.md` session 51.

## Current approved task

None in progress. **Cycle 2 Improvement Batch 1 is CLOSED (2026-11-17): accepted with documented limitations**, not a perfect quality pass (see the closure note in `docs/CYCLE_2_IMPROVEMENT_BATCH_1_REPORT.md`). No further review rounds or micro-fixes; reopen only for a critical factual, functional or security defect.

## Next authorised action

**Wait for the owner's decision on `docs/CYCLE_2_IMPROVEMENT_PLAN.md`** (one consolidated plan: IB2 evidence/source/Practice hygiene, IB3 and IB4 detailed diagrams). Do not start it, start new topic production, or push the plan commit until approved. D-129 § 9.3: Cycle 2 stays improvement-only until that plan is done.

Local commits not on the remote: the closure and plan commit (this one).

## Open follow-ups

See `docs/OPEN_ISSUES.md` (notably IB1-2 `heart-framework` evidence gap, N-2 Ericsson–Simon citations, N-4 `brooke-1996`, `brooke-2013` awaiting verification).
