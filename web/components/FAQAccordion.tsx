import Link from "next/link";

import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { FAQ_CATEGORY_LABELS } from "@/lib/labels";
import type { Faq } from "@/lib/sanity/types";

type FAQAccordionProps = {
  faqs: Faq[];
  grouped?: boolean;
};

function FaqRelatedLinks({ faq }: { faq: Faq }) {
  const links: { label: string; href: string }[] = [];

  if (faq.relatedRegistrationGuide?.slug) {
    links.push({
      label: faq.relatedRegistrationGuide.title || "Related guide",
      href: `/register/${faq.relatedRegistrationGuide.slug}`,
    });
  }

  if (faq.relatedPage?.slug) {
    links.push({
      label: faq.relatedPage.title || "Related page",
      href: `/${faq.relatedPage.slug}`,
    });
  }

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-bhys-green hover:text-bhys-green-dark hover:underline"
        >
          {link.label} →
        </Link>
      ))}
    </div>
  );
}

function FaqItem({ faq }: { faq: Faq }) {
  if (!faq?.question) {
    return null;
  }

  return (
    <details className="group border-b border-bhys-border last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-base font-semibold text-bhys-ink focus-visible:outline-none">
        <span>{faq.question}</span>
        <svg
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-bhys-ink-muted transition-transform group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <div className="pb-5">
        {faq.answer && faq.answer.length > 0 ? (
          <PortableTextRenderer value={faq.answer} />
        ) : null}
        <FaqRelatedLinks faq={faq} />
      </div>
    </details>
  );
}

function groupByCategory(faqs: Faq[]) {
  const groups: { category: string; title: string; faqs: Faq[] }[] = [];

  for (const faq of faqs) {
    const category = faq.category || "general";
    const title = FAQ_CATEGORY_LABELS[category] || "General";
    let group = groups.find((entry) => entry.category === category);
    if (!group) {
      group = { category, title, faqs: [] };
      groups.push(group);
    }
    group.faqs.push(faq);
  }

  return groups;
}

export function FAQAccordion({ faqs, grouped = true }: FAQAccordionProps) {
  const items = (faqs ?? []).filter((faq): faq is Faq => Boolean(faq?.question));

  if (items.length === 0) {
    return null;
  }

  if (!grouped) {
    return (
      <div className="rounded-2xl border border-bhys-border bg-white px-5 sm:px-6">
        {items.map((faq, index) => (
          <FaqItem key={faq._id || `${faq.question}-${index}`} faq={faq} />
        ))}
      </div>
    );
  }

  const groups = groupByCategory(items);

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.category}>
          <h3 className="text-lg font-semibold text-bhys-ink">{group.title}</h3>
          <div className="mt-4 rounded-2xl border border-bhys-border bg-white px-5 sm:px-6">
            {group.faqs.map((faq, index) => (
              <FaqItem key={faq._id || `${faq.question}-${index}`} faq={faq} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
