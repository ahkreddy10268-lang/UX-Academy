/** Which calculators have a response curve (shared by server and client modules). */
export const CURVE_IDS = ["fitts", "hick-hyman", "problem-discovery", "sample-size", "modular-scale"] as const;
export const hasCurve = (calculator?: string) => Boolean(calculator && (CURVE_IDS as readonly string[]).includes(calculator));
