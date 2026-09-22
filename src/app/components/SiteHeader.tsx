"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoHomeLink } from "./LogoHomeLink";
import { NavMegaMenu } from "./NavMegaMenu";
import { navLinkClass, navLinkIsActive, navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/siteConfig";
import { CAREERS_PATH, LOGIN_PATH, WORK_PATH } from "@/lib/siteConstants";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

function pathUsesHeroOverlay(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/services/") ||
    pathname.startsWith("/residential/") ||
    pathname.startsWith("/commercial/") ||
    pathname === "/contact" ||
    pathname === CAREERS_PATH ||
    pathname.startsWith(`${CAREERS_PATH}/`) ||
    pathname === WORK_PATH ||
    pathname.startsWith(`${WORK_PATH}/`) ||
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

function AccountIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0"
      />
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    setMenuOpen(false);
    setOpenMenu(null);
    setOpenMobileGroup(null);
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [pathname]);

  const openDropdown = (label: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(label);
  };

  const closeDropdownSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpenMenu(null);
      closeTimer.current = null;
    }, 180);
  };

  const closeDropdownNow = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(null);
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

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdownNow();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (target instanceof Element && target.closest(".nav-dropdown--mega")) return;
      closeDropdownNow();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", closeDropdownNow, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", closeDropdownNow);
    };
  }, [openMenu]);

  const overHero = overHeroPages && !scrolled && !menuOpen;

  return (
    <>
    <header className={`site-header ${overHeroPages ? "site-header--overlay" : ""} ${overHero ? "site-header--over-hero" : ""} ${menuOpen ? "site-header--menu-open" : ""}`}>
      <div className="container-main site-header__bar">
        <LogoHomeLink />

        <nav className="site-header__nav" aria-label="Main">
          {navLinks.map((link) => {
            if (link.children) {
              const isOpen = openMenu === link.label;
              const isActive = link.isActive(pathname);
              return (
                <div
                  key={link.label}
                  className={`nav-dropdown nav-dropdown--mega ${isOpen ? "nav-dropdown--open" : ""}`}
                  onMouseEnter={() => openDropdown(link.label)}
                  onMouseLeave={closeDropdownSoon}
                >
                  <button
                    type="button"
                    className={navLinkClass(isActive)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => (isOpen ? closeDropdownNow() : openDropdown(link.label))}
                  >
                    {link.label}
                    <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5 opacity-70" aria-hidden>
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div
                    className="nav-dropdown__menu"
                    role="menu"
                    aria-label={link.label}
                    hidden={!isOpen}
                  >
                    <NavMegaMenu audience={link.audience} onNavigate={closeDropdownNow} />
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(navLinkIsActive(pathname, link.href))}
                aria-current={navLinkIsActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <a
            href={LOGIN_PATH}
            className="nav-account"
            aria-label="Customer portal"
            title="Customer portal"
            rel="noopener noreferrer"
          >
            <AccountIcon />
          </a>
          <Link
            href="/contact"
            className="btn-primary site-header__cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
          >
            Free estimate
          </Link>
        </div>

        <div className="site-header__mobile">
          <a
            href={LOGIN_PATH}
            className="nav-account"
            aria-label="Customer portal"
            title="Customer portal"
            rel="noopener noreferrer"
          >
            <AccountIcon />
          </a>
          <button
            type="button"
            className="nav-menu-btn"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
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
                if (link.children) {
                  const isOpen = openMobileGroup === link.label;
                  const isActive = link.isActive(pathname);
                  return (
                    <div key={link.label} className="mobile-nav__group">
                      <button
                        type="button"
                        className={`mobile-nav__link mobile-nav__link--toggle ${isActive ? "mobile-nav__link--active" : ""}`}
                        aria-expanded={isOpen}
                        onClick={() => setOpenMobileGroup(isOpen ? null : link.label)}
                      >
                        {link.label}
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`mobile-nav__chevron ${isOpen ? "mobile-nav__chevron--open" : ""}`}
                          aria-hidden
                        >
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="mobile-nav__sublinks">
                          <NavMegaMenu audience={link.audience} onNavigate={() => setMenuOpen(false)} />
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className={`mobile-nav__link ${navLinkIsActive(pathname, link.href) ? "mobile-nav__link--active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="mobile-nav__actions">
              <a href={LOGIN_PATH} className="btn-secondary w-full py-3.5 text-base" rel="noopener noreferrer">
                Customer portal
              </a>
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
