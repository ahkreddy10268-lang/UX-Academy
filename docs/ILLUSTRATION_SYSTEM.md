# Illustration system — plates

Coverage register (generated): `docs/ILLUSTRATION_COVERAGE.md`. Enforcement: `tests/illustrations.test.ts`.

## Architecture

```
components/illustrations/
  illustration-types.ts   IllustrationEntry, ArtProps {detail, animate}, ExplorerId, canvas 400×300
  primitives.tsx          C (colour tokens), STROKE, Label, Dim, Arrow, CurveArrow, Cursor, Node, Box, Window, Lines, HatchDefs
  plate.tsx               Plate frame (wash + graph-paper dots + art, <title>/<desc>), TypePlate fallback
  registry.tsx            slug → IllustrationEntry, duplicate check, plate numbers
  registry/_fragments.ts  aggregates authoring groups
  concepts/*.tsx          fitts-law, core-plates (14 flagship), laws-psychology, research-metrics, frameworks-visual, domains
  concept-illustration.tsx ConceptIllustration / …Card / …Hero (palette from domain)
  motion-toggle.tsx       MotionFrame — pause/play for animated hero plates (WCAG 2.2.2)
  interactive/explorers.tsx  Level-3 explorers (client)
  home-hero-art.tsx       homepage constellation
```

The registry is presentation: content never imports it (no cycles). Plates are server components with no hooks except `useId` — zero client JS unless used inside a client component, in which case pages render them on the server and pass them as nodes (see `app/library/page.tsx`).

## Drawing rules

1. **Explain the mechanism.** Draw what the concept *does* (D and W; capacity line; peak and end; POUR pillars). No decorative metaphors, no generic icons, no identical compositions with different labels.
2. **Canvas** 400 × 300, ~24px safe margin. **Colour only via `C.*`** (CSS variables): `base` solid shape, `soft` secondary, `ink` category line/label, `line` neutral ink, `mute`, `paper`, `surface`. Never hex, never Tailwind classes (plates must render standalone).
3. **Strokes:** `STROKE.main` 2.25, `fine` 1.25, `hair` 0.9. Outline meaningful fills in `C.line` (some palette bases are ~2.2:1 against their wash).
4. **Annotations** only through `<Label show={detail}>` / `<Dim show={detail}>`: shown in hero variants, hidden on cards. The card variant must still read without text.
5. **Accessibility:** every entry has a `title` and a 2–3 sentence `description` of what is drawn. Plates render `role="img"` with `<title>`/`<desc>`, or `aria-hidden` when `decorative` (adjacent text already names it).
6. **Motion** (hero only, `animate`): CSS classes `anim-travel` (with `offsetPath`), `anim-pulse`, `anim-draw` (`--len`), `anim-fade`, `anim-drift`, `anim-sway`, `anim-delay-1..4`. ≤ 2 animated elements; the static first frame must be complete. All motion is off under `prefers-reduced-motion`, and `MotionFrame` offers pause.
7. **Numbers drawn on plates must be correct** — compute with `lib/formulas`.

## Variants

| Variant | Use | Detail | Motion |
|---|---|---|---|
| `thumb` | tiny lists | no grid dots | no |
| `card` | cards, tiles, relation items | no labels | no |
| `hero` | concept/lesson/subject headers, visual explanations | labels + dimensions | yes, if `animated` |

Where no plate exists, `TypePlate` shows a monogram on the wash — honest, never a fake illustration.

## Explorers (Level 3)

`fitts`, `hick`, `peak-end`, `chunking`, `gestalt`, `cognitive-load`, `signifiers`. Each states what is manipulated, what the concept predicts, its assumptions and what it cannot show, and computes only via `lib/formulas` (`fittsId`, `hickInformation`, `peakEnd`, `chunk`). Simulations are labelled as such; experiments that measure the learner live in `/labs`.

## QA

```bash
NODE_PATH=$(npm root -g) npx tsx scripts/render-plates.tsx [slug…] [--out dir]
```

Renders card + hero for every plate in light and dark into `.plates/plates-{light,dark}.png` (git-ignored). Review for overlaps, clipped labels, crowding and legibility of the card variant.

## Adding a plate

1. Add an `IllustrationEntry` to the right `concepts/<group>.tsx` (slug = entry slug, taxonomy slug or domain id).
2. Render it with the script; fix issues in both themes.
3. `npx vitest run tests/illustrations.test.ts && npm run docs:generate`.
