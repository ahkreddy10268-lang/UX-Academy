import { describe, expect, it } from "vitest";
import { TOKEN_SAMPLES } from "../../components/illustrations/concepts/learning-sheets";
import { PRIMITIVES, PRIMITIVE_NAMES, ROLES, THEME_IDS, THEMES, THRESHOLDS, checkPairs, resolveTheme, toCss, toDtcg, toTailwind, type Palette } from "./tokens";

describe("design token tiers (lib/formulas/tokens)", () => {
  it("uses the same values as the token lessons' plates (TOKEN_SAMPLES)", () => {
    for (const [k, hex] of Object.entries(TOKEN_SAMPLES)) {
      const name = k.replace("-", ".") as keyof typeof PRIMITIVES;
      expect(PRIMITIVES[name], k).toBe(hex);
    }
  });

  it("maps every role in every theme to an existing primitive", () => {
    for (const id of THEME_IDS) for (const r of ROLES) expect(PRIMITIVE_NAMES).toContain(THEMES[id][r]);
  });

  it("passes every documented pair in every preset theme", () => {
    for (const id of THEME_IDS) {
      const failures = checkPairs(resolveTheme(THEMES[id]), THRESHOLDS[id]).filter((p) => !p.pass);
      expect(failures, id).toEqual([]);
    }
  });

  it("reproduces the ratios quoted in the semantic-tokens lesson", () => {
    const light = checkPairs(resolveTheme(THEMES.light), THRESHOLDS.light);
    const ratio = (fg: string, bg: string) => light.find((p) => p.fg === fg && p.bg === bg)!.ratio.toFixed(2);
    expect(ratio("text.default", "surface.default")).toBe("16.66");
    expect(ratio("action.text", "action.background")).toBe("6.47");
    expect(ratio("border.control", "surface.default")).toBe("5.43");
  });

  it("detects a failing pair when a primitive is edited", () => {
    const palette: Palette = { ...PRIMITIVES, "grey.700": "#b0b0b0" };
    const subtle = checkPairs(resolveTheme(THEMES.light, palette), THRESHOLDS.light).find((p) => p.fg === "text.subtle" && p.bg === "surface.default")!;
    expect(subtle.pass).toBe(false);
    expect(subtle.ratio).toBeLessThan(4.5);
  });

  it("serialises valid DTCG JSON with colour objects and references", () => {
    const json = JSON.parse(toDtcg(THEMES.dark));
    expect(json.color.$type).toBe("color");
    expect(json.color.grey["950"].$value).toEqual({ colorSpace: "srgb", components: [0.0784, 0.0784, 0.0745], hex: "#141413" });
    expect(json.color.text.default.$value).toBe("{color.grey.50}");
  });

  it("emits CSS custom properties and a Tailwind v4 theme block for every role", () => {
    const css = toCss(resolveTheme(THEMES.light), ':root[data-theme="light"]');
    const tw = toTailwind();
    for (const r of ROLES) {
      const name = `--color-${r.replace(".", "-")}`;
      expect(css).toContain(`${name}: `);
      expect(tw).toContain(`${name}: var(${name});`);
    }
    expect(tw.startsWith("@theme inline {")).toBe(true);
  });
});
