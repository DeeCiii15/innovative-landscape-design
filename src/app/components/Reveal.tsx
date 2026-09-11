"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { elementVisible, watchEnter } from "./enterView";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
};

export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "waiting" | "inview">("idle");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || elementVisible(el)) {
      setPhase("inview");
      return;
    }

    setPhase("waiting");
    return watchEnter(el, () => setPhase("inview"));
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`reveal${phase === "waiting" ? " is-waiting" : ""}${phase === "inview" ? " is-inview" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
