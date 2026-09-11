import type { Metadata } from "next";
import { CtaSection } from "../components/CtaSection";
import { InnerPage } from "../components/InnerPage";
import { PageHero } from "../components/PageHero";
import { PortfolioGrid } from "../components/PortfolioGrid";
import { getProjects } from "@/lib/loadProjects";
import { getSiteUrl, WORK_PATH } from "@/lib/siteConstants";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: `Landscape Portfolio in Florence, SC | ${siteConfig.name}`,
  },
  description: `Browse landscape design, irrigation, hardscape, lighting, and water feature work by ${siteConfig.name} in Florence, SC.`,
  alternates: { canonical: WORK_PATH },
  openGraph: {
    title: `Landscape Portfolio in Florence, SC | ${siteConfig.name}`,
    description: `Browse landscape design, irrigation, hardscape, lighting, and water feature work by ${siteConfig.name} in Florence, SC.`,
    url: `${getSiteUrl()}${WORK_PATH}`,
  },
};

export default function PortfolioPage() {
  return (
    <InnerPage
      hero={
        <PageHero
          title="Explore our"
          accent="portfolio"
          image={siteConfig.heroImage}
          imageAlt={siteConfig.heroImageAlt}
        />
      }
    >
      <section className="portfolio-index">
        <div className="container-main">
          <h2 className="heading-section portfolio-index__lead">
            A look at work we&apos;re proud of around Florence
          </h2>
          <PortfolioGrid items={getProjects()} />
        </div>
      </section>

      <CtaSection />
    </InnerPage>
  );
}
