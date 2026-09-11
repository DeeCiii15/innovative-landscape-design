"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { siteImages } from "@/lib/siteImages";

const stills = [
  {
    id: "left",
    src: siteImages.aboutGardenBed,
    alt: "A curved planting bed with lime groundcover, pink flowers, and a flowering crepe myrtle beside the lawn",
    role: "outer" as const,
    rest: -28,
    rotate: -2.4,
    delay: "0.26s",
    place: "photo-collage__item--left",
    fromX: -68,
  },
  {
    id: "mid",
    src: siteImages.aboutBackyard,
    alt: "A finished backyard with layered planting beds, planters, and a lawn leading to the house",
    role: "middle" as const,
    rest: 24,
    rotate: 0,
    delay: "0.06s",
    place: "photo-collage__item--mid",
    fromX: 0,
  },
  {
    id: "right",
    src: siteImages.services.hardscapesCover,
    alt: "Custom patio and outdoor living space",
    role: "outer" as const,
    rest: -22,
    rotate: 1.85,
    delay: "0.16s",
    place: "photo-collage__item--right",
    fromX: 68,
  },
] as const;

export function PhotoCollage() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true);
  const [entered, setEntered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const rect = row.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight * 0.8) {
      setShown(true);
      return;
    }

    setShown(false);

    let observer: IntersectionObserver;

    const rescue = () => {
      const next = row.getBoundingClientRect();
      if (next.bottom > 0 && next.top < window.innerHeight) reveal();
    };

    const reveal = () => {
      setShown(true);
      observer.disconnect();
      window.removeEventListener("scroll", rescue);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(row);
    window.addEventListener("scroll", rescue, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", rescue);
    };
  }, []);

  useEffect(() => {
    if (!shown) return;
    const id = window.setTimeout(() => setEntered(true), reducedMotion ? 0 : 900);
    return () => window.clearTimeout(id);
  }, [shown, reducedMotion]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || reducedMotion) {
      row?.style.setProperty("--collage-shift", "0px");
      return;
    }

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = row.getBoundingClientRect();
        const view = window.innerHeight || 1;
        const progress = Math.min(1, Math.max(0, (view - rect.top) / (view + rect.height)));
        row.style.setProperty("--collage-shift", `${progress * 72}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <section className="photo-collage" aria-label="Our work in the landscape">
      <div className="container-main">
        <div
          ref={rowRef}
          className="photo-collage__grid"
          style={{ ["--collage-shift" as string]: "0px" }}
        >
          {stills.map((still) => {
            const enterX = shown || still.role === "middle" ? 0 : still.fromX;
            const enterY = shown || still.role !== "middle" ? 0 : 80;
            const shift = entered ? "var(--collage-shift)" : "0px";
            const y =
              still.role === "middle"
                ? `calc(${still.rest + enterY}px - ${shift})`
                : `calc(${still.rest + enterY}px + ${shift})`;

            return (
              <figure
                key={still.id}
                className={`photo-collage__item ${still.place}`}
                style={{
                  opacity: shown ? 1 : 0,
                  transform: `translate3d(${enterX}px, ${y}, 0) rotate(${still.rotate}deg)`,
                  transition:
                    shown && !entered
                      ? `opacity 0.95s ${still.delay} cubic-bezier(0.22, 1, 0.36, 1), transform 0.95s ${still.delay} cubic-bezier(0.22, 1, 0.36, 1)`
                      : undefined,
                }}
              >
                <Image
                  src={still.src}
                  alt={still.alt}
                  fill
                  sizes="(min-width: 900px) 32vw, 70vw"
                  className="object-cover"
                  priority={still.role === "middle"}
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
