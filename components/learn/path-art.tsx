/**
 * Learning-path artwork (illustration family A). One editorial, isometric scene
 * per path, drawn with the shared kit in components/illustrations/system/kit.tsx
 * and coloured only through the --ill-* roles, so each scene re-tints with its
 * subject and theme. Used on the path card and the path hero. Decorative: the
 * card or page title names the path, so the SVG is hidden from assistive
 * technology. Keyed by path id, not registered as entry plates.
 */
import type { ReactNode } from "react";
import type { Palette } from "@/lib/content/categories";
import { HciScene, ResearchScene, UiScene } from "./art/scenes-a";
import { AiScene, IaScene, ProductScene, ServiceScene, VisualScene } from "./art/scenes-b";
import { AccessibilityScene, CognitionScene, DsScene, InteractionScene, MetricsScene, StrategyScene, UsabilityScene, UxScene } from "./art/scenes-c";

/** Palette each path is drawn in (presentation only). */
export const PATH_PALETTE: Record<string, Palette> = {
  "ux-fundamentals": "core",
  "ui-fundamentals": "peach",
  "product-design": "indigo",
  "interaction-design": "cyan",
  "hci-fundamentals": "violet",
  "cognitive-psychology": "violet",
  "ux-research": "teal",
  "usability-engineering": "rose",
  "information-architecture": "cyan",
  "visual-design": "peach",
  "design-systems": "peach",
  accessibility: "green",
  "product-strategy": "indigo",
  "advanced-ux-metrics": "blue",
  "ai-ux": "indigo",
  "service-design": "slate",
};

/** Colour-family class for a path (shared by the catalogue card and the path hero). */
export const pathCat = (id: string) => `cat-${PATH_PALETTE[id] ?? "core"}`;

const SCENES: Record<string, () => ReactNode> = {
  "ux-fundamentals": UxScene,
  "ui-fundamentals": UiScene,
  "product-design": ProductScene,
  "interaction-design": InteractionScene,
  "hci-fundamentals": HciScene,
  "cognitive-psychology": CognitionScene,
  "ux-research": ResearchScene,
  "usability-engineering": UsabilityScene,
  "information-architecture": IaScene,
  "visual-design": VisualScene,
  "design-systems": DsScene,
  "accessibility": AccessibilityScene,
  "product-strategy": StrategyScene,
  "advanced-ux-metrics": MetricsScene,
  "ai-ux": AiScene,
  "service-design": ServiceScene,
};

export const hasPathArt = (id: string) => id in SCENES;

export function PathArt({ id }: { id: string }) {
  const Scene = SCENES[id];
  return Scene ? <Scene /> : null;
}
