import Link from "next/link";

import { CtaButton } from "@/components/ui/CtaButton";
import { Container } from "@/components/ui/Container";
import { PROGRAMS_REGISTRATION_PATH } from "@/lib/registration";

export default function NotFound() {
  return (
    <section className="bg-bhys-muted py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-bhys-green">
            404
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-bhys-ink sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-7 text-bhys-ink-muted">
            The page you are looking for may have moved or is not available yet.
            Try one of the links below.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CtaButton href="/" variant="secondary">
              Go Home
            </CtaButton>
            <CtaButton href={PROGRAMS_REGISTRATION_PATH} variant="secondary">
              Programs & Registration
            </CtaButton>
            <CtaButton href="/resources" variant="secondary">
              Resources
            </CtaButton>
            <Link
              href="/contact"
              className="text-sm font-semibold text-bhys-green hover:text-bhys-green-dark"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
