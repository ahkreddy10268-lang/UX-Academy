# Visual QA log

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
