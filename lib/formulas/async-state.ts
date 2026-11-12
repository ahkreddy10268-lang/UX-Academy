/**
 * Async State Lab model (D-126). Pure functions only:
 *  - the unified async state machine from the component-state-management
 *    entry (idle → loading → success{populated | empty} | error), with
 *    ignored events and preserved user input;
 *  - the loading-indicator plan for a given latency and display mode, built on
 *    Nielsen's 0.1 / 1 s limits and the delayed / minimum-visible indicator
 *    pattern taught in the loading-states entry;
 *  - the exact text a polite live region announces on each transition.
 */
import { waitFeedback, type WaitTier } from "./components";
import { FormulaInputError } from "./math";

/** ≤ 0.1 s feels instantaneous: no indicator at all (Nielsen 1993, after Miller 1968; Card et al. 1991). */
export const INSTANT_MS = 100;
/** Product choice matching the ~1 s flow limit: before this, only the control's busy state shows. */
export const SHOW_AFTER_MS = 1000;
/** Product choice: once an indicator appears it stays this long, so it never flashes. */
export const MIN_VISIBLE_MS = 400;
/** The lab's latency slider range. */
export const LATENCY_RANGE = { min: 50, max: 3000 } as const;

/* ------------------------------------------------------------------ */
/* State machine                                                        */
/* ------------------------------------------------------------------ */
export type AsyncState =
  | { status: "idle"; query: string }
  | { status: "loading"; query: string; attempt: number }
  | { status: "populated"; query: string; count: number }
  | { status: "empty"; query: string }
  | { status: "error"; query: string; message: string; attempt: number };

export type AsyncEvent =
  | { type: "FETCH"; query: string }
  | { type: "RESOLVE"; count: number }
  | { type: "REJECT"; message: string }
  | { type: "RETRY" }
  | { type: "RESET" };

export const INITIAL: AsyncState = { status: "idle", query: "" };

/**
 * The unified async machine. Events that are not allowed in a state are
 * ignored (the same object is returned), which is how double fetches and late
 * responses are prevented. The user's query is carried through every state,
 * including error, so a failure never wipes input.
 */
export function asyncTransition(state: AsyncState, event: AsyncEvent): AsyncState {
  switch (event.type) {
    case "RESET":
      return { status: "idle", query: state.query };
    case "FETCH":
      if (state.status === "loading") return state; // ignored: one request at a time
      return { status: "loading", query: event.query, attempt: 1 };
    case "RESOLVE":
      if (state.status !== "loading") return state; // ignored: late or stray response
      if (!Number.isInteger(event.count) || event.count < 0) throw new FormulaInputError("A result count must be a whole number of zero or more.");
      return event.count === 0 ? { status: "empty", query: state.query } : { status: "populated", query: state.query, count: event.count };
    case "REJECT":
      if (state.status !== "loading") return state;
      return { status: "error", query: state.query, message: event.message, attempt: state.attempt };
    case "RETRY":
      if (state.status !== "error") return state; // only a failed request can be retried
      return { status: "loading", query: state.query, attempt: state.attempt + 1 };
  }
}

/** Which events each state accepts; everything else is ignored. */
export function allowedEvents(state: AsyncState): AsyncEvent["type"][] {
  switch (state.status) {
    case "loading":
      return ["RESOLVE", "REJECT", "RESET"];
    case "error":
      return ["RETRY", "FETCH", "RESET"];
    default:
      return ["FETCH", "RESET"];
  }
}

/* ------------------------------------------------------------------ */
/* Indicator plan                                                       */
/* ------------------------------------------------------------------ */
export type IndicatorMode = "skeleton" | "spinner" | "progressive";
export type Show = "previous" | "busy" | "skeleton" | "spinner" | "progressive" | "content";
export type Segment = { from: number; to: number; show: Show };

export type IndicatorPlan = {
  latencyMs: number;
  /** Nielsen / NN/g tier for this wait (lib/formulas/components waitFeedback). */
  tier: WaitTier;
  /** "instant" ≤ 100 ms · "busy" ≤ 1000 ms · "indicator" > 1000 ms. */
  band: "instant" | "busy" | "indicator";
  /** When content is shown (later than latency only if the minimum-visible rule holds it). */
  revealMs: number;
  /** When the indicator appears, or null if it never does. */
  indicatorFromMs: number | null;
  segments: Segment[];
};

