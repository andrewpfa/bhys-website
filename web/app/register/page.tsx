import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { RegistrationGuideCard } from "@/components/registration/RegistrationGuideCard";
import { RegisterNowCta } from "@/components/registration/RegisterNowCta";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getRegistrationPortalUrl } from "@/lib/registration";
import { getRegistrationGuides, getSiteSettings } from "@/lib/sanity/fetch";

const HERO_TITLE = "Programs & Registration";
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

  const registerUrl = getRegistrationPortalUrl(settings);
  const seasonText = settings?.currentSeason
    ? `${HERO_TEXT} Current season: ${settings.currentSeason}.`
    : HERO_TEXT;

  return (
    <>
      <PageHero
        title={HERO_TITLE}
        text={seasonText}
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
            <EmptyState
              title="Programs coming soon"
              message="Registration guides will appear here once they are published in the CMS."
            />
          )}

          {registerUrl ? <RegisterNowCta url={registerUrl} className="mt-12" /> : null}
        </Container>
      </section>
    </>
  );
}
