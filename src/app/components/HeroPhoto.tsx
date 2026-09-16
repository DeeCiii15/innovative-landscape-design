import Image from "next/image";
import { getHeroBlur } from "@/lib/heroBlur";

export async function HeroPhoto({ src, alt }: { src: string; alt: string }) {
  const blur = await getHeroBlur(src);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      fetchPriority="high"
      quality={85}
      sizes="100vw"
      placeholder={blur ? "blur" : "empty"}
      blurDataURL={blur}
      className="hero__image object-cover"
    />
  );
}
