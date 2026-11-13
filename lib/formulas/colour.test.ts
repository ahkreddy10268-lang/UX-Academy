import { describe, expect, it } from "vitest";
import {
  DEFAULT_PALETTE,
  HARMONIES,
  colourFormats,
  contrastReport,
  cssVariables,
  editColour,
  fitWithin,
  generatedColours,
  gradientCss,
  gradientJson,
  harmony,
  hexToHsl,
  hslToHex,
  hslToRgb,
  medianCut,
  normaliseHex,
  pairContrasts,
  paletteColours,
  paletteJson,
  parsePaletteJson,
  regenerate,
  rgbToHsl,
  wrapHue,
  type PaletteState,
} from "./colour";
import { FormulaInputError } from "./math";

describe("hex parsing and validation", () => {
  it("normalises 3- and 6-digit hex, with or without #", () => {
    expect(normaliseHex("#ABC")).toEqual({ ok: true, hex: "#aabbcc" });
    expect(normaliseHex(" 2a9d8f ")).toEqual({ ok: true, hex: "#2a9d8f" });
  });
  it("rejects invalid input with a message", () => {
    for (const bad of ["", "#12", "#12345", "#gggggg", "red", "#1234567"]) {
      const r = normaliseHex(bad);
      expect(r.ok, bad).toBe(false);
      if (!r.ok) expect(r.error.length).toBeGreaterThan(10);
    }
  });
});

describe("RGB ↔ HSL", () => {
  it("converts known colours", () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
    expect(hslToRgb({ h: 120, s: 100, l: 25 })).toEqual({ r: 0, g: 128, b: 0 });
    expect(hslToHex({ h: 240, s: 100, l: 50 })).toBe("#0000ff");
    expect(rgbToHsl({ r: 128, g: 128, b: 128 })).toMatchObject({ h: 0, s: 0 });
  });
  it("round-trips every 17th sRGB colour within one 8-bit step", () => {
    for (let r = 0; r <= 255; r += 17)
      for (let g = 0; g <= 255; g += 17)
        for (let b = 0; b <= 255; b += 17) {
          const back = hslToRgb(rgbToHsl({ r, g, b }));
          expect(Math.abs(back.r - r) + Math.abs(back.g - g) + Math.abs(back.b - b)).toBeLessThanOrEqual(1);
        }
  });
  it("wraps hue at 0°/360°", () => {
    expect(wrapHue(360)).toBe(0);
    expect(wrapHue(-30)).toBe(330);
    expect(wrapHue(725)).toBe(5);
    expect(hslToHex({ h: 360, s: 100, l: 50 })).toBe(hslToHex({ h: 0, s: 100, l: 50 }));
    expect(() => wrapHue(NaN)).toThrow(FormulaInputError);
  });
});

describe("harmonies", () => {
  const base = { h: 350, s: 60, l: 45 };
  it("uses the conventional hue relationships, wrapping past 360°", () => {
    expect(harmony(base, "complementary").map((c) => c.h)).toEqual([350, 170]);
    expect(harmony(base, "triadic").map((c) => c.h)).toEqual([350, 110, 230]);
    expect(harmony(base, "split-complementary").map((c) => c.h)).toEqual([350, 140, 200]);
    expect(harmony(base, "tetradic").map((c) => c.h)).toEqual([350, 80, 170, 260]);
    expect(harmony(base, "analogous", { spread: 20 }).map((c) => c.h)).toEqual([310, 330, 350, 10, 30]);
  });
  it("keeps saturation and lightness except in monochromatic, which steps lightness with hue fixed", () => {
    for (const m of HARMONIES.filter((x) => x !== "monochromatic")) for (const c of harmony(base, m)) expect([c.s, c.l]).toEqual([60, 45]);
    const mono = harmony(base, "monochromatic");
    expect(mono.map((c) => c.h)).toEqual([350, 350, 350, 350, 350]);
    expect(mono.map((c) => c.l)).toEqual([15, 30, 45, 60, 75]);
    expect(harmony({ h: 0, s: 50, l: 90 }, "monochromatic").map((c) => c.l)).toEqual([60, 75, 90, 95, 95]);
  });
  it("is deterministic and rejects an out-of-range spread", () => {
    expect(harmony(base, "triadic")).toEqual(harmony(base, "triadic"));
    expect(() => harmony(base, "analogous", { spread: 90 })).toThrow(FormulaInputError);
  });
});

