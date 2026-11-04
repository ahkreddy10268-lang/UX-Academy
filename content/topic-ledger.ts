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

export const researchLedger: Record<string, { status: Extract<ContentStatus, "research-pending" | "research-completed">; since: string; note: string }> = {};
