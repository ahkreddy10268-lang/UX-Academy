# Browser tests

Plain Playwright scripts run against a production server. They are not part of
`npm test` because they need a built app and a Chromium + Playwright install
(pre-installed in Claude Code cloud sessions; elsewhere run `npx playwright install chromium`
and `npm i -D playwright` locally — not committed as a dependency).

```bash
npm run build && npx next start -p 3100
node tests/browser/crawl.cjs / /library /library/fitts-law   # status codes, console errors, failed requests
node tests/browser/e2e.cjs                                    # 42 interaction checks (search, tabs, persistence, quiz, calculators, export/import, theme, mobile)
node tests/browser/e2e-redesign.cjs                           # 45 v2/v3 checks (library paging/sort/subcategory/URL state, sidebar collapse + tooltips, explorers, new labs, motion, 390px overflow)
node tests/browser/colour-studio.cjs                          # 44 Colour Studio checks (tabs, wheel keyboard/pointer, harmonies, swatch edit + validation, role preview, copy, CSS/JSON export, WCAG edge cases, local image extraction, gradient CSS, save/restore, 390/768 px)
node tests/browser/atlas.cjs                                 # Knowledge Atlas: nav item and active state, totals, disclosure, search/alias/filters, URL + back/forward, mobile drawer, 390px
node tests/browser/keyboard.cjs                               # keyboard-only paths + accessibility-tree structure (not a screen-reader test)
node tests/browser/devices.cjs                                # device EMULATION: overflow, tap, WCAG 2.5.8 target size on 19 pages × 6 devices
AXE_PATH=/path/to/axe.min.js node tests/browser/a11y.cjs / /library   # axe-core WCAG 2.2 AA, light + dark
```

`BASE_URL` overrides `http://localhost:3100`. e2e starts with an empty browser profile.
