import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "loading-states",
  slug: "loading-states",
  title: "Loading States",
  alternateNames: ["Loading indicators", "Progress indicators", "Spinners", "Busy states", "Pending states"],
  summary:
    "What an interface shows while it waits for a result — chosen by how long the wait is likely to be, from no indicator at all, through a control's own busy state and a looping spinner, to a percent-done bar — and announced without stealing focus.",
  definition:
    "A loading state is the **`loading` (pending) state of the async model** in [[component-state-management]]: the request has started and no answer has arrived. Its design depends on the **expected wait**. Nielsen's three limits — about 0.1 s feels instantaneous, about 1 s keeps the flow of thought, about 10 s is the limit of attention — rest on Miller (1968) and Card et al. (1991) {{src:nielsen-1993-response-times}} {{src:miller-1968}} {{src:card-robertson-mackinlay-1991}}. NN/g maps them to indicators: looping animations for waits of about 2–10 s, which are distracting under 1 s, and percent-done indicators above 10 s {{src:nng-progress-indicators}}.",
  primaryType: "pattern",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["loading", "spinner", "progress bar", "percent-done", "response time", "optimistic UI", "aria-busy", "status message", "pending"],
  difficulty: "intermediate",
  disciplines: ["Interaction design", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Choose loading feedback from the expected wait using sourced response-time limits.",
    "Distinguish determinate from indeterminate indicators, and inline from page-level loading.",
    "Avoid flicker and spinner thrashing with delayed and minimum display times.",
    "Use optimistic updates with honest rollback, and announce progress accessibly.",
  ],
  prerequisites: ["visibility-of-system-status", "component-state-management"],

  levels: {
    beginner: {
      explanation: [
        "You press 'Renew' in the library app and nothing happens for three seconds. Did it work? Should you press again? Many people press twice, or leave.",
        "A **loading state** shows that the app heard you and is working. The right signal depends on how long the wait is. A tenth of a second needs nothing — it feels instant. Up to about a second, the button's own change (pressed look, 'Renewing…' label) is enough. For a few seconds, a spinner reassures you it is still working. For long tasks like uploading a file, a bar that fills up and says how much is left lets you decide whether to wait.",
        "Showing a spinner for something instant is also a problem: it flashes, distracts and makes the app feel slower.",
      ],
      analogy:
        "A restaurant: if your drink arrives at once, nobody needs to say anything. If the meal takes a while, a waiter saying 'about ten minutes' is better than silence — and much better than coming back every minute to say 'still cooking'.",
      everydayExamples: [
        "A 'Send' button that changes to 'Sending…' and cannot be pressed twice.",
        "A spinner while a map loads.",
        "An upload bar showing '45% — about 20 seconds left'.",
      ],
      vocabulary: [
        { term: "Loading state", meaning: "What the interface shows while waiting for a result." },
        { term: "Indeterminate indicator", meaning: "A looping spinner or bar that shows activity but not how long is left." },
        { term: "Determinate indicator", meaning: "A progress bar that shows how much is done and how much remains." },
        { term: "Inline loading", meaning: "Feedback on the control or section that is loading, not the whole page." },
        { term: "Optimistic update", meaning: "Showing the expected result immediately, and undoing it if the request fails." },
      ],
    },
    intermediate: {
      explanation: [
        "**Thresholds.** Nielsen's limits are about 0.1 s (no special feedback needed), about 1 s (flow of thought uninterrupted, though the delay is noticed) and about 10 s (attention limit; feedback and, for longer tasks, an indication of when it will finish) {{src:nielsen-1993-response-times}}. NN/g's indicator guidance: looped animations for actions of about 2–10 s, not for actions under 1 s because they are distracting, and percent-done indicators for 10 s or more {{src:nng-progress-indicators}}. This course reads the gap between 1 and 2 s as 'state only': keep the control's own busy state without adding a looping animation.",
        "**Determinate vs indeterminate.** Myers' early study found people preferred percent-done progress indicators {{src:myers-1985}}; NN/g recommends them for long waits because they show progress, how much is done and how much remains {{src:nng-progress-indicators}}. Use them when the work can be measured (bytes uploaded, items processed); use indeterminate indicators only when it cannot.",
        "**Scope.** Load where the user looked: an inline spinner in a card or button for module-level work, a skeleton for full-page loads ([[skeleton-screens]]) — NN/g suggests spinners for single modules and skeletons for full pages {{src:nng-skeleton-screens}}. Disable repeat submission while pending, but keep the control focusable and labelled ('Renewing…').",
        "**Microcopy.** Name the work ('Renewing your loan…', 'Uploading 3 of 12 photos'), never just 'Loading'; for long tasks say what people can do meanwhile.",
      ],
      howItWorks: [
        "Feedback closes the gulf of evaluation: people know their action registered, so they neither repeat it nor abandon it.",
        "Matching the indicator to the wait avoids both silence (anxiety, repeat clicks) and noise (flashing spinners for instant actions).",
      ],
      implementation: [
        "Estimate the wait for each action and pick the tier: none (≤ 0.1 s), control state only (< 2 s), looped (2–10 s), percent-done (> 10 s).",
        "Delay showing a spinner until the wait is long enough to need it, and once shown keep it visible for a short minimum so it does not flicker (values are product choices; test them).",
        "Prevent double submission in the state machine (ignore PRESS while pending), not only by disabling the button.",
        "Expose progress to assistive technology: `aria-busy` on the region being updated, a `progressbar` with `aria-valuenow` for determinate work, and status messages for start and finish without moving focus [WCAG 2.2 SC 4.1.3, AA] {{src:w3c-understanding-status-messages}}.",
        "Looping indicators that run more than five seconds alongside other content need a way to pause, stop or hide them, unless essential [SC 2.2.2, A] {{src:w3c-understanding-pause-stop-hide}}; honour `prefers-reduced-motion` {{src:mdn-prefers-reduced-motion}}.",
      ],
      scenarios: [
        "**Illustrative.** Renewing a loan usually takes 0.4–3 s. The button switches to 'Renewing…' immediately; a small inline spinner appears only if the request is still pending after a second; a status message announces 'Renewed until 2 December'.",
        "**Illustrative.** Importing a reading list of 2,000 titles takes about a minute. A percent-done bar with '640 of 2,000' and an estimate replaces a spinner that previously ran with no end in sight.",
        "**Design review protocol.** For each async action: what is the expected and worst-case wait? Which tier applies? Is repeat submission blocked in state, not just visually? Is progress announced? Does any animation loop beyond five seconds without a way to stop it?",
      ],
    },
    advanced: {
      explanation: [
        "**State mapping.** `idle → loading → success | error`. The visible indicator is a function of (state, elapsed time): `loading` with elapsed < delay shows only the control's busy state; after the delay, the inline indicator; past about 10 s, a percent-done bar if progress is measurable, otherwise an explanation and a way to continue in the background or cancel. Cancellation is a transition back to `idle`.",
        "**Spinner thrashing.** Fast, repeated requests (typeahead, filters) can show and hide spinners many times a second. Debounce the request, keep the previous results visible with a subtle 'updating' marker, and only replace them when new results arrive.",
        "**Optimistic UI.** For actions that almost always succeed, show the result at once and reconcile later. React's `useOptimistic` shows optimistic state while an Action is pending; if it fails, the UI returns to the previous value, and React's documentation pairs this with an error message {{src:react-use-optimistic}}. An optimistic update must roll back visibly and explain why — silent rollback looks like data loss.",
        "**Telemetry.** Measure time from action to result (p50 and p95), the share of actions that cross each threshold, repeat-press rates during pending, cancellations, and abandonment during long waits. Interaction to Next Paint (good at 200 ms or less) captures how quickly the page responds visually to input {{src:webdev-inp}}.",
      ],
      evidence: [
        "The time limits come from **classic HCI research**: Miller (1968) and Card, Robertson and Mackinlay (1991), as summarised by Nielsen (1993) {{src:miller-1968}} {{src:card-robertson-mackinlay-1991}} {{src:nielsen-1993-response-times}}; Myers (1985) studied percent-done indicators {{src:myers-1985}}. Indicator choices follow NN/g practitioner guidance {{src:nng-progress-indicators}}. The 1–2 s 'state only' band is this course's reading where the sources are silent. WCAG 2.2 criteria 2.2.2 and 4.1.3 are normative {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Optimistic or honest?** Optimistic UI feels fast but can mislead when failures are common; reserve it for reliable, reversible actions.",
        "**Disable or not?** Disabling a pending button prevents double submission but can remove it from focus order in some implementations; `aria-disabled` with ignored presses keeps it reachable.",
      ],
      alternativeModels: [
        "**Skeleton screens** for full-page loads ([[skeleton-screens]]).",
        "**Background jobs with notification** for very long work: let people leave and tell them when it is done.",
      ],
    },
  },

  application: {
    summary: ["Loading states apply to every asynchronous action: navigation, search, form submission, uploads, imports and data refreshes."],
    web: ["Inline busy states on controls, aria-busy on updated regions, progressbar for measurable work, role=status for start and end."],
    mobile: ["Network variance is higher; plan for the worst case and allow cancel or background completion."],
    enterprise: ["Long-running exports and imports need percent-done, cancel and notification on completion."],
    services: ["Phone and counter services face the same rule: say how long, or say what is happening."],
    steps: [
      "Measure or estimate wait times per action (typical and worst case).",
      "Assign a feedback tier per action.",
      "Implement the pending state in the state machine with ignored repeat events.",
      "Add delay and minimum display times; debounce rapid requests.",
      "Announce progress and completion; check animations against 2.2.2 and reduced motion.",
    ],
  },

  whenToUse: [
    "Any action whose result is not immediate.",
    "When people might repeat an action because they cannot tell it registered.",
  ],
  whenNotToUse: [
    "For actions that complete within about 0.1 s: an indicator only flickers.",
    "As a substitute for making slow things faster: feedback makes waits tolerable, not short.",
  ],
  advantages: [
    "Prevents repeat submissions and abandonment.",
    "Sets expectations for long tasks.",
    "Keeps assistive-technology users informed.",
  ],
  limitations: [
    "Thresholds are guidance, not exact cut-offs; real waits vary by network and device.",
    "Indeterminate indicators give no estimate and become stressful on long waits.",
    "Optimistic UI needs careful rollback design.",
  ],
  misconceptions: [
    {
      myth: "Every request should show a spinner.",
      reality:
        "Looped animations under about 1 s are distracting {{src:nng-progress-indicators}}; below about 0.1 s no feedback is needed {{src:nielsen-1993-response-times}}.",
    },
  ],

  relations: [
    { target: "component-state-management", type: "derived-from", note: "Loading is the pending state of the async machine." },
    { target: "visibility-of-system-status", type: "applied-in", note: "Loading feedback is heuristic 1 in practice." },
    { target: "doherty-threshold", type: "related-to", note: "Response-time expectations behind fast feedback." },
    { target: "skeleton-screens", type: "complementary-to", note: "The full-page form of loading feedback." },
    { target: "error-states", type: "related-to", note: "Long waits often end in timeouts." },
    { target: "progressive-loading", type: "complementary-to", note: "Loading in phases shortens perceived waits." },
  ],

  practice: {
    dos: [
      { text: "Pick feedback by expected wait: none ≤ 0.1 s, the control's own busy state under 2 s, a looping indicator for 2–10 s, percent-done beyond 10 s.", why: "Nielsen's limits and NN/g's indicator guidance {{src:nielsen-1993-response-times}} {{src:nng-progress-indicators}}.", kind: "industry" },
      { text: "Block repeat submission in the state machine and keep the control focusable with a 'Renewing…' label.", why: "Prevents duplicate side effects without removing the control from keyboard reach.", kind: "system" },
      { text: "Announce start and completion as status messages and mark updating regions with aria-busy.", why: "WCAG 2.2 SC 4.1.3 (AA) {{src:w3c-understanding-status-messages}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't flash a spinner for actions that usually finish in under a second.", why: "Looped animations under 1 s are distracting {{src:nng-progress-indicators}}; delay the indicator.", kind: "industry" },
      { text: "Don't run an indeterminate spinner for long, measurable work.", why: "Above 10 s people need to know how long is left {{src:nng-progress-indicators}}.", kind: "industry" },
      { text: "Don't loop an animation past five seconds alongside content without a way to stop it.", why: "WCAG 2.2 SC 2.2.2 Pause, Stop, Hide (A), unless essential {{src:w3c-understanding-pause-stop-hide}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Delayed inline indicator, announced status and ignored repeat presses",
        language: "ts",
        code: `"use client";
import { useEffect, useState } from "react";

const SHOW_AFTER_MS = 1000;   // product choice: below ~1 s the control's busy state is enough
const MIN_VISIBLE_MS = 400;   // product choice: avoid a flash once shown

export function useDelayedIndicator(pending: boolean) {
  const [visible, setVisible] = useState(false);
  const [shownAt, setShownAt] = useState(0);
  useEffect(() => {
    if (pending) {
      const t = setTimeout(() => { setVisible(true); setShownAt(Date.now()); }, SHOW_AFTER_MS);
      return () => clearTimeout(t);
    }
    if (!visible) return;
    const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt));
    const t = setTimeout(() => setVisible(false), wait);
    return () => clearTimeout(t);
  }, [pending, visible, shownAt]);
  return visible;
}

export function RenewControl({ state, onPress }: { state: "idle" | "pending" | "renewed" | "error"; onPress: () => void }) {
  const pending = state === "pending";
  const showSpinner = useDelayedIndicator(pending);
  return (
    <div aria-busy={pending || undefined}>
      <button type="button" className="btn btn-primary"
        aria-disabled={pending || undefined}
        onClick={() => { if (!pending) onPress(); }}>         {/* repeat presses ignored */}
        {pending ? "Renewing…" : "Renew"}
        {showSpinner && <span className="spinner" aria-hidden="true" />}
      </button>
      <p role="status" className="sr-only">{pending ? "Renewing your loan" : state === "renewed" ? "Loan renewed" : ""}</p>
    </div>
  );
}

/* CSS: @media (prefers-reduced-motion: reduce) { .spinner { animation: none; } } */`,
        caption: "Illustrative. Delay and minimum times are product decisions; the thresholds they serve come from the sources above.",
      },
      {
        title: "Determinate progress, exposed to assistive technology",
        language: "ts",
        code: `<div role="progressbar" aria-label="Importing reading list"
     aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}
     aria-valuetext={\`\${done} of \${total} titles\`}>
  <div className="bar" style={{ inlineSize: \`\${(done / total) * 100}%\` }} />
</div>
<p className="label">{done} of {total} titles · about {secondsLeft} s left</p>`,
        caption: "Illustrative. Use for measurable work longer than about 10 seconds.",
      },
    ],
  },

  exercises: [
    {
      id: "loading-states-ex-tiers",
      kind: "assignment",
      level: "beginner",
      title: "Time the waits",
      prompt: ["Time five actions in an app (search, save, open a page, upload, export). For each, note the wait and the feedback shown, and say whether it fits the tiers in this entry."],
      deliverable: "A table of actions, waits, feedback and verdicts.",
      criteria: ["Waits timed", "Tier assigned", "Mismatches explained"],
    },
    {
      id: "loading-states-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix the flashing spinner",
      prompt: [
        "Illustrative case. Every request in the library app shows a full-screen spinner, including filter changes that take 150 ms. The 'Export history' action takes about 40 s with the same spinner and no way to cancel. Screen readers announce nothing. People often press 'Renew' twice.",
        "Work through the correction sequence.",
      ],
      deliverable: "A tiered loading plan with accessibility and state changes.",
      criteria: ["Tiers applied", "Double press prevented", "Long task determinate", "Announcements added"],
      exampleSolution: [
        "1. Symptoms: flashing full-screen spinner; endless spinner on export; silent for screen readers; double renewals.",
        "2. Impact: the app feels slow; people abandon exports; screen-reader users unsure anything happened; duplicate side effects.",
        "3. Causes: one indicator for every wait; no progress measurement; no status messages; no pending state guard.",
        "4. Requirements: status messages [WCAG 2.2 SC 4.1.3, AA]; pause/stop/hide for long loops [SC 2.2.2, A].",
        "5. Correction: filters keep results visible with an 'Updating' marker; renew uses busy state plus a delayed inline spinner and ignores presses while pending; export shows percent-done, cancel and a notification on completion; role=status messages.",
        "6. Validation: throttle the network and check each tier; screen-reader pass; double-click test.",
        "7. Trade-off: more states to design; one shared loading component keeps it consistent.",
      ],
    },
    {
      id: "loading-states-ex-optimistic",
      kind: "reflection",
      level: "advanced",
      title: "Optimistic or not?",
      prompt: ["For 'Add to reading list', 'Renew loan' and 'Pay fine', decide whether to use optimistic updates. Consider failure rates, reversibility, side effects and how rollback would be shown and announced."],
      deliverable: "A decision table with rollback designs.",
      criteria: ["Failure and reversibility weighed", "Rollback visible and announced", "Payment handled conservatively"],
    },
  ],

  quiz: [
    {
      id: "loading-states-q-instant",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "An action finishes in about 0.05 seconds. What loading feedback is needed?",
      options: [
        { text: "None — it feels instantaneous", correct: true, explanation: "Around 0.1 s needs no special feedback." },
        { text: "A full-screen spinner", correct: false, explanation: "It would only flash." },
        { text: "A progress bar", correct: false, explanation: "There is nothing to measure." },
        { text: "A confirmation dialog", correct: false, explanation: "Unnecessary interruption." },
      ],
      explanation: "Match feedback to the wait.",
    },
    {
      id: "loading-states-q-long",
      kind: "scenario",
      level: "intermediate",
      prompt: "An export takes around 40 seconds and its progress can be measured. What fits best?",
      options: [
        { text: "A percent-done indicator with an estimate and a cancel option", correct: true, explanation: "Above 10 s, show progress and remaining time." },
        { text: "A looping spinner", correct: false, explanation: "Not recommended beyond 10 s." },
        { text: "No feedback", correct: false, explanation: "People will abandon or retry." },
        { text: "A skeleton screen", correct: false, explanation: "Skeletons suit page loads under 10 s." },
      ],
      explanation: "Long, measurable work needs a determinate indicator.",
    },
    {
      id: "loading-states-q-optimistic",
      kind: "critique",
      level: "advanced",
      prompt: "An optimistic 'Add to list' fails and the item silently disappears. What is missing?",
      options: [
        { text: "A visible, announced rollback explaining the failure and offering a retry", correct: true, explanation: "Rollback must be honest and perceivable." },
        { text: "Nothing; rollback is enough", correct: false, explanation: "Silent rollback looks like data loss." },
        { text: "A longer spinner", correct: false, explanation: "Optimistic UI does not show a spinner." },
        { text: "Reloading the page", correct: false, explanation: "Loses context." },
      ],
      explanation: "Optimistic updates need honest failure handling.",
    },
  ],

  flashcards: [
    { id: "loading-states-fc-limits", front: "Nielsen's response-time limits", back: "~0.1 s instantaneous; ~1 s flow of thought kept; ~10 s attention limit (Miller 1968; Card et al. 1991)." },
    { id: "loading-states-fc-nng", front: "NN/g indicator guidance", back: "Looped animation for ~2–10 s (distracting under 1 s); percent-done for 10 s or more." },
    { id: "loading-states-fc-types", front: "Determinate vs indeterminate", back: "Determinate shows how much is done and left; indeterminate only shows activity." },
    { id: "loading-states-fc-wcag", front: "WCAG 2.2 for loading", back: "4.1.3 Status Messages (AA); 2.2.2 Pause, Stop, Hide (A) for loops over 5 s alongside content, unless essential." },
  ],

  references: [
    { source: "nielsen-1993-response-times", role: "primary", note: "Three response-time limits." },
    { source: "miller-1968", role: "primary", note: "Origin of response-time analysis." },
    { source: "card-robertson-mackinlay-1991", role: "primary", note: "Time constants." },
    { source: "nng-progress-indicators", role: "primary", note: "Indicator choice by wait." },
    { source: "myers-1985", role: "explanatory", note: "Percent-done indicators." },
    { source: "nng-skeleton-screens", role: "explanatory", note: "Spinners for modules, skeletons for pages." },
    { source: "react-use-optimistic", role: "explanatory", note: "Optimistic state and rollback." },
    { source: "webdev-inp", role: "explanatory", note: "Responsiveness metric." },
    { source: "w3c-understanding-status-messages", role: "explanatory", note: "Status messages." },
    { source: "w3c-understanding-pause-stop-hide", role: "explanatory", note: "Loading animations and 2.2.2." },
    { source: "mdn-prefers-reduced-motion", role: "explanatory", note: "Reduced motion." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 2.2.2, 4.1.3." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Response-time limits come from classic HCI research summarised by Nielsen; indicator choice is NN/g practitioner guidance; the 1–2 s band is this course's reading. WCAG criteria are normative.",

  lab: "async-state-lab",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
