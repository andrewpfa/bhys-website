import { defineQuery } from "next-sanity";

const LOGO_PROJECTION = /* groq */ `
  logo{
    asset->{
      _id,
      url,
      metadata{lqip, dimensions}
    },
    alt
  }
`;

export const SPONSORS_QUERY = defineQuery(/* groq */ `
  *[_type == "sponsor" && isActive == true]
    | order(featuredOnHomepage desc, displayOrder asc, name asc){
      _id,
      name,
      ${LOGO_PROJECTION},
      websiteUrl,
      sponsorLevel,
      description,
      featuredOnHomepage,
      displayOrder
    }
`);

export const FEATURED_SPONSORS_QUERY = defineQuery(/* groq */ `
  *[_type == "sponsor" && isActive == true && featuredOnHomepage == true]
    | order(displayOrder asc, name asc){
      _id,
      name,
      ${LOGO_PROJECTION},
      websiteUrl,
      sponsorLevel
    }
`);
