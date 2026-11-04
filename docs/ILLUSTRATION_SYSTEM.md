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

| Variant (brief name) | Implementation | Use | Detail | Motion |
|---|---|---|---|---|
| thumbnail | `thumb` / `card` at 80–120px | research cards, curriculum rows, lab cards | no labels | no |
| standard | `card` | cards, tiles, relation items | no labels | no |
| featured | `card`/`hero` inside a raised white card on `.bg-feature` | featured library card, home featured concept | labels in hero | no |
| hero | `hero` | concept/lesson/subject/lab heroes (raised card on the pastel hero) | labels + dimensions | if `animated` |
| animated | `hero` + `animate` in `MotionFrame` | 12 plates | — | pausable |
| interactive | `ConceptExplorer` | visual explanation sections | live labels | driven by input |

Where no plate exists, `TypePlate` shows a monogram on the wash — honest, never a fake illustration.

## Explorers (Level 3)

`fitts`, `hick`, `peak-end`, `chunking`, `gestalt`, `cognitive-load`, `signifiers`, `colour` (session 5: HSV, attached to the Colour Contrast Ratio plate), `hci-methods` (a decision aid pairing a research question with the HCI method that usually fits, its evidence, limits and a complementary method; it computes nothing and is labelled a decision aid, not a simulation). v3: the Fitts explorer adds the **direction of approach** (width along the approach path, `widthAlongApproach`, the W′ model compared by MacKenzie & Buxton 1992) and an **easy vs difficult comparison** strip on one ID scale. Each states what is manipulated, what the concept predicts, its assumptions and what it cannot show, and computes only via `lib/formulas` (`fittsId`, `hickInformation`, `peakEnd`, `chunk`). Simulations are labelled as such; experiments that measure the learner live in `/labs`.

## QA

```bash
NODE_PATH=$(npm root -g) npx tsx scripts/render-plates.tsx [slug…] [--out dir]
```

Renders card + hero for every plate in light and dark into `.plates/plates-{light,dark}.png` (git-ignored). Review for overlaps, clipped labels, crowding and legibility of the card variant.

## Adding a plate

1. Add an `IllustrationEntry` to the right `concepts/<group>.tsx` (slug = entry slug, taxonomy slug or domain id).
2. Render it with the script; fix issues in both themes.
3. `npx vitest run tests/illustrations.test.ts && npm run docs:generate`.

## v3 additions

- **69 plates** (was 67): new **Information Architecture** plate (four systems in one picture, for the new entry) and **Human-Centred Design** plate (`frameworks-visual.tsx`), drawn ahead of its entry. It shows nested rings for users, the people affected and the context of use, with an iteration spiral that converges through three evaluation points, so it is deliberately distinct from the UCD square loop. The planned-topic page shows it captioned "drawn ahead of the entry".
- The brief's initial set of 15 (including Affordances & Signifiers and HCD) is covered: every published entry, every subject, and three planned topics (design-thinking, atomic-design, human-centred-design) have plates.
- In the v3 pastel washes, `C.paper` knocks out to the cool canvas and `C.soft` mixes into the surface. Both were re-rendered and reviewed in light and dark.

## Editorial technical system (illustration v5)

The learning-path artwork was rebuilt as an editorial, isometric illustration language. The concept plates above are unchanged; the new kit is shared so future knowledge illustrations can use it.

### Three families

| Family | What it is | Where | Implementation |
|---|---|---|---|
| A · Learning-path artwork | One subject-specific scene per path: a place where the subject happens (a lab, a counter, a research room) or a structure that is the subject (an exploded interface, a token staircase, an information hierarchy) | Path cards (`/learn`, home, topic hubs) and the path hero | `components/learn/path-art.tsx` → `components/learn/art/scenes-a.tsx`, `scenes-b.tsx`; fit in `art/fit.ts` |
| B · Knowledge and concept illustrations | Plates (Level 1) and the Visual Knowledge Engine (Level 2), chosen by what the topic teaches | Library, lessons | Unchanged registries (`components/illustrations/`, `components/visual-explanations/`); may draw with the kit |
| C · Interactive isometric scenes | An exploded stack the learner can operate, only where the subject is a layered structure | UI Fundamentals and Design Systems path pages | `components/learn/art/layer-explorer.tsx` (client) behind `components/learn/path-explorer.tsx` (server, resolves links) |

