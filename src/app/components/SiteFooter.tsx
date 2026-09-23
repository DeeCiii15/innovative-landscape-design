import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import {
  COMMERCIAL_LANDSCAPE_PATH,
  COMMERCIAL_PROPERTY_MAINTENANCE_PATH,
  RESIDENTIAL_LANDSCAPE_PATH,
  RESIDENTIAL_LAWN_CARE_PATH,
} from "@/lib/audienceHubs";
import { CAREERS_PATH, WORK_PATH } from "@/lib/siteConstants";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

const footerLinks = [
  { href: "/#about", label: "About" },
  { href: RESIDENTIAL_LANDSCAPE_PATH, label: "Residential Landscape Services" },
  { href: RESIDENTIAL_LAWN_CARE_PATH, label: "Lawn Care Services" },
  { href: COMMERCIAL_LANDSCAPE_PATH, label: "Commercial Landscape Services" },
  { href: COMMERCIAL_PROPERTY_MAINTENANCE_PATH, label: "Property Maintenance Services" },
  { href: WORK_PATH, label: "Portfolio" },
  { href: CAREERS_PATH, label: "Careers" },
] as const;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
      <path d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1h1.3V3h-2.3C12.3 3 11 4.5 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7z" />
    </svg>
  );
}

const socialIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
} as const;

export function SiteFooter() {
  return (
    <footer className="footer mt-auto">
      <div className="container-main footer__inner">
        <Link href="/" className="footer__lockup" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/images/logo-lockup.png"
            alt={siteConfig.name}
            width={3917}
            height={2058}
            sizes="(min-width: 768px) 248px, 200px"
          />
        </Link>

        <p className="footer__contact">
          <a href={`tel:${phoneDigits}`}>{siteConfig.phone}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <span>{siteConfig.address}</span>
        </p>

        <nav className="footer__links" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <ul className="footer__social">
          {siteConfig.social.map((profile) => {
            const Icon = socialIcons[profile.name as keyof typeof socialIcons];
            return (
              <li key={profile.name}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label={profile.name}
                >
                  {Icon ? <Icon /> : profile.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="footer__legal">
        <div className="container-main footer__legal-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.serviceAreas.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
