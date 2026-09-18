import Image from "next/image";
import Link from "next/link";
import { WORK_LABEL, WORK_PATH } from "@/lib/siteConstants";
import { PROJECTS_IMAGES_PATH, siteImages } from "@/lib/siteImages";
import { Reveal } from "./Reveal";

const MANOR = `${PROJECTS_IMAGES_PATH}/florence-sc-commercial-landscape-the-manor`;
const BYRNES = `${PROJECTS_IMAGES_PATH}/florence-sc-residential-landscape-byrnes-boulevard`;
const COIT = `${PROJECTS_IMAGES_PATH}/florence-sc-residential-landscape-maintenance-coit-street`;
const CHURCH = `${PROJECTS_IMAGES_PATH}/bennettsville-sc-commercial-landscape-bennettsville-first-presbyterian-church`;

/** Get Inspired strip: Coit 16 / 8 / 10 lead as left, middle, right, then other jobs. */
const MARQUEE_PHOTOS: readonly { src: string }[] = [
  { src: `${COIT}/photo-16.jpg` },
  { src: siteImages.services.landscapeCover },
  { src: `${COIT}/photo-10.jpg` },
  { src: `${CHURCH}/07.jpg` },
  { src: `${MANOR}/DJI_0139.JPG` },
  { src: `${BYRNES}/03.jpg` },
  { src: `${CHURCH}/01.jpg` },
  { src: `${MANOR}/20200710_102617.jpg` },
  { src: `${BYRNES}/02.jpg` },
  { src: `${CHURCH}/04.jpg` },
  { src: `${MANOR}/2018-04-28 11.17.28.jpg` },
  { src: `${BYRNES}/05.jpg` },
];

export function PortfolioMarquee() {
  if (MARQUEE_PHOTOS.length === 0) return null;

  const copies = MARQUEE_PHOTOS.length < 6 ? 4 : 2;
  const strip = Array.from({ length: copies }, () => MARQUEE_PHOTOS).flat();

  return (
    <section className="portfolio-marquee">
      <div className="container-main">
        <Reveal>
          <div className="portfolio-marquee__head">
            <div className="portfolio-marquee__titles">
              <h2 className="heading-section">Get inspired</h2>
              <p className="portfolio-marquee__subhead">Some projects we're proud of</p>
            </div>
            <Link href={WORK_PATH} className="link-arrow portfolio-marquee__head-link shrink-0">
              View the {WORK_LABEL.toLowerCase()}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>

      <Link href={WORK_PATH} className="portfolio-marquee__band" aria-label={`View the ${WORK_LABEL.toLowerCase()}`}>
        <div className="portfolio-marquee__mask">
          <div className="portfolio-marquee__track">
            {strip.map((photo, index) => (
              <span key={`${photo.src}-${index}`} className="portfolio-marquee__item">
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="container-main">
        <Link href={WORK_PATH} className="link-arrow portfolio-marquee__more">
          View the {WORK_LABEL.toLowerCase()}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
