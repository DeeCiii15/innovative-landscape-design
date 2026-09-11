"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { elementVisible } from "./enterView";

const TILE = [
  ".portfolio-index__grid > *",
  ".project-mosaic__item",
  ".hub-featured__photo",
  ".trusted-by__item",
  ".project-tile",
].join(", ");

const BLOCK = [
  ".hub-about__copy",
  ".hub-about__media",
  ".hub-services__head",
  ".hub-featured .heading-section",
  ".hub-featured__title",
  ".hub-featured__blurb",
  ".hub-featured__more",
  ".hub-work__head",
  ".service-module__copy",
  ".service-module__media",
  ".service-module__list li",
  ".project-page__intro",
  ".project-page__copy",
  ".project-page__meta",
  ".cta__grid > *",
  ".footer__inner > *",
  ".surface-card",
  ".trusted-by__title",
  ".portfolio-marquee__head",
  ".portfolio-marquee__band",
  "main .heading-section",
  "main .lead",
  "main form",
  "main address",
  "main iframe",
].join(", ");

const CATCH = "#main-content .container-main > *, .inner-page__stack > section, .project-page__stack .container-main > *";

const SKIP =
  ".hero, .page-hero, .project-hero, .home-aerial, .site-header, .process-story, .photo-collage, .welcome-line-wrap, .service-split, .reveal, .nav-mega, .reviews__actions, .reviews__grid, .trusted-by__item, .trusted-by__row, .trusted-by__viewport, .portfolio-marquee__band";

const NO_TRANSFORM =
  ".cta__panel, .cta-section, .reviews__window, .footer, .reviews--aerial";

function skipped(el: Element) {
  return Boolean(el.closest(SKIP));
}

function noTransform(el: Element) {
  return el.matches(NO_TRANSFORM);
}

function uniqueOutermost(nodes: HTMLElement[]) {
  return nodes.filter((el) => !nodes.some((other) => other !== el && other.contains(el)));
}

export function ScrollRise() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const tiles = [...document.querySelectorAll<HTMLElement>(TILE)].filter((el) => !skipped(el));
    const blocks = [...document.querySelectorAll<HTMLElement>(BLOCK)].filter((el) => !skipped(el));
    const catchAll = [...document.querySelectorAll<HTMLElement>(CATCH)].filter(
      (el) => !skipped(el) && !noTransform(el),
    );

    const specific = uniqueOutermost([...tiles, ...blocks]);
    const keepParents: HTMLElement[] = [];
    const drop = new Set<HTMLElement>();

    for (const parent of catchAll) {
      if (specific.some((el) => el === parent)) continue;
      const kids = specific.filter((el) => parent.contains(el));
      const hasTiles = kids.some((el) => el.matches(TILE));
      if (hasTiles || kids.length >= 3) continue;
      keepParents.push(parent);
      kids.forEach((el) => drop.add(el));
    }

    const nodes = uniqueOutermost([...specific.filter((el) => !drop.has(el)), ...keepParents]).filter(
      (el) => !noTransform(el),
    );

    const show = (el: HTMLElement) => {
      el.classList.add("is-inview");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(show);
      return;
    }

    const waiting: HTMLElement[] = [];
    const groups = new Map<Element, HTMLElement[]>();

    for (const el of nodes) {
      if (elementVisible(el)) {
        show(el);
        continue;
      }
      const parent = el.parentElement ?? document.body;
      const group = groups.get(parent) ?? [];
      group.push(el);
      groups.set(parent, group);
      waiting.push(el);
    }

    for (const group of groups.values()) {
      group.forEach((el, index) => {
        el.style.setProperty("--pop-delay", `${Math.min(index, 8) * 80}ms`);
        el.classList.add("pop-in");
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    waiting.forEach((el) => observer.observe(el));

    const rescue = () => {
      for (const el of waiting) {
        if (el.classList.contains("is-inview")) continue;
        if (elementVisible(el)) {
          show(el);
          observer.unobserve(el);
        }
      }
    };

    window.addEventListener("scroll", rescue, { passive: true });
    window.addEventListener("resize", rescue);
    const interval = window.setInterval(rescue, 200);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.removeEventListener("scroll", rescue);
      window.removeEventListener("resize", rescue);
      nodes.forEach((el) => {
        el.classList.add("is-inview");
        el.classList.remove("pop-in");
        el.style.removeProperty("--pop-delay");
      });
    };
  }, [pathname]);

  return null;
}
