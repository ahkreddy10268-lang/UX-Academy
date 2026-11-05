import Link from "next/link";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { Container } from "@/components/ui/layout";

export default function NotFound() {
  return (
    <Container className="grid items-center gap-10 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <p className="label">404 · lost the information scent</p>
        <h1 className="t-page mt-3 text-4xl">This page isn&apos;t in the academy</h1>
        <p className="mt-4 max-w-read text-ink-2">
          The topic may not exist yet, or the address may be mistyped. Search from the header, or find your way from the{" "}
          <Link className="link" href="/topics">
            Knowledge Atlas
          </Link>{" "}
          or the{" "}
          <Link className="link" href="/library">
            library
          </Link>
          .
        </p>
      </div>
      <figure className="overflow-hidden rounded-sm border border-rule">
        <ConceptIllustration slug="ia" title="Information architecture" domain="ia" variant="hero" />
      </figure>
    </Container>
  );
}
