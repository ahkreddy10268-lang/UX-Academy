/**
 * Aggregates plate fragments (one file per authoring group, so plates can be
 * drawn in parallel without conflicts).
 */
import type { IllustrationEntry } from "../illustration-types";
import domains from "../concepts/domains";
import frameworksVisual from "../concepts/frameworks-visual";
import interactionSheets from "../concepts/interaction-sheets";
import lawsPsychology from "../concepts/laws-psychology";
import researchMetrics from "../concepts/research-metrics";

export const fragments: IllustrationEntry[] = [...lawsPsychology, ...researchMetrics, ...frameworksVisual, ...interactionSheets, ...domains];
