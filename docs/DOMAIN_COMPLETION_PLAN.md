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

Latest generated coverage (2026-11-24, after Postel's Law): 46 topics — **18 published, 3 drafted, 10 addressed within another entry, 15 planned** (`docs/CONTENT_COVERAGE.md`). The 2026-11-20 baseline was 14 published, 0 drafted, 10 addressed within, 22 planned; the drafted entries are `loss-aversion`, `framing-effect` and `anchoring-effect` (see Batch 1 and 2 below).

### Already published (18; `social-proof`, `goal-gradient-effect`, `zeigarnik-effect` added 2026-11-23; `postels-law` 2026-11-24)

`aesthetic-usability-effect`, `choice-overload`, `default-effect`, `doherty-threshold`, `fitts-law`, `gestalt-principles`, `hick-hyman-law`, `jakobs-law`, `millers-law`, `peak-end-rule`, `postels-law`, `serial-position-effect`, `goal-gradient-effect`, `social-proof`, `steering-law`, `teslers-law`, `von-restorff-effect`, `zeigarnik-effect`.

### Addressed within another entry (10)

- `primacy-effect`, `recency-effect` → `serial-position-effect`.
- Gestalt grouping principles `law-of-pragnanz`, `law-of-proximity`, `law-of-similarity`, `law-of-closure`, `law-of-continuity`, `law-of-common-region`, `common-fate`, `uniform-connectedness` → `gestalt-principles`.

### Planned at the 2026-11-20 baseline: 22 topics (now 15 planned, 3 drafted, 4 published from this list)

| Priority | Topics |
|---|---|
| Foundational (2 remaining) | `loss-aversion`, `framing-effect` |
| Core professional (12; `social-proof`, `goal-gradient-effect`, `zeigarnik-effect` published 2026-11-23; `postels-law` 2026-11-24) | ~~`social-proof`~~, ~~`goal-gradient-effect`~~, ~~`zeigarnik-effect`~~, ~~`postels-law`~~, `power-law-of-practice`, `webers-law`, `cognitive-ease`, `mere-exposure-effect`, `decision-fatigue`, `status-quo-bias`, `confirmation-bias`, `availability-heuristic` |
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

Implemented on `claude/domain-completion-20261123`: 11 records were added to `content/sources/cognitive-effects.ts`, both entry drafts were added and indexed, and both plates were registered. Only `kahneman-tversky-1979` currently has a recorded Crossref match; the other ten records remain `bibliographic` until `npm run sources:verify` checks them. Both entries remain `drafted` pending the repository's complete verification and QA sequence. Differences between meta-analyses are explained by scope, operationalisation and methods rather than averaged away.

## Later domains

Proceed through the remaining domains in the exact order in `content/taxonomy.ts`. At each domain start, regenerate coverage and derive that domain's published / addressed-within / planned inventory from the repository. Do not copy stale counts from this plan.


## Batch 1 research status (2026-11-23)

Research synthesis is recorded in `docs/DOMAIN_2_BATCH_1_RESEARCH.md`. Key corrections: (1) Loss Aversion must be taught as reference-dependent value asymmetry with meaningful evidence disagreement; neither “losses hurt twice as much” nor one fixed `lambda` is a universal law. (2) Framing Effect must distinguish risky-choice, attribute and goal framing. The 2025 Composto et al. query-theory meta-analysis is included in the framing source set. The original 1979 paper and 1991 reference-dependent paper have been read in full; the 2024 risky-choice meta-analysis has also been read in full. Publisher / PubMed records and abstracts have been checked for the remaining candidates. All source records must still pass the repository's `npm run sources:verify` before drafting; no source record or `verification.json` result has been created yet. **No content has been drafted yet.**


### Batch 1 implementation status (2026-11-23)

- `loss-aversion`: drafted, indexed, plate registered; 7 source references.
- `framing-effect`: drafted, indexed, plate registered; 6 source references.
- Expected Domain 2 status after docs generation: 14 published, 2 drafted, 10 addressed within, 20 planned. The generated coverage file is intentionally not manually edited.
- Required next gate: run source verifier, entry integrity, full check, taxonomy, docs generation, plate render, illustration tests, per-entry browser review and build. Keep both entries drafted until all pass.


## Batch 2 — first core-professional topic (2026-11-23)

**anchoring-effect** has been drafted, indexed and illustrated on claude/domain-completion-20261123. The taxonomy slug already existed; no taxonomy change was made. Research review: docs/DOMAIN_2_BATCH_2_RESEARCH.md.

- Nine source records added to content/sources/cognitive-effects.ts; all remain bibliographic pending the repository verifier. The source set includes the 2026 Schley & Weingarten meta-analysis (published online 19 May 2026), Tversky & Kahneman (1974), and mechanism/valuation studies.
- Original teaching plate is in components/illustrations/concepts/decision-sheets.tsx and registered in visual-register.ts.
- Entry status is drafted, not published. The next step remains full source verification, entry-integrity, content check, taxonomy, generated docs, plate render, browser entry review and production build.
- Domain 2 expected status after docs generation: 14 published, 3 drafted, 10 addressed within, 19 planned. Generated coverage is not edited manually.


## Batch 3 — Social Proof (2026-11-23) — published

**`social-proof` published** on `claude/domain-completion-20261123` (cognitive-bias, `laws-effects/decision-biases`; taxonomy slug already present, no taxonomy change).

- Sources: 9 new records in `content/sources/cognitive-effects.ts`, **9/9 `doi-verified`** by `npm run sources:verify`. Read in full: Cialdini, Reno & Kallgren (1990); Goldstein, Cialdini & Griskevicius (2008); Muchnik, Aral & Taylor (2013, report only). Abstract only: Cialdini & Goldstein (2004), Nolan et al. (2008), Salganik, Dodds & Watts (2006), Bond & Smith (1996), Saxena & Banerji (2026; open-access PDF blocked by a browser challenge). Deutsch & Gerard (1955): bibliographic only, cited for the distinction its title names.
- Correction to the research brief: the 2026 ratings review is by Saxena and Banerji, *International Journal of Consumer Studies* 50(6), published online 24 September 2026.
- Plate `socialProofPlate` in `decision-sheets.tsx`, register record, quick takeaway; back-link from `default-effect`.
- All gates passed (QA ledger). Pre-existing gate blockers in the Batch 1–2 drafts were fixed so the gates could run: one invalid technique value in the `anchoring-effect` register record, and the analogy openings of `anchoring-effect` and `loss-aversion` (editorial template cap). Those drafts otherwise remain unverified and `drafted` (D2-B1-1, D2-B2-1).
- Next topic after this batch: `goal-gradient-effect` (done in Batch 4 below).


## Batch 4 — Goal-Gradient Effect (2026-11-23) — published

**`goal-gradient-effect` published** (cognitive-bias, `laws-effects/decision-biases`; slug already in the frozen taxonomy, unchanged).

- Sources: 10 new records, **10/10 `doi-verified`**. Read in full: Devine et al. (2025). Relevant sections: Dixon et al. (2024). Abstract only: Kivetz, Urminsky & Zheng (2006), Nunes & Drèze (2006; author PDF unreachable), Bonezzi, Brendl & De Angelis (2011), Koo & Fishbach (2012), Harkin et al. (2016), Conrad et al. (2010; PMC full text not served to automated access), Cheema & Bagchi (2011). Hull (1932): bibliographic only. Not registered: Brown (1948; mentioned only as reported by Devine et al.) and Luo et al. (2026; optional, not used).
- Teaches the distinctions between the original hypothesis and human applications, goal proximity and progress monitoring, goal gradient and endowed progress, accumulated vs remaining progress and perceived velocity, the small-area hypothesis and the classic prediction, near-misses and genuine approach, and a progress indicator vs the response it evokes. The non-monotonic gradient and the small-area findings are taught in the main explanation.
- Plate `goalGradientPlate` (conceptual curves labelled as illustrative), register record, quick takeaway; back-link from `loading-states`. No Level-2 figure.
- No Domain 2 drafts were modified.
- Next topic after this batch: `zeigarnik-effect` (done in Batch 5 below). The three drafts still need their own verification and QA (D2-B1-1, D2-B2-1).


## Batch 5 — Zeigarnik Effect (2026-11-23) — published

**Classification correction.** The core-professional row above is a priority list for Domain 2; it mixes topic types and subcategories. In the frozen taxonomy (`content/taxonomy.ts`, `memory-attention-effects` group) `zeigarnik-effect` is a **`concept`** in **`laws-effects` / `memory-attention-effects`** — Domain 2, beside `serial-position-effect`, `von-restorff-effect` and `peak-end-rule` — not a `cognitive-bias` in `decision-biases`, and not in the `psychology` domain (a planning brief for this batch assumed `psychology`; the taxonomy says otherwise). The entry follows the taxonomy: `content/knowledge/laws-effects/zeigarnik-effect.ts`. Taxonomy unchanged; Domain 2 counts are unaffected because the topic was always a Domain 2 item.

- Sources: 8 new records; 7 `doi-verified`, 1 `url-reachable` (Seifert & Patalano 1991, conference paper without DOI). Read in full: Ghibellini & Meier (2025), MacLeod (2020), Seifert & Patalano (1991). In part: Masicampo & Baumeister (2011, JPSP). Abstract: Masicampo & Baumeister (2011, JESP), Wendsche, Weigelt & Syrek (2026). Bibliographic only: Zeigarnik (1927), Ovsiankina (1928; DOI found through Crossref search, pages 302–379 per Crossref). Crossref registers both originals under the series title "Untersuchungen zur Handlungs- und Affektpsychologie"; the records carry the series title plus the article title. Not used: Butterfield (1964) and Van Bergen (1968) directly (reported via MacLeod), Ongchoco et al. (2026) and its correction.
- Evidence class `contested`: the recall claim is not supported in general (ratio 0.99, d_z = 0.15 where computable); resumption (Ovsiankina) is the better-supported effect and is taught as the central distinction.
- Plate `zeigarnikPlate` in `learning-sheets.tsx` (with the other memory-effect sheets), registered via `laws-psychology.tsx`; register record; quick takeaway; back-links from `goal-gradient-effect` and `von-restorff-effect`.
- No Domain 2 drafts modified.
- Next topic after this batch: `postels-law` (done in Batch 6 below). The three drafts still need their own verification and QA (D2-B1-1, D2-B2-1).


## Batch 6 — Postel's Law (2026-11-24) — published

**`postels-law` published**: `principle` in `laws-effects/popular-ux-laws` (taxonomy unchanged; the group is described there as practitioner maxims, not scientific laws). Evidence `practitioner-recommendation`, matching the sibling entries `jakobs-law`, `teslers-law` and `doherty-threshold`.

- Sources: 8 new records in `content/sources/interaction-principles.ts` — RFC 760, 791, 1122, 2360, 7103, 9413, 9112 (all `doi-verified`) and the OWASP Input Validation Cheat Sheet (`url-reachable`). Reused: `w3c-wcag-22`, `w3c-understanding-error-identification`, `w3c-understanding-error-suggestion`. Relevant sections of every RFC read; RFC 9413 read in full. Statuses taken from the RFC documents and the RFC Editor records (STD numbers given only where the document header states them). Not registered: RFC 1958 (quoted only as cited inside RFC 9413).
- Teaches the original protocol meaning vs the UX adaptation; syntactic variation vs semantic validity; parsing, normalisation, validation, authorisation and output encoding as separate steps; normalisation vs silent mutation; RFC 9413's three robustness aspects and protocol decay; inconsistent parsing as a security issue; fail-safe behaviour; accessible rejection under WCAG 3.3.1/3.3.3/3.3.4. An eight-step decision framework is labelled as academy interpretation.
- Plate `postelsLawPlate` in `learning-sheets.tsx`, registered via `laws-psychology.tsx`; register record; quick takeaway; back-links from `error-prevention` and `teslers-law`. No drafts modified.
- **Next authorised Domain 2 topic:** `power-law-of-practice` (next in the core-professional row; no entry exists). Taxonomy: `law` in `laws-effects/performance-laws` — a different type and subcategory from this batch; follow the taxonomy. The three drafts still need their own verification and QA (D2-B1-1, D2-B2-1).

