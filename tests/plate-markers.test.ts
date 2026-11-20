/** Numbered plate markers stay wholly inside the 400 × 300 viewBox (docs/VISUAL_QA.md, TD-1). */
import { describe, expect, it } from "vitest";
import { H, MARKER_EDGE, W, insidePlate } from "../components/illustrations/illustration-types";

const R = 11 + 1.5 / 2; // marker radius plus half its stroke

describe("plate marker placement", () => {
  it("keeps the whole marker inside the viewBox at every edge and corner", () => {
    for (const [x, y] of [[0, 0], [8, 8], [W - 8, 10], [W, H], [-20, H + 20], [W / 2, 8]]) {
      const [cx, cy] = insidePlate(x, y);
      expect(cx - R).toBeGreaterThanOrEqual(0);
      expect(cy - R).toBeGreaterThanOrEqual(0);
      expect(cx + R).toBeLessThanOrEqual(W);
      expect(cy + R).toBeLessThanOrEqual(H);
    }
  });
  it("leaves markers that already fit exactly where they were", () => {
    for (const p of [[MARKER_EDGE, MARKER_EDGE], [200, 150], [W - MARKER_EDGE, H - MARKER_EDGE]] as const) expect(insidePlate(p[0], p[1])).toEqual([p[0], p[1]]);
  });
});
