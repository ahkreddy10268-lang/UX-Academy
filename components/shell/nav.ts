/** Information architecture (docs/INFORMATION_ARCHITECTURE.md, DECISION_LOG D-026). */
import type { IconName } from "./icons";

export type NavItem = { href: string; label: string; icon: IconName; match: readonly string[] };
export type NavGroup = { id: string; label: string; items: readonly NavItem[] };

export const navGroups: readonly NavGroup[] = [
  { id: "overview", label: "Overview", items: [{ href: "/", label: "Home", icon: "home", match: [] }] },
  {
    id: "learn",
    label: "Learn",
    items: [
      { href: "/learn", label: "Learn", icon: "learn", match: ["/learn"] },
      { href: "/library", label: "Knowledge Library", icon: "library", match: ["/library"] },
      { href: "/ai", label: "AI UX Patterns", icon: "ai", match: ["/ai"] },
    ],
  },
  {
    id: "experiment",
    label: "Practise",
    items: [
      { href: "/practice", label: "Practice", icon: "practice", match: ["/practice"] },
      { href: "/labs", label: "Labs", icon: "labs", match: ["/labs"] },
      { href: "/formulas", label: "Formula Lab", icon: "formula", match: ["/formulas"] },
    ],
  },
  {
    id: "reference",
    label: "Reference",
    items: [
      { href: "/system", label: "Design System", icon: "layers", match: ["/system"] },
      { href: "/sources", label: "Resources", icon: "sources", match: ["/sources"] },
      { href: "/glossary", label: "Glossary", icon: "glossary", match: ["/glossary"] },
      { href: "/compare", label: "Comparisons", icon: "compare", match: ["/compare"] },
    ],
  },
  {
    id: "explore",
    label: "Explore",
    items: [
      { href: "/topics", label: "Domains & Topics", icon: "grid", match: ["/topics"] },
      { href: "/graph", label: "Graph", icon: "graph", match: ["/graph"] },
    ],
  },
  { id: "personal", label: "Personal", items: [{ href: "/me", label: "My Learning", icon: "me", match: ["/me"] }] },
  {
    id: "more",
    label: "About",
    items: [
      { href: "/coverage", label: "Coverage", icon: "coverage", match: ["/coverage"] },
      { href: "/method", label: "Method", icon: "method", match: ["/method"] },
    ],
  },
];

export const allNavItems = navGroups.flatMap((g) => g.items);

/** Kept for the footer and any flat lists. */
export const primaryNav = navGroups.filter((g) => ["learn", "experiment", "reference", "explore"].includes(g.id)).flatMap((g) => g.items);
export const secondaryNav = navGroups.filter((g) => ["reference", "more"].includes(g.id)).flatMap((g) => g.items);

export function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  return item.match.some((m) => pathname === m || pathname.startsWith(m + "/"));
}