describe("palette state", () => {
  const p: PaletteState = { ...DEFAULT_PALETTE, base: { h: 200, s: 50, l: 40 }, mode: "triadic" };
  it("edits one colour without changing the others", () => {
    const before = paletteColours(p);
    const after = paletteColours(editColour(p, 1, "#FF0000"));
    expect(after[1]).toBe("#ff0000");
    expect([after[0], after[2]]).toEqual([before[0], before[2]]);
  });
  it("rejects invalid edits and leaves the state unchanged", () => {
    expect(() => editColour(p, 0, "#zzz")).toThrow(FormulaInputError);
    expect(() => editColour(p, 7, "#000")).toThrow(FormulaInputError);
    expect(paletteColours(p)).toEqual(generatedColours(p));
  });
  it("updates when the base or harmony changes, keeping only edits that still have a place", () => {
    const edited = editColour(editColour({ ...p, mode: "tetradic" }, 3, "#123456"), 0, "#abcdef");
    const tri = regenerate(edited, { mode: "triadic" });
    expect(Object.keys(tri.overrides)).toEqual(["0"]);
    expect(paletteColours(tri)).toHaveLength(3);
    const moved = regenerate(p, { base: { h: 20, s: 50, l: 40 } });
    expect(paletteColours(moved)[0]).toBe(hslToHex({ h: 20, s: 50, l: 40 }));
  });
});

describe("WCAG 2.2 contrast", () => {
  const pass = (fg: string, bg: string, id: string) => contrastReport(fg, bg).checks.find((c) => c.id === id)!.pass;
  it("gives 21:1 for black on white", () => {
    expect(contrastReport("#000", "#fff").ratio).toBeCloseTo(21, 10);
    expect(contrastReport("#fff", "#000").display).toBe("21.00:1");
  });
  it("matches known reference pairs", () => {
    expect(contrastReport("#767676", "#ffffff").ratio).toBeCloseTo(4.54, 2); // the lightest grey that passes AA on white
    expect(pass("#767676", "#ffffff", "text-aa")).toBe(true);
    expect(pass("#777777", "#ffffff", "text-aa")).toBe(false);
  });
  it("applies normal-text, large-text and non-text thresholds separately", () => {
    // #949494 on white ≈ 3.03:1: large text and UI components pass AA, normal text fails
    expect(pass("#949494", "#ffffff", "text-aa")).toBe(false);
    expect(pass("#949494", "#ffffff", "large-aa")).toBe(true);
    expect(pass("#949494", "#ffffff", "non-text-aa")).toBe(true);
    expect(pass("#949494", "#ffffff", "large-aaa")).toBe(false);
    const ids = contrastReport("#000", "#fff").checks.map((c) => `${c.id}:${c.threshold}`);
    expect(ids).toEqual(["text-aa:4.5", "text-aaa:7", "large-aa:3", "large-aaa:4.5", "non-text-aa:3"]);
  });
  it("decides pass/fail on the unrounded ratio and never displays a failing ratio as 4.50", () => {
    const r = contrastReport("#007bc8", "#ffffff");
    expect(r.ratio).toBeLessThan(4.5);
    expect(r.ratio.toFixed(2)).toBe("4.50"); // ordinary rounding would mislead
    expect(r.display).toBe("4.49:1");
    expect(r.checks.find((c) => c.id === "text-aa")!.pass).toBe(false);
  });
  it("rejects invalid colours", () => {
    expect(() => contrastReport("#12", "#fff")).toThrow(FormulaInputError);
  });
  it("lists every palette pair", () => {
    const pairs = pairContrasts(["#000000", "#ffffff", "#777777"]);
    expect(pairs).toHaveLength(3);
    expect(pairs[0].ratio).toBeCloseTo(21, 5);
  });
});

