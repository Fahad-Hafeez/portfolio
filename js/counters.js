/* counters.js — animated stat counters */

function animateCounter(id, target, duration = 1400) {
  const el = document.getElementById(id);
  if (!el) return;

  const start     = performance.now();
  const startVal  = 0;

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(startVal + (target - startVal) * eased);

    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(step);
}

// ── Trigger counters when the metrics bar enters view ─────
const metricsEl = document.querySelector('.metrics');

if (metricsEl) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter('papers',         5);
          animateCounter('citations',      0);
          animateCounter('projects-count', 15);
          animateCounter('opensource',     1);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counterObserver.observe(metricsEl);
}
