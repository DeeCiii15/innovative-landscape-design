"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { workItemPath, type WorkItem } from "@/lib/workData";
import type { ProjectPhoto } from "@/projects/types";

const SLOTS = [
  { interval: 5000, delay: 2800 },
  { interval: 7300, delay: 1500 },
  { interval: 9600, delay: 4700 },
] as const;

const CROSSFADE_MS = 1400;

function nextUnused(current: number, used: readonly number[], count: number) {
  if (count <= 1) return current;
  let next = (current + 1) % count;
  for (let step = 0; step < count; step += 1) {
    if (!used.includes(next)) return next;
    next = (next + 1) % count;
  }
  return next;
}

function FeaturedSlot({ photo, sizes }: { photo: ProjectPhoto; sizes: string }) {
  const [shown, setShown] = useState(photo);
  const [incoming, setIncoming] = useState<ProjectPhoto | null>(null);

  useEffect(() => {
    if (photo.src === shown.src) return;
    setIncoming(photo);
  }, [photo, shown.src]);

  useEffect(() => {
    if (!incoming) return;
    const id = window.setTimeout(() => {
      setShown(incoming);
      setIncoming(null);
    }, CROSSFADE_MS);
    return () => window.clearTimeout(id);
  }, [incoming]);

  return (
    <>
      <Image
        src={shown.src}
        alt={shown.alt}
        fill
        sizes={sizes}
        className="object-cover hub-featured__layer"
      />
      {incoming ? (
        <Image
          src={incoming.src}
          alt={incoming.alt}
          fill
          sizes={sizes}
          className="object-cover hub-featured__layer hub-featured__layer--in"
        />
      ) : null}
    </>
  );
}

export function HubFeaturedWork({ heading, item }: { heading: string; item: WorkItem }) {
  const photos = item.photos;
  const count = photos.length;
  const [slots, setSlots] = useState([0, 1, 2]);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const slotsRef = useRef(slots);

  pausedRef.current = paused;
  slotsRef.current = slots;

  useEffect(() => {
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];

    SLOTS.forEach((slot, slotIndex) => {
      if (slotIndex >= count) return;

      const tick = () => {
        if (!pausedRef.current && document.visibilityState !== "hidden") {
          setSlots((current) => {
            const used = current.filter((_, index) => index !== slotIndex && index < Math.min(3, count));
            const next = [...current];
            next[slotIndex] = nextUnused(current[slotIndex], used, count);
            return next;
          });
        }
        timers[slotIndex] = window.setTimeout(tick, slot.interval);
      };

      timers[slotIndex] = window.setTimeout(tick, slot.delay);
    });

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [count]);

  const main = count > 0 ? photos[slots[0] % count] : null;
  const thumbA = count > 1 ? photos[slots[1] % count] : null;
  const thumbB = count > 2 ? photos[slots[2] % count] : null;
  const photoLayout = !thumbA ? " hub-featured__photos--solo" : !thumbB ? " hub-featured__photos--pair" : "";

  return (
    <section className="hub-featured" aria-labelledby="hub-featured-heading">
      <div className="container-main">
        <h2 id="hub-featured-heading" className="heading-section">
          {heading}
        </h2>
        <h3 className="hub-featured__title">
          <Link href={workItemPath(item.slug)}>{item.name}</Link>
        </h3>
        <p className="lead hub-featured__blurb">{item.description}</p>
        {main ? (
          <div
            className={`hub-featured__photos${photoLayout}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Link href={workItemPath(item.slug)} className="hub-featured__photo hub-featured__photo--main">
              <FeaturedSlot photo={main} sizes="(min-width: 900px) 50vw, 100vw" />
            </Link>
            {thumbA ? (
              <Link href={workItemPath(item.slug)} className="hub-featured__photo">
                <FeaturedSlot photo={thumbA} sizes="(min-width: 900px) 25vw, 50vw" />
              </Link>
            ) : null}
            {thumbB ? (
              <Link href={workItemPath(item.slug)} className="hub-featured__photo">
                <FeaturedSlot photo={thumbB} sizes="(min-width: 900px) 25vw, 50vw" />
              </Link>
            ) : null}
          </div>
        ) : null}
        <Link href={workItemPath(item.slug)} className="link-arrow hub-featured__more">
          View this project
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
