import type { Metadata } from "next";
import { CtaSection } from "../components/CtaSection";
import { PageHero } from "../components/PageHero";
import { ServiceGalleryGrid } from "../components/ServiceGalleryGrid";
import { getSiteUrl, WORK_PATH } from "@/lib/siteConstants";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: `Landscape Projects in Florence, SC | ${siteConfig.name}`,
  },
  description: `Browse landscape design, irrigation, hardscape, and outdoor lighting projects by ${siteConfig.name} in Florence, SC.`,
  alternates: { canonical: WORK_PATH },
  openGraph: {
    title: `Landscape Projects in Florence, SC | ${siteConfig.name}`,
    description: `Browse landscape design, irrigation, hardscape, and outdoor lighting projects by ${siteConfig.name} in Florence, SC.`,
    url: `${getSiteUrl()}${WORK_PATH}`,
  },
};

export default function ProjectsPage() {
  return (
    <div>
      <PageHero
        title="Projects"
        description="Check out some of the projects we're most proud of."
        image={siteConfig.heroImage}
        imageAlt={siteConfig.heroImageAlt}
      />
      <ServiceGalleryGrid
        id=""
        showHeader={false}
        showViewAll={false}
        reveal={false}
        intro="Browse our work by service — landscape design, irrigation, hardscapes, and outdoor lighting."
      />
      <CtaSection />
    </div>
  );
}
