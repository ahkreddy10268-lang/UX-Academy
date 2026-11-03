/**
 * Retrospective evaluation models (Kahneman, Fredrickson, Schreiber & Redelmeier 1993;
 * Redelmeier & Kahneman 1996). The peak-end average is a descriptive regularity of
 * remembered ratings, not a precise predictor for any individual.
 */
import { FormulaInputError, assertFinite } from "./math";

export function peakEnd(moments: number[], mode: "max" | "min" = "max") {
  if (moments.length < 2) throw new FormulaInputError("Enter at least two moments.");
  moments.forEach((m, i) => assertFinite(m, `Moment ${i + 1}`));
  const peakValue = mode === "max" ? Math.max(...moments) : Math.min(...moments);
  const peakIndex = moments.indexOf(peakValue);
  const end = moments[moments.length - 1];
  const mean = moments.reduce((s, m) => s + m, 0) / moments.length;
  return { peakIndex, peakValue, end, peakEndAverage: (peakValue + end) / 2, mean, total: mean * moments.length };
}

/** Chunk a string of symbols into groups of `size` (chunking illustration for Miller/Cowan). */
export function chunk(symbols: string, size: number): string[] {
  if (!Number.isInteger(size) || size < 1) throw new FormulaInputError("Chunk size must be a whole number of at least 1.");
  const clean = symbols.replace(/\s+/g, "");
  const out: string[] = [];
  for (let i = 0; i < clean.length; i += size) out.push(clean.slice(i, i + size));
  return out;
}
