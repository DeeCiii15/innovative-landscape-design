import type { MetadataRoute } from "next";
import { getLiveLocations } from "@/lib/locations";
import { services } from "@/lib/servicesData";
import { getSiteUrl, WORK_PATH } from "@/lib/siteConstants";
import { workCategories, workItems, workCategoryPath, workItemPath } from "@/lib/workData";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}${WORK_PATH}`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
  ];

  for (const service of services) {
    entries.push({
      url: `${base}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const category of workCategories) {
    entries.push({
      url: `${base}${workCategoryPath(category.slug)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  for (const item of workItems) {
    entries.push({
      url: `${base}${workItemPath(item.categorySlug, item.slug)}`,
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
