import type { StandaloneFormula } from "../lib/content/schema";

/**
 * Formula Library entries for metrics that do not yet have a full knowledge
 * entry. Same rigour as entry formulas: variables, assumptions, worked example,
 * limitations and references are mandatory.
 *
 * Worked examples were computed numerically (not by hand) and must match the
 * calculators in lib/formulas.
 */
export const standaloneFormulas: StandaloneFormula[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "umux-lite",
    topic: "umux-lite",
    calculator: "umux-lite",
    name: "UMUX-LITE score",
    summary:
      "A two-item perceived-usability questionnaire scored 0–100, with an optional regression adjustment that aligns its mean with the System Usability Scale.",
    expression: "UMUX-LITE = ((i₁ − 1) + (i₂ − 1)) / 12 × 100;   UMUX-LITEᵣ = 0.65 × UMUX-LITE + 22.9",
    contributor: "Lewis, Utesch & Maher (2013), derived from Finstad's (2010) four-item UMUX",
    source: "lewis-utesch-maher-2013",
    variables: [
      { symbol: "i₁", name: "Capabilities item", unit: "1–7", description: "Agreement with “This system's capabilities meet my requirements” (1 = strongly disagree, 7 = strongly agree)." },
      { symbol: "i₂", name: "Ease-of-use item", unit: "1–7", description: "Agreement with “This system is easy to use” on the same 7-point scale." },
      { symbol: "UMUX-LITE", name: "Raw score", unit: "0–100", description: "The sum of the two item scores (each shifted to 0–6), rescaled to 0–100." },
      { symbol: "UMUX-LITEᵣ", name: "Regression-adjusted score", unit: "≈ SUS scale", description: "Linear transformation published to make UMUX-LITE means comparable to SUS means." },
    ],
    resultUnit: "points on a 0–100 scale (not a percentage)",
    assumptions: [
      "Both items use the 7-point agreement format and wording of the original study.",
      "Respondents have actually used the system for a representative task.",
      "The regression adjustment transfers from the samples it was derived from to yours.",
    ],
    conditions: [
      "Use when a full SUS is too long — for example in-product surveys or after every task in a long study.",
      "Report raw and adjusted scores clearly labelled; never mix them in one trend line.",
    ],
    steps: [
      "Subtract 1 from each item so each ranges 0–6.",
      "Add the two shifted items (range 0–12).",
      "Divide by 12 and multiply by 100 to get the raw score.",
      "Optionally compute 0.65 × raw + 22.9 for comparison with SUS benchmarks.",
      "Average individual scores across respondents; report n and a confidence interval.",
    ],
    workedExample: {
      given: ["A respondent answers 6 to the capabilities item and 5 to the ease-of-use item."],
      steps: [
        "Shifted items: 6 − 1 = 5 and 5 − 1 = 4",
        "Sum = 9",
        "Raw = 9 / 12 × 100 = 75.0",
        "Adjusted = 0.65 × 75 + 22.9 = 71.65",
      ],
      result: "Raw UMUX-LITE = 75.0; regression-adjusted ≈ 71.7.",
    },
    interpretation: [
      "Interpret scores relative to benchmarks or to your own previous releases, not as 'percent usable'. The adjusted score can be compared cautiously with SUS norms; the raw score cannot.",
      "With only two items, individual scores are coarse (13 possible raw values); conclusions should rest on group means with confidence intervals.",
    ],
    commonErrors: [
      "Forgetting to subtract 1 from each item, which inflates every score.",
      "Treating the score as a percentage of users satisfied.",
      "Comparing raw UMUX-LITE to SUS benchmarks without the adjustment (or adjusting twice).",
      "Changing item wording or scale length and still using the published regression equation.",
    ],
    limitations: [
      "Two items cannot diagnose *why* usability is low; pair with qualitative research.",
      "The regression adjustment was estimated on specific enterprise-software samples; later studies examined whether it is needed, so check current literature before relying on it.",
      "Coarse at the individual level; sensitive to scale translation and cultural response styles.",
    ],
    alternatives: [
      { name: "UMUX (Finstad, 2010)", expression: "four 7-point items, alternating tone, scaled to 0–100", note: "The parent instrument; more items, more reliability, still short." },
      { name: "System Usability Scale", expression: "SUS = 2.5 × Σ adjusted item scores (10 items)", note: "Longer, with the largest benchmark base; see the SUS entry." },
    ],
    references: [
      { source: "lewis-utesch-maher-2013", role: "primary", note: "Item selection and regression adjustment." },
      { source: "finstad-2010", role: "primary", note: "The four-item UMUX on which UMUX-LITE is based." },
      { source: "lewis-utesch-maher-2015", role: "further", note: "Follow-up comparison with SUS." },
      { source: "sauro-lewis-2016", role: "explanatory", note: "Questionnaire scoring and interpretation in practice." },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "csat",
    topic: "csat",
    calculator: "csat",
    name: "Customer Satisfaction Score (CSAT)",
    summary:
      "The share of respondents who choose one of the top two options on a five-point satisfaction question, usually reported with the mean rating.",
    expression: "CSAT = (n₄ + n₅) / N × 100;   mean = Σ (k × nₖ) / N",
    contributor: "Industry convention (top-two-box scoring); no single originating publication",
    variables: [
      { symbol: "nₖ", name: "Count at rating k", unit: "respondents", description: "Number of respondents who chose rating k on a 1–5 scale (1 = very dissatisfied, 5 = very satisfied)." },
      { symbol: "N", name: "Total respondents", unit: "respondents", description: "Σ nₖ for k = 1…5; non-responses are excluded." },
      { symbol: "CSAT", name: "Top-two-box share", unit: "%", description: "Percentage of respondents who were satisfied (4) or very satisfied (5)." },
    ],
    resultUnit: "% of respondents (top-two-box) and mean rating on 1–5",
    assumptions: [
      "A single question with five labelled points, asked about a specific interaction or product.",
      "Respondents are representative of the people whose satisfaction you want to estimate.",
    ],
    conditions: [
      "Use for transactional satisfaction (after a support case, purchase or task).",
      "Keep the question wording, scale and timing identical when comparing periods.",
    ],
    steps: [
      "Count responses at each rating 1–5.",
      "Add the counts for ratings 4 and 5.",
      "Divide by the total number of responses and multiply by 100.",
      "Also compute the mean rating and report the distribution, not only the score.",
    ],
    workedExample: {
      given: ["100 responses: 4 × ‘1’, 6 × ‘2’, 15 × ‘3’, 40 × ‘4’, 35 × ‘5’."],
      steps: [
        "Top-two-box = 40 + 35 = 75",
        "CSAT = 75 / 100 × 100 = 75%",
        "Mean = (1×4 + 2×6 + 3×15 + 4×40 + 5×35) / 100 = 396 / 100 = 3.96",
      ],
      result: "CSAT = 75%; mean rating = 3.96 / 5.",
    },
    interpretation: [
      "CSAT is a proportion, so report a confidence interval for it — with small N, differences of several points can be noise (see [[confidence-intervals]]).",
      "Top-box scores discard information: a shift from 4 to 5 does not change CSAT, while a shift from 3 to 4 does. Look at the full distribution.",
    ],
    commonErrors: [
      "Comparing CSAT figures that used different scales (5-point vs 7-point) or definitions (top-box vs top-two-box).",
      "Including non-responses in the denominator.",
      "Surveying only users who completed a flow, then generalising to everyone who started it (survivorship bias).",
    ],
    limitations: [
      "Measures stated satisfaction at a moment, not behaviour or loyalty.",
      "Highly sensitive to timing, wording and who chooses to respond.",
      "No universal benchmark: industry ‘good’ CSAT figures are rarely comparable.",
    ],
    alternatives: [
      { name: "Top-box", expression: "n₅ / N × 100", note: "Stricter; more sensitive to delight, less to adequacy." },
      { name: "Mean satisfaction", expression: "Σ k·nₖ / N", note: "Uses all response information; treats the scale as interval." },
    ],
    references: [
      { source: "sauro-lewis-2016", role: "explanatory", note: "Top-box scoring and confidence intervals for rating-scale data." },
      { source: "fornell-1992", role: "further", note: "Satisfaction measurement at national scale; context, not the origin of CSAT." },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "ces",
    topic: "ces",
    calculator: "ces",
    name: "Customer Effort Score (CES)",
    summary:
      "A rating of how easy it was to get something done, usually asked on a 7-point agreement scale and reported as the mean and the share agreeing.",
    expression: "CES = Σ (k × nₖ) / N;   % agree = (n₅ + n₆ + n₇) / N × 100",
    contributor: "Dixon, Freeman & Toman (2010), Corporate Executive Board; later revised (‘CES 2.0’)",
    source: "dixon-freeman-toman-2010",
    variables: [
      { symbol: "nₖ", name: "Count at rating k", unit: "respondents", description: "Respondents choosing k on a 1–7 agreement scale for a statement such as “The company made it easy for me to handle my issue” (7 = strongly agree)." },
      { symbol: "N", name: "Total respondents", unit: "respondents", description: "Σ nₖ for k = 1…7." },
      { symbol: "CES", name: "Mean effort score", unit: "1–7", description: "Higher is easier in the 7-point agreement version." },
    ],
    resultUnit: "mean on 1–7, and % agreeing (5–7)",
    assumptions: [
      "The 7-point agreement format is used, where higher means less effort.",
      "The question is asked right after a specific interaction, such as a support contact or task.",
    ],
    conditions: [
      "Use for service and task interactions where effort is the experience you can change.",
      "State the version and scale; scores from different versions are not comparable.",
    ],
    steps: [
      "Count responses at each rating 1–7.",
      "Compute the mean rating.",
      "Compute the percentage of respondents choosing 5, 6 or 7.",
      "Report both with N and the exact question wording.",
    ],
    workedExample: {
      given: ["100 responses: 2 × ‘1’, 3 × ‘2’, 5 × ‘3’, 10 × ‘4’, 20 × ‘5’, 35 × ‘6’, 25 × ‘7’."],
      steps: [
        "Σ k·nₖ = 2 + 6 + 15 + 40 + 100 + 210 + 175 = 548",
        "Mean CES = 548 / 100 = 5.48",
        "% agree = (20 + 35 + 25) / 100 = 80%",
      ],
      result: "CES = 5.48 / 7; 80% agree the interaction was easy.",
    },
    interpretation: [
      "Look for changes over time and between channels for the same question. Low-effort outliers often point to specific broken journeys worth investigating qualitatively.",
    ],
    commonErrors: [
      "Mixing the original effort question (“How much effort did you personally have to put forth…”, where *lower* is better) with the agreement version (where *higher* is better).",
      "Comparing CES across companies that use different wording or scales.",
      "Treating a correlation between CES and loyalty in one data set as proof that reducing effort causes loyalty in yours.",
    ],
    limitations: [
      "Self-reported effort may diverge from measured effort (time, steps, errors) — triangulate with [[task-success-rate|task success]] and time-on-task.",
      "The loyalty claims behind CES come from proprietary industry research rather than peer-reviewed studies.",
      "There is no single standard wording; ‘CES’ refers to several related instruments.",
    ],
    alternatives: [
      { name: "CES 1.0 (original)", expression: "single effort-magnitude question, scored so lower = less effort", note: "The original formulation; criticised for ambiguity and reversed direction." },
      { name: "Single Ease Question (SEQ)", expression: "one 7-point ‘How easy or difficult was this task?’ item, asked per task", note: "Common in usability testing; also scored with higher = easier." },
    ],
    references: [
      { source: "dixon-freeman-toman-2010", role: "primary", note: "Introduces CES and its proposed link to loyalty." },
      { source: "sauro-lewis-2016", role: "explanatory", note: "Analysing single-item rating scales." },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "time-on-task",
    topic: "time-on-task",
    calculator: "time-on-task",
    name: "Time on task (geometric mean with confidence interval)",
    summary:
      "Task times are positively skewed, so for small samples the geometric mean — computed on log-transformed times — estimates the typical time better than the arithmetic mean.",
    expression: "GM = exp( (1/n) Σ ln tᵢ );   95% CI = exp( mean(ln t) ± t₀.₀₂₅,ₙ₋₁ × s_ln / √n )",
    contributor: "Sauro & Lewis (2010), building on standard log-normal methods",
    source: "sauro-lewis-2010",
    variables: [
      { symbol: "tᵢ", name: "Task time", unit: "s", description: "Time from task start to completion for participant i (successful attempts only)." },
      { symbol: "n", name: "Sample size", unit: "participants", description: "Number of successful attempts included." },
      { symbol: "s_ln", name: "SD of log times", unit: "ln s", description: "Sample standard deviation (n − 1) of ln tᵢ." },
      { symbol: "t₀.₀₂₅,ₙ₋₁", name: "Critical t value", unit: "—", description: "Two-sided 95% critical value of Student's t with n − 1 degrees of freedom." },
      { symbol: "GM", name: "Geometric mean", unit: "s", description: "Back-transformed mean of log times; estimates the median of a log-normal distribution." },
    ],
    resultUnit: "seconds (arithmetic mean, median, geometric mean, CI)",
    assumptions: [
      "Times are approximately log-normally distributed (right-skewed, positive).",
      "Only successful completions are included, so times describe the same outcome.",
      "Participants are independent and representative of the target users.",
    ],
    conditions: [
      "Prefer the geometric mean for small samples (roughly n < 25); for large samples the median is a good estimate.",
      "Use the same start/stop definition for every participant and condition.",
    ],
    steps: [
      "Exclude failed or abandoned attempts (report them separately as task success).",
      "Take the natural log of each time.",
      "Compute the mean and sample SD of the logs.",
      "Find t for n − 1 degrees of freedom; compute mean(ln t) ± t × s_ln/√n.",
      "Exponentiate the mean and both limits to return to seconds.",
    ],
    workedExample: {
      given: ["Eight successful times (s): 34, 41, 38, 52, 47, 120, 44, 39."],
      steps: [
        "Arithmetic mean = 51.9 s; median = 42.5 s",
        "mean(ln t) = 3.864; s_ln = 0.3955; t₀.₀₂₅,₇ = 2.365",
        "Margin = 2.365 × 0.3955 / √8 = 0.3307",
        "GM = e^3.864 = 47.7 s; CI = e^(3.864 ± 0.331) = 34.2 to 66.3 s",
      ],
      result: "Geometric mean ≈ 47.7 s (95% CI ≈ 34.2–66.3 s). The 120 s outlier pulls the arithmetic mean to 51.9 s.",
    },
    interpretation: [
      "The geometric mean and its interval describe a *typical* participant's time. The interval is asymmetric in seconds, which correctly reflects the skew.",
      "Compare designs by their intervals and the size of the difference, not by whether one point estimate is lower.",
    ],
    commonErrors: [
      "Including failed attempts, which mixes different outcomes.",
      "Reporting only the arithmetic mean of skewed times.",
      "Using z = 1.96 instead of t with small samples, producing intervals that are too narrow.",
      "Removing ‘outliers’ without a pre-registered rule.",
    ],
    limitations: [
      "Faster is not always better — for learning or exploration tasks, longer time may signal engagement.",
      "Think-aloud protocols inflate times; don't compare them with silent sessions.",
      "The log-normal assumption may fail for multi-modal times (e.g., some users take a different route).",
    ],
    alternatives: [
      { name: "Median", expression: "middle value of sorted times", note: "Robust and intuitive; less efficient than the geometric mean for small samples." },
      { name: "Arithmetic mean", expression: "Σ tᵢ / n", note: "Appropriate for planning total effort (e.g., staffing), but overstates the typical time." },
    ],
    references: [
      { source: "sauro-lewis-2010", role: "primary", note: "Evidence for the geometric mean as the best small-sample estimate." },
      { source: "sauro-lewis-2016", role: "explanatory", note: "Confidence intervals for task times." },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "error-rate",
    topic: "error-rate",
    calculator: "error-rate",
    name: "Error rate",
    summary:
      "Three distinct error measures — errors per opportunity, errors per attempt, and the share of users who erred at least once — that answer different questions.",
    expression: "error rate = E / O;   errors per attempt = E / A;   users with ≥1 error = U_err / U",
    contributor: "Usability-engineering measurement practice (see Sauro & Lewis, 2016)",
    variables: [
      { symbol: "E", name: "Errors observed", unit: "count", description: "Total errors, defined in advance (e.g., wrong field, wrong selection, invalid submission)." },
      { symbol: "O", name: "Error opportunities", unit: "count", description: "Number of places an error could occur × number of attempts." },
      { symbol: "A", name: "Attempts", unit: "count", description: "Number of task attempts observed." },
      { symbol: "U_err", name: "Users with an error", unit: "people", description: "Participants who made at least one error." },
      { symbol: "U", name: "Users", unit: "people", description: "All participants who attempted the task." },
    ],
    resultUnit: "proportion or % (rate), errors per attempt",
    assumptions: [
      "Errors and opportunities are defined before the study and coded consistently.",
      "Each attempt has the same number of opportunities.",
    ],
    conditions: [
      "Use errors per opportunity to compare designs with different numbers of steps.",
      "Use the share of users with an error to communicate how many people are affected.",
    ],
    steps: [
      "Define what counts as an error and list the opportunities in the task.",
      "Observe and code errors for each attempt.",
      "Compute E/O, E/A and U_err/U.",
      "Report a confidence interval for proportions; treat recovered and unrecovered errors separately.",
    ],
    workedExample: {
      given: ["12 participants each attempt a form once; the form has 5 error opportunities.", "9 errors were observed in total; 5 participants made at least one."],
      steps: [
        "O = 12 × 5 = 60; error rate = 9 / 60 = 15%",
        "Errors per attempt = 9 / 12 = 0.75",
        "Users with ≥1 error = 5 / 12 = 41.7%",
      ],
      result: "15% of opportunities produced an error; 0.75 errors per attempt; 41.7% of users erred at least once.",
    },
    interpretation: [
      "A low per-opportunity rate can still affect many users: here only 15% of opportunities failed, but almost half of participants hit an error. Choose the measure that matches the decision.",
      "Severity matters more than count — one unrecoverable error outweighs several slips users fix immediately.",
    ],
    commonErrors: [
      "Defining errors after seeing the data.",
      "Dividing by attempts when the number of opportunities differs between designs.",
      "Counting the same root cause several times in one attempt without saying so.",
    ],
    limitations: [
      "Error coding is subjective; use two coders and report agreement for important studies.",
      "Lab error rates rarely match field rates; analytics can count only errors the system detects.",
    ],
    alternatives: [
      { name: "Errors as a Poisson rate", expression: "λ = E / A, with a Poisson CI", note: "Models error counts per attempt when attempts can contain several errors." },
    ],
    references: [{ source: "sauro-lewis-2016", role: "explanatory", note: "Defining and analysing errors and error opportunities." }],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "conversion-funnel",
    topic: "funnel-conversion",
    calculator: "conversion-funnel",
    name: "Funnel conversion and drop-off",
    summary:
      "Step-by-step and overall conversion through an ordered sequence of steps, with the drop-off at each step.",
    expression: "step conversionᵢ = nᵢ / nᵢ₋₁;   drop-offᵢ = 1 − nᵢ / nᵢ₋₁;   overall = n_last / n_first",
    contributor: "Product-analytics convention",
    variables: [
      { symbol: "nᵢ", name: "Count at step i", unit: "users or sessions", description: "Number of units that reached step i within the analysis window, having passed step i − 1." },
      { symbol: "n_first", name: "Entry count", unit: "users or sessions", description: "Units entering the funnel at the first step." },
      { symbol: "n_last", name: "Completion count", unit: "users or sessions", description: "Units reaching the final step." },
    ],
    resultUnit: "% per step and overall",
    assumptions: [
      "The unit (user, session, order) is the same at every step.",
      "Steps are ordered and units must pass earlier steps to count at later ones.",
      "A fixed time window is used for completion (e.g., within 7 days of entering).",
    ],
    conditions: [
      "Use to locate where in a flow people stop, and to monitor changes after a release.",
      "Define the window and the unit before comparing periods or segments.",
    ],
    steps: [
      "Define the steps, the unit of analysis and the completion window.",
      "Count units reaching each step.",
      "Divide each step's count by the previous step's count.",
      "Divide the final count by the entry count for overall conversion.",
    ],
    workedExample: {
      given: ["Visited product → added to basket → started checkout → paid: 10,000 → 4,200 → 1,800 → 900."],
      steps: [
        "Step 2: 4,200 / 10,000 = 42.0% (drop-off 58.0%)",
        "Step 3: 1,800 / 4,200 = 42.9% (drop-off 57.1%)",
        "Step 4: 900 / 1,800 = 50.0% (drop-off 50.0%)",
        "Overall: 900 / 10,000 = 9.0% (= 0.42 × 0.4286 × 0.5)",
      ],
      result: "Overall conversion 9.0%; the largest absolute loss is at the first step (5,800 users).",
    },
    interpretation: [
      "Overall conversion is the product of the step conversions, so a relative improvement at any step improves the overall rate by the same relative amount. Prioritise by absolute users lost and by how fixable the step is.",
      "Analytics shows *where* people drop off, not *why*. Pair it with usability testing or session research.",
    ],
    commonErrors: [
      "Mixing units — sessions at one step, users at another.",
      "Counting users at later steps who skipped earlier ones (open funnels) without saying so.",
      "Comparing funnels with different time windows.",
      "Declaring a change effective from a before/after difference without testing for chance (see [[ab-testing]]).",
    ],
    limitations: [
      "Real journeys are rarely linear; users loop, return later and switch devices.",
      "Conversion ignores value: a higher rate of low-value orders may be worse.",
      "Tracking gaps (blocked scripts, consent choices) bias counts.",
    ],
    alternatives: [
      { name: "Open funnel", expression: "count each step independently", note: "Shows step popularity but not progression." },
      { name: "Time-to-convert distribution", expression: "survival curve of time between steps", note: "Reveals delayed conversion that fixed windows miss." },
    ],
    references: [{ source: "sauro-lewis-2016", role: "explanatory", note: "Confidence intervals and comparisons for completion proportions." }],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "retention-churn",
    topic: "retention-rate",
    calculator: "retention-churn",
    name: "Retention, churn and stickiness",
    summary:
      "Cohort retention and churn, customer retention rate over a period, and the DAU/MAU stickiness ratio — each with its own numerator, denominator and time window.",
    expression: "cohort retention = R / C;   churn = 1 − R / C;   CRR = (E − N) / S;   stickiness = DAU / MAU",
    contributor: "Product-analytics and customer-success convention",
    variables: [
      { symbol: "C", name: "Cohort size", unit: "users", description: "Users who started in a defined period (e.g., signed up in January)." },
      { symbol: "R", name: "Retained users", unit: "users", description: "Cohort members active in the measurement period (e.g., week 4)." },
      { symbol: "S", name: "Customers at start", unit: "customers", description: "Customers at the start of the period." },
      { symbol: "E", name: "Customers at end", unit: "customers", description: "Customers at the end of the period." },
      { symbol: "N", name: "New customers", unit: "customers", description: "Customers acquired during the period (excluded so growth does not mask loss)." },
      { symbol: "DAU / MAU", name: "Daily / monthly active users", unit: "users", description: "Average daily actives over the month, and distinct actives in that month." },
    ],
    resultUnit: "% (retention, churn, CRR, stickiness)",
    assumptions: [
      "‘Active’ is defined by a meaningful action, not merely opening the app.",
      "Cohorts and periods are fixed in advance.",
    ],
    conditions: [
      "Use cohort retention to see whether a product keeps the users it acquires; use CRR for subscription businesses; use stickiness for habitual products only.",
    ],
    steps: [
      "Define the activity, cohort and measurement period.",
      "Compute retention as retained / cohort size; churn is its complement.",
      "For CRR, subtract new customers from the end count, then divide by the start count.",
      "For stickiness, divide average DAU by MAU for the same month.",
    ],
    workedExample: {
      given: ["500 users signed up in January; 180 were active in week 4.", "A month starts with 1,000 customers and ends with 1,050, having gained 200.", "Average DAU 12,000; MAU 48,000."],
      steps: [
        "Week-4 retention = 180 / 500 = 36%; churn = 64%",
        "CRR = (1,050 − 200) / 1,000 = 85%",
        "Stickiness = 12,000 / 48,000 = 25%",
      ],
      result: "36% week-4 retention (64% churn); CRR 85%; DAU/MAU 25%.",
    },
    interpretation: [
      "Read retention as a curve across periods: a curve that flattens indicates a retained core; one that keeps declining toward zero indicates a product–usage problem.",
      "Stickiness suits products meant for daily use. A tax tool with low DAU/MAU may be perfectly healthy.",
    ],
    commonErrors: [
      "Mixing cohorts of different ages in one ‘retention’ figure.",
      "Including new customers in CRR, so growth hides churn.",
      "Defining ‘active’ as any app open, inflating retention.",
    ],
    limitations: [
      "Retention shows that users leave, not why; combine with exit surveys and research.",
      "Seasonality and marketing campaigns change cohort composition.",
      "Revenue retention (net/gross revenue retention) can diverge from customer retention.",
    ],
    alternatives: [
      { name: "Rolling (unbounded) retention", expression: "users active on or after day N / cohort size", note: "Higher than bounded retention; state which you use." },
      { name: "Net revenue retention", expression: "(start MRR + expansion − contraction − churned MRR) / start MRR", note: "Business value view of retention." },
    ],
    references: [{ source: "sauro-lewis-2016", role: "explanatory", note: "Confidence intervals for proportions such as retention rates." }],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "descriptive-stats",
    topic: "descriptive-statistics",
    calculator: "descriptive-stats",
    name: "Descriptive statistics",
    summary:
      "Measures of central tendency (mean, median, mode) and spread (range, variance, standard deviation) for summarising a sample.",
    expression: "x̄ = Σxᵢ / n;   s² = Σ(xᵢ − x̄)² / (n − 1);   s = √s²;   σ² = Σ(xᵢ − x̄)² / n",
    contributor: "Classical statistics",
    variables: [
      { symbol: "xᵢ", name: "Observation", unit: "as measured", description: "One value in the sample." },
      { symbol: "n", name: "Sample size", unit: "count", description: "Number of observations." },
      { symbol: "x̄", name: "Mean", unit: "as measured", description: "Arithmetic average." },
      { symbol: "s², s", name: "Sample variance, SD", unit: "units², units", description: "Spread estimate for the population the sample came from (divides by n − 1)." },
      { symbol: "σ², σ", name: "Population variance, SD", unit: "units², units", description: "Spread when the data *are* the whole population (divides by n)." },
    ],
    resultUnit: "same units as the data (variance in squared units)",
    assumptions: [
      "Observations are on an interval or ratio scale for the mean and SD to be meaningful.",
      "The sample variance assumes the data are a sample from a larger population.",
    ],
    conditions: [
      "Report the median and spread for skewed data; report the mean and SD when distributions are roughly symmetric.",
    ],
    steps: [
      "Count observations (n) and sort them.",
      "Mean: sum ÷ n. Median: middle value (average the two middle values when n is even). Mode: most frequent value(s).",
      "Range: maximum − minimum.",
      "Sample variance: sum of squared deviations from the mean ÷ (n − 1); SD is its square root.",
    ],
    workedExample: {
      given: ["Seven ratings on a 1–5 ease scale: 3, 5, 4, 4, 2, 5, 4."],
      steps: [
        "n = 7; sum = 27; mean = 3.857",
        "Sorted: 2, 3, 4, 4, 4, 5, 5 → median = 4; mode = 4; range = 3",
        "Σ(x − x̄)² = 6.857 → s² = 6.857 / 6 = 1.143; s = 1.069",
        "Population: σ² = 6.857 / 7 = 0.980; σ = 0.990",
      ],
      result: "Mean 3.86, median 4, mode 4, range 3, sample SD 1.07 (population SD 0.99).",
    },
    interpretation: [
      "The mean summarises the centre and the SD the typical distance from it. When mean and median differ noticeably, the data are skewed and the median is the better summary of a typical value.",
      "Descriptive statistics describe the sample. To say something about the population, add a confidence interval (see [[confidence-intervals]]).",
    ],
    commonErrors: [
      "Using the population formula (÷ n) for sample data, which underestimates spread.",
      "Reporting a mean of ordinal data without acknowledging the interval assumption.",
      "Summarising bimodal data with a single mean.",
    ],
    limitations: [
      "Summaries hide distribution shape — always look at a histogram or dot plot.",
      "Mean and SD are sensitive to outliers.",
    ],
    alternatives: [
      { name: "Interquartile range", expression: "Q₃ − Q₁", note: "Robust spread measure for skewed data." },
      { name: "Trimmed mean", expression: "mean after removing a fixed % from each tail", note: "Robust to outliers, decided before analysis." },
    ],
    references: [{ source: "sauro-lewis-2016", role: "explanatory", note: "Descriptive statistics for UX data." }],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "effect-size",
    topic: "effect-size",
    calculator: "effect-size",
    name: "Standardised effect size (Cohen's d and Hedges' g)",
    summary:
      "The difference between two group means expressed in units of their pooled standard deviation, with a small-sample correction.",
    expression: "d = (M₁ − M₂) / s_p;   s_p = √( ((n₁ − 1)s₁² + (n₂ − 1)s₂²) / (n₁ + n₂ − 2) );   g = d × (1 − 3 / (4(n₁ + n₂) − 9))",
    contributor: "Cohen (1988) for d; Hedges (1981) for the bias correction",
    source: "cohen-1988",
    variables: [
      { symbol: "M₁, M₂", name: "Group means", unit: "as measured", description: "Means of the two independent groups." },
      { symbol: "s₁, s₂", name: "Group SDs", unit: "as measured", description: "Sample standard deviations (n − 1)." },
      { symbol: "n₁, n₂", name: "Group sizes", unit: "count", description: "Number of observations per group." },
      { symbol: "s_p", name: "Pooled SD", unit: "as measured", description: "Weighted combination of the two SDs." },
      { symbol: "d, g", name: "Effect size", unit: "SD units", description: "Standardised mean difference; g corrects d's upward bias in small samples." },
    ],
    resultUnit: "standard deviations (unitless)",
    assumptions: [
      "Two independent groups, roughly normal data, similar variances.",
      "The same measure is used in both groups.",
    ],
    conditions: [
      "Use to express how large a difference is, alongside — not instead of — a confidence interval and a significance test.",
    ],
    steps: [
      "Compute each group's mean and SD.",
      "Compute the pooled SD.",
      "Divide the difference in means by the pooled SD to get d.",
      "Multiply by the correction factor to get Hedges' g (important when total n is small).",
    ],
    workedExample: {
      given: ["Design A: mean SUS 72.5, SD 12, n = 20. Design B: mean 64.0, SD 14, n = 22."],
      steps: [
        "s_p = √((19 × 144 + 21 × 196) / 40) = √(6852 / 40) = 13.09",
        "d = (72.5 − 64.0) / 13.09 = 0.649",
        "g = 0.649 × (1 − 3 / (4 × 42 − 9)) = 0.649 × 0.981 = 0.637",
      ],
      result: "d ≈ 0.65; Hedges' g ≈ 0.64 — about two-thirds of a standard deviation.",
    },
    interpretation: [
      "Cohen labelled d ≈ 0.2, 0.5 and 0.8 as small, medium and large, but presented these as a last resort when no field-specific basis exists. Judge practical importance in the measure's own units too — here 8.5 SUS points.",
      "An effect size without a confidence interval says nothing about how precisely it was estimated.",
    ],
    commonErrors: [
      "Using Cohen's labels as fixed thresholds of importance.",
      "Computing d for paired data with the independent-groups formula.",
      "Reporting d without the raw difference and units.",
    ],
    limitations: [
      "Depends on the variability of the sample: the same raw difference gives a larger d in a homogeneous sample.",
      "Assumes similar variances; consider Glass's Δ (dividing by the control group's SD) when they differ greatly.",
    ],
    alternatives: [
      { name: "Glass's Δ", expression: "(M₁ − M₂) / s_control", note: "Uses only the control group's SD." },
      { name: "Risk difference", expression: "p₁ − p₂", note: "For binary outcomes such as task success." },
    ],
    references: [
      { source: "cohen-1988", role: "primary", note: "Definition of d and conventional benchmarks." },
      { source: "hedges-1981", role: "primary", note: "Small-sample bias correction." },
      { source: "sauro-lewis-2016", role: "explanatory", note: "Effect sizes in UX comparisons." },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "correlation-regression",
    topic: "correlation",
    calculator: "correlation-regression",
    name: "Pearson correlation and simple linear regression",
    summary:
      "The strength of a linear association between two variables, the best-fitting straight line, and a test of whether the correlation differs from zero.",
    expression: "r = Σ(x − x̄)(y − ȳ) / ((n − 1) sₓ s_y);   b = r · s_y / sₓ;   a = ȳ − b·x̄;   t = r√(n − 2) / √(1 − r²)",
    contributor: "Pearson (1895), building on Galton's work on regression",
    source: "pearson-1895",
    variables: [
      { symbol: "x, y", name: "Paired observations", unit: "as measured", description: "Two measurements per unit (e.g., per participant)." },
      { symbol: "sₓ, s_y", name: "Sample SDs", unit: "as measured", description: "Standard deviations of x and y (n − 1)." },
      { symbol: "r", name: "Correlation coefficient", unit: "−1 to 1", description: "Direction and strength of the linear association." },
      { symbol: "r²", name: "Coefficient of determination", unit: "0 to 1", description: "Share of variance in y linearly associated with x." },
      { symbol: "a, b", name: "Intercept, slope", unit: "y units; y per x unit", description: "Least-squares line ŷ = a + b·x." },
      { symbol: "t", name: "Test statistic", unit: "—", description: "Tests r = 0 with n − 2 degrees of freedom; gives a two-sided p-value." },
    ],
    resultUnit: "r and r² (unitless), slope in y per x, p-value",
    assumptions: [
      "The relationship is approximately linear.",
      "Pairs are independent; for the p-value, residuals are roughly normal with constant variance.",
      "No extreme outliers dominate the fit.",
    ],
    conditions: [
      "Plot the data first. Use Spearman's rank correlation for monotonic but non-linear or ordinal data.",
    ],
    steps: [
      "Compute the means and SDs of x and y.",
      "Compute the covariance and divide by sₓ·s_y to get r.",
      "Slope b = r·s_y/sₓ; intercept a = ȳ − b·x̄.",
      "t = r√(n − 2)/√(1 − r²); find the two-sided p-value from Student's t with n − 2 df.",
    ],
    workedExample: {
      given: ["Illustrative data — form fields (x) vs. completion time in s (y): (2, 31), (3, 38), (4, 40), (5, 52), (6, 55), (8, 70)."],
      steps: [
        "x̄ = 4.667, ȳ = 47.667, sₓ = 2.160, s_y = 14.152",
        "r = 0.990; r² = 0.980",
        "b = 0.990 × 14.152 / 2.160 = 6.49 s per field; a = 47.667 − 6.49 × 4.667 = 17.4 s",
        "t = 0.990 × √4 / √(1 − 0.980) = 14.07; df = 4; p ≈ 0.00015",
      ],
      result: "r = 0.99, r² = 0.98; ŷ = 17.4 + 6.49x; p < 0.001. Six points make this fit far less certain than the r suggests.",
    },
    interpretation: [
      "**Correlation is not causation.** A strong r shows that two measures move together in this sample; it does not show that changing one would change the other. Confounders, reverse causation and selection effects are common in product data.",
      "With few points, r is unstable — one unusual participant can change it dramatically. Report n and inspect the scatterplot.",
    ],
    commonErrors: [
      "Inferring causation from observational correlation.",
      "Extrapolating the regression line beyond the observed range of x.",
      "Ignoring restricted range, which shrinks r.",
      "Reading r = 0 as ‘no relationship’ when the relationship is non-linear.",
    ],
    limitations: [
      "Captures only linear association.",
      "Sensitive to outliers and to aggregation (correlations of averages are usually inflated).",
    ],
    alternatives: [
      { name: "Spearman's ρ", expression: "Pearson r computed on ranks", note: "For ordinal data or monotonic non-linear relationships." },
      { name: "Multiple regression", expression: "ŷ = a + b₁x₁ + b₂x₂ + …", note: "Adjusts for several predictors — still not causal without design." },
    ],
    references: [
      { source: "pearson-1895", role: "primary", note: "Product-moment correlation." },
      { source: "sauro-lewis-2016", role: "explanatory", note: "Correlation and regression in UX research." },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: "grid-columns",
    topic: "grid-calculations",
    calculator: "grid-columns",
    name: "Column grid calculation",
    summary:
      "The width of one column in a fixed-gutter layout grid, and the width of an element spanning several columns.",
    expression: "column = (container − 2 × margin − (columns − 1) × gutter) / columns;   span(k) = k × column + (k − 1) × gutter",
    contributor: "Modular grid practice (e.g., Müller-Brockmann, 1981), adapted to screen layout",
    variables: [
      { symbol: "container", name: "Container width", unit: "px", description: "Total layout width, including outer margins." },
      { symbol: "margin", name: "Outer margin", unit: "px", description: "Space on each side between the container edge and the first/last column." },
      { symbol: "gutter", name: "Gutter", unit: "px", description: "Space between adjacent columns." },
      { symbol: "columns", name: "Column count", unit: "count", description: "Number of columns (commonly 4 on mobile, 8 on tablet, 12 on desktop)." },
      { symbol: "k", name: "Span", unit: "columns", description: "Number of columns an element occupies." },
    ],
    resultUnit: "px",
    assumptions: [
      "Gutters and margins are fixed; columns flex to fill the remaining space.",
      "Elements span whole columns and absorb the gutters between them.",
    ],
    conditions: [
      "Use for designing and documenting responsive layout grids; recompute per breakpoint.",
    ],
    steps: [
      "Subtract both outer margins from the container width.",
      "Subtract the total gutter width: (columns − 1) × gutter.",
      "Divide the remainder by the number of columns.",
      "For a k-column element, add k columns and the k − 1 gutters between them.",
    ],
    workedExample: {
      given: ["Container 1,200 px, margins 24 px, gutters 24 px, 12 columns; an element spanning 4 columns."],
      steps: [
        "Available = 1,200 − 2 × 24 − 11 × 24 = 1,200 − 48 − 264 = 888 px",
        "Column = 888 / 12 = 74 px",
        "Span(4) = 4 × 74 + 3 × 24 = 296 + 72 = 368 px",
      ],
      result: "Each column is 74 px; a 4-column element is 368 px wide.",
    },
    interpretation: [
      "Integer column widths keep edges crisp and make specifications easy to communicate. If the result is fractional, adjust the margin or container rather than rounding columns individually.",
    ],
    commonErrors: [
      "Counting gutters as columns × gutter instead of (columns − 1) × gutter.",
      "Forgetting that a span includes the internal gutters.",
      "Applying a desktop column count at mobile widths, producing unusably narrow columns.",
    ],
    limitations: [
      "Content-first and intrinsic layouts (e.g., CSS Grid auto-fit) may not need a fixed column count.",
      "A grid is a tool for consistency, not a rule; deliberate breaks can create emphasis.",
    ],
    alternatives: [
      { name: "Fluid percentages", expression: "column % = column / (container − 2 × margin) × 100", note: "Expresses the same grid relative to the content area." },
      { name: "CSS Grid fr units", expression: "grid-template-columns: repeat(12, 1fr); gap: gutter", note: "The browser performs the same arithmetic." },
    ],
    references: [
      { source: "muller-brockmann-1981", role: "primary", note: "Modular grid systems." },
      { source: "material-3", role: "explanatory", note: "Responsive layout grids: columns, gutters and margins per window size." },
    ],
  },
];
