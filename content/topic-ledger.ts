/**
 * Research ledger: taxonomy topics that have no entry file yet but are being
 * researched. This is the only place a topic can be "Research pending/completed"
 * without an entry; every other status is derived from the content itself
 * (entry.status, taxonomy coveredBy). Remove a row when the entry file lands.
 *
 * Add a topic only when sources have actually been gathered — a queue of
 * intentions is the roadmap (docs/CONTENT_AUDIT.md), not this ledger.
 */
import type { ContentStatus } from "../lib/content/schema";

export const researchLedger: Record<string, { status: Extract<ContentStatus, "research-pending" | "research-completed">; since: string; note: string }> = {
  // Cycle 1, Batch 1 — Interaction feedback & state (D-129). Sources verified 2026-11-12 (content/sources/interaction-principles.ts + registry).
  constraints: { status: "research-completed", since: "2026-11-12", note: "Norman 1988/2013 (physical, cultural, semantic, logical; forcing functions); Norman 1983 design rules from slips. Boundary: error-prevention applies constraints." },
  "direct-manipulation": { status: "research-completed", since: "2026-11-12", note: "Shneiderman 1983; Hutchins, Hollan & Norman 1985; Frohlich 1993 (limits); Shneiderman & Maes 1997 (debate, metadata only)." },
  "interaction-states": { status: "research-completed", since: "2026-11-12", note: "W3C Selectors 4 user-action pseudo-classes (draft); WAI-ARIA 1.2 states; WCAG 2.2 SC 1.4.11, 2.4.7, 4.1.2; Material 3 states. Boundary: component-state-management owns modelling and ownership." },
  discoverability: { status: "research-completed", since: "2026-11-12", note: "Norman 2013 (discoverability and understanding); Pernice & Budiu 2016 hidden-navigation study (n = 179) and follow-up; Grossman et al. 2009 learnability survey." },
};
