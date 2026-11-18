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

## Latest task (2026-11-18)

**Error-fix pass** at the owner's request: Next.js security upgrade to 16.4.6 (`npm audit` 0), all clipped plate markers fixed at the source (site-wide 0 outside the viewBox), undersized and clipped plate text fixed, Level-2 text-version numbering fixed, stale e2e expectation updated. Commit `732077a` plus this records commit, pushed to `claude/batch1-constraints`; see PROGRESS session 59 and the QA ledger.

## Current approved task

None in progress. **The Cycle 2 improvement phase (IB2, IB3, IB4) is complete and pushed**, accepted with documented limitations. Consolidated report: `docs/CYCLE_2_IMPROVEMENT_REPORT.md`; per-batch reviews `docs/CYCLE_2_IB2_REVIEW.md`, `…IB3_REVIEW.md`, `…IB4_REVIEW.md`. Coverage: visual target 102/102, Practice 102/102, evidence target 101/102, Editorial 101/102; published 102.

## Next authorised action

**Wait for the owner.** The plan authorised implementing and pushing IB2–IB4 to `claude/batch1-constraints` only (no merge, no production) and stopping before selecting new topics or starting another cycle. Cycle 2 new-topic planning is a separate request: it must touch clusters A and E, re-run the dependency analysis and keep the domain caps (`docs/BALANCED_DEVELOPMENT_PLAN.md` § 2).

## Open follow-ups

See `docs/OPEN_ISSUES.md` (notably IB1-2 `heart-framework` evidence gap, N-2 Ericsson–Simon citations, N-4 `brooke-1996`, `brooke-2013` awaiting verification).
