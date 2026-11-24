# Domain 1 — UX & UI Fundamentals: educational quality audit

**Audit base:** `main` at `9a51aa6e3ba2520ffc0f3e73f2e84479dbc5f38e` (2026-11-20)
**Audit branch:** `codex/domain-1-educational-quality`
**Scope:** Domain 1 only. No entry content, taxonomy, UI, routes or production deployment changed by this audit record.

## Executive finding

Domain 1 is already complete as a topic inventory and has a substantial three-level teaching structure. A blanket rewrite or word-count expansion is not justified. A focused improvement batch has been consolidated on this branch: HCI citation placement and source provenance, a clearer human-centred-design explanation and assessment in UCD, explicit labels on illustrative scenarios, seven additional cross-entry relations, and 13 glossary terms (including two aligned definition edits).

The generated `docs/CONTENT_COVERAGE.md` on the audit base reports:

- 21/21 taxonomy topics accounted for.
- 16 published entries, 5 topics addressed within their host entries, and 0 planned.
- Explanation: 16/16 complete.
- Practice: 16/16 complete.
- Editorial: 16/16 complete.
- D-129 visual target: 16/16 meet target.
- D-129 evidence target: 16/16 meet target.

The report distinguishes the old universal Visual maturity rating from the approved D-129 type-specific visual target. Do not add diagrams or interactive tools to every topic to chase the old score.

## Three-level content review

The renderer in `app/library/[slug]/page.tsx` and `components/entry/level-tabs.tsx` is the presentation contract. Preserve its visible labels and meanings:

| Visible label | Stored field | Learning purpose | Required educational progression |
|---|---|---|---|
| Beginner — Understand | `levels.beginner` | Understand | Plain explanation, analogy or everyday examples, key vocabulary |
| Practitioner — Apply | `levels.intermediate` | Apply | Mechanism, implementation guidance and realistic scenarios |
| Systems Architect — Analyse & evaluate | `levels.advanced` | Analyse & evaluate | Expert explanation, evidence and limits, debates or competing models |

The schema's structural checks require at least two beginner explanation paragraphs, an analogy or two everyday examples, three vocabulary terms, intermediate mechanism, two implementation points and a scenario, and advanced evidence, critique/alternatives and two expert explanation paragraphs. These are minimums, not targets for padding. Generated coverage reports all 16 published entries complete for Explanation.

## Entry-by-entry audit

This is a structured content and progression review, not a claim that every cited paper was independently re-read in this session. Source-access limits already disclosed in entry notes and `docs/OPEN_ISSUES.md` remain in force.

