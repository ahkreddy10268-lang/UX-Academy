/** Topic status as text plus a shape (filled, half, outlined, dashed, arrow): never colour alone. */
import { TOPIC_STATUS_LABEL, type TopicStatus } from "@/lib/content/topic-status";

const SHORT: Record<TopicStatus, string> = { ...TOPIC_STATUS_LABEL, addressed: "Addressed within", research: "Research" };

export function StatusTag({ status }: { status: TopicStatus }) {
  const style: Record<TopicStatus, string> = {
    published: "border-published text-published",
    reviewed: "border-info text-info",
    drafted: "border-info text-info",
    research: "border-info text-info",
    addressed: "border-rule-strong text-ink-2",
    planned: "border-dashed border-planned-line text-planned",
  };
  const mark: Record<TopicStatus, string> = { published: "●", reviewed: "◐", drafted: "◐", research: "◔", addressed: "↳", planned: "○" };
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium ${style[status]}`}>
      <span aria-hidden>{mark[status]}</span>
      {SHORT[status]}
    </span>
  );
}

