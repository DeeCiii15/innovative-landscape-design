import { AboutSection } from "./components/AboutSection";
import { CtaSection } from "./components/CtaSection";
import { Hero } from "./components/Hero";
import { ReviewsSection } from "./components/ReviewsSection";
import { ServiceGalleryGrid } from "./components/ServiceGalleryGrid";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ServiceGalleryGrid />
      <ReviewsSection />
      <CtaSection />
    </div>
  );
}
