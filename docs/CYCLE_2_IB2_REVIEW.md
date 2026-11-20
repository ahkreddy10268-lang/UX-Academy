# Cycle 2 — IB2 review (Practice, citation and source hygiene)

Scope: `docs/CYCLE_2_IMPROVEMENT_PLAN.md` § 2. Implementation commit `2216116` (baseline `9d41b83`). One targeted review, per the plan's protocol: the diff was checked against the sources and the plan's acceptance criteria, not against the implementation notes.

**Outcome: PASS WITH DOCUMENTED LIMITATIONS.** No critical, major or moderate findings. Minor findings and limitations are in `docs/OPEN_ISSUES.md`.

## Acceptance against the plan

| Plan item | Result |
|---|---|
| Practice (DEF-2, 12 entries) | **Met.** Five entries gained a third-level quiz question (`aesthetic-usability-effect`, `confidence-intervals` beginner; `doherty-threshold`, `sample-size-estimation`, `user-centred-design` advanced) and eight a third flashcard (`doherty-threshold`, `jakobs-law`, `mental-models`, `net-promoter-score`, `recognition-over-recall`, `signifiers`, `steering-law`, `teslers-law`). Every item was re-read against the entry's own cited text (definitions, vocabulary, myths, advanced paragraphs); each question has one correct option and an explanation. Practice complete: 90 → **102/102**. |
| N-2 (`ericsson-simon-1993`) | **Met.** `interaction-design-discipline`, `human-computer-interaction` and the HCI method explorer's source list now cite the DOI-verified 1980 paper (abstract read) for the think-aloud grounding. `think-aloud-protocol` keeps the 1993 book only as a mention labelled "bibliographic record only; not read for this entry". A unit test (`tests/hci.test.ts`) caught the explorer's source list, which was changed with it. |
| N-4 (`brooke-1996`) | **Met, with a limit.** The chapter was read in full from a seven-page third-party copy (not the publisher's edition). It confirms what the SUS entry attributes to it: the Digital Equipment origin with a 1986 notice, the quick low-cost aim, a ten-item global measure, the centre-point rule, 0–100 scoring, and that item scores are not meaningful alone. The SUS sentence that explains why a composite score says little about causes now cites that last point. The record stays `bibliographic` because the copy is not the canonical edition. |
| `brooke-2013` | **One further attempt, still inaccessible** (both known PDF locations return 404). Remains awaiting verification; `system-usability-scale` Editorial stays developing. Recorded, not forced. |
| B3-o2 (abstract-only sources) | **Partly met.** `shneiderman-1982` read in full from the author's copy; it supports every statement the entries cite. `redish-1981`, `redish-2000`, `seckler-2014-web-forms`, `bargas-avila-2007` and `iso-24495-1-2023`: one access attempt each (HTTP 403, paywall or unreadable challenge page); each record now says so. Claims in those entries stay limited to the abstracts. |
| `w3c-wcag-22` record note (B1-W) | **Met.** The W3C page is labelled "W3C Recommendation 12 December 2024"; the note says so. |
| Optional relations (B1-FP-6, C-4, IS-2, D-2; B2-O-3) | **Met.** Five reciprocal relations and one prose link, each with a factual note; directions follow the existing convention. |

## Findings

| ID | Severity | Finding | Handling |
|---|---|---|---|
| IB2-F1 | minor | In `human-computer-interaction` the 1980 citation sits after a sentence about usability tests that it supports only for the think-aloud basis. | Logged; accurate but loosely placed. |
| IB2-F2 | minor (new) | `confidence-intervals`: hero-plate text measures 7.9 px at 390 px width, below the 10 px figure standard. Not caused by IB2 (no visual change; not measured earlier). | Logged as TD-4; a plate fix is outside IB2's scope. |
| IB2-F3 | minor (tool) | The review script counted saved flashcards by a slug prefix and reported a false 0/8 for `interaction-design-discipline` (its card ids start `interaction-design-fc-`). | Fixed in `tests/browser/entry-review.cjs` (counts newly stored cards); 8/8 after. |
| IB2-F4 | limitation | Brooke 1996 was read from a third-party copy; Brooke 2013 and five abstract-only sources remain unread. | Recorded in the source records and the register. |

## Verification (see the QA ledger)

`npm run check` 586/586; `test:taxonomy` pass; `docs:generate` (Practice 102 complete; evidence target 101/102 and Editorial 101 unchanged); `build` 995/995 on the rerun after the same CLI notice (not acted on); `sources:verify` on the three changed records (`brooke-1996` and `shneiderman-1982` doi-verified; `w3c-wcag-22` url-reachable); integrity script on the 21 touched entries: no new problems (only pre-existing further-reading references). Entry review with axe-core 4.14.0 on the 21 touched entries: axe 0 and overflow 0 everywhere; all remaining failures are plate markers on pages already in the backlog (`docs/VISUAL_QA.md`) plus IB2-F2. Inherited, not rerun: e2e, e2e-redesign, atlas, keyboard, devices, colour-studio, crawl (no layout, route or taxonomy change; one explorer data constant changed and its page was covered by the entry review). Not tested: screen readers, physical devices, independent expert review.
