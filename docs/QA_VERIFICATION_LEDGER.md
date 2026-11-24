# QA verification ledger

Every QA run that a report, review or commit relies on, with the exact command and the commit it ran against. Read this **before** re-running tests; reuse a result only under the change-impact rules below.

## Change-impact policy

1. Diff against the last verified SHA: `git diff --stat <sha>..HEAD` plus `git status --short`.
2. A result may be **INHERITED** only when it is recorded here for an earlier SHA **and** no file it depends on changed since. Name that SHA.
3. Shared dependencies invalidate everything downstream: a change to `app/**`, shared `components/**`, `lib/**`, `app/globals.css`, `package*.json` or `next.config.ts` requires every browser suite and the build again.
4. Content changes (`content/**`) require `npm run check`, `test:taxonomy`, `docs:generate`, `build`, and the per-entry checks for touched slugs; site-wide browser suites may be inherited if no component or route changed.
5. `docs/**`-only changes require nothing; say so.
6. Labels: **PASS** (run on this SHA) · **INHERITED** (from SHA x) · **NOT RUN** (reason) · **BLOCKED** (cause) · **FAIL**.
7. Never record a run that did not happen. Never skip a required gate (`npm run check` before every commit; `build` for any content or UI change).

The full matrix is in `.claude/skills/ux-academy-workflow/SKILL.md` § 4.

## How to run

```bash
npm run check                       # index → typecheck → tests → lint
npm run test:taxonomy
npm run docs:generate
npm run build                       # prerenders every page
npx next start -p 3100              # then, with BASE_URL=http://localhost:3100:
node tests/browser/e2e.cjs | e2e-redesign.cjs | atlas.cjs | keyboard.cjs | devices.cjs | colour-studio.cjs | crawl.cjs
AXE_PATH=/path/to/axe.min.js node tests/browser/a11y.cjs <paths…>
AXE_PATH=/path/to/axe.min.js node tests/browser/entry-review.cjs <slug…>   # per-entry: render, overflow 390/1440, plate markers, key, axe
npx tsx scripts/entry-integrity.ts <slug…>                                  # citations, taxonomy, relations, quiz, figures, register
npm run sources:verify -- <id…>
```

## Records

Newest first. "Tree" is the commit the run was made on. Dates are when the run happened.

### Explorer labels (TD-5) and the Claude Design brief (2026-11-18, parent `b4a656b`)

Changes: `components/illustrations/interactive/explorers.tsx`, `components/illustrations/primitives.tsx` (shared `Dim` label size), `docs/UX_ACADEMY_FOR_CLAUDE_DESIGN.md`, records.

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Check | `npm run check` | PASS — 23 files, 588 tests | Run | — |
| Build | `npm run build` | PASS — 995/995 first attempt | Run | — |
| Explorer text | scratchpad Playwright, three explorers × 390/1440 px | minimum 11.6 px at 390 (was 9.8); no clipped text | Run | — |
| Explorer extremes | scratchpad Playwright setting every combination of slider minimum and maximum (up to four sliders) | no clipped text on any explorer at either width | Run | Fitts start label first moved onto the approach line; fixed and re-checked with a screenshot |
| e2e / e2e-redesign / keyboard / devices | `node tests/browser/<suite>.cjs` | 44/44, 66/66, 45/45, 155/155 | Run | Emulation |
| a11y | `AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/a11y.cjs` on the three explorer pages and the Fitts lab | 0 violations | Run | axe only |
| Crawl | three explorer pages | 0 problems | Run | — |
| Plate sweep | all 583 `/library/*` and `/topics/*` pages at 390 px | 538 markers, 0 outside, 0 clipped text, no text under 10 px | Run | — |
| Atlas, colour-studio | — | INHERITED from `732077a` | Inherited | Neither uses the explorers or `Dim` |
| Screen reader, physical device, expert review | — | NOT RUN | — | Not available |

### Error-fix pass — `732077a` (2026-11-18, parent `955048a`)

Changes: `package.json`/`package-lock.json` (next and eslint-config-next 16.4.6; `npm audit fix`), marker primitives and `insidePlate`, three plate files, Level-2 figure text version, a new unit test, one browser-test expectation. **Shared dependencies changed, so nothing was inherited: every suite was rerun.**

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Audit | `npm audit` | 0 vulnerabilities (was 1 moderate in next, 7 moderate dev-only) | Run | — |
| Check | `npm run check` | PASS — 23 files, 588 tests | Run | — |
| Taxonomy | `npm run test:taxonomy` | PASS | Run | — |
| Build | `npm run build` | PASS — 995/995 **on the first attempt**; the Next.js security notice no longer appears | Run | — |
| Plate sweep | scratchpad Playwright sweep of all 583 `/library/*` and `/topics/*` pages at 390 px | 538 markers, 0 outside the viewBox, 0 clipped text, no visible text under 10 px | Run | Script not committed; method as in entry-review.cjs |
| e2e | `node tests/browser/e2e.cjs` | 44/44 | Run | — |
| e2e-redesign | `node tests/browser/e2e-redesign.cjs` | 66/66 after updating the stale expectation 18 → 28 (verified against the registry) | Run | The 65/66 before the update was the stale count, not a site fault |
| Atlas | `node tests/browser/atlas.cjs` | 36/36 | Run | — |
| Keyboard | `node tests/browser/keyboard.cjs` | 45/45 | Run | Not a screen-reader test |
| Devices | `node tests/browser/devices.cjs` | 155/155 | Run | Emulation |
| Colour Studio | `node tests/browser/colour-studio.cjs` | 46/46 | Run | — |
| Crawl | `node tests/browser/crawl.cjs` on 9 pages incl. the changed plates | 0 problems | Run | — |
| a11y | `AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/a11y.cjs` on 8 pages incl. the changed plates | 0 violations | Run | axe only |
| Screen reader, physical device, expert review | — | NOT RUN | — | Not available |

**Correction to earlier records:** IB3 and IB4 marked `e2e-redesign` as INHERITED; that was wrong, because its library-filter count depends on the figure registry those batches changed. The suite would have failed 65/66 on `8863945` and `4f844f5`.

### Cycle 2 IB4 — `4f844f5` (2026-11-17, parent `c31dc36`)

Changes: five new Level-2 figure components, their registry entries, generated coverage docs. No shared layout, route, taxonomy or dependency change.

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Check | `npm run check` | PASS — 22 files, 586 tests | Run | — |
| Taxonomy | `npm run test:taxonomy` | PASS | Run | — |
| Docs | `npm run docs:generate` | Visual target 97 → 102 of 102; evidence 101/102 | Run | — |
| Build | `npm run build` | PASS — 995/995 on the rerun (first attempt exited 1 after the same Next.js upgrade notice; not acted on) | Run | Upgrade advice not evaluated |
| Figure render | scratchpad Playwright script on a clean `next start` (after stopping all `next-server` processes), 5 figures × 390/1440 px × light/dark | 20/20: minimum rendered text 12 px or more, no figure or page overflow | Run | Emulated widths; script not committed |
| Entry review | `AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs <5 slugs>` (axe-core 4.14.0) | 10/40: axe 0 everywhere; every failure is plate markers on pages in the known backlog | Run | Emulated widths |
| Integrity | `npx tsx scripts/entry-integrity.ts <5 slugs>` | No new problems (two pre-existing further-reading references) | Run | — |
| e2e, e2e-redesign, atlas, keyboard, devices, colour-studio, crawl, a11y | — | INHERITED from `9931f1a` / `8c7408e` / `80f8058` | Inherited | No shared layout, route or taxonomy change |
| Vercel previews | `9d41b83`, `6c6fefb`, `c31dc36` | READY (2026-11-17); state only | Run | Pages not browsed |
| Screen reader, physical device, expert review | — | NOT RUN | — | Not available |

### Cycle 2 IB3 — `8863945` (2026-11-17, parent `6c6fefb`)

Changes: five new Level-2 figure components, their registry entries, generated coverage docs. No shared layout, route, taxonomy or dependency change.

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Check | `npm run check` | PASS — 22 files, 586 tests; lint clean (one apostrophe escaped) | Run | — |
| Taxonomy | `npm run test:taxonomy` | PASS | Run | — |
| Docs | `npm run docs:generate` | Visual target 92 → 97 of 102; evidence 101/102 | Run | — |
| Build | `npm run build` | PASS — 995/995 on the rerun (first attempt exited 1 after the same Next.js upgrade notice; not acted on) | Run | Upgrade advice not evaluated |
| Figure render | scratchpad Playwright script on a clean `next start`, 5 figures × 390/1440 px × light/dark | 20/20: minimum rendered text 12 px, no figure or page overflow; screenshots inspected for two figures | Run | Emulated widths; script not committed |
| Entry review | `AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs <5 slugs>` (axe-core 4.14.0) | 22/40: axe 0 and overflow 0 everywhere; failures are plate markers on `ab-testing`, `card-sorting`, `cognitive-walkthrough` (known backlog) | Run | Emulated widths |
| Integrity | `npx tsx scripts/entry-integrity.ts <5 slugs>` | No new problems | Run | — |
| Server hygiene | — | A stale `next-server` process held port 3100 and gave a mixed-build reading; stopped with `pkill -f next-server` and rerun clean | Run | Earlier IB2 browser results were taken after IB2's last build with no build in between |
| e2e, e2e-redesign, atlas, keyboard, devices, colour-studio, crawl, a11y | — | INHERITED from `9931f1a` / `8c7408e` / `80f8058` | Inherited | No shared layout, route or taxonomy change |
| Screen reader, physical device, expert review | — | NOT RUN | — | Not available |

### Cycle 2 IB2 — `2216116` (2026-11-17, parent `9d41b83`)

