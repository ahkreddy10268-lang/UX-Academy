/**
 * Aggregates plate fragments (one file per authoring group, so plates can be
 * drawn in parallel without conflicts).
 */
import type { IllustrationEntry } from "../illustration-types";
import domains from "../concepts/domains";
import findabilitySheets from "../concepts/findability-sheets";
import frameworksVisual from "../concepts/frameworks-visual";
import fundamentalsSheets from "../concepts/fundamentals-sheets";
import interactionSheets from "../concepts/interaction-sheets";
import lawsPsychology from "../concepts/laws-psychology";
import researchMetrics from "../concepts/research-metrics";
import researchSheets from "../concepts/research-sheets";
import contentSheets from "../concepts/content-sheets";
import decisionSheets from "../concepts/decision-sheets";

export const fragments: IllustrationEntry[] = [...lawsPsychology, ...researchMetrics, ...frameworksVisual, ...interactionSheets, ...researchSheets, ...contentSheets, ...findabilitySheets, ...decisionSheets, ...fundamentalsSheets, ...domains];
