import type { MetadataRoute } from "next";
import { audienceHubs } from "@/lib/audienceHubs";
import { getLiveLocations } from "@/lib/locations";
import { services } from "@/lib/servicesData";
import { getProjects } from "@/lib/loadProjects";
import { getSiteUrl, CAREERS_PATH, WORK_PATH } from "@/lib/siteConstants";
import { workCategories, workCategoryPath, workItemPath, portfolioCategories } from "@/lib/workData";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}${CAREERS_PATH}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}${WORK_PATH}`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
  ];

  for (const hub of audienceHubs) {
    entries.push({
      url: `${base}${hub.path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.92,
    });
  }

  for (const service of services) {
    entries.push({
      url: `${base}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const category of portfolioCategories) {
    entries.push({
      url: `${base}${workCategoryPath(category.slug)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  for (const category of workCategories) {
    if (portfolioCategories.some((entry) => entry.slug === category.slug)) continue;
    entries.push({
      url: `${base}${workCategoryPath(category.slug)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const item of getProjects()) {
    entries.push({
      url: `${base}${workItemPath(item.slug)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const location of getLiveLocations()) {
    entries.push({
      url: `${base}${location.path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  return entries;
}
