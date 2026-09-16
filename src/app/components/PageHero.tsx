import Image from "next/image";

type PageHeroProps = {
  title: string;
  /** Italic serif word(s), same role as “Florence” on the home hero. */
  accent?: string;
  image: string;
  imageAlt?: string;
  /** Kept for callers; heroes never apply a dark overlay. */
  overlay?: boolean;
  /** Project pages keep the project name as the page h1. */
  titleAs?: "h1" | "p";
};

export function PageHero({
  title,
  accent,
  image,
  imageAlt = "",
  titleAs = "h1",
}: PageHeroProps) {
  const label = [title, accent].filter(Boolean).join(" ");
  const TitleTag = titleAs;

  return (
    <section className="hero page-hero" aria-label={label}>
      <div className="hero__media">
        <div className="hero__drift">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            quality={85}
            sizes="100vw"
            className="hero__image object-cover"
          />
        </div>
      </div>

      <div className="container-main hero__inner">
        <div className="section-reveal flex flex-1 flex-col items-center justify-center text-center">
          <TitleTag className="heading-hero hero__headline hero__headline--page">
            {accent ? (
              <>
                {title ? <>{title} </> : null}
                <em className="hero__place">{accent}</em>
              </>
            ) : (
              title
            )}
          </TitleTag>
        </div>
      </div>
    </section>
  );
}
