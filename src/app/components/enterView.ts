export function elementVisible(el: Element) {
  const rect = el.getBoundingClientRect();
  const view = window.innerHeight || 0;
  if (view <= 0) return true;
  return rect.bottom > 48 && rect.top < view * 0.8;
}

export function watchEnter(el: HTMLElement, onEnter: () => void) {
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    cleanup();
    onEnter();
  };

  const check = () => {
    if (elementVisible(el)) finish();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting || entry.intersectionRatio > 0)) {
        finish();
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
  );

  function cleanup() {
    observer.disconnect();
    window.removeEventListener("scroll", check);
    window.removeEventListener("resize", check);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || elementVisible(el)) {
    onEnter();
    return () => {
      done = true;
    };
  }

  observer.observe(el);
  window.addEventListener("scroll", check, { passive: true });
  window.addEventListener("resize", check);

  return () => {
    done = true;
    cleanup();
  };
}
