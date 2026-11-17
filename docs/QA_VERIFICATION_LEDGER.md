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
