/** HCI entry, path and method-selector integrity (beyond the generic content gates). */
import { describe, expect, it } from "vitest";
import { HCI_METHOD_QUESTIONS } from "../components/illustrations/interactive/hci-method-explorer";
import { entryBySlug, learningPaths, taxonomyBySlug } from "../lib/content";

const hci = entryBySlug.get("human-computer-interaction")!;

describe("human-computer-interaction", () => {
  it("keeps its canonical identity and classification", () => {
    expect(hci.slug).toBe("human-computer-interaction");
    expect(hci.primaryType).toBe("discipline");
    expect(hci.domain).toBe("foundations");
    expect(hci.subcategory).toBe("core-concepts");
    expect(taxonomyBySlug.get("human-computer-interaction")?.domain).toBe("foundations");
  });
  it("is the only HCI discipline entry and has no prerequisite (the path teaches it first)", () => {
    expect([...entryBySlug.values()].filter((e) => /human-computer interaction/i.test(e.title)).length).toBe(1);
    expect(hci.prerequisites).toEqual([]);
  });
  it("is published and is not classed as an experiment-based or theoretical model", () => {
    expect(hci.status).toBe("published");
    expect(["professional-guideline", "peer-reviewed"]).toContain(hci.evidence);
  });
  it("has level-matched practice at all three levels", () => {
    for (const l of ["beginner", "intermediate", "advanced"] as const) {
      expect(hci.quiz.some((q) => q.level === l), `quiz ${l}`).toBe(true);
      expect(hci.exercises.some((x) => x.level === l), `exercise ${l}`).toBe(true);
    }
  });
  it("explains every relation", () => {
    for (const r of hci.relations) expect(r.note.length, r.target).toBeGreaterThanOrEqual(30);
  });
});

describe("hci-fundamentals path", () => {
  const path = learningPaths.find((p) => p.id === "hci-fundamentals")!;
  it("keeps its id, starts with HCI and needs no prerequisite", () => {
    expect(path.stages[0].steps[0]).toBe("human-computer-interaction");
    expect(path.prerequisites).toEqual(["None"]);
  });
  it("introduces HCI before usability and never repeats a step", () => {
    const steps = path.stages.flatMap((s) => s.steps);
    expect(new Set(steps).size).toBe(steps.length);
    expect(steps.indexOf("human-computer-interaction")).toBeLessThan(steps.indexOf("usability"));
  });
  it("moves from beginner to advanced", () => {
    const rank = { beginner: 0, intermediate: 1, advanced: 2 };
    const levels = path.stages.map((s) => rank[s.level]);
    expect([...levels].sort()).toEqual(levels);
  });
});

describe("HCI method selector", () => {
  const refs = new Set(hci.references.map((r) => r.source));
  it("rests only on sources the entry cites", () => {
    for (const q of HCI_METHOD_QUESTIONS) for (const s of q.sources) expect(refs.has(s), `${q.id} → ${s}`).toBe(true);
  });
  it("gives every method its evidence, limits and a complementary method", () => {
    for (const q of HCI_METHOD_QUESTIONS) for (const k of ["fits", "evidence", "limits", "pair"] as const) expect(q[k].length, `${q.id}.${k}`).toBeGreaterThan(20);
  });
});
