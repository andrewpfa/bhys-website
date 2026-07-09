import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { Container } from "@/components/ui/Container";
import { formatDate, formatDateIso } from "@/lib/date";
import { newsCategoryLabel } from "@/lib/labels";
import { getNewsArticleBySlug, getNewsArticleSlugs } from "@/lib/sanity/fetch";

type NewsRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getNewsArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NewsRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.seoTitle || article.title || undefined,
    description: article.seoDescription || article.excerpt || undefined,
  };
}

export default async function NewsArticlePage({ params }: NewsRouteProps) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const title = article.title || "News Article";
  const categoryLabel = newsCategoryLabel(article.category);
  const publishedDate = formatDate(article.publishedAt);
  const dateTime = formatDateIso(article.publishedAt);
  const hasBody = Boolean(article.body && article.body.length > 0);

  return (
    <>
      <PageHero title={title} image={article.mainImage} />

      <section className="bg-white pb-12 sm:pb-16 lg:pb-20">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/news"
              className="inline-flex text-sm font-semibold text-bhys-green hover:text-bhys-green-dark"
            >
              ← Back to News
            </Link>

            {categoryLabel || publishedDate ? (
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-bhys-ink-muted">
                {categoryLabel ? (
                  <span className="rounded-full bg-bhys-muted px-3 py-1 text-bhys-ink">
                    {categoryLabel}
                  </span>
                ) : null}
                {publishedDate && dateTime ? (
                  <time dateTime={dateTime}>{publishedDate}</time>
                ) : null}
              </div>
            ) : null}

            {hasBody ? (
              <div className="mt-6">
                <PortableTextRenderer value={article.body} />
              </div>
            ) : article.excerpt ? (
              <p className="mt-6 text-base leading-7 text-bhys-ink-muted">
                {article.excerpt}
              </p>
            ) : null}
          </div>
        </Container>
      </section>
    </>
  );
}
