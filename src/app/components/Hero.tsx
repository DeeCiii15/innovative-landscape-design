import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export function Hero() {
  return (
    <section className="hero" aria-label="Featured landscape">
      <div className="hero__media">
        <div className="hero__drift">
          <Image
            src={siteConfig.heroImage}
            alt={siteConfig.heroImageAlt}
            fill
            priority
            quality={85}
            sizes="100vw"
            className="hero__image object-cover"
          />
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
