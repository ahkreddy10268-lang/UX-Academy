import Link from "next/link";
import { Container } from "@/components/ui/layout";

export default function NotFound() {
  return (
    <Container className="max-w-read py-24">
      <p className="label">404</p>
      <h1 className="display mt-3 text-3xl">This page isn&apos;t in the academy</h1>
      <p className="mt-4 text-ink-2">
        The topic may not exist yet, or the address may be mistyped. Try searching, or browse the{" "}
        <Link className="link" href="/topics">
          subject index
        </Link>
        .
      </p>
    </Container>
  );
}
