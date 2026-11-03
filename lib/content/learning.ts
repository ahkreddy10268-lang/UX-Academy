/** Derived learning metadata — computed from content, never typed in. */
import { entryBySlug } from "./index";
import { collectStrings, richToPlain } from "./rich";
import type { KnowledgeEntry, LearningPath } from "./schema";

const WPM = 220; // typical adult silent reading of expository text

/** Estimated minutes to read all three explanation levels of an entry. */
export function readingMinutes(e: KnowledgeEntry): number {
  const words = collectStrings(e.levels)
    .map((s) => richToPlain(s))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WPM));
}

export function minutesForLevel(e: KnowledgeEntry, level: "beginner" | "intermediate" | "advanced"): number {
  const words = collectStrings(e.levels[level]).join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / WPM));
}

export type PathStats = {
  levels: number;
  lessons: number; // published steps
  planned: number;
  exercises: number; // exercises across published steps
  questions: number; // quiz questions across published steps
  minutes: number; // reading estimate across published steps
  firstPublished?: KnowledgeEntry;
};

export function pathStats(p: LearningPath): PathStats {
  const steps = p.stages.flatMap((s) => s.steps);
  const published = steps.map((s) => entryBySlug.get(s)).filter((e): e is KnowledgeEntry => Boolean(e));
  return {
    levels: p.stages.length,
    lessons: published.length,
    planned: steps.length - published.length,
    exercises: published.reduce((n, e) => n + e.exercises.length, 0),
    questions: published.reduce((n, e) => n + e.quiz.length, 0),
    minutes: published.reduce((n, e) => n + readingMinutes(e), 0),
    firstPublished: published[0],
  };
}

export function stageStats(stage: LearningPath["stages"][number]) {
  const published = stage.steps.map((s) => entryBySlug.get(s)).filter((e): e is KnowledgeEntry => Boolean(e));
  return {
    lessons: published.length,
    planned: stage.steps.length - published.length,
    questions: published.reduce((n, e) => n + e.quiz.length, 0),
    exercises: published.reduce((n, e) => n + e.exercises.length, 0),
    minutes: published.reduce((n, e) => n + readingMinutes(e), 0),
  };
}
