/**
 * The first set of concept plates, in registry order. Since session 25 every
 * plate here is drawn on the instructional sheet (learning-sheets.tsx,
 * foundation-sheets.tsx, sheet-plates.tsx, subject-sheets.tsx).
 */
import { doubleDiamondPlate } from "./sheet-plates";
import { cognitiveLoadPlate as cltPlate } from "./learning-sheets";
import { affordancesPlate, mentalModelsPlate, signifiersPlate } from "./foundation-sheets";
import { jakobsLawPlate as jakobs } from "./learning-sheets";
import { nielsenHeuristicsPlate as nielsenHeuristics } from "./learning-sheets";
import { hickHymanPlate as hickHyman } from "./learning-sheets";
import { gestaltPlate as gestalt } from "./learning-sheets";
import { millersLawPlate as millers } from "./learning-sheets";
import { peakEndPlate as peakEnd } from "./learning-sheets";
import { iaSubject as informationArchitecture } from "./subject-sheets";
import { designThinkingPlanned as designThinking } from "./subject-sheets";
import { atomicDesignPlanned as atomicDesign } from "./subject-sheets";

export const corePlates = [hickHyman, gestalt, cltPlate, millers, jakobs, mentalModelsPlate, affordancesPlate, signifiersPlate, peakEnd, doubleDiamondPlate, designThinking, nielsenHeuristics, informationArchitecture, atomicDesign];

export { jakobs };

export { nielsenHeuristics };

export { hickHyman };

export { gestalt };

export { millers };

export { peakEnd };

export { informationArchitecture };

export { designThinking };

export { atomicDesign };
