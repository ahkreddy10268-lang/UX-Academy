# UX Academy — project brief for Claude Design

A single file that describes UX Academy well enough to design on it live: what it is, how it is organised, the exact design tokens, the components, the page templates, the illustration system and the rules that keep it coherent. Every value here is copied from the code (`app/globals.css`, `components/`, `lib/content/`) as of 2026-11-18; **the code is the source of truth**. If a value here and the code disagree, the code wins.

- Repository: `github.com/ahkreddy10268-lang/UX-Academy`, working branch `claude/batch1-constraints`
- Branch preview (Vercel): `ux-academy-git-claude-batch1-constraints-ambati-re-dd.vercel.app`
- Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind v4. Local-first: no accounts, no backend; personal data lives in the browser.

---

## 1. What the product is

UX Academy is a personal, research-backed learning academy for the whole UX/UI discipline. It is a **knowledge ecosystem, not a blog**: every entry is classified, evidenced, connected to other entries and practised.

| Dimension | Today |
|---|---|
| Knowledge map | 20 domains, 73 subcategories, 561 topics (taxonomy frozen at v1.0) |
| Published entries | 102 (18 more topics are explained inside other entries) |
| Sources | 495, each with a verification status |
| Visual explanations | Every published entry has a plate (hero illustration); 28 concepts have a detailed Level-2 diagram; several have interactive explorers |
| Practice | Every entry has exercises, a quiz at three levels and flashcards |

**Audience:** designers learning or deepening UX/UI, from beginner to expert. **Voice:** clear, precise, natural, academically responsible; leads with the idea, shows the mechanism with a concrete case, says what is uncertain.

**Design direction (v4, "Monochrome Editorial Workspace"):** near-black ink on warm off-white paper; one blue accent for links, focus and selection only; eleven subject colours used only for identity (a dot, a thin rule, illustrations), never for meaning; restrained shadows; no decorative gradients, glassmorphism, decorative motion or icon clutter.

---

## 2. Information architecture

### App shell
Persistent **sidebar** (navigation groups) + **topbar** (search ⌘K, theme toggle, My Learning) + **one rounded workspace frame** (`radius 2xl = 18px`) that holds every page. Pages never draw their own outer frame. On phones the sidebar becomes a drawer.

### Navigation (sidebar groups, in order)

| Group | Items → route |
|---|---|
| Overview | Home `/` |
| Learn | Learn `/learn` · Knowledge Library `/library` · Guides `/guides` · AI UX Patterns `/ai` |
| Practise | Practice `/practice` · Labs `/labs` · Formula Lab `/formulas` |
| Reference | Design System `/system` · Resources `/sources` · Glossary `/glossary` · Comparisons `/compare` |
| Explore | Domains & Topics `/topics` · Graph `/graph` |
| Personal | My Learning `/me` |
| About | Coverage `/coverage` · Method `/method` |

### All routes
`/` · `/learn` · `/learn/[path]` · `/learn/[path]/level/[n]` · `/learn/[path]/lesson/[slug]` · `/library` · `/library/[slug]` · `/guides` · `/guides/[id]` · `/ai` · `/ai/[id]` · `/practice` · `/practice/quiz` · `/practice/flashcards` · `/practice/workshops/[id]` · `/labs` · `/labs/[id]` · `/formulas` · `/formulas/[id]` · `/system` · `/system/[section]/[id]` · `/sources` · `/glossary` · `/compare` · `/compare/[id]` · `/topics` · `/topics/[domain]` · `/graph` · `/me` · `/coverage` · `/method`

### Page families
- **Workspace** — tools and indexes (library, practice, labs, formula lab, my learning): dense, scannable, filters and cards.
- **Editorial** — reading pages (entries, guides, lessons): a reading column of max 70ch, a sticky "On this page" rail on desktop.
- **Experimental** — labs and explorers: a canvas plus controls, with a stated purpose and limits.

### The entry page (the core template, `/library/[slug]`)
Hero (title, type label, subject dot, summary, hero plate with figure key, "At a glance" takeaway) → **Definition** → **Visual explanation** (Level-2 figures, then a Level-3 explorer if any) → **Explanation at three depths** (beginner / intermediate / advanced tabs) → Formula & calculator (if any) → Method / Standard / Origin (if any) → **Application** and practical checklist → **Connections** (typed relations to other entries) → **Practice** (exercises, quiz, flashcards) → **Evidence & references** (evidence class, note, sources) → **My notes** (local).

---

## 3. Design tokens

All tokens live **only** in `app/globals.css` as CSS custom properties, exposed to Tailwind through `@theme inline`. Never hard-code colours, sizes or radii in components.

