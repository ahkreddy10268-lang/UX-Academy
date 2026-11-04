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
| Hover | Cards, rows (`.card`, `.lift`) | border colour + soft shadow; never a transform |
| Sidebar collapse | `.app-sidebar` width 248 ↔ 76px | 220ms width transition, off under reduced motion |
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
| App navigation | sidebar ≥1024px (collapse persisted, tooltips when collapsed); modal `<dialog>` drawer below | Tab order: skip link → sidebar → topbar → main; Esc closes drawer; route change closes drawer |
| Library filters | toolbar group ≥1024px; `<dialog>` drawer below | native dialog focus trap, "Show N results" |
| Library sort & paging | sort select (mirrored to `?sort=`), "Show 24 more" button with a "Showing n of N" count | native |
| Library URL state | `history.replaceState` mirror of all filters (incl. `sub`, `sort`) and view | shareable, no navigation |
| Steering lab | pointer drag through tunnels (mouse, pen, touch; `touch-action: none` on the stage only) | no keyboard equivalent exists for a steering task — stated in the lab; results table and chart are accessible |
| Jakob's law lab | buttons on a mock page, timed from "Start trial" | completable by keyboard, but times then reflect Tab order, so the lab asks for a mouse or touch |
| Colour explorer | three range inputs, Reset | Home/End/arrows; readout `aria-live` |
| Target size | `.tap` (min 24px) on standalone links/toggles; range and summary ≥ 24px; lesson rail static on phones | WCAG 2.2 SC 2.5.8 |
| CVD simulator | colour pickers + hex fields, live re-render | native inputs, `aria-invalid` on bad hex |
| Explorers | range inputs + checkboxes | native controls, live readout `aria-live` |
| Curriculum levels | `<details>` disclosure | native |
| Bookmarks on cards | separate button above the card link overlay | no nested interactive elements |
