"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { FOUNDING_YEAR } from "@/lib/siteConstants";
import { elementVisible, watchEnter } from "./enterView";

const LETTER_STAGGER_MS = 42;
const SINCE_TEXT = `Since ${FOUNDING_YEAR}`;

function WriteInChars({ text, delay = 0 }: { text: string; delay?: number }) {
  let index = 0;

  return (
    <span aria-hidden>
      {text.split(/(\s+)/).map((part, partIndex) => {
        if (/^\s+$/.test(part)) {
          index += part.length;
          return (
            <span key={`space-${partIndex}`} className="welcome-line__letter welcome-line__space">
              &nbsp;
            </span>
          );
        }

        const start = index;
        const letters = part.split("").map((char, charIndex) => (
          <span
            key={`${char}-${start + charIndex}`}
            className="welcome-line__letter"
            style={{ animationDelay: `${delay + (start + charIndex) * LETTER_STAGGER_MS}ms` }}
          >
            {char}
          </span>
        ));
        index += part.length;

        return (
          <span key={`word-${partIndex}`} className="welcome-line__word">
            {letters}
          </span>
        );
      })}
    </span>
  );
}

export function WelcomeLine() {
  const ref = useRef<HTMLHeadingElement>(null);
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
      <h1
        ref={ref}
        className={`welcome-line-block${phase === "waiting" ? " is-waiting" : ""}${phase === "inview" ? " is-inview" : ""}`}
      >
        <span className="sr-only">
          {title} {SINCE_TEXT}
        </span>
        <span className="welcome-line">
          <WriteInChars text={title} />
        </span>
        <span className="welcome-line__since">
          <WriteInChars text={SINCE_TEXT} delay={sinceDelay} />
        </span>
      </h1>
    </div>
  );
}
