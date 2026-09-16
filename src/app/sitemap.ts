import type { MetadataRoute } from "next";
import { audienceHubs } from "@/lib/audienceHubs";
import { services } from "@/lib/servicesData";
import { getProjects } from "@/lib/loadProjects";
import { getSiteUrl, CAREERS_PATH, WORK_PATH } from "@/lib/siteConstants";
import { workItemPath } from "@/lib/workData";

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

  for (const item of getProjects()) {
    entries.push({
      url: `${base}${workItemPath(item.slug)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  return entries;
}
