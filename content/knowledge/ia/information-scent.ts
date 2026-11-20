import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "information-scent",
  slug: "information-scent",
  title: "Information Scent",
  alternateNames: ["Scent", "Scent of information", "Link scent"],
  summary:
    "A person's estimate, before clicking, of whether a link or result will lead to what they need, built from the cues they can see and what they already know. Good scent gets people to the right page; a misleading cue gets the click and loses the trust.",
  definition:
    "**Information scent** is a person's estimate of how well an information source, such as a web page, will satisfy their current information need, judged from how the source is represented before they visit it: the link label, the text or image beside it and the surrounding context, combined with what they already know about the brand or the subject {{src:budiu-2020-information-scent}}. It is a concept of information foraging theory, where it has been defined for modelling as the subjective sense of the value and cost of reaching a page, based on perceptual cues {{src:chi-pirolli-chen-pitkow-2001}}. Scent is relative to a need and it is an estimate: the true value of a page is known only after reading it {{src:budiu-2020-information-scent}}.",
  primaryType: "concept",
  secondaryTypes: [],
  domain: "ia",
  subcategory: "findability",
  tags: ["information scent", "link labels", "navigation", "search results", "findability", "trust", "expectation", "first click"],
  difficulty: "beginner",
  disciplines: ["Information architecture", "Content design", "Web usability", "Human-information interaction"],
  learningObjectives: [
    "Define information scent as an estimate made before the click, relative to a need, and name the cues and the prior knowledge it is built from.",
    "Explain with an example why the same link can carry strong scent for one person and weak scent for another, for instance an expert and a newcomer.",
    "Evaluate and rewrite navigation labels, headings, result snippets and card images for a stated need, including on a small screen where context is lost.",
    "Choose evaluation methods and measures that show whether people reach the right destination and find what they expected, and explain why click-through rate alone cannot show it.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Before you click a link you make a quick guess: will this take me to what I am looking for? That guess is **information scent**. You make it from what you can see, mainly the link's wording, any short description or picture next to it and the page it sits on, and from what you already know about the site or the subject {{src:budiu-2020-information-scent}}.",
        "Scent depends on what you are looking for. Budiu's example is a link labelled 'Food': it has strong scent if you want cheese and weak scent if you want a facial cleanser {{src:budiu-2020-information-scent}}. So a label is never good or bad on its own; it is good or bad for a need.",
        "Scent is a guess, so it can be wrong. You only learn what a page really holds once you open it {{src:budiu-2020-information-scent}}. When the guess and the page match, people get where they wanted to go. When a label promises more than the page holds, the visitor clicks, is disappointed and goes back, and next time trusts that site's labels less.",
      ],
      analogy:
        "A shop window works the same way. From the pavement you judge whether a shop sells what you want from the sign and what is displayed. A clear sign and a representative window bring in the right customers; a window full of things the shop does not stock brings people in once and sends them out annoyed.",
      everydayExamples: [
        "Choosing between search results by their titles and the snippet under each.",
        "Ignoring a 'Learn more' link because it does not say what you would learn.",
        "Opening a product because a review elsewhere said it was better than the one you were looking at.",
      ],
      vocabulary: [
        { term: "Information need", meaning: "What the person is trying to find out or do right now; scent is judged against it." },
        { term: "Cue", meaning: "Anything visible before the click that suggests what is behind a link: label, snippet, image, position, surrounding page." },
        { term: "Social foraging", meaning: "The traces other people leave, such as reviews, ratings and tags, that change how later visitors judge a source." },
        { term: "Expectation mismatch", meaning: "The gap between what the cues led someone to expect and what the destination actually holds." },
      ],
    },
    intermediate: {
      explanation: [
        "Budiu separates scent into two parts {{src:budiu-2020-information-scent}}. **What the visitor sees** is the link label, the content that accompanies it (a summary or a thumbnail) and the context in which it appears, including its position on the page. Designers control most of this. **What the visitor knows** is their experience of the brand, of the subject and of the web generally, plus what others have told them; designers influence this only indirectly, through the reputation their earlier pages and labels have built.",
        "**The label** is usually the strongest cue. It should say briefly and accurately what the page holds. A precise label can still carry weak scent if the audience does not understand its words: jargon, product brand names and specialist terms carry little for people who do not already know them {{src:budiu-2020-information-scent}}. Nielsen likewise advises plain words rather than invented terms for navigation {{src:nielsen-2003-information-foraging}}.",
        "**Accompanying text and images** add to the label. A summary should give the gist of the destination and add detail the label lacks; a summary that repeats the label is a missed chance. An image should represent the content or category it stands for: Budiu reports research on categorisation showing that some members of a category are more typical than others (a robin is read as a bird faster than a chicken), so a category image should be a typical member, not just an attractive one {{src:budiu-2020-information-scent}}.",
        "**Context** changes a label's meaning. The same word, 'Christmas', carries different scent on a site of gift baskets and on a site of tableware, because of the categories and images around it. On a phone much of that context is off screen or scrolled past, so labels that depend on it lose scent; Budiu advises being as specific as possible in the label itself {{src:budiu-2020-information-scent}}. Position is context too: Budiu notes that useful links placed in a right-hand column may be read as advertising and discounted.",
        "**Knowledge makes scent personal.** Budiu's example is a university's 'Common Data Set', the admissions statistics often published in the finance section of a university website. For someone who knows this, a label such as 'Office of the Vice Chancellor of Finance' has strong scent; for a first-time applicant neither that label nor the name 'Common Data Set' means anything, so they face two layers of weak scent {{src:budiu-2020-information-scent}}. Academy interpretation: designers know their own terms, so they are poor judges of their own labels. A related study of word choice found that two people chose the same term for an object with a probability below 0.20, and simulations suggested that relying on one designer's favourite word would fail 80–90 % of the time in many common situations {{src:furnas-et-al-1987}}. That study concerned words people type to reach things, not labels they read, but it shows how far vocabularies diverge.",
        "**Other people add scent.** Reviews, ratings, tags and recommendations are traces that earlier visitors leave, and they change how later visitors rate a source; in information foraging theory this is called social foraging {{src:budiu-2020-information-scent}}.",
      ],
      howItWorks: [
        "A visitor arrives with a need, stated or not, and meets a set of links, results or cards.",
        "For each, they take in the cues that are visible: label, snippet, image, position and the surrounding page {{src:budiu-2020-information-scent}}.",
        "They combine those cues with what they already know about the site and the subject to estimate how well the destination will serve the need {{src:budiu-2020-information-scent}}. Chi and colleagues' definition includes the expected cost of getting there as well as the value {{src:chi-pirolli-chen-pitkow-2001}}.",
        "They choose. In the SNIF-ACT model, links are judged one after another and the decision is to click one or go back, combining earlier and current judgements of how relevant the link text is to the goal {{src:fu-pirolli-2007}}.",
        "The destination reveals its true value. If it matches the expectation, the visitor continues; if not, they go back or leave, and the mismatch colours how they read that site's cues next time {{src:budiu-2020-information-scent}}.",
      ],
      implementation: [
        "**Navigation labels and category names:** name the destination in the audience's words. Replace 'Solutions', 'Resources' or 'Learn more' with what is there, and test unfamiliar terms with newcomers, not colleagues {{src:budiu-2020-information-scent}}.",
        "**Page titles and headings:** academy interpretation, following Nielsen's advice to show visitors they are still on the path they chose {{src:nielsen-2003-information-foraging}}: let the destination's title repeat or clearly answer the words of the link that led there, so the visitor can confirm the match at a glance.",
        "**Search-result titles and snippets:** a page is often met first on a results page. Write the title and summary so they state what the page answers and add to each other rather than repeat {{src:budiu-2020-information-scent}}.",
        "**Cards, previews and images:** use images that show the content or a typical member of the category; generic stock imagery adds no scent {{src:budiu-2020-information-scent}}.",
        "**Mobile:** assume the surrounding context is not visible, and make labels specific enough to stand alone {{src:budiu-2020-information-scent}}.",
        "**Landing pages:** the first screen must confirm that the visitor has arrived somewhere relevant. A large image with little text can waste the good scent of the link that brought them {{src:budiu-2020-information-scent}}.",
        "**Recommendations and reviews:** they add scent from other people's experience {{src:budiu-2020-information-scent}}. Academy interpretation: that only helps if they are genuine and attached to the right item.",
      ],
      scenarios: [
        "Illustrative scenario: a home-insurance help centre lists 'Policy hub', 'Claims journey' and 'Resources'. A customer whose kitchen has flooded wants to know whether they are covered. None of the labels mentions cover or water damage, and 'Policy hub' is the company's own name for its account area. A redesign tests labels such as 'What your policy covers', 'Make a claim' and 'Guides', and checks with customers which one they would choose for this task.",
        "Illustrative scenario: on a desktop homepage, a 'Christmas' link sits among tableware images and reads clearly as Christmas tableware. On a phone it appears alone in a collapsed menu. The team changes the mobile label to 'Christmas tableware' rather than relying on context the visitor cannot see {{src:budiu-2020-information-scent}}.",
        "Illustrative scenario: an article titled 'The one setting that doubles your battery life' leads to a page of general tips with no single setting. Clicks are high. Readers who wanted that setting go back, and the site's next headline is trusted less, which is the long-run cost Budiu describes for click bait {{src:budiu-2020-information-scent}}.",
      ],
    },
    advanced: {
      explanation: [
        "**Scent in the theory and in practice.** In information foraging theory scent is a defined quantity: Chi and colleagues use it in algorithms that infer a user's information need from their surfing pattern and predict surfing from a need {{src:chi-pirolli-chen-pitkow-2001}}, and the SNIF-ACT model computes the perceived relevance of link text to a goal by spreading activation {{src:fu-pirolli-2007}}. In design practice the word is used more loosely. Budiu points out that calling a label 'high scent' is technically wrong, because scent exists only relative to a need; what practitioners mean is that the label describes its destination accurately, which helps everyone, including people with other needs, because they can rule it out without clicking {{src:budiu-2020-information-scent}}.",
        "**Clicks are not findings.** A label's job is to help each visitor reach the destination that serves their need, and to let everyone else pass it by. Click-through rate measures only the first half of the estimate–outcome loop. A label that promises more than the page delivers can raise clicks while lowering the share of visitors who find what they wanted, and Budiu argues that click bait, often driven by vanity metrics such as numbers of clicks, uses up visitors' trust so that later honest links are clicked less {{src:budiu-2020-information-scent}}. Academy interpretation: judge a label by task success and by how well the destination matched what people expected; use clicks only alongside those.",
        "**Measuring scent.** Because scent is an estimate, it can be studied by comparing choices with outcomes. Tree testing asks people where in a text-only hierarchy they would look for an item; its first-click and destination data show which labels drew people and whether those labels led to the right place, separately from visual design {{src:nng-tree-testing}} {{src:nng-tree-testing-results}}. First-click studies on screens, task-based [[usability-testing|usability tests]] and asking participants what they expect to find before they click (an academy procedure) add the visual cues and the expectation itself.",
      ],
      evidence: [
        "Scent-based algorithms that infer information needs from surfing patterns, and predict surfing from needs, were evaluated empirically and reported as effective {{src:chi-pirolli-chen-pitkow-2001}}. Abstract only: the data, measures and results were not read.",
        "SNIF-ACT, a computational model in which link choice depends on the relevance of link text to the user's goal, is presented as a model of web navigation {{src:fu-pirolli-2007}}. Abstract only: its tasks, participants and fit were not read.",
        "In a study of spontaneous word choice across five domains, two people favoured the same term with probability below 0.20 {{src:furnas-et-al-1987}}. Abstract only; the study concerns words people enter, not link labels.",
        "The practical claims in this entry, about labels, summaries, images, context, mobile and click bait, are professional guidance and observation from NN/g {{src:budiu-2020-information-scent}} {{src:nielsen-2003-information-foraging}}. They are consistent with the theory but are not themselves reported as controlled findings in the sources read.",
      ],
      debates: [
        "**Scent as a property of the link, or of the person.** Practitioners talk about 'high-scent' and 'low-scent' labels; the theory defines scent relative to a need and a person {{src:budiu-2020-information-scent}}. The shorthand is useful for vague labels such as 'More', which give almost anyone little to go on, but it hides the case that matters most in practice: a label that experts read easily and newcomers cannot.",
        "**Scent as value alone, or value and cost.** Budiu's definition centres on the estimated value of a source {{src:budiu-2020-information-scent}}; Chi and colleagues define scent as the sense of value *and cost* of reaching a page {{src:chi-pirolli-chen-pitkow-2001}}. In design reviews it helps to keep both: a well-labelled destination that looks slow or hard to reach can still be passed over.",
      ],
      alternativeModels: [],
    },
  },

  origin: {
    contributors: ["Peter Pirolli", "Stuart Card", "Ed H. Chi", "Wai-Tat Fu"],
    period: "Information foraging theory, 1999; scent-based tools and models, 2001–2007",
    problem:
      "To explain and predict which links people follow on the web, the theory needed a measure of how promising a link looks for a given need before it is followed {{src:chi-pirolli-chen-pitkow-2001}}.",
    narrative: [
      "Information scent comes from information foraging theory, developed by Pirolli, Card and colleagues at the Palo Alto Research Center {{src:nielsen-2003-information-foraging}}; Pirolli and Card published 'Information foraging' in *Psychological Review* in 1999 {{src:pirolli-card-1999}}. The theory itself is explained in [[information-foraging-theory|its own entry]].",
      "Chi, Pirolli, Chen and Pitkow defined scent for computation as the subjective sense of the value and cost of reaching a page from perceptual cues, and built algorithms on it {{src:chi-pirolli-chen-pitkow-2001}}. Fu and Pirolli's SNIF-ACT model used the relevance of link text to a goal to model navigation {{src:fu-pirolli-2007}}. Practitioner writing, notably from NN/g, carried the term into everyday design vocabulary {{src:budiu-2020-information-scent}}.",
    ],
    attributionNote:
      "The 1999 article could not be read at all and is cited only for its existence; the 2001 and 2007 papers were read as abstracts. Definitions and design guidance here come from those abstracts and from two NN/g articles read in full.",
  },

  application: {
    summary: [
      "Use scent as a review lens wherever someone chooses between paths before seeing the destination: menus, category pages, search results, cards, related links and recommendations. For each choice point, write the need, list the visible cues, predict which option a newcomer would choose, then check the prediction with people.",
    ],
    web: [
      "Rewrite vague navigation and call-to-action labels so they name the destination; give search results and cards summaries that add to the title {{src:budiu-2020-information-scent}}.",
      "Following Nielsen's advice to show visitors they are on the right path, make each destination's title and first screen confirm the promise of the link that led there {{src:nielsen-2003-information-foraging}}.",
    ],
    mobile: [
      "Review labels with the surrounding context hidden, as it often is in a collapsed menu or a narrow screen, and make them specific enough to stand alone {{src:budiu-2020-information-scent}}.",
    ],
    enterprise: [
      "Academy interpretation: intranets are full of team and system names ('Workday', 'Hub', 'Portal') that carry scent only for people who already know them. Label by task ('Book leave', 'Claim expenses') and keep the system name as secondary text.",
    ],
    services: [
      "Academy interpretation: in a phone menu or a service's start page, options are judged by their words alone, so each one should name the caller's task in their language.",
    ],
    steps: [
      "Write the top tasks as needs in users' words, including at least one from a newcomer's point of view.",
      "For each task, list the choice points and the cues visible at each, on desktop and on mobile.",
      "Rate each option's likely scent for the need and note words a newcomer may not know.",
      "Rewrite labels, summaries and images; make each destination confirm the link's promise.",
      "Test with a tree test or first-click test and a few task-based sessions, asking what people expect before they click.",
      "Judge the result by task success, directness and expectation match, not by clicks alone.",
    ],
  },

  whenToUse: [
    "Reviewing or writing navigation labels, category names, headings, search-result titles and snippets, and card content.",
    "Diagnosing why people pass over the right link, pick the wrong one, or go back after clicking.",
    "Setting the success measures for a labelling or content change.",
  ],
  whenNotToUse: [
    "As a substitute for testing: scent is a person's estimate, and only people with the need can show what they estimate.",
    "To justify making labels more enticing: stronger-sounding is not the aim; accurate is.",
    "To explain problems that arise after arrival, such as unreadable content or broken forms, which need other lenses.",
  ],
  advantages: [
    "Gives teams one vocabulary for labels, snippets, images and context, tied to a user's need.",
    "Separates the estimate from the outcome, which makes expectation mismatches visible.",
    "Points directly at testable changes: words, summaries, images and their placement.",
  ],
  limitations: [
    "The formal research was read only as abstracts, so this entry cannot report how strongly cues predict choices or how well the models fit.",
    "Most practical guidance is professional observation, not controlled findings in the sources read.",
    "Scent describes goal-directed seeking; it says little about browsing without a need.",
    "Good scent cannot fix a destination that does not hold what people need; it can only make that visible sooner.",
  ],
  misconceptions: [
    {
      myth: "A label either has good scent or bad scent.",
      reality:
        "Scent is relative to a need and to what the person knows. 'Food' has strong scent for cheese and weak scent for a cleanser, and a specialist term can be clear to experts and opaque to newcomers {{src:budiu-2020-information-scent}}.",
    },
    {
      myth: "If more people click a link, its scent has improved.",
      reality:
        "Clicks show that the estimate was attractive, not that it was accurate. A misleading label can raise clicks while sending more people back, and it uses up trust {{src:budiu-2020-information-scent}}. Measure whether people reach the right destination and find what they expected.",
    },
    {
      myth: "Context will explain a short label.",
      reality:
        "Context helps on a large screen, but on a phone it is often not visible or is scrolled past, so labels need to stand on their own {{src:budiu-2020-information-scent}}.",
    },
    {
      myth: "Any relevant picture strengthens scent.",
      reality:
        "An image adds scent only if it shows the content or a typical member of the category; decorative or untypical images add little {{src:budiu-2020-information-scent}}.",
    },
  ],

  relations: [
    { target: "information-foraging-theory", type: "derived-from", note: "Scent is a concept of information foraging theory: the estimate on which the theory's choice of path depends." },
    { target: "information-architecture", type: "applied-in", note: "Labels, categories and navigation are where scent is designed; the structure works only if its names carry scent for users' needs." },
    { target: "tree-testing", type: "measured-by", note: "Tree tests show where people expect content from labels alone, with first clicks and destinations as evidence of scent and its accuracy." },
    { target: "usability-testing", type: "measured-by", note: "Task-based sessions show whether chosen paths reach the right destination and whether it matched the expectation." },
    { target: "first-click-testing", type: "measured-by", note: "A first click on a screen captures the scent estimate with the visual cues included." },
    { target: "discoverability", type: "contrasts-with", note: "Discoverability asks whether people notice that something exists; scent asks how they judge where an option they have noticed will lead." },
    { target: "signifiers", type: "complementary-to", note: "A signifier shows that something can be clicked; scent is the estimate of what clicking will bring." },
    { target: "plain-language", type: "related-to", note: "Words the audience understands carry scent; jargon and brand names carry little for newcomers." },
    { target: "ab-testing", type: "related-to", note: "An A/B test of labels needs task success or downstream outcomes as its measure; click-through alone can favour misleading labels." },
    { target: "findability", type: "related-to", note: "Scent is one condition of findability: content that exists and is well placed is still hard to find if the cues leading to it are weak." },
  ],

  exercises: [
    {
      id: "information-scent-ex-label-audit",
      kind: "critique",
      level: "beginner",
      title: "Audit labels for two people",
      prompt: [
        "Choose a public site such as a university, council or bank. Write one need as an experienced user would phrase it and the same need as a newcomer would phrase it.",
        "List the main navigation labels. For each person, rate each label's scent for their need (strong, weak, none) and write the cue or the missing knowledge that decided it.",
        "Mark any label whose rating differs between the two people and explain why.",
      ],
      deliverable: "A table of labels with two ratings each and a reason for each rating.",
      criteria: [
        "Each rating cites a visible cue or a named piece of prior knowledge",
        "At least one label is rated differently for the two people, with a reason",
        "Makes no claim about page content that was not checked",
      ],
    },
    {
      id: "information-scent-ex-redesign",
      kind: "assignment",
      level: "intermediate",
      title: "Redesign the paths to one answer",
      prompt: [
        "Illustrative scenario: a home-insurance help centre has the labels 'Policy hub', 'Claims journey' and 'Resources'. Under 'Resources' are cards titled 'Peace of mind', 'Be prepared' and 'Your home', each with a stock photo of a smiling family. On a phone, the cards stack and the section heading scrolls away. A customer with a flooded kitchen wants to know whether they are covered and how to claim.",
        "Identify every cue on the path and say what each suggests for this need. Mark ambiguous labels, company terms, uninformative images and context that disappears on mobile.",
        "Rewrite the labels, card titles, summaries and images, and the heading of the destination page, so the path confirms itself at each step on desktop and on a phone.",
      ],
      deliverable: "Before-and-after labels and card copy, an image brief, and the destination heading, with one line of rationale each.",
      criteria: [
        "Every change is tied to the stated need and to a named cue",
        "Labels stand on their own without the surrounding context",
        "No label promises more than the destination holds",
        "The destination heading confirms the link that led there",
      ],
    },
    {
      id: "information-scent-ex-evaluation",
      kind: "scenario",
      level: "advanced",
      title: "Measure finding, not clicking",
      prompt: [
        "A product team changed a help link from 'Billing' to 'Save money on your bill' and reports a 40 % rise in clicks. Illustrative scenario: the numbers are invented for this exercise.",
        "Write a short evaluation plan that would show whether the change helped people find what they needed. Include a first-click or tree test, a few task-based sessions in which participants say what they expect before clicking, and the analytics you would look at after the click.",
        "State what result would show that the new label is a click win but a finding loss.",
      ],
      deliverable: "A one-page evaluation plan with measures, tasks and a decision rule.",
      criteria: [
        "Uses task success and expectation match as the main measures",
        "Includes a downstream signal such as returning to the menu, searching again or contacting support",
        "States a result that would count against the new label",
      ],
    },
  ],

  quiz: [
    {
      id: "information-scent-q-definition",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which statement best describes information scent?",
      options: [
        { text: "A person's estimate, before clicking, of how well a destination will meet their current need", correct: true, explanation: "Scent is an estimate made from visible cues and prior knowledge, relative to a need." },
        { text: "How many people click a link compared with how many see it", correct: false, explanation: "That is click-through rate, an outcome measure. A misleading link can have a high click rate and poor scent accuracy." },
        { text: "How relevant a page really is to a search query", correct: false, explanation: "That is the page's true value, which is known only after reading it. Scent is the estimate made before." },
        { text: "Whether a link looks clickable", correct: false, explanation: "That is the job of a signifier. Scent concerns where the link leads, not whether it can be clicked." },
      ],
      explanation: "Scent is the visitor's estimate before the click; the destination's true value is learned only after.",
    },
    {
      id: "information-scent-q-learn-more",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Why does a link labelled 'Learn more' usually carry weak scent?",
      options: [
        { text: "It does not say what the visitor would learn, so it gives little to judge against any need", correct: true, explanation: "A vague label leaves the visitor to guess, whatever they are looking for." },
        { text: "Because short labels are always weaker than long ones", correct: false, explanation: "Length is not the issue; 'Opening hours' is short and specific. What matters is whether the words describe the destination." },
        { text: "Because people never click secondary links", correct: false, explanation: "People do click secondary links when the cues suggest value. The problem is the lack of cues." },
        { text: "Because it is not written in the brand's voice", correct: false, explanation: "Voice does not create scent; describing the destination does." },
      ],
      explanation: "Vague labels such as 'More' or 'Learn more' make the destination hard to guess for almost any need.",
    },
    {
      id: "information-scent-q-expert",
      kind: "scenario",
      level: "intermediate",
      prompt: "A university links its admissions statistics from 'Office of the Vice Chancellor of Finance'. An experienced admissions adviser finds them at once; a first-time applicant does not. What explains the difference?",
      options: [
        { text: "Scent depends on prior knowledge: the adviser knows where such data are kept, the applicant does not", correct: true, explanation: "Budiu uses this example to show that the same label carries strong scent for experts and weak scent for newcomers." },
        { text: "The applicant read the label too quickly", correct: false, explanation: "Reading speed is not the issue; the label contains no words that connect to the applicant's need." },
        { text: "The label has weak scent for everyone, and the adviser was lucky", correct: false, explanation: "For people who know the domain the label is a strong cue, so it is not weak for everyone." },
        { text: "Finance labels always carry weak scent", correct: false, explanation: "Scent depends on the need and the person; for a finance question this label would be strong." },
      ],
      explanation: "Designers and experts know their own terms, which is why labels should be tested with newcomers.",
    },
    {
      id: "information-scent-q-mobile",
      kind: "scenario",
      level: "intermediate",
      prompt: "A 'Christmas' link sits among images of plates and glasses on a desktop homepage. On the phone layout it appears alone in a menu. What is the best change?",
      options: [
        { text: "Make the mobile label specific, for example 'Christmas tableware', because the context is not visible there", correct: true, explanation: "Context strengthens scent on large screens but is often missing on phones, so the label must stand alone." },
        { text: "Keep 'Christmas', because users will remember the desktop page", correct: false, explanation: "Many mobile visitors never saw the desktop page, and those who did may not remember its context." },
        { text: "Add a festive icon beside the word", correct: false, explanation: "A decorative icon does not say what kind of Christmas products are behind the link." },
        { text: "Move the link higher in the menu", correct: false, explanation: "Position may make it noticed sooner, but it still does not say what the link leads to." },
      ],
      explanation: "On small screens, put the meaning into the label itself.",
    },
    {
      id: "information-scent-q-metric",
      kind: "critique",
      level: "advanced",
      prompt: "After a label change, clicks on a help link rose by a third, and so did visits that returned to the menu within ten seconds. Which conclusion fits best?",
      options: [
        { text: "The new label raises the estimate more than the destination supports, so more people find a mismatch; check task success and expectations before keeping it", correct: true, explanation: "Quick returns after a click suggest expectation mismatch, the case Budiu warns about." },
        { text: "The change is a success, because clicks are the measure of scent", correct: false, explanation: "Clicks show the estimate was attractive, not that it was accurate." },
        { text: "The returns are noise, because people always go back sometimes", correct: false, explanation: "The returns rose with the change, so they cannot be dismissed without looking at them." },
        { text: "The destination page must be broken", correct: false, explanation: "Possible, but the pattern of more clicks and more quick returns points first at the label's promise; check before assuming." },
      ],
      explanation: "Judge labels by whether people get what they expected, not by clicks alone.",
    },
    {
      id: "information-scent-q-clickbait",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "According to Budiu, why does click bait fail in the long run?",
      options: [
        { text: "It gets the click but uses up trust, so later honest links from the same source are clicked less", correct: true, explanation: "The disappointment feeds back into what visitors know about the source, which is part of scent." },
        { text: "Search engines always remove it", correct: false, explanation: "The source makes a point about users' trust, not about search-engine policy." },
        { text: "It never attracts clicks", correct: false, explanation: "It does attract clicks; that is why it is tempting. The cost comes afterwards." },
        { text: "It confuses screen readers", correct: false, explanation: "Click bait is a problem of accuracy for all users, not a specific assistive-technology issue." },
      ],
      explanation: "Prior experience with a source is part of scent, so broken promises weaken every later cue from that source.",
    },
  ],

  flashcards: [
    { id: "information-scent-fc-1", front: "Information scent", back: "A person's estimate, before clicking, of how well a destination will meet their current need, from visible cues and prior knowledge." },
    { id: "information-scent-fc-2", front: "Two components of scent (Budiu)", back: "What the user sees (label, accompanying text or image, context) and what the user knows (brand, domain, others' recommendations)." },
    { id: "information-scent-fc-3", front: "Why test labels with newcomers?", back: "Scent depends on prior knowledge; experts and designers read their own terms easily, newcomers may not." },
    { id: "information-scent-fc-4", front: "Why is click-through rate not enough?", back: "It shows the estimate was attractive, not accurate. Measure task success and whether the destination matched expectations." },
    { id: "information-scent-fc-5", front: "Scent on mobile", back: "Context is often off screen, so labels must be specific enough to stand alone." },
  ],

  references: [
    { source: "chi-pirolli-chen-pitkow-2001", role: "primary", note: "Definition of scent as the subjective sense of value and cost from perceptual cues; scent-based algorithms; abstract read." },
    { source: "fu-pirolli-2007", role: "primary", note: "SNIF-ACT: link choice from the relevance of link text to the goal; abstract read." },
    { source: "pirolli-card-1999", role: "primary", note: "The article that introduced information foraging theory; bibliographic record only, not read." },
    { source: "budiu-2020-information-scent", role: "explanatory", note: "Definition, components of scent, context, mobile, prior knowledge, social foraging and click bait; read in full." },
    { source: "nielsen-2003-information-foraging", role: "explanatory", note: "Scent in the foraging account; plain labels; showing visitors they are on the right path; read in full." },
    { source: "nng-tree-testing", role: "explanatory", note: "What a tree test evaluates and how to word its tasks; read." },
    { source: "nng-tree-testing-results", role: "explanatory", note: "Success, directness, first click and destination measures; read." },
    { source: "furnas-et-al-1987", role: "primary", note: "Spontaneous word choice varies widely between people (the vocabulary problem); abstract read." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "Information scent is a defined concept within information foraging theory, used in peer-reviewed models and scent-based tools that were evaluated against user data. This entry read those papers, and a study of vocabulary variation, as abstracts only (the 1999 article not at all), so it can state what scent is and that models built on it were tested, but not how strongly cues predict choices. The practical guidance on labels, summaries, images, context, mobile and click bait comes from NN/g articles read in full; it is professional observation, not controlled findings in the sources read. The advice to judge labels by task success and expectation match rather than clicks is the academy's interpretation, supported by Budiu's argument about click bait and trust. No replication literature was examined.",

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
  lastVerifiedAt: "2026-11-20",
});
