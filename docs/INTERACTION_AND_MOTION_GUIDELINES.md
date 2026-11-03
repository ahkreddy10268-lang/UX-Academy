# Interaction & motion guidelines

## Principle

Motion exists only to **teach** (show a mechanism changing) or to **confirm** (state changed). Nothing moves merely to look impressive.

## Tokens (`app/globals.css`)

`--dur-1` 120ms (hover colour) · `--dur-2` 220ms (state change) · `--dur-3` 420ms (entrance) · `--ease-standard` · `--ease-out`.

## Allowed motion

| Kind | Where | Implementation |
|---|---|---|
| Educational plate motion | Hero plates with `animated: true`, homepage constellation | `anim-*` CSS classes, loop ≤ 6s, ≤ 2 elements |
| Entrance | Hero text and figure (`.rise-in`) | once, 420ms, 6px rise |
| Hover | Cards, rows (`.lift`) | border/background colour only |
| Feedback | Quiz answer states, saved/bookmarked, progress bars | colour + text change, no bounce |

**Not allowed:** scroll-triggered animation, parallax, cursor-following effects, moving hit targets. (Tested: a 2px hover lift moved card controls under the pointer and made them unstable — removed.)

## Reduced motion & control

- All `anim-*` and `rise-in` are defined inside `@media (prefers-reduced-motion: no-preference)`; global transitions are near-zero under `reduce`. Verified in e2e (`animation-name: none`).
- Animated hero plates sit in `MotionFrame` with a Pause/Play toggle (`aria-pressed`), hidden when motion is reduced.
- Every animated plate is complete in its first frame; no information depends on motion.

## Interaction patterns

| Pattern | Component | Keyboard |
|---|---|---|
| Search dialog (⌘K, /) | `components/search/search-trigger.tsx` | combobox + listbox, ↑↓ Enter Esc |
| Hero search | `components/search/hero-search.tsx` | combobox, inline results |
| Level tabs | `components/entry/level-tabs.tsx` | APG tabs, ←→ Home End, preference persisted |
| Library filters | sidebar ≥1024px; `<dialog>` drawer below | native dialog focus trap, "Show N results" |
| Library URL state | `history.replaceState` mirror of all filters and view | shareable, no navigation |
| Explorers | range inputs + checkboxes | native controls, live readout `aria-live` |
| Curriculum levels | `<details>` disclosure | native |
| Bookmarks on cards | separate button above the card link overlay | no nested interactive elements |
