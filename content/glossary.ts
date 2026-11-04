import type { GlossaryTerm } from "../lib/content/schema";

/** Glossary of terms. Each term links to entries via seeAlso. Keep definitions original and concise. */
type T = Omit<GlossaryTerm, "seeAlso"> & { seeAlso?: string[] };
const t = (term: string, slug: string, definition: string, seeAlso: string[] = [], source?: string): T => ({
  term,
  slug,
  definition,
  seeAlso,
  ...(source ? { source } : {}),
});

const terms: T[] = [
  /* Foundations */
  t("User experience (UX)", "user-experience", "Everything a person perceives and feels while using, or anticipating using, a product, system or service — including usefulness, ease, trust and emotion, not only the interface.", ["user-experience", "usability", "ui-design"]),
  t("Usability", "usability", "The extent to which specified users can achieve specified goals with effectiveness, efficiency and satisfaction in a specified context of use (ISO 9241-11).", ["usability", "effectiveness", "efficiency", "satisfaction"], "iso-9241-11-2018"),
  t("Context of use", "context-of-use", "The users, goals, tasks, resources and physical, social and technical environments in which a product is used. Usability is only meaningful relative to it.", ["usability", "human-centred-design"], "iso-9241-11-2018"),
  t("Utility", "utility", "Whether a product provides the functions people need. A highly usable product with low utility is easy to use for things nobody needs.", ["utility", "usefulness"]),
  t("Human-centred design", "human-centred-design", "An approach to designing interactive systems that bases decisions on an explicit understanding of users, tasks and environments, and refines designs through user evaluation and iteration.", ["human-centred-design", "user-centred-design"], "iso-9241-210-2019"),
  t("UX maturity", "ux-maturity", "How consistently and strategically an organisation practises user-centred design — from ad-hoc, individual effort to UX shaping strategy and culture.", ["ux-maturity", "design-ops"]),

  /* Laws & effects */
  t("Index of difficulty (ID)", "index-of-difficulty", "In Fitts's law, a measure of how hard an aimed movement is, in bits: log₂(D/W + 1) in the Shannon formulation, where D is distance and W is target width.", ["fitts-law"], "mackenzie-1992"),
  t("Throughput (pointing)", "throughput", "A device-level measure of pointing performance in bits per second, computed from the effective index of difficulty divided by movement time.", ["fitts-law"], "soukoreff-mackenzie-2004"),
  t("Primacy effect", "primacy-effect", "The tendency to recall items at the start of a list better than those in the middle, usually attributed to extra rehearsal and transfer to long-term memory.", ["primacy-effect", "serial-position-effect"]),
  t("Recency effect", "recency-effect", "The tendency to recall the last items of a list well when recall is immediate; it weakens when recall is delayed or interrupted.", ["recency-effect", "serial-position-effect"]),
  t("Isolation effect", "isolation-effect", "Another name for the Von Restorff effect: an item that differs distinctly from its neighbours is more likely to be noticed and remembered.", ["von-restorff-effect"]),
  t("Choice overload", "choice-overload", "The proposal that too many options can reduce satisfaction or the likelihood of choosing at all. Meta-analytic evidence shows the effect is highly conditional rather than universal.", ["choice-overload", "hick-hyman-law"]),
  t("Default effect", "default-effect", "People's tendency to stay with a pre-selected option. Defaults are powerful design decisions and carry ethical responsibility.", ["default-effect", "status-quo-bias", "deceptive-patterns"]),
  t("Loss aversion", "loss-aversion", "The finding that losses tend to weigh more heavily than equivalent gains in people's decisions, a central idea of prospect theory.", ["loss-aversion", "framing-effect"]),
  t("Anchoring", "anchoring", "Judgements being pulled toward an initial value — such as a first price shown — even when that value is arbitrary.", ["anchoring-effect"]),
  t("Framing effect", "framing-effect", "Different choices made for logically equivalent options depending on how they are described, for example as a gain or a loss.", ["framing-effect", "loss-aversion"]),

  /* Psychology & HCI */
  t("Working memory", "working-memory", "The limited-capacity system that holds and manipulates information for a few seconds while we think, read or decide.", ["working-memory-model", "cognitive-load-theory", "millers-law"]),
  t("Chunking", "chunking", "Grouping individual items into larger meaningful units so that more information fits within the limits of working memory — for example, reading a phone number in groups.", ["millers-law", "working-memory-model"]),
  t("Intrinsic cognitive load", "intrinsic-cognitive-load", "Mental effort that comes from the inherent complexity of the material relative to the learner's expertise.", ["cognitive-load-theory"]),
  t("Extraneous cognitive load", "extraneous-cognitive-load", "Mental effort caused by the way information is presented rather than by the task itself — the load designers can most directly reduce.", ["cognitive-load-theory", "visual-hierarchy"]),
  t("Mental model", "mental-model", "A person's internal explanation of how a system works, built from experience. It guides what they expect and try; it is often incomplete.", ["mental-models", "conceptual-models"]),
  t("Affordance", "affordance", "A relationship between an object's properties and an agent's capabilities that determines how the object could be used — for example, a handle affords pulling.", ["affordances", "signifiers"], "norman-2013"),
  t("Signifier", "signifier", "A perceivable cue that communicates where and how to act, such as a label, an underline or a raised button style.", ["signifiers", "affordances"], "norman-2013"),
  t("Mapping", "mapping", "The relationship between controls and their effects. Natural mappings exploit spatial or cultural analogies so the result of an action is predictable.", ["mapping", "constraints"], "norman-2013"),
  t("Gulf of execution", "gulf-of-execution", "The gap between what a person wants to do and the actions a system makes available or visible.", ["gulfs-of-execution-and-evaluation", "seven-stages-of-action"]),
  t("Gulf of evaluation", "gulf-of-evaluation", "The effort needed to interpret a system's state and decide whether the intended outcome has been achieved.", ["gulfs-of-execution-and-evaluation", "feedback-principle"]),
  t("Preattentive processing", "preattentive-processing", "Rapid, parallel visual detection of features such as colour, orientation or size, before focused attention — why a single red item pops out from grey ones.", ["preattentive-processing", "visual-search"]),
  t("Change blindness", "change-blindness", "Failure to notice substantial changes in a scene when they coincide with a disruption such as a page reload or a glance away.", ["change-blindness", "visibility-of-system-status"]),
  t("Inattentional blindness", "inattentional-blindness", "Failure to notice a clearly visible item because attention is engaged elsewhere — for example, missing a banner while focused on a form.", ["inattentional-blindness", "selective-attention"]),

  /* Heuristics */
  t("Heuristic", "heuristic", "A broad rule of thumb used to judge a design. Heuristics guide expert review; they are not laws and do not replace testing with users.", ["nielsen-usability-heuristics", "heuristic-evaluation"]),
  t("Severity rating", "severity-rating", "A judgement of how serious a usability problem is, usually combining frequency, impact and persistence, used to prioritise fixes.", ["heuristic-evaluation", "usability-testing"]),
  t("Error prevention", "error-prevention", "Designing so that errors are less likely in the first place — through constraints, good defaults and confirmation for irreversible actions — rather than relying on error messages.", ["error-prevention", "constraints"]),

  /* Research */
  t("Think-aloud protocol", "think-aloud", "A method in which participants verbalise their thoughts while performing tasks, revealing expectations and confusion as they arise.", ["think-aloud-protocol", "usability-testing"]),
  t("Contextual inquiry", "contextual-inquiry", "A field method combining observation and interview in the participant's own environment while they do real work.", ["contextual-inquiry", "field-studies"]),
  t("Diary study", "diary-study", "A longitudinal method in which participants record experiences over days or weeks, capturing behaviour that a single session would miss.", ["diary-studies"]),
  t("Formative evaluation", "formative-evaluation", "Evaluation during design to find and fix problems; its output is a list of issues and insights rather than a score.", ["formative-evaluation", "usability-testing"]),
  t("Summative evaluation", "summative-evaluation", "Evaluation of a finished or near-finished design against goals or benchmarks, usually with metrics and larger samples.", ["summative-evaluation", "benchmark-studies"]),
  t("Moderated testing", "moderated-testing-term", "Usability testing in which a facilitator guides the session in real time, allowing follow-up questions.", ["moderated-testing", "unmoderated-testing"]),
  t("Card sorting", "card-sort", "A method where participants group topic cards in ways that make sense to them (open) or into given categories (closed), informing information architecture.", ["card-sorting", "tree-testing"]),
  t("Tree testing", "tree-test", "Evaluating a navigation hierarchy by asking participants to find items in a text-only version of it, isolating structure from visual design.", ["tree-testing", "card-sorting"]),
  t("Affinity mapping", "affinity-map", "Clustering observations or notes by similarity to reveal patterns and themes during research synthesis.", ["affinity-mapping", "thematic-analysis"]),
  t("Triangulation", "triangulation", "Strengthening conclusions by comparing evidence from different methods, data sources or researchers.", ["data-triangulation"]),
  t("Screener", "screener", "A short questionnaire used to recruit participants who match the study's criteria and exclude those who do not.", ["screening-questionnaires", "participant-recruitment"]),
  t("Informed consent", "consent", "Participants' voluntary agreement to take part after being told the purpose, what will happen, how their data will be used and that they may withdraw.", ["informed-consent", "research-ethics"]),

  /* Frameworks */
  t("Double Diamond", "double-diamond-term", "A design-process model of two phases of divergent then convergent thinking: first on the problem (discover, define), then on the solution (develop, deliver).", ["double-diamond", "design-thinking"]),
  t("Job to be done", "job-to-be-done", "The progress a person is trying to make in a particular circumstance — the reason they 'hire' a product — described independently of any solution.", ["jobs-to-be-done", "outcome-driven-innovation"]),
  t("Kano categories", "kano-categories", "Classes of product attributes by their effect on satisfaction — must-be, one-dimensional (performance), attractive, indifferent and reverse.", ["kano-model"]),
  t("HEART", "heart", "A framework for choosing user-centred metrics across Happiness, Engagement, Adoption, Retention and Task success, linked to goals and signals.", ["heart-framework", "outcome-metrics"]),
  t("GOMS", "goms-term", "A family of models describing a task as Goals, Operators, Methods and Selection rules, used to predict expert performance time.", ["goms", "keystroke-level-model"], "card-moran-newell-1983"),
  t("Opportunity solution tree", "opportunity-solution-tree-term", "A visual map from a desired outcome to the customer opportunities that could drive it, and the solutions and experiments for each.", ["opportunity-solution-tree", "product-discovery"]),

  /* Information architecture */
  t("Taxonomy", "taxonomy", "A controlled, usually hierarchical, classification of concepts used to organise and label content.", ["taxonomies", "ontologies"]),
  t("Faceted navigation", "faceted-navigation-term", "Filtering a collection by several independent attributes (facets) at once, such as size, price and brand.", ["faceted-navigation", "metadata"]),
  t("Information scent", "information-scent-term", "The cues — labels, links, snippets — people use to judge whether a path will lead to the information they want.", ["information-scent", "labelling-systems"]),
  t("Findability", "findability-term", "How easily people can locate content, whether by browsing, searching or following links.", ["findability", "search-architecture"]),

  /* Interaction */
  t("Progressive disclosure", "progressive-disclosure-term", "Deferring advanced or rarely needed options to a secondary step so the initial interface stays simple without removing capability.", ["progressive-disclosure", "cognitive-load-theory"]),
  t("Direct manipulation", "direct-manipulation-term", "Interaction in which people act on visible representations of objects with immediate, reversible feedback — dragging a file rather than typing a command.", ["direct-manipulation"], "shneiderman-2016"),
  t("Microinteraction", "microinteraction", "A contained product moment built around a single task — such as a toggle, a like or a password-strength hint — with a trigger, rules, feedback and loops.", ["microinteractions"]),
  t("Interaction cost", "interaction-cost-term", "The total mental and physical effort required to accomplish a goal: reading, scrolling, deciding, clicking, waiting and remembering.", ["interaction-cost", "keystroke-level-model"]),
  t("Optimistic UI", "optimistic-ui", "Showing the result of an action immediately, before the server confirms it, and reconciling if it fails. It improves perceived speed but requires clear error recovery.", ["visibility-of-system-status", "error-recovery"]),

  /* Visual & type & colour */
  t("Visual hierarchy", "visual-hierarchy-term", "The ordering of elements by visual prominence — through size, contrast, weight, spacing and position — that guides what people notice first.", ["visual-hierarchy", "emphasis"]),
  t("White space", "white-space-term", "Empty space between and around elements. It groups, separates and gives emphasis; it is a structural element, not wasted space.", ["white-space", "law-of-proximity"]),
  t("Measure (line length)", "measure", "The length of a line of text, usually expressed in characters. Very long or very short measures make reading harder.", ["line-length", "readability"]),
  t("Leading", "leading-term", "The vertical distance between lines of text (line height in CSS); named after the strips of lead once placed between lines of metal type.", ["leading", "line-height"]),
  t("Tracking", "tracking-term", "Uniform adjustment of spacing across a range of characters (letter-spacing in CSS).", ["tracking", "kerning"]),
  t("Kerning", "kerning-term", "Adjustment of the space between a specific pair of characters to improve their visual fit, as in 'AV'.", ["kerning", "tracking"]),
  t("x-height", "x-height", "The height of lowercase letters such as 'x' relative to capitals. A larger x-height generally looks bigger and is more legible at small sizes.", ["font-anatomy", "legibility"]),
  t("Modular scale", "modular-scale", "A sequence of sizes produced by repeatedly multiplying a base size by a fixed ratio, used to create harmonious typographic hierarchies.", ["modular-type-scale", "typography-scales"]),
  t("Variable font", "variable-font-term", "A single font file containing a continuous design space along axes such as weight, width or optical size.", ["variable-fonts", "optical-sizing"]),
  t("Relative luminance", "relative-luminance", "The perceived brightness of a colour normalised from 0 (black) to 1 (white), computed from linearised sRGB components; the basis of WCAG 2.x contrast ratios.", ["colour-contrast-ratio"], "w3c-wcag-22"),
  t("Contrast ratio", "contrast-ratio", "In WCAG 2.x, (L₁ + 0.05)/(L₂ + 0.05), where L₁ is the lighter colour's relative luminance. It ranges from 1:1 to 21:1.", ["colour-contrast-ratio", "wcag"], "w3c-wcag-22"),
  t("Colour gamut", "gamut", "The range of colours a device or colour space can reproduce. Display-P3, for example, has a wider gamut than sRGB.", ["colour-gamut", "colour-models"]),
  t("CIELAB", "cielab", "A colour space designed so that numerical distances roughly match perceived colour differences, with lightness (L*) and two opponent axes (a*, b*).", ["cie-lab", "perceptual-colour-spaces"]),

  /* Design systems */
  t("Design token", "design-token", "A named, platform-agnostic design decision — such as a colour, spacing step or duration — stored as data so it can be shared across tools and code.", ["design-tokens", "semantic-tokens"]),
  t("Semantic token", "semantic-token", "A token named for its purpose (e.g., 'colour.text.danger') that references a primitive value, so themes can change values without changing intent.", ["semantic-tokens", "primitive-tokens"]),
  t("Atomic design", "atomic-design-term", "A methodology that composes interfaces hierarchically from atoms, molecules and organisms into templates and pages.", ["atomic-design", "component-architecture"]),
  t("Skeleton screen", "skeleton-screen", "A placeholder layout shown while content loads, indicating structure and progress rather than a blank page or a lone spinner.", ["skeleton-screens", "loading-states"]),
  t("Empty state", "empty-state", "What an interface shows when there is no data yet. A good empty state explains why and offers the next useful action.", ["empty-states", "empty-state-writing"]),

  /* Accessibility */
  t("WCAG", "wcag-term", "The W3C's Web Content Accessibility Guidelines: testable success criteria at levels A, AA and AAA, organised under four principles.", ["wcag", "pour"], "w3c-wcag-22"),
  t("POUR", "pour-term", "WCAG's four principles: content must be Perceivable, Operable, Understandable and Robust.", ["pour", "wcag"], "w3c-wcag-22"),
  t("Success criterion", "success-criterion", "A testable statement in WCAG that content either meets or does not, each assigned a conformance level.", ["success-criteria", "conformance-levels"], "w3c-wcag-22"),
  t("Accessible name", "accessible-name", "The text that assistive technologies announce for an element, derived from its content, label, or ARIA attributes.", ["semantic-html", "aria"], "w3c-aria-apg"),
  t("Focus indicator", "focus-indicator", "The visible mark showing which element has keyboard focus. Removing it without a replacement makes keyboard use impossible.", ["focus-management", "keyboard-accessibility"], "w3c-wcag-22"),
  t("Screen reader", "screen-reader", "Software that conveys on-screen content through speech or braille and lets people navigate by headings, landmarks, links and controls.", ["screen-readers", "assistive-technologies"]),
  t("WAI-ARIA", "wai-aria", "A W3C specification of roles, states and properties that expose custom widgets to assistive technologies. Native HTML elements should be preferred where they exist.", ["aria", "semantic-html"], "w3c-aria-apg"),

  /* Content */
  t("Microcopy", "microcopy-term", "The small pieces of interface text — labels, hints, button text, errors — that guide action at the moment it happens.", ["microcopy", "ux-writing"]),
  t("Plain language", "plain-language-term", "Writing that the intended audience can find, understand and use the first time they read it.", ["plain-language", "inclusive-content"]),
  t("Localisation", "localisation", "Adapting a product for a specific language and region — text, formats, imagery and cultural conventions — building on internationalisation.", ["localization", "internationalization"]),

  /* Product */
  t("Product-market fit", "pmf", "The degree to which a product satisfies a strong market demand, typically evidenced by retention and organic growth rather than by opinion.", ["product-market-fit", "retention-rate"]),
  t("North Star Metric", "north-star-metric-term", "A single metric chosen to represent the core value a product delivers to customers, used to align teams.", ["north-star-metric", "outcome-metrics"]),
  t("Acceptance criteria", "acceptance-criteria-term", "Conditions a piece of work must satisfy to be accepted, written so they can be tested.", ["acceptance-criteria", "user-stories"]),
  t("Outcome", "outcome", "A change in user or business behaviour that a team aims to achieve, as distinct from an output — the feature shipped.", ["outcome-metrics", "product-strategy"]),

  /* Service */
  t("Touchpoint", "touchpoint", "Any point of interaction between a person and a service — a screen, letter, phone call, counter or notification.", ["touchpoints", "service-blueprints"]),
  t("Frontstage and backstage", "frontstage-backstage", "In service blueprints, frontstage covers what customers see; backstage covers the people, processes and systems that make it possible.", ["frontstage-and-backstage", "service-blueprints"]),

  /* Metrics & statistics */
  t("System Usability Scale (SUS)", "sus", "A ten-item questionnaire of perceived usability scored from 0 to 100. A score is not a percentage; it is interpreted against benchmarks.", ["system-usability-scale", "umux-lite"]),
  t("Net Promoter Score (NPS)", "nps", "Percentage of promoters (9–10) minus percentage of detractors (0–6) on a 0–10 likelihood-to-recommend question, giving a value from −100 to 100.", ["net-promoter-score", "csat"]),
  t("Task success rate", "task-success", "The proportion of attempts in which participants complete a task correctly, usually reported with an adjusted-Wald confidence interval for small samples.", ["task-success-rate", "confidence-intervals"], "sauro-lewis-2016"),
  t("Geometric mean", "geometric-mean", "The exponential of the mean of log values; for skewed data such as task times it estimates the median better than the arithmetic mean in small samples.", ["time-on-task"], "sauro-lewis-2010"),
  t("Confidence interval", "confidence-interval", "A range computed from sample data that would contain the true value in a stated proportion (e.g., 95%) of repeated samples.", ["confidence-intervals", "margin-of-error"]),
  t("p-value", "p-value-term", "The probability of observing data at least as extreme as yours if the null hypothesis were true. It is not the probability that the hypothesis is true.", ["p-value", "statistical-significance"]),
  t("Statistical power", "statistical-power-term", "The probability that a study detects an effect of a given size if it exists; low power produces missed effects and exaggerated estimates.", ["statistical-power", "sample-size-estimation"], "cohen-1988"),
  t("Effect size", "effect-size-term", "A measure of how large a difference or relationship is, independent of sample size — for example Cohen's d or a difference in proportions.", ["effect-size"], "cohen-1988"),
  t("Churn", "churn", "The proportion of users or customers who stop using or paying for a product in a given period.", ["churn-rate", "retention-rate"]),
  t("Activation", "activation", "The moment a new user first experiences the product's core value, defined by a specific action that predicts retention.", ["activation-rate", "feature-adoption"]),

  /* Data visualisation */
  t("Visual encoding", "visual-encoding-term", "Mapping data values to visual properties such as position, length, angle, area or colour. Position on a common scale is generally read most accurately.", ["visual-encoding", "graphical-perception"]),
  t("Data-ink ratio", "data-ink-ratio", "Tufte's term for the share of a graphic's ink that represents data; reducing non-data ink can clarify a chart but should not remove useful context.", ["chart-integrity", "statistical-graphics"]),

  /* Ethics */
  t("Deceptive pattern", "deceptive-pattern", "An interface design that steers people into choices they did not intend and would not make if fully informed — also called a dark pattern.", ["deceptive-patterns", "user-autonomy"]),
  t("Nudge", "nudge", "A change to choice architecture that predictably alters behaviour without forbidding options or significantly changing incentives.", ["nudge-theory", "default-effect"]),
  t("Privacy by design", "privacy-by-design-term", "Building privacy protections into a product's defaults and architecture from the start rather than adding them later.", ["privacy-by-design", "consent-design"]),

  /* Emerging */
  t("Explainable AI (XAI)", "xai", "Methods and interface patterns that help people understand why an AI system produced an output, so they can judge when to rely on it.", ["explainable-ai", "ai-transparency"]),
  t("Calibrated trust", "calibrated-trust", "Trust in an automated system that matches its actual reliability — neither over-relying on it nor dismissing it when it is right.", ["ai-trust", "human-ai-interaction"], "google-pair-guidebook"),
  t("Human-in-the-loop", "human-in-the-loop", "A system design in which people review, correct or approve automated outputs at defined points, keeping accountability with a person.", ["agentic-ai-interfaces", "responsible-ai"]),

  /* Practice */
  t("Design critique", "design-critique-term", "A structured review in which work is assessed against its goals and principles, with feedback focused on the work rather than the person.", ["design-critique", "design-collaboration"]),
  t("Prototype fidelity", "prototype-fidelity", "How closely a prototype resembles the final product in visual detail, interactivity and content. Choose the lowest fidelity that answers the question.", ["prototyping", "concept-testing"]),
  t("Design handoff", "handoff", "The transfer of design intent, specifications and assets to engineering — ideally a continuous collaboration rather than a single event.", ["design-to-development-handoff"]),
];

export const glossary: GlossaryTerm[] = terms.map((x) => ({ ...x, seeAlso: x.seeAlso ?? [] }));
