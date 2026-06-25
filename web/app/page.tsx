import { HeroSection } from "@/components/home/HeroSection";
import { LatestNewsSection } from "@/components/home/LatestNewsSection";
import { RegistrationCardsSection } from "@/components/home/RegistrationCardsSection";
import { SponsorStrip } from "@/components/home/SponsorStrip";
import { getFeaturedSponsors, getHomepage, getLatestNews } from "@/lib/sanity/fetch";

export default async function Home() {
  const homepage = await getHomepage();

  const newsLimit = homepage?.featuredNewsLimit ?? 3;
  const sponsorsLimit = homepage?.featuredSponsorsLimit ?? 6;

  const [latestNews, featuredSponsors] = await Promise.all([
    getLatestNews(newsLimit),
    getFeaturedSponsors(sponsorsLimit),
  ]);

  return (
    <>
      <HeroSection homepage={homepage} />
      <RegistrationCardsSection homepage={homepage} />
      <LatestNewsSection homepage={homepage} articles={latestNews} />
      <SponsorStrip homepage={homepage} sponsors={featuredSponsors} />
    </>
  );
}