### Canvas, safe area and fit

- Canvas 400 × 300 (4:3), the same ratio as the card frame and the hero aside. Scenes are drawn in their own design space; `scripts/render-path-art.tsx --measure` measures each scene's drawn bounds in a browser and writes a scale and offset into `art/fit.ts` so every scene fills the same safe area (18 px margin). No scene is cropped, and none is fitted by eye.
- The plate field is the subject wash (`--ill-plate`); the scene's floor and walls are neutral surfaces, so the neutral application surface stays dominant and the subject colour is reserved for focal objects.

### Projection and geometry

- True isometric (30°): `iso(o, x, y, z)`; x runs right-down, y left-down, z up. Boxes show three faces (top, left, right) with fixed tone roles, so light always comes from the upper left.
- 2D content (interfaces, notes, charts) is placed on a surface with `plane.top / left / right`, never faked with skew, so screens and boards sit in the same perspective as the furniture.
- Scale conventions in design units: a standing person ≈ 62, desk height 22–26, chair seat 14, wall 60–66, floor tiles 20–30. Objects never float: everything stands on the floor, a desk, a wall or a platform, with a contact shadow (`IsoShadow`).

### Line, surface, shadow

- Linework classes with constant (non-scaling) width, the hairline convention studied from Hairline: `.e` edge 1.15 px, `.m` secondary 0.8 px, `.h` receding 0.55 px. No heavy black borders; the edge colour is ink mixed toward the subject ink.
- Surfaces: `--ill-n-top/left/right` (neutral objects), `--ill-top/left/right` (subject-tinted objects), `--ill-focal / -focal-left / -focal-right` (the one focal object per scene), `--ill-hi` (paper, screens), `--ill-shadow` (contact shadows). Radii follow the product scale in miniature: screens 1.5–2, cards 2–3, pills fully round.
- Shadows are flat contact patches, never blurs or gloss.

### Colour

Every illustration colour is an `--ill-*` role defined in `app/globals.css` from the existing theme and category tokens (`--c`, `--c-ink`, `--c-wash`, `--ink`, `--surface`, `--accent`, `--ok`). Scenes re-tint per subject and follow light and dark automatically; there is no separate palette. Exceptions, also tokens: four skin and four hair tones (physical colours, the same in both themes). Semantic roles keep their meaning inside drawings: `--ill-good` for success, `--ill-act` (accent) for focus and interaction cues.

### Composition

- One focal point per scene, in the focal tone; secondary objects in subject tints; context in neutrals.
- Foreground (people, the object being used), middle ground (desk, counter, board) and background (walls, pinned material) are distinct.
- Different subjects get different compositions: rooms (HCI, research, usability, accessibility, metrics, strategy), a cut-away service (service design), a route (UX fundamentals), exploded stacks (UI), a staircase (design systems), a hierarchy of platforms (IA), a sequence of states (interaction), a board (visual design, product design) and a flat cognitive model (cognitive psychology, where an isometric room would add nothing).

### Human figures

`Figure` has real joints (shoulders, elbows, hands, hips, knees, feet) and poses (`stand`, `point`, `hold`, `reach`, `seated`, `walk`), so hands meet keyboards, phones and boards. Four skin tones, several hair styles and tones, garments in subject or neutral tones; one scene shows a wheelchair user. Figures never carry meaning on their own and never have faces drawn in detail.

### Annotation and connectors

