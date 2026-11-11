/**
 * The knowledge taxonomy v1.0 — the canonical subject inventory (docs/KNOWLEDGE_TAXONOMY.md, governance in docs/CONTENT_MODEL.md § Taxonomy governance).
 *
 * A topic appearing here does NOT mean its educational content exists. Coverage
 * is computed by joining these items against /content/knowledge entries by slug
 * (see lib/content/coverage.ts). Items without an entry are shown as "planned".
 *
 * Item notation: "Title" or "Title|slug" (explicit slug) — type is set per group.
 */
import type { Domain, KnowledgeType } from "../lib/content/schema";

type Item = { slug: string; title: string; type: KnowledgeType; coveredBy?: string; aliases?: string[] };

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
          ...g("framework", "User-Centred Design", "Human-Centred Design", "Design Thinking"),
          ...g("concept", "UX Lifecycle", "Design Process|design-processes"),
        ],
      },
      {
        id: "history-ethics",
        title: "History of design & HCI",
        items: [
          ...g("historical-contribution", "History of Interface Design", "History of HCI", "Evolution of Digital Experiences"),
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
          ...g("law", "Fitts's Law", "Hick-Hyman Law", "Steering Law", "Power Law of Practice", "Weber's Law|webers-law", "Fechner's Law|fechners-law"),
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
          ...within("gestalt-principles", g("principle", "Law of Prägnanz", "Law of Proximity", "Law of Similarity", "Law of Closure", "Law of Continuity", "Law of Common Region", "Common Fate", "Uniform Connectedness")),
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
    title: "Cognition, Behaviour & Human Factors",
    shortTitle: "Cognition",
    description:
      "The human capabilities, limitations, motivations and contexts that shape interaction: cognitive psychology and learning, behaviour and emotion, visual perception, and human factors.",
    subcategories: [
      {
        id: "cognitive",
        title: "Cognitive psychology, memory & learning",
        items: [
          ...g("theory", "Cognitive Load Theory", "Working Memory Model", "Atkinson-Shiffrin Memory Model|atkinson-shiffrin-model", "Dual Coding Theory", "Schema Theory", "Information Processing Theory", "Bounded Rationality and Satisficing|bounded-rationality"),
          ...g("principle", "Recognition over Recall"),
          ...g("concept", "Selective Attention", "Sustained Attention", "Perceptual Load", "Cognitive Flexibility", "Mental Workload", "Decision-Making", "Learning and Skill Acquisition"),
        ],
      },
      {
        id: "behavioural",
        title: "Behavioural science, motivation & emotion",
        items: [
          ...g("theory", "Classical Conditioning", "Operant Conditioning", "Reinforcement Theory", "Self-Determination Theory", "Flow Theory", "Goal-Setting Theory", "Social Learning Theory", "Nudge Theory"),
          ...g("model", "COM-B Model", "Behaviour Change Wheel", "Fogg Behavior Model", "Hook Model"),
          ...g("concept", "Habit Formation", "Motivation Theory", "Persuasive Technology", "Emotion and Affect in Interaction"),
          ...g("model", "Emotional Design (Visceral, Behavioural, Reflective)|emotional-design"),
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
        title: "Human factors, ergonomics & HCI theory",
        items: [
          ...g("model", "Seven Stages of Action", "Gulfs of Execution and Evaluation"),
          ...g("concept", "Mental Models", "Conceptual Models", "Affordances", "Signifiers"),
          ...g("theory", "Distributed Cognition", "Situated Cognition|situated-action", "Activity Theory", "Embodied Interaction", "Ecological Psychology"),
          ...g("discipline", "Human Factors and Ergonomics|human-factors-engineering", "Cognitive Ergonomics"),
          ...g("model", "Situation Awareness", "Technology Acceptance Model (TAM)|technology-acceptance-model"),
          ...g("concept", "Paradox of the Active User", "Motor Control and Human Performance|motor-control"),
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
        title: "Heuristic sets, standards & cross-cutting principles",
        items: [
          ...g("heuristic", "Nielsen's 10 Usability Heuristics|nielsen-usability-heuristics", "Shneiderman's Eight Golden Rules|shneiderman-golden-rules", "Norman's Design Principles", "Tognazzini's First Principles|tognazzini-principles", "Gerhardt-Powals' Cognitive Engineering Principles|gerhardt-powals-principles", "Bastien & Scapin Ergonomic Criteria|bastien-scapin-criteria"),
          ...g("standard", "ISO 9241-110 Interaction Principles|iso-9241-110"),
          ...g("principle", "Consistency and Standards|consistency-principle", "User Control and Freedom", "Flexibility and Efficiency of Use", "Aesthetic and Minimalist Design"),
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
          ...g("method", "Surveys", "A/B Testing|ab-testing", "Product Analytics", "Benchmark Studies", "First-Click Testing", "Quantitative Usability Testing", "Cohort Analysis", "Eye Tracking", "Controlled Experiments"),
        ],
      },
      {
        id: "planning",
        title: "Research planning & protocols",
        items: [
          ...g("technique", "Research Objectives", "Research Questions", "Hypothesis Development", "Research Plans", "Participant Recruitment", "Screening Questionnaires", "Sampling", "Research Protocols", "Bias Reduction"),
          ...g("methodology", "Mixed-Methods Research"),
        ],
      },
      {
        id: "ethics",
        title: "Research ethics & participant care",
        description: "Consent, privacy and the duties owed to the people who take part in research.",
        items: [
          ...g("concept", "Informed Consent", "Research Privacy", "Research Ethics"),
        ],
      },
      {
        id: "synthesis",
        title: "Analysis & synthesis",
        items: [
          ...g("technique", "Affinity Mapping", "Thematic Analysis", "Qualitative Coding", "Insight Synthesis", "Data Triangulation", "Research Readouts", "Personas", "Scenarios"),
          ...g("concept", "Research Repositories"),
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
    title: "Design Methods & Frameworks",
    shortTitle: "Design methods",
    description:
      "Cross-disciplinary design processes, ideation and facilitation methods, and analytical models. Research methods, product strategy, service methods and metrics have their own domains.",
    subcategories: [
      {
        id: "process",
        title: "Design process & lifecycle frameworks",
        items: [
          ...g("framework", "Double Diamond", "Lean UX", "Agile UX", "Design Sprint", "ADDIE", "Kirkpatrick Model"),
        ],
      },
      {
        id: "mapping",
        title: "Ideation, mapping & facilitation",
        items: [
          ...g("technique", "Empathy Mapping", "Ideation Techniques", "Workshop Facilitation"),
        ],
      },
      {
        id: "analytical-models",
        title: "Analytical models of interaction",
        items: [
          ...g("model", "GOMS", "Keystroke-Level Model"),
          ...g("method", "Hierarchical Task Analysis|task-analysis"),
        ],
      },
    ],
  },
  {
    id: "ia",
    title: "Information Architecture",
    shortTitle: "IA",
    description:
      "How information is organised, labelled, navigated and found.",
    subcategories: [
      {
        id: "discipline",
        title: "IA foundations & practice",
        items: [
          ...g("discipline", "Information Architecture"),
          ...g("technique", "Content Inventory", "Content Audit"),
          ...g("concept", "Sitemaps"),
        ],
      },
      {
        id: "structures",
        title: "Structures & models",
        items: [
          ...g("concept", "Taxonomies", "Ontologies", "Metadata", "Hierarchies", "Content Modelling", "Labelling Systems"),
        ],
      },
      {
        id: "findability",
        title: "Search, information scent & findability",
        description: "How people locate information: foraging, scent, search and findability.",
        items: [
          ...g("concept", "Findability"),
          ...g("theory", "Information Foraging Theory"),
          ...g("concept", "Information Scent", "Search Architecture"),
        ],
      },
      {
        id: "navigation",
        title: "Navigation & findability",
        items: [
          ...g("pattern", "Breadcrumbs", "Global Navigation", "Local Navigation", "Faceted Navigation", "Navigation Patterns"),
        ],
      },
    ],
  },
  {
    id: "interaction",
    title: "Interaction Design",
    shortTitle: "Interaction",
    description:
      "How people act on interfaces and how interfaces respond.",
    subcategories: [
      {
        id: "principles",
        title: "Interaction principles",
        items: [
          ...g("principle", "Discoverability", "Visibility of System Status", "Direct Manipulation", "Progressive Disclosure", "Error Recovery"),
          ...g("guideline", "Platform Design Guidelines"),
          ...g("concept", "Interaction Cost", "Feedback|feedback-principle", "Constraints", "Mapping"),
          ...g("principle", "Error Prevention"),
        ],
      },
      {
        id: "patterns",
        title: "Interaction patterns, state & forms",
        description: "Recurring interaction solutions, system state and the design of forms.",
        items: [
          ...g("technique", "Form Design"),
          ...g("concept", "Interaction States", "State Transitions"),
        ],
      },
      {
        id: "modalities",
        title: "Input & modalities",
        items: [
          ...g("concept", "Input Methods", "Touch Interactions", "Keyboard Interactions", "Gesture Design"),
          ...g("guideline", "Touch Target Size"),
          ...g("technique", "Haptic Feedback Design"),
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
    description:
      "Composition, hierarchy, layout and the visual principles of interface design.",
    subcategories: [
      {
        id: "foundations",
        title: "Visual communication foundations",
        description: "The disciplines that frame visual work: graphic design, information design and brand identity.",
        items: [
          ...g("discipline", "Graphic Design & Visual Communication|graphic-design", "Information Design", "Brand Identity Design"),
        ],
      },
      {
        id: "composition",
        title: "Composition & visual design principles",
        items: [
          ...g("principle", "Visual Hierarchy", "Alignment", "Balance", "Contrast|visual-contrast", "Repetition", "Proportion", "Scale", "Emphasis", "White Space", "Rhythm", "Unity", "Variety", "Visual Design Principles"),
        ],
      },
      {
        id: "layout",
        title: "Layout & proportion",
        items: [
          ...g("concept", "Grid Systems", "Golden Ratio", "Rule of Thirds", "Responsive Composition", "Information Density", "Visual Complexity"),
        ],
      },
      {
        id: "elements",
        title: "Interface elements, iconography & aesthetics",
        items: [
          ...g("concept", "Iconography", "Design Aesthetics", "Shape Language"),
        ],
      },
    ],
  },
  {
    id: "type-colour",
    title: "Typography & Colour Science",
    shortTitle: "Type & Colour",
    description:
      "Type as an engineered reading system, and colour as measurable light.",
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
        title: "Colour science & models",
        items: [
          ...g("model", "Colour Models", "RGB", "HSL", "HSV", "CMYK", "Perceptual Colour Spaces", "CIE Lab"),
          ...g("concept", "Colour Gamut"),
        ],
      },
      {
        id: "colour-design",
        title: "Colour in design & accessibility",
        description: "Colour theory as used in design, plus contrast and colour-vision considerations.",
        items: [
          ...g("concept", "Colour Theory", "Colour Harmony", "Colour Psychology"),
          ...g("formula", "Colour Contrast Ratio"),
          ...g("concept", "Colour Vision Deficiency|colour-vision-differences"),
        ],
      },
    ],
  },
  {
    id: "design-systems",
    title: "Design Systems",
    shortTitle: "Systems",
    description:
      "Tokens, components, governance and the architecture of interface systems.",
    subcategories: [
      {
        id: "foundations",
        title: "System foundations",
        items: [
          ...g("concept", "Design System"),
          ...g("methodology", "Atomic Design"),
          ...g("concept", "Design Language", "Design Tokens", "Primitive Tokens", "Semantic Tokens", "Theme Architecture", "Multi-Brand Systems"),
        ],
      },
      {
        id: "scales",
        title: "Scales & visual systems",
        items: [
          ...g("concept", "Spacing Scales", "Typography Scales", "Colour Systems", "Elevation Systems", "Icon Systems", "Responsive Systems"),
        ],
      },
      {
        id: "components",
        title: "Components & patterns",
        items: [
          ...g("concept", "Component Libraries", "Component Architecture", "Variants", "Component Properties", "Component State Management"),
          ...g("pattern", "Data Tables", "Empty States", "Loading States", "Error States", "Skeleton Screens", "Progressive Loading"),
        ],
      },
      {
        id: "operations",
        title: "Governance & operations",
        items: [
          ...g("strategy", "Design Governance", "Design System Versioning", "Design QA", "Design System Audits"),
        ],
      },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility & Inclusive Design",
    shortTitle: "Accessibility",
    description:
      "Standards, techniques and the lived experience of disability in digital products.",
    subcategories: [
      {
        id: "foundations",
        title: "Foundations & disability models",
        description: "What accessibility and inclusive design are, and how disability is understood.",
        items: [
          ...g("concept", "Models of Disability", "Accessibility|accessibility-concept", "Inclusive Design"),
          ...g("framework", "Universal Design", "Inclusive Design Principles"),
          ...g("principle", "Accessibility Principles"),
        ],
      },
      {
        id: "standards",
        title: "Standards & conformance",
        items: [
          ...g("standard", "WCAG", "EN 301 549", "ISO/IEC 40500", "WAI-ARIA|aria", "Section 508", "European Accessibility Act"),
          ...g("principle", "POUR Principles|pour"),
          ...g("concept", "Success Criteria", "Conformance Levels"),
        ],
      },
      {
        id: "techniques",
        title: "Techniques & assistive technology",
        items: [
          ...g("technique", "Keyboard Accessibility", "Focus Management", "Focus Order", "Semantic HTML", "Non-Colour Indicators", "Reduced Motion", "Accessible Forms", "Accessibility Audits", "Accessible Prototyping", "Captions and Transcripts"),
          ...g("concept", "Screen Readers", "Assistive Technologies"),
        ],
      },
      {
        id: "inclusion",
        title: "Access needs, inclusive content & research",
        items: [
          ...g("concept", "Cognitive Accessibility", "Visual Accessibility", "Motor Accessibility", "Hearing Accessibility", "Inclusive Content"),
          ...g("method", "Inclusive Research"),
          ...g("concept", "Neuroinclusive Design"),
        ],
      },
    ],
  },
  {
    id: "content",
    title: "UX Writing & Content Design",
    shortTitle: "Content",
    description:
      "Words as interface: microcopy, plain language, voice and content governance.",
    subcategories: [
      {
        id: "writing",
        title: "Interface writing",
        items: [
          ...g("discipline", "UX Writing", "Content Design"),
          ...g("pattern", "Microcopy", "Error Messages", "Form Instructions", "Onboarding Copy", "Empty-State Writing"),
          ...g("principle", "Plain Language", "Tone of Voice", "Content Design Principles"),
        ],
      },
      {
        id: "systems",
        title: "Content systems, strategy & governance",
        items: [
          ...g("concept", "Content Hierarchy", "Localisation|localization", "Internationalisation|internationalization", "Conversational Writing", "Terminology Management"),
          ...g("formula", "Readability Formulas"),
          ...g("strategy", "Content Governance"),
          ...g("discipline", "Content Strategy"),
        ],
      },
    ],
  },
  {
    id: "product",
    title: "Product Design & Strategy",
    shortTitle: "Product",
    description:
      "Discovery, strategy, prioritisation and outcomes — design as a business discipline.",
    subcategories: [
      {
        id: "discovery",
        title: "Discovery",
        items: [
          ...g("method", "Product Discovery", "Market Research", "Competitive Analysis"),
          ...g("technique", "Problem Framing", "Opportunity Identification"),
          ...g("concept", "Product-Market Fit"),
          ...g("framework", "Jobs To Be Done", "Outcome-Driven Innovation", "Opportunity Solution Tree"),
          ...g("model", "Kano Model"),
        ],
      },
      {
        id: "strategy",
        title: "Strategy & definition",
        items: [
          ...g("strategy", "Product Vision", "Product Strategy", "UX Strategy", "Product Positioning"),
          ...g("framework", "Objectives and Key Results (OKRs)|okrs", "Business Model Canvas", "Value Proposition Canvas"),
        ],
      },
      {
        id: "planning",
        title: "Roadmaps & prioritisation",
        description: "Deciding what to build and in what order.",
        items: [
          ...g("strategy", "Product Roadmaps", "Prioritisation"),
          ...g("technique", "RICE Scoring|rice", "MoSCoW Prioritisation|moscow"),
        ],
      },
      {
        id: "requirements",
        title: "Requirements, stories & acceptance",
        description: "Turning decisions into buildable, testable definitions.",
        items: [
          ...g("technique", "User Story Mapping", "Feature Definition", "Product Requirements", "User Stories", "Acceptance Criteria"),
        ],
      },
      {
        id: "outcomes",
        title: "Outcomes, experimentation & operations",
        items: [
          ...g("method", "Product Experimentation"),
          ...g("concept", "Outcome Metrics", "Business Value", "User Value"),
          ...g("strategy", "Stakeholder Management", "Design Leadership"),
          ...g("metric", "North Star Metric"),
        ],
      },
    ],
  },
  {
    id: "service",
    title: "Service Design & Systems Thinking",
    shortTitle: "Service",
    description:
      "Designing across channels, organisations and time.",
    subcategories: [
      {
        id: "service-design",
        title: "Service design foundations & customer experience",
        items: [
          ...g("discipline", "Service Design"),
          ...g("concept", "Service Ecosystems", "Touchpoints", "Frontstage and Backstage", "Omnichannel Experience", "Organisational Experience"),
          ...g("discipline", "Customer Experience (CX)|customer-experience"),
        ],
      },
      {
        id: "journeys",
        title: "Journeys, blueprints & mapping",
        description: "Representing the service across time, channels and stakeholders.",
        items: [
          ...g("technique", "Customer Journey Mapping", "Experience Mapping", "Service Blueprints", "Stakeholder Maps", "Ecosystem Maps"),
        ],
      },
      {
        id: "systems",
        title: "Systems, participation & delivery",
        items: [
          ...g("theory", "Systems Thinking"),
          ...g("methodology", "Co-design"),
          ...g("technique", "Service Prototyping"),
          ...g("method", "Service Evaluation"),
        ],
      },
    ],
  },
  {
    id: "metrics",
    title: "Metrics, Formulas & Statistics",
    shortTitle: "Metrics",
    description:
      "Measurement instruments, product metrics and the statistics needed to interpret them honestly.",
    subcategories: [
      {
        id: "usability-metrics",
        title: "UX & usability metrics",
        items: [
          ...g("metric", "Task Success Rate", "Time on Task", "Error Rate", "Learnability", "Effectiveness", "Efficiency", "Satisfaction"),
          ...g("framework", "HEART Framework"),
        ],
      },
      {
        id: "instruments",
        title: "Research instruments & questionnaires",
        description: "Standardised instruments that collect perceived usability, workload and satisfaction.",
        items: [
          ...g("research-instrument", "Questionnaires", "System Usability Scale", "UMUX-LITE", "NASA-TLX", "Single Ease Question (SEQ)|single-ease-question", "SUPR-Q", "User Experience Questionnaire (UEQ)|user-experience-questionnaire"),
        ],
      },
      {
        id: "product-metrics",
        title: "Product & customer metrics",
        items: [
          ...g("metric", "Net Promoter Score", "Customer Satisfaction Score (CSAT)|csat", "Customer Effort Score (CES)|ces", "Conversion Rate", "Activation Rate", "Retention Rate", "Churn Rate", "DAU/MAU Ratio|dau-mau", "Engagement", "Feature Adoption", "Bounce Rate", "Drop-off Rate", "Funnel Conversion", "Cohort Retention"),
          ...g("framework", "AARRR Framework|aarrr"),
        ],
      },
      {
        id: "statistics",
        title: "Descriptive & inferential statistics",
        items: [
          ...g("concept", "Descriptive Statistics", "Standard Deviation", "Variance", "Confidence Intervals", "Statistical Significance", "P-value", "Correlation", "Regression", "Bayesian Reasoning"),
        ],
      },
      {
        id: "experimental-design",
        title: "Experimental design, power & effect estimation",
        description: "Planning studies that can detect real effects and estimating how large they are.",
        items: [
          ...g("concept", "Effect Size", "Statistical Power"),
          ...g("technique", "Sample Size Estimation", "Margin of Error"),
        ],
      },
      {
        id: "visual-math",
        title: "UX formulas & design calculations",
        items: [
          ...g("formula", "Aspect Ratios", "Grid Calculations"),
          ...g("technique", "Responsive Breakpoints"),
        ],
      },
    ],
  },
  {
    id: "dataviz",
    title: "Data Visualisation",
    shortTitle: "Data Viz",
    description:
      "Encoding data for perception, accuracy and decision-making.",
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
          ...g("concept", "Accessible Charts", "Exploratory Visualisation", "Interaction in Data Visualisation"),
          ...g("pattern", "Small Multiples"),
        ],
      },
      {
        id: "integrity",
        title: "Storytelling, uncertainty & integrity",
        description: "Communicating with data honestly: narrative, uncertainty and chart integrity.",
        items: [
          ...g("technique", "Data Storytelling", "Visualising Uncertainty"),
          ...g("concept", "Chart Integrity", "Explanatory Visualisation"),
        ],
      },
    ],
  },
  {
    id: "ethics",
    title: "Ethical & Responsible Design",
    shortTitle: "Ethics",
    description:
      "Persuasion versus manipulation, privacy, trust and the responsibilities of design.",
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
          ...g("concept", "Privacy-Centred Design|privacy-by-design", "Security UX", "Trust", "Consent Design", "Transparency", "User Autonomy", "Behaviour Change Design"),
          ...g("anti-pattern", "Deceptive Patterns (Dark Patterns)|deceptive-patterns"),
        ],
      },
    ],
  },
  {
    id: "emerging",
    title: "Emerging & Specialised Disciplines",
    shortTitle: "Emerging",
    description:
      "AI, spatial, conversational and domain-specific design practice.",
    subcategories: [
      {
        id: "ai",
        title: "Human-AI interaction",
        items: [
          ...g("guideline", "Human-AI Interaction Guidelines|human-ai-interaction"),
          ...g("emerging-concept", "AI UX", "Generative AI Interfaces", "Agentic AI Interfaces", "Explainable AI", "AI Transparency", "Calibrated Trust in AI|ai-trust"),
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
        title: "Specialist disciplines & domain specialisms",
        items: [
          ...g("discipline", "Automotive UX", "Healthcare UX", "Fintech UX", "Enterprise UX", "B2B SaaS UX", "Ecommerce UX", "Gaming UX", "Educational UX", "Learning Experience Design", "Cross-Cultural UX", "Computer-Supported Cooperative Work (CSCW)|cscw", "Design Futures & Speculative Design|design-futures"),
        ],
      },
    ],
  },
  {
    id: "practice",
    title: "Design Practice & Technical Literacy",
    shortTitle: "Practice",
    description:
      "How design work actually gets done, documented and built.",
    subcategories: [
      {
        id: "practice-core",
        title: "Professional practice & documentation",
        items: [
          ...g("technique", "Design Critique", "Design Documentation", "UX Portfolio", "Stakeholder Communication", "Design Collaboration", "Prototyping", "Interaction Specifications"),
          ...g("strategy", "Design-to-Development Handoff"),
        ],
      },
      {
        id: "operations",
        title: "DesignOps & delivery operations",
        description: "The systems that keep design and research work running at scale.",
        items: [
          ...g("strategy", "Design Operations|design-ops", "Research Operations", "Agile Product Workflows"),
        ],
      },
      {
        id: "technical",
        title: "Web foundations",
        items: [
          ...g("concept", "HTML for Designers", "CSS for Designers", "Responsive Development", "JavaScript for Designers", "DOM and Event Fundamentals"),
        ],
      },
      {
        id: "engineering",
        title: "Front-end architecture, performance & integration",
        description: "How interfaces are built, rendered, measured and connected to data.",
        items: [
          ...g("concept", "Web Performance for Designers"),
          ...g("discipline", "UX Engineering"),
          ...g("concept", "Browser Rendering", "Frontend Accessibility", "API Fundamentals", "Design-to-Code Workflows"),
        ],
      },
    ],
  },
];

/**
 * Alternate names. A topic with a synonym keeps one canonical slug; the other
 * names are searchable aliases, never separate taxonomy items. Decisions and
 * reasons: docs/CONTENT_AUDIT.md § Taxonomy v1.0.
 */
const ALIASES: Record<string, string[]> = {
  "conversational-ux": ["Conversation Design", "Dialogue Design"],
  "voice-user-interfaces": ["Voice Interactions", "VUI Design"],
  "colour-systems": ["Semantic Colour Systems"],
  "form-design": ["Form Architecture"],
  "ethical-design": ["Design Ethics", "Design Ethics Foundations"],
  "responsible-product-design": ["Design Responsibilities"],
  "design-futures": ["Speculative Design", "Critical Design"],
  cscw: ["Collaborative Computing", "Groupware"],
  "customer-experience": ["CX"],
  "ux-engineering": ["Design Engineering"],
  "information-design": ["Information Graphics Design"],
};
for (const d of domains) for (const s of d.subcategories) for (const i of s.items) if (ALIASES[i.slug]) i.aliases = ALIASES[i.slug];
for (const slug of Object.keys(ALIASES)) if (!domains.some((d) => d.subcategories.some((s) => s.items.some((i) => i.slug === slug)))) throw new Error(`alias target ${slug} is not a taxonomy topic`);
