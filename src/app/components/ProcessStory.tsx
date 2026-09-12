"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { processPhases } from "@/lib/processData";

type ProcessStoryFamily = "company" | "construction" | "maintenance";

const processCopy: Record<ProcessStoryFamily, { heading: string; lead: string }> = {
  company: {
    heading: "Our process",
    lead: "How most of our jobs work, from the first visit to a landscape that lasts.",
  },
  construction: {
    heading: "How a job runs",
    lead: "Landscape services follow the same four steps — design, prepare, install, maintain. That process applies to the services above, not only a full-yard renovation.",
  },
  maintenance: {
    heading: "How a job runs",
    lead: "New work starts with design and install. If the landscape is already in place, we pick up at maintain — on a cadence that fits the property.",
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
      const yBefore = window.scrollY;
      const beforeBottom = lock.getBoundingClientRect().bottom;
      ignoreScrollRef.current = true;
      const html = document.documentElement;
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      setReleased(true);
      void lock.offsetHeight;

      const settle = () => {
        const afterBottom = lock.getBoundingClientRect().bottom;
        const delta = beforeBottom - afterBottom;
        if (delta > 1) {
          window.scrollTo({ top: Math.max(0, yBefore - delta), behavior: "auto" });
        }
        const top = lock.getBoundingClientRect().top;
        const header = headerHeight();
        if (top < header - 1) {
          window.scrollTo({ top: Math.max(0, window.scrollY - (header - top)), behavior: "auto" });
        }
        html.style.scrollBehavior = previousBehavior;
        lastScrollYRef.current = window.scrollY;
        ignoreScrollRef.current = false;
      };

      requestAnimationFrame(() => {
        void lock.offsetHeight;
        settle();
      });
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

        if (lastProgressRef.current >= 0.999) {
          releaseWithoutJump();
          measureRail();
          return;
        }

        applyProgress(intoLock() / travelPx());
        measureRail();
        return;
      }

      if (dy <= 0.5) {
        measureRail();
        return;
      }

      if (releasedRef.current) {
        measureRail();
        return;
      }

      applyProgress(intoLock() / travelPx());
      if (lastProgressRef.current >= 0.999 && extraBelow() <= 8) {
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

  const columns = reduceMotion
    ? EQUAL_COLS
    : processPhases.map((_, index) => (index === active ? "1.55fr" : "0.82fr")).join(" ");

  return (
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
                      <div className="process-story__media">
                        <Image
                          src={phase.image}
                          alt={isActive ? phase.imageAlt : ""}
                          fill
                          sizes="(min-width: 900px) 32vw, 70vw"
                          className="object-cover"
                        />
                      </div>
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
  );
}