- Numbered markers (`Marker`) appear only where the numbers map to a list a learner can read (HCI: person, task, technology, context; UX: goal, interface, feedback, outcome; service: touchpoints). The drawings contain no readable words: text bars stand in for copy.
- Connectors (`Flow`) are fine dashed curves with a small head; solid for cause → effect in a sequence (interaction design).

### Motion and interaction

Path scenes are static. Family C uses one short lift on the selected layer, applied only with `motion-safe`; under reduced motion it changes without transition and the static state is complete. Controls are native radio inputs (keyboard: arrow keys; touch: 24 px targets via `.tap`); the explanation is an `aria-live` region.

### Accessibility and performance

Path scenes are decorative (`aria-hidden`): the card and page title name the path, so repeating it would be noise. The interactive stack hides its SVG and gives the meaning in text. All scenes are server-rendered inline SVG with no client JavaScript; only the layer explorer is a client component, and only on two path pages. No dependency was added (Hairline was studied, not installed; see D-063).

### Path briefs (what each scene teaches)

| Path | Focal point | Visual idea |
|---|---|---|
| UX Design Fundamentals | The parcel arriving | A route on the ground: a person with a need, the app, the confirmation, the outcome at the door (markers 1–4) |
| UI Design Fundamentals | The components layer | An exploded interface: grid, type and spacing, colour, components; the designer points at the stack; the assembled phone beside it |
| Product Design | The chosen option | Research board → decision table with one option chosen → shipped screen → outcome columns, with a loop back to research |
| Interaction Design | The pressed button | Three states of one control along a timeline: idle with a finger pressing, working, done with a confirmation |
| HCI Fundamentals | The person at the screen | A room with a person and task (pinned list), technology (monitor), context (window, clock, a colleague's interruption), markers 1–4 |
| Cognitive Psychology | Working memory | Stimuli → the eye (perception) → a spotlight (attention) → a few slots (working memory) exchanging with long-term memory → a decision |
| UX Research | The insight card | A session (participant, researcher with notes) feeding a synthesis wall of clustered notes and one insight |
| Usability Engineering | The time measure | A participant at a task, an observer, task results, a stopwatch, a time chart and severity-rated findings |
| Information Architecture | The flagged target | Platforms in a hierarchy joined by walkways; a highlighted path a person walks toward the target |
| Visual Design | The image block | A composition board with alignment guides, a type-scale ladder and a contrast pair |
| Design Systems | The interface | A staircase from tokens to components to patterns to a full interface, with a person carrying a component up |
| Accessibility | The focused button | A wheelchair user with headphones (screen reader), a screen with heading structure and a visible focus ring, Tab on the keyboard, a contrast pair |
| Product Strategy | The high-value quadrant | An opportunity tree on the wall, a 2 × 2 priority matrix on the table, a goal flag and outcome measures |
| Advanced UX Metrics | The highest estimate | Columns with error bars on a table, a trend with a confidence band, a scatter with a fitted line |
| AI UX | The response panel | A person's request, an AI response with a confidence meter, sources to verify and accept / edit / undo controls |
| Service Design | The counter | Frontstage (customer, staff, counter) behind a glass line of visibility; backstage shelves, systems and a colleague; numbered touchpoints and the flow behind them |

### Design exploration (recorded)

Three directions were drawn for HCI Fundamentals and compared on light and dark: **A** an isometric editorial scene; **B** exploded layers; **C** a flat vignette with a large figure. A was chosen: it reads as a real situation, scales to every subject and carries context. B is kept as a secondary device where structure is the subject (UI, design systems, IA). C read as generic product marketing art and was rejected. The first prototypes of A were too small in the frame and floated without ground; that led to the measured fit and the rule that every object stands on something.

### QA

```bash
npx tsx scripts/render-path-art.tsx [outDir]      # sheet of all 16 scenes, light + dark, 2x
npx tsx scripts/render-path-art.tsx --measure     # re-measure bounds → art/fit.ts
```
