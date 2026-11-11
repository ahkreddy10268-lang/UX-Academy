/**
 * Component variant arithmetic for the variants and component-properties
 * lessons. Pure functions only.
 */
import { FormulaInputError } from "./math";

/** Number of combinations of independent variant dimensions: the product of their value counts. */
export function variantCount(valueCounts: number[]): number {
  if (valueCounts.length === 0) throw new FormulaInputError("Enter at least one dimension.");
  for (const n of valueCounts) {
    if (!Number.isInteger(n) || n < 1) throw new FormulaInputError("Each dimension needs a whole number of values (at least 1).");
  }
  return valueCounts.reduce((a, b) => a * b, 1);
}

/**
 * Independent boolean flags vs one enum for mutually exclusive options.
 * n booleans allow 2^n combinations, of which only n + 1 (none or exactly one
 * true) are meaningful when the options exclude each other; an enum of the
 * same options (plus a default) allows exactly n + 1.
 */
export function booleanVsEnum(flags: number) {
  if (!Number.isInteger(flags) || flags < 1) throw new FormulaInputError("Enter a whole number of flags (at least 1).");
  const booleanCombinations = 2 ** flags;
  const meaningful = flags + 1;
  return { booleanCombinations, meaningful, invalid: booleanCombinations - meaningful, enumValues: meaningful };
}
