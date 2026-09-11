import { PhotoCollage } from "./PhotoCollage";
import { Reveal } from "./Reveal";
import { WelcomeLine } from "./WelcomeLine";
import { siteConfig } from "@/lib/siteConfig";

export function AboutSection() {
  return (
    <section id="about" className="about-block scroll-mt-24">
      <WelcomeLine />
      <PhotoCollage />

      <div className="container-main about-block__copy">
        <Reveal>
          <h2 className="heading-section">{siteConfig.aboutLead}</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="about__body mt-6 lead">
            <p>{siteConfig.aboutIntro}</p>
            <p>{siteConfig.aboutBody}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
