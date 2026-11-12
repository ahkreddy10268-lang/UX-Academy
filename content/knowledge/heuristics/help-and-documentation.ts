import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "help-and-documentation",
  slug: "help-and-documentation",
  title: "Help and Documentation",
  alternateNames: ["Usability heuristic #10", "Contextual help", "User assistance", "Proactive and reactive help"],
  summary:
    "It is better when a product needs no explanation, but when help is needed it should be easy to find and search, focused on the task in hand, written as concrete steps and short — offered in context rather than pushed on people.",
  definition:
    "Help and documentation is the principle that, although it is better if a system can be used without documentation, help may be necessary, and it should be **easy to search, focused on the user's task, list concrete steps and not be too large** {{src:nielsen-ten-heuristics-article}} {{src:nng-help-documentation}}. It is the tenth of Nielsen's ten heuristics. It covers both **proactive help**, given before a problem arises (onboarding, contextual tips), and **reactive help**, sought when people are stuck (documentation, troubleshooting) {{src:nng-help-documentation}}. It is not a substitute for a usable design: help that explains a confusing interface is a sign the interface needs work.",
  primaryType: "principle",
  secondaryTypes: ["heuristic"],
  domain: "heuristics",
  subcategory: "heuristic-sets",
  tags: ["help", "documentation", "contextual help", "onboarding", "tooltips", "minimalist instruction", "search", "heuristics"],
  difficulty: "beginner",
  disciplines: ["Content design", "Technical writing", "Interaction design", "Accessibility"],
  learningObjectives: [
    "Distinguish proactive from reactive help, and push from pull revelations.",
    "Write task-focused help as short, concrete steps.",
    "Choose between inline hints, tooltips, help panels and full documentation for a given need.",
    "Make help accessible and consistent, and use help-search data to find design problems.",
  ],
  prerequisites: ["nielsen-usability-heuristics", "progressive-disclosure"],

  levels: {
    beginner: {
      explanation: [
        "Imagine trying to renew a library book and not finding how. You open Help and get a forty-page manual that starts with the history of the library. Or you open the app for the first time and a ten-screen tour explains buttons you could already see, and you skip it.",
        "Help and documentation asks for the opposite: the best help is **not needed**, because the product is clear. When help is needed, it should be **where the question arises**, **about the task** people are trying to do, written as **steps they can follow**, and **short**. A one-line hint under a tricky field, a 'How do I renew?' answer with three steps, a search that finds it.",
        "There are two moments for help. **Proactive** help comes before trouble — a tip as you start something new. **Reactive** help is there when you go looking because you are stuck.",
      ],
      analogy:
        "A good museum: labels beside each exhibit (contextual), a map at the entrance you can ignore (proactive, skippable), and staff at the information desk when you are lost (reactive). Nobody hands you a book about the museum at the door and expects you to read it first.",
      everydayExamples: [
        "A hint under a password field listing the rules before you type.",
        "A '?' next to a setting that opens a short explanation without leaving the page.",
        "A help centre search that answers 'how to renew a book' with numbered steps.",
        "A skippable 'What's new' tip after an update that you can find again later.",
      ],
      vocabulary: [
        { term: "Proactive help", meaning: "Help offered before a problem arises, such as onboarding or contextual tips." },
        { term: "Reactive help", meaning: "Help people look for when they are stuck, such as documentation or troubleshooting." },
        { term: "Push revelation", meaning: "Help shown regardless of what the person is doing, such as a launch tour." },
        { term: "Pull revelation", meaning: "Help triggered by what the person is doing, such as a tip when they start a task." },
        { term: "Minimalist instruction", meaning: "An approach to documentation that keeps it short, task-oriented and action-first." },
      ],
    },
    intermediate: {
      explanation: [
        "NN/g's guidance distinguishes **push** revelations — help shown with no regard to what people are doing, like launch tours, which are often ignored because they get in the way — from **pull** revelations, contextual tips triggered by the task, which are more likely to be used {{src:nng-help-documentation}}. Favour pull; keep proactive help short; make push help easy to dismiss and findable later.",
        "Reactive help has the opposite needs. People who open documentation want detail, so it must be comprehensive, scannable (headings, numbered steps, highlighted keywords), searchable, and offer text alongside any video {{src:nng-help-documentation}}.",
        "These ideas have roots in research on documentation. Carroll's minimalist instruction, introduced in The Nurnberg Funnel (1990), argued that people learn software by doing real tasks, so documentation should be short, task-oriented and let them act at once; van der Meij and Carroll later set out its principles and heuristics {{src:van-der-meij-carroll-1998}}. Carroll's earlier 'training wheels' interface took a related learn-by-doing approach, making troublesome error states unreachable while people learned {{src:carroll-carrithers-1984}}.",
      ],
      howItWorks: [
        "Help is used when it is relevant to the current goal. Content that is not tied to what someone is doing has to be remembered until it becomes relevant, which rarely happens, which is why push revelations are often skipped and pull revelations used {{src:nng-help-documentation}}.",
        "Task-focused steps let people act while reading. Minimalist instruction is built on the observation that people want to get on with the task, not read about the system first {{src:van-der-meij-carroll-1998}}.",
      ],
      implementation: [
        "Put the answer where the question arises: hints under fields, a help link beside a complex setting, a short explanation in an empty state.",
        "Write help as tasks with numbered steps, starting with the verb ('Renew a book: 1. Open Loans…').",
        "Provide context-sensitive help for complex inputs [WCAG 2.2 SC 3.3.5 Help, AAA] {{src:w3c-wcag-22}}.",
        "Keep repeated help mechanisms — contact details, chat, help links — in the same relative order across pages [WCAG 2.2 SC 3.2.6 Consistent Help, A] {{src:w3c-wcag-22}}.",
        "Make tooltips and popovers dismissible, hoverable and persistent [WCAG 2.2 SC 1.4.13 Content on Hover or Focus, AA] {{src:w3c-wcag-22}}.",
        "Make help panels reachable and leavable by keyboard, returning focus to where it was [WCAG 2.2 SC 2.1.2 No Keyboard Trap, A] {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** A library app shows a seven-screen tour at first launch; analytics show most people skip it. Replacing it with three pull tips — shown the first time someone opens Loans, Reservations and Search — puts each tip where it is needed.",
        "**Illustrative.** The help centre's top search with no results is 'renew'. The article exists but is titled 'Loan extension'. Retitling it in people's words fixes the search; the volume of the query also suggests the Renew action is hard to find.",
        "**Critique protocol.** For three common tasks, try to get help: Is there help in context? Is it task-focused with steps? Can search find it in your own words? Can you dismiss and reopen tips? Does it work with keyboard and screen reader?",
      ],
    },
    advanced: {
      explanation: [
        "Help needs an **architecture of escalating depth**, chosen by need: inline hint (always visible, one sentence) → tooltip or toggletip (on demand, a short definition) → help panel or drawer (non-modal, a few steps, the page stays usable) → full article (comprehensive, searchable). Each level should link to the next. Non-modal panels are usually better than modal dialogs because people can follow the steps while doing them.",
        "Accessibility shapes each level. Tooltips must not hide content that is needed and must follow the hover and focus rules [WCAG 2.2 SC 1.4.13, AA]; anything that only appears on hover is unavailable on touch, so essential information belongs inline. Help drawers must not trap focus and should return it on close [SC 2.1.2, A]. Consistent placement of help across pages is now a Level A requirement [SC 3.2.6] {{src:w3c-wcag-22}}.",
        "In a design system, help components (field hint, toggletip, help panel, empty-state guidance) belong in the library with content guidelines, so tone and depth are consistent; help content should be stored as content, not hard-coded, so it can be searched and updated.",
        "Help is one of the richest sources of design feedback. Track help-search queries and their zero-result rate, which articles are opened from which screens, 'was this helpful' answers and contacts with support after reading help. A query that returns nothing points to missing or misworded content; a screen that sends many people to help points to a design problem the help is compensating for.",
      ],
      evidence: [
        "The heuristic is professional guidance; help and documentation was added to the nine factors of Nielsen's 1994 analysis to form the ten heuristics {{src:nielsen-1994-heuristics}}. Research on minimalist instruction and on the training-wheels interface supports task-oriented, learn-by-doing documentation {{src:van-der-meij-carroll-1998}} {{src:carroll-carrithers-1984}}; this entry relies on the chapter's bibliographic record and the 1984 paper's abstract rather than full texts. NN/g's push and pull guidance comes from practice and usability research {{src:nng-help-documentation}}. The accessibility requirements are WCAG 2.2 success criteria.",
      ],
      debates: [
        "**Onboarding tours.** They are easy to build and often skipped; some products need them for genuinely unfamiliar concepts. NN/g recommends keeping them short and skippable and favouring contextual help {{src:nng-help-documentation}}.",
        "**Video or text?** Video helps with complex physical or spatial tasks; text is searchable, scannable and accessible. NN/g advises text alongside video {{src:nng-help-documentation}}.",
        "**Help as a symptom.** Heavy demand for help on one screen may mean the design should change rather than the help grow.",
      ],
      alternativeModels: [
        "**Self-explanatory design** — clear labels, signifiers and recognition rather than recall — reduces the need for help in the first place.",
        "**Conversational assistants** answer questions in natural language; they can find help faster but must be accurate, cite their sources and hand over to people when they cannot answer.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "John M. Carroll", "Hans van der Meij"],
    period: "1984–1998 (minimalist instruction research); 1994 (heuristic)",
    problem:
      "Software came with long manuals that people did not read, organised around the system's features rather than the tasks people were trying to do.",
    narrative: [
      "Carroll's research on learning to use software, including the training-wheels interface, led to minimalist instruction: short, task-oriented documentation that lets people act at once {{src:carroll-carrithers-1984}} {{src:van-der-meij-carroll-1998}}.",
      "Nielsen's 1994 revision of his heuristics added help and documentation to the nine heuristics derived from usability problems, completing the ten in use today {{src:nielsen-1994-heuristics}} {{src:nielsen-ten-heuristics-article}}.",
    ],
    attributionNote:
      "The Nurnberg Funnel (Carroll, 1990) introduced minimalist instruction; it is mentioned here but not cited as a source because its bibliographic record could not be verified online from this session.",
  },

  application: {
    summary: [
      "Help applies to complex inputs, unfamiliar concepts, new or redesigned features, and any product people use rarely. It is most effective in context and as a fallback for the questions design cannot answer.",
    ],
    web: [
      "Inline hints and toggletips for complex fields; a non-modal help panel for multi-step tasks; a searchable help centre with task-named articles.",
    ],
    mobile: [
      "Hover does not exist on touch: put essential help inline, and use tap-to-open toggletips or bottom sheets for more.",
    ],
    enterprise: [
      "Complex tools need in-product help panels linked to full documentation, and help that changes with role and context.",
    ],
    services: [
      "Help spans channels: the same task-named answers on the website, in emails and in what support staff say.",
    ],
    steps: [
      "List the questions people actually ask (support logs, search queries, testing).",
      "Fix in the design what help would only compensate for.",
      "For the rest, choose the level: inline hint, toggletip, panel or article.",
      "Write each as a task with concrete steps, in people's words.",
      "Check keyboard, focus, hover and consistent placement against WCAG 2.2.",
      "Track help searches, zero results and contacts after help.",
    ],
  },

  whenToUse: [
    "Complex inputs, unfamiliar concepts and rarely performed tasks.",
    "New or redesigned features, as short, skippable, findable tips.",
  ],
  whenNotToUse: [
    "As a fix for a confusing interface: if many people need help on one screen, redesign the screen first.",
    "As a long launch tour shown to everyone: favour contextual pull help and keep any tour short and skippable {{src:nng-help-documentation}}.",
  ],
  advantages: [
    "Gives people a way forward when the interface cannot answer a question.",
    "Help-search data reveals where design and vocabulary fail.",
    "Contextual help supports learning without interrupting the task.",
  ],
  limitations: [
    "Help is often unread; it cannot compensate for poor design.",
    "Documentation goes out of date unless it is owned and updated with the product.",
    "Hover-only help does not work on touch screens and can fail accessibility rules.",
  ],
  misconceptions: [
    {
      myth: "A good onboarding tour solves learnability.",
      reality:
        "Push revelations shown regardless of context are often ignored; help tied to the current task works better {{src:nng-help-documentation}}.",
    },
    {
      myth: "If a product needs documentation, it is badly designed.",
      reality:
        "The heuristic accepts that help may be necessary; the requirement is that it is searchable, task-focused, concrete and short {{src:nielsen-ten-heuristics-article}}.",
    },
  ],

  relations: [
    { target: "nielsen-usability-heuristics", type: "derived-from", note: "Heuristic 10 of Nielsen's ten usability heuristics." },
    { target: "progressive-disclosure", type: "applied-in", note: "Help escalates from an inline hint to a full article only as far as people ask." },
    { target: "form-instructions", type: "applied-in", note: "Field hints and instructions are the most common contextual help." },
    { target: "onboarding-copy", type: "applied-in", note: "Proactive help for new users is written as onboarding copy." },
    { target: "recognition-over-recall", type: "related-to", note: "Help in context spares people from remembering instructions read elsewhere." },
    { target: "error-recovery", type: "complementary-to", note: "Error messages can link to help that explains how the system works." },
  ],

  practice: {
    dos: [
      { text: "Put help where the question arises: a hint under a complex field, a toggletip beside a setting.", why: "Help tied to the current task is used; help shown out of context is often ignored {{src:nng-help-documentation}}.", kind: "industry" },
      { text: "Write help as tasks with concrete, numbered steps, titled in people's words.", why: "The heuristic asks for task focus and concrete steps, and minimalist instruction lets people act while reading {{src:nielsen-ten-heuristics-article}} {{src:van-der-meij-carroll-1998}}.", kind: "industry" },
      { text: "Keep repeated help mechanisms in the same place on every page.", why: "Consistent placement of help is required [WCAG 2.2 SC 3.2.6 Consistent Help, A] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't force a long tour on every new user.", why: "Push revelations get in the way and are often skipped; keep them short, skippable and findable later {{src:nng-help-documentation}}.", kind: "industry" },
      { text: "Don't hide essential information in hover-only tooltips.", why: "Hover does not exist on touch, and hover content must be dismissible, hoverable and persistent [WCAG 2.2 SC 1.4.13, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't open help in a modal that traps focus or blocks the task.", why: "People need to follow steps while doing them; focus must be able to leave [WCAG 2.2 SC 2.1.2, A] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Contextual help: inline hint, toggletip and help panel",
        language: "text",
        code: `<!-- Level 1: always-visible hint -->
<label for="until">Renew until</label>
<p id="until-hint">You can renew for up to 4 weeks from today.</p>
<input id="until" type="date" aria-describedby="until-hint" />

<!-- Level 2: on-demand definition (a toggletip: opens on click, not hover) -->
<button type="button" aria-expanded="false" aria-controls="hold-tip">
  What is a hold? <!-- visible text, so touch and speech users can reach it -->
</button>
<p id="hold-tip" hidden>
  A hold means another reader has reserved this book, so it cannot be renewed.
  <a href="/help/holds">How holds work</a>
</p>

<!-- Level 3: non-modal help panel; the page stays usable while reading -->
<aside id="help-panel" aria-labelledby="help-title" hidden>
  <h2 id="help-title">Renew a book</h2>
  <ol>
    <li>Open <strong>Loans</strong>.</li>
    <li>Select the books to renew.</li>
    <li>Choose <strong>Renew selected</strong>.</li>
  </ol>
  <a href="/help/renewals">Full guide to renewals</a>
  <button type="button">Close help</button> <!-- Esc also closes; focus returns to the opener -->
</aside>`,
        caption:
          "Illustrative. Each level links to the next. The toggletip opens on click so it works on touch; the panel is non-modal and closes with Esc, returning focus (SC 2.1.2); help sits in the same place on every page (SC 3.2.6).",
      },
      {
        title: "Help-search telemetry and zero-result deflection",
        language: "ts",
        code: `type HelpEvent =
  | { type: "help_search"; query: string; results: number; screen: string }
  | { type: "help_open"; articleId: string; from: "inline" | "panel" | "search"; screen: string }
  | { type: "help_feedback"; articleId: string; helpful: boolean }
  | { type: "support_contact_after_help"; articleId?: string };

// Zero results: try synonyms in people's words before giving up, then offer a human route.
function searchHelp(query: string, index: HelpIndex, track: (e: HelpEvent) => void) {
  let hits = index.search(query);
  if (hits.length === 0) hits = index.search(expandSynonyms(query)); // "renew" → "extend loan"
  track({ type: "help_search", query, results: hits.length, screen: currentScreen() });
  return hits.length ? hits : [{ kind: "contact", label: "Ask a librarian" }];
}
// Weekly review: top zero-result queries become new or retitled articles;
// screens with the most help opens become candidates for redesign.`,
        caption:
          "Illustrative. `HelpIndex`, `expandSynonyms` and `currentScreen` are placeholders. Query data is a lead to investigate, not proof of a design problem.",
      },
    ],
  },

  exercises: [
    {
      id: "help-and-documentation-ex-find",
      kind: "assignment",
      level: "beginner",
      title: "Find help for one task",
      prompt: [
        "Choose a task you are unsure how to do in an app. Try to get help: in context, by searching, in the help centre. Note how long it took and whether the answer was task-focused, concrete and short.",
      ],
      deliverable: "A short log of each attempt and a rewrite of the answer as numbered steps.",
      criteria: ["All help routes tried", "The four qualities checked", "Rewrite is task-focused and concrete"],
    },
    {
      id: "help-and-documentation-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Replace a skipped tour",
      prompt: [
        "Illustrative case. A library app opens a seven-screen tour at first launch. Analytics show most people skip it; support still gets many 'how do I renew?' questions, and the help article is titled 'Loan extension'.",
        "Work through the correction sequence.",
      ],
      deliverable: "A contextual help plan, a retitled article and the measures you would track.",
      criteria: ["Push vs pull distinguished", "Task-named content", "Accessibility checked", "Telemetry defined"],
      exampleSolution: [
        "1. Symptom: the tour is skipped; renewal questions persist; search for 'renew' finds nothing.",
        "2. Impact: people cannot renew and contact support or let loans go overdue.",
        "3. Cause: help is pushed at launch, out of context, and the article uses the library's term, not people's.",
        "4. Principle: favour pull revelations; help should be searchable, task-focused and concrete {{src:nng-help-documentation}}.",
        "5. Correction: remove the long tour (keep an optional one in Help); show a short tip the first time Loans opens; retitle the article 'Renew a book' with three steps and add 'extend loan' as a synonym.",
        "6. Validation: measure zero-result searches for 'renew', support contacts about renewal and use of the tip.",
        "7. Trade-off: some features lose their introduction; make sure each has a contextual tip or a findable article.",
      ],
    },
    {
      id: "help-and-documentation-ex-architecture",
      kind: "reflection",
      level: "advanced",
      title: "Design a help architecture",
      prompt: [
        "For a complex product, define the levels of help (hint, toggletip, panel, article), when each is used, how they link, their accessibility rules, who owns the content, and the telemetry that feeds design changes.",
      ],
      deliverable: "A one-page architecture with a decision rule and a review process.",
      criteria: ["Escalating levels defined", "WCAG rules per level", "Ownership and updates", "Telemetry linked to design decisions"],
    },
  ],

  quiz: [
    {
      id: "help-and-documentation-q-qualities",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "According to the heuristic, good help should be…",
      options: [
        { text: "Easy to search, focused on the task, concrete steps, not too large", correct: true, explanation: "These are the four qualities the heuristic names." },
        { text: "Comprehensive and shown to everyone at launch", correct: false, explanation: "Help shown out of context is often ignored." },
        { text: "Hidden until someone contacts support", correct: false, explanation: "Help should be easy to find and search." },
        { text: "As long as possible to cover everything", correct: false, explanation: "The heuristic asks that help not be too large." },
      ],
      explanation: "Searchable, task-focused, concrete, short.",
    },
    {
      id: "help-and-documentation-q-pull",
      kind: "scenario",
      level: "intermediate",
      prompt: "Which is a pull revelation?",
      options: [
        { text: "A tip about bulk renewal shown the first time someone selects several loans", correct: true, explanation: "It is triggered by what the person is doing." },
        { text: "A ten-screen tour at first launch", correct: false, explanation: "That is pushed regardless of the task." },
        { text: "A 'What's new' popup on every login", correct: false, explanation: "Shown without regard to the current goal." },
        { text: "A PDF manual on the downloads page", correct: false, explanation: "That is reactive documentation, not a contextual tip." },
      ],
      explanation: "Pull revelations are contextual and more likely to be used.",
    },
    {
      id: "help-and-documentation-q-wcag",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "A help link sits in the header on some pages and the footer on others. Which WCAG 2.2 criterion applies?",
      options: [
        { text: "SC 3.2.6 Consistent Help (Level A)", correct: true, explanation: "Repeated help mechanisms must appear in the same relative order." },
        { text: "SC 3.3.5 Help (Level AAA)", correct: false, explanation: "That concerns context-sensitive help, not its placement." },
        { text: "SC 1.4.13 Content on Hover or Focus", correct: false, explanation: "That concerns tooltips and popovers." },
        { text: "No criterion applies", correct: false, explanation: "Consistent help is a Level A criterion in WCAG 2.2." },
      ],
      explanation: "WCAG 2.2 added Consistent Help at Level A.",
    },
  ],

  flashcards: [
    { id: "help-and-documentation-fc-four", front: "Heuristic 10's four qualities of help", back: "Easy to search · focused on the user's task · concrete steps · not too large." },
    { id: "help-and-documentation-fc-push", front: "Push vs pull revelations", back: "Push: shown regardless of the task, often ignored. Pull: triggered by the current task, more likely used." },
    { id: "help-and-documentation-fc-wcag", front: "WCAG 2.2 criteria for help", back: "3.2.6 Consistent Help (A), 3.3.5 Help (AAA), 1.4.13 Content on Hover or Focus (AA), 2.1.2 No Keyboard Trap (A)." },
  ],

  references: [
    { source: "nielsen-ten-heuristics-article", role: "primary", note: "Heuristic 10 as currently stated." },
    { source: "nielsen-1994-heuristics", role: "primary", note: "Analysis whose nine factors, with help and documentation, form the ten." },
    { source: "nng-help-documentation", role: "explanatory", note: "Proactive and reactive help; push and pull revelations." },
    { source: "van-der-meij-carroll-1998", role: "primary", note: "Principles of minimalist instruction (bibliographic record only)." },
    { source: "carroll-carrithers-1984", role: "primary", note: "Training wheels interface (abstract via Crossref)." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.13 (AA), 2.1.2 (A), 3.2.6 (A), 3.3.5 (AAA)." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Help and documentation is professional guidance. Its task-oriented approach draws on research into minimalist instruction and learning by doing, cited here from bibliographic records and an abstract. NN/g's push and pull guidance comes from practice. The accessibility requirements are WCAG 2.2 success criteria, a W3C Recommendation.",

  guide: { id: "nielsen-heuristics", anchor: "h10", label: "Heuristic 10 in the Nielsen heuristics guide" },

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
