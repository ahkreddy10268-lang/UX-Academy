# Cycle 1, Batch 2 — formal review (D-129)

_Session 48, 2026-11-16. Targeted review of Batch 2 only; not a repository audit._

## 1. Baseline and scope

- **Branch:** `claude/batch1-constraints`.
- **Commit reviewed:** `bf39a7939f0f46cc3f3ba6d22766379521a1d1a0`. The working tree was clean and the branch was one commit ahead of `origin` (`07fa577`).
- **Read:**
  - D-129 (docs/DECISION_LOG.md) and plan §§ 7.4 and 9.2 (docs/BALANCED_DEVELOPMENT_PLAN.md);
  - docs/BATCH_2_REPORT.md;
  - the full diff `07fa577..bf39a79` (27 files);
  - the four entry files, `content/sources/research-methods.ts`, the plates (`components/illustrations/concepts/research-sheets.tsx`), the four Level-2 figures, and the three existing entries whose relations changed.
- **Method:** every cited sentence was compared with what the source note says was read (abstract, full text or record only). Each source note was then compared with the material itself, re-fetched during implementation and checked again here where a claim depended on wording.
- **Corrections:** made in a separate review commit on top of `bf39a79`. The QA in § 6 was run on the corrected tree.

## 2. Findings by entry

Severity scale:
- **Critical:** false or harmful content, or a broken build.
- **Major:** a claim contradicted by its source, or a gate failure.
- **Moderate:** a citation that does not support its sentence, or an unsupported generalisation in a teaching claim.
- **Minor:** imprecision, wording or a single-reference issue.

### `think-aloud-protocol` — `content/knowledge/research/think-aloud-protocol.ts`

**Strengths.**
- The method is clearly separated from usability testing. It is a technique applied *in* usability tests: relation `applied-in → usability-testing`, the definition, and the "When not to use" list ("natural task times … measure silently").
- Classic, relaxed, concurrent, retrospective and hybrid forms are defined and kept apart.
- The Ericsson & Simon model is stated narrowly and linked correctly to Nisbett & Wilson.
- Conflicting study results (van den Haak 2003 against Alhadreti & Mayhew 2018) are presented as a debate, not averaged.
- The correction exercise (moderator transcript) is realistic and teaches the key judgement.

| # | Severity | Finding | Status |
|---|---|---|---|
| TA-1 | Moderate | Evidence point and quiz explanation said coaching raised accuracy **and satisfaction** compared with a silent control. The Olmsted-Hawala abstract compares satisfaction only with the traditional and speech-communication conditions. | Fixed |
| TA-2 | Moderate | Practice "do" (practise on a neutral task) cited Nielsen 2012, who recommends a short **video demo**, not a practice task. | Fixed: demo attributed to Nielsen; practice tasks attributed to McDonald et al. as varied practice |
| TA-3 | Moderate | Advanced: "they agree that retrospective sessions cost more time". Only Alhadreti & Mayhew report time; van den Haak's abstract does not. | Fixed: attributed to Alhadreti & Mayhew alone |
| TA-4 | Minor | Definition said practice is "almost always" relaxed (Hertzum: "generally") and that "asking for anything more changes what is reported" (imprecise against Ericsson & Simon). | Fixed |
| TA-5 | Minor | "Boren and Ramey **showed**" — an argument and review, not a demonstration. | Fixed: "argued" |
| TA-6 | Minor | Enterprise note asserted, without a source, that experts verbalise less "because their work is automatic". | Fixed: softened to an observation tip |

### `tree-testing` — `content/knowledge/research/tree-testing.ts`

