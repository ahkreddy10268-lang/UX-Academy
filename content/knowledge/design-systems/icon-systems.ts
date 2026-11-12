import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "icon-systems",
  slug: "icon-systems",
  title: "Icon Systems",
  alternateNames: ["Icon set", "Icon library", "Iconography system", "Icon guidelines"],
  summary:
    "The rules that make a set of icons work as one family — shared grid and sizes, consistent stroke and shape, one meaning per symbol, pairing with type, and accessible names — published as components or tokens.",
  definition:
    "An icon system is a **family of icons built to shared rules** and delivered as reusable components. The rules cover **construction** (artboard sizes, a keyline grid, stroke weight, corner radius), **meaning** (one metaphor per concept, used consistently), **pairing** (which icon size goes with which text size), **colour** (inherited from text roles) and **accessibility** (an accessible name for every meaningful icon, decorative icons hidden, adequate target size). Iconography in general — what icons are and how people read them — is the wider topic; this entry is about running icons as a system.",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "scales",
  tags: ["icons", "iconography", "svg", "keyline grid", "stroke", "accessible name", "target size", "currentColor"],
  difficulty: "intermediate",
  disciplines: ["Visual design", "Design systems", "Accessibility", "Front-end engineering"],
  learningObjectives: [
    "Describe the construction rules that make icons read as one family.",
    "Pair icon sizes with type sizes and spacing tokens.",
    "Keep one meaning per icon and decide when an icon needs a label.",
    "Ship icons accessibly: names, hidden decoration, contrast and target size.",
  ],
  prerequisites: ["signifiers", "typography-scales", "spacing-scales"],

  levels: {
    beginner: {
      explanation: [
        "A library app's toolbar has a bookmark icon with thin lines, a search icon with thick lines, and a 'renew' icon copied from another set that looks like 'refresh'. Each looks fine alone, but together they look borrowed, and people are unsure what 'renew' does.",
        "An **icon system** makes icons a family. They are drawn on the same grid, at the same few sizes, with the same line thickness and corner shape. Each icon has one meaning everywhere: if a circular arrow means 'renew loan', it never also means 'reload page'.",
        "Icons are also part of the interface for people using screen readers. Each meaningful icon needs a text name, and icons that only decorate are hidden from assistive technology.",
      ],
      analogy:
        "A typeface for symbols: letters in one font share stroke, proportion and spacing, which is why words look unified. Icons need the same shared rules.",
      everydayExamples: [
        "All toolbar icons in an app have the same thickness and size.",
        "A trash-can icon always means delete, never archive.",
        "An icon button that a screen reader announces as 'Search'.",
      ],
      vocabulary: [
        { term: "Icon set", meaning: "All the icons a product uses, drawn as one family." },
        { term: "Artboard", meaning: "The square canvas an icon is drawn on, such as 16 × 16 or 24 × 24 px." },
        { term: "Keyline grid", meaning: "Guide shapes inside the artboard that keep icons visually the same size." },
        { term: "Stroke weight", meaning: "The thickness of an icon's lines." },
        { term: "Accessible name", meaning: "The text assistive technology announces for an icon or icon button." },
      ],
    },
    intermediate: {
      explanation: [
        "**Construction.** Carbon draws component icons on 16 px artboards and also uses 20, 24 and 32 px; it keeps icon size consistent within a context and makes icons solid and monochromatic {{src:carbon-icons}}. A keyline grid (circle, square and rectangles inside the artboard) balances optical size, so a circle icon and a square icon look equally large. A fixed stroke weight per size keeps lines consistent.",
        "**Pairing with type.** Icons sit next to text, so their sizes follow the type scale: Carbon pairs 16 and 20 px icons with 14 and 16 px IBM Plex {{src:carbon-icons}}. Apple's SF Symbols take this further: symbol weights and scales are designed to match the system font {{src:apple-sf-symbols}}. The gap between icon and label comes from the [[spacing-scales]].",
        "**Meaning.** People recognise only a few icons without labels; most need a text label to be understood reliably. A system documents the concept behind each icon, forbids reusing a glyph for a different concept, and states when a label is required.",
        "**Delivery.** Icons ship as components (inline SVG or a sprite), take colour from `currentColor` so text colour roles apply, and come in the sizes the system allows. Licences matter: Apple, for example, restricts use of SF Symbols in app icons and logos {{src:apple-sf-symbols}}.",
      ],
      howItWorks: [
        "Shared construction lets the eye group icons as one set, so differences in shape carry meaning instead of noise.",
        "Linking icon size to type size and colour to text roles means icons change with themes, density and type scale without separate decisions.",
      ],
      implementation: [
        "Choose artboard sizes (for example 16, 20, 24) and a keyline grid; fix stroke weight and corner radius per size.",
        "Document each icon's concept, approved uses and synonyms; reject duplicates.",
        "Give every meaningful icon a text alternative and hide decorative ones [WCAG 2.2 SC 1.1.1 Non-text Content, A]; icon buttons need an accessible name [SC 4.1.2 Name, Role, Value, A] {{src:w3c-wcag-22}}.",
        "When an icon button has a visible label, put that text in its accessible name [SC 2.5.3 Label in Name, A] {{src:w3c-wcag-22}}.",
        "Icons needed to understand content need 3:1 contrast [SC 1.4.11, AA] {{src:w3c-wcag-22}}; Carbon applies its 4.5:1 text threshold to icons {{src:carbon-icons}}.",
        "Make icon targets at least 24 × 24 CSS px or adequately spaced [SC 2.5.8, AA] {{src:w3c-wcag-22}}; Carbon asks for 44 px touch targets, adding padding around small icons {{src:carbon-icons}}.",
      ],
      scenarios: [
        "**Illustrative.** The library app's 'renew' and 'refresh' share a circular arrow. The team assigns the circular arrow to refresh only and adds the label 'Renew' with a calendar-plus icon for loans.",
        "**Illustrative.** A 16 px icon is placed inside a 16 px button with no padding. Raising the button to a 24 px target while keeping the 16 px glyph fixes the target size without enlarging the drawing.",
        "**Critique protocol.** For each icon: is it from the set? Is its size on the scale and paired with the right text size? Does it have one meaning? Does it have an accessible name, or is it hidden as decoration? Is the target big enough?",
      ],
    },
    advanced: {
      explanation: [
        "**Optical sizing.** A 24 px icon scaled down to 16 px gets thin, blurry lines. Mature sets draw separate masters per size or use variable symbols — SF Symbols offer weights and scales aligned with the type system {{src:apple-sf-symbols}} — rather than scaling one drawing.",
        "**Tokens for icons.** Icon size, stroke and gap are dimension tokens (`icon.size.sm` = 16 px, `icon.gap` = `space.100`). Colour is not an icon token: icons inherit text or status roles through `currentColor`, which keeps them correct in every theme.",
        "**Governance.** Contribution rules decide when a new icon is warranted, who draws it, and how it is reviewed against the grid. A searchable catalogue with concept tags and synonyms prevents duplicates. Track unlabelled icon buttons in audits and icons imported from outside the set.",
        "**Rendering modes and colour.** Monochrome icons are the default; multi-colour or hierarchical icons (as in SF Symbols' rendering modes {{src:apple-sf-symbols}}) need rules so colour never becomes the only carrier of meaning.",
      ],
      evidence: [
        "Icon systems are **documented practice** in Carbon and Apple's SF Symbols {{src:carbon-icons}} {{src:apple-sf-symbols}}. That labels improve icon comprehension is widely reported in usability practice; this entry does not cite a specific study, and readers should treat the claim as practitioner consensus. Text alternatives, names, label-in-name, non-text contrast and target size are WCAG 2.2 success criteria {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Icon-only or labelled?** Icon-only saves space and suits universally known actions; labels improve comprehension and are often required for less common actions.",
        "**Outline or filled?** Some sets use filled glyphs for selected state; that makes state depend on shape detail, so it should be backed by another cue.",
        "**Custom set or open-source set?** Custom sets express the design language; open sets are faster and broader but harder to match with the type and stroke of the brand.",
      ],
      alternativeModels: [
        "**Icon font** — icons as glyphs in a font; easy to size with text but fragile for accessibility and blocked by some user font settings.",
        "**Illustration system** — larger, multi-colour spot illustrations for empty states and onboarding; a separate family with its own rules.",
      ],
    },
  },

  application: {
    summary: ["Icon systems apply to buttons, navigation, inputs, status messages and lists — everywhere a symbol supports or replaces a word."],
    web: ["Ship inline SVG components with `currentColor`, size props from tokens, `aria-hidden` for decorative use and a required label prop for icon buttons."],
    mobile: ["Use platform symbol systems where they fit (SF Symbols, Material Symbols); match weights to text."],
    enterprise: ["Dense toolbars need labels or tooltips plus accessible names; document keyboard shortcuts separately."],
    services: ["Signage and print can reuse icon concepts, redrawn for their sizes."],
    steps: [
      "Inventory icons and the concepts they stand for.",
      "Set artboards, keyline grid, stroke and radius per size.",
      "Map icon sizes to type sizes and spacing tokens.",
      "Publish components with accessible-name rules.",
      "Set contribution and review rules; audit labels and targets.",
    ],
  },

  whenToUse: [
    "Any product that uses more than a handful of icons or has several teams adding them.",
    "When icons sit beside text in components that must scale with the type system.",
  ],
  whenNotToUse: [
    "As a replacement for words when the action is uncommon or ambiguous; add a label.",
    "For brand illustrations and spot art, which need a separate system.",
  ],
  advantages: [
    "Icons read as one family and support the design language.",
    "Sizes and colours follow type, spacing and themes automatically.",
    "Accessibility rules are built into the component once.",
  ],
  limitations: [
    "Drawing and maintaining a custom set is costly.",
    "Icons alone are often misunderstood; systems cannot fix ambiguous metaphors.",
    "Optical sizes multiply the drawing work.",
  ],
  misconceptions: [
    {
      myth: "Icons are universal, so they don't need labels.",
      reality:
        "Only a few icons are widely recognised; most need text. A system decides which icons may stand alone and requires an accessible name in every case.",
    },
    {
      myth: "Scaling one SVG gives correct icons at every size.",
      reality:
        "Lines thin and blur at small sizes; sets draw per-size masters or use symbols designed to match type weights {{src:apple-sf-symbols}}.",
    },
  ],

  relations: [
    { target: "signifiers", type: "derived-from", note: "Icons are signifiers; the system keeps them consistent." },
    { target: "typography-scales", type: "complementary-to", note: "Icon sizes pair with text sizes." },
    { target: "spacing-scales", type: "applied-in", note: "Icon gaps and target padding use spacing tokens." },
    { target: "colour-systems", type: "applied-in", note: "Icons inherit text and status colour roles." },
    { target: "design-language", type: "derived-from", note: "Stroke, corner and metaphor express the design language." },
    { target: "semantic-tokens", type: "applied-in", note: "Icon size and gap tokens." },
  ],

  practice: {
    dos: [
      { text: "Draw icons on shared artboards and a keyline grid with fixed stroke weight per size.", why: "Shared construction makes the set read as one family {{src:carbon-icons}}.", kind: "system" },
      { text: "Give every icon button an accessible name; hide decorative icons.", why: "WCAG 2.2 SC 1.1.1 and 4.1.2 (A) {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Pad small icons to at least a 24 × 24 px target.", why: "SC 2.5.8 (AA) {{src:w3c-wcag-22}}; Carbon asks for 44 px touch targets {{src:carbon-icons}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't reuse one glyph for two concepts.", why: "People learn an icon's meaning from repetition; double meanings break it.", kind: "system" },
      { text: "Don't scale one drawing to every size.", why: "Small sizes need adjusted strokes; symbol systems align weights with type {{src:apple-sf-symbols}}.", kind: "industry" },
      { text: "Don't hard-code icon colours.", why: "Icons should inherit text and status roles so themes apply; meaningful icons need 3:1 [SC 1.4.11, AA] {{src:w3c-wcag-22}}.", kind: "system" },
    ],
    examples: [
      {
        title: "Icon component: size tokens, currentColor and accessible names",
        language: "ts",
        code: `// Illustrative React component
const SIZE = { sm: 16, md: 20, lg: 24 } as const;   // icon.size.* tokens

type IconProps = { name: IconName; size?: keyof typeof SIZE } & (
  | { label: string; decorative?: false }   // meaningful: announced
  | { label?: never; decorative: true }     // decorative: hidden
);

export function Icon({ name, size = "sm", label, decorative }: IconProps) {
  const px = SIZE[size];
  return (
    <svg width={px} height={px} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={1.5}
         role={decorative ? undefined : "img"}
         aria-hidden={decorative || undefined}
         aria-label={decorative ? undefined : label}>
      <use href={\`/icons.svg#\${name}\`} />
    </svg>
  );
}

// Icon button: 24px+ target, name from visible or hidden text
// <button className="btn-icon" aria-label="Renew loan"><Icon name="calendar-plus" decorative /></button>`,
        caption: "Illustrative. The type forces a choice between a label and decorative use; colour follows the text role.",
      },
      {
        title: "Icon tokens in CSS and Tailwind CSS v4",
        language: "css",
        code: `:root {
  --icon-size-sm: 1rem;      /* 16px, pairs with 14px text */
  --icon-size-md: 1.25rem;   /* 20px, pairs with 16px text */
  --icon-gap: var(--space-100);
  --target-min: 1.5rem;      /* 24px, WCAG 2.2 SC 2.5.8 */
}
.btn-icon { min-inline-size: var(--target-min); min-block-size: var(--target-min);
            display: inline-grid; place-items: center; color: var(--color-text-default); }
@theme inline { --spacing-icon-sm: var(--icon-size-sm); --spacing-icon-md: var(--icon-size-md); }
/* size-icon-sm, size-icon-md utilities */`,
        caption: "Illustrative. Icon sizes are dimension tokens; colour is inherited from text roles.",
      },
    ],
  },

  exercises: [
    {
      id: "icon-systems-ex-audit",
      kind: "assignment",
      level: "beginner",
      title: "Find the strays",
      prompt: ["Collect every icon on three screens of an app. Mark icons with a different stroke, size or style, and any glyph used for two meanings."],
      deliverable: "A sheet of icons with inconsistencies circled and explained.",
      criteria: ["All icons collected", "Style differences named", "Double meanings found"],
    },
    {
      id: "icon-systems-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix an icon toolbar",
      prompt: [
        "Illustrative case. A library app's reader toolbar has four 16 × 16 px icon-only buttons 2 px apart: bookmark, text size, renew (a circular arrow) and share. A screen reader announces them as 'button'. The icons are #949494 on white.",
        "Work through the correction sequence.",
      ],
      deliverable: "Corrected toolbar specification with names, targets, contrast and metaphors.",
      criteria: ["Names added", "Targets fixed", "Contrast computed", "Metaphor conflict resolved"],
      exampleSolution: [
        "1. Symptoms: unnamed buttons; tiny, crowded targets; faint icons; ambiguous renew icon.",
        "2. Impact: screen-reader users cannot use the toolbar; misses on touch; low-vision users cannot see icons.",
        "3. Causes: icon-only buttons without labels; glyph size used as target size; grey chosen by eye.",
        "4. Requirements: names [WCAG 2.2 SC 4.1.2, A]; 24 px targets or spacing [SC 2.5.8, AA]; 3:1 for meaningful icons [SC 1.4.11, AA].",
        "5. Correction: aria-labels ('Bookmark', 'Text size', 'Renew loan', 'Share'); 24 px buttons with 8 px gaps; icon colour #6b6a64 (5.43:1, from 3.03:1); calendar-plus for renew, with a visible label in the overflow menu.",
        "6. Validation: screen-reader pass; target measurement; contrast with the formula.",
        "7. Trade-off: the toolbar is wider; move share into a menu on small screens.",
      ],
    },
    {
      id: "icon-systems-ex-governance",
      kind: "reflection",
      level: "advanced",
      title: "Write the contribution rule",
      prompt: ["Write the process for adding a new icon: when it is justified, how it is drawn and reviewed, how concepts and synonyms are recorded, and how duplicates are prevented."],
      deliverable: "A one-page contribution guide.",
      criteria: ["Justification test", "Construction review", "Catalogue metadata"],
    },
  ],

  quiz: [
    {
      id: "icon-systems-q-family",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What makes a set of icons look like one family?",
      options: [
        { text: "A shared grid, sizes, stroke weight and corner style", correct: true, explanation: "Shared construction rules." },
        { text: "All icons being the same colour only", correct: false, explanation: "Colour alone does not unify shapes." },
        { text: "Coming from many different libraries", correct: false, explanation: "Mixed sources cause inconsistency." },
        { text: "Using the largest possible size", correct: false, explanation: "Size consistency matters, not size alone." },
      ],
      explanation: "Construction rules create a family.",
    },
    {
      id: "icon-systems-q-name",
      kind: "scenario",
      level: "intermediate",
      prompt: "An icon-only 'Search' button is announced as 'button'. What fixes it?",
      options: [
        { text: "Give the button an accessible name such as aria-label=\"Search\" and hide the SVG as decorative", correct: true, explanation: "Buttons need names (SC 4.1.2)." },
        { text: "Add a title attribute to the page", correct: false, explanation: "The page title does not name a button." },
        { text: "Make the icon bigger", correct: false, explanation: "Size does not give a name." },
        { text: "Colour the icon blue", correct: false, explanation: "Colour does not give a name." },
      ],
      explanation: "Every icon button needs a name.",
    },
    {
      id: "icon-systems-q-contrast",
      kind: "formula",
      level: "advanced",
      prompt: "A meaningful icon is #949494 on white (3.03:1). Carbon applies a 4.5:1 threshold to icons. What do WCAG 2.2 and Carbon say?",
      options: [
        { text: "It passes WCAG's 3:1 non-text minimum but fails Carbon's stricter 4.5:1 rule", correct: true, explanation: "SC 1.4.11 asks 3:1; Carbon asks icons to meet the 4.5:1 used for text." },
        { text: "It fails both", correct: false, explanation: "3.03:1 meets 3:1." },
        { text: "It passes both", correct: false, explanation: "It is below 4.5:1." },
        { text: "Icons have no contrast requirement", correct: false, explanation: "Meaningful icons need 3:1." },
      ],
      explanation: "Systems may set stricter rules than WCAG.",
    },
  ],

  flashcards: [
    { id: "icon-systems-fc-define", front: "Icon system", back: "A family of icons built on shared construction rules, one meaning per glyph, size pairing with type, inherited colour and accessible names." },
    { id: "icon-systems-fc-keyline", front: "Keyline grid", back: "Guide shapes inside the artboard that keep differently shaped icons optically the same size." },
    { id: "icon-systems-fc-carbon", front: "Carbon icon sizes", back: "16 px default artboard; 20, 24, 32 also; 16/20 px icons pair with 14/16 px text; 44 px touch targets." },
    { id: "icon-systems-fc-wcag", front: "WCAG 2.2 criteria for icons", back: "1.1.1 Non-text Content (A), 4.1.2 Name, Role, Value (A), 2.5.3 Label in Name (A), 1.4.11 Non-text Contrast (AA), 2.5.8 Target Size (AA)." },
  ],

  references: [
    { source: "carbon-icons", role: "primary", note: "Artboards, pairing with type, targets, contrast." },
    { source: "apple-sf-symbols", role: "primary", note: "Weights and scales aligned with type; rendering modes; licence limits." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.1.1, 1.4.11, 2.5.3, 2.5.8, 4.1.2." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented design-system practice. The value of labels for icon comprehension is practitioner consensus here, not a cited study. Names, contrast and target size are WCAG 2.2 success criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
