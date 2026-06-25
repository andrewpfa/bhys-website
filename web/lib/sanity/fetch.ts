import { client } from "./client";
import { FAQS_QUERY } from "./queries/faq";
import { HOMEPAGE_QUERY } from "./queries/homepage";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "./queries/page";
import {
  REGISTRATION_GUIDE_QUERY,
  REGISTRATION_GUIDE_SLUGS_QUERY,
  REGISTRATION_GUIDES_QUERY,
} from "./queries/registrationGuide";
import { SITE_SETTINGS_QUERY } from "./queries/siteSettings";
import type {
  Faq,
  Homepage,
  Page,
  RegistrationGuideCard,
  RegistrationGuideDetail,
  SiteSettings,
} from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export async function getHomepage(): Promise<Homepage> {
  try {
    return await client.fetch(HOMEPAGE_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<Page> {
  try {
    return await client.fetch(PAGE_QUERY, { slug }, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export async function getPageSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch(
      PAGE_SLUGS_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
    return ((slugs ?? []) as (string | null)[]).filter(
      (slug): slug is string => Boolean(slug),
    );
  } catch {
    return [];
  }
}

export async function getRegistrationGuides(): Promise<RegistrationGuideCard[]> {
  try {
    const guides = await client.fetch(
      REGISTRATION_GUIDES_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
    return (guides ?? []) as RegistrationGuideCard[];
  } catch {
    return [];
  }
}

export async function getRegistrationGuideBySlug(
  slug: string,
): Promise<RegistrationGuideDetail> {
  try {
    return await client.fetch(
      REGISTRATION_GUIDE_QUERY,
      { slug },
      { next: { revalidate: 60 } },
    );
  } catch {
    return null;
  }
}

export async function getRegistrationGuideSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch(
      REGISTRATION_GUIDE_SLUGS_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
    return ((slugs ?? []) as (string | null)[]).filter(
      (slug): slug is string => Boolean(slug),
    );
  } catch {
    return [];
  }
}

export async function getFaqs(): Promise<Faq[]> {
  try {
    const faqs = await client.fetch(
      FAQS_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
    return (faqs ?? []) as Faq[];
  } catch {
    return [];
  }
}
