/**
 * Learning areas (D-100): twelve study areas that group the frozen taxonomy's
 * domains, the learning paths and the reference sections into entry points a
 * learner recognises. They are a navigation layer only: the taxonomy (20
 * domains) stays the single classification, and every topic keeps one home.
 * Counts shown on the site are computed from the content.
 */
export type LearningArea = {
  id: string;
  letter: string;
  title: string;
  description: string;
  /** Taxonomy domain ids whose published entries belong to this area. */
  domains: string[];
  /** Learning path ids. */
  paths: string[];
  /** Other sections of the site (route, label). */
  links?: [string, string][];
};

export const learningAreas: LearningArea[] = [
  { id: "design-foundations", letter: "A", title: "Design Foundations", description: "What UX and UI are, design processes, visual hierarchy, colour, type, grids and accessibility basics.", domains: ["foundations", "frameworks", "type-colour"], paths: ["ux-fundamentals", "ui-fundamentals"] },
  { id: "principles-psychology", letter: "B", title: "UX Principles & Psychology", description: "Laws and effects, Gestalt, cognitive load, mental models, decision making and usability heuristics.", domains: ["laws-effects", "psychology", "heuristics"], paths: ["cognitive-psychology", "hci-fundamentals"] },
  { id: "ux-research", letter: "C", title: "UX Research", description: "Interviews, surveys, personas, Jobs to Be Done, synthesis, journey mapping and research metrics.", domains: ["research", "metrics"], paths: ["ux-research", "advanced-ux-metrics"] },
  { id: "information-architecture", letter: "D", title: "Information Architecture", description: "Organisation, labelling, navigation and search; card sorting, tree testing and content structure.", domains: ["ia", "content"], paths: ["information-architecture"] },
  { id: "interaction-design", letter: "E", title: "Interaction Design", description: "Flows, affordances, feedback, forms, errors, states and motion.", domains: ["interaction"], paths: ["interaction-design"] },
  { id: "ui-design", letter: "F", title: "UI Design", description: "Composition, layout, typography, colour, components, tables, dashboards and responsive interfaces.", domains: ["visual", "dataviz"], paths: ["visual-design", "ui-fundamentals"] },
  { id: "design-systems", letter: "G", title: "Design Systems", description: "Architecture, tokens, components, variants, patterns, documentation and governance.", domains: ["design-systems"], paths: ["design-systems"], links: [["/system", "UX Academy's own design system"]] },
  { id: "prototyping", letter: "H", title: "Prototyping", description: "From sketches to interactive prototypes, and validating them with people.", domains: ["practice"], paths: ["product-design"] },
  { id: "usability-accessibility", letter: "I", title: "Usability & Accessibility", description: "Heuristic evaluation, usability testing, metrics, WCAG and accessibility testing.", domains: ["accessibility"], paths: ["usability-engineering", "accessibility"] },
  { id: "product-design", letter: "J", title: "Product Design", description: "Product thinking, discovery, strategy, prioritisation, services and collaboration.", domains: ["product", "service", "ethics"], paths: ["product-design", "product-strategy", "service-design"] },
  { id: "ai-ux", letter: "K", title: "AI UX & Agentic Experience", description: "Human-AI interaction, conversational and generative interfaces, trust and agents.", domains: ["emerging"], paths: ["ai-ux"], links: [["/ai", "AI UX pattern library"]] },
  { id: "practical-learning", letter: "L", title: "Practical Learning", description: "Quizzes, flashcards, design workshops, labs and calculators for practising what you read.", domains: [], paths: [], links: [["/practice", "Practice"], ["/labs", "Labs"], ["/formulas", "Formula Lab"]] },
];

/** The suggested order through the core curriculum; each step is a learning path or a reference section. */
export const curriculumSequence: { label: string; href: string }[] = [
  { label: "UX Fundamentals", href: "/learn/ux-fundamentals" },
  { label: "UX Research", href: "/learn/ux-research" },
  { label: "Information Architecture", href: "/learn/information-architecture" },
  { label: "Interaction Design", href: "/learn/interaction-design" },
  { label: "UI Design", href: "/learn/ui-fundamentals" },
  { label: "Prototyping", href: "/topics/practice" },
  { label: "Usability Testing", href: "/learn/usability-engineering" },
  { label: "Product Design", href: "/learn/product-design" },
];
