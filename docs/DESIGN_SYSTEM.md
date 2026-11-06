# Design system — v3 "Pastel Editorial Workspace"

_v3, 2026-11-03. Supersedes the v1 "rubric" system and the v2 additions. History is in DECISION_LOG D-014 → D-017 → D-026…D-033._

**Direction:** a calm productivity workspace (sidebar, toolbar, one rounded frame, white panels on a cool canvas), combined with a visual encyclopedia (pastel subject fields, explanatory plates) and an editorial reading voice (Newsreader for concept titles and long-form text). The interface should feel like a well-designed tool you study in, not a magazine you scroll.

**Why the change from v2:** v2 was a publication. The academy is used for long, repeated sessions: you move between Library, Labs and My Learning dozens of times. A persistent sidebar and a stable app frame reduce re-orientation costs. Pastel fields make twenty subjects identifiable at a glance without loud colour. The editorial serif survives where reading happens, which keeps the academic voice where it matters.

## Tokens (`app/globals.css` — the only place values live; tests/tokens.test.ts gates contrast)

### Neutrals and action

| Token | Light | Dark | Role |
|---|---|---|---|
| `paper` | #f3f6fa | #10131a | canvas behind the app frame |
| `surface` | #ffffff | #171b24 | workspace frame, cards, inputs |
| `soft` | #f8fafc | #1c212b | quiet panels inside the workspace (TOC, side panels, readouts) |
| `sunken` | #ecf0f5 | #0c0f15 | wells: formulas, tracks, segmented controls |
| `ink` | #1f2532 | #e6e9f0 | primary text — ≥12.3:1 / ≥10.2:1 on every surface and wash |
| `ink-2` | #475266 | #b3bbc9 | secondary text — ≥6.3:1 / ≥6.4:1 |
| `ink-3` | #5a6476 | #99a2b3 | muted/meta — ≥4.8:1 on every surface **and every pastel wash** |
| `rule` / `rule-strong` | #e4e9f0 / #cfd7e2 | #262c38 / #353d4c | decorative hairlines only |
| `line-control` | #7c879a | #737d90 | form-control borders, ≥3:1 on base surfaces (WCAG 1.4.11) |
| `accent` | #4c5ead | #99a5ec | action: primary buttons, active nav, selection — ≥4.8:1 |
| `accent-ink` | #3d4e99 | #bac3f6 | link text, hover — ≥6.1:1 |
| `accent-wash` | #e7ebf8 | #232a45 | selected/active backgrounds |
| `rubric` | #a33320 | #e8826b | heritage editorial red: knowledge-type labels, A–Z letters (no longer the logo) |
| `ok` `warn` `info` `error` (+ `-wash`) | | | status, always with a text label |
| `evidence` / `evidence-wash` | #36446a | #b7c3e3 | evidence glyphs, the ledger's current class (v4, D-038) |
| `planned` / `planned-line` | #5a6476 / #9aa3b3 | #99a2b3 / #525b6c | planned-topic text and dashed outlines |
| `published` | #2e6a4c | #7fc4a0 | publication status |

The brief proposed `text-muted #8893A3` and `text-secondary #657184`. Both failed: #8893A3 is 3.11:1 on white, and #657184 is 4.37:1 on sunken and ~4.0–4.4 on the pastel washes. The values above are the nearest tones that pass everywhere. Primary buttons use `bg-accent text-surface`, which gives white text in light mode and dark text on the light accent in dark mode, ≥5.98:1 in both.

### Subject palettes (identity and illustration only — never evidence, status or body text)

Each family has a solid `base` (plates), an `ink` (text and lines on its wash) and a pastel `wash` (fields). Light washes are explicit tokens; dark washes are `color-mix(base 16%, surface)`, so dark mode gets deep tinted fields rather than inverted pastels.

| Family | Wash (L) | Ink (L) | Ink on wash L / D |
|---|---|---|---|
| core | #f7e7e2 | #8a2d1c | 7.07 / 6.90 |
| rose | #f6e2e6 | #8e2a43 | 6.61 / 7.88 |
| violet | #eae3fb | #4f3591 | 7.50 / 7.95 |
| teal | #ddf1e8 | #16584c | 7.03 / 8.38 |
| blue | #dfeafb | #2c4594 | 7.25 / 8.09 |
| amber | #faf0d9 | #74500a | 6.40 / 8.70 |
| green | #e8f0e0 | #355c29 | 6.62 / 8.80 |
| peach | #fbe9dc | #8a431a | 6.14 / 8.44 |
| cyan | #e0f0f4 | #185766 | 6.92 / 8.71 |
| indigo | #e9eaf8 | #363380 | 9.06 / 8.08 |
| slate | #e1f0ec | #30554f | 7.04 / 8.73 |

