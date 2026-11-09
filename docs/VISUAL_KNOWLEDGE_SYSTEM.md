# Visual Knowledge System

A visualisation must **explain** something. A learner should get the basic idea from the visual before reading the full explanation, and an advanced learner should be able to inspect its parts, relationships and limits.

> **v6.1 (D-089):** every Level-2 figure has a method (`method` or `METHOD_FOR_TYPE[type]`) and is counted under its entry plate's category in docs/ILLUSTRATION_COVERAGE.md; the governing model is docs/ILLUSTRATION_SYSTEM.md § Visual Learning System.
>
> **Superseded in part by v6.1:** the v6 decision (D-086) made the dark technical canvas (`canvas: "viz"`, `--viz-*` tokens, `components/illustrations/system/viz.tsx`) the standard for every knowledge figure. Under D-089 it is **one of two current languages**: `viz` for systems, architectures, routes and processes, and the theme-aware instructional `sheet` (`system/sheet.tsx`) for interface anatomy, measurements, comparisons and annotated examples. Choose the method from the knowledge, then the canvas; do not force a topic into either. Category, method and canvas are three independent dimensions recorded in `components/illustrations/visual-register.ts` and `visual-taxonomy.ts`; docs/ILLUSTRATION_SYSTEM.md § Visual Learning System is the authority if this document and it disagree.

## Three levels

| Level | Purpose | Where it lives | Implementation |
|---|---|---|---|
| 1 · Quick visual | The idea in seconds | Cards, subject tiles, concept and lesson heroes, plus the "At a glance" line | Plates (`components/illustrations/`; counts, styles and audit verdicts in the generated docs/ILLUSTRATION_COVERAGE.md); `quickTakeaways` in the visual registry |
| 2 · Detailed explanation | Parts and relationships | Concept page → "Visual explanation" (full width, before the article) | `components/visual-explanations/` (this document) |
| 3 · Interactive model | Change a variable, see the effect | Below the Level-2 figures on the concept page; labs | Explorers (`components/illustrations/interactive/explorers.tsx`) and labs (`components/labs/`), computing only with `lib/formulas` |

Not every concept needs all three. The registry decides which concepts get Level 2. The cost is justified when the concept has parts, a sequence, a structure or a mechanism that words describe less clearly than a picture.

## Architecture

```
components/visual-explanations/
  types.ts           VisualExplanation, VisualType (10 strategies), VisualLevel, labels
  primitives.tsx     Marker, Legend, FlowArrow, DiagramNode, Tag, IllustrativeBadge (HTML/CSS)
  figure.tsx         VisualFigure: the frame that answers the five questions + text version + sources
  diagrams/          reusable templates
    process-timeline.tsx   diverge/converge phases, decision gate, return path
    hierarchy-tree.tsx     nested-list tree with markers, highlighted path and target
    comparison.tsx         before → problem → cause → intervention → after → effect (+ claim kind)
    formula-anatomy.tsx    expression with numbered terms ↔ geometry ↔ key
    process-cycle.tsx      iterative loop (2 × 2 ring + hub of principles) with a decision exit
    annotated-interface.tsx simplified interface with placed markers + key ("if broken")
    parallel-flow.tsx      independent lanes merging (evaluators, raters) then onward steps
    decision-tree.tsx      yes/no questions leading to a recommended choice
  concepts/          original compositions per concept
    fitts-law.tsx · double-diamond.tsx · cognitive-load.tsx · information-architecture.tsx
    user-centred-design.tsx · gestalt-principles.tsx · heuristic-evaluation.tsx
  registry.tsx       slug → explanations; quickTakeaways (Level 1)
```

SVG primitives for drawn shapes (arrows, cursors, dimension lines, labels) are **reused** from `components/illustrations/primitives.tsx`, not duplicated. Presentation metadata lives in the registry; academic content stays in `/content`, and a visual only restates what its entry already says.

## Registry record

