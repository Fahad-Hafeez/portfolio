/* animations.js — scroll reveals + mobile nav + mouse spotlight + navbar scroll */

// ── Scroll reveal with IntersectionObserver ────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
  revealObserver.observe(el);
});

// ── Mobile hamburger nav ───────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Scroll progress bar ────────────────────────────────────
const progressBar = document.getElementById('scroll-progress');
// Tooltip element for showing percentage
const progressTooltip = document.getElementById('scroll-tooltip');

// ── Navbar scroll effect (transparent → glass) ─────────────
const navbar = document.getElementById('navbar');

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (progressBar) {
    const pct = Math.round(Math.min(progress, 100));
    progressBar.style.width = `${pct}%`;
    // Update tooltip text and position
    if (progressTooltip) {
      progressTooltip.textContent = `${pct}%`;
      // Position tooltip centered over the current width of the bar
      const barRect = progressBar.getBoundingClientRect();
      const tooltipX = barRect.left + barRect.width / 2;
      progressTooltip.style.left = `${tooltipX}px`;
      // Show tooltip only when progress > 0
      progressTooltip.style.opacity = pct > 0 ? '1' : '0';
    }
  }

  if (navbar) {
    if (scrollTop > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}

// ── Navbar shrink on scroll direction ───────────────────────
let lastScrollY = 0;
function handleNavbarShrink() {
  if (!navbar) return;
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 100) {
    // scrolling down
    navbar.classList.add('shrink');
  } else if (currentY < lastScrollY) {
    // scrolling up
    navbar.classList.remove('shrink');
  }
  if (currentY === 0) {
    navbar.classList.remove('shrink');
  }
  lastScrollY = currentY;
}

window.addEventListener('scroll', updateScrollEffects, { passive: true });
window.addEventListener('load', updateScrollEffects);
// Attach shrink handler
window.addEventListener('scroll', handleNavbarShrink, { passive: true });

// ── Active nav link by section ─────────────────────────────
const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));
const sections = Array.from(document.querySelectorAll('section[id]'));

function updateActiveLink() {
  const scrollY = window.scrollY + 140;
  let currentId = 'home';

  sections.forEach((section) => {
    if (scrollY >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navAnchors.forEach((link) => {
    const target = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', target === currentId);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('load', updateActiveLink);

// ── Mouse spotlight effect ─────────────────────────────────
const spotlight = document.getElementById('mouse-spotlight');

if (spotlight) {
  document.addEventListener('mousemove', (e) => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
    spotlight.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
  });
}

// ── Initialize Lucide icons after DOM load ─────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
