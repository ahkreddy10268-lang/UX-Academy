# Domain 2 · Batch 1 — research review

**Concepts:** Loss Aversion · Framing Effect  
**Date:** 2026-11-23  
**Owner approval:** Standing authorization under D-133; proceed with routine research, implementation, review and development-branch pushes.  
**Status:** Research synthesis complete. Source-record creation and the repository's machine-verification gate remain pending. No entries have been drafted, indexed or published.

This record is a research handoff, not a published source registry or a content entry. It distinguishes what was read from what was checked bibliographically. DOI and URL records must still be run through `npm run sources:verify -- <ids>` before drafting, in line with `.claude/skills/ux-academy-workflow/SKILL.md` § 2a.

## 1. Loss Aversion — evidence synthesis

### Working definition

Loss aversion is the asymmetry in subjective value around a reference point: for otherwise comparable changes of equal magnitude, a loss is often assigned a larger negative value than the positive value assigned to a gain. Prospect theory models outcomes as gains and losses relative to a reference point rather than only as final asset levels. Kahneman and Tversky's 1979 paper describes a value function that is normally concave for gains, commonly convex for losses, and steeper for losses than for gains; its discussion explicitly cautions that special circumstances can alter an individual's value function.

### Essential distinctions for the entry

- **Loss aversion is not risk aversion.** Risk aversion concerns preferring a sure outcome to a gamble of equal expected value. Loss aversion concerns the relative subjective impact of gains and losses around a reference point. Prospect theory can predict risk aversion for gains and risk seeking for losses through the shape of the value function, but that reflection pattern is not itself the definition of loss aversion.
- **Loss aversion is not diminishing sensitivity.** Curvature within gains or losses means sensitivity to a marginal change diminishes as magnitude grows. The steeper loss side is a separate asymmetry.
- **Loss aversion is not the endowment effect or status-quo bias.** These can co-occur and can be explained by overlapping reference-dependent mechanisms, but ownership, transaction procedures, status-quo framing, and inertia can also affect observed behaviour.
- **The “twice as much” slogan is not a universal constant.** The coefficient `lambda` is model- and task-dependent. It is not a direct universal psychological multiplier for every product, person, domain or type of loss.
- **Do not treat the 1979 paper as the source of the later numerical coefficient.** The value-function asymmetry appears in the original prospect-theory account; cumulative prospect theory (1992) formalises loss aversion in its later parameterisation.

### What the later evidence says

Brown, Imai, Vieider and Camerer (2024) synthesise 607 estimates from 150 articles across economics, psychology, neuroscience and related disciplines. Their abstract reports a mean loss-aversion coefficient of 1.955 and a 95% interval [1.820, 2.102]. This is a broad interdisciplinary synthesis, not a claim that every person or interface context has that coefficient.

Walasek, Mullett and Stewart (2024) focus more narrowly on estimates of the cumulative-prospect-theory `lambda` parameter fitted to individual risky-choice data. Their random-effects meta-analysis covers 19 datasets from 17 published studies and reports a pooled value of 1.31, 95% CI [1.10, 1.53], with very high heterogeneity (reported `I² = 91.60%`). The authors stress that few studies use suitable individual-level data and that much of the available data are not of sufficient quality for precise parameter estimates. These two meta-analytic estimates must not be averaged or presented as a direct contradiction: their inclusion criteria, operationalisations and measurement tasks differ.

Gal and Rucker (2018) challenge the broad generalisation that losses are, on balance, more impactful than gains. Their review is important counter-evidence and must be represented as a substantive debate, not dismissed as a fringe objection.

Ert and Erev (2013) show why risky-choice results depend on experimental context. Their six manipulations that increase choices consistent with loss aversion include framing the safe option as the status quo, high nominal payoffs, high stakes, contrast with attractive risky options, and long no-feedback choice lists with difficult expected-value calculations. This points to boundary conditions, not a simple universal rule.

### UX application boundaries

Use this concept to understand why a user may resist losing an existing benefit, feature, saved item, accumulated progress or current configuration. Do **not** infer loss aversion from a single cancellation, abandonment or conversion metric. A user may be responding to switching costs, uncertainty, poor alternatives, learned expectations, a genuine loss of utility, or an unfair process.

Good design responses include making consequences explicit, preserving user control, offering reversible changes, allowing export or transfer of user-created work, and testing comprehension. Do not use loss-framed warnings, artificial scarcity, threatened loss of progress, or obstructive cancellation flows to coerce action.

## 2. Framing Effect — evidence synthesis

### Working definition

A framing effect occurs when a change in how a decision problem is represented changes judgement, preference or choice, even though the relevant options and outcomes are normatively equivalent. Tversky and Kahneman (1981) define a decision frame as the decision-maker's conception of the acts, outcomes and contingencies involved in a choice; the frame is shaped by the wording of the problem as well as by norms, habits and personal characteristics.

### Classic demonstration — preserve the design details

