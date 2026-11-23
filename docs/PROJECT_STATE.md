# Project state

The current state in one page. Read it first every session, then verify it against `git` (the repo wins; record any discrepancy here). Update it at the end of every meaningful task. History lives in `docs/PROGRESS.md`; decisions in `docs/DECISION_LOG.md`; open items in `docs/OPEN_ISSUES.md`; test results in `docs/QA_VERIFICATION_LEDGER.md`.

Last updated: **2026-11-23** (Domain 2 Batch 4: `goal-gradient-effect` published on `claude/domain-completion-20261123`; `main` at `9a51aa6`; D-133 domain-by-domain completion).

## Repository

| Item | Value | Verified |
|---|---|---|
| Default branch | `main` at `9a51aa6` (merge of PR #3) | 2026-11-23 (GitHub API) |
| PR #3 | `claude/batch1-constraints` → `main`: merged 2026-11-20; merge commit `9a51aa6` | 2026-11-23 |
| PR #2 | merged 2026-11-20 | 2026-11-23 |
| Domain-completion work branch | `claude/domain-completion-20261123`, based on `main` at `9a51aa6`, 33 commits ahead at `f712e38` before this session; Social Proof batch `4af404b` and Goal-Gradient Effect batch committed on top (QA ledger records the SHAs) | 2026-11-23 (`git fetch`) |
| Vercel production branch setting | `main` (owner reported setting this on 2026-11-20) | 2026-11-20 |
| Vercel check on latest `main` commit | Success; check target `https://vercel.com/ambati-re-dd/ux-academy/77Bpw7KyrCPPEEeHf5mMLcVYLwT7` | 2026-11-23 |
| Vercel check on domain-completion branch | Pending on last query for `89a36dc`; not a build pass | 2026-11-23 |
| Production runtime / deployed commit | Not independently confirmed from the supplied live URL in this session; do not treat the GitHub check alone as a live-page audit | 2026-11-23 |

## Owner direction — domain-by-domain completion (D-133, 2026-11-23)

The owner has directed completion of all 20 domains in the canonical taxonomy order, one domain at a time. This is a sequencing override to the portfolio order in D-129; D-129's quality, evidence, source verification, target, review and stop-rule requirements remain in force. Routine batches may be researched, implemented, QA-checked, documented and pushed to a development branch without a separate approval prompt. This does not authorize merges to `main` or production deployment.

- Domain 1, UX & UI Fundamentals: complete — 16 published, 5 addressed within, 0 planned (21/21).
- Domain 2, UX Laws & Cognitive Effects: active — generated 2026-11-23: **16 published, 3 drafted, 10 addressed within, 17 planned (46)**. `social-proof` and `goal-gradient-effect` published; `loss-aversion`, `framing-effect` and `anchoring-effect` remain drafted. (Supersedes the 2026-11-20 baseline of 14 published, 0 drafted, 22 planned.)
- Active branch: claude/domain-completion-20261123, based on main at 9a51aa6.
- Batch 1 (foundational): loss-aversion and framing-effect are drafted, indexed and illustrated; 11 source records registered, with only kahneman-tversky-1979 matched to Crossref so far. Batch 2 (first core professional): anchoring-effect is drafted, indexed and illustrated; 9 source records registered, all pending automated verification. All three remain drafted until source verification, content integrity, check, taxonomy, docs generation, plate render, entry review and build pass. Research records: docs/DOMAIN_2_BATCH_1_RESEARCH.md and docs/DOMAIN_2_BATCH_2_RESEARCH.md; blockers: OPEN_ISSUES D2-B1-1 and D2-B2-1.
- Batch 3 (core professional): **social-proof published** — 9 new sources, 9/9 DOI-verified; all gates PASS on this session's tree (QA ledger). Three pre-existing gate blockers in the Batch 1–2 drafts were fixed so the shared gates could run; those drafts still lack their own verification (D2-B1-1, D2-B2-1).
- Batch 4 (core professional): **goal-gradient-effect published** — 10 new sources, 10/10 DOI-verified; all gates PASS (QA ledger). No drafts modified.
- **Next authorised action (D-133):** `zeigarnik-effect`, the next core-professional topic. Separately outstanding: verification and QA of the three drafts.
- Domain inventory and priority order: `docs/DOMAIN_COMPLETION_PLAN.md`.

## Content strategy and cycle

- Strategy: **D-129** (`docs/BALANCED_DEVELOPMENT_PLAN.md`). Taxonomy v1.0 frozen.
- **Cycle 1 complete** (Batches 1–3 reviewed; 88 → 102 published). Cycle 1 review: IMPROVEMENT REQUIRED (`docs/CYCLE_1_BALANCE_REVIEW.md`).
- **Owner decisions 2026-11-17:** (1) Cycle 2 begins with an improvement-only batch under the § 9.3 stop rule; no Cycle 2 topics selected; (2) I1 coveredBy checks authorised and done; (3) push of the three commits approved and done.
- **I1 result:** 13 candidates verified; 8 now `coveredBy`, 5 deferred and left planned (addressed within 10 → 18; published still 102). Details in `docs/CONTENT_AUDIT.md` session 51.

## Latest task (2026-11-19)

**D-131 Excellence standard recorded** (owner approval 2026-11-19; proposed as "D-130", renumbered because D-130 was already taken). Rule: `docs/CONTENT_MODEL.md` § Excellence standard; checklists: workflow skill § 2a. Subordinate to D-129, which is unchanged. Documentation only.

**Cycle terminology (owner decision 2026-11-19):** **Cycle 2** = the completed improvement phase IB1–IB4. **Cycle 3** = the next new-topic production cycle. Earlier records that say "Cycle 2 new-topic planning" (the IB plan and report) mean Cycle 3; they are historical and left as written.

**Owner decisions 2026-11-19 (after D-131):** (1) B4 Accessibility in code is the **G-slot batch of Cycle 4**, subject to the dependency check, an explicit planned priority; no fourth batch in Cycle 3, no silent replacement. (2) **Improvement-only cycles do not count toward the two-cycle cluster rotation**; the rule applies to new-topic cycles. (3) Cycle 3 stays H → R → G: H = B6 Findability, R = B5 Decision biases, G = B8 Service design foundations.

## Domain 1 completion — UX & UI Fundamentals (owner request 2026-11-19, D-132) — progress ledger

Cycle 3 paused after B6 topic 1. Plan: 11 entries + 4 topics addressed within a host (decided only after the host explains them). Coverage decisions and reasons: CONTENT_AUDIT session 62.

| Batch | Topics | Status |
|---|---|---|
| 1 | `usefulness` (published), `utility` (addressed within `usefulness`), `desirability` (published) | Done — `aa1311c` |
| 2 | `design-thinking` (published); `feasibility`, `viability` (addressed within `design-thinking`); `human-centred-design` (addressed within `user-centred-design`) | Done — `218bb3d` |
| 3 | `design-processes`, `ux-lifecycle`, `ux-maturity` (all published) | Done — `5a2678c` |
| 4 | `product-design`, `experience-design` (both published) | Done — `9eb3675` |
| 5 | `history-of-interface-design`, `evolution-of-digital-experiences` (published); `history-of-hci` (addressed within `human-computer-interaction`) | Done — `55dc927` |

**Result: Domain 1 complete and validated.** 21/21 topics accounted for: 16 published (6 before + 10 new), 5 addressed within a host (utility, feasibility, viability, human-centred design, history of HCI), 0 planned. Published 103 → 113, addressed within 18 → 23. Open minors: D1-2 to D1-5 in OPEN_ISSUES. **Design skills installed (2026-11-20):** eight third-party Claude Code skills in `.claude/skills/` (see `docs/DESIGN_SKILLS_WORKFLOW.md`); not yet applied to the interface. **Resource enrichment (2026-11-20):** further reading added to 6 entries (QA ledger). Domain 2 not started.

## Deployment and status reconciliation (2026-11-20)

**Root cause:** Vercel production for project `ux-academy` is built from `claude/pensive-cannon-t1o6sy` (production deployment of `a1f6373`); nothing has ever been deployed from `main`, and `main` (`b788511`) lacks the 55 commits in PR #3. Production shows the pre-Domain-1 state. **Fixed on the branch:** status presentation (domain page, coverage bar, coverage table) and the taxonomy-doc generator (D1-3 closed). **Blocked on the owner (DEP-1):** set Vercel's production branch to `main`, then merge PR #3. Nothing pushed, merged or deployed in this task.

**Update (2026-11-23):** PR #3 was merged into `main` on 2026-11-20 at `9a51aa6`. GitHub reports a successful Vercel check for that commit. The supplied deployment URL and the project dashboard could not be independently fetched in this session, so the live runtime, production alias and deployed commit remain unconfirmed. Verify `/topics/foundations`, `/coverage` and `/topics/laws-effects` on the actual production domain; expected Domain 1 status is 16 published + 5 addressed within + 0 planned (21/21). See DEP-2 in `docs/OPEN_ISSUES.md`.

## B5 topic 1 — `default-effect` (2026-11-20)

**`default-effect` published** (owner authorised this topic only, 2026-11-20; B5 Decision biases, the next foundational topic after Domain 1). Entry (cognitive-bias, `laws-effects/decision-biases`, peer-reviewed), plate in the new `decision-sheets.tsx` (registered in `_fragments.ts`), register record, quick takeaway; no Level-2 figure (plate is the D-129 minimum). Six new sources in `cognitive-effects.ts`. Published 114 → 115. One targeted review, one correction pass; no critical or major findings. Findability (B6 topic 3) still awaits approval. **Next authorised action: none.** Wait for the owner's approval before `loss-aversion`. Pushed 2026-11-20 on owner approval (`e44f8ce`).

## Cycle 3 production — B6, topic 2 (2026-11-20)

**`information-scent` published** (owner authorised this topic only, 2026-11-20). Entry (concept, `ia/findability`, established-theory), plate in `findability-sheets.tsx` with register record and quick takeaway; no Level-2 figure (concept: plate is the D-129 minimum). Sources: all reused; `furnas-et-al-1987` abstract read and noted. Published 113 → 114. One targeted review, one correction pass; no critical or major findings. Pushed on owner approval (`1409093`).

## Cycle 3 production — B6, topic 1 (2026-11-19)

**`information-foraging-theory` published** (owner authorised B6, first topic only). Entry, 6 new source records (`content/sources/findability.ts`) plus notes on `pirolli-card-1999`, plate (`findability-sheets.tsx`), Level-2 figure (`information-foraging-theory.decisions`), visual-register record, quick takeaway, one back-link from `information-architecture`. Published 102 → 103; D-129 visual and evidence targets met; Practice and Editorial complete.

- **Source access:** two NN/g articles read in full (Nielsen 2003; Budiu 2020); abstracts only for Pirolli 2007, Fu & Pirolli 2007, Chi et al. 2001, Bates 1989; **Pirolli & Card 1999 bibliographic only** (no abstract readable). The entry limits its claims accordingly and says so. A mirror search for paywalled papers was stopped by the auto-mode classifier and not pursued (project rule: no paywall bypass).
- **Out-of-entry change:** `components/entry/references.tsx` — long DOIs now wrap (`[overflow-wrap:anywhere]`); the book's DOI caused a 17 px overflow at 390 px. Full browser suites rerun (see ledger).
- **Review:** one targeted review, one correction pass (two precision edits); no critical or major findings. Minor items logged: C3-4, C3-5.
- Stopped after this topic, as instructed. **Information Scent not started.**

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

## Current approved work (2026-11-23)

**Domain 2 — UX Laws & Cognitive Effects.** Owner-approved sequence is domain-by-domain (D-133). Domain 1 is complete at 21/21 accounted for. Domain 2's last generated coverage baseline is 14 published, 10 addressed within, 22 planned. Batch 1 (loss-aversion, framing-effect) and Batch 2 (anchoring-effect) are drafted, indexed and illustrated on the development branch. Expected status, pending docs generation: 14 published, 3 drafted, 10 addressed within, 19 planned. There are 20 new source records across these batches; only kahneman-tversky-1979 has a recorded Crossref match. All three entries intentionally remain drafted until source verification and all QA gates pass. Research records: docs/DOMAIN_2_BATCH_1_RESEARCH.md, docs/DOMAIN_2_BATCH_2_RESEARCH.md; open blockers: D2-B1-1 and D2-B2-1.

**Standing authorization:** routine implementation, QA, records and push of completed batches to a development branch are approved. Merge to `main` and production deployment are not included.

## Open follow-ups

- **DEP-2:** verify that Vercel production is serving the merged `main` commit and the corrected Domain 1 coverage display.
- Research limits and minor editorial follow-ups remain in `docs/OPEN_ISSUES.md`; keep documented limitations rather than reopening completed entries without new evidence.
