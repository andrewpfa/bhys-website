import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { Container } from "@/components/ui/Container";
import { getPageBySlug, getPageSlugs } from "@/lib/sanity/fetch";

type PageRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  const title = page.seoTitle || page.title || undefined;
  const description = page.seoDescription || page.summary || undefined;

  return {
    title,
    description,
  };
}

export default async function PageRoute({ params }: PageRouteProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const heroTitle = page.heroTitle || page.title || "Beacon Hill Youth Soccer";
  const heroText = page.heroText || page.summary;
  const hasBody = Boolean(page.body && page.body.length > 0);

  return (
    <>
      <PageHero
        title={heroTitle}
        text={heroText}
        image={page.heroImage}
        cta={{ label: page.callToActionLabel, url: page.callToActionLink }}
      />

      {hasBody ? (
        <section className="bg-white pb-12 sm:pb-16 lg:pb-20">
          <Container>
            <div className="max-w-3xl">
              <PortableTextRenderer value={page.body} />
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
