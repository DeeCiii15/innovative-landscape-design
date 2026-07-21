import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

export function MobileCallBar() {
  return (
    <div className="mobile-call-bar fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border-light)] bg-[var(--color-white)]/96 p-3 backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <a
          href={`tel:${phoneDigits}`}
          className="btn-primary flex-1 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
        >
          Call now
        </a>
        <Link
          href="/contact"
          className="btn-secondary flex-1 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
        >
          Free estimate
        </Link>
      </div>
    </div>
  );
}
