/**
 * Subject plates, one per taxonomy domain (slug = domain id), in registry
 * order. Drawn on the instructional sheet in session 25 (subject-sheets.tsx);
 * "ia" is registered from core-plates.tsx.
 */
import type { IllustrationEntry } from "../illustration-types";
import { foundationsSubject as foundations, lawsEffectsSubject as lawsEffects, psychologySubject as psychology, heuristicsSubject as heuristics, researchSubject as research, frameworksSubject as frameworks, interactionSubject as interaction, visualSubject as visual, typeColourSubject as typeColour, designSystemsSubject as designSystems, accessibilitySubject as accessibility, contentSubject as content, productSubject as product, serviceSubject as service, metricsSubject as metrics, datavizSubject as dataviz, ethicsSubject as ethics, emergingSubject as emerging, practiceSubject as practice } from "./subject-sheets";

const plates: IllustrationEntry[] = [
  foundations,
  lawsEffects,
  psychology,
  heuristics,
  research,
  frameworks,
  interaction,
  visual,
  typeColour,
  designSystems,
  accessibility,
  content,
  product,
  service,
  metrics,
  dataviz,
  ethics,
  emerging,
  practice,
];
export default plates;
