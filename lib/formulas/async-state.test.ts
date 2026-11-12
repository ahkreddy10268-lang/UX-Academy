import { describe, expect, it } from "vitest";
import {
  INITIAL,
  INSTANT_MS,
  MIN_VISIBLE_MS,
  SHOW_AFTER_MS,
  allowedEvents,
  announcement,
  asyncTransition,
  indicatorPlan,
  visibleAt,
  type AsyncState,
} from "./async-state";
import { FormulaInputError } from "./math";

describe("asyncTransition", () => {
  const loading = asyncTransition(INITIAL, { type: "FETCH", query: "eliot" });

  it("idle → loading carries the query", () => {
    expect(loading).toEqual({ status: "loading", query: "eliot", attempt: 1 });
  });
  it("loading → populated or empty depending on the count", () => {
    expect(asyncTransition(loading, { type: "RESOLVE", count: 3 })).toEqual({ status: "populated", query: "eliot", count: 3 });
    expect(asyncTransition(loading, { type: "RESOLVE", count: 0 })).toEqual({ status: "empty", query: "eliot" });
  });
  it("loading → error keeps the query (input is never wiped)", () => {
    const err = asyncTransition(loading, { type: "REJECT", message: "timeout" });
    expect(err).toEqual({ status: "error", query: "eliot", message: "timeout", attempt: 1 });
  });
  it("retry goes back to loading and counts attempts", () => {
    const err = asyncTransition(loading, { type: "REJECT", message: "timeout" });
    expect(asyncTransition(err, { type: "RETRY" })).toEqual({ status: "loading", query: "eliot", attempt: 2 });
  });
  it("ignores a second FETCH while loading (no double requests)", () => {
    expect(asyncTransition(loading, { type: "FETCH", query: "other" })).toBe(loading);
  });
  it("ignores late RESOLVE/REJECT outside loading, and RETRY outside error", () => {
    const done: AsyncState = { status: "populated", query: "eliot", count: 3 };
    expect(asyncTransition(done, { type: "RESOLVE", count: 9 })).toBe(done);
    expect(asyncTransition(done, { type: "REJECT", message: "x" })).toBe(done);
    expect(asyncTransition(done, { type: "RETRY" })).toBe(done);
  });
  it("error is never shown as empty", () => {
    const err = asyncTransition(loading, { type: "REJECT", message: "timeout" });
    expect(err.status).not.toBe("empty");
  });
  it("reset returns to idle and keeps the query", () => {
    expect(asyncTransition(loading, { type: "RESET" })).toEqual({ status: "idle", query: "eliot" });
  });
  it("rejects invalid counts", () => {
    expect(() => asyncTransition(loading, { type: "RESOLVE", count: -1 })).toThrow(FormulaInputError);
  });
  it("lists allowed events per state", () => {
    expect(allowedEvents(loading)).toEqual(["RESOLVE", "REJECT", "RESET"]);
    expect(allowedEvents({ status: "error", query: "", message: "", attempt: 1 })).toContain("RETRY");
  });
});

describe("indicatorPlan", () => {
  it("≤ 100 ms: no indicator, content replaces the previous view", () => {
    const p = indicatorPlan(80, "skeleton");
    expect(p.band).toBe("instant");
    expect(p.indicatorFromMs).toBeNull();
    expect(p.tier).toBe("none");
    expect(visibleAt(p, 40)).toBe("previous");
    expect(visibleAt(p, 80)).toBe("content");
  });
  it("100–1000 ms: busy state only, no flash", () => {
    const p = indicatorPlan(600, "spinner");
    expect(p.band).toBe("busy");
    expect(p.indicatorFromMs).toBeNull();
    expect(p.tier).toBe("state-only");
    expect(visibleAt(p, 300)).toBe("busy");
  });
  it("> 1000 ms: indicator from 1000 ms, visible at least 400 ms", () => {
    const p = indicatorPlan(1100, "skeleton");
    expect(p.band).toBe("indicator");
    expect(p.indicatorFromMs).toBe(SHOW_AFTER_MS);
    expect(p.revealMs).toBe(SHOW_AFTER_MS + MIN_VISIBLE_MS);
    expect(visibleAt(p, 1050)).toBe("skeleton");
    expect(visibleAt(p, 1450)).toBe("content");
  });
  it("long waits reveal exactly at the latency and use the NN/g tier", () => {
    const p = indicatorPlan(2500, "progressive");
    expect(p.revealMs).toBe(2500);
    expect(p.tier).toBe("looped");
    expect(visibleAt(p, 2000)).toBe("progressive");
  });
  it("boundaries: 100 ms is instant, 1000 ms is busy", () => {
    expect(indicatorPlan(INSTANT_MS, "spinner").band).toBe("instant");
    expect(indicatorPlan(SHOW_AFTER_MS, "spinner").band).toBe("busy");
  });
  it("anti-pattern shows the indicator from 0 ms for every request", () => {
    const p = indicatorPlan(150, "spinner", true);
    expect(p.indicatorFromMs).toBe(0);
    expect(visibleAt(p, 10)).toBe("spinner");
  });
  it("rejects negative latency", () => {
    expect(() => indicatorPlan(-1, "spinner")).toThrow(FormulaInputError);
  });
});

describe("announcement", () => {
  it("announces loading only when an indicator appeared", () => {
    const s: AsyncState = { status: "loading", query: "", attempt: 1 };
    expect(announcement(s)).toBeNull();
    expect(announcement(s, { showedIndicator: true })).toBe("Loading loans…");
  });
  it("announces counts, empty results and errors with the kept query", () => {
    expect(announcement({ status: "populated", query: "eliot", count: 3 })).toBe("3 loans shown for “eliot”.");
    expect(announcement({ status: "populated", query: "", count: 1 })).toBe("1 loan shown.");
    expect(announcement({ status: "empty", query: "zz" })).toBe("No loans match “zz”. Your search is kept; try another word.");
    expect(announcement({ status: "error", query: "eliot", message: "x", attempt: 1 })).toBe("Couldn't load loans. Your search “eliot” is kept. Try again.");
  });
  it("anti-pattern announcements are vague", () => {
    expect(announcement({ status: "error", query: "eliot", message: "x", attempt: 1 }, { antiPattern: true })).toBe("Error");
  });
});
