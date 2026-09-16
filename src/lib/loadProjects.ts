/**
 * Job galleries. Add a project by creating `public/images/projects/{slug}/`:
 * 1. Copy `_template/project.json` into the new folder and rename `slug` to the folder name.
 * 2. Drop jpg/png/webp files (`01.jpg`, `02.jpg`, or `cover.jpg`). Large photos are
 *    compressed automatically (`npm run optimize-images`, also on `npm run dev` / `npm run build`).
 * 3. Tag `serviceSlugs` with the service pages this job should appear on.
 *    Residential jobs need `neighborhood`. Commercial jobs need `businessName`.
 * Folders that start with `_` are ignored.
 */
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { isServiceSlug, services } from "./servicesData";
import { siteImages } from "./siteImages";
import type { WorkItem } from "./workData";
import type { ProjectPhoto, PropertyType } from "@/projects/types";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const PHOTO_COMPRESS_EXTENSIONS = new Set([".jpg", ".jpeg", ".webp"]);
const LARGE_PHOTO_BYTES = 80_000;
const PROJECTS_DIR = path.join(process.cwd(), "public", "images", "projects");
const PUBLIC_PREFIX = "/images/projects";
const OPTIMIZE_SCRIPT = path.join(process.cwd(), "scripts", "optimize-images.mjs");
const compressedThisBoot = new Set<string>();

function compressPhotos(filePaths: string[]) {
  if (process.env.NODE_ENV === "production") return;
  const pending = filePaths.filter((filePath) => {
    if (compressedThisBoot.has(filePath)) return false;
    if (!PHOTO_COMPRESS_EXTENSIONS.has(path.extname(filePath).toLowerCase())) return false;
    try {
      return statSync(filePath).size >= LARGE_PHOTO_BYTES;
    } catch {
      return false;
    }
  });
  pending.forEach((filePath) => compressedThisBoot.add(filePath));
  if (pending.length === 0) return;
  spawnSync(process.execPath, [OPTIMIZE_SCRIPT, ...pending], { stdio: "inherit" });
}

type PhotoJson = {
  file: string;
  serviceSlugs?: string[];
  alt?: string;
};

type ProjectJson = {
  slug?: string;
  name: string;
  propertyType: "residential" | "commercial";
  neighborhood?: string;
  businessName?: string;
  city: string;
  serviceSlugs: string[];
  featuredServiceSlug?: string;
  cover?: string;
  description: string;
  metaDescription?: string;
  story?: string;
  photos?: PhotoJson[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

const TITLE_SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "if",
  "in",
  "nor",
  "of",
  "on",
  "or",
  "the",
  "to",
  "vs",
  "via",
]);

