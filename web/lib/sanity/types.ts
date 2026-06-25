import type { PortableTextBlock } from "@portabletext/react";

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
  fallRegistrationUrl?: string | null;
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
  newsSectionTitle?: string | null;
  newsSectionIntroText?: string | null;
  newsSectionCtaLabel?: string | null;
  newsSectionCtaLink?: string | null;
  featuredNewsLimit?: number | null;
  sponsorsSectionTitle?: string | null;
  sponsorsSectionCtaLabel?: string | null;
  sponsorsSectionCtaLink?: string | null;
  featuredSponsorsLimit?: number | null;
} | null;

export type NewsArticleCard = {
  title?: string | null;
  slug?: { current?: string | null } | null;
  category?: string | null;
  publishedAt?: string | null;
  excerpt?: string | null;
  mainImage?: SanityImage;
  featured?: boolean | null;
} | null;

export type NewsArticleDetail = {
  title?: string | null;
  slug?: { current?: string | null } | null;
  category?: string | null;
  publishedAt?: string | null;
  excerpt?: string | null;
  mainImage?: SanityImage;
  featured?: boolean | null;
  body?: PortableTextValue;
  seoTitle?: string | null;
  seoDescription?: string | null;
} | null;

export type Sponsor = {
  _id?: string | null;
  name?: string | null;
  logo?: SanityImage;
  websiteUrl?: string | null;
  sponsorLevel?: string | null;
  description?: string | null;
  featuredOnHomepage?: boolean | null;
  displayOrder?: number | null;
};

export type PortableTextValue = PortableTextBlock[] | null;

export type RelatedRef = {
  title?: string | null;
  slug?: string | null;
} | null;

export type Faq = {
  _id?: string | null;
  question?: string | null;
  answer?: PortableTextValue;
  category?: string | null;
  relatedPage?: RelatedRef;
  relatedRegistrationGuide?: RelatedRef;
};

export type RegistrationGuideDetail = {
  title?: string | null;
  slug?: { current?: string | null } | null;
  summary?: string | null;
  category?: string | null;
  registrationStatus?: string | null;
  registrationUrl?: string | null;
  heroImage?: SanityImage;
  body?: PortableTextValue;
  primaryCtaLabel?: string | null;
  primaryCtaLink?: string | null;
  relatedFAQs?: Faq[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
} | null;

export type Page = {
  title?: string | null;
  slug?: { current?: string | null } | null;
  summary?: string | null;
  heroTitle?: string | null;
  heroText?: string | null;
  heroImage?: SanityImage;
  body?: PortableTextValue;
  callToActionLabel?: string | null;
  callToActionLink?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
} | null;
