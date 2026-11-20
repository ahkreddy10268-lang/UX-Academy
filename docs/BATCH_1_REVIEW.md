# Cycle 1, Batch 1 review — Interaction Feedback & State (D-129)

## 1. Scope and commits

| Item | Value |
|---|---|
| Batch | Cycle 1, Batch 1 (H slot, Interaction Design) |
| Topics | `feedback-principle`, `constraints`, `direct-manipulation`, `interaction-states`, `discoverability` |
| Branch | `claude/batch1-constraints` |
| Reviewed from | `36290b2a24efce64ec50153ada7384e0070286de` (state after the Discoverability correction pass) |
| Review corrections | `fd86db02ff75005f975fb8dccc7a1db0f99f465b` — every check in § 5 was run on this commit |
| Report | committed after `fd86db0`; documentation only (this file and docs/PROGRESS.md) |
| Batch baseline | `e3ae1d2` (the commit before `feedback-principle` was added in `3177819`) |
| Date | 2026-11-16 |

No topic was added, no learning path changed, and D-129 and the plan were not modified.

## 2. Criteria

Applied as written in D-129 (docs/DECISION_LOG.md) and docs/BALANCED_DEVELOPMENT_PLAN.md § 9.2–9.3, with no relaxed thresholds:

- **Explanation, Practice, Editorial:** "complete" under `maturity()` (lib/content/completeness.ts), plus the type-specific completeness gates in tests/content.test.ts.
- **Visual target by type family** (lib/content/targets.ts). A plate is required for every entry. Concepts and principles need no further format; a detailed diagram is optional and only where it teaches.
- **Evidence target by evidence class.** *Established* (established theory, official standard) requires ≥ 2 primary or standard sources, ≥ 1 machine-verified primary, ≥ 2 evidence points and a stated debate. *Guideline* requires the originating source as primary, ≥ 1 machine-verified source, ≥ 1 evidence point and an evidence note. Documented limits count as credit.
- **§ 9.3 batch checks:** check, taxonomy, `sources:verify` for new sources, docs:generate, build, keyboard/devices/axe, links from existing entries, and 100 % of new entries meeting their targets.
- **Project rules (CLAUDE.md):** no fabricated or unsupported claims; cited sources appear in references; classification by what a thing is; planned topics stay planned.
- **Standard set during the batch:** bibliographic verification of a source is not verification of the claims attributed to it (Discoverability correction pass, `36290b2`). This review applied that standard to all five entries.

Severity scale:
- **critical** — wrong teaching, or a broken page or gate;
- **major** — a claim not supported by, or contradicted by, the cited source;
- **moderate** — overstatement, or an internal contradiction;
- **minor** — wording, layout or completeness.

## 3. Entry findings

Ratings are from docs/CONTENT_COVERAGE.md at `fd86db0`, in the order Explanation / Evidence / Practice / Visual / Editorial. All five meet their visual and evidence targets, and none is on the "below a target" list (11 entries are, none of them in Batch 1).

### 3.1 `feedback-principle` — concept, established theory — complete / complete / complete / developing / complete

**Meets the standard**
- The definition separates feedback from visibility of system status, as a principle of each interaction versus a heuristic for the whole system (`definition`; misconception 2).
- The mechanism is taught concretely:
  - acknowledgement versus confirmation (`intermediate.howItWorks`);
  - three time scales of feedback loops (`advanced.explanation`);
  - feedback as the way people detect their own slips, cited to Norman 1983, whose abstract was read.
- **Practice tests reasoning, not recall.** The "Saved" scenario asks the learner to separate a confirmation from an acknowledgement (`q-ack`); `q-slips` asks why specific feedback helps people catch slips. The three-loop design exercise has a solution with acceptance criteria, and the entry links to feedback-lab.
- **Claims match what was read:**
  - Miller's abstract ("different human purposes … acceptable response times") was read 2026-11-16 and supports the response-time paragraph.
  - The 0.1 / 1 / 10 s limits cite Nielsen's chapter excerpt and are described as a synthesis, not a measurement.
  - Harrison et al. is cited within its abstract.
- **The plate** (7 markers) matches its key, and every marker sits inside the viewBox at all six viewports.

**Did not meet the standard (all corrected in `fd86db0` unless marked backlog)**

