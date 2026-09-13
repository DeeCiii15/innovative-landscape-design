import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/login", destination: "https://portal.golmn.com/login/4RF8cNCxVzu5-7VdjQqAqg", permanent: false },
      { source: "/transformations", destination: "/portfolio", permanent: true },
      { source: "/gallery", destination: "/portfolio", permanent: true },
      { source: "/gallery/design", destination: "/portfolio/landscape-enhancements", permanent: true },
      { source: "/gallery/irrigation", destination: "/portfolio/irrigation", permanent: true },
      { source: "/gallery/hardscapes", destination: "/portfolio/hardscapes", permanent: true },
      { source: "/gallery/lighting", destination: "/portfolio/outdoor-lighting", permanent: true },
      { source: "/gallery/water-features", destination: "/portfolio/water-features", permanent: true },
      { source: "/portfolio/landscape-design", destination: "/portfolio/landscape-enhancements", permanent: true },
      { source: "/portfolio/:category/:item", destination: "/portfolio/:item", permanent: true },
      { source: "/projects", destination: "/portfolio", permanent: true },
      { source: "/projects/:path*", destination: "/portfolio/:path*", permanent: true },
      { source: "/our-process", destination: "/", permanent: true },
      { source: "/our-process/:path*", destination: "/", permanent: true },
      { source: "/services/landscape-design", destination: "/services/landscape-enhancements", permanent: true },
      { source: "/services/design", destination: "/services/landscape-enhancements", permanent: true },
      { source: "/services/landscaping", destination: "/services/landscape-enhancements", permanent: true },
      { source: "/services/lighting", destination: "/services/outdoor-lighting", permanent: true },
      { source: "/services", destination: "/", permanent: true },
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
    ];
  },
};

export default nextConfig;