`.cat-<family>` exposes `--c --c-ink --c-wash --c-soft` (soft = 34% base into surface). Utilities: `bg-c-wash`, `text-c-ink`, `bg-c`, `fill-c-…`.

### Shape and elevation

- **Radii:** `xs 6` chips, badges and small wells · `sm 10` inputs and buttons · `md 12` cards · `lg 16` panels · `xl 20` feature panels and explorers · `2xl 24` the app frame and heroes. Pills use `rounded-full`.
- **Shadows** (soft, low contrast): `shadow-card` resting cards · `shadow-hover` hovered cards (with a border change; there is never a transform, see D-023) · `shadow-raise` floating art and heroes · `shadow-dialog` dialogs, drawers and search.
- **Recipes:** `.panel` (white, hairline, `lg`, card shadow) · `.panel-soft` · `.card` (hover recipe built in) · `.chip` (pill; `aria-pressed=true` gives the selected state) · `.bg-hero` · `.bg-feature`.
- **Selective gradient:** `--grad-hero` (violet → blue → teal washes) is used only on the homepage hero. `.bg-feature` (subject wash → surface) is used only on featured panels: the featured concept, featured cards and the lab call-out. Gradients are never used for text, buttons or data.
- **Layout:** sidebar 248 / 76px; topbar 68px; workspace frame inset 16px and `2xl`-rounded on ≥1024px; `max-w-page` 80rem inside it. Concept pages use a 46rem article column with a 15rem sticky TOC. Prose is capped at 70ch.

### Typography

| Role | Class | Family |
|---|---|---|
| Hero (home) | `.t-hero` | Plex Sans 600, −0.028em; its accent phrase is `.t-editorial` italic |
| Page title (workspace pages) | `.t-page` | Plex Sans 600, −0.022em |
| Section / sub | `.t-section` `.t-sub` | Plex Sans 600 |
| Editorial titles (concepts, lessons, planned topics, featured concept, evidence ledger) | `.t-editorial` | Newsreader 500, opsz 60 |
| Quotes, analogies | `.t-quote` | Newsreader italic |
| Lede | `.t-lede` (sans) / `.t-lede-serif` (concept and lesson heroes) | |
| Long-form reading | `.prose-read` | Newsreader 18/28, max 70ch |
| Labels | `.label` | Plex Sans 12/600, +0.06em uppercase — the only uppercase |
| Formulas, data | `.formula` `.tabular` | Plex Mono / tabular figures |

**Why:** Plex Sans headings make the workspace feel like a tool. They are compact, legible at 13–16px in navigation, and engineered in character. Newsreader is kept where the reader shifts into study mode, so the contrast between the two fonts marks "you are now reading". The risk is that two voices could look inconsistent. The mitigation is that each page family uses exactly one title voice (see PAGE_TEMPLATES.md).

### Iconography

`components/shell/icons.tsx` contains one family of 30 glyphs drawn for this product. They sit on a 20×20 grid with a 1.5 stroke and round caps and joins, and have no fills except small dots. Each glyph names an activity, not a brand: a rising path for Learn, volumes for the Library, a flask for Labs, a target for Practice, nodes for the Graph, an open book for the Glossary, a progress ring with a tick for My Learning (deliberately not a person), and a balance for Method. Icons are decorative (`aria-hidden`), and the adjacent text carries the meaning. In the collapsed sidebar the text stays in the accessibility tree and also appears as a tooltip.

## Components (by responsibility)

