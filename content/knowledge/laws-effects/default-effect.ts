import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "default-effect",
  slug: "default-effect",
  title: "Default Effect",
  alternateNames: ["Default bias", "Power of defaults", "Opt-out effect"],
  summary:
    "Preselecting an option makes people more likely to end up with it. The effect is large on average but varies widely, and because inaction carries out whatever the designer chose, every default is a decision about autonomy, consent and trust.",
  definition:
    "A **default** is the option that takes effect when a person does not actively choose otherwise. The **default effect** is the tendency for an option to be chosen or kept more often when it is the default: across 58 studies with 73,675 participants, preselecting an option made it substantially more likely to be chosen, with wide variation between studies {{src:jachimowicz-et-al-2019}}. Proposed mechanisms include the effort of choosing, implied endorsement by whoever set the default, and the default becoming a reference point; no single mechanism explains every case {{src:dinner-et-al-2011}} {{src:cma-2022-oca-evidence-review}}.",
  primaryType: "cognitive-bias",
  secondaryTypes: [],
  domain: "laws-effects",
  subcategory: "decision-biases",
  tags: ["defaults", "choice architecture", "opt-in", "opt-out", "automatic enrolment", "consent", "dark patterns", "autonomy"],
  difficulty: "beginner",
  disciplines: ["Behavioural economics", "Decision psychology", "Interaction design", "Consumer protection"],
  learningObjectives: [
    "Define a default and the default effect, distinguish opt-in, opt-out and active choice, and distinguish the default effect from status quo bias.",
    "Explain the three main proposed mechanisms (effort, implied endorsement, reference dependence) and say what the evidence does and does not show about each.",
    "Interpret the evidence from automatic enrolment, organ donation and the 2019 meta-analysis without overstating it, including the confounds and the variation between studies.",
    "Evaluate a product's defaults by who benefits, transparency, reversibility and effect on vulnerable users, classify each as beneficial, operational, commercial or manipulative, and redesign the harmful ones.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Every form, settings screen and checkout has to decide what happens if the person does nothing. A box ticked in advance, a switch already on, a plan that renews unless cancelled: each is a **default**. In many contexts defaults are unavoidable {{src:cma-2022-oca-evidence-review}}: even an unticked box is a default of 'no'.",
        "Defaults matter because many people keep them. When a large US company began enrolling new staff in its retirement savings plan automatically, about 86% of employees hired under automatic enrolment took part, compared with 37% of an earlier group at similar tenure who had to sign up themselves {{src:madrian-shea-2001}}. A meta-analysis of 58 studies found that preselecting an option makes it markedly more likely to be chosen on average, but also that the size of the effect varies a great deal, and that some defaults had no measurable effect or even the opposite effect {{src:jachimowicz-et-al-2019}}.",
        "So a default is not a cosmetic setting. It decides outcomes for everyone who does not act: whether they save for retirement, share their data, pay for another year, or receive marketing. That is why designers have to ask whose interest each default serves.",
      ],
      analogy:
        "A restaurant that brings bread to every table unless you say no will serve far more bread than one where you have to ask for it. The kitchen's choice of what arrives without asking shapes what people eat, even though everyone is free to refuse.",
      everydayExamples: [
        "A newsletter box already ticked at checkout.",
        "A phone that has notifications switched on for every new app.",
        "A subscription that renews automatically each year unless cancelled.",
        "A pension scheme that enrols employees unless they opt out.",
      ],
      vocabulary: [
        { term: "Default", meaning: "The option that takes effect if the person does not choose otherwise." },
        { term: "Opt-in", meaning: "The person is out unless they act to join: 'Tick to receive offers'." },
        { term: "Opt-out", meaning: "The person is in unless they act to leave: 'Untick if you do not want offers'." },
        { term: "Active choice", meaning: "No option is preselected; the person must pick one before continuing." },
        { term: "Choice architecture", meaning: "The way options are presented, ordered and preselected, which shapes decisions without forbidding any option." },
      ],
    },
    intermediate: {
      explanation: [
        "**Opt-in, opt-out and active choice.** The same decision can be framed three ways. Jachimowicz and colleagues give the organ-donation example: 'If you want to be an organ donor, please check here' (opt-in) against 'If you don't want to be an organ donor, please check here' (opt-out) {{src:jachimowicz-et-al-2019}}. Active choice removes the preselection and asks the person to pick; regulators treat it as one remedy for harmful defaults, though it costs effort and works less well where there are many options or where something must happen if nobody chooses {{src:cma-2022-oca-evidence-review}}.",
        "**Three proposed mechanisms.** First, **effort**: keeping the default costs nothing, while changing it costs physical steps and mental work to weigh the options {{src:cma-2022-oca-evidence-review}}. Second, **implied endorsement**: people may read the default as what the person who set it recommends {{src:dinner-et-al-2011}}; Madrian and Shea concluded that many employees took the default contribution and fund as investment advice from the company {{src:madrian-shea-2001}}. Third, **reference dependence** or **endowment**: the default becomes the starting point against which alternatives are judged, so giving it up feels like a loss {{src:cma-2022-oca-evidence-review}}. Dinner and colleagues found in three experiments that defaults shape the questions people ask themselves, and so the preferences they construct, and that changing those queries can reduce the effect {{src:dinner-et-al-2011}}; on this query-theory account, reasons favouring the default are retrieved first {{src:cma-2022-oca-evidence-review}}.",
        "**Which mechanisms the evidence supports.** In the meta-analysis, coders rated how far each study's design engaged each mechanism. Studies rated higher on endorsement and on endowment showed larger effects; studies rated higher on ease did not {{src:jachimowicz-et-al-2019}}. That does not show effort is irrelevant; it shows that, across these studies, differences in ease did not explain differences in effect size. The ratings were judgements by two coders, not measurements taken from participants, and the authors call for future studies to measure or manipulate the mechanisms directly {{src:jachimowicz-et-al-2019}}.",
        "**Default effect and status quo bias are related but different.** The default effect concerns a *designated* option: someone set it, and inaction carries it out. Status quo bias is a general tendency to avoid change and stick with the current state {{src:cma-2022-oca-evidence-review}}, whether or not anyone designed that state. They meet when a default comes to feel like the status quo, which is the endowment channel in the meta-analysis {{src:jachimowicz-et-al-2019}}; but a default can work through endorsement with no status quo involved, and status quo bias appears where no default was ever set.",
      ],
      howItWorks: [
        "The designer decides what applies if the person does nothing: a preselected option, a switch already on, a plan that continues.",
        "Some people notice the setting and decide; others never notice it, especially when it is hidden {{src:cma-2022-oca-evidence-review}}.",
        "Those who notice weigh the effort of changing it, what the default suggests about what is recommended, and how the alternatives compare with the default as a starting point {{src:dinner-et-al-2011}}.",
        "Whoever does not act gets the default. The outcome happens without a decision, which is why keeping a default is not evidence that the person wanted it.",
      ],
      implementation: [
        "Write down, for every default, what happens to a person who never touches it, and who gains from that outcome.",
        "Set the default to what most people in this context would choose if they chose actively (a 'benign' default), or tailor it to help a particular group decide better (a 'smart' default), as described in the regulator's review {{src:cma-2022-oca-evidence-review}}.",
        "Make the default visible, say what it does in plain words, and make the alternative one step away.",
        "For consent to data use, do not rely on preselection: the CMA review reports that the Court of Justice of the EU held in 2019 that a pre-ticked box is not valid consent for cookies {{src:cma-2022-oca-evidence-review}}. Check the law that applies to your product with a qualified adviser.",
        "Where people's preferences are unknown and the stakes are high, consider active choice instead of a default {{src:cma-2022-oca-evidence-review}}.",
      ],
      scenarios: [
        "Illustrative scenario: a cookie banner offers 'Accept all' as a large button and hides a pre-ticked list of advertising partners behind 'Settings'. Most visitors accept. The acceptance rate says little about what visitors want; it mostly reflects the effort and visibility of the alternatives. Consent-notice studies summarised by the CMA report pre-selected privacy-unfriendly options as common {{src:cma-2022-oca-evidence-review}}.",
        "Illustrative scenario: a checkout adds travel insurance by default. The CMA review describes this practice, insurance sold automatically with flights and cancellation cover with event tickets, as common in early online selling {{src:cma-2022-oca-evidence-review}}. Customers who do not notice pay for cover they never chose.",
        "Illustrative scenario: a payments app turns on two-step verification by default for new accounts and explains how to switch it off. Most people keep it. Here the default protects people who would not have set it up themselves, and changing it remains easy.",
      ],
    },
    advanced: {
      explanation: [
        "**Reading the classic studies carefully.** Madrian and Shea's company made two changes on the same day: all employees became immediately eligible for the retirement plan, and new hires were enrolled automatically unless they opted out {{src:madrian-shea-2001}}. To separate the two, the authors compared cohorts at similar tenure and found almost no difference attributable to immediate eligibility (48.7% against 49.4% participation), so they attributed the participation gap to automatic enrolment {{src:madrian-shea-2001}}. The default also had a cost: 61% of auto-enrolled employees kept both the 3% contribution rate and the money market fund, a combination only about 1% of earlier employees had chosen, so many stayed at a low saving rate and a conservative fund because the company happened to pick them {{src:madrian-shea-2001}}.",
        "**Consent is not donation.** Johnson and Goldstein's organ-donation analysis is the most cited example of the effect; agreement to donate was reported in the high nineties in opt-out countries and in the tens in opt-in countries {{src:jachimowicz-et-al-2019}}. Their abstract reports natural and experimental data and large effects on donation rates {{src:johnson-goldstein-2003}}; the article was not read for this entry. Two cautions apply to how the example is used. Registered consent is not the same as organs actually donated, which depend on families, medical systems and many other factors. And countries differ in far more than their default, so cross-country comparisons are not clean experiments. Academy interpretation: treat the famous chart as a striking illustration of how consent rates follow defaults, not as a measured effect on lives saved.",
        "**How large, and how variable.** The meta-analysis estimated an average effect of d = 0.68 (95% CI 0.53–0.83), equivalent to a 27% change in studies with binary outcomes. Heterogeneity was very high (I² about 98%): 46 observations were significant and positive, ten were not significant and two were significant in the opposite direction. Defaults in consumer decisions were more effective and those in environmental decisions less effective {{src:jachimowicz-et-al-2019}}. The CMA review adds, from other studies, that defaults set at extreme values are kept less and that those who stayed at an unusually high default were disproportionately on low incomes {{src:cma-2022-oca-evidence-review}}. The effect is a tendency that depends on context, not a law.",
        "**Defaults and manipulation.** Choice architecture is rarely neutral; designs sit on a spectrum from helping people decide to steering them against their interests {{src:cma-2022-oca-evidence-review}}. Defaults become harmful when they are hidden, when they serve the business at the user's expense, or when changing them is made hard, as with automatic renewals that rely on people not checking expiry dates {{src:cma-2022-oca-evidence-review}}. These are the defaults usually listed among [[deceptive-patterns|deceptive patterns]].",
      ],
      evidence: [
        "Meta-analysis of 58 default studies (pooled n = 73,675): average effect d = 0.68 (95% CI 0.53–0.83), very high heterogeneity, two significant reversals; endorsement and endowment, as coded by two raters, moderated the effect and ease did not; consumer domains stronger, environmental domains weaker {{src:jachimowicz-et-al-2019}}. Read in full.",
        "Field study in one US company: participation about 86% under automatic enrolment against 37% for the previous cohort at similar tenure; 61% of auto-enrolled employees kept both default contribution and default fund; eligibility change examined and found to explain little {{src:madrian-shea-2001}}. Read as the NBER working paper version.",
        "Three experiments in which defaults changed the order of reasons people considered, with reference dependence playing a major role and query manipulation reducing the effect {{src:dinner-et-al-2011}}. Abstract only.",
        "Organ-donor defaults associated with large differences in consent across countries and in experimental data {{src:johnson-goldstein-2003}}. Abstract only; figures as reported by the meta-analysis.",
      ],
      debates: [
        "**Which mechanism matters.** Effort, endorsement and reference dependence are all supported somewhere {{src:dinner-et-al-2011}}, and the CMA review summarises Dinner and colleagues' view that reference dependence is unlikely to be the only mechanism; the strength of each probably varies with the situation {{src:cma-2022-oca-evidence-review}}. The meta-analysis could only rate mechanisms from study descriptions {{src:jachimowicz-et-al-2019}}, so which channel drives a given product default remains a question for testing.",
        "**Is the effect overstated or understated?** The meta-analysis's publication-bias analysis suggested that, if anything, studies with larger effects are missing, but the authors advise caution because heterogeneity is so high {{src:jachimowicz-et-al-2019}}. The safer lesson is variability: designers cannot assume a default will work, or will work the same way, in their product.",
        "**Defaults or active choice.** Active choice protects autonomy but costs effort and may fade: the CMA review reports that two-thirds of Swedish pension savers chose a fund during an information campaign, but under 1% did by 2003 once the campaign ended {{src:cma-2022-oca-evidence-review}}. Where something must happen if nobody chooses, a default is unavoidable, and the question becomes which one.",
      ],
      alternativeModels: [
        "**Effort or inertia account**: people keep the default because changing it costs time and attention {{src:cma-2022-oca-evidence-review}}.",
        "**Endorsement account**: people treat the default as advice from whoever set it {{src:madrian-shea-2001}} {{src:dinner-et-al-2011}}.",
        "**Reference dependence and query theory**: the default sets the starting point, and the reasons people consider first favour it {{src:dinner-et-al-2011}}.",
      ],
    },
  },

  origin: {
    contributors: ["Brigitte Madrian", "Dennis Shea", "Eric Johnson", "Daniel Goldstein"],
    period: "Field evidence from 2001 (retirement savings) and 2003 (organ donation); meta-analysis 2019",
    problem:
      "Whether a choice that costs nothing to change depends on which option is preselected. In Madrian and Shea's company, saving behaviour changed sharply after automatic enrolment even though, as they put it, none of the economic features of the plan changed {{src:madrian-shea-2001}}.",
    narrative: [
      "Madrian and Shea's study of automatic enrolment in a US company's retirement plan showed that participation and saving followed the default, and attributed this to inertia and to employees reading the default as advice {{src:madrian-shea-2001}}. Johnson and Goldstein extended the argument to organ-donor registration with natural and experimental data {{src:johnson-goldstein-2003}}.",
      "Experimental work then asked why. Dinner and colleagues separated effort, endorsement and reference dependence and showed that reference dependence can play a major role {{src:dinner-et-al-2011}}. Jachimowicz and colleagues pooled 58 studies to estimate how large and how variable the effect is {{src:jachimowicz-et-al-2019}}. Regulators have since examined defaults in digital markets as a source of consumer harm {{src:cma-2022-oca-evidence-review}}.",
    ],
    attributionNote:
      "Johnson and Goldstein (2003) and Dinner et al. (2011) were read as abstracts only; open copies refused automated access. Madrian and Shea were read in the NBER working-paper version, whose figures may differ slightly from the journal article. The OECD BASIC toolkit could not be accessed and is listed as further reading only.",
  },

  application: {
    summary: [
      "Treat every preselection, every switch that starts on and every 'continues unless cancelled' as a design decision with consequences. For each, ask the seven questions below, classify the default, and test what people actually understood and wanted, not only what they kept.",
      "Seven questions for reviewing a default (academy checklist): (1) Who benefits from this default? (2) Does it match what most people here would choose if they chose actively? (3) Is it visible and explained? (4) Can people change it easily, now and later? (5) What happens to someone who does nothing? (6) Are vulnerable people more likely to be harmed by it? (7) Does it preserve informed consent?",
      "Four kinds of default (academy classification, drawing on the regulator's distinction between benign and harmful defaults {{src:cma-2022-oca-evidence-review}}): **beneficial** (saves effort and serves most people, such as security protections that are easy to change); **operational** (some value must be set and it matters little which, such as list sort order); **commercial** (serves the business, acceptable only when visible and easy to change, such as a recommended plan); **manipulative** (hidden, against the person's interest or hard to undo, such as a pre-ticked paid add-on).",
    ],
    web: [
      "Cookie and privacy preferences: no pre-ticked consent; an equally visible option to refuse {{src:cma-2022-oca-evidence-review}}.",
      "Newsletter and marketing sign-ups: unticked by default, with a clear statement of what will be sent.",
      "Checkout add-ons such as insurance, donations or extended warranties: never preselected for payment {{src:cma-2022-oca-evidence-review}}.",
      "Shipping and payment options: preselect the option most customers choose, show the price of each, and keep the others one tap away.",
    ],
    mobile: [
      "Notification permissions: ask in context, for the specific purpose, rather than switching everything on; show how to change it later.",
      "Account and security settings: default to the protective setting where an attack is costly, and explain it.",
    ],
    enterprise: [
      "Retirement and benefit enrolment: automatic enrolment raised participation in Madrian and Shea's study, but also left many at a low default contribution rate and a conservative fund {{src:madrian-shea-2001}}. Choose the default level as carefully as the enrolment rule, and review it.",
      "Academy interpretation: admin consoles ship with defaults that apply to whole organisations, such as data retention or sharing. Document each one and who chose it.",
    ],
    services: [
      "Automatic renewals: say when renewal will happen and what it will cost, remind people before it does, and make cancellation as easy as sign-up; the CMA review describes renewal defaults that rely on people not checking expiry dates, and refunds agreed with two software companies {{src:cma-2022-oca-evidence-review}}.",
    ],
    steps: [
      "Inventory the defaults in one journey: every preselection, starting state and continuing arrangement.",
      "For each, write what happens to someone who does nothing, and answer the seven questions.",
      "Classify each as beneficial, operational, commercial or manipulative, and redesign the manipulative ones first.",
      "Test the redesign: compare the default against active choice or the alternative default, and measure understanding, satisfaction and later reversals, not only the keep rate.",
      "Break results down by user group, and check whether people with less time, knowledge or money keep harmful defaults more often.",
      "Review defaults when the product, the prices or the audience change.",
    ],
  },

  whenToUse: [
    "Designing or reviewing preselected options, initial settings, permissions and anything that continues unless cancelled.",
    "Deciding between a default and active choice for consequential decisions.",
    "Auditing a product for deceptive patterns and consumer-protection risk.",
  ],
  whenNotToUse: [
    "As a guarantee: the effect varies widely and some defaults have no effect or the reverse {{src:jachimowicz-et-al-2019}}. Test before relying on it.",
    "To infer what people want from what they keep: inaction is not consent.",
    "To justify defaults that serve the business against the user's interest; that is manipulation, whatever the conversion rate.",
  ],
  advantages: [
    "Defaults are one of the strongest levers in choice architecture, so a well-chosen default can help many people at once {{src:cma-2022-oca-evidence-review}}.",
    "They spare people decisions that do not need their attention.",
    "The concept gives designers a precise question to ask of every setting: what happens if the person does nothing?",
  ],
  limitations: [
    "Effects vary widely by context and design; the average from a meta-analysis does not predict the effect of a particular default {{src:jachimowicz-et-al-2019}}.",
    "Mechanism evidence is partial: the meta-analysis rated mechanisms from study descriptions, and two key papers were read here only as abstracts.",
    "The most famous examples are confounded or correlational: the retirement study changed eligibility at the same time, and the organ-donation comparisons are across countries.",
    "Keep rates say nothing about understanding, satisfaction or welfare without further measures.",
  ],
  misconceptions: [
    {
      myth: "People always accept defaults.",
      reality:
        "Many do, but not all and not always: 14% of auto-enrolled employees in Madrian and Shea's study were not participating {{src:madrian-shea-2001}}, and in the meta-analysis ten observations found no significant effect and two found the opposite {{src:jachimowicz-et-al-2019}}.",
    },
    {
      myth: "If people keep a default, it must be what they want.",
      reality:
        "Keeping a default can reflect effort, not noticing it, or reading it as advice. In Madrian and Shea's study 61% kept a combination only about 1% had chosen before, which the authors attribute mainly to inertia rather than preference {{src:madrian-shea-2001}}.",
    },
    {
      myth: "The default effect and status quo bias are the same thing.",
      reality:
        "Status quo bias is a general tendency to avoid change {{src:cma-2022-oca-evidence-review}}; the default effect concerns an option someone designated. They overlap when the default feels like the status quo {{src:jachimowicz-et-al-2019}}, but a default can also work through implied endorsement.",
    },
    {
      myth: "Organ-donation defaults are proven to save a fixed number of lives.",
      reality:
        "The well-known figures are consent rates across countries {{src:jachimowicz-et-al-2019}}. Consent is not donation, and countries differ in many ways besides their default, so the comparison is not a clean causal estimate.",
    },
    {
      myth: "A neutral design has no default.",
      reality:
        "Something always happens if the person does nothing, and an unticked box is a default too. Choice architecture is rarely neutral {{src:cma-2022-oca-evidence-review}}; the question is which default, and for whose benefit.",
    },
  ],

  relations: [
    { target: "choice-overload", type: "complementary-to", note: "With many options, a well-chosen default reduces the burden of choosing; the CMA review reports defaults having stronger effects with many alternatives." },
    { target: "teslers-law", type: "related-to", note: "Defaults move a decision from the user to the system, which is useful only when the system decides in the user's interest." },
    { target: "hick-hyman-law", type: "related-to", note: "A default makes one option far more likely, so the person often skips the comparison altogether." },
    { target: "ab-testing", type: "measured-by", note: "Comparing a default with an alternative default or with active choice, using outcomes beyond the keep rate, is how a product learns what its default actually does." },
    { target: "status-quo-bias", type: "contrasts-with", note: "Status quo bias is a general preference for the current state; the default effect concerns an option someone designated, though the two overlap when a default feels like the status quo." },
    { target: "endowment-effect", type: "related-to", note: "Endowment, the sense that the default is already one's own, is one channel through which defaults work." },
    { target: "loss-aversion", type: "related-to", note: "Giving up a default can feel like a loss relative to the default as reference point." },
    { target: "deceptive-patterns", type: "applied-in", note: "Pre-ticked add-ons, hidden consents and hard-to-cancel renewals are defaults used as deceptive patterns." },
    { target: "consent-design", type: "related-to", note: "Preselected consent is not informed consent; consent design starts from active, visible choices." },
    { target: "user-autonomy", type: "related-to", note: "Every default decides for people who do not act, so visibility, reversibility and easy opt-out protect autonomy." },
  ],

  exercises: [
    {
      id: "default-effect-ex-classify",
      kind: "critique",
      level: "beginner",
      title: "Find and classify the defaults",
      prompt: [
        "Sign up for, or walk through the settings of, an app or service you use. List every preselected option, every switch that starts on and every arrangement that continues unless cancelled.",
        "For each, write what happens to someone who does nothing and classify it as beneficial, operational, commercial or manipulative, with a one-line reason.",
      ],
      deliverable: "A table of defaults with outcome-if-nothing, class and reason.",
      criteria: [
        "Includes defaults that are not visible on the first screen",
        "States the outcome of inaction for each",
        "Every classification gives a reason based on who benefits and how easy the default is to change",
      ],
    },
    {
      id: "default-effect-ex-redesign",
      kind: "assignment",
      level: "intermediate",
      title: "Audit and redesign a subscription checkout",
      prompt: [
        "Illustrative scenario: a streaming service's checkout preselects the annual plan at £99, ticks 'Add family profiles, £3/month', ticks 'Send me offers from partners', sets 'Auto-renew' on with the switch in a settings page, and turns all notifications on after sign-up.",
        "Answer the seven questions for each default. Then redesign the checkout and the first-run settings: decide which defaults to keep, which to remove, which to replace with active choice, and how each will be explained and reversed.",
        "Write the copy for the auto-renewal notice and the reminder before renewal.",
      ],
      deliverable: "Before-and-after screens or annotated sketches, the seven answers for each default, and the renewal copy.",
      criteria: [
        "No paid add-on or data-sharing consent is preselected",
        "Each kept default is justified by a reasonable user preference or a protective purpose",
        "Every default is visible and reversible in one step, before and after purchase",
        "Renewal timing and price are stated plainly before the person commits",
      ],
    },
    {
      id: "default-effect-ex-evaluate",
      kind: "scenario",
      level: "advanced",
      title: "Measure a default without mistaking inaction for preference",
      prompt: [
        "A product team proposes turning on 'Share usage data to improve the product' by default and will call the change a success if fewer than 10% switch it off. Illustrative scenario.",
        "Write an evaluation plan. Compare at least two designs (the proposed default, the opposite default or active choice). Define measures of understanding (do people know the setting exists and what it does?), agreement (would they choose it if asked?), later reversals and complaints, and differences between user groups.",
        "State what result would show that the default is retained but not wanted, and what you would recommend in that case.",
      ],
      deliverable: "A one-page plan with designs compared, measures, sample and a decision rule.",
      criteria: [
        "Does not treat the keep rate as evidence of preference",
        "Includes a measure of awareness and a measure of stated choice under active choice",
        "Checks for disproportionate effects on less experienced or more vulnerable users",
        "States a decision rule that could reject the proposal",
      ],
    },
  ],

  quiz: [
    {
      id: "default-effect-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What is a default?",
      options: [
        { text: "The option that takes effect if the person does not choose otherwise", correct: true, explanation: "A default is defined by what happens on inaction, whether it is a ticked box, a switch that starts on or a plan that continues." },
        { text: "The most popular option among users", correct: false, explanation: "A default may or may not be popular; it is whatever the designer set to apply if nobody acts." },
        { text: "The cheapest option on offer", correct: false, explanation: "Price is unrelated; defaults can be expensive, as with a preselected paid add-on." },
        { text: "An option the law requires", correct: false, explanation: "Most defaults are design decisions, not legal requirements." },
      ],
      explanation: "There is always a default, because something happens when a person does nothing.",
    },
    {
      id: "default-effect-q-optout",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "'Untick this box if you do not want to receive offers.' What kind of design is this?",
      options: [
        { text: "Opt-out: the person receives offers unless they act", correct: true, explanation: "The preselected state is 'receive offers', and leaving it requires action." },
        { text: "Opt-in: the person must act to receive offers", correct: false, explanation: "In an opt-in the box would be unticked and the person would tick it to join." },
        { text: "Active choice: no option is preselected", correct: false, explanation: "Active choice would require the person to pick yes or no before continuing." },
        { text: "No default, because the person can untick it", correct: false, explanation: "Being able to change a default does not remove it; inaction still means offers." },
      ],
      explanation: "Opt-in, opt-out and active choice differ in what happens to someone who does nothing.",
    },
    {
      id: "default-effect-q-status-quo",
      kind: "scenario",
      level: "intermediate",
      prompt: "A user has kept the same phone plan for years, though cheaper plans exist; nobody set the plan as a default. Another user keeps a newsletter box that was pre-ticked at checkout. Which statement is most accurate?",
      options: [
        { text: "The first fits status quo bias; the second is a default effect, which may also involve endorsement or effort", correct: true, explanation: "Status quo bias needs no designated option; the default effect concerns an option someone preselected." },
        { text: "Both are the default effect", correct: false, explanation: "The first case has no designated default, only an existing state the person keeps." },
        { text: "Both are status quo bias, which is just another name for the default effect", correct: false, explanation: "The two overlap but are not interchangeable; a default can work through implied endorsement with no status quo involved." },
        { text: "Neither, because both users could change their choice", correct: false, explanation: "Both effects operate even though change is possible; that is what makes them biases rather than constraints." },
      ],
      explanation: "Ask whether someone designated the option. If so, the default effect is involved; status quo bias may add to it.",
    },
    {
      id: "default-effect-q-madrian",
      kind: "critique",
      level: "intermediate",
      prompt: "A colleague says Madrian and Shea proved that automatic enrolment alone raised participation from 37% to 86%. What is the most accurate response?",
      options: [
        { text: "Eligibility changed at the same time; the authors compared cohorts at similar tenure, found eligibility explained little, and attributed the gap to automatic enrolment, so the claim is reasonable but rests on that check", correct: true, explanation: "This acknowledges the confound and the analysis used to address it, without overstating either." },
        { text: "Correct: nothing else changed in the plan", correct: false, explanation: "Immediate eligibility was introduced on the same date as automatic enrolment." },
        { text: "Wrong: the whole difference came from eligibility", correct: false, explanation: "The authors' comparison found almost no difference attributable to eligibility." },
        { text: "Irrelevant: field studies cannot show anything about defaults", correct: false, explanation: "Field studies with careful comparisons are important evidence; they need to be read with their confounds in mind." },
      ],
      explanation: "Good use of classic studies names their confounds and how the authors dealt with them.",
    },
    {
      id: "default-effect-q-meta",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "What did the 2019 meta-analysis of 58 default studies find?",
      options: [
        { text: "A sizeable average effect with very large variation, including studies with no effect and two with the opposite effect", correct: true, explanation: "The average was d = 0.68, but heterogeneity was very high and effects ranged from reversals to large increases." },
        { text: "That defaults work equally well in every domain", correct: false, explanation: "Consumer defaults were more effective and environmental defaults less effective." },
        { text: "That effort is the main reason defaults work", correct: false, explanation: "As coded in the meta-analysis, endorsement and endowment moderated the effect and ease did not." },
        { text: "That the effect disappears after correcting for publication bias", correct: false, explanation: "The correction suggested missing studies with larger effects, though the authors advise caution." },
      ],
      explanation: "The useful lesson is variability: test your own default instead of assuming the average applies.",
    },
    {
      id: "default-effect-q-ethics",
      kind: "scenario",
      level: "advanced",
      prompt: "Which default is most clearly manipulative?",
      options: [
        { text: "A paid extended warranty ticked at checkout, with the price shown only in the order total", correct: true, explanation: "It serves the business, is hard to notice and costs the person money unless they act." },
        { text: "Two-step verification switched on for new accounts, with a clear way to turn it off", correct: false, explanation: "This is a protective default that is visible and reversible." },
        { text: "Search results sorted by relevance, with other sort orders available", correct: false, explanation: "Some order must be chosen; this is an operational default." },
        { text: "The most popular shipping option preselected, with prices for all options shown", correct: false, explanation: "It reflects a common preference and is transparent, so it saves effort without hiding anything." },
      ],
      explanation: "Judge a default by who benefits, whether it is visible, and how easy it is to change.",
    },
  ],

  flashcards: [
    { id: "default-effect-fc-1", front: "Default", back: "The option that takes effect if the person does not choose otherwise. There is always one." },
    { id: "default-effect-fc-2", front: "Three proposed mechanisms of the default effect", back: "Effort, implied endorsement, and reference dependence or endowment. Their strength varies by situation." },
    { id: "default-effect-fc-3", front: "Default effect vs status quo bias", back: "The default effect concerns a designated option; status quo bias is a general preference for the current state. They overlap but are not the same." },
    { id: "default-effect-fc-4", front: "Meta-analysis headline (Jachimowicz et al., 2019)", back: "58 studies, n = 73,675: average d = 0.68 with very high variation; some defaults had no effect and two had the opposite effect." },
    { id: "default-effect-fc-5", front: "Why the keep rate is not enough", back: "Inaction can reflect effort, not noticing or reading the default as advice. Measure awareness, stated choice and later reversals too." },
  ],

  references: [
    { source: "madrian-shea-2001", role: "primary", note: "Automatic enrolment in a 401(k) plan; inertia and perceived advice; eligibility change examined; read as NBER working paper." },
    { source: "johnson-goldstein-2003", role: "primary", note: "Organ-donor defaults; abstract only." },
    { source: "jachimowicz-et-al-2019", role: "primary", note: "Meta-analysis of 58 studies: size, variation, domains and coded mechanisms; read in full." },
    { source: "dinner-et-al-2011", role: "primary", note: "Effort, endorsement and reference dependence; query theory; abstract only." },
    { source: "cma-2022-oca-evidence-review", role: "explanatory", note: "Regulator's evidence review: defaults in digital markets, mechanisms, harms, active choice, benign and smart defaults; Defaults section read." },
    { source: "oecd-2019-basic", role: "further", note: "OECD toolkit and ethical framework for applied behavioural insights; could not be accessed." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "The default effect is supported by field studies, experiments and a 2019 meta-analysis of 58 studies (read in full), which found a sizeable average effect with very high heterogeneity, including null and reversed results. The classic retirement study (read in its working-paper version) changed eligibility at the same time as enrolment, which the authors examined. The organ-donation evidence and the main mechanism experiments were read as abstracts only, and the cross-country donation comparisons are not clean causal tests; consent is not donation. Mechanism evidence is partial: the meta-analysis rated mechanisms from study descriptions. Claims about digital harms and remedies come from a regulator's evidence review that summarises other studies. The ethical classification and the seven review questions are the academy's framework.",

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
