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

## Dark technical editorial system (illustration v6) — one of the two current languages

Decision D-086 (2026-11-05). Applies to **family B, Levels 1 and 2** (knowledge and concept figures). Learning-path artwork (family A) and the isometric scenes (family C) are unchanged. Every new knowledge figure drawn on the `viz` canvas follows this section. Since D-089 (§ Visual Learning System below) `viz` is chosen for systems, architectures, routes and processes, and the instructional `sheet` for interface anatomy, measurements and comparisons; this section no longer makes `viz` the default for every knowledge figure. Earlier pastel plates stay valid until they are migrated one by one.

### Why the earlier style was not enough

The v5/v5.1 kit fixed geometry and linework but still read as educational clip art: pastel washes and flat tints gave every subject the same soft look; jointed `Figure` people carried the meaning in many plates (a person at a laptop standing in for a system); interface fragments were empty rectangles with placeholder bars; connectors were generic dashed arrows; and there was no material depth, no focal illumination and no language for barriers versus working routes. Concepts that are systems (accessibility, HCI, design systems) were shown as scenes about people instead of as the system itself.

### References

The owner's art-direction references are kept locally in `.local/visual-style-references/` (git-ignored; third-party images, never committed or copied): 01 an isometric exploded architecture with one lit orange layer and module cards routed into it; 02 a product-swap flow of interface cards with thin amber outlines and illuminated junctions; 03 a retention-versus-cancellation decision flow (green solid vs grey dashed paths, double chevrons, bracketed annotations, legend); 04 an isometric infrastructure hero with modules on a platform, dashed links and one highlighted module with a callout; 05 an editorial data-story section of dark cards with sparse red highlights and bar charts. Reference 06 (analytics dashboard) was not supplied; use the written brief (graphite surfaces, luminous focal values, warm highlights) for metric figures. Use them for art direction only.

### Art direction

**Dark technical editorial + isometric systems + premium product infographics.** A near-black graphite canvas in both application themes; matte graphite surfaces with tonal gradients and a fine inner highlight; hairline edges; **one** illuminated amber element that carries the main idea; fine routed connectors with junction dots; small monospace technical labels set beside, or on the plane of, the thing they name; generous negative space. Complexity comes from information and craft, not clutter.

### Tokens (`app/globals.css`, contrast-tested in `tests/tokens.test.ts`)

