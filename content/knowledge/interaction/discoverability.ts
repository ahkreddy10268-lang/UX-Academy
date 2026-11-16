import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "discoverability",
  slug: "discoverability",
  title: "Discoverability",
  alternateNames: ["Feature discoverability", "Navigation discoverability", "Discoverable design"],
  summary:
    "Discoverability is whether people can work out, from the interface itself, which actions and options exist, where they are and how to reach them. Functionality that is not discovered is, for that person, functionality that does not exist.",
  definition:
    "In interaction design, **discoverability** is the degree to which people can find out what they can do with a product — which actions and options exist, where they are, and how to perform them — without being told. Norman's revised *Design of Everyday Things* treats it, together with *understanding*, as a central quality of good design {{src:norman-2013}}. Discovery happens in steps: people have to **notice** something, **recognise** it as something they can act on, **predict** what it will do or contain, and **judge it worth the effort** to try. A design can fail at any step. This entry is about that whole chain; how a single cue communicates an action is covered by [[signifiers]], and how content is organised so people can locate it is the subject of [[information-architecture]].",
  primaryType: "principle",
  secondaryTypes: [],
  domain: "interaction",
  subcategory: "principles",
  tags: ["discoverability", "hidden navigation", "hamburger menu", "salience", "information scent", "progressive disclosure", "feature adoption", "mobile navigation"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "UI design", "Information architecture", "UX research", "Product design"],
  learningObjectives: [
    "Explain discoverability as a chain — notice, recognise, predict, decide to act — and say where a given design breaks it.",
    "Distinguish discoverability from signifiers, findability, visibility of system status and learnability.",
    "Interpret the NN/g hidden-navigation study correctly: what it measured, on which sites and devices, and what it did not test.",
    "Decide when hiding functionality behind a menu, gesture or disclosure is a reasonable trade-off and when it creates an avoidable discovery cost.",
    "Plan an evaluation that can show whether people discover a function without being directed to it.",
  ],
  prerequisites: ["signifiers", "mental-models"],

  levels: {
    beginner: {
      explanation: [
        "Imagine an app that can delete a message, but only if you swipe it to the left. Nothing on screen says so. Many people will never try, and for them the feature does not exist. **Discoverability** is about that gap: whether people can tell, by looking and exploring, what the product lets them do.",
        "To discover something, people have to **notice** it, **recognise** that it does something, **guess** what it will do or what is inside it, and decide it is **worth trying**. A tiny grey icon may never be noticed. A plain word may not look clickable. A menu called 'More' does not say what is inside. A feature buried three levels deep may not seem worth the search.",
        "Making everything visible is not the answer either: a screen full of buttons is hard to scan, and people miss things in clutter too. Good design shows the most important actions plainly and puts the rest where people will expect to find them.",
      ],
      analogy:
        "A shop that keeps most of its stock in a back room. Customers who know to ask can buy anything, but most only buy what they can see on the shelves — and a sign saying what is in the back changes how many people ask.",
      everydayExamples: [
        "A website whose main sections are listed across the top, rather than hidden behind a small icon.",
        "A text editor that shows keyboard shortcuts next to menu commands, so people discover the faster way while using the slow one.",
        "A phone app with tabs for its main areas and a labelled 'More' tab for the rest.",
        "A list where each row has a visible '⋯' button, so actions are not available only through a hidden swipe or long press.",
      ],
      vocabulary: [
        { term: "Discoverability", meaning: "How easily people can find out, from the interface, what actions and options exist and how to use them." },
        { term: "Salience", meaning: "How much something stands out and attracts attention compared with what surrounds it." },
        { term: "Information scent", meaning: "The cues, such as a label, that let people predict what they will find if they follow a path." },
        { term: "Hidden navigation", meaning: "Navigation that only appears after an action, such as opening a menu behind an icon." },
        { term: "Interaction cost", meaning: "The effort — looking, thinking, clicking, waiting — that an action takes." },
      ],
    },
    intermediate: {
      explanation: [
        "**A chain that can break at each link.** Discovery depends on several things at once. *Salience*: does the element stand out from its surroundings ([[visual-hierarchy]])? *Signifiers*: does it look like something you can act on ([[signifiers]])? *Information scent*: does its label or icon tell people what they will get? *Interaction cost*: is it worth opening, scrolling or searching? *Expectations*: is it where people have learned to look, from other products ([[jakobs-law]]) and from their own [[mental-models|mental model]] of this one? These are the factors NN/g's study of hidden navigation used to explain its results: low salience, low information scent, extra work, a lack of consistent standards and low familiarity {{src:nng-hidden-navigation}}.",
        "**The hidden-navigation study.** NN/g and a remote-testing firm ran a quantitative study with **179 participants** on **six live websites**, on desktop and on phones, comparing *hidden* navigation (behind an icon or button), *visible* navigation and a *combination* {{src:nng-hidden-navigation}}. Tasks were simple and did not tell people to use the navigation; some could be done without it. On desktop, people used hidden menus in 27 % of cases, against 48 % for visible and 50 % for combination navigation; on phones, 57 % for hidden against 86 % for combination. Visible-only navigation was **not tested on phones**. 'Content discoverability' — finding content through the navigation, not search, when it was not linked from the homepage — fell by more than 20 % with hidden navigation; rated difficulty rose (21 % against visible, 11 % against combination, over both devices); and tasks took at least 39 % longer on desktop and 15 % longer on phones. The time before people first used the navigation was longer when it was hidden, but that difference was only marginally significant {{src:nng-hidden-navigation}}.",
        "**What the study does and does not say.** It shows that, on these sites and tasks, hiding global navigation reduced its use and made tasks harder, more so on desktop than on phones. The authors themselves note that not opening a menu can mean people saw a better option, such as an in-page link with strong scent {{src:nng-hidden-navigation}}. A follow-up on the same data found large differences between the phone sites: navigation was used in 89 % of tasks on one site with a wide, labelled 'Browse' button and in 44 % on one with a small, unlabelled arrow placed beside the logo, where it looked like part of the logo and some participants seemed to take the whole top section for a banner {{src:nng-discoverable-mobile-navigation}}. Hidden or visible is one factor; salience, labelling, placement and expectations are others.",
        "**Discoverability is not the same as its neighbours.** *Signifiers* are the cues that tell people where and how to act; discoverability is whether the whole chain works, and also depends on placement, scent and cost. *Findability* is whether people can locate content they already know they want; discoverability includes noticing things they did not know existed. *Visibility of system status* tells people what the system is doing; discoverability tells them what they can do. *Learnability* is how quickly people become proficient; discovering a function is one part of it, and researchers do not agree on how learnability should be defined or measured {{src:grossman-2009-learnability}}.",
      ],
      howItWorks: [
        "**Notice.** Size, contrast, position and isolation decide what is seen. A small icon in a wide header may simply be missed: on desktop, NN/g observed people who did not see the menu icon at all, and some said the site had no menu {{src:nng-hidden-navigation}}.",
        "**Recognise.** The element has to look actionable — a button that looks like a button, a link that looks like a link. This is the job of [[signifiers]].",
        "**Predict.** A label tells people what they will get; an icon alone often does not. NN/g lists low information scent among the reasons hidden menus are used less: the icon does not say what is inside {{src:nng-hidden-navigation}}.",
        "**Decide.** Each extra tap, scroll or level of nesting is a cost people weigh against the expected benefit. Functionality behind more steps is tried less.",
      ],
      implementation: [
        "Show the top-level choices people need most. NN/g recommends not hiding a website's main navigation on desktop, and on phones showing up to about four top-level links and hiding the rest when there are more — recommendations from their research and experience, not fixed thresholds {{src:nng-hidden-navigation}}.",
        "When something must be hidden, label the way in: a word such as 'Menu' or 'More', or a visible list of the first few items, carries more scent than an unlabelled icon {{src:nng-discoverable-mobile-navigation}}.",
        "Give important actions a visible route even if a faster hidden one exists: a '⋯' button as well as a swipe, a menu command as well as a keyboard shortcut ([[flexibility-and-efficiency-of-use]]).",
        "Put things where people expect them, and keep placement consistent across screens; an unusual place costs discovery every time.",
        "Use [[progressive-disclosure]] for genuinely secondary options, and check that the way in is itself discoverable.",
        "Support discovery from content: in-page links to important sections help when the main navigation is hidden {{src:nng-hidden-navigation}}.",
      ],
      scenarios: [
        "**Illustrative.** A news site moves its sections behind a hamburger icon on desktop to 'clean up' the header. Section pages lose traffic and search use rises. Restoring the five main sections as visible links, with the rest under 'More', keeps the header tidy and puts the main routes in view.",
        "**Illustrative.** A photo app lets people delete a photo only by long-pressing it. Support tickets ask how to delete photos. Adding a visible delete action to the photo view, while keeping long-press for people who know it, removes the question.",
        "**Discovery review protocol.** For each important function, ask: Where will people first look for it? Will they notice the way in, recognise it as actionable, and predict what is behind it? How many steps does it take? Is it ever available only through a gesture, shortcut or hover?",
      ],
    },
    advanced: {
      explanation: [
        "**Visibility versus clutter is a real trade-off.** Showing everything raises the visual noise and makes each item harder to notice; hiding things saves space and attention but makes every hidden item cost a discovery step. The useful question is not 'visible or hidden?' but 'which functions are important or frequent enough to earn a visible place, and how do people reach the rest?' Frequency, importance and the cost of not finding something differ by product, task and user group, which is why no single rule settles it.",
        "**Progressive disclosure helps when its way in is discoverable.** Deferring secondary options reduces complexity, but each deferred option now depends on people noticing the trigger, predicting what is behind it and judging it worth opening. When the trigger is a clearly labelled 'Advanced settings' near where those settings are needed, the cost is small; when it is an unlabelled icon, or the hidden item is something most people need, the cost falls on many people ([[progressive-disclosure]]).",
        "**Device and context change the balance.** In the NN/g study, hidden navigation hurt more on desktop than on phones; the authors suggest reasons such as navigation taking a larger share of a small screen, more familiarity with hidden menus on phones, and the greater effort of exploring page content on mobile {{src:nng-hidden-navigation}}. These are their explanations, not separately tested findings. The same pattern can therefore be a reasonable compromise on a phone and an avoidable cost on a wide screen.",
        "**Gestures, shortcuts and hover are invisible by default.** They are efficient for people who know them and undiscoverable for people who do not. They work as accelerators alongside a visible route, rather than as the only route ([[flexibility-and-efficiency-of-use]]); content that appears only on hover is also unavailable to touch and keyboard users unless designed for them.",
        "**Discoverability is learned over time.** Repeated exposure to a consistent pattern makes it easier to find; NN/g notes that inconsistent implementations of hidden navigation across sites limit how far familiarity can help {{src:nng-hidden-navigation}}. Inside one product, consistent placement and naming do the same work.",
      ],
      evidence: [
        "Norman's framing of discoverability and understanding as central qualities of design is a widely used design framework, not an experimental result {{src:norman-2013}}.",
        "The strongest specific evidence cited here is NN/g's quantitative study of hidden, visible and combination navigation: 179 participants, six live websites, desktop and phone, two simple tasks per site, five measures, analysed with mixed-effects models {{src:nng-hidden-navigation}}. It was reported by NN/g as a practitioner article rather than in a peer-reviewed paper, it covers global navigation on content and e-commerce sites, and it did not test visible-only navigation on phones. The follow-up compares the phone sites and links usage to salience, labelling and placement {{src:nng-discoverable-mobile-navigation}}.",
        "Learnability research shows there is little agreement on how to define or measure learnability, and that in one study a question-suggestion protocol exposed significantly more learnability issues than a traditional think-aloud {{src:grossman-2009-learnability}} — relevant because the method used affects which discovery problems are found.",
      ],
      debates: [
        "**Hide navigation on mobile?** NN/g recommends visible or combination navigation where possible and accepts hiding some links on phones when there are many, because the penalty they measured on phones was smaller than on desktop {{src:nng-hidden-navigation}}. Others favour minimal chrome to give content more space. The study supports the existence of a cost; how much of it is worth paying depends on the site and its tasks.",
        "**Clean or obvious?** Minimal interfaces reduce clutter but tend to remove salience and signifiers; obvious interfaces aid discovery but can overwhelm. This tension also appears in the debate on flat design ([[signifiers]]).",
      ],
      alternativeModels: [
        "**Findability and information architecture** frame the same problem from the side of content organisation and search, rather than from the side of the interface's cues ([[information-architecture]]).",
        "**Learnability** frames discovery as one part of how people become proficient over time, and measures it over repeated use rather than at first encounter {{src:grossman-2009-learnability}}.",
      ],
    },
  },

  origin: {
    contributors: ["Donald A. Norman", "Kara Pernice and Raluca Budiu (Nielsen Norman Group)"],
    period: "2013 (Norman's revised edition); 2016 (NN/g hidden-navigation study)",
    problem: "Products offered capabilities that many people never found, because the interface gave too little indication of what was possible, where it was, or how to reach it.",
    narrative: [
      "Norman's revised edition of *The Design of Everyday Things* gives discoverability, with understanding, a central place among the qualities of good design {{src:norman-2013}}.",
      "In 2016, NN/g measured the effect of hiding a website's main navigation on desktop and on phones, and analysed which design features made mobile navigation more or less discoverable {{src:nng-hidden-navigation}} {{src:nng-discoverable-mobile-navigation}}.",
    ],
  },

  application: {
    summary: ["Discoverability applies to navigation, commands, settings, gestures, shortcuts and any feature that people need to know exists before they can use it."],
    web: [
      "On wide screens, show the main navigation; label menus; provide in-page links to important content; do not rely on hover alone to reveal actions.",
    ],
    mobile: [
      "Show the most important sections (for example as tabs or a partly visible bar) and put the rest under a labelled menu; give every gesture-only action a visible alternative; make menu buttons look tappable and distinct from the logo or banner.",
    ],
    enterprise: [
      "Dense tools hide much behind menus and right-click; show the frequent commands, make the command palette or search for commands easy to find, and display shortcuts next to the commands they speed up.",
    ],
    services: [
      "Across channels, tell people what they can do in each one — what the app, the website and the phone line support — so they do not assume a capability is missing.",
    ],
    steps: [
      "List the functions people must be able to find, and rank them by importance and frequency.",
      "Give the most important a visible place; decide how people will reach the rest and label that route.",
      "Check each step of the chain: noticed, recognised, predicted, worth the effort.",
      "Give every hidden or accelerated route (gesture, shortcut, hover) a visible alternative.",
      "Test with tasks that do not tell people where to go, and watch which routes they discover.",
    ],
  },

  whenToUse: [
    "When deciding what to show and what to hide, especially when adapting a design between phone and desktop.",
    "When a feature is underused and you need to know whether people do not want it or cannot find it.",
    "When reviewing designs that rely on icons, gestures, hover or nested menus.",
  ],
  whenNotToUse: [
    "As a reason to show every option at once; clutter also hides things.",
    "As a substitute for organising content well — locating known content is the job of information architecture and findability.",
  ],
  advantages: [
    "Helps people use what a product already offers, without training or documentation.",
    "Gives teams a way to tell 'nobody wants this' apart from 'nobody can find this'.",
    "Breaks a vague complaint ('it's hard to use') into specific failures: not noticed, not recognised, not predicted, not worth the effort.",
  ],
  limitations: [
    "There is no single measure of discoverability; results depend on the tasks, the people and the method used.",
    "Much of the specific evidence concerns website navigation; findings about menus on six sites do not automatically transfer to other kinds of functionality or products.",
    "Visibility competes with clutter and with space on small screens; the right balance depends on how important and frequent each function is.",
    "Discoverability is only the first step: a function that is found but not understood still fails.",
  ],
  misconceptions: [
    {
      myth: "Hamburger menus are always bad.",
      reality:
        "NN/g's study found that hiding navigation reduced its use and made tasks harder, with a larger effect on desktop than on phones, and recommends hiding some links on phones when there are too many to show {{src:nng-hidden-navigation}}. The follow-up found large differences between hidden menus depending on salience, labelling and placement {{src:nng-discoverable-mobile-navigation}}. The question is what is hidden, how the way in looks, and on which device.",
    },
    {
      myth: "If an option is in the interface somewhere, users can discover it.",
      reality:
        "People have to notice it, recognise it as actionable, predict what it does and judge it worth the effort. On desktop, some NN/g participants did not see a menu icon at all and believed the site had no menu {{src:nng-hidden-navigation}}.",
    },
    {
      myth: "Discoverability means showing everything.",
      reality:
        "Showing everything adds clutter, which also makes things harder to notice. Discoverability is about giving important functions a visible place and making the route to the rest predictable ([[progressive-disclosure]]).",
    },
    {
      myth: "Low use of a feature proves people do not want it.",
      reality:
        "It may mean they never found it. NN/g note that not using a menu can also mean people saw a better option on the page {{src:nng-hidden-navigation}}, so usage figures alone cannot separate the two; observe people trying tasks.",
    },
  ],

  relations: [
    { target: "signifiers", type: "related-to", note: "Signifiers are the main way screens communicate actions; discoverability is whether the whole chain of noticing, recognising and predicting works." },
    { target: "affordances", type: "related-to", note: "Discoverability depends on affordances being perceivable." },
    { target: "progressive-disclosure", type: "contrasts-with", note: "Deferring features reduces complexity but adds a discovery step for each deferred feature." },
    { target: "recognition-over-recall", type: "related-to", note: "Visible options can be recognised; hidden ones must be remembered or searched for." },
    { target: "visual-hierarchy", type: "related-to", note: "Salience — what stands out — decides what people notice first." },
    { target: "mental-models", type: "related-to", note: "People look where their model of the product, and of similar products, tells them to." },
    { target: "information-architecture", type: "related-to", note: "Organisation and labelling decide what people can locate; discoverability also covers noticing what they did not know to look for." },
    { target: "visibility-of-system-status", type: "contrasts-with", note: "Status tells people what the system is doing; discoverability tells them what they can do." },
    { target: "jakobs-law", type: "related-to", note: "People expect functions where other products put them." },
    { target: "flexibility-and-efficiency-of-use", type: "related-to", note: "Accelerators such as gestures and shortcuts need a visible route alongside them." },
    { target: "cognitive-walkthrough", type: "measured-by", note: "The walkthrough asks whether people will notice that the correct action is available." },
    { target: "information-scent", type: "related-to", note: "Labels and cues that let people predict what lies behind a menu or link." },
    { target: "findability", type: "contrasts-with", note: "Findability is locating content you know you want; discoverability includes noticing what you did not know existed." },
    { target: "learnability", type: "related-to", note: "Discovering functions is one part of becoming proficient with a product." },
    { target: "navigation-patterns", type: "related-to", note: "Visible, hidden and combination navigation are patterns with different discovery costs." },
  ],

  practice: {
    dos: [
      { text: "Show a website's main navigation on wide screens.", why: "In NN/g's study, desktop participants used hidden menus in 27 % of cases against 48–50 % for visible or combination navigation, and took at least 39 % longer on tasks {{src:nng-hidden-navigation}}.", kind: "industry" },
      { text: "Label the way into anything you hide.", why: "An unlabelled icon gives little information scent; the most-used phone navigation in the follow-up was a wide, labelled 'Browse' button {{src:nng-discoverable-mobile-navigation}}.", kind: "industry" },
      { text: "Give every gesture, shortcut or hover action a visible alternative.", why: "Hidden routes are efficient for people who know them and invisible to everyone else ([[flexibility-and-efficiency-of-use]]).", kind: "context" },
      { text: "Test discovery with tasks that do not point to the feature.", why: "NN/g's tasks did not direct people to the navigation, so they could observe whether it was found {{src:nng-hidden-navigation}}.", kind: "industry" },
    ],
    donts: [
      { text: "Don't place a menu control where it reads as part of the logo or banner.", why: "On the least-used phone navigation in the follow-up, a small unlabelled arrow beside the logo was missed or taken for the banner {{src:nng-discoverable-mobile-navigation}}.", kind: "industry" },
      { text: "Don't read low feature use as low demand without checking discovery.", why: "Usage cannot separate 'not found' from 'not wanted'; NN/g also note that people may skip a menu for a better on-page option {{src:nng-hidden-navigation}}.", kind: "context" },
      { text: "Don't hide functions most people need behind progressive disclosure.", why: "Each deferred function adds a discovery step; deferral suits secondary options ([[progressive-disclosure]]).", kind: "context" },
    ],
    examples: [],
  },

  exercises: [
    {
      id: "discoverability-ex-audit",
      kind: "assignment",
      level: "beginner",
      title: "Find what is hidden",
      prompt: [
        "Pick an app you use often. List five things it can do that you only found by accident, from someone else, or not at all until now.",
        "For each, say which step of discovery failed: you did not notice it, did not recognise it as something to use, could not predict what it would do, or did not think it worth trying.",
      ],
      deliverable: "A table of five functions, how each is reached, and which step failed.",
      criteria: ["Five real functions", "The route to each described", "A failing step named for each, with a reason"],
    },
    {
      id: "discoverability-ex-nav",
      kind: "critique",
      level: "intermediate",
      title: "Redesign a hidden navigation",
      prompt: [
        "Illustrative case. A retailer's website uses an unlabelled hamburger icon for all navigation on both desktop and phone. It has seven top-level sections; two of them ('Sale' and 'Order status') account for most visits.",
        "Propose navigation for desktop and for phone. Justify each decision with what the NN/g study found and what it recommends, and say where you are making a judgement the study does not settle.",
      ],
      deliverable: "Sketches or a description of both designs with a short justification.",
      criteria: ["Desktop navigation made visible", "Phone design uses visible or combination navigation with a labelled way in", "Findings, recommendations and judgement kept apart", "The two most-visited sections are easy to reach"],
      exampleSolution: [
        "Desktop: show all seven sections across the top. NN/g found hidden menus used much less on desktop and recommends not hiding main navigation there {{src:nng-hidden-navigation}}.",
        "Phone: show 'Sale' and 'Order status' as visible tabs or buttons and put the other five under a labelled 'More' or 'Menu' — combination navigation, which was used in 86 % of cases on phones against 57 % for hidden in the study {{src:nng-hidden-navigation}}.",
        "Make the menu button look tappable and keep it apart from the logo, which the follow-up found mattered {{src:nng-discoverable-mobile-navigation}}.",
        "Judgement, not finding: which sections deserve the visible slots comes from the retailer's own visit data, and should be checked with tasks that do not point people to the navigation.",
      ],
    },
    {
      id: "discoverability-ex-evaluate",
      kind: "reflection",
      level: "advanced",
      title: "Plan a discoverability evaluation",
      prompt: [
        "A product team wants to know whether a new 'Share to team' feature is discoverable. Design an evaluation: what tasks you would give, what you would not tell participants, what you would measure, which other methods you would combine (for example analytics or a cognitive walkthrough), and what each could and could not tell you.",
      ],
      deliverable: "A one-page evaluation plan.",
      criteria: ["Tasks do not point to the feature", "Measures distinguish not noticing from not choosing", "Methods combined, with the limits of each stated", "Device and user differences considered"],
    },
  ],

  quiz: [
    {
      id: "discoverability-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A photo app can delete a photo only by long-pressing it. Nothing on screen suggests this. What is the main problem?",
      options: [
        { text: "The delete function is hard to discover: nothing helps people notice it exists or how to reach it", correct: true, explanation: "A function people cannot find is, for them, a function that does not exist." },
        { text: "Long-pressing is too slow", correct: false, explanation: "Speed is not the issue; most people never learn the gesture exists." },
        { text: "Deleting photos should not be possible", correct: false, explanation: "The function is useful; the problem is how it is reached." },
        { text: "The app does not show its status", correct: false, explanation: "Status is about what the system is doing, not what people can do." },
      ],
      explanation: "Give hidden routes, such as gestures, a visible alternative.",
    },
    {
      id: "discoverability-q-study",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which statement about NN/g's 2016 hidden-navigation study is accurate?",
      options: [
        { text: "Hidden navigation was used less than visible or combination navigation, and the effect on task experience was larger on desktop than on phones", correct: true, explanation: "That matches the reported results; visible-only navigation was not tested on phones." },
        { text: "It proved that hamburger menus fail on every website", correct: false, explanation: "It tested six websites with simple tasks; the follow-up showed large differences between sites." },
        { text: "It found no difference on mobile", correct: false, explanation: "Hidden navigation was used less on phones too (57 % vs 86 % for combination)." },
        { text: "It compared hidden and visible-only navigation on phones", correct: false, explanation: "Visible-only navigation was not tested on phones; the phone comparison was hidden against combination." },
      ],
      explanation: "Report the study with its scope: 179 participants, six sites, desktop and phone, simple tasks, hidden vs visible vs combination.",
    },
    {
      id: "discoverability-q-boundary",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "Which pair is correctly distinguished?",
      options: [
        { text: "Findability is locating content you know you want; discoverability also covers noticing functions you did not know existed", correct: true, explanation: "That is the boundary this entry uses; information architecture deals with findability in depth." },
        { text: "Discoverability and signifiers are the same thing", correct: false, explanation: "Signifiers are one link in the chain; placement, scent and cost also matter." },
        { text: "Visibility of system status is about which actions exist", correct: false, explanation: "System status is what the system is doing; discoverability is what people can do." },
        { text: "Learnability is measured the same way by everyone", correct: false, explanation: "There is little agreement on how learnability should be defined or measured." },
      ],
      explanation: "Keep discoverability, signifiers, findability, system status and learnability apart.",
    },
    {
      id: "discoverability-q-usage",
      kind: "scenario",
      level: "advanced",
      prompt: "Analytics show that only 3 % of users open a feature placed in an overflow menu. A manager wants to remove it. What should you do first?",
      options: [
        { text: "Test whether people can find it when they need it, with tasks that do not point to it, before concluding there is no demand", correct: true, explanation: "Usage cannot tell 'not found' apart from 'not wanted'." },
        { text: "Remove it; low use proves low demand", correct: false, explanation: "Low use may come from low discoverability; the data cannot separate the two." },
        { text: "Move every feature out of the overflow menu", correct: false, explanation: "That trades discoverability for clutter without evidence about this feature." },
        { text: "Add an animation to the menu icon", correct: false, explanation: "Attention-grabbing motion is not a tested fix and can distract; first find out where discovery fails." },
      ],
      explanation: "Observe discovery directly before reading usage as demand.",
    },
  ],

  flashcards: [
    { id: "discoverability-fc-chain", front: "The discovery chain", back: "Notice (salience) → recognise as actionable (signifiers) → predict what it does (information scent) → judge it worth the effort (interaction cost)." },
    { id: "discoverability-fc-study", front: "NN/g hidden-navigation study (2016)", back: "179 participants, 6 sites, desktop and phone. Hidden nav used less (desktop 27 % vs 48–50 %; phone 57 % vs 86 % combo); worse on desktop. Visible-only not tested on phones." },
    { id: "discoverability-fc-why", front: "Why hidden navigation underperforms (NN/g)", back: "Low salience, low information scent, extra work, lack of standards, low familiarity." },
    { id: "discoverability-fc-boundaries", front: "Discoverability vs findability vs status", back: "Discoverability: what can I do? Findability: where is what I want? System status: what is the system doing?" },
    { id: "discoverability-fc-hidden", front: "Gestures, shortcuts, hover", back: "Efficient for people who know them, invisible to others — give each a visible alternative." },
  ],

  references: [
    { source: "norman-2013", role: "primary", note: "Discoverability and understanding as central qualities of good design (bibliographic record; not read in full for this entry)." },
    { source: "nng-hidden-navigation", role: "primary", note: "Quantitative study: 179 participants, 6 sites, desktop and phone; hidden vs visible vs combination navigation; reasons and recommendations." },
    { source: "nng-discoverable-mobile-navigation", role: "explanatory", note: "Follow-up on the phone sites: salience, labelling, placement and expectations." },
    { source: "grossman-2009-learnability", role: "explanatory", note: "Abstract only: little agreement on defining and measuring learnability; question-suggestion protocol found more issues than think-aloud." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Discoverability is a design principle from Norman's framework; the book is cited from its bibliographic record and was not read in full for this entry. The specific findings come from one quantitative study of website navigation reported by NN/g (179 participants, six sites, desktop and phone, simple tasks; visible-only navigation not tested on phones), not a peer-reviewed paper, and its recommendations are labelled as recommendations. The learnability survey is cited from its abstract only. No universal threshold for what must be visible is claimed.",

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
  lastVerifiedAt: "2026-11-16",
});
