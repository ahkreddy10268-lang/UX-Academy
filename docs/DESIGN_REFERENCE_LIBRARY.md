# Design reference library

External resources for **future** visual and interface work on UX Academy. Recorded on owner instruction, 2026-11-23. This is a reading list, not a build plan: nothing here is installed, imported or adopted.

## Rules for using these resources

1. **Study, do not copy.** Use the galleries to understand patterns: how a footer groups links, how a navbar handles search, how a pricing section states its terms. Do not copy a website's design, layout, copy, screenshots, illustrations, icons, fonts or other assets into UX Academy.
2. **The project's own rules win.**
   - `CLAUDE.md`, `docs/DESIGN_SYSTEM.md`, `docs/UI_UX_DESIGN_DIRECTION.md` and `docs/INTERACTION_AND_MOTION_GUIDELINES.md` decide every visual question.
   - Tokens live only in `app/globals.css`.
   - The v4 monochrome system and the accessibility floor apply.
   - Motion is used only to teach or confirm: no scroll effects, no parallax and no decorative animation.
   - Several resources below exist mainly to provide scroll-driven and decorative effects; for UX Academy they are reference material only.
3. **No new dependencies without owner approval.** The approved runtime dependencies are next, react, zod and minisearch (`CLAUDE.md`). Every implementation library below would be a new dependency.
4. **Check the licence again before any use.** Licences and prices change. The notes below are what was read on the verification date, not legal advice.
5. **Timing.** Major visual refinement is deferred until curriculum coverage is complete.

## Inspiration galleries

| Resource | Official site | Purpose for UX Academy | Access model (as verified) | Licence considerations | Last verified |
|---|---|---|---|---|---|
| **Refero Styles** | https://styles.refero.design/ | Design systems and visual language of real product websites: typography, colour, spacing, components, and AI-readable `DESIGN.md` files | Site labelled **Beta**, with "new styles added every week" and no paywall on the gallery pages read. **Refero MCP** is promoted from the gallery (refero.design/mcp). Owner-reported: it requires the separate Refero Pro subscription. Refero's pricing and MCP pages render only in a browser and could not be read to confirm this | Shows other companies' websites and derived style descriptions: study the reasoning, never copy their brand styles or assets. Terms of use not reviewed | 2026-11-23 |
| **CTA Gallery** | https://www.cta.gallery/ | Buttons, calls to action, forms, newsletter and pricing/subscription sections, modals, conversion sections | **Publicly browsable**; no paid gallery subscription was identified. "Subscribe" is a newsletter. The page carries sponsored listings (for example Webflow and Framer templates marked "Use for free"); these are third-party offers, not a gallery membership | Examples are third-party websites; copyright stays with them. Use for pattern analysis only | 2026-11-23 |
| **Footer Design** | https://www.footer.design/ | Footer composition, footer information architecture, visual styles and responsive layouts | **Publicly browsable**; no paid gallery subscription was identified. A "Sponsored" listing appears on the page; it is not a membership | As above: third-party websites, pattern analysis only | 2026-11-23 |
| **Navbar Gallery** | https://www.navbar.gallery/ | Desktop and mobile navigation: static bars, dropdowns, mega menus, sidebars, search bars, tabs, announcement bars, breadcrumbs | **Publicly browsable**; no paid gallery subscription was identified. "Subscribe" is a newsletter; "Sponsored by Mobbin" is a sponsor, not a membership | As above | 2026-11-23 |
| **Scrolltide** | https://www.scrolltide.co/ | Cinematic layouts, scroll-driven effects, 3D, shaders and reusable sections (hero, pricing, testimonial, footer sections), delivered as AI prompts and templates | **Paid plans with selected free templates.** Pricing page as read: Monthly $39 per month on sale, regular $59, with a fair-use limit of 10 premium template copies per week; Yearly $144 billed yearly; Lifetime $299 one-time on sale, regular $449. The 3D collection is included with Yearly and Lifetime. "Free" items are marked in the library. The newsletter is separate from the paid plans | Plans state a "personal & client use license"; full terms not reviewed. Most of what it offers (scroll-driven motion, parallax-like effects, decorative shaders) conflicts with UX Academy's motion rules, so treat it as inspiration only | 2026-11-23 |

## Free implementation alternatives

Listed for reference when a future, approved task needs an implementation pattern. Nothing is installed.