**Strengths.**
- The entry never presents a tree test as proof that an interface is usable. Its limitations, "When not to use", the misconception "65 % means fails a third", the Level-2 footnote and the plate key all say that search, content and visual design are removed on purpose.
- The method is distinguished from card sorting (generative) and closed card sorting (filing, not finding).
- Its evidence is honestly classed as practitioner recommendation. The vendor interest behind the 31 % → 67 % case is disclosed.
- All arithmetic was re-computed with `lib/formulas`:
  - 6/8 gives 40–94 %;
  - 34/50 gives 54–79 %;
  - 24/50 against 34/50 gives z = 2.03, p = 0.043, difference interval 1–39 points.

| # | Severity | Finding | Status |
|---|---|---|---|
| TT-1 | Minor | Scenario said "half of the **successful** participants went directly". NN/g's figures are 74 % success and 50 % direct overall; NN/g's own sentence is internally inconsistent. | Fixed: reports the two figures as given |
| TT-2 | Minor | Quiz `tree-testing-q-wording` sent learners to revise `card-sorting`, but the skill is task wording. | Fixed: `usability-testing` |
| TT-3 | Minor | Origin period dated the name to "the late 2000s"; O'Brien (2009) does not date it. | Fixed: "in use by 2009" |

### `contextual-inquiry` — `content/knowledge/research/contextual-inquiry.ts`

**Strengths.**
- The entry does not reduce the method to workplace interviewing. Misconception 1 ("an interview held in the user's office") and the correction exercise (a café session that became an interview) teach exactly that.
- It is bounded against ethnography, using the originators' account.
- The four principles are attributed to NN/g as a practitioner summary.
- The clinic scenario shows an interpretation being corrected — the method's core move — in the prose, the worked example, the plate and the Level-2 figure.

| # | Severity | Finding | Status |
|---|---|---|---|
| CI-1 | Moderate | Definition cited Beyer & Holtzblatt 1995 (only its opening was read) for the master–apprentice stance and the absence of a question list. It cited Wixon et al. 1990 (abstract) for contextual inquiry being "the first step of Contextual Design". Neither text read says either thing; the 2014 chapter (read in full) says both. | Fixed: cited to the 2014 chapter; Wixon kept for the CHI '90 introduction |
| CI-2 | Minor | "In practice teams scale down the number of sessions and models, not the being-in-context" — an unsourced generalisation stated as fact. | Fixed: labelled as this entry's recommendation |
| CI-3 | Minor | Everyday examples (nurses, accounts, warehouse) were phrased as findings ("reveals that…"). | Fixed: phrased as possibilities and labelled illustrative |

### `in-depth-interviews` — `content/knowledge/research/in-depth-interviews.ts`

**Strengths.**
- The entry does not treat interview statements as direct evidence of behaviour:
  - "attitudinal" in the definition;
  - the say-versus-do debate;
  - the Level-2 figure "What interview data can and cannot support";
  - misconceptions on "why" answers;
  - the quiz on a stated reason;
  - the exercise that rejects "% who want feature A".
- The question-fault correction exercise is strong.

| # | Severity | Finding | Status |
|---|---|---|---|
| IDI-1 | Moderate | Flanagan 1954 was cited for "accounts of specific incidents carry more information than generalisations" and for memory detail. The abstract describes collecting **observed** incidents of behaviour and makes neither claim. | Fixed: the detail claim now cites NN/g; Flanagan is presented as a precedent, with a note that recalled incidents are still reports; the origin link is marked as the entry's interpretation; the reference note is corrected |
| IDI-2 | Moderate | Saturation edged towards a rule. "In UX this means planning roughly a dozen…" generalised from non-UX studies that mostly measured code saturation; a practice "do" was typed `standard`; an uncited sentence described critics of saturation. | Fixed: framed as a starting estimate with its provenance; the "do" is typed `context` and says "an estimate, not a rule"; the uncited critique is replaced by an honest statement that this literature was not reviewed |
| IDI-3 | Minor | "Themes do not 'emerge' … they are constructed" was stated as fact with no source; Braun & Clarke were read as an abstract only. | Fixed: neutral methodological wording |
| IDI-4 | Minor | The Level-2 figure listed `flanagan-1954` among its sources, but no label rests on it. | Fixed: removed |

