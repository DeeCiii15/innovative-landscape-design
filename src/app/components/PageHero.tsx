import Image from "next/image";

type PageHeroProps = {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({ title, description, image, imageAlt = "" }: PageHeroProps) {
  if (image) {
    return (
      <section className="page-hero">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="page-hero__scrim" aria-hidden />
        <div className="container-main relative w-full pb-12 pt-32 sm:pb-16 sm:pt-40">
          <div className="section-reveal max-w-3xl">
            <h1 className="heading-page text-white">{title}</h1>
            {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{description}</p>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero__plain py-16 sm:py-20">
      <div className="container-main section-reveal max-w-3xl">
        <h1 className="heading-page">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">{description}</p>}
      </div>
    </section>
  );
}
