import { HeroSection } from "@/components/home/HeroSection";
import { RegistrationCardsSection } from "@/components/home/RegistrationCardsSection";
import { getHomepage } from "@/lib/sanity/fetch";

export default async function Home() {
  const homepage = await getHomepage();

  return (
    <>
      <HeroSection homepage={homepage} />
      <RegistrationCardsSection homepage={homepage} />
    </>
  );
}
