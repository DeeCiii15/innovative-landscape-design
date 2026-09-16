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
      <span className="site-logo__mark" aria-hidden style={{ filter: "none" }}>
        <Image
          src="/images/logo-ild-oval.png"
          alt=""
          width={1472}
          height={848}
          sizes="88px"
        />
      </span>
      <span className="site-logo__name">{siteConfig.name}</span>
    </Link>
  );
}
