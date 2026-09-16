"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectPhoto } from "@/projects/types";

type ProjectGalleryProps = {
  images: ProjectPhoto[];
  name: string;
  intervalMs?: number;
  priority?: boolean;
  className?: string;
  aspectClassName?: string;
  /** Fill a relatively positioned parent instead of using an aspect-ratio box. */
  fillParent?: boolean;
  sizes?: string;
  /** `contain` shows the full photo; `cover` fills the frame. */
  objectFit?: "cover" | "contain";
  /** Desktop listing cards: slow horizontal strip inside the viewer. */
  marquee?: boolean;
};

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {direction === "prev" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

export function ProjectGallery({
  images,
  name,
  intervalMs = 4500,
  priority = false,
  className = "",
  aspectClassName = "aspect-[4/3]",
  fillParent = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  objectFit = "cover",
  marquee = false,
}: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [manualHold, setManualHold] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [desktopStrip, setDesktopStrip] = useState(false);
  const holdTimer = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const stripPausedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!marquee) {
      setDesktopStrip(false);
      return;
    }
    const media = window.matchMedia("(min-width: 900px)");
    const update = () => setDesktopStrip(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [marquee]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (images.length < 2 || hoverPaused || manualHold || reduceMotion || expanded || desktopStrip) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [images.length, hoverPaused, manualHold, reduceMotion, intervalMs, expanded, desktopStrip]);

  useEffect(() => {
    return () => {
      if (holdTimer.current) window.clearTimeout(holdTimer.current);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (expanded) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [expanded, mounted]);

  useEffect(() => {
    if (!expanded) return;
    const selected = thumbsRef.current?.querySelector("[data-lightbox-thumb='current']");
    selected?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [index, expanded]);

  const showStrip = desktopStrip && images.length > 1;
  stripPausedRef.current = hoverPaused || expanded || reduceMotion;

  useEffect(() => {
    if (!showStrip || reduceMotion) return;

    let offset = 0;
    let raf = 0;
    let last = performance.now();
    const durationMs = Math.max(48, images.length * 4) * 1000;

    const tick = (now: number) => {
      const track = trackRef.current;
      const setEl = setRef.current;
      const dt = Math.min(now - last, 48);
      last = now;
      if (track && setEl && !stripPausedRef.current && !document.hidden) {
        const setWidth = setEl.getBoundingClientRect().width;
        if (setWidth > 1) {
          offset -= (setWidth / durationMs) * dt;
          while (offset <= -setWidth) offset += setWidth;
          track.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
      }
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(raf);
      if (trackRef.current) trackRef.current.style.transform = "";
    };
  }, [showStrip, reduceMotion, images.length]);

  const frameClassName = fillParent ? "absolute inset-0" : `relative ${aspectClassName}`;
  const fitClassName = objectFit === "contain" ? "object-contain" : "object-cover";

  const pauseForManual = () => {
    setManualHold(true);
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => setManualHold(false), 12000);
  };

  const step = (direction: -1 | 1) => {
    if (images.length < 2) return;
    pauseForManual();
    setIndex((current) => (current + direction + images.length) % images.length);
  };

  const openExpanded = () => {
    pauseForManual();
    setExpanded(true);
  };

  if (images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--color-surface)] px-6 text-center ${frameClassName} ${className}`}
      >
        <p className="text-sm text-[var(--color-muted)]">Photos coming soon</p>
      </div>
    );
  }

  const current = images[index] ?? images[0];
  const stripCopies = 2;

  const lightbox =
    mounted &&
    expanded &&
    createPortal(
      <dialog
        ref={dialogRef}
        className="project-lightbox"
        aria-label={`${name} photos`}
        onClose={() => setExpanded(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setExpanded(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
        }}
      >
        <div className="project-lightbox__panel" onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            className="project-lightbox__close"
            aria-label="Close photos"
            onClick={() => setExpanded(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="project-lightbox__stage">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
              draggable={false}
            />
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="project-gallery__nav project-gallery__nav--prev"
                  aria-label={`Previous photo, ${index + 1} of ${images.length}`}
                  onClick={() => step(-1)}
                >
                  <Chevron direction="prev" />
                </button>
                <button
                  type="button"
                  className="project-gallery__nav project-gallery__nav--next"
                  aria-label={`Next photo, ${index + 1} of ${images.length}`}
                  onClick={() => step(1)}
                >
                  <Chevron direction="next" />
                </button>
              </>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className="project-lightbox__film">
              <p className="project-lightbox__count">
                {index + 1} of {images.length}
              </p>
              <div ref={thumbsRef} className="project-lightbox__thumbs">
                {images.map((image, imageIndex) => {
                  const selected = imageIndex === index;
                  return (
                    <button
                      key={image.src}
                      type="button"
                      data-lightbox-thumb={selected ? "current" : undefined}
                      className={`project-lightbox__thumb${selected ? " project-lightbox__thumb--current" : ""}`}
                      aria-label={`Show photo ${imageIndex + 1} of ${images.length}`}
                      aria-current={selected ? "true" : undefined}
                      onClick={() => {
                        pauseForManual();
                        setIndex(imageIndex);
                      }}
                    >
                      <Image src={image.src} alt="" fill sizes="96px" className="object-cover" draggable={false} />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </dialog>,
      document.body,
    );

  return (
    <>
      <div
        className={`project-gallery project-gallery--expandable overflow-hidden ${
          showStrip ? "project-gallery--strip bg-white" : "bg-[var(--color-surface-dark)]"
        } ${expanded || hoverPaused ? "project-gallery--paused" : ""} ${frameClassName} ${className}`}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${name} photo gallery`}
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        onFocus={() => setHoverPaused(true)}
        onBlur={() => setHoverPaused(false)}
      >
        {showStrip ? (
          <div className="project-gallery__mask">
            <div ref={trackRef} className="project-gallery__track">
              {Array.from({ length: stripCopies }, (_, copyIndex) => (
                <div
                  className="project-gallery__set"
                  key={`strip-copy-${copyIndex}`}
                  ref={copyIndex === 0 ? setRef : undefined}
                >
                  {images.map((image, imageIndex) => (
                    <button
                      key={`${image.src}-${copyIndex}`}
                      type="button"
                      className="project-gallery__tile"
                      aria-label={`Expand photo ${imageIndex + 1} of ${images.length}`}
                      onClick={() => {
                        pauseForManual();
                        setIndex(imageIndex);
                        setExpanded(true);
                      }}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        width={1600}
                        height={1200}
                        sizes="(min-width: 900px) 40vw, 100vw"
                        className="project-gallery__strip-photo"
                        style={{ width: "auto", height: "100%", maxWidth: "none" }}
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {images.map((image, imageIndex) => {
              const active = imageIndex === index;
              return (
                <div
                  key={image.src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    active ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  aria-hidden={!active}
                >
                  <Image
                    src={image.src}
                    alt={active ? image.alt : ""}
                    fill
                    priority={priority && imageIndex === 0}
                    sizes={sizes}
                    className={fitClassName}
                    draggable={false}
                  />
                </div>
              );
            })}

            <button
              type="button"
              className="project-gallery__expand absolute inset-0 z-[15] cursor-zoom-in border-0 bg-transparent"
              aria-label={`Expand ${name} photos`}
              onClick={openExpanded}
            >
              <span className="sr-only">Expand photos</span>
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="project-gallery__nav project-gallery__nav--prev"
                  aria-label={`Previous photo, ${index + 1} of ${images.length}`}
                  onClick={() => step(-1)}
                >
                  <Chevron direction="prev" />
                </button>
                <button
                  type="button"
                  className="project-gallery__nav project-gallery__nav--next"
                  aria-label={`Next photo, ${index + 1} of ${images.length}`}
                  onClick={() => step(1)}
                >
                  <Chevron direction="next" />
                </button>
                <div className="project-gallery__dots">
                  {images.map((image, imageIndex) => {
                    const selected = imageIndex === index;
                    return (
                      <button
                        key={image.src}
                        type="button"
                        aria-label={`Show photo ${imageIndex + 1} of ${images.length}`}
                        aria-current={selected ? "true" : undefined}
                        className={`project-gallery__dot ${selected ? "project-gallery__dot--active" : ""}`}
                        onClick={() => {
                          pauseForManual();
                          setIndex(imageIndex);
                        }}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        <span className="sr-only" aria-live="polite">
          {current.alt}
        </span>
      </div>
      {lightbox}
    </>
  );
}
