# Sequential domain completion plan

_Last updated: 2026-11-23. Owner-approved working priority; D-133 in `docs/DECISION_LOG.md`._

## Direction

Complete the 20 domains in the canonical order in `content/taxonomy.ts`. Finish one domain before moving to the next. Within each domain, work through the approved backlog in this order: **foundational → core professional → specialist**, then perform a final coverage reconciliation.

A domain is complete when every taxonomy topic is either:
- **Published** as its own entry and passes all quality gates and type-specific completeness checks; or
- **Addressed within** a published host that genuinely explains it, with a defensible `coveredBy` relationship and a recorded reason.

Do not create a separate entry merely to increase the count, and do not mark a topic as addressed within unless the host really teaches it. “Complete” therefore means every topic is accounted for, not that every taxonomy item needs a separate page.

## Standing working authorization

The owner has authorised routine topic implementation under this sequence: research, source registration and verification, entry writing, visuals, practice, integration, quality review, documentation updates and pushing completed batches to a development branch without asking for separate approval each time.

This authorization does **not** include merging to `main`, production deployment, changing the design system, changing learning paths, adding dependencies, or changing the frozen taxonomy. Those remain outside scope unless separately directed. Never claim a push or deployment that did not happen.

## Working method

1. Reconcile the current domain against `docs/CONTENT_COVERAGE.md`, `content/taxonomy.ts`, the entry index and `content/topic-ledger.ts`.
2. Select a focused batch of up to four new entries from the current domain, starting with foundational priorities. Decide `coveredBy` only when a real host explains the topic.
3. Verify sources before drafting. Read what is cited; record full text, abstract-only or bibliographic-only access truthfully. A foundational topic without sufficient verifiable sources is replaced rather than written thinly.
4. Write one entry at a time to D-131: 2–4 observable learning outcomes, appropriate three-depth explanation, mechanism, labelled examples, limits, evidence class/note, meaningful relations and practice coverage.
5. Add an original plate for every entry; add a Level-2 explanation only where the knowledge requires it. Register figures and keep their text legible and accessible.
6. Add/verify quizzes, exercises and flashcards; integrate backlinks and reciprocal relations where meaningful.
7. Run the repository workflow: content index, source verification, entry integrity, `npm run check`, taxonomy validation, documentation generation, production build and impact-appropriate browser/visual QA. Follow `.claude/skills/ux-academy-workflow/SKILL.md` and the QA ledger.
8. Conduct one targeted batch review and one correction pass. Record minors without reopening the batch.
9. Update project state, progress, open issues, coverage and QA ledger. Push the reviewed batch to the active development branch. Do not merge or deploy automatically.

D-129 remains the authority for evidence classes, content quality, target interpretation and the stop rule. This domain-by-domain sequence changes prioritisation, not the quality bar.

## Domain 1 — UX & UI Fundamentals

**Status: complete in repository.**

Latest generated coverage (2026-11-20): 21/21 topics accounted for — 16 published, 5 addressed within another entry, 0 planned. Do not reopen completed topics for cosmetic reasons; only correct factual/source errors, broken gates, accessibility defects or new verified evidence.

## Domain 2 — UX Laws & Cognitive Effects

Latest generated coverage (2026-11-20): 46 topics — 14 published, 10 addressed within another entry, 22 planned. No research-ledger items were pending at the recorded baseline.

### Already published (14)

`aesthetic-usability-effect`, `choice-overload`, `default-effect`, `doherty-threshold`, `fitts-law`, `gestalt-principles`, `hick-hyman-law`, `jakobs-law`, `millers-law`, `peak-end-rule`, `serial-position-effect`, `steering-law`, `teslers-law`, `von-restorff-effect`.

### Addressed within another entry (10)

- `primacy-effect`, `recency-effect` → `serial-position-effect`.
- Gestalt grouping principles `law-of-pragnanz`, `law-of-proximity`, `law-of-similarity`, `law-of-closure`, `law-of-continuity`, `law-of-common-region`, `common-fate`, `uniform-connectedness` → `gestalt-principles`.

### Planned: 22 topics

