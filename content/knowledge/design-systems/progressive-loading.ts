import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "progressive-loading",
  slug: "progressive-loading",
  title: "Progressive Loading",
  alternateNames: ["Incremental loading", "Lazy loading", "Streaming rendering", "Phased loading", "Blur-up images"],
  summary:
    "Loading a page in priority order — the critical, visible content first, the rest as it is needed or as it arrives — so people can read and act early, while measured loading and responsiveness stay within targets.",
  definition:
    "Progressive loading is the practice of **splitting one long wait into ordered phases**: the shell and above-the-fold content first, then sections as their data streams in, then off-screen media and long lists only when they approach the viewport. Techniques include **streaming server rendering** with per-section fallbacks {{src:react-suspense}}, **lazy loading** of off-screen media {{src:mdn-lazy-loading}}, **low-quality image placeholders** (blur-up) that reserve space, and **pagination or virtualisation** for long lists {{src:tanstack-virtual}}. In the async model of [[component-state-management]], every region runs its own `loading → success | empty | error` machine instead of one page-wide spinner.",
  primaryType: "pattern",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["progressive loading", "lazy loading", "streaming SSR", "Suspense", "LQIP", "blur-up", "virtualisation", "pagination", "LCP", "INP", "Core Web Vitals"],
  difficulty: "advanced",
  disciplines: ["Front-end engineering", "Performance", "Interaction design"],
  learningObjectives: [
    "Order a page's loading by what people need first.",
    "Choose between streaming, lazy loading, placeholders, pagination and virtualisation.",
    "Keep loading performance measurable with Core Web Vitals and Resource Timing.",
    "Keep phased content accessible: announcements, focus and reading order.",
  ],
  prerequisites: ["loading-states", "skeleton-screens"],

  levels: {
    beginner: {
      explanation: [
        "The library app's branch page waits until the opening hours, the events calendar, the photo gallery and the reviews have all loaded before showing anything. Most visitors only wanted the opening hours, which were ready after half a second.",
        "**Progressive loading** shows things as soon as they are ready, in order of importance. The opening hours appear first; the events calendar fills in a moment later; the photos load only when you scroll down to them; the reviews arrive a page at a time.",
        "Nothing is faster overall, but people can start reading and acting much earlier, and they do not download what they never look at.",
      ],
      analogy:
        "A restaurant serving dishes as each is ready, starting with bread and water, rather than holding everything until the dessert is done.",
      everydayExamples: [
        "A news article whose text appears before its images.",
        "Photos that load as you scroll down a gallery.",
        "A blurry preview of a picture that sharpens as it loads.",
      ],
      vocabulary: [
        { term: "Above the fold", meaning: "What is visible without scrolling when the page opens." },
        { term: "Lazy loading", meaning: "Loading something only when it is about to be needed, such as an image near the viewport." },
        { term: "Streaming", meaning: "Sending the page in pieces, so early parts appear while later parts are still being prepared." },
        { term: "Blur-up", meaning: "Showing a tiny blurred version of an image while the full one loads." },
        { term: "Virtualisation", meaning: "Rendering only the rows of a long list that are on screen." },
      ],
    },
    intermediate: {
      explanation: [
        "**Prioritise.** Decide the critical path: what does someone need to read or do first? Render that with the shell; defer the rest. Largest Contentful Paint (LCP) should occur within 2.5 s at the 75th percentile {{src:webdev-lcp}}, so the largest above-the-fold element — often a hero image or heading — must never be deferred. web.dev warns not to lazy-load images likely to be in the viewport, especially the LCP image, and to raise its priority with `fetchpriority=\"high\"` instead {{src:webdev-lazy-images}}.",
        "**Stream sections.** With streaming server rendering, React sends the shell with fallbacks first and swaps in each `<Suspense>` boundary's HTML as it arrives {{src:react-suspense}}. Each boundary is a region with its own skeleton ([[skeleton-screens]]) and error fallback; order boundaries so the most important regions resolve first.",
        "**Defer off-screen media.** The `loading` attribute on images, iframes, video and audio defers off-screen resources until the user scrolls near them; the Intersection Observer API serves custom cases {{src:mdn-lazy-loading}}. Blur-up placeholders reserve the image's exact space, so arrival causes no layout shift (CLS ≤ 0.1 is good) {{src:webdev-cls}}.",
        "**Long lists.** Pagination gives stable positions, shareable URLs and an end; infinite loading suits browsing feeds but hides the footer and makes position hard to keep; virtualisation renders only visible rows — TanStack Virtual is a headless utility for this {{src:tanstack-virtual}}.",
      ],
      howItWorks: [
        "Ordering work by need moves useful content earlier in time; deferring the rest cuts bytes and main-thread work, which also protects responsiveness (INP ≤ 200 ms is good) {{src:webdev-inp}}.",
        "Per-region states mean a slow or failing section does not block the rest of the page.",
      ],
      implementation: [
        "Rank page regions by need; render the top region in the shell and stream the rest behind Suspense boundaries.",
        "Never lazy-load the LCP element; give it high fetch priority {{src:webdev-lazy-images}}.",
        "Reserve space for every deferred element (dimensions, aspect ratio, skeleton or blur-up).",
        "Announce sections that finish loading only when they matter to the user's task, using status messages [WCAG 2.2 SC 4.1.3, AA]; never move focus as content streams in [SC 3.2.2 On Input, A — no unexpected change of context] {{src:w3c-wcag-22}}.",
        "Keep DOM order equal to reading order when sections arrive out of order [SC 1.3.2 Meaningful Sequence, A] {{src:w3c-wcag-22}}.",
        "For infinite lists, provide a way to reach content after the list (a 'Load more' button or a skip link) so keyboard users are not trapped [SC 2.1.1, A] {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** The branch page renders the address and opening hours in the shell; events stream in behind a Suspense boundary with a calendar skeleton; the gallery uses lazy images with blur-up placeholders; reviews paginate. The LCP element (the branch heading and photo) loads with high priority.",
        "**Illustrative.** A catalogue with 40,000 titles switched from infinite scroll to pagination plus a virtualised 'quick list' view; people can now bookmark page 12 and reach the footer.",
        "**Design review protocol.** What is the first useful thing on the page, and does it arrive first? Is any above-the-fold element lazy-loaded? Does every deferred element reserve its space? Does reading order hold as sections stream? Can keyboard users get past long lists?",
      ],
    },
    advanced: {
      explanation: [
        "**Region machines.** Each streamed region is a child machine: `loading` (skeleton) → `success` (content) | `empty` | `error` (inline retry). The page is `ready` when its critical region succeeds, not when all regions do. React streams boundaries independently and uses them to handle server errors by falling back to client rendering for the failed boundary {{src:react-suspense}}.",
        "**Measurement.** Core Web Vitals give targets at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 {{src:webdev-lcp}} {{src:webdev-inp}} {{src:webdev-cls}}. The W3C Resource Timing interface (`PerformanceResourceTiming`) lets scripts collect timing for each resource {{src:w3c-resource-timing}}, which shows whether deferred resources really load later and critical ones early.",
        "**Virtualised viewports.** Virtualisation keeps the DOM small — memory and layout cost scale with visible rows, not total rows — but it removes off-screen rows from the accessibility tree and from find-in-page. For tables and grids, expose totals and positions with `aria-rowcount` and `aria-rowindex` as the APG grid pattern describes {{src:w3c-apg-grid}}, keep focus on a rendered row while scrolling, and offer search or filters so people do not depend on scrolling.",
        "**Replacement order.** Replace placeholders top to bottom in reading order; when a lower region resolves first, it can render in place, because the region above has reserved its space and will not push it down when it arrives.",
      ],
      evidence: [
        "Progressive loading rests on **documented platform behaviour and performance guidance**: React's streaming and Suspense documentation {{src:react-suspense}}, MDN on lazy loading {{src:mdn-lazy-loading}}, web.dev's Core Web Vitals thresholds and lazy-loading advice {{src:webdev-lcp}} {{src:webdev-inp}} {{src:webdev-cls}} {{src:webdev-lazy-images}}, the W3C Resource Timing Candidate Recommendation Draft {{src:w3c-resource-timing}} and the APG grid pattern {{src:w3c-apg-grid}}. Core Web Vitals thresholds are Google's guidance, not a W3C standard. The user benefit of earlier content follows from the response-time limits in [[loading-states]].",
      ],
      debates: [
        "**Infinite scroll or pagination?** Infinite scroll suits casual browsing; pagination suits finding, comparing and returning to items.",
        "**Blur-up or solid placeholders?** Blur-up previews content but adds a request and decoding; solid placeholders are cheaper and calmer.",
        "**Stream everything?** Many small boundaries create a 'popcorn' page that reflows repeatedly; group related content into fewer boundaries.",
      ],
      alternativeModels: [
        "**Prefetching** — loading the likely next page before it is requested, so it appears instantly.",
        "**Static generation** — rendering at build time so most content needs no loading at all.",
      ],
    },
  },

  application: {
    summary: ["Progressive loading applies to content-heavy pages, dashboards, galleries, feeds, search results and long tables."],
    web: ["Streaming SSR with Suspense boundaries, lazy media with reserved space, fetchpriority for the LCP element, pagination or virtualisation for long lists."],
    mobile: ["Load cached content first and refresh in the background; defer images on slow networks."],
    enterprise: ["Dashboards stream widgets independently; each widget owns loading, empty and error states."],
    services: ["Long forms can be split into steps, each loaded when reached."],
    steps: [
      "Rank page regions by user need and identify the LCP element.",
      "Put the critical region in the shell; stream others behind boundaries.",
      "Lazy-load off-screen media with reserved space; never the LCP element.",
      "Choose pagination or virtualisation for long lists and keep them keyboard-escapable.",
      "Measure LCP, INP, CLS and resource timing at the 75th percentile.",
    ],
  },

  whenToUse: [
    "Pages whose content has clear priorities and arrives at different speeds.",
    "Long lists and media-heavy pages where most content is off screen.",
  ],
  whenNotToUse: [
    "For small pages that load quickly as a whole: phasing adds complexity and reflow.",
    "For content people must see together to make a decision, such as a price and its conditions.",
  ],
  advantages: [
    "Useful content appears earlier.",
    "Fewer bytes and less work for content never viewed.",
    "One slow section no longer blocks the page.",
  ],
  limitations: [
    "More states and boundaries to design and test.",
    "Out-of-order arrival can confuse reading order and assistive technology.",
    "Virtualisation hides off-screen content from find-in-page and the accessibility tree.",
  ],
  misconceptions: [
    {
      myth: "Lazy-load every image.",
      reality:
        "Lazy-loading images in the initial viewport, especially the LCP image, delays them; web.dev advises against it {{src:webdev-lazy-images}}.",
    },
  ],

  relations: [
    { target: "loading-states", type: "derived-from", note: "Splits one loading state into ordered regional ones." },
    { target: "skeleton-screens", type: "complementary-to", note: "Regions show skeletons until their data streams in." },
    { target: "component-state-management", type: "applied-in", note: "Each region runs its own async machine." },
    { target: "data-tables", type: "applied-in", note: "Pagination and virtualisation for large tables." },
    { target: "doherty-threshold", type: "related-to", note: "Earlier responses keep people engaged." },
    { target: "progressive-disclosure", type: "contrasts-with", note: "Disclosure defers information by choice; progressive loading defers it by network order." },
  ],

  practice: {
    dos: [
      { text: "Render the critical region in the shell and stream the rest behind boundaries ordered by need.", why: "React streams each boundary's HTML as it arrives {{src:react-suspense}}; useful content appears first.", kind: "platform" },
      { text: "Reserve space for every deferred element.", why: "Arriving content then causes no layout shift; good CLS ≤ 0.1 {{src:webdev-cls}}.", kind: "platform" },
      { text: "Expose totals and positions in virtualised grids with aria-rowcount and aria-rowindex.", why: "Off-screen rows are not in the DOM; the APG grid pattern describes these properties {{src:w3c-apg-grid}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't lazy-load the LCP image or anything in the initial viewport.", why: "It delays the most important content {{src:webdev-lazy-images}}; LCP should be ≤ 2.5 s {{src:webdev-lcp}}.", kind: "platform" },
      { text: "Don't move focus or scroll position as sections stream in.", why: "Unexpected changes of context disorient people [WCAG 2.2 SC 3.2.2, A] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't trap keyboard users in infinite lists.", why: "Content after the list must stay reachable [SC 2.1.1, A] {{src:w3c-wcag-22}}; offer 'Load more' or a skip link.", kind: "standard" },
    ],
    examples: [
      {
        title: "Streamed branch page: critical shell, Suspense regions, prioritised and lazy media",
        language: "ts",
        code: `// app/branches/[id]/page.tsx (server component)
import { Suspense } from "react";

export default async function BranchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const branch = await getBranch(id);                      // critical: blocks the shell
  return (
    <main>
      <h1>{branch.name}</h1>
      <img src={branch.photo} alt={branch.photoAlt} width={1200} height={600}
           fetchPriority="high" />                          {/* LCP element: never lazy */}
      <OpeningHours hours={branch.hours} />

      <Suspense fallback={<CalendarSkeleton />}>           {/* streamed region 1 */}
        <Events branchId={id} />                           {/* own empty + error states */}
      </Suspense>

      <section aria-labelledby="gallery-h">
        <h2 id="gallery-h">Gallery</h2>
        {branch.gallery.map((g) => (
          <img key={g.src} src={g.src} alt={g.alt} width={400} height={300}
               loading="lazy" decoding="async"
               style={{ backgroundImage: \`url(\${g.blurDataUrl})\`, backgroundSize: "cover" }} />
        ))}
      </section>

      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews branchId={id} page={1} />                 {/* paginated, not infinite */}
      </Suspense>
    </main>
  );
}`,
        caption: "Illustrative (Next.js App Router). The critical content and LCP image come first; regions stream in DOM order; off-screen images reserve space and load lazily over a blurred placeholder.",
      },
    ],
  },

  exercises: [
    {
      id: "progressive-loading-ex-rank",
      kind: "assignment",
      level: "beginner",
      title: "Rank the page",
      prompt: ["Take a content-heavy page you use. List its regions and rank them by what you need first. Mark which are visible without scrolling."],
      deliverable: "A ranked list with above-the-fold regions marked.",
      criteria: ["All regions listed", "Ranking justified", "Fold marked"],
    },
    {
      id: "progressive-loading-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix a page that waits for everything",
      prompt: [
        "Illustrative case. The branch page blocks on four requests and shows a full-page spinner for 3.8 s. The hero photo has loading=\"lazy\". Gallery images have no dimensions, so text jumps. Reviews use infinite scroll and keyboard users cannot reach the footer.",
        "Work through the correction sequence.",
      ],
      deliverable: "A phased loading plan with metrics and accessibility fixes.",
      criteria: ["Critical path defined", "LCP fixed", "CLS fixed", "Keyboard escape added"],
      exampleSolution: [
        "1. Symptoms: long blank wait, slow hero, jumping text, unreachable footer.",
        "2. Impact: visitors leave before seeing opening hours; misclicks during shifts; keyboard users trapped.",
        "3. Causes: all-or-nothing loading; lazy LCP image; unreserved image space; infinite list without exit.",
        "4. Requirements: LCP ≤ 2.5 s, CLS ≤ 0.1 (web.dev guidance); keyboard access [WCAG 2.2 SC 2.1.1, A]; meaningful sequence [SC 1.3.2, A].",
        "5. Correction: shell with heading, hero (fetchpriority high) and hours; events and reviews behind Suspense with skeletons; gallery lazy with width/height and blur-up; reviews paginated.",
        "6. Validation: field LCP/CLS at the 75th percentile; Resource Timing check; keyboard pass to the footer.",
        "7. Trade-off: more boundaries to maintain; group reviews and events into two boundaries only.",
      ],
    },
    {
      id: "progressive-loading-ex-virtual",
      kind: "reflection",
      level: "advanced",
      title: "Virtualise accessibly",
      prompt: ["A 40,000-row loan history must be browsable. Compare pagination and virtualisation for performance, find-in-page, screen readers, keyboard and sharing. Specify the ARIA and focus handling you would need for the virtualised version."],
      deliverable: "A comparison and an accessibility specification.",
      criteria: ["Trade-offs explicit", "aria-rowcount/rowindex used", "Focus kept on rendered rows"],
    },
  ],

  quiz: [
    {
      id: "progressive-loading-q-what",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does progressive loading change?",
      options: [
        { text: "The order in which content appears, so the most useful parts come first", correct: true, explanation: "Ordering by need." },
        { text: "The total amount of content", correct: false, explanation: "Content stays the same." },
        { text: "The design of the page", correct: false, explanation: "Layout stays; timing changes." },
        { text: "Nothing visible", correct: false, explanation: "People see content earlier." },
      ],
      explanation: "Load in order of need.",
    },
    {
      id: "progressive-loading-q-lcp",
      kind: "scenario",
      level: "intermediate",
      prompt: "The hero image at the top of the page has loading=\"lazy\". What should change?",
      options: [
        { text: "Remove lazy loading and give it high fetch priority", correct: true, explanation: "Don't lazy-load in-viewport or LCP images." },
        { text: "Keep it lazy to save data", correct: false, explanation: "It delays the largest content." },
        { text: "Replace it with a spinner", correct: false, explanation: "Does not help LCP." },
        { text: "Load it after all other images", correct: false, explanation: "The opposite of the priority it needs." },
      ],
      explanation: "Critical content loads first.",
    },
    {
      id: "progressive-loading-q-virtual",
      kind: "critique",
      level: "advanced",
      prompt: "A virtualised grid shows rows 200–230 of 40,000. What must assistive technology be told?",
      options: [
        { text: "The total row count (aria-rowcount) and each rendered row's position (aria-rowindex)", correct: true, explanation: "APG grid properties for hidden rows." },
        { text: "Nothing; screen readers count the DOM", correct: false, explanation: "The DOM holds only 30 rows." },
        { text: "Only the first row", correct: false, explanation: "Positions are needed for each rendered row." },
        { text: "A list of all 40,000 titles", correct: false, explanation: "Defeats virtualisation." },
      ],
      explanation: "Expose totals and positions.",
    },
  ],

  flashcards: [
    { id: "progressive-loading-fc-define", front: "Progressive loading", back: "Loading in priority order: critical shell first, sections as data streams, off-screen media when needed." },
    { id: "progressive-loading-fc-cwv", front: "Core Web Vitals targets (75th percentile)", back: "LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1." },
    { id: "progressive-loading-fc-lazy", front: "Lazy-loading rule", back: "Never lazy-load images in the initial viewport, especially the LCP image; use fetchpriority=high." },
    { id: "progressive-loading-fc-a11y", front: "Accessibility of phased content", back: "Announce meaningful completions (4.1.3), keep DOM order = reading order (1.3.2), never move focus (3.2.2), keep long lists escapable (2.1.1)." },
  ],

  references: [
    { source: "react-suspense", role: "primary", note: "Streaming SSR and Suspense boundaries." },
    { source: "webdev-lcp", role: "primary", note: "LCP threshold." },
    { source: "webdev-inp", role: "primary", note: "INP threshold." },
    { source: "webdev-cls", role: "primary", note: "CLS threshold." },
    { source: "webdev-lazy-images", role: "explanatory", note: "Do not lazy-load LCP images; fetchpriority." },
    { source: "mdn-lazy-loading", role: "explanatory", note: "loading attribute, Intersection Observer." },
    { source: "w3c-resource-timing", role: "standard", note: "PerformanceResourceTiming." },
    { source: "tanstack-virtual", role: "explanatory", note: "Headless virtualisation." },
    { source: "w3c-apg-grid", role: "explanatory", note: "aria-rowcount and aria-rowindex." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.3.2, 2.1.1, 3.2.2, 4.1.3." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Documented platform behaviour (React, MDN), Google's Core Web Vitals guidance (not a W3C standard), a W3C Candidate Recommendation Draft for Resource Timing, informative APG guidance and WCAG 2.2 criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