### Integration — existing entries

| # | Severity | Finding | Status |
|---|---|---|---|
| INT-1 | Moderate | Plan § 7.4 names `usability-testing → think-aloud-protocol` as a required integration link. The batch correctly removed the reversed `applied-in` relation, but left no link from `usability-testing` to the new entry. | Fixed: `[[think-aloud-protocol|think-aloud]]` link in its classic think-aloud sentence (one-word content edit) |

The three relation changes were correct and were re-checked.
- **Rendering:** the new entries show "Think-Aloud Protocol — Applied in this" on Usability Testing and "Contextual Inquiry — Applied in this" on User-Centred Design. Human–Computer Interaction → Contextual Inquiry now reads "related to", with its note unchanged.
- **Incoming relations left unchanged after checking:** Jobs To Be Done → applied in In-depth Interviews (switch interviews; correct direction), Mental Models → measured by Think-Aloud, Information Architecture → measured by Tree Testing, and Card Sorting → complementary to Tree Testing.

## 3. Evidence and practice quality

**Evidence.**
- All 21 new sources are machine-verified (14 DOI, 7 URL), and every reference is cited at least once.
- After the corrections, every cited sentence matches what its source note records as read.
- Evidence classes fit the claims:
  - Think-aloud is peer-reviewed: an experimental literature on the method.
  - In-depth interviews are peer-reviewed for the specific claims made (self-report, saturation). The evidence note says the method itself is long-established rather than experimentally validated.
  - Tree testing and contextual inquiry are practitioner recommendations: no validation studies were found, and both entries say so.
- No class appears to have been chosen to reach a target.

**Practice.** Each entry has:
- 3 exercises, one of them a correction exercise;
- 4 quiz questions at all three levels, each with exactly one correct option;
- 5 flashcards;
- a worked example drawn from real professional work (moderator script, importable tree and tasks, three-column field notes, interview guide).

The four exercise sets differ in kind and are not one template. The calculation exercise is numerically correct.

## 4. Source verification and limitations

- **Read in full:** Alhadreti & Mayhew 2018 (author version), Holtzblatt & Beyer 2014, Spencer 2003, O'Brien 2009 and four NN/g articles.
- **Abstracts only:** the other ten research papers.
- **Records only, with no claim attributed:** Ericsson & Simon 1993 and Beyer & Holtzblatt 1998.
- **Cited only through NN/g:** Albert & Tullis (98 studies).
- **Limitation:** the "no validation study was found" statements for tree testing and contextual inquiry rest on Crossref searches during implementation, not a systematic review. The wording ("was found") is accurate to that search.

## 5. Visual and integration checks

- **Plates:** all four are registered (`_fragments.ts`, `visual-register.ts`). Drawings agree with their keys and with the prose, and the scenarios are labelled illustrative in each description. The tree-test numbers come from `lib/formulas`. Meaning never rests on colour alone: tick and cross, struck-through text, P and M labels, and written strength labels in the interview figure.
- **Level-2 figures:** the four figures cite only their entry's references, and each has an ordered text version.
- **Rendered checks (this review, corrected build):** at 1440, 768 and 390 px, light and dark:
  - plate text is at least 10.2 px at 390;
  - 0 clipped text;
  - all 24 markers inside the viewBox;
  - 0 overflow, 0 page errors, 0 axe violations.
- **Taxonomy:** placement matches the frozen taxonomy (three under Qualitative methods, Tree Testing under Usability evaluation), and all links, relation targets and prerequisites resolve.

### Card Sorting plate

- **Membership of the backlog:** confirmed. Markers 3 and 4 are centred at x = 392 (radius 11 plus stroke), overhanging the 400-unit viewBox by about 3.75 units. They are listed in docs/VISUAL_QA.md ("/library/card-sorting … 2 … 3, 4").
- **Untouched:** the plate is in `learning-sheets.tsx`, which this batch did not change.
- **Impact:** the right edge of both marker circles is clipped; both numerals stay fully legible, and the figure key is unaffected. It is cosmetic and was not fixed, per scope.