/**
 * What the person sees over time for one request.
 *  - ≤ 100 ms: content replaces the previous view directly.
 *  - ≤ 1000 ms: the previous view stays, marked busy (aria-busy, "Loading…" on the control); no indicator flashes.
 *  - > 1000 ms: the chosen indicator appears at 1000 ms and stays at least 400 ms.
 * The anti-pattern shows the indicator immediately for every request and
 * removes it the moment data arrives, which is what makes spinners thrash.
 */
export function indicatorPlan(latencyMs: number, mode: IndicatorMode, antiPattern = false): IndicatorPlan {
  if (!Number.isFinite(latencyMs) || latencyMs < 0) throw new FormulaInputError("Latency must be zero or more milliseconds.");
  const tier = waitFeedback(latencyMs / 1000);
  const band = latencyMs <= INSTANT_MS ? "instant" : latencyMs <= SHOW_AFTER_MS ? "busy" : "indicator";
  const indicator: Show = mode;
  if (antiPattern) {
    return { latencyMs, tier, band, revealMs: latencyMs, indicatorFromMs: 0, segments: [{ from: 0, to: latencyMs, show: indicator }, { from: latencyMs, to: latencyMs, show: "content" }] };
  }
  if (band === "instant") {
    return { latencyMs, tier, band, revealMs: latencyMs, indicatorFromMs: null, segments: [{ from: 0, to: latencyMs, show: "previous" }, { from: latencyMs, to: latencyMs, show: "content" }] };
  }
  if (band === "busy") {
    return { latencyMs, tier, band, revealMs: latencyMs, indicatorFromMs: null, segments: [{ from: 0, to: latencyMs, show: "busy" }, { from: latencyMs, to: latencyMs, show: "content" }] };
  }
  const revealMs = Math.max(latencyMs, SHOW_AFTER_MS + MIN_VISIBLE_MS);
  return {
    latencyMs,
    tier,
    band,
    revealMs,
    indicatorFromMs: SHOW_AFTER_MS,
    segments: [
      { from: 0, to: SHOW_AFTER_MS, show: "busy" },
      { from: SHOW_AFTER_MS, to: revealMs, show: indicator },
      { from: revealMs, to: revealMs, show: "content" },
    ],
  };
}

/** What is visible at time t (ms) after the request starts. */
export function visibleAt(plan: IndicatorPlan, t: number): Show {
  for (const s of plan.segments) if (t >= s.from && t < s.to) return s.show;
  return "content";
}

/* ------------------------------------------------------------------ */
/* Announcements                                                        */
/* ------------------------------------------------------------------ */
export type AnnounceOptions = { noun?: string; showedIndicator?: boolean; antiPattern?: boolean };

/**
 * The text a polite live region (role="status") announces when the machine
 * enters a state, or null when nothing should be said. Loading is announced
 * only when an indicator actually appears, so fast responses do not chatter.
 */
export function announcement(state: AsyncState, opts: AnnounceOptions = {}): string | null {
  const noun = opts.noun ?? "loans";
  const q = state.query.trim();
  switch (state.status) {
    case "idle":
      return null;
    case "loading":
      if (opts.antiPattern) return "Loading";
      return opts.showedIndicator ? `Loading ${noun}…` : null;
    case "populated":
      if (opts.antiPattern) return "Loaded";
      return `${state.count} ${state.count === 1 ? noun.replace(/s$/, "") : noun} shown${q ? ` for “${q}”` : ""}.`;
    case "empty":
      if (opts.antiPattern) return "Loaded";
      return q ? `No ${noun} match “${q}”. Your search is kept; try another word.` : `No ${noun} yet.`;
    case "error":
      if (opts.antiPattern) return "Error";
      return `Couldn't load ${noun}. ${q ? `Your search “${q}” is kept. ` : ""}Try again.`;
  }
}
