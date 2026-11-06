/**
 * Design-system sources added for the `design-system` entry (session 22).
 * Reused records live elsewhere: govuk-design-system, carbon-design-system,
 * material-3, fluent-2 (resources.ts); frost-2016 (comparisons-workshops.ts);
 * dtcg-format-2025 (accessibility-visual.ts).
 */
import { defineSources } from "../../lib/content/define";

export default defineSources([
  {
    id: "uswds",
    title: "U.S. Web Design System (USWDS)",
    authors: [],
    organisation: "General Services Administration, Technology Transformation Services (US)",
    url: "https://designsystem.digital.gov/",
    type: "official-documentation",
    tier: 2,
    topics: ["design system", "design tokens", "maturity model", "public sector"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-06",
    notes:
      "Read 2026-11-06: About (created in 2015 by 18F and the U.S. Digital Service; maintained by GSA's Digital Services Division), Design tokens (limited sets of discrete values, used through functions, mixins and utility classes) and the maturity model (incremental adoption from principles, through guidance, to code; 'Consistency is not necessarily conformity').",
  },
  {
    id: "adobe-spectrum",
    title: "Spectrum: introduction",
    authors: [],
    organisation: "Adobe",
    url: "https://spectrum.adobe.com/getting-started/introduction",
    type: "official-documentation",
    tier: 2,
    topics: ["design system", "cross-platform", "design language evolution"],
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-06",
    notes:
      "Read 2026-11-06. Describes Spectrum as a shared foundation across products and platforms that must stay flexible for the distinct needs of Adobe's products; Spectrum 2 introduces new foundations (colour, typography, layout, icons, states) and components, beginning on the web and continuing to native mobile and desktop.",
  },
  {
    id: "semver-2",
    title: "Semantic Versioning 2.0.0",
    authors: ["Preston-Werner, T."],
    url: "https://semver.org/",
    type: "website",
    tier: 2,
    topics: ["versioning", "releases", "public API"],
    licence: "CC BY 3.0",
    access: "open",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-06",
    notes:
      "Specification read 2026-11-06: MAJOR for incompatible API changes, MINOR for backward-compatible functionality, PATCH for backward-compatible fixes; software using it must declare a public API. A community specification, not a standards-body standard; no publication year is stated on the page.",
  },
  {
    id: "kholmatova-2017",
    title: "Design Systems: A Practical Guide to Creating Design Languages for Digital Products",
    authors: ["Kholmatova, A."],
    publisher: "Smashing Magazine (Smashing Media AG)",
    year: 2017,
    isbn: "978-3-945749-58-6",
    url: "https://www.smashingmagazine.com/printed-books/design-systems/",
    type: "book",
    tier: 2,
    topics: ["design systems", "design language", "patterns", "pattern libraries"],
    access: "paywalled",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-06",
    notes:
      "Publisher page read 2026-11-06: September 2017, 288 pages, ISBN 978-3-945749-58-6; written from the author's practice as an interaction and visual designer, aimed mainly at small and medium-sized product teams; part one on patterns and practices, part two on planning, interface inventory, pattern libraries and evolving and maintaining patterns. The full text was not read here, so the book is cited only for that scope.",
  },
  {
    id: "curtis-2009",
    title: "Modular Web Design: Creating Reusable Components for User Experience Design and Documentation",
    authors: ["Curtis, N."],
    publisher: "New Riders (Voices That Matter)",
    year: 2009,
    isbn: "978-0-321-60135-3",
    url: "https://www.peachpit.com/store/modular-web-design-creating-reusable-components-for-9780321601353",
    type: "book",
    tier: 3,
    topics: ["reusable components", "component libraries", "UX documentation"],
    access: "paywalled",
    verification: "url-checked",
    lastVerifiedAt: "2026-11-06",
    notes:
      "Publisher page read 2026-11-06: first edition, published 24 June 2009, copyright 2010, 360 pages, ISBN-13 978-0-321-60135-3; out of print. Often cited as 2010 because of the copyright date. The full text was not read here, so it is cited only for its scope: reusable components in UX design and documentation.",
  },
]);
