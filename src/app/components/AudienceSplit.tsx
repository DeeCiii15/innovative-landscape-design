"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { getHubsForAudience, type Audience } from "@/lib/audienceHubs";
import { siteImages } from "@/lib/siteImages";
import { elementVisible, watchEnter } from "./enterView";

function canHoverOpen() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

const panes: {
  audience: Audience;
  label: string;
  prompt: string;
  blurb: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    audience: "residential",
    label: "Residential services",
    prompt: "For homeowners",
    blurb: "Design, install, and care for the landscape around your home—from the first plan through lawn and bed care.",
    image: siteImages.heroFrontYard,
    imageAlt: "A finished residential front yard with planting beds and lawn",
  },
  {
    audience: "commercial",
    label: "Commercial services",
    prompt: "For businesses and HOAs",
    blurb: "Landscape project work and ongoing property care for offices, retail, HOAs, and other managed sites.",
    image: siteImages.services.lightingCover,
    imageAlt: "A property with landscape lighting after dusk",
  },
];

export function AudienceSplit({
  heading,
  lead,
}: {
  heading?: string;
  lead?: string;
  variant?: "surface" | "white";
} = {}) {
  const [open, setOpen] = useState<Audience | null>(null);
  const [arrived, setArrived] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || elementVisible(section)) {
      setArrived(true);
      return;
    }

    setWaiting(true);
    return watchEnter(section, () => {
      setWaiting(false);
      setArrived(true);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`service-split${waiting ? " is-waiting" : ""}${arrived ? " is-arrived" : ""}${open ? ` service-split--${open}` : ""}`}
      aria-label="Services"
    >
      {heading ? (
        <div className="container-main service-split__intro">
          <h2 className="heading-section">{heading}</h2>
          {lead ? <p className="lead mt-4">{lead}</p> : null}
        </div>
      ) : null}

      <div
        className="service-split__stage"
        onMouseLeave={() => {
          if (canHoverOpen()) setOpen(null);
        }}
      >
        {panes.map((pane) => {
          const isOpen = open === pane.audience;
          const hubs = getHubsForAudience(pane.audience);
          return (
            <div
              key={pane.audience}
              className={`service-split__pane${isOpen ? " is-open" : ""}`}
              onMouseEnter={() => {
                if (canHoverOpen()) setOpen(pane.audience);
              }}
            >
              <div className="service-split__visual">
                <button
                  type="button"
                  className="service-split__hit"
                  aria-expanded={isOpen}
                  aria-controls={`service-links-${pane.audience}`}
                  onClick={() => setOpen(isOpen ? null : pane.audience)}
                  onFocus={() => setOpen(pane.audience)}
                >
                  <Image
                    src={pane.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 900px) 70vw, 100vw"
                    className={`object-cover${pane.audience === "commercial" ? " object-[center_42%]" : " object-[center_35%]"}`}
                  />
                  <span className="service-split__scrim" aria-hidden />
                </button>

                <div className="service-split__overlay">
                  <span className="service-split__label">
                    <span className="service-split__prompt">{pane.prompt}</span>
                    <span className="service-split__name">{pane.label}</span>
                  </span>
                  <div className="service-split__expand" id={`service-links-${pane.audience}`}>
                    <p className="service-split__blurb">{pane.blurb}</p>
                    <div className="service-split__links">
                      {hubs.map((hub) => (
                        <Link key={hub.path} href={hub.path} className="service-split__link">
                          <span>{hub.navLabel}</span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
