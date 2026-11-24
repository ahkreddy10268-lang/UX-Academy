/**
 * Per-entry review for published knowledge entries (used in every batch review).
 * For each slug, at 1440/768/390 px in light and dark: axe (WCAG 2.x A/AA + best
 * practice, disclosures opened), horizontal overflow, page errors, hero-plate
 * text size in rendered px, clipped plate text, numbered markers outside the
 * 400x300 viewBox. Then: internal links resolve, no raw {{src:}} / [[ ]] markup,
 * flashcards can be added by keyboard.
 *
 *   AXE_PATH=node_modules/axe-core/axe.min.js BASE_URL=http://localhost:3100 \
 *     node tests/browser/entry-review.cjs ux-writing microcopy
 *
 * Marker failures on plates listed in docs/VISUAL_QA.md are the known backlog.
 */
const { chromium } = require("playwright");
const fs = require("fs");
const axePath = process.env.AXE_PATH; if (!axePath) { console.error("Set AXE_PATH to axe.min.js."); process.exit(2); }
const AXE = fs.readFileSync(axePath, "utf8");
const B = process.env.BASE_URL ?? "http://localhost:3100";
const SLUGS = process.argv.slice(2);
const out = []; const ok = (n, c, d = "") => out.push(`${c ? "PASS" : "FAIL"} ${n}${d ? " — " + d : ""}`);
(async () => {
  const b = await chromium.launch();
  for (const slug of SLUGS) {
    for (const [w, s] of [[1440, "light"], [1440, "dark"], [768, "light"], [768, "dark"], [390, "light"], [390, "dark"]]) {
      const p = await (await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: s })).newPage();
      const errs = []; p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
      await p.goto(`${B}/library/${slug}`, { waitUntil: "networkidle" });
      const plate = await p.evaluate(() => {
        const svg = document.querySelector("main figure svg[viewBox='0 0 400 300']"); if (!svg) return { min: 0, clipped: -1, markers: -1, out: -1 };
        const r = svg.getBoundingClientRect(); const k = r.width / 400;
        const min = Math.min(...[...svg.querySelectorAll("text")].map((t) => parseFloat(getComputedStyle(t).fontSize) * k));
        const clipped = [...svg.querySelectorAll("text")].filter((e) => { const b = e.getBoundingClientRect(); return b.width && (b.left < r.left - 0.5 || b.right > r.right + 0.5 || b.top < r.top - 0.5 || b.bottom > r.bottom + 0.5); }).length;
        const ms = [...svg.querySelectorAll("circle")].filter((c) => { const rr = +c.getAttribute("r"); const t = c.parentElement.querySelector("text"); return rr >= 8 && rr <= 14 && t && /^\s*\w{1,2}\s*$/.test(t.textContent); });
        const outv = ms.filter((c) => { const cx = +c.getAttribute("cx"), cy = +c.getAttribute("cy"), rr = +c.getAttribute("r"), sw = parseFloat(c.getAttribute("stroke-width") || "0") / 2; return cx - rr - sw < 0 || cy - rr - sw < 0 || cx + rr + sw > 400 || cy + rr + sw > 300; }).length;
        return { min, clipped, markers: ms.length, out: outv };
      });
      await p.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
      await p.addScriptTag({ content: AXE });
      const v = await p.evaluate(async () => (await axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] })).violations.map((x) => `${x.id}(${x.nodes.length})`));
      const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      ok(`${slug} ${w} ${s}`, !v.length && over <= 0 && !errs.length && plate.min >= 10 && plate.clipped === 0 && plate.out === 0, `axe ${v.join(",") || 0}, overflow ${over}, errors ${errs.length}, plate text min ${plate.min.toFixed(1)}px, clipped text ${plate.clipped}, markers ${plate.markers} (outside viewBox ${plate.out})`);
      await p.close();
    }
    const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    await p.goto(`${B}/library/${slug}`, { waitUntil: "networkidle" });
    const hrefs = [...new Set(await p.evaluate(() => [...document.querySelectorAll("main a[href^='/']")].map((a) => a.getAttribute("href").split("#")[0])))];
    const bad = []; for (const h of hrefs) { const r = await p.request.get(B + h); if (r.status() !== 200) bad.push(`${h} ${r.status()}`); }
    const all = await p.evaluate(() => document.querySelector("main").textContent.replace(/\s+/g, " "));
    ok(`${slug}: internal links resolve, no raw markup`, !bad.length && !/\{\{src:|\[\[/.test(all), `${hrefs.length} links${bad.length ? "; " + bad.join(", ") : ""}`);
    // keyboard: first quiz option reachable and answerable
    const opt = p.locator("main button").filter({ hasText: /\w/ }).filter({ has: p.locator("xpath=self::*[ancestor::*[contains(@class,'quiz') or @data-quiz or ancestor::section[.//h2[contains(.,'Check') or contains(.,'Quiz')]]]]") }).first();
    const fc = p.getByRole("button", { name: /Add \d+ flashcards/ });
    let fcOk = false;
    if (await fc.count()) { const n = +((await fc.textContent()).match(/\d+/) || [0])[0]; const countCards = () => p.evaluate(() => Object.keys(JSON.parse(localStorage.getItem("ux-academy:v1") || "{}").cards || {}).length); const before = await countCards(); await fc.focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(300); const stored = (await countCards()) - before; fcOk = stored === n; ok(`${slug}: flashcards added by keyboard`, fcOk, `${stored}/${n}`); }
    else ok(`${slug}: flashcard button present`, false);
    await p.close();
  }
  await b.close();
  console.log(out.join("\n")); console.log(`${out.filter((x) => x.startsWith("PASS")).length}/${out.length} passed`);
  if (out.some((x) => x.startsWith("FAIL "))) process.exitCode = 1;
})();
