import Link from "next/link";

import { Container } from "@/components/ui/Container";
import type { NavigationLink, SiteSettings } from "@/lib/sanity/types";

type FooterProps = {
  settings: SiteSettings;
};

const FOOTER_CATEGORIES: { key: string; title: string }[] = [
  { key: "quickLinks", title: "Quick Links" },
  { key: "resources", title: "Resources" },
  { key: "social", title: "Social" },
  { key: "contact", title: "Contact" },
];

function groupLinksByCategory(links: NavigationLink[]) {
  return FOOTER_CATEGORIES.map((category) => ({
    ...category,
    links: links.filter((link) => link?.category === category.key),
  })).filter((group) => group.links.length > 0);
}

export function Footer({ settings }: FooterProps) {
  const siteTitle = settings?.siteTitle || "Beacon Hill Youth Soccer";
  const tagline = settings?.tagline;
  const description = settings?.description;
  const footerLinks = settings?.footerLinks ?? [];
  const groupedLinks = groupLinksByCategory(footerLinks);

  const socialLinks = [
    settings?.instagramUrl
      ? { label: "Instagram", url: settings.instagramUrl }
      : null,
    settings?.facebookUrl
      ? { label: "Facebook", url: settings.facebookUrl }
      : null,
  ].filter(Boolean) as { label: string; url: string }[];

  const hasContact =
    settings?.contactEmail ||
    settings?.phoneNumber ||
    settings?.mailingAddress;

  return (
    <footer className="mt-auto border-t border-bhys-border bg-bhys-muted">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-lg font-bold text-bhys-green">{siteTitle}</p>
            {tagline ? (
              <p className="mt-2 text-sm font-medium text-bhys-ink">{tagline}</p>
            ) : null}
            {description ? (
              <p className="mt-3 text-sm leading-6 text-bhys-ink-muted">
                {description}
              </p>
            ) : null}
          </div>

          {groupedLinks.map((group) => (
            <div key={group.key}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-bhys-ink">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) =>
                  link?.label && link?.url ? (
                    <li key={`${group.key}-${link.label}-${link.url}`}>
                      <Link
                        href={link.url}
                        className="text-sm text-bhys-ink-muted hover:text-bhys-green"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          ))}

          {hasContact ? (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-bhys-ink">
                Get In Touch
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-bhys-ink-muted">
                {settings?.contactEmail ? (
                  <li>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="hover:text-bhys-green"
                    >
                      {settings.contactEmail}
                    </a>
                  </li>
                ) : null}
                {settings?.phoneNumber ? (
                  <li>
                    <a
                      href={`tel:${settings.phoneNumber}`}
                      className="hover:text-bhys-green"
                    >
                      {settings.phoneNumber}
                    </a>
                  </li>
                ) : null}
                {settings?.mailingAddress ? (
                  <li className="whitespace-pre-line">{settings.mailingAddress}</li>
                ) : null}
              </ul>

              {socialLinks.length > 0 ? (
                <ul className="mt-4 flex gap-4">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-bhys-green hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>

        <p className="mt-10 border-t border-bhys-border pt-6 text-center text-sm text-bhys-ink-muted">
          © {new Date().getFullYear()} {siteTitle}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
