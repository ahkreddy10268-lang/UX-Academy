/**
 * Knowledge Atlas (`/topics`) and its navigation entry. The atlas must
 * represent the frozen taxonomy exactly — every domain, subcategory and topic
 * once, in canonical order and ownership, with the computed status — and its
 * search and filters must reach planned topics and aliases as well as
 * published entries. Counts are compared with the taxonomy, never hard-coded.
 */
import { describe, expect, it } from "vitest";
import { allNavItems, isActive, navGroups } from "../components/shell/nav";
import { domains, entryBySlug, taxonomyBySlug, taxonomyItems } from "../lib/content";
import { buildAtlas, domainTopics, filterAtlas, highlightParts, NO_FILTERS, readAtlasParams, atlasQuery } from "../lib/content/atlas";
import { domainCoverage, topicStatus, TOPIC_STATUSES } from "../lib/content/coverage";

const atlas = buildAtlas();
const topics = atlas.domains.flatMap(domainTopics);
const shown = (f: Partial<typeof NO_FILTERS>) => filterAtlas(atlas, { ...NO_FILTERS, ...f }).flatMap((d) => d.subcategories.flatMap((s) => s.topics));

describe("Knowledge Atlas: taxonomy integrity", () => {
  it("has every domain in canonical order", () => {
    expect(atlas.domains.map((d) => d.id)).toEqual(domains.map((d) => d.id));
    expect(atlas.domains.map((d) => d.n)).toEqual(domains.map((_, i) => i + 1));
  });

  it("has every subcategory under its own domain, in order", () => {
    for (const d of domains) expect(atlas.domains.find((x) => x.id === d.id)!.subcategories.map((s) => s.id)).toEqual(d.subcategories.map((s) => s.id));
  });

  it("represents every canonical topic exactly once, under its canonical owner", () => {
    const slugs = topics.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect([...slugs].sort()).toEqual(taxonomyItems.map((t) => t.slug).sort());
    for (const d of atlas.domains)
      for (const s of d.subcategories)
        for (const t of s.topics) {
          const canon = taxonomyBySlug.get(t.slug)!;
          expect([canon.domain, canon.subcategory]).toEqual([d.id, s.id]);
        }
  });

  it("totals match the coverage register for every domain and status", () => {
    const cov = domainCoverage();
    for (const d of atlas.domains) {
      const c = cov.find((x) => x.id === d.id)!;
      const ts = domainTopics(d);
      expect(ts.length).toBe(c.total);
      for (const s of TOPIC_STATUSES) expect(ts.filter((t) => t.status === s).length).toBe(c.byTopicStatus[s]);
    }
  });

  it("uses the computed status and a destination that exists", () => {
    for (const t of topics) {
      expect(t.status).toBe(topicStatus(taxonomyBySlug.get(t.slug)!));
      const target = t.href.replace("/library/", "");
      expect(entryBySlug.has(target) || taxonomyBySlug.has(target)).toBe(true);
      if (t.status === "published") expect(t.href).toBe(`/library/${t.slug}`);
    }
  });

  it("links addressed-within topics to the canonical entry that covers them", () => {
    const addressed = topics.filter((t) => t.status === "addressed");
    expect(addressed.length).toBe(taxonomyItems.filter((t) => !t.entry && t.coveredBy).length);
    for (const t of addressed) {
      const parent = taxonomyBySlug.get(t.slug)!.coveredBy!;
      expect(t.coveredBy?.slug).toBe(parent);
      expect(t.href).toBe(`/library/${parent}`);
    }
  });

  it("keeps aliases on their canonical topic rather than as extra rows", () => {
    const withAliases = taxonomyItems.filter((t) => t.aliases?.length);
    expect(withAliases.length).toBeGreaterThan(0);
    for (const t of withAliases) {
      expect(topics.filter((x) => x.slug === t.slug)).toHaveLength(1);
      for (const a of t.aliases!) expect(topics.some((x) => x.title === a && x.slug !== t.slug)).toBe(false);
    }
  });
});

