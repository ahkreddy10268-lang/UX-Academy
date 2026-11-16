/**
 * Cycle 1, Batch 3 plates (D-129): UX writing foundations — UX writing,
 * content design, plain language, microcopy and error messages.
 * Instructional sheets (D-089); explanations live in each plate's figure key
 * (D-101), never as microtext in the drawing. Interfaces, names and amounts
 * are illustrative.
 */
import type { IllustrationEntry } from "../illustration-types";
import { Marker, S, TextBar, UiButton, UiFrame, UiText, Verdict } from "../system/sheet";
import { Card, head } from "./learning-sheets";

const hair = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Arrow({ x1, y1, x2, y2, dashed = false }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={S.ink2} strokeWidth="1.1" strokeDasharray={dashed ? "3 2.5" : undefined} {...hair} />
      <polygon points={head(x2, y2, (x2 - x1) / len, (y2 - y1) / len)} fill={S.ink2} />
    </g>
  );
}

function Chip({ x, y, w, label, tone = "default" }: { x: number; y: number; w: number; label: string; tone?: "default" | "accent" }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={26} rx={5} fill={tone === "accent" ? S.accentWash : S.soft} stroke={tone === "accent" ? S.accent : S.ruleStrong} strokeWidth={tone === "accent" ? 1.2 : 0.8} {...hair} />
      <UiText x={x + 9} y={y + 17.5} weight={tone === "accent" ? 600 : 400}>
        {label}
      </UiText>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* UX writing: intent → interface words → result, and the echo            */
/* ------------------------------------------------------------------ */
export const uxWritingPlate: IllustrationEntry = {
  slug: "ux-writing",
  title: "UX writing plate",
  canvas: "sheet",
  description:
    "An illustrative money transfer in three panels joined by arrows. Intent: the person's own words, 'Pay Sam back for the rent'. Interface: a field labelled 'Amount' containing £50, the hint 'Arrives in about 2 hours', and a button 'Send £50 to Sam'. Result: a tick with '£50 sent to Sam Jones' and 'Ref RENT-MAY'. Below, two pairs compare the words before and after acting. Marked with a tick: the button 'Send £50 to Sam' leads to the confirmation '£50 sent to Sam Jones', which repeats its words. Marked with a cross: a button 'Submit' leads to 'Transaction successful', which says neither what was sent nor to whom.",
  key: [
    { n: "1", label: "Start from intent", detail: "what the person is trying to do, in their own words" },
    { n: "2", label: "Guide", detail: "a plain label and a hint that answers the question people have before sending: when will it arrive?" },
    { n: "3", label: "Predict", detail: "the button names the outcome, so people know what pressing it will do (the gulf of execution)" },
    { n: "4", label: "Confirm", detail: "the result says what happened, in specific terms people can check (the gulf of evaluation)" },
    { n: "5", label: "The echo", detail: "the confirmation repeats the button's words — amount and recipient — so the person can see that what happened is what they asked for" },
    { n: "6", label: "Vague words", detail: "'Submit' predicts nothing and 'Transaction successful' confirms nothing specific; both leave the person to guess" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* intent */}
      <Card x={8} y={8} w={110} h={150} title="Intent">
        <UiText x={20} y={62}>
          “Pay Sam
        </UiText>
        <UiText x={20} y={80}>
          back for
        </UiText>
        <UiText x={20} y={98}>
          the rent”
        </UiText>
        <UiText x={20} y={130} mono tone="ink3">
          their words
        </UiText>
      </Card>
      <Arrow x1={120} y1={83} x2={130} y2={83} />

      {/* interface */}
      <Card x={131} y={8} w={140} h={150} title="Interface">
        <UiText x={143} y={52} weight={600} tone="ink2">
          Amount
        </UiText>
        <rect x={143} y={58} width={116} height={24} rx={4} fill={S.surface} stroke={S.control} strokeWidth="0.9" {...hair} />
        <UiText x={151} y={75}>
          £50
        </UiText>
        <UiText x={143} y={98} tone="ink2">
          Arrives in about
        </UiText>
        <UiText x={143} y={114} tone="ink2">
          2 hours
        </UiText>
        <UiButton x={139} y={124} w={124} label="Send £50 to Sam" />
      </Card>
      <Arrow x1={273} y1={83} x2={283} y2={83} />

      {/* result */}
      <Card x={284} y={8} w={108} h={150} title="Result">
        <Verdict x={304} y={60} ok />
        <UiText x={294} y={92} weight={600}>
          £50 sent to
        </UiText>
        <UiText x={294} y={110} weight={600}>
          Sam Jones
        </UiText>
        <UiText x={294} y={134} mono tone="ink2">
          Ref RENT-MAY
        </UiText>
      </Card>

      {/* before and after acting */}
      <rect x={8} y={168} width={384} height={124} rx={7} fill={S.surface} stroke={S.ruleStrong} strokeWidth="0.9" {...hair} />
      <UiText x={46} y={190} mono tone="ink3">
        before acting
      </UiText>
      <UiText x={222} y={190} mono tone="ink3">
        after acting
      </UiText>
      <Verdict x={30} y={214} ok />
      <Chip x={46} y={201} w={128} label="Send £50 to Sam" tone="accent" />
      <Arrow x1={178} y1={214} x2={216} y2={214} />
      <Chip x={220} y={201} w={162} label="£50 sent to Sam Jones" tone="accent" />
      <Verdict x={30} y={262} ok={false} />
      <Chip x={46} y={249} w={128} label="Submit" />
      <Arrow x1={178} y1={262} x2={216} y2={262} />
      <Chip x={220} y={249} w={162} label="Transaction successful" />

      {detail && (
        <>
          {/* r = 11: centres ≥ 12 units from the viewBox edge */}
          <Marker x={106} y={20} n={1} />
          <Marker x={259} y={20} n={2} />
          <Marker x={125} y={137} n={3} />
          <Marker x={380} y={20} n={4} />
          <Marker x={197} y={236} n={5} />
          <Marker x={197} y={284} n={6} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Content design: from a user need to maintained content                 */
/* ------------------------------------------------------------------ */
function Lines({ x, y, lines, tone = "ink" }: { x: number; y: number; lines: string[]; tone?: "ink" | "ink2" }) {
  return (
    <g>
      {lines.map((l, i) => (
        <UiText key={l} x={x} y={y + i * 18} tone={tone}>
          {l}
        </UiText>
      ))}
    </g>
  );
}

export const contentDesignPlate: IllustrationEntry = {
  slug: "content-design",
  title: "Content design plate",
  canvas: "sheet",
  description:
    "An illustrative content-design decision for a council. Top, a user need: 'As a parent, I need to know if my child gets free school meals, so that I can apply.' An arrow leads to four steps in a row. Format: 'long page' struck out, replaced by a '4-question checker'. Structure: three content parts — Question, Result, Next step. Create: plain words, tested with parents. Deliver: web page, letter, script. Below, Deliver leads to Evaluate (checker completions, calls about eligibility), which leads to Maintain (owner and review date; update or retire).",
  key: [
    { n: "1", label: "Start from a need", detail: "written from the person's side and based on evidence such as searches and calls" },
    { n: "2", label: "Choose the format", detail: "the best answer here is a short checker, not a longer page; sometimes it is no new content at all" },
    { n: "3", label: "Structure", detail: "a content model names the parts — question, result, next step — so designers, developers and authors agree" },
    { n: "4", label: "Create and test", detail: "plain words in people's own language, tested with the people who will use it" },
    { n: "5", label: "Deliver across channels", detail: "the same words on the web, in the letter and in the school-office script" },
    { n: "6", label: "Evaluate", detail: "did people complete the checker, and did calls about eligibility fall?" },
    { n: "7", label: "Maintain", detail: "an owner and a review date; update when rules change, withdraw or remove when no longer needed" },
  ],
  Art: ({ detail }) => (
    <g>
      {/* the need */}
      <rect x={8} y={8} width={384} height={62} rx={7} fill={S.accentWash} stroke={S.accent} strokeWidth="1.1" {...hair} />
      <UiText x={20} y={30} mono tone="ink2">
        user need
      </UiText>
      <UiText x={20} y={48} weight={600}>
        As a parent, I need to know if my child gets
      </UiText>
      <UiText x={20} y={64} weight={600}>
        free school meals, so that I can apply.
      </UiText>
      <Arrow x1={52} y1={71} x2={52} y2={81} />

      {/* four steps */}
      <Card x={8} y={82} w={88} h={114} title="Format">
        <UiText x={20} y={128} tone="ink3">
          long page
        </UiText>
        <line x1={20} y1={123.5} x2={80} y2={123.5} stroke={S.ink2} strokeWidth="1.2" {...hair} />
        <Lines x={20} y={154} lines={["4-question", "checker"]} />
      </Card>
      <Arrow x1={97} y1={139} x2={105} y2={139} />
      <Card x={106} y={82} w={88} h={114} title="Structure">
        {["Question", "Result", "Next step"].map((l, i) => (
          <g key={l}>
            <rect x={115} y={114 + i * 26} width={73} height={20} rx={4} fill={S.soft} stroke={S.ruleStrong} strokeWidth="0.8" {...hair} />
            <UiText x={122} y={128 + i * 26}>
              {l}
            </UiText>
          </g>
        ))}
      </Card>
      <Arrow x1={195} y1={139} x2={203} y2={139} />
      <Card x={204} y={82} w={88} h={114} title="Create">
        <Lines x={216} y={128} lines={["plain words", "tested with", "parents"]} />
      </Card>
      <Arrow x1={293} y1={139} x2={301} y2={139} />
      <Card x={302} y={82} w={90} h={114} title="Deliver">
        <Lines x={314} y={128} lines={["web page", "letter", "script"]} />
      </Card>

      {/* evaluate and maintain */}
      <Arrow x1={347} y1={197} x2={347} y2={207} />
      <Card x={204} y={208} w={188} h={84} title="Evaluate">
        <Lines x={216} y={254} lines={["checker completions", "calls about eligibility"]} tone="ink2" />
      </Card>
      <Arrow x1={203} y1={250} x2={195} y2={250} />
      <Card x={8} y={208} w={186} h={84} title="Maintain">
        <Lines x={20} y={254} lines={["owner · review July", "update or retire"]} tone="ink2" />
      </Card>

      {detail && (
        <>
          <Marker x={380} y={20} n={1} />
          <Marker x={84} y={83} n={2} />
          <Marker x={182} y={83} n={3} />
          <Marker x={280} y={83} n={4} />
          <Marker x={380} y={83} n={5} />
          <Marker x={380} y={222} n={6} />
          <Marker x={182} y={222} n={7} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Plain language: same meaning, less work — and how to know              */
/* ------------------------------------------------------------------ */
export const plainLanguagePlate: IllustrationEntry = {
  slug: "plain-language",
  title: "Plain language plate",
  canvas: "sheet",
  description:
    "An illustrative council letter rewritten in plain language. Left, 'Before': a dense paragraph beginning 'It has come to our attention that the documentation…', followed by many lines of text. An arrow leads right to 'After': the main point first, 'We need proof of your income.'; then 'Send 3 payslips by 28 June:' with two list items, 'upload, or' and 'post them.'; then the consequence, 'If not, we close it.' Below, two ways of checking the result. 'Readability score': 'Grade 6', which counts words and sentence length. 'Paraphrase test': a reader says in their own words 'Send my payslips by 28 June', marked with a tick.",
  key: [
    { n: "1", label: "Before", detail: "passive, impersonal and vague: 'documentation', 'within fourteen days', 'it may be necessary' — the reader has to decode what to do" },
    { n: "2", label: "Main point first", detail: "what the council needs comes first, in everyday words" },
    { n: "3", label: "Structure the action", detail: "the specific document, a real date, and the two ways to send it as a list" },
    { n: "4", label: "Keep the meaning", detail: "the consequence is still there, stated plainly — plain language removes effort, not content" },
    { n: "5", label: "A score is a prompt", detail: "readability formulas count words and sentence length; they cannot tell whether readers understand" },
    { n: "6", label: "A test is evidence", detail: "a reader restating the action correctly in their own words shows the text works for them" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={8} w={184} h={168} title="Before">
        <UiText x={20} y={50} tone="ink2">
          It has come to our
        </UiText>
        <UiText x={20} y={67} tone="ink2">
          attention that the
        </UiText>
        <UiText x={20} y={84} tone="ink2">
          documentation…
        </UiText>
        {[98, 110, 122, 134, 146, 158].map((y, i) => (
          <TextBar key={y} x={20} y={y} w={[150, 142, 156, 138, 150, 96][i]} strong />
        ))}
      </Card>
      <Arrow x1={194} y1={92} x2={206} y2={92} />
      <Card x={208} y={8} w={184} h={168} title="After">
        <UiText x={220} y={50} weight={700}>
          We need proof of
        </UiText>
        <UiText x={220} y={67} weight={700}>
          your income.
        </UiText>
        <UiText x={220} y={92}>
          Send 3 payslips
        </UiText>
        <UiText x={220} y={109}>
          by 28 June:
        </UiText>
        <UiText x={228} y={128}>
          • upload, or
        </UiText>
        <UiText x={228} y={145}>
          • post them.
        </UiText>
        <UiText x={220} y={166}>
          If not, we close it.
        </UiText>
      </Card>

      <Card x={8} y={186} w={184} h={106} title="Readability score">
        <UiText x={20} y={238} weight={700} size={16}>
          Grade 6
        </UiText>
        <UiText x={20} y={260} tone="ink2">
          counts words and
        </UiText>
        <UiText x={20} y={277} tone="ink2">
          sentence length
        </UiText>
      </Card>
      <Card x={208} y={186} w={184} h={106} title="Paraphrase test">
        <UiText x={220} y={236}>
          “Send my payslips
        </UiText>
        <UiText x={220} y={253}>
          by 28 June.”
        </UiText>
        <Verdict x={370} y={246} ok />
        <UiText x={220} y={278} mono tone="ink3">
          reader, own words
        </UiText>
      </Card>

      {detail && (
        <>
          <Marker x={180} y={20} n={1} />
          <Marker x={380} y={20} n={2} />
          <Marker x={200} y={124} n={3} />
          <Marker x={380} y={162} n={4} />
          <Marker x={180} y={198} n={5} />
          <Marker x={380} y={198} n={6} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Microcopy: one field, every moment, and the question each answers      */
/* ------------------------------------------------------------------ */
const MC_QUESTIONS = ["What is this?", "Why do you ask?", "What happens?", "Did it work?"];

export const microcopyPlate: IllustrationEntry = {
  slug: "microcopy",
  title: "Microcopy plate",
  canvas: "sheet",
  description:
    "An illustrative delivery checkout. Left, the screen: the label 'Phone number'; the hint 'We'll text you if the driver can't find you.'; a field containing 07700 900 982; a button 'Pay £24.00'; and below, after paying, a confirmation with a tick: 'Order placed', 'Arrives Tuesday'. Right, the question each piece answers: 1 What is this? 2 Why do you ask? 3 What happens? 4 Did it work? Below that, two fields compared: a field whose only label is grey placeholder text inside it, marked with a cross, and a field with a visible label above it, marked with a tick.",
  key: [
    { n: "1", label: "Label", detail: "names the field and stays visible — answers 'what is this?'" },
    { n: "2", label: "Hint", detail: "the reason for asking, placed before the field — answers 'why do you ask?', which is often the real worry" },
    { n: "3", label: "Button", detail: "names the outcome and the amount — answers 'what happens if I press this?'" },
    { n: "4", label: "Confirmation", detail: "says what happened in specific terms — answers 'did it work?'" },
    { n: "5", label: "Placeholder as label", detail: "the label disappears when typing begins, so people lose track of what was asked and struggle to check or fix answers" },
    { n: "6", label: "Visible label", detail: "stays in place while typing and can be associated with the field for screen readers" },
  ],
  Art: ({ detail }) => (
    <g>
      <UiFrame x={8} y={8} w={214} h={284}>
        <UiText x={14} y={28} weight={600} tone="ink2">
          Phone number
        </UiText>
        <UiText x={14} y={47} tone="ink2">
          We’ll text you if the
        </UiText>
        <UiText x={14} y={63} tone="ink2">
          driver can’t find you.
        </UiText>
        <rect x={14} y={72} width={186} height={28} rx={5} fill={S.surface} stroke={S.control} strokeWidth="0.9" {...hair} />
        <UiText x={22} y={91}>
          07700 900 982
        </UiText>
        <UiButton x={14} y={116} w={164} h={30} label="Pay £24.00" />
        <line x1={14} y1={166} x2={200} y2={166} stroke={S.rule} strokeWidth="0.8" strokeDasharray="3 2.5" {...hair} />
        <rect x={14} y={182} width={186} height={66} rx={6} fill={S.okWash} stroke={S.ok} strokeWidth="0.9" {...hair} />
        <Verdict x={32} y={204} ok />
        <UiText x={48} y={209} weight={700}>
          Order placed
        </UiText>
        <UiText x={48} y={232}>
          Arrives Tuesday
        </UiText>
      </UiFrame>

      <Card x={232} y={8} w={160} h={136} title="Each answers">
        {MC_QUESTIONS.map((q, i) => (
          <g key={q}>
            <UiText x={244} y={56 + i * 23} mono weight={700} tone="ink3">
              {String(i + 1)}
            </UiText>
            <UiText x={260} y={56 + i * 23}>
              {q}
            </UiText>
          </g>
        ))}
      </Card>

      <Card x={232} y={154} w={160} h={138}>
        <rect x={244} y={170} width={112} height={26} rx={5} fill={S.surface} stroke={S.control} strokeWidth="0.9" {...hair} />
        <UiText x={252} y={188} tone="ink3">
          Phone number
        </UiText>
        <Verdict x={372} y={183} ok={false} />
        <UiText x={244} y={226} weight={600} tone="ink2">
          Phone number
        </UiText>
        <rect x={244} y={234} width={112} height={26} rx={5} fill={S.surface} stroke={S.control} strokeWidth="0.9" {...hair} />
        <UiText x={252} y={252}>
          07700 900…
        </UiText>
        <Verdict x={372} y={247} ok />
      </Card>

      {detail && (
        <>
          <Marker x={140} y={46} n={1} />
          <Marker x={206} y={70} n={2} />
          <Marker x={206} y={161} n={3} />
          <Marker x={206} y={212} n={4} />
          <Marker x={232} y={247} n={6} />
          <Marker x={232} y={183} n={5} />
        </>
      )}
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* Error messages: fails → explained → recovered → resolved               */
/* ------------------------------------------------------------------ */
function DobField({ x, y, value, state }: { x: number; y: number; value: string; state: "error" | "focus" | "default" }) {
  const stroke = state === "error" ? S.error : state === "focus" ? S.accent : S.control;
  return (
    <g>
      {state === "focus" && <rect x={x - 3} y={y - 3} width={148} height={32} rx={7} fill="none" stroke={S.accent} strokeWidth="1.2" {...hair} />}
      <rect x={x} y={y} width={142} height={26} rx={5} fill={S.surface} stroke={stroke} strokeWidth={state === "default" ? 0.9 : 1.6} {...hair} />
      <UiText x={x + 9} y={y + 18}>
        {value}
      </UiText>
    </g>
  );
}

export const errorMessagesPlate: IllustrationEntry = {
  slug: "error-messages",
  title: "Error messages plate",
  canvas: "sheet",
  description:
    "An illustrative date-of-birth error in four panels. 1, 'Something fails': the field 'Date of birth' contains 27 13 1990 and has a red border. 2, 'Explain': an error summary at the top of the page, 'There is a problem', with a link 'Date of birth must be a real date'. 3, 'Recover': beside the field, the message 'Error: Date of birth must be a real date', marked by a red bar and the word Error; the field keeps the person's entry, now edited to 27 3 1990, with a focus ring. 4, 'Resolved': a tick with 'Details saved' and 'Date of birth: 27 March 1990'. A connector runs from panel 1 to 2, from 2 down to 3, and from 3 to 4.",
  key: [
    { n: "1", label: "Detect, don't just colour", detail: "a red border alone tells some people nothing; the error must also be identified and described in text" },
    { n: "2", label: "Summarise after submitting", detail: "a summary at the top receives focus and links to the field, so keyboard and screen-reader users learn at once what to fix" },
    { n: "3", label: "Explain at the field", detail: "the same words beside the field, with a hidden 'Error:' prefix for screen readers: what is wrong and, by implication, how to fix it" },
    { n: "4", label: "Keep their input", detail: "the value stays so the person edits one character instead of starting again" },
    { n: "5", label: "Confirm the resolution", detail: "the result is stated in the same terms, so the person knows the problem is gone" },
  ],
  Art: ({ detail }) => (
    <g>
      <Card x={8} y={8} w={188} h={134} title="Something fails">
        <UiText x={20} y={62} weight={600} tone="ink2">
          Date of birth
        </UiText>
        <DobField x={20} y={72} value="27 13 1990" state="error" />
      </Card>
      <Arrow x1={197} y1={92} x2={203} y2={92} />
      <Card x={204} y={8} w={188} h={134} title="Explain">
        <rect x={216} y={42} width={164} height={88} rx={5} fill={S.surface} stroke={S.error} strokeWidth="1.6" {...hair} />
        <UiText x={228} y={66} weight={700}>
          There is a problem
        </UiText>
        <UiText x={228} y={92} tone="accent">
          Date of birth must
        </UiText>
        <UiText x={228} y={110} tone="accent">
          be a real date
        </UiText>
        <line x1={228} y1={95} x2={337} y2={95} stroke={S.accent} strokeWidth="0.9" {...hair} />
        <line x1={228} y1={113} x2={311} y2={113} stroke={S.accent} strokeWidth="0.9" {...hair} />
      </Card>
      <path d="M298 143 V150 H102 V156" fill="none" stroke={S.ink2} strokeWidth="1.1" {...hair} />
      <polygon points={head(102, 157, 0, 1)} fill={S.ink2} />

      <Card x={8} y={158} w={188} h={134} title="Recover">
        <rect x={20} y={192} width={3} height={36} fill={S.error} />
        <UiText x={30} y={206} weight={700} tone="error">
          Error: Date of birth
        </UiText>
        <UiText x={30} y={223} weight={700} tone="error">
          must be a real date
        </UiText>
        <DobField x={23} y={244} value="27 3 1990" state="focus" />
      </Card>
      <Arrow x1={197} y1={225} x2={203} y2={225} />
      <Card x={204} y={158} w={188} h={134} title="Resolved">
        <Verdict x={226} y={206} ok />
        <UiText x={242} y={211} weight={700}>
          Details saved
        </UiText>
        <UiText x={216} y={244} tone="ink2">
          Date of birth:
        </UiText>
        <UiText x={216} y={262}>
          27 March 1990
        </UiText>
      </Card>

      {detail && (
        <>
          <Marker x={180} y={85} n={1} />
          <Marker x={380} y={20} n={2} />
          <Marker x={180} y={170} n={3} />
          <Marker x={180} y={257} n={4} />
          <Marker x={380} y={170} n={5} />
        </>
      )}
    </g>
  ),
};

const plates: IllustrationEntry[] = [uxWritingPlate, contentDesignPlate, plainLanguagePlate, microcopyPlate, errorMessagesPlate];
export default plates;
