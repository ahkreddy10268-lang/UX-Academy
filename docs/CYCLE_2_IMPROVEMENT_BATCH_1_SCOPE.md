# Cycle 2 — Improvement Batch 1: exact scope and acceptance criteria

Status: **prepared for owner review. Implementation has not started.** Authority: owner decision 2026-11-17 (D-129 § 9.3: Cycle 2 begins with an improvement-only batch). No new taxonomy topics; no change to D-129, learning paths, or published content outside the items below.

Baseline: branch `claude/batch1-constraints` at `9931f1a`; 102 published; `npm run check` 586/586 (`docs/QA_VERIFICATION_LEDGER.md`).

## 1. In scope

| ID | Entry or record | Original quality gap |
|---|---|---|
| IB1-1 | `mapping` | Evidence target (D-129 "established" group): has one evidence point, needs two. Other checks in the group already pass. |
| IB1-2 | `heart-framework` | Evidence target (peer-reviewed → "established" group): has one primary source (`rodden-hutchinson-fu-2010`), needs two. Its visual-target gap (detailed diagram) is **deferred** (DEF-1). |
| IB1-3 | `usability-testing` (B2-O-1) | Cites the unread Ericsson & Simon 1993 book for the classic think-aloud sentence; the abstract-read `ericsson-simon-1980` supports it. |
| IB1-4 | `plain-language` (B3-o1) | Easy Read is described in general terms with no source. |
| IB1-5 | `system-usability-scale`, `doherty-threshold`, `keystroke-level-model`, `shneiderman-golden-rules` | Editorial rated developing because a source is awaiting verification: `brooke-2013`, `doherty-thadani-1982`, `kieras-2001-klm`, `shneiderman-golden-rules-page`. |

Not in this batch, but recorded: DEF-1 (ten diagrams), DEF-2 (twelve Practice entries), the 78-plate marker backlog (TD-1), the remaining Batch 1–3 minors (reciprocal relations, B2-O-2/3/4, B3-o2/o3, B1 owner items). See `docs/OPEN_ISSUES.md`.

**Owner to confirm:** B2-O-3 (an optional `mental-models` → think-aloud link) and B2-O-4 (e2e `role="status"` hardening) are *not* accuracy fixes, so they are excluded unless added. B3-o2 (reading the full text of abstract-only sources) is excluded as larger research.

## 2. Planned correction, evidence and verification, per item

For each item the batch records: original gap → correction → evidence → targeted verification (as a table in the batch report, commit by commit).

### IB1-1 `mapping` — second evidence point
- **Correction.** The `evidence` array holds one paragraph that bundles three separate claims. Separate them into discrete, individually sourced points: (a) S-R compatibility as an experimental human-factors finding (Fitts & Seeger 1953, Chapanis & Lindenbaum 1959); (b) natural mapping as Norman's explanatory framing, not an experiment; (c) the limits: digital conventions rest on familiarity. Each point keeps its existing source and its stated reading limit.
- **Hard rule.** No claim beyond what the entry's references support; the existing statements that Fitts & Seeger is cited bibliographically and Chapanis & Lindenbaum was read as an abstract stay. If the honest content does not yield two distinct points without padding, the batch reports that and the gap stays open; it does not add an unread source or change the evidence class to meet the target.
- **Evidence.** The three sources already in `references` and their current verification status.
- **Acceptance.** `evidenceTarget` for `mapping` is met; every `{{src}}` still in `references`; no claim stronger than before; editorial test passes.

### IB1-2 `heart-framework` — second primary or standard source
- **Correction.** Add a second primary or standard source if one can be found and read; no candidate is identified in the registry yet (only Rodden et al. 2010 is primary; `google-research` and `sauro-lewis-2016` are "further"). Research step first: search for the originating or a closely related primary publication, read it, verify the record (`sources:verify`), then cite only what it supports.
- **Fallback.** If no second primary source can be verified, the batch reports that and leaves the gap. Two things are not acceptable: relabelling a "further" source as primary, and changing the evidence class to reach the target. (Whether the class is right is an owner decision, not a target decision.)
- **Acceptance.** Target met by a verified source actually read, or the gap reported with the search record.

