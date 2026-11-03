/**
 * Tiny, safe rich-text tokenizer for content strings. No HTML is ever parsed.
 * Supported: **bold**, *em*, `code`, [[slug]] / [[slug|label]], {{src:id}}
 */
export type RichNode =
  | { kind: "text"; value: string }
  | { kind: "strong"; children: RichNode[] }
  | { kind: "em"; children: RichNode[] }
  | { kind: "code"; value: string }
  | { kind: "link"; slug: string; label?: string }
  | { kind: "cite"; source: string };

const TOKEN = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[\[[a-z0-9-]+(?:\|[^\]]+)?\]\]|\{\{src:[a-z0-9-]+\}\})/g;

export function parseRich(input: string): RichNode[] {
  const nodes: RichNode[] = [];
  let last = 0;
  for (const match of input.matchAll(TOKEN)) {
    const token = match[0];
    const index = match.index ?? 0;
    if (index > last) nodes.push({ kind: "text", value: input.slice(last, index) });
    if (token.startsWith("**")) {
      nodes.push({ kind: "strong", children: parseRich(token.slice(2, -2)) });
    } else if (token.startsWith("`")) {
      nodes.push({ kind: "code", value: token.slice(1, -1) });
    } else if (token.startsWith("[[")) {
      const [slug, label] = token.slice(2, -2).split("|");
      nodes.push({ kind: "link", slug, label });
    } else if (token.startsWith("{{")) {
      nodes.push({ kind: "cite", source: token.slice(6, -2) });
    } else {
      nodes.push({ kind: "em", children: parseRich(token.slice(1, -1)) });
    }
    last = index + token.length;
  }
  if (last < input.length) nodes.push({ kind: "text", value: input.slice(last) });
  return nodes;
}

/** Plain text for search indexing and snippets. */
export function richToPlain(input: string, titleFor?: (slug: string) => string | undefined): string {
  return parseRich(input)
    .map(function flat(n: RichNode): string {
      switch (n.kind) {
        case "text":
        case "code":
          return n.value;
        case "strong":
        case "em":
          return n.children.map(flat).join("");
        case "link":
          return n.label ?? titleFor?.(n.slug) ?? n.slug.replace(/-/g, " ");
        case "cite":
          return "";
      }
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractLinks(input: string): string[] {
  return [...input.matchAll(/\[\[([a-z0-9-]+)(?:\|[^\]]+)?\]\]/g)].map((m) => m[1]);
}

export function extractCitations(input: string): string[] {
  return [...input.matchAll(/\{\{src:([a-z0-9-]+)\}\}/g)].map((m) => m[1]);
}

/** Walk any content object and collect every string (used by validators and search). */
export function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}
