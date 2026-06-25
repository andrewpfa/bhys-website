import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FAQAccordion } from "@/components/FAQAccordion";
import { PageHero } from "@/components/PageHero";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { Container } from "@/components/ui/Container";
import { getFaqs, getPageBySlug, getPageSlugs } from "@/lib/sanity/fetch";

const FAQ_PAGE_SLUG = "resources";

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

  const faqs = slug === FAQ_PAGE_SLUG ? await getFaqs() : [];

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

      {faqs.length > 0 ? (
        <section className="bg-bhys-muted py-12 sm:py-16 lg:py-20">
          <Container>
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-bhys-ink sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-base leading-7 text-bhys-ink-muted">
                Answers to common questions about programs, registration, and
                getting involved.
              </p>
              <div className="mt-10">
                <FAQAccordion faqs={faqs} />
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
