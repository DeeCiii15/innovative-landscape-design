import { getHubsForAudience, type Audience } from "./audienceHubs";
import { CAREERS_PATH, WORK_PATH } from "./siteConstants";

export function navLinkClass(isActive: boolean): string {
  return `nav-link ${isActive ? "nav-link--active" : ""} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2`;
}

export function navLinkIsActive(pathname: string, href: string): boolean {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return false;
  }
  if (href.startsWith("/#")) {
    return pathname === "/";
  }
  if (href === WORK_PATH) {
    return pathname === WORK_PATH || pathname.startsWith(`${WORK_PATH}/`) || pathname.startsWith("/gallery/");
  }
  if (href === CAREERS_PATH) {
    return pathname === CAREERS_PATH || pathname.startsWith(`${CAREERS_PATH}/`);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavChild = { href: string; label: string };

export type NavLink =
  | { href: string; label: string; children?: never; isActive?: never; audience?: never }
  | {
      label: string;
      audience: Audience;
      children: readonly NavChild[];
      isActive: (pathname: string) => boolean;
      href?: never;
    };

export const navLinks: readonly NavLink[] = [
  { href: "/#about", label: "About" },
  {
    label: "Residential",
    audience: "residential",
    isActive: (pathname) => pathname.startsWith("/residential/"),
    children: getHubsForAudience("residential").map((hub) => ({
      href: hub.path,
      label: hub.navLabel,
    })),
  },
  {
    label: "Commercial",
    audience: "commercial",
    isActive: (pathname) => pathname.startsWith("/commercial/"),
    children: getHubsForAudience("commercial").map((hub) => ({
      href: hub.path,
      label: hub.navLabel,
    })),
  },
  { href: WORK_PATH, label: "Portfolio" },
  { href: CAREERS_PATH, label: "Careers" },
];
