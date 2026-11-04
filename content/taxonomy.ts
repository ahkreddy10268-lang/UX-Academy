/**
 * The knowledge taxonomy — the complete first-pass subject inventory (spec Part 6).
 *
 * A topic appearing here does NOT mean its educational content exists. Coverage
 * is computed by joining these items against /content/knowledge entries by slug
 * (see lib/content/coverage.ts). Items without an entry are shown as "planned".
 *
 * Item notation: "Title" or "Title|slug" (explicit slug) — type is set per group.
 */
import type { Domain, KnowledgeType } from "../lib/content/schema";

type Item = { slug: string; title: string; type: KnowledgeType; coveredBy?: string };

/** Topics explained inside a larger published entry: kept for search and links, reported as "addressed within", never as published. */
function within(entry: string, items: Item[]): Item[] {
  return items.map((i) => ({ ...i, coveredBy: entry }));
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]s\b/g, "")
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function g(type: KnowledgeType, ...titles: string[]): Item[] {
  return titles.map((raw) => {
    const [title, explicit] = raw.split("|");
    return { title, slug: explicit ?? slugify(title), type };
  });
}

export const domains: Domain[] = [
  {
    id: "foundations",
    title: "UX & UI Fundamentals",
    shortTitle: "Fundamentals",
    description:
      "What user experience is, how it differs from interface design, and the vocabulary every other subject builds on.",
    subcategories: [
      {
        id: "core-concepts",
        title: "Core concepts",
        items: [
          ...g("discipline", "User Experience (UX)|user-experience", "User Interface (UI) Design|ui-design", "Product Design", "Interaction Design|interaction-design-discipline", "Experience Design"),
          ...g("concept", "Usability", "Utility", "Usefulness", "Desirability", "Feasibility", "Viability", "UX Maturity"),
          ...g("discipline", "Human-Computer Interaction (HCI)|human-computer-interaction"),
        ],
      },
      {
        id: "approaches",
        title: "Design approaches",
        items: [
          ...g("framework", "User-Centred Design|user-centred-design", "Human-Centred Design|human-centred-design", "Design Thinking"),
          ...g("concept", "Accessibility|accessibility-concept", "Inclusive Design", "UX Lifecycle", "Design Process|design-processes"),
        ],
      },
      {
        id: "history-ethics",
        title: "History & responsibility",
        items: [
          ...g("historical-contribution", "History of Interface Design", "History of HCI", "Evolution of Digital Experiences"),
          ...g("concept", "Design Ethics|design-ethics-foundations", "Design Responsibilities"),
        ],
      },
    ],
  },
  {
    id: "laws-effects",
    title: "UX Laws & Cognitive Effects",
    shortTitle: "Laws & Effects",
    description:
      "Empirical laws of human performance and the cognitive effects popularised as 'laws of UX' — with their original science, evidence and limits.",
    subcategories: [
      {
        id: "performance-laws",
        title: "Human performance laws & models",
        description: "Quantitative regularities measured in controlled experiments.",
        items: [
          ...g("law", "Fitts's Law|fitts-law", "Hick-Hyman Law|hick-hyman-law", "Steering Law", "Power Law of Practice", "Weber's Law|webers-law", "Fechner's Law|fechners-law"),
        ],
      },
      {
        id: "popular-ux-laws",
        title: "Popular UX laws & rules of thumb",
        description: "Practitioner maxims — useful, but not laws in the scientific sense.",
        items: [
          ...g("principle", "Jakob's Law|jakobs-law", "Tesler's Law|teslers-law", "Postel's Law|postels-law", "Doherty Threshold"),
          ...g("rule-of-thumb", "Parkinson's Law|parkinsons-law", "Occam's Razor|occams-razor", "Pareto Principle"),
        ],
      },
      {
        id: "memory-attention-effects",
        title: "Memory & attention effects",
        items: [
          ...g("concept", "Miller's Law|millers-law", "Serial Position Effect"),
          ...within("serial-position-effect", g("concept", "Primacy Effect", "Recency Effect")),
          ...g("concept", "Von Restorff Effect", "Zeigarnik Effect", "Peak-End Rule", "Mere Exposure Effect", "Aesthetic-Usability Effect", "Cognitive Ease"),
        ],
      },
      {
        id: "gestalt",
        title: "Gestalt laws of grouping",
        items: [
          ...g("principle", "Gestalt Principles"),
          ...within("gestalt-principles", g("principle", "Law of Prägnanz|law-of-pragnanz", "Law of Proximity", "Law of Similarity", "Law of Closure", "Law of Continuity", "Law of Common Region", "Common Fate", "Uniform Connectedness")),
        ],
      },
      {
        id: "decision-biases",
        title: "Decision-making biases",
        items: [
          ...g("cognitive-bias", "Choice Overload", "Default Effect", "Social Proof", "Loss Aversion", "Anchoring Effect", "Framing Effect", "Goal-Gradient Effect", "IKEA Effect", "Endowment Effect", "Sunk Cost Effect", "Status Quo Bias", "Availability Heuristic", "Confirmation Bias", "Decision Fatigue"),
        ],
      },
    ],
  },
  {
    id: "psychology",
    title: "HCI & Psychology",
    shortTitle: "Psychology",
    description:
      "Cognitive psychology, behavioural science, visual cognition and human factors — the science of the person on the other side of the screen.",
    subcategories: [
      {
        id: "cognitive",
        title: "Cognitive psychology",
        items: [
          ...g("theory", "Cognitive Load Theory", "Working Memory Model", "Atkinson-Shiffrin Memory Model|atkinson-shiffrin-model", "Dual Coding Theory", "Schema Theory", "Information Processing Theory", "Bounded Rationality and Satisficing|bounded-rationality"),
          ...g("principle", "Recognition over Recall|recognition-over-recall"),
          ...g("concept", "Selective Attention", "Sustained Attention", "Perceptual Load", "Cognitive Flexibility", "Mental Workload", "Decision-Making|decision-making"),
        ],
      },
      {
        id: "behavioural",
        title: "Behavioural science",
        items: [
          ...g("theory", "Classical Conditioning", "Operant Conditioning", "Reinforcement Theory", "Self-Determination Theory", "Flow Theory", "Goal-Setting Theory", "Social Learning Theory", "Nudge Theory"),
          ...g("model", "COM-B Model|com-b-model", "Behaviour Change Wheel", "Fogg Behavior Model|fogg-behavior-model", "Hook Model"),
          ...g("concept", "Habit Formation", "Motivation Theory", "Persuasive Technology"),
        ],
      },
      {
        id: "visual-cognition",
        title: "Visual cognition",
        items: [
          ...g("concept", "Figure-Ground Relationship|figure-ground", "Visual Search", "Visual Saliency", "Preattentive Processing", "Change Blindness", "Inattentional Blindness", "Colour Perception", "Depth Perception", "Pattern Recognition", "Banner Blindness"),
        ],
      },
      {
        id: "human-factors",
        title: "Human factors & HCI theory",
        items: [
          ...g("model", "Seven Stages of Action", "Gulfs of Execution and Evaluation|gulfs-of-execution-and-evaluation"),
          ...g("concept", "Mental Models", "Conceptual Models", "Affordances", "Signifiers", "Constraints", "Mapping", "Feedback|feedback-principle"),
          ...g("theory", "Distributed Cognition", "Situated Cognition|situated-action", "Activity Theory", "Embodied Interaction", "Ecological Psychology"),
          ...g("discipline", "Human Factors and Ergonomics|human-factors-engineering", "Cognitive Ergonomics"),
          ...g("model", "Situation Awareness", "Technology Acceptance Model (TAM)|technology-acceptance-model", "Emotional Design (Visceral, Behavioural, Reflective)|emotional-design"),
          ...g("concept", "Paradox of the Active User"),
        ],
      },
    ],
  },
  {
    id: "heuristics",
    title: "Principles & Heuristics",
    shortTitle: "Heuristics",
    description:
      "The rule-sets practitioners use to judge interfaces — where they came from, how they overlap, and how much evidence stands behind them.",
    subcategories: [
      {
        id: "heuristic-sets",
        title: "Heuristic sets",
        items: [
          ...g("heuristic", "Nielsen's 10 Usability Heuristics|nielsen-usability-heuristics", "Shneiderman's Eight Golden Rules|shneiderman-golden-rules", "Norman's Design Principles|norman-design-principles", "Tognazzini's First Principles|tognazzini-principles", "Gerhardt-Powals' Cognitive Engineering Principles|gerhardt-powals-principles", "Bastien & Scapin Ergonomic Criteria|bastien-scapin-criteria"),
          ...g("standard", "ISO 9241-110 Interaction Principles|iso-9241-110"),
        ],
      },
      {
        id: "principle-families",
        title: "Principle families",
        items: [
          ...g("principle", "Visual Design Principles", "Accessibility Principles", "Content Design Principles", "Error Prevention", "Consistency and Standards|consistency-principle", "User Control and Freedom"),
        ],
      },
    ],
  },
  {
    id: "research",
    title: "UX Research",
    shortTitle: "Research",
    description:
      "Generative and evaluative research — planning, methods, analysis and the ethics of studying people.",
    subcategories: [
      {
        id: "qualitative",
        title: "Qualitative methods",
        items: [
          ...g("method", "In-depth Interviews", "Contextual Inquiry", "Ethnographic Research", "Field Studies", "Diary Studies", "Focus Groups", "Observation", "Think-Aloud Protocol", "Stakeholder Interviews", "Participatory Design"),
        ],
      },
      {
        id: "quantitative",
        title: "Quantitative methods",
        items: [
          ...g("method", "Surveys", "A/B Testing|ab-testing", "Product Analytics", "Benchmark Studies", "First-Click Testing", "Quantitative Usability Testing", "Cohort Analysis", "Eye Tracking"),
          ...g("research-instrument", "Questionnaires"),
        ],
      },
      {
        id: "planning",
        title: "Research planning & ethics",
        items: [
          ...g("technique", "Research Objectives", "Research Questions", "Hypothesis Development", "Research Plans", "Participant Recruitment", "Screening Questionnaires", "Sampling", "Research Protocols", "Bias Reduction"),
          ...g("methodology", "Mixed-Methods Research|mixed-methods-research"),
          ...g("concept", "Informed Consent", "Research Privacy", "Research Ethics"),
        ],
      },
      {
        id: "synthesis",
        title: "Analysis & synthesis",
        items: [
          ...g("technique", "Affinity Mapping", "Thematic Analysis", "Qualitative Coding", "Insight Synthesis", "Data Triangulation", "Research Readouts", "Personas", "Scenarios"),
          ...g("tool", "Research Repositories"),
          ...g("strategy", "Evidence-Based Decision Making"),
        ],
      },
      {
        id: "evaluation",
        title: "Usability evaluation",
        items: [
          ...g("method", "Usability Testing", "Moderated Testing", "Unmoderated Testing", "Remote Testing", "Guerrilla Testing", "Accessibility Testing", "Cognitive Walkthrough", "Heuristic Evaluation", "Comparative Testing", "Tree Testing", "Card Sorting", "Concept Testing", "Wizard of Oz Prototyping|wizard-of-oz"),
          ...g("concept", "Formative Evaluation", "Summative Evaluation"),
        ],
      },
    ],
  },
  {
    id: "frameworks",
    title: "Methods & Frameworks",
    shortTitle: "Frameworks",
    description:
      "Process models, strategy frameworks and analytical models — each classified for what it actually is.",
    subcategories: [
      {
        id: "process",
        title: "Design process frameworks",
        items: [
          ...g("framework", "Double Diamond", "Lean UX", "Agile UX", "Design Sprint", "ADDIE"),
        ],
      },
      {
        id: "strategy",
        title: "Discovery & strategy frameworks",
        items: [
          ...g("framework", "Jobs To Be Done|jobs-to-be-done", "Outcome-Driven Innovation", "Opportunity Solution Tree", "Business Model Canvas", "Value Proposition Canvas"),
          ...g("model", "Kano Model"),
          ...g("technique", "RICE Scoring|rice", "MoSCoW Prioritisation|moscow"),
          ...g("metric", "North Star Metric"),
        ],
      },
      {
        id: "measurement",
        title: "Measurement frameworks",
        items: [
          ...g("framework", "HEART Framework", "AARRR Framework|aarrr", "Kirkpatrick Model"),
        ],
      },
      {
        id: "mapping",
        title: "Mapping techniques",
        items: [
          ...g("technique", "Empathy Mapping", "Customer Journey Mapping", "Experience Mapping"),
        ],
      },
      {
        id: "analytical-models",
        title: "Analytical models of interaction",
        items: [
          ...g("model", "GOMS", "Keystroke-Level Model|keystroke-level-model"),
          ...g("method", "Hierarchical Task Analysis|task-analysis"),
        ],
      },
    ],
  },
  {
    id: "ia",
    title: "Information Architecture",
    shortTitle: "IA",
    description: "How information is organised, labelled, navigated and found.",
    subcategories: [
      {
        id: "discipline",
        title: "The discipline",
        items: [...g("discipline", "Information Architecture|information-architecture")],
      },
      {
        id: "structures",
        title: "Structures & models",
        items: [
          ...g("concept", "Taxonomies", "Ontologies", "Metadata", "Hierarchies", "Content Modelling", "Sitemaps"),
          ...g("technique", "Content Inventory", "Content Audit"),
        ],
      },
      {
        id: "navigation",
        title: "Navigation & findability",
        items: [
          ...g("pattern", "Breadcrumbs", "Global Navigation", "Local Navigation", "Faceted Navigation", "Navigation Patterns"),
          ...g("theory", "Information Foraging Theory"),
          ...g("concept", "Information Scent"),
          ...g("concept", "Search Architecture", "Labelling Systems", "Findability"),
        ],
      },
    ],
  },
  {
    id: "interaction",
    title: "Interaction Design",
    shortTitle: "Interaction",
    description: "How people act on interfaces and how interfaces respond.",
    subcategories: [
      {
        id: "principles",
        title: "Interaction principles",
        items: [
          ...g("principle", "Discoverability", "Visibility of System Status|visibility-of-system-status", "Direct Manipulation", "Progressive Disclosure", "Error Recovery"),
          ...g("guideline", "Platform Design Guidelines"),
          ...g("concept", "Interaction Cost", "State Transitions", "Interaction States"),
        ],
      },
      {
        id: "modalities",
        title: "Input & modalities",
        items: [
          ...g("concept", "Input Methods", "Touch Interactions", "Keyboard Interactions", "Voice Interactions", "Gesture Design"),
          ...g("guideline", "Touch Target Size"),
        ],
      },
      {
        id: "motion",
        title: "Motion & microinteractions",
        items: [
          ...g("pattern", "Microinteractions"),
          ...g("principle", "Motion Design|motion-design-principles", "Animation Principles"),
        ],
      },
    ],
  },
  {
    id: "visual",
    title: "UI & Visual Design",
    shortTitle: "Visual",
    description: "Composition, hierarchy, layout and the visual principles of interface design.",
    subcategories: [
      {
        id: "composition",
        title: "Composition principles",
        items: [
          ...g("principle", "Visual Hierarchy", "Alignment", "Balance", "Contrast|visual-contrast", "Repetition", "Proportion", "Scale", "Emphasis", "White Space", "Rhythm", "Unity", "Variety"),
        ],
      },
      {
        id: "layout",
        title: "Layout & proportion",
        items: [
          ...g("concept", "Grid Systems", "Golden Ratio", "Rule of Thirds", "Responsive Composition", "Information Density", "Visual Complexity", "Shape Language"),
        ],
      },
      {
        id: "elements",
        title: "Visual elements",
        items: [...g("concept", "Iconography", "Colour Theory", "Colour Psychology", "Colour Harmony", "Design Aesthetics")],
      },
    ],
  },
  {
    id: "type-colour",
    title: "Typography & Colour Science",
    shortTitle: "Type & Colour",
    description: "Type as an engineered reading system, and colour as measurable light.",
    subcategories: [
      {
        id: "typography",
        title: "Typography",
        items: [
          ...g("concept", "Typeface Classification", "Font Anatomy", "Typographic Hierarchy", "Legibility", "Readability", "Line Length", "Line Height", "Kerning", "Tracking", "Leading", "Optical Sizing", "Variable Fonts", "Font Pairing"),
          ...g("formula", "Modular Type Scale"),
        ],
      },
      {
        id: "colour",
        title: "Colour science",
        items: [
          ...g("model", "Colour Models", "RGB", "HSL", "HSV", "CMYK", "Perceptual Colour Spaces", "CIE Lab|cie-lab"),
          ...g("formula", "Colour Contrast Ratio"),
          ...g("concept", "Colour Gamut", "Colour Vision Deficiency|colour-vision-differences", "Semantic Colour Systems"),
        ],
      },
    ],
  },
  {
    id: "design-systems",
    title: "Design Systems",
    shortTitle: "Systems",
    description: "Tokens, components, governance and the architecture of interface systems.",
    subcategories: [
      {
        id: "foundations",
        title: "System foundations",
        items: [
          ...g("concept", "Design System|design-system"),
          ...g("methodology", "Atomic Design"),
          ...g("concept", "Design Language", "Design Tokens", "Primitive Tokens", "Semantic Tokens", "Theme Architecture", "Multi-Brand Systems"),
        ],
      },
      {
        id: "scales",
        title: "Scales & visual systems",
        items: [...g("concept", "Spacing Scales", "Typography Scales", "Colour Systems", "Elevation Systems", "Icon Systems", "Responsive Systems")],
      },
      {
        id: "components",
        title: "Components & patterns",
        items: [
          ...g("concept", "Component Libraries", "Component Architecture", "Variants", "Component Properties", "Component State Management"),
          ...g("pattern", "Form Architecture", "Data Tables", "Empty States", "Loading States", "Error States", "Skeleton Screens", "Progressive Loading"),
        ],
      },
      {
        id: "operations",
        title: "Governance & operations",
        items: [...g("strategy", "Design Governance", "Design System Versioning", "Design QA", "Design System Audits", "Design-to-Development Handoff")],
      },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility & Inclusive Design",
    shortTitle: "Accessibility",
    description: "Standards, techniques and the lived experience of disability in digital products.",
    subcategories: [
      {
        id: "standards",
        title: "Standards & conformance",
        items: [
          ...g("standard", "WCAG", "EN 301 549|en-301-549", "ISO/IEC 40500|iso-iec-40500", "WAI-ARIA|aria", "Section 508|section-508", "European Accessibility Act|european-accessibility-act"),
          ...g("principle", "POUR Principles|pour"),
          ...g("concept", "Success Criteria", "Conformance Levels"),
        ],
      },
      {
        id: "techniques",
        title: "Techniques",
        items: [
          ...g("technique", "Keyboard Accessibility", "Focus Management", "Focus Order", "Semantic HTML", "Non-Colour Indicators", "Reduced Motion", "Accessible Forms", "Accessibility Audits", "Accessible Prototyping", "Captions and Transcripts"),
          ...g("tool", "Screen Readers", "Assistive Technologies"),
        ],
      },
      {
        id: "inclusion",
        title: "Inclusion",
        items: [
          ...g("concept", "Cognitive Accessibility", "Visual Accessibility", "Motor Accessibility", "Hearing Accessibility", "Inclusive Content"),
          ...g("framework", "Universal Design", "Inclusive Design Principles"),
          ...g("method", "Inclusive Research"),
        ],
      },
    ],
  },
  {
    id: "content",
    title: "UX Writing & Content Design",
    shortTitle: "Content",
    description: "Words as interface: microcopy, plain language, voice and content governance.",
    subcategories: [
      {
        id: "writing",
        title: "Interface writing",
        items: [
          ...g("discipline", "UX Writing", "Content Design"),
          ...g("pattern", "Microcopy", "Error Messages", "Form Instructions", "Onboarding Copy", "Empty-State Writing"),
          ...g("principle", "Plain Language", "Tone of Voice"),
        ],
      },
      {
        id: "systems",
        title: "Content systems",
        items: [
          ...g("concept", "Content Hierarchy", "Localisation|localization", "Internationalisation|internationalization", "Conversational Writing", "Terminology Management"),
          ...g("formula", "Readability Formulas"),
          ...g("strategy", "Content Governance"),
        ],
      },
    ],
  },
  {
    id: "product",
    title: "Product Design & Strategy",
    shortTitle: "Product",
    description: "Discovery, strategy, prioritisation and outcomes — design as a business discipline.",
    subcategories: [
      {
        id: "discovery",
        title: "Discovery",
        items: [
          ...g("method", "Product Discovery", "Market Research", "Competitive Analysis"),
          ...g("technique", "Problem Framing", "Opportunity Identification"),
          ...g("concept", "Product-Market Fit"),
        ],
      },
      {
        id: "strategy",
        title: "Strategy & definition",
        items: [
          ...g("strategy", "Product Vision", "Product Strategy", "UX Strategy", "Product Positioning", "Product Roadmaps", "Prioritisation"),
          ...g("framework", "Objectives and Key Results (OKRs)|okrs"),
          ...g("technique", "User Story Mapping", "Feature Definition", "Product Requirements", "User Stories", "Acceptance Criteria"),
        ],
      },
      {
        id: "outcomes",
        title: "Outcomes & operations",
        items: [
          ...g("method", "Product Experimentation"),
          ...g("concept", "Outcome Metrics", "Business Value", "User Value"),
          ...g("strategy", "Stakeholder Management", "Design Leadership", "Design Operations|design-ops"),
        ],
      },
    ],
  },
  {
    id: "service",
    title: "Service Design & Systems Thinking",
    shortTitle: "Service",
    description: "Designing across channels, organisations and time.",
    subcategories: [
      {
        id: "service-design",
        title: "Service design",
        items: [
          ...g("discipline", "Service Design"),
          ...g("technique", "Service Blueprints", "Stakeholder Maps", "Ecosystem Maps", "Service Prototyping"),
          ...g("concept", "Service Ecosystems", "Touchpoints", "Frontstage and Backstage", "Omnichannel Experience", "Organisational Experience"),
          ...g("method", "Service Evaluation"),
        ],
      },
      {
        id: "systems",
        title: "Systems & participation",
        items: [
          ...g("theory", "Systems Thinking"),
          ...g("methodology", "Co-design"),
        ],
      },
    ],
  },
  {
    id: "metrics",
    title: "Metrics, Formulas & Statistics",
    shortTitle: "Metrics",
    description: "Measurement instruments, product metrics and the statistics needed to interpret them honestly.",
    subcategories: [
      {
        id: "usability-metrics",
        title: "Usability measurement",
        items: [
          ...g("research-instrument", "System Usability Scale|system-usability-scale", "UMUX-LITE|umux-lite", "NASA-TLX|nasa-tlx", "Single Ease Question (SEQ)|single-ease-question", "SUPR-Q|supr-q", "User Experience Questionnaire (UEQ)|user-experience-questionnaire"),
          ...g("metric", "Task Success Rate", "Time on Task", "Error Rate", "Learnability", "Effectiveness", "Efficiency", "Satisfaction"),
        ],
      },
      {
        id: "product-metrics",
        title: "Product & customer metrics",
        items: [
          ...g("metric", "Net Promoter Score|net-promoter-score", "Customer Satisfaction Score (CSAT)|csat", "Customer Effort Score (CES)|ces", "Conversion Rate", "Activation Rate", "Retention Rate", "Churn Rate", "DAU/MAU Ratio|dau-mau", "Engagement", "Feature Adoption", "Bounce Rate", "Drop-off Rate", "Funnel Conversion", "Cohort Retention"),
        ],
      },
      {
        id: "statistics",
        title: "Statistics for UX",
        items: [
          ...g("concept", "Descriptive Statistics", "Standard Deviation", "Variance", "Confidence Intervals", "Statistical Significance", "P-value|p-value", "Effect Size", "Correlation", "Regression", "Statistical Power", "Bayesian Reasoning"),
          ...g("technique", "Sample Size Estimation", "Margin of Error"),
        ],
      },
      {
        id: "visual-math",
        title: "Visual design mathematics",
        items: [...g("formula", "Aspect Ratios", "Grid Calculations")]
          .concat(g("technique", "Responsive Breakpoints")),
      },
    ],
  },
  {
    id: "dataviz",
    title: "Data Visualisation",
    shortTitle: "Data Viz",
    description: "Encoding data for perception, accuracy and decision-making.",
    subcategories: [
      {
        id: "dataviz-core",
        title: "Perception & encoding",
        items: [
          ...g("theory", "Graphical Perception"),
          ...g("concept", "Visual Encoding", "Data Hierarchy", "Statistical Graphics", "Cognitive Load in Data Visualisation", "Colour in Data Visualisation"),
          ...g("principle", "Data-Ink Ratio"),
        ],
      },
      {
        id: "dataviz-practice",
        title: "Chart design & practice",
        items: [
          ...g("technique", "Chart Selection", "Dashboard Design"),
          ...g("concept", "Chart Integrity", "Accessible Charts", "Exploratory Visualisation", "Explanatory Visualisation", "Interaction in Data Visualisation"),
          ...g("pattern", "Small Multiples"),
        ],
      },
    ],
  },
  {
    id: "ethics",
    title: "Ethical & Responsible Design",
    shortTitle: "Ethics",
    description: "Persuasion versus manipulation, privacy, trust and the responsibilities of design.",
    subcategories: [
      {
        id: "ethics-core",
        title: "Ethical frameworks & responsibility",
        items: [
          ...g("concept", "Ethical Design", "Responsible Product Design", "Algorithmic Fairness", "Sustainable UX"),
          ...g("framework", "Value Sensitive Design", "Responsible AI"),
        ],
      },
      {
        id: "trust-privacy",
        title: "Privacy, consent & manipulation",
        items: [
          ...g("concept", "Privacy-Centred Design|privacy-by-design", "Security UX", "Trust", "Consent Design", "Transparency", "User Autonomy", "Behaviour Change Design|behaviour-change-design"),
          ...g("anti-pattern", "Deceptive Patterns (Dark Patterns)|deceptive-patterns"),
        ],
      },
    ],
  },
  {
    id: "emerging",
    title: "Emerging & Specialised Disciplines",
    shortTitle: "Emerging",
    description: "AI, spatial, conversational and domain-specific design practice.",
    subcategories: [
      {
        id: "ai",
        title: "Human-AI interaction",
        items: [
          ...g("guideline", "Human-AI Interaction Guidelines|human-ai-interaction"),
          ...g("emerging-concept", "AI UX|ai-ux", "Generative AI Interfaces", "Agentic AI Interfaces", "Explainable AI", "AI Transparency", "Calibrated Trust in AI|ai-trust"),
        ],
      },
      {
        id: "modalities",
        title: "New modalities",
        items: [
          ...g("discipline", "Conversational UX", "Voice User Interfaces"),
          ...g("emerging-concept", "Chatbot Design", "Multimodal Interaction", "Augmented Reality", "Virtual Reality", "Mixed Reality", "Spatial Computing", "Wearable UX", "Smart Home UX", "Internet of Things|iot-ux", "Ambient Computing"),
        ],
      },
      {
        id: "domains",
        title: "Domain specialisms",
        items: [
          ...g("discipline", "Automotive UX", "Healthcare UX", "Fintech UX", "Enterprise UX", "B2B SaaS UX|b2b-saas-ux", "Ecommerce UX", "Gaming UX", "Educational UX", "Learning Experience Design", "Cross-Cultural UX"),
        ],
      },
    ],
  },
  {
    id: "practice",
    title: "Design Practice & Technical Literacy",
    shortTitle: "Practice",
    description: "How design work actually gets done, documented and built.",
    subcategories: [
      {
        id: "practice-core",
        title: "Professional practice",
        items: [
          ...g("technique", "Design Critique", "Design Documentation", "UX Portfolio", "Stakeholder Communication", "Design Collaboration", "Prototyping", "Interaction Specifications"),
          ...g("strategy", "Research Operations", "Agile Product Workflows"),
        ],
      },
      {
        id: "technical",
        title: "Technical literacy",
        items: [
          ...g("concept", "HTML for Designers", "CSS for Designers", "Responsive Development", "Browser Rendering", "Frontend Accessibility", "API Fundamentals", "Design-to-Code Workflows"),
        ],
      },
    ],
  },
];
