/**
 * Institutional knowledge resources (spec Part 4). These are libraries,
 * standards bodies and official design systems — used as explanatory or
 * guideline sources, and as starting points for discovering primary research.
 */
import { defineSources } from "../../lib/content/define";

const site = (
  id: string,
  title: string,
  organisation: string,
  url: string,
  tier: 1 | 2 | 3 | 4,
  type: "website" | "official-documentation" | "standard",
  topics: string[],
  notes?: string,
  access: "open" | "partial" | "paywalled" | "unknown" = "open",
) => ({ id, title, organisation, url, tier, type, topics, notes, access, verification: "bibliographic" as const });

export default defineSources([
  site("ixdf-literature", "Interaction Design Foundation — Literature & Topics", "Interaction Design Foundation", "https://www.interaction-design.org/literature", 3, "website", ["UX theory", "interaction design", "HCI"], "Educational encyclopedia; parts require membership.", "partial"),
  site("uxpa-usability-bok", "Usability Body of Knowledge", "User Experience Professionals Association (UXPA)", "https://www.usabilitybok.org/", 2, "website", ["methods", "usability", "design principles"]),
  site("uxmethods-org", "UX Methods", "UX Methods", "https://uxmethods.org/", 3, "website", ["methods", "knowledge graph"]),
  site("laws-of-ux", "Laws of UX", "Jon Yablonski", "https://lawsofux.com/", 4, "website", ["UX laws", "cognitive psychology"], "Popular practitioner collection. Useful for discovery; each 'law' must be traced to its original research before use."),
  site("nngroup-articles", "Nielsen Norman Group — Articles", "Nielsen Norman Group", "https://www.nngroup.com/articles/", 3, "website", ["usability", "research methods", "heuristics", "IA"]),
  site("uxcel", "Uxcel", "Uxcel", "https://uxcel.com/", 4, "website", ["courses", "assessment"], "Supplementary learning platform; studied for interaction patterns of skill assessment.", "partial"),
  site("ideo-design-kit", "Design Kit", "IDEO.org", "https://www.designkit.org/", 3, "website", ["human-centred design", "methods"], "Availability and publication status must be re-checked before use."),
  site("govuk-service-manual", "Service Manual", "Government Digital Service (UK)", "https://www.gov.uk/service-manual", 2, "official-documentation", ["service design", "user research", "agile delivery"], "Open Government Licence v3.0."),
  site("govuk-user-research", "Service Manual — User research", "Government Digital Service (UK)", "https://www.gov.uk/service-manual/user-research", 2, "official-documentation", ["user research", "research methods", "accessibility research"]),
  site("defra-research-methods", "User research methods", "Department for Environment, Food & Rural Affairs (UK)", "https://digital.defra.gov.uk/user-research/research-methods", 2, "official-documentation", ["research methods"]),
  site("homeoffice-ucd-manual", "User-centred design manual — User research", "UK Home Office", "https://design.homeoffice.gov.uk/user-research", 2, "official-documentation", ["user research", "UCD"]),
  site("servicedesigntools", "Service Design Tools", "Service Design Tools", "https://servicedesigntools.org/", 3, "website", ["service design", "blueprints", "journey maps"]),
  site("baymard-research", "Baymard Institute — Research", "Baymard Institute", "https://baymard.com/research", 2, "website", ["ecommerce usability", "checkout", "forms"], "Large-scale usability benchmark research; most findings are behind a subscription.", "partial"),
  site("acm-dl", "ACM Digital Library", "Association for Computing Machinery", "https://dl.acm.org/", 1, "website", ["HCI research", "CHI proceedings"], "Primary publisher of CHI, UIST, CSCW proceedings.", "partial"),
  site("acm-sigchi", "ACM SIGCHI", "ACM Special Interest Group on Computer-Human Interaction", "https://sigchi.org/", 2, "website", ["HCI community", "conferences"]),
  site("hcibib", "HCI Bibliography", "HCIBIB", "https://www.hcibib.org/", 3, "website", ["HCI bibliography"], "Historical bibliography; coverage of recent work is limited."),
  site("google-research", "Google Research — Publications", "Google", "https://research.google/", 2, "website", ["HCI research", "HEART", "metrics"]),
  site("nasa-tlx-site", "NASA Task Load Index (TLX)", "NASA Ames Research Center — Human Systems Integration Division", "https://www.nasa.gov/human-systems-integration-division/nasa-task-load-index-tlx/", 1, "official-documentation", ["NASA-TLX", "workload"]),
  site("nist-hcd", "Human Factors / Human-Centered Design", "National Institute of Standards and Technology (NIST)", "https://www.nist.gov/itl/iad/human-centered-technologies/human-factors-human-centered-design", 2, "official-documentation", ["human factors", "usability standards"]),
  site("w3c-wai", "W3C Web Accessibility Initiative (WAI)", "World Wide Web Consortium (W3C)", "https://www.w3.org/WAI/", 1, "official-documentation", ["accessibility", "WCAG", "ARIA"]),
  site("w3c-aria-apg", "ARIA Authoring Practices Guide (APG)", "W3C Web Accessibility Initiative", "https://www.w3.org/WAI/ARIA/apg/", 1, "official-documentation", ["ARIA", "keyboard interaction", "widget patterns"]),
  site("inclusive-design-principles", "Inclusive Design Principles", "Swan, H., Pouncey, I., Pickering, H., Watson, L.", "https://inclusivedesignprinciples.org/", 3, "website", ["inclusive design"]),
  site("webaim", "WebAIM", "WebAIM, Institute for Disability Research, Policy & Practice, Utah State University", "https://webaim.org/", 2, "website", ["accessibility", "screen readers", "contrast"]),
  site("iso-home", "International Organization for Standardization", "ISO", "https://www.iso.org/", 1, "website", ["standards"], "Standard texts are copyrighted and sold; only public abstracts and previews are used here.", "partial"),
  site("apple-hig", "Human Interface Guidelines", "Apple", "https://developer.apple.com/design/human-interface-guidelines/", 2, "official-documentation", ["platform conventions", "target size", "accessibility", "typography"]),
  site("material-3", "Material Design 3", "Google", "https://m3.material.io/", 2, "official-documentation", ["design system", "tokens", "components", "accessibility"]),
  site("fluent-2", "Fluent 2 Design System", "Microsoft", "https://fluent2.microsoft.design/", 2, "official-documentation", ["design system", "tokens"]),
  site("carbon-design-system", "Carbon Design System", "IBM", "https://carbondesignsystem.com/", 2, "official-documentation", ["design system", "tokens", "data visualisation"]),
  site("atlassian-design", "Atlassian Design System", "Atlassian", "https://atlassian.design/", 2, "official-documentation", ["design system", "tokens"]),
  site("govuk-design-system", "GOV.UK Design System", "Government Digital Service (UK)", "https://design-system.service.gov.uk/", 2, "official-documentation", ["design system", "patterns", "accessibility", "forms"]),
  site("figma-learn", "Figma Learn", "Figma", "https://help.figma.com/", 3, "official-documentation", ["tooling", "variables", "components"]),
  site("google-pair-guidebook", "People + AI Guidebook", "Google PAIR", "https://pair.withgoogle.com/guidebook/", 2, "official-documentation", ["human-AI interaction", "trust", "explainability"]),
  site("ms-hai-guidelines", "Guidelines for Human-AI Interaction: project page", "Microsoft Research", "https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/", 2, "official-documentation", ["human-AI interaction"]),
  site("google-scholar", "Google Scholar", "Google", "https://scholar.google.com/", 4, "website", ["discovery"], "Discovery tool only; never cite as a source."),
  site("semantic-scholar", "Semantic Scholar", "Allen Institute for AI", "https://www.semanticscholar.org/", 4, "website", ["discovery"], "Discovery tool only; never cite as a source."),
  site("crossref", "Crossref", "Crossref", "https://www.crossref.org/", 4, "website", ["DOI metadata"], "Used by scripts/verify-sources.ts to verify DOIs."),
]);
