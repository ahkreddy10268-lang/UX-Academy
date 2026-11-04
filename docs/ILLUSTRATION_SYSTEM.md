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
| UX Design Fundamentals | The interaction in hand | Close-up: a hand holding the app at the centre of an experience loop (1 goal, 2 interaction, 3 feedback, 4 outcome), with context badges (time, place, signal, other people) |
| UI Design Fundamentals | The components layer | An exploded interface: grid, type and spacing, colour, components; the designer points at the stack; the assembled phone beside it |
| Product Design | The chosen option | Research board → decision table with one option chosen → shipped screen → outcome columns, with a loop back to research |
| Interaction Design | The pressed button | Three states of one control along a timeline (input, working, done with feedback) and a return arc: the feedback informs the next action |
| HCI Fundamentals | The person at the screen | A room with a person and task (pinned list), technology (monitor), context (window, clock, a colleague's interruption), markers 1–4 |
| Cognitive Psychology | Working memory | A network, not a pipeline: stimuli, perception, attention, working memory and long-term memory linked both ways, top-down expectation back to perception, and action changing the world |
| UX Research | The insight card | A session (participant, researcher with notes) feeding a synthesis wall of clustered notes and one insight |
| Usability Engineering | The observed path | Evidence close-up: the screen under test with the numbered click path, an error and a hesitation, the participant picture-in-picture, a task timeline with pass and fail, time on task and severity-rated findings |
| Information Architecture | The flagged target | Platforms in a hierarchy joined by walkways; a highlighted path a person walks toward the target |
| Visual Design | The image block | A composition board with alignment guides, a type-scale ladder and a contrast pair |
| Design Systems | The traced button | A staircase from tokens to components to patterns to a full interface, with one decision (the brand colour → the button → the form's button → the screen's button) traced by a dashed lineage |
| Accessibility | The focused button | One interface with heading structure, a captioned video, text resizing and a visible focus ring, reached by four routes (vision: zoom and contrast; hearing: captions; motor: keyboard and switch; cognition: clear steps) and speech output for screen readers |
| Product Strategy | The high-value quadrant | Object study of one decision board: an opportunity tree, a 2 × 2 priority tile, tokens placed on the chosen bet and the goal flag |
| Advanced UX Metrics | The overlapping distributions | Object study: two overlapping distributions (A and B) standing behind estimates with confidence intervals, and a correlation card |
| AI UX | The response panel | A person's request, an AI response with a confidence meter, sources to verify and accept / edit / undo controls |
| Service Design | The counter | Frontstage (customer, staff, counter) behind a glass line of visibility; backstage shelves, systems and a colleague; numbered touchpoints and the flow behind them |

### Design exploration (recorded)

Three directions were drawn for HCI Fundamentals and compared on light and dark: **A** an isometric editorial scene; **B** exploded layers; **C** a flat vignette with a large figure. A was chosen: it reads as a real situation, scales to every subject and carries context. B is kept as a secondary device where structure is the subject (UI, design systems, IA). C read as generic product marketing art and was rejected. The first prototypes of A were too small in the frame and floated without ground; that led to the measured fit and the rule that every object stands on something.

### QA

```bash
npx tsx scripts/render-path-art.tsx [outDir]      # sheet of all 16 scenes, light + dark, 2x
npx tsx scripts/render-path-art.tsx --measure     # re-measure bounds → art/fit.ts
```

## Illustration v5.1 refinement and the knowledge-plate pilot

### Composition variety (rule)

The kit standardises quality, not layout. Rooms are used only where the setting is the subject (HCI Fundamentals: the context of use; UX Research: the session) and the cut-away is kept for Service Design. Everything else is a close-up (UX Fundamentals, Usability Engineering, Accessibility), an object study (Product Strategy, Advanced UX Metrics), a network (Cognitive Psychology), an exploded stack (UI Fundamentals), a staircase (Design Systems), a sequence (Interaction Design), a hierarchy (Information Architecture) or a board (Visual Design, Product Design). Before v5.1, six of sixteen scenes were near-identical rooms.

People appear only where an activity is the subject. Accessibility no longer depends on a single wheelchair figure: it shows four kinds of access need and assistive technology around one interface.

### Card-size legibility

Every scene is checked at the real card width (about 300–360 px at 1440 px; full width on phones). The measured fit (`art/fit.ts`) keeps content inside the safe area; scenes that were small at card size were recomposed (fewer, larger objects) rather than scaled globally.

### Knowledge-plate pilot (family B, Level 1)

Five plates were redrawn with the kit and replace the old ones in place (same slugs, registry order, explorer and animation flags), in `components/illustrations/concepts/editorial-plates.tsx`:

| Plate | What it shows | Accuracy check against the entry |
|---|---|---|
| Human-Computer Interaction | Interaction at the centre of person, task, technology and context, linked as a ring, with evaluation feeding back | Not a line: every element links to every neighbour; matches the entry's person–task–technology–context model |
| Cognitive Load Theory | Linked elements (intrinsic) and clutter and a split legend (extraneous) converging on a narrow aperture (working memory), with a schema in long-term memory returning to reduce the load | Uses the entry's terms; working memory is an aperture, not a fixed box; schemas from LTM are what changes load for experts |
| Fitts's law | Start, a target 200 wide away and 24 wide, the ballistic and corrective movement, D and W, and a small MT-against-ID chart with this movement's point (≈ 3.2 bits) | Proportions computed from the drawing: log₂(200/24 + 1) ≈ 3.22; the cursor still travels the path (animated in the hero, off under reduced motion) |
| Mental Models | Designer's conceptual model (complete) → system image (the product) → user's mental model (incomplete: one part missing, one link wrong); the direct designer-to-user channel is crossed out | Norman's three models as stated in the entry; the user's model is shown as differing, not identical |
| Usability Testing | Participant and task with a facilitator; observed behaviour over time (a hesitation, an error) → evidence (quote, time) → findings by severity | Presents testing as observation producing evidence and findings, not as clicking |

The old Usability Testing plate's problem-discovery curve was not carried over: Level 1 shows one idea, and the curve remains a Level 2/3 candidate.

### Rolling the style out to the rest of the library

Inventory (from the registry): 71 plates — 48 for published entries (5 now in the v5 style), 20 subject plates and 3 planned-topic plates. Strategy:

1. **Order.** Migrate plates for entries on the most-used learning paths first (UX, HCI and UI Fundamentals stages 1–2), then by tier in docs/CONTENT_AUDIT.md §6. Subject plates last: they are small and abstract by design.
2. **One idea per plate.** Decide the single idea from the entry's beginner level before drawing; check every label against the entry text.
3. **Choose by knowledge type.** Laws and formulas: a technical diagram with true proportions; theories and models: networks or apertures, never a pipeline unless the theory says so; principles and heuristics: an annotated interface fragment; methods: the activity with its evidence; disciplines: an ecosystem.
4. **Gate.** Render with `scripts/render-plates.tsx` in both themes, check at card and hero size, then run `tests/illustrations.test.ts`. A plate that does not explain better than the old one is not merged.
5. **Do not batch-convert.** Each migration is a design decision; there is no automatic restyle.