### 3.1 Colour — light theme (default)

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f4f3ef` | Canvas behind the app frame |
| `--surface` | `#fdfdfb` | Workspace, cards, panels, inputs |
| `--soft` | `#f8f7f3` | Quiet panels inside the workspace |
| `--sunken` | `#ecebe5` | Wells: formulas, code, tracks |
| `--ink` | `#15161b` | Primary text (≥ 12.3:1) |
| `--ink-2` | `#43454e` | Secondary text (≥ 6.3:1) |
| `--ink-3` | `#5a5c64` | Muted / metadata (≥ 4.8:1) |
| `--rule` | `#e4e2db` | Hairlines (decorative) |
| `--rule-strong` | `#cdcac1` | Emphasised dividers (decorative) |
| `--line-control` | `#7a7870` | Control borders, ≥ 3:1 (WCAG 1.4.11) |
| `--accent` | `#255a8c` | Links, focus, selection, active nav; white on it 5.98:1 |
| `--accent-ink` | `#1d4a74` | Link text, hover |
| `--accent-wash` | `#e5edf5` | Selected states, active nav background |
| `--rubric` | `#a33320` | Editorial heritage only: type labels, A–Z letters |
| `--focus` | `#255a8c` | Focus rings |

**Semantic status** (never use subject colours for these): `--ok #2e6a4c` / wash `#e2f1e8` · `--warn #7a5a14` / `#f8efd9` · `--info #36507f` / `#e3eaf6` · `--error #a4262c` / `#fbe8e8` · `--evidence #36446a` / `#e8ecf5` · `--planned #5a6476`, line `#9aa3b3` · `--published #2e6a4c`.

### 3.2 Colour — dark theme (designed, not inverted)

`--paper #0f1013` · `--surface #16171c` · `--soft #1b1c22` · `--sunken #0b0c0f` · `--ink #ecebe5` · `--ink-2 #bab9b2` · `--ink-3 #a09f98` · `--rule #25262d` · `--rule-strong #34353d` · `--line-control #77767d` · `--accent #8fb8e0` · `--accent-ink #b6d1ec` · `--accent-wash #18232f` · `--rubric #e8826b` · `--ok #7fc4a0` · `--warn #d9b460` · `--info #9db4e6` · `--error #f2a7a7` · `--evidence #b7c3e3` · `--planned #99a2b3` · `--focus #8fb8e0`.
The theme follows the system setting and can be forced with `data-theme="light" | "dark"` on `<html>`.

### 3.3 Subject palettes (identity only)

Eleven palettes, each with base / ink / wash. Used as a **dot** (`.subject-tag`), a **thin rule** on headers and callouts, and **inside illustrations** — never as whole panels, never for status, evidence or body text.

| Palette | Base | Ink | Wash (light) | Domains |
|---|---|---|---|---|
| core | `#c2553f` | `#8a2d1c` | `#f7e7e2` | Foundations |
| rose | `#d6637a` | `#8e2a43` | `#f6e2e6` | UX laws & effects, Heuristics |
| violet | `#8b6bc6` | `#4f3591` | `#eae3fb` | Psychology & cognition |
| teal | `#2f9a86` | `#16584c` | `#ddf1e8` | Research methods |
| blue | `#5a76d4` | `#2c4594` | `#dfeafb` | Metrics & formulas, Data visualisation |
| amber | `#d39526` | `#74500a` | `#faf0d9` | Frameworks, Content |
| green | `#6a9e55` | `#355c29` | `#e8f0e0` | Accessibility, Ethics |
| peach | `#de8550` | `#8a431a` | `#fbe9dc` | Visual design, Type & colour, Design systems |
| cyan | `#3a9fb9` | `#185766` | `#e0f0f4` | Information architecture, Interaction |
| indigo | `#5f5aae` | `#363380` | `#e9eaf8` | Product, Emerging |
| slate | `#5d8c86` | `#30554f` | `#e1f0ec` | Service design, Design practice |

In the dark theme the bases lighten (e.g. core `#e8826b`, teal `#5cc4ae`, blue `#8ea4ef`) and washes are mixed 16 % into the surface. Apply with a `.cat-<palette>` class, which sets `--c`, `--c-ink`, `--c-wash`, `--c-soft`.

### 3.4 Typography

| Family | Font | Use |
|---|---|---|
| Sans | IBM Plex Sans (`--font-plex-sans`) | Every title (weight 600) and all UI text |
| Mono | IBM Plex Mono (`--font-plex-mono`) | Labels and metadata (uppercase), formulas, numerals in figures |
| Serif | Newsreader (`--font-newsreader`) | Long-form reading (`.prose-read`, max 70ch) and quotes only |

