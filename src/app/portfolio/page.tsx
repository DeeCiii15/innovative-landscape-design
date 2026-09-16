import type { Metadata } from "next";
import { CtaSection } from "../components/CtaSection";
import { InnerPage } from "../components/InnerPage";
import { PageHero } from "../components/PageHero";
import { PortfolioGrid } from "../components/PortfolioGrid";
import { getProjects } from "@/lib/loadProjects";
import { socialTags } from "@/lib/seo";
import { WORK_PATH } from "@/lib/siteConstants";
import { siteConfig } from "@/lib/siteConfig";
import { siteImages } from "@/lib/siteImages";

const title = `Landscape Portfolio in Florence, SC | ${siteConfig.name}`;
const description = `Browse landscape design, irrigation, hardscape, lighting, and water feature work by ${siteConfig.name} in Florence, SC.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: WORK_PATH },
  ...socialTags({ title, description, path: WORK_PATH }),
};

export default function PortfolioPage() {
  return (
    <InnerPage
      hero={
        <PageHero
          title="Explore our"
          accent="portfolio"
          image={siteImages.services.hardscapesCover}
          imageAlt="Brick courtyard with planters, palms, and planting beds"
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
