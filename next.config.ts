import type { NextConfig } from "next";
import { services } from "./src/lib/servicesData";

const retiredPortfolioSlugs = [
  ...new Set([
    ...services.map((service) => service.slug),
    "landscape-design",
    "landscaping",
    "lighting",
    "design",
  ]),
];

/** Folder names and earlier slug drafts → current `/portfolio/{slug}` URLs. */
const portfolioSlugRedirects: Array<[string, string]> = [
  ["coit-street", "florence-sc-residential-landscape-maintenance-coit-street"],
  ["florence-sc-residential-landscape-maintenancecoit-street", "florence-sc-residential-landscape-maintenance-coit-street"],
  ["byrnes-boulevard", "florence-sc-residential-landscape-byrnes-boulevard"],
  ["florence-sc-residential-landscapebyrnes-boulevard", "florence-sc-residential-landscape-byrnes-boulevard"],
  ["bennettsville-first-presbyterian-church", "bennettsville-sc-commercial-landscape-bennettsville-first-presbyterian-church"],
  ["methodist-manor", "florence-sc-commercial-landscape-the-manor"],
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    const portfolioCategoryRedirects = retiredPortfolioSlugs.map((slug) => ({
      source: `/portfolio/${slug}`,
      destination: "/portfolio",
      permanent: true as const,
    }));
    const renamedProjectRedirects = portfolioSlugRedirects.map(([from, to]) => ({
      source: `/portfolio/${from}`,
      destination: `/portfolio/${to}`,
      permanent: true as const,
    }));

    return [
      { source: "/login", destination: "https://portal.golmn.com/login/4RF8cNCxVzu5-7VdjQqAqg", permanent: false },
      { source: "/transformations", destination: "/portfolio", permanent: true },
      { source: "/gallery", destination: "/portfolio", permanent: true },
      { source: "/gallery/design", destination: "/portfolio", permanent: true },
      { source: "/gallery/irrigation", destination: "/portfolio", permanent: true },
      { source: "/gallery/hardscapes", destination: "/portfolio", permanent: true },
      { source: "/gallery/lighting", destination: "/portfolio", permanent: true },
      { source: "/gallery/water-features", destination: "/portfolio", permanent: true },
      ...portfolioCategoryRedirects,
      ...renamedProjectRedirects,
      { source: "/portfolio/:category/:item", destination: "/portfolio/:item", permanent: true },
      { source: "/projects", destination: "/portfolio", permanent: true },
      { source: "/projects/:path*", destination: "/portfolio/:path*", permanent: true },
      { source: "/our-process", destination: "/", permanent: true },
      { source: "/our-process/:path*", destination: "/", permanent: true },
      { source: "/services/landscape-design", destination: "/services/landscape-enhancements", permanent: true },
      { source: "/services/design", destination: "/services/landscape-enhancements", permanent: true },
      { source: "/services/landscaping", destination: "/services/landscape-enhancements", permanent: true },
      { source: "/services/lighting", destination: "/services/outdoor-lighting", permanent: true },
      { source: "/services", destination: "/residential/landscape-services", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/about-us", destination: "/", permanent: true },
      {
        source: "/how-regular-maintenance-affects-landscaping-talk-about-the-importance-of-maintenance-and-the-best-practices-to-keep-a-landscape-looking-fresh",
        destination: "/services/total-landscape-maintenance",
        permanent: true,
      },
      {
        source: "/common-issues-lawn-care-south-carolina",
        destination: "/services/lawn-maintenance",
        permanent: true,
      },
      { source: "/planting-flowers-in-the-fall", destination: "/services/seasonal-color", permanent: true },
      { source: "/florence-sc-landscape-design", destination: "/", permanent: true },
      { source: "/residential", destination: "/residential/landscape-services", permanent: true },
      { source: "/commercial", destination: "/commercial/landscape-services", permanent: true },
      {
        source: "/residential/landscape-construction",
        destination: "/residential/landscape-services",
        permanent: true,
      },
      {
        source: "/residential/landscape-maintenance",
        destination: "/residential/lawn-care-services",
        permanent: true,
      },
      {
        source: "/commercial/landscape-construction",
        destination: "/commercial/landscape-services",
        permanent: true,
      },
      {
        source: "/commercial/landscape-maintenance",
        destination: "/commercial/property-maintenance-services",
        permanent: true,
      },
      { source: "/images/hero-aerial.jpg", destination: "/images/site/hero-aerial.jpg", permanent: true },
      { source: "/images/hero-front-yard.jpg", destination: "/images/site/hero-front-yard.jpg", permanent: true },
      { source: "/images/cta-aerial.jpg", destination: "/images/site/cta-aerial.jpg", permanent: true },
      { source: "/images/about-backyard.jpg", destination: "/images/site/about-backyard.jpg", permanent: true },
      { source: "/images/about-garden-bed.jpg", destination: "/images/site/about-garden-bed.jpg", permanent: true },
      { source: "/images/about-bg.jpg", destination: "/images/site/about-bg.jpg", permanent: true },
      { source: "/images/about-consultation.jpg", destination: "/images/site/about-consultation.jpg", permanent: true },
      { source: "/images/services/:file", destination: "/images/site/services/:file", permanent: true },
      { source: "/images/projects/YardRedesign/:file", destination: "/images/projects/yard-redesign/:file", permanent: true },
      { source: "/images/projects/LightingUpgrade/:file", destination: "/images/projects/lighting-upgrade/:file", permanent: true },
      { source: "/images/projects/FrontYard/:file", destination: "/images/projects/front-yard/:file", permanent: true },
      { source: "/images/projects/IrrigationSystem/:file", destination: "/images/projects/irrigation-system/:file", permanent: true },
      { source: "/images/projects/PatioRetreat/:file", destination: "/images/projects/patio-retreat/:file", permanent: true },
      { source: "/images/projects/CommercialCurb/:file", destination: "/images/projects/commercial-curb/:file", permanent: true },
      { source: "/images/projects/CommercialLighting/:file", destination: "/images/projects/commercial-lighting/:file", permanent: true },
      { source: "/images/projects/CommercialHardscape/:file", destination: "/images/projects/commercial-hardscape/:file", permanent: true },
      { source: "/images/projects/BackyardWaterfall/:file", destination: "/images/projects/backyard-waterfall/:file", permanent: true },
      { source: "/images/projects/coit-street/:file", destination: "/images/projects/florence-sc-residential-landscape-maintenance-coit-street/:file", permanent: true },
      { source: "/images/projects/byrnes-boulevard/:file", destination: "/images/projects/florence-sc-residential-landscape-byrnes-boulevard/:file", permanent: true },
      { source: "/images/projects/bennettsville-first-presbyterian-church/:file", destination: "/images/projects/bennettsville-sc-commercial-landscape-bennettsville-first-presbyterian-church/:file", permanent: true },
      { source: "/images/projects/methodist-manor/:file", destination: "/images/projects/florence-sc-commercial-landscape-the-manor/:file", permanent: true },
    ];
  },
};

export default nextConfig;