**Scale** (`rem` / px / line height): `2xs` 0.75 / 12 / 16 (labels only) · `xs` 0.8125 / 13 / 20 · `sm` 0.875 / 14 / 22 · `base` 1 / 16 / 24 (UI) · `read` 1.125 / 18 / 28 (reading) · `lg` 1.25 / 20 / 28 · `xl` 1.333 / 21 / 30 · `2xl` 1.777 / 28 / 36 · `3xl` 2.369 / 38 / 44 · `4xl` 3.157 / 51 / 54. Display sizes follow a perfect fourth (1.333).

**Title classes:** `.t-hero` (−0.034em, lh 1.04) · `.t-page` (−0.026em, lh 1.1) · `.t-section` (−0.014em, lh 1.2) · `.t-sub` (−0.005em, lh 1.3) · `.t-editorial` (−0.03em, lh 1.06) · `.t-quote` (Newsreader italic, lh 1.45). **`.label`**: Plex Mono, 12px, uppercase, letter-spacing 0.08em, weight 500, `--ink-3`. **`.formula`**: Plex Mono with slashed zero. Reading measure `--container-read: 42rem` (≈ 68ch at 18px).

### 3.5 Shape, elevation, motion

- **Radii:** xs 4 (chips, badges) · sm 6 (inputs, buttons) · md 8 (cards) · lg 12 (panels) · xl 14 (feature panels) · 2xl 18 (the app frame).
- **Shadows (light):** card `0 1px 2px rgb(21 22 27 / .05)` · hover `0 2px 4px / .09` · raise `0 1px 2px /.05, 0 10px 28px /.08` · dialog `0 4px 12px /.08, 0 24px 64px /.18`. Hover darkens the border; **never** a transform.
- **Motion:** durations 120 / 220 / 420 ms; easing standard `cubic-bezier(0.2, 0, 0, 1)`, out `cubic-bezier(0.16, 1, 0.3, 1)`. Motion only to teach or confirm; every animation is off under `prefers-reduced-motion`, pausable, and its first frame is complete. No scroll effects, parallax or moving hit targets.

---

## 4. Components

| Component | Spec |
|---|---|
| **Buttons** `.btn` | Height 40, padding-inline 16, radius sm, Plex Sans 600 14px, focus ring 2px `--focus` offset 2. Variants: `btn-primary` (ink fill, surface text), `btn-secondary` (surface, `--line-control` border), `btn-tertiary` (sunken), `btn-text` (underlined link-style), `btn-icon` (square 40 / 32). Sizes `btn-sm` (32) and `btn-lg` (48). Toggle state via `aria-pressed`; busy via `aria-busy` (spinner). Never style a button from raw utilities. |
| **Inputs** `.field` | Min height 40, padding 8/12, radius sm, 1px `--line-control` border, 14px; hover border `--ink-3`; focus ring 2px; `aria-invalid` → `--error` border. With `.field-label` (14px 600) and `.field-hint` (13px `--ink-3`). |
| **Card** `.card` | Surface, 1px `--rule`, radius md, `shadow-card`; hover border `--ink-3` + `shadow-hover`. Variant chosen from the entry's classification. |
| **Panel** `.panel` | Surface, 1px `--rule`, radius lg. |
| **Subject tag** `.subject-tag` | A coloured dot plus the subject name — the only place subject colour appears in UI chrome. |
| **Callout** | Marks a moment (definition, warning, evidence note), not every paragraph; thin subject or status rule on the left. |
| **Link** `.link` | `--accent-ink`, 1px underline at 45 % accent, 2px on hover. |
| **Doc layout** | `DocLayout`, `DocSection`, `DoDont`, `DefinitionTable`, `Checklist`, `PrevNext` for reference pages (`/system`, `/ai`, `/guides`). |
| **Icons** | One family (20px grid, 1.5 stroke), always beside a text label or with an accessible name. |
| **Logo** | The gradient app icon only (light tile in light theme, dark tile in dark); never stretched, recoloured or redrawn. The logo kit is a draft v0.1 pending approval. |
| **Targets** | `.tap` gives a 24px minimum target (WCAG 2.5.8). |

---

## 5. Illustration and diagram system

