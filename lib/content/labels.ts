/** Human-readable labels and descriptions for controlled vocabularies. Safe for client import. */
import type { ContentStatus, Difficulty, EvidenceClass, KnowledgeType, RelationType } from "./schema";

export const TYPE_LABEL: Record<KnowledgeType, string> = {
  theory: "Theory",
  law: "Law",
  principle: "Principle",
  heuristic: "Heuristic",
  "rule-of-thumb": "Rule of thumb",
  framework: "Framework",
  model: "Model",
  methodology: "Methodology",
  method: "Method",
  technique: "Technique",
  strategy: "Strategy",
  formula: "Formula",
  metric: "Metric",
  standard: "Standard",
  guideline: "Guideline",
  pattern: "Pattern",
  "anti-pattern": "Anti-pattern",
  concept: "Concept",
  "cognitive-bias": "Cognitive bias",
  "research-instrument": "Research instrument",
  tool: "Tool",
  discipline: "Discipline",
  "case-study": "Case study",
  "historical-contribution": "Historical contribution",
  "emerging-concept": "Emerging concept",
};

export const TYPE_DESCRIPTION: Record<KnowledgeType, string> = {
  theory: "An explanatory account of why something happens, supported by evidence and open to test.",
  law: "A regularity observed so consistently that it can be stated — often mathematically — and used to predict.",
  principle: "A general rule for good design derived from theory or accumulated experience.",
  heuristic: "A rule of thumb used to judge or evaluate a design quickly.",
  "rule-of-thumb": "Informal practitioner wisdom; useful, but not established by research.",
  framework: "A structure for organising thinking or work — it tells you what to consider, not what is true.",
  model: "A simplified representation of a process or system used to describe or predict it.",
  methodology: "A coherent system of methods and the reasoning for applying them.",
  method: "A defined procedure for gathering or analysing information.",
  technique: "A specific practical way of doing part of a task.",
  strategy: "A plan of action for reaching a goal under constraints.",
  formula: "A mathematical expression that computes a value from inputs.",
  metric: "A defined measurement with a numerator, denominator and time window.",
  standard: "A normative document published by a standards body.",
  guideline: "Recommended practice from an authoritative organisation.",
  pattern: "A reusable solution to a recurring design problem.",
  "anti-pattern": "A common response to a problem that tends to cause harm or failure.",
  concept: "An idea or term the discipline uses to name and reason about something.",
  "cognitive-bias": "A systematic deviation in judgement or decision-making.",
  "research-instrument": "A validated tool, such as a questionnaire, for measuring a construct.",
  tool: "Software or a physical aid used in practice.",
  discipline: "A field of practice with its own knowledge, methods and community.",
  "case-study": "An analysed real-world example.",
  "historical-contribution": "A development important to the history of the field.",
  "emerging-concept": "A new idea whose definition and evidence are still forming.",
};

export const EVIDENCE_LABEL: Record<EvidenceClass, string> = {
  "original-empirical": "Original empirical research",
  "peer-reviewed": "Peer-reviewed research",
  "established-theory": "Established theoretical model",
  "official-standard": "Official standard",
  "professional-guideline": "Professional guideline",
  "practitioner-recommendation": "Practitioner recommendation",
  "emerging-hypothesis": "Emerging hypothesis",
  contested: "Contested or limited evidence",
};

export const EVIDENCE_DESCRIPTION: Record<EvidenceClass, string> = {
  "original-empirical": "Established directly by controlled experiments and replicated across studies.",
  "peer-reviewed": "Supported by peer-reviewed studies, but conditional, less replicated, or with known moderators.",
  "established-theory": "A theoretical model widely accepted in its field; individual predictions vary in support.",
  "official-standard": "Normative text published by a standards body. Authority comes from consensus, not experiments.",
  "professional-guideline": "Recommended by recognised professional or official organisations, usually grounded in practice and some research.",
  "practitioner-recommendation": "Accumulated practitioner wisdom with little direct research evidence.",
  "emerging-hypothesis": "A new, plausible idea with limited testing so far.",
  contested: "Evidence is mixed, replications have failed, or the claim is actively disputed.",
};

/** Ordered from strongest empirical footing to weakest — used for a consistent glyph scale. */
export const EVIDENCE_ORDER: EvidenceClass[] = [
  "original-empirical",
  "peer-reviewed",
  "established-theory",
  "official-standard",
  "professional-guideline",
  "practitioner-recommendation",
  "emerging-hypothesis",
  "contested",
];

export const STATUS_LABEL: Record<ContentStatus, string> = {
  planned: "Planned",
  "research-pending": "Research pending",
  "research-completed": "Research completed",
  drafted: "Drafted",
  reviewed: "Quality reviewed",
  published: "Published",
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const LEVEL_PURPOSE: Record<Difficulty, string> = {
  beginner: "Understand",
  intermediate: "Apply",
  advanced: "Analyse & evaluate",
};

export const RELATION_LABEL: Record<RelationType | "prerequisite-of", string> = {
  "prerequisite-of": "Prerequisite of",
  "related-to": "Related to",
  "derived-from": "Derived from",
  "applied-in": "Applied in",
  "contrasts-with": "Contrasts with",
  "measured-by": "Measured by",
  "developed-from": "Developed from",
  influences: "Influences",
  "complementary-to": "Complementary to",
};

export const KIND_LABEL = {
  entry: "Entry",
  planned: "Planned",
  glossary: "Glossary",
  formula: "Formula",
  lab: "Lab",
  comparison: "Comparison",
  workshop: "Workshop",
  path: "Path",
} as const;

export const TIER_LABEL: Record<number, string> = {
  1: "Tier 1 · Original evidence & standards",
  2: "Tier 2 · Authoritative professional",
  3: "Tier 3 · Established educational",
  4: "Tier 4 · Discovery only",
};
