import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export function LogoHomeLink() {
  return (
    <Link
      href="/"
      className="site-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
      aria-label={`${siteConfig.name} home`}
    >
      <span className="site-logo__mark" aria-hidden>
        <Image
          src="/images/grass-mark.png"
          alt=""
          width={360}
          height={360}
          priority
        />
      </span>
      <span className="site-logo__name">{siteConfig.name}</span>
    </Link>
  );
}
