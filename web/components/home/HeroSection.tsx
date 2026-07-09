import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { isExternalUrl } from "@/lib/navigation";
import { urlForImage } from "@/lib/sanity/image";
import type { CtaButton, Homepage, SanityImage } from "@/lib/sanity/types";

type HeroSectionProps = {
  homepage: Homepage;
};

function CtaLink({
  button,
  variant,
}: {
  button: CtaButton | undefined;
  variant: "primary" | "secondary";
}) {
  if (!button?.label || !button?.url) {
    return null;
  }

  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-full bg-bhys-green px-6 py-3 text-sm font-semibold text-white hover:bg-bhys-green-dark"
      : "inline-flex items-center justify-center rounded-full border border-bhys-border bg-white px-6 py-3 text-sm font-semibold text-bhys-ink hover:bg-bhys-muted";

  if (isExternalUrl(button.url)) {
    return (
      <a
        href={button.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {button.label}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  return (
    <Link href={button.url} className={className}>
      {button.label}
    </Link>
  );
}

function HeroImage({ image }: { image?: SanityImage }) {
  if (!image?.asset?.url) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-bhys-muted text-bhys-ink-muted">
        Hero image coming soon
      </div>
    );
  }

  const imageUrl = urlForImage(image).width(960).height(720).fit("crop").url();

  return (
    <Image
      src={imageUrl}
      alt={image.alt || "Homepage hero image"}
      width={960}
      height={720}
      className="aspect-[4/3] w-full rounded-2xl object-cover"
      priority
      placeholder={image.asset.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={image.asset.metadata?.lqip ?? undefined}
    />
  );
}

export function HeroSection({ homepage }: HeroSectionProps) {
  const title = homepage?.heroTitle || "Welcome to Beacon Hill Youth Soccer";
  const text =
    homepage?.heroText ||
    "Community soccer for Beacon Hill families. Registration information and program details are updated here throughout the season.";

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-bhys-ink sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-bhys-ink-muted sm:text-lg">
              {text}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink button={homepage?.primaryButton} variant="primary" />
              <CtaLink button={homepage?.secondaryButton} variant="secondary" />
            </div>
          </div>

          <HeroImage image={homepage?.heroImage} />
        </div>
      </Container>
    </section>
  );
}