| # | Finding | Evidence | Severity | Action |
|---|---|---|---|---|
| FP-1 | Specific characterisations of Norman's 2013 book were cited to `norman-2013`, a bibliographic-only record: feedback must be "immediate, informative, planned and prioritised", "too much feedback is as much a failure", feedforward, and the list of principles. The definition listed feedback "alongside affordances, signifiers, **constraints**, mappings and the conceptual model". Norman's own table of contents lists chapter 1's "Fundamental Principles of Interaction" as affordances, signifiers, mapping, feedback and conceptual models; constraints are chapter 4. | `content/knowledge/interaction/feedback-principle.ts`: `definition`, `intermediate.explanation[0–1]`, `howItWorks[2]`, `misconceptions[0]`, `debates[0]`, `origin.narrative[1]`, `practice.dos[0–1]`, `practice.donts[1]`; `norman-2013` notes; `norman-dote-2013-contents` | major | **Corrected.** What the book contains is cited to `norman-dote-2013-contents`. The principle list now matches that table of contents. The qualities are stated in the entry's own words, with the access limit said explicitly. Reference notes and the evidence note now separate bibliographic verification from claim verification. |
| FP-2 | Myers (1985) was described as "people **strongly** preferred percent-done progress indicators **during long operations**" and a "**small** study". The abstract (read 2026-11-16) reports a formal experiment in which people *prefer* progress indicators, and a second part that was not significant. The record had no notes. | `howItWorks[1]`, `evidence[1]`, `evidenceNote`; `myers-1985` in `content/sources/interaction-models.ts` | moderate | **Corrected** to the abstract's wording; notes added to the source record. |
| FP-3 | The worked example put `aria-busy` on the button, contradicting `interaction-states`, which teaches that `aria-busy` is not a loading announcement. The code did not ignore presses while adding, although the exercise solution says the button "ignores further presses". | `practice.examples[0]`; `interaction-states.ts` misconception on `aria-busy` | moderate | **Corrected:** `aria-busy` removed; the handler ignores presses while adding, and the caption says so. |
| FP-4 | "Touch has no hover" conflicted with `interaction-states` ("touch gives no reliable hover"; mobile browsers can apply hover after a tap). | `application.mobile` | minor | **Corrected.** |
| FP-5 | In plate panel 6, "Jacket added" overran its card. Measured: text right edge x = 257 against a card edge of 256. | `components/illustrations/concepts/interaction-sheets.tsx`, `feedbackPrinciplePlate` | minor | **Corrected:** content moved 3 units left; text now ends at x = 253, measured on the build. |
| FP-6 | The relation to `doherty-threshold` has no link back. The content model allows one-way relations. | `relations` | minor | Backlog; optional. |

### 3.2 `constraints` — concept, established theory — complete / complete / complete / basic / complete

**Meets the standard**
- **Mechanism and boundaries:**
  - four kinds of constraint as a lens, not a taxonomy;
  - forcing functions, with when they are worth their friction;
  - boundaries with error prevention, affordances, signifiers and conventions.
- **Accessibility from first-hand standards text:**
  - native `disabled` versus `aria-disabled`, from the HTML standard and WAI-ARIA 1.2;
  - WCAG SC 1.4.3 (inactive components exempt) and SC 3.3.4.
- **The worked example is executed by tests:** `tests/constraints-example.test.ts`, 8 tests, covering month-end clamping, leap years, impossible dates, year boundaries and four time zones.
- **The table of contents verifies the core teaching:** chapter 4 has "Four Kinds of Constraints: Physical, Cultural, Semantic, and Logical", "Forcing Functions: Interlocks, Lock-ins, Lock-outs" and "Conventions Are Cultural Constraints". The three-kind list of forcing functions is therefore correct; the preface's "two kinds" describes the 2013 elaboration of lock-in and lock-out.
- **The plate** (4 markers) is inside the viewBox at all six viewports. Visual is "basic" under the universal rule, and the concept target (a plate) is met.

**Did not meet the standard**

