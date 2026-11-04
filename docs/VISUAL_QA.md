# Visual QA log

## 2026-11-04 — session 5: new visuals, colour and Jakob models, keyboard and device testing

### Method
Production build (`next build` → `next start`), Playwright 1.63 Chromium.
- Each new figure was screenshotted on its own at 1440 px (light) and 390 px (dark): UCD cycle, Gestalt annotated interface and spacing comparison, Heuristic Evaluation flow and decision tree. The colour explorer was captured at blue (H 240, S 100, V 100), and the Jakob lab after a completed run.
- **Keyboard and accessibility tree** (`tests/browser/keyboard.cjs`, 43 checks): skip link, sidebar Tab order and focus outline, collapse by Enter, tooltip on focus, search by `/` + arrows + Enter, diagram text version by Enter, explorer sliders by Home/End, library toggles and selects, a Jakob trial by keyboard, and the mobile drawer (focus moves in, never reaches content behind, Escape returns focus). It also checks structure on 10 pages (one main, one h1, no heading skips, named images, buttons and nav landmarks) and an aria snapshot of a process figure.
- **Device emulation** (`tests/browser/devices.cjs`, 137 checks): iPhone SE, iPhone 13, Pixel 7, Galaxy S9+, iPad Mini and iPad Pro 11 (landscape), across 19 pages. It covers overflow, tap to open the drawer, tap on a slider, and WCAG 2.2 SC 2.5.8 target size (≥ 24 × 24 px; inline links exempt).

### Problems found and fixed
| Found | How | Fix |
|---|---|---|
| Collapsed-sidebar tooltip inside the link would double its accessible name ("Labs Labs") when shown | keyboard/AT-tree suite | Tooltip `aria-hidden` (D-042) |
| Standalone links, `<summary>` toggles, range inputs, checkbox labels and a "Show data" button under 24 px tall | device suite (target size) | `.tap` utility, base styles for range/summary, `min-h-6` labels (D-041) |
| 15-lesson progress rail: 22 px-wide link segments on phones | device suite | Static bar below 640 px; Previous/Next navigate |
| Colour explorer hue strip: `<ul role="img">` with list items | axe (serious, 2 pages × 2 themes) | `div role="img"` |
| Colour explorer contrast captions illegible inside failing swatches | screenshot review | Captions below the swatch |
| UCD hub squeezed into a narrow pill; Gestalt markers covering labels | screenshot review | Wider hub column; markers in a reserved gutter |
| Jakob and steering tables: cramped columns | screenshot review | Cell padding, minimum table width |
| CLT model implied unchanged extraneous load for experts; Fitts anatomy stated the intercept's meaning as fact | accuracy review | Expertise-reversal note (+ Kalyuga et al. 2003); "often attributed to" |

