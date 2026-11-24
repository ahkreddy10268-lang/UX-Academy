# Domain 2 · Batch 2 — Anchoring Effect research review

**Topic:** Anchoring Effect  
**Date:** 2026-11-23  
**Owner approval:** Standing authorization under D-133; research, implementation, review and development-branch pushes are approved without per-topic prompts.  
**Status:** Research synthesis and first lesson draft complete. Source records are registered, but the repository's Crossref/URL verifier and full QA workflow remain pending. Entry status is `drafted`.

## 1. Concept and definition

Numeric anchoring is the tendency for a judgment or valuation to be influenced by a starting number encountered before the target judgment. A common experiment first asks whether the target is above or below a given value, then asks for an absolute estimate. The anchor may be arbitrary or only weakly relevant, but can still pull the later estimate.

Tversky and Kahneman's 1974 wheel-of-fortune experiment used 10 and 65 as starting values before asking participants to estimate the percentage of African countries in the United Nations. Median estimates were 25 after the low anchor and 45 after the high anchor. These are group medians, not individual before-and-after changes.

## 2. Mechanisms are not interchangeable

- **Insufficient adjustment:** Most directly applies when people generate a starting estimate themselves. Adjustments may stop when the answer first seems plausible; Epley and Gilovich (2006) examined why this happens.
- **Selective accessibility:** With an externally supplied anchor and a comparative question, hypothesis-consistent testing can make anchor-consistent information more accessible for the subsequent estimate. Mussweiler and Strack (1999) reported four supporting studies.
- **Scale distortion:** Frederick and Mochon (2012) proposed that a numeric standard can change how a response scale is used, rather than only changing perception of the target. Their account predicts limited transfer to conceptually related judgments on a different scale.
- **Bounded-resource account:** Lieder and colleagues (2018) model some anchoring patterns as rational use of limited time and cognitive resources. This is an alternative theoretical account, not a claim that every anchor-based judgment is optimal.

The entry presents these mechanisms as distinct and potentially complementary. An observed anchor effect alone does not identify which mechanism operated.

## 3. Newest broad evidence: 2026 meta-analysis

Schley and Weingarten's *Fifty Years of Anchoring Effects: A Theoretical Reintegration and Meta-Analysis* was published online in *Management Science* on 19 May 2026 (DOI `10.1287/mnsc.2023.03238`). The publisher abstract reports:

- 2,601 total effect sizes, including 1,280 high-versus-low anchor comparisons.
- Mean Hedges' g = 0.825, 95% CI [0.765, 0.884].
- Very high heterogeneity, I² = 93.73%.
- Smaller or null effects under some conditions, including incidental numeric priming, anchors from different dimensions, random-number conditions, incentives and debiasing interventions.

This is a large recent synthesis, but the high heterogeneity means the pooled average is not a product-specific prediction. In this session, the publisher abstract and article record were reviewed; the full article was not read.

## 4. Valuation-specific evidence and boundaries

Li, Maniadis and Sedikides (2021) meta-analysed 53 studies on willingness-to-pay and willingness-to-accept. Their abstract reports a moderate overall effect smaller than early estimates. It reports stronger effects with higher anchor relevance/compatibility, buying tasks and non-laboratory experiments; weaker effects for selling tasks and incompatible anchors. The authors caution about limitations in the meta-analytic method and describe the estimate as an upper bound. The publisher abstract and repository record were reviewed; the accepted manuscript PDF was located but not read line by line.

Yoon, Fong and Dimoka (2019; Cambridge record posted online in 2023) examined robustness of anchoring on willingness-to-pay through multiple procedures and samples. Their paper reports a positive association between anchor numbers and WTP and differences in effect size across studies. Its cross-study analysis of 30 items from five studies reports average transformed r = .27. The open Cambridge article was reviewed in the abstract, experiments, cross-study analysis and conclusion sections.

These sources show why the entry separates general numeric estimation from consumer valuation. Evidence from factual estimates cannot be used as a universal conversion, pricing or willingness-to-pay multiplier.

## 5. UX interpretation

A number can be a useful anchor when it is accurate, relevant and transparent: a real market range, a documented historical benchmark, a clearly sourced forecast or a comparable prior price. It is misleading when it is fabricated, stale, incompatible, or presented without its basis.

Good practice:
- collect an independent estimate before exposing a benchmark when calibration matters;
- show the provenance, comparison period and scope of reference prices;
- provide a custom/blank value path beside suggested amounts;
- test high, low and no-anchor variants while holding other information constant;
- measure comprehension, calibration, confidence and decision quality—not only WTP or conversion;
- do not diagnose anchoring from one click or estimate.

