/**
 * A native <details> disclosure with a visible open/closed indicator.
 * Follows the library's existing pattern (group details, list-none summary,
 * aria-hidden indicator that rotates): a summary styled as flex or
 * inline-flex loses the browser's triangle, so the cue is drawn explicitly.
 * Server component; keyboard and screen-reader behaviour stay native.
 */
import type { ReactNode } from "react";
import { Icon } from "@/components/shell/icons";

export function Disclosure({
  summary,
  children,
  id,
  open,
  className = "rounded-md border border-rule bg-surface",
  summaryClassName = "px-4 py-3",
  bodyClassName = "border-t border-rule px-4 py-4",
}: {
  summary: ReactNode;
  children: ReactNode;
  id?: string;
  open?: boolean;
  className?: string;
  summaryClassName?: string;
  bodyClassName?: string;
}) {
  return (
    <details id={id} open={open} className={`group scroll-mt-24 ${className}`}>
      <summary
        className={`flex min-h-11 cursor-pointer list-none items-start gap-3 hover:bg-soft [&::-webkit-details-marker]:hidden ${summaryClassName}`}
      >
        <Icon
          name="chevron-down"
          size={16}
          aria-hidden
          className="mt-[3px] shrink-0 -rotate-90 text-ink-3 group-open:rotate-0 motion-safe:transition-transform"
        />
        <span className="min-w-0 flex-1">{summary}</span>
      </summary>
      <div className={bodyClassName}>{children}</div>
    </details>
  );
}