### IB1-3 `usability-testing` — citation retarget
- **Correction.** Replace the `ericsson-simon-1993` citation for the classic think-aloud sentence with `ericsson-simon-1980` if its abstract supports the sentence exactly; reword to the abstract's claim if it supports less. Remove `ericsson-simon-1993` from `references` only if no remaining claim uses it.
- **Acceptance.** Cited ⊆ references; no unread source supports a claim; entry text changes only in the affected sentence.

### IB1-4 `plain-language` — Easy Read
- **Correction.** Either cite a primary or standards-body Easy Read source that was actually read and verified, or reduce the sentence to what the existing sources support. No claim from memory.
- **Acceptance.** Every Easy Read statement is sourced or removed; `entry-integrity` clean.

### IB1-5 Editorial: four entries, source verification first
- **Gate.** Run `npm run sources:verify -- brooke-2013 doherty-thadani-1982 kieras-2001-klm shneiderman-golden-rules-page` before touching any entry. Record each result.
- **Then.** A record may leave `awaiting-verification` only if the machine check or a read of the source confirms the bibliographic details. Update the record's `notes` honestly (it currently documents 404, 503 and unconfirmed years). Re-run the entry's maturity rating from the generated coverage doc.
- **Fallback, per source.** If a source cannot be verified, that entry's Editorial rating stays developing, the reason is recorded in `OPEN_ISSUES`, and no status is edited by hand. A replacement source is added only if found, read and verified.
- **Acceptance.** For each of the four entries: its source is verified or the blocker is documented; generated `docs/CONTENT_COVERAGE.md` shows the resulting Editorial rating (nothing claimed beyond it).

## 3. Batch acceptance criteria

1. Scope held: only the five items; no new topics, no taxonomy, D-129, path or unrelated entry changes (`git diff --stat` reviewed against this list).
2. Every change recorded as original gap → correction → evidence → verification, in `docs/CYCLE_2_IMPROVEMENT_BATCH_1_REPORT.md`.
3. No fabricated citations; every new or changed source read and verified, or the gap reported.
4. Gates: `npm run check`, `test:taxonomy`, `docs:generate`, `build`.
5. Generated coverage shows the before/after for the evidence target (100/102 → at most 102/102, reported as measured) and Editorial (98 complete → as measured).
6. Focused review (five dimensions on the touched entries only), with severity-rated findings; critical/major/moderate fixed before PASS.
7. Records updated: PROJECT_STATE, OPEN_ISSUES, QA ledger, PROGRESS, CONTENT_AUDIT if the taxonomy is touched (it should not be).
8. Local commits only; push on explicit approval.

## 4. Targeted verification plan (no unrelated audits)

| Check | Applies to | Why |
|---|---|---|
| `npm run check` | whole repo | required before every commit |
| `npm run sources:verify -- <ids>` | new or changed source records | DOI/URL verification |
| `npx tsx scripts/entry-integrity.ts mapping heart-framework usability-testing plain-language system-usability-scale doherty-threshold keystroke-level-model shneiderman-golden-rules` | touched entries | citations, relations, quiz, figure sources |
| `npm run docs:generate`, `npm run test:taxonomy` | whole content | generated targets and coverage |
| `npm run build` | whole site | content change |
| `tests/browser/entry-review.cjs` on the touched slugs | those pages | render, overflow, axe. Plate markers: existing backlog failures (TD-1) are reported, not fixed |
| e2e, keyboard, devices, colour-studio, crawl, atlas | — | INHERITED unless a component, route or taxonomy file changes |

## 5. Risks and trade-offs

- **IB1-2 and IB1-5 depend on external sources** (publisher pages that returned 404/503 earlier). The batch may legitimately end with some gaps open; that is a valid outcome and is preferable to weakening a standard.
- **IB1-1 can look like padding** if points are split without substance; the hard rule above is the guard. The owner may prefer to leave `mapping` below target.
- **Evidence-class questions** (is `peer-reviewed` right for `heart-framework`?) are not decided here.

## 6. Decisions needed before implementation

1. Approve this scope (including the two exclusions in § 1).
2. Confirm the fallback policy: gaps that cannot be closed honestly are reported, not forced.
3. Confirm that the batch report and review are separate commits, as in earlier batches.
