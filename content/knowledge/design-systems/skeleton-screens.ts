import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "skeleton-screens",
  slug: "skeleton-screens",
  title: "Skeleton Screens",
  alternateNames: ["Skeleton loaders", "Content placeholders", "Ghost elements", "Shimmer placeholders"],
  summary:
    "Grey, wireframe-like placeholders that occupy the exact space of the content being loaded, so the page shows its structure at once, avoids layout shift and focuses attention on progress rather than on waiting.",
  definition:
    "A skeleton screen is a **layout-preserving form of the `loading` state**: placeholders with the size and arrangement of the final content are drawn immediately and replaced as content arrives. Luke Wroblewski described it in 2013 as 'essentially a blank version of a page into which information is gradually loaded', arguing that spinners make people watch the clock while skeletons focus attention on progress {{src:wroblewski-2013-spinner}}. NN/g describes skeletons as placeholders for full-page loads, suitable for waits under about 10 s {{src:nng-skeleton-screens}}.",
  primaryType: "pattern",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["skeleton screen", "placeholder", "shimmer", "perceived performance", "layout shift", "CLS", "reduced motion", "loading"],
  difficulty: "intermediate",
  disciplines: ["Interaction design", "Front-end engineering", "Performance"],
  learningObjectives: [
    "Decide when a skeleton fits better than a spinner or a progress bar.",
    "Build skeletons that match final dimensions so layout does not shift.",
    "Animate (or not) skeletons accessibly and efficiently.",
    "Expose skeleton loading to assistive technology without reading out placeholders.",
  ],
  prerequisites: ["loading-states", "component-state-management"],

  levels: {
    beginner: {
      explanation: [
        "When the library app's catalogue page loads, people see a white screen for two seconds and then everything pops in at once, with the cover images pushing the text down as they arrive. It feels slow and jumpy.",
        "A **skeleton screen** shows grey shapes where the book covers, titles and buttons will be, straight away. People can see the page has started and what it will look like. As each piece arrives it replaces its placeholder in the same spot, so nothing jumps.",
        "Skeletons work for short waits on whole pages or large sections. For a single button or a long upload, other indicators fit better.",
      ],
      analogy:
        "The outline of a jigsaw puzzle printed on the box lid: you can see the shape of the picture before the pieces are in place, and each piece drops into its own outline.",
      everydayExamples: [
        "A social feed showing grey post shapes before the posts load.",
        "A video site showing grey thumbnail boxes in a grid.",
        "A profile page with a grey circle where the photo will be.",
      ],
      vocabulary: [
        { term: "Skeleton screen", meaning: "Placeholders shaped like the final content, shown while it loads." },
        { term: "Placeholder", meaning: "A grey block that holds the space for a piece of content." },
        { term: "Shimmer", meaning: "A light sweep animated across placeholders to suggest activity." },
        { term: "Layout shift", meaning: "Content moving on the page as other content loads." },
        { term: "Perceived performance", meaning: "How fast something feels, as opposed to how fast it is measured." },
      ],
    },
    intermediate: {
      explanation: [
        "**When to use.** NN/g names three kinds — static content and image skeletons, animated skeletons, and frame-display skeletons — and recommends skeletons for full-page loads under about 10 s, spinners for single modules, and progress bars for anything over 10 s {{src:nng-skeleton-screens}}. Skeletons help people avoid concluding the site is broken and give them a mental model of the page's structure {{src:nng-skeleton-screens}}.",
        "**Match the final layout.** A skeleton that does not match the content trains wrong expectations and causes a jump when content arrives. Size each placeholder to the real element: fixed aspect ratios for images, one line per expected text line at the real line height, real button sizes. Good Cumulative Layout Shift is 0.1 or less {{src:webdev-cls}}; skeletons are one of the most direct ways to keep it there.",
        "**Keep it quiet.** Placeholders use a low-contrast neutral token; the page frame, navigation and headings render for real so people can orient and move on. Do not skeleton what you already have — static text and navigation should never be placeholders.",
        "**Motion.** A shimmer suggests activity but adds motion. Honour `prefers-reduced-motion` by showing static placeholders {{src:mdn-prefers-reduced-motion}}. A shimmer that starts automatically, runs more than five seconds and appears alongside other content needs a way to pause, stop or hide it unless it is essential [WCAG 2.2 SC 2.2.2, A] {{src:w3c-understanding-pause-stop-hide}} — in practice, stop the animation after a few cycles or when the wait grows long, and switch to a progress message.",
      ],
      howItWorks: [
        "Skeletons show progress in the place where content will appear, so attention goes to the page taking shape rather than to an abstract waiting signal {{src:wroblewski-2013-spinner}}.",
        "Because placeholders reserve exact space, arriving content replaces them without moving anything else, which avoids layout shift.",
      ],
      implementation: [
        "Use skeletons for page or large-section loads expected to finish within about 10 s; use inline indicators for modules and progress bars for long work {{src:nng-skeleton-screens}}.",
        "Give each placeholder the final element's dimensions or aspect ratio; reserve image space with `width`/`height` or `aspect-ratio`.",
        "Mark the loading region `aria-busy=\"true\"`, hide placeholders from assistive technology (`aria-hidden`), and announce 'Loading catalogue' once as a status message [SC 4.1.3, AA] {{src:w3c-understanding-status-messages}}.",
        "Animate the shimmer with `transform` or `opacity` on a pseudo-element, not by repainting backgrounds; disable it under reduced motion.",
        "Replace placeholders in reading order and remove `aria-busy` when the region is complete.",
      ],
      scenarios: [
        "**Illustrative.** The catalogue grid shows twelve cover placeholders at 2:3 aspect ratio with two text lines each; covers fade in in place. The visible jump of the text when covers arrive is gone.",
        "**Illustrative.** A slow branch-network connection keeps skeletons up for 15 s with a looping shimmer. The team stops the shimmer after about five seconds and adds 'Still loading — the branch network is slow' with a retry link.",
        "**Design review protocol.** Does the skeleton match the final layout at each breakpoint? Are frame, navigation and headings real? Is the shimmer off under reduced motion and does it stop on long waits? Are placeholders hidden from assistive technology with one announcement instead?",
      ],
    },
    advanced: {
      explanation: [
        "**State mapping.** Skeletons render only in `loading` before first data. On refetch with data present, keep the old content with an 'updating' marker instead of returning to skeletons — returning to placeholders discards what people were reading. Each region can have its own machine, so sections replace skeletons independently ([[progressive-loading]]).",
        "**Layout stability.** Layout shifts within 500 ms of discrete input are excluded from CLS, but load-time shifts count {{src:webdev-cls}}. Lock dimensions in CSS rather than measuring in JavaScript; web.dev recommends animating with `transform` instead of changing size or position properties, since transforms do not trigger layout shifts {{src:webdev-cls}}.",
        "**Rendering cost.** A shimmer implemented by animating `background-position` repaints every frame; translating a gradient pseudo-element with `transform` can be composited instead. Many simultaneous shimmers cost battery on low-end phones; one shared animation timeline or a static skeleton is cheaper.",
        "**Telemetry.** Measure time to first meaningful content per region, time spent in skeleton state (p95), regions that stay skeletal over 10 s, CLS at the 75th percentile, and abandonment during skeleton display.",
      ],
      evidence: [
        "The pattern is **practitioner knowledge**: Wroblewski's 2013 account of replacing spinners in Polar after users reported the app felt slower {{src:wroblewski-2013-spinner}} and NN/g's guidance {{src:nng-skeleton-screens}}. Claims about shorter *perceived* waits are practitioner reports here, not a cited controlled study. CLS thresholds and techniques come from web.dev documentation {{src:webdev-cls}}; motion requirements from WCAG 2.2 {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Shimmer or static?** Shimmer signals activity; static placeholders are calmer and need no motion handling.",
        "**Skeletons everywhere?** Overused skeletons for content that arrives in 100 ms produce a grey flash; for fast responses, render nothing new until the content is ready.",
      ],
      alternativeModels: [
        "**Spinners** for single modules and short waits ([[loading-states]]).",
        "**Low-quality placeholders** for images — blurred previews that occupy the same space ([[progressive-loading]]).",
      ],
    },
  },

  application: {
    summary: ["Skeletons suit feeds, grids, profile and detail pages, and dashboards — layouts whose structure is known before the data arrives."],
    web: ["CSS placeholders with fixed dimensions, aria-busy regions, a single status message and reduced-motion handling."],
    mobile: ["Native skeleton components per platform; avoid many simultaneous animated placeholders on low-end devices."],
    enterprise: ["Dashboards load widgets independently; each widget shows its own skeleton and error state."],
    services: ["Not applicable off screen; the principle (show the structure early) applies to multi-step forms."],
    steps: [
      "Identify page and section loads with known structure and waits under about 10 s.",
      "Design placeholders matching final dimensions at each breakpoint.",
      "Add aria-busy, hidden placeholders and one status message.",
      "Implement shimmer with transform or opacity, disabled under reduced motion and stopped on long waits.",
      "Measure CLS and time in skeleton state.",
    ],
  },

  whenToUse: [
    "Full-page or large-section loads with a predictable layout and waits under about 10 s.",
    "When content arriving in pieces would otherwise shift the layout.",
  ],
  whenNotToUse: [
    "For long or measurable work: show percent-done progress instead.",
    "For a single button or small module: an inline indicator is clearer.",
  ],
  advantages: [
    "Shows structure immediately and focuses on progress.",
    "Prevents layout shift when content arrives.",
    "Reduces the impression that the page is broken.",
  ],
  limitations: [
    "Gives no estimate of remaining time.",
    "Mismatched skeletons mislead and still cause shifts.",
    "Animated skeletons need motion and performance care.",
  ],
  misconceptions: [
    {
      myth: "A skeleton makes the page load faster.",
      reality:
        "It changes what people see while waiting, not the load time; practitioners report it can feel faster {{src:wroblewski-2013-spinner}}, but real performance still needs work.",
    },
  ],

  relations: [
    { target: "loading-states", type: "derived-from", note: "A layout-preserving form of the loading state." },
    { target: "progressive-loading", type: "complementary-to", note: "Skeletons are replaced region by region as data streams in." },
    { target: "component-state-management", type: "applied-in", note: "Skeletons belong to loading before first data." },
    { target: "visibility-of-system-status", type: "applied-in", note: "Shows the system is working." },
    { target: "doherty-threshold", type: "related-to", note: "Perceived responsiveness." },
    { target: "spacing-scales", type: "related-to", note: "Placeholders follow the same spacing and size tokens as content." },
  ],

  practice: {
    dos: [
      { text: "Size every placeholder to the final element, including image aspect ratios and text line heights.", why: "Reserved space prevents layout shift; good CLS is 0.1 or less {{src:webdev-cls}}.", kind: "platform" },
      { text: "Hide placeholders from assistive technology, mark the region aria-busy and announce loading once.", why: "Placeholders carry no information; status goes in a status message [WCAG 2.2 SC 4.1.3] {{src:w3c-understanding-status-messages}}.", kind: "standard" },
      { text: "Animate shimmer with transform or opacity and switch it off under prefers-reduced-motion.", why: "Transforms avoid layout work {{src:webdev-cls}}; reduced motion is a user preference {{src:mdn-prefers-reduced-motion}}.", kind: "platform" },
    ],
    donts: [
      { text: "Don't skeleton content you already have, such as navigation and headings.", why: "Real structure helps people orient and act while the rest loads.", kind: "industry" },
      { text: "Don't keep a looping shimmer running past five seconds alongside other content.", why: "WCAG 2.2 SC 2.2.2 (A) requires a way to pause, stop or hide it unless essential {{src:w3c-understanding-pause-stop-hide}}.", kind: "standard" },
      { text: "Don't return to skeletons on refetch when content is already shown.", why: "It discards what people were reading; show an 'updating' marker instead.", kind: "system" },
    ],
    examples: [
      {
        title: "Dimension-locked skeleton with composited shimmer, reduced motion and announcements",
        language: "css",
        code: `.skeleton { background: var(--skeleton-base); border-radius: var(--radius-sm); position: relative; overflow: hidden; }
.skeleton-cover { aspect-ratio: 2 / 3; inline-size: 100%; }          /* same ratio as real covers */
.skeleton-line  { block-size: 1lh; margin-block: calc((1lh - 0.75em) / 2); inline-size: 80%; }

.skeleton::after {                         /* shimmer on a pseudo-element, moved with transform */
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, var(--skeleton-highlight), transparent);
  transform: translateX(-100%);
  animation: skeleton-sweep 1.4s ease-in-out 3;   /* three sweeps, then still */
}
@keyframes skeleton-sweep { to { transform: translateX(100%); } }

@media (prefers-reduced-motion: reduce) {
  .skeleton::after { animation: none; display: none; }
}

/* markup
<section aria-labelledby="catalogue-h" aria-busy="true">
  <h2 id="catalogue-h">Catalogue</h2>                     real heading, not a placeholder
  <p role="status" class="sr-only">Loading catalogue</p>
  <ul aria-hidden="true"> …12 × <li><div class="skeleton skeleton-cover"></div> … </li> </ul>
</section> */`,
        caption: "Illustrative. Dimensions match the real cards; the shimmer stops after three sweeps and is absent under reduced motion; screen readers hear one status message.",
      },
    ],
  },

  exercises: [
    {
      id: "skeleton-screens-ex-compare",
      kind: "assignment",
      level: "beginner",
      title: "Spot the skeletons",
      prompt: ["Find two apps that use skeleton screens. With a slow connection (or by watching closely), compare the skeleton with the final page. Do the shapes match? Does anything jump?"],
      deliverable: "Two screenshots or sketches with mismatches marked.",
      criteria: ["Skeleton and final compared", "Shifts noted", "Kind of skeleton named"],
    },
    {
      id: "skeleton-screens-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Stop the jumping grid",
      prompt: [
        "Illustrative case. The catalogue skeleton shows square cover placeholders, but covers are 2:3, so text jumps when images load. The shimmer animates background-position on 36 placeholders forever. Screen readers announce 'blank' 36 times. The navigation is also a skeleton.",
        "Work through the correction sequence.",
      ],
      deliverable: "Corrected skeleton spec and test plan.",
      criteria: ["Dimensions fixed", "Motion handled", "AT experience fixed", "Real structure kept"],
      exampleSolution: [
        "1. Symptoms: jumping text, heavy animation, noisy screen-reader output, hidden navigation.",
        "2. Impact: misclicks during shifts; battery drain; screen-reader users flooded; nobody can navigate while loading.",
        "3. Causes: wrong aspect ratio; repainting animation with no end; placeholders exposed; over-skeletoning.",
        "4. Requirements: pause/stop/hide for loops over 5 s alongside content [WCAG 2.2 SC 2.2.2, A]; status messages [SC 4.1.3, AA]; CLS ≤ 0.1 target.",
        "5. Correction: 2:3 placeholders; transform-based shimmer limited to three sweeps and off under reduced motion; aria-hidden placeholders with one 'Loading catalogue' status; real navigation.",
        "6. Validation: CLS measurement; reduced-motion check; screen-reader pass; low-end device profiling.",
        "7. Trade-off: less 'lively' loading; calmer and more accessible.",
      ],
    },
    {
      id: "skeleton-screens-ex-refetch",
      kind: "reflection",
      level: "advanced",
      title: "Skeleton or stale content?",
      prompt: ["Design the state transitions for a catalogue that refetches when filters change. When should skeletons show, when should stale results stay with an 'updating' marker, and how is each announced?"],
      deliverable: "A state diagram with display rules.",
      criteria: ["First load vs refetch separated", "Announcements defined", "No skeleton over existing content"],
    },
  ],

  quiz: [
    {
      id: "skeleton-screens-q-what",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What is a skeleton screen?",
      options: [
        { text: "Placeholders shaped like the final content, shown while it loads", correct: true, explanation: "A blank version of the page that fills in." },
        { text: "A spinner in the centre of the page", correct: false, explanation: "That is an indeterminate indicator." },
        { text: "An error page", correct: false, explanation: "Not related." },
        { text: "A wireframe used in design reviews", correct: false, explanation: "It looks like one but is a runtime loading state." },
      ],
      explanation: "Skeletons preview the structure.",
    },
    {
      id: "skeleton-screens-q-when",
      kind: "scenario",
      level: "intermediate",
      prompt: "A report takes about 45 seconds and progress can be measured. Should you use a skeleton?",
      options: [
        { text: "No — use a percent-done indicator; skeletons suit waits under about 10 s", correct: true, explanation: "NN/g's guidance." },
        { text: "Yes, skeletons fit every wait", correct: false, explanation: "They give no time estimate." },
        { text: "Yes, with a faster shimmer", correct: false, explanation: "Speeding the animation does not inform." },
        { text: "Show nothing", correct: false, explanation: "Long waits need feedback." },
      ],
      explanation: "Choose by wait length.",
    },
    {
      id: "skeleton-screens-q-shimmer",
      kind: "critique",
      level: "advanced",
      prompt: "A shimmer animates background-position on dozens of placeholders indefinitely. What are the problems?",
      options: [
        { text: "It repaints every frame and loops past five seconds without a way to stop it, and ignores reduced motion", correct: true, explanation: "Performance, SC 2.2.2 and user preference." },
        { text: "None; shimmer is required", correct: false, explanation: "Static skeletons are valid." },
        { text: "It causes CLS", correct: false, explanation: "Background animation does not move layout." },
        { text: "It breaks keyboard navigation", correct: false, explanation: "Not directly." },
      ],
      explanation: "Use transform or opacity, stop the loop, respect preferences.",
    },
  ],

  flashcards: [
    { id: "skeleton-screens-fc-define", front: "Skeleton screen", back: "Placeholders matching the final layout, replaced in place as content loads (Wroblewski 2013)." },
    { id: "skeleton-screens-fc-when", front: "When to use a skeleton (NN/g)", back: "Full-page loads under about 10 s; spinners for single modules; progress bars over 10 s." },
    { id: "skeleton-screens-fc-cls", front: "Skeletons and CLS", back: "Match final dimensions so arriving content does not shift layout; good CLS ≤ 0.1." },
    { id: "skeleton-screens-fc-wcag", front: "WCAG for animated skeletons", back: "2.2.2 Pause, Stop, Hide (A) for loops over 5 s alongside content; 4.1.3 for the loading announcement; honour reduced motion." },
  ],

  references: [
    { source: "wroblewski-2013-spinner", role: "primary", note: "Origin account of skeleton screens." },
    { source: "nng-skeleton-screens", role: "primary", note: "Types, benefits, when to use." },
    { source: "webdev-cls", role: "explanatory", note: "CLS threshold and transform animations." },
    { source: "mdn-prefers-reduced-motion", role: "explanatory", note: "Reduced motion preference." },
    { source: "w3c-understanding-pause-stop-hide", role: "explanatory", note: "Loading animations and 2.2.2." },
    { source: "w3c-understanding-status-messages", role: "explanatory", note: "Status messages." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 2.2.2, 4.1.3." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Practitioner origin (Wroblewski 2013) and NN/g guidance; perceived-speed benefits are practitioner reports here. CLS from web.dev documentation; motion and status requirements from WCAG 2.2.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
