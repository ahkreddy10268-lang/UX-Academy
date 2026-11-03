# Design system

**Direction:** premium editorial + modern academic + minimal + interactive + research-led. The interface should feel like a well-set scholarly publication that you can operate.

## Concept: the rubric

Medieval scribes wrote headings and section marks in red ink — *rubrica* — to guide the reader through dense text. UX Academy uses one red accent in the same way: section marks (the **§** in the wordmark), knowledge-type labels, active states, focus rings and the step numbers of procedures. Everything else is ink on paper. Colour therefore always *means* "navigational emphasis", never decoration.

## Tokens (`app/globals.css` — the only place values live)

### Colour

| Token | Light | Dark | Use | Contrast on paper (L / D) |
|---|---|---|---|---|
| `paper` | #faf8f4 | #141311 | page | — |
| `surface` | #ffffff | #1b1a17 | panels, inputs | — |
| `sunken` | #f2efe8 | #0f0e0d | formula wells, insets | — |
| `ink` | #1c1a17 | #ede9e1 | primary text | 16.4 / 15.3 |
| `ink-2` | #4b4740 | #c0baae | secondary text | 8.7 / 9.6 |
| `ink-3` | #6b665d | #9c9589 | metadata | 5.4 / 6.3 |
| `accent` | #a33320 | #ee8b73 | rubric | 6.5 / 7.6 |
| `rule` / `rule-strong` | #e2ddd3 / #c9c2b4 | #2f2c27 / #4a463f | decorative hairlines | — |
| `line-control` | #8c857a | #7a746a | form borders (≥3:1, WCAG 1.4.11) | |
| `ok` `warn` `info` (+ `-wash`) | | | status, always with a text label | ≥4.6 |

All text tokens were checked with the app's own `contrastRatio()` against paper, surface, sunken and accent-wash in both themes (≥4.5:1). Verified in-browser with axe-core: 0 violations across 76 pages × 2 themes.

### Typography

| Role | Family | Notes |
|---|---|---|
| Display & long-form reading | **Newsreader** (variable, optical size) | `opsz` 72 for display, 16–24 for text — one family that is genuinely designed for both screen reading and headlines; gives the academic voice without the stiffness of Times-like faces |
| UI, labels, data | **IBM Plex Sans** | engineered, neutral, excellent at small sizes; its technical character matches labs and tools |
| Formulas & numbers | **IBM Plex Mono** | tabular figures, unambiguous zero; formulas read as precise artefacts |

Scale: major third (1.25) on 16px — `2xs 12 · xs 13 · sm 14 · base 16 · read 18 · lg 20 · xl 25 · 2xl 31 · 3xl 39 · 4xl 49`. Reading measure `max-w-read` = 42rem (≈68ch at 18px). The `.label` style (12px, 600, +0.08em, uppercase) is the only uppercase in the system.

Trade-offs: Newsreader is less familiar than Source Serif or Georgia, and its italics are expressive — used sparingly (analogies, the hero). Alternative pairings considered: Source Serif 4 + Source Sans 3 (safer, less distinctive); Fraunces + Inter (too decorative/generic respectively).

### Space, shape, elevation

- Spacing: Tailwind's 4px base; sections separated by 64px (`pt-16`), groups by 32px, items by 12–16px.
- Radius: `xs 2px · sm 4px · md 6px` — nearly square, editorial.
- Borders over shadows. One shadow (`shadow-raise`) for floating layers only (menus, dialogs).
- Layout: `max-w-page` 76rem; entry pages = 46rem article + 14rem sticky table of contents.

## Components (by responsibility)

| Component | File | Rules |
|---|---|---|
| Page header, section heading, breadcrumbs, bullets, empty state | `components/ui/layout.tsx` | Every page starts with `PageHeader`; every major section with `SectionHeading` (kicker + display title) |
| Type / evidence / status / difficulty marks | `components/ui/marks.tsx` | Typographic labels, not coloured chips; evidence uses a 3-bar glyph + text (never colour alone) |
| Rich text | `components/ui/rich.tsx` | Planned-topic links are dotted, entry links solid rubric |
| Level tabs | `components/entry/level-tabs.tsx` | APG tabs with arrow/Home/End; preference persisted; panels pre-rendered |
| Calculator shell & fields | `components/formula/kit.tsx` | Inputs left, live results right on a sunken well; validation message replaces results; Reset + Save |
| Quiz | `components/practice/quiz.tsx` | Feedback for the chosen and correct option, "why not" for the rest, revision link |
| Charts | `components/labs/charts.tsx` | `role="img"` with a data summary; always next to a table |
| Search | `components/search/*` | `<dialog>` + combobox/listbox with `aria-activedescendant` |

## States

Every interactive component defines: idle, hover, focus-visible (2px rubric outline, 2px offset), pressed/selected (`aria-pressed`, `aria-selected`), disabled, loading (text, not spinner-only), empty (explains what to do), error (says what went wrong and how to fix it).

## Motion

Essentially none: colour/opacity transitions ≤150ms on hover, a spinner only in the feedback lab demonstration. `prefers-reduced-motion` disables all animation and transitions.

## Accessibility rules

Semantic landmarks and headings; skip link; all controls reachable and operable by keyboard; visible focus; WCAG 2.2 AA contrast; scrollable regions focusable; charts and the graph have text alternatives; no information by colour alone; forms have programmatic labels and error text; dialogs use the native `<dialog>` for focus containment.

## Avoid

Gradients, glassmorphism, decorative animation, icon clutter (the UI uses almost no icons), card-everything layouts, more than one accent colour, numeric "confidence scores".
