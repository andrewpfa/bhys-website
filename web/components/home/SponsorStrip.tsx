import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { urlForImage } from "@/lib/sanity/image";
import type { Homepage, Sponsor } from "@/lib/sanity/types";

type SponsorStripProps = {
  homepage: Homepage;
  sponsors: Sponsor[];
};

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  if (!sponsor?.name) {
    return null;
  }

  const logoUrl = sponsor.logo?.asset?.url
    ? urlForImage(sponsor.logo).width(240).height(120).fit("max").url()
    : null;

  const content = logoUrl ? (
    <Image
      src={logoUrl}
      alt={sponsor.logo?.alt || sponsor.name}
      width={240}
      height={120}
      className="h-12 w-auto object-contain sm:h-14"
    />
  ) : (
    <span className="text-sm font-semibold text-bhys-ink">{sponsor.name}</span>
  );

  if (sponsor.websiteUrl) {
    return (
      <Link
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center opacity-90 transition hover:opacity-100"
      >
        {content}
      </Link>
    );
  }

  return <div className="flex items-center justify-center">{content}</div>;
}

export function SponsorStrip({ homepage, sponsors }: SponsorStripProps) {
  const items = (sponsors ?? []).filter((sponsor) => Boolean(sponsor?.name));

  if (items.length === 0) {
    return null;
  }

  const title = homepage?.sponsorsSectionTitle || "Our Sponsors";
  const ctaLabel = homepage?.sponsorsSectionCtaLabel;
  const ctaLink = homepage?.sponsorsSectionCtaLink;

  return (
    <section className="bg-bhys-muted py-12 sm:py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-bhys-ink sm:text-3xl">
            {title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((sponsor, index) => (
            <SponsorLogo key={sponsor?._id || sponsor?.name || index} sponsor={sponsor} />
          ))}
        </div>

        {ctaLabel && ctaLink ? (
          <div className="mt-10 text-center">
            <Link
              href={ctaLink}
              className="inline-flex rounded-full bg-bhys-green px-6 py-3 text-sm font-semibold text-white hover:bg-bhys-green-dark"
            >
              {ctaLabel}
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
