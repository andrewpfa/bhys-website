import Image from "next/image";
import Link from "next/link";

import { formatDate, formatDateIso } from "@/lib/date";
import { newsCategoryLabel } from "@/lib/labels";
import { urlForImage } from "@/lib/sanity/image";
import type { NewsArticleCard } from "@/lib/sanity/types";

type NewsCardProps = {
  article: NewsArticleCard;
  featured?: boolean;
};

function CategoryAndDate({ article }: { article: NewsArticleCard }) {
  const categoryLabel = newsCategoryLabel(article?.category);
  const publishedDate = formatDate(article?.publishedAt);
  const dateTime = formatDateIso(article?.publishedAt);

  if (!categoryLabel && !publishedDate) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-bhys-ink-muted">
      {categoryLabel ? (
        <span className="rounded-full bg-bhys-muted px-3 py-1 text-bhys-ink">
          {categoryLabel}
        </span>
      ) : null}
      {publishedDate && dateTime ? <time dateTime={dateTime}>{publishedDate}</time> : null}
    </div>
  );
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  if (!article?.title) {
    return null;
  }

  const slug = article.slug?.current;
  const href = slug ? `/news/${slug}` : undefined;
  const imageWidth = featured ? 1280 : 640;
  const imageHeight = featured ? 720 : 360;
  const imageUrl = article.mainImage?.asset?.url
    ? urlForImage(article.mainImage)
        .width(imageWidth)
        .height(imageHeight)
        .fit("crop")
        .url()
    : null;

  const title = href ? (
    <Link href={href} className="hover:text-bhys-green">
      {article.title}
    </Link>
  ) : (
    article.title
  );

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-bhys-border bg-white shadow-sm transition hover:shadow-md ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <div className={featured ? "lg:w-1/2" : ""}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.mainImage?.alt || article.title}
            width={imageWidth}
            height={imageHeight}
            className="aspect-[16/9] w-full object-cover"
            priority={featured}
          />
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center bg-bhys-muted text-sm text-bhys-ink-muted">
            News image
          </div>
        )}
      </div>

      <div
        className={`flex flex-1 flex-col p-5 sm:p-6 ${
          featured ? "lg:w-1/2 lg:justify-center" : ""
        }`}
      >
        <CategoryAndDate article={article} />

        <h3
          className={`mt-3 font-semibold text-bhys-ink ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
          {title}
        </h3>

        {article.excerpt ? (
          <p className="mt-3 flex-1 text-sm leading-6 text-bhys-ink-muted">
            {article.excerpt}
          </p>
        ) : null}

        {href ? (
          <Link
            href={href}
            className="mt-5 inline-flex w-fit text-sm font-semibold text-bhys-green hover:text-bhys-green-dark"
          >
            Read More →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
