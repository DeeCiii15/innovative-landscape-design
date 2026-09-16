"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteImages } from "@/lib/siteImages";

/** Full-page aerial behind reviews/CTA/footer. Load after the hero so it does not steal bandwidth. */
export function HomeAerial() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => {
      document.documentElement.classList.add("aerial-ready");
      setReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const idle = window.requestIdleCallback(start, { timeout: 800 });
      return () => {
        window.cancelIdleCallback(idle);
        document.documentElement.classList.remove("aerial-ready");
      };
    }

    const timeout = window.setTimeout(start, 400);
    return () => {
      window.clearTimeout(timeout);
      document.documentElement.classList.remove("aerial-ready");
    };
  }, []);

  return (
    <div className="home-aerial" aria-hidden>
      {ready ? (
        <Image
          src={siteImages.ctaAerial}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          fetchPriority="low"
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
