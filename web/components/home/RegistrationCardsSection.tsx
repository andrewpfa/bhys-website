import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { urlForImage } from "@/lib/sanity/image";
import type { Homepage, RegistrationGuideCard } from "@/lib/sanity/types";

type RegistrationCardsSectionProps = {
  homepage: Homepage;
};

const STATUS_LABELS: Record<string, string> = {
  open: "Registration Open",
  comingSoon: "Coming Soon",
  closed: "Registration Closed",
};

const STATUS_STYLES: Record<string, string> = {
  open: "bg-green-100 text-green-800",
  comingSoon: "bg-amber-100 text-amber-800",
  closed: "bg-gray-100 text-gray-700",
};

function RegistrationCard({ card }: { card: RegistrationGuideCard }) {
  if (!card?.title) {
    return null;
  }

  const status = card.registrationStatus || "comingSoon";
  const statusLabel = STATUS_LABELS[status] || "Coming Soon";
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.comingSoon;
  const href = card.primaryCtaLink || card.registrationUrl;
  const ctaLabel = card.primaryCtaLabel || "Learn More";
  const imageUrl = card.heroImage?.asset?.url
    ? urlForImage(card.heroImage).width(640).height(360).fit("crop").url()
    : null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-bhys-border bg-white shadow-sm transition hover:shadow-md">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={card.heroImage?.alt || card.title}
          width={640}
          height={360}
          className="aspect-[16/9] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-bhys-muted text-sm text-bhys-ink-muted">
          Program image
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
        >
          {statusLabel}
        </span>

        <h3 className="mt-4 text-xl font-semibold text-bhys-ink">{card.title}</h3>

        {card.summary ? (
          <p className="mt-3 flex-1 text-sm leading-6 text-bhys-ink-muted">
            {card.summary}
          </p>
        ) : null}

        {href ? (
          <Link
            href={href}
            className="mt-6 inline-flex w-fit rounded-full bg-bhys-green px-4 py-2 text-sm font-semibold text-white hover:bg-bhys-green-dark"
          >
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function RegistrationCardsSection({ homepage }: RegistrationCardsSectionProps) {
  const title = homepage?.registrationSectionTitle || "Registration";
  const text =
    homepage?.registrationSectionText ||
    "Choose a program below to view registration details and important dates.";
  const cards = (homepage?.registrationCards ?? []).filter(Boolean);
  const sectionCtaLabel = homepage?.registrationSectionCtaLabel;
  const sectionCtaLink = homepage?.registrationSectionCtaLink;

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
            {cards.map((card) => (
              <RegistrationCard key={card?.title || card?.slug?.current} card={card} />
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-dashed border-bhys-border bg-white p-6 text-sm text-bhys-ink-muted">
            Registration programs will appear here once they are published in the CMS.
          </p>
        )}

        {sectionCtaLabel && sectionCtaLink ? (
          <div className="mt-10">
            <Link
              href={sectionCtaLink}
              className="inline-flex rounded-full bg-bhys-green px-6 py-3 text-sm font-semibold text-white hover:bg-bhys-green-dark"
            >
              {sectionCtaLabel}
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
