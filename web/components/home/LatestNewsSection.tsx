import Link from "next/link";

import { NewsCard } from "@/components/news/NewsCard";
import { Container } from "@/components/ui/Container";
import type { Homepage, NewsArticleCard } from "@/lib/sanity/types";

type LatestNewsSectionProps = {
  homepage: Homepage;
  articles: NewsArticleCard[];
};

export function LatestNewsSection({
  homepage,
  articles,
}: LatestNewsSectionProps) {
  const items = (articles ?? []).filter(
    (article): article is NewsArticleCard => Boolean(article?.title),
  );

  if (items.length === 0) {
    return null;
  }

  const title = homepage?.newsSectionTitle || "Latest News";
  const ctaLabel = homepage?.newsSectionCtaLabel || "View All News";
  const ctaLink = homepage?.newsSectionCtaLink || "/news";

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-bhys-ink sm:text-3xl">
              {title}
            </h2>
          </div>

          {ctaLink ? (
            <Link
              href={ctaLink}
              className="inline-flex w-fit shrink-0 text-sm font-semibold text-bhys-green hover:text-bhys-green-dark"
            >
              {ctaLabel} →
            </Link>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((article, index) => (
            <NewsCard
              key={article?.slug?.current || article?.title || index}
              article={article}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
