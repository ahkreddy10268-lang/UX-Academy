/** Taxonomy v1.0 integrity: the structure is frozen (docs/CONTENT_MODEL.md § Taxonomy governance). */
import { describe, expect, it } from "vitest";
import { domainById, domains, entryBySlug, taxonomyBySlug, taxonomyItems } from "../lib/content";

const DOMAIN_IDS = ["foundations", "laws-effects", "psychology", "heuristics", "research", "frameworks", "ia", "interaction", "visual", "type-colour", "design-systems", "accessibility", "content", "product", "service", "metrics", "dataviz", "ethics", "emerging", "practice"];
const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "");

describe("taxonomy v1.0", () => {
  it("has exactly the 20 approved domains, with stable ids, in order", () => {
    expect(domains.map((d) => d.id)).toEqual(DOMAIN_IDS);
  });
  it("uses the corrected visible titles for the two renamed domains and keeps their ids", () => {
    expect(domainById.get("psychology")?.title).toBe("Cognition, Behaviour & Human Factors");
    expect(domainById.get("frameworks")?.title).toBe("Design Methods & Frameworks");
  });
  it("has no empty or one-topic subcategory", () => {
    for (const d of domains) for (const s of d.subcategories) expect(s.items.length, `${d.id}/${s.id}`).toBeGreaterThanOrEqual(2);
  });
  it("gives every topic exactly one canonical home (unique slugs and unique normalised titles)", () => {
    expect(new Set(taxonomyItems.map((t) => t.slug)).size).toBe(taxonomyItems.length);
    expect(new Set(taxonomyItems.map((t) => norm(t.title))).size).toBe(taxonomyItems.length);
  });
  it("keeps aliases out of the topic namespace (an alias is never another topic's title or slug)", () => {
    const names = new Set(taxonomyItems.flatMap((t) => [norm(t.title), norm(t.slug)]));
    for (const t of taxonomyItems) for (const a of t.aliases ?? []) expect(names.has(norm(a)), `${t.slug} alias "${a}"`).toBe(false);
  });
  it("lists no software tools as topics", () => {
    expect(taxonomyItems.filter((t) => t.type === "tool").map((t) => t.slug)).toEqual([]);
  });
  it("places the accepted P1 additions in their canonical domains and keeps merged slugs out", () => {
    const home: Record<string, string> = {
      "customer-experience": "service", "graphic-design": "visual", "information-design": "visual", "brand-identity-design": "visual", "content-strategy": "content", "neuroinclusive-design": "accessibility",
      "form-design": "interaction", "haptic-feedback-design": "interaction", "emotion-and-affect-in-interaction": "psychology", "learning-and-skill-acquisition": "psychology", "data-storytelling": "dataviz",
      "visualising-uncertainty": "dataviz", cscw: "emerging", "design-futures": "emerging", "javascript-for-designers": "practice", "dom-and-event-fundamentals": "practice", "web-performance-for-designers": "practice",
    };
    for (const [slug, d] of Object.entries(home)) expect(taxonomyBySlug.get(slug)?.domain, slug).toBe(d);
    for (const gone of ["form-architecture", "voice-interactions", "semantic-colour-systems", "design-ethics-foundations", "design-responsibilities"]) expect(taxonomyBySlug.has(gone), gone).toBe(false);
  });
  it("keeps new topics planned: nothing added in v1.0 is published or addressed-within without content", () => {
    for (const slug of ["customer-experience", "graphic-design", "cscw", "form-design", "javascript-for-designers"]) expect(entryBySlug.has(slug), slug).toBe(false);
  });
  it("enforces the ownership rules for moved subjects", () => {
    const owner: Record<string, string> = {
      "jobs-to-be-done": "product", "kano-model": "product", rice: "product", moscow: "product", okrs: "product", "opportunity-solution-tree": "product",
      "customer-journey-mapping": "service", "service-blueprints": "service", "heart-framework": "metrics", questionnaires: "metrics",
      "accessibility-concept": "accessibility", "inclusive-design": "accessibility", "error-prevention": "interaction", "feedback-principle": "interaction", "content-design-principles": "content", "visual-design-principles": "visual",
    };
    for (const [slug, d] of Object.entries(owner)) expect(taxonomyBySlug.get(slug)?.domain, slug).toBe(d);
  });
});
