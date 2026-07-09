import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { isExternalUrl } from "@/lib/navigation";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type PageHeroCta = {
  label?: string | null;
  url?: string | null;
};

type PageHeroProps = {
  title: string;
  text?: string | null;
  image?: SanityImage;
  cta?: PageHeroCta;
};

export function PageHero({ title, text, image, cta }: PageHeroProps) {
  const hasImage = Boolean(image?.asset?.url);
  const imageUrl = hasImage
    ? urlForImage(image!).width(960).height(720).fit("crop").url()
    : null;
  const showCta = Boolean(cta?.label && cta?.url);
  const ctaExternal = cta?.url ? isExternalUrl(cta.url) : false;

  const ctaClassName =
    "inline-flex items-center justify-center rounded-full bg-bhys-green px-6 py-3 text-sm font-semibold text-white hover:bg-bhys-green-dark";

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <div
          className={
            hasImage
              ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-12"
              : "max-w-3xl"
          }
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-bhys-ink sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {text ? (
              <p className="mt-4 max-w-xl text-base leading-7 text-bhys-ink-muted sm:text-lg">
                {text}
              </p>
            ) : null}
            {showCta ? (
              <div className="mt-8">
                {ctaExternal ? (
                  <a
                    href={cta!.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaClassName}
                  >
                    {cta!.label}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                ) : (
                  <Link href={cta!.url!} className={ctaClassName}>
                    {cta!.label}
                  </Link>
                )}
              </div>
            ) : null}
          </div>

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alt || title}
              width={960}
              height={720}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              priority
              placeholder={image?.asset?.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={image?.asset?.metadata?.lqip ?? undefined}
            />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
