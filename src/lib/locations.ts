import { FLORENCE_LANDSCAPE_PATH, MAIN_SERVICE_SLUG } from "./siteConstants";

export type LocationStatus = "live" | "soon";

export type LocationDef = {
  id: string;
  city: string;
  path: string;
  status: LocationStatus;
  serviceSlug: string;
  x: number;
  y: number;
  featured?: boolean;
};

/** Location hubs — only `live` entries get routes + sitemap entries */
export const locations: LocationDef[] = [
  {
    id: "florence",
    city: "Florence",
    path: FLORENCE_LANDSCAPE_PATH,
    status: "live",
    serviceSlug: MAIN_SERVICE_SLUG,
    x: 52,
    y: 48,
    featured: true,
  },
  {
    id: "quinby",
    city: "Quinby",
    path: "/quinby-sc-landscape-design",
    status: "soon",
    serviceSlug: MAIN_SERVICE_SLUG,
    x: 58,
    y: 42,
  },
  {
    id: "effingham",
    city: "Effingham",
    path: "/effingham-sc-landscape-design",
    status: "soon",
    serviceSlug: MAIN_SERVICE_SLUG,
    x: 48,
    y: 62,
  },
  {
    id: "timmonsville",
    city: "Timmonsville",
    path: "/timmonsville-sc-landscape-design",
    status: "soon",
    serviceSlug: MAIN_SERVICE_SLUG,
    x: 38,
    y: 50,
  },
  {
    id: "darlington",
    city: "Darlington",
    path: "/darlington-sc-landscape-design",
    status: "soon",
    serviceSlug: MAIN_SERVICE_SLUG,
    x: 45,
    y: 28,
  },
  {
    id: "lake-city",
    city: "Lake City",
    path: "/lake-city-sc-landscape-design",
    status: "soon",
    serviceSlug: MAIN_SERVICE_SLUG,
    x: 55,
    y: 78,
  },
];

export function getLiveLocations(): LocationDef[] {
  return locations.filter((l) => l.status === "live");
}

export function getLocationByPath(path: string): LocationDef | undefined {
  return locations.find((l) => l.path === path && l.status === "live");
}

export function getLocationById(id: string): LocationDef | undefined {
  return locations.find((l) => l.id === id);
}

/** Prefer longest id / prefix match against a work item location string or slug */
export function matchLiveLocationForWork(locationLabel: string): LocationDef | undefined {
  const live = getLiveLocations();
  const normalized = locationLabel.toLowerCase();
  const sorted = [...live].sort((a, b) => b.id.length - a.id.length);
  return sorted.find((loc) => normalized.includes(loc.id.replace(/-/g, " ")) || normalized.includes(loc.city.toLowerCase()));
}
