/**
 * Illustration text standard (D-101). The hero plate is about 314 CSS px wide
 * on a 390 px phone, so SVG text at 13 units renders at about 10 px. Every text
 * in a sheet plate, card or hero, must be at least T.min units (secondary,
 * ≥ 10 px at 390), with no scaled groups that would shrink it; primary labels
 * and marker numerals use T.strong / T.marker (≥ 12 px at 390); and every sheet
 * plate explains its markers in an HTML figure key.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Plate } from "../components/illustrations/plate";
import { illustrations } from "../components/illustrations/registry";
import { T } from "../components/illustrations/system/sheet";

/** Hero plate width on a 390 px phone, measured in the browser (CSS px), over the 400-unit viewBox. */
const PHONE_SCALE = 314 / 400;

const sheet = [...illustrations.values()].filter((e) => e.canvas === "sheet");

describe("sheet plate text standard (D-101)", () => {
  it("covers the sheet plates", () => expect(sheet.length).toBeGreaterThanOrEqual(11));
  it("size tiers meet the phone thresholds", () => {
    expect(T.min * PHONE_SCALE).toBeGreaterThanOrEqual(10);
    expect(T.strong * PHONE_SCALE).toBeGreaterThanOrEqual(12);
    expect(T.marker * PHONE_SCALE).toBeGreaterThanOrEqual(12);
  });
  it.each(sheet.map((e) => [e.slug, e] as const))("%s: every text ≥ T.min units in card and hero, no scaled groups", (_slug, e) => {
    for (const variant of ["card", "hero"] as const) {
      const html = renderToStaticMarkup(createElement(Plate, { entry: e, variant }));
      const sizes = [...html.matchAll(/<text[^>]*font-size="([\d.]+)"/g)].map((m) => Number(m[1]));
      const unsized = [...html.matchAll(/<text(?![^>]*font-size=)[^>]*>/g)].length;
      expect(unsized, `${variant}: text without an explicit font-size`).toBe(0);
      for (const s of sizes) expect(s, `${variant}: font-size ${s}`).toBeGreaterThanOrEqual(T.min);
      expect(/scale\(/.test(html), `${variant}: scaled group`).toBe(false);
    }
  });
  it.each(sheet.map((e) => [e.slug, e] as const))("%s: has an HTML figure key", (_slug, e) => {
    expect(e.key?.length ?? 0).toBeGreaterThanOrEqual(2);
  });
});

/** Current-language plates on the dark technical canvas follow the same floor; their whole-figure fit may scale up, never down. */
const viz = [...illustrations.values()].filter((e) => e.canvas === "viz");

describe("viz plate text standard (D-101)", () => {
  it("covers the viz plates", () => expect(viz.length).toBeGreaterThanOrEqual(4));
  it.each(viz.map((e) => [e.slug, e] as const))("%s: every text ≥ T.min units, no shrinking scale, has a key", (_slug, e) => {
    for (const variant of ["card", "hero"] as const) {
      const html = renderToStaticMarkup(createElement(Plate, { entry: e, variant }));
      const sizes = [...html.matchAll(/<text[^>]*font-size="([\d.]+)"/g)].map((m) => Number(m[1]));
      for (const s of sizes) expect(s, `${variant}: font-size ${s}`).toBeGreaterThanOrEqual(T.min);
      for (const m of html.matchAll(/scale\(([\d.]+)/g)) expect(Number(m[1]), `${variant}: scale ${m[1]}`).toBeGreaterThanOrEqual(1);
    }
    expect(e.key?.length ?? 0).toBeGreaterThanOrEqual(2);
  });
});
