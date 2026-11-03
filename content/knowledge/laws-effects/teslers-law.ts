import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "teslers-law",
  slug: "teslers-law",
  title: "Tesler's Law",
  alternateNames: ["Law of Conservation of Complexity", "Conservation of complexity"],
  summary:
    "Larry Tesler's principle that every application has an inherent amount of complexity that cannot be removed — only moved between the user, the application and the platform — so designers should decide deliberately who bears it.",
  definition:
    "Tesler's Law, or the Law of Conservation of Complexity, holds that **every application has an irreducible amount of complexity**, and the design question is who deals with it: the user, the application developer or the platform. Tesler argued that, in most cases, engineering effort should absorb complexity so that many users do not have to. It is a design principle, not an empirical law.",
  primaryType: "principle",
  secondaryTypes: ["rule-of-thumb", "historical-contribution"],
  domain: "laws-effects",
  subcategory: "popular-ux-laws",
  tags: ["complexity", "simplicity", "defaults", "automation", "product strategy", "trade-offs"],
  difficulty: "intermediate",
  disciplines: ["Interaction design", "Product design", "Software engineering"],
  learningObjectives: [
    "State Tesler's Law and its origin accurately.",
    "Distinguish essential complexity (which can only be moved) from accidental complexity (which should be removed).",
    "Identify where complexity sits in a flow and propose who should absorb it.",
    "Recognise when 'simplifying' an interface merely hides necessary complexity or removes user control.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Some things are complicated by nature. Sending money abroad involves currencies, fees, bank details and rules. You can make the screen look simple, but the complexity does not vanish — **someone has to deal with it**.",
        "Tesler's Law says that every product has a core of complexity that can't be removed, only **moved**. Either the person using the product handles it (by filling in more fields, making more decisions) or the people building it handle it (by automating, choosing good defaults, doing the hard work behind the scenes).",
        "Larry Tesler's view was that it's usually better for the builders to take on the work: a team spending an extra week saves millions of users an extra minute each.",
      ],
      analogy:
        "A restaurant meal has the same ingredients whether you cook it yourself or the chef does. Eating out doesn't make cooking simpler — it moves the work from you to the kitchen.",
      everydayExamples: [
        "A postcode lookup fills in your address so you don't have to type it all — the service took on the complexity.",
        "An email app that detects a missing attachment when you wrote 'attached' — the app handles a step you might forget.",
        "A camera's automatic mode handles exposure and focus that a manual mode leaves to the photographer.",
      ],
      vocabulary: [
        { term: "Complexity", meaning: "The number of decisions, pieces of information and steps needed to accomplish something." },
        { term: "Essential complexity", meaning: "Complexity that comes from the problem itself and cannot be removed." },
        { term: "Accidental complexity", meaning: "Complexity added by poor design or technology choices — it can be removed." },
        { term: "Default", meaning: "A pre-chosen value that the system uses unless the user changes it." },
      ],
    },
    intermediate: {
      explanation: [
        "Professionally, Tesler's Law is a tool for **deciding where complexity should live**. Map the decisions and information a task requires; then for each, decide whether the user, the product or the platform should handle it — and what it costs to move it.",
        "The law applies to **essential** complexity. Much of what makes interfaces hard is **accidental** — confusing labels, redundant steps, inconsistent patterns — and should simply be removed. Brooks's distinction between essential and accidental complexity in software makes this boundary explicit {{src:brooks-1987}}.",
        "Moving complexity to the system has costs and risks: engineering effort, opaque automation, wrong defaults and loss of user control. Good designs absorb complexity *and* stay transparent — they show what was decided on the user's behalf and let them change it.",
      ],
      howItWorks: [
        "List what the task inherently requires (inputs, rules, decisions).",
        "For each, ask: can the system infer it, default it, look it up or compute it?",
        "Where the system takes it on, make the decision visible and reversible.",
        "Where the user must keep it, support it with structure: progressive disclosure, clear explanations, validation and examples.",
      ],
      implementation: [
        "Use smart, transparent defaults for decisions most users would make the same way.",
        "Infer what you can (location, currency, format) and ask only for what you can't.",
        "Use [[progressive-disclosure|progressive disclosure]] to stage necessary complexity instead of deleting options.",
        "Keep advanced control available for expert users; simplification for novices should not remove it.",
        "Document who absorbs each piece of complexity in product requirements so trade-offs are explicit.",
      ],
      scenarios: [
        "A tax-filing service pre-fills data from official records, leaving users to confirm rather than enter it — complexity moved to the platform.",
        "A minimalist photo app removes all settings; professional users leave because the essential complexity of their work was not supported anywhere.",
        "An international payment form infers the currency from the destination but shows the exchange rate and fees clearly before confirmation.",
      ],
    },
    advanced: {
      explanation: [
        "On his personal website, Tesler dated the formulation to around 1984 and stated it as every application having an inherent amount of irreducible complexity, with the open question being who must deal with it {{src:tesler-nomodes}}. He discussed its origin in an interview published in Dan Saffer's *Designing for Interaction* {{src:saffer-2007}}.",
        "The principle should be read as a **heuristic about allocation**, not a conservation law in the physical sense. Complexity is not a measurable quantity that is conserved; the analogy is that the essential demands of a task persist across designs, while the distribution of effort between people and systems is a design choice.",
        "Norman argues similarly that complexity is often necessary and desirable in tools that support rich activities; the design aim is to make complexity **manageable and understandable**, not to eliminate it {{src:norman-2010}}.",
      ],
      evidence: [
        "There is no empirical test of Tesler's Law itself; it is a designer's principle documented by Tesler and popularised in practitioner literature {{src:tesler-nomodes}}.",
        "Related empirical traditions — on defaults, automation and cognitive load — show that moving work from users to systems can reduce effort, but also that automation introduces new failure modes such as over-reliance and loss of situation awareness.",
      ],
      debates: [
        "**Is complexity really conserved?** Critics note that much complexity is accidental and *can* be removed; the law is most useful when applied only to essential complexity.",
        "**Users take on new complexity.** A frequently cited counterpoint (popularised in Laws of UX and attributed to Bruce Tognazzini) is that when tools become simpler, people attempt more complex tasks, so total complexity does not fall {{src:laws-of-ux}}.",
        "**Automation and AI.** Systems that absorb complexity through inference or AI move it into opaque decisions; the burden shifts to users understanding and correcting the system's choices.",
      ],
      alternativeModels: [
        "**[[cognitive-load-theory|Cognitive Load Theory]]** — its distinction between intrinsic and extraneous load parallels essential versus accidental complexity.",
        "**[[progressive-disclosure|Progressive disclosure]]** — a technique for staging necessary complexity rather than removing it.",
        "**[[default-effect|Default effect]]** — explains both the power and the ethical risk of pre-deciding on users' behalf.",
      ],
    },
  },

  origin: {
    contributors: ["Larry Tesler"],
    period: "c. 1984 (Tesler's own dating), Apple",
    problem:
      "Software makers had to decide whether to expose the full complexity of tasks to users or to invest engineering effort in hiding and handling it.",
    narrative: [
      "Tesler, a computer scientist known for modeless editing and cut/copy/paste work at Xerox PARC, joined Apple in 1980. On his own website he dates the Law of Conservation of Complexity to about 1984 {{src:tesler-nomodes}}.",
      "An interview in Saffer's *Designing for Interaction* (2007) brought the law to a wide interaction-design audience {{src:saffer-2007}}; it is now a staple of practitioner collections {{src:laws-of-ux}}.",
    ],
    attributionNote:
      "Some popular accounts place the law at Xerox PARC in the mid-1980s; Tesler had moved from PARC to Apple in 1980, and his own site dates the law to about 1984. The interview content in Saffer's book is reported via Tesler's site and secondary sources and was not read first-hand here.",
  },

  application: {
    summary: [
      "Use Tesler's Law in **product and interaction decisions about simplification**: before removing steps or options, identify what complexity they carry, and decide explicitly whether the product, the platform or the user should bear it.",
    ],
    web: [
      "Address and payment autofill, postcode lookup, and format-tolerant inputs (accepting many date or phone formats) move complexity into the system.",
    ],
    mobile: [
      "Use device capabilities (camera scanning of cards, location) to replace manual entry, with a manual fallback.",
    ],
    enterprise: [
      "Configuration-heavy tools: provide sensible presets and templates while keeping full configuration for administrators.",
      "Integrations that pull data from other systems remove duplicate entry for staff.",
    ],
    services: [
      "Government 'tell us once' approaches move the complexity of updating multiple agencies from citizens to the service.",
    ],
    steps: [
      "Map every input and decision in the task.",
      "Label each as essential or accidental.",
      "Remove accidental complexity outright.",
      "For essential complexity, choose who bears it and how (infer, default, look up, stage, explain).",
      "Make system decisions visible and reversible; test with novices and experts.",
    ],
  },

  whenToUse: [
    "Simplification and redesign discussions where options or steps might be removed.",
    "Prioritising engineering investment in automation, defaults and integrations.",
    "Explaining to stakeholders why a 'simpler' UI may need more engineering.",
  ],
  whenNotToUse: [
    "To excuse accidental complexity as 'inherent'.",
    "To justify hiding information users need to make informed decisions (e.g. fees, privacy choices).",
    "As a quantitative model — complexity is not measured by the law.",
  ],
  advantages: [
    "Reframes simplification as allocation of effort.",
    "Supports business cases for automation and defaults.",
    "Warns against cosmetic simplicity.",
  ],
  limitations: [
    "Not empirically testable as stated.",
    "Does not distinguish essential from accidental complexity by itself.",
    "Absorbing complexity can create opacity and over-reliance.",
  ],
  misconceptions: [
    {
      myth: "Tesler's Law means you can never make a product simpler.",
      reality: "Accidental complexity can and should be removed. The law concerns the essential complexity of the task, which can only be moved.",
    },
    {
      myth: "The best design always hides all complexity from users.",
      reality: "Hiding consequential decisions removes control and can mislead. Absorb complexity transparently, and keep control for those who need it.",
    },
  ],

  relations: [
    { target: "progressive-disclosure", type: "applied-in", note: "Progressive disclosure stages essential complexity for users instead of removing it." },
    { target: "cognitive-load-theory", type: "related-to", note: "Intrinsic versus extraneous cognitive load parallels essential versus accidental complexity." },
    { target: "default-effect", type: "applied-in", note: "Defaults are a primary way of moving decisions from users to the system — with ethical responsibilities." },
    { target: "user-control-and-freedom", type: "contrasts-with", note: "Absorbing complexity can reduce user control; designers must balance automation with the ability to override." },
    { target: "jakobs-law", type: "related-to", note: "Both are practitioner maxims; following conventions is one way to keep complexity familiar rather than new." },
  ],

  exercises: [
    {
      id: "teslers-law-ex-map",
      kind: "assignment",
      level: "intermediate",
      title: "Complexity allocation map",
      prompt: [
        "Choose a form-heavy flow (e.g. booking a flight). List every input and decision it asks of the user.",
        "Label each as essential or accidental, and for essential items decide whether the system could infer, default or look it up. Note the risk of each change.",
      ],
      deliverable: "A table: item, essential/accidental, who should bear it, method, risk.",
      criteria: ["Distinguishes essential from accidental", "Proposes concrete mechanisms", "Identifies at least one risk of automation"],
    },
    {
      id: "teslers-law-ex-critique",
      kind: "critique",
      level: "advanced",
      title: "Simplicity or hidden complexity?",
      prompt: [
        "A budgeting app redesign removes the category settings screen and auto-categorises all transactions with no way to correct them.",
        "Critique this using Tesler's Law, user control and trust, and propose an alternative.",
      ],
      deliverable: "A 200-word critique with a proposed design.",
      criteria: ["Recognises complexity moved into opaque automation", "Addresses correction and transparency", "Proposes a balanced alternative"],
      exampleSolution: [
        "Categorisation is essential complexity: budgets depend on it. Auto-categorisation sensibly moves effort to the system, but removing correction makes errors permanent and erodes trust — the complexity reappears as users' inability to make the budget right.",
        "Alternative: auto-categorise with visible confidence, let users correct categories inline, learn from corrections, and keep a settings screen for custom categories.",
      ],
    },
  ],

  quiz: [
    {
      id: "teslers-law-q-core",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does Tesler's Law claim about complexity?",
      options: [
        { text: "Every application has some irreducible complexity; the question is who deals with it", correct: true, explanation: "This is Tesler's formulation." },
        { text: "Complexity always increases over time", correct: false, explanation: "The law is about allocation, not growth." },
        { text: "Users prefer complex interfaces", correct: false, explanation: "The law does not claim this." },
        { text: "Complexity can be eliminated by minimal visual design", correct: false, explanation: "Visual minimalism can hide complexity, not remove essential complexity." },
      ],
      explanation: "Tesler's Law is about who bears essential complexity.",
    },
    {
      id: "teslers-law-q-accidental",
      kind: "true-false",
      level: "intermediate",
      prompt: "Tesler's Law implies that confusing labels and redundant steps cannot be removed, only moved.",
      options: [
        { text: "True", correct: false, explanation: "Confusing labels and redundant steps are accidental complexity, which can be removed." },
        { text: "False", correct: true, explanation: "The law applies to essential complexity inherent in the task." },
      ],
      explanation: "Distinguish essential from accidental complexity before applying the law.",
    },
    {
      id: "teslers-law-q-scenario",
      kind: "scenario",
      level: "advanced",
      prompt: "A pension app asks users to choose between 40 funds. Which redesign best reflects Tesler's Law applied responsibly?",
      options: [
        { text: "Offer a well-explained default fund suited to most users, show what was chosen and why, and keep the full list available with comparison tools.", correct: true, explanation: "The system absorbs the decision for most users while preserving transparency and control." },
        { text: "Remove 39 funds so the choice is simple.", correct: false, explanation: "This removes options some users need; the essential complexity of investment choice reappears elsewhere." },
        { text: "Keep all 40 funds in one long list — complexity can't be reduced anyway.", correct: false, explanation: "The law argues for deliberately moving complexity, not for leaving it all with the user." },
        { text: "Pick a fund silently on the user's behalf.", correct: false, explanation: "Hidden decisions with financial consequences undermine autonomy and trust." },
      ],
      explanation: "Absorb complexity transparently and keep control available.",
      revise: "teslers-law",
    },
  ],

  flashcards: [
    { id: "teslers-law-fc-1", front: "Tesler's Law", back: "Every application has irreducible complexity; decide whether the user, the application or the platform deals with it." },
    { id: "teslers-law-fc-2", front: "Essential vs accidental complexity", back: "Essential comes from the problem and can only be moved; accidental comes from design choices and should be removed (Brooks, 1987)." },
  ],

  references: [
    { source: "tesler-nomodes", role: "primary", note: "Tesler's own account and dating of the law." },
    { source: "saffer-2007", role: "explanatory", note: "Interview with Tesler on the law (reported; not read first-hand)." },
    { source: "brooks-1987", role: "primary", note: "Essential versus accidental complexity." },
    { source: "norman-2010", role: "explanatory", note: "Designing for necessary complexity." },
    { source: "laws-of-ux", role: "further", note: "Popular presentation, including the Tognazzini counterpoint." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Tesler's Law is a designer's principle documented by its originator and popularised in practitioner literature; it has not been tested empirically and does not quantify complexity. It is consistent with research on defaults, automation and cognitive load, which also shows that moving work to systems introduces new risks.",

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
  lastVerifiedAt: "2026-11-03",
});
