import { defineQuery } from "next-sanity";

export const PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && slug.current == $slug && isActive == true][0]{
    title,
    slug,
    summary,
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
    body,
    callToActionLabel,
    callToActionLink,
    seoTitle,
    seoDescription
  }
`);

export const PAGE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && isActive == true && defined(slug.current)].slug.current
`);
