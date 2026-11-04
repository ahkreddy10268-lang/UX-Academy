/**
 * How each path scene sits on the 400 × 300 canvas: scale and offset of the
 * scene's design space, measured from its drawn bounds so every scene fills the
 * same safe area (18 px margin). Regenerate with
 *   npx tsx scripts/render-path-art.tsx --measure
 */
export type Fit = { k: number; dx: number; dy: number };
export const FIT: Record<string, Fit> = {
  "ux-fundamentals": { k: 1.302, dx: -5.4, dy: 9.7 },
  "ui-fundamentals": { k: 0.996, dx: 64.3, dy: 105.7 },
  "product-design": { k: 1.333, dx: -55.9, dy: 28.7 },
  "interaction-design": { k: 1.464, dx: 34.1, dy: -10.9 },
  "hci-fundamentals": { k: 1.451, dx: -14.7, dy: 3.5 },
  "cognitive-psychology": { k: 1.230, dx: 18.0, dy: 40.6 },
  "ux-research": { k: 1.404, dx: -8.2, dy: 20.8 },
  "usability-engineering": { k: 1.389, dx: 18.0, dy: 34.7 },
  "information-architecture": { k: 1.401, dx: -10.2, dy: 1.5 },
  "visual-design": { k: 1.288, dx: 12.0, dy: 76.0 },
  "design-systems": { k: 1.106, dx: 103.2, dy: -26.6 },
  "accessibility": { k: 1.264, dx: 25.6, dy: 30.6 },
  "product-strategy": { k: 1.514, dx: -43.9, dy: 7.4 },
  "advanced-ux-metrics": { k: 1.387, dx: -29.3, dy: 85.9 },
  "ai-ux": { k: 1.518, dx: -52.0, dy: -26.9 },
  "service-design": { k: 1.257, dx: 11.4, dy: 43.1 },
};
