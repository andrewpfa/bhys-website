import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "homepage" && _id == "homepage"][0]{
    heroTitle,
    heroText,
    heroImage{
      asset->{
        _id,
        url,
        metadata{lqip, dimensions}
      },
      alt
    },
    primaryButton,
    secondaryButton,
    registrationSectionTitle,
    registrationSectionText,
    registrationSectionCtaLabel,
    registrationSectionCtaLink,
    registrationCards[]->{
      title,
      slug,
      summary,
      category,
      registrationStatus,
      registrationUrl,
      heroImage{
        asset->{
          _id,
          url,
          metadata{lqip, dimensions}
        },
        alt
      },
      primaryCtaLabel,
      primaryCtaLink
    },
    newsSectionTitle,
    newsSectionIntroText,
    newsSectionCtaLabel,
    newsSectionCtaLink,
    featuredNewsLimit,
    sponsorsSectionTitle,
    sponsorsSectionCtaLabel,
    sponsorsSectionCtaLink,
    featuredSponsorsLimit
  }
`);
