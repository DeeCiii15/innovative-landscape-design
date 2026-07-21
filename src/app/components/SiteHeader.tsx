"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoHomeLink } from "./LogoHomeLink";
import { navLinkClass, navLinkIsActive, navLinks, servicesNavIsActive } from "@/lib/nav";
import { siteConfig } from "@/lib/siteConfig";
import { FLORENCE_LANDSCAPE_PATH, WORK_PATH } from "@/lib/siteConstants";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

function pathUsesHeroOverlay(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/services/") ||
    pathname === "/contact" ||
    pathname === WORK_PATH ||
    pathname.startsWith(`${WORK_PATH}/`) ||
    pathname === FLORENCE_LANDSCAPE_PATH ||
    pathname.startsWith("/gallery/")
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" d="M4 8h16M4 16h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4 shrink-0" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const overHeroPages = pathUsesHeroOverlay(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [pathname]);

  const openServices = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setServicesOpen(true);
  };

  const closeServicesSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setServicesOpen(false);
      closeTimer.current = null;
    }, 180);
  };

  const closeServicesNow = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setServicesOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!overHeroPages) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHeroPages]);

  const overHero = overHeroPages && !scrolled && !menuOpen;

  return (
    <>
    <header className={`site-header ${overHeroPages ? "site-header--overlay" : ""} ${overHero ? "site-header--over-hero" : ""} ${menuOpen ? "site-header--menu-open" : ""}`}>
      <div className="container-main flex items-center justify-between gap-6" style={{ height: "var(--header-height)" }}>
        <LogoHomeLink />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const children = "children" in link ? link.children : undefined;
            if (children) {
              const servicesActive = servicesNavIsActive(pathname);
              return (
                <div
                  key={link.label}
                  className={`nav-dropdown ${servicesOpen ? "nav-dropdown--open" : ""}`}
                  onMouseEnter={openServices}
                  onMouseLeave={closeServicesSoon}
                >
                  <button
                    type="button"
                    className={navLinkClass(servicesActive)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="listbox"
                    onClick={() => (servicesOpen ? closeServicesNow() : openServices())}
                  >
                    {link.label}
                    <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5 opacity-70" aria-hidden>
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="nav-dropdown__menu" role="listbox" aria-label="Services">
                    <div className="nav-dropdown__panel">
                      {children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="option"
                          aria-selected={pathname === child.href}
                          className={`nav-dropdown__item ${pathname === child.href ? "nav-dropdown__item--active" : ""}`}
                          onClick={closeServicesNow}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={"href" in link ? link.href : link.label}
                href={"href" in link ? link.href : "/"}
                className={navLinkClass("href" in link ? navLinkIsActive(pathname, link.href) : false)}
                aria-current={"href" in link && navLinkIsActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${phoneDigits}`}
            className="nav-phone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
          >
            <PhoneIcon />
            {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            className="btn-primary px-5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
          >
            Free estimate
          </Link>
        </div>

        <button
          type="button"
          className="nav-menu-btn lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

    </header>

      {menuOpen && (
        <div id="mobile-nav" className="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="mobile-nav__backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
          <div className="mobile-nav__panel">
            <div className="mobile-nav__header">
              <LogoHomeLink />
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="nav-menu-btn">
                <CloseIcon />
              </button>
            </div>

            <nav className="mobile-nav__links" aria-label="Mobile">
              {navLinks.map((link) => {
                const children = "children" in link ? link.children : undefined;
                if (children) {
                  const servicesActive = servicesNavIsActive(pathname);
                  return (
                    <div key={link.label} className="mobile-nav__group">
                      <button
                        type="button"
                        className={`mobile-nav__link mobile-nav__link--toggle ${servicesActive ? "mobile-nav__link--active" : ""}`}
                        aria-expanded={mobileServicesOpen}
                        onClick={() => setMobileServicesOpen((open) => !open)}
                      >
                        {link.label}
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`mobile-nav__chevron ${mobileServicesOpen ? "mobile-nav__chevron--open" : ""}`}
                          aria-hidden
                        >
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {mobileServicesOpen && (
                        <div className="mobile-nav__sublinks">
                          {children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`mobile-nav__sublink ${pathname === child.href ? "mobile-nav__sublink--active" : ""}`}
                              onClick={() => setMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={"href" in link ? link.href : link.label}>
                    <Link
                      href={"href" in link ? link.href : "/"}
                      className={`mobile-nav__link ${"href" in link && navLinkIsActive(pathname, link.href) ? "mobile-nav__link--active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="mobile-nav__actions">
              <a href={`tel:${phoneDigits}`} className="btn-secondary w-full py-3.5 text-base" onClick={() => setMenuOpen(false)}>
                <PhoneIcon />
                {siteConfig.phone}
              </a>
              <Link href="/contact" className="btn-primary w-full py-3.5 text-base" onClick={() => setMenuOpen(false)}>
                Request a free estimate
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
