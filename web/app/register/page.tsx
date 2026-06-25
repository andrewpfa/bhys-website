import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { RegistrationGuideCard } from "@/components/registration/RegistrationGuideCard";
import { Container } from "@/components/ui/Container";
import { getRegistrationGuides, getSiteSettings } from "@/lib/sanity/fetch";

const HERO_TITLE = "Register For Soccer";
const HERO_TEXT =
  "Everything families need to understand programs, scholarships, age groups, and the registration process.";

export const metadata: Metadata = {
  title: HERO_TITLE,
  description: HERO_TEXT,
};

export default async function RegisterPage() {
  const [guides, settings] = await Promise.all([
    getRegistrationGuides(),
    getSiteSettings(),
  ]);

  const registerUrl =
    settings?.mainRegistrationUrl || settings?.fallRegistrationUrl || null;

  return (
    <>
      <PageHero
        title={HERO_TITLE}
        text={HERO_TEXT}
        cta={
          registerUrl
            ? { label: "Register Now", url: registerUrl }
            : undefined
        }
      />

      <section className="bg-bhys-muted py-12 sm:py-16 lg:py-20">
        <Container>
          {guides.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {guides.map((guide, index) => (
                <RegistrationGuideCard
                  key={guide?.slug?.current || guide?.title || index}
                  guide={guide}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-bhys-border bg-white p-6 text-sm text-bhys-ink-muted">
              Registration guides will appear here once they are published in the
              CMS.
            </p>
          )}

          {registerUrl ? (
            <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-bhys-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-bhys-ink">
                  Ready to register?
                </h2>
                <p className="mt-1 text-sm text-bhys-ink-muted">
                  Head to our registration portal to sign up your player.
                </p>
              </div>
              <Link
                href={registerUrl}
                className="inline-flex shrink-0 rounded-full bg-bhys-green px-6 py-3 text-sm font-semibold text-white hover:bg-bhys-green-dark"
              >
                Register Now
              </Link>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