describe("exports", () => {
  const p = editColour({ ...DEFAULT_PALETTE, mode: "complementary", base: { h: 200, s: 60, l: 30 } }, 1, "#e9c46a");
  it("writes CSS variables from the current palette and roles", () => {
    const css = cssVariables(paletteColours(p), { primary: "#264653", background: "#F4F1EA" });
    expect(css).toContain(`--palette-1: ${hslToHex({ h: 200, s: 60, l: 30 })};`);
    expect(css).toContain("--palette-2: #e9c46a;");
    expect(css).toContain("--color-primary: #264653;");
    expect(css).toContain("--color-background: #f4f1ea;");
    expect(css.startsWith(":root {\n") && css.endsWith("}\n")).toBe(true);
  });
  it("writes valid JSON that round-trips", () => {
    const json = paletteJson(p, { text: "#111111" });
    const data = JSON.parse(json);
    expect(data.colours.map((c: { hex: string }) => c.hex)).toEqual(paletteColours(p));
    expect(data.colours[1].rgb).toEqual([233, 196, 106]);
    expect(parsePaletteJson(json)).toEqual({ colours: paletteColours(p), roles: { text: "#111111" } });
    expect(() => parsePaletteJson("{}")).toThrow(FormulaInputError);
    expect(() => parsePaletteJson("not json")).toThrow(FormulaInputError);
  });
  it("formats each colour as HEX, RGB and HSL", () => {
    expect(colourFormats("#E9C46A")).toMatchObject({ hex: "#e9c46a", rgb: "rgb(233, 196, 106)", hsl: `hsl(${Math.round(hexToHsl("#e9c46a").h)}, 74%, 66%)` });
  });
});

describe("gradients", () => {
  it("writes CSS from the edited stops, sorted, and the direction", () => {
    const stops = [
      { colour: "#FFFFFF", position: 100 },
      { colour: "#264653", position: 0 },
      { colour: "#2a9d8f", position: 42.5 },
    ];
    expect(gradientCss(stops, 450)).toBe("linear-gradient(90deg, #264653 0%, #2a9d8f 42.5%, #ffffff 100%)");
    const json = JSON.parse(gradientJson(stops, 135));
    expect(json.css).toBe("linear-gradient(135deg, #264653 0%, #2a9d8f 42.5%, #ffffff 100%)");
    expect(json.stops[0]).toEqual({ colour: "#264653", position: 0 });
  });
  it("rejects too few stops and invalid positions", () => {
    expect(() => gradientCss([{ colour: "#000", position: 0 }], 0)).toThrow(FormulaInputError);
    expect(() => gradientCss([{ colour: "#000", position: 0 }, { colour: "#fff", position: 120 }], 0)).toThrow(FormulaInputError);
  });
});

describe("median cut", () => {
  const rgba = (cols: [number, number, number, number][]) => cols.flatMap((c) => c);
  it("recovers the distinct colours of a synthetic image, most common first", () => {
    const px = rgba([...Array(60).fill([200, 30, 30, 255]), ...Array(30).fill([20, 40, 200, 255]), ...Array(10).fill([240, 240, 240, 255])]);
    const out = medianCut(px, 3);
    expect(out.map((c) => c.hex)).toEqual(["#c81e1e", "#1428c8", "#f0f0f0"]);
    expect(out.map((c) => c.share)).toEqual([0.6, 0.3, 0.1]);
  });
  it("ignores transparent pixels, returns fewer colours when the image has fewer, and rejects empty images", () => {
    expect(medianCut(rgba([[10, 10, 10, 255], [10, 10, 10, 255], [255, 0, 0, 0]]), 4)).toEqual([{ hex: "#0a0a0a", share: 1 }]);
    expect(() => medianCut(rgba([[1, 2, 3, 0]]), 3)).toThrow(FormulaInputError);
    expect(() => medianCut([1, 2, 3], 3)).toThrow(FormulaInputError);
    expect(() => medianCut(rgba([[1, 2, 3, 255]]), 0)).toThrow(FormulaInputError);
  });
  it("fits images within a maximum size without upscaling", () => {
    expect(fitWithin(4000, 2000, 160)).toEqual({ width: 160, height: 80 });
    expect(fitWithin(100, 50, 160)).toEqual({ width: 100, height: 50 });
    expect(() => fitWithin(0, 10, 160)).toThrow(FormulaInputError);
  });
});