| # | Finding | Evidence | Severity | Action |
|---|---|---|---|---|
| C-1 | The definition and origin said the 2013 edition places constraints "among the fundamental principles of interaction, alongside affordances, signifiers, mappings, feedback and the conceptual model". Norman's table of contents contradicts this: constraints have their own chapter (4), not a place in chapter 1's list. Other Norman characterisations rested on the bibliographic record alone, for example "introduced with physical objects", the microwave interlock example as Norman's, and "his later books propose". | `constraints.ts`: `definition`, `intermediate.explanation[0–2]`, `advanced.evidence[0]`, `origin.narrative`, `practice.dos[2]`, exercise solution | major | **Corrected:** content claims are cited to `norman-dote-2013-contents` (four kinds, forcing functions, conventions as cultural constraints, knowledge in the world); the unsupported placement removed; Norman's examples restated in the entry's own words; access limit stated in evidence and references. |
| C-2 | An argument from Norman (1999) was attributed — designers conflating real affordances, perceived affordances, conventions and constraints, and what designers manipulate on screens. The record has only an abstract, which is an introductory anecdote, and no notes. An accessible full text could not be obtained: Norman's site returns 404, one course mirror fails TLS verification, and the other link returns HTML, not the PDF. | `advanced.explanation[1]`, `debates[1]`, `misconceptions[2]`; `norman-1999` in `content/sources/cognition-hci.ts` | moderate | **Corrected:** Norman 1999 is cited only for what the abstract supports (written in response to loose use of "affordance"); the conventions point is cited to the 2013 table of contents; notes added to the record. |
| C-3 | Plate key 2 said "the primary action comes last" as a general convention. The order of the primary action is platform-dependent, as the entry itself says. | `constraintsPlate.key[1]` | minor | **Corrected:** "buttons sit in the order the platform uses — here the primary action last". |
| C-4 | The relations to `jakobs-law` and `user-control-and-freedom` have no link back. | `relations` | minor | Backlog; optional. |

### 3.3 `direct-manipulation` — principle, established theory — complete / complete / complete / developing / complete

**Meets the standard**
- **Sources read first-hand:**
  - Shneiderman (1983), from a scan on the author's site: four principles, the problems he lists, and his call for empirical tests;
  - Hutchins, Hollan & Norman (1985): distance and engagement, the problems they list, and "not a panacea";
  - WCAG 2.2 text for SC 2.5.7, 2.1.1, 2.5.1 and 2.5.8;
  - the Understanding document for SC 2.5.7.
- **Sources with partial access are cited within that access:** Frohlich (1993) for its abstract only; Shneiderman & Maes (1997) for its publication record only, as a record that the debate took place.
- **Limits are taught, not hidden:** repetition, generality, precision, and directness not equalling ease of use.
- **The worked example is executed** by `tests/direct-manipulation-example.test.ts` (6 tests).
- **Visuals:**
  - the plate (4 markers) is inside the viewBox at all six viewports;
  - the Level-2 figure (distance × engagement) is an original layout, has a text version, and keeps the boundary with the gulfs entry.

**Did not meet the standard**

| # | Finding | Evidence | Severity | Action |
|---|---|---|---|---|
| DM-1 | Hutchins, Hollan & Norman (1985) was read from a course-reading copy of the published article. The record says so, and 13 inline claims plus the Level-2 figure rely on it. | `hutchins-hollan-norman-1985` notes; the entry's references | minor | Backlog: confirm against a publisher or library copy if the owner wants a second check. The decision rests with the project owner (raised in the Direct Manipulation report). |

No correction was needed in this review.

### 3.4 `interaction-states` — concept, official standard — complete / complete / complete / developing / complete

**Meets the standard**
- **Normative claims come from W3C text read first-hand:**
  - WCAG 2.2: the definition of state and SC 1.4.1, 1.4.11, 1.4.13, 2.4.7, 2.4.11, 2.4.13 (AAA), 2.5.2 and 4.1.2;
  - WAI-ARIA 1.2;
  - Selectors Level 3 (a Recommendation);
  - the HTML standard.
- **Selectors Level 4 is cited only as a Working Draft.**
- **The boundary with Component State Management is explicit,** and the corrections from the independent review (`2602105`) are present:
  - the classification is not a strict rule by source;
  - disabled versus read-only, taken from the HTML standard;
  - ARIA described as exposing state, not implementing it;
  - focus-visible described as browser heuristics;
  - WCAG exceptions and levels;
  - the combinations section.
- **Visuals:**
  - the plate (8 markers) is inside the viewBox at all six viewports;
  - the Level-2 state diagram called for by D-129 is present, keyboard-readable and has a text version.

**Did not meet the standard**

