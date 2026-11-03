/** Identity helpers that give content files full type-checking without runtime cost. */
import type { KnowledgeEntryInput, Source } from "./schema";

type SourceInput = Omit<Source, "authors" | "topics" | "access"> &
  Partial<Pick<Source, "authors" | "topics" | "access">>;

export const defineEntry = (entry: KnowledgeEntryInput): KnowledgeEntryInput => entry;
export const defineSources = (sources: SourceInput[]): Source[] =>
  sources.map((s) => ({ authors: [], topics: [], access: "unknown", ...s }));
