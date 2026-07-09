import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FAQAccordion } from "@/components/FAQAccordion";
import { ImportantDates } from "@/components/registration/ImportantDates";
import { PageHero } from "@/components/PageHero";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { RegisterNowCta } from "@/components/registration/RegisterNowCta";
import { Container } from "@/components/ui/Container";
import {
  BACK_TO_PROGRAMS_LABEL,
  getRegistrationPortalUrl,
  PROGRAMS_REGISTRATION_PATH,
} from "@/lib/registration";
import {
  getRegistrationGuideBySlug,
  getRegistrationGuideSlugs,
  getSiteSettings,
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
  const [guide, settings] = await Promise.all([
    getRegistrationGuideBySlug(slug),
    getSiteSettings(),
  ]);

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

  const registerUrl = getRegistrationPortalUrl(settings, guide.registrationUrl);
  const hasBody = Boolean(guide.body && guide.body.length > 0);
  const relatedFaqs = (guide.relatedFAQs ?? []).filter((faq): faq is Faq =>
    Boolean(faq?.question),
  );

  return (
    <>
      <PageHero title={title} text={guide.summary} image={guide.heroImage} />

      <section className="bg-white pb-12 sm:pb-16 lg:pb-20">
        <Container>
          <div className="max-w-3xl">
            <Link
              href={PROGRAMS_REGISTRATION_PATH}
              className="inline-flex text-sm font-semibold text-bhys-green hover:text-bhys-green-dark"
            >
              ← {BACK_TO_PROGRAMS_LABEL}
            </Link>

            {statusLabel || categoryLabel ? (
              <div className="mt-6 flex flex-wrap items-center gap-2">
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

            <ImportantDates dates={guide.importantDates} />

            {hasBody ? (
              <div className="mt-8">
                <PortableTextRenderer value={guide.body} />
              </div>
            ) : null}

            {registerUrl ? (
              <RegisterNowCta url={registerUrl} className="mt-10" />
            ) : null}
          </div>
        </Container>
      </section>

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