| # | Finding | Evidence | Severity | Action |
|---|---|---|---|---|
| IS-1 | Evidence class `official-standard` is a judgement call. The definitions and requirements are normative W3C text, but the visual conventions come from design-system guidance. The evidence note says so. | `evidence`, `evidenceNote` | minor | Backlog: confirm the class with the project owner, as raised at publication. |
| IS-2 | The relation to `colour-contrast-ratio` (`measured-by`) has no link back. | `relations` | minor | Backlog; optional. |

### 3.5 `discoverability` — principle, professional guideline — complete / complete / complete / basic / complete

**Meets the standard**
- **Discovery is taught as a chain** — notice, recognise, predict, decide — with boundaries against signifiers, findability, visibility of system status and learnability.
- **The NN/g study is reported with its scope:**
  - 179 participants, six sites, desktop and phone;
  - visible-only navigation was not tested on phones;
  - time-to-navigation was only marginally significant;
  - the authors' own caution about reading clicks.
- **Recommendations are labelled as recommendations,** not findings.
- **The corrections from `36290b2` are in place:**
  - no wording or ranking is attributed to Norman's book; the chapter title is verified from his site;
  - Grossman is cited for its abstract only;
  - one unsupported claim was removed.
- **The plate** (4 markers) is inside the viewBox at all six viewports. Visual is "basic" under the universal rule, and the principle target (a plate) is met. No Level-2 figure was added, by decision.

**Did not meet the standard**

| # | Finding | Evidence | Severity | Action |
|---|---|---|---|---|
| D-1 | Discoverability is not a step in any learning path. | `content/learning-paths.ts` | minor | Backlog. Path changes are outside this review and D-129 reserves them to the plan; the decision rests with the project owner. |
| D-2 | The relation to `cognitive-walkthrough` (`measured-by`) has no link back. | `relations` | minor | Backlog; optional. |
| D-3 | The specific evidence comes from one practitioner-reported study of website navigation. | `evidenceNote`, `limitations` | — | Not a defect: the limitation is stated, as D-129 § 9.2 requires. |

## 4. Batch-level audit

**Registration and taxonomy**
- All five entries have `status: "published"` and pass every quality-gate flag and completeness gate (tests/content.test.ts). Each has one plate registered in `components/illustrations/visual-register.ts`.
- Classification matches the frozen taxonomy (`content/taxonomy.ts`, Interaction Design):
  - `feedback-principle` and `constraints`: concept, in "Interaction principles";
  - `direct-manipulation` and `discoverability`: principle, in "Interaction principles";
  - `interaction-states`: concept, in "Interaction patterns, state & forms".
- `npm run test:taxonomy` passes. The research ledger is empty.

**Relationships**
- Every relation from the five entries was checked for direction and meaning.
- The Interaction Design overview's 12 reversed `applied-in` relations were corrected in `36290b2`. They are now `related-to`, and the 10 published principles carry `applied-in → interaction-design-discipline`. The rendered pages show this the right way round (the Discoverability page review checks it).
- Planned targets stay planned: `findability`, `information-scent`, `learnability`, `navigation-patterns`, `focus-management`, `state-transitions`, `conceptual-models`.
- Five one-way relations remain (FP-6, C-4, IS-2, D-2). All are minor and allowed by the content model.

**Sources and citations**
- In all five entries, every cited source is in the references and every reference is cited (0 mismatches).
- Every non-book source is machine-verified by DOI or URL. `norman-1988` and `norman-2013` are books with no DOI or URL. They are now labelled bibliographic-only wherever they are cited, and claims about their content are limited to the author's table of contents.
- The `w3c-wcag-22` record still carries an author note "Status should be re-checked against the W3C page". The machine check is `url-reachable`. This is minor registry hygiene; backlog.

**Plates, keys and register**
- Each plate's key matches its drawing and description: 7, 4, 4, 8 and 4 markers.
- All 27 markers are inside the 400 × 300 viewBox. Measured on the build at 1440, 768 and 390 px, light and dark.
- The site-wide marker issue does **not** affect Batch 1. On the build of `fd86db0` it is still 152 markers in 78 plates (docs/VISUAL_QA.md), none of them in Batch 1.

