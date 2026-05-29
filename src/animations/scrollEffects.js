const parallaxSelector = "[data-parallax]";
const washSelector = "[data-scroll-wash]";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function initScrollEffects() {
  if (typeof window === "undefined") {
    return () => {};
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const parallaxElements = new Set();
  const washElements = new Set();
  let rafId = 0;

  const prepareElement = (element) => {
    if (!(element instanceof HTMLElement)) return;

    if (element.matches(parallaxSelector)) {
      parallaxElements.add(element);
      element.style.willChange = "translate";
    }

    if (element.matches(washSelector)) {
      washElements.add(element);
      element.style.willChange = "opacity, translate";
    }
  };

  const scan = (root = document) => {
    root.querySelectorAll?.(`${parallaxSelector}, ${washSelector}`).forEach(prepareElement);
  };

  const reset = () => {
    parallaxElements.forEach((element) => {
      element.style.removeProperty("translate");
      element.style.removeProperty("will-change");
    });
    washElements.forEach((element) => {
      element.style.removeProperty("opacity");
      element.style.removeProperty("translate");
      element.style.removeProperty("will-change");
    });
  };

  scan();

  if (reducedMotion || !("MutationObserver" in window)) {
    reset();
    return () => {};
  }

  const update = () => {
    rafId = 0;
    const viewportHeight = window.innerHeight || 1;
    const viewportCenter = viewportHeight / 2;

    parallaxElements.forEach((element) => {
      if (!element.isConnected) {
        parallaxElements.delete(element);
        return;
      }

      const rect = element.getBoundingClientRect();
      const isNearViewport = rect.bottom > -viewportHeight * 0.25 && rect.top < viewportHeight * 1.25;

      if (!isNearViewport) return;

      const strength = toNumber(element.dataset.parallax, -20);
      const elementCenter = rect.top + rect.height / 2;
      const distance = (elementCenter - viewportCenter) / viewportHeight;
      const shift = clamp(distance * strength, -72, 72);
      element.style.translate = `0 ${shift.toFixed(2)}px`;
    });

    washElements.forEach((element) => {
      if (!element.isConnected) {
        washElements.delete(element);
        return;
      }

      const section = element.closest("section") || element.parentElement;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);
      const proximity = 1 - clamp(distance / (viewportHeight * 0.82), 0, 1);
      const y = clamp((sectionCenter - viewportCenter) * -0.08, -36, 36);

      element.style.opacity = (proximity * 0.5).toFixed(3);
      element.style.translate = `0 ${y.toFixed(2)}px`;
    });
  };

  const requestUpdate = () => {
    if (!rafId) rafId = window.requestAnimationFrame(update);
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        prepareElement(node);
        scan(node);
      });
    });
    requestUpdate();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });

  return () => {
    observer.disconnect();
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
    if (rafId) window.cancelAnimationFrame(rafId);
    reset();
  };
}
