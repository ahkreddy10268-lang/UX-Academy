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
      { href: "/library", label: "Knowledge Library", icon: "library", match: ["/library", "/topics"] },
    ],
  },
  {
    id: "experiment",
    label: "Experiment",
    items: [
      { href: "/formulas", label: "Formula Lab", icon: "formula", match: ["/formulas"] },
      { href: "/labs", label: "Labs", icon: "labs", match: ["/labs"] },
      { href: "/practice", label: "Practice", icon: "practice", match: ["/practice"] },
    ],
  },
  {
    id: "explore",
    label: "Explore",
    items: [
      { href: "/graph", label: "Graph", icon: "graph", match: ["/graph"] },
      { href: "/glossary", label: "Glossary", icon: "glossary", match: ["/glossary"] },
    ],
  },
  { id: "personal", label: "Personal", items: [{ href: "/me", label: "My Learning", icon: "me", match: ["/me"] }] },
  {
    id: "more",
    label: "More",
    items: [
      { href: "/compare", label: "Comparisons", icon: "compare", match: ["/compare"] },
      { href: "/sources", label: "Sources", icon: "sources", match: ["/sources"] },
      { href: "/coverage", label: "Coverage", icon: "coverage", match: ["/coverage"] },
      { href: "/method", label: "Method", icon: "method", match: ["/method"] },
    ],
  },
];

export const allNavItems = navGroups.flatMap((g) => g.items);

/** Kept for the footer and any flat lists. */
export const primaryNav = navGroups.filter((g) => ["learn", "experiment", "explore"].includes(g.id)).flatMap((g) => g.items);
export const secondaryNav = navGroups.find((g) => g.id === "more")!.items;

export function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  return item.match.some((m) => pathname === m || pathname.startsWith(m + "/"));
}
