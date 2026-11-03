# Browser tests

Plain Playwright scripts run against a production server. They are not part of
`npm test` because they need a built app and a Chromium + Playwright install
(pre-installed in Claude Code cloud sessions; elsewhere run `npx playwright install chromium`
and `npm i -D playwright` locally — not committed as a dependency).

```bash
npm run build && npx next start -p 3100
node tests/browser/crawl.cjs / /library /library/fitts-law   # status codes, console errors, failed requests
node tests/browser/e2e.cjs                                    # 42 interaction checks (search, tabs, persistence, quiz, calculators, export/import, theme, mobile)
AXE_PATH=/path/to/axe.min.js node tests/browser/a11y.cjs / /library   # axe-core WCAG 2.2 AA, light + dark
```

`BASE_URL` overrides `http://localhost:3100`. e2e starts with an empty browser profile.
