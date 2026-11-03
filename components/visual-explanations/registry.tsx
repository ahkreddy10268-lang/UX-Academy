/**
 * Visual explanation registry: slug → the explanations for that concept, plus
 * the Level-1 "at a glance" takeaway shown beside the hero plate. Tested in
 * tests/visuals.test.ts (slugs exist, sources are the entry's own references,
 * text alternatives present, gold-standard concepts use different strategies).
 */
import { CltArchitecture, CltSplitAttention } from "./concepts/cognitive-load";
import { DoubleDiamondProcess } from "./concepts/double-diamond";
import { FittsAnatomy, FittsComparison } from "./concepts/fitts-law";
import { IaEcology, IaHierarchy } from "./concepts/information-architecture";
import type { VisualExplanation } from "./types";

export const visualExplanations: VisualExplanation[] = [
  {
    id: "fitts-law.anatomy",
    slug: "fitts-law",
    type: "formula",
    level: 2,
    title: "What each part of the equation measures",
    objective: "The Shannon formulation of Fitts's law, with every symbol tied to the distance and width it measures.",
    takeaway: "Only the ratio of distance to width sets the difficulty; a and b turn difficulty into time and have to be measured for each device and group of people.",
    summary: [
      "The equation reads MT = a + b · log₂(D/W + 1).",
      "1, a: the intercept, time that does not depend on difficulty, fitted to data.",
      "2, b: the slope, extra time for each bit of difficulty, also fitted.",
      "3, D: the distance from the start point to the target's centre.",
      "4, W: the target's width along the direction of movement.",
      "log₂(D/W + 1) is the index of difficulty in bits: doubling D, or halving W, adds about one bit when D is much larger than W.",
    ],
    verification: "content-checked",
    sources: ["fitts-1954", "mackenzie-1992"],
    Component: FittsAnatomy,
  },
  {
    id: "fitts-law.placement",
    slug: "fitts-law",
    type: "comparison",
    level: 2,
    title: "Same action, two placements",
    objective: "A form's Save action placed as a small far icon and as a large button where the task ends, with the index of difficulty computed for each.",
    takeaway: "Moving a target closer and making it larger along the approach both lower the index of difficulty; the law predicts the direction of the change, not the milliseconds.",
    summary: [
      "Before: Save is a 20 px icon in the far top-right corner, 480 px from where the pointer finishes the last field. ID = log₂(480/20 + 1) ≈ 4.64 bits.",
      "After: Save is a full-width button directly below the last field, 80 px away and 48 px tall along a vertical approach. ID = log₂(80/48 + 1) ≈ 1.42 bits.",
      "Both IDs are computed with the tested formula. Converting them to time needs a and b for a specific device and person.",
      "The drawings are schematic; the stated distances and widths are the values used.",
    ],
    verification: "illustrative",
    sources: ["mackenzie-1992"],
    Component: FittsComparison,
  },
  {
    id: "double-diamond.process",
    slug: "double-diamond",
    type: "process",
    level: 2,
    title: "Two diamonds: the problem, then the solution",
    objective: "The four phases of the Design Council's Double Diamond, each marked as opening up or narrowing down, with the decision between the diamonds and the return path.",
    takeaway: "The model's most useful moment is the decision between the diamonds: agree which problem you are solving before you solve it, and expect to loop back.",
    summary: [
      "Diamond 1, the problem. Discover (open up): research what is really going on; output: insight. Define (narrow down): synthesise and frame the problem; output: a brief.",
      "Decision between the diamonds: agree the problem statement and success criteria before solution work begins.",
      "Diamond 2, the solution. Develop (open up): generate, prototype and test many solutions with users. Deliver (narrow down): test at increasing fidelity, reject what fails, refine and launch.",
      "Not linear: testing in Develop can send the team back to Discover, and early prototypes can be discovery tools.",
      "The Framework for Innovation adds principles (put people first; communicate visually and inclusively; collaborate and co-create; iterate) and a methods bank grouped as Explore, Shape and Build.",
    ],
    verification: "content-checked",
    sources: ["design-council-double-diamond", "design-council-framework-for-innovation"],
    Component: DoubleDiamondProcess,
  },
  {
    id: "cognitive-load-theory.architecture",
    slug: "cognitive-load-theory",
    type: "conceptual",
    level: 2,
    title: "Where the load falls",
    objective: "The cognitive architecture Cognitive Load Theory assumes, with the same screen shown loading a novice's and an expert's working memory.",
    takeaway: "Design can remove extraneous load; intrinsic load depends on the material and on what the person already knows, so the same screen is heavier for a novice.",
    summary: [
      "Information presented: the material, plus the way it is shown.",
      "Working memory: handles only a few interacting elements of new information at a time, briefly.",
      "Long-term memory: a large store of schemas; a schema lets many elements be processed as one.",
      "Novice: high intrinsic load plus the extraneous load of the presentation leaves little capacity for understanding.",
      "Expert: schemas chunk the elements, so intrinsic load is lower; the extraneous load from the same presentation is unchanged.",
      "In the revised theory, germane processing is the working-memory resource devoted to the material, not a separate third load.",
      "This is a conceptual model, not a diagram of the brain; proportions are illustrative.",
    ],
    verification: "content-checked",
    sources: ["sweller-van-merrienboer-paas-1998", "sweller-2010", "sweller-van-merrienboer-paas-2019"],
    Component: CltArchitecture,
  },
  {
    id: "cognitive-load-theory.split-attention",
    slug: "cognitive-load-theory",
    type: "comparison",
    level: 2,
    title: "Split attention in a chart",
    objective: "A line chart identified by a separate legend, compared with the same chart labelled directly.",
    takeaway: "When two sources must be combined to make sense, put them together; that removes extraneous load without changing the data.",
    summary: [
      "Before: series are identified only by a legend in a separate box, so each reading means looking away, matching the line style and returning.",
      "After: each series is labelled at the end of its line.",
      "This removes a split-attention cost (extraneous load); the data's intrinsic complexity is unchanged.",
      "The size of the benefit for a particular chart and reader has to be tested.",
    ],
    verification: "illustrative",
    sources: ["chandler-sweller-1991"],
    Component: CltSplitAttention,
  },
  {
    id: "information-architecture.ecology",
    slug: "information-architecture",
    type: "system",
    level: 2,
    title: "Users, content, context and the four systems",
    objective: "The three forces an information architecture has to fit, and the four interdependent systems built on them.",
    takeaway: "A structure works only if it fits the people, the content and the organisation at once, and if grouping, labels, navigation and search agree with each other.",
    summary: [
      "Three overlapping circles: users (needs, tasks, words), content (what exists and how much) and context (goals, budget, constraints). IA sits where they overlap.",
      "1 Organisation: what goes together. 2 Labelling: what it is called. 3 Navigation: how people get there. 4 Search: whether they can ask for it.",
      "The systems depend on each other: good grouping with vague labels fails, and search must use the same vocabulary as the labels.",
    ],
    verification: "content-checked",
    sources: ["rosenfeld-morville-arango-2015"],
    Component: IaEcology,
  },
  {
    id: "information-architecture.hierarchy",
    slug: "information-architecture",
    type: "hierarchy",
    level: 2,
    title: "One structure, four systems, one path",
    objective: "An illustrative library website hierarchy, annotated with where each IA system acts and a route to “Renew a loan” that follows information scent.",
    takeaway: "People reach content by following labels that predict it; search gives a second route, but only if it knows the words people use.",
    summary: [
      "Library home has three task groups: Visit, Borrow and Events (1, organisation by task).",
      "Borrow contains Search the catalogue and Your account (2, a label people can predict).",
      "Your account contains Renew a loan (3, the target reached by a path where every label carries scent), Reserve a book, and Fees and fines.",
      "Search (4) should reach the same page for 'renew', 'extend loan', 'due date' or 'overdue', because people rarely choose the same word.",
    ],
    verification: "illustrative",
    sources: ["rosenfeld-morville-arango-2015", "pirolli-card-1999", "furnas-et-al-1987"],
    Component: IaHierarchy,
  },
];

/** Level-1 takeaway shown with the hero plate ("at a glance"). */
export const quickTakeaways: Record<string, string> = {
  "fitts-law": "Far, small targets take longer to hit than near, large ones: what matters is the ratio of distance to width.",
  "double-diamond": "Open up, then narrow down, twice: first to choose the right problem, then to find a solution that works.",
  "cognitive-load-theory": "Working memory is small: remove the effort your design adds so it can go to the material itself.",
  "information-architecture": "People find things when the grouping, the names, the routes and the search all match how they think.",
};

const bySlug = new Map<string, VisualExplanation[]>();
for (const v of visualExplanations) (bySlug.get(v.slug) ?? bySlug.set(v.slug, []).get(v.slug)!).push(v);

export const visualsFor = (slug: string) => bySlug.get(slug) ?? [];
export const hasVisuals = (slug: string) => bySlug.has(slug);
