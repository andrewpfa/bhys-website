import { client } from "./client";
import { HOMEPAGE_QUERY } from "./queries/homepage";
import { SITE_SETTINGS_QUERY } from "./queries/siteSettings";
import type { Homepage, SiteSettings } from "./types";

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
