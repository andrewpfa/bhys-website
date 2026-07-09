import type { SiteSettings } from "@/lib/sanity/types";

export function getRegistrationPortalUrl(
  settings: SiteSettings,
  guideRegistrationUrl?: string | null,
): string | null {
  return (
    guideRegistrationUrl ||
    settings?.mainRegistrationUrl ||
    settings?.fallRegistrationUrl ||
    null
  );
}

export const PROGRAMS_REGISTRATION_PATH = "/register";
export const BACK_TO_PROGRAMS_LABEL = "Back to Programs & Registration";
