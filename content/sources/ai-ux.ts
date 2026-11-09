/**
 * Sources for the AI UX pattern library (/ai, D-098). Reused from elsewhere:
 * amershi-et-al-2019 (hci-history.ts, DOI-verified), google-pair-guidebook and
 * ms-hai-guidelines (resources.ts).
 */
import { defineSources } from "../../lib/content/define";

export default defineSources([
  {
    id: "hax-toolkit-guidelines",
    title: "HAX Toolkit: Guidelines for Human-AI Interaction",
    authors: [],
    organisation: "Microsoft",
    url: "https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/",
    type: "official-documentation",
    tier: 2,
    topics: ["human-AI interaction", "guidelines"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-09",
    notes:
      "Read 2026-11-09. Presents the 18 Guidelines for Human-AI Interaction from the 2019 CHI paper (Amershi et al.), grouped by when they apply: initially, during interaction, when wrong and over time, with a design library and workbook.",
  },
  {
    id: "apple-hig-generative-ai",
    title: "Human Interface Guidelines: Generative AI",
    authors: [],
    organisation: "Apple",
    url: "https://developer.apple.com/design/human-interface-guidelines/generative-ai",
    type: "official-documentation",
    tier: 2,
    topics: ["generative AI", "transparency", "privacy", "outputs", "latency"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-09",
    notes:
      "Read 2026-11-09 (Markdown version). Sections: best practices (keep people in control, non-AI fallback), transparency (communicate where AI is used, set expectations), privacy, inputs (guide people, hallucinations, ask permission before irreversible tasks), outputs (refine or revert, help when blocked, latency, specific feedback during generation, alternate versions) and continuous improvement (feedback).",
  },
  {
    id: "carbon-for-ai",
    title: "Carbon for AI",
    authors: [],
    organisation: "IBM",
    url: "https://carbondesignsystem.com/guidelines/carbon-for-ai/",
    type: "official-documentation",
    tier: 2,
    topics: ["AI label", "explainability", "transparency"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-09",
    notes:
      "Read 2026-11-09. Mark every instance of AI with the AI label; provide transparency at each level of the experience; integrate explainability into the workflow and show it when needed or requested; do not use AI styling as decoration; the AI label is the path to explainability.",
  },
  {
    id: "cloudscape-genai-loading",
    title: "Generative AI loading states",
    authors: [],
    organisation: "Amazon Web Services (Cloudscape Design System)",
    year: 2024,
    url: "https://cloudscape.design/patterns/genai/genai-loading-states/",
    type: "official-documentation",
    tier: 2,
    topics: ["loading states", "streaming", "latency"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-09",
    notes:
      "Published 28 June 2024; read 2026-11-09. Distinguishes a processing stage (no output yet) from a generation stage; pairs loading indicators with visible loading text for accessibility; describes streaming as incremental output during generation, available only for models that support it.",
  },
  {
    id: "cloudscape-genai-follow-up",
    title: "Follow-up questions",
    authors: [],
    organisation: "Amazon Web Services (Cloudscape Design System)",
    year: 2025,
    url: "https://cloudscape.design/patterns/genai/follow-up-questions/",
    type: "official-documentation",
    tier: 2,
    topics: ["follow-up questions", "clarifying intent", "prompt suggestions"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-09",
    notes:
      "Published 16 July 2025; read 2026-11-09. Gather context before output for high-impact decisions or low confidence, otherwise respond first and refine; let people proceed, skip or exit; keep the open prompt available; suggested follow-ups as a constrained set (up to five) after a broad response.",
  },
  {
    id: "ax-patterns",
    title: "AX Patterns: AI interaction patterns, explained simply",
    authors: [],
    organisation: "AX Patterns",
    url: "https://axpatterns.design/",
    type: "website",
    tier: 3,
    topics: ["AI interaction patterns", "moments"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-09",
    notes:
      "Read 2026-11-09. A free library of AI interaction patterns with live demos, organised by seven moments in an AI conversation (discover, ask, wait, read, refine, trust, delegate) and built on PAIR, HAX, Cloudscape, Carbon for AI, Apple HIG and NN/g. UX Academy borrows only the seven-moment organisation, credited; its pattern texts and demos are original.",
  },
]);