In the “Asian disease” problem, the gain-framed group chose between a sure 200 lives saved (72%) and a one-third chance of saving 600 / two-thirds chance of saving none (28%). A separate group received the loss frame: 400 certain deaths (22%) versus a one-third chance of no deaths / two-thirds chance of 600 deaths (78%). These descriptions encode the same outcomes and probabilities. The two frames were given to separate groups (N=152 and N=155); do not describe the result as a within-person reversal.

### Distinguish three kinds of framing

Levin, Schneider and Gaeth (1998) distinguish:
1. **Risky-choice framing:** equivalent risky options described in gain or loss terms; this is the Tversky–Kahneman paradigm.
2. **Attribute framing:** a single attribute described positively or negatively (for example, “90% lean” vs “10% fat”). The task is often an evaluation, not a choice between gambles.
3. **Goal framing:** the consequences of performing or not performing a behaviour are emphasised (for example, benefits of attending vs costs of missing a check-up). The persuasive effect is not the same construct as risky-choice framing.

The entry must not treat these as interchangeable, or assume every positive/negative wording difference is logically equivalent. Some “emphasis” or salience frames change what information is foregrounded and are not strict equivalency frames.

### Evidence and process accounts

Kühberger's 1998 meta-analysis of risky-choice framing combined 136 empirical papers, nearly 30,000 participants and 230 effect sizes. It found an overall small-to-moderate effect, with meaningful variation by research design. Among the moderators were whether the manipulation changed reference points or outcome salience, and whether the dependent measure was a choice or a rating/judgement.

Kühberger's 2023 systematic review emphasises the variety of research designs and theoretical accounts, and cautions against treating framing effects as merely evidence of irrationality: they may reflect adaptive cognitive processes as well as systematic departures from description invariance.

Composto, Duncan, Johnson and Weber (2025) meta-analyse query theory as one process account of framing. Across 27 papers, decision frames affected query order (d = 0.34, 95% CI [0.27, 0.41], n = 11,202); query order and content partially mediated effects on choice. Manipulating query order reduced the frame–choice effect in the included studies (d = 0.92 to d = 0.39). This is evidence for a process account in the tested domains, not proof that query theory explains every framing effect.

### UX application boundaries

Interface framing includes gain/loss wording, positive/negative attribute labels, progress and completion messages, risk disclosures, and the emphasis placed on consequences. A valid test of equivalent frames must preserve the same options, outcomes, probabilities, eligibility, costs and timing. Where the wording changes information or salience, record that as a different manipulation rather than claiming strict equivalence.

Evaluate both user outcomes and user understanding: comprehension, recall, calibrated confidence, decision quality, perceived fairness and downstream regret—not only clicks or conversion. Make material facts equally discoverable in both versions. Never hide a material loss in fine print or use the frame to disguise a worse option.

## 3. Sources reviewed and access record

The source IDs below are proposed names for the repository registry. They have **not** yet been added to `content/sources/cognitive-effects.ts`.

