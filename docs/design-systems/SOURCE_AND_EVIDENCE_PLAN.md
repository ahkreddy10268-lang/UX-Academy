# Source and evidence plan

> Phase 1, 2026-11-10. Maps sources to topics, separates kinds of evidence, and lists what must be added to the registry before each entry is written. **No source records were added in this phase.** Every new record must be verified (`npm run sources:verify`) before an entry cites it.

## 1. Evidence hierarchy for this domain

1. **Normative standards and specifications:** WCAG 2.2 (W3C Recommendation), Semantic Versioning 2.0.0.
2. **Community specifications:** DTCG 2025.10 (Final Community Group Report — *not* a W3C Standard, *not* on the Standards Track).
3. **Informative W3C guidance:** WAI-ARIA Authoring Practices Guide (states it is not normative).
4. **Official design-system documentation:** UX4G, GOV.UK, Carbon, Atlassian, Spectrum, Fluent 2, USWDS, Material 3, Apple HIG.
5. **Primary research:** HCI studies on response time, progress indication and perception (where they exist).
6. **Practitioner books:** Frost (Atomic Design), Kholmatova (Design Systems), Curtis (Modular Web Design), Bringhurst (typography).

Rules: a vendor practice is evidence of that vendor's practice; a practitioner opinion is not empirical evidence; illustrative examples are labelled; no claim cites a page that does not state it.

## 2. Existing registry records to reuse (do not duplicate)

| ID | What it is | File |
|---|---|---|
| `w3c-wcag-22` | WCAG 2.2 | core.ts |
| `w3c-understanding-wcag-22` | Understanding WCAG 2.2 | core.ts |
| `w3c-wcag-overview` | WCAG 2 Overview | accessibility-visual.ts |
| `w3c-aria-apg` | ARIA Authoring Practices Guide | resources.ts |
| `dtcg-format-2025` | DTCG Format Module 2025.10 | accessibility-visual.ts |
| `dtcg-2026-thank-you-jina` | DTCG attribution post | accessibility-visual.ts |
| `semver-2` | Semantic Versioning 2.0.0 | design-systems.ts |
| `govuk-design-system` | GOV.UK Design System | resources.ts |
| `carbon-design-system` | Carbon | resources.ts |
| `atlassian-design` | Atlassian Design System | resources.ts |
| `adobe-spectrum` | Spectrum introduction | design-systems.ts |
| `fluent-2` | Fluent 2 | resources.ts |
| `uswds` | USWDS | design-systems.ts |
| `material-3` | Material Design 3 | resources.ts |
| `apple-hig` | Apple HIG | resources.ts |
| `figma-learn` | Figma Learn | resources.ts |
| `frost-2016` | Atomic Design | comparisons-workshops.ts |
| `kholmatova-2017` | Design Systems | design-systems.ts |
| `curtis-2009` | Modular Web Design | design-systems.ts |
| `bringhurst-2012` | The Elements of Typographic Style (v4.0) | accessibility-visual.ts |
| `myers-1985` | The importance of percent-done progress indicators… | interaction-models.ts |
| `nielsen-1993-response-times` | Response Times: The 3 Important Limits | interaction-models.ts |
| `doherty-thadani-1982` | The economic value of rapid response time | interaction-models.ts |

**Check before reuse:** `dtcg-format-2025` lists five authors; the 2025.10 index page names six editors (adding Mike Kamminga). Confirm against the Format module's own editor list and correct if needed.

## 3. Proposed new records (to verify and add when the citing entry is written)

Page-level records are proposed only where an entry will cite a specific page's guidance; otherwise cite the root record with a precise note.

