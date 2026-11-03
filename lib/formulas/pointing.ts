/** Interaction models: Fitts's law, Hick-Hyman law, steering law, Keystroke-Level Model. */
import { FormulaInputError, assertFinite, assertNonNegative, assertPositive, log2 } from "./math";

/* ---------------- Fitts's law ---------------- */

export type FittsFormulation = "shannon" | "original" | "welford";

export function fittsId(distance: number, width: number, formulation: FittsFormulation = "shannon"): number {
  assertPositive(distance, "Distance D");
  assertPositive(width, "Width W");
  switch (formulation) {
    case "shannon":
      return log2(distance / width + 1);
    case "original":
      return log2((2 * distance) / width);
    case "welford":
      return log2(distance / width + 0.5);
  }
}

export function fittsMovementTime(id: number, a: number, b: number): number {
  assertFinite(a, "Intercept a");
  assertFinite(b, "Slope b");
  return a + b * id;
}

/** Effective width from the standard deviation of endpoint coordinates (Crossman/Welford; Soukoreff & MacKenzie 2004). */
export function effectiveWidth(sdEndpoints: number): number {
  assertPositive(sdEndpoints, "Standard deviation of endpoints");
  return 4.133 * sdEndpoints;
}

export function throughput(idEffective: number, movementTimeSeconds: number): number {
  assertPositive(movementTimeSeconds, "Movement time");
  return idEffective / movementTimeSeconds;
}

/**
 * Width of a rectangular target measured along the approach direction — the
 * "W′" model for two-dimensional targets compared by MacKenzie & Buxton (1992):
 * the length of the line through the target centre at the approach angle,
 * clipped by the rectangle. 0° = approaching horizontally (width counts),
 * 90° = vertically (height counts).
 */
export function widthAlongApproach(width: number, height: number, angleDeg: number): number {
  assertPositive(width, "Width W");
  assertPositive(height, "Height H");
  assertFinite(angleDeg, "Approach angle");
  const t = (angleDeg * Math.PI) / 180;
  const c = Math.abs(Math.cos(t));
  const s = Math.abs(Math.sin(t));
  const along = Math.min(c > 1e-12 ? width / c : Infinity, s > 1e-12 ? height / s : Infinity);
  return along;
}

/* ---------------- Hick-Hyman law ---------------- */

/** Information (bits) in a choice among n equally likely alternatives. Hick's variant adds 1 for the "no signal" possibility. */
export function hickInformationEqual(n: number, variant: "hyman" | "hick" = "hyman"): number {
  assertPositive(n, "Number of alternatives n");
  if (!Number.isInteger(n)) throw new FormulaInputError("Number of alternatives must be a whole number.");
  return variant === "hick" ? log2(n + 1) : log2(n);
}

/** Shannon entropy H = Σ pᵢ log₂(1/pᵢ) of a probability distribution (probabilities are normalised). */
export function hickInformation(probabilities: number[]): { H: number; normalised: number[] } {
  if (probabilities.length < 1) throw new FormulaInputError("Enter at least one probability.");
  probabilities.forEach((p, i) => assertNonNegative(p, `Probability ${i + 1}`));
  const total = probabilities.reduce((s, p) => s + p, 0);
  if (total <= 0) throw new FormulaInputError("Probabilities must not all be zero.");
  const normalised = probabilities.map((p) => p / total);
  const H = normalised.reduce((s, p) => (p > 0 ? s + p * log2(1 / p) : s), 0);
  return { H, normalised };
}

export function hickReactionTime(H: number, a: number, b: number): number {
  assertFinite(a, "Intercept a");
  assertFinite(b, "Slope b");
  return a + b * H;
}

/* ---------------- Steering law ---------------- */

/** Index of difficulty for a path made of straight segments: Σ Lᵢ / Wᵢ (Accot & Zhai 1997). */
export function steeringId(segments: { length: number; width: number }[]): number {
  if (!segments.length) throw new FormulaInputError("Add at least one path segment.");
  return segments.reduce((s, seg, i) => {
    assertPositive(seg.length, `Segment ${i + 1} length`);
    assertPositive(seg.width, `Segment ${i + 1} width`);
    return s + seg.length / seg.width;
  }, 0);
}

/* ---------------- Keystroke-Level Model ---------------- */

/** Operator times in seconds from Card, Moran & Newell (1980); B from later KLM practice. */
export const KLM_OPERATORS = {
  K: { name: "Keystroke or button press", seconds: 0.28 },
  P: { name: "Point with a mouse to a target", seconds: 1.1 },
  B: { name: "Mouse button press or release", seconds: 0.1 },
  H: { name: "Home hands between keyboard and mouse", seconds: 0.4 },
  M: { name: "Mentally prepare", seconds: 1.35 },
} as const;

export const KLM_TYPIST_RATES = [
  { label: "Best typist (135 wpm)", seconds: 0.08 },
  { label: "Good typist (90 wpm)", seconds: 0.12 },
  { label: "Average skilled typist (55 wpm)", seconds: 0.2 },
  { label: "Average non-secretary typist (40 wpm)", seconds: 0.28 },
  { label: "Typing random letters", seconds: 0.5 },
  { label: "Typing complex codes", seconds: 0.75 },
  { label: "Worst typist (unfamiliar with keyboard)", seconds: 1.2 },
] as const;

export type KlmStep = { op: "K" | "P" | "B" | "H" | "M" | "R"; seconds: number; count: number };

/**
 * Parse a KLM sequence such as "M P BB H 5K R(0.5)".
 * A leading integer repeats an operator (5K = five keystrokes). R(t) is system response time in seconds.
 */
export function parseKlm(sequence: string, keystrokeSeconds: number = KLM_OPERATORS.K.seconds): KlmStep[] {
  assertPositive(keystrokeSeconds, "Keystroke time");
  const src = sequence.toUpperCase().replace(/\s+/g, "");
  if (!src) throw new FormulaInputError("Enter a sequence of operators, e.g. M P B B H M 4K.");
  const re = /(\d*)(R\((\d+(?:\.\d+)?)\)|[KPBHM])/gy;
  const steps: KlmStep[] = [];
  let m: RegExpExecArray | null;
  let consumed = 0;
  while ((m = re.exec(src))) {
    consumed = re.lastIndex;
    const count = m[1] ? Number(m[1]) : 1;
    if (m[2].startsWith("R")) {
      steps.push({ op: "R", seconds: Number(m[3]), count });
    } else {
      const op = m[2] as "K" | "P" | "B" | "H" | "M";
      steps.push({ op, seconds: op === "K" ? keystrokeSeconds : KLM_OPERATORS[op].seconds, count });
    }
  }
  if (consumed !== src.length)
    throw new FormulaInputError(`Could not read "${src.slice(consumed, consumed + 6)}". Use K, P, B, H, M or R(seconds).`);
  return steps;
}

export function klmTotal(steps: KlmStep[]): { total: number; byOperator: Record<string, number> } {
  const byOperator: Record<string, number> = {};
  let total = 0;
  for (const s of steps) {
    const t = s.seconds * s.count;
    total += t;
    byOperator[s.op] = (byOperator[s.op] ?? 0) + t;
  }
  return { total, byOperator };
}
