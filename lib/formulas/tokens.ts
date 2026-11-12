/**
 * Design token tiers for the Design Token Lab (and the token lessons).
 * Pure functions only: resolve a theme's semantic roles to primitive values,
 * check every documented pair with the WCAG 2.x contrast ratio, and serialise
 * the result as DTCG 2025.10 JSON, CSS custom properties or a Tailwind v4
 * `@theme inline` block. The palette is the illustrative library-app palette
 * used in primitive-tokens and semantic-tokens (values tested against
 * TOKEN_SAMPLES in tests).
 */
import { contrastRatio, parseHex } from "./visual";

/** Primitive tier: named values with no stated purpose. */
export const PRIMITIVES = {
  "grey.0": "#ffffff",
  "grey.50": "#f6f6f4",
  "grey.300": "#c9c8c3",
  "grey.500": "#8a8983",
  "grey.600": "#6b6a64",
  "grey.700": "#4f4e49",
  "grey.900": "#1f1e1c",
  "grey.950": "#141413",
  "blue.300": "#8fb3f0",
  "blue.400": "#5f92e8",
  "blue.600": "#2457c5",
  "blue.700": "#1b449c",
  "red.400": "#f07a6e",
  "red.700": "#b42318",
  "red.800": "#8f1c13",
} as const;
export type PrimitiveName = keyof typeof PRIMITIVES;
export type Palette = Record<PrimitiveName, string>;
export const PRIMITIVE_NAMES = Object.keys(PRIMITIVES) as PrimitiveName[];

/** Semantic tier: roles named by purpose. */
export const ROLES = [
  "surface.default",
  "surface.raised",
  "text.default",
  "text.subtle",
  "text.danger",
  "border.control",
  "action.background",
  "action.text",
  "focus.ring",
] as const;
export type Role = (typeof ROLES)[number];
export type Mapping = Record<Role, PrimitiveName>;

export const THEME_IDS = ["light", "dark", "high-contrast"] as const;
export type ThemeId = (typeof THEME_IDS)[number];

/** Each theme is one complete mapping of roles to primitives. */
export const THEMES: Record<ThemeId, Mapping> = {
  light: {
    "surface.default": "grey.0",
    "surface.raised": "grey.50",
    "text.default": "grey.900",
    "text.subtle": "grey.700",
    "text.danger": "red.700",
    "border.control": "grey.600",
    "action.background": "blue.600",
    "action.text": "grey.0",
    "focus.ring": "blue.600",
  },
  dark: {
    "surface.default": "grey.950",
    "surface.raised": "grey.900",
    "text.default": "grey.50",
    "text.subtle": "grey.300",
    "text.danger": "red.400",
    "border.control": "grey.500",
    "action.background": "blue.400",
    "action.text": "grey.950",
    "focus.ring": "blue.300",
  },
  "high-contrast": {
    "surface.default": "grey.0",
    "surface.raised": "grey.0",
    "text.default": "grey.950",
    "text.subtle": "grey.700",
    "text.danger": "red.800",
    "border.control": "grey.900",
    "action.background": "blue.700",
    "action.text": "grey.0",
    "focus.ring": "grey.950",
  },
};

/**
 * Text thresholds: WCAG 2.2 SC 1.4.3 (4.5:1, AA) for light and dark; the lab's
 * high-contrast theme targets SC 1.4.6 (7:1, AAA). Non-text: SC 1.4.11 (3:1).
 */
export const THRESHOLDS: Record<ThemeId, { text: number; nonText: number }> = {
  light: { text: 4.5, nonText: 3 },
  dark: { text: 4.5, nonText: 3 },
  "high-contrast": { text: 7, nonText: 3 },
};