| Proposed ID | Title (as on page) | URL | Type | Used by |
|---|---|---|---|---|
| `ux4g-design-system` | UX4G Design System 3.0 | https://www.ux4g.gov.in/designsystem/documentation | official-documentation | design-system, audits, governance |
| `ux4g-tokens` | All Design Tokens | https://www.ux4g.gov.in/foundations/tokens | official-documentation | primitive-tokens, semantic-tokens |
| `ux4g-spacing` | Spacing | https://www.ux4g.gov.in/foundations/spacing | official-documentation | spacing-scales |
| `ux4g-governance` | Governance | https://www.ux4g.gov.in/community/governance | official-documentation | design-governance, versioning |
| `dtcg-tr-2025` | Design Tokens Technical Reports 2025.10 | https://www.designtokens.org/TR/2025.10/ | technical-report | design-tokens (status wording) |
| `dtcg-color-2025` | Design Tokens Color Module 2025.10 | https://www.designtokens.org/TR/2025.10/color/ | technical-report | colour-systems, primitive-tokens |
| `dtcg-resolver-2025` | Design Tokens Resolver Module 2025.10 | https://www.designtokens.org/TR/2025.10/resolver/ | technical-report | theme-architecture, multi-brand-systems |
| `govuk-contribution-criteria` | Contribution criteria | https://design-system.service.gov.uk/community/contribution-criteria/ | official-documentation | design-governance, component-libraries |
| `govuk-validation-pattern` | Recover from validation errors | https://design-system.service.gov.uk/patterns/validation/ | official-documentation | error-states |
| `govuk-error-message` | Error message | https://design-system.service.gov.uk/components/error-message/ | official-documentation | error-states |
| `govuk-spacing` / `govuk-type-scale` | Spacing; Type scale | https://design-system.service.gov.uk/styles/spacing/ ; /styles/type-scale/ | official-documentation | spacing-scales, typography-scales |
| `carbon-themes` | Themes | https://carbondesignsystem.com/elements/themes/overview/ | official-documentation | semantic-tokens, theme-architecture |
| `carbon-empty-states` | Empty states | https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states | official-documentation | empty-states |
| `carbon-data-table` | Data table usage / accessibility | https://carbondesignsystem.com/components/data-table/usage/ | official-documentation | data-tables, design-qa |
| `carbon-contributing` | Contributing | https://www.carbondesignsystem.com/getting-started/contributing/overview | official-documentation | design-governance |
| `carbon-migration-v11` | Migration guide | https://www.carbondesignsystem.com/getting-started/migrating/guide | official-documentation | design-system-versioning |
| `atlassian-spacing` / `atlassian-typography` / `atlassian-color` | Spacing; Typography; Color | https://atlassian.design/foundations/spacing ; /typography ; /color | official-documentation | scales, semantic-tokens |
| `spectrum-attention-hierarchy` | Attention hierarchy | https://spectrum.adobe.com/foundations/attention-hierarchy | official-documentation | design-language, variants |
| `fluent-2-tokens` / `fluent-2-elevation` / `fluent-2-typography` | Design tokens; Elevation; Typography | https://fluent2.microsoft.design/design-tokens ; /elevation ; /typography | official-documentation | tokens, elevation, typography |
| `uswds-maturity-model` | Maturity model | https://designsystem.digital.gov/maturity-model/ | official-documentation | design-system-audits |
| `uswds-color` / `uswds-spacing` / `uswds-table` | Using color; Spacing units; Table | https://designsystem.digital.gov/design-tokens/color/overview/ ; /design-tokens/spacing-units/ ; /components/table/ | official-documentation | colour-systems, spacing-scales, data-tables |
| `m3-design-tokens` / `m3-color-roles` / `m3-elevation` / `m3-states` | Design tokens; Color roles; Elevation; States | https://m3.material.io/foundations/design-tokens/overview ; /styles/color/roles ; /styles/elevation/overview ; /foundations/interaction/states/overview | official-documentation | tokens, colour, elevation, states |
| `apple-hig-loading` / `apple-hig-progress` / `apple-hig-layout` / `apple-hig-sf-symbols` / `apple-hig-typography` / `apple-hig-color` | Loading; Progress indicators; Layout; SF Symbols; Typography; Color | https://developer.apple.com/design/human-interface-guidelines/<page> | official-documentation | loading, skeleton, responsive, icons, type, colour |
| `w3c-apg-read-me-first` / `w3c-apg-table` / `w3c-apg-grid` | Read Me First; Table pattern; Grid pattern | https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/ ; /patterns/table/ ; /patterns/grid/ | informative W3C guidance | component-architecture, data-tables |

## 4. Topic → source map (minimum per entry)

