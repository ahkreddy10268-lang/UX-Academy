# Cycle 1, Batch 2 — UX research foundations (D-129)

_Session 47, 2026-11-16. Branch `claude/batch1-constraints`, committed locally, not pushed._

## Entries

| Route | Classification | Evidence class | Level-2 figure |
|---|---|---|---|
| `/library/think-aloud-protocol` | method (+ technique) · research → qualitative · intermediate | peer-reviewed | `think-aloud-protocol.protocols` (comparison, sheet) |
| `/library/tree-testing` | method (+ technique) · research → evaluation · intermediate | practitioner recommendation | `tree-testing.readings` (decision, sheet) |
| `/library/contextual-inquiry` | method (+ technique) · research → qualitative · intermediate | practitioner recommendation | `contextual-inquiry.process` (process, viz) |
| `/library/in-depth-interviews` | method · research → qualitative · beginner | peer-reviewed | `in-depth-interviews.claims` (comparison, sheet) |

Placement follows the frozen taxonomy (Tree Testing sits under Usability evaluation; the other three under Qualitative methods).

## Sources and access limits

21 new records in `content/sources/research-methods.ts`, all machine-verified (14 DOI-verified against Crossref, 7 URL-reachable). Every note records what was actually read.

- **Think-aloud.** Ericsson & Simon 1980, Hertzum, Hansen & Andersen 2009, van den Haak et al. 2003, Olmsted-Hawala et al. 2010, McDonald et al. 2012, Fan et al. 2019, Nisbett & Wilson 1977: abstracts only (OpenAlex). Alhadreti & Mayhew 2018: author version read in full. Reused: Boren & Ramey 2000 (abstract now read; note added), Hertzum & Jacobsen 2001 (abstract re-read), the NN/g think-aloud article (read). Ericsson & Simon's 1993 book: bibliographic record only, and no specific claim is attributed to it.
- **Tree testing.** Spencer 2003 and O'Brien 2009 (Boxes and Arrows) and two NN/g articles: all read in full. O'Brien built a commercial tree-testing tool; his 31 % → 67 % figure is labelled a vendor case report. The benchmark of 98 studies (Albert & Tullis) is cited only through NN/g; the book was not read. No peer-reviewed validation of tree-test scores against findability in finished products was found, and the entry says so.
- **Contextual inquiry.** Holtzblatt & Beyer's 2014 encyclopedia chapter (IxDF): read in full. Wixon, Holtzblatt & Knox 1990: abstract. Beyer & Holtzblatt 1995: opening only (the publisher blocked the full text). NN/g article: read. The 1988 chapter, Holtzblatt & Jones 1993 and the 1998 book are cited through the 2014 account or as records only. No controlled comparison with other methods was found.
- **Interviews.** NN/g User Interviews 101: read. Flanagan 1954, Braun & Clarke 2006, Guest et al. 2006, Hennink & Kaiser 2022: abstracts only. Braun and Clarke's six phases are not described, because the full text was not read.

## Plates

All four are in `components/illustrations/concepts/research-sheets.tsx` and registered in `visual-register.ts`. Scenarios are illustrative.

- **Think-aloud.** A library catalogue with a filter the participant fails to notice, a time-stamped transcript, and a Does/Says timeline on one clock (5 markers).
- **Tree testing.** A task that avoids the labels' wording, the text-only tree with an indirect path, and per-task results. Success has an adjusted-Wald interval computed by `lib/formulas` `taskSuccess`; directness and first clicks are also shown (7 markers).
- **Contextual inquiry.** A clinic booking system with a sticky-note workaround, and field notes in which the researcher's guess is struck out when corrected. Below them, the watch–ask–interpret–check rhythm and the four principles (6 markers).
- **Interviews.** A guide built from a goal, a hypothetical question (cross) against a specific-episode question (tick), and quotes bracketed into a theme (6 markers).

Rendered at 1440, 768 and 390 px, light and dark:
- plate text is at least 10.2 px at 390;
- no text is clipped;
- every marker is inside the viewBox.

## Practice

Per entry:
- 3 exercises, including one correction exercise:
  - think-aloud: correct a moderator transcript;
  - tree testing: correct task wording;
  - contextual inquiry: correct a session that became an interview;
  - interviews: correct five questions.
- 4 quiz questions across at least two levels.
- 5 flashcards.
- 3–5 dos and 3 don'ts.
- 1 worked example:
  - think-aloud: a moderator script;
  - tree testing: a tree and its tasks;
  - contextual inquiry: three-column field notes;
  - interviews: an interview guide.

Tree testing also has a calculation exercise. Its figures were checked with `taskSuccess` and `twoProportionTest`.

## Relations

Outgoing relations: think-aloud 5, tree testing 5, contextual inquiry 6, interviews 6.

Minimal fixes to existing entries, where a reversed direction would have rendered wrongly on the new pages:
1. `usability-testing → applied-in → think-aloud-protocol`: removed. It is replaced by `think-aloud-protocol → applied-in → usability-testing`.
2. `user-centred-design → applied-in → contextual-inquiry`: removed. It is replaced by `contextual-inquiry → applied-in → user-centred-design`.
3. `human-computer-interaction → contextual-inquiry`: changed from `applied-in` to `related-to`. The note is unchanged.

## Coverage (generated)

- Published: 97 of 561 (17.3 %), up from 93.
- UX Research: 9 of 57 published.
- D-129 targets: Visual 87/97, Evidence 95/97. The four new entries meet both targets. The 11 entries below target are unchanged.

## QA (final build)

| Check | Result |
|---|---|
| `npm run check` | 22 files, 576 tests |
| `test:taxonomy` | pass |
| Build | 994/994 pages |
| e2e | 44/44 |
| e2e-redesign | 66/66 |
| atlas | 36/36 |
| keyboard | 45/45 |
| devices | 155/155 |
| colour-studio | 46/46 |
| axe | 0 violations |
| crawl | 0 problems |
| Per-page review (the four new entries plus the three with changed relations) | 56/56 |

The per-page review covers six viewport/theme combinations per page: axe, overflow, page errors, plate text size, clipping, markers, internal links, and adding flashcards by keyboard.

## Limitations

- Most academic sources were read as abstracts only. Effects are stated per study, never as general sizes.
- Tree testing and contextual inquiry have no peer-reviewed validation studies behind them. Both are classed as practitioner recommendations.
- `card-sorting` was checked only as a neighbouring page. It still has two markers outside its viewBox, part of the logged backlog (78 plates), which was not touched.
- The e2e-redesign locator for the results count was narrowed so that it ignores plate text. The assertion is unchanged apart from the new count (18).

Learning paths, curriculum stages and D-129 were not modified.