**Practice consistency**
- After FP-3, the quizzes, flashcards and exercises agree with the teaching text.
- **Cross-entry consistency:**
  - `aria-busy`: FP-3 resolved the contradiction.
  - Touch and hover: FP-4 aligned the wording.
  - `disabled` versus `aria-disabled`: Constraints and Interaction States now say the same thing.
  - Norman attribution: all three Norman-citing entries now use the same standard.

**Coverage and balance (generated reports at `e3ae1d2` versus `fd86db0`)**

| Measure | Before Batch 1 | After |
|---|---|---|
| Published | 88 of 561 (15.7 %) | 93 of 561 (16.6 %) |
| Interaction Design | 5 | 10 |
| Other domains' published counts | — | unchanged |
| Interaction Design path | — | 87 % |
| Design Systems path | — | 100 % (Interaction States was its last step) |

- **No artificial coverage.** The five new entries are all in Interaction Design, the batch's H slot.
- **One apparent change elsewhere is not a Batch 1 effect.** UX Research's visual rating moved from 0/5 to 1/5 complete because Heuristic Evaluation's lab, which already existed at the baseline, appeared in the first regeneration (`3177819`). The baseline report had been generated before that link existed. This is a minor process note: generated reports must be regenerated after every content change, which docs:generate now does in each commit.
- **D-129 cycle rules.** One batch per domain per cycle holds. The cycle-level checks — no domain over 40 % of the cycle, at least three domains touched — can only be judged after Batches 2 (R, UX Research) and 3 (G, UX Writing). They are not breached by Batch 1 alone.
- **§ 9.3 quality checks.** No gate regressed. 100 % of the new entries meet their type targets. No Evidence-developing entry was added (all five are Evidence complete).

## 5. Technical QA

**Run in this review on `fd86db0`**, with the production build started cleanly as one server process:

| Check | Result |
|---|---|
| `npx tsc --noEmit` | exit 0, 0 errors |
| `npm run check` (index → typecheck → tests → lint) | exit 0; 22 test files, 568/568 tests |
| `npm run test:taxonomy` | exit 0; "All taxonomy, link and depth checks pass" |
| `npm run sources:verify -- myers-1985 norman-1999 norman-dote-2013-contents norman-2013 norman-1988` | `myers-1985`, `norman-1999` DOI-verified; `norman-dote-2013-contents` URL-reachable; the two Norman books have no DOI or URL, so there is nothing to verify |
| `npm run docs:generate` | exit 0; regenerating on `fd86db0` leaves the tree unchanged |
| `npm run build` | exit 0; 986/986 pages |
| tests/browser/e2e.cjs | 44/44 |
| tests/browser/e2e-redesign.cjs | 66/66 |
| tests/browser/atlas.cjs | 36/36 |
| tests/browser/keyboard.cjs | 45/45 |
| tests/browser/devices.cjs | 155/155 |
| tests/browser/colour-studio.cjs | 46/46 |
| tests/browser/a11y.cjs (axe) | 0 violations |
| tests/browser/crawl.cjs | 0 pages with problems |
| Batch 1 five-entry review (scratchpad script) | 40/40 |
| Constraints / Direct Manipulation / Interaction States / Discoverability page reviews | 15/15 · 22/22 · 32/32 · 33/33 |
| Marker audit, all hero plates (571 pages) | 484 markers measured; 152 outside the viewBox in 78 plates; 0 in Batch 1 |
| Feedback plate panel 6 fit | text right edge 253 ≤ card edge 256 |

The five-entry review covers each Batch 1 page at 1440, 768 and 390 px, light and dark:
- 0 axe violations (WCAG 2.0–2.2 A/AA plus best practice), no horizontal overflow, no console errors;
- plate text ≥ 10 px, with no text and no markers outside the viewBox;
- all internal links resolve (16, 14, 16, 17 and 21) and no raw markup leaks;
- flashcards can be added by keyboard (4, 4, 4, 6 and 5).

The four page reviews check each entry's content assertions, keyboard use of the quiz and exercise, and its reciprocal links. The marker audit counts markers whose circle plus stroke extends past the 400 × 300 viewBox.

Visual inspection by screenshot, in this review: the Feedback plate at 1440 light and 390 dark, after the fix, and the Constraints plate at 390 light. The other three plates were inspected after their last changes in their own sessions (`2602105`, `bd5e6ff`); their geometry has not changed since.

**From earlier commits, not re-run here:** the original first-hand readings of WCAG, WAI-ARIA, HTML, Selectors, NN/g, Shneiderman and Hutchins, Hollan & Norman, as recorded in the source notes with their dates.

