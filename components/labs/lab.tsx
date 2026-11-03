"use client";

import { CognitiveLoadLab } from "./cognitive-load-lab";
import { CvdLab } from "./cvd-lab";
import { FittsLab } from "./fitts-lab";
import { HickLab } from "./hick-lab";
import { ResponsiveLab } from "./responsive-lab";
import { SteeringLab } from "./steering-lab";
import { ContrastLab, DisclosureLab, FeedbackLab, GestaltLab, HierarchyLab, SerialPositionLab, TypeScaleLab } from "./simple-labs";

const REGISTRY: Record<string, () => React.JSX.Element> = {
  "fitts-lab": FittsLab,
  "hick-lab": HickLab,
  "contrast-lab": ContrastLab,
  "gestalt-lab": GestaltLab,
  "hierarchy-lab": HierarchyLab,
  "cognitive-load-lab": CognitiveLoadLab,
  "disclosure-lab": DisclosureLab,
  "feedback-lab": FeedbackLab,
  "serial-position-lab": SerialPositionLab,
  "type-scale-lab": TypeScaleLab,
  "responsive-lab": ResponsiveLab,
  "steering-lab": SteeringLab,
  "cvd-lab": CvdLab,
};

export function LabView({ id }: { id: string }) {
  const L = REGISTRY[id];
  return L ? <L /> : <p>This lab is not implemented yet.</p>;
}

export const implementedLabs = Object.keys(REGISTRY);
