import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FAQAccordion } from "@/components/FAQAccordion";
import { PageHero } from "@/components/PageHero";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { Container } from "@/components/ui/Container";
import {
  getRegistrationGuideBySlug,
  getRegistrationGuideSlugs,
} from "@/lib/sanity/fetch";
import {
  REGISTRATION_CATEGORY_LABELS,
  registrationStatusLabel,
  registrationStatusStyle,
} from "@/lib/labels";
import type { Faq } from "@/lib/sanity/types";

type GuideRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getRegistrationGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GuideRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getRegistrationGuideBySlug(slug);

  if (!guide) {
    return {};
  }

  return {
    title: guide.seoTitle || guide.title || undefined,
    description: guide.seoDescription || guide.summary || undefined,
  };
}

export default async function RegistrationGuidePage({ params }: GuideRouteProps) {
  const { slug } = await params;
  const guide = await getRegistrationGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const title = guide.title || "Registration Guide";
  const showStatusBadge =
    guide.category === "fallSoccer" || guide.category === "springSoccer";
  const statusLabel = showStatusBadge
    ? registrationStatusLabel(guide.registrationStatus)
    : null;
  const statusStyle = registrationStatusStyle(guide.registrationStatus);
  const categoryLabel = guide.category
    ? REGISTRATION_CATEGORY_LABELS[guide.category] || null
    : null;

  const ctaLabel =
    guide.primaryCtaLabel || (guide.registrationUrl ? "Register Now" : null);
  const ctaLink = guide.primaryCtaLink || guide.registrationUrl || null;

  const hasBody = Boolean(guide.body && guide.body.length > 0);
  const relatedFaqs = (guide.relatedFAQs ?? []).filter((faq): faq is Faq =>
    Boolean(faq?.question),
  );

  return (
    <>
      <PageHero
        title={title}
        text={guide.summary}
        image={guide.heroImage}
        cta={ctaLabel && ctaLink ? { label: ctaLabel, url: ctaLink } : undefined}
      />

      {statusLabel || categoryLabel || hasBody ? (
        <section className="bg-white pb-12 sm:pb-16 lg:pb-20">
          <Container>
            <div className="max-w-3xl">
              {statusLabel || categoryLabel ? (
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
              ) : null}

              {hasBody ? (
                <div className="mt-6">
                  <PortableTextRenderer value={guide.body} />
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {relatedFaqs.length > 0 ? (
        <section className="bg-bhys-muted py-12 sm:py-16 lg:py-20">
          <Container>
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-bhys-ink sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-8">
                <FAQAccordion faqs={relatedFaqs} grouped={false} />
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
