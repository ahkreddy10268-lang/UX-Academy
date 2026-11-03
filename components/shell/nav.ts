/** Primary information architecture (see docs/INFORMATION_ARCHITECTURE.md). */
export const primaryNav = [
  { href: "/learn", label: "Learn", match: ["/learn"] },
  { href: "/library", label: "Library", match: ["/library", "/topics"] },
  { href: "/formulas", label: "Formula Lab", match: ["/formulas"] },
  { href: "/labs", label: "Labs", match: ["/labs"] },
  { href: "/practice", label: "Practice", match: ["/practice"] },
  { href: "/graph", label: "Graph", match: ["/graph"] },
  { href: "/glossary", label: "Glossary", match: ["/glossary"] },
] as const;

export const secondaryNav = [
  { href: "/compare", label: "Comparisons" },
  { href: "/sources", label: "Source registry" },
  { href: "/coverage", label: "Coverage" },
  { href: "/method", label: "Method & evidence" },
] as const;
