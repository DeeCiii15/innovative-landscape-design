"use client";

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "./Reveal";
import { TrustedBy } from "./TrustedBy";
import { GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL } from "@/lib/siteConstants";
import { siteConfig } from "@/lib/siteConfig";

function Stars({ count }: { count: number }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-3.5"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
      {direction === "prev" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

function ReviewsTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const grid = ref.current;
    if (!grid) return;
    const max = Math.max(0, grid.scrollWidth - grid.clientWidth);
    setCanPrev(grid.scrollLeft > 8);
    setCanNext(grid.scrollLeft < max - 8);
  }, []);

  const centerMiddle = useCallback(() => {
    const grid = ref.current;
    if (!grid) return;
    const cards = [...grid.children];
    const mid = cards[Math.floor(cards.length / 2)];
    if (!(mid instanceof HTMLElement)) return;
    const left = mid.offsetLeft - (grid.clientWidth - mid.offsetWidth) / 2;
    grid.scrollTo({ left: Math.max(0, left), behavior: "auto" });
  }, []);

  const scrollByCard = (direction: -1 | 1) => {
    const grid = ref.current;
    if (!grid) return;
    const card = grid.children[0];
    const gap = Number.parseFloat(getComputedStyle(grid).columnGap || getComputedStyle(grid).gap) || 16;
    const amount = card instanceof HTMLElement ? card.offsetWidth + gap : grid.clientWidth * 0.7;
    grid.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const grid = ref.current;
    if (!grid) return;

    centerMiddle();
    updateArrows();
    const frame = window.requestAnimationFrame(() => {
      centerMiddle();
      updateArrows();
    });

    grid.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    return () => {
      window.cancelAnimationFrame(frame);
      grid.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [centerMiddle, updateArrows]);

  return (
    <div className="reviews__carousel">
      <button
        type="button"
        className="reviews__arrow reviews__arrow--prev"
        aria-label="Previous reviews"
        disabled={!canPrev}
        onClick={() => scrollByCard(-1)}
      >
        <Chevron direction="prev" />
      </button>
      <div ref={ref} className="reviews__grid">
        {children}
      </div>
      <button
        type="button"
        className="reviews__arrow reviews__arrow--next"
        aria-label="Next reviews"
        disabled={!canNext}
        onClick={() => scrollByCard(1)}
      >
        <Chevron direction="next" />
      </button>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="reviews reviews--aerial section--tight">
      <div className="reviews__window">
        <div className="container-main">
          <Reveal className="reviews__head">
            <h2 className="heading-section reviews__title">What our customers say</h2>
          </Reveal>

          <div className="reviews__scroller">
            <ReviewsTrack>
              {siteConfig.reviews.map((review, index) => (
                <Reveal key={review.id} delay={index * 60}>
                  <figure className="review">
                    <Stars count={review.rating} />
                    <blockquote className="review__text">&ldquo;{review.text}&rdquo;</blockquote>
                    <figcaption className="review__cite">
                      <p className="review__name">{review.name}</p>
                      <p className="review__meta">
                        {review.source} · {review.service}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ReviewsTrack>
          </div>

          <div className="reviews__actions">
            <a
              href={GOOGLE_WRITE_REVIEW_URL}
              className="btn-primary reviews__btn-write focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-dark)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave a Google review
            </a>
            <a
              href={GOOGLE_REVIEWS_URL}
              className="btn-ghost-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              View more reviews
            </a>
          </div>
        </div>
      </div>

      <TrustedBy />
    </section>
  );
}
