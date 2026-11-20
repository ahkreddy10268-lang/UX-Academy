/**
 * The `direct-manipulation` entry teaches one pure `move` operation shared by
 * drag, buttons and keyboard, plus the status text announced after a move.
 * These tests compile and run that snippet exactly as it is rendered (not a
 * copy), so the code readers see is the code that is checked.
 */
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { entryBySlug } from "../lib/content";

type Helpers = { move: <T>(items: readonly T[], from: number, to: number) => T[]; moveMessage: (label: string, to: number, total: number) => string };

function loadSnippet(): Helpers {
  const example = entryBySlug.get("direct-manipulation")?.practice?.examples.find((x) => x.code.includes("function move<T>"));
  if (!example) throw new Error("direct-manipulation worked example with move() not found");
  const js = ts.transpileModule(example.code, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
  return new Function(`${js}\nreturn { move, moveMessage };`)() as Helpers;
}

describe("direct-manipulation worked example: one move operation", () => {
  const { move, moveMessage } = loadSnippet();
  const list = ["A", "B", "C", "D", "E"] as const;

  it("moves an item up, down, to the ends and onto itself", () => {
    expect(move(list, 1, 0)).toEqual(["B", "A", "C", "D", "E"]); // move up
    expect(move(list, 1, 2)).toEqual(["A", "C", "B", "D", "E"]); // move down
    expect(move(list, 4, 0)).toEqual(["E", "A", "B", "C", "D"]);
    expect(move(list, 0, 4)).toEqual(["B", "C", "D", "E", "A"]);
    expect(move(list, 2, 2)).toEqual([...list]);
  });

  it("does not mutate the original, so the previous array can serve Undo", () => {
    const before = ["A", "B", "C"];
    const after = move(before, 0, 2);
    expect(before).toEqual(["A", "B", "C"]);
    expect(after).not.toBe(before);
    expect(move(after, 2, 0)).toEqual(before); // the inverse move restores the order
  });

  it("clamps a target beyond either end, as a drag past the list's edge would", () => {
    expect(move(list, 2, -3)).toEqual(["C", "A", "B", "D", "E"]);
    expect(move(list, 2, 99)).toEqual(["A", "B", "D", "E", "C"]);
  });

  it("keeps every item exactly once", () => {
    for (let from = 0; from < list.length; from++)
      for (let to = 0; to < list.length; to++) expect([...move(list, from, to)].sort()).toEqual([...list]);
  });

  it("rejects an invalid source or a fractional target", () => {
    expect(() => move(list, -1, 0)).toThrow(RangeError);
    expect(() => move(list, 5, 0)).toThrow(RangeError);
    expect(() => move(list, 1.5, 0)).toThrow(RangeError);
    expect(() => move(list, 0, 0.5)).toThrow(RangeError);
    expect(() => move([], 0, 0)).toThrow(RangeError);
  });

  it("announces the new position counted from 1", () => {
    expect(moveMessage("Report", 1, 5)).toBe("Report moved to position 2 of 5.");
    expect(moveMessage("Report", 0, 5)).toBe("Report moved to position 1 of 5.");
  });
});