### e2e-redesign change (`tests/browser/e2e-redesign.cjs:146`)

- **Before:** `p.getByText(/^\d+ results?/)`.
- **After:** `p.locator('p[aria-live="polite"]').getByText(/^\d+ results?/)`, with the expected count 14 → 18.
- **Cause:** `/library?feature=visual` renders a card for each concept, and the Think-Aloud card carries its plate, whose SVG text "412 results" also matches the regular expression. This was measured: the unscoped locator found 2 matches ("18 results", "412 results").
- **Effect of the old locator:** Playwright's strict mode makes `textContent()` throw. The old test would have failed loudly, not passed wrongly.
- **Effect of the new locator:** it targets the page's only polite live region (measured: 1 region, "18 results"). This is the user-visible results announcement the test was always meant to read.
- **Count:** 18 is the actual number of concepts with a detailed diagram (14 + 4 new). The filter result is still compared with an exact count, so the test is **not weakened**.
- **Optional improvement, not made:** give the results line `role="status"` and use `getByRole('status')`.

## 6. Test results

**Run in this review, on the corrected tree:**

| Check | Result |
|---|---|
| `npm run check` (index, typecheck, tests, lint) | 22 files, 576 tests pass, lint clean |
| `npm run test:taxonomy` | all checks pass |
| Targeted integrity script for the four entries | 0 cited-not-referenced, 0 unused references, 0 unresolved links, relations or prerequisites; quiz levels and correct-option counts valid; Level-2 sources ⊂ references; plates registered |
| `npm run build` | 994/994 pages |
| e2e-redesign | 66/66 |
| keyboard | 45/45 |
| devices | 155/155 |
| a11y (axe) | 0 violations |
| crawl | 0 problems |
| Per-page review | 56/56 (the four entries plus usability-testing, user-centred-design and human-computer-interaction) |
| Locator measurement | 1 live region; unscoped matches 2 |
| Card Sorting marker measurement | markers 3 and 4 at x = 392 |

The per-page review checked six viewport/theme combinations per page: axe, overflow, page errors, plate text, clipping, markers, links and adding flashcards by keyboard.

**Inherited, not re-run here:** e2e 44/44, atlas 36/36, colour-studio 46/46 (implementation run on `bf39a79`). They are unaffected by text-only content corrections.

**Untested:** real screen readers, physical devices, and content review by an independent subject expert.

## 7. Outstanding issues

| # | Severity | Issue |
|---|---|---|
| O-1 | Minor | `usability-testing` (pre-existing, outside the batch) cites the unread Ericsson & Simon 1993 book for its classic-think-aloud sentence. `ericsson-simon-1980` (abstract read) supports it. Recommend retargeting in a later improvement pass. |
| O-2 | Minor | The validation-study searches for tree testing and contextual inquiry were not systematic (see § 4). |
| O-3 | Minor | `mental-models` mentions think-aloud observation in prose without a link (optional § 7.4 link). |
| O-4 | Minor | Optional e2e hardening (`role="status"`), as above. |
| — | Pre-existing | Card Sorting's markers 3 and 4, part of the 78-plate backlog; unchanged. |

**Counts.** 0 critical, 0 major, 7 moderate (all fixed), 10 minor fixed, and 4 minor open follow-ups.

## 8. Decision

**PASS WITH MINOR FOLLOW-UPS.** After the corrections:
- all four entries are methodologically accurate and meet D-129's Visual and Evidence targets (Visual 87/97 and Evidence 95/97 overall);
- the five required distinctions hold;
- no claim rests on material that was not read.

## 9. Batch 3

Batch 3 is ready for authorisation on the owner's approval of this review. It has not been started. D-129, learning paths and Batch 1 were not modified, and nothing was pushed or merged.
