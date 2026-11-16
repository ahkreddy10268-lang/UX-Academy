import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "interaction-states",
  slug: "interaction-states",
  title: "Interaction States",
  alternateNames: ["UI states", "Component states", "Hover, focus and pressed states", "State styles"],
  summary:
    "An interface element is always in some state — resting, hovered, focused, pressed, selected, disabled, read-only, busy or invalid. Each state it actually has needs a look, a behaviour and, where it matters, a value assistive technology can read, so people can tell what the element is doing and what it will do next.",
  definition:
    "WCAG defines a **state** as a dynamic property of a user interface component that may change in response to user action or automated processes; states do not change what the component *is*, and its examples are focus, hover, select, press, check, visited/unvisited and expand/collapse {{src:w3c-wcag-22}}. **Interaction states** are the set of such conditions one element can be in, each expressed in three ways: **visually** (what it looks like), **behaviourally** (what input does in that state) and **semantically** (what the browser and assistive technologies report). It helps to separate three groups by how the states behave — a working distinction, not a strict rule: **transient interaction and navigation states** that come and go with input (hover and pressed from a pointer or key; focus, which can arrive by keyboard, by pointer or from script), **persistent value and selection states** that last until changed (selected, checked, expanded, on, current — usually set by the person, but an application can set them initially or update them), and **system-controlled conditions** (disabled, read-only, busy, invalid). Which states a component has, how it moves between them and who owns them is modelled in [[component-state-management]]; how a whole process reports loading, empty and error outcomes is covered by [[loading-states]], [[empty-states]] and [[error-states]].",
  primaryType: "concept",
  secondaryTypes: [],
  domain: "interaction",
  subcategory: "patterns",
  tags: ["states", "hover", "focus", "focus-visible", "pressed", "active", "selected", "disabled", "busy", "invalid", "aria-pressed", "non-text contrast", "state layers"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "UI design", "Front-end engineering", "Accessibility", "Design systems"],
  learningObjectives: [
    "Define an interaction state and tell transient interaction and navigation states, persistent value and selection states, and system-controlled conditions apart.",
    "Specify how a component looks, behaves and is exposed to assistive technology in each state it actually has.",
    "Distinguish pairs that are often confused: focus and focus-visible, pressed (momentary) and pressed (toggled), selected and current, disabled and read-only.",
    "Recognise which states can combine and which combinations should never be shown.",
    "Apply the WCAG 2.2 requirements on focus visibility, non-text contrast, use of colour and content on hover or focus, including their exceptions and levels.",
  ],
  prerequisites: ["signifiers", "feedback-principle"],

  levels: {
    beginner: {
      explanation: [
        "Every button, link and field changes appearance as you use it. Move the pointer over a button and it may tint; press Tab and a ring appears around it; hold the mouse down and it looks pushed in; choose a filter and it stays highlighted; submit a form and the button says 'Saving…'. Each of these is a **state**: the same element, in a different situation, telling you something different.",
        "States answer the questions people ask without noticing: *Can I use this? Is it what I am about to use? Did it react? Is it on or off? Is it still working? Did something go wrong?* When a state is missing or unclear, people press twice, lose their place when using the keyboard, or cannot tell whether a setting is on.",
        "Not every element needs every state. A link needs a visible focus state but no 'selected' state; a toggle needs on and off; a 'Save' button may need a busy state; a static label needs none. The work is choosing the states an element really has, and making each one clear.",
        "Two states are easy to mix up. A **disabled** field cannot be used at all right now; a **read-only** field shows a value you cannot change but can still reach, read and copy — an order number, for example.",
      ],
      analogy:
        "A lift call button lights up when you press it and stays lit until the lift arrives. The brief push is one state, the light that stays on is another, and the light going out is the system telling you it is done. Because the light stays on, nobody needs to press again — which is exactly what a 'Saving…' state does for a form.",
      everydayExamples: [
        "A button that darkens slightly while you hold it down.",
        "A focus ring that shows which link the Tab key has reached.",
        "A 'Bold' button in a text editor that stays highlighted while bold is on.",
        "A 'Pay' button that reads 'Processing…' and ignores further presses.",
        "A form field with a red border, an icon and a message after an invalid entry.",
      ],
      vocabulary: [
        { term: "State", meaning: "A changeable condition of an interface element, such as focused, selected or disabled, that does not change what the element is." },
        { term: "Hover", meaning: "A pointer is over the element. Keyboards never produce it, and on touch screens it is unreliable." },
        { term: "Focus", meaning: "The element that receives keyboard input. Focus moves with the Tab key, with a click or tap, or by script." },
        { term: "Focus indicator", meaning: "The visible mark, usually a ring, that shows which element has focus." },
        { term: "Pressed (active)", meaning: "Transient: only while the pointer or key is held down on the element." },
        { term: "Selected / on", meaning: "A value that lasts until it is changed, such as a chosen tab or a toggled setting — usually set by the person, sometimes by the application (a default tab, a restored preference)." },
        { term: "Disabled", meaning: "The element is shown but cannot be used at the moment." },
        { term: "Read-only", meaning: "The value is shown and can be reached and copied, but the person cannot edit it." },
      ],
    },
    intermediate: {
      explanation: [
        "**Transient interaction states.** CSS names them user-action pseudo-classes: `:hover` applies while a pointing device designates an element without necessarily activating it, `:active` while the element is being activated, and `:focus` while it has focus {{src:w3c-selectors-3}}; the HTML standard defines exactly when each matches for HTML elements {{src:whatwg-html}}. They are **not mutually exclusive** — an element can be hovered, focused and pressed at once {{src:w3c-selectors-3}}. A device that cannot detect hovering, such as a pen that does not detect it, never produces hover {{src:w3c-selectors-4}}, keyboards never do, and touch screens give no reliable hover — so hover can add information but should never be the only way to get it.",
        "**Focus is a navigation state, and visible focus is a separate decision.** Focus can arrive by Tab, by a click or tap, or from script, and an element can have focus without a ring being drawn. The Selectors Level 4 working draft adds `:focus-visible`, which matches when the browser decides to indicate focus; the heuristics are the browser's own. Its non-normative starting points: always indicate focus if the person has asked to see it; indicate it for elements that take keyboard input, such as text fields, and after keyboard use; usually not after a pointer interaction with an element that does not take keyboard input, such as clicking a button; when script moves focus, follow whether the previous element showed it; and show it on an element that receives focus automatically when it appears, such as a button in a newly opened dialog {{src:w3c-selectors-4}}. So a click often leaves no ring on a button, but that is not guaranteed. What WCAG 2.2 requires, at Level AA, is SC 2.4.7: any keyboard-operable interface has a mode in which the focus indicator is visible {{src:w3c-wcag-22}}.",
        "**Persistent value and selection states.** They last until changed — usually by the person, but an application may set the initial value or update it: a default tab, a restored preference, `aria-current` on the page that was just loaded. WAI-ARIA keeps *states*, whose values change often through interaction (such as `aria-checked`), conceptually distinct from *properties*, which change less often (such as `aria-labelledby`) {{src:w3c-wai-aria-12}}. The value states have precise meanings: `aria-pressed` is a toggle button's on/off value, changed by a full press-and-release; `aria-checked` belongs to checkboxes, radios and switches; `aria-selected` to selection in tabs, lists and grids; `aria-expanded` says whether a controlled section is shown; `aria-current` marks the current item in a set, such as the current page {{src:w3c-wai-aria-12}}.",
        "**Two meanings of 'pressed'.** The momentary `:active` state lasts only while the pointer or key is down — for example, between pressing and releasing the mouse button {{src:w3c-selectors-3}}, or between keydown and keyup when Space pushes a button {{src:whatwg-html}}; a toggle's `aria-pressed=\"true\"` lasts until the person presses again {{src:w3c-wai-aria-12}}. Designs that use the same visual for both make a toggle look stuck mid-press.",
        "**System-controlled conditions.** Disabled, read-only, busy and invalid are set by the product, not by the pointer. `:disabled` and `:checked` are standard UI-element state selectors {{src:w3c-selectors-3}}. `aria-invalid` says a value does not match the expected format — and should not be set on an empty required field before the person has tried to submit {{src:w3c-wai-aria-12}}. `aria-busy` means a region is being modified and assistive technologies *may* wait until it finishes before reporting changes {{src:w3c-wai-aria-12}}; it is not a way to announce 'loading', which needs a status message ([[loading-states]]).",
        "**Disabled and read-only are different conditions.** In HTML, a control with the `disabled` attribute — a button, input, select, textarea or form-associated custom element, or any of them inside a disabled `fieldset` (except in its first `legend`) — cannot be focused, does not receive click events, is left out of constraint validation and is **not submitted** with its form; script can still change its value {{src:whatwg-html}}. The `readonly` attribute only stops the person editing: the control is still focusable, still functions and **is submitted**, though it is also left out of validation. HTML lets `readonly` apply only to text-like controls — text, search, telephone, URL, email, password, date and time, and number inputs, and `textarea` — because for other controls, such as checkboxes and buttons, there is no useful difference between read-only and disabled {{src:whatwg-html}}. Use read-only for a value people need to see, reach, copy and send, such as an order number; use disabled when the control does not apply at the moment.",
        "**ARIA describes; it does not implement.** `aria-disabled=\"true\"` tells assistive technologies that an element is perceivable but not editable or otherwise operable; WAI-ARIA notes that it works together with 'proper scripting', asks authors to change the appearance too, and allows it only on certain roles (it is being deprecated as a global state in 1.2) {{src:w3c-wai-aria-12}}. It does not block clicks or key presses, take the element out of the focus order or leave its value out of a form — script has to do whatever is needed. `aria-readonly=\"true\"`, a property rather than a state, says the value cannot be changed while the element stays operable, and authors should not restrict navigation to it {{src:w3c-wai-aria-12}}; on a custom widget, script still has to ignore edits. Neither attribute says **why**: the reason must be written in visible text and associated with the control ([[constraints]]).",
      ],
      howItWorks: [
        "**Visual.** Each state changes something people can see — a fill, a border, an outline, a label, an icon. Design systems often add a semi-transparent layer for hover, focus, press and drag; Material 3 uses one state layer at a time, at a fixed opacity per state, in the colour of the element's content {{src:m3-states}}.",
        "**Behavioural.** Each state decides what input does: a busy submit button ignores repeat presses while a 'Cancel' it offers keeps working, a disabled control does not run its action, a read-only field can be focused and copied but not edited, an expanded menu closes on Escape. A state that looks different but behaves the same — or behaves differently but looks the same — misleads.",
        "**Semantic.** Each state that matters is exposed to assistive technologies: native elements do this themselves; custom ones set ARIA states. WCAG 2.2 SC 4.1.2 requires the name and role of every component to be programmatically determinable, states and values that the person can set to be programmatically settable, and changes to be notified to user agents and assistive technologies {{src:w3c-wcag-22}}.",
        "**Combined.** States stack: a selected chip can also be hovered and focused. Material 3 lets hover combine with focused, selected or pressed, and allows only one hovered element at a time {{src:m3-states}}. Each combination has to stay legible, which is why focus usually sits *outside* the element while hover and selection change its inside.",
      ],
      implementation: [
        "List, per component, the states it really has — and leave out the rest. A state table (rows: states; columns: visual, behaviour, ARIA, announcement) catches gaps before build.",
        "Keep the focus indicator. Never remove an outline without replacing it. You may style it with `:focus-visible` to reduce rings after pointer clicks, but the browser decides when that matches, and it will show focus when the person has asked for it [WCAG 2.2 SC 2.4.7, AA] {{src:w3c-wcag-22}} {{src:w3c-selectors-4}}.",
        "Do not use colour as the only visual means of conveying a state: add a tick for selected, an icon and a message for invalid, a changed label for busy [SC 1.4.1, A] {{src:w3c-wcag-22}}.",
        "Separately, give the visual information needed to identify a component and its state at least 3:1 contrast against adjacent colours — a checkbox's tick, a focus ring, a selected tab's underline [SC 1.4.11, AA]. The criterion exempts inactive components and components whose appearance is set by the browser and not modified by the author {{src:w3c-wcag-22}}. A colour change between two states of one component that never appear side by side does not itself need 3:1, and author hover treatments are supplemental, so they do not need 3:1 — but a hover style must not reduce the contrast of the component or of its focus or selection indicators {{src:w3c-understanding-non-text-contrast}}.",
        "Expose value states with the right attribute and keep the label stable: a 'Mute' toggle keeps the label 'Mute' and changes `aria-pressed`, rather than switching its label to 'Unmute' {{src:w3c-apg-button}}.",
        "Do not hide information behind hover alone. Where hover or focus reveals extra content, such as a custom tooltip, it must be hoverable and persistent, and dismissible without moving the pointer or focus — unless it reports an input error or does not obscure or replace other content; content whose presentation is controlled by the browser, such as a `title` tooltip, is excepted [SC 1.4.13, AA] {{src:w3c-wcag-22}}. Touch users need another way to reach it.",
        "Activate on release where you can, so sliding off before releasing cancels the press — one of the ways to meet WCAG 2.2 SC 2.5.2 Pointer Cancellation {{src:w3c-wcag-22}}.",
        "Choose between native `disabled`, `aria-disabled` and read-only knowingly: native disabled removes focus and submission, `aria-disabled` keeps the element focusable but needs script to block its action, read-only keeps focus and submission but blocks editing. In every case, give the reason in visible text associated with the control ([[constraints]]).",
      ],
      scenarios: [
        "**Illustrative.** A filter bar's chips turn darker on hover and darker still when selected. In testing, people cannot tell a hovered chip from a selected one. Adding a tick to selected chips and exposing `aria-pressed` makes selection readable without the pointer, by colour-blind users and by screen readers.",
        "**Illustrative.** A design team removes focus outlines because they 'look messy' after clicks. Keyboard users then lose their place. Restoring a 2 px ring on `:focus-visible` keeps clicks clean while keeping keyboard focus visible.",
        "**State review protocol.** For each component: Which states does it have, and why? What does each look like, do and expose? Which combinations can occur, and are they all legible? Which state is indicated by colour alone? Does hover carry anything touch users need?",
      ],
    },
    advanced: {
      explanation: [
        "**States are dimensions, not a list.** Treating 'default, hover, focus, pressed, selected, disabled' as one flat list hides that they arise in different ways and combine. A toggle button has at least a pointer dimension (rest, hover, pressed), a focus dimension (unfocused, focused, focus shown — reached by keyboard, pointer or script), a value (off, on, set by the person or initialised by the application) and availability (enabled, disabled). Specifying each dimension separately, and then the few combinations that need special treatment, is clearer than drawing every combination. Turning those dimensions into a model with events and ownership is the subject of [[component-state-management]].",
        "**Combinations that mislead.** Keep apart two questions: *can people find and understand the control?* and *can it run its action?* A control that is unavailable must not run its action. Whether it can still be focused or show a hover or focus style depends on the mechanism and the design system: a natively disabled control cannot be focused {{src:whatwg-html}}; an `aria-disabled` one can stay focusable, so focus or a tooltip can help people find it and learn why it is unavailable {{src:w3c-wai-aria-12}}; Material 3 gives disabled components no focus and no hover or other state layers {{src:m3-states}}. What misleads is a disabled control styled as if it would work. A busy submit button should not start a second submission, but an action it explicitly offers, such as Cancel, must stay available and look different from the busy state ([[loading-states]]). 'Selected' and 'pressed' sharing one visual make a toggle look permanently held down. And a required field should not be marked invalid merely because nothing has been entered before the person tries to submit {{src:w3c-wai-aria-12}}.",
        "**Focus beyond 'visible'.** WCAG 2.2 added SC 2.4.11 Focus Not Obscured (Minimum), at Level AA: a focused component must not be entirely hidden by author-created content such as a sticky footer. SC 2.4.13 Focus Appearance is Level **AAA**, not a AA requirement: where the indicator is visible, an area of it must be at least as large as a 2 CSS px thick perimeter of the unfocused component and have 3:1 contrast between the same pixels in the focused and unfocused states, with exceptions where the browser sets the indicator {{src:w3c-wcag-22}}. Focus is also where keyboard state lives in composite widgets, which is why focus handling is its own design problem ([[focus-management]]).",
        "**Selected, current, checked and pressed are not interchangeable.** ARIA gives each a different meaning: `aria-selected` for choices within a selection widget, `aria-current` for 'you are here' in a set of links or steps, `aria-checked` for check and radio controls, `aria-pressed` for toggle buttons {{src:w3c-wai-aria-12}}. Choosing by appearance instead of meaning gives screen-reader users the wrong account of the interface.",
        "**Design systems encode states as tokens.** A system can give each state its own colour values or derive them, as Material 3 does, with one overlay colour at fixed opacities per state {{src:m3-states}}. Either way the system, not each product team, decides how hover, focus and selection stay legible together — and tests the combinations once.",
      ],
      evidence: [
        "The definitions and requirements in this entry are normative W3C text: WCAG 2.2's definition of state and its success criteria {{src:w3c-wcag-22}}, WAI-ARIA 1.2's states {{src:w3c-wai-aria-12}}, and the UI-state selectors of Selectors Level 3, a Recommendation {{src:w3c-selectors-3}}, with HTML defining when they match {{src:whatwg-html}}. `:focus-visible` and its heuristics come from Selectors Level 4, a Working Draft that describes itself as a work in progress {{src:w3c-selectors-4}}.",
        "The informative Understanding document for SC 1.4.11 sets out how contrast applies to states — which indicators need 3:1, why hover treatments are supplemental, and why inactive components are exempt — and says that exempting inactive controls followed the difficulty of finding a one-size-fits-all way to show them {{src:w3c-understanding-non-text-contrast}}.",
        "Visual conventions beyond those requirements — state layers, opacity values, which components inherit which states — are one design system's guidance {{src:m3-states}}, not a standard and not an experimental finding. This entry does not rely on controlled studies comparing state treatments.",
      ],
      debates: [
        "**Can a disabled control receive focus?** Native HTML says no {{src:whatwg-html}} and Material 3 agrees for its components {{src:m3-states}}; WAI-ARIA says disabled elements *might* not receive focus and lets an `aria-disabled` element stay focusable {{src:w3c-wai-aria-12}}, so keyboard and screen-reader users can discover that it exists and that it is unavailable. The attribute does not tell them why: the reason must be visible and associated with the control. The choice depends on whether people need to find the unavailable action ([[constraints]]).",
        "**Show disabled or hide?** Material 3 advises that a floating action button whose action is unavailable should not appear at all {{src:m3-states}}, while other guidance keeps unavailable actions visible so people learn they exist. Hiding reduces clutter; showing keeps the interface stable and discoverable.",
        "**When should focus be visible?** `:focus-visible` lets browsers show focus when their heuristics judge it helpful {{src:w3c-selectors-4}}; the same draft says a person's preference to always see focus should win over those heuristics, and some teams show focus after every interaction so that it never disappears unexpectedly. WCAG 2.4.7 requires that a mode with a visible indicator exists {{src:w3c-wcag-22}}.",
      ],
      alternativeModels: [
        "**A flat list of states** (default, hover, focus, pressed, disabled) is how many design files organise states; it is easy to start with but hides combinations and how each state arises.",
        "**Concurrent dimensions or statecharts** model each dimension of state separately and combine them, which scales better for complex components ([[component-state-management]]).",
      ],
    },
  },

  origin: {
    contributors: ["W3C CSS Working Group", "W3C Accessibility Guidelines Working Group", "W3C ARIA Working Group", "WHATWG"],
    period: "Selectors Level 3 (Recommendation, 2018); WAI-ARIA 1.2 (Recommendation, 2023); WCAG 2.2 (2023); Selectors Level 4 (Working Draft, 2026)",
    problem: "Interfaces need to tell people what an element is doing and what it will do, to sighted users through appearance and to assistive-technology users through exposed values — and these have to stay consistent with each other.",
    narrative: [
      "No single author defined interaction states. Their vocabulary grew in web standards: CSS selectors for user-action and UI-element states {{src:w3c-selectors-3}}, ARIA states for assistive technologies {{src:w3c-wai-aria-12}}, and WCAG requirements for making states perceivable {{src:w3c-wcag-22}}.",
      "Design systems then turned them into reusable visual rules, such as Material 3's state layers {{src:m3-states}}.",
    ],
  },

  application: {
    summary: ["Interaction states apply to every interactive element — buttons, links, fields, toggles, tabs, chips, list items, menus — and to regions whose content changes."],
    web: [
      "Use native elements so states come for free (`:disabled`, `:checked`, focusability); style transient states with `:hover`, `:active` and `:focus-visible`; expose custom value states with ARIA; check focus visibility, state contrast and hover content against WCAG 2.2.",
    ],
    mobile: [
      "Touch gives no reliable hover; pressed and focused states still matter (focus for external keyboards and switch access). Make pressed feedback large enough to see around a fingertip.",
    ],
    enterprise: [
      "Dense tools combine states heavily — a row can be selected, hovered, focused and flagged invalid at once — so specify the combinations, not just the single states.",
    ],
    services: [
      "Across channels, a state the person sets (a saved preference, a selected plan) should read the same everywhere it appears.",
    ],
    steps: [
      "List each component's states in three groups: transient (pointer, focus), persistent values and selections, and system-controlled conditions (availability, editability, process, validity).",
      "Specify the visual cue, behaviour and exposed value of each, with at least one non-colour cue where meaning depends on it.",
      "Specify the combinations that occur and the ones that must not.",
      "Check focus visibility, non-text contrast, use of colour and hover content against WCAG 2.2.",
      "Test with keyboard only, a screen reader, touch, and a forced-colours or high-contrast mode.",
    ],
  },

  whenToUse: [
    "When designing or reviewing any interactive component, before visual polish.",
    "When building a design system's component specifications and tokens.",
    "When an accessibility audit reports missing focus indicators, colour-only states or unexposed values.",
  ],
  whenNotToUse: [
    "As a checklist that forces every state onto every element — static content and many simple links need few states.",
    "As a substitute for modelling transitions and ownership in complex components ([[component-state-management]]).",
  ],
  advantages: [
    "Tells people what an element is doing and will do, which prevents double actions and lost focus.",
    "Gives sighted and assistive-technology users the same account of the interface.",
    "Gives teams a shared vocabulary for specifications, tokens and reviews.",
  ],
  limitations: [
    "State names vary between platforms and design systems; the same word ('active', 'pressed', 'selected') can mean different things.",
    "Standards set minimums (visibility, contrast, exposure), not what makes a state easy to notice; much state design rests on convention rather than tested evidence.",
    "Hover cannot be relied on: keyboards never produce it and touch screens give no reliable hover.",
    "Disabled states are exempt from contrast requirements, so they can be hard to perceive for some people.",
  ],
  misconceptions: [
    {
      myth: "Every component needs default, hover, focus, pressed, disabled, loading and error states.",
      reality:
        "Components need the states their behaviour produces. WCAG's examples of states include focus, hover, select, press, check and expand/collapse {{src:w3c-wcag-22}}, but a link has no 'checked', and a static label has no states at all. Specify what exists; leave out the rest.",
    },
    {
      myth: "Removing the focus outline is fine if the page looks cleaner.",
      reality:
        "Keyboard users need to see where focus is; WCAG 2.2 SC 2.4.7 requires a mode where the indicator is visible {{src:w3c-wcag-22}}. `:focus-visible` can limit rings to when they help, but the indicator must stay {{src:w3c-selectors-4}}.",
    },
    {
      myth: "A toggle's pressed state and the momentary pressed state are the same thing.",
      reality:
        "`:active` lasts only while the pointer or key is down {{src:w3c-selectors-3}} {{src:whatwg-html}}; `aria-pressed` is a persistent on/off value changed by a full press-and-release {{src:w3c-wai-aria-12}}. They need different visuals.",
    },
    {
      myth: "`aria-disabled=\"true\"` disables a control.",
      reality:
        "It exposes that the element is unavailable; WAI-ARIA describes it working together with 'proper scripting' {{src:w3c-wai-aria-12}}. It does not block clicks or keys, remove focus or keep the value out of a form submission, and it does not say why the control is unavailable — provide that reason in visible, associated text.",
    },
    {
      myth: "Disabled and read-only are two ways of saying 'can't change it'.",
      reality:
        "A disabled control cannot be focused or used and is not submitted; a read-only control can be focused, read and copied and is submitted, but cannot be edited — and `readonly` applies only to text-like controls {{src:whatwg-html}}.",
    },
    {
      myth: "`aria-busy` tells screen-reader users that something is loading.",
      reality:
        "It says a region is being modified so assistive technologies *may* wait before reporting changes {{src:w3c-wai-aria-12}}. Tell people that something is loading, and when it is done, with a status message ([[loading-states]]).",
    },
  ],

  relations: [
    { target: "interaction-design-discipline", type: "applied-in", note: "Specifying each element's states, and how each looks, behaves and is exposed, is part of interaction design." },
    { target: "feedback-principle", type: "related-to", note: "Pressed, busy, success and error states are how components give feedback about an action." },
    { target: "visibility-of-system-status", type: "related-to", note: "Busy, success and error states make a component's status visible." },
    { target: "component-state-management", type: "related-to", note: "Boundary: this entry covers what each state means and how it is shown and exposed; component state management models states, transitions and ownership." },
    { target: "variants", type: "contrasts-with", note: "States are caused by interaction or by the system; variants are chosen by the designer." },
    { target: "constraints", type: "related-to", note: "A disabled state is a constraint made visible; how to disable and explain it is part of constraint design." },
    { target: "loading-states", type: "related-to", note: "Busy is the component-level state; loading states cover how a whole view reports waiting." },
    { target: "error-states", type: "related-to", note: "Invalid is the component-level state; error states cover how failures are reported and recovered." },
    { target: "colour-contrast-ratio", type: "measured-by", note: "WCAG 1.4.11 asks the parts that identify a state to contrast at least 3:1 with adjacent colours." },
    { target: "focus-management", type: "related-to", note: "Focus is a state; deciding where it goes and how it moves is focus management." },
    { target: "state-transitions", type: "related-to", note: "How an element moves from one state to another over time." },
  ],

  practice: {
    dos: [
      { text: "Keep a visible focus indicator on every keyboard-operable element; restyle it, never remove it.", why: "WCAG 2.2 SC 2.4.7 requires a mode in which the focus indicator is visible {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Give states that carry meaning a cue other than colour.", why: "SC 1.4.1 (Level A) does not allow colour to be the only visual means of conveying information {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Make the visual information that identifies a component and its state contrast at least 3:1 with adjacent colours.", why: "SC 1.4.11 (Level AA) requires it, except for inactive components and appearance set by the browser; supplemental hover styles are not themselves required to reach 3:1 {{src:w3c-wcag-22}} {{src:w3c-understanding-non-text-contrast}}.", kind: "standard" },
      { text: "Use `readonly` for values people must see, copy and submit but not edit; use `disabled` when the control does not apply right now.", why: "Read-only controls stay focusable and are submitted; disabled controls are neither focusable nor submitted {{src:whatwg-html}}.", kind: "standard" },
      { text: "Expose value states with the attribute that matches their meaning, and keep the label stable.", why: "aria-pressed, aria-checked, aria-selected, aria-expanded and aria-current mean different things {{src:w3c-wai-aria-12}}; a toggle's label should not change when its state does {{src:w3c-apg-button}}.", kind: "standard" },
      { text: "Specify the combinations that occur, especially hover, focus and selection together.", why: "States are not mutually exclusive {{src:w3c-selectors-3}}, and a hover tint must not erase the focus or selection indicator {{src:w3c-understanding-non-text-contrast}}.", kind: "system" },
    ],
    donts: [
      { text: "Don't put information people need only in a hover state.", why: "Devices that cannot detect hover never match it {{src:w3c-selectors-4}}; content shown on hover must also follow SC 1.4.13 {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't let an unavailable control run its action, or style it as if it would work.", why: "Native disabled controls do not receive click events {{src:whatwg-html}}; `aria-disabled` needs script to block activation {{src:w3c-wai-aria-12}}. A focus ring or a tooltip that explains why is fine; Material 3 chooses to give disabled components no state layers {{src:m3-states}}.", kind: "standard" },
      { text: "Don't let a busy submit button start a second submission — but don't disable an offered Cancel.", why: "The busy state exists to stop accidental repeats; an explicitly offered way to stop the work must stay usable and look distinct ([[loading-states]]).", kind: "industry" },
      { text: "Don't rely on `aria-disabled` or `aria-readonly` to change behaviour or to explain it.", why: "They expose state to assistive technologies; script implements the behaviour, and neither attribute gives a reason {{src:w3c-wai-aria-12}}.", kind: "standard" },
      { text: "Don't mark a required field invalid before the person has tried to submit.", why: "WAI-ARIA advises against setting aria-invalid on required fields simply because nothing has been entered {{src:w3c-wai-aria-12}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "A toggle button's states, one dimension at a time",
        language: "css",
        code: `/* <button type="button" class="toggle" aria-pressed="false">
     <svg class="tick" aria-hidden="true">…</svg> Bold
   </button>                                                     */

.toggle {                                  /* rest */
  background: var(--surface);
  border: 1px solid var(--rule-strong);
  color: var(--ink);
}

/* Pointer: momentary, supplemental; nothing here is the only cue */
.toggle:hover:not(:disabled)  { background: var(--soft); }
.toggle:active:not(:disabled) { background: var(--sunken); }

/* Focus: restyled, never removed */
.toggle:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

/* Value: persistent, set by the person — fill AND a tick */
.toggle .tick { visibility: hidden; }
.toggle[aria-pressed="true"]       { background: var(--accent-wash); border-color: var(--accent); }
.toggle[aria-pressed="true"] .tick { visibility: visible; }

/* Availability (native disabled): no hover or press styling, so it never looks usable */
.toggle:disabled { color: var(--ink-3); border-style: dashed; }`,
        caption: "Each block handles one dimension of state, so they combine without overriding each other: a toggle can be on, hovered and focused at once. The outline sits outside the button, so it stays visible over any fill. Variable names are illustrative tokens.",
      },
      {
        title: "Changing the value, not the label",
        language: "ts",
        code: `// A native <button> handles clicks, Enter and Space with one "click" event.
const bold = document.querySelector<HTMLButtonElement>("#bold");
bold?.addEventListener("click", () => {
  const on = bold.getAttribute("aria-pressed") === "true";
  bold.setAttribute("aria-pressed", String(!on)); // the label stays "Bold"
});`,
        caption: "The label names the action; aria-pressed carries the state, so assistive technologies can report it and the CSS above can draw it. The application may also set the starting value, for example from a saved document.",
      },
      {
        title: "Read-only, disabled and aria-disabled side by side",
        language: "text",
        code: `<!-- Read-only: focusable, copyable, submitted with the form; not editable.
     readonly applies to text-like inputs and textarea only. -->
<label for="order">Order number</label>
<input id="order" name="order" value="A-10482" readonly>

<!-- Native disabled: not focusable, no click events, NOT submitted.
     Here it does not apply until gift wrap is chosen. -->
<label for="msg">Gift message</label>
<textarea id="msg" name="msg" disabled aria-describedby="msg-why"></textarea>
<p id="msg-why">Choose gift wrap to add a message.</p>

<!-- aria-disabled: stays focusable so people can find it and hear why;
     the attribute blocks nothing - the click handler must. -->
<button type="button" aria-disabled="true" aria-describedby="pay-why">Pay</button>
<p id="pay-why">Add a delivery address to pay.</p>`,
        caption: "Three different conditions. The reason for each unavailable control is visible text linked with aria-describedby, because neither disabled nor aria-disabled says why. The aria-disabled button's script must ignore activation while it is set.",
      },
    ],
  },

  exercises: [
    {
      id: "interaction-states-ex-table",
      kind: "assignment",
      level: "beginner",
      title: "Write a state table for one component",
      prompt: [
        "Choose a component from a product you use — a button, a checkbox, a tab or a search field. List every state it has, and for each write what it looks like, what input does, and what a screen reader would be told.",
        "Mark any state you could not find, and any state that is shown by colour alone.",
      ],
      deliverable: "A table with rows for states and columns for visual, behaviour and exposed value, with gaps highlighted.",
      criteria: ["States grouped as transient (pointer, focus), persistent value or selection, or system-controlled", "Each state has a visual, a behaviour and an exposed value, or the gap is noted", "Colour-only states identified"],
    },
    {
      id: "interaction-states-ex-chips",
      kind: "critique",
      level: "intermediate",
      title: "Fix a filter bar whose states collide",
      prompt: [
        "Illustrative case. Filter chips use a light grey fill on hover, a dark grey fill when selected, and no focus style (outlines were removed). Selected chips are not exposed to assistive technology.",
        "Redesign the chips' states so that rest, hover, focus, selected, and selected-while-hovered-and-focused are all distinguishable, accessible and correctly exposed.",
      ],
      deliverable: "A state specification for the chip, with the visual cue, the contrast requirement and the ARIA attribute for each state, and a sketch of the combined state.",
      criteria: ["Focus restored and visible over every fill", "Selected shown by a non-colour cue and exposed with an appropriate attribute", "Hover does not erase focus or selection", "Contrast requirements stated correctly"],
      exampleSolution: [
        "Focus: a 2 px outline outside the chip, offset from it, on `:focus-visible`, so it remains visible over any fill [SC 2.4.7] {{src:w3c-wcag-22}}.",
        "Selected: add a tick before the label so selection is not shown by colour alone [SC 1.4.1], and expose the state — `aria-pressed` if each chip is an independent toggle {{src:w3c-wai-aria-12}}. The tick, and the chip's outline if it is what identifies the chip, need 3:1 against adjacent colours [SC 1.4.11] {{src:w3c-wcag-22}}.",
        "Hover: a light tint is a supplemental cue and does not itself need 3:1, but it must not reduce the contrast of the chip, the tick or the focus ring {{src:w3c-understanding-non-text-contrast}}.",
        "Combined: selected + hovered + focused shows the tick, the selected fill with a slightly stronger tint, and the outside ring — three cues that do not compete for the same pixels.",
      ],
    },
    {
      id: "interaction-states-ex-system",
      kind: "reflection",
      level: "advanced",
      title: "Define state rules for a design system",
      prompt: [
        "Write the state rules a design system should apply to all interactive components: which dimensions exist, how each is drawn (tokens, layers or both), which combinations mislead, how disabled is handled (native or aria-disabled, focusable or not, shown or hidden), and when read-only is used instead.",
        "Justify each rule with the relevant standard or guidance, and say where you are choosing between defensible positions.",
      ],
      deliverable: "A one-page state policy with rationale and the open decisions named.",
      criteria: ["Transient, persistent and system-controlled states separated", "Misleading combinations listed, with discoverability kept apart from the ability to run an action", "Disabled and read-only policy argued with the competing positions", "Standards cited for requirements, guidance cited as guidance"],
    },
  ],

  quiz: [
    {
      id: "interaction-states-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which of these is an interaction state rather than a different kind of component?",
      options: [
        { text: "A checkbox being checked", correct: true, explanation: "Checked is a changeable condition of the same component; WCAG lists 'check' among its examples of states." },
        { text: "A primary button versus a secondary button", correct: false, explanation: "That is a variant chosen by the designer; it does not change through interaction." },
        { text: "A large button versus a small button", correct: false, explanation: "Size is a variant, not a state." },
        { text: "A button versus a link", correct: false, explanation: "These are different roles, not states of one component." },
      ],
      explanation: "States change in response to the person or the system; variants are chosen when the interface is designed.",
    },
    {
      id: "interaction-states-q-focus",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "A designer removes all focus outlines because they appear after mouse clicks. What is the best fix?",
      options: [
        { text: "Style the indicator with :focus-visible so it shows when the browser judges it helpful, such as after keyboard use, and keep it clearly visible", correct: true, explanation: "This keeps keyboard focus visible, as SC 2.4.7 requires. Browsers often skip the ring after a click on a button, but that is their heuristic, not a guarantee — a person's preference to always see focus overrides it." },
        { text: "Leave outlines removed; screen readers announce focus anyway", correct: false, explanation: "Sighted keyboard users rely on seeing focus, and WCAG requires a mode where it is visible." },
        { text: "Show focus only as a colour change of the label", correct: false, explanation: "A subtle colour change may be hard to see and must still meet contrast requirements; it is a weak indicator." },
        { text: "Use hover styles for focus too", correct: false, explanation: "Hover and focus are different states; reusing hover makes them indistinguishable when both occur." },
      ],
      explanation: "Restyle focus; never remove it. :focus-visible comes from the Selectors Level 4 draft, and the browser decides when it matches.",
    },
    {
      id: "interaction-states-q-pressed",
      kind: "scenario",
      level: "intermediate",
      prompt: "A 'Bold' toggle uses the same dark fill for 'being pressed' and for 'bold is on'. Users say it looks stuck. What is wrong?",
      options: [
        { text: "The momentary :active state and the persistent aria-pressed value share one visual, so 'on' looks like a press that never ended", correct: true, explanation: "Give the persistent value its own cue, such as a tick and a tinted fill, and keep the momentary press brief and different." },
        { text: "Toggle buttons should not have an on state", correct: false, explanation: "They need one; ARIA's aria-pressed exists for exactly this." },
        { text: "The label should change to 'Not bold'", correct: false, explanation: "Changing the label confuses the action with its state; keep the label and change aria-pressed." },
        { text: "The fill should be red", correct: false, explanation: "A different colour alone does not separate the two meanings and fails people who cannot see the difference." },
      ],
      explanation: "Keep transient pointer states and persistent value states apart: they need different treatments.",
    },
    {
      id: "interaction-states-q-contrast",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "Under WCAG 2.2 SC 1.4.11, which of these must contrast at least 3:1 with adjacent colours?",
      options: [
        { text: "The tick that shows a checkbox is checked", correct: true, explanation: "Visual information needed to identify a state needs 3:1 against adjacent colours." },
        { text: "A light hover tint on a button", correct: false, explanation: "Author hover treatments are supplemental, so they need not reach 3:1 — but they must not reduce the contrast of other indicators." },
        { text: "A disabled button's border", correct: false, explanation: "Inactive components are exempt from the requirement, as are components whose appearance is set by the browser and not modified by the author." },
        { text: "The colour difference between visited and unvisited links", correct: false, explanation: "A change between states of one component that are not shown side by side is not itself required to reach 3:1." },
      ],
      explanation: "The 3:1 rule targets the visual information needed to identify a component and its state, not every visual change; whether colour is the only cue is a separate question under SC 1.4.1.",
    },
    {
      id: "interaction-states-q-readonly",
      kind: "scenario",
      level: "intermediate",
      prompt: "An order form shows an order number that people must be able to reach, copy and send with the form, but not change. Which native HTML is right?",
      options: [
        { text: "An input with the readonly attribute", correct: true, explanation: "Read-only text controls stay focusable, can be read and copied, and are submitted; only editing is blocked." },
        { text: "An input with the disabled attribute", correct: false, explanation: "A disabled control cannot be focused and is left out of form submission, so the order number would not be sent." },
        { text: "An editable input with aria-readonly=\"true\"", correct: false, explanation: "aria-readonly only states the property to assistive technologies; on a native input, the readonly attribute is what stops editing." },
        { text: "An input with aria-disabled=\"true\"", correct: false, explanation: "aria-disabled exposes unavailability but blocks nothing, and 'unavailable' is the wrong meaning for a value people need." },
      ],
      explanation: "Disabled means 'does not apply now'; read-only means 'here, but not editable'. ARIA attributes describe these conditions; HTML attributes or script implement them.",
    },
  ],

  flashcards: [
    { id: "interaction-states-fc-kinds", front: "Three groups of interaction state", back: "Transient interaction and navigation (hover, pressed; focus by keyboard, pointer or script) · persistent value and selection (selected, checked, expanded, on, current — usually the person's, sometimes set by the app) · system-controlled conditions (disabled, read-only, busy, invalid)." },
    { id: "interaction-states-fc-focus", front: ":focus vs :focus-visible", back: ":focus matches whenever an element has focus. :focus-visible (Selectors 4, draft) matches when the browser's heuristics indicate focus — usually after keyboard use and on text fields, often not after clicking a button, always if the person asks for it. WCAG 2.4.7 (AA) requires a mode with a visible indicator." },
    { id: "interaction-states-fc-pressed", front: "Two meanings of 'pressed'", back: ":active — momentary, while the pointer or key is down. aria-pressed — a toggle's persistent on/off value, changed by a full press-and-release." },
    { id: "interaction-states-fc-contrast", front: "WCAG 1.4.11 and states", back: "AA: 3:1 against adjacent colours for the visual information that identifies a component and its state (tick, focus ring, selected underline). Exempt: inactive components; appearance set by the browser and not modified. Not required: supplemental hover tints, changes between states never shown side by side. Colour-only cues are a separate issue (1.4.1)." },
    { id: "interaction-states-fc-aria", front: "selected · current · checked · pressed", back: "aria-selected: chosen in a selection widget. aria-current: 'you are here' in a set. aria-checked: checkbox, radio, switch. aria-pressed: toggle button." },
    { id: "interaction-states-fc-readonly", front: "disabled vs readonly vs aria-disabled", back: "disabled: not focusable, no clicks, not submitted. readonly (text-like controls only): focusable, copyable, submitted, not editable. aria-disabled: exposes 'unavailable', stays focusable, blocks nothing — script must. None of them says why." },
  ],

  references: [
    { source: "w3c-wcag-22", role: "standard", note: "Definition of state; SC 1.4.1, 1.4.11, 1.4.13, 2.4.7, 2.4.11 (new), 2.4.13 (AAA, new), 2.5.2, 4.1.2." },
    { source: "w3c-wai-aria-12", role: "standard", note: "States vs properties; aria-pressed, aria-checked, aria-selected, aria-expanded, aria-current, aria-busy, aria-invalid, aria-disabled (with scripting; listed roles), aria-readonly (a property)." },
    { source: "w3c-selectors-3", role: "standard", note: "Recommendation: :hover, :active, :focus are not mutually exclusive; UI element states :enabled, :disabled, :checked." },
    { source: "whatwg-html", role: "standard", note: "When :hover, :active, :disabled, :checked and :open match; disabled controls (not focusable, no click events, not submitted) versus readonly (text-like controls only, still submitted)." },
    { source: "w3c-selectors-4", role: "explanatory", note: "Working Draft (2026): :focus-visible and its non-normative heuristics; hover never matches on devices that cannot detect it. Cited as a draft." },
    { source: "w3c-understanding-non-text-contrast", role: "explanatory", note: "How 3:1 applies to state indicators, supplemental hover, and the inactive exemption." },
    { source: "m3-states", role: "explanatory", note: "One design system's state guidance: state layers and opacities, combinations, disabled behaviour." },
    { source: "w3c-apg-button", role: "explanatory", note: "Toggle buttons expose aria-pressed and keep their label when the state changes." },
  ],
  evidence: "official-standard",
  evidenceNote:
    "The definition of a state and the requirements for showing and exposing states are normative W3C text (WCAG 2.2, WAI-ARIA 1.2, Selectors Level 3) and the HTML standard. :focus-visible comes from Selectors Level 4, a Working Draft, and is cited as one. Visual conventions such as state layers and opacity values are design-system guidance (Material 3), not standards or findings, and the entry does not rely on controlled studies of state design. Where guidance disagrees — for example on whether disabled controls may receive focus — both positions are stated. Behaviour of disabled and read-only controls is taken from the HTML standard; ARIA attributes are described as exposing state, not implementing it.",

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
  lastVerifiedAt: "2026-11-16",
});