| Field | Meaning |
|---|---|
| `id` | Stable, `slug.purpose` |
| `slug` | The entry it explains (must be published) |
| `type` | Visual strategy, chosen by what the knowledge is: `formula`, `process`, `conceptual`, `system`, `hierarchy`, `comparison`, `annotated-interface`, `journey`, `decision`, `isometric`, `timeline` (added in session 9 for the HCI landmarks figure: dated items marked System / Research / Framing, with sources) |
| `level` | 1, 2 or 3 |
| `title`, `objective`, `takeaway` | "What am I looking at?" and "What should I understand?" |
| `summary[]` | The diagram read in order. It is the screen-reader text version, the "Read this diagram as text" disclosure, and the fallback on any device |
| `verification` | `content-checked` (labels restate the entry's sourced content) or `illustrative` (an example scenario, badged as such) |
| `sources[]` | Source ids the labels rest on. They must already be in the entry's references (tested) |
| `Component` | The composition |

## Gold-standard examples

Each one uses a different strategy (this is tested):

| Concept | Strategy | Level 2 | Level 3 |
|---|---|---|---|
| **Fitts's law** | Formula anatomy + interface comparison | Each symbol of MT = a + b·log₂(D/W+1) tied to the geometry; Save placed as a far 20px icon vs a full-width button, with ID computed (4.64 → 1.42 bits). No time is claimed | Explorer: distance, width, direction of approach (W′), easy-vs-difficult scale |
| **Double Diamond** | Process diagram | Four phases marked open-up / narrow-down, activities and outputs, the decision between the diamonds, the return path, Framework for Innovation principles | — (a process is not a quantity to manipulate) |
| **Cognitive Load Theory** | Conceptual model + comparison | Presented information → limited working memory ⇄ long-term schemas; one screen loading a novice and an expert differently; split attention (separate legend vs direct labels) | Explorer: information density (existing) |
| **Information Architecture** | System + hierarchy | Users / content / context and the four systems; an illustrative library hierarchy marking organisation, labelling, navigation and search, with a scent path to "Renew a loan" | — (tree testing is the real-world experiment) |

### Second set (session 5)

| Concept | Strategy | Level 2 | Level 3 |
|---|---|---|---|
| **User-Centred Design** | Iterative cycle | ISO 9241-210's four activities as a loop with methods and outputs, a hub of principles that apply throughout, and the "requirements met?" decision that exits or returns to *whichever* activity needs it; Gould & Lewis's three principles | — |
| **Gestalt Principles** | Annotated interface + comparison | A checkout step with markers for proximity, similarity, common region and connectedness, each with "if broken"; equal spacing vs inner < outer spacing | Explorer: proximity/similarity (existing) |
| **Heuristic Evaluation** | Parallel flow + decision tree | Three evaluators work alone (illustrative problem sets, 3 of 8 each), merge to 7 of 8 with one problem missed by everyone, rate severity 0–4 independently, validate with users; a tree separating usability testing, cognitive walkthrough, heuristic evaluation and unstructured review | — |

New interactive models: the **colour explorer** (HSV sliders, live swatches with white/black text contrast, a 12-hue luminance strip showing that equal "value" ≠ equal brightness; `hsvToRgb`/`rgbToHsv` tested) on the Colour Contrast Ratio page and as `/labs/colour-lab`; the **Jakob's law experiment** (`/labs/jakob-lab`), which varies only a control's position (familiar top right vs mirrored bottom left) with label, size and distance held constant.

### Review log (session 5)

Every Level-2 figure and Level-3 explorer was re-read against its entry:
- **Fixed:** the CLT model implied an expert's extraneous load is unchanged by the same screen; it now notes the expertise-reversal effect and cites Kalyuga et al. (2003).
- **Fixed:** the Fitts anatomy stated what the intercept *is*; it now says the non-difficulty time is *often attributed* to reacting, starting and pressing.
- **Fixed (accessibility):** the colour explorer's contrast captions sat inside the swatch and were illegible exactly when contrast failed; they now sit below it.
- **Checked, unchanged:** Hick, peak-end, chunking (Cowan ≈ 4), signifiers, cognitive-load explorers, and the Double Diamond, IA, Fitts placement and split-attention figures.

The Information Architecture entry was written for this release (domain `ia`), with three primary sources: Rosenfeld, Morville & Arango (2015), Furnas et al. (1987, DOI verified) and Pirolli & Card (1999, DOI verified).

## Adding a visual explanation

1. Decide whether a picture explains something the words do not. If it doesn't, don't add one.
2. Pick the strategy from the knowledge type (spec Part 05: process for methods, formula for laws, conceptual for theories, hierarchy or system for structures, comparison for interventions). Record its explanation method (`method`, or the default from `METHOD_FOR_TYPE`) and choose the language for the objective: `viz` for systems and processes, the light/dark panel or sheet style for annotated interfaces and comparisons.
3. Build it from `diagrams/` templates and primitives. Write the concept file in `concepts/`.
4. Register it with an objective, takeaway, ordered summary, verification kind and sources from the entry's references.
5. Check it in light and dark at 1440, 1024, 820 and 390px. Then run `npx vitest run tests/visuals.test.ts`, and run `tests/browser/e2e-redesign.cjs` against a build.

Rules for drawing are in `docs/DIAGRAM_DESIGN_GUIDELINES.md`.

### Design System (session 22)

| Concept | Strategy | Level 2 | Level 3 |
|---|---|---|---|
| **Design System** | System (relationship) + process | *Architecture*: six layers from principles to product interfaces, each with what it holds, an illustrative Harbourline example and what a change there reaches, with documentation and governance beside every layer and a core-versus-extension note. *Contribution*: from a product's need to a release and back, following GOV.UK's published proposal, development and review process, with the paths that stop or return a proposal. Both in the `viz` language | — (D-094: a component explorer would mostly restate token theming already taught by Design Tokens; no variable has a computed, checkable output) |

### Figure languages (session 24, D-102)

`VisualExplanation.language` is optional: `"sheet"` or `"viz"`. `components/visual-explanations/figure.tsx` wraps the figure body in `.fig-sheet` or `.fig-viz` (`app/globals.css`); the header, takeaway, text version and sources stay on the workspace surface. Seven pilots declare it (tested in `tests/visuals.test.ts`); the accessibility and design-system figures draw their own viz panels; the other 13 figures are still on the plain workspace surface and are listed as "not yet restyled" in the generated `docs/ILLUSTRATION_COVERAGE.md`. Restyle them one at a time, choosing the language from the method, and check every label at 390 px.

### All figures in a language (session 25, D-107)

Every one of the 23 Level-2 figures now declares `language`, and `tests/visuals.test.ts` requires it. Thirteen were moved this session: on `viz`, the cognitive-load architecture, the human-centred design cycle, the HCI interaction model, ecosystem and research cycle, and the heuristic-evaluation flow and decision tree; on `sheet`, the split-attention comparison, the HCI timeline, paradigms and perspectives, and both Gestalt figures. The accessibility and design-system figures no longer draw their own dark panels inside the body; `.fig-viz` supplies the canvas. Labels, markers and tags are at least 12 px at 390, 820, 1024 and 1440 px in both themes (measured), with depicted mock-interface copy at 11 px.
