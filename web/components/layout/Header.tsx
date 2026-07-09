import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { getRegistrationPortalUrl } from "@/lib/registration";
import { isExternalUrl } from "@/lib/navigation";
import { urlForImage } from "@/lib/sanity/image";
import type { SiteSettings } from "@/lib/sanity/types";

import { AlertBanner } from "./AlertBanner";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";

type HeaderProps = {
  settings: SiteSettings;
};

export function Header({ settings }: HeaderProps) {
  const siteTitle = settings?.siteTitle || "Beacon Hill Youth Soccer";
  const navLinks = settings?.mainNavigation ?? [];
  const registerUrl = getRegistrationPortalUrl(settings);

  const logoUrl = settings?.logo?.asset?.url
    ? urlForImage(settings.logo).width(160).height(48).fit("max").url()
    : null;

  return (
    <header className="relative border-b border-bhys-border bg-white">
      {settings?.alertBannerEnabled ? (
        <AlertBanner
          text={settings.alertBannerText}
          link={settings.alertBannerLink}
        />
      ) : null}

      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={settings?.logo?.alt || siteTitle}
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          ) : (
            <span className="text-lg font-bold text-bhys-green sm:text-xl">
              {siteTitle}
            </span>
          )}
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) =>
              link?.label && link?.url ? (
                <li key={`${link.label}-${link.url}`}>
                  <NavLink href={link.url} label={link.label} />
                </li>
              ) : null,
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {registerUrl ? (
            <CtaButton
              href={registerUrl}
              external={isExternalUrl(registerUrl)}
              className="px-3 py-2 text-xs sm:px-4 sm:text-sm"
            >
              Register Now
            </CtaButton>
          ) : null}

          <MobileMenu links={navLinks} registerUrl={registerUrl || ""} />
        </div>
      </Container>
    </header>
  );
}