| Component | File | Notes |
|---|---|---|
| Sidebar, mobile drawer, wordmark | `components/shell/sidebar.tsx` | Grouped nav (Overview · Learn · Experiment · Explore · Personal · More). Collapse persists in `ux-academy:sidebar`, applied before paint by the inline script. Collapsed state: labels are visually hidden but stay accessible, with tooltips on hover/focus. The drawer is a native modal `<dialog>` |
| Topbar | `components/shell/topbar.tsx` | Search field (⌘K / "/"), theme (Auto → Light → Dark), My Learning |
| Page header | `components/ui/layout.tsx` | Quiet workspace title, or a pastel panel with `cat`; `editorial` switches the title to Newsreader |
| Callout | `components/ui/callout.tsx` | Nine roles: definition, analogy, example, note, formula, application, research, limitation, misconception. Each has a pastel field + glyph + written label. Use for moments, not paragraphs |
| Knowledge card | `components/knowledge/knowledge-card.tsx` | Eight variants chosen by `variantFor` (classification decides presentation): standard, featured, formula, research, framework, lab, compact, planned |
| Category tile | same | Pastel tile with an inset plate and real published/planned counts |
| Path card | `components/learn/path-card.tsx` | Level pills, objectives and entry requirements (`detail="full"`), real counts; reading time is marked as an estimate |
| Learning panel | `components/home/learning-panel.tsx` | Home "continue": last concept, levels read, reading level, path progress, next lesson. Shows an honest empty state |
| Explorer shell | `components/illustrations/interactive/explorers.tsx` | Canvas · controls · live readout · optional comparison strip · predicts / assumptions / cannot show |
| Formula block | `components/entry/formula-block.tsx` | `layout="split"` on Formula Lab pages: specification left, sticky calculator workspace right |
| Lab workspace | `app/labs/[id]/page.tsx` | Lab left; side panel (kind of lab, assumptions, concepts) right |
| Marks | `components/ui/marks.tsx` | Type label in rubric; evidence glyph + text; status |

## States

Every interactive component defines: idle, hover (border + soft shadow), focus-visible (2px accent outline, 2px offset), pressed/selected (`aria-pressed` / `aria-current` → accent-wash + accent-ink, weight 600), disabled (60% opacity plus an explanatory label, e.g. "Choose a subject first"), loading (text), empty (says what to do), and error (says what went wrong and how to fix it).

## Avoid

Glassmorphism; gradients outside the hero and featured panels; decorative animation; icons without labels; nested rounded containers (pages render inside one frame and use flat sections, panels and cards, never a second page frame); subject colour on evidence, status or body text; fake data, avatars or achievements; numeric confidence scores.

## Logo (brand kit v0.1, draft)

Source of truth: `brand/uxa-logo-kit-v0.1-draft/` (SVG symbol, lockup and wordmark in gradient, black and white; small and XS cuts; favicon and app icons; React component and path data; README with the rules). The kit is marked **draft, pending approval of the reconstructed master**; it is in use at the owner's request, and an approved version replaces the whole kit from its generator.

| Where | What | How |
|---|---|---|
| Sidebar and mobile top bar | The **gradient app icon** (36 px tile): light tile (#F2F2F2, dark gradient) in the light theme, dark tile (#0A0A0A, reversed gradient) in the dark theme, beside "UX Academy" in UI type | `<UxaAppIcon size={36} decorative />` (`components/brand/uxa-app-icon.tsx`, built from the kit's path and gradient data); both tones render and `.brand-only-light / -dark` in `app/globals.css` show the one for the current theme, including the manual switch; decorative because the visible name gives the accessible name |
| Browser tab | `app/icon.svg`: both gradient tiles in one SVG, switched by `prefers-color-scheme`; `app/favicon.ico` (16/32/48) rendered from the dark gradient tile | Next.js metadata file conventions |
| Home screen / install | `app/apple-icon.png`, `public/icons/icon-192/512.png`, maskable 512 | `app/manifest.webmanifest` |

Rules from the kit: module s = U stem width; clear space ½s on every side; black, white and greys only (no coloured gradients, no effects); black or the gradient on light, white or the reversed gradient on dark; never stretch, crop, rotate, recolour or redraw. Minimum sizes: gradient symbol 120 px, flat standard 96 px, small cut 40–95 px, XS 16–39 px; full lockup 200 px (gradient) or 140 px (flat); wordmark 100 px. The component applies cut and treatment from the rendered size. **Owner decision:** the brand icon is always the gradient app-icon tile; flat black or white versions are not used in the product. The tile carries the gradient legibly at 36 px and in the 16–48 px favicons because the dark or light field behind the mark supplies the contrast that the kit's 120 px minimum protects for the bare symbol.

Open points carried from the kit README: the symbol geometry and X diagonals await approval, the wordmark typeface is a stand-in (Manrope ExtraBold), and the kit's wordmark spells "UX-Academy" with a hyphen while the product name in the interface is "UX Academy". The product keeps "UX Academy" in text and in the manifest until the name is settled.

## Illustrations and diagrams

Knowledge figures follow the Visual Learning System (docs/ILLUSTRATION_SYSTEM.md § Visual Learning System, D-089): category × method × language. The instructional `sheet` canvas uses only the tokens above and follows the active theme; the `viz` canvas uses the theme-independent `--viz-*` tokens. Components never introduce their own colours.

