import { audienceHubs } from "@/lib/audienceHubs";
import { siteConfig } from "@/lib/siteConfig";
import {
  CAREERS_PATH,
  FOUNDING_YEAR,
  GOOGLE_MAPS_URL,
  getSiteUrl,
  LOGIN_PATH,
  SERVICE_AREAS,
  WORK_PATH,
} from "@/lib/siteConstants";
import { services } from "@/lib/servicesData";

export const dynamic = "force-static";

function href(path: string) {
  return `${getSiteUrl()}${path}`;
}

function hubLabel(audience: "residential" | "commercial", name: string) {
  const prefix = audience === "residential" ? "Residential" : "Commercial";
  return name.toLowerCase().startsWith(prefix.toLowerCase()) ? name : `${prefix} ${name}`;
}

function buildLlmsTxt() {
  const construction = services.filter((service) => service.family === "construction");
  const maintenance = services.filter((service) => service.family === "maintenance");

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> Florence, SC landscaping company (ILD) at ${siteConfig.address}. In business since ${FOUNDING_YEAR}. Hardscapes, lighting, water features, irrigation, planting, and lawn care for homes and businesses.`,
    "",
    `${siteConfig.name} designs, installs, and maintains landscapes in the Florence area. Request a free estimate at ${href("/contact")}.`,
    "",
    "## Contact",
    "",
    `- Phone: ${siteConfig.phone}`,
    `- Email: ${siteConfig.email}`,
    `- Address: ${siteConfig.address}`,
    `- Hours: ${siteConfig.openingHours}`,
    `- Customer portal: ${LOGIN_PATH}`,
    `- Google Business Profile: ${GOOGLE_MAPS_URL}`,
    "",
    "## Service area",
    "",
    `${SERVICE_AREAS.join(", ")}, South Carolina.`,
    "",
    "## Hub pages",
    "",
    ...audienceHubs.map(
      (hub) => `- [${hubLabel(hub.audience, hub.name)}](${href(hub.path)}): ${hub.navBlurb}`,
    ),
    "",
    "## Landscape construction services",
    "",
    ...construction.map(
      (service) => `- [${service.name}](${href(`/services/${service.slug}`)}): ${service.tagline}`,
    ),
    "",
    "## Landscape maintenance services",
    "",
    ...maintenance.map(
      (service) => `- [${service.name}](${href(`/services/${service.slug}`)}): ${service.tagline}`,
    ),
    "",
    "## Other pages",
    "",
    `- [Home](${href("/")})`,
    `- [Contact](${href("/contact")})`,
    `- [Portfolio](${href(WORK_PATH)})`,
    `- [Careers](${href(CAREERS_PATH)}): Download the employment application and email it to ${siteConfig.email}.`,
    "",
  ];

  return `${lines.join("\n").trim()}\n`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
