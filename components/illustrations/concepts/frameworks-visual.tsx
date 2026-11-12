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
import { designTokensPlate as designTokens, primitiveTokensPlate as primitiveTokens, semanticTokensPlate as semanticTokens, visibilityOfSystemStatusPlate as visibilityOfSystemStatus, userControlAndFreedomPlate as userControlAndFreedom, consistencyPrinciplePlate as consistencyPrinciple, errorPreventionPlate as errorPrevention, mappingPlate as mapping, flexibilityEfficiencyPlate as flexibilityEfficiency, aestheticMinimalistPlate as aestheticMinimalist, errorRecoveryPlate as errorRecovery, helpDocumentationPlate as helpDocumentation, themeArchitecturePlate as themeArchitecture, designLanguagePlate as designLanguage } from "./learning-sheets";
import { jtbdPlate as jobsToBeDone } from "./learning-sheets";
import { componentArchitecturePlate, componentLibrariesPlate, componentPropertiesPlate, componentStateManagementPlate, variantsPlate } from "./component-sheets";
import { dataTablesPlate, emptyStatesPlate, errorStatesPlate, loadingStatesPlate, progressiveLoadingPlate, skeletonScreensPlate } from "./state-pattern-sheets";
import { designGovernancePlate, designQaPlate, designSystemAuditsPlate, designSystemVersioningPlate, multiBrandSystemsPlate } from "./governance-sheets";
import { colourSystemsPlate, elevationSystemsPlate, iconSystemsPlate, responsiveSystemsPlate, spacingScalesPlate, typographyScalesPlate } from "./scales-sheets";
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
  visibilityOfSystemStatus,
  userControlAndFreedom,
  consistencyPrinciple,
  errorPrevention,
  mapping,
  flexibilityEfficiency,
  aestheticMinimalist,
  errorRecovery,
  helpDocumentation,
  themeArchitecture,
  designLanguage,
  spacingScalesPlate,
  typographyScalesPlate,
  colourSystemsPlate,
  elevationSystemsPlate,
  iconSystemsPlate,
  responsiveSystemsPlate,
  componentLibrariesPlate,
  componentArchitecturePlate,
  variantsPlate,
  componentPropertiesPlate,
  componentStateManagementPlate,
  emptyStatesPlate,
  loadingStatesPlate,
  skeletonScreensPlate,
  progressiveLoadingPlate,
  errorStatesPlate,
  dataTablesPlate,
  designGovernancePlate,
  designSystemVersioningPlate,
  designQaPlate,
  designSystemAuditsPlate,
  multiBrandSystemsPlate,
];
export default plates;