| Entry | Beginner teaching | Practitioner progression | Advanced teaching | Audit disposition |
|---|---|---|---|---|
| `user-experience` | Explains experience beyond the screen, its subjectivity, and pragmatic/hedonic vocabulary with everyday examples. | Separates task-related and hedonic qualities; explains before/during/after use and how to study them. | Treats UX as a situated construct; covers scope and measurement debates and the limits of ratings. | Preserve. The glossary definition has been aligned; previously unlabelled scenarios are now explicitly marked illustrative. Maintain the distinction between the experience and the work of designing its conditions. |
| `ui-design` | Defines the interface as the perceivable/actionable surface, with physical and digital examples. | Connects information priority, structure, controls, states, feedback, consistency, adaptation and evaluation. | Places UI design in its historical and interdisciplinary context and distinguishes evidence-backed findings from guidance. | Preserve. It is a useful depth reference for other discipline entries. |
| `product-design` | Distinguishes physical-product and digital-product usage of the term and introduces cross-functional roles. | Explains product scope, role boundaries and the relationship to UX, UI and interaction design. | Explicitly treats role definitions as organisationally variable and weighs alternative role models. | Preserve. Future improvements should add only source-supported systems-level trade-offs, not assume one universal job description. |
| `interaction-design-discipline` | Explains interaction as an action–response loop and connects it to goals and behaviour. | Covers tasks, states, transitions, feedback, recovery, platform and implementation decisions. | Distinguishes the design discipline from HCI research and evaluates cognitive, situated and embodied traditions. | Preserve. Strong connection between conceptual models and practical interface behaviour. |
| `experience-design` | Introduces experience as meaningful and memorable, beyond momentary screen interaction. | Explains needs, emotions, meaning and intended experience as design inputs. | Discusses experience as story, the HCI context and limits of the evidence base. | Preserve. Keep abstract-only evidence explicitly labelled and do not conflate experience design with UX as a whole. |
| `usability` | Explains effectiveness, efficiency, satisfaction and context of use. | Makes goals measurable and distinguishes task outcomes, time/effort and satisfaction. | Covers standards, measurement limitations, construct boundaries and competing models. | Preserve. Two previously unlabelled scenarios are now explicitly marked illustrative; keep utility/usefulness boundaries aligned with their separate host entry. |
| `usefulness` | Explains whether the functions provided match what people need. | Distinguishes utility from usability and shows how to test the gap. | Explains the two research traditions and technology-acceptance evidence, including abstract-only limits. | Preserve. The covered-within Utility decision is supported by the host explanation. |
| `desirability` | Explains whether a solution matters to people, beyond whether it can be built. | Applies desirability as one lens alongside feasibility and viability. | Examines preferences, needs and the limits of inferring desirability from stated preference. | Preserve. Keep the distinction from usability and usefulness explicit. |
| `design-thinking` | Explains divergent/convergent work, alternative phase models and the three lenses. | Shows how teams move between learning, framing, ideas, prototypes and tests. | Covers critiques, evidence limits and differences between models and practice. | Preserve. The covered-within Feasibility and Viability decisions are supported by the host explanation; a typed relation now links this entry to Design Processes. |
| `user-centred-design` | Explains the user-centred approach and the reason to study people and context. | Connects the principles to the ISO process and practical research, requirements, design and evaluation. | Discusses participation, stated preferences, activity-centred alternatives and the human-centred terminology distinction. | **Improved:** explains ISO's human-centred design process alongside IDEO's different use of the term, updates a learning objective, adds an intermediate quiz item and refines a flashcard. The covered-within decision remains supported. |
| `ux-lifecycle` | Introduces the phases of a service/product lifecycle and why learning continues after launch. | Explains phase-specific UX questions, decision gates and research through live operation. | Covers governance, agile integration and alternatives to phase-based models. | Preserve. Keep distinct from the generic design-process entry. |
| `design-processes` | Defines a design process and explains why teams make their work explicit. | Compares common process models and selects a lightweight or heavier process to fit risk. | Distinguishes descriptive from prescriptive models and discusses situated practice. | Preserve. Keep distinct from the product/service lifecycle. |
| `ux-maturity` | Explains organisational maturity rather than individual designer skill. | Applies the model across strategy, culture, process and outcomes. | Explicitly states that the model is a diagnostic practitioner framework, not a validated measurement scale. | Preserve. Keep the limitation prominent; do not imply independent validation. |
| `human-computer-interaction` | Explains HCI as an interdisciplinary field with everyday interactive examples. | Connects methods, human factors, research and technology to design and evaluation. | Covers research paradigms, history, scope and different theoretical traditions. | **Corrected:** the context-of-use vocabulary definition now states the 2018 components without embedding a citation token in the plain-text vocabulary renderer. The ISO citation is in Practitioner explanatory prose, alongside the usability and context-of-use definitions. The old `equipment` wording was too narrow. The paid standard was not accessed; see the corrected source note. Both HCI relations to Interaction Design and Evolution of Digital Experiences are present again, and both illustrative scenarios are explicitly labelled. |
| `history-of-interface-design` | Gives learners a clear account of interface styles and their development. | Connects research-lab contributions to products and the spread of graphical interfaces. | Challenges single-inventor stories and warns that generational schemes simplify overlapping developments. | Preserve. Continue labelling contested or simplified historical narratives. |
| `evolution-of-digital-experiences` | Introduces the move from specialist/work use to everyday, chosen and experiential use. | Compares the research foci and changing contexts of use. | Distinguishes historical interpretations from periods and discusses waves versus coexistence. | Preserve. Keep separate from the interface-technology chronology. |

## Coverage decisions: retain all five

Do not create duplicate entries or reverse these decisions to increase the published count:

- Utility → `usefulness`
- Feasibility → `design-thinking`
- Viability → `design-thinking`
- Human-Centred Design → `user-centred-design`
- History of HCI → `human-computer-interaction`

Their rationale is recorded in `docs/CONTENT_AUDIT.md`, session 62. Revisit only if a genuine educational gap is found in the host entry.

## Confirmed follow-ups

| Issue | Recommended handling |
|---|---|
| D1-2 | **Resolved in this branch** (commit `ff62feaf`): the entry now cites the existing ISO source and uses the 2018 context-of-use components. Full paid standard text was not read. |
| D1-4 | Retain the documented abstract-only and bibliographic-only source limitations. No mirror searching or paywall bypass. |
| D1-5 | Retain the note that Chapman & Plewes is bibliographic-only unless a legitimate, readable copy or evaluation study is found. Do not claim the NN/g model is independently validated. |
| D1-6 | Do not add the NN/g quiz until its source can be verified. |

## Standards for any future correction

