import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { getProjects } from "@/lib/loadProjects";
import { WORK_LABEL, WORK_PATH } from "@/lib/siteConstants";
import { services } from "@/lib/servicesData";
import { Reveal } from "./Reveal";

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

async function marqueeImages(): Promise<{ src: string; alt: string }[]> {
  await connection();

  const fromWork = getProjects().flatMap((item) => {
    const photos = item.photos.filter((photo) => photo.src);
    return shuffle(photos).slice(0, Math.min(4, photos.length));
  });

  const seen = new Set(fromWork.map((photo) => photo.src));
  const extras = services
    .map((service) => ({ src: service.galleryImage, alt: service.galleryImageAlt }))
    .filter((photo) => photo.src && !seen.has(photo.src));

  const photos = shuffle([...fromWork, ...extras]);
  return photos.length > 0 ? photos : extras;
}

export async function PortfolioMarquee() {
  const photos = await marqueeImages();
  if (photos.length === 0) return null;

  const copies = photos.length < 6 ? 4 : 2;
  const strip = Array.from({ length: copies }, () => photos).flat();

  return (
    <section className="portfolio-marquee">
      <div className="container-main">
        <Reveal>
          <div className="portfolio-marquee__head">
            <div className="portfolio-marquee__titles">
              <h2 className="heading-section">Get inspired</h2>
              <h2 className="portfolio-marquee__subhead">Some projects we're proud of</h2>
            </div>
            <Link href={WORK_PATH} className="link-arrow shrink-0">
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
                <Image src={photo.src} alt="" fill sizes="280px" className="object-cover" />
              </span>
            ))}
          </div>
        </div>
      </Link>
    </section>
  );
}
