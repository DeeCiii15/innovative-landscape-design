import { HeroPhoto } from "./HeroPhoto";
import { siteConfig } from "@/lib/siteConfig";

export function Hero() {
  return (
    <section className="hero" aria-label="Featured landscape">
      <div className="hero__media">
        <div className="hero__drift">
          <HeroPhoto src={siteConfig.heroImage} alt={siteConfig.heroImageAlt} />
        </div>
      </div>

      <div className="container-main hero__inner">
        <div className="section-reveal flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="heading-hero hero__headline">
            Landscapes built for <em className="hero__place">Florence</em>
          </h1>
        </div>
      </div>
    </section>
  );
}
