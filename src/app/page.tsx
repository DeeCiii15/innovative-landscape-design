import { AboutSection } from "./components/AboutSection";
import { AudienceSplit } from "./components/AudienceSplit";
import { CtaSection } from "./components/CtaSection";
import { Hero } from "./components/Hero";
import { HomeAerial } from "./components/HomeAerial";
import { PortfolioMarquee } from "./components/PortfolioMarquee";
import { ProcessStory } from "./components/ProcessStory";
import { ReviewsSection } from "./components/ReviewsSection";
import { siteImages } from "@/lib/siteImages";

export default function Home() {
  return (
    <div className="home">
      <HomeAerial />
      <Hero />
      <AboutSection />
      <AudienceSplit />
      <ProcessStory family="company" />
      <PortfolioMarquee />
      <ReviewsSection />
      <CtaSection
        revealFixed
        backgroundImage={siteImages.ctaAerial}
        backgroundImageAlt="Aerial view of a curved front-yard lawn and planting beds"
      />
    </div>
  );
}
