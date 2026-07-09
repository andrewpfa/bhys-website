import { defineQuery } from "next-sanity";

export const EXTERNAL_LINKS_QUERY = defineQuery(/* groq */ `
  *[_type == "externalLink" && isActive == true] | order(category asc, displayOrder asc, title asc){
    _id,
    title,
    url,
    description,
    category,
    displayOrder
  }
`);