/** Documented pairs: which roles are used together. Contrast belongs to pairs. */
export const PAIRS: { fg: Role; bg: Role; kind: "text" | "non-text" }[] = [
  { fg: "text.default", bg: "surface.default", kind: "text" },
  { fg: "text.default", bg: "surface.raised", kind: "text" },
  { fg: "text.subtle", bg: "surface.default", kind: "text" },
  { fg: "text.subtle", bg: "surface.raised", kind: "text" },
  { fg: "text.danger", bg: "surface.default", kind: "text" },
  { fg: "text.danger", bg: "surface.raised", kind: "text" },
  { fg: "action.text", bg: "action.background", kind: "text" },
  { fg: "border.control", bg: "surface.default", kind: "non-text" },
  { fg: "border.control", bg: "surface.raised", kind: "non-text" },
  { fg: "action.background", bg: "surface.default", kind: "non-text" },
  { fg: "focus.ring", bg: "surface.default", kind: "non-text" },
  { fg: "focus.ring", bg: "surface.raised", kind: "non-text" },
];

export type Resolved = Record<Role, string>;

/** Resolve every role to a hex value through the mapping and the (possibly edited) palette. */
export function resolveTheme(mapping: Mapping, palette: Palette = PRIMITIVES): Resolved {
  return Object.fromEntries(ROLES.map((r) => [r, palette[mapping[r]]])) as Resolved;
}

export type PairResult = { fg: Role; bg: Role; kind: "text" | "non-text"; ratio: number; min: number; pass: boolean };

/** Check every documented pair with the WCAG 2.x contrast ratio. */
export function checkPairs(resolved: Resolved, thresholds: { text: number; nonText: number }): PairResult[] {
  return PAIRS.map(({ fg, bg, kind }) => {
    const ratio = contrastRatio(resolved[fg], resolved[bg]);
    const min = kind === "text" ? thresholds.text : thresholds.nonText;
    return { fg, bg, kind, ratio, min, pass: ratio >= min };
  });
}

const round4 = (n: number) => Math.round(n * 10000) / 10000;

/** Nest dotted names into DTCG groups. */
function nest(entries: [string, unknown][]): Record<string, unknown> {
  const root: Record<string, unknown> = {};
  for (const [name, token] of entries) {
    const parts = name.split(".");
    let node = root;
    for (const p of parts.slice(0, -1)) node = (node[p] ??= {}) as Record<string, unknown>;
    node[parts[parts.length - 1]] = token;
  }
  return root;
}

/** DTCG 2025.10: primitives as typed colour objects with a hex fallback; roles as references. */
export function toDtcg(mapping: Mapping, palette: Palette = PRIMITIVES): string {
  const primitives = nest(
    PRIMITIVE_NAMES.map((n) => {
      const { r, g, b } = parseHex(palette[n]);
      return [n, { $value: { colorSpace: "srgb", components: [round4(r / 255), round4(g / 255), round4(b / 255)], hex: palette[n].toLowerCase() } }];
    }),
  );
  const roles = nest(ROLES.map((r) => [r, { $value: `{color.${mapping[r]}}` }]));
  const json = JSON.stringify({ color: { $type: "color", ...primitives, ...roles } }, null, 2);
  // Keep each colour's components on one line for readability.
  return json.replace(/"components": \[\s*([^\]]*?)\s*\]/g, (_, inner: string) => `"components": [${inner.split(/,\s*/).join(", ")}]`);
}

const cssName = (role: Role) => `--color-${role.replace(/\./g, "-")}`;

/** CSS custom properties for one theme, scoped to a selector. */
export function toCss(resolved: Resolved, selector: string): string {
  return `${selector} {\n${ROLES.map((r) => `  ${cssName(r)}: ${resolved[r]};`).join("\n")}\n}`;
}

/** Tailwind CSS v4: expose the role variables as utilities (bg-surface-default, text-text-danger, …). */
export function toTailwind(): string {
  return `@theme inline {\n${ROLES.map((r) => `  ${cssName(r)}: var(${cssName(r)});`).join("\n")}\n}`;
}
