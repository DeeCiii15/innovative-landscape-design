/**
 * Site-wide constants for local-service IA / SEO.
 * Brand, place, and path prefixes — keep client-safe (no Node fs).
 */

export const SITE_NAME = "Innovative Landscape Design";
export const CANONICAL_SITE_URL = "https://ildsc.com";

export function getSiteUrl(): string {
  return CANONICAL_SITE_URL.replace(/\/$/, "");
}

export const PRIMARY_CITY = "Florence";
export const PRIMARY_REGION = "SC";
export const PRIMARY_STATE = "South Carolina";
export const PRIMARY_STATE_ABBR = "SC";

/** Work (proof) URL prefix */
export const WORK_PATH = "/projects";

/** Main offering slug — drives Location Hub + map */
export const MAIN_SERVICE_SLUG = "landscape-design";

export const FLORENCE_LANDSCAPE_PATH = "/florence-sc-landscape-design";
export const FLORENCE_LANDSCAPE_TITLE = "Florence, SC Landscape Design | Innovative Landscape Design";
export const FLORENCE_LANDSCAPE_TITLE_SHORT = "Florence, SC Landscape Design";

export const SERVICE_AREAS = [
  "Florence",
  "Quinby",
  "Effingham",
  "Timmonsville",
  "Darlington",
  "Lake City",
] as const;
