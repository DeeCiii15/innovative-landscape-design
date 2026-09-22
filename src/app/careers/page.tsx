import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/app/components/CtaSection";
import { InnerPage } from "@/app/components/InnerPage";
import { PageHero } from "@/app/components/PageHero";
import { socialTags } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { CAREERS_PATH, EMPLOYMENT_APPLICATION_HREF } from "@/lib/siteConstants";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");
const title = `Landscape Jobs in Florence, SC | ${siteConfig.name}`;
const description = `Work with ${siteConfig.name} in Florence, SC. Download the employment application and email it to ${siteConfig.email}.`;
const applyMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Employment application")}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: CAREERS_PATH },
  ...socialTags({ title, description, path: CAREERS_PATH }),
};

export default function CareersPage() {
  return (
    <InnerPage
      hero={
        <PageHero
          title="Work with"
          accent="us"
          image={siteConfig.heroImage}
          imageAlt={siteConfig.heroImageAlt}
        />
      }
    >
      <section className="careers-join">
        <div className="container-main careers-join__grid">
          <div className="careers-join__copy">
            <h2 className="heading-section">Join the team</h2>
            <p className="careers-join__intro">
              {`${siteConfig.name} designs, builds, and maintains landscapes in the Florence area. If you want outdoor work with a crew that shows up and finishes the job, send an application — even if you don't see a posted opening.`}
            </p>
            <p className="careers-join__roles-label">Roles we hire for</p>
            <ul className="careers-join__roles">
              <li>Landscape construction crew</li>
              <li>Lawn and landscape maintenance</li>
              <li>Irrigation</li>
              <li>Design</li>
            </ul>
            <p className="careers-join__call">
              Prefer to call?{" "}
              <a href={`tel:${phoneDigits}`}>{siteConfig.phone}</a>
              {" · "}
              <Link href="/contact">Contact</Link>
            </p>
          </div>

          <aside className="careers-apply" aria-labelledby="careers-apply-heading">
            <h3 id="careers-apply-heading" className="careers-apply__title">
              How to apply
            </h3>
            <ol className="careers-apply__steps">
              <li className="careers-apply__step">
                <span className="careers-apply__num" aria-hidden>
                  1
                </span>
                <div>
                  <p className="careers-apply__step-title">Download the application</p>
                  <p className="careers-apply__step-body">
                    <a
                      href={EMPLOYMENT_APPLICATION_HREF}
                      download="Innovative-Landscape-Employment-Application.doc"
                    >
                      Click here
                    </a>{" "}
                    to download the Word file, then fill it out.
                  </p>
                  <a
                    href={EMPLOYMENT_APPLICATION_HREF}
                    download="Innovative-Landscape-Employment-Application.doc"
                    className="btn-primary careers-apply__btn"
                  >
                    Download application
                  </a>
                </div>
              </li>
              <li className="careers-apply__step">
                <span className="careers-apply__num" aria-hidden>
                  2
                </span>
                <div>
                  <p className="careers-apply__step-title">Email it to us</p>
                  <p className="careers-apply__step-body">
                    Send the completed application to{" "}
                    <a href={applyMailto}>{siteConfig.email}</a>. We&apos;ll follow up if
                    there&apos;s a fit.
                  </p>
                </div>
              </li>
            </ol>
          </aside>
        </div>
      </section>

      <CtaSection headline="Not looking for a job?" subheadline="Request a free estimate for a home or commercial property." />
    </InnerPage>
  );
}
