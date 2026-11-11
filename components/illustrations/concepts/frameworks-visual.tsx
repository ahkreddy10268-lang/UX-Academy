/** Plates: frameworks-visual. Authored to docs/ILLUSTRATION_SYSTEM.md rules. */
import type { IllustrationEntry } from "../illustration-types";
import { hciPlate, usabilityPlate, userExperiencePlate, wcagPlate } from "./foundation-sheets";
import { uiDesignPlate } from "./sheet-plates";
import { accessibilityPlate, designSystemPlate, informationArchitecturePlate, interactionDesignPlate } from "./viz-plates";
import { userCentredDesignPlate as userCentredDesign } from "./learning-sheets";
import { progressiveDisclosurePlate as progressiveDisclosure } from "./learning-sheets";
import { visualHierarchyPlate as visualHierarchy } from "./learning-sheets";
import { modularTypeScalePlate as modularTypeScale } from "./learning-sheets";
import { colourContrastPlate as colourContrastRatio } from "./learning-sheets";
import { designTokensPlate as designTokens, primitiveTokensPlate as primitiveTokens, semanticTokensPlate as semanticTokens } from "./learning-sheets";
import { jtbdPlate as jobsToBeDone } from "./learning-sheets";
import { heartPlate as heartFramework } from "./learning-sheets";
import { humanCentredDesignPlanned as humanCentredDesign } from "./subject-sheets";

/** Human-centred design (ISO 9241-210): people in nested contexts, design iterating inwards towards fit. */
const plates: IllustrationEntry[] = [
  usabilityPlate,
  userCentredDesign,
  humanCentredDesign,
  userExperiencePlate,
  hciPlate,
  uiDesignPlate,
  interactionDesignPlate,
  accessibilityPlate,
  informationArchitecturePlate,
  jobsToBeDone,
  heartFramework,
  progressiveDisclosure,
  wcagPlate,
  colourContrastRatio,
  visualHierarchy,
  modularTypeScale,
  designSystemPlate,
  designTokens,
  primitiveTokens,
  semanticTokens,
];
export default plates;

