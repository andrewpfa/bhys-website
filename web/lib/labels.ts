export const REGISTRATION_STATUS_LABELS: Record<string, string> = {
  open: "Registration Open",
  comingSoon: "Coming Soon",
  closed: "Registration Closed",
};

export const REGISTRATION_STATUS_STYLES: Record<string, string> = {
  open: "bg-green-100 text-green-800",
  comingSoon: "bg-amber-100 text-amber-800",
  closed: "bg-gray-100 text-gray-700",
};

export const REGISTRATION_CATEGORY_LABELS: Record<string, string> = {
  ageGroups: "Age Groups",
  fallSoccer: "Fall Soccer",
  springSoccer: "Spring Soccer",
  scholarships: "Scholarships",
  registrationHelp: "Registration Help",
  teamCommunication: "Team Communication",
};

export const NEWS_CATEGORY_LABELS: Record<string, string> = {
  registration: "Registration",
  clubNews: "Club News",
  community: "Community",
  sponsors: "Sponsors",
  volunteers: "Volunteers",
};

export const SPONSOR_LEVEL_LABELS: Record<string, string> = {
  premierSponsor: "Premier Sponsor",
  communitySponsor: "Community Sponsor",
  supportingSponsor: "Supporting Sponsor",
  partner: "Partner",
};

export function newsCategoryLabel(category?: string | null) {
  if (!category) {
    return null;
  }
  return NEWS_CATEGORY_LABELS[category] || null;
}

export function sponsorLevelLabel(level?: string | null) {
  if (!level) {
    return null;
  }
  return SPONSOR_LEVEL_LABELS[level] || null;
}

export const FAQ_CATEGORY_LABELS: Record<string, string> = {
  registration: "Registration",
  scholarships: "Scholarships",
  parents: "Parents",
  coaches: "Coaches",
  volunteers: "Volunteers",
  weather: "Weather",
  general: "General",
};

export function registrationStatusLabel(status?: string | null) {
  if (!status) {
    return null;
  }
  return REGISTRATION_STATUS_LABELS[status] || null;
}

export function registrationStatusStyle(status?: string | null) {
  return (
    (status && REGISTRATION_STATUS_STYLES[status]) ||
    REGISTRATION_STATUS_STYLES.comingSoon
  );
}
