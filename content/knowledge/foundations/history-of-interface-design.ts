import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "history-of-interface-design",
  slug: "history-of-interface-design",
  title: "History of Interface Design",
  alternateNames: ["History of user interfaces", "Evolution of interaction styles", "From command line to touch"],
  summary:
    "How the ways people operate computers changed: from batch jobs and command languages to menus and forms, to windows, icons, menus and a pointer, and then to touch and interfaces that infer what people want. Each style stayed dominant for years, then changed quickly.",
  definition:
    "The **history of interface design** is the history of interaction styles, the ways people give input to computers and get output back, and of the design ideas behind them. Nielsen's approximate generations run from programming and command languages, through full-screen menus and form fill-in, to **WIMP** interfaces (windows, icons, menus, pointing device) and the 'noncommand' interfaces he expected next {{src:nielsen-1993-noncommand}}. Van Dam describes the pattern as long periods of stability interrupted by rapid change {{src:van-dam-1997}}.",
  primaryType: "historical-contribution",
  secondaryTypes: [],
  domain: "foundations",
  subcategory: "history-ethics",
  tags: ["history", "interaction styles", "GUI", "WIMP", "direct manipulation", "touch", "command line"],
  difficulty: "beginner",
  disciplines: ["Human-computer interaction", "Interface design", "History of computing"],
  learningObjectives: [
    "Describe the main generations of interaction style and roughly when each dominated.",
    "Name the research systems behind the graphical interface and the commercial products that popularised it, with dates from a primary history.",
    "Explain why interface history is better told as long stable periods and rapid shifts than as steady progress, and why single 'inventor' stories mislead.",
    "Use historical patterns to judge claims about the next interface paradigm.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "The way you tell a computer what to do has changed several times. Early users wrote programs or typed commands; later, screens offered menus and forms to fill in; then came windows, icons, menus and a mouse pointer; today most people tap and swipe on touch screens and talk to assistants.",
        "Nielsen groups these into rough generations. From 1955 to 1965 people worked through batch processing and command languages; from 1965 to 1980, timesharing brought full-screen menus and form fill-in; from 1980 to 1995 personal computers brought **WIMP** interfaces; and he expected the next generation to be 'noncommand' interfaces, in which the computer infers what people need rather than waiting for commands {{src:nielsen-1993-noncommand}}. He stresses that the dates are approximate.",
        "The changes did not arrive smoothly. Van Dam compares interface history to 'punctuated equilibrium': long periods in which one style dominates, then rapid change {{src:van-dam-1997}}.",
      ],
      everydayExamples: [
        "Typing a command in a terminal window is the oldest style still in daily use.",
        "A bank teller's text-only screen with numbered menu options belongs to the menu-and-form generation.",
        "Dragging a file to a folder is direct manipulation, from the WIMP era.",
        "Pinching to zoom a map is multi-touch, which most people first met on phones.",
      ],
      vocabulary: [
        { term: "Interaction style", meaning: "A general way of giving input and getting output, such as commands, menus, direct manipulation or touch." },
        { term: "WIMP", meaning: "Windows, icons, menus and a pointing device: the style of graphical desktop interfaces." },
        { term: "Direct manipulation", meaning: "Acting on visible objects on screen, for example by dragging them." },
        { term: "Batch processing", meaning: "Submitting jobs, for example on punched cards, and getting results later." },
        { term: "Noncommand interface", meaning: "Nielsen's term for interfaces where the computer infers what the user needs instead of waiting for commands." },
      ],
    },
    intermediate: {
      explanation: [
        "**The graphical interface came from research labs.** Myers's history dates its main pieces: Sutherland's Sketchpad (1963) first demonstrated direct manipulation of objects on screen; the mouse was developed at SRI in 1965 as part of Engelbart's NLS and demonstrated in 1968, when NLS also showed tiled windows; Alan Kay proposed overlapping windows in 1969, and they first appeared in Smalltalk at Xerox PARC in 1974, where the Bravo editor was the first WYSIWYG editor; David Canfield Smith coined the term 'icons' in 1975 {{src:myers-1998}}.",
        "**Products made it common.** According to Myers, the first commercial systems to make extensive use of direct manipulation, the mouse and windows were the Xerox Star (1981), the Apple Lisa (1982) and the Macintosh (1984) {{src:myers-1998}}. The Star was designed for office work: networked workstations on which professionals produced and shared documents {{src:johnson-1989-star}}.",
        "**The style got a name and a theory.** Shneiderman coined 'direct manipulation' in 1982 {{src:myers-1998}} and described its principles: continuous representation of the objects of interest, physical actions instead of complex syntax, and rapid, incremental, reversible operations with visible results {{src:shneiderman-1983}}. See [[direct-manipulation]].",
        "**Touch has a long history too.** Buxton notes that touch screens were used for air traffic control in Great Britain in the late 1960s, and that multi-touch screens and tablets had already been developed when the Macintosh appeared in 1984; a multi-touch tablet from the University of Toronto was publicly demonstrated in 1985. Most people met multi-touch only with the 2007 launches of the iPhone and Microsoft Surface {{src:buxton-multitouch}}.",
      ],
      howItWorks: [
        "**Programming and commands**: people wrote programs or typed commands; batch jobs returned results later {{src:nielsen-1993-noncommand}} {{src:van-dam-1997}}.",
        "**Menus and forms**: timesharing terminals offered full-screen hierarchical menus and form fill-in to people without computer knowledge {{src:nielsen-1993-noncommand}}.",
        "**WIMP and direct manipulation**: personal computers with graphical displays and a mouse; objects acted on directly {{src:nielsen-1993-noncommand}} {{src:myers-1998}}.",
        "**Touch and beyond**: multi-touch screens on phones and tablets {{src:buxton-multitouch}}, and interfaces that infer intent rather than wait for commands {{src:nielsen-1993-noncommand}}.",
      ],
      implementation: [
        "When a 'new paradigm' is announced, look for the decades of research behind it; most major interface styles came from university and lab research {{src:myers-1998}}.",
        "Expect older styles to persist: command lines and form-based screens are still in use alongside graphical and touch interfaces.",
        "Read primary histories rather than single-inventor stories; Buxton's account explicitly rejects the idea that any one lab or company invented multi-touch {{src:buxton-multitouch}}.",
      ],
      scenarios: [
        "Illustrative scenario: a team replacing a fast, keyboard-driven claims system with a mouse-driven web app finds experienced staff slower. The older style suited their expert, repetitive work; the redesign adds keyboard shortcuts.",
        "Illustrative scenario: a product manager claims voice will replace screens within two years. A designer points to how long earlier styles took to spread and how many older styles still coexist, and proposes testing voice for specific tasks instead.",
      ],
    },
    advanced: {
      explanation: [
        "Myers wrote his history partly to argue that the major interface styles came from research at universities and labs, often government-funded, rather than from product companies alone {{src:myers-1998}}. That argument shapes which systems his chronology includes, and it is a useful corrective to histories that start with commercial products.",
        "Generational schemes are simplifications. Nielsen says his generations are approximate and that the dimensions did not change together {{src:nielsen-1993-noncommand}}, and van Dam's four generations are tied to the hardware of each period {{src:van-dam-1997}}. Nielsen's fifth generation, 'noncommand' interfaces from 1996, was a forecast written in 1993, and should be read as one.",
      ],
      evidence: [
        "A primary history of HCI technology dates Sketchpad (1963), the mouse (1965), the NLS demonstration (1968), overlapping windows (1974), and the Star (1981), Lisa (1982) and Macintosh (1984) {{src:myers-1998}}.",
        "Two generational accounts describe the shift from batch and command interfaces through menus to WIMP {{src:nielsen-1993-noncommand}} {{src:van-dam-1997}}.",
        "A first-hand history of multi-touch places its origins decades before its popular arrival in 2007 {{src:buxton-multitouch}}.",
      ],
      debates: [
        "**Who invented it?** Popular stories credit single companies or people. Myers traces most styles to research labs {{src:myers-1998}}, and Buxton argues that each step stood on earlier work {{src:buxton-multitouch}}. 'First' claims depend on what counts: a demonstration, a research system or a product.",
        "**Progress or punctuation?** Van Dam argues that interfaces did not improve steadily like hardware, but changed in bursts {{src:van-dam-1997}}. Treating history as a straight line of improvement hides the long periods in which one style dominated.",
      ],
      alternativeModels: [
        "Nielsen's six generations of computers and user interfaces, from pre-history to noncommand interfaces {{src:nielsen-1993-noncommand}}.",
        "Van Dam's four generations, with post-WIMP interfaces as the next step {{src:van-dam-1997}}.",
        "The broader research history of the field in [[human-computer-interaction]].",
      ],
    },
  },

  origin: {
    contributors: ["Ivan Sutherland", "Douglas Engelbart", "Alan Kay", "David Canfield Smith", "Ben Shneiderman", "Brad Myers", "Bill Buxton"],
    period: "1963 (Sketchpad) to the 2007 popular arrival of multi-touch",
    problem:
      "Each generation of hardware made new ways of interacting possible, and each new group of users, from specialists to everyone, needed interfaces they could use without programming {{src:nielsen-1993-noncommand}}.",
    narrative: [
      "Research systems of the 1960s and 1970s, from Sketchpad and NLS to Smalltalk and Bravo at Xerox PARC, built the components of the graphical interface {{src:myers-1998}}.",
      "In the early 1980s the Star, the Lisa and the Macintosh brought them to products {{src:myers-1998}} {{src:johnson-1989-star}}, and Shneiderman described the style as direct manipulation {{src:shneiderman-1983}}.",
      "Touch and multi-touch, demonstrated in research decades earlier, reached most people in 2007 {{src:buxton-multitouch}}.",
    ],
    attributionNote:
      "Dates come from Myers's history, read in full from the author's technical-report copy, and from Buxton's account; the Star retrospective and van Dam's article were read as abstracts. Systems are the landmarks these sources name, not a complete list.",
  },

  application: {
    summary: [
      "Interface history helps designers judge new paradigms soberly, respect older styles that still work, and understand where today's conventions came from.",
    ],
    web: [
      "Many web conventions, such as windows, menus and clickable icons, inherit the WIMP vocabulary of the 1980s {{src:myers-1998}}.",
    ],
    mobile: [
      "Multi-touch gestures on phones rest on decades of research, which is why their conventions settled quickly once devices reached the public {{src:buxton-multitouch}}.",
    ],
    enterprise: [
      "Form-based and command interfaces remain efficient for experts doing repetitive work; replacing them needs evidence, not fashion.",
    ],
    services: [
      "A service may need several interaction styles at once, such as forms on the web, touch on phones and voice on the telephone.",
    ],
    steps: [
      "Identify the interaction style your product uses.",
      "Ask which users and tasks it suits, and which it does not.",
      "Check the history behind any 'new paradigm' you are asked to adopt.",
      "Keep older styles where they serve expert or accessibility needs.",
    ],
  },

  whenToUse: [
    "Explaining why today's interface conventions look the way they do.",
    "Evaluating claims that a new interface style will replace the current ones.",
    "Teaching the vocabulary of interaction styles.",
  ],
  whenNotToUse: [
    "As proof that newer styles are always better; older styles persist because they suit some users and tasks.",
    "To credit a single inventor or company with a style that emerged from many contributions.",
  ],
  advantages: [
    "Gives context for design conventions and their trade-offs.",
    "Corrects single-inventor myths with primary histories.",
    "Encourages realistic expectations about how quickly styles change.",
  ],
  limitations: [
    "Draws mainly on two primary histories and two generational schemes; other histories would add systems and people.",
    "Focuses on the computer side of interaction; Myers notes that a companion history of the human side would also be needed.",
    "Covers developments up to the popular arrival of multi-touch in detail; later styles are only outlined.",
  ],
  misconceptions: [
    {
      myth: "Apple invented the graphical user interface.",
      reality: "Its components came from research systems such as Sketchpad, NLS, Smalltalk and Bravo; the Xerox Star (1981) preceded the Lisa (1982) and Macintosh (1984) {{src:myers-1998}}.",
    },
    {
      myth: "Multi-touch was invented for the iPhone.",
      reality: "Multi-touch tablets were demonstrated in the 1980s and touch screens were used in the 1960s; 2007 was when most people met it {{src:buxton-multitouch}}.",
    },
    {
      myth: "Interfaces have improved steadily, like computer hardware.",
      reality: "Van Dam describes long stable periods punctuated by rapid change {{src:van-dam-1997}}.",
    },
  ],

  relations: [
    { target: "human-computer-interaction", type: "related-to", note: "The HCI entry traces the research field's history; this entry traces the interaction styles it produced." },
    { target: "direct-manipulation", type: "related-to", note: "Direct manipulation, named by Shneiderman in 1982, is the defining style of the WIMP generation." },
    { target: "ui-design", type: "related-to", note: "UI design today works within conventions inherited from these generations of interaction style." },
    { target: "evolution-of-digital-experiences", type: "complementary-to", note: "This entry covers how people operate computers; that one covers who uses them, where and why." },
    { target: "jakobs-law", type: "related-to", note: "Conventions inherited from earlier interface generations are one reason people expect sites to work like others they know." },
  ],

  exercises: [
    {
      id: "history-of-interface-design-ex-styles",
      kind: "critique",
      level: "beginner",
      title: "Spot the generations",
      prompt: [
        "Find three interfaces you use this week that belong to different interaction styles, for example a command line, a form-based screen and a touch app.",
        "Name the style of each and say what kind of user or task it suits best.",
      ],
      deliverable: "Three examples with their style and best fit.",
      criteria: ["Styles are correctly named", "Fit is argued from users and tasks"],
    },
    {
      id: "history-of-interface-design-ex-timeline",
      kind: "assignment",
      level: "intermediate",
      title: "Build a sourced timeline",
      prompt: [
        "Using only Myers's history, build a timeline of ten interface milestones from 1963 to 1984, with the system, place and year for each.",
        "Mark which were research systems and which were products, and write two sentences on what the pattern suggests.",
      ],
      deliverable: "A ten-row timeline and a short interpretation.",
      criteria: ["Every date is from the source", "Research and products distinguished", "Interpretation stays within the evidence"],
    },
    {
      id: "history-of-interface-design-ex-forecast",
      kind: "reflection",
      level: "advanced",
      title: "Judge a forecast",
      prompt: [
        "Nielsen predicted in 1993 that 'noncommand' interfaces would define the next generation. Using today's products, argue how far the forecast came true, and what that suggests about current claims that AI agents will replace graphical interfaces.",
      ],
      criteria: ["Treats the 1993 text as a forecast", "Uses concrete examples", "Draws a cautious, evidence-based conclusion"],
    },
  ],

  quiz: [
    {
      id: "history-of-interface-design-q-wimp",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does WIMP stand for?",
      options: [
        { text: "Windows, icons, menus, pointing device", correct: true, explanation: "The style of graphical desktop interfaces from the 1980s." },
        { text: "Web, internet, mobile, phone", correct: false, explanation: "These are platforms, not the elements of the graphical interface." },
        { text: "Wizards, inputs, modals, prompts", correct: false, explanation: "These are interface components, not the acronym." },
        { text: "Write, interpret, modify, publish", correct: false, explanation: "This is not an interface style." },
      ],
      explanation: "WIMP names the elements of the graphical desktop.",
    },
    {
      id: "history-of-interface-design-q-first",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "According to Myers, which was the first commercial system to make extensive use of direct manipulation, windows and the mouse?",
      options: [
        { text: "Xerox Star (1981)", correct: true, explanation: "It preceded the Apple Lisa (1982) and Macintosh (1984)." },
        { text: "Apple Macintosh (1984)", correct: false, explanation: "The Macintosh popularised the style, but the Star and Lisa came first." },
        { text: "Microsoft Windows 95", correct: false, explanation: "Myers describes Windows 95 as based on the Macintosh, much later." },
        { text: "Sketchpad (1963)", correct: false, explanation: "Sketchpad was a research system, not a commercial product." },
      ],
      explanation: "Research systems first, then the Star, Lisa and Macintosh.",
    },
    {
      id: "history-of-interface-design-q-teller",
      kind: "scenario",
      level: "intermediate",
      prompt: "In Nielsen's generations, a 1975 bank teller using a full-screen terminal with numbered menus and forms belongs to which generation?",
      options: [
        { text: "Generation 3 (1965-1980): timesharing, full-screen menus and form fill-in, used by specialised groups without computer knowledge", correct: true, explanation: "Nielsen gives bank tellers as an example of that generation's users." },
        { text: "Generation 4: WIMP", correct: false, explanation: "WIMP belongs to personal computers from 1980." },
        { text: "Generation 2: batch and command languages", correct: false, explanation: "That generation's users were technocrats and professional computerists." },
        { text: "Generation 5: noncommand interfaces", correct: false, explanation: "That was Nielsen's forecast for after 1996." },
      ],
      explanation: "Each generation pairs an interaction style with the users and hardware of its time.",
    },
    {
      id: "history-of-interface-design-q-claim",
      kind: "critique",
      level: "advanced",
      prompt: "A keynote says: 'Multi-touch was invented in 2007 and instantly replaced everything before it.' Which correction is best supported?",
      options: [
        { text: "Multi-touch was demonstrated in research decades earlier and reached most people in 2007; older styles such as commands and forms are still in use", correct: true, explanation: "This matches Buxton's account and the persistence of older styles." },
        { text: "The claim is right; there was no touch technology before 2007", correct: false, explanation: "Touch screens were used in the 1960s, according to Buxton." },
        { text: "Multi-touch was invented by Xerox PARC in 1974", correct: false, explanation: "PARC's 1974 work concerned windows and WYSIWYG editing, not multi-touch." },
        { text: "Multi-touch never became popular", correct: false, explanation: "It is the main input style of phones and tablets." },
      ],
      explanation: "Distinguish research demonstration, product launch and popular adoption.",
    },
  ],

  flashcards: [
    { id: "history-of-interface-design-fc-1", front: "Sketchpad", back: "Ivan Sutherland's 1963 MIT thesis system; first demonstration of direct manipulation (Myers)." },
    { id: "history-of-interface-design-fc-2", front: "First commercial GUIs (Myers)", back: "Xerox Star (1981), Apple Lisa (1982), Macintosh (1984)." },
    { id: "history-of-interface-design-fc-3", front: "Nielsen's interface generations", back: "Programming; command languages (1955-65); menus and forms (1965-80); WIMP (1980-95); noncommand (forecast from 1996)." },
    { id: "history-of-interface-design-fc-4", front: "Punctuated equilibrium (van Dam)", back: "Interface history as long periods of stability interrupted by rapid change." },
  ],

  references: [
    { source: "myers-1998", role: "primary", note: "Dated milestones of interface technology; read in full (author's report)." },
    { source: "nielsen-1993-noncommand", role: "primary", note: "Generations of user interfaces; table read in full." },
    { source: "van-dam-1997", role: "primary", note: "Punctuated equilibrium and interface generations; abstract read." },
    { source: "johnson-1989-star", role: "primary", note: "The Xerox Star; abstract read." },
    { source: "shneiderman-1983", role: "primary", note: "Direct manipulation principles; read in full in an earlier session." },
    { source: "buxton-multitouch", role: "explanatory", note: "History of touch and multi-touch; preamble read." },
    { source: "engelbart-1968-demo-digest", role: "further", note: "Footage of the 1968 demonstration in short captioned clips. Watch the editing and view-control clips and list which of its ideas a current interface still uses, such as pointing with a mouse, outline views of a structured document and switching between text and graphical views, and which have dropped out of use." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "This is a history entry. Its dates come from Myers's history of HCI technology, read in full, and from Buxton's first-hand account of multi-touch; the generational framing comes from Nielsen's table, read, and van Dam's abstract. The Star retrospective was read as an abstract. Generational schemes are interpretive simplifications, and Nielsen's fifth generation was a 1993 forecast; the entry says so where it uses them.",

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
  lastVerifiedAt: "2026-11-19",
});
