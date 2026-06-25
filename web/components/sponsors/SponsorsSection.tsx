import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { sponsorLevelLabel } from "@/lib/labels";
import { urlForImage } from "@/lib/sanity/image";
import type { Sponsor } from "@/lib/sanity/types";

type SponsorsSectionProps = {
  sponsors: Sponsor[];
  title?: string;
};

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  if (!sponsor?.name) {
    return null;
  }

  const levelLabel = sponsorLevelLabel(sponsor.sponsorLevel);
  const logoUrl = sponsor.logo?.asset?.url
    ? urlForImage(sponsor.logo).width(320).height(180).fit("max").url()
    : null;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-bhys-border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex h-20 items-center justify-center">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={sponsor.logo?.alt || sponsor.name}
            width={320}
            height={180}
            className="max-h-16 w-auto object-contain"
          />
        ) : (
          <span className="text-lg font-semibold text-bhys-ink">
            {sponsor.name}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col text-center">
        <h3 className="text-lg font-semibold text-bhys-ink">{sponsor.name}</h3>
        {levelLabel ? (
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-bhys-green">
            {levelLabel}
          </p>
        ) : null}
        {sponsor.description ? (
          <p className="mt-3 flex-1 text-sm leading-6 text-bhys-ink-muted">
            {sponsor.description}
          </p>
        ) : null}
        {sponsor.websiteUrl ? (
          <Link
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit self-center text-sm font-semibold text-bhys-green hover:text-bhys-green-dark"
          >
            Visit Website →
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function SponsorsSection({ sponsors, title }: SponsorsSectionProps) {
  const items = (sponsors ?? []).filter((sponsor) => Boolean(sponsor?.name));

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="bg-bhys-muted py-12 sm:py-16 lg:py-20">
      <Container>
        {title ? (
          <h2 className="text-2xl font-bold tracking-tight text-bhys-ink sm:text-3xl">
            {title}
          </h2>
        ) : null}
        <div
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
            title ? "mt-10" : ""
          }`}
        >
          {items.map((sponsor, index) => (
            <SponsorCard
              key={sponsor?._id || sponsor?.name || index}
              sponsor={sponsor}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
