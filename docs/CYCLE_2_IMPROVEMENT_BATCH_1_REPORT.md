# Cycle 2 — Improvement Batch 1: implementation report

Scope: `docs/CYCLE_2_IMPROVEMENT_BATCH_1_SCOPE.md` (approved 2026-11-17). Baseline `7c34436`. Authority: D-129 § 9.3. No new topics, no taxonomy, D-129 or learning-path changes. This report is not the formal review; that follows in its own commit after the owner's review.

Policy applied: accuracy before closing findings. A gap that could not be closed from sources actually read is reported, not forced; no source was relabelled, no evidence class changed, no citation inferred.

## Result at a glance

| Item | Outcome |
|---|---|
| IB1-1 `mapping` | **Closed.** Evidence target now met. |
| IB1-2 `heart-framework` | **Not closed (evidence gap reported).** No second primary source exists to cite. |
| IB1-3 `usability-testing` | **Closed.** Citation retargeted to the DOI-verified 1980 paper. |
| IB1-4 `plain-language` | **Closed.** Easy Read statement sourced from a source read in full. |
| IB1-5 Editorial | **3 of 4 closed.** `doherty-threshold`, `keystroke-level-model`, `shneiderman-golden-rules`. **`system-usability-scale` not closed** (Brooke 2013 could not be read). |

Measured from the regenerated `docs/CONTENT_COVERAGE.md`: evidence target 100 → **101 / 102**; Editorial complete 98 → **101**, developing 4 → 1; Evidence maturity complete 64 → 65. Published stays 102.

## Per-item record

### IB1-1 `mapping`
- **Original gap.** The `evidence` array was one paragraph bundling three separate claims, so the D-129 "two evidence points" check failed.
- **Correction.** The same text, split into three discrete, individually cited points: (1) S-R compatibility as an established finding (Fitts & Seeger 1953, cited bibliographically, not re-read); (2) Chapanis & Lindenbaum 1959 (abstract read); (3) Norman's natural mapping as explanation, not experiment, and digital conventions as practice. No claim was added, strengthened or re-sourced; the evidence class (`established-theory`) is unchanged.
- **Evidence.** Existing references only. `fitts-seeger-1953` and `chapanis-lindenbaum-1959` are DOI-verified.
- **Verification.** `evidenceTarget(mapping)` met in the regenerated coverage; integrity script clean for the entry; entry review at 3 widths, light and dark: axe 0, overflow 0, no clipped text.
- **Caveat for the reviewer.** This is a structural change: the three points were already in the paragraph. It is defensible because points 1 and 2 are two distinct studies and point 3 states a status and a limit, but if the owner reads it as padding, reverting it restores the gap without any loss of content.

### IB1-2 `heart-framework` — not closed
- **Original gap.** Evidence group "established" needs two primary or standard sources; the entry has one (`rodden-hutchinson-fu-2010`).
- **Investigation.** A web search for the originating and related primary publications found only the 2010 CHI paper as the origin of HEART and Goals–Signals–Metrics; everything else found is secondary (product blogs, glossaries). The registry's other HEART-related sources (`google-research`, `sauro-lewis-2016`) are correctly "further".
- **Decision.** No change to the entry. Relabelling a "further" source as primary, or changing the evidence class, would be what the owner's policy forbids. The gap is a property of the topic (a single originating publication), not a defect of the entry.
- **Escalated.** The evidence-class question (is `peer-reviewed` the right class, and does the D-129 target fit a single-paper framework?) is an owner decision. The visual gap (detailed diagram) remains deferred (DEF-1).

### IB1-3 `usability-testing`
- **Original gap.** Two sentences cited the unread 1993 book `ericsson-simon-1993`.
- **Correction.** Both retargeted to `ericsson-simon-1980`; the reference entry replaced and its note says the abstract, not the paper, was read. One sentence was reworded so the citation sits only on what the abstract supports: reporting information a person already attends to is not expected to change thinking much; requests for information they would not otherwise attend to can. The "keep talking" prompt is practice, not an Ericsson–Simon claim, and is no longer attributed to them.
- **Evidence.** `ericsson-simon-1980` re-verified: `doi-verified` (Crossref title and year matched, 2026-11-17).
- **Verification.** Cited ⊆ references (integrity script); no other claim in the entry relied on the removed source.

### IB1-4 `plain-language` (Easy Read)
- **Original gap.** The Easy Read statement had no source and said "learning disabilities".
- **Source.** New record `inclusion-europe-information-for-all` (Inclusion Europe, *Information for all: European standards for making information easy to read and understand*). Read 2026-11-17: the sections on who the standards are for, sentences (one idea, short), images next to text, and testing with people with intellectual disabilities; it says the standards can help other readers too. No publication year is recorded: the PDF metadata says 2009, a secondary record says 2010 and another 2014.
- **Correction.** The statement now says what the source supports (intellectual disabilities; short one-idea sentences; images beside text; testing with the readers) and keeps "plain language is broader and does not imply this format". The source is a statement of practice by a non-profit federation, labelled as such, not research.
- **Verification.** `sources:verify`: url-reachable; integrity clean; entry cites only referenced sources.

