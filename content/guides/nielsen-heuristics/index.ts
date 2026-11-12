/**
 * Nielsen's 10 usability heuristics — the guide (D-127). Composes the
 * published heuristic entries by slug; see lib/content/guide.ts.
 */
import type { GuideInput } from "../../../lib/content/guide";
import { caseStudy } from "./case-study";
import { heuristics } from "./heuristics";
import { advanced, assessment, comparisons, framework, hero, mistakes, overlap, process, references, reportFields, severity, story } from "./sections";

export const nielsenGuide: GuideInput = {
  id: "nielsen-heuristics",
  title: "Nielsen's 10 Usability Heuristics",
  entry: "nielsen-usability-heuristics",
  hero,
  story,
  framework,
  heuristics,
  comparisons,
  overlap,
  process,
  severity,
  caseStudy,
  reportFields,
  advanced,
  mistakes,
  assessment,
  references,
};
