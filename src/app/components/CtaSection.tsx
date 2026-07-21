import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

export function CtaSection({
  className = "",
  headline,
  subheadline,
}: {
  className?: string;
  headline?: string;
  subheadline?: string;
}) {
  return (
    <section className={`section--tight ${className}`}>
      <div className="container-main">
        <div className="cta__panel">
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