### Automated results (final build)
- `npm run check`: **160/160 unit tests**, typecheck and lint clean. `npm run build`: 813 pages.
- Crawl of 32 routes: all 200 except `/nope` (404 as intended).
- `e2e.cjs` **42/42** · `e2e-redesign.cjs` **66/66** (new: seven concepts' figure counts, library diagram filter = 7, colour explorer values and reset, a full 18-trial Jakob run with exactly one target per trial, 390 px overflow on 15 pages) · `keyboard.cjs` **43/43** · `devices.cjs` **137/137**.
- axe-core WCAG 2.2 AA: 80 pages (34 templates + 46 entries) × light/dark = **160 audits, 0 violations** (after the fix above).

### Could not be tested
- **Screen readers.** VoiceOver, NVDA, JAWS and TalkBack are not available in this Linux cloud container. The keyboard suite checks what Chromium's accessibility tree exposes (roles, names, structure, live regions); it does not show how any screen reader announces or navigates the pages.
- **Real devices.** No physical phones, tablets or desktops are attached. The device suite uses Playwright emulation (viewport, DPR, touch events, mobile UA) in Chromium only. It does not cover Safari/WebKit rendering, real touch latency, OS font scaling, browser chrome or performance.
- **Human timing.** The Jakob and steering labs were driven by scripts, which shows the mechanics work; the times recorded are machine times, not evidence about people.


## 2026-11-03 — v4 Visual Intelligence

### Method
Production build, Playwright Chromium. All screenshots below were captured and inspected.
- **Matrix:** home, library, Fitts's Law, Double Diamond, Cognitive Load Theory, Information Architecture, learning path, Formula Lab (Fitts) and My Learning, at 1440 / 1280 / 1024 / 768 / 390 / 360 × light / dark = **108 overflow checks**. **54 screenshots** were kept (1440 and 390 in both themes; 1024 and 768 in light), plus full-page light/dark pairs of the three new gold-standard pages.
- **Per figure:** each Level-2 figure was captured on its own at 1440 and 390 (Fitts ×2, Double Diamond, Cognitive Load ×2, IA ×2), and the plate sheets for the four gold-standard concepts in both themes.

### Problems found and fixed
| Found | Fix |
|---|---|
| Diagrams squeezed into the 46rem reading column (four-phase process unreadable) | Full-width visual section; templates respond to their container (`@container`) |
| Process phases too narrow side by side at laptop widths | Diamonds side by side and phases stacked inside each diamond, with a fully horizontal layout only at ≥72rem containers |
| IA plate: search lens and label overlapped the Events group; label text on the pale base was low contrast | Lens moved over the gap; active label drawn on the category ink |
| IA Venn sub-labels crossed circle strokes | Labels moved below the circles |
| Duplicate "Design Council (UK); Design Council (UK)" source line under a figure | Citation shows author and title |
| Cognitive-load bar: white text on a pale violet base | Segment uses the category ink; extraneous load uses a hatch texture (no colour-only meaning) |
| axe: `aria-label` on a `<p>` in the formula anatomy | `role="img"` with label (0 violations after the fix) |
| React lint: render-time mutation in the process template | Marker numbers computed, not mutated |

### Automated results (final build)
- `npm run check`: **155/155 tests**. These include `tests/visuals.test.ts` (6), `tests/editorial.test.ts` (4), 56 token tests (incl. semantic status tokens), content gates for the new IA entry and illustrations (69 plates). Typecheck and lint clean.
- `npm run build`: 811 pages. `npm run sources:verify` on the new DOIs: Pirolli & Card 1999 and Furnas et al. 1987 verified with Crossref.
- Crawl of 27 routes: all 200 except `/nope` (404 as intended), 0 console errors.
- `tests/browser/e2e.cjs` **42/42** · `tests/browser/e2e-redesign.cjs` **56/56**. New checks: the number of figures per gold concept, takeaway and text version present, the text version expands into an ordered list, all four phase names are real text, the at-a-glance line, the library diagram filter (4 results), the curriculum map, and no 390px overflow on 12 pages.
- axe-core WCAG 2.2 AA: 78 pages (32 templates + 46 entries) × light/dark = **156 audits, 0 violations** (after the one fix above).

### Limits
- The reference images (five dashboards, four visual explanations) were not available in the session.
- No screen-reader or real-device testing.
- Only four concepts have Level-2 explanations so far; the other 42 rely on plates (Level 1) and, for six, explorers (Level 3).


## 2026-11-03 — v3 Pastel Editorial Workspace

### Method
Production build (`next build` → `next start`), Playwright Chromium, deviceScaleFactor 1. Every screenshot listed here was captured and inspected, none was described from code.
- **Matrix:** home, library grid, library list, concept (Fitts), path, lesson, Formula Lab (Fitts), lab (CVD), graph and My Learning, each at 1440 / 1280 / 1024 / 768 / 390 / 360 × light / dark = **120 overflow checks**. **60 screenshots** were kept (1440 and 390 in both themes; 1024 and 768 in light) and reviewed as contact sheets.
- **Extra captures:** collapsed sidebar with tooltip, mobile navigation drawer, Fitts explorer at 45° and 90° (light and dark), steering lab after a scripted run, CVD lab full page, and plate sheets (Fitts, steering, affordances, signifiers, UCD, HCD) in light and dark.
- Screenshots live outside the repository (session scratchpad `qa3/`); they are QA evidence, not production assets.

### Problems found and fixed
| Found | Fix |
|---|---|
| Brief tokens failed contrast (muted 3.11:1, secondary 4.0–4.4:1 on washes) | Darker ink-2/ink-3 tokens; gated by tests/tokens.test.ts (40 checks) |
| Library: filter sidebar beside the app sidebar left ~800px for results; 3 cramped columns | Filter toolbar + container-query grid 4/3/2/1 |
| Featured card cramped at a 2-column span; first card alphabetical (A/B testing) | Full-row featured card; the flagship (Fitts) leads when no filters are set |
| Research card eyebrow truncated beside its thumbnail | Eyebrow above the thumbnail row |
| Hero concept meta grid wrapped badly at 4 columns | 2×2 grid |
| Fitts explorer: scene small, labels overlapping (W′ / D), W label clipped | Re-scaled scene (65%), relabelled, angle-aware D offset, centred canvas |
| Home evidence examples out of order; "Nielsen (2000) ·" trailing separator | Ordered strongest → contested; separator only when a container exists |
| CVD "most alike" used luminance contrast, which cannot show hue collapse (normal vision also showed 1.02:1) | CIE ΔE*ab (new tested `srgbToLab`, `deltaE76`) |
| Hydration mismatch in formula curves (float formatting differed between server and client) | Coordinates rounded to 2 dp |
| Lab cards: plate column did not fill height | Wash-filled, centred plate column |
| HCD plate labels collided with the spiral | Relabelled |

### Automated results (final build)
- `npm run check`: index, typecheck, **129/129 tests** (content gates, 53 formula tests incl. CVD/Lab/ΔE/W′, 40 token-contrast tests, illustrations, store), lint clean.
- `npm run build`: 810 static pages.
- Crawl of 29 routes: all 200 except `/nope` (404 as intended); 0 console errors.
- `tests/browser/e2e.cjs` **42/42** · `tests/browser/e2e-redesign.cjs` **45/45**. New checks cover: library paging, sort and subcategory URL state, sidebar collapse persistence and tooltips, the active nav state, the Fitts approach angle, both new labs, and no 390px overflow on 10 pages.
- Steering lab driven end to end by scripted drags (18 tunnels → table + fit), no page errors.
- axe-core WCAG 2.0/2.1/2.2 A+AA: 76 pages (31 templates + 45 entries) × light/dark = 152 audits, **0 violations**.

### Limits of this QA
- The five dashboard reference images were not available in the session.
- axe does not compute contrast over gradients; hero text sits on the lightest washes, where ink-2 is ≥6.3:1 by token test.
- No screen-reader (VoiceOver/NVDA) or real-device touch testing.
- 1280 and 360 were overflow-checked but not screenshot-reviewed.
- The `next dev` server prints a navigation warning about `params` outside Suspense and a script-tag warning. Neither appears in the production build.


## 2026-11-03 — v2 redesign

### Method
Production build (`next start`), Playwright Chromium. Screenshots actually captured and inspected (not described from code):
- Flagship pages at 1440×900 (home full page + section crops, library, Fitts's Law sections).
- Matrix: home, library, Fitts, subject (psychology), path (UX fundamentals), Formula Lab, My learning × 1440 / 768 / 390 × light / dark = 42 screenshots; contact sheets reviewed for mobile (5 pages), tablet (3) and desktop (2).
- Plate sheets for all 67 plates, card + hero, light + dark (`scripts/render-plates.tsx`).

### Problems found and fixed
| Found | Fix |
|---|---|
| Disciplines grid ragged (2-col spans + sidebar) | Full-width 5×2 grid under a heading row |
| Featured library card plate column collapsed to 1px (long formula min-content) | `minmax(0,…)` tracks, `min-w-0` |
| Library laid out at 1336px on phones (chip strip + featured card in implicit `auto` grid tracks); toolbar covered by header text | Explicit tracks + global base rule `.grid { grid-template-columns: minmax(0,1fr) }` |
| Hero search clipped on mobile | Same root cause; fixed by base rule |
| Raw `*markup*` in card summaries | `richToPlain` for cards, `Rich` on concept hero |
| Evidence-scale chips overflowing at 8 columns | 2/4-column scale |
| Plate number colliding with top-right labels | Moved to figure caption ("Pl. 01 — …") |
| Peak-end / Hick / Signifiers / Mental-models label collisions | Repositioned/shortened labels |
| Card hover lift moved click targets (unstable for pointer and tests) | Border-only hover |
| Explorer button text 3.94:1 (paper on violet base) | Category ink tone (≥ 5.5:1) |
| Overflow test was blind to layout-viewport growth on phones | Tests now measure against the device width |

### Automated results
- Route crawl: 36 routes, all 200, 0 console errors. Non-matching paths return 404; unknown slugs under dynamic routes show the not-found page with status 200 (known issue).
- `tests/browser/e2e.cjs` 42/42 · `tests/browser/e2e-redesign.cjs` 30/30 (incl. 10 pages with no horizontal scroll at 390px).
- axe-core WCAG 2.0/2.1/2.2 A+AA: interim run (54 pages × 2 themes) found 1 violation, fixed; final run on the final build, 68 pages (all 45 entries + 23 templates) × light/dark = 136 audits: **0 violations**.

### Limits of this QA
Zero axe violations does **not** prove accessibility: no screen-reader testing (VoiceOver/NVDA) or real-device touch testing was done. Keyboard paths were exercised in automated tests (tabs, search, drawer, explorers' range inputs) but not exhaustively by hand. 360px and 1024px were not screenshot-reviewed individually (covered by the 390px and 768px checks and fluid layout).

## Session 7 — `/learn` refinement
Screenshots (`.shots/learn-{light,dark}-{1440,1280,1024,768,390,360}.png`, not committed) reviewed for 1440 light and 390 dark; layout metrics checked at all 12 combinations: 3 columns at 1440 and 1280, 2 at 1024 and 768, 1 at 390 and 360, no horizontal overflow. Browser suites against the production build: e2e 42/42, e2e-redesign 66/66, keyboard 43/43; devices.cjs 137/137. axe was not run (axe.min.js unavailable offline). Unit tests 163/163, lint clean. Not tested: real devices, screen readers.

## Session 8 — learning experience refinement (`/learn`, `/learn/[id]`, lesson, entry)
Screenshots reviewed (light + dark, 1440 and 390): catalogue, path, lesson, level test, library entry; layout overflow measured on all five routes in all four combinations (0 px). Browser suites on the production build: e2e 42/42, e2e-redesign 66/66, keyboard 43/43; devices see PROGRESS. Unit tests 166 (3 new in tests/learning.test.ts). Not tested: axe (axe.min.js unavailable offline), real devices, screen readers.

## Session 9 — Human-Computer Interaction entry, coverage page
Screenshots reviewed (light/dark, 1440 and 390): library entry (plate, "Three lenses" figure), lesson, path, `/coverage`; overflow 0 px on all. A plate label contrast issue (label on solid fill in dark) was fixed by using the soft fill. Browser suites on the production build: e2e 42/42, e2e-redesign 66/66 (the "concepts with a detailed diagram" count rose 7 → 8 with this entry; the test was updated, not loosened), keyboard 43/43, devices 137/137. Not tested: axe (not available offline), real devices, screen readers.
