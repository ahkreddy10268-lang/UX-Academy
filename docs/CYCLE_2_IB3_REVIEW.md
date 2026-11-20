# Cycle 2 — IB3 review (detailed diagrams, methods)

Scope: `docs/CYCLE_2_IMPROVEMENT_PLAN.md` § 3, batch IB3. Implementation commit `8863945` (baseline `6c6fefb`). One targeted review: each figure statement was re-checked against its entry's text and cited sources, the rendering was measured, and the tests were re-run.

**Outcome: PASS WITH DOCUMENTED LIMITATIONS.** No critical, major or moderate findings.

## Acceptance against the plan

| Entry | Figure | Strategy and canvas | Result |
|---|---|---|---|
| `usability-testing` | Test cycle, 7 steps, with what is measured and how sessions run | process · viz | **Met.** Every step restates the entry's implementation list and test-plan text; sources `sauro-lewis-2016`, `nielsen-landauer-1993`. |
| `cognitive-walkthrough` | The four questions, which gulf each probes, the design concept each points to, in/out | conceptual (relationship) · sheet | **Met.** Question wording, gulf split (1–3 execution, 4 evaluation) and concept links come from the entry; question 1 has no concept in the entry and the figure says so. Sources `wharton-et-al-1994`, `spencer-2000`. |
| `card-sorting` | Open, closed, hybrid: use, what happens, analysis | comparison · sheet | **Met.** A first draft gave the hybrid sort an analysis the entry does not state; it was corrected before commit to "the entry does not describe a separate analysis". Source `spencer-2009`. |
| `ab-testing` | Five steps of a trustworthy test | process · viz | **Met.** Checks restate the entry (pre-registration, A/A, sample ratio, no peeking, two-proportion z-test, interval and lift, multiple comparisons, p-value meaning). Sources `kohavi-tang-xu-2020`, `fabijan-et-al-2019`, `greenland-et-al-2016`. |
| `keystroke-level-model` | One worked method, operators, Rule 0, operator times | formula · sheet | **Met.** Times, totals (3.00 s and 5.70 s) and the text version come from `lib/formulas` (`KLM_OPERATORS`, `parseKlm`, `klmTotal`), none typed; the example is labelled an illustration. Sources `card-moran-newell-1980`, `kieras-2001-klm`. |

D-129 visual target: **92 → 97 of 102**. Each figure has an objective, takeaway, ordered text version, verification kind (`content-checked`) and sources that are in the entry's own references (`tests/visuals.test.ts`). The figures are HTML/CSS text, like the existing Level-2 figures, so they do not use the plate canvases.

## Findings

| ID | Severity | Finding | Handling |
|---|---|---|---|
| IB3-F1 | minor | The "Read this diagram as text" list numbers items automatically and many items begin with their own number ("2. 1. The method"). The existing figures do the same. | Logged; a shared presentation matter for all Level-2 figures. |
| IB3-F2 | limitation | The figures are text-and-box layouts, not drawn diagrams; the plate-marker failures on `ab-testing`, `card-sorting` and `cognitive-walkthrough` (hero plates, already in `docs/VISUAL_QA.md`) are unchanged. | Documented. |
| IB3-F3 | tooling | A stale `next-server` process kept port 3100 so a new server could not start, and a first browser pass read a mixed build and reported three figures missing. Found by comparing the built HTML with the served page; fixed by stopping every `next-server` process (`pkill -f "next start"` does not match it). All results below are from a clean server. | Fixed; noted in the ledger. |

## Verification (see the QA ledger)

`npm run check` 586/586 (lint clean after an apostrophe fix); `test:taxonomy` pass; `docs:generate` (visual 97/102); `build` 995/995 on the rerun after the same CLI notice (not acted on). Figures measured in the browser at 390 and 1440 px, light and dark: minimum rendered text 12 px, no figure or page overflow, 20/20. Entry review on the five pages with axe-core 4.14.0: axe 0 and overflow 0 everywhere; `usability-testing` and `keystroke-level-model` pass fully; the others fail only on plate markers already in the backlog. Integrity script: no new problems. Inherited, not rerun: e2e, e2e-redesign, atlas, keyboard, devices, colour-studio, crawl (a new component and registry entries, no shared layout or route change). Not tested: screen readers, physical devices, independent expert review.
