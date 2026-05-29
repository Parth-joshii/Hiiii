const revealSelector = "[data-gsap-reveal]";

function setHidden(element) {
  element.style.opacity = "0";
  element.style.transform = "translate3d(0, 24px, 0)";
}

function setVisible(element) {
  element.style.opacity = "1";
  element.style.transform = "translate3d(0, 0, 0)";
}

export function initGsapReveal() {
  if (typeof window === "undefined") {
    return () => {};
  }

  const elements = new Set(Array.from(document.querySelectorAll(revealSelector)));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach(setVisible);
    return () => {};
  }

  const prepareElement = (element) => {
    if (elements.has(element) && element.dataset.revealReady === "true") return;
    elements.add(element);
    element.dataset.revealReady = "true";
    element.style.transition = "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.22, 1, 0.36, 1)";
    element.style.willChange = "opacity, transform";
    setHidden(element);
    observer.observe(element);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(entry.target);
          return;
        }

        if (entry.boundingClientRect.top > window.innerHeight * 0.85) {
          setHidden(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.08,
    },
  );

  elements.forEach((element) => prepareElement(element));

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(revealSelector)) {
          prepareElement(node);
        }
        node.querySelectorAll?.(revealSelector).forEach((element) => prepareElement(element));
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });

  return () => {
    mutationObserver.disconnect();
    observer.disconnect();
    elements.forEach((element) => {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
      element.style.removeProperty("transition");
      element.style.removeProperty("will-change");
    });
  };
}
