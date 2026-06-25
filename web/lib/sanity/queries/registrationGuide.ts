import { defineQuery } from "next-sanity";

const HERO_IMAGE_PROJECTION = /* groq */ `
  heroImage{
    asset->{
      _id,
      url,
      metadata{lqip, dimensions}
    },
    alt
  }
`;

export const REGISTRATION_GUIDES_QUERY = defineQuery(/* groq */ `
  *[_type == "registrationGuide" && isActive == true] | order(displayOrder asc, title asc){
    title,
    slug,
    summary,
    category,
    registrationStatus,
    registrationUrl,
    ${HERO_IMAGE_PROJECTION},
    primaryCtaLabel,
    primaryCtaLink
  }
`);

export const REGISTRATION_GUIDE_QUERY = defineQuery(/* groq */ `
  *[_type == "registrationGuide" && slug.current == $slug && isActive == true][0]{
    title,
    slug,
    summary,
    category,
    registrationStatus,
    registrationUrl,
    ${HERO_IMAGE_PROJECTION},
    body,
    primaryCtaLabel,
    primaryCtaLink,
    relatedFAQs[]->{
      _id,
      question,
      answer,
      category,
      relatedPage->{title, "slug": slug.current},
      relatedRegistrationGuide->{title, "slug": slug.current}
    },
    seoTitle,
    seoDescription
  }
`);

export const REGISTRATION_GUIDE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "registrationGuide" && isActive == true && defined(slug.current)].slug.current
`);
