"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { processPhases } from "@/lib/processData";

type ProcessStoryFamily = "company" | "construction" | "maintenance";

const processCopy: Record<ProcessStoryFamily, { heading: string; lead: string }> = {
  company: {
    heading: "Our process",
    lead: "How most of our jobs work, from the first visit to a landscape that lasts.",
  },
  construction: {
    heading: "How we work",
    lead: "Landscape services follow the same four steps — design, prepare, install, maintain. That process applies to the services above, not only a full-yard renovation.",
  },
  maintenance: {
    heading: "How we work",
    lead: "If the landscape is already in place, we pick up at maintain — on a cadence that fits the property.",
  },
};

const PHASES = processPhases.length;
const EQUAL_COLS = "repeat(4, minmax(0, 1fr))";

export function ProcessStory({ family = "company" }: { family?: ProcessStoryFamily }) {
  const copy = processCopy[family];
  const sectionRef = useRef<HTMLElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const lastProgressRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const releasedRef = useRef(false);
  const ignoreScrollRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [rail, setRail] = useState({ left: 0, span: 0, top: 0 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const measureRail = useCallback(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const dots = track.querySelectorAll<HTMLElement>(".process-story__dot");
    const first = dots[0]?.getBoundingClientRect();
    const last = dots[dots.length - 1]?.getBoundingClientRect();
    if (!first || !last) return;
    const origin = stage.getBoundingClientRect();
    const start = first.left + first.width / 2 - origin.left;
    const end = last.left + last.width / 2 - origin.left;
    const top = first.top + first.height / 2 - origin.top;
    const span = Math.max(end - start, 0);
    setRail((prev) => {
      if (Math.abs(prev.left - start) < 0.5 && Math.abs(prev.span - span) < 0.5 && Math.abs(prev.top - top) < 0.5) {
        return prev;
      }
      return { left: start, span, top };
    });
  }, []);

  const applyProgress = useCallback(
    (next: number) => {
      const clamped = Math.min(1, Math.max(0, next));
      lastProgressRef.current = clamped;
      setProgress(clamped);
      setActive(Math.min(PHASES - 1, Math.floor(Math.min(clamped, 0.999) * PHASES)));
      measureRail();
    },
    [measureRail],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const lock = lockRef.current;
    const sticky = stickyRef.current;
    if (!section || !lock || !sticky) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReduce = () => setReduceMotion(media.matches);
    applyReduce();
    media.addEventListener("change", applyReduce);

    if (media.matches) {
      applyProgress(1);
      return () => media.removeEventListener("change", applyReduce);
    }

    const headerHeight = () => {
      const header = document.querySelector(".site-header");
      return header instanceof HTMLElement ? header.getBoundingClientRect().height : 76;
    };

    const travelPx = () => Math.max(lock.offsetHeight - sticky.offsetHeight, 1);

    const intoLock = () => {
      const rect = lock.getBoundingClientRect();
      return Math.min(travelPx(), Math.max(0, headerHeight() - rect.top));
    };

    const setReleased = (released: boolean) => {
      releasedRef.current = released;
      section.classList.toggle("process-story--released", released);
    };

    const extraBelow = () => {
      const lockRect = lock.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      return lockRect.bottom - stickyRect.bottom;
    };

    const releaseWithoutJump = () => {
      if (releasedRef.current) return;
      const stickyTop = sticky.getBoundingClientRect().top;
      ignoreScrollRef.current = true;
      const html = document.documentElement;
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      setReleased(true);
      void lock.offsetHeight;

      const stickDelta = sticky.getBoundingClientRect().top - stickyTop;
      if (Math.abs(stickDelta) > 1) {
        window.scrollTo({ top: Math.max(0, window.scrollY + stickDelta), behavior: "auto" });
      }

      html.style.scrollBehavior = previousBehavior;
      lastScrollYRef.current = window.scrollY;
      ignoreScrollRef.current = false;
    };

    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      if (ignoreScrollRef.current) {
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const y = window.scrollY;
      const dy = y - lastScrollYRef.current;
      lastScrollYRef.current = y;
      const rect = lock.getBoundingClientRect();

      if (rect.top > window.innerHeight - 8) {
        if (lastProgressRef.current > 0) applyProgress(0);
        setReleased(false);
        return;
      }

      if (dy < -0.5) {
        if (releasedRef.current) {
          measureRail();
          return;
        }

        applyProgress(intoLock() / travelPx());
        measureRail();
        return;
      }

      if (dy <= 0.5) {
        if (!releasedRef.current && extraBelow() <= 8) {
          applyProgress(1);
          releaseWithoutJump();
        }
        measureRail();
        return;
      }

      if (releasedRef.current) {
        measureRail();
        return;
      }

      applyProgress(intoLock() / travelPx());
      if (extraBelow() <= 8) {
        applyProgress(1);
        releaseWithoutJump();
      }
      measureRail();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      media.removeEventListener("change", applyReduce);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [applyProgress, measureRail]);

  useLayoutEffect(() => {
    measureRail();
  }, [active, reduceMotion, measureRail]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const focusPhase = useCallback(
    (index: number) => {
      const clamped = Math.min(PHASES - 1, Math.max(0, index));
      const targetProgress = (clamped + 0.5) / PHASES;
      const section = sectionRef.current;
      const lock = lockRef.current;
      const sticky = stickyRef.current;

      if (reduceMotion || !section || !lock || !sticky) {
        applyProgress(targetProgress);
        section?.scrollIntoView({ block: "start", behavior: "auto" });
        return;
      }

      const header = document.querySelector(".site-header");
      const headerHeight = header instanceof HTMLElement ? header.getBoundingClientRect().height : 76;
      const html = document.documentElement;
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      ignoreScrollRef.current = true;

      if (releasedRef.current) {
        releasedRef.current = false;
        section.classList.remove("process-story--released");
        void lock.offsetHeight;
      }

      const travel = Math.max(lock.offsetHeight - sticky.offsetHeight, 1);
      const desiredTop = headerHeight - targetProgress * travel;
      const delta = lock.getBoundingClientRect().top - desiredTop;
      window.scrollTo({ top: Math.max(0, window.scrollY + delta), behavior: "auto" });
      applyProgress(targetProgress);
      lastScrollYRef.current = window.scrollY;
      html.style.scrollBehavior = previousBehavior;
      ignoreScrollRef.current = false;
    },
    [applyProgress, reduceMotion],
  );

  const openPhase = useCallback(
    (index: number) => {
      focusPhase(index);
      setLightboxIndex(index);
    },
    [focusPhase],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightboxIndex !== null) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [lightboxIndex, mounted]);

  const lightboxPhase = lightboxIndex !== null ? processPhases[lightboxIndex] : null;

  const columns = reduceMotion
    ? EQUAL_COLS
    : processPhases.map((_, index) => (index === active ? "1.55fr" : "0.82fr")).join(" ");

  return (
    <>
    <section
      id="process"
      ref={sectionRef}
      className={`process-story${reduceMotion ? " process-story--static" : ""}`}
      aria-labelledby="process-story-heading"
      style={{ "--process-progress": String(progress) } as CSSProperties}
    >
      <div ref={lockRef} className="process-story__lock">
        <div ref={stickyRef} className="process-story__sticky">
          <div className="container-main process-story__sticky-inner">
            <div className="process-story__intro">
              <h2 id="process-story-heading" className="heading-section">
                {copy.heading}
              </h2>
              <p className="lead">{copy.lead}</p>
            </div>

            <div className="process-story__stage" ref={stageRef}>
              <ol className="process-story__track" ref={trackRef} style={{ gridTemplateColumns: columns }}>
                {processPhases.map((phase, index) => {
                  const isActive = index === active;
                  return (
                    <li
                      key={phase.slug}
                      className={`process-story__step${isActive ? " is-active" : ""}`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <button
                        type="button"
                        className="process-story__media"
                        aria-label={`View ${phase.title} photo`}
                        onClick={() => openPhase(index)}
                      >
                        <Image
                          src={phase.image}
                          alt={isActive ? phase.imageAlt : ""}
                          fill
                          sizes={
                            isActive
                              ? "(min-width: 900px) 36vw, 90vw"
                              : "(min-width: 900px) 18vw, 45vw"
                          }
                          className={phase.slug === "design" ? "object-cover object-[8%_center]" : "object-cover"}
                          unoptimized={phase.slug === "design"}
                        />
                      </button>
                      <span className="process-story__dot" aria-hidden />
                      <div className="process-story__copy">
                        <h3 className="process-story__title">{phase.title}</h3>
                        <p className="process-story__line">{phase.line}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div
                className="process-story__rail"
                aria-hidden
                style={{ left: rail.left, width: rail.span, top: rail.top }}
              >
                <div className="process-story__rail-fill" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>

            <div className="process-story__bar" aria-hidden style={{ marginLeft: rail.left, width: rail.span }}>
              <div className="process-story__bar-fill" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="process-story__travel" aria-hidden />
      </div>
    </section>
    {mounted
      ? createPortal(
          <dialog
            ref={dialogRef}
            className="project-lightbox"
            aria-label={lightboxPhase ? `${lightboxPhase.title} photo` : "Process photo"}
            onClose={() => setLightboxIndex(null)}
            onClick={(event) => {
              if (event.target === event.currentTarget) setLightboxIndex(null);
            }}
          >
            {lightboxPhase ? (
              <div className="project-lightbox__panel" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  className="project-lightbox__close"
                  aria-label="Close photo"
                  onClick={() => setLightboxIndex(null)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
                <div className="project-lightbox__stage">
                  <Image
                    src={lightboxPhase.image}
                    alt={lightboxPhase.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    unoptimized={lightboxPhase.slug === "design"}
                  />
                </div>
              </div>
            ) : null}
          </dialog>,
          document.body,
        )
      : null}
    </>
  );
}
