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
      <span className="site-logo__mark">
        <Image
          src="/images/logo-lockup.png"
          alt=""
          width={3917}
          height={2058}
          sizes="(min-width: 1100px) 180px, 148px"
          priority
        />
      </span>
    </Link>
  );
}
