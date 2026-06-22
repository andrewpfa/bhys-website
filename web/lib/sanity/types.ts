export type SanityImage = {
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  } | null;
  alt?: string | null;
} | null;

export type NavigationLink = {
  label?: string | null;
  url?: string | null;
  category?: string | null;
  displayOrder?: number | null;
  active?: boolean | null;
};

export type CtaButton = {
  label?: string | null;
  url?: string | null;
} | null;

export type SiteSettings = {
  siteTitle?: string | null;
  tagline?: string | null;
  description?: string | null;
  logo?: SanityImage;
  mainRegistrationUrl?: string | null;
  mobileRegisterCtaLabel?: string | null;
  mobileRegisterCtaUrl?: string | null;
  alertBannerEnabled?: boolean | null;
  alertBannerText?: string | null;
  alertBannerLink?: string | null;
  mainNavigation?: NavigationLink[] | null;
  footerLinks?: NavigationLink[] | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  mailingAddress?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
} | null;

export type RegistrationGuideCard = {
  title?: string | null;
  slug?: { current?: string | null } | null;
  summary?: string | null;
  category?: string | null;
  registrationStatus?: string | null;
  registrationUrl?: string | null;
  heroImage?: SanityImage;
  primaryCtaLabel?: string | null;
  primaryCtaLink?: string | null;
} | null;

export type Homepage = {
  heroTitle?: string | null;
  heroText?: string | null;
  heroImage?: SanityImage;
  primaryButton?: CtaButton;
  secondaryButton?: CtaButton;
  registrationSectionTitle?: string | null;
  registrationSectionText?: string | null;
  registrationSectionCtaLabel?: string | null;
  registrationSectionCtaLink?: string | null;
  registrationCards?: RegistrationGuideCard[] | null;
} | null;