| Topic | Primary / standard | Official documentation | Research / books |
|---|---|---|---|
| atomic-design | `frost-2016` (primary) | — | `kholmatova-2017` (scope) |
| design-language | — | Spectrum attention hierarchy, USWDS principles, Fluent, Apple | `kholmatova-2017` |
| primitive-tokens | `dtcg-format-2025`, `dtcg-color-2025` | Fluent tokens, M3 tokens, USWDS colour | — |
| semantic-tokens | `dtcg-format-2025`, `w3c-wcag-22` | M3 colour roles, Atlassian colour, Carbon themes | — |
| theme-architecture | `dtcg-resolver-2025`, `w3c-wcag-22` | Carbon themes, Fluent tokens, Apple colour | — |
| multi-brand-systems | `dtcg-resolver-2025` | Fluent, Carbon, M3 | **gap:** no multi-brand governance source read |
| spacing-scales | — | GOV.UK, Atlassian, Carbon, USWDS, UX4G spacing | Gestalt sources via `gestalt-principles` |
| typography-scales | `w3c-wcag-22` (1.4.4, 1.4.12) | M3, Fluent, Atlassian, GOV.UK, Apple | `bringhurst-2012` |
| colour-systems | `w3c-wcag-22` (1.4.1, 1.4.3, 1.4.11) | M3, Fluent, Atlassian, USWDS, GOV.UK, Apple | — |
| elevation-systems | — | M3, Fluent, Atlassian | — |
| icon-systems | `w3c-wcag-22` (1.1.1, 4.1.2) | Apple SF Symbols, M3 | **gap:** icon recognition research to find |
| responsive-systems | `w3c-wcag-22` (1.4.10, 2.5.8) | Apple layout, USWDS, GOV.UK | — |
| component-libraries | — | GOV.UK contribution, Carbon contributing, Apple buttons | — |
| component-architecture | `w3c-aria-apg` (informative) | Spectrum, Carbon | — |
| variants | — | GOV.UK button, Atlassian button, Spectrum | — |
| component-properties | — | `figma-learn` page, Carbon code | **gap:** few sources on property design |
| component-state-management | `w3c-wcag-22` (2.4.7, 2.4.11, 4.1.2, 4.1.3) | M3 states, Atlassian, Apple buttons | — |
| data-tables | `w3c-aria-apg` table/grid, `w3c-wcag-22` | Carbon, USWDS | — |
| empty-states | `w3c-wcag-22` (1.1.1) | Carbon empty states | — |
| loading-states | `w3c-wcag-22` (4.1.3) | Apple loading, progress | `myers-1985`, `nielsen-1993-response-times`, `doherty-thadani-1982` |
| error-states | `w3c-wcag-22` (1.4.1, 3.3.1, 3.3.3) | GOV.UK error message and validation | — |
| skeleton-screens | — | Carbon data table, Apple loading | **gap:** peer-reviewed evidence on skeletons vs spinners |
| progressive-loading | `w3c-wcag-22` | Apple loading | **gap:** web performance documentation |
| design-governance | — | GOV.UK criteria, Carbon contributing, UX4G governance | `curtis-2009` (scope) |
| design-system-versioning | `semver-2` | Carbon migration, GOV.UK releases, Atlassian changelog | — |
| design-qa | `w3c-wcag-22`, `w3c-understanding-wcag-22` | Carbon a11y test status, Atlassian tooling | — |
| design-system-audits | — | USWDS maturity model, UX4G (case) | `frost-2016` (interface inventory) |

## 5. Unresolved research questions

1. **Skeleton screens:** is there peer-reviewed evidence that skeletons change perceived waiting time compared with spinners or progress bars? Search ACM DL and Crossref; until found, the entry describes documented practice only.
2. **Icon recognition:** sources on labelled versus unlabelled icon comprehension, to support Icon Systems claims.
3. **Multi-brand governance:** an official, published multi-brand governance model (none found among the nine references on the pages read).
4. **Component properties:** design-tool documentation (Figma) for current property types — verify at the time of writing because tools change.
5. **Measured value of design systems:** published case evidence on efficiency or consistency gains. Practitioner claims exist; the entry must not present them as research findings.
6. **WCAG 2.2 criteria levels** used in lessons: re-read each criterion on the TR page when the lesson is written (the audit read the status and new-criteria list verbatim; some levels came from a summary).

## 6. Access limitations recorded

- Material 3 pages require a browser to render; record the rendering method in source notes.
- Apple HIG content was read through JSON data endpoints; cite the human page URL.
- UX4G developer API (`doc.ux4g.gov.in`) returned 403.
- Atlassian design-tokens page returned an empty body; tokens were read on the colour and all-tokens pages.
- Spectrum component section content is hosted on a separate domain and was not read.
- Fluent 2 component usage page returned a soft 404.
