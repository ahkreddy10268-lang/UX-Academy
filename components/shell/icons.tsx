/**
 * UX Academy icon set — one coherent family drawn for this product.
 * Grid 20×20, 1.5 stroke, round caps and joins, no fills except small dots.
 * Each glyph names the activity, not a brand metaphor. Decorative by default
 * (aria-hidden); the adjacent text carries the meaning.
 */
import type { SVGProps } from "react";

export type IconName =
  | "home"
  | "learn"
  | "library"
  | "formula"
  | "labs"
  | "practice"
  | "graph"
  | "glossary"
  | "me"
  | "compare"
  | "sources"
  | "coverage"
  | "method"
  | "search"
  | "sun"
  | "moon"
  | "auto"
  | "sidebar"
  | "menu"
  | "close"
  | "arrow-right"
  | "chevron-down"
  | "grid"
  | "list"
  | "az"
  | "filter"
  | "bookmark"
  | "check"
  | "clock"
  | "spark"
  | "ai"
  | "guide"
  | "layers";

const paths: Record<IconName, React.ReactNode> = {
  home: <path d="M3.5 9 10 3.75 16.5 9v6.75a.75.75 0 0 1-.75.75H12.5v-4.5h-5v4.5H4.25a.75.75 0 0 1-.75-.75z" />,
  // a path of three steps rising — structured learning
  learn: (
    <>
      <path d="M3 16.25h4.25v-3.5h4.5v-3.5H16v-3" />
      <path d="m14 7.25 2-2 2 2" />
    </>
  ),
  // two volumes and a leaning third
  library: (
    <>
      <rect x="3.25" y="3.5" width="3.5" height="13" rx=".75" />
      <rect x="8" y="3.5" width="3.5" height="13" rx=".75" />
      <path d="m13.1 4.4 3.3-.9 2.6 12.3-3.3.9z" transform="translate(-1.4 .2)" />
    </>
  ),
  // sigma inside a rounded field
  formula: (
    <>
      <rect x="3" y="3" width="14" height="14" rx="3" />
      <path d="M12.75 6.5h-5.5L10 10l-2.75 3.5h5.5" />
    </>
  ),
  // flask
  labs: (
    <>
      <path d="M8 3.25h4M8.75 3.25v4.5L4.4 15a1 1 0 0 0 .86 1.5h9.48a1 1 0 0 0 .86-1.5L11.25 7.75v-4.5" />
      <path d="M6.25 12.25h7.5" />
    </>
  ),
  // target
  practice: (
    <>
      <circle cx="10" cy="10" r="6.75" />
      <circle cx="10" cy="10" r="3.5" />
      <circle cx="10" cy="10" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  graph: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="15" cy="5" r="2" />
      <circle cx="11" cy="15" r="2" />
      <path d="m6.9 6.6 6.2-1M6.1 7.7l3.9 5.6M14.3 6.9l-2.6 6.2" />
    </>
  ),
  // open book
  glossary: (
    <>
      <path d="M10 5.5C8.5 4.25 6 3.75 3.25 4v11c2.75-.25 5.25.25 6.75 1.5 1.5-1.25 4-1.75 6.75-1.5V4C14 3.75 11.5 4.25 10 5.5z" />
      <path d="M10 5.5v11" />
    </>
  ),
  // progress ring with a tick — personal progress, not a person
  me: (
    <>
      <path d="M16.75 10A6.75 6.75 0 1 1 10 3.25" />
      <path d="M16.75 10A6.75 6.75 0 0 0 10 3.25" strokeDasharray="2 2.2" />
      <path d="m7.25 10 2 2 3.75-4" />
    </>
  ),
  compare: (
    <>
      <rect x="3" y="3.5" width="5.75" height="13" rx="1.25" />
      <rect x="11.25" y="3.5" width="5.75" height="13" rx="1.25" />
      <path d="M5 7h1.75M13.25 7H15M5 10h1.75M13.25 10H15" />
    </>
  ),
  // quotation / citation marks
  sources: (
    <>
      <path d="M4 11.5c0-3 1.25-5 4-6M4 11.5h3.25v3.75H4zM11.25 11.5c0-3 1.25-5 4-6M11.25 11.5h3.25v3.75h-3.25z" />
    </>
  ),
  // a grid with some cells filled — coverage
  coverage: (
    <>
      <rect x="3" y="3" width="14" height="14" rx="2.5" />
      <path d="M3 10h14M10 3v14" />
      <rect x="4.75" y="4.75" width="3.5" height="3.5" rx=".5" fill="currentColor" stroke="none" />
      <rect x="11.75" y="11.75" width="3.5" height="3.5" rx=".5" fill="currentColor" stroke="none" />
    </>
  ),
  // balance — weighing evidence
  method: (
    <>
      <path d="M10 3.5v13M6.5 16.5h7M4 6.5h12M10 4.25 4 6.5M10 4.25l6 2.25" />
      <path d="m4 6.5-2 4.5h4zM16 6.5l-2 4.5h4z" />
    </>
  ),
  search: (
    <>
      <circle cx="9" cy="9" r="5.25" />
      <path d="m13 13 3.75 3.75" />
    </>
  ),
  sun: (
    <>
      <circle cx="10" cy="10" r="3.25" />
      <path d="M10 2.75v1.5M10 15.75v1.5M2.75 10h1.5M15.75 10h1.5M4.9 4.9l1.05 1.05M14.05 14.05l1.05 1.05M4.9 15.1l1.05-1.05M14.05 5.95l1.05-1.05" />
    </>
  ),
  moon: <path d="M15.75 12.25A6.5 6.5 0 0 1 7.75 4.25a6.5 6.5 0 1 0 8 8z" />,
  auto: (
    <>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M10 3.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" stroke="none" />
    </>
  ),
  sidebar: (
    <>
      <rect x="3" y="3.5" width="14" height="13" rx="2.5" />
      <path d="M8 3.5v13" />
    </>
  ),
  menu: <path d="M3.5 6h13M3.5 10h13M3.5 14h13" />,
  close: <path d="m5 5 10 10M15 5 5 15" />,
  "arrow-right": <path d="M4 10h11.5M11 5.5l4.5 4.5-4.5 4.5" />,
  "chevron-down": <path d="m5.5 8 4.5 4.5L14.5 8" />,
  grid: (
    <>
      <rect x="3.5" y="3.5" width="5" height="5" rx="1.25" />
      <rect x="11.5" y="3.5" width="5" height="5" rx="1.25" />
      <rect x="3.5" y="11.5" width="5" height="5" rx="1.25" />
      <rect x="11.5" y="11.5" width="5" height="5" rx="1.25" />
    </>
  ),
  list: <path d="M7.5 5.5h9M7.5 10h9M7.5 14.5h9M3.75 5.5h.5M3.75 10h.5M3.75 14.5h.5" />,
  az: (
    <>
      <path d="m3 15.5 3-9 3 9M4 12.5h4" />
      <path d="M11.5 6.5H17L11.5 15.5H17" />
    </>
  ),
  filter: <path d="M3.5 5h13M6 10h8M8.5 15h3" />,
  bookmark: <path d="M5.5 3.5h9v13L10 13l-4.5 3.5z" />,
  check: <path d="m4.5 10.5 3.5 3.5 7.5-8" />,
  clock: (
    <>
      <circle cx="10" cy="10" r="6.75" />
      <path d="M10 6.25V10l2.5 1.75" />
    </>
  ),
  spark: <path d="M10 3v4M10 13v4M3 10h4M13 10h4M5.5 5.5l2 2M12.5 12.5l2 2M5.5 14.5l2-2M12.5 7.5l2-2" />,
  // a message bubble with a small four-point star — a conversation with an AI system
  ai: (
    <>
      <path d="M4.25 4.5h11.5a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75H9l-3.5 2.75V13.5H4.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75z" />
      <path d="M10 6.5v4M8 8.5h4" />
    </>
  ),
  // a signpost — a guide points the way through a subject
  guide: (
    <>
      <path d="M10 3v14M7.5 17h5" />
      <path d="M10 5h5.25L17 6.75 15.25 8.5H10M10 10.5H4.75L3 12.25 4.75 14H10" />
    </>
  ),
  // three stacked layers — foundations under components under patterns
  layers: (
    <>
      <path d="m10 3.5 6.5 3.25L10 10 3.5 6.75z" />
      <path d="m3.5 10 6.5 3.25L16.5 10" />
      <path d="m3.5 13.25 6.5 3.25 6.5-3.25" />
    </>
  ),
};

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
