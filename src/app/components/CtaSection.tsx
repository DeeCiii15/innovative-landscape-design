import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { siteImages } from "@/lib/siteImages";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

export function CtaSection({
  className = "",
  headline,
  subheadline,
  backgroundImage = siteImages.ctaAerial,
  backgroundImageAlt = "Aerial view of a finished front-yard landscape",
  revealFixed = true,
}: {
  className?: string;
  headline?: string;
  subheadline?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  revealFixed?: boolean;
}) {
  return (
    <section className={`cta-section section--tight ${className}`.trim()}>
      <div className="container-main">
        <div
          className={`cta__panel${backgroundImage || revealFixed ? " cta__panel--photo" : ""}${revealFixed ? " cta__panel--window" : ""}`}
        >
          {backgroundImage && !revealFixed ? (
            <>
              <div className="cta__media">
                <Image
                  src={backgroundImage}
                  alt={backgroundImageAlt}
                  fill
                  sizes="(min-width: 1200px) 78rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="cta__scrim" aria-hidden />
            </>
          ) : revealFixed ? (
            <div className="cta__scrim" aria-hidden />
          ) : null}
          <div className="cta__grid">
            <div>
              <h2 className="cta__title">{headline ?? siteConfig.ctaHeadline}</h2>
              <p className="cta__text">{subheadline ?? siteConfig.ctaSubheadline}</p>
            </div>
            <div className="cta__actions">
              <Link
                href="/contact"
                className="btn-primary bg-white text-[var(--color-brand-dark)] hover:bg-[var(--color-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-dark)]"
              >
                Request a free estimate
              </Link>
              <a
                href={`tel:${phoneDigits}`}
                className="btn-ghost-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