1. Preserve the existing page template, theme, typography, illustrations and level-tab behaviour.
2. Keep the same three visible level labels and stored field mapping.
3. Make the levels cumulative: Understand → Apply → Analyse & evaluate. Do not duplicate the same explanation across tabs.
4. Apply `docs/CONTENT_MODEL.md`, `docs/EDITORIAL_STYLE_GUIDE.md`, D-129 and D-131. No arbitrary word counts.
5. Cite every substantive factual, empirical, statistical and theoretical claim. Distinguish research findings, professional guidance, academy interpretation and illustrative scenarios.
6. Make only targeted corrections. Do not reopen entries for cosmetic preference or add visuals that do not teach anything prose cannot.
7. For any content-file edit, run the required change-impact checks in `.claude/skills/ux-academy-workflow/SKILL.md`, including `npm run check`, `npm run test:taxonomy`, source verification for new IDs, `npm run docs:generate`, entry integrity, `npm run build` and required per-entry browser review. Record actual outcomes in the QA ledger.
8. Do not push to `main`, merge, publish or deploy without the owner's explicit approval.

## Audit status and limitations

- **Repository source read:** `main` at `9a51aa6e3ba2520ffc0f3e73f2e84479dbc5f38e`.
- **Coverage evidence:** generated `docs/CONTENT_COVERAGE.md` dated 2026-11-23; 127 glossary terms and the current aggregate counts are recorded.
- **Content edits:** HCI context-of-use wording and citation placement; UCD teaching and assessment improvement; illustrative-scenario labels in HCI, Usability, UX and UCD; seven typed relations; 13 glossary terms and two aligned definitions; ISO source-access notes clarified. Existing lesson-page design and illustrations remain unchanged. Learning-path pages/components were updated only to distinguish addressed-within concepts from planned topics; no new page family, route or path data was introduced.
- **Code/content tests:** the local QA handoff reports the HCI entry-integrity script passed, but it did not detect the source token in a vocabulary field because it treats tokens anywhere in an entry as citations. The token was visible in the rendered page and has since been moved into Practitioner prose.
- **Post-correction targeted browser review (reported by Claude Desktop):** four entries reviewed at 1440, 768 and 390 px in light and dark themes. Reported zero accessibility violations, horizontal overflow or console errors; no raw `{{src:...}}` or `[[...]]` tokens in visible page text; all internal links resolved; figure text ≥10.2 px at phone width; keyboard flashcards work. A first raw-token scan falsely flagged hydration-script strings; a corrected scan checked rendered visible text with collapsible sections opened and found zero token leaks on all four pages. The HCI review preceded the final restoration of its two relations and second scenario label, so rerun HCI entry review after those final content edits. The helper now sets a non-zero process exit code for any FAIL; deliberate failure injection has not been tested.
- **Generated docs:** the local handoff reports `docs:generate` changed generated date metadata and substantive coverage counts. `docs/CONTENT_COVERAGE.md` now records the genuine updated aggregate counts, including 127 glossary terms; its other generated count fields were taken from the generated output. The source branch test previously failed because `tests/browser/e2e-redesign.cjs` expected 114 glossary terms; the assertion is now updated to 127. A separate run on `claude/batch1-constraints` reports `e2e-redesign` PASS 66/66 after this adjustment; this is branch-origin evidence, not a final consolidated-branch run.
- **Learning-path status display:** the D1-7 implementation is now integrated in this branch. Its exact implementation was tested on `claude/batch1-constraints`: `npm run check` PASS (612 tests), `npm run test:taxonomy` PASS, `npm run build` PASS, `e2e` PASS 44/44, `e2e-redesign` PASS 66/66 after glossary expectation 127, keyboard PASS 45/45, devices PASS 155/155. These results are recorded as source-branch evidence only and must not be represented as tests run on the final combined branch. The visual path-page check was recorded as 22/24; the two axe `landmark-unique` failures were also present on production and are logged as pre-existing A11Y-1.
- **Not run on the final combined branch:** `npm run check`, `npm run test:taxonomy`, `npm run build`, full site-wide `e2e`/redesign, keyboard, devices, atlas, and a final HCI browser review after restoring both relations and the scenario label. `sources:verify` was skipped because no new source IDs were added; plate renders were skipped because no illustration changed. Screen-reader, physical-device and expert testing were not performed.
- **Research/source limitation:** the official ISO catalogue and its public abstract were consulted; the full paid ISO 9241-11 text was not accessed. The official ISO OBP entry for ISO 9241-115:2024 reproduces the relevant definitions and explicitly attributes them to ISO 9241-11:2018, clauses 3.1.15 and 3.1.1.
- **Independent expert review, full re-reading of every primary source, screen-reader testing and physical-device testing:** not performed.
- **Additional scope included after the initial audit:** D1-7 addressed-within status display is now fixed in the learning-path renderer; the glossary count assertion is 127; `DESIGN_REFERENCE_LIBRARY.md` is included as a future-use reading list, not a build plan; HCI's two typed relations and two scenario labels are restored; Design Thinking links to Design Processes. D1-8 learning-path content recommendations remain open for owner decision and no path data was changed.
- **Recommended next action:** run `npm run check`, `npm run test:taxonomy`, `npm run build`, full browser checks affected by the learning-path route/components and the final HCI entry review; then inspect the complete PR diff. Do not merge until final-branch verification passes.
