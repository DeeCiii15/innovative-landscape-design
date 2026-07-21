import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export function Hero() {
  return (
    <section className="hero" aria-label="Featured landscape">
      <div className="hero__media">
        <Image
          src={siteConfig.heroImage}
          alt={siteConfig.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="hero__image object-cover"
        />
      </div>

      <div className="hero__scrim" aria-hidden />

      <div className="container-main hero__inner">
        <div className="section-reveal flex flex-1 flex-col justify-end">
          <p className="hero__top">
            <span>{siteConfig.location}</span>
          </p>

          <h1 className="heading-hero hero__headline">{siteConfig.heroHeadline}</h1>
          <p className="hero__lead">{siteConfig.heroSubheadline}</p>

          <div className="hero__actions">
            <Link
              href="/contact"
              className="btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Request a free estimate
            </Link>
            <Link
              href="/projects"
              className="btn-ghost-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View our work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
