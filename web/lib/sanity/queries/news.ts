import { defineQuery } from "next-sanity";

const MAIN_IMAGE_PROJECTION = /* groq */ `
  mainImage{
    asset->{
      _id,
      url,
      metadata{lqip, dimensions}
    },
    alt
  }
`;

const NEWS_CARD_FIELDS = /* groq */ `
  title,
  slug,
  category,
  publishedAt,
  excerpt,
  featured,
  ${MAIN_IMAGE_PROJECTION}
`;

export const NEWS_ARTICLES_QUERY = defineQuery(/* groq */ `
  *[_type == "newsArticle" && isActive == true] | order(publishedAt desc){
    ${NEWS_CARD_FIELDS}
  }
`);

export const LATEST_NEWS_QUERY = defineQuery(/* groq */ `
  *[_type == "newsArticle" && isActive == true]
    | order(featured desc, publishedAt desc){
      ${NEWS_CARD_FIELDS}
    }
`);

export const NEWS_ARTICLE_QUERY = defineQuery(/* groq */ `
  *[_type == "newsArticle" && slug.current == $slug && isActive == true][0]{
    ${NEWS_CARD_FIELDS},
    body,
    seoTitle,
    seoDescription
  }
`);

export const NEWS_ARTICLE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "newsArticle" && isActive == true && defined(slug.current)].slug.current
`);