| Proposed source ID | Bibliographic record | Access / review in this session | Use |
|---|---|---|---|
| `kahneman-tversky-1979` | Kahneman & Tversky, “Prospect Theory: An Analysis of Decision under Risk”, *Econometrica* 47(2), 263–292. DOI `10.2307/1914185`. | MIT-hosted full-text PDF; abstract and relevant value-function / loss-aversion discussion reviewed. Crossref REST record returned matching title, year 1979 and container *Econometrica*; similarity 1.00. This is the one DOI independently machine-matched in the research session. | Foundational primary source for reference dependence and the steeper loss-side value function. |
| `tversky-kahneman-1991` | Tversky & Kahneman, “Loss Aversion in Riskless Choice: A Reference-Dependent Model”, *Quarterly Journal of Economics* 106(4), 1039–1061. DOI `10.2307/2937956`. | Oxford Academic publisher record and abstract read; full text not read. | Reference dependence and loss aversion in riskless choice. |
| `tversky-kahneman-1992` | Tversky & Kahneman, “Advances in Prospect Theory: Cumulative Representation of Uncertainty”, *Journal of Risk and Uncertainty* 5, 297–323. DOI `10.1007/BF00122574`. | Springer publisher record and abstract read; full text not read. | Cumulative prospect theory and later formalisation of the `lambda` parameter. |
| `brown-et-al-2024` | Brown, Imai, Vieider & Camerer, “Meta-analysis of Empirical Estimates of Loss Aversion”, *Journal of Economic Literature* 62(2), 485–516. DOI `10.1257/jel.20221698`. | American Economic Association publisher page and abstract read; full text not read. | Broad meta-analysis and 607-estimate result. |
| `walasek-mullett-stewart-2024` | Walasek, Mullett & Stewart, “A meta-analysis of loss aversion in risky contexts”, *Journal of Economic Psychology* 103, 102740. DOI `10.1016/j.joep.2024.102740`. | Publisher abstract and University of Warwick repository metadata read; open-access status recorded by the repository; full article not reviewed here. | Narrower individual-risky-choice meta-analysis and heterogeneity. |
| `gal-rucker-2018` | Gal & Rucker, “The Loss of Loss Aversion: Will It Loom Larger Than Its Gain?”, *Journal of Consumer Psychology* 28(3), 497–516. DOI `10.1002/jcpy.1047`. | Publisher abstract / bibliographic record read; full article not reviewed. | Important critique of the broad “losses loom larger” generalisation. |
| `ert-erev-2013` | Ert & Erev, “On the descriptive value of loss aversion in decisions under risk: Six clarifications”, *Judgment and Decision Making* 8(3), 214–235. DOI `10.1017/S1930297500005945`. | Cambridge Core open-access publisher page and abstract reviewed; six experimental conditions recorded; not a full-text line-by-line review. | Boundary conditions and experimental context. |
| `tversky-kahneman-1981` | Tversky & Kahneman, “The Framing of Decisions and the Psychology of Choice”, *Science* 211(4481), 453–458. DOI `10.1126/science.7455683`. | Stanford-hosted full-text PDF text reviewed for definition, Asian disease problem and prospect-theory framing sections; screenshot service returned a cache miss. PubMed and Science metadata also checked. | Foundational primary framing source. |
| `kuhberger-1998-framing` | Kühberger, “The Influence of Framing on Risky Decisions: A Meta-analysis”, *Organizational Behavior and Human Decision Processes* 75(1), 23–55. DOI `10.1006/obhd.1998.2781`. | PubMed and publisher abstracts / metadata read; full article not read. | Meta-analysis: 136 papers, nearly 30,000 participants, 230 effect sizes. |
| `levin-schneider-gaeth-1998` | Levin, Schneider & Gaeth, “All Frames Are Not Created Equal: A Typology and Critical Analysis of Framing Effects”, *Organizational Behavior and Human Decision Processes* 76(2), 149–188. DOI `10.1006/obhd.1998.2804`. | PubMed and University of South Florida repository abstract / metadata read; full article not read. | Three-type framing taxonomy. |
| `kuhberger-2023-framing-review` | Kühberger, “A systematic review of risky-choice framing effects”, *EXCLI Journal* 22, 1012–1031. DOI `10.17179/excli2023-6169`. | PubMed abstract and journal record / open-access metadata read; full text not yet reviewed. | Current review of study designs, robustness and theoretical accounts. |
| `composito-et-al-2025-query-theory` | Composto, Duncan, Johnson & Weber, “A meta-analysis of query theory, a psychological process account of framing effects”, *Journal of Risk and Uncertainty* 71, 53–71. DOI `10.1007/s11166-025-09458-6`. | Springer open-access publisher page, abstract, author metadata and relevant findings reviewed; not a full-text line-by-line review. | Recent process-level synthesis (27 papers). |

## 4. Repository gate still outstanding

The content-writing gate in the repository workflow requires the following before the first entry is drafted:

1. Add the final selected records to `content/sources/cognitive-effects.ts` with access and verification notes that match what was actually read.
2. Run `npm run sources:verify -- <source-ids>` so the registry and `content/sources/verification.json` contain the Crossref / URL results. Do not manually label untested records `doi-verified`.
3. If a foundational source cannot be machine-verified, retain an honest bibliographic note only where the content standard allows it; replace the topic if it fails the D-129 source floor.
4. Draft the two entries only after the source gate is complete.

**Execution limitation in this session:** the connected GitHub capability can read and write repository files, but this session has no working local checkout or command runner connected to the repo. A direct `git clone` attempt failed because the shell could not resolve `github.com`. Therefore the repository's `sources:verify`, `npm run check`, build and browser suites have not been run. This is recorded as NOT RUN, not PASS. Do not treat this research record as a completed content batch.

## 5. Drafting brief once machine verification passes

### Loss Aversion

- 2–4 learning objectives: define loss aversion relative to a reference point; distinguish it from risk aversion, reflection effect, diminishing sensitivity, endowment effect and status-quo bias; interpret estimates without treating `lambda` as a universal constant; evaluate ethical interface applications.
- Evidence class proposal: `contested` (substantive disagreement and context-dependent estimates must be taught, not concealed).
- Core evidence set: Kahneman & Tversky (1979, 1991, 1992); Brown et al. (2024); Walasek et al. (2024); Gal & Rucker (2018); Ert & Erev (2013).
- Plate idea: a reference-point value curve with separate gain/loss sides, same absolute change highlighted on both sides, and clear note that slope is illustrative rather than a universal numeric ratio.

### Framing Effect

- 2–4 learning objectives: define a decision frame and description invariance; reconstruct an equivalent gain/loss risky-choice frame; distinguish risky-choice, attribute and goal framing; evaluate a fair, controlled framing test and its ethical limits.
- Evidence class proposal: `peer-reviewed`, subject to the repository's source target after machine verification.
- Core evidence set: Tversky & Kahneman (1981); Kahneman & Tversky (1979); Kühberger (1998, 2023); Levin et al. (1998); Composto et al. (2025).
- Plate idea: the same 600-person outcome space rendered as gain and loss descriptions, with a separate panel showing the three framing families. Do not depict percentages as universal effects.

