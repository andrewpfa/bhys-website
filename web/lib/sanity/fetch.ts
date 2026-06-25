import { client } from "./client";
import { HOMEPAGE_QUERY } from "./queries/homepage";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "./queries/page";
import { SITE_SETTINGS_QUERY } from "./queries/siteSettings";
import type { Homepage, Page, SiteSettings } from "./types";

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