### Plates (Level 1, every entry)
- Original explanatory diagrams of the mechanism, drawn in a **400 × 300 SVG viewBox**, colour only from tokens, with an accessible title and description and an HTML **figure key** for explanations.
- Two canvases: **sheet** (instructional, theme-aware: anatomy, measurement, comparison) and **viz** (dark technical, `--viz-*` tokens: processes and systems). Viz palette: bg `#0b0d0f`, surfaces `#111518`/`#191e22`/`#22282d`, edges `#424b52`, text `#f2f3f4`/`#a7afb5`, accent `#ff8a3d`, positive `#6fd29a`.
- Text: interface copy ≥ 13 units (`T.min`, ≈ 10px on a 390px phone); labels and marker numerals 16 units (`T.marker`). No microtext in the drawing; no text on isometric planes.
- **Numbered markers:** circles of radius 11 with a numeral; always wholly inside the viewBox (the marker primitive clamps the centre 12 units from every edge). Explanations for each number go in the figure key.
- Meaning never by colour alone; no stick figures; believable interfaces; numbers drawn come from `lib/formulas`.

### Detailed figures (Level 2, 28 concepts)
A framed figure: header (visual type, level, title, objective) → the figure (HTML/CSS text with token-coloured shapes; stacks on narrow screens) → "Take away" line → "Read this diagram as text" (an ordered reading of the figure) → "Based on" sources. Labels stay ≥ 12px at every width.

### Explorers and labs (Level 3)
Canvas plus labelled sliders and controls; compute only with `lib/formulas`; say whether it is a simulation or an experiment; state assumptions and limits; labels stay inside the canvas at every slider value.

---

## 6. Accessibility floor

Semantic HTML; visible focus on everything interactive; full keyboard reach; WCAG 2.2 AA contrast (token pairs are tested); 24px minimum targets; text alternatives for every plate, chart and graph; grids use `minmax(0,1fr)` tracks so nothing overflows on a 390px phone; no colour-only meaning. Verified with axe-core (0 violations), keyboard and device-emulation suites. Not yet verified with screen readers or physical devices.

---

## 7. Content model (what the designs display)

Each **entry** has: id/slug, title, alternate names, summary, definition, primary type (concept, principle, law, method, pattern, framework, metric, standard…), domain and subcategory, tags, difficulty, learning objectives; **three explanation depths** (beginner: explanation, analogy, everyday examples, vocabulary; intermediate: explanation, how it works, implementation, scenarios; advanced: explanation, evidence, debates, alternative models); application (when to use, steps, checklist, misuse); typed **relations** (related-to, derived-from, applied-in, contrasts-with, measured-by, developed-from, influences, complementary-to); prerequisites; **practice** (exercises, quiz with one correct option per question at three levels, flashcards); **references** with roles (primary, standard, explanatory, further); an **evidence class** (e.g. official standard, peer-reviewed, established theory, professional guideline, practitioner recommendation, contested, emerging) with an evidence note; a status and a verification date. Topics without an entry are shown as **planned**, never as content.

Maturity is shown per entry on five separate dimensions — Explanation, Evidence, Practice, Visual, Editorial — rated basic / developing / complete, never as one score.

---

## 8. Do and don't

| Do | Don't |
|---|---|
| Use tokens; extend `app/globals.css` for anything new | Hard-code colours, sizes or radii |
| Keep subject colour to dots, thin rules and illustrations | Use subject colour for status, evidence or whole panels |
| Use the accent only for links, focus and selection | Use the accent as decoration |
| Darken the border on hover | Move or scale cards on hover |
| Plex Sans titles, Plex Mono labels, Newsreader for reading | Mix other typefaces |
| One rounded workspace frame | Nested page frames, glassmorphism, decorative gradients |
| Motion that teaches or confirms, off under reduced motion | Decorative or scroll-driven motion |
| Label planned topics as planned | Present planned topics, fake data or fake achievements as real |

---

## 9. Working live from this file

1. **Design** in Claude Design with these tokens, components and templates; keep names identical to the token names here so a design maps one-to-one onto code.
2. **Hand over** a change as: the token or component affected, its new values (light and dark), and the pages it touches.
3. **Implement** in code: tokens in `app/globals.css` only; components in `components/`; page structure in `app/`. Contrast changes must pass `tests/tokens.test.ts`; UI changes run the keyboard, device and axe suites (`tests/browser/README.md`).
4. **Keep this file current:** update it in the same commit as any token or component change, so the brief never drifts from the product.

Canonical detail lives in `docs/DESIGN_SYSTEM.md`, `docs/PAGE_TEMPLATES.md`, `docs/ILLUSTRATION_SYSTEM.md`, `docs/DIAGRAM_DESIGN_GUIDELINES.md`, `docs/INTERACTION_AND_MOTION_GUIDELINES.md` and the live design-system pages at `/system`.
