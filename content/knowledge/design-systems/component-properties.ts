import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "component-properties",
  slug: "component-properties",
  title: "Component Properties",
  alternateNames: ["Component API", "Props", "Component contract", "Figma component properties", "Polymorphic components"],
  summary:
    "The public contract of a component — the named inputs it accepts, their types and defaults, which are required, and what it promises in return — mirrored between the design tool and code so that both describe the same component.",
  definition:
    "Component properties (props) are the **typed inputs that form a component's public API**: variant choices, content (text, slots), behaviour (callbacks, controlled values) and accessibility information (labels). A good API is **explicit** (every supported input is declared, with a type and default), **minimal** (no input that composition can replace), **consistent** (the same names mean the same thing across components) and **safe** (invalid combinations cannot be expressed). Figma's component properties — boolean, instance swap, text and variant {{src:figma-component-properties}} — are the design-tool half of the same contract.",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["props", "component API", "TypeScript", "discriminated union", "polymorphic", "as prop", "asChild", "slots", "Figma properties", "controlled props"],
  difficulty: "intermediate",
  disciplines: ["Design systems", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Design a minimal, consistent component API with clear defaults.",
    "Pair Figma component properties one-to-one with code props.",
    "Type props so invalid and inaccessible combinations do not compile.",
    "Use polymorphism and slots without breaking semantics or accessible names.",
  ],
  prerequisites: ["variants", "component-architecture"],

  levels: {
    beginner: {
      explanation: [
        "The library app's search field has props called `txt`, `labelText`, `placeholder` (used as the label) and `cb`. Another team's field calls the same things `value`, `label` and `onChange`. Nobody can move between the two without reading the source, and the first field has no real label for screen readers.",
        "A component's **properties** are its controls: the things you can set when you use it, like `label`, `size` or `onChange`. Together they form the component's **API** — its promise of what it accepts and how it behaves. Good props are few, clearly named, typed and the same across components.",
        "Designers use the same idea in Figma: a button's properties might be a text property for the label, a boolean for showing an icon, and a variant property for size. When the names match the code, a design can be built without guesswork.",
      ],
      analogy:
        "An electrical socket: its shape is a contract. Any plug that matches fits, and plugs that would be unsafe simply cannot be inserted. A typed component API works the same way — wrong inputs do not fit.",
      everydayExamples: [
        "A text field that always needs a label.",
        "A button you can switch to 'small' or 'large'.",
        "A dialog that lets you place any buttons in its footer.",
      ],
      vocabulary: [
        { term: "Prop", meaning: "A named input to a component, such as label or size." },
        { term: "API", meaning: "The full set of props a component accepts and what it does with them." },
        { term: "Default", meaning: "The value a prop takes when you do not set it." },
        { term: "Required prop", meaning: "A prop the component cannot work without, such as a label." },
        { term: "Slot", meaning: "A prop that accepts another component, such as an icon or actions." },
      ],
    },
    intermediate: {
      explanation: [
        "**Pair design and code properties.** Figma has four property types: boolean (toggle a layer such as an icon), instance swap (choose which nested component appears), text (editable content) and variant (attributes such as size or state) {{src:figma-component-properties}}. In code they map to a boolean prop, a slot prop accepting a component, a string prop, and an enum prop. A 1:1 mapping — same names, same values, same defaults — makes design review a comparison rather than an interpretation.",
        "**Naming conventions.** Keep one name per concept across the library: `label` for the accessible name, `description` for help text, `value`/`defaultValue`/`onValueChange` for controlled and uncontrolled inputs, `disabled`, `size`. Radix components are uncontrolled by default but can be controlled, and all share a similar API {{src:radix-primitives}}; that consistency is what lets people guess props correctly.",
        "**Controlling prop sprawl.** Each prop is a promise to support it. Signals of sprawl: props that only adjust layout (use composition — see [[component-architecture]]), props that duplicate native attributes, and booleans that conflict (see [[variants]]). Primer offers a deliberate escape hatch — `className` — on the principle 'Assume that people will break the rules, provide safe ways for them to do so' {{src:primer-react-philosophy}}.",
        "**Explicit vs implicit props.** Explicit props are declared in the component's type; implicit ones are native attributes passed through with a rest spread (`...rest`). Pass-through keeps native behaviour (`type`, `form`, `aria-*`) available without re-declaring it, but should not let consumers override attributes the component must control, such as `role`.",
      ],
      howItWorks: [
        "A typed contract moves errors from review and production to the editor: a missing label or an impossible combination fails to compile.",
        "Matching property names in design and code mean that a frame's property panel can be read directly as component code.",
      ],
      implementation: [
        "Write the API before the implementation: name, type, default, required, description for each prop.",
        "Map each Figma property to one code prop with the same name and values.",
        "Require an accessible name for every interactive component: a visible `label`, or an `aria-label` for icon-only controls [WCAG 2.2 SC 4.1.2, A]; when there is visible text, the accessible name must contain it [SC 2.5.3 Label in Name, A] {{src:w3c-wcag-22}}.",
        "Offer controlled and uncontrolled forms with consistent names (`value`, `defaultValue`, `onValueChange`).",
        "Forward refs and spread remaining native props onto the root element; protect props the component must own (`role`, ARIA state).",
        "Document deprecated props and remove them only in a major version {{src:primer-component-status}}.",
      ],
      scenarios: [
        "**Illustrative.** The search field's API is rewritten to `label` (required), `description`, `value`/`defaultValue`/`onValueChange`, `size`. Figma's text property for the label is renamed `label` to match. Placeholders are no longer used as labels.",
        "**Illustrative.** A design review finds a Figma boolean 'Show helper' with no code equivalent. Engineering adds `description` as an optional string, and Figma renames the property to match.",
        "**Design review protocol.** For each component: do Figma properties and code props match one-to-one? Is every prop necessary, or can composition replace it? Is an accessible name required by the types? Are controlled and uncontrolled names consistent with other components?",
      ],
    },
    advanced: {
      explanation: [
        "**Discriminated unions as contracts.** TypeScript narrows unions whose members share a literal-typed property {{src:typescript-narrowing}}. An `IconButton` can be typed as `{ variant: \"icon\"; label: string; children?: never } | { variant: \"text\"; children: string; label?: never }`: an icon-only button without a name, or with both visible text and a different name, does not compile. Exhaustive `switch` statements with a `never` check catch new variants that were not handled {{src:typescript-narrowing}}.",
        "**Polymorphism.** An `as` prop lets a component render a different element (`<Button as=\"a\" href>`); Radix's `asChild` clones the child element instead and merges behaviour onto it {{src:radix-composition}}. Both must keep semantics: Radix states that changing the element makes you responsible for accessibility, and that a trigger must stay focusable and respond to pointer and keyboard events {{src:radix-composition}}. Typed polymorphic props should make element-specific attributes (`href` for links) available only for that element.",
        "**Accessibility contracts.** WAI-ARIA 1.2 defines which states and properties each role supports — for example, `button` supports `aria-pressed` and `aria-expanded` {{src:w3c-wai-aria-12}}. A toggle button's API should therefore expose `pressed` (rendered as `aria-pressed`) and keep its label constant; the APG warns the label must not change when the state changes {{src:w3c-apg-button}}. Props should express *meaning* (`pressed`, `expanded`), and the component should render the ARIA.",
        "**Server boundaries.** In React Server Components, props passed from a Server Component to a Client Component must be serialisable {{src:react-use-client}}. Function props (`onValueChange`) and component slots therefore belong inside client modules; a server-rendered parent should pass data, not callbacks.",
      ],
      evidence: [
        "Component APIs are **documented engineering practice**: Figma's property model, TypeScript's discriminated unions, Radix's composition guidance, React's server–client rules and Primer's lifecycle {{src:figma-component-properties}} {{src:typescript-narrowing}} {{src:radix-composition}} {{src:react-use-client}} {{src:primer-component-status}}. Role–state rules come from WAI-ARIA 1.2, a W3C Recommendation {{src:w3c-wai-aria-12}}; the APG is informative {{src:w3c-apg-button}}. No controlled study of API design and developer error rates was found.",
      ],
      debates: [
        "**`as` or `asChild`?** `as` is concise but hard to type fully; `asChild` composes with any component but relies on prop spreading and ref forwarding {{src:radix-composition}}.",
        "**Escape hatches?** `className` and style overrides keep teams unblocked {{src:primer-react-philosophy}} but weaken consistency; some systems forbid them.",
        "**Native pass-through?** Spreading native attributes keeps components flexible; strict APIs prevent misuse but need more maintenance.",
      ],
      alternativeModels: [
        "**Configuration objects** — one `config` prop holding many options; compact but hard to document and type.",
        "**Headless hooks** — the component returns prop getters (`getButtonProps()`) for consumers' elements; maximal control, more consumer responsibility.",
      ],
    },
  },

  application: {
    summary: ["Component properties apply to every reusable component; they are the contract product teams depend on and the thing breaking changes break."],
    web: ["Typed props with defaults, forwarded refs, native pass-through, and props that express meaning while the component renders ARIA."],
    mobile: ["Native component parameters mirror the same names and required accessibility labels."],
    enterprise: ["API reviews before release; codemods for renamed props in major versions."],
    services: ["Documentation pages list every prop with type, default and accessibility notes."],
    steps: [
      "Draft the API table (name, type, default, required).",
      "Map design-tool properties one-to-one.",
      "Type invalid and inaccessible combinations away.",
      "Implement with ref forwarding and safe pass-through.",
      "Review naming against the rest of the library; version changes.",
    ],
  },

  whenToUse: [
    "When creating or changing any shared component.",
    "When design-tool components and code components must stay aligned.",
  ],
  whenNotToUse: [
    "As the way to express layout variations that composition handles better.",
    "As a mirror of every CSS property: style props for everything turn the API into a stylesheet.",
  ],
  advantages: [
    "Errors caught by the type checker rather than in review.",
    "Design and code read the same way.",
    "Consistent names make the whole library easier to learn.",
  ],
  limitations: [
    "Strict types can be complex and slow to read.",
    "Polymorphic components are hard to type completely.",
    "Every prop is a promise that constrains future change.",
  ],
  misconceptions: [
    {
      myth: "A placeholder can serve as a label prop.",
      reality:
        "Placeholders disappear on input and are not a reliable accessible name; the API should require a label and render it as the control's name [WCAG 2.2 SC 4.1.2] {{src:w3c-wcag-22}}.",
    },
    {
      myth: "Changing the rendered element is a styling choice.",
      reality:
        "It changes semantics and keyboard behaviour; Radix makes the author responsible for keeping it accessible {{src:radix-composition}}.",
    },
  ],

  relations: [
    { target: "variants", type: "related-to", note: "Variant props are one kind of property." },
    { target: "component-architecture", type: "complementary-to", note: "Slots and children are the architecture's public contract." },
    { target: "component-state-management", type: "related-to", note: "Controlled props hand state ownership to the parent." },
    { target: "semantic-tokens", type: "applied-in", note: "Prop values select semantic tokens." },
    { target: "aria", type: "applied-in", note: "Meaningful props render the correct ARIA states." },
    { target: "primitive-tokens", type: "related-to", note: "Never exposed directly as props in a token-based system." },
  ],

  practice: {
    dos: [
      { text: "Map each Figma property (boolean, instance swap, text, variant) to one code prop with the same name, values and default.", why: "Design review becomes a comparison; Figma's four property types have direct code equivalents {{src:figma-component-properties}}.", kind: "system" },
      { text: "Require an accessible name in the types for every interactive component.", why: "WCAG 2.2 SC 4.1.2 (A) and 2.5.3 Label in Name (A) {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Express meaning in props (pressed, expanded) and let the component render ARIA.", why: "Roles support specific states in WAI-ARIA 1.2 {{src:w3c-wai-aria-12}}; the component keeps them correct.", kind: "standard" },
    ],
    donts: [
      { text: "Don't use booleans that can contradict each other or props that only forward to a child.", why: "Invalid states and prop sprawl; use enums and composition instead.", kind: "industry" },
      { text: "Don't let a polymorphic prop render a non-interactive element for an interactive component.", why: "Changing the element makes the author responsible for focus and keyboard behaviour {{src:radix-composition}}.", kind: "standard" },
      { text: "Don't pass functions from Server Components to Client Components.", why: "Props crossing the server–client boundary must be serialisable {{src:react-use-client}}.", kind: "platform" },
    ],
    examples: [
      {
        title: "A typed contract: discriminated union, required names, toggle state and native pass-through",
        language: "ts",
        code: `import { forwardRef, type ButtonHTMLAttributes, type ReactElement } from "react";

type Native = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label" | "aria-pressed" | "role">;

type TextButton = { variant?: "primary" | "secondary"; children: string; label?: never; icon?: ReactElement };
type IconOnly  = { variant: "icon"; label: string; children?: never; icon: ReactElement };   // name required
type Toggle    = { pressed?: boolean };                                                     // meaning, not ARIA

export type ButtonProps = Native & Toggle & (TextButton | IconOnly);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { pressed, variant = "primary", ...rest } = props;
  const isIcon = props.variant === "icon";            // narrows on the discriminant
  return (
    <button
      ref={ref}
      type="button"
      {...stripContract(rest)}
      className={\`btn btn-\${variant}\`}
      aria-label={isIcon ? props.label : undefined}
      aria-pressed={pressed}                          // label stays constant (APG button)
    >
      {props.icon && <span aria-hidden="true">{props.icon}</span>}
      {!isIcon && props.children}
    </button>
  );
});

function stripContract<T extends object>(p: T) {
  const { label, icon, children, ...native } = p as Record<string, unknown>;
  return native;
}

// <Button>Renew</Button>                                    ok
// <Button variant="icon" icon={<Bell />} label="Notifications" />   ok
// <Button variant="icon" icon={<Bell />} />                 ✗ label missing
// <Button variant="icon" label="Bell">Bell</Button>         ✗ children not allowed`,
        caption: "Illustrative. The union makes nameless icon buttons and contradictory content impossible; ARIA is derived from meaning props.",
      },
      {
        title: "Figma ↔ code property map",
        language: "json",
        code: `{
  "component": "Button",
  "properties": [
    { "figma": "Label (text)",          "code": "children: string",                     "default": "Button" },
    { "figma": "Variant (variant)",     "code": "variant: 'primary' | 'secondary' | 'icon'", "default": "primary" },
    { "figma": "Show icon (boolean)",   "code": "icon?: ReactElement",                  "default": false },
    { "figma": "Icon (instance swap)",  "code": "icon: ReactElement",                   "preferred": ["Bell", "Plus", "Calendar"] },
    { "figma": "Pressed (variant)",     "code": "pressed?: boolean → aria-pressed",     "default": false },
    { "figma": "Accessible name (text)", "code": "label: string (required when variant='icon')" }
  ]
}`,
        caption: "Illustrative. One row per property; a review checks that both columns exist and agree.",
      },
    ],
  },

  exercises: [
    {
      id: "component-properties-ex-api",
      kind: "assignment",
      level: "beginner",
      title: "Write an API table",
      prompt: ["For a text field in any app, list the props you would give it: name, type, default, required or not, and one sentence of description each."],
      deliverable: "An API table for one component.",
      criteria: ["Label required", "Consistent names", "Defaults stated"],
    },
    {
      id: "component-properties-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Repair a leaky API",
      prompt: [
        "Illustrative case. The library app's IconButton accepts `as` (any element), `title` as its only name, `isActive` for a toggle, and `onClick` passed from a server-rendered page. Figma calls the toggle 'Selected'. In a toolbar, `as=\"div\"` was used and the button can no longer be reached with Tab.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected contract and test plan.",
      criteria: ["Name required", "Semantics protected", "State mapped to ARIA", "Design–code names aligned", "Server boundary respected"],
      exampleSolution: [
        "1. Symptoms: unreachable button; inconsistent names; unclear toggle state; build error passing functions.",
        "2. Impact: keyboard users cannot use the toolbar; screen readers do not announce pressed state.",
        "3. Causes: unrestricted polymorphism; `title` as name; boolean not mapped to ARIA; function prop from a Server Component.",
        "4. Requirements: keyboard operable [WCAG 2.2 SC 2.1.1, A]; name, role, value [SC 4.1.2, A]; APG toggle button (aria-pressed, constant label).",
        "5. Correction: restrict `as` to `button` and `a`; require `label`; rename `isActive` to `pressed` (rendered as aria-pressed) in code and Figma; move the toolbar into a client module that owns the handler.",
        "6. Validation: type tests for invalid props; keyboard pass; accessibility tree check for pressed state.",
        "7. Trade-off: less freedom with `as`; links and buttons cover the real cases.",
      ],
    },
    {
      id: "component-properties-ex-poly",
      kind: "reflection",
      level: "advanced",
      title: "Type a polymorphic link-button",
      prompt: ["Design types for a component that renders as `button` or `a`, where `href` is required for `a` and forbidden for `button`, and `type` is allowed only for `button`. Explain how you keep the accessible name and keyboard behaviour correct for both."],
      deliverable: "Type definitions and a short rationale.",
      criteria: ["Element-specific props enforced", "Semantics kept", "Name required"],
    },
  ],

  quiz: [
    {
      id: "component-properties-q-figma",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "In Figma, which property type lets you choose which nested component (such as an icon) appears?",
      options: [
        { text: "Instance swap", correct: true, explanation: "It indicates which nested instances can be swapped." },
        { text: "Boolean", correct: false, explanation: "Booleans toggle layer visibility." },
        { text: "Text", correct: false, explanation: "Text properties change text content." },
        { text: "Variant", correct: false, explanation: "Variant properties choose between variants." },
      ],
      explanation: "Instance swap maps to a slot prop in code.",
    },
    {
      id: "component-properties-q-name",
      kind: "scenario",
      level: "intermediate",
      prompt: "An icon-only button has no visible text. What should its API require?",
      options: [
        { text: "An accessible label prop, rendered as the button's name", correct: true, explanation: "Every control needs a name (SC 4.1.2)." },
        { text: "A tooltip only", correct: false, explanation: "A tooltip is not a reliable name." },
        { text: "A larger icon", correct: false, explanation: "Size does not give a name." },
        { text: "Nothing; icons are self-explanatory", correct: false, explanation: "Screen readers need text." },
      ],
      explanation: "Make the name required in the types.",
    },
    {
      id: "component-properties-q-union",
      kind: "critique",
      level: "advanced",
      prompt: "Why type IconButton as `{ variant: \"icon\"; label: string; children?: never } | { variant: \"text\"; children: string; label?: never }`?",
      options: [
        { text: "So a nameless icon button or a button with conflicting text and name does not compile", correct: true, explanation: "The discriminated union rejects invalid combinations." },
        { text: "To make the bundle smaller", correct: false, explanation: "Types are erased at build time." },
        { text: "Because React requires it", correct: false, explanation: "React does not." },
        { text: "To allow any combination", correct: false, explanation: "The opposite." },
      ],
      explanation: "Types enforce the accessibility contract.",
    },
  ],

  flashcards: [
    { id: "component-properties-fc-define", front: "Component properties", back: "The typed public inputs of a component — its API contract." },
    { id: "component-properties-fc-figma", front: "Figma property types and code equivalents", back: "Boolean → boolean prop; instance swap → slot; text → string; variant → enum." },
    { id: "component-properties-fc-controlled", front: "Controlled/uncontrolled prop names", back: "value + onValueChange (controlled), defaultValue (uncontrolled), the same across components." },
    { id: "component-properties-fc-poly", front: "Polymorphic component risk", back: "Changing the rendered element changes semantics and keyboard behaviour; the author must keep it accessible." },
  ],

  references: [
    { source: "figma-component-properties", role: "primary", note: "Property types." },
    { source: "typescript-narrowing", role: "primary", note: "Discriminated unions, never." },
    { source: "radix-composition", role: "primary", note: "asChild and accessibility responsibility." },
    { source: "w3c-wai-aria-12", role: "standard", note: "Roles and supported states." },
    { source: "w3c-apg-button", role: "explanatory", note: "Toggle button label rule." },
    { source: "radix-primitives", role: "explanatory", note: "Consistent, controlled/uncontrolled APIs." },
    { source: "primer-react-philosophy", role: "explanatory", note: "className escape hatch." },
    { source: "primer-component-status", role: "explanatory", note: "Deprecation and major versions." },
    { source: "react-use-client", role: "explanatory", note: "Serialisable props across the boundary." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 2.1.1, 2.5.3, 4.1.2." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Documented engineering practice and tool documentation; role–state rules from the WAI-ARIA 1.2 Recommendation; informative APG guidance. No controlled study of API design was found. Names and keyboard operability are WCAG 2.2 success criteria.",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
