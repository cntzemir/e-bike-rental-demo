'use strict';

/**
 * Simple scroll-reveal animation.
 * Adds .is-visible to elements with .reveal when they enter the viewport.
 * (Vanilla JS, no dependencies — good for a small showcase project.)
 */
(function () {
  const els = Array.from(document.querySelectorAll('.reveal'));
  if (!els.length) return;

  // Respect reduced motion preference
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Fallback if IntersectionObserver is not supported
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
  );

  els.forEach((el) => io.observe(el));
})();
