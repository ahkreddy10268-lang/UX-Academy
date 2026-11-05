/** Learner-facing topic statuses (dependency-free so client components can import them). */
/** The six statuses a learner-facing report uses. Research in progress = research pending or completed. */
export const TOPIC_STATUSES = ["planned", "research", "drafted", "reviewed", "published", "addressed"] as const;
export type TopicStatus = (typeof TOPIC_STATUSES)[number];
export const TOPIC_STATUS_LABEL: Record<TopicStatus, string> = {
  planned: "Planned",
  research: "Research in progress",
  drafted: "Drafted",
  reviewed: "Quality reviewed",
  published: "Published",
  addressed: "Addressed within another entry",
};
