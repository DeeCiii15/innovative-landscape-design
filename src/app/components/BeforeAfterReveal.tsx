"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type BeforeAfterRevealProps = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  priority?: boolean;
  className?: string;
  defaultPosition?: number;
  aspectClassName?: string;
  variant?: "default" | "hero";
  autoReveal?: boolean;
  hideHint?: boolean;
};

export function BeforeAfterReveal({
  before,
  after,
  beforeAlt,
  afterAlt,
  priority = false,
  className = "",
  defaultPosition = 50,
  aspectClassName = "aspect-[4/3]",
  variant = "default",
  autoReveal = false,
  hideHint = false,
}: BeforeAfterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const autoRevealDone = useRef(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const markInteracted = useCallback(() => {
    setHasInteracted(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: PointerEvent) => updatePosition(e.clientX);
    const onUp = () => setIsDragging(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [isDragging, updatePosition]);

  useEffect(() => {
    if (!autoReveal || reduceMotion || hasInteracted || autoRevealDone.current) return;

    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let frame = 0;
    let startTime = 0;
    const duration = 2200;
    const from = 88;
    const to = 28;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || autoRevealDone.current) return;

        autoRevealDone.current = true;
        startTime = performance.now();

        const animate = (now: number) => {
          if (cancelled) return;
          const t = Math.min(1, (now - startTime) / duration);
          const eased = 0.5 - Math.cos(t * Math.PI) / 2;
          setPosition(from + (to - from) * eased);
          if (t < 1) frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [autoReveal, reduceMotion, hasInteracted]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    markInteracted();
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 5));
    }
  };

  const isHero = variant === "hero";
  const showHint = !hideHint && !reduceMotion && !isDragging && !hasInteracted;

  return (
    <div
      ref={containerRef}
      className={`ba-reveal group relative overflow-hidden bg-[var(--color-surface-dark)] ${isHero ? "min-h-[100svh] h-[100svh]" : aspectClassName} ${isDragging ? "ba-reveal--dragging" : ""} ${isHero ? "ba-reveal--hero" : ""} ${className}`}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        const target = e.target as HTMLElement;
        if (target.closest(".ba-reveal-handle") || target.closest("[data-ba-overlay]")) return;
        e.preventDefault();
        markInteracted();
        setIsDragging(true);
        updatePosition(e.clientX);
      }}
    >
      <Image
        src={after}
        alt={afterAlt}
        fill
        priority={priority}
        sizes={isHero ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
        className="object-cover"
        draggable={false}
      />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden={position === 0}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          priority={priority}
          sizes={isHero ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
          className="object-cover"
          draggable={false}
        />
      </div>

      <span className="ba-reveal-label ba-reveal-label--before">Before</span>
      <span className="ba-reveal-label ba-reveal-label--after">After</span>

      <div
        className="ba-reveal-handle"
        style={{ left: `${position}%` }}
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.preventDefault();
          markInteracted();
          setIsDragging(true);
          updatePosition(e.clientX);
        }}
      >
        <div className="ba-reveal-handle-line" aria-hidden />
        <div className="ba-reveal-handle-knob" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
            <path strokeLinecap="round" d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
          </svg>
        </div>
      </div>

      {showHint && <p className="ba-reveal-hint">Drag to reveal</p>}
    </div>
  );
}
