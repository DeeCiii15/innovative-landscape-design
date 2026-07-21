import Image from "next/image";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/lib/siteConfig";

export function AboutSection() {
  return (
    <section id="about" className="section scroll-mt-24">
      <div className="container-main">
        <div className="about__grid">
          <div className="about__copy">
            <Reveal>
              <h2 className="heading-section">Who we are</h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="about__body mt-6 lead">
                <p>{siteConfig.aboutIntro}</p>
                <p>{siteConfig.aboutBody}</p>
                <p>{siteConfig.aboutValues}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="about__frame">
            <div className="about__media">
              <Image
                src={siteConfig.teamPhoto.src}
                alt={siteConfig.teamPhoto.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
