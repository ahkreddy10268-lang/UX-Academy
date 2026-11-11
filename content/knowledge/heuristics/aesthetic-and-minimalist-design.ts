import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "aesthetic-and-minimalist-design",
  slug: "aesthetic-and-minimalist-design",
  title: "Aesthetic and Minimalist Design",
  alternateNames: ["Usability heuristic #8", "Minimalist design", "Signal and noise", "Simple and natural dialogue"],
  summary:
    "Interfaces should contain only what supports people's tasks — every extra element competes with the ones that matter — while keeping everything that is needed. It is about relevance, not about a sparse visual style.",
  definition:
    "Aesthetic and minimalist design is the principle that interfaces should not contain information that is irrelevant or rarely needed, because every extra unit of information competes with the relevant units and diminishes their relative visibility {{src:nielsen-ten-heuristics-article}} {{src:nng-aesthetic-minimalist}}. It is the eighth of Nielsen's ten heuristics. 'Minimalist' here does not mean the later minimalist visual trend: a design that satisfies the heuristic contains **all the elements needed** for the task and nothing that distracts from them, whether it looks sparse or dense {{src:nng-aesthetic-minimalist}}.",
  primaryType: "principle",
  secondaryTypes: ["heuristic"],
  domain: "heuristics",
  subcategory: "heuristic-sets",
  tags: ["minimalism", "signal and noise", "clutter", "visual design", "content priority", "progressive disclosure", "heuristics"],
  difficulty: "beginner",
  disciplines: ["UI design", "Visual design", "Content design", "Interaction design", "Accessibility"],
  learningObjectives: [
    "Explain why irrelevant elements make relevant ones harder to find.",
    "Distinguish the heuristic from the minimalist visual style, and from the aesthetic-usability effect.",
    "Decide what to remove, what to defer and what must stay visible.",
    "Keep reduced designs accessible: labels, contrast, target size and content revealed on hover or focus.",
  ],
  prerequisites: ["nielsen-usability-heuristics", "visual-hierarchy"],

  levels: {
    beginner: {
      explanation: [
        "A library's home page shows the opening hours, a search box, twelve news items, a carousel of events, three banners and a list of every department. You came to renew a book. Everything on the page might be useful to someone, but together it hides the one thing you need.",
        "Aesthetic and minimalist design asks a simple question of every element: **does it help people do what they came to do?** Elements that do not are noise. Removing noise makes the important things easier to see; moving rarely needed things one step away keeps them available without crowding the page.",
        "It is not about making things look empty. A dense timetable can be perfectly minimalist if every number on it is needed; a beautiful, sparse page fails if the button you need is missing.",
      ],
      analogy:
        "A good map leaves out most of the world. It shows the roads, stations and landmarks a traveller needs and drops everything else, which is exactly why it is useful. A satellite photo holds more information and is harder to navigate.",
      everydayExamples: [
        "A checkout page that removes the site's navigation so people focus on paying.",
        "A search engine's home page with little more than the search box.",
        "An 'Advanced settings' link that keeps rarely used options out of the main view.",
        "A dense flight timetable where every column is needed.",
      ],
      vocabulary: [
        { term: "Signal", meaning: "Elements with high informational value for the task: clear labels, needed data, the primary action." },
        { term: "Noise", meaning: "Elements with little value for the task: decoration, irrelevant information, unexplained jargon." },
        { term: "Clutter", meaning: "So many elements that the important ones are hard to find." },
        { term: "Progressive disclosure", meaning: "Showing rarely needed options only when people ask for them." },
        { term: "Minimalist style", meaning: "A visual trend of sparse layouts and few visual cues; not the same as this heuristic." },
      ],
    },
    intermediate: {
      explanation: [
        "NN/g frames the heuristic as signal and noise. Maximise the signal — labels with strong information scent, plain language, clear signifiers, helpful text — and minimise the noise — decoration, irrelevant information, unexplained technical terms, and visual cues that mean several things at once {{src:nng-aesthetic-minimalist}}. Use established visual principles (scale, hierarchy, balance, contrast, grouping), defer to conventions, and disclose rare features progressively {{src:nng-aesthetic-minimalist}}.",
        "The heuristic has a corollary that is often missed: a minimalist design **must contain all necessary elements**. Too few elements harm usability as much as too many. NN/g notes that a fashionably sparse site can fail the heuristic by hiding what people need, while a dense, richly styled site can satisfy it by showing exactly what is needed {{src:nng-aesthetic-minimalist}}.",
        "The 'aesthetic' half matters too. Attractive design creates good first impressions and supports a brand, and people tend to rate attractive interfaces as easier to use {{src:nng-aesthetic-minimalist}}. That perception is the separate [[aesthetic-usability-effect]]; this heuristic asks for aesthetics in service of clarity, not as a substitute for it.",
      ],
      howItWorks: [
        "Attention is limited. Every visible element is a candidate that people must scan past or consider, so irrelevant elements slow the search for relevant ones and make them less salient. Removing noise raises the relative visibility of what remains {{src:nielsen-ten-heuristics-article}}.",
        "Extraneous elements also add to the load on working memory that does not help the task — what cognitive load theory calls extraneous load — leaving less capacity for the task itself {{src:sweller-1988}}.",
      ],
      implementation: [
        "Rank content and controls by how often and how critically they are needed for the main tasks; remove what serves none, defer what serves few.",
        "Use progressive disclosure for rare features, but never hide what most people need {{src:nng-aesthetic-minimalist}}.",
        "Keep visible labels on controls; if an icon stands alone, its accessible name must include any visible text [WCAG 2.2 SC 2.5.3 Label in Name, A] and its purpose must be clear [SC 2.4.6 Headings and Labels, AA] {{src:w3c-wcag-22}}.",
        "Do not let a minimal style lower contrast: text needs 4.5:1 [SC 1.4.3, AA] and control boundaries 3:1 against adjacent colours [SC 1.4.11, AA] {{src:w3c-wcag-22}}.",
        "Keep targets at least 24 by 24 CSS pixels or adequately spaced, even when icons are small [WCAG 2.2 SC 2.5.8 Target Size (Minimum), AA] {{src:w3c-wcag-22}}.",
        "If controls appear only on hover or focus, make them dismissible, hoverable and persistent [WCAG 2.2 SC 1.4.13 Content on Hover or Focus, AA] {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** A library home page is redesigned around its three most common tasks — search the catalogue, renew loans, check opening hours. News and events move to their own pages, linked from a short section; nothing is deleted, but the tasks are no longer buried.",
        "**Illustrative.** A 'clean' redesign replaces labelled buttons with grey icons on white. Testing shows people cannot find 'Renew'. Restoring labels and contrast satisfies the heuristic better than the sparser version did.",
        "**Critique protocol.** For each element on a screen, ask: Which task does it support? How often? What happens if it moves one step away? Then check the reverse: is anything a primary task needs missing or hidden? Both are findings.",
      ],
    },
    advanced: {
      explanation: [
        "At system level, the heuristic is enforced by **constraints that limit variation**. A small type scale, a spacing scale and a restricted set of colour roles reduce visual noise by construction: there are fewer sizes and colours to compete. NN/g specifically warns against multipurpose visual cues and excessive font and colour variation {{src:nng-aesthetic-minimalist}}; semantic tokens and a modest component set are how a system keeps that discipline across teams.",
        "Deciding what is 'rarely needed' requires data and judgement. Usage analytics show which elements are used and how often, but low use does not mean low value: a 'Report a problem' link may be used rarely and still be essential when needed. Combine usage with task importance and consequences, and with research on what people look for.",
        "Minimalism can damage accessibility when it removes cues people depend on: visible labels, focus indicators, borders on controls, and text that explains icons. The accessible version of minimalism removes irrelevant content, not the signals that make relevant content usable.",
      ],
      evidence: [
        "The heuristic is professional guidance. Nielsen and Molich's 1990 principles began with 'simple and natural dialogue' {{src:molich-nielsen-1990}}, and Nielsen's 1994 revision named it aesthetic and minimalist design {{src:nielsen-1994-heuristics}}. NN/g's current explanation draws on practice and on research cited within it, such as studies of first impressions, which this entry has not re-examined {{src:nng-aesthetic-minimalist}}. The mechanism — irrelevant items competing for attention — is consistent with attention and cognitive-load research, but the heuristic itself has not been tested as a single experimental claim.",
      ],
      debates: [
        "**Minimalism vs information density.** Expert tools (trading screens, dashboards, timetables) are dense by necessity; the heuristic judges relevance, not quantity, but teams often confuse the two.",
        "**Hiding vs removing.** Progressive disclosure keeps features available but out of view; overused, it hides essential functions behind menus people never open.",
        "**Aesthetics as decoration.** Brand expression adds visual elements; NN/g's position is that clarity wins over visual flourish {{src:nng-aesthetic-minimalist}}, but where the line falls is a design judgement.",
      ],
      alternativeModels: [
        "**The aesthetic-usability effect** describes how attractiveness changes perceived usability; it explains why aesthetics matter but also why they can mask problems in testing.",
        "**Progressive disclosure** is the main technique for keeping rarely needed elements available without crowding primary tasks.",
      "**The data-ink ratio** in information graphics expresses a parallel idea for charts: the share of a graphic's ink that presents data rather than decoration {{src:tufte-1983}}.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Rolf Molich"],
    period: "1990 ('simple and natural dialogue'); 1994 ('aesthetic and minimalist design')",
    problem:
      "Screens and early web pages were crowded with relevant and irrelevant information alike, so people struggled to find what they needed.",
    narrative: [
      "Nielsen and Molich's 1990 principles included 'simple and natural dialogue' {{src:molich-nielsen-1990}}.",
      "Nielsen's 1994 revision named the heuristic aesthetic and minimalist design {{src:nielsen-1994-heuristics}} {{src:nielsen-ten-heuristics-article}}. NN/g notes that it predates the minimalist web-design trend and refers to removing noise, not to a visual style {{src:nng-aesthetic-minimalist}}.",
    ],
  },

  application: {
    summary: [
      "The heuristic applies to every screen, but matters most on entry pages, task flows such as checkout, dashboards, settings and anywhere many stakeholders want space.",
    ],
    web: [
      "Design home and landing pages around the top tasks; give secondary content its own pages.",
      "Remove global navigation and promotions from focused flows such as checkout and sign-in.",
    ],
    mobile: [
      "Small screens force prioritisation; keep primary actions visible and move secondary ones into menus, without hiding what most people need.",
    ],
    enterprise: [
      "Dense tools can be minimalist: show every column people use, remove decoration, and let people hide columns they do not need.",
    ],
    services: [
      "Letters, emails and forms in a service follow the same rule: say what people need to know and do, and move the rest to where it is asked for.",
    ],
    steps: [
      "List the primary tasks and what each needs on screen.",
      "Inventory every element and map it to a task, or to none.",
      "Remove elements that serve no task; defer rarely needed ones.",
      "Check nothing a primary task needs is hidden or missing.",
      "Check labels, contrast, target size and hover or focus content against WCAG 2.2.",
      "Test with real tasks; watch for people unable to find things you moved.",
    ],
  },

  whenToUse: [
    "Every screen, especially entry points and focused task flows.",
    "Redesigns and reviews where stakeholders compete for space.",
  ],
  whenNotToUse: [
    "As a licence to remove labels, borders or explanations people need: that is a minimalist style, not this heuristic.",
    "As a reason to strip expert tools of necessary density: keep every element the task uses, and remove decoration instead.",
  ],
  advantages: [
    "Makes the elements that matter easier to find.",
    "Reduces extraneous load and decision time.",
    "Often improves perceived quality and brand.",
  ],
  limitations: [
    "Deciding what is 'rarely needed' requires research; usage data alone can mislead.",
    "Overdone, it hides needed features or removes accessibility cues.",
    "The heuristic gives no measure of how much is too much; it depends on task and context.",
  ],
  misconceptions: [
    {
      myth: "Minimalist design means a sparse, flat visual style.",
      reality:
        "The heuristic predates that trend and is about relevance. Sparse designs can fail it by hiding needed elements; dense ones can satisfy it {{src:nng-aesthetic-minimalist}}.",
    },
    {
      myth: "Fewer elements is always better.",
      reality:
        "A minimalist design must contain all necessary elements; removing needed ones harms usability as much as clutter does {{src:nng-aesthetic-minimalist}}.",
    },
  ],

  relations: [
    { target: "nielsen-usability-heuristics", type: "derived-from", note: "Heuristic 8 of Nielsen's ten usability heuristics." },
    { target: "aesthetic-usability-effect", type: "contrasts-with", note: "The effect describes how beauty changes perceived ease; the heuristic asks for beauty in service of clarity." },
    { target: "progressive-disclosure", type: "applied-in", note: "Rarely needed elements are deferred rather than deleted." },
    { target: "visual-hierarchy", type: "complementary-to", note: "Hierarchy orders what remains so the most important elements stand out." },
    { target: "cognitive-load-theory", type: "related-to", note: "Irrelevant elements add extraneous load." },
    { target: "information-scent", type: "related-to", note: "High-scent labels are part of the signal the heuristic asks designers to maximise." },
  ],

  practice: {
    dos: [
      { text: "Map every element to a task; remove what maps to none and defer what is rarely needed.", why: "Every extra element competes with the relevant ones and lowers their visibility {{src:nielsen-ten-heuristics-article}}.", kind: "industry" },
      { text: "Keep every element a primary task needs, even if the page becomes denser.", why: "A minimalist design contains all necessary elements; too few harms usability as much as too many {{src:nng-aesthetic-minimalist}}.", kind: "industry" },
      { text: "Limit visual variation with a small type scale, spacing scale and set of colour roles.", why: "NN/g warns against overdoing font and colour variation and against multipurpose visual cues {{src:nng-aesthetic-minimalist}}.", kind: "industry" },
    ],
    donts: [
      { text: "Don't replace labelled controls with unlabelled icons to look clean.", why: "People cannot tell what icons do, and controls need clear labels [WCAG 2.2 SC 2.4.6, AA; SC 2.5.3, A] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't lower contrast or remove control borders for a lighter look.", why: "Text needs 4.5:1 and control boundaries 3:1 [WCAG 2.2 SC 1.4.3 and 1.4.11, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't treat low usage as proof an element is unnecessary.", why: "Rarely used elements can be essential when needed, such as reporting a problem or contacting support.", kind: "context" },
    ],
    examples: [
      {
        title: "A content-priority audit of a library home page",
        language: "text",
        code: `Element               Task supported          Frequency  Decision
--------------------  ----------------------  ---------  ------------------------------------
Search box            find a book             very high  keep, top of page
Renew loans link      renew                   high       keep, visible without scrolling
Opening hours         plan a visit            high       keep, one line + link to full hours
Event carousel        discover events         low        replace with 3 upcoming events + link
News list (12 items)  read news               low        move to News page; link from home
Department list       contact a department    low        move to Contact page
Decorative banner     none                    —          remove
"Report a problem"    report an issue         rare       keep in footer (rare but essential)`,
        caption: "Illustrative. Frequency guides the decision, but rare-and-essential items stay reachable.",
      },
      {
        title: "Minimal but still labelled and accessible",
        language: "css",
        code: `/* An icon button that stays clear without visual clutter */
.icon-button {
  min-inline-size: 24px;                        /* WCAG 2.2 SC 2.5.8 */
  min-block-size: 24px;
  border: 1px solid var(--color-border-control); /* boundary at 3:1 or more */
  color: var(--color-text-default);
}
/* <button class="icon-button" aria-label="Renew loan"> <svg aria-hidden="true">…</svg> </button>
   Prefer a visible label where space allows; a tooltip alone is not a label. */`,
        caption: "Illustrative. The tokens stand for semantic roles whose pairs have been checked for contrast.",
      },
    ],
  },

  exercises: [
    {
      id: "aesthetic-and-minimalist-design-ex-audit",
      kind: "assignment",
      level: "beginner",
      title: "Signal or noise?",
      prompt: [
        "Take a screenshot of a busy home page. Mark every element as signal (helps a common task), occasional (helps a rare task) or noise (helps none).",
      ],
      deliverable: "An annotated screenshot and a list of what you would remove, move or keep.",
      criteria: ["Every element classified", "Tasks named", "Rare-but-essential items kept reachable"],
    },
    {
      id: "aesthetic-and-minimalist-design-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Undo an over-minimal redesign",
      prompt: [
        "Illustrative case. A library app's redesign replaced labelled buttons ('Renew', 'Reserve', 'Share') with light-grey icons on white. Renewals dropped and people asked where renewal had gone.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected design with labels, contrast and target size, and a validation plan.",
      criteria: ["Distinguishes the heuristic from the visual trend", "WCAG criteria cited", "Validation planned", "Trade-off named"],
      exampleSolution: [
        "1. Symptom: fewer renewals; people cannot find the action.",
        "2. Impact: overdue books and support requests.",
        "3. Cause: the redesign removed necessary elements (labels) and reduced contrast in pursuit of a minimal style.",
        "4. Principle: a minimalist design contains all necessary elements {{src:nng-aesthetic-minimalist}}; labels and contrast are required [WCAG 2.2 SC 2.4.6, AA; SC 1.4.11, AA].",
        "5. Correction: restore visible labels on primary actions; keep icons as supplements; raise icon and border contrast to at least 3:1; keep targets at least 24 px.",
        "6. Validation: task-based test of finding 'Renew'; compare renewal rates before and after.",
        "7. Trade-off: the row is slightly busier; prioritise by showing labels on the two most frequent actions and moving 'Share' into a menu.",
      ],
    },
    {
      id: "aesthetic-and-minimalist-design-ex-governance",
      kind: "reflection",
      level: "advanced",
      title: "Defend the home page",
      prompt: [
        "Five departments each want space on the home page. Propose a rule for what earns a place, the evidence you will use (tasks, usage, consequences of absence) and how the design system limits visual noise.",
      ],
      deliverable: "A one-page policy with a decision table.",
      criteria: ["Task-based criteria", "Usage combined with importance", "System constraints named", "Review cycle defined"],
    },
  ],

  quiz: [
    {
      id: "aesthetic-and-minimalist-design-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "According to the heuristic, why should rarely needed information be removed from a screen?",
      options: [
        { text: "It competes with relevant information and makes it less visible", correct: true, explanation: "Every extra element lowers the relative visibility of the important ones." },
        { text: "Empty screens look more modern", correct: false, explanation: "The heuristic is about relevance, not a visual trend." },
        { text: "Less content loads faster", correct: false, explanation: "Possibly true, but not the reason the heuristic gives." },
        { text: "People never need rare information", correct: false, explanation: "They sometimes do; it should be reachable, just not in the way." },
      ],
      explanation: "Signal and noise: remove what competes with what matters.",
    },
    {
      id: "aesthetic-and-minimalist-design-q-dense",
      kind: "scenario",
      level: "intermediate",
      prompt: "A train timetable is dense with numbers, but every column is used by travellers. Does it violate the heuristic?",
      options: [
        { text: "No — it contains only necessary information, so it can satisfy the heuristic", correct: true, explanation: "Minimalism here means relevance, not sparseness." },
        { text: "Yes — dense screens always violate it", correct: false, explanation: "Density is not the criterion." },
        { text: "Yes — it needs more white space whatever the cost", correct: false, explanation: "Removing needed data would harm the task." },
        { text: "It depends only on the colour scheme", correct: false, explanation: "Colour affects clarity but is not the test." },
      ],
      explanation: "Judge relevance to the task, not the amount on screen.",
    },
    {
      id: "aesthetic-and-minimalist-design-q-a11y",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "A minimal redesign uses #d0d0d0 borders on white input fields to look lighter. What is the accessibility concern?",
      options: [
        { text: "Control boundaries need at least 3:1 contrast against adjacent colours (WCAG 2.2 SC 1.4.11, AA)", correct: true, explanation: "Faint borders can make fields hard to identify." },
        { text: "There is none; borders are decorative", correct: false, explanation: "Field boundaries identify the control." },
        { text: "Borders must be black", correct: false, explanation: "Any colour meeting the ratio is fine." },
        { text: "Only text contrast matters", correct: false, explanation: "Non-text contrast applies to control boundaries." },
      ],
      explanation: "Minimal styles must keep the signals that identify controls.",
    },
  ],

  flashcards: [
    { id: "aesthetic-and-minimalist-design-fc-core", front: "Heuristic 8 in one line", back: "Remove what is irrelevant or rarely needed, because it competes with what matters — but keep everything necessary." },
    { id: "aesthetic-and-minimalist-design-fc-not", front: "What the heuristic is not", back: "The minimalist visual trend; sparse designs can fail it and dense ones can satisfy it." },
    { id: "aesthetic-and-minimalist-design-fc-wcag", front: "WCAG 2.2 checks for minimal designs", back: "Labels (2.4.6, 2.5.3), contrast (1.4.3, 1.4.11), target size (2.5.8), hover/focus content (1.4.13)." },
  ],

  references: [
    { source: "nielsen-ten-heuristics-article", role: "primary", note: "Heuristic 8 as currently stated." },
    { source: "nielsen-1994-heuristics", role: "primary", note: "Revision that named the heuristic." },
    { source: "molich-nielsen-1990", role: "primary", note: "'Simple and natural dialogue'." },
    { source: "nng-aesthetic-minimalist", role: "explanatory", note: "Signal and noise, necessary elements, not a visual trend." },
    { source: "sweller-1988", role: "primary", note: "Origin of cognitive load theory; extraneous load." },
    { source: "tufte-1983", role: "explanatory", note: "Data-ink ratio (book page read; book not read)." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.4.3, 1.4.11, 1.4.13, 2.4.6, 2.5.8 (AA) and 2.5.3 (A)." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Aesthetic and minimalist design is professional guidance from Nielsen's heuristics and NN/g's practice. Its mechanism is consistent with research on attention and cognitive load, but the heuristic has not been tested as a single claim. The accessibility checks are WCAG 2.2 success criteria, a W3C Recommendation.",

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
