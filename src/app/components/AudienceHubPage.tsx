import Image from "next/image";
import { connection } from "next/server";
import { CtaSection } from "@/app/components/CtaSection";
import { HubFeaturedWork } from "@/app/components/HubFeaturedWork";
import { InnerPage } from "@/app/components/InnerPage";
import { PageHero } from "@/app/components/PageHero";
import { ProcessStory } from "@/app/components/ProcessStory";
import { ServiceGalleryGrid } from "@/app/components/ServiceGalleryGrid";
import { TrustedBy } from "@/app/components/TrustedBy";
import { getAudienceHub, type AudienceHub } from "@/lib/audienceHubs";
import { getProjectsForHub } from "@/lib/loadProjects";
import type { PropertyType } from "@/projects/types";

const PROPERTY_TYPE_FOR_AUDIENCE: Record<AudienceHub["audience"], PropertyType> = {
  residential: "Residential",
  commercial: "Commercial",
};

function pickRandom<T>(items: T[]): T | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}

export async function AudienceHubPage({ hubId }: { hubId: string }) {
  await connection();

  const hub = getAudienceHub(hubId);
  if (!hub) return null;

  const isConstruction = hub.family === "construction";
  const ctaHeadline = isConstruction ? "Ready to talk about the project?" : "Ready to talk about a care plan?";
  const featured = pickRandom(
    getProjectsForHub(PROPERTY_TYPE_FOR_AUDIENCE[hub.audience], hub.serviceSlugs),
  );
  const showLogos = hub.audience === "commercial";

  return (
    <InnerPage
      hero={
        <PageHero
          title={hub.headline}
          accent={hub.headlineAccent}
          image={hub.galleryImage}
          imageAlt={hub.galleryImageAlt}
        />
      }
    >

      <section className="hub-about">
        <div className="container-main">
          <div className="hub-about__grid">
            <div className="hub-about__copy">
              <h2 className="heading-section hub-about__heading">{hub.aboutHeading}</h2>
              <p className="lead hub-about__body">{hub.intro}</p>
              <p className="lead hub-about__body">{hub.body}</p>
            </div>
            <div className="hub-about__media">
              <Image
                src={hub.aboutImage}
                alt={hub.aboutImageAlt}
                fill
                sizes="(min-width: 900px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ServiceGalleryGrid
        heading={hub.galleryHeading}
        lead={hub.galleryLead}
        slugs={hub.serviceSlugs}
        groups={hub.serviceGroups}
        showViewAll={false}
      />

      {showLogos ? (
        <section className="hub-logos" aria-label="Companies that trust us">
          <TrustedBy />
        </section>
      ) : null}
      {featured ? <HubFeaturedWork heading={hub.workHeading} item={featured} /> : null}

      <ProcessStory family={hub.family} />

      <CtaSection headline={ctaHeadline} />
    </InnerPage>
  );
}
