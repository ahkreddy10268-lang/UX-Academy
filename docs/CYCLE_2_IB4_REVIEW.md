# Cycle 2 — IB4 review (detailed diagrams, frameworks, models and theory)

Scope: `docs/CYCLE_2_IMPROVEMENT_PLAN.md` § 3, batch IB4. Implementation commit `4f844f5` (baseline `c31dc36`). One targeted review: each figure statement was re-checked against its entry's text and cited sources, the rendering was measured on a clean server, and the tests were re-run.

**Outcome: PASS WITH DOCUMENTED LIMITATIONS.** No critical, major or moderate findings.

## Acceptance against the plan

| Entry | Figure | Strategy and canvas | Result |
|---|---|---|---|
| `atomic-design` | Five levels, with the search-form-to-page chain | hierarchy · sheet | **Met.** Level definitions, the not-linear point, the interface inventory and the optional names come from the entry. Two example lines in the first draft (template and page) went beyond the entry and were corrected to the entry's wording before commit. Source `frost-2016`. |
| `jobs-to-be-done` | A job, the job statement, the qualitative route (switch timeline, forces) and the outcome-driven route | process · viz | **Met.** Sources `christensen-et-al-2016`, `ulwick-2005`. |
| `gulfs-of-execution-and-evaluation` | Seven stages on the two sides, the design questions, what answers them, how a breakdown sounds | process · viz | **Met.** Sources `norman-1986`, `norman-2013`. |
| `working-memory-model` | Four parts, what each does, what shows it, and the same-part versus different-part logic | conceptual (relationship) · sheet | **Met.** Sources `baddeley-hitch-1974`, `baddeley-thomson-buchanan-1975`, `baddeley-2000`. |
| `heart-framework` | Five categories and the goal, signal, metric chain, with one independent application | conceptual (relationship) · sheet | **Met.** The goal-signal-metric example is labelled as the entry's own. The independent application (Open Targets) is stated as practitioner evidence, not validation, in line with the evidence gap. Sources `rodden-hutchinson-fu-2010`, `uxls-open-targets-heart`. |

D-129 visual target: **97 → 102 of 102**. All figures have an objective, takeaway, ordered text version, verification kind (`content-checked`) and sources that are in the entry's own references (`tests/visuals.test.ts`).

## Findings

| ID | Severity | Finding | Handling |
|---|---|---|---|
| IB4-F1 | limitation | The HEART figure cannot add evidence the entry lacks: it rests on one primary paper and one practitioner application, so the evidence-target gap (IB1-2) is unchanged. | Documented; the figure says so. |
| IB4-F2 | limitation | As in IB3, the figures are text-and-box layouts, and the five hero plates still fail the marker check (all five pages are in `docs/VISUAL_QA.md`). | Documented. |

## Verification (see the QA ledger)

`npm run check` 586/586; `test:taxonomy` pass; `docs:generate` (visual 102/102; evidence 101/102); `build` 995/995 on the rerun after the same CLI notice (not acted on). Figures measured in the browser at 390 and 1440 px, light and dark, on a clean server: 20/20, minimum rendered text 12 px or more, no figure or page overflow. Entry review with axe-core 4.14.0 on the five pages: axe 0 everywhere; the only failures are plate markers on pages already in the backlog. Integrity script: no new problems. Inherited, not rerun: e2e, e2e-redesign, atlas, keyboard, devices, colour-studio, crawl (new components and registry entries only). Not tested: screen readers, physical devices, independent expert review.
