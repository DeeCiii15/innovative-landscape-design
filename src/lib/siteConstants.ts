/**
 * Site-wide constants for local-service IA / SEO.
 * Brand, place, and path prefixes — keep client-safe (no Node fs).
 */

export const SITE_NAME = "Innovative Landscape Design";
export const CANONICAL_SITE_URL = "https://ildsc.com";

export function getSiteUrl(): string {
  return CANONICAL_SITE_URL.replace(/\/$/, "");
}

/**
 * Origin for Open Graph / Twitter images. Prefer this deployment so crawlers
 * do not fetch the outgoing ildsc.com site before DNS is cut over.
 */
export function getShareOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  const vercelHost = process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (vercelHost) return `https://${vercelHost}`;

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3001";
  }

  return getSiteUrl();
}

export function shareAssetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${getShareOrigin()}${suffix}`;
}

/** Public Formspree form id for the contact estimate form. */
export const FORMSPREE_CONTACT_ID = "xyezgrda";

export const PRIMARY_CITY = "Florence";
export const PRIMARY_REGION = "SC";
export const PRIMARY_STATE = "South Carolina";
export const PRIMARY_STATE_ABBR = "SC";

/** OpenStreetMap Nominatim geocode of 2027 Rosedale St, Florence, SC 29501. */
export const BUSINESS_GEO = {
  latitude: 34.1695049,
  longitude: -79.804088,
} as const;

/** Work (proof) URL prefix */
export const WORK_PATH = "/portfolio";
export const WORK_LABEL = "Portfolio";

export const CAREERS_PATH = "/careers";
export const EMPLOYMENT_APPLICATION_HREF =
  "/documents/innovative-landscape-employment-application.doc";

/** Year the company started — used in schema and llms.txt. */
export const FOUNDING_YEAR = 2005;
export const LOGIN_PATH = "https://portal.golmn.com/login/4RF8cNCxVzu5-7VdjQqAqg";

/** Google Business Profile for ILD Innovative Landscape Design, 2027 Rosedale St. */
export const GOOGLE_PLACE_CID = "11877035272279370657";
export const GOOGLE_FEATURE_ID = "0x88556134f75ee591:0xa4d3b4a724ff2ba1";
export const GOOGLE_MAPS_URL = `https://www.google.com/maps?cid=${GOOGLE_PLACE_CID}`;
export const GOOGLE_REVIEWS_URL = GOOGLE_MAPS_URL;
export const GOOGLE_WRITE_REVIEW_URL = `https://www.google.com/search?q=ILD+Innovative+Landscape+Design+Florence&lrd=${GOOGLE_FEATURE_ID},3`;

export const SERVICE_AREAS = [
  "Florence",
  "Quinby",
  "Effingham",
  "Timmonsville",
  "Darlington",
  "Lake City",
] as const;