Changes: Practice items on 12 entries, citation retargets on three entries and one explorer data constant, source records (read notes, access attempts), five reciprocal relations and a prose link, `tests/browser/entry-review.cjs` flashcard check, generated docs. No layout, route, taxonomy or dependency change.

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Check | `npm run check` | PASS — 22 files, 586 tests (after fixing the HCI explorer's source list, which `tests/hci.test.ts` caught) | Run | — |
| Taxonomy | `npm run test:taxonomy` | PASS | Run | — |
| Docs | `npm run docs:generate` | Practice complete 90 → 102; evidence target 101/102 and Editorial 101 unchanged | Run | — |
| Build | `npm run build` | PASS — 995/995 on the rerun (first attempt exited 1 after the same Next.js upgrade notice; not acted on) | Run | Upgrade advice not evaluated |
| Sources | `npm run sources:verify -- shneiderman-1982 brooke-1996 w3c-wcag-22` | doi-verified, doi-verified, url-reachable | Run | `brooke-1996` read from a third-party copy; five abstract-only sources not retrievable |
| Integrity | `npx tsx scripts/entry-integrity.ts <21 touched entries>` | No new problems (pre-existing further-reading references only) | Run | — |
| Entry review | `AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs <21 touched entries>` (axe-core 4.14.0) | 111/168 on the first run: axe 0 and overflow 0 everywhere; failures are plate markers on pages in the known backlog, `confidence-intervals` plate text 7.9 px at 390 px (TD-4), and a false flashcard failure on `interaction-design-discipline` (script fixed; 8/8 after) | Run | Emulated widths |
| e2e, e2e-redesign, atlas, keyboard, devices, colour-studio, crawl, a11y | — | INHERITED from `9931f1a` / `8c7408e` / `80f8058` | Inherited | No layout, route or taxonomy change |
| Screen reader, physical device, expert review | — | NOT RUN | — | Not available |

### Improvement Batch 1 corrections — `35cf36b` (2026-11-17, parent `5d9e804`)

Changes: `heart-framework`, `system-usability-scale`, `doherty-threshold`, two new source records and one source note, generated coverage docs. No component, route, taxonomy or dependency change.

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Check | `npm run check` | PASS — 22 files, 586 tests | Run | — |
| Taxonomy | `npm run test:taxonomy` | PASS | Run | — |
| Docs | `npm run docs:generate` | PASS; evidence target 101/102 and Editorial 101 unchanged | Run | — |
| Build | `npm run build` | PASS — 995/995 on the rerun (first attempt exited 1 after the same Next.js upgrade notice; not acted on) | Run | Upgrade advice not evaluated |
| Sources | `npm run sources:verify -- uxls-open-targets-heart ms-azure-monitor-heart` | url-reachable; both pages read in full | Run | Not peer-reviewed; the text read is the evidence |
| Integrity | `npx tsx scripts/entry-integrity.ts heart-framework system-usability-scale doherty-threshold` | No new problems (pre-existing further-reading references only) | Run | — |
| Entry review | `AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs heart-framework system-usability-scale doherty-threshold` | 12/24: `doherty-threshold` 8/8; `heart-framework` and `system-usability-scale` axe 0, overflow 0, errors 0, failing only on plate markers/clipped plate text (known backlog TD-1) | Run | Emulated widths |
| Other suites (e2e, e2e-redesign, atlas, keyboard, devices, colour-studio, crawl, a11y) | — | INHERITED from `9931f1a` / `8c7408e` / `80f8058` | Inherited | No component, route or taxonomy change |
| Screen reader, physical device, expert review | — | NOT RUN | — | Not available |

### Improvement Batch 1 implementation — `3d5aa38` (2026-11-17, parent `7c34436`)

Changes: six entries (`mapping`, `usability-testing`, `plain-language`, `doherty-threshold`, `keystroke-level-model`, `shneiderman-golden-rules`), three source files and `verification.json`, generated coverage docs, the batch report. No component, route, taxonomy or dependency change.

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Check | `npm run check` | PASS — 22 files, 586 tests | Run | — |
| Taxonomy | `npm run test:taxonomy` | PASS | Run | — |
| Docs | `npm run docs:generate` | PASS; evidence target 101/102, Editorial complete 101 | Run | — |
| Build | `npm run build` | PASS — 995/995 on the rerun. The first attempt exited 1 after prerendering 995/995 because of the Next.js CLI upgrade notice (same as before); the notice was not acted on. | Run | Upgrade advice not evaluated |
| Sources | `npm run sources:verify -- <ids>` | `shneiderman-golden-rules-page`, `kieras-2001-klm`, `doherty-thadani-1982`, `inclusion-europe-information-for-all`: url-reachable. `ericsson-simon-1980`: doi-verified. `brooke-2013`: url-reachable but that URL is the journal home page; the article was not read | Run | A reachable URL is not a read; each record's notes say what was read |
| Integrity | `npx tsx scripts/entry-integrity.ts mapping usability-testing plain-language doherty-threshold keystroke-level-model shneiderman-golden-rules` | No new problems; 3 pre-existing "referenced, not cited" further-reading entries, identical before and after the changes | Run | — |
| Entry review | `AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs <6 slugs>` (axe-core 4.14.0) | 36/48 pass; axe 0, overflow 0, errors 0 on all. The 12 failures are plate markers outside the viewBox on `mapping` and `shneiderman-golden-rules` (known backlog TD-1) | Run | Emulated widths |
| Entry review, other axe | same with axe-core 4.10.2 (scratchpad copy) | Fails best-practice rule `landmark-complementary-is-top-level` on every page including untouched `error-messages` | Run, then superseded | Different axe version; not caused by this batch. Use the project's installed axe-core |
| e2e, e2e-redesign, atlas, keyboard, devices, colour-studio, crawl, a11y | — | INHERITED from `9931f1a` / `8c7408e` / `80f8058` | Inherited | No component, route or taxonomy file changed |
| Vercel preview for `7c34436` | `dpl_DetaPwZHJtB6Kgxn6wEiLNaD5Ktv` | READY (2026-11-17); state only | Run | Pages not browsed |
| Screen reader, physical device, expert review | — | NOT RUN | — | Not available |

### Documentation commit after `9931f1a` (2026-11-17)

Changes: `docs/CONTENT_AUDIT.md` (coveredBy reconciliation), `docs/CYCLE_2_IMPROVEMENT_BATCH_1_SCOPE.md`, `docs/OPEN_ISSUES.md`, `docs/PROJECT_STATE.md`, `docs/PROGRESS.md`, ledger. Documentation only: no content, taxonomy, component, route or dependency change, so the build and every suite are INHERITED from `9931f1a`'s verification. Run now: `npx tsc --noEmit -p .` and `npm test` (see below). Remote and deployment checks for the push of `9931f1a`:

| Check | Result | Date |
|---|---|---|
| Remote HEAD vs local HEAD after push | `9931f1a` = `9931f1a` | 2026-11-17 |
| Vercel `dpl_E8tGMEEDuf7MG5ec9FMhGV2WkLUU` | READY (state only; pages not browsed) | 2026-11-17 |
| `main` | `b788511` unchanged | 2026-11-17 |
| PR #2 | open, unmerged, head `a1f6373` | 2026-11-17 |

### I1 commit — coveredBy checks (2026-11-17, parent `a7c4937`)

Changes: `content/taxonomy.ts` (8 topics gain `coveredBy`), `docs/CONTENT_AUDIT.md`, generated coverage docs, `docs/CYCLE_2_IMPROVEMENT_PROPOSAL.md`, state docs. No entry, component, route or dependency change. A taxonomy change affects generated pages and the Atlas, so build and the Atlas suite were run; unrelated suites were not.

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Check | `npm run check` | PASS — 22 files, 586 tests | Run | — |
| Taxonomy | `npm run test:taxonomy` | PASS — 561 topics, 102 published, 18 addressed within | Run | — |
| Docs | `npm run docs:generate` | PASS (coverage docs regenerated) | Run | — |
| Build | `npm run build` | PASS — 995/995. The first attempt exited 1 after the Next.js CLI printed the same upgrade notice as on `8c7408e`; the identical rerun exited 0. The notice was not acted on. | Run | Upgrade advice not evaluated |
| Atlas | `node tests/browser/atlas.cjs` (production server) | PASS — 36/36 | Run | — |
| e2e, e2e-redesign, keyboard, devices, colour-studio, crawl, a11y, entry review | — | INHERITED from `8c7408e` (a11y/entry review) and `80f8058` (others) | Inherited | No component, route or entry content changed; taxonomy-only change |
| Vercel preview `dpl_G9B261VEd9eSqztEpDJpfuhJqShK` for pushed `a7c4937` | Vercel API `get_deployment` | READY (2026-11-17) | Run | Deployment state only; the preview pages were not browsed |

### Commit `8c7408e` — Batch 3 review + Cycle 1 balance review (2026-11-17)

The tests ran on the review-corrected tree before the commit; it differed from `8c7408e` only by the two review documents (`docs/CYCLE_1_BALANCE_REVIEW.md`, `docs/PROGRESS.md`), so the results apply to `8c7408e`.

| Check | Command | Areas | Result | Run / inherited | Limitations |
|---|---|---|---|---|---|
| Check | `npm run check` | content index, typecheck, unit + content tests, lint | PASS — 22 files, 586 tests | Run | — |
| Taxonomy | `npm run test:taxonomy` | slugs, links, three-depth, coverage | PASS | Run | — |
| Docs | `npm run docs:generate` | generated coverage docs | PASS (regenerated) | Run | — |
| Build | `npm run build` | all routes | PASS — 995/995 pages. First attempt exited 1 after prerendering 995/995 because the Next.js CLI stopped to print an upgrade notice; the identical rerun exited 0. The notice was not acted on. | Run | Next.js upgrade advice not evaluated (out of scope) |
| e2e-redesign | `node tests/browser/e2e-redesign.cjs` | library, sidebar, explorers, labs, motion, 390 px | PASS — 66/66 | Run | — |
| a11y | `AXE_PATH=… node tests/browser/a11y.cjs` on the B3 entries and compare page | axe WCAG 2.2 AA, light + dark | PASS — 0 violations | Run | axe only; no screen reader |
| Entry review | `AXE_PATH=… node tests/browser/entry-review.cjs ux-writing content-design plain-language microcopy error-messages` | render, overflow 390/1440, plate markers in viewBox, key, axe | PASS — 40/40 | Run | Emulated widths only |
| Compare + error-messages | targeted page checks | `/compare/*` new comparison, `/library/error-messages` | PASS — axe 0, no overflow, guide link present | Run | — |
| Integrity | entry-integrity script on the 5 B3 slugs | citations, relations, quiz, figures | PASS — clean | Run | Relation direction checked by hand |
| e2e | `node tests/browser/e2e.cjs` | interactions | PASS — 44/44 | INHERITED from `80f8058` | No component/route change since |
| Atlas | `node tests/browser/atlas.cjs` | Knowledge Atlas | PASS — 36/36 | INHERITED from `80f8058` | as above |
| Keyboard | `node tests/browser/keyboard.cjs` | keyboard paths, a11y tree | PASS — 45/45 | INHERITED from `80f8058` | Not a screen-reader test |
| Devices | `node tests/browser/devices.cjs` | 19 pages × 6 emulated devices | PASS — 155/155 | INHERITED from `80f8058` | Emulation, not physical devices |
| Colour Studio | `node tests/browser/colour-studio.cjs` | lab | PASS — 46/46 | INHERITED from `80f8058` | — |
| Crawl | `node tests/browser/crawl.cjs` | status, console, requests | PASS — 0 problems | INHERITED from `80f8058` | — |
| Screen reader / physical device / expert review | — | — | NOT RUN | — | Not available in the container |

### Commit `80f8058` — Batch 3 production (2026-11-16)

| Check | Command | Areas | Result | Run / inherited | Limitations |
|---|---|---|---|---|---|
| e2e | `node tests/browser/e2e.cjs` | interactions | PASS — 44/44 | Run | — |
| Atlas | `node tests/browser/atlas.cjs` | Atlas | PASS — 36/36 | Run | — |
| Keyboard | `node tests/browser/keyboard.cjs` | keyboard | PASS — 45/45 | Run | Not a screen-reader test |
| Devices | `node tests/browser/devices.cjs` | emulation | PASS — 155/155 | Run | Emulation only |
| Colour Studio | `node tests/browser/colour-studio.cjs` | lab | PASS — 46/46 | Run | — |
| Crawl | `node tests/browser/crawl.cjs` | site | PASS — 0 problems | Run | — |
| Entry review, linked entries | `entry-review.cjs error-recovery error-prevention nielsen-usability-heuristics aesthetic-and-minimalist-design` | 4 pre-existing entries that gained links | 54/72 — the 18 failures are pre-existing plate-marker clipping (TD-1): error-recovery 3, error-prevention 1, nielsen-usability-heuristics 1 markers | Run | Backlog, not caused by Batch 3 |
| Sources | `npm run sources:verify -- <43 ux-writing ids>` | new source records | 6 doi-verified, 32 url-reachable, ISO unreachable (blocks bots), 4 books unverifiable by machine | Run | Books and ISO are bibliographic records |

### Earlier

Batch 1 and Batch 2 QA is recorded in `docs/BATCH_1_REVIEW.md` and `docs/BATCH_2_REVIEW.md` (verified on `fd86db0` and `8cbd4ad`). Not re-entered here.

### Memory and skill infrastructure commit (2026-11-17, parent `8c7408e`)

Changes: `.claude/skills/ux-academy-workflow/SKILL.md`, `CLAUDE.md`, `docs/PROJECT_STATE.md`, `docs/QA_VERIFICATION_LEDGER.md`, `docs/OPEN_ISSUES.md`, `scripts/entry-integrity.ts`, `tests/browser/entry-review.cjs`, `tests/browser/README.md`. No content, component, route or dependency change.

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Typecheck | `npx tsc --noEmit -p .` | PASS | Run (working tree before commit) | — |
| Lint | `npm run lint` | PASS | Run | — |
| Check | `npm run check` | PASS — 22 files, 586 tests | Run | — |
| Integrity script | `npx tsx scripts/entry-integrity.ts ux-writing content-design plain-language microcopy error-messages` | PASS — no problems, exit 0 | Run | — |
| Build, browser suites, entry review | — | INHERITED from `8c7408e` | Inherited | No file they depend on changed |

### D-131 Excellence standard — documentation commit (2026-11-19, parent `8d7fa9d`)

Changes: `docs/CONTENT_MODEL.md`, `.claude/skills/ux-academy-workflow/SKILL.md`, `docs/DECISION_LOG.md`, `docs/PROJECT_STATE.md`, `docs/OPEN_ISSUES.md`, this ledger. Documentation only (skill § 4: `docs/**` requires nothing).

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Check | `npm run check` | PASS — 23 files, 588 tests; typecheck and lint clean | Run (working tree before commit) | — |
| Content checklist | `grep` of the new section for the agreed elements (mandatory/conditional/optional, assessment coverage, traceability, outcomes, misconceptions, connections, case integrity, one review / one correction pass) | PASS — all present | Run | Textual check, not an editorial review |
| Scope guard | `git diff --quiet` on BALANCED_DEVELOPMENT_PLAN.md, `content/`, `lib/`, `app/`, `components/` | PASS — untouched | Run | — |
| Build, browser suites | — | INHERITED from `8d7fa9d` | Inherited | No file they depend on changed |

### Cycle 3 pre-production checks (2026-11-19, HEAD `7019450`)

Documentation records only (skill § 4: `docs/**` requires nothing). The checks below used scratch scripts outside the repository; nothing under `content/`, `lib/` or `verification.json` was written.

| Check | Method | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Dependency ranking | D-129 formula (links + 2×relations + 3×prerequisite uses + 3×paths + 2×linking domains) computed from the loaded content for all 459 planned topics | B6 63, B8 28, B5 16; B4 58; `information-scent` rank 1, `navigation-patterns` rank 2 | Run | Approximation of the D-129 baseline method (it did not record its script); absolute values differ from the 2026-11-12 baseline (information-scent 25 → 35) because 14 entries were added |
| Balance | Counts from the taxonomy and coverage report | Domains 3, max share 38.5 %, clusters C/A/E, empty domains 5 → 4, empty subcategories 39 → 35 | Run | Projections, not content |
| Path and prerequisite gap for B4 | Loaded paths, entries' `prerequisites`, relations and links | No entry lists a B4 topic as prerequisite; no Cycle 3 topic depends on B4; Accessibility path 20 % unchanged | Run | — |
| Duplication | Taxonomy aliases/coveredBy, relations, links and keyword search across the 102 published entries | Boundaries needed (see PROJECT_STATE); no thin or redundant topic found | Run | Keyword search, not a read of each entry |
| Source existence and verification | Crossref DOI lookup with title/year comparison; HTTP GET for URLs; 56 candidates | 48 DOIs verified after correcting 8 wrong recalled DOIs; 7 URLs reachable; 1 book (no machine check) | Run | Existence and bibliographic match only; content of sources not read; full-text access not tested; candidates not registered |
| Build, browser suites, `npm run check` | — | INHERITED from `7019450` / `8d7fa9d` | Inherited | No file they depend on changed |

### Cycle 3, B6 topic 1 — `information-foraging-theory` (2026-11-19, parent `2225d1c`)

Changes: new entry, `content/sources/findability.ts` (6 sources), notes on `pirolli-card-1999`, plate `findability-sheets.tsx`, Level-2 figure and registry, visual register, one back-link in `information-architecture`, `components/entry/references.tsx` (DOI wrap), `tests/browser/e2e-redesign.cjs` (detailed-diagram count 28 → 29), generated docs. A shared component changed, so every suite was rerun (skill § 4).

| Check | Command | Result | Run / inherited | Limitations |
|---|---|---|---|---|
| Check | `npm run check` | PASS — 23 files, 590 tests; typecheck, lint clean | Run (final tree) | — |
| Taxonomy | `npm run test:taxonomy` | PASS — 103 published | Run | — |
| Sources | `npm run sources:verify -- pirolli-2007 fu-pirolli-2007 chi-pirolli-chen-pitkow-2001 bates-1989 nielsen-2003-information-foraging budiu-2020-information-scent` | 4 doi-verified, 2 url-reachable | Run | Verification checks records, not content; access recorded in each note |
| Integrity | `npx tsx scripts/entry-integrity.ts information-foraging-theory` | PASS — no problems | Run | — |
| Plate render | `scripts/render-plates.tsx information-foraging-theory` | Light and dark inspected; marker 4 moved off a link row; 'Content' row header added | Run | Visual inspection |
| Build | `npm run build` | PASS | Run (final tree) | — |
| Entry review | `entry-review.cjs information-foraging-theory` (+ information-architecture, tree-testing, plain-language, discoverability) | PASS 8/8 (and 40/40 with linked entries); first run FAILED at 390 px (17 px overflow from a long DOI), fixed in references.tsx | Run | Emulation, not a device |
| e2e | `node tests/browser/e2e.cjs` | PASS 44/44 | Run | — |
| e2e-redesign | `node tests/browser/e2e-redesign.cjs` | PASS 66/66 after updating the expected detailed-diagram count 28 → 29 (one new Level-2 figure) | Run | — |
| Atlas | `node tests/browser/atlas.cjs` | PASS 36/36 | Run | — |
| Keyboard | `node tests/browser/keyboard.cjs` | PASS 45/45 | Run | Not a screen-reader test |
| Devices | `node tests/browser/devices.cjs` | PASS 155/155 | Run | Emulation only |
| Colour Studio | `node tests/browser/colour-studio.cjs` | PASS 46/46 | Run | — |
| Crawl | `node tests/browser/crawl.cjs` | PASS — 0 problems | Run | — |
| Axe | `node tests/browser/a11y.cjs` (axe-core 4.14.0) | PASS — 0 violations | Run | Automated rules only |
| Review | One targeted review against gates, D-129 targets and the D-131 checklist; one correction pass | 0 critical, 0 major; 2 precision edits applied; minors C3-4, C3-5 logged | Run | Same-session review, not independent; no screen reader, physical device or expert review |

### Domain 1, Batch 1 — `usefulness`, `desirability`; `utility` within `usefulness` (2026-11-19, parent `3b776d6`)

Content, sources (`content/sources/fundamentals.ts`; `nielsen-usability-101` URL moved to Nielsen's original at /jn/ because NN/g replaced the article at the old address with a 2026 rewrite), plates (`fundamentals-sheets.tsx`), register, takeaways, taxonomy `coveredBy` for utility. No shared component changed, so site-wide suites other than e2e-redesign are INHERITED from `3b776d6`.

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Check | `npm run check` | PASS — 594 tests | Run |
| Taxonomy | `npm run test:taxonomy` | PASS — UX & UI Fundamentals 8 published, 1 addressed within | Run |
| Sources | `sources:verify` for 5 new ids + nielsen-usability-101 | 3 doi-verified, 3 url-reachable | Run |
| Integrity | `entry-integrity.ts usefulness desirability` | PASS | Run |
| Plates | `render-plates.tsx usefulness desirability` | Light/dark inspected; markers and chip overflow fixed before commit | Run |
| Build | `npm run build` | PASS | Run |
| Entry review | `entry-review.cjs usefulness desirability usability` | PASS 24/24 | Run |
| e2e-redesign | `node tests/browser/e2e-redesign.cjs` | PASS 66/66 | Run |
| Other browser suites | — | INHERITED from `3b776d6` | Inherited |
| Review | One focused review; one correction pass | 0 critical, 0 major; minor D1-1 (desirability's pointer to design thinking's lens awaits that entry's sources) | Run |

### Domain 1, Batch 2 — `design-thinking`; `feasibility`, `viability` within it; `human-centred-design` within `user-centred-design` (2026-11-19, parent `aa1311c`)

Entry, Level-2 figure (`design-thinking.lenses`), plate (replaces the S25 planned-topic plate in `core-plates.tsx`; the planned plate and its register record removed), 6 sources (IDEO ×2, d.school and Cagan read; Kimbell and Liedtka abstracts), `brown-2008` note, desirability now cites IDEO for the lens (closes D1-1), taxonomy `coveredBy` ×3, CONTENT_AUDIT session 62, e2e-redesign detailed-diagram count 29 → 30.

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Check | `npm run check` | PASS — 594 tests | Run |
| Taxonomy | `npm run test:taxonomy` | PASS — UX & UI Fundamentals 9 published, 4 addressed within | Run |
| Sources | `sources:verify` for 6 new ids | 2 doi-verified, 4 url-reachable | Run |
| Integrity | `entry-integrity.ts design-thinking desirability` | PASS after citing `brown-2008` (it was referenced but uncited) | Run |
| Plate | `render-plates.tsx design-thinking` | Light/dark inspected; loop arrow re-routed below the labels | Run |
| Build | `npm run build` | PASS | Run |
| Entry review | `entry-review.cjs design-thinking user-centred-design double-diamond desirability` | PASS 32/32 | Run |
| e2e-redesign | `node tests/browser/e2e-redesign.cjs` | PASS 66/66 (expected count 30) | Run |
| Addressed-within pages | `curl` of /library/{human-centred-design, feasibility, viability, utility} | Each shows "Explained within" its host | Run |
| Other browser suites | — | INHERITED from `3b776d6` (no shared component changed) | Inherited |
| Review | One focused review; one correction pass | 0 critical, 0 major; 2 minor wording fixes applied (interpretation labelled; unsourced participant count removed) | Run |

### Domain 1, Batch 3 — `design-processes`, `ux-lifecycle`, `ux-maturity` (2026-11-19, parent `218bb3d`)

Three entries, three plates, 6 sources (Dubberly introduction, GOV.UK phase pages and NN/g maturity model read in full; Wynn & Clarkson and Salah et al. abstracts; Chapman & Plewes bibliographic). Access limits: Wynn & Clarkson is open access but the publisher returned a cookie page on two attempts; Sy (2007) could not be reached at either journal address (404, then a redirect to the journal home page) and was not used. No new Level-2 figure (concept family: plate target).

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Check | `npm run check` | PASS — 600 tests (one editorial-gate failure fixed: a fourth analogy opening 'Think of') | Run |
| Taxonomy | `npm run test:taxonomy` | PASS — UX & UI Fundamentals 12 published, 4 addressed within | Run |
| Sources | `sources:verify` for 6 new ids | 3 doi-verified, 3 url-reachable | Run |
| Integrity | `entry-integrity.ts design-processes ux-lifecycle ux-maturity` | PASS | Run |
| Plates | `render-plates.tsx` for the three | Light/dark inspected; lifecycle redrawn as rows, cell and marker overlaps fixed | Run |
| Build | `npm run build` | PASS | Run |
| Entry review | `entry-review.cjs design-processes ux-lifecycle ux-maturity user-centred-design` | PASS 32/32 | Run |
| e2e-redesign | `node tests/browser/e2e-redesign.cjs` | PASS 66/66 | Run |
| Other browser suites | — | INHERITED from `3b776d6` | Inherited |
| Review | One focused review; one correction pass | 0 critical, 0 major; one unsourced historical sentence in ux-lifecycle reworded before commit | Run |

### Domain 1, Batch 4 — `product-design`, `experience-design` (2026-11-19, parent `5a2678c`)

Two discipline entries, two plates, 7 sources (IxDF product-design page, WDO and IDSA definitions and Hassenzahl's encyclopedia chapter read; Forlizzi & Battarbee and Sheldon et al. abstracts; Hassenzahl 2010 bibliographic). Cagan reused.

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Check | `npm run check` | PASS — 604 tests | Run |
| Taxonomy | `npm run test:taxonomy` | PASS — UX & UI Fundamentals 14 published, 4 addressed within | Run |
| Sources | `sources:verify` for 7 new ids | 3 doi-verified, 4 url-reachable | Run |
| Integrity | `entry-integrity.ts product-design experience-design` | PASS | Run |
| Plates | `render-plates.tsx experience-design product-design` | Light/dark inspected; bracket label, kettle spout and marker positions fixed | Run |
| Build | `npm run build` | PASS | Run |
| Entry review | `entry-review.cjs product-design experience-design user-experience interaction-design-discipline` | PASS 32/32 | Run |
| e2e-redesign | `node tests/browser/e2e-redesign.cjs` | PASS 66/66 | Run |
| Other browser suites | — | INHERITED from `3b776d6` | Inherited |
| Review | One focused review; one correction pass | 0 critical, 0 major; 2 minor fixes (a claim about the unread 2010 book; a historical 'became' not supported by Cagan) | Run |

### Domain 1, Batch 5 — `history-of-interface-design`, `evolution-of-digital-experiences`; `history-of-hci` within `human-computer-interaction` (2026-11-19, parent `9eb3675`)

Two entries, two plates, 4 new sources (Nielsen 1993 table and Buxton read; van Dam and the Star retrospective abstracts) plus Myers 1998 now read in full from the author's technical-report copy; Grudin 2005 and Bødker 2006 abstracts read for the first time. `history-of-hci` set `coveredBy` human-computer-interaction (CONTENT_AUDIT session 62); the HCI entry's two forward references to a planned history entry rewritten, its relation retargeted to `history-of-interface-design`.

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Check | `npm run check` | PASS — 608 tests | Run |
| Taxonomy | `npm run test:taxonomy` | PASS — UX & UI Fundamentals 16 published, 5 addressed within (21/21 accounted for) | Run |
| Sources | `sources:verify` for 4 new ids | 2 doi-verified, 2 url-reachable; Star author list confirmed against Crossref | Run |
| Integrity | `entry-integrity.ts history-of-interface-design evolution-of-digital-experiences human-computer-interaction` | New entries clean; HCI reports `iso-9241-11-2018` referenced but uncited, which predates this batch (the committed version has no citation either) — logged D1-2 | Run |
| Plates | `render-plates.tsx` for the two | Light/dark inspected; band label, footnote and marker overlaps fixed | Run |
| Build | `npm run build` | PASS | Run |
| Entry review | `entry-review.cjs history-of-interface-design evolution-of-digital-experiences human-computer-interaction` | PASS 24/24 | Run |
| e2e-redesign | `node tests/browser/e2e-redesign.cjs` | PASS 66/66 | Run |
| Addressed-within page | `curl /library/history-of-hci` | "Explained within Human-Computer Interaction (HCI)" | Run |
| Review | One focused review; one correction pass | 0 critical, 0 major; 1 moderate fixed (a contradictory multi-touch date sentence) | Run |

### Domain 1 final check (2026-11-19, HEAD `55dc927` + records)

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Check | `npm run check` | PASS — 608 tests | Run |
| Taxonomy | `npm run test:taxonomy` | PASS — Domain 1: 21 topics, 16 published, 5 addressed within; site 113 published, 23 addressed within; 971 links | Run |
| Docs | `npm run docs:generate` | Regenerated; CONTENT_COVERAGE lists the 5 addressed-within topics. KNOWLEDGE_TAXONOMY marks them ◻️ (generator limit, D1-3) | Run |
| Build | `npm run build` | PASS | Run |
| Browser | entry-review, e2e-redesign | Inherited from Batch 5 (same content; this commit changes docs only) | Inherited |
| Not run | keyboard, devices, crawl, axe-all, atlas | No shell or component change in Domain 1 beyond new plates and one Level-2 figure, each covered by entry-review (axe) per batch | Not run |

### Domain 1 resource enrichment (2026-11-20, parent `3c10386`)

Further-reading resources added to 6 published Domain 1 entries (8 references): 5 new source records in `content/sources/fundamentals.ts` (Design Kit methods, GOV.UK Service Standard, GOV.UK moderated usability testing, the `alphagov/govuk-frontend` repository, the Engelbart Institute's 1968 demo digest) and 3 existing records reused (`govuk-design-system`, `material-3`, `w3c-aria-apg`). No explanation, figure, exercise, quiz, flashcard, status, taxonomy or path changed.

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Sources | `sources:verify` for the 5 new and 3 reused ids | 8 url-reachable | Run |
| Repository | GitHub search API `repo:alphagov/govuk-frontend` | Not archived; last push 2026-11-19; MIT; README read | Run |
| Integrity | `entry-integrity.ts` for the 6 entries | Only `referencedNotCited` for the 8 new further-reading references (baseline at `3c10386`: clean). Accepted: further reading is uncited by design, with precedent (22 of 61 further references across published entries at `3c10386`) | Run |
| Check | `npm run check` | PASS — 608 tests | Run |
| Taxonomy | `npm run test:taxonomy` | PASS — Domain 1 unchanged: 16 published, 5 addressed within | Run |
| Docs | `npm run docs:generate` | Regenerated (sources 529 → 534; reference counts for the 6 entries) | Run |
| Build | `npm run build` | PASS | Run |
| Entry review | `entry-review.cjs` for the 6 entries | PASS 48/48 (axe 0, overflow 0) | Run |
| Review | One targeted review; one correction pass | 0 critical, 0 major; 3 unverified details in notes removed or reworded (a chord-keyset claim, a research-findings claim, a repository file-layout claim). The last edit is to note text only, after the build and entry review | Run |
| Not verified | NN/g UX maturity quiz (`forms.nngroup.com/s3/Maturity-Quiz`) | TLS verification failed on both attempts (curl, Python); not added | Run |

### Design skills installation (2026-11-20, parent `84c7691`)

Eight third-party Claude Code skills installed project-local in `.claude/skills/` with `npx skills add … -a claude-code --copy` (provenance in `skills-lock.json`); workflow in `docs/DESIGN_SKILLS_WORKFLOW.md`; `.claude/**` added to ESLint ignores. No app, content, taxonomy or path change.

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Package completeness | `diff -rq` of each installed folder against a fresh clone of its source | 8/8 identical (unslop 16 files, ui-ux-pro-max 80, oil-ui 55, better-ui 5, better-layout 5, better-accessibility 9, interface-review 4, web-design-guidelines 1) | Run |
| Loader | Claude Code skill listing in this session | unslop, ui-ux-pro-max, oil-ui, better-ui, better-layout, better-accessibility, web-design-guidelines listed; interface-review is manual-only (`disable-model-invocation`) and so not listed | Observed |
| Script smoke test | `python3 .claude/skills/ui-ux-pro-max/scripts/search.py --help` | Runs (Python 3.13, stdlib only) | Run |
| Check | `npm run check` | First run: 4 lint errors from vendored skill code (`oil-ui/assets/vendor/alpine.min.js`); after adding `.claude/**` to ESLint ignores: PASS, 608 tests | Run |
| Build | `npm run build` | PASS | Run |
| Not run | Any skill invocation on the interface | Not authorised (installation only) | Not run |

### Cycle 3, B6 topic 2 — `information-scent` (2026-11-20, parent `9ea5ec7`)

Entry, plate (`informationScentPlate`), register record, quick takeaway; `furnas-et-al-1987` notes added (abstract read). No other entry changed; no Level-2 figure.

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Sources | `sources:verify` for the 8 cited ids | 4 doi-verified, 4 url-reachable | Run |
| Integrity | `entry-integrity.ts information-scent` | Clean (10 relations out, 9 in; 3 exercises, 6 quiz, 5 flashcards) | Run |
| Check | `npm run check` | PASS — 610 tests | Run |
| Taxonomy | `npm run test:taxonomy` | PASS — IA 3 published; site 114 | Run |
| Plates | `render-plates.tsx information-scent` | Light and dark inspected; marker and chip overlaps fixed, re-rendered clean | Run |
| Build | `npm run build` | PASS | Run |
| Entry review | `entry-review.cjs information-scent information-foraging-theory` | PASS 16/16 (axe 0, overflow 0, plate text ≥ 10.2 px at 390, markers inside viewBox) | Run |
| Review | One targeted review; one correction pass | 0 critical, 0 major; corrected: an unsourced vocabulary term removed, the vocabulary-problem claim re-based on the Furnas abstract, two unlabelled interpretations labelled | Run |
| After correction | `entry-integrity.ts`, editorial and content tests | Clean; 33 tests pass (text-only edits after the build) | Run |

### B5 topic 1 — `default-effect` (2026-11-20, parent `1409093`)

Entry, plate (`decision-sheets.tsx`, new fragment file), register record, quick takeaway; six sources added to `cognitive-effects.ts`. No other entry changed.

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Sources | `sources:verify` for the 6 new ids | 4 doi-verified, 1 url-reachable (CMA), 1 url-unreachable (OECD, HTTP 403, as in research) | Run |
| Access | Research | Jachimowicz et al. 2019 read in full (publisher OA PDF); Madrian & Shea read as NBER WP 7682; CMA review Defaults section read; Johnson & Goldstein 2003 and Dinner et al. 2011 abstract only (SSRN 403 twice each); OECD BASIC not accessible (403 twice) | Run |
| Integrity | `entry-integrity.ts default-effect` | Only `referencedNotCited: oecd-2019-basic` — deliberate: listed as further reading because it could not be read; precedent for uncited further reading recorded 2026-11-20 | Run |
| Check | `npm run check` | PASS — 612 tests (final text) | Run |
| Taxonomy | `npm run test:taxonomy` | PASS — Laws & Effects 14 published; site 115 | Run |
| Plates | `render-plates.tsx default-effect` | Light and dark inspected; outcome column nudged off the card edge | Run |
| Build | `npm run build` | PASS (final text) | Run |
| Entry review | `entry-review.cjs default-effect choice-overload` | PASS 16/16 (final text; axe 0, overflow 0, plate text ≥ 10.2 px at 390) | Run |
| Review | One targeted review; one correction pass | 0 critical, 0 major; four wordings brought back within their sources (unavoidable defaults, query theory attribution, benign/smart defaults, active-choice condition) | Run |

### Deployment and status reconciliation (2026-11-20, parent `e44f8ce`)

Root cause of the production discrepancy: Vercel production builds from `claude/pensive-cannon-t1o6sy` (latest production `a1f6373`); no deployment from `main` exists, and `main` (`b788511`) is 55 commits behind PR #3. Production therefore shows the pre-Domain-1 state (6 of 21). UI and generator fixes on the branch: the domain page separates published, addressed within and planned (subcategory counts and groups; parent link, no doubled 'in'); `CoverageBar` reports 'N of T with their own entry' plus addressed within, planned and 'accounted for'; `/coverage` column renamed; `generate-docs.ts` marks `coveredBy` topics (closes D1-3).

| Check | Command | Result | Run / inherited |
|---|---|---|---|
| Check | `npm run check` | PASS — 612 tests | Run |
| Taxonomy | `npm run test:taxonomy` | PASS — Domain 1: 21 topics, 16 published, 5 addressed within | Run |
| Docs | `npm run docs:generate` | KNOWLEDGE_TAXONOMY marks 23 addressed-within topics with hosts; CONTENT_COVERAGE Domain 1 rows 10/3, 4/1, 2/1 | Run |
| Build | `npm run build` | PASS | Run |
| Atlas | `tests/browser/atlas.cjs` | PASS 36/36 | Run |
| Devices | `tests/browser/devices.cjs` | PASS 155/155 | Run |
| Keyboard | `tests/browser/keyboard.cjs` | PASS 45/45 | Run |
| Status pages | Scratch Playwright check of `/topics/foundations`, `/coverage`, `/topics` at 390 and 1440 | PASS 6/6: exact Domain 1 counts and subcategory counts, no 'Not yet published' group on the domain page, no 'within in', axe 0, overflow 0; five 'explained in' links resolve (200) | Run |
| Visual | Screenshots of the domain page header and a subcategory at 1280 | Inspected; existing style kept | Run |


### Domain-by-domain programme record (2026-11-23; documentation-only)

Changes: `docs/DOMAIN_COMPLETION_PLAN.md`, `docs/PROJECT_STATE.md`, `docs/PROGRESS.md`, `docs/DECISION_LOG.md`, `docs/OPEN_ISSUES.md`. No application, content-entry, source-registry, generated-index, test or build configuration files changed.

| Check | Result | Run / inherited |
|---|---|---|
| Repository reconciliation | `main` = `9a51aa6`; PR #3 merged; Vercel status check success | Run (GitHub API, 2026-11-23) |
| Domain 1 / 2 inventory | Domain 1 16 + 5 + 0 = 21; Domain 2 14 + 10 + 22 = 46 | Run (taxonomy, content directory and generated coverage cross-check, 2026-11-23) |
| Application tests / build | Not run — documentation-only changes; no application or content changed | Not required by change-impact policy |
| Live production runtime | Not verified — direct URL not retrievable in this session | Open: DEP-2 |


### Domain 2 Batch 1 research record (2026-11-23; documentation-only)

Files changed: `docs/DOMAIN_2_BATCH_1_RESEARCH.md`, `docs/DOMAIN_COMPLETION_PLAN.md`, `docs/PROJECT_STATE.md`, `docs/PROGRESS.md`.

| Check | Result | Run / inherited |
|---|---|---|
| Research review | Primary 1979 prospect-theory passages, 1981 framing text, publisher / abstract metadata and 2024–2025 syntheses reviewed; access limits documented | Run (web research, 2026-11-23) |
| Crossref source check | `kahneman-tversky-1979`: exact title/year/container matched; all other proposed source IDs still pending script verification | Partial run; not a complete source gate |
| `npm run sources:verify -- <ids>` | NOT RUN — no connected local repository runner; no source records written | NOT RUN (execution blocker) |
| `npm run check`, taxonomy, content integrity, build, browser suites | NOT RUN — documentation-only change; entry work has not started | Not required for these doc edits; required after content files change |
| Production runtime | NOT verified; DEP-2 remains open | NOT RUN |


### Domain 2 Batch 1 research deepening (2026-11-23; documentation-only)

Files changed: `docs/DOMAIN_2_BATCH_1_RESEARCH.md`, `docs/DOMAIN_COMPLETION_PLAN.md`, `docs/PROJECT_STATE.md`, `docs/PROGRESS.md`.

| Check | Result | Run / inherited |
|---|---|---|
| Full-text research | Tversky & Kahneman (1991) and Walasek et al. (2024) full text reviewed; PDF screenshots inspected. Tversky & Kahneman (1979) full text previously reviewed. | Run (web research, 2026-11-23) |
| Abstract / metadata review | Brown et al. (2024), Composto et al. (2025), Kühberger (1998, 2023), Levin et al. (1998), Gal & Rucker (2018) | Run (web research, 2026-11-23); access level individually recorded |
| Source verification script | NOT RUN — repository command runner unavailable | NOT RUN (execution blocker) |
| Content entry tests / build / browser suites | NOT RUN — no content or app files changed | Not required for docs-only change; required after entry files are added |
| Production runtime | NOT verified; DEP-2 remains open | NOT RUN |


### Domain 2 Batch 1 — entry drafts and visual integration (2026-11-23)

Changed: `content/knowledge/laws-effects/{loss-aversion,framing-effect}.ts`, `content/sources/cognitive-effects.ts`, `content/sources/verification.json`, `content/knowledge/_index.ts`, `components/illustrations/concepts/decision-sheets.tsx`, `components/illustrations/visual-register.ts`.

| Check | Result | Run / inherited |
|---|---|---|
| Manual structural review | Two files contain three-depth explanations, objectives, evidence/debates, origin, application, limits, misconceptions, 5 explained relations, 3 exercises, 4 quizzes, 4 flashcards and source references | Run (GitHub file inspection, 2026-11-23) |
| Taxonomy / slug alignment | Both slugs are present in frozen Domain 2 decision-biases inventory; domain id and subcategory match | Run (taxonomy read, 2026-11-23) |
| Sources | 11 records added; `kahneman-tversky-1979` has a Crossref match in verification.json; 10 remain bibliographic | Partial; repository verifier not run |
| `npm run sources:verify -- <11 ids>` | NOT RUN — no connected local repository command runner; GitHub shell clone also failed DNS | NOT RUN (execution blocker) |
| `npx tsx scripts/entry-integrity.ts loss-aversion framing-effect` | NOT RUN — no command runner | NOT RUN |
| `npm run check`, `npm run test:taxonomy`, `npm run docs:generate`, `npm run build` | NOT RUN — no command runner | NOT RUN; required before publishing |
| Plate render / `tests/illustrations.test.ts` / entry review | NOT RUN — no command runner or browser server | NOT RUN; required before publishing |
| GitHub Vercel status | PENDING when last queried (2026-11-23); not a verified pass | Run (GitHub status API) |
| Live production | Not deployed; no merge to main | Not run |

**Disposition:** Drafts are pushed, but remain `status: "drafted"`. Do not promote to `published` until every required gate is run and any critical/major/moderate findings are corrected.


### Domain 2 Batch 2 — Anchoring Effect draft and visual integration (2026-11-23)

Changed: content/knowledge/laws-effects/anchoring-effect.ts, content/sources/cognitive-effects.ts, content/knowledge/_index.ts, components/illustrations/concepts/decision-sheets.tsx, components/illustrations/visual-register.ts, docs/DOMAIN_2_BATCH_2_RESEARCH.md, and project records.

| Check | Result | Run / inherited |
|---|---|---|
| Research review | Original 1974 heuristic, self-generated adjustment, selective accessibility, scale distortion, WTP meta-analysis and 2026 broad meta-analysis reviewed at the access levels documented | Run (web research, 2026-11-23) |
| Manual entry integrity | Anchoring: all 8 cited source IDs listed in references and present in source registry; 4 objectives, 3 exercises, 4 quizzes, 4 flashcards; entry status drafted | Run (GitHub file inspection, 2026-11-23) |
| Taxonomy / index / illustration registration | Slug pre-exists in frozen Domain 2 decision-biases taxonomy; index import, decision-sheets plate and visual-register row present | Run (GitHub file inspection, 2026-11-23) |
| Reciprocal links / citation correction | Added Anchoring back-links to Loss Aversion and Framing; corrected Framing's missing tversky-kahneman-1992 reference | Run (GitHub file inspection, 2026-11-23) |
| Source verification (npm run sources:verify -- 9 ids) | NOT RUN — current Vercel team connection returns 403 until owner approves team access | BLOCKED (team authorization) |
| Entry integrity, npm run check, taxonomy, docs generation, plate render/tests, browser entry review, build | NOT RUN — no authorized command runner | BLOCKED (team authorization) |
| Vercel status for commit 8c108b5 | Pending when checked; not a build pass | Run (GitHub status API) |
| Production runtime | Not independently verified; DEP-2 remains open | NOT RUN |

**Disposition:** anchoring-effect remains status: drafted. The three Domain 2 entries (Loss Aversion, Framing Effect, Anchoring Effect) are all draft-only until the required source and QA gates run successfully.

### Domain 2 Batch 3 — Social Proof (2026-11-23, branch `claude/domain-completion-20261123`, base `f712e38`)

Change set: new entry `content/knowledge/laws-effects/social-proof.ts` (published); 9 source records in `content/sources/cognitive-effects.ts`; `socialProofPlate` in `components/illustrations/concepts/decision-sheets.tsx`; register record in `visual-register.ts`; quick takeaway in `components/visual-explanations/registry.tsx`; back-link in `default-effect.ts`; regenerated `content/knowledge/_index.ts`, `content/sources/verification.json` and the four generated docs. Gate-blocker fixes to pre-existing drafts: `anchoring-effect` register `techniques` (`"comparison"` was not a valid technique → `["numbered-annotation"]`), and the analogy openings of `anchoring-effect` and `loss-aversion` (editorial template cap). Commit SHA: see the commit that adds this section.

Baseline: `npm run check` on `f712e38` **FAILED** before any change (`tsc`: invalid technique value in the anchoring register record), so the earlier drafts had never passed the shared gates. After the register fix, `check` then failed the editorial analogy-template test on the two drafts' analogies; both were reworded.

| Check | Command | Result | Status |
|---|---|---|---|
| Source verification | `npm run sources:verify -- deutsch-gerard-1955 cialdini-reno-kallgren-1990 cialdini-goldstein-2004 goldstein-cialdini-griskevicius-2008 nolan-et-al-2008 salganik-dodds-watts-2006 muchnik-aral-taylor-2013 bond-smith-1996 saxena-banerji-2026` | 9/9 `doi-verified` (Crossref title and year match) | PASS |
| Content index | `npm run content:index` | 119 knowledge files, 21 source files; `social-proof` indexed | PASS |
| Entry integrity | `npx tsx scripts/entry-integrity.ts social-proof` | Exit 0; 10 outgoing relations, 1 incoming; 3 exercises, 4 quiz (3 levels), 4 flashcards; plate registered; all 9 references doi-verified. With `default-effect` added, exit 1 only for its pre-existing uncited further-reading `oecd-2019-basic`. | PASS (social-proof) |
| Check | `npm run check` (final tree) | Exit 0; 23 files, 620 tests | PASS |
| Taxonomy | `npm run test:taxonomy` | Exit 0; 1019 links; 116 published entries at three depths; Domain 2: 46 topics, 15 published, 10 addressed within | PASS |
| Generated docs | `npm run docs:generate` (final tree) | Exit 0; real changes kept in all four generated files (new entry, 9 sources, drafted counts). Site: 116/561 published, 23 addressed within, 419 planned, 3 drafted. | PASS |
| Plate render | `NODE_PATH=$(npm root -g) npx tsx scripts/render-plates.tsx social-proof` | Light and dark PNGs rendered and inspected: no clipping, four markers inside cards, loop arrow correct, legible contrast in both themes. The render script's fallback font draws the opening quote like a closing one; the site font renders it correctly (screenshot of the live page checked). | PASS |
| Entry review | `BASE_URL=http://localhost:3100 AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs social-proof default-effect`, then `… social-proof` on the final tree | 16/16, then 8/8 on the final tree: 1440, 768, 390 px, light and dark; axe 0, overflow 0, errors 0; plate text min 10.2 px at 390; 4 markers inside the viewBox; 15 links resolve, no raw markup; flashcards by keyboard 4/4 | PASS |
| Build | `npm run build` (final tree) | Exit 0; 998/998 static pages | PASS |
| Site-wide browser suites | Not run | Only a content entry, sources, a plate in an existing sheet file, a register record and a takeaway string changed; no shared component, route, `lib/**` or token changed (skill § 4: plate render + entry review) | NOT RUN (change-impact decision) |
| Drafts' own gates | Not run | `loss-aversion`, `framing-effect`, `anchoring-effect`: their own sources:verify, entry-integrity, plate review and entry review were not run in this session; they remain `drafted` | NOT RUN (out of scope; D2-B1-1, D2-B2-1) |

Review: one targeted review (accuracy against the read papers, classification, explanation, visuals and accessibility, practice and integration) and one correction pass. 0 critical, 0 major; 1 moderate fixed (the ethics paragraph implied research oversight the paper does not report); 6 precision corrections made during drafting before review (claims not supported by sources read were relabelled as academy interpretation or removed). Minor items: SP-1 in `docs/OPEN_ISSUES.md`.

Limitations: no screen-reader, physical-device or independent expert review. Five sources abstract only and one bibliographic only (stated in the entry). Vercel preview not checked.

### Domain 2 Batch 4 — Goal-Gradient Effect (2026-11-23, branch `claude/domain-completion-20261123`, base `4af404b`)

Change set: new entry `content/knowledge/laws-effects/goal-gradient-effect.ts` (published); 10 source records in `content/sources/cognitive-effects.ts`; `goalGradientPlate` in `decision-sheets.tsx`; register record; quick takeaway in `components/visual-explanations/registry.tsx`; back-link in `content/knowledge/design-systems/loading-states.ts`; regenerated `content/knowledge/_index.ts`, `content/sources/verification.json` (10 records added, none changed) and the four generated docs. No Domain 2 draft modified. Commit SHA: the commit that adds this section.

Baseline: `npm run check` PASS recorded on `4af404b` (Social Proof section) with a clean tree, so it was inherited for the start of this task; every gate below was then re-run on this change set.

| Check | Command | Result | Status |
|---|---|---|---|
| Source verification | `npm run sources:verify -- hull-1932 kivetz-urminsky-zheng-2006 nunes-dreze-2006 bonezzi-brendl-de-angelis-2011 koo-fishbach-2012 harkin-et-al-2016 conrad-et-al-2010 cheema-bagchi-2011 dixon-et-al-2024 devine-et-al-2025` | 10/10 `doi-verified` | PASS |
| Content index | `npm run content:index` | 120 knowledge files; entry indexed | PASS |
| Entry integrity | `npx tsx scripts/entry-integrity.ts goal-gradient-effect loading-states` | Exit 0; 7 outgoing relations, 1 incoming; 3 exercises, 4 quiz (3 levels), 5 flashcards; plate registered; 10 references doi-verified | PASS |
| Check | `npm run check` (final tree) | Exit 0; 23 files, 622 tests | PASS |
| Taxonomy | `npm run test:taxonomy` | Exit 0; 1027 links; 117 published entries at three depths; Domain 2: 46 topics, 16 published, 10 addressed within | PASS |
| Generated docs | `npm run docs:generate` (final tree) | Exit 0; real changes kept. Site: 117/561 published, 23 addressed within, 418 planned, 3 drafted. | PASS |
| Plate render | `NODE_PATH=$(npm root -g) npx tsx scripts/render-plates.tsx goal-gradient-effect` | First render inspected: card title 'Same position, two framings' overflowed its card under marker 3; marker 2 sat on the dashed curve; x-axis had no axis name. Fixed (title 'Two framings', marker moved, 'progress →' added) and re-rendered: no clipping or overlap, both curves distinguished by solid/dashed and legend, light and dark legible. | PASS (after fix) |
| Entry review | `BASE_URL=http://localhost:3100 AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs goal-gradient-effect loading-states` (final tree) | 16/16: 1440, 768, 390 px, light and dark; axe 0, overflow 0, errors 0; plate text min 10.2 px at 390; 4 markers inside the viewBox; 13 links resolve, no raw markup; flashcards by keyboard 5/5 | PASS |
| Build | `npm run build` (final tree) | Exit 0; 998/998 static pages | PASS |
| Site-wide browser suites | Not run | Content entry, sources, a plate in an existing sheet file, a register record and a takeaway string only; no shared component, route, `lib/**` or token changed (skill § 4) | NOT RUN (change-impact decision) |

Review (five dimensions): 0 critical, 0 major. Moderate fixed in the correction pass: four statements tightened to match the sources (Hull/Brown described as vigour toward a goal, not 'food'; Devine et al. measured correct responses per second, not speed; endowed-progress guidance anchored on what the studies did; the goal-distance-model inference labelled as academy interpretation); one weak relation removed (`social-proof`); the three plate defects above. Minor: GG-1.

Limitations: no screen-reader, physical-device or independent expert review. Seven sources abstract only, one bibliographic only. Vercel preview not checked.

### Domain 2 Batch 5 — Zeigarnik Effect (2026-11-23, branch `claude/domain-completion-20261123`, base `831eaf9`)

Change set: new entry `content/knowledge/laws-effects/zeigarnik-effect.ts` (published; `concept`, `laws-effects/memory-attention-effects` per the frozen taxonomy; evidence `contested`); 8 source records in `content/sources/cognitive-effects.ts`; `zeigarnikPlate` in `components/illustrations/concepts/learning-sheets.tsx`, registered through `laws-psychology.tsx`; register record; quick takeaway; back-links in `goal-gradient-effect.ts` and `von-restorff-effect.ts`; regenerated index, `verification.json` (8 added) and generated docs. Classification note: the batch brief placed the topic in `psychology`; the taxonomy places it in `laws-effects`, so the entry follows the taxonomy (see DOMAIN_COMPLETION_PLAN Batch 5). No Domain 2 draft modified. Commit SHA: the commit that adds this section.

Baseline: `check` PASS on `831eaf9` (previous section) with a clean tree; inherited for the start, then all gates re-run on this change set.

| Check | Command | Result | Status |
|---|---|---|---|
| Source verification | `npm run sources:verify -- zeigarnik-1927 ovsiankina-1928 macleod-2020 ghibellini-meier-2025 seifert-patalano-1991 masicampo-baumeister-2011-plans masicampo-baumeister-2011-executive wendsche-weigelt-syrek-2026` | 7 `doi-verified`, 1 `url-reachable` (conference paper, no DOI) | PASS |
| Content index | `npm run content:index` | 121 knowledge files; entry indexed | PASS |
| Entry integrity | `npx tsx scripts/entry-integrity.ts zeigarnik-effect` | First run failed schema validation (summary over 320 characters); summary shortened; exit 0: 7 outgoing, 2 incoming relations; 3 exercises; 4 quiz (3 levels); 5 flashcards; plate registered. With `goal-gradient-effect` and `von-restorff-effect`: exit 1 only for `von-restorff-effect`'s pre-existing uncited `w3c-wcag-22` (standard) and `laws-of-ux` (further); this batch added one relation line to that file. | PASS (zeigarnik-effect) |
| Check | `npm run check` (final tree) | Exit 0; 23 files, 624 tests | PASS |
| Taxonomy | `npm run test:taxonomy` | Exit 0; 1036 links; 118 published at three depths; Domain 2: 46 topics, 17 published, 10 addressed within | PASS |
| Generated docs | `npm run docs:generate` (final tree) | Exit 0; site 118/561 published, 23 addressed within, 417 planned, 3 drafted | PASS |
| Plate render | `NODE_PATH=$(npm root -g) npx tsx scripts/render-plates.tsx zeigarnik-effect` | First render: 'Specific plan' overlapped 'thoughts settle' in the Planning panel. Re-laid out ('Thoughts (lab studies)' sub-heading; 'intrude' / 'settle'); re-rendered: no overlap or clipping, light and dark legible; numbers shown (1.9, 0.99) are sourced ratios, the 67% figure is not drawn. | PASS (after fix) |
| Entry review | `BASE_URL=http://localhost:3100 AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs zeigarnik-effect goal-gradient-effect von-restorff-effect` (final tree) | 24/24; zeigarnik-effect: 1440/768/390 px, light and dark, axe 0, overflow 0, errors 0, plate text min 10.2 px at 390, 4 markers inside, 11 links, flashcards 5/5 | PASS |
| Build | `npm run build` (final tree) | Exit 0; 998/998 | PASS |
| Site-wide browser suites | Not run | No shared component, route, `lib/**` or token changed (skill § 4) | NOT RUN (change-impact decision) |

Review (five dimensions): 0 critical, 0 major. Moderate fixed: the waiter anecdote wording aligned with MacLeod's account; the plate overlap above; the summary length. Minor: ZE-1.

Limitations: no screen-reader, physical-device or independent expert review; originals not read; Vercel preview not checked.

### Domain 2 Batch 6 — Postel's Law (2026-11-24, branch `claude/domain-completion-20261123`, base `0005df9`)

Change set: new entry `content/knowledge/laws-effects/postels-law.ts` (published; `principle`, `laws-effects/popular-ux-laws`; evidence `practitioner-recommendation`); 8 source records in `content/sources/interaction-principles.ts`; three W3C records reused; `postelsLawPlate` in `learning-sheets.tsx`, registered via `laws-psychology.tsx`; register record; quick takeaway; back-links in `error-prevention.ts` and `teslers-law.ts`; regenerated index, `verification.json` and generated docs. No draft modified. Commit SHA: the commit that adds this section. Note: `main` is at `ef887a0` (owner-approved merge of PR #5 on 2026-11-24, content identical to `0005df9`); production deployment `dpl_DmriAhwfSpTSAxstVQEz1EHsHfMd` reported READY and the three Batch 3–5 lesson pages were fetched from `ux-academy-eight.vercel.app` with their published titles.

Baseline: `check` PASS on `0005df9` (previous section) with a clean tree; inherited for the start, then every gate re-run.

| Check | Command | Result | Status |
|---|---|---|---|
| Source verification | `npm run sources:verify -- rfc-760 rfc-791 rfc-1122 rfc-2360 rfc-7103 rfc-9413 rfc-9112 owasp-input-validation-cheat-sheet` | 7 `doi-verified`, 1 `url-reachable` | PASS |
| Content index | `npm run content:index` | Entry indexed | PASS |
| Entry integrity | `npx tsx scripts/entry-integrity.ts postels-law error-prevention teslers-law` | Exit 0; 8 outgoing, 2 incoming relations; 3 exercises; 4 quiz (3 levels); 5 flashcards; 11 references verified | PASS |
| Check | `npm run check` (final tree) | Exit 0; 23 files, 626 tests | PASS |
| Taxonomy | `npm run test:taxonomy` | Exit 0; 1044 links; 119 published at three depths; Domain 2: 46 topics, 18 published, 10 addressed within | PASS |
| Generated docs | `npm run docs:generate` (final tree) | Exit 0; site 119/561 published, 23 addressed within, 416 planned | PASS |
| Plate render | `NODE_PATH=$(npm root -g) npx tsx scripts/render-plates.tsx postels-law` | First render: pass/fail icons touched their labels; icons moved; re-rendered light and dark: no overlap or clipping; pass/fail shown by symbol and word, not colour alone | PASS (after fix) |
| Entry review | `BASE_URL=http://localhost:3100 AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs postels-law error-prevention teslers-law` (final tree) | 24/24; postels-law: 1440/768/390 px, light and dark, axe 0, overflow 0, errors 0, plate text min 10.2 px at 390, 4 markers inside, 12 links, flashcards 5/5 | PASS |
| Build | `npm run build` (final tree) | Exit 0; 998/998 | PASS |
| Site-wide browser suites | Not run | No shared component, route, `lib/**` or token changed (skill § 4) | NOT RUN (change-impact decision) |

Review (five dimensions): 0 critical, 0 major. Moderate fixed: unconfirmed STD numbers removed from two RFC records after checking the RFC Editor records; a sentence attributing colour/icon reasoning to the 3.3.1 Understanding document replaced with what the source records support; the debate wording on RFC 9413 aligned with its 'many consider' phrasing; plate icon spacing. Minor: PL-1.

Limitations: no screen-reader, physical-device or independent expert review; no user study of input tolerance cited; Vercel preview for this commit not checked.

### Domain 1 final closeout (2026-11-24, branch `claude/domain-completion-20261123`, base `d0b6560`)

Change set: `content/knowledge/foundations/human-computer-interaction.ts` (D1-2: one citation added in the research-methods paragraph; context-of-use vocabulary rewritten without an ISO attribution; reference note narrowed); documentation only otherwise (`OPEN_ISSUES.md`, `PROJECT_STATE.md`, `PROGRESS.md`, `DOMAIN_COMPLETION_PLAN.md`, this ledger). No source records, taxonomy, generated docs or other entries changed. Commit SHA: the commit that adds this section.

| Check | Command / method | Result | Status |
|---|---|---|---|
| Coverage reconciliation | Scratch script over `lib/content` (taxonomy items, entries, `coveredBy` hosts), `content/knowledge/_index.ts` and `docs/CONTENT_COVERAGE.md` | 21 topics; 16 published (10/4/2); 5 addressed within published hosts (3/1/1); 0 planned; 0 duplicate slugs; all 16 files indexed; no foundations entry outside the taxonomy; generated rows match | PASS |
| Entry integrity | `npx tsx scripts/entry-integrity.ts human-computer-interaction ux-maturity` (before fix) | 1 problem: `iso-9241-11-2018` referenced but not cited in HCI | FAIL (pre-fix, D1-2) |
| Entry integrity | `npx tsx scripts/entry-integrity.ts human-computer-interaction` (after fix) | No problems | PASS |
| Check | `npm run check` | Exit 0; 23 files, 626 tests | PASS |
| Taxonomy | `npm run test:taxonomy` | Exit 0; 1046 links; UX & UI Fundamentals 21 topics, 16 published, 5 addressed within (76.2%) | PASS |
| Generated docs | `npm run docs:generate` | Exit 0; no changes to any generated file (counts unchanged) | PASS |
| Build | `npm run build` | Exit 0; 998/998 | PASS |
| Entry review | `BASE_URL=http://localhost:3100 AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs human-computer-interaction` | 8/8: 1440/768/390 px, light and dark, axe 0, overflow 0, errors 0; 35 links resolve, no raw markup (no citation token in the vocabulary); flashcards 8/8 | PASS |
| `sources:verify` | Not run | No source added or changed | NOT RUN (no new or changed source) |
| `ux-maturity` entry review | Not run | Entry unchanged (D1-5 bounded search found no readable source) | NOT RUN (unchanged) |
| Bounded source checks | ACM DL PDFs for `van-dam-1997`, `forlizzi-battarbee-2004`; OpenAlex OA search for maturity-model evaluations; `forms.nngroup.com/s3/Maturity-Quiz` | 403; nothing open on point (Lacerda & Gresse von Wangenheim not OA); TLS certificate failure | Recorded in D1-4, D1-5, D1-6 |

Limitations: only HCI was re-reviewed in the browser; this is not a full re-audit of all 16 Domain 1 entries. PR #4 edits the same HCI lines; resolve in PR #4's favour when it merges.

### Domain 2 Batch 7 — Power Law of Practice (2026-11-24, branch `claude/domain-completion-20261123`, base `08ba3c2`)

Change set: new entry `content/knowledge/laws-effects/power-law-of-practice.ts` (published; `law`, `laws-effects/performance-laws`; evidence `contested`; formula record with worked example); 7 source records in `content/sources/cognition-hci.ts`; **shared code:** `lib/formulas/experience.ts` (`practicePower`, `practiceExponential`, `practiceDelayedExponential`, `practiceCurve`, `meanCurve`) with tests in `lib/formulas/formulas.test.ts`; Level-1 plate `powerLawOfPracticePlate` in `learning-sheets.tsx` (registered via `laws-psychology.tsx`); Level-2 figure `components/visual-explanations/concepts/power-law-of-practice.tsx` registered in `registry.tsx` with a quick takeaway; register record; back-link in `keystroke-level-model.ts`; one stale count in `tests/browser/e2e-redesign.cjs` (detailed-diagram filter 30 → 31, because this batch adds a Level-2 figure); regenerated index, `verification.json` and generated docs. No draft modified. Commit SHA: the commit that adds this section.

Change impact: `lib/**` changed, so every browser suite was run on the final build (skill § 4).

| Check | Command | Result | Status |
|---|---|---|---|
| Source verification | `npm run sources:verify -- newell-rosenbloom-1980 crossman-1959 heathcote-brown-mewhort-2000 evans-et-al-2018 weeks-et-al-2026 anderson-1982 logan-1988` | 6 `doi-verified`, 1 `url-reachable` (technical report, no DOI) | PASS |
| Formula unit tests | `npx vitest run lib/formulas/formulas.test.ts` | 64/64, including worked example T(1, 4, 9, 36) = 14, 8, 6, 4 s; asymptote never reached; log(T − A) vs log(N + E) slope −α; delayed exponential = exponential at τ = 0; averaging | PASS |
| Content index | `npm run content:index` | Entry indexed | PASS |
| Entry integrity | `npx tsx scripts/entry-integrity.ts power-law-of-practice flexibility-and-efficiency-of-use` | Exit 0 after plate and figure were registered (first run: plate register false, before the plate existed); 1 Level-2 figure; 8 outgoing, 2 incoming relations | PASS |
| Check | `npm run check` (final tree) | Exit 0; 23 files, 634 tests | PASS |
| Taxonomy | `npm run test:taxonomy` | Exit 0; 1055 links; 120 published at three depths; Domain 2: 46 topics, 19 published, 10 addressed within | PASS |
| Generated docs | `npm run docs:generate` (final tree) | Exit 0; site 120/561 published | PASS |
| Plate render | `NODE_PATH=$(npm root -g) npx tsx scripts/render-plates.tsx power-law-of-practice` | First render: marker 1 on the curve, '6 s' over the curve; moved; re-rendered light and dark: no overlap; values from `practicePower` formatted to one decimal | PASS (after fix) |
| Level-2 figure | Scratch Playwright screenshots of the figure in `/library/power-law-of-practice` at 390 light and 1440 dark | First version: 'time' and 'trials →' labels overlapped curves; moved outside the axes and rebuilt. Note: one re-check ran against a stale server still bound to port 3100 (EADDRINUSE for the new one); all `next start` processes were killed and the checks repeated on the final build (served SVG viewBox 360×430 confirmed). Final: no overlap, no text outside the viewBox, smallest text 14 units ≈ 12.6 px at 390 px; curves distinguished by line style and legend, not colour | PASS (after fix) |
| Build | `npm run build` (final source) | Exit 0; 999/999 | PASS |
| Entry review | `BASE_URL=http://localhost:3100 AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs power-law-of-practice keystroke-level-model flexibility-and-efficiency-of-use` (final build) | 24/24; power-law-of-practice: 1440/768/390 px, light and dark, axe 0, overflow 0, errors 0, plate text min 10.2 px at 390, 4 markers inside, 12 links, flashcards 5/5 | PASS |
| e2e | `node tests/browser/e2e.cjs` | 44/44 | PASS |
| e2e-redesign | `node tests/browser/e2e-redesign.cjs` | 65/66 after updating the detailed-diagram count (30 → 31) for the new Level-2 figure. Remaining FAIL 'library grid shows the first page of 24 cards, each with a plate' (23): `anchoring-effect` (drafted) is listed without a plate because plates are built only for published entries — pre-existing since the drafts were committed, not caused by this batch (LIB-1). The script exits 0 despite a FAIL line. | FAIL (pre-existing, LIB-1) |
| Atlas | `node tests/browser/atlas.cjs` | 36/36 | PASS |
| Keyboard | `node tests/browser/keyboard.cjs` | 45/45 | PASS |
| Colour Studio | `node tests/browser/colour-studio.cjs` | 46/46 | PASS |
| Devices | `node tests/browser/devices.cjs` | 155/155 | PASS |
| Crawl | `node tests/browser/crawl.cjs` on 12 routes (`/`, `/library`, `/learn`, `/glossary`, `/topics/laws-effects`, `/coverage`, the new entry, Fitts, KLM, flexibility, steering, Hick-Hyman) | 0 pages with problems | PASS |
| a11y | `node tests/browser/a11y.cjs` on the same 12 routes, light and dark | 0 violations | PASS |

Review (five dimensions): 0 critical, 0 major. Moderate fixed: Crossman's mechanism worded as in the abstract ('a kind of selective action'); plate marker and label positions; Level-2 axis labels. Brief correction recorded: the optional Snoddy reassessment is by Stratton et al. (2007), not used. Minor: PP-1; pre-existing: LIB-1.

Limitations: no screen-reader, physical-device or independent expert review; four sources abstract only; Vercel preview not checked.

### Domain 2 Batch 8 — Weber's Law (2026-11-24, branch `claude/domain-completion-20261123`, base `9d39a9f`)

Change set: new entry `content/knowledge/laws-effects/webers-law.ts` (authored `drafted`, set to `published` after the gates below; `law`, `laws-effects/performance-laws`; evidence `original-empirical`; formula record with worked example); 4 source records in `content/sources/cognition-hci.ts`; **shared code:** new `lib/formulas/psychophysics.ts` (`weberThreshold`, `weberFraction`, `generalisedWeberThreshold`, `psychometricNormal`, `intensityAtCriterion`, `differenceThreshold`) with tests in `lib/formulas/formulas.test.ts`; Level-1 plate `webersLawPlate` in `learning-sheets.tsx` (registered via `laws-psychology.tsx`); Level-2 figure `components/visual-explanations/concepts/webers-law.tsx` registered in `registry.tsx` with a quick takeaway; register record; back-links in `colour-contrast-ratio.ts` and `feedback-principle.ts`; wording correction in `modular-type-scale.ts` (removed "Weber–Fechner-type psychophysics"; links Weber's law); one stale count in `tests/browser/e2e-redesign.cjs` (detailed-diagram filter 31 → 32, because this batch adds a Level-2 figure); regenerated index, `verification.json` and generated docs. No draft modified. Commit SHA: the commit that adds this section.

Change impact: `lib/**` changed, so every browser suite was run on the final build (skill § 4).

| Check | Command | Result | Status |
|---|---|---|---|
| Source verification | `npm run sources:verify -- weber-1834 algom-2021 haigh-apthorp-bizo-2021 penconek-2025` | 3 `doi-verified` (Algom; Haigh et al., Crossref year 2020 = online date, issue 2021, within tolerance; Penconek), 1 `url-reachable` (Weber 1834: its DOI is a DataCite DOI, which the Crossref-only verifier cannot check; stored as a doi.org URL; DataCite record checked by hand: title, creator, 1834, publisher) | PASS |
| Formula unit tests | `npx vitest run lib/formulas/formulas.test.ts` | 69/69, including worked example ΔI(100) = 2, ΔI(500) = 10 with k = 0.02; constant fraction in the ideal form; generalised fraction 0.12 at 10 and 0.022 at 500; psychometric 50 %/75 % points and threshold 0.6745σ; invalid input rejected | PASS |
| Content index | `npm run content:index` | Entry indexed | PASS |
| Entry integrity | `npx tsx scripts/entry-integrity.ts webers-law modular-type-scale colour-contrast-ratio feedback-principle` | webers-law: no problems; 8 outgoing, 3 incoming relations; 1 Level-2 figure; plate register true. One reported problem is pre-existing and accepted: `colour-contrast-ratio` `referencedNotCited: webaim` (further reading, uncited by design; precedent 2026-11-20); this batch only added a relation there | PASS |
| Check | `npm run check` (final tree) | First run: lint error `react/no-unescaped-entities` (apostrophe in the figure legend); fixed. Final: exit 0; 23 files, 641 tests | PASS (after fix) |
| Visual tests while drafted | `npx vitest run tests/visuals.test.ts` | Expected single FAIL 'explains only published entries' while the entry was `drafted`; passes after publishing (in the check above) | — |
| Taxonomy | `npm run test:taxonomy` | Exit 0; 1065 links; 121 published at three depths; Domain 2: 46 topics, 20 published, 10 addressed within | PASS |
| Generated docs | `npm run docs:generate` (final tree) | Exit 0; Domain 2: 13 planned, 3 drafted, 20 published, 10 addressed within | PASS |
| Plate render | `NODE_PATH=$(npm root -g) npx tsx scripts/render-plates.tsx webers-law` | First render: the line crossed the 'ΔI = 2 at I = 100' label and marker 1 sat on it; y-scale steepened, label moved below the line, marker moved; re-rendered light and dark: no overlap; values from `weberThreshold` / `weberFraction` | PASS (after fix) |
| Level-2 figure | Scratch Playwright screenshots of the figure in `/library/webers-law` at 390 light and 1440 dark | First version: 'Comparison 94–106' overflowed its box at both widths; box widened and rebuilt (served SVG confirmed to contain the new 154-unit box). Final: no overlap, no text outside the viewBox, smallest text 13.5 px at 390 px (≥ 12); series distinguished by dashed vs solid line and legend, threshold by an accent bar plus a text label, not colour alone; same rendered width as the Power Law figure at 1440 (layout, not this figure) | PASS (after fix) |
| Build | `npm run build` (final source) | Exit 0; 1000/1000 static pages | PASS |
| Entry review | `BASE_URL=http://localhost:3100 AXE_PATH=node_modules/axe-core/axe.min.js node tests/browser/entry-review.cjs webers-law modular-type-scale colour-contrast-ratio feedback-principle power-law-of-practice` (final build) | 40/40; webers-law at 1440/768/390 px, light and dark: axe 0, overflow 0, errors 0, plate markers inside the viewBox, internal links resolve, flashcards added by keyboard | PASS |
| e2e | `node tests/browser/e2e.cjs` | 44/44 | PASS |
| e2e-redesign | `node tests/browser/e2e-redesign.cjs` | 65/66 after updating the detailed-diagram count (31 → 32), which passes. Remaining FAIL 'library grid shows the first page of 24 cards, each with a plate' (23) is LIB-1, pre-existing and unchanged | FAIL (pre-existing, LIB-1) |
| Atlas | `node tests/browser/atlas.cjs` | 36/36 | PASS |
| Keyboard | `node tests/browser/keyboard.cjs` | 45/45 | PASS |
| Colour Studio | `node tests/browser/colour-studio.cjs` | 46/46 | PASS |
| Devices | `node tests/browser/devices.cjs` | 155/155 | PASS |
| Crawl | `node tests/browser/crawl.cjs` on 12 routes (`/`, `/library`, `/learn`, `/glossary`, `/topics/laws-effects`, `/coverage`, the new entry, its formula page, modular-type-scale, colour-contrast-ratio, feedback-principle, power-law-of-practice) | 0 pages with problems | PASS |
| a11y | `node tests/browser/a11y.cjs` on the same 12 routes, light and dark | 0 violations | PASS |

Review (one targeted pass against the sources) found 0 critical and 0 major issues. Six moderate issues were fixed:
- A sentence on criteria in the figure summary was wrongly attributed to Haigh et al.
- Fechner's additional assumption was paraphrased loosely; it now follows Penconek's wording.
- "Through the twentieth century" was imprecise, because the cited studies date from 1865; it now reads "from the nineteenth century onwards".
- The Getty and Killeen–Weiss models were described more precisely.
- An unsupported biographical description of Weber was removed.
- A money analogy invited the very misuse the entry warns against, so it was replaced with a physical one (candles).

Minor: WL-1. Pre-existing: LIB-1.

Limitations: no screen-reader, physical-device or independent expert review; Weber (1834) not read and Algom (2021) abstract only; Vercel preview not checked.
