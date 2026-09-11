"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { elementVisible, watchEnter } from "./enterView";

const LETTER_STAGGER_MS = 42;
const SINCE_TEXT = "Since 2007";

function WriteInChars({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-hidden>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={char === " " ? "welcome-line__letter welcome-line__space" : "welcome-line__letter"}
          style={{ animationDelay: `${delay + index * LETTER_STAGGER_MS}ms` }}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}

export function WelcomeLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "waiting" | "inview">("idle");
  const title = siteConfig.aboutWelcome;
  const sinceDelay = title.length * LETTER_STAGGER_MS + 120;

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || elementVisible(node)) {
      setPhase("inview");
      return;
    }

    setPhase("waiting");
    return watchEnter(node, () => setPhase("inview"));
  }, []);

  return (
    <div className="welcome-line-wrap">
      <div
        ref={ref}
        className={`welcome-line-block${phase === "waiting" ? " is-waiting" : ""}${phase === "inview" ? " is-inview" : ""}`}
      >
        <p className="welcome-line">
          <span className="sr-only">{title}</span>
          <WriteInChars text={title} />
        </p>
        <p className="welcome-line__since">
          <span className="sr-only">{SINCE_TEXT}</span>
          <WriteInChars text={SINCE_TEXT} delay={sinceDelay} />
        </p>
      </div>
    </div>
  );
}
