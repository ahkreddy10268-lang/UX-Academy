/** Illustration system integrity: coverage, registry hygiene, accessibility text. */
import { describe, expect, it } from "vitest";
import { illustrations } from "../components/illustrations/registry";
import { domains, entries, knownSlugs } from "../lib/content";

const domainIds = new Set(domains.map((d) => d.id));

describe("illustration registry", () => {
  it("has a plate for every published entry", () => {
    const missing = entries.filter((e) => e.status === "published" && !illustrations.has(e.slug)).map((e) => e.slug);
    expect(missing).toEqual([]);
  });
  it("has a subject plate for every domain", () => {
    expect(domains.filter((d) => !illustrations.has(d.id)).map((d) => d.id)).toEqual([]);
  });
  it("only registers plates for known slugs or domain ids", () => {
    const unknown = [...illustrations.keys()].filter((s) => !knownSlugs.has(s) && !domainIds.has(s));
    expect(unknown).toEqual([]);
  });
  it("gives every plate a title and a substantive description", () => {
    for (const p of illustrations.values()) {
      expect(p.title.length, p.slug).toBeGreaterThan(4);
      expect(p.description.split(/\s+/).length, `${p.slug} description too short`).toBeGreaterThanOrEqual(12);
    }
  });
  it("uses explorers only from the implemented set", () => {
    const ok = new Set(["fitts", "hick", "peak-end", "chunking", "gestalt", "cognitive-load", "signifiers", "colour", "hci-methods"]);
    for (const p of illustrations.values()) if (p.explorer) expect(ok.has(p.explorer), p.slug).toBe(true);
  });
});
