import { RegistrationGuideCard } from "@/components/registration/RegistrationGuideCard";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Homepage, RegistrationGuideCard as RegistrationGuideCardType } from "@/lib/sanity/types";

type RegistrationCardsSectionProps = {
  homepage: Homepage;
};

export function RegistrationCardsSection({ homepage }: RegistrationCardsSectionProps) {
  const title = homepage?.registrationSectionTitle || "Programs & Registration";
  const text =
    homepage?.registrationSectionText ||
    "Choose a program below to view registration details and important dates.";
  const cards = (homepage?.registrationCards ?? []).filter(
    Boolean,
  ) as RegistrationGuideCardType[];
  const sectionCtaLabel = homepage?.registrationSectionCtaLabel || "View All Programs";
  const sectionCtaLink = homepage?.registrationSectionCtaLink || "/register";

  return (
    <section className="bg-bhys-muted py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-bhys-ink sm:text-3xl">
            {title}
          </h2>
          {text ? (
            <p className="mt-3 text-base leading-7 text-bhys-ink-muted">{text}</p>
          ) : null}
        </div>

        {cards.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, index) => (
              <RegistrationGuideCard
                key={card?.slug?.current || card?.title || index}
                guide={card}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              title="Programs coming soon"
              message="Registration guides will appear here once they are published in the CMS."
            />
          </div>
        )}

        <div className="mt-10">
          <CtaButton href={sectionCtaLink} variant="secondary">
            {sectionCtaLabel}
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
