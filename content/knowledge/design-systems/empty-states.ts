import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "empty-states",
  slug: "empty-states",
  title: "Empty States",
  alternateNames: ["Empty state", "Zero state", "Blank slate", "No results state", "First-use state"],
  summary:
    "What a container shows when it has nothing to display — before first use, after a search finds nothing, after everything is done, or when access is blocked — designed to say why it is empty and what to do next.",
  definition:
    "An empty state is the **design of a container, panel or screen that has no content to show**. In the async state model of [[component-state-management]] it is a **sub-state of success**: the request resolved and returned zero items. It must be kept distinct from **idle/first-use** (nothing has been created yet), from **loading** (the answer is not in yet) and from **error** (the request failed), because each needs a different message and action. NN/g's guidance is to use empty states to communicate system status, provide learning cues and offer direct pathways for key tasks {{src:nng-empty-states}}.",
  primaryType: "pattern",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["empty state", "zero state", "no results", "blank slate", "onboarding", "first use", "status message", "call to action"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "UX writing", "Design systems"],
  learningObjectives: [
    "Tell apart first-use, no-results, cleared and blocked empty states, and design each.",
    "Place the empty state correctly in the async state model, separate from loading and error.",
    "Write empty-state copy that explains why and offers a next step.",
    "Announce empty results accessibly and measure whether people recover.",
  ],
  prerequisites: ["component-state-management", "visibility-of-system-status"],

  levels: {
    beginner: {
      explanation: [
        "A new member opens the library app's 'My loans' page and sees a white rectangle. Is the page still loading? Is something broken? Do they have no loans? Many people in that moment leave, or refresh, or contact support.",
        "An **empty state** is what a screen shows when there is nothing to list. A good one answers three questions: *what is this place for*, *why is it empty*, and *what can I do now*. For 'My loans' that might be: 'You have no books on loan. Browse the catalogue to borrow your first book', with a button to the catalogue.",
        "Empty does not always mean the same thing. A new user has nothing yet; a search found no matches; someone finished all their tasks; or they are not allowed to see the content. Each needs different words and a different next step.",
      ],
      analogy:
        "An empty shelf in a library with a small card that says 'New arrivals go here — see what's coming next week'. Without the card, an empty shelf looks like a mistake.",
      everydayExamples: [
        "An inbox that says 'All caught up' with a small illustration.",
        "A search page that says 'No results for \"middlemarch 1st edtion\" — check the spelling or remove filters'.",
        "A new app's dashboard that offers a 'Create your first project' button.",
      ],
      vocabulary: [
        { term: "Empty state", meaning: "What a container shows when it has no content." },
        { term: "First-use state", meaning: "The empty state before the person has created or added anything." },
        { term: "No-results state", meaning: "The empty state after a search or filter finds nothing." },
        { term: "Cleared state", meaning: "The empty state after the person has completed or removed everything." },
        { term: "Call to action", meaning: "The button or link that offers the next step." },
      ],
    },
    intermediate: {
      explanation: [
        "**Four kinds, four messages.** *First use*: explain the value and offer the creating action. *No results*: repeat the query, suggest fixes (spelling, fewer filters) and offer to clear filters. *Cleared*: confirm success ('All renewals done') and, if useful, what happens next. *Blocked*: explain the permission or setting and who can change it. NN/g's examples include unconfigured favourites, alerts and dashboards, and searches that return nothing {{src:nng-empty-states}}.",
        "**Status, learning, pathway.** Totally empty containers cause confusion about whether the system is working, so the empty state should say what happened {{src:nng-empty-states}}. In-context learning cues shown when people start a task are generally more successful than forced tutorials {{src:nng-empty-states}}, and connect to the help ladder in [[help-and-documentation]]. A direct pathway — the button that starts the key task — turns a dead end into a next step {{src:nng-empty-states}}.",
        "**Layout and copy.** Keep empty states inside the container's normal frame and size, so the page does not jump when content appears. Lead with a short heading that states the situation, one sentence of reason or guidance, and one primary action; an illustration is optional and must not push the action below the fold. Use the same component for every empty state in the system, with slots for heading, body, action and image.",
      ],
      howItWorks: [
        "An empty state replaces ambiguity (loading? broken? nothing?) with a definite status and a next step, closing the gulf of evaluation and preventing abandonment.",
        "Because it is a branch of the success state, the component can only show it after data has arrived — so it never appears during loading or instead of an error.",
      ],
      implementation: [
        "Model it in the async state: `success` with `items.length === 0` → empty; `idle` before first use → first-use; `error` never shows an empty state.",
        "Write one heading, one sentence and one primary action per kind; repeat the search query in no-results states.",
        "Offer a way out that works: 'Clear filters' must actually restore results.",
        "Announce result counts, including zero, as status messages without moving focus [WCAG 2.2 SC 4.1.3, AA]; the W3C's examples include 'No results returned' {{src:w3c-understanding-status-messages}}.",
        "Keep any illustration decorative (empty `alt`) unless it carries information [SC 1.1.1, A] {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** The library app's 'My loans' page showed nothing for new members and nothing when the loans service failed. Splitting the two — a first-use empty state with 'Browse the catalogue', and an error banner with 'Try again' — means members no longer read an outage as 'my loans have disappeared'.",
        "**Illustrative.** A catalogue search with three filters returns nothing. The no-results state repeats the query, lists the active filters as removable chips, and offers 'Search all branches'.",
        "**Design review protocol.** For every list or panel: what does it show before first use, with no results, when cleared, and when access is blocked? Is each distinct from loading and error? Is there a working next step? Is the zero count announced?",
      ],
    },
    advanced: {
      explanation: [
        "**State mapping.** In the unified machine — `idle → loading → success | error`, with `success` branching to `populated` or `empty` — the empty branch is decided by data, never by a timeout. A failed request with a cached empty list must show the error, not 'No loans', or people will believe their data is gone. Cleared states follow a user action (last item removed) and may offer undo.",
        "**Telemetry.** Signals to investigate: zero-result rate per query and filter combination (high rates reveal vocabulary or index problems); recovery rate (share of empty-state views followed by a click on its action or a query change); abandonment after empty states; and first-use completion (share of first-use views followed by the first item being created). Track kinds separately — a high 'cleared' rate is good news, a high 'no results' rate is not.",
        "**Accessibility contract.** The heading should be a real heading in the page outline [SC 1.3.1, A]; the result count lives in a `role=\"status\"` region that exists before results change, so assistive technologies announce the update [SC 4.1.3, AA] {{src:w3c-understanding-status-messages}}; focus stays on the search field so people can refine the query.",
      ],
      evidence: [
        "Guidance rests on **practitioner research and documented practice**: NN/g's empty-state guidelines {{src:nng-empty-states}} and the heuristics of system status and help {{src:nng-visibility-system-status}} {{src:nng-help-documentation}}. Announcing zero results is an example given in the W3C's informative Understanding document for SC 4.1.3 {{src:w3c-understanding-status-messages}}. No controlled study of empty-state designs was cited here; the scenarios are illustrative.",
      ],
      debates: [
        "**Illustrations or not?** Illustrations add warmth but take space and attention; in dense tools a short line of text may serve better.",
        "**Pre-filled sample content?** Sample data teaches by example but can be mistaken for real data and must be clearly labelled and removable.",
      ],
      alternativeModels: [
        "**Starter templates** — instead of an empty canvas, offer templates to pick from.",
        "**Hide the container** — when a panel has nothing to show and no action, removing it can be clearer than an empty state.",
      ],
    },
  },

  application: {
    summary: ["Empty states apply to every list, table, search result, dashboard widget, inbox and feed."],
    web: ["One EmptyState component with heading, body, action and optional image; results count in a persistent status region."],
    mobile: ["Keep the action reachable within thumb range; avoid full-screen illustrations that hide the action."],
    enterprise: ["Dashboards often start empty after setup; first-use states should link to configuration and documentation."],
    services: ["Printed or email summaries with nothing to report should still say so ('No loans due this week')."],
    steps: [
      "List every container that can be empty and which of the four kinds applies.",
      "Map each to the async state model so empty never replaces loading or error.",
      "Write heading, reason and one action for each kind.",
      "Add a status message for result counts and keep focus in place.",
      "Measure zero-result and recovery rates and refine.",
    ],
  },

  whenToUse: [
    "Any container whose content depends on user data, configuration or a query.",
    "When first-time users would otherwise see a blank screen.",
  ],
  whenNotToUse: [
    "Instead of an error state: a failed request must say it failed.",
    "As a sales banner: an empty state that pushes unrelated promotions hides the real next step.",
  ],
  advantages: [
    "Removes uncertainty about whether the system works.",
    "Teaches in context and shortens the path to the first task.",
    "Reveals search and content gaps through telemetry.",
  ],
  limitations: [
    "Each kind needs its own copy and maintenance.",
    "Too much illustration and text can make empty states heavier than the content they replace.",
  ],
  misconceptions: [
    {
      myth: "An empty list and a failed request can share the same message.",
      reality:
        "They are different states: empty is a successful answer with zero items; failure is an error that needs a retry. Merging them makes people think their data is gone.",
    },
  ],

  relations: [
    { target: "component-state-management", type: "derived-from", note: "Empty is the zero-item branch of the success state." },
    { target: "visibility-of-system-status", type: "applied-in", note: "Empty states tell people the system worked and found nothing." },
    { target: "help-and-documentation", type: "applied-in", note: "First-use states carry in-context learning cues." },
    { target: "loading-states", type: "contrasts-with", note: "Loading has no answer yet; empty has an answer of zero items." },
    { target: "error-states", type: "contrasts-with", note: "A failure must never be shown as empty." },
    { target: "empty-state-writing", type: "complementary-to", note: "The microcopy of empty states." },
  ],

  practice: {
    dos: [
      { text: "Distinguish first-use, no-results, cleared and blocked states, each with its own heading and one primary action.", why: "Empty states should communicate status, teach in context and offer a direct pathway {{src:nng-empty-states}}.", kind: "industry" },
      { text: "Show empty only from the success branch of the async state.", why: "A failed or unfinished request shown as 'nothing here' makes people think their data is lost.", kind: "system" },
      { text: "Announce result counts, including zero, in a status region without moving focus.", why: "WCAG 2.2 SC 4.1.3 (AA); 'No results returned' is a W3C example {{src:w3c-understanding-status-messages}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't leave a container blank.", why: "Totally empty states cause confusion about whether the system is working {{src:nng-empty-states}}.", kind: "industry" },
      { text: "Don't offer an action that cannot succeed, such as 'Clear filters' when no filters are set.", why: "A dead-end action breaks trust and wastes the one moment of attention.", kind: "context" },
      { text: "Don't move focus to the empty-state message after a search.", why: "People lose their place in the query field; announce instead [SC 4.1.3].", kind: "standard" },
    ],
    examples: [
      {
        title: "Unified async result with an empty branch and an announced count",
        language: "ts",
        code: `type Result<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; items: T[] }
  | { status: "error"; message: string; retry: () => void };

export function SearchResults({ query, result }: { query: string; result: Result<Book> }) {
  const count = result.status === "success" ? result.items.length : null;
  return (
    <section aria-labelledby="results-h">
      <h2 id="results-h">Results</h2>
      <p role="status" className="label">               {/* exists before results change */}
        {result.status === "loading" ? "Searching…" : count === null ? "" : \`\${count} results for “\${query}”\`}
      </p>
      {result.status === "error" && <ErrorBanner message={result.message} onRetry={result.retry} />}
      {result.status === "success" && count === 0 && (
        <EmptyState
          heading={\`No books match “\${query}”\`}
          body="Check the spelling, or search every branch."
          action={<a className="btn btn-primary" href={\`/search?q=\${encodeURIComponent(query)}&branch=all\`}>Search all branches</a>}
        />
      )}
      {result.status === "success" && count! > 0 && <BookList items={result.items} />}
    </section>
  );
}`,
        caption: "Illustrative. Empty is reachable only from success; errors have their own banner; the count, including zero, is announced.",
      },
    ],
  },

  exercises: [
    {
      id: "empty-states-ex-audit",
      kind: "assignment",
      level: "beginner",
      title: "Find the blanks",
      prompt: ["In an app you use, find three places that can be empty. For each, write what it shows today and a better heading, sentence and action."],
      deliverable: "Three before/after empty states.",
      criteria: ["Kind identified", "Reason stated", "One working action"],
    },
    {
      id: "empty-states-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Repair 'My loans'",
      prompt: [
        "Illustrative case. The library app's 'My loans' shows 'No loans' both for new members and when the loans service times out. Searches with no matches show a blank list. The empty state has a large illustration that pushes the only button below the fold on phones.",
        "Work through the correction sequence.",
      ],
      deliverable: "Separated states, copy and an accessibility plan.",
      criteria: ["Error separated from empty", "Kinds distinguished", "Action visible", "Status announced"],
      exampleSolution: [
        "1. Symptoms: 'No loans' during outages; blank searches; hidden action.",
        "2. Impact: members believe loans vanished; searchers think the site is broken; phone users cannot act.",
        "3. Causes: empty shown on any non-populated result; no no-results design; oversized illustration.",
        "4. Requirements: results and status announced without focus [WCAG 2.2 SC 4.1.3, AA]; errors identified in text [SC 3.3.1, A] for the outage.",
        "5. Correction: error banner with retry for failures; first-use state with 'Browse the catalogue'; no-results state repeating the query; small illustration above the fold or none.",
        "6. Validation: simulate timeout, zero loans and zero results; screen-reader check of announcements; 390 px check.",
        "7. Trade-off: three components instead of one message; shared EmptyState component limits the cost.",
      ],
    },
    {
      id: "empty-states-ex-metrics",
      kind: "reflection",
      level: "advanced",
      title: "Instrument empty states",
      prompt: ["Define events and metrics to tell whether empty states help: zero-result rate, recovery rate and first-use completion. Say how you would separate good empties (cleared) from bad ones (no results)."],
      deliverable: "An event schema and three metric definitions.",
      criteria: ["Kinds tracked separately", "Recovery defined", "Decision rule stated"],
    },
  ],

  quiz: [
    {
      id: "empty-states-q-why",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What should a good empty state tell people?",
      options: [
        { text: "Why the space is empty and what they can do next", correct: true, explanation: "Status plus a next step." },
        { text: "Nothing; empty space is cleaner", correct: false, explanation: "Blank containers cause confusion." },
        { text: "Only an illustration", correct: false, explanation: "An image alone does not explain or offer action." },
        { text: "A list of all features", correct: false, explanation: "Too much; one next step is enough." },
      ],
      explanation: "Explain and offer a next step.",
    },
    {
      id: "empty-states-q-error",
      kind: "scenario",
      level: "intermediate",
      prompt: "The loans request times out. What should 'My loans' show?",
      options: [
        { text: "An error message with a retry, not 'You have no loans'", correct: true, explanation: "Failure is an error state, not empty." },
        { text: "'You have no loans'", correct: false, explanation: "That misreports a failure as data." },
        { text: "A spinner forever", correct: false, explanation: "The request has failed; say so." },
        { text: "A blank page", correct: false, explanation: "Nothing explains what happened." },
      ],
      explanation: "Empty only comes from success.",
    },
    {
      id: "empty-states-q-a11y",
      kind: "critique",
      level: "advanced",
      prompt: "After a search returns zero results, focus jumps to the 'No results' heading. What is better?",
      options: [
        { text: "Keep focus in the search field and announce the count in a status region", correct: true, explanation: "SC 4.1.3: status without moving focus." },
        { text: "Show an alert dialog", correct: false, explanation: "Interrupts and moves focus." },
        { text: "Reload the page", correct: false, explanation: "Loses context." },
        { text: "Say nothing", correct: false, explanation: "Screen-reader users miss the result." },
      ],
      explanation: "Announce, don't move focus.",
    },
  ],

  flashcards: [
    { id: "empty-states-fc-kinds", front: "Four kinds of empty state", back: "First use, no results, cleared (done), blocked (permission or setting)." },
    { id: "empty-states-fc-model", front: "Where empty sits in the async model", back: "A branch of success: the request resolved with zero items. Never during loading, never instead of error." },
    { id: "empty-states-fc-nng", front: "NN/g's three empty-state uses", back: "Communicate system status, provide learning cues, provide direct pathways for key tasks." },
    { id: "empty-states-fc-wcag", front: "WCAG for empty results", back: "4.1.3 Status Messages (AA): announce 'No results returned' without moving focus." },
  ],

  references: [
    { source: "nng-empty-states", role: "primary", note: "Three guidelines; typical empty scenarios." },
    { source: "nng-visibility-system-status", role: "explanatory", note: "Heuristic 1." },
    { source: "nng-help-documentation", role: "explanatory", note: "Heuristic 10, in-context help." },
    { source: "w3c-understanding-status-messages", role: "explanatory", note: "'No results returned' example." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.1.1, 1.3.1, 3.3.1, 4.1.3." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Practitioner research (NN/g) and documented practice; status-message announcement from WCAG 2.2 and its informative Understanding document. No controlled study of empty-state designs is cited; scenarios are illustrative.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
