"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { getHubsForAudience, type Audience } from "@/lib/audienceHubs";

export function NavMegaMenu({
  audience,
  onNavigate,
}: {
  audience: Audience;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const hubs = useMemo(() => getHubsForAudience(audience), [audience]);

  return (
    <div className="nav-mega">
      {hubs.map((hub) => {
        const isActive = pathname === hub.path || pathname.startsWith(`${hub.path}/`);
        return (
          <Link
            key={hub.id}
            href={hub.path}
            className={`nav-mega__hub${isActive ? " is-active" : ""}`}
            onClick={onNavigate}
          >
            <p className="nav-mega__title">{hub.navLabel}</p>
            <p className="nav-mega__blurb">{hub.navBlurb}</p>
          </Link>
        );
      })}
    </div>
  );
}