## 6. Source review and access record

| Source ID | Bibliographic record / DOI | Access reviewed in this session | Role |
|---|---|---|---|
| `tversky-kahneman-1974` | Tversky & Kahneman, “Judgment under Uncertainty: Heuristics and Biases”, *Science* 185(4157), 1124–1131. DOI `10.1126/science.185.4157.1124`. | Science publisher page and PubMed abstract; full article not read. | Foundational numeric-anchor heuristic and wheel task. |
| `epley-gilovich-2006` | Epley & Gilovich, “The Anchoring-and-Adjustment Heuristic: Why the Adjustments Are Insufficient”, *Psychological Science* 17(4), 311–318. DOI `10.1111/j.1467-9280.2006.01704.x`. | PubMed abstract and publisher record; full article not read. | Self-generated anchors and stopping rule. |
| `mussweiler-strack-1999` | Mussweiler & Strack, “Hypothesis-Consistent Testing and Semantic Priming in the Anchoring Paradigm: A Selective Accessibility Model”, *Journal of Experimental Social Psychology* 35(2), 136–164. DOI `10.1006/jesp.1998.1364`. | Publisher abstract; four-study summary reviewed. | Selective accessibility. |
| `frederick-mochon-2012` | Frederick & Mochon, “A Scale Distortion Theory of Anchoring”, *Journal of Experimental Psychology: General* 141(1), 124–133. DOI `10.1037/a0024006`. | PubMed abstract and open manuscript record; full article not read line by line. | Scale-distortion account. |
| `furnham-boo-2011` | Furnham & Boo, “A Literature Review of the Anchoring Effect”, *Journal of Socio-Economics* 40(1), 35–42. DOI `10.1016/j.socec.2010.10.008`. | Publisher abstract and open manuscript metadata; full review not read line by line. | Broad background review. |
| `li-maniadis-sedikides-2021` | Li, Maniadis & Sedikides, “Anchoring in Economics: A Meta-Analysis of Studies on Willingness-To-Pay and Willingness-To-Accept”, *Journal of Behavioral and Experimental Economics* 90, 101629. DOI `10.1016/j.socec.2020.101629`. | Publisher abstract and Southampton repository record; accepted manuscript found but not read line by line. | Valuation-specific meta-analysis of 53 studies. |
| `yoon-fong-dimoka-2019` | Yoon, Fong & Dimoka, “The Robustness of Anchoring Effects on Preferential Judgments”, *Judgment and Decision Making* 14(4), 470–487. DOI `10.1017/S1930297500006148`. | Open Cambridge article reviewed in abstract, study results, cross-study analysis and conclusion. | WTP robustness and cross-study findings. |
| `schley-weingarten-2026` | Schley & Weingarten, “Fifty Years of Anchoring Effects: A Theoretical Reintegration and Meta-Analysis”, *Management Science*, Articles in Advance. DOI `10.1287/mnsc.2023.03238`. | INFORMS publisher abstract and article record; online publication 19 May 2026; full article not read. | Current broad meta-analysis. |
| `lieder-et-al-2018` | Lieder, Griffiths, Huys & Goodman, “The Anchoring Bias Reflects Rational Use of Cognitive Resources”, *Psychonomic Bulletin & Review* 25, 322–349. DOI `10.3758/s13423-017-1286-8`. | Springer publisher abstract and bibliographic record; full text not read. | Alternative bounded-resource theoretical account. |

All nine records are registered in `content/sources/cognitive-effects.ts` with `verification: "bibliographic"`. No DOI is being marked `doi-verified` manually. The repository's `npm run sources:verify -- <ids>` must populate `verification.json` before the source gate passes.

## 7. Implementation / QA status

- Draft entry: `content/knowledge/laws-effects/anchoring-effect.ts`.
- Original plate: `components/illustrations/concepts/decision-sheets.tsx`.
- Plate metadata: `components/illustrations/visual-register.ts`.
- Knowledge index includes the new slug.
- Taxonomy already contains `anchoring-effect` under Domain 2 → Decision-making biases; taxonomy is unchanged.
- Entry is `status: "drafted"`, not published.
- Source verification, `entry-integrity`, `npm run check`, taxonomy validation, docs generation, plate render/tests, browser entry review and production build remain pending a working Vercel team-authorised command session. Do not mark these PASS until executed.
