/** Server-side helpers that resolve links and citations for rich text. */
import type { LinkInfo, RichContext } from "@/components/ui/rich";
import { entryBySlug, taxonomyBySlug } from "./index";
import { collectStrings, extractLinks } from "./rich";

export function resolveSlug(slug: string): LinkInfo | undefined {
  const e = entryBySlug.get(slug);
  if (e) return { title: e.title, href: `/library/${slug}`, planned: false };
  const t = taxonomyBySlug.get(slug);
  if (t) return { title: t.title, href: `/library/${slug}`, planned: true };
  return undefined;
}

export function richContext(citeOrder: string[] = []): RichContext {
  const index = new Map(citeOrder.map((id, i) => [id, i + 1]));
  return { resolve: resolveSlug, cite: (id) => index.get(id) };
}

/** A serialisable map of link targets used in some content, for client components. */
export function linkMapFor(value: unknown): Record<string, LinkInfo> {
  const out: Record<string, LinkInfo> = {};
  for (const slug of collectStrings(value).flatMap(extractLinks)) {
    const info = resolveSlug(slug);
    if (info) out[slug] = info;
  }
  return out;
}
