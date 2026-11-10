# Industry reference audit

> Phase 1 research for the Design Systems curriculum. Checked 2026-11-10. Every finding below was read on the official page named, unless it is marked **not verified**. Pages were paraphrased, not copied. Where a page could not be read, the gap is recorded rather than filled from memory.

## How to read this audit

- **What a reference does is evidence of practice, not a rule.** A vendor's spacing base, token naming or contribution process shows one documented choice and its reasoning. The curriculum teaches the reasoning and the trade-off, never the vendor's number as a universal standard.
- **Normative versus informative.** Only WCAG 2.2 is a normative technical standard here. The WAI-ARIA Authoring Practices Guide (APG) says of itself that it is informative. The DTCG Format is a Community Group report, not a W3C Standard. Vendor systems are official documentation of their own products.
- **Access method.** Most pages were read as HTML. Material Design 3 is rendered client-side, so its pages were rendered in a headless browser and their visible text read. Apple's guidelines were read through their published JSON data endpoints. Where a page returned an empty body, a 404 or a 403, it is listed under *Gaps*.

---

## 1. UX4G Design System 3.0 (Government of India)

**Pages read:** [Documentation home](https://www.ux4g.gov.in/designsystem/documentation) · [Site map](https://www.ux4g.gov.in/site-map) · [Get started](https://www.ux4g.gov.in/get-started) · [For designers](https://www.ux4g.gov.in/get-started/for-designers) · [Foundations](https://www.ux4g.gov.in/foundations?lang=en) · [All design tokens](https://www.ux4g.gov.in/foundations/tokens) · [Spacing](https://www.ux4g.gov.in/foundations/spacing) · [Accessibility](https://www.ux4g.gov.in/foundations/accessibility) · [Button](https://www.ux4g.gov.in/components/button) · [Governance](https://www.ux4g.gov.in/community/governance). Version shown: "UX4G Design System 3.0". No release or last-updated date was shown.

| Aspect | Finding |
|---|---|
| Purpose and audiences | A shared design ecosystem for teams building government services. Get started routes people as Designer, Developer or "Build with AI". |
| Information architecture | Top level: Get Started, Foundations, Components, Patterns, Resources, Community. The site map lists pattern categories framed by service tasks, for example identity and access, payments and transactions, and notifications. |
| Foundations and tokens | Eight foundations (F-01 Colour to F-08 Content Design System). The token page names **primitive** and **semantic** tiers with a `--ux4g-` prefix. Spacing is a base-4 scale with 2 px fine steps; primitives `--ux4g-space-1` (2 px) to `--ux4g-space-15` (120 px), with semantic roles for column gap, row gap, padding and section gap. |
| Components | Button: description, examples (primary, outlined, text, tonal), accessibility, when to use, and do/don't pairs with label wording (e.g. a specific verb phrase rather than a bare "Submit"). No anatomy, state matrix or properties table on that page. |
| Good/bad examples | Present as paired text and images: button labels, alt text, heading order, button versus `div`, and a pass/fail contrast table. |
| Accessibility | Claims WCAG 2.1 Level AA for every component; gives 4.5:1 for text and 3:1 for UI, a keyboard table, ARIA examples and a known-limitations table. The For designers page cites 22 scheduled languages. |
| Responsive | Content width caps (1200 px, 1320 px), body text measure near 720 px, 44 × 44 px mobile touch targets with 8 px between them. No breakpoint values were found. |
| Design and code | Figma community kit with a publish-and-enable sequence; Storybook covering React, Angular, Flutter and Web Components; npm or CDN install. |
| Governance | A core team; proposals through GitHub issues; maturity labels Alpha, Beta, Production, Deprecated; "nothing is removed without a migration path and advance notice". No changelog page was found in the site map. |

**Strongest teaching practices:** service-context framing (patterns grouped by citizen tasks); multilingual scope stated up front; maturity labels; a known-limitations table on the accessibility page; a clear Figma setup sequence.

**Limitations observed (as of the check date):**
- The token page lacks the colour and spacing sections the foundations page promises, and contains a misspelt prefix (`--ux4x-icon-border-desabled`).
- The Button page cites WCAG 2.5.5 under an AA claim; in WCAG 2.1 and 2.2, 2.5.5 Target Size (Enhanced) is Level AAA. The minimum target criterion in WCAG 2.2 is 2.5.8 (AA).
- The focus-ring width differs between the Button page (2 px) and the Accessibility page (4 px).
- Placeholder text appears in a Get Started card; "100% keyboard operable" is stated without a method.
- Motion is named as a foundation on Get Started but has no page.

**Transferable to UX Academy:** task-grouped patterns; a known-limitations section per foundation; maturity labels on every component; explicit language coverage as a design requirement; contrast pass/fail tables as teaching devices.

**Specific to UX4G, not to generalise:** GIGW and DPDP Act compliance claims (legal and policy context for Indian government services); 22 scheduled languages as a requirement; the base-4 scale with 2 px steps.

**Curriculum use:** the primary reference for documentation depth in public-service contexts, and a real example for the Design System Audits topic, because its documented inconsistencies are exactly what an audit finds. Teaching material must describe them as findings on a dated check, not as criticism of a team.

---

## 2. GOV.UK Design System

**Pages read:** [Home](https://design-system.service.gov.uk/) · [Styles](https://design-system.service.gov.uk/styles/) · [Spacing](https://design-system.service.gov.uk/styles/spacing/) · [Type scale](https://design-system.service.gov.uk/styles/type-scale/) · [Colour](https://design-system.service.gov.uk/styles/colour/) · [Components](https://design-system.service.gov.uk/components/) · [Button](https://design-system.service.gov.uk/components/button/) · [Error message](https://design-system.service.gov.uk/components/error-message/) · [Patterns](https://design-system.service.gov.uk/patterns/) · [Recover from validation errors](https://design-system.service.gov.uk/patterns/validation/) · [Community](https://design-system.service.gov.uk/community/) · [Contribution criteria](https://design-system.service.gov.uk/community/contribution-criteria/). The home page announced GOV.UK Frontend v6.6.0 (15 October 2026).

| Aspect | Finding |
|---|---|
| Purpose | Make government services consistent with GOV.UK; for everyone who works on government services. |
| Information architecture | Get started, Styles, Components (37), Patterns (30, grouped as "Ask users for…", "Help users to…" and "Pages"), Community, Accessibility. |
| Foundations | Spacing in units 0–9 with a responsive scale (smaller values on screens up to 640 px wide) and a static scale; type scale whose line heights are multiples of 5 px, with smaller sizes on small screens; a colour palette accessed through functions, with "do not assign new meanings to colours". |
| Component page | Live example with HTML and Nunjucks; When to use; When not to use (Error message); How it works; variants; Research; Recent changes; Help improve. |
| Patterns vs components | Patterns are best-practice solutions for user-focused tasks and page types and often use one or more components; components are reusable parts of an interface. |
| Good/bad | Prose and lists rather than paired images: "Do not use" word lists for error messages, "avoid" guidance for multiple default buttons and disabled buttons. |
| Research | Pages state what testing found and link discussions (e.g. green start buttons improving click-through, error messages helping users recover). The validation pattern says more research is wanted. |
| Accessibility | Colour and buttons must meet WCAG 2.2 SC 1.4.3 (AA). |
| Contribution | Proposal stage: **Useful** and **Unique**. Development stage: **Usable** (tested with a representative sample including disabled people), **Consistent** and **Versatile**. The team reviews proposals against these criteria. |
| Versioning | Releases of GOV.UK Frontend with breaking changes in majors (e.g. v6.0.0 changed the Button's default element). Migration guides are linked. |

**Strongest teaching practices:** a consistent page template; "When not to use" as a standard heading; task-named patterns; research and "help improve" sections that show guidance as evidence that evolves; staged contribution criteria that separate *should this exist* from *is it good enough*.

**Limitations:** few visual do/don't examples; no dedicated accessibility section on the component pages read; research depth varies by page; the typography URL `/styles/typography/` returned 404 (the type pages live under other URLs).

**Transferable:** When-not-to-use as a required section; research and known-limits sections; the two-stage contribution criteria as the backbone of the Design Governance lesson; task-oriented pattern naming.

**Specific, not to generalise:** the 5 px spacing unit and its responsive scale; GOV.UK's single-brand, single-platform context; its legal duty to public users.

---

## 3. IBM Carbon Design System

**Pages read:** [Home](https://carbondesignsystem.com/) · [Themes](https://carbondesignsystem.com/elements/themes/overview/) · [Spacing](https://www.carbondesignsystem.com/building-blocks/foundations/spacing/overview) · [Patterns overview](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview) · [Empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states) · [Data table usage](https://carbondesignsystem.com/components/data-table/usage/) · [Data table accessibility](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/accessibility) · [Data visualization](https://www.carbondesignsystem.com/building-blocks/data-visualization/overview) · [Contributing](https://www.carbondesignsystem.com/getting-started/contributing/overview) · [Migration guide](https://www.carbondesignsystem.com/getting-started/migrating/guide). Pages showed "last updated" dates between August and September 2026; the migration guide documents the move to v11, and the home page links v12 progress.

| Aspect | Finding |
|---|---|
| Information architecture | Getting started (including Contributing and Migrating), Building blocks (Foundations, Components, Patterns, Data visualization), Building experiences, Support. "Core" appears in component and pattern URLs; IBM product extensions are separate sites. |
| Tokens and themes | Four themes: White (default), Gray 10, Gray 90, Gray 100. Tokens are **role-based** and the role names do not change across themes, only their values (e.g. `$text-primary`). Spacing tokens `$spacing-01` (2 px) to `$spacing-13` (160 px), built on multiples of 2, 4 and 8; deviation "should be avoided whenever possible"; spacing tokens are not responsive. |
| Patterns vs components | Patterns are best-practice combinations of components, templates, flows and sequences; components are designed, coded and ready to import. |
| Empty states | Three types (no data, user action, error management) and alternatives (in-line documentation, onboarding, starter content). The empty state replaces the element that would have shown (the whole table, not just its rows). |
| Data table | Variants (default, with selection, with expansion); five row sizes (24–64 px); toolbar with up to five actions; batch actions on selection; sorting; pagination at the bottom; skeleton states rather than spinners for loading. |
| Accessibility | Keyboard support built into components; sortable headers reached by Tab and sorted with Space or Enter, state via `aria-sort`; per-component test status (automated passes, manual screen-reader testing). No overall WCAG conformance level was stated on the pages read. |
| Contribution | Anyone can contribute; new components start in Carbon Labs; components and patterns need usage, style, code and accessibility guidance before they are done. |
| Versioning | The v11 migration guide covers token renames, CSS custom-property themes, a unified React package and component changes. No general deprecation policy page was found. |

**Strongest teaching practices:** role-based tokens explained with a worked table across themes; empty-state taxonomy; data-table guidance that combines layout, density, actions and accessibility; honest "future" flags for unfinished patterns.

**Limitations:** navigation labels and URLs disagree (`/elements/` and `/building-blocks/`); `/guidelines/` returns 404; some patterns are still marked "future"; no single conformance statement.

**Transferable:** themes as different values behind stable role names; the empty-state types; contribution "definition of done" (usage, style, code, accessibility); data-table density sizes as an example of a documented decision.

**Specific, not to generalise:** IBM's product extension model; four named grey themes; Carbon's 2/4/8 spacing set.

---

## 4. Atlassian Design System

**Pages read:** [Home](https://atlassian.design/) · [About](https://atlassian.design/get-started/about-atlassian-design-system/) · [Foundations](https://atlassian.design/foundations/) · [Spacing](https://atlassian.design/foundations/spacing) · [Typography](https://atlassian.design/foundations/typography) · [Color](https://atlassian.design/foundations/color) · [All tokens](https://atlassian.design/components/tokens/all-tokens) (partial) · [Button usage](https://atlassian.design/components/button/usage) (partial).

| Aspect | Finding |
|---|---|
| Token naming | Colour tokens read as foundation, property, then modifiers for role, emphasis and state: `color.background.danger.bold.hovered`. Other families include `space.*`, `font.*`, `border.*`, `elevation.*`. Token entries record the version that introduced them. |
| Colour roles | neutral, brand, information, success, warning, danger, discovery, accent, inverse, input; emphasis steps from subtlest to bold. Accent colours carry no meaning and must not be used where colour has meaning. Two themes (light, dark); teams using tokens do not map dark values by hand. |
| Spacing | 8 px base (`space.100`); a scale from `space.0` (0) to `space.1000` (80 px) including 2, 4 and 6 px steps; negative tokens; ranges by use (small for icon gaps and input padding, medium for button padding and cards, large for page layout). Do/don't pairs on grouping by proximity and optical adjustment. |
| Typography | A refreshed type system; heading tokens `font.heading.xxlarge` (32 px) to `xxsmall` (12 px); body tokens 16/14/12 px with line heights; rem units justified by user resizing; one `h1` per page and no skipped levels. |
| Component docs | Button: Examples, Code, Usage, Changelog tabs; usage covers parts, do/don't and accessibility (e.g. avoid disabled buttons, use links for navigation). |
| Tooling | ESLint and Stylelint plugins and a Storybook add-on are listed (pages not read). |

**Strongest teaching practices:** token names that can be read as sentences; use-case ranges on the spacing scale; explicit *why* (legibility, user resizing, density); state guidance that keeps selected and focused distinct.

**Limitations:** the design-tokens page returned an empty body; the About page is marketing-led; many examples are images without text alternatives readable to this audit.

**Transferable:** teach token names as grammar; scale ranges by use rather than a list of values; lint-style enforcement as a QA idea.

**Specific, not to generalise:** the 8 px base and the `space.100` numbering; Atlassian Sans; colour role list.

---

## 5. Adobe Spectrum (Spectrum 2)

**Pages read:** [Start with Spectrum](https://spectrum.adobe.com/) · [Introduction](https://spectrum.adobe.com/getting-started/introduction) · [Pattern library: usage](https://spectrum.adobe.com/docs/pattern-library/usage) · [Attention hierarchy](https://spectrum.adobe.com/foundations/attention-hierarchy) · [Button (index)](https://spectrum.adobe.com/web/rsp/components/button). The site documents Spectrum 2; React and Web Components implementations are in beta, other platforms "coming soon".

| Aspect | Finding |
|---|---|
| Component page structure | Anatomy; Component options; States; Behaviors; Usage guidelines; Content standards; Internationalization; Accessibility; and an interactive playground connected to the source repositories. |
| Do/don't format | Each guideline pairs an image, a caption and a semantic marker (do, don't, neutral). |
| Attention hierarchy | Only one element or group should draw high attention on a page; high-attention styles are used sparingly. Taught with a before/after example of an over-used accent colour. |

**Strongest teaching practices:** attention hierarchy as a system-level principle; separate sections for options (variants) and states; internationalisation as a component-level section; playground linked to source.

**Limitations:** component section content lives on another host and was not read; captions often say *what* rather than *why*; repeated placeholder captions on the usage page; no version or date on pages.

**Transferable:** the variants-versus-states distinction in page structure; internationalisation per component; do/don't with a reason (UX Academy should add the reason Spectrum's captions often omit).

**Specific, not to generalise:** Adobe's product-specific options (e.g. static colour); Spectrum 2's visual language.

**Not verified:** Spectrum's token architecture and keyboard tables (pages not reached).

---

## 6. Microsoft Fluent 2

**Pages read:** [Home](https://fluent2.microsoft.design/) · [Design tokens](https://fluent2.microsoft.design/design-tokens) · [Color](https://fluent2.microsoft.design/color) · [Elevation](https://fluent2.microsoft.design/elevation) · [Typography](https://fluent2.microsoft.design/typography) · [Accessibility](https://fluent2.microsoft.design/accessibility).

| Aspect | Finding |
|---|---|
| Token architecture | Two layers. **Global tokens** are context-agnostic and store raw values. **Alias tokens** add semantic meaning and, for shadows and type, combine several values into one. Tokens support light, dark, high-contrast and branded themes. |
| Colour | Neutral, shared and brand palettes; semantic colours (danger, caution, positive) must always convey important information; interaction states darken from rest to hover to selected, and focus thickens the container stroke; Windows reverses the direction (controls lighten). |
| Elevation | "Perceived distance between an object and the surface behind it." Shadow ramp 2, 4, 8, 16, 28, 64, each with light and dark versions; Windows uses strokes instead of key shadows; shadows on coloured surfaces need a different calculation. |
| Typography | Ramps per platform: web, Windows, macOS, iOS and Android, each with its native typeface. |
| Accessibility | Components meet or surpass WCAG 2.1 AA; 4.5:1 text, 3:1 for large text and non-text elements; focus order and screen-reader annotations in design specs; reflow to 400% and a 320 px layout. |

**Strongest teaching practices:** the clearest two-tier token definition among the references; per-platform ramps that show a system adapting to platform conventions rather than overriding them; elevation as a ramp with stated meaning.

**Limitations:** theming detail is mostly in images; the component usage page returned a soft 404; no governance or versioning content on the pages read; its large-text figure (18.5 px bold) does not match WCAG's definition (14 pt bold, about 18.66 px) and must not be taught as the WCAG threshold.

**Transferable:** global/alias tiers for the Primitive and Semantic Tokens lessons; platform-specific ramps for Typography Scales and Responsive Systems; Windows' reversed state direction as a cross-platform example.

**Specific, not to generalise:** Segoe UI; Microsoft 365 product colours; the exact shadow values.

---

## 7. U.S. Web Design System (USWDS)

**Pages read:** [Home](https://designsystem.digital.gov/) · [How to use USWDS](https://designsystem.digital.gov/how-to-use-uswds/) · [Design principles](https://designsystem.digital.gov/design-principles/) · [Components overview](https://designsystem.digital.gov/components/overview/) · [Table](https://designsystem.digital.gov/components/table/) · [Design tokens](https://designsystem.digital.gov/design-tokens/) · [Spacing units](https://designsystem.digital.gov/design-tokens/spacing-units/) · [Using color](https://designsystem.digital.gov/design-tokens/color/overview/) · [Accessibility](https://designsystem.digital.gov/documentation/accessibility/) · [Maturity model](https://designsystem.digital.gov/maturity-model/) · [What's new](https://designsystem.digital.gov/about/whats-new/). Version shown: v3.14.0.

| Aspect | Finding |
|---|---|
| Principles | Start with real user needs; Earn trust; Embrace accessibility; Promote continuity; Listen. Each has key considerations and practical actions. |
| Tokens | "A limited set of discrete options" across colour, spacing units, font size and family, and more. Spacing in multiples of 8 px (unit 1 = 8 px, 0.5 = 4 px). Colour grades 0–100 with "magic numbers": a grade difference of 50 or more gives AA contrast, 70 or more AAA. Theme, state and system colour tiers. |
| Component page | Preview, code, guidance (When to use; When to consider something else; Usability; Accessibility), settings and variants, package, latest updates. |
| Table | Sortable, stacked (for small screens, with `data-label`), borderless, scrollable (with `tabindex="0"`), sticky header. |
| Accessibility | Targets WCAG 2.1 AA and aims at 2.2; publishes an accessibility conformance report for assessed components; component conformance work is in progress. |
| Maturity model | Three levels: integrate design principles; follow UX guidance; use USWDS code. Adoption is incremental and no numeric score is defined. |

**Strongest teaching practices:** "When to consider something else" as a standard section; the grade-based contrast rule that turns a calculation into a naming convention; a maturity model without a fake score.

**Limitations:** WCAG version references differ between pages (2.0, 2.1); release notes live on GitHub; token pages last updated in 2023.

**Transferable:** grade-based colour names for the Colour Systems lesson; the maturity model as a non-numeric adoption measure for Audits; stacked tables for Data Tables.

**Specific, not to generalise:** Section 508 obligations; US federal context; the magic-number grades only work with USWDS's own calibrated palette.

---

## 8. Apple Human Interface Guidelines

**Read through Apple's documentation data endpoints for:** [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) · [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) · [Color](https://developer.apple.com/design/human-interface-guidelines/color) · [SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols) · [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) · [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) · [Loading](https://developer.apple.com/design/human-interface-guidelines/loading) · [Progress indicators](https://developer.apple.com/design/human-interface-guidelines/progress-indicators) · [VoiceOver](https://developer.apple.com/design/human-interface-guidelines/voiceover). Page change dates ranged from 2023 to September 2026.

| Aspect | Finding |
|---|---|
| Native versus custom | System components bring interaction states, accessibility and appearance adaptation; a custom button must at least include a press state. Avoid hard-coding system colour values. |
| Typography | Text styles support Dynamic Type; default and minimum sizes per platform (e.g. iOS 17 pt default, 11 pt minimum); macOS does not support Dynamic Type. |
| Colour | System colours are dynamic and named by purpose; custom colours need light, dark and increased-contrast variants; do not rely on colour alone. |
| SF Symbols | Weights and scales aligned to the system font; rendering modes; custom symbols from templates; licence terms restrict use in app icons and logos. |
| Layout | Size classes rather than device types; safe areas; system margins. |
| Loading and progress | Show something as soon as possible; let people keep working; prefer determinate indicators when duration is known; avoid vague "loading" labels; offer Cancel when safe. |
| Accessibility | Text enlargement of at least 200%; contrast guidance in WCAG terms; minimum and default hit regions per platform (e.g. iOS 44 pt default). |

**Strongest teaching practices:** rules phrased as imperatives with graded strength (Prefer, Consider, Avoid); per-platform tables; dated change logs.

**Limitations for a cross-platform curriculum:** guidance is platform-bound; SF fonts and symbols carry licence terms; Liquid Glass guidance is new and changing.

**Transferable:** "use the native component unless you can justify the cost" for Component Libraries; determinate versus indeterminate decision for Loading States; size classes as an alternative to device breakpoints.

**Specific, not to generalise:** point sizes and hit regions (platform units); SF Symbols; Dynamic Type.

---

## 9. Material Design 3

**Pages rendered and read:** [Color roles](https://m3.material.io/styles/color/roles) · [Typography: type scale tokens](https://m3.material.io/styles/typography/type-scale-tokens) · [Elevation](https://m3.material.io/styles/elevation/overview) · [Design tokens](https://m3.material.io/foundations/design-tokens/overview) · [States](https://m3.material.io/foundations/interaction/states/overview).

| Aspect | Finding |
|---|---|
| Token classes | Three classes: **reference**, **system** and **component**. A token is a code-like name (e.g. `md.ref.palette.secondary90`) with a value that can be a colour, typeface, measurement or another token. Tokens are presented as a single source of truth and a shared language for handoff; the page also discusses when tokens are worth adopting. |
| Colour roles | 26 standard roles in six groups (primary, secondary, tertiary, error, surface, outline); "on" roles for content on a fill, "container" roles for fills, "variant" roles for lower emphasis. Roles are designed to be used in their intended pairs; improper mappings can break contrast. |
| Typography | One type scale of 15 baseline styles (display, headline, title, body, label, each large/medium/small) plus 15 emphasized styles added in the expressive update, each with its own token (`md.sys.typescale.display-large`). |
| Elevation | The z-axis distance between surfaces in dp; elevation tokens carry no shadow or colour, and each platform decides how to render a level; elevation can be shown as tonal surface colour or as shadow; use few levels. |
| States | Enabled and disabled, then interaction states with state layers; states have two visual indicators and can be combined (e.g. selected and hovered). |

**Strongest teaching practices:** role pairs as an accessibility mechanism; the three-class token model; elevation separated from its rendering.

**Limitations:** the client-rendered site cannot be read without a browser; the window-size-classes and shape URLs in the brief returned 404 at those paths; state-layer opacity values were not read.

**Transferable:** colour roles as pairs (Colour Systems); tokens that name a level and leave rendering to the platform (Elevation Systems); a third, component tier (Semantic Tokens, Component Architecture).

**Specific, not to generalise:** dynamic colour from wallpaper; the expressive emphasized styles; Material's 26 role names.

---

## 10. Standards and authoritative technical guidance

### Design Tokens Community Group (DTCG) 2025.10

**Read:** [W3C Community Group page](https://www.w3.org/community/design-tokens/) · [Technical Reports 2025.10](https://www.designtokens.org/TR/2025.10/) · [Format](https://www.designtokens.org/TR/2025.10/format/) · [Color](https://www.designtokens.org/TR/2025.10/color/) · [Resolver](https://www.designtokens.org/TR/2025.10/resolver/) · [FAQ](https://www.designtokens.org/faq/).

- **Status, exactly:** a Final Community Group Report dated 28 October 2025; "It is not a W3C Standard nor is it on the W3C Standards Track." The FAQ calls the core format stable for production use. (The index page also contains a sentence referring to a Candidate Recommendation; the header and status section are taken as authoritative.)
- **Modules:** Format, Color and Resolver, all 2025.10.
- **Format:** a token is an object with `$value`; optional `$type`, `$description`, `$extensions` and `$deprecated`; groups can carry `$type` for inheritance; aliases use curly braces (`{color.palette.black}`); JSON files, media type `application/design-tokens+json`, extensions `.tokens` or `.tokens.json`.
- **Types:** primitive (color, dimension, fontFamily, fontWeight, duration, cubicBezier, number) and composite (strokeStyle, border, transition, shadow, gradient, typography).
- **Color module:** colour spaces including sRGB, Display P3, OKLCH and others, following CSS Color 4.
- **Resolver:** sets, modifiers (contexts such as light and dark) and a resolution order, which is how the specification models theming.
- **Naming tiers:** the Format module does **not** prescribe tiers or names; groups must not be used to infer type. A non-normative section of the Color module describes base, alias and component categories. Primitive/semantic/component is an industry convention, not a requirement of the specification.

**Teaching rule for UX Academy:** always describe DTCG as a Community Group report, never as a W3C Standard, and keep tier names attributed to the systems that use them.

### WCAG 2.2

**Read:** [WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/) · [WCAG 2.2](https://www.w3.org/TR/WCAG22/) (status and the start of the criteria; remaining criteria levels to be re-read when each lesson is written).

- W3C Recommendation; the current version is dated 12 December 2024 (first published 5 October 2023). WCAG 2.2 does not deprecate 2.1 or 2.0. The overview states WCAG 2.2 is approved as ISO/IEC 40500:2025.
- 4.1.1 Parsing is obsolete and removed in 2.2.
- New in 2.2 and directly relevant to design systems: 2.4.11 Focus Not Obscured (Minimum, AA), 2.4.13 Focus Appearance (AAA), 2.5.8 Target Size (Minimum, AA, 24 × 24 CSS px with exceptions), 3.3.7 Redundant Entry (A), 3.3.8 Accessible Authentication (Minimum, AA).
- WCAG 3 is an early draft and must not be taught as current requirement.

### WAI-ARIA Authoring Practices Guide (APG)

**Read:** [APG home](https://www.w3.org/WAI/ARIA/apg/) · [Introduction](https://www.w3.org/WAI/ARIA/apg/about/introduction/) · [Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) · [Practices](https://www.w3.org/WAI/ARIA/apg/practices/) · [Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) · [Table](https://www.w3.org/WAI/ARIA/apg/patterns/table/) · [Grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/).

- **Not normative:** the introduction states the APG is informative, has no conformance model, and "is not a UI Design System".
- **Read Me First:** "No ARIA is better than bad ARIA"; a role is a promise of behaviour the author must implement; test with browsers and assistive technologies before production; mobile and touch support is not guaranteed.
- **Table versus grid:** a table is static and not an interactive widget; a grid is a composite widget with one tab stop and arrow-key navigation the author must implement. Authors are strongly encouraged to use the native HTML `table` element whenever possible.
- 30 patterns and 7 practices are indexed.

---

## 11. Cross-reference comparison

| Dimension | UX4G | GOV.UK | Carbon | Atlassian | Spectrum | Fluent 2 | USWDS | Apple HIG | Material 3 |
|---|---|---|---|---|---|---|---|---|---|
| Token tiers named | primitive, semantic | not read | role-based tokens | foundation.property.modifiers | not verified | global, alias | system, theme, state (colour) | system colours by purpose | reference, system, component |
| Spacing base documented | 4 px (2 px fine) | 5 px units | multiples of 2, 4, 8 | 8 px | not verified | not read | 8 px | platform margins | not read |
| "When not to use" section | do/don't lists | yes (standard heading) | yes | do/don't | do/don't | do/don't | "consider something else" | Avoid/Prefer rules | not read |
| Research evidence on pages | no | yes | partial | no | no | no | partial | no | no |
| Accessibility claim | WCAG 2.1 AA | SC-level (WCAG 2.2) | per-component tests | SC-level | not verified | WCAG 2.1 AA | 2.1 AA, aiming 2.2 | platform guidance | role-pair contrast |
| Contribution model | GitHub proposals | staged criteria | Carbon Labs + done criteria | feedback channels | not described | not read | not read | n/a | not read |
| Maturity / status labels | Alpha → Deprecated | component statuses | Stable, future | Caution, Beta, Deprecated | beta implementations | not read | maturity model | n/a | n/a |

**Reading the comparison fairly:**
- Systems that say less about research are not therefore weaker; GOV.UK serves one public audience whose behaviour it can test, while vendor systems often document decisions without publishing the studies.
- A published accessibility page does not make a system more accessible than one without. Teach learners to ask what was tested, how, and against which version of WCAG.
- Different spacing bases (4, 5, 8 px) are each coherent within their systems. The lesson is consistency and the reasoning, not the number.
