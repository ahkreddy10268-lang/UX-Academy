import { describe, expect, it } from "vitest";
import { emptyState, LEITNER_INTERVALS, migrate, parseImport } from "./store";

describe("learner store (pure parts)", () => {
  it("migrates partial or older shapes without losing known data", () => {
    const m = migrate({ bookmarks: { "fitts-law": { at: "2026-01-01" } }, notes: { x: { text: "hi", updatedAt: "2026-01-01" } }, unknown: 1 });
    expect(m.version).toBe(1);
    expect(m.bookmarks["fitts-law"]).toBeDefined();
    expect(m.notes.x.text).toBe("hi");
    expect(m.cards).toEqual({});
    expect((m as unknown as Record<string, unknown>).unknown).toBeUndefined();
  });
  it("returns an empty state for garbage", () => {
    expect(migrate(null)).toEqual(emptyState());
    expect(migrate("nope")).toEqual(emptyState());
  });
  it("round-trips an export and rejects foreign files", () => {
    const data = { ...emptyState(), notes: { a: { text: "note", updatedAt: "2026-11-03" } } };
    const file = JSON.stringify({ app: "ux-academy", exportedAt: "x", data });
    expect(parseImport(file).notes.a.text).toBe("note");
    expect(() => parseImport(JSON.stringify({ hello: "world" }))).toThrow();
    expect(() => parseImport("not json")).toThrow();
  });
  it("caps history length", () => {
    const history = Array.from({ length: 500 }, (_, i) => ({ slug: `s${i}`, at: "x" }));
    expect(migrate({ history }).history).toHaveLength(300);
  });
  it("uses expanding Leitner intervals", () => {
    expect(LEITNER_INTERVALS).toEqual([...LEITNER_INTERVALS].sort((a, b) => a - b));
  });
});