describe("Knowledge Atlas: search and filters", () => {
  it("shows everything with no filters", () => {
    expect(shown({}).length).toBe(topics.length);
  });

  it("finds planned and published topics across domains", () => {
    const planned = topics.find((t) => t.status === "planned")!;
    expect(shown({ q: planned.title }).some((t) => t.slug === planned.slug)).toBe(true);
    const published = topics.find((t) => t.status === "published")!;
    expect(shown({ q: published.title.toUpperCase() }).some((t) => t.slug === published.slug)).toBe(true);
    // A common word reaches topics in several domains, not only the first match.
    expect(filterAtlas(atlas, { ...NO_FILTERS, q: "design" }).length).toBeGreaterThan(5);
  });

  it("matches aliases and reports which alias matched", () => {
    const t = taxonomyItems.find((x) => x.aliases?.length)!;
    const hit = shown({ q: t.aliases![0] }).find((x) => x.slug === t.slug);
    expect(hit?.aliasHit).toBe(t.aliases![0]);
  });

  it("a matching subcategory or domain reveals all of its topics", () => {
    const d = atlas.domains[0];
    const s = d.subcategories[0];
    const bySub = filterAtlas(atlas, { ...NO_FILTERS, q: s.title }).find((x) => x.id === d.id)!.subcategories.find((x) => x.id === s.id)!;
    expect(bySub.nameHit).toBe(true);
    expect(bySub.topics.length).toBe(s.topics.length);
    const byDomain = filterAtlas(atlas, { ...NO_FILTERS, q: d.title }).find((x) => x.id === d.id)!;
    expect(byDomain.nameHit).toBe(true);
    expect(domainTopics(byDomain as never).length).toBe(domainTopics(d).length);
  });

  it("status, type and domain filters return exactly the matching topics", () => {
    for (const s of TOPIC_STATUSES) expect(shown({ status: s }).length).toBe(topics.filter((t) => t.status === s).length);
    const type = Object.keys(atlas.typeLabels)[0];
    expect(shown({ type }).length).toBe(topics.filter((t) => t.type === type).length);
    const d = atlas.domains[3];
    expect(shown({ domain: d.id }).length).toBe(domainTopics(d).length);
    expect(shown({ domain: d.id, status: "published" }).every((t) => t.status === "published")).toBe(true);
  });

  it("drops invalid URL parameters and round-trips valid ones", () => {
    const f = readAtlasParams(new URLSearchParams("q=fitts&status=bogus&type=nope&domain=nowhere"), atlas);
    expect(f).toEqual({ q: "fitts", status: "", type: "", domain: "" });
    const good = { q: "feedback", status: "planned" as const, type: "", domain: atlas.domains[1].id };
    expect(readAtlasParams(new URLSearchParams(atlasQuery(good).slice(1)), atlas)).toEqual(good);
    expect(atlasQuery(NO_FILTERS)).toBe("");
  });

  it("highlights matched text without changing it", () => {
    const parts = highlightParts("Fitts's Law", "law");
    expect(parts.map((p) => p.text).join("")).toBe("Fitts's Law");
    expect(parts.filter((p) => p.hit).map((p) => p.text)).toEqual(["Law"]);
  });
});

describe("Navigation: Domains & Topics", () => {
  const atlasItem = allNavItems.find((i) => i.label === "Domains & Topics")!;
  const library = allNavItems.find((i) => i.label === "Knowledge Library")!;

  it("is a direct item in the Explore group, first, pointing at /topics", () => {
    const explore = navGroups.find((g) => g.id === "explore")!;
    expect(explore.items[0]).toBe(atlasItem);
    expect(atlasItem.href).toBe("/topics");
    expect(explore.items.map((i) => i.label)).toEqual(["Domains & Topics", "Graph", "Glossary"]);
  });

  it("activates for /topics and domain pages, while /library activates the Library", () => {
    expect(isActive("/topics", atlasItem)).toBe(true);
    expect(isActive("/topics/foundations", atlasItem)).toBe(true);
    expect(isActive("/topics", library)).toBe(false);
    expect(isActive("/library", library)).toBe(true);
    expect(isActive("/library/fitts-law", library)).toBe(true);
    expect(isActive("/library", atlasItem)).toBe(false);
  });

  it("every nav label is unique", () => {
    const labels = allNavItems.map((i) => i.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
