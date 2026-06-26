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
const progressTrack = document.getElementById('scroll-progress-track');
// Tooltip element for showing percentage
const progressTooltip = document.getElementById('scroll-tooltip');
let isHoveringTrack = false;

if (progressTrack) {
  progressTrack.addEventListener('mouseenter', () => { isHoveringTrack = true; });
  progressTrack.addEventListener('mouseleave', () => {
    isHoveringTrack = false;
    if (progressTooltip) progressTooltip.style.opacity = '0';
  });
  // Click on track to jump to that scroll position
  progressTrack.addEventListener('click', (e) => {
    const clickY = e.clientY;
    const ratio = clickY / window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * maxScroll, behavior: 'smooth' });
  });
}

// ── Navbar scroll effect (transparent → glass) ─────────────
const navbar = document.getElementById('navbar');

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (progressBar) {
    const pct = Math.round(Math.min(progress, 100));
    // Bar fills from top of viewport downward
    const barHeight = (pct / 100) * window.innerHeight;
    progressBar.style.height = `${barHeight}px`;
    // Update tooltip text and vertical position
    if (progressTooltip) {
      progressTooltip.textContent = `${pct}%`;
      // Position tooltip beside the bar at the current fill point
      const tooltipY = barHeight;
      progressTooltip.style.top = `${tooltipY}px`;
      // Show tooltip only when hovering the track area
      progressTooltip.style.opacity = (isHoveringTrack && pct > 0) ? '1' : '0';
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
