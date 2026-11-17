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

**Cycle 2 improvement plan (approved 2026-11-17): IB2 done, IB3 and IB4 pending.** IB2 (Practice, citation and source hygiene) implemented in `2216116` and reviewed (`docs/CYCLE_2_IB2_REVIEW.md`, PASS WITH DOCUMENTED LIMITATIONS). Process per the plan: one implementation commit and one targeted review per batch; push to `claude/batch1-constraints` after each batch's review commit when no critical or major finding is open (authorised by the owner); no merge, no production, no new topics.

## Next authorised action

**Implement IB3** (five detailed diagrams: `usability-testing`, `cognitive-walkthrough`, `card-sorting`, `ab-testing`, `keystroke-level-model`), then IB4 (`atomic-design`, `jobs-to-be-done`, `gulfs-of-execution-and-evaluation`, `working-memory-model`, `heart-framework`), then one consolidated Cycle 2 improvement report. Stop before selecting new topics.

## Open follow-ups

See `docs/OPEN_ISSUES.md` (notably IB1-2 `heart-framework` evidence gap, N-2 Ericsson–Simon citations, N-4 `brooke-1996`, `brooke-2013` awaiting verification).