### IB1-5 Editorial (sources verified first)
Gate run first: `npm run sources:verify` on the four records, then each source read from a copy that could be fetched.

| Source | Result | What was and was not confirmed |
|---|---|---|
| `shneiderman-golden-rules-page` | **Verified.** The page now returns 200 (it was 503 on 2026-11-03). | Read in full: all eight rule names and their summaries match the entry's wording. It is the author's summary of the 6th edition, not the book. |
| `kieras-2001-klm` | **Verified.** URL added (author's own copy at `web.eecs.umich.edu`). | The copy at that URL is "© David Kieras, 2001", so the record's year was right. An earlier version, "© 1993", circulates on other sites and differs in wording. The 2001 copy contains the B operator (0.1 s; BB 0.2 s) and the M operator with placement guidance, which is all the entry cites it for. The author's own page links it by an `ftp://` address that browsers no longer follow. |
| `doherty-thadani-1982` | **Verified with stated limits.** Read from a scanned copy held by the Computer History Museum (PDF metadata gives the title; text is OCR). | Confirmed: IBM brief by Doherty and **Thadhani** (the scan's spelling; the entry now uses it, the record id keeps the old spelling); the older two-second view; productivity rising more than in proportion as response time falls; a worked example of 180 vs 371 transactions an hour at 3 s vs 0.3 s. **Not confirmed in the copy read:** the publication year and the form number GE20-0752-0 (not legible), appearance in the IBM Systems Journal, the "400 ms" figure and the word "addicting". The IBM-hosted copy could not be fetched (its TLS certificate is not trusted from this environment; verification was not bypassed). |
| `brooke-2013` | **Not verified.** | The journal's original article page returns 404; the new journal site archives only recent volumes; an archive mirror was unreachable from this environment; the UXPA copy returned 404. Volume, issue and pages are corroborated by secondary reference lists only. The article itself was not read. |

Entry changes follow the evidence: `doherty-threshold` (spelling; statements that the original was not accessible replaced by what the scan shows and what it does not; "internal measurements" → "own measurements and project results as the report presents them"), `shneiderman-golden-rules` (reference note), `keystroke-level-model` (none beyond the record; its record now carries a URL), `lastVerifiedAt` set to 2026-11-17 on the three entries. Source records moved from `awaiting-verification` to `url-checked` only for the three with first-hand reads, with notes listing the limits.

## Findings the batch raises (new, outside the approved scope)

| ID | Finding | Suggested handling |
|---|---|---|
| N-1 | `system-usability-scale` attributes a claim to Brooke (2013) that SUS "is a quick, high-level measure, not a diagnostic: it tells you whether perceived usability is a problem, not why". The article was not read, so the attribution is unsupported. | Owner decision: soften or remove the attribution until the article can be read. Not changed here, to stay in scope. |
| N-2 | `ericsson-simon-1993` (an unread book) is still cited by `think-aloud-protocol`, `interaction-design-discipline` and `human-computer-interaction`. | Review those citations in a later improvement batch. |
| N-3 | The "400 ms" Doherty figure is still stated in the entry's lead as the claim's popular form. The scan read did not contain it. The entry says so, but the definition could be reworded further. | Optional editorial follow-up. |

## Verification (this batch; see the QA ledger for commands and SHAs)

- `npm run check` 586/586; `npm run test:taxonomy` pass; `npm run docs:generate` done; `npm run build` 995/995 (rerun after the same Next.js CLI upgrade notice as before; not acted on).
- Source checks: 4 machine runs (3 verified here, `brooke-2013` re-run: journal home page reachable, which does not verify the article); `ericsson-simon-1980` doi-verified; new record url-reachable.
- Entry review, six touched entries, 3 widths × light/dark, project axe-core 4.14.0: **axe 0 everywhere**, overflow 0, page errors 0, links resolve, flashcards by keyboard pass. The only failures are numbered markers outside the plate viewBox on `mapping` and `shneiderman-golden-rules`, both in the known marker backlog (`docs/VISUAL_QA.md`; excluded from this batch).
- Note on axe versions: a first run with a different axe-core file (4.10.2) failed a best-practice rule (`landmark-complementary-is-top-level`) on every page, including the untouched `error-messages`; it is not caused by this batch. The project's installed 4.14.0 is the reference.
- Inherited, not rerun: e2e, e2e-redesign, atlas, keyboard, devices, colour-studio, crawl (no component, route or taxonomy change).
- Not tested: screen readers, physical devices, independent expert review; the sources listed above as unread.