function toTitleCase(value: string): string {
  const words = value.trim().split(/\s+/);
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      const edge = index === 0 || index === words.length - 1;
      if (!edge && TITLE_SMALL_WORDS.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.filter((item): item is string => typeof item === "string").map((item) => item.trim());
  return items;
}

function listImageFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        !entry.name.startsWith(".") &&
        IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function parseProjectJson(raw: unknown, folder: string): ProjectJson {
  if (!isRecord(raw)) throw new Error(`Invalid project.json in ${folder}: expected an object`);

  const name = asString(raw.name);
  const city = asString(raw.city);
  const propertyType = asString(raw.propertyType);
  const description = asString(raw.description);
  const serviceSlugs = asStringArray(raw.serviceSlugs);

  if (!name) throw new Error(`Invalid project.json in ${folder}: name is required`);
  if (!city) throw new Error(`Invalid project.json in ${folder}: city is required`);
  if (propertyType !== "residential" && propertyType !== "commercial") {
    throw new Error(`Invalid project.json in ${folder}: propertyType must be "residential" or "commercial"`);
  }
  if (!description) throw new Error(`Invalid project.json in ${folder}: description is required`);
  if (!serviceSlugs || serviceSlugs.length === 0) {
    throw new Error(`Invalid project.json in ${folder}: serviceSlugs must list at least one service`);
  }

  const unknownSlugs = serviceSlugs.filter((slug) => !isServiceSlug(slug));
  if (unknownSlugs.length > 0) {
    throw new Error(`Invalid project.json in ${folder}: unknown serviceSlugs (${unknownSlugs.join(", ")})`);
  }

  const slug = asString(raw.slug) ?? folder;
  if (slug !== folder) {
    throw new Error(`Invalid project.json in ${folder}: slug "${slug}" must match the folder name "${folder}"`);
  }
  if (isServiceSlug(slug)) {
    throw new Error(`Invalid project.json in ${folder}: slug "${slug}" collides with a service page`);
  }

  const photos = Array.isArray(raw.photos)
    ? raw.photos.map((photo, index): PhotoJson => {
        if (!isRecord(photo)) throw new Error(`Invalid project.json in ${folder}: photos[${index}] must be an object`);
        const file = asString(photo.file);
        if (!file) throw new Error(`Invalid project.json in ${folder}: photos[${index}].file is required`);
        const photoSlugs = asStringArray(photo.serviceSlugs);
        if (photoSlugs) {
          const bad = photoSlugs.filter((item) => !isServiceSlug(item));
          if (bad.length > 0) {
            throw new Error(`Invalid project.json in ${folder}: photos[${index}] has unknown serviceSlugs (${bad.join(", ")})`);
          }
        }
        return { file, serviceSlugs: photoSlugs, alt: asString(photo.alt) };
      })
    : undefined;

  return {
    slug,
    name,
    propertyType,
    neighborhood: asString(raw.neighborhood),
    businessName: asString(raw.businessName),
    city,
    serviceSlugs,
    featuredServiceSlug: asString(raw.featuredServiceSlug),
    cover: asString(raw.cover),
    description,
    metaDescription: asString(raw.metaDescription),
    story: asString(raw.story),
    photos,
  };
}

function placeLabelFor(json: ProjectJson, folder: string): string {
  if (json.propertyType === "residential") {
    if (!json.neighborhood) {
      throw new Error(`Invalid project.json in ${folder}: neighborhood is required for residential jobs`);
    }
    return json.neighborhood;
  }
  if (!json.businessName) {
    throw new Error(`Invalid project.json in ${folder}: businessName is required for commercial jobs`);
  }
  return json.businessName;
}

function propertyTypeLabel(value: ProjectJson["propertyType"]): PropertyType {
  return value === "commercial" ? "Commercial" : "Residential";
}

function toPhoto(
  folder: string,
  file: string,
  index: number,
  json: ProjectJson,
  placeLabel: string,
  override?: PhotoJson,
): ProjectPhoto {
  const src = `${PUBLIC_PREFIX}/${folder}/${file}`;
  return {
    file,
    src,
    alt: override?.alt ?? `${json.name} in ${placeLabel}, photo ${index + 1}`,
    serviceSlugs: override?.serviceSlugs ?? json.serviceSlugs,
  };
}

function loadProjectFolder(folder: string): WorkItem {
  const dir = path.join(PROJECTS_DIR, folder);
  const jsonPath = path.join(dir, "project.json");
  const json = parseProjectJson(JSON.parse(readFileSync(jsonPath, "utf8")) as unknown, folder);
  const placeLabel = placeLabelFor(json, folder);
  const scanned = listImageFiles(dir);
  compressPhotos(scanned.map((file) => path.join(dir, file)));

  const listed = json.photos;
  const requested = listed ? listed.map((photo) => photo.file) : scanned;
  const files = requested.filter((file) => scanned.includes(file));
  const missing = requested.filter((file) => !scanned.includes(file));
  if (missing.length > 0) {
    console.warn(`Skipping missing photos in ${folder}: ${missing.join(", ")}`);
  }

  const photos: ProjectPhoto[] = files.map((file, index) => {
    const override = listed?.find((photo) => photo.file === file);
    return toPhoto(folder, file, index, json, placeLabel, override);
  });

  const coverFile =
    (json.cover && scanned.includes(json.cover) ? json.cover : undefined) ??
    scanned.find((file) => path.parse(file).name.toLowerCase() === "cover") ??
    photos[0]?.file;
  if (json.cover && !scanned.includes(json.cover)) {
    console.warn(`Cover ${json.cover} is missing in ${folder}; using the first available photo`);
  }
  const cover = photos.find((photo) => photo.file === coverFile) ?? photos[0];

  const featuredServiceSlug = json.featuredServiceSlug ?? json.serviceSlugs[0];
  if (!json.serviceSlugs.includes(featuredServiceSlug)) {
    throw new Error(`Invalid project.json in ${folder}: featuredServiceSlug must be one of serviceSlugs`);
  }

  const featuredService = services.find((service) => service.slug === featuredServiceSlug);
  const firstService = services.find((service) => service.slug === json.serviceSlugs[0]);

  return {
    slug: json.slug ?? folder,
    folder,
    name: toTitleCase(json.name),
    title: toTitleCase(json.name),
    description: json.description,
    metaDescription: json.metaDescription ?? json.description,
    story: json.story ?? "",
    propertyType: propertyTypeLabel(json.propertyType),
    placeLabel,
    city: json.city,
    neighborhood: json.neighborhood,
    businessName: json.businessName,
    serviceSlugs: json.serviceSlugs,
    featuredServiceSlug,
    photos,
    cover: cover ?? {
      file: "",
      src: "",
      alt: `${json.name} in ${placeLabel}`,
      serviceSlugs: json.serviceSlugs,
    },
    locationLabel: placeLabel,
    type: featuredService?.name ?? firstService?.name ?? "Landscape",
    serviceName: featuredService?.name ?? firstService?.name ?? "Landscape",
  };
}

function listProjectFolders(): string[] {
  if (!existsSync(PROJECTS_DIR)) return [];
  return readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_") && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/** Reads every `public/images/projects/{slug}/project.json` (skipped folders start with `_`). */
export function getProjects(): WorkItem[] {
  const folders = listProjectFolders();
  const items: WorkItem[] = [];

  for (const folder of folders) {
    const jsonPath = path.join(PROJECTS_DIR, folder, "project.json");
    if (!existsSync(jsonPath)) {
      console.warn(`Skipping ${folder}: add project.json to publish this job`);
      continue;
    }
    try {
      items.push(loadProjectFolder(folder));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`Skipping ${folder}: ${message}`);
    }
  }

  return items;
}

export function getProjectBySlug(slug: string): WorkItem | undefined {
  return getProjects().find((item) => item.slug === slug);
}

export function projectHasService(item: WorkItem, serviceSlug: string): boolean {
  return item.serviceSlugs.includes(serviceSlug);
}

export function getProjectsByService(serviceSlug: string): WorkItem[] {
  return getProjects().filter((item) => projectHasService(item, serviceSlug));
}

/** Jobs that match a hub's audience and at least one of that hub's service tags. */
export function getProjectsForHub(propertyType: PropertyType, serviceSlugs: readonly string[]): WorkItem[] {
  const allowed = new Set(serviceSlugs);
  return getProjects().filter(
    (item) =>
      item.propertyType === propertyType &&
      item.photos.length > 0 &&
      item.serviceSlugs.some((slug) => allowed.has(slug)),
  );
}

export function getFeaturedWorkForService(serviceSlug: string): WorkItem | undefined {
  const tagged = getProjectsByService(serviceSlug);
  return tagged.find((item) => item.photos.length > 0) ?? tagged[0];
}

export function getProjectGalleryImages(item: WorkItem, serviceSlug?: string): ProjectPhoto[] {
  if (!serviceSlug) return item.photos;
  const tagged = item.photos.filter((photo) => photo.serviceSlugs?.includes(serviceSlug));
  return tagged.length > 0 ? tagged : item.photos;
}

export function getProjectCover(item: WorkItem, serviceSlug?: string): ProjectPhoto {
  if (serviceSlug) {
    const tagged = getProjectGalleryImages(item, serviceSlug)[0];
    if (tagged) return tagged;
  }
  return (
    item.cover.src
      ? item.cover
      : getProjectGalleryImages(item)[0] ?? {
          file: "",
          src: "",
          alt: `${item.name} in ${item.placeLabel}`,
          serviceSlugs: item.serviceSlugs,
        }
  );
}

/** Full-width project banners need 2000px+ sources; gallery covers are 1400px and look grainy at 100vw. */
export function getProjectPageHero(item: WorkItem): { src: string; alt: string } {
  const bySlug: Record<string, { src: string; alt: string }> = {
    "florence-sc-residential-landscape-byrnes-boulevard": {
      src: siteImages.services.waterFeaturesCover,
      alt: "A stone waterfall and stream in a planted backyard landscape",
    },
    "florence-sc-residential-landscape-maintenance-coit-street": {
      src: siteImages.ctaAerial,
      alt: "Aerial view of a maintained lawn and planting beds",
    },
    "bennettsville-sc-commercial-landscape-bennettsville-first-presbyterian-church": {
      src: siteImages.services.hardscapesCover,
      alt: "A brick courtyard with planters and planting beds",
    },
    "florence-sc-commercial-landscape-the-manor": {
      src: siteImages.gardenEstate,
      alt: "Estate garden with seasonal color, palms, and a brick walk",
    },
  };

  return (
    bySlug[item.slug] ?? {
      src: siteImages.services.landscapeCover,
      alt: item.cover.alt || `${item.name} in ${item.placeLabel}`,
    }
  );
}
