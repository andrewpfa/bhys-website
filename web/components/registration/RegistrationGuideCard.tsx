import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/lib/sanity/image";
import type { RegistrationGuideCard as RegistrationGuideCardType } from "@/lib/sanity/types";
import {
  REGISTRATION_CATEGORY_LABELS,
  registrationStatusLabel,
  registrationStatusStyle,
} from "@/lib/labels";

type RegistrationGuideCardProps = {
  guide: RegistrationGuideCardType;
};

export function RegistrationGuideCard({ guide }: RegistrationGuideCardProps) {
  if (!guide?.title) {
    return null;
  }

  const slug = guide.slug?.current;
  const href = slug ? `/register/${slug}` : guide.registrationUrl || undefined;
  const showStatusBadge =
    guide.category === "fallSoccer" || guide.category === "springSoccer";
  const statusLabel = showStatusBadge
    ? registrationStatusLabel(guide.registrationStatus)
    : null;
  const statusStyle = registrationStatusStyle(guide.registrationStatus);
  const categoryLabel = guide.category
    ? REGISTRATION_CATEGORY_LABELS[guide.category] || null
    : null;
  const imageUrl = guide.heroImage?.asset?.url
    ? urlForImage(guide.heroImage).width(640).height(360).fit("crop").url()
    : null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-bhys-border bg-white shadow-sm transition hover:shadow-md">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={guide.heroImage?.alt || guide.title}
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
        <div className="flex flex-wrap items-center gap-2">
          {categoryLabel ? (
            <span className="inline-flex w-fit rounded-full bg-bhys-muted px-3 py-1 text-xs font-medium text-bhys-ink">
              {categoryLabel}
            </span>
          ) : null}
          {statusLabel ? (
            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
            >
              {statusLabel}
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-xl font-semibold text-bhys-ink">
          {href ? (
            <Link href={href} className="hover:text-bhys-green">
              {guide.title}
            </Link>
          ) : (
            guide.title
          )}
        </h3>

        {guide.summary ? (
          <p className="mt-3 flex-1 text-sm leading-6 text-bhys-ink-muted">
            {guide.summary}
          </p>
        ) : null}

        {href ? (
          <Link
            href={href}
            className="mt-6 inline-flex w-fit rounded-full bg-bhys-green px-4 py-2 text-sm font-semibold text-white hover:bg-bhys-green-dark"
          >
            View Details
          </Link>
        ) : null}
      </div>
    </article>
  );
}
