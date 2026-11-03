# Visual QA log

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
