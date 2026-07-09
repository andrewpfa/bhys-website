import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteTitle,
    tagline,
    description,
    logo{
      asset->{
        _id,
        url,
        metadata{lqip, dimensions}
      },
      alt
    },
    mainRegistrationUrl,
    fallRegistrationUrl,
    donationUrl,
    sponsorEnquiryFormUrl,
    currentSeason,
    mobileRegisterCtaLabel,
    mobileRegisterCtaUrl,
    alertBannerEnabled,
    alertBannerText,
    alertBannerLink,
    mainNavigation[active == true] | order(displayOrder asc){
      label,
      url,
      category,
      displayOrder,
      active
    },
    footerLinks[active == true] | order(displayOrder asc){
      label,
      url,
      category,
      displayOrder,
      active
    },
    contactEmail,
    phoneNumber,
    mailingAddress,
    instagramUrl,
    facebookUrl
  }
`);