| Priority | Topics |
|---|---|
| Foundational (2 remaining) | `loss-aversion`, `framing-effect` |
| Core professional (13) | `anchoring-effect`, `social-proof`, `goal-gradient-effect`, `zeigarnik-effect`, `postels-law`, `power-law-of-practice`, `webers-law`, `cognitive-ease`, `mere-exposure-effect`, `decision-fatigue`, `status-quo-bias`, `confirmation-bias`, `availability-heuristic` |
| Specialist (7) | `fechners-law`, `ikea-effect`, `endowment-effect`, `sunk-cost-effect`, `parkinsons-law`, `occams-razor`, `pareto-principle` |

The priority split follows the current D-129 backlog, adjusted for `default-effect` already being published. Candidate hosts from D-129 (`endowment-effect` → `loss-aversion`; `status-quo-bias` → `default-effect`) must still be checked against the actual explanations before any taxonomy status changes.

### First batch — owner-approved

**`loss-aversion` and `framing-effect`**. Both are foundational entries in the D-129 list and remain planned in the current taxonomy. `default-effect` is already published and is not repeated.

Source candidates to verify before drafting:

| Topic | Candidate source | DOI / identifier | Research note |
|---|---|---|---|
| Loss aversion | Kahneman & Tversky (1979), *Prospect Theory: An Analysis of Decision under Risk* | `10.2307/1914185` (JSTOR stable record; verify in Crossref) | Original prospect-theory paper; distinguish the full theory from the later, specific loss-aversion account. |
| Loss aversion | Tversky & Kahneman (1991), *Loss Aversion in Riskless Choice: A Reference-Dependent Model* | `10.2307/2937956` | Direct treatment of reference dependence and losses vs gains. |
| Loss aversion | Tversky & Kahneman (1992), *Advances in Prospect Theory* | `10.1007/BF00122574` | Cumulative prospect theory; loss aversion and diminishing sensitivity. |
| Loss aversion | Brown, Imai, Vieider & Camerer (2024), *Meta-analysis of Empirical Estimates of Loss Aversion* | `10.1257/jel.20221698` | Meta-analysis of 607 estimates from 150 articles; abstract reports mean coefficient 1.955 and a 95% interval [1.820, 2.102]. Do not present this as a universal constant. |
| Loss aversion | *A meta-analysis of loss aversion in risky contexts* (2024) | `10.1016/j.joep.2024.102740` | Restricted risky-choice analysis reports a lower pooled estimate (1.31) and high heterogeneity; compare methods before drawing conclusions. |
| Framing | Tversky & Kahneman (1981), *The Framing of Decisions and the Psychology of Choice* | `10.1126/science.7455683` | Original demonstrations of preference shifts under equivalent gain/loss descriptions. |
| Framing | Kühberger (1998), *The Influence of Framing on Risky Decisions: A Meta-analysis* | `10.1006/obhd.1998.2781` | Meta-analysis reports 136 empirical papers and 230 effect sizes; inspect full text and scope. |

These are research leads, not source records or verified citations yet. The repository's `npm run sources:verify` must confirm DOI metadata and URLs; read the accessible originals and record access limits before adding records. Differences between meta-analyses must be explained by scope, operationalisation and methods rather than averaged away.

## Later domains

Proceed through the remaining domains in the exact order in `content/taxonomy.ts`. At each domain start, regenerate coverage and derive that domain's published / addressed-within / planned inventory from the repository. Do not copy stale counts from this plan.


## Batch 1 research status (2026-11-23)

Research synthesis is recorded in `docs/DOMAIN_2_BATCH_1_RESEARCH.md`. Key corrections: (1) Loss Aversion must be taught as reference-dependent value asymmetry with meaningful evidence disagreement; neither “losses hurt twice as much” nor one fixed `lambda` is a universal law. (2) Framing Effect must distinguish risky-choice, attribute and goal framing. The 2025 Composto et al. query-theory meta-analysis is included in the framing source set. The original 1979 paper and 1991 reference-dependent paper have been read in full; the 2024 risky-choice meta-analysis has also been read in full. Publisher / PubMed records and abstracts have been checked for the remaining candidates. All source records must still pass the repository's `npm run sources:verify` before drafting; no source record or `verification.json` result has been created yet. **No content has been drafted yet.**