`--viz-bg` `#0b0d0f`, `--viz-surface-1/2/3` `#111518 / #191e22 / #22282d`, `--viz-edge` `#424b52`, `--viz-edge-soft`, `--viz-edge-hi`, `--viz-grid`, `--viz-text` `#f2f3f4`, `--viz-text-2` `#a7afb5`, `--viz-text-3` `#8a949b` (raised from the brief's `#747e86` to pass 4.5:1 on every viz surface), `--viz-accent` `#ff8a3d` with `--viz-accent-deep`, `--viz-accent-soft`, `--viz-accent-glow`, `--viz-positive` / `--viz-positive-soft`, `--viz-warning` / `--viz-warning-soft`, `--viz-shadow`. They are defined once on `:root` and **not** redefined in the dark theme (tested). Tailwind utilities: `bg-viz-bg`, `text-viz-text-2`, `border-viz-accent`, etc. Inside a `.viz` canvas the v5 roles (`--ill-*`) are remapped to the viz palette, so `IsoBox`, `Win` and `Flow` render in graphite and amber if reused. Classes: `.glow` (lit geometry only), `.glow-soft`, linework `.va` (accent route), `.vp` (positive), `.vw` (warning, dashed), `.vn` (neutral hairline), `.viz-panel` (engineering grid for HTML diagrams).

### Colour meaning

| Role | Token | Use | Paired non-colour cue |
|---|---|---|---|
| Primary accent | `--viz-accent` | The one focal layer, the active or accessible route, the main interaction | Solid, illuminated line; lit fill |
| Positive | `--viz-positive` | A successful outcome, an available path | Solid line; tick |
| Warning | `--viz-warning` | A barrier, failure, risk or destructive path | **Dashed** line ending in a **cross**; dashed outline |
| Neutral | graphite / `--viz-edge-hi` | Structure, secondary relations | Hairline; dashed for dependency |

Never use all accents in one figure without need, and never let colour be the only difference.

### Kit (`components/illustrations/system/viz.tsx`)

`VizDefs` / `VizCanvas` (uid-scoped gradients, vignette and grid, rendered by `Plate` when `canvas: "viz"`), `Slab` (states `base`, `lit`, `glass`, `dim`; labels set on the top plane), `ContactShadow`, `Bloom` (one per figure), `Guides` (alignment lines between exploded layers), `Route` + `isoRoute` + `roundedPath` (iso-aligned routed connectors; kinds `accent`, `positive`, `blocked`, `neutral`, `neutral-dashed`; terminals dot, cross, arrow), `Junction`, `ModuleCard` (flat input/service modules, either axis, blocked state), `Tag` (monospace label with optional leader and index), `Brackets`, `Callout`. Plates receive `uid` in their props for gradient references; ids never collide when many plates share a page. All server-rendered.

### Composition families

1. **Isometric technical** — exploded stacks, platforms and modules for systems and architectures (accessibility, HCI, design systems, IA, UI layers).
2. **Product and interface explanatory** — realistic miniature interfaces, states and decisions joined by routes (interaction design, flows, onboarding, error recovery, before/after).
3. **Technical editorial infographic** — modular dark cards, charts, grids of cells, timelines and legends for laws, psychology, metrics, formulas and research methods.

Choose by what the concept teaches; do not force every subject into a stack.

### Rules

- **No stick figures and no `Figure` primitive in v6 plates (tested).** Show the system, interface, data or decision. A person may appear only when the human activity is the concept, and never instead of the mechanism.
- One dominant idea and one focal accent per Level-1 plate; labels in the hero variant; structure readable at 300–360 px card width without labels.
- Every connector stands for a real relation; every layer is a real part of the concept; no decorative technical noise.
- Level 2: dark `.viz-panel` inside the existing figure frame, real HTML text, SVG only for connectors and miniature visuals, a legend when line styles carry meaning, connectors hidden and content stacked on narrow screens, reading order equal to visual order.
- The figure may not add claims the entry does not make; illustrative scenarios are labelled.

### Quality gate (before accepting a figure)

Premium technical editorial rather than clip art? Main idea clear in seconds? Depth, layers and routes meaningful? Focal highlight guiding attention? Free of characters? Composed at card size? Adds information beyond the title? Different from unrelated figures? Consistent with the references? Reject anything that reads as an icon diagram, a placeholder or a stick-figure scene.

### Pilot (accepted 2026-11-05)

- **L1 `accessibility-concept`** (`concepts/viz-plates.tsx`): an exploded digital service — content and semantics at the base; the lit accessibility tree (names, roles, states); the glass interface layer with a visible focus ring; captions and text-size alternatives on top — with five access-channel modules (keyboard, switch, screen reader, voice control, magnifier) routed into the tree, the switch route dashed and stopped at a cross (drag-only control), and a positive callout for an announced status message. Reviewed light/dark page themes, card and hero.
- **L2 `accessibility-concept.perspectives`**: one scenario card (lecture videos without captions, barrier marked) branching to three lens modules, each with the question it asks, a miniature visual (one case selected; every recording captioned; the ICF interaction with the environmental factor lit), the response and its five-point profile; the CRPD as an illuminated rights band marked "Not a fourth model" with amber links to all three; a legend. Reviewed at 1440, 820 and 390 px.

### Migration order and remaining work

Migrate one figure at a time: read the entry, name the single visual lesson, choose the family, build from the kit, check against the entry, render light/dark page themes at card, hero and mobile, then update docs. Keep any earlier figure that already meets the gate. `docs/ILLUSTRATION_COVERAGE.md` shows each plate's style (generated). Remaining published-entry plates, by learning-path priority:

1. UX Fundamentals: usability, user-experience, ui-design, user-centred-design, double-diamond, mental-models, affordances, signifiers, gulfs-of-execution-and-evaluation, recognition-over-recall, cognitive-load-theory, jakobs-law, progressive-disclosure, nielsen-usability-heuristics, heuristic-evaluation, usability-testing, system-usability-scale.
2. HCI Fundamentals: human-computer-interaction, working-memory-model, fitts-law, hick-hyman-law, steering-law, keystroke-level-model.
3. UI Fundamentals: gestalt-principles, visual-hierarchy, modular-type-scale, colour-contrast-ratio, design-tokens, aesthetic-usability-effect.
4. Interaction Design: interaction-design-discipline, doherty-threshold, teslers-law.
5. Usability Engineering: shneiderman-golden-rules, cognitive-walkthrough, task-success-rate, nasa-tlx, confidence-intervals, sample-size-estimation, ab-testing.
6. UX Research: card-sorting.
7. Other published: choice-overload, heart-framework, information-architecture, jobs-to-be-done, millers-law, net-promoter-score, peak-end-rule, serial-position-effect, von-restorff-effect, wcag.
8. Then the twenty subject plates and the planned-topic plates.

Level-2 figures migrate with their entry. Quantitative figures with explorers (Fitts, Hick, colour) keep their formula-driven geometry; only their visual treatment changes.


## Visual Learning System (illustration v6.1) — the governing model

Decisions D-089…D-092 (2026-11-06). This section **governs all knowledge figures** and refines the v6 section above: the dark technical canvas is one language among several, chosen when the concept is a system or architecture, not the default for every topic.

### Three independent dimensions

| Dimension | Question | Where it lives | Rule |
|---|---|---|---|
| A · Category (12) | *What* does the figure teach? | `components/illustrations/visual-taxonomy.ts` (`VISUAL_CATEGORIES`), per plate in `visual-register.ts` | One primary, optional secondaries. **Not** the knowledge taxonomy, which stays frozen in `content/taxonomy.ts`. |
| B · Method (5) | *How* does it explain? | `EXPLANATION_METHODS`; per plate in the register; per Level-2 figure via `method` or `METHOD_FOR_TYPE[type]` | One primary, optional secondaries. Techniques (anatomy, measurement, charts, state machines…) are tools inside a method, never a sixth method. |
| C · Language | *How* does it look? | `IllustrationEntry.canvas` + kits | `sheet` (instructional, theme-aware), `viz` (dark technical), or the earlier pastel plate until migrated. |

Levels stay as before: **L1 Understand** (plate: one idea, readable at card size), **L2 Explore** (`components/visual-explanations`: mechanism, parts, relationships, legend, takeaway, text version, sources, verification), **L3 Experiment** (explorers and labs, only where manipulating a variable teaches something; computed with `lib/formulas`).

**The 12 categories:** 1 UX Concept · 2 UI Anatomy · 3 UX Process · 4 User Research · 5 Information Architecture · 6 Interaction Design · 7 Wireframe & Prototyping · 8 Visual Design & Composition · 9 Design Systems · 10 Usability & Accessibility · 11 Responsive & Adaptive · 12 UX Evaluation & Optimization (scopes in `visual-taxonomy.ts`).

**The 5 methods:** Conceptual & Metaphorical (label metaphors; show the real mechanism) · Process & Sequential (correct order, decision points, feedback loops, inputs/outputs) · Relationship & Systems (real dependencies, boundaries) · Comparison & Contrast (same context, what changed, why it matters, no invented advantages) · Hierarchy & Classification (correct parent-child relations, directionality).

### Choosing the language

| Canvas | Use for | Built with | Theme |
|---|---|---|---|
| `sheet` | UI anatomy, measurement, formulas and geometry, processes, comparisons, corrections — the instructional references (07–16) | `system/sheet.tsx`: `SheetCanvas`, `UiFrame`, `UiText`, `UiButton`, `UiField`, `UiChip`, `Measure`, `Marker` (with leader), `Verdict` (✓/✗), `Note`, `Pointer` | Follows the app theme: only app tokens (`surface`, `ink`, `rule`, `accent`, `ok`, `error`, `--c-*`) |
| `viz` | Architectures, layered systems, routed relationships, state flows with one illuminated path — references 01–06 | `system/viz.tsx`: `Slab` (base/lit/glass/dim, plane labels), `ModuleCard`, `Route`/`isoRoute` (accent/positive/blocked/neutral), `Junction`, `Guides`, `Bloom`, `ContactShadow`, `Callout`, `Tag`, `Brackets` | Dark in both themes (`--viz-*`) |
| pastel (earlier) | Not for new work | v4/v5 primitives | Legacy until migrated |

Do not force every concept into a dark panel, an isometric stack or a comparison card. Pick the method first, then the canvas that makes it clearest.

### Hairline: adopted, adapted, not used

Studied: the Hairline README, site, docs and skills pages (MIT, Lucas Marques). The package was **not installed** (it renders on the client into an empty server box; our plates must server-render and teach specific content; a dependency needs owner approval).

| Hairline principle | In UX Academy |
|---|---|
| One constant stroke width in CSS pixels at any size | **Adopted:** every kit stroke uses `vector-effect: non-scaling-stroke`. |
| Tone roles: edge = silhouettes, mid = every other stroke, lo = what recedes, hi = what is lit | **Adopted:** `.sheet` maps `--ill-edge/mid/lo/focal` to app tokens; `Slab` now draws faces without strokes, one silhouette outline and quieter internal creases (form reads from the outside in). |
| The plate is filled and matches its background | **Adopted:** every canvas paints its own background (`SheetCanvas`, `VizCanvas`). |
| Isometric construction on one grid | **Adopted:** `iso`/`plane`/`isoRoute` keep slabs, labels and routes on the same projection. |
| Pointer response through one `intensity` (0–1), shared animation loop, rest when off screen, reduced motion holds still | **Deferred, not used yet:** plates are server-rendered and static-first; interaction belongs to L3 explorers. If pointer response is added, it must follow these rules (one intensity control, still under reduced motion, never the only way to see information). |
| Stock figures (pillars, crates, dials…) | **Not used:** our figures are composed for each concept. |

### Reference catalogue (`.local/visual-style-references/`, git-ignored; study, never copy)

| # | Reference | Teaches | Category · method it informs |
|---|---|---|---|
| 01 | Isometric exploded architecture | layered system, one lit functional layer, routed inputs | Design systems, IA, accessibility · relationship |
| 02 | Product swap workflow | real objects in interface cards, branching routes, junctions | Interaction, process · process |
| 03 | Retention vs cancellation flow | decision, path semantics (solid/dashed), legend, consequence labels | Interaction, evaluation · process/comparison |
| 04 | Agent runtime infrastructure | modules on a platform, highlighted module with a callout | Systems · relationship |
| 05 | Editorial problem storytelling | modular cards with sparse highlighted data | Evaluation, metrics · conceptual |
| 06 | Support analytics dashboard | one luminous focal value, target line on a chart | Metrics · conceptual/comparison |
| 07 | F- and Z-pattern | numbered scan sequence on page wireframes | Visual design · comparison/process |
| 08 | Corner-radius geometry | close-up cross-section, value chips, ✓/✗ correction | Visual design, UI anatomy · comparison |
| 09 | Touch-target measurements | dimension lines on a target. *Caution: the reference labels the smaller target ✓ under "Poor touch areas"; the lesson is inverted — never inherit a reference's claim.* | UI anatomy, accessibility · comparison |
| 10 | Colour contrast before/after | annotated leaders on a real banner, before/after | Visual design, accessibility · comparison |
| 11 | UI card anatomy | numbered markers with arrows to parts | UI anatomy · hierarchy |
| 12 | UI measurement and spacing spec | redline spacing and sizing chips | UI anatomy, design systems · relationship |
| 13 | Colour contrast examples | ratio stated beside each sample | Visual design · comparison |
| 14 | UX microcopy comparison | same card, one wording change, ✓/✗ | UI anatomy · comparison |
| 15 | Design-to-code spec mapping | code lines connected to inspected properties | Design systems, practice · relationship |
| 16 | Colour scale and tokens | scale with selected steps mapped to usage | Design systems · hierarchy |

**Web references studied (2026-11-06):** NN/g, "F-Shaped Pattern of Reading on the Web" (Pernice, 2017, reviewed 2026): annotated heatmaps and gaze plots with numbered fixations; it presents the F as the default *when text lacks formatting cues*, names other patterns (layer-cake, spotted, marking, bypassing, commitment) and calls the F bad for users — so a future F-pattern figure must show it as a symptom of unformatted text, never as a layout to design for (the IDF comparison image 07 does not say this). component.gallery: anatomy by name, aliases and one-line definitions with faceted systems. Mobbin: screens, flows and patterns as a reference corpus, explicitly "evidence of how real products are designed, not proof that a pattern improved performance". Refero Styles: style cards with mood descriptors and machine-readable design specs. Apple Human Interface Guidelines and refero.design returned no readable content to the fetch and were not studied.

**Gaps the catalogue exposes in our library:** no Responsive & Adaptive figures at all; no wireframe-fidelity figure; no microcopy before/after; no design-to-code mapping; research synthesis and evidence-traceability figures are missing; evaluation figures are mostly generic charts.

### Rules (all canvases)

- One dominant idea per L1 plate; structure readable at 300–360 px without labels; labels and notes in the hero variant; the description is the text alternative and must state what the figure shows, in order.
- Interfaces are believable: real hierarchy, real control types, states, labels and feedback, fictional and labelled illustrative. No empty rectangles with grey bars as the whole interface.
- Measurements state values that are real for the drawing or computed (Fitts's ID comes from `lib/formulas/pointing.ts`); illustrative inputs are labelled; no invented data, effects or advantages.
- Meaning never by colour alone: ✓/✗ glyphs, dashed versus solid, crosses on blocked routes, words.
- Colour only from tokens (tested for v6 files); positive = `ok`/`--viz-positive`, failure or barrier = `error`/`--viz-warning`, primary interaction or focus = `accent`/`--viz-accent`, structure neutral.
- People only when the human activity is the concept, never instead of the mechanism; no `Figure` in current-system plates (tested).
- Motion only to teach (Fitts's pointer travels the measured path), static first frame complete, off under reduced motion, pausable.

### Anti-patterns (reject)

Stick-figure scenes standing in for a system · icon grids that index rather than explain · generic grey-bar windows · decorative isometric stacks for flat ideas · neon glow on everything · one composition reused for unrelated topics · a metaphor presented as the mechanism · labels baked into images · copied or traced reference artwork.

### Migration and QA procedure

Per figure: read the entry → name the single learning outcome → choose category and method → choose canvas → design the hierarchy → build from the kits → check every label against the entry → set `canvas` and update `visual-register.ts` (verdict `retain` only once it passes) → render with `scripts/render-plates.tsx` (card and hero, light and dark) and inspect in the app at 1440, 1024, 820 and 390 px → run `npm run check`, the build and the browser suites → `npm run docs:generate`. The generated `docs/ILLUSTRATION_COVERAGE.md` shows every plate's category, method, style and verdict and each category's maturity; it is the only source for progress figures.

### Pilots accepted (2026-11-06)

| Concept | Category · method | Canvas | Composition |
|---|---|---|---|
| Fitts's law | UX Concept · conceptual (+ measurement) | sheet | start, target, ballistic + corrective path with speed dots, D and W dimension chips, ID computed (≈ 2.81 bits), MT–ID inset without invented coefficients; pointer travels the path in the hero |
| UI design | UI Anatomy · relationship | sheet | believable booking screen, five numbered decisions with leaders, 16/12 spacing chips, states and feedback |
| Double Diamond | UX Process · process | sheet | divergent notes → clusters → problem; prototypes → tested candidates → solution; loops back |
| Information architecture | IA · hierarchy (+ relationship) | viz | navigation, organisation + labels, content as exploded layers; browse route through matching labels; search as a second route |
| Accessibility | Usability & Accessibility · relationship | viz | exploded access architecture with Hairline silhouettes; one blocked route |
| Interaction design | Interaction Design · process | viz | one control across ready, pressed, processing, paid; timeout branch and recovery |

Level 2 figures meet the structural standard (objective, takeaway, ordered text version, sources, verification) but, except accessibility, still use the earlier light panel styling; they migrate with their entry.

### Replacements accepted (2026-11-06, D-093)

The eight plates the audit marked **replace** were redrawn one at a time on the `sheet` canvas (`concepts/foundation-sheets.tsx`) and swapped in place: same slugs and registry order, explorers kept (`signifiers`, `hci-methods`), legacy definitions removed. Each now has the verdict `retain`. No person figures: each shows the mechanism through a believable interface or a structure.

| Plate | Category · method | Composition | Accuracy check against the entry |
|---|---|---|---|
| Mental models | UX Concept · relationship | designer's conceptual model (edit → cloud copy → phone) → editor screen with no saved state shown (system image) → user's model (edit "needs Save" → this laptop; the rest missing); direct designer-to-user arc crossed out | Norman's three models; the system image is the only channel; the autosave example is the entry's own |
| Affordances | UX Concept · comparison (+ hierarchy) | phone inbox with 1 a visible Archive button, 2 a swipe-to-delete with no cue (dashed), 3 a heading styled as a link that does nothing; sorted into a possible × perceived grid with ticks and crosses | Gaver's perceptible / hidden / false affordances as defined in the entry |
| Signifiers | Interaction Design · comparison | the same export control with the same dashed hit area, as plain text (✗) and with four numbered cues: shape, download icon, label, hover + pointer (✓) | Same affordance, different signifiers; redundant cues; plain text read as non-interactive |
| Usability testing | Evaluation · process | task card (the entry's train task) → interface under test with three numbered observations (hesitation, think-aloud question, success) → session timeline with time on task 1:32 → findings with severity bars linked to observations | Task without the answer, think-aloud, observation per task, severity rated after sessions; the session is labelled illustrative and shows no frequencies |
| Usability | Usability & Accessibility · relationship (+ comparison) | one ticket machine, two contexts of use (commuter / hurried first-time visitor), each measured for effectiveness, efficiency and satisfaction | ISO 9241-11 components relative to users, goals and context; the entry's own ticket-machine analogy; step counts follow the drawn routes, outcomes are illustrative |
| User experience | UX Concept · process (+ relationship) | one train journey: advert (before), booking and barrier (during), cancellation and six-week refund email (after); responses below a line separating designed touchpoints from what happens in the person | ISO 9241-210 before/during/after; the entry's booking, barrier and refund example; UX cannot be designed directly |
| Human-computer interaction | UX Concept · relationship | person, task, technology and context around the act → respond → feedback → interpret loop; context changed from desk to moving car, so two links shift (glance only; small targets hard to hit); study → design → evaluate cycle | The entry's four-element model and its desk-versus-car example; the three strands of HCI work |
| WCAG | Usability & Accessibility · hierarchy | 4 principles → 13 guidelines (two opened, the rest collapsed by number range) → five real success criteria with levels (1.4.3 AA, 1.4.6 AAA, 1.4.11 AA, 2.1.1 A, 2.5.8 AA); A ⊂ AA ⊂ AAA with AA as the usual target; non-normative Techniques dashed | WCAG 2.2 numbering, names and levels; guidelines are not testable; AA means every A and AA criterion |

The v5.1 pilot table above (HCI, Mental Models, Usability Testing) is kept as history; those three plates are now the replacements listed here.

**Known limit (all sheet plates, including the pilots).** The smallest interface text (5–5.6 plate units) renders at about 4–4.5 CSS px when the hero is about 316 px wide on a 390 px phone. It is legible in the hero at tablet and desktop widths; on phones the figure relies on its text description and the entry. Raising the minimum text size means recomposing the plates, not scaling them, and should be decided for the sheet kit as a whole.

### Design System figures (2026-11-06, D-095)

| Figure | Category · method | Canvas | Composition | Check against the entry |
|---|---|---|---|---|
| L1 `design-system` | Design Systems · relationship (+ hierarchy) | viz | principles-and-needs ground; foundations and tokens (glass), components, a pattern and three product slabs, exploded; one action colour traced as an accent route from its swatch through the button and the sign-up form into all three products; a documentation-and-governance spine behind the stack linked to every layer; a dashed feedback route from the products back to the spine | layers and relationships as in the entry's intermediate level; the layers are labelled a teaching model in the description |
| L2 `design-system.architecture` | relationship | viz panel (HTML) | six layers, each with what it holds, a Harbourline example (illustrative) and what a change there reaches; up and dashed-down connectors; documentation and governance beside every layer; core-versus-extension note | entry's intermediate explanation and worked example |
| L2 `design-system.contribution` | process | viz panel (HTML) | seven steps from a product's need to adoption, with GOV.UK's two checkpoints outlined, coral stop paths and grey return paths, and the loop back to new needs | GOV.UK's published proposal, development and review pages, read 2026-11-06 |

QA performed: plate at card and hero size in both page themes; the page in the app at 1440, 1024, 820 and 390 px in both themes, with no horizontal overflow; the label that touched the left edge on narrow heroes was moved. No Level 3 (D-095).

## Text standard and mobile composition (session 24, D-101 to D-104)

**Measured, not assumed.** The hero plate renders at 314 CSS px on a 390 px phone (scale 0.785) and 492 px at 1440. Before this standard every label in the 15 current plates was below 10 px at 390 (smallest 3.6 px). Measure with a browser: computed font size × `getScreenCTM()` scale, per `<text>`.

| Role | Plate units (400-unit viewBox) | At 390 px | At 1440 px |
|---|---|---|---|
| Secondary interface copy (`T.min`, `T.ui`) | 13 | ≈10.2 px (floor) | 16 px |
| Primary labels, phase and zone headers (`T.strong`) | 16 | ≈12.6 px | 19.7 px |
| Marker numerals (`T.marker`, `VizMarker`) | 16 | ≈12.6 px | 19.7 px |
| Interface titles (`T.title`) | 17 | ≈13.3 px | 20.9 px |

**Recompose, do not scale.**
1. The drawing keeps only what must be read in place: interface copy that makes the depicted screen believable, phase names, and numbered markers.
2. Every explanation moves to the HTML **figure key** (`IllustrationEntry.key`: `{ n, label, detail }[]`), rendered by `PlateKey` directly under the hero (entry, lesson and home pages). The key reflows, is selectable and is read in order by screen readers (an `ol` labelled "Figure key", each item prefixed "Marker n:" for assistive technology).
3. Interface copy that does not carry the idea becomes a `TextBar`. The sheet kit no longer has `Note`.
4. No `scale()` transforms in sheet plates. Viz plates may scale the whole figure up to fit the canvas, never down.
5. Isometric plane text (labels on slabs and modules) is not used in heroes: it skews with the projection and cannot reach the floor on a slab. Use a `VizMarker` beside the layer and a key item.
6. Cards are decorative thumbnails and carry no markers, but their text obeys the same floor (tested).

**Gate:** `tests/plate-text.test.ts` renders every sheet and viz plate as card and hero and fails on any text below `T.min`, text without an explicit size, a shrinking `scale()`, a missing key, or size tiers that would fall below 10 / 12 px at 390.

**Result (measured on the built site):** all 11 sheet plates at 10.2 px minimum at 390 and 16 px at 1440; the 4 viz plates (information-architecture, accessibility-concept, interaction-design-discipline, design-system) recomposed with markers and keys and covered by the same test. Compositions changed in this pass: Double Diamond (Define clusters and Develop prototypes kept inside their halves; loop-back arrows moved below both diamonds), affordances (an overflowing text bar removed), user experience (response pills sized to their words), WCAG (badges moved clear of criterion names; the Techniques row hangs from the branch instead of crossing the criteria), the interaction-design viz plate (state cards rebuilt at 84 units).

**Level 2 (D-102, D-104).** Figures declare `language`: `sheet` for anatomy, measurement and comparison; `viz` for processes and systems. The figure body takes `.fig-sheet` or `.fig-viz`; inside `.fig-viz` the app roles map onto `--viz-*` tokens, so the HTML templates need no dark variants. Labels, markers and tags are ≥ 12 px at every width; depicted interface copy may be 11 px, never below 10.
