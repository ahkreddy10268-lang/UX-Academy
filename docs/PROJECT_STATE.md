# Project state

The current state in one page. Read it first every session, then verify it against `git` (the repo wins; record any discrepancy here). Update it at the end of every meaningful task. History lives in `docs/PROGRESS.md`; decisions in `docs/DECISION_LOG.md`; open items in `docs/OPEN_ISSUES.md`; test results in `docs/QA_VERIFICATION_LEDGER.md`.

Last updated: **2026-11-19** (Cycle 3 pre-production checks).

## Repository

| Item | Value | Verified |
|---|---|---|
| Working branch | `claude/batch1-constraints` | 2026-11-19 |
| Local HEAD | `7019450` (D-131 Excellence standard), plus the Cycle 3 pre-production records commit when made (local until pushed) | 2026-11-19 |
| Remote branch HEAD | `7019450`, equal to local HEAD at the time of the check; pushed on owner approval | 2026-11-19 (`git ls-remote`) |
| `origin/main` | `b788511`, unchanged | 2026-11-19 (`git ls-remote`) |
| PR #2 | open, not merged; head `a1f6373` unchanged | 2026-11-19 (`git ls-remote refs/pull/2/head`) |
| Vercel preview | Last checked for `d01dcc2` (`dpl_E2nXhv9rgnPWiMkwtTkVfkBu9LCt`, READY, 2026-11-17). **Not checked for `7019450`.** Nothing in production. | 2026-11-17 |

## Content strategy and cycle

- Strategy: **D-129** (`docs/BALANCED_DEVELOPMENT_PLAN.md`). Taxonomy v1.0 frozen.
- **Cycle 1 complete** (Batches 1–3 reviewed; 88 → 102 published). Cycle 1 review: IMPROVEMENT REQUIRED (`docs/CYCLE_1_BALANCE_REVIEW.md`).
- **Owner decisions 2026-11-17:** (1) Cycle 2 begins with an improvement-only batch under the § 9.3 stop rule; no Cycle 2 topics selected; (2) I1 coveredBy checks authorised and done; (3) push of the three commits approved and done.
- **I1 result:** 13 candidates verified; 8 now `coveredBy`, 5 deferred and left planned (addressed within 10 → 18; published still 102). Details in `docs/CONTENT_AUDIT.md` session 51.

## Latest task (2026-11-19)

**D-131 Excellence standard recorded** (owner approval 2026-11-19; proposed as "D-130", renumbered because D-130 was already taken). Rule: `docs/CONTENT_MODEL.md` § Excellence standard; checklists: workflow skill § 2a. Subordinate to D-129, which is unchanged. Documentation only.

**Cycle terminology (owner decision 2026-11-19):** **Cycle 2** = the completed improvement phase IB1–IB4. **Cycle 3** = the next new-topic production cycle. Earlier records that say "Cycle 2 new-topic planning" (the IB plan and report) mean Cycle 3; they are historical and left as written.

**Owner decisions 2026-11-19 (after D-131):** (1) B4 Accessibility in code is the **G-slot batch of Cycle 4**, subject to the dependency check, an explicit planned priority; no fourth batch in Cycle 3, no silent replacement. (2) **Improvement-only cycles do not count toward the two-cycle cluster rotation**; the rule applies to new-topic cycles. (3) Cycle 3 stays H → R → G: H = B6 Findability, R = B5 Decision biases, G = B8 Service design foundations.

## Cycle 3 pre-production checks (2026-11-19) — result: PASS, order confirmed

No content was written or researched beyond source existence checks. Candidate source lists were held outside the repository (not added to `content/sources/`, `verification.json` or the topic ledger); they are re-derived and registered at production start.

- **Order confirmed: H (B6) → R (B5) → G (B8).** Within batches (recommended): B6 foraging theory → information scent → findability → navigation patterns; B5 loss aversion (hosts prospect theory) → framing → default → anchoring → social proof; B8 service design (vocabulary) → touchpoints → journey mapping → service blueprints.
- **Demand re-run** (D-129 formula, recomputed on today's content): B6 63 (information-scent rank 1, navigation-patterns rank 2 of 459 planned), B8 28, B5 16. B5's slot rests on the cluster rule and the B7 prerequisite chain (deceptive-patterns, rank 3, follows it), not on demand.
- **Balance:** three domains, 4 + 5 + 4 = 13 entries; largest share B5 at 5/13 = 38.5 % (cap 40 %). Clusters C, A, E; with Cycle 1 (B, D, C) all five clusters are touched across the two new-topic cycles. Empty domains 5 → 4; empty subcategories 39 → 35. **Margin rule:** if B6 or B8 loses a topic, B5 must be cut to 4 (5/12 = 41.7 % breaches the cap).
- **Sources:** all 13 topics have ≥ 2 primary or standard sources and ≥ 1 machine-verified primary (56 candidates checked against Crossref/HTTP: 48 DOIs verified, 7 URLs reachable, 1 book with no machine check). Eight DOIs recalled from memory were wrong and were corrected against Crossref. No topic failed; no replacement needed. Full-text access to paywalled originals was **not** tested.
- **B4 (Accessibility in code) to Cycle 4: no critical gap.** No published entry lists a B4 topic as a prerequisite; no Cycle 3 topic depends on one; the published `wcag` entry explains the four principles (the `pour` step); the Accessibility path stays at 20 % (no regression) and reaches ~53 % with B4. See OPEN_ISSUES C3-1.
- **Cycle 4 constraint (not decided):** with Cycle 3 touching A, C, E, Cycle 4 must touch clusters B and D; B4 is cluster C. See OPEN_ISSUES C3-2.

## Earlier task (2026-11-18)

**Explorer labels (TD-5) fixed and Claude Design brief added** (`docs/UX_ACADEMY_FOR_CLAUDE_DESIGN.md`), after the error-fix pass below.

**Error-fix pass** at the owner's request: Next.js security upgrade to 16.4.6 (`npm audit` 0), all clipped plate markers fixed at the source (site-wide 0 outside the viewBox), undersized and clipped plate text fixed, Level-2 text-version numbering fixed, stale e2e expectation updated. Commit `732077a` plus this records commit, pushed to `claude/batch1-constraints`; see PROGRESS session 59 and the QA ledger.

## Current approved task

None in progress. **Cycle 2 (improvement phase IB1–IB4) is complete and pushed**, accepted with documented limitations. Consolidated report: `docs/CYCLE_2_IMPROVEMENT_REPORT.md`; per-batch reviews `docs/CYCLE_2_IB2_REVIEW.md`, `…IB3_REVIEW.md`, `…IB4_REVIEW.md`. Coverage: visual target 102/102, Practice 102/102, evidence target 101/102, Editorial 101/102; published 102.

## Next authorised action

**Wait for the owner.** The Cycle 3 pre-production checks are done; the next step is explicit owner approval to start Cycle 3 production (B6 first: register sources, then one entry at a time under D-131). No topic is to be researched or written before that approval. The records commit for these checks is local until the owner approves a push.

## Open follow-ups

See `docs/OPEN_ISSUES.md` (notably IB1-2 `heart-framework` evidence gap, N-2 Ericsson–Simon citations, N-4 `brooke-1996`, `brooke-2013` awaiting verification).
