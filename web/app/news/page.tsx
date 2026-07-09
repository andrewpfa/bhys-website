import type { Metadata } from "next";

import { NewsCard } from "@/components/news/NewsCard";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getNewsArticles } from "@/lib/sanity/fetch";
import type { NewsArticleCard } from "@/lib/sanity/types";

const HERO_TITLE = "News & Updates";
const HERO_TEXT =
  "The latest announcements, club news, and community stories from Beacon Hill Youth Soccer.";

export const metadata: Metadata = {
  title: HERO_TITLE,
  description: HERO_TEXT,
};

export default async function NewsPage() {
  const articles = (await getNewsArticles()).filter(
    (article): article is NewsArticleCard => Boolean(article?.title),
  );

  const featuredArticle =
    articles.find((article) => article?.featured) || null;
  const remainingArticles = featuredArticle
    ? articles.filter((article) => article !== featuredArticle)
    : articles;

  return (
    <>
      <PageHero title={HERO_TITLE} text={HERO_TEXT} />

      <section className="bg-bhys-muted py-12 sm:py-16 lg:py-20">
        <Container>
          {articles.length === 0 ? (
            <EmptyState
              title="No news yet"
              message="News articles will appear here once they are published in the CMS."
            />
          ) : (
            <div className="space-y-10">
              {featuredArticle ? (
                <div>
                  <h2 className="sr-only">Featured article</h2>
                  <NewsCard article={featuredArticle} featured />
                </div>
              ) : null}

              {remainingArticles.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-bhys-ink sm:text-3xl">
                    {featuredArticle ? "More News" : "All News"}
                  </h2>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {remainingArticles.map((article, index) => (
                      <NewsCard
                        key={article?.slug?.current || article?.title || index}
                        article={article}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