**Could not be performed:**
- screen-reader testing, as no assistive technology is available in this environment;
- physical-device testing, where emulation was used instead;
- reading Norman's books, Norman 1999, Grossman et al. and Myers in full, since no accessible authorised copy was found.

## 6. Unresolved issues

| Issue | Severity | Impact | Recommended action |
|---|---|---|---|
| 152 markers in 78 plates outside the viewBox (site-wide, none in Batch 1) | moderate | Marker circles are cut by about 3–6 CSS px at the edge of 78 plates; the numbers stay legible | Separate illustration-quality task: fix one plate at a time with a visual check at 390 and 1440 px (docs/VISUAL_QA.md). Proposed scope: all 78 plates. Needs owner approval before it starts. |
| Norman's books, Norman 1999, Grossman et al. and Myers not read in full | minor | Claims are limited to what was verified (table of contents, abstracts); some depth of attribution is lost | Read an authorised copy if one becomes available, then widen the attributions. |
| Discoverability not in a learning path | minor | Learners following paths will not meet the entry | Owner decision at plan level. |
| Evidence class of `interaction-states` | minor | Class is a judgement call; targets are met under either reasonable class | Owner confirmation. |
| Hutchins, Hollan & Norman read from a course copy | minor | Claims are as read; the copy's fidelity to the published version is assumed | Optional re-check against a library or publisher copy. |
| One-way relations (FP-6, C-4, IS-2, D-2) | minor | None; allowed by the content model | Optional. |
| `w3c-wcag-22` author note "status should be re-checked" | minor | None for these entries | Update the record when convenient. |
| No screen-reader or physical-device testing | — | Accessibility evidence rests on axe, keyboard and accessibility-tree checks | Test when available. |

## 7. Decision

**PASS WITH MINOR FOLLOW-UPS.**

| Severity | Found | Corrected in this review | Open |
|---|---:|---:|---:|
| Critical | 0 | 0 | 0 |
| Major | 2 (FP-1, C-1) | 2 | 0 |
| Moderate | 3 (FP-2, FP-3, C-2) | 3 | 0 |
| Minor | 11 | 3 (FP-4, FP-5, C-3) | 8 |

The 8 open minor items are:
- **Entry findings:** FP-6, C-4, DM-1, IS-1, IS-2, D-1, D-2.
- **Batch-level:** the `w3c-wcag-22` record note.

Also open, but outside the counts above because neither is a defect of a Batch 1 entry:
- the site-wide marker issue (moderate), which does not affect any Batch 1 plate;
- the stale baseline coverage report (minor process note), already resolved by regeneration.

## 8. Readiness for Batch 2

No Batch 1 finding blocks Batch 2: every critical, major and moderate finding in the five entries is corrected and verified on `fd86db0`. Batch 2 (`think-aloud-protocol`, `tree-testing`, `contextual-inquiry`, `in-depth-interviews`) is **ready to begin once the project owner approves it**. This review does not authorise it.

## 9. Corrections made, and open actions

Corrections, before and after (all in `fd86db0`):
- **FP-1, C-1.** Before: Norman characterisations cited to bibliographic records, including two that the author's table of contents contradicts. After: content claims cited to `norman-dote-2013-contents`, the contradicted placements removed, everything else in the entries' own words with the access limit stated.
- **FP-2.** Before: Myers described as "strongly", "small study", "during long operations". After: a formal experiment showing a preference for progress indicators, with the second part not significant; abstract only.
- **C-2.** Before: Norman 1999's argument attributed. After: cited only for the abstract's context.
- **FP-3.** Before: `aria-busy` on the button, and no guard against a second press. After: no `aria-busy`, a guard in the handler, and a caption that says so.
- **FP-4.** Before: "Touch has no hover". After: "Touch gives no reliable hover".
- **FP-5.** Before: text edge x = 257 against a card edge of 256. After: 253.
- **C-3.** Before: "the primary action comes last". After: "buttons sit in the order the platform uses — here the primary action last".
- **Source records:** notes added to `myers-1985` and `norman-1999`.

Open actions have no assigned owners. Decisions on learning paths, the evidence class of `interaction-states`, and starting the marker-fix task rest with the project owner. The remaining items are unassigned backlog.
