import { services } from "./servicesData";
import { WORK_PATH } from "./siteConstants";

export function navLinkClass(isActive: boolean): string {
  return `nav-link ${isActive ? "nav-link--active" : ""} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2`;
}

export function navLinkIsActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#")) {
    return pathname === "/";
  }
  if (href === WORK_PATH) {
    return pathname === WORK_PATH || pathname.startsWith(`${WORK_PATH}/`) || pathname.startsWith("/gallery/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function servicesNavIsActive(pathname: string): boolean {
  return pathname.startsWith("/services/");
}

export const navLinks = [
  { href: "/#about", label: "About" },
  {
    label: "Services",
    children: services.map((s) => ({ href: `/services/${s.slug}`, label: s.navLabel })),
  },
  { href: WORK_PATH, label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
