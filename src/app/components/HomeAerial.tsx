import Image from "next/image";
import { siteImages } from "@/lib/siteImages";

export function HomeAerial() {
  return (
    <div className="home-aerial" aria-hidden>
      <Image
        src={siteImages.ctaAerial}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />
    </div>
  );
}
