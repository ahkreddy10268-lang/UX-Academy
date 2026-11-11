import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "user-control-and-freedom",
  slug: "user-control-and-freedom",
  title: "User Control and Freedom",
  alternateNames: ["Usability heuristic #3", "Emergency exit", "Undo and redo", "Provide clearly marked exits"],
  summary:
    "People take wrong turns, so an interface should always offer a clearly marked way back — cancel, close, back and undo — that works quickly and without penalty.",
  definition:
    "User control and freedom is the principle that people should be able to **leave an unwanted state and reverse an action** easily: a clearly marked 'emergency exit', and support for undo and redo {{src:nielsen-ten-heuristics-article}}. NN/g summarises it as letting users quickly correct mistakes or backtrack on choices {{src:nng-user-control-freedom}}. It is the third of Nielsen's ten heuristics. It does not mean every action must be reversible; it means people should know which actions are, and be protected where they are not.",
  primaryType: "principle",
  secondaryTypes: ["heuristic"],
  domain: "heuristics",
  subcategory: "heuristic-sets",
  tags: ["undo", "redo", "cancel", "back button", "dialogs", "keyboard", "heuristics"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "UI design", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Explain why people need exits and undo, and how they reduce the cost of exploring.",
    "Choose between undo, confirmation and prevention for a given action.",
    "Design Back, Cancel, Close and Undo so they behave as people expect, including in overlays.",
    "Specify keyboard, focus and timing behaviour so no one is trapped.",
  ],
  prerequisites: ["nielsen-usability-heuristics"],

  levels: {
    beginner: {
      explanation: [
        "Everyone presses the wrong thing sometimes: the wrong menu, the wrong file, the wrong date. What matters is what happens next. If the way back is obvious and cheap, the slip costs a second. If it is hidden or missing, people lose work, or stop exploring because every click feels risky.",
        "User control and freedom asks for two things. First, an **emergency exit**: a clearly marked way out of anything people did not mean to start, such as Cancel, Close or Back. Second, **undo**: a way to reverse what was just done, and redo if they change their mind again.",
        "When people trust that they can get back, they explore more and learn faster. When they cannot, even a small mistake can make them abandon the task.",
      ],
      analogy:
        "The return path on a hiking map. You can try a side trail because you know exactly how to get back to the main route. Without it, most people would stay on the path they already know.",
      everydayExamples: [
        "Ctrl+Z or ⌘Z in a text editor.",
        "An email app's 'Undo send' option for a few seconds after sending.",
        "A clear Cancel button on a checkout step.",
        "Pressing Escape to close a dialog and return to where you were.",
      ],
      vocabulary: [
        { term: "Emergency exit", meaning: "A clearly marked way to leave a state you did not want, such as Cancel or Close." },
        { term: "Undo / redo", meaning: "Reversing the last action, and re-applying it after an undo." },
        { term: "Cancel vs close", meaning: "Cancel abandons a change; close leaves a view without implying anything is lost." },
        { term: "Destructive action", meaning: "An action that deletes or overwrites something, such as Delete or Replace." },
        { term: "Keyboard trap", meaning: "A place keyboard users can move into but not out of." },
      ],
    },
    intermediate: {
      explanation: [
        "NN/g's guidance turns the heuristic into specific checks {{src:nng-user-control-freedom}}: people should always be able to go back where they came from; do not disable the browser Back button; if Back would lose form data, warn first. Overlays cause a common failure: people who think an overlay is a new page press Back and lose two steps, so Back should close such overlays. Exit links should be visible, placed where people expect and labelled with text, not only an icon. Cancel should be quick, and an X that could mean either Close or Cancel should be avoided.",
        "Undo deserves particular care. Multi-level undo and redo help people who work for long periods; keyboard shortcuts help experts. Undo must also be **discoverable**: hiding it in a gesture or a snackbar that disappears in three seconds leaves most people without it {{src:nng-user-control-freedom}}.",
        "Undo, confirmation and prevention are alternatives with different costs. Undo keeps routine actions fast and fixes errors afterwards; confirmation adds friction to every use to catch rare errors; prevention removes the possibility of the error. Frequent, reversible actions favour undo; rare, irreversible ones may need confirmation as well.",
      ],
      howItWorks: [
        "Reversibility lowers the cost of trying something. When the cost of a wrong choice is near zero, people can learn by doing; NN/g notes that being able to undo recent actions helps people feel secure enough to experiment with unfamiliar features {{src:nng-user-mistakes}}.",
        "Exits work only when people can find them in the moment they need them: when they realise they are somewhere unexpected, attention is on the problem, not on hunting for a control. That is why placement and labels follow convention.",
      ],
      implementation: [
        "Give every flow and overlay a visible, text-labelled exit, and make Escape close dialogs and return focus to the control that opened them {{src:w3c-aria-apg}}.",
        "Make sure keyboard focus can always move away from any component using standard keys [WCAG 2.2 SC 2.1.2 No Keyboard Trap, A] {{src:w3c-wcag-22}}.",
        "Let people abort a pointer action by moving away before release, so a mis-press can be cancelled [WCAG 2.2 SC 2.5.2 Pointer Cancellation, A] {{src:w3c-wcag-22}}.",
        "Do not change context just because a setting changed; let people confirm the change [WCAG 2.2 SC 3.2.2 On Input, A] {{src:w3c-wcag-22}}.",
        "Where a time limit applies, let people turn it off, adjust it or extend it [WCAG 2.2 SC 2.2.1 Timing Adjustable, A] {{src:w3c-wcag-22}}.",
        "For legal, financial or data-changing submissions, make them reversible, checked or confirmed [WCAG 2.2 SC 3.3.4 Error Prevention (Legal, Financial, Data), AA] {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** A library app's 'Remove from reading list' deletes immediately with no way back. Replacing it with immediate removal plus an 'Undo' message that stays until dismissed, and Ctrl+Z support, keeps the action fast and makes mistakes cheap.",
        "**Illustrative.** A photo lightbox opens as an overlay. People press the phone's Back gesture to close it and land on the previous page. Making Back close the overlay first matches what they expected.",
        "**Critique protocol.** For every screen in a flow, ask: How do I leave without saving? How do I undo the last action? Does Escape work? Does Back do what I expect? Can I leave this component with the keyboard? Record any 'no' as a finding.",
      ],
    },
    advanced: {
      explanation: [
        "In a design system, control and freedom becomes a **state model with reversible transitions**. Each component documents which actions are reversible, how (undo, cancel, restore from trash), for how long, and what happens to focus. Destructive actions get their own semantic tokens and variants (for example a danger button) so they are recognisable across products, and their undo affordance is part of the component contract rather than an afterthought.",
        "Undo has an architecture. The common approach is to record each change as a command with an inverse, kept on an undo stack and a redo stack, or to defer the real deletion: remove the item from view, show Undo, and commit the deletion only when the undo window closes. Deferred commits make undo trivial but complicate consistency across devices; true inverse operations scale to multi-level undo but need careful design for operations that touch shared data.",
        "Accessibility requirements make the heuristic testable: no keyboard traps, Escape and focus return in dialogs, pointer cancellation, adjustable time limits and reversible high-stakes submissions are all WCAG 2.2 criteria or APG patterns {{src:w3c-wcag-22}} {{src:w3c-aria-apg}}.",
        "Control can be measured. Useful signals are how often undo is used and for which actions (a high rate suggests the action is easy to trigger by mistake), cancellations at each step of a flow, Back presses that leave a flow, and support requests to restore deleted items. These indicate where people are losing control; they do not say why without research.",
      ],
      evidence: [
        "The heuristic is professional guidance. 'Provide clearly marked exits' was in Nielsen and Molich's original 1990 principles {{src:molich-nielsen-1990}}, and NN/g's recommendations come from observing people in usability tests, not from controlled experiments {{src:nng-user-control-freedom}}. The accessibility requirements are WCAG 2.2 success criteria, which are normative {{src:w3c-wcag-22}}. The benefit of undo for exploration is widely reported but has not been measured for specific products here.",
      ],
      debates: [
        "**Undo or confirm?** Confirmation dialogs protect against rare errors but, when shown for routine actions, people learn to click through them without reading. Undo is often the better default; confirmation remains appropriate for actions that cannot be undone.",
        "**How long should undo last?** A short-lived snackbar is easy to miss; a permanent trash or version history is more forgiving but costs storage and complexity.",
        "**Control vs simplicity.** Every exit and option adds interface. Products for novices sometimes remove choices deliberately; the test is whether people can still get out of states they did not choose.",
      ],
      alternativeModels: [
        "**Shneiderman's 'permit easy reversal of actions'** expresses the same idea as one of his golden rules, emphasising that reversibility encourages exploration.",
        "**Error prevention** reduces the need for exits by making unwanted states harder to enter; the two work together.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Rolf Molich"],
    period: "1990 ('provide clearly marked exits'); 1994 ('user control and freedom')",
    problem:
      "Systems often trapped people in modes, dialogs or sequences they had entered by mistake, with no obvious or safe way out.",
    narrative: [
      "Nielsen and Molich's 1990 principles included 'provide clearly marked exits' {{src:molich-nielsen-1990}}.",
      "Nielsen's 1994 revision, derived from real usability problems, named the heuristic user control and freedom, adding support for undo and redo {{src:nielsen-1994-heuristics}} {{src:nielsen-ten-heuristics-article}}.",
    ],
  },

  application: {
    summary: [
      "The heuristic applies wherever people can enter a state by mistake or change something they might regret: multi-step flows, dialogs and overlays, editing, deleting, settings, subscriptions and anything with a time limit.",
    ],
    web: [
      "Keep the browser Back button working; make it close overlays that look like pages; warn before Back discards form input.",
      "Make Escape close dialogs and menus and return focus to where it was.",
    ],
    mobile: [
      "Respect the platform's back gesture and button; never trap people in a full-screen flow without a visible way out.",
    ],
    enterprise: [
      "Provide multi-level undo, version history and restore for data people edit over long sessions; bulk actions need undo or a preview.",
    ],
    services: [
      "Cancelling a subscription or booking should be as easy as starting it; making exit deliberately hard is a deceptive pattern.",
    ],
    steps: [
      "List every action that changes or deletes something and every state people can enter.",
      "For each, decide: prevent, undo, or confirm (only when it cannot be undone).",
      "Give every flow, dialog and overlay a visible, labelled exit and keyboard escape.",
      "Specify undo duration, scope and focus behaviour in the component contract.",
      "Test with keyboard only and with the browser or system back control.",
      "Track undo use, cancellations and restore requests to find risky actions.",
    ],
  },

  whenToUse: [
    "Any flow, dialog, editor or setting where people can act by mistake or change their mind.",
    "Design reviews of destructive actions and of cancellation paths.",
  ],
  whenNotToUse: [
    "As a reason to add confirmation dialogs to routine actions; use undo instead, and keep confirmation for what cannot be undone.",
    "As a promise of reversibility the system cannot keep (sent payments, published messages): be explicit that the action is final and confirm it instead.",
  ],
  advantages: [
    "Makes mistakes cheap, which encourages exploration and learning.",
    "Reduces abandonment and support requests after errors.",
    "Many parts are testable through WCAG 2.2 and keyboard checks.",
  ],
  limitations: [
    "Undo is costly to build for shared data and long-running operations.",
    "Exits and options add interface; too many dilute the primary path.",
    "The heuristic does not say how long reversibility should last; that depends on the action.",
  ],
  misconceptions: [
    {
      myth: "A confirmation dialog gives users control.",
      reality:
        "It adds a step before the action but no way back after it. For reversible actions, undo gives more control with less friction; confirmation is for actions that cannot be undone.",
    },
    {
      myth: "Disabling Back keeps people in the flow.",
      reality:
        "It traps them. NN/g advises never disabling the browser Back button and warning instead when Back would lose data {{src:nng-user-control-freedom}}.",
    },
  ],

  relations: [
    { target: "nielsen-usability-heuristics", type: "derived-from", note: "Heuristic 3 of Nielsen's ten usability heuristics." },
    { target: "shneiderman-golden-rules", type: "complementary-to", note: "Shneiderman's 'permit easy reversal of actions' covers the same ground." },
    { target: "error-prevention", type: "complementary-to", note: "Prevention reduces how often people need an exit; control makes the remaining errors cheap." },
    { target: "error-recovery", type: "related-to", note: "Recovery helps people fix a failure; control lets them back out of their own choices." },
    { target: "focus-management", type: "applied-in", note: "Escape, focus return and no keyboard traps are how control works for keyboard users." },
    { target: "deceptive-patterns", type: "contrasts-with", note: "Hard-to-cancel subscriptions deliberately remove the emergency exit." },
  ],

  practice: {
    dos: [
      { text: "Offer undo for frequent, reversible actions, keep it visible until dismissed, and support Ctrl+Z / ⌘Z.", why: "Undo keeps the action fast and makes mistakes cheap; NN/g warns that undo hidden in gestures or short-lived snackbars is easily missed {{src:nng-user-control-freedom}}.", kind: "industry" },
      { text: "Make Escape close dialogs and menus, and return focus to the control that opened them.", why: "Keyboard users need the same exit as everyone else; this is the documented dialog behaviour in the ARIA Authoring Practices {{src:w3c-aria-apg}}.", kind: "platform" },
      { text: "Make sure focus can always leave a component with standard keys.", why: "A keyboard trap removes every exit at once [WCAG 2.2 SC 2.1.2 No Keyboard Trap, A] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't disable or hijack the browser Back button.", why: "People rely on it as their emergency exit; warn before data is lost instead {{src:nng-user-control-freedom}}.", kind: "industry" },
      { text: "Don't use a bare X where it could mean either Close or Cancel.", why: "People cannot tell whether their changes will be kept; label the exit in words {{src:nng-user-control-freedom}}.", kind: "industry" },
      { text: "Don't make leaving harder than joining (cancellation hidden behind calls or extra steps).", why: "It deliberately removes control and is a recognised deceptive pattern.", kind: "industry" },
    ],
    examples: [
      {
        title: "Undo by deferring the destructive commit",
        language: "ts",
        code: `// Remove from view at once; delete for real only if Undo is not used.
function removeFromList(item: Item) {
  list.hide(item.id);                                 // instant feedback
  const pending = setTimeout(() => api.delete(item.id), UNDO_WINDOW_MS);

  notify({
    message: \`Removed "\${item.title}"\`,
    action: { label: "Undo", onSelect: undo },          // a real button, reachable by Tab
    dismissible: true,                                  // stays until dismissed or the window ends
  });
  undoStack.push(undo);                                 // Ctrl+Z / ⌘Z calls the latest undo

  function undo() {
    clearTimeout(pending);
    list.show(item.id);
    announce(\`Restored "\${item.title}"\`);             // role="status" message
  }
}`,
        caption:
          "Illustrative. Deferring the delete makes undo simple and keeps the action fast. For operations on shared data, an inverse command on an undo stack is more robust. `list`, `api`, `notify`, `announce` and `UNDO_WINDOW_MS` are placeholders.",
      },
      {
        title: "Choosing between undo, confirmation and prevention",
        language: "text",
        code: `Action                         Frequency  Reversible?  Approach
-----------------------------  ---------  -----------  ------------------------------------------
Remove item from reading list  high       yes          act now + visible Undo + Ctrl/⌘Z
Archive a conversation         high       yes          act now + Undo; restore from Archive
Delete account                 rare       no           explain consequences + confirm (type name)
Send payment                   medium     no           review step + confirm [WCAG 2.2 SC 3.3.4]
Pick a return date             high       n/a          prevent: disable dates before departure`,
        caption: "Illustrative decision table. Confirmation is reserved for actions that cannot be undone.",
      },
    ],
  },

  exercises: [
    {
      id: "user-control-and-freedom-ex-exits",
      kind: "assignment",
      level: "beginner",
      title: "Find every way out",
      prompt: [
        "Walk through one flow (checkout, sign-up, booking). On each screen, write down every way to leave or go back, and whether it is labelled, where you expected it, and whether it keeps or loses your input.",
      ],
      deliverable: "A screen-by-screen list of exits with a mark for each missing or confusing one.",
      criteria: ["Every screen checked", "Back, Cancel, Close and Escape tested", "Data loss noted"],
    },
    {
      id: "user-control-and-freedom-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Replace a confirmation with undo",
      prompt: [
        "Illustrative case. In a library app, removing a book from a reading list opens a dialog: 'Are you sure?' with OK and Cancel. People remove books often; testing shows they click OK without reading, and some still remove the wrong book.",
        "Work through the correction sequence and propose a better design.",
      ],
      deliverable: "A redesigned interaction with states, copy, keyboard behaviour and what you would measure.",
      criteria: ["Cause identified (habituated confirmation)", "Undo specified with duration and focus", "Accessibility requirements cited", "Trade-off named"],
      exampleSolution: [
        "1. Symptom: wrong books are removed despite the confirmation.",
        "2. Impact: people lose curated lists and cannot get them back.",
        "3. Cause: a confirmation shown on every removal becomes a habit, so it no longer catches errors, and there is no way back after OK.",
        "4. Principle: support undo and redo; reserve confirmation for irreversible actions {{src:nng-user-control-freedom}}.",
        "5. Correction: remove immediately, show 'Removed \"Middlemarch\" — Undo' with a real button that stays until dismissed, support Ctrl+Z / ⌘Z, announce the change with role=\"status\" and return the item to its place on undo.",
        "6. Validation: test with keyboard and screen reader; measure undo use per removal and restore requests before and after.",
        "7. Trade-off: the list briefly shows an item as removed that may come back; deferring the server delete adds complexity across devices.",
      ],
    },
    {
      id: "user-control-and-freedom-ex-contract",
      kind: "reflection",
      level: "advanced",
      title: "Write the reversibility contract",
      prompt: [
        "For a design system's data table, specify which actions are reversible, how (undo stack, trash, version history), for how long, what keyboard shortcuts apply, how focus moves, and what telemetry is captured.",
      ],
      deliverable: "A component specification section with a decision rule for confirm vs undo.",
      criteria: ["Every destructive action covered", "Undo architecture chosen and justified", "WCAG criteria cited", "Telemetry treated as signals"],
    },
  ],

  quiz: [
    {
      id: "user-control-and-freedom-q-exit",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which is an example of an 'emergency exit'?",
      options: [
        { text: "A clearly labelled Cancel button on a checkout step", correct: true, explanation: "It lets people leave a state they did not want, without penalty." },
        { text: "A bigger 'Continue' button", correct: false, explanation: "That speeds the main path but offers no way out." },
        { text: "A tooltip explaining each field", correct: false, explanation: "Helpful, but not a way to leave or reverse." },
        { text: "Disabling Back so people do not lose their place", correct: false, explanation: "That removes an exit people rely on." },
      ],
      explanation: "Emergency exits are visible, labelled ways out of unwanted states.",
    },
    {
      id: "user-control-and-freedom-q-undo",
      kind: "scenario",
      level: "intermediate",
      prompt: "People archive dozens of messages a day. Which design best supports control?",
      options: [
        { text: "Archive immediately and offer a visible Undo plus a keyboard shortcut", correct: true, explanation: "Fast for the frequent case and cheap to reverse when wrong." },
        { text: "Ask 'Are you sure?' every time", correct: false, explanation: "People habituate and click through; it adds friction without a way back." },
        { text: "Show Undo for two seconds in a corner", correct: false, explanation: "Undo that disappears quickly is easily missed." },
        { text: "Remove the archive feature", correct: false, explanation: "Removing a frequent task is not control." },
      ],
      explanation: "Use undo for frequent, reversible actions and keep it discoverable.",
    },
    {
      id: "user-control-and-freedom-q-trap",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "A custom date picker captures Tab and Escape, so keyboard users cannot leave it. Which requirement does this fail?",
      options: [
        { text: "WCAG 2.2 SC 2.1.2 No Keyboard Trap (Level A)", correct: true, explanation: "Focus must be able to move away from any component using standard keys." },
        { text: "WCAG 2.2 SC 1.4.3 Contrast (Minimum)", correct: false, explanation: "Contrast is unrelated to keyboard movement." },
        { text: "WCAG 2.2 SC 4.1.3 Status Messages", correct: false, explanation: "That concerns announcing status, not leaving components." },
        { text: "No requirement; it is a design choice", correct: false, explanation: "Keyboard traps fail a Level A criterion." },
      ],
      explanation: "No keyboard trap is the accessibility form of an emergency exit.",
    },
  ],

  flashcards: [
    { id: "user-control-and-freedom-fc-two", front: "The two halves of user control and freedom", back: "A clearly marked emergency exit, and support for undo and redo." },
    { id: "user-control-and-freedom-fc-choose", front: "Undo or confirm?", back: "Undo for frequent, reversible actions; confirm only for actions that cannot be undone." },
    { id: "user-control-and-freedom-fc-wcag", front: "WCAG 2.2 criteria behind 'control'", back: "2.1.2 No Keyboard Trap (A), 2.5.2 Pointer Cancellation (A), 2.2.1 Timing Adjustable (A), 3.3.4 Error Prevention (AA)." },
  ],

  references: [
    { source: "nielsen-ten-heuristics-article", role: "primary", note: "Heuristic 3 as currently stated." },
    { source: "nielsen-1994-heuristics", role: "primary", note: "Revision that named the heuristic." },
    { source: "molich-nielsen-1990", role: "primary", note: "'Provide clearly marked exits'." },
    { source: "nng-user-control-freedom", role: "explanatory", note: "Back, Cancel, Close, overlays and undo guidance." },
    { source: "nng-user-mistakes", role: "explanatory", note: "Undo as a safety net that encourages exploration." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 2.1.2, 2.2.1, 2.5.2, 3.2.2 (A) and 3.3.4 (AA)." },
    { source: "w3c-aria-apg", role: "explanatory", note: "Dialog pattern: Escape closes, focus returns (informative guidance)." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "User control and freedom is professional guidance from Nielsen's heuristics and NN/g's observation of usability tests; its specific recommendations are not experimentally tested. Its accessibility requirements are WCAG 2.2 success criteria (a W3C Recommendation), and the ARIA Authoring Practices are informative guidance.",

  status: "published",
  quality: {
    classification: true,
    explanation: true,
    research: true,
    beginner: true,
    professional: true,
    examples: true,
    limitations: true,
    relationships: true,
    sources: true,
    activities: true,
  },
  lastVerifiedAt: "2026-11-11",
});
