# Project state

The current state in one page. Read it first every session, then verify it against `git` (the repo wins; record any discrepancy here). Update it at the end of every meaningful task. History lives in `docs/PROGRESS.md`; decisions in `docs/DECISION_LOG.md`; open items in `docs/OPEN_ISSUES.md`; test results in `docs/QA_VERIFICATION_LEDGER.md`.

Last updated: **2026-11-17**.

## Repository

| Item | Value | Verified |
|---|---|---|
| Working branch | `claude/batch1-constraints` | 2026-11-17 |
| Pushed HEAD | `7c34436` (owner-approved); remote HEAD equalled local HEAD after the push | 2026-11-17 (`git ls-remote`) |
| Local HEAD | `3d5aa38` (Improvement Batch 1 implementation) plus a progress-records commit; **not pushed** | 2026-11-17 |
| `origin/main` | `b788511`, unchanged | 2026-11-17 (`git ls-remote`) |
| PR #2 | open, not merged; head `a1f6373` unchanged | 2026-11-17 (GitHub API earlier today, `git ls-remote` now) |
| Vercel preview for `7c34436` | `dpl_DetaPwZHJtB6Kgxn6wEiLNaD5Ktv`, READY (preview only; nothing in production) | 2026-11-17 |

## Content strategy and cycle

- Strategy: **D-129** (`docs/BALANCED_DEVELOPMENT_PLAN.md`). Taxonomy v1.0 frozen.
- **Cycle 1 complete** (Batches 1–3 reviewed; 88 → 102 published). Cycle 1 review: IMPROVEMENT REQUIRED (`docs/CYCLE_1_BALANCE_REVIEW.md`).
- **Owner decisions 2026-11-17:** (1) Cycle 2 begins with an improvement-only batch under the § 9.3 stop rule; no Cycle 2 topics selected; (2) I1 coveredBy checks authorised and done; (3) push of the three commits approved and done.
- **I1 result:** 13 candidates verified; 8 now `coveredBy`, 5 deferred and left planned (addressed within 10 → 18; published still 102). Details in `docs/CONTENT_AUDIT.md` session 51.

## Current approved task

Cycle 2 Improvement Batch 1 (scope `docs/CYCLE_2_IMPROVEMENT_BATCH_1_SCOPE.md`): **implemented** in `3d5aa38`; stopped for the owner's independent review. Report: `docs/CYCLE_2_IMPROVEMENT_BATCH_1_REPORT.md`.

## Next authorised action

**Wait for the owner's review.** Pending owner decisions: IB1-2 (`heart-framework` evidence target / class), N-1 (SUS attribution to the unread Brooke 2013), whether to request the formal review commit, and approval to push `3d5aa38`. Do not push, write the formal review, or start another batch until instructed.

## Open follow-ups

See `docs/OPEN_ISSUES.md`.
