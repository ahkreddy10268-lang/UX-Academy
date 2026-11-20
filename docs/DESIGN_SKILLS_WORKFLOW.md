# Design skills workflow

How to use the third-party design and frontend skills installed for Claude Code in this project (2026-11-20). These skills are tools for future interface work; none has been applied to the site yet. **Using them on the interface needs the owner's approval.**

## Precedence when instructions conflict

1. UX Academy's own rules: `CLAUDE.md`, `docs/DESIGN_SYSTEM.md` (v4 Monochrome Editorial Workspace, tokens only in `app/globals.css`), `docs/ILLUSTRATION_SYSTEM.md`, `docs/INTERACTION_AND_MOTION_GUIDELINES.md`, and the decision log.
2. Accessibility and usability (WCAG 2.2 AA, 24 px targets, keyboard, reduced motion).
3. Consistency with the existing visual system.
4. A skill's own preferences (palettes, fonts, styles, motion, image use).

A skill's suggestion that breaks rule 1 is not applied. For example, `ui-ux-pro-max` palettes and font pairings, `unslop` direction changes and `oil-ui` style explorations do not replace the v4 tokens, Plex/Newsreader type or the "no decorative gradients, no glassmorphism" rules.

## Installed skills

All are project-local in `.claude/skills/<name>/`, installed with the official `npx skills add` CLI in copy mode. `skills-lock.json` records each source commit and hash; `npx skills update -p` updates them, `npx skills experimental_install` restores them.

| Skill | Source | Role here | How it runs |
|---|---|---|---|
| `frontend-design` | Already in the environment (`/mnt/skills/public/frontend-design`, also as the `frontend-design` plugin); not installed by this task | Design direction for new pages or components | Automatic or `/frontend-design` |
| `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | Searchable reference data: UX guidelines, chart types, stack notes (Next.js, React) | Automatic; local search `python3 .claude/skills/ui-ux-pro-max/scripts/search.py` |
| `better-ui` | jakubkrehel/skills | Surface and icon polish: radii, optical alignment, shadows, icon states | Automatic or `/better-ui` |
| `better-layout` | jakubkrehel/skills | Grouping, alignment, reading order, responsive structure | Automatic or `/better-layout` |
| `better-accessibility` | jakubkrehel/skills | Keyboard, focus, ARIA, names, forms, announcements, motion and zoom against WCAG 2.2 | Automatic or `/better-accessibility` |
| `web-design-guidelines` | vercel-labs/agent-skills | Rule-based review of UI code, `file:line` findings | Automatic or `/web-design-guidelines <files>`; fetches its rules from raw.githubusercontent.com on each run |
| `oil-ui` | oil-oil/oil-ui | Screenshot-based visual and UX review of a real page; direction exploration only when asked | Automatic or `/oil-ui` |
| `interface-review` | jakubkrehel/skills | Reviews a branch, PR or uncommitted change for interface regressions | **Manual only** (`disable-model-invocation`): `/interface-review` |
| `unslop` | heydamir/unslop | Targeted removal of generic "AI-looking" details on one screen | Automatic or `/unslop` |

## Which skill for which task

Invoke only what the task needs. A typical task uses one or two.

| Task | Use | Do not use |
|---|---|---|
| New page or component | `frontend-design` for direction, then `better-layout`; check `ui-ux-pro-max` data only for a specific question (a chart type, a stack rule) | `unslop`, `oil-ui` explorations |
| Polishing an existing component | `better-ui` (surfaces, icons) or `better-layout` (structure) | A full redesign skill |
| Accessibility change or check | `better-accessibility`; `web-design-guidelines` as a second, rule-based pass on the changed files | Visual skills |
| Visual check of a rendered page | `oil-ui` (review only), then fix with `better-ui` or `better-layout` | `unslop` for whole-site restyles |
| A screen that looks generic | `unslop`, limited to the named screen and to details (spacing, labels, icons, copy); one pass | Repeated full redesigns |
| Before committing UI work | `/interface-review` on the uncommitted change, alongside the project's own tests (`tests/browser/keyboard.cjs`, `devices.cjs`, axe) | — |

Skills do not replace the project's checks: `npm run check`, `npm run build`, `tests/tokens.test.ts` (contrast), the browser suites and the QA ledger still decide whether a change is done.

## Overlaps and known conflicts

- **Design direction:** `frontend-design`, `ui-ux-pro-max`, `oil-ui` and `unslop` all propose directions. Pick one per task. The v4 system already sets the direction, so for most work none of them should choose colours, fonts or styles.
- **Accessibility:** `better-accessibility`, `web-design-guidelines` and skills already in the environment (for example `ui-consistency:accessibility`, `design:accessibility-review`) overlap. Use `better-accessibility` as the primary one.
- **Review:** `interface-review`, `oil-ui` review mode, `/code-review` and `design-skills:design-critique` overlap. Use `interface-review` for diffs, `oil-ui` for rendered pages.
- **Broad triggers:** `ui-ux-pro-max` and `oil-ui` describe themselves for almost any UI request, so they may load unasked. Their output is advisory under the precedence above.
- **Network and credits:**
  - `oil-ui` pre-approves its own update check (`scripts/check_update.py`, contacts ui.oiloil.org) and has a paid image helper (`scripts/oiloil-image.mjs`, api.oiloil.org, uses Oil credits).
  - `unslop` can use a host image tool.
  - **No image generation or credit use without the owner's explicit approval.**
- **Dependencies:** none were added to the app.
  - `ui-ux-pro-max` scripts use the Python 3 standard library.
  - The `oil-ui` and `unslop` scripts use Node built-ins; screenshots need a local Chromium, which is pre-installed in this environment.
  - `.claude/**` is excluded from ESLint (`eslint.config.mjs`) so vendored skill code is not linted as app code.
