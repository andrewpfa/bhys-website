import { defineQuery } from "next-sanity";

export const FAQS_QUERY = defineQuery(/* groq */ `
  *[_type == "faq" && isActive == true] | order(category asc, displayOrder asc){
    _id,
    question,
    answer,
    category,
    relatedPage->{title, "slug": slug.current},
    relatedRegistrationGuide->{title, "slug": slug.current}
  }
`);
