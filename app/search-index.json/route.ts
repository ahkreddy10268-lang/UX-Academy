import { buildSearchDocs } from "@/lib/content/search";

/** Static search index, prerendered at build time. */
export async function GET() {
  return Response.json(buildSearchDocs());
}
