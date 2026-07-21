import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { services } from "@/lib/servicesData";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

export function SiteFooter() {
  return (
    <footer className="footer mt-auto">
      <div className="container-main relative z-[1] py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8 lg:items-start">
          <div className="lg:col-span-5">
            <p className="footer__brand">{siteConfig.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">{siteConfig.tagline}</p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="footer__col-title">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`tel:${phoneDigits}`} className="font-semibold text-white hover:text-[var(--color-on-dark)]">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="footer__link">
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-white/65">{siteConfig.address}</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="footer__col-title">Services</p>
            <nav className="mt-3 flex flex-col gap-2 text-sm" aria-label="Footer services">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="footer__link">
                  {service.navLabel}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="relative z-[1] border-t border-white/10">
        <div className="container-main flex flex-col items-center justify-between gap-1 py-3 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.serviceAreas.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