| Resource | Official site | GitHub | Purpose | Access model | Licence considerations | Last verified |
|---|---|---|---|---|---|---|
| **awesome-design-md** (VoltAgent) | — (repository homepage points to getdesign.md, a separate offering, not reviewed) | https://github.com/VoltAgent/awesome-design-md | A collection of `DESIGN.md` files analysing popular brands' design systems, for giving AI agents design context | Free repository; maintained (last push 2026-10-28) | **MIT**. The files describe other companies' brands: use them to learn how a design system is written down, not to imitate a brand in UX Academy | 2026-11-23 |
| **HyperUI** | https://hyperui.dev | https://github.com/markmead/hyperui | Free Tailwind CSS v4 component examples (marketing, application UI) | Free; maintained (last push 2026-11-22) | **MIT**. Copy-paste components would still have to be rebuilt on UX Academy tokens and the `.btn`/`.field` families | 2026-11-23 |
| **Watermelon UI** | https://ui.watermelon.sh | https://github.com/WatermelonCorp/watermelon-platform | Open-source React UI platform: components, animated interactions, blocks, dashboards, page templates | Free to browse and use, as stated on the site; maintained (last push 2026-11-22) | **MIT** (repository licence file). Animated interactions are subject to UX Academy's motion rules | 2026-11-23 |
| **Preline UI** | https://preline.co | https://github.com/htmlstreamofficial/preline | Prebuilt Tailwind CSS components, blocks and templates | **Open-source library free**, with no account required. **Preline Pro is paid**, a one-time lifetime licence: Pro $249, Team $459 on the pricing page as read. **Preline MCP** is a hosted service not included in the lifetime licence; the pricing page says a subscription is required after an introductory period | **Dual licence: MIT plus the "Preline UI Fair Use License".** The fair-use terms forbid using it to build a product that competes with Preline UI, and forbid harmful or deceptive use. Derivative works may be sold only with attribution ("Preline UI" and a repository link) and a clear distinction from the original. Redistribution must include both licences and attribution. Preline may terminate the rights for non-compliance | 2026-11-23 |
| **GSAP** | https://gsap.com | https://github.com/greensock/GSAP | JavaScript animation library (timelines, ScrollTrigger, SplitText and other plugins) | The README describes GSAP as "100% free"; maintained (last push 2026-11-04) | **Not an OSI open-source licence**: the repository has no standard licence file, and gsap.com/licensing applies. That page returned a browser verification screen and was **not read**, so read the current terms before any use. Scroll-driven use conflicts with UX Academy's motion rules | 2026-11-23 |
| **Lenis** | https://lenis.dev | https://github.com/darkroomengineering/lenis | Smooth-scroll library | Free; maintained (last push 2026-11-19) | **MIT**. Smooth or hijacked scrolling conflicts with UX Academy's motion rules and can harm accessibility (scroll expectations, reduced-motion preferences). Reference only | 2026-11-23 |
| **React Bits** | https://reactbits.dev | https://github.com/DavidHDev/react-bits | Animated, interactive React and Next.js components | Free; maintained (last push 2026-11-19) | **MIT plus the Commons Clause.** Use is allowed in apps and websites, including commercial ones, but the components (and its tools and sounds) may not be sold, sublicensed or redistributed themselves, alone, in a bundle or ported. Exports from its tools may not be sold or redistributed as standalone assets or packs. Decorative animation conflicts with UX Academy's motion rules | 2026-11-23 |

## Pricing distinctions to keep straight

- **Refero Styles** is a free **beta** gallery. **Refero MCP** is a separate product. That it requires the **Refero Pro** subscription is owner-reported and not confirmed here, because the pages need a browser.
- **CTA Gallery, Footer Design and Navbar Gallery** are publicly browsable. No paid gallery subscription was identified.
- **Scrolltide** has **monthly, yearly and lifetime** paid plans, alongside selected free templates.
- **Preline** has a free open-source library and a paid **Pro** (lifetime licence), plus a hosted **MCP** that is not covered by the lifetime licence.
- A **newsletter subscription** ("Subscribe") or a **sponsored listing** ("Sponsored by …") is **not** a paid gallery membership.

## How these were verified (2026-11-23)

- **Gallery home pages:** each fetched directly (all HTTP 200). Title, description, "Beta", "Free", "Sponsored" and "Subscribe" labels were read from the page text.
- **Scrolltide:** the pricing page was read.
- **Preline:** the pricing page and the repository `LICENSE` were read.
- **React Bits and Watermelon:** repository licence files were read.
- **GitHub details:** licence identifiers, archive status and last-push dates come from the GitHub search API.
- **Not read:**
  - Refero's pricing and MCP pages (JavaScript only; two attempts);
  - the GSAP licensing page (browser verification screen);
  - each site's full terms of use.

Re-verify prices and licences before any decision that depends on them.
