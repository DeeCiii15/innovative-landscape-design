import Image from "next/image";
import { CtaSection } from "@/app/components/CtaSection";
import { CustomerPortalNote } from "@/app/components/CustomerPortalNote";
import { HubFeaturedWork } from "@/app/components/HubFeaturedWork";
import { InnerPage } from "@/app/components/InnerPage";
import { PageHero } from "@/app/components/PageHero";
import { ProcessStory } from "@/app/components/ProcessStory";
import { ServiceGalleryGrid } from "@/app/components/ServiceGalleryGrid";
import { TrustedBy } from "@/app/components/TrustedBy";
import { getAudienceHub } from "@/lib/audienceHubs";
import { getProjectBySlug } from "@/lib/loadProjects";

export function AudienceHubPage({ hubId }: { hubId: string }) {
  const hub = getAudienceHub(hubId);
  if (!hub) return null;

  const isConstruction = hub.family === "construction";
  const ctaHeadline = isConstruction ? "Ready to talk about the project?" : "Ready to talk about a care plan?";
  const featured = getProjectBySlug(hub.featuredWorkSlug);
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
        fromHubId={hub.id}
      />

      {showLogos ? (
        <section className="hub-logos" aria-label="Companies that trust us">
          <TrustedBy />
        </section>
      ) : null}
      {featured ? <HubFeaturedWork heading={hub.workHeading} item={featured} /> : null}

      <ProcessStory family={hub.family} />

      <CustomerPortalNote />

      <CtaSection headline={ctaHeadline} />
    </InnerPage>
  );
}
