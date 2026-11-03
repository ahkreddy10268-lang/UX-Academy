import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "doherty-threshold",
  slug: "doherty-threshold",
  title: "Doherty Threshold",
  alternateNames: ["Doherty's threshold", "400 ms rule", "Rapid response time threshold"],
  summary:
    "A practitioner rule of thumb, traced to a 1982 IBM report, that productivity rises when system responses arrive faster than about 400 ms — useful as a performance aspiration, but not an established perceptual law.",
  definition:
    "The Doherty threshold is the popular name for the claim, attributed to Doherty & Thadani's 1982 IBM report *The Economic Value of Rapid Response Time*, that when a computer responds to a user in under roughly **400 milliseconds**, users work faster and more productively than at the multi-second response times then considered acceptable. It is an industry finding about productivity, not a peer-reviewed psychophysical threshold.",
  primaryType: "rule-of-thumb",
  secondaryTypes: ["principle", "historical-contribution"],
  domain: "laws-effects",
  subcategory: "popular-ux-laws",
  tags: ["performance", "latency", "response time", "feedback", "productivity", "loading"],
  difficulty: "beginner",
  disciplines: ["Human-computer interaction", "Performance engineering", "Interaction design"],
  learningObjectives: [
    "Explain where the 'Doherty threshold' comes from and what kind of evidence supports it.",
    "Contrast it with the 0.1 s / 1 s / 10 s response-time guidance traced to Miller (1968) and Card et al. (1991).",
    "Choose appropriate feedback for different latencies.",
    "Recognise overstated claims about response-time thresholds in popular UX writing.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "When you click a button and the screen responds almost instantly, the conversation with the computer feels smooth. When you wait, you lose your train of thought and the system feels slow.",
        "The Doherty threshold is a name for one claim about this: that responses faster than about **0.4 seconds** keep people working at their best pace. It comes from a 1982 IBM report arguing that faster computers made staff more productive.",
        "It is a useful **target**, not a law of nature. Other researchers describe the same idea differently — for example, around **0.1 s** feels instant, around **1 s** keeps your flow of thought, and beyond about **10 s** people lose attention.",
      ],
      analogy:
        "Think of a conversation. If the other person replies immediately, you keep talking naturally. A short pause is fine. A long silence makes you wonder whether they heard you — and you start doing something else.",
      everydayExamples: [
        "Search suggestions that appear as you type feel 'live'; a search that takes three seconds feels like a separate step.",
        "A 'Like' button that changes state instantly (even before the server confirms) feels responsive.",
        "Long uploads show a progress bar because, after several seconds, people need to know the system is still working.",
      ],
      vocabulary: [
        { term: "Response time (latency)", meaning: "The time between a user's action and the system's visible response." },
        { term: "Feedback", meaning: "Any signal that the system has received the action and what is happening." },
        { term: "Optimistic UI", meaning: "Showing the expected result immediately while the real operation completes in the background." },
      ],
    },
    intermediate: {
      explanation: [
        "In practice the Doherty threshold is best used as a **performance budget aspiration**: aim for perceptibly immediate responses to direct manipulation and frequent actions, and design feedback for everything slower.",
        "A more widely cited framework is the set of three limits Nielsen (1993) drew from Miller (1968) and Card, Robertson & Mackinlay (1991): about **0.1 s** for a response to feel instantaneous, about **1 s** for the user's flow of thought to stay uninterrupted, and about **10 s** before attention wanders and users need progress information {{src:nielsen-1993-response-times}}.",
        "Designers manage perceived latency as well as real latency: immediate acknowledgement of the input, skeleton screens, optimistic updates and progress indicators. Myers (1985) found that users strongly preferred percent-done progress indicators during long waits {{src:myers-1985}}.",
      ],
      howItWorks: [
        "Under ≈0.1 s: no special feedback needed beyond the result itself.",
        "≈0.1–1 s: the user notices the delay; acknowledge the action immediately (pressed state, inline change).",
        "≈1–10 s: show that work is in progress (spinner, skeleton, inline status).",
        "Over ≈10 s: show determinate progress, allow the user to do other things, and notify on completion.",
        "Doherty & Thadani's report framed the target differently: as a productivity argument for sub-second response, often quoted as 400 ms.",
      ],
      implementation: [
        "Set latency budgets per interaction type (direct manipulation, navigation, search, background jobs).",
        "Acknowledge every input within the first frame or two, even if the result takes longer.",
        "Use optimistic UI only when the operation almost always succeeds and failure can be clearly reversed.",
        "Show determinate progress for long operations; avoid indeterminate spinners for waits of many seconds.",
        "Measure real-user latency distributions (not averages) — tail latency drives frustration.",
      ],
      scenarios: [
        "A dashboard filter that takes 2 s to re-query: show the filter as applied instantly, dim stale results, and stream in updated data.",
        "A file conversion taking 30 s: move it to a background task with a notification rather than blocking the page.",
        "An autocomplete endpoint averaging 300 ms but with a slow tail: debounce input and cache results so most responses arrive within the target.",
      ],
    },
    advanced: {
      explanation: [
        "The historical claim needs careful framing. Doherty & Thadani's 1982 report was an IBM publication making an economic case — that shorter system response times reduced user 'think time' and increased transactions per hour — rather than a peer-reviewed experiment establishing a perceptual threshold {{src:doherty-thadani-1982}}. The specific '400 ms' figure and the description of fast systems as 'addicting' circulate widely in secondary sources; the original text was not accessible for first-hand verification in this research session.",
        "Earlier, Miller (1968) analysed acceptable response times by type of conversational transaction, suggesting that about 2 s was acceptable for many conversational exchanges and that faster responses were needed for actions like keypress acknowledgement {{src:miller-1968}}. Card, Robertson & Mackinlay (1991) later linked ≈0.1 s, ≈1 s and ≈10 s to perceptual, immediate-response and unit-task time constants of the human processor {{src:card-robertson-mackinlay-1991}}.",
        "Shneiderman's (1984) survey stressed that acceptable delay depends on users' expectations, task complexity and response-time variability, and discussed evidence that very fast pacing can encourage hastier work and more errors on complex tasks {{src:shneiderman-1984}}. Faster is generally preferred, but no single threshold applies to every task.",
      ],
      evidence: [
        "The productivity claims of the 1982 report come from IBM's internal measurements of transaction processing work; they are not a controlled, independently replicated experiment {{src:doherty-thadani-1982}}.",
        "Nielsen's three limits are professional guidance synthesised from Miller (1968) and Card et al. (1991), not a single experiment {{src:nielsen-1993-response-times}}.",
        "Progress indicators improve the waiting experience for long operations, according to Myers (1985) {{src:myers-1985}}.",
      ],
      debates: [
        "**Threshold or continuum?** Perceived responsiveness degrades gradually with latency; the 'threshold' framing is a simplification for design communication.",
        "**Popular attribution.** Some practitioner sources state the work appeared in the IBM Systems Journal; no such record was found in Crossref, so that claim is treated as unconfirmed here.",
        "**Context dependence.** Gaming, direct manipulation and touch interfaces have much tighter latency requirements than form submission or report generation; one number cannot cover all of them.",
      ],
      alternativeModels: [
        "**Nielsen's 0.1 / 1 / 10 s limits** — the most common practitioner framework for response-time feedback.",
        "**Card, Robertson & Mackinlay's time constants** — grounded in the Model Human Processor.",
        "**[[nielsen-usability-heuristics|Visibility of system status]]** — the heuristic behind feedback during waits.",
      ],
    },
  },

  origin: {
    contributors: ["Walter J. Doherty", "Arvind J. Thadani"],
    period: "1982, IBM",
    problem:
      "In the era of mainframe time-sharing, response times of two seconds or more were widely accepted; IBM wanted to quantify the economic value of investing in faster systems.",
    narrative: [
      "Doherty and Thadani's report argued that cutting system response time increased user productivity disproportionately, because users' own response time shortened when the system responded quickly {{src:doherty-thadani-1982}}.",
      "The idea was revived in popular UX writing under the name 'Doherty threshold', most prominently in the Laws of UX collection {{src:laws-of-ux}}.",
    ],
    attributionNote:
      "The co-author's surname appears as both 'Thadani' and 'Thadhani' in secondary sources, and popular claims that the report appeared in the IBM Systems Journal could not be confirmed. Treat the 400 ms figure as reported by secondary sources until the original is checked.",
  },

  application: {
    summary: [
      "Use the Doherty threshold as an aspiration for **perceived immediacy** in frequent interactions, and the 0.1 / 1 / 10 s guidance to decide **which feedback to show** when responses are slower.",
    ],
    web: [
      "Prioritise fast input acknowledgement (pressed states, instant validation) over full results.",
      "Use skeleton screens for content that takes longer than about a second to load.",
    ],
    mobile: [
      "Respond to touches immediately; animations that start instantly can mask short network delays without misleading users.",
      "Avoid blocking spinners on navigation; show cached content while refreshing.",
    ],
    enterprise: [
      "Background long jobs (exports, reports) with notifications and a job history.",
      "Track latency percentiles for core workflows as a product metric.",
    ],
    services: [
      "In assisted services (call centres, counters), slow systems cost staff and customer time; response-time investment can be justified in staff hours.",
    ],
    steps: [
      "Classify interactions by expected latency.",
      "Set a target for each class (immediate acknowledgement for all; full result targets per class).",
      "Choose feedback per latency band.",
      "Measure real-user latency distributions.",
      "Optimise the slowest frequent interactions first.",
    ],
  },

  whenToUse: [
    "Setting performance budgets and arguing for responsiveness investment.",
    "Deciding what feedback to show while users wait.",
    "Teaching the history of response-time research.",
  ],
  whenNotToUse: [
    "Citing 400 ms as a scientifically established perceptual threshold.",
    "Assuming that meeting a single number makes every interaction feel fast — direct manipulation and gaming need far less latency.",
    "Hiding real delays with optimistic UI when failures are common or consequential.",
  ],
  advantages: [
    "Memorable shorthand for prioritising responsiveness.",
    "Encourages explicit latency budgets.",
  ],
  limitations: [
    "Rests on an industry report, not independently replicated research.",
    "Specific figures are reported second-hand.",
    "Ignores task differences, expectations and variability.",
  ],
  misconceptions: [
    {
      myth: "Humans cannot perceive delays shorter than 400 ms.",
      reality: "People readily notice much shorter delays, especially in direct manipulation. 400 ms was a productivity target, not a perceptual limit.",
    },
    {
      myth: "The Doherty threshold is an established psychological law.",
      reality: "It is a popular name for findings in a 1982 IBM report. Its status is practitioner guidance; see the evidence note.",
    },
  ],

  relations: [
    { target: "visibility-of-system-status", type: "related-to", note: "Feedback during waits is how designers keep users informed when responses exceed immediate thresholds." },
    { target: "nielsen-usability-heuristics", type: "related-to", note: "Nielsen's first heuristic, visibility of system status, and his 0.1/1/10 s limits address the same problem." },
    { target: "loading-states", type: "applied-in", note: "Loading-state design chooses feedback according to expected latency bands." },
    { target: "skeleton-screens", type: "applied-in", note: "Skeleton screens manage perceived latency for content that takes around a second or more to load." },
    { target: "keystroke-level-model", type: "related-to", note: "The KLM's R(t) operator accounts for system response time only when users must wait for it." },
  ],

  lab: "feedback-lab",

  exercises: [
    {
      id: "doherty-threshold-ex-budget",
      kind: "assignment",
      level: "intermediate",
      title: "Write a latency budget",
      prompt: [
        "For a product you know, list five frequent interactions (e.g. typing in search, opening a record, saving, filtering, exporting).",
        "For each, set a target response time, the feedback shown at each latency band, and how you would measure real-user latency.",
      ],
      deliverable: "A table of interactions, targets, feedback and measurement.",
      criteria: ["Distinguishes acknowledgement from completion", "Uses latency bands sensibly", "Measures distributions, not averages"],
    },
    {
      id: "doherty-threshold-ex-claims",
      kind: "critique",
      level: "advanced",
      title: "Audit a popular claim",
      prompt: [
        "A blog post states: 'Science proves users abandon any interaction slower than 400 ms (Doherty, 1982).'",
        "Write a critique identifying what kind of source the 1982 report is, what it did and did not show, and how you would phrase the claim accurately.",
      ],
      deliverable: "A 150–200 word critique with a corrected statement.",
      criteria: ["Identifies the source type", "Separates productivity from perception", "Offers an accurate rephrasing"],
      exampleSolution: [
        "The 1982 IBM report was an industry document making an economic argument for faster response times; it did not establish a perceptual threshold or measure abandonment. Its 400 ms figure is widely repeated second-hand.",
        "Accurate version: 'An influential 1982 IBM report argued that sub-second system response — often quoted as under 400 ms — increased user productivity. Contemporary guidance treats ≈0.1 s as feeling instantaneous and ≈1 s as preserving flow.'",
      ],
    },
  ],

  quiz: [
    {
      id: "doherty-threshold-q-source",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What kind of source is the origin of the 'Doherty threshold'?",
      options: [
        { text: "A 1982 IBM report on the economic value of rapid response time", correct: true, explanation: "It is an industry report, not a peer-reviewed perceptual study." },
        { text: "A replicated psychophysics experiment on perception thresholds", correct: false, explanation: "No such experiment underlies the popular 400 ms figure." },
        { text: "An ISO standard", correct: false, explanation: "No ISO standard defines a Doherty threshold." },
        { text: "Fitts's 1954 paper", correct: false, explanation: "Fitts studied movement time, not system response time." },
      ],
      explanation: "The Doherty threshold traces to Doherty & Thadani's 1982 IBM report.",
    },
    {
      id: "doherty-threshold-q-limits",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "According to Nielsen's widely cited response-time limits, what should you show for an operation expected to take about 20 seconds?",
      options: [
        { text: "A progress indicator that shows how much work remains, ideally letting users do something else", correct: true, explanation: "Beyond about 10 s, attention wanders; users need progress information." },
        { text: "Nothing — users will wait", correct: false, explanation: "Long unexplained waits break attention and trust." },
        { text: "A pressed state on the button only", correct: false, explanation: "That is appropriate for short delays, not 20 s." },
        { text: "An optimistic 'Done' message immediately", correct: false, explanation: "Claiming completion before a long operation finishes misleads users if it fails." },
      ],
      explanation: "Feedback should scale with latency: acknowledgement for short delays, progress for long ones.",
    },
    {
      id: "doherty-threshold-q-perception",
      kind: "true-false",
      level: "intermediate",
      prompt: "People cannot perceive interface delays shorter than 400 ms.",
      options: [
        { text: "True", correct: false, explanation: "Delays well under 400 ms are noticeable; around 0.1 s is commonly cited as the limit for feeling instantaneous." },
        { text: "False", correct: true, explanation: "The 400 ms figure is a productivity target from an industry report, not a perceptual limit." },
      ],
      explanation: "Perceived responsiveness degrades continuously; 400 ms is not a perception threshold.",
      revise: "doherty-threshold",
    },
  ],

  flashcards: [
    { id: "doherty-threshold-fc-1", front: "Doherty threshold origin", back: "Doherty & Thadani (1982), IBM report — economic case for sub-second response; '400 ms' widely quoted second-hand." },
    { id: "doherty-threshold-fc-2", front: "Nielsen's three response-time limits", back: "≈0.1 s feels instant · ≈1 s keeps flow · ≈10 s keeps attention (after Miller 1968; Card et al. 1991)." },
  ],

  references: [
    { source: "doherty-thadani-1982", role: "primary", note: "Origin of the popular claim; original text not verified first-hand." },
    { source: "miller-1968", role: "primary", note: "Early analysis of response time in conversational transactions." },
    { source: "card-robertson-mackinlay-1991", role: "primary", note: "Time constants of interaction." },
    { source: "shneiderman-1984", role: "primary", note: "Survey of response-time research and its context dependence." },
    { source: "myers-1985", role: "primary", note: "Value of percent-done progress indicators." },
    { source: "nielsen-1993-response-times", role: "explanatory", note: "The 0.1 / 1 / 10 s guidance." },
    { source: "nielsen-1993", role: "explanatory", note: "Usability Engineering, chapter 5 (response times)." },
    { source: "laws-of-ux", role: "further", note: "Popular 'Doherty Threshold' presentation." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "The specific threshold rests on an industry report that has not been independently replicated or peer reviewed, and whose figures are usually quoted second-hand. The broader principle — faster, well-signposted responses improve experience and productivity — is supported by HCI research and professional guidance, but acceptable latency depends on task, expectations and variability.",

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
