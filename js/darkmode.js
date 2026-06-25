/* darkmode.js — dark / light theme toggle */

const themeBtn = document.getElementById('theme');

// Apply saved preference immediately (before paint)
(function applyStoredTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
  }
})();

function updateIcon() {
  if (!themeBtn) return;
  themeBtn.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
  themeBtn.setAttribute(
    'aria-label',
    document.body.classList.contains('light') ? 'Switch to dark mode' : 'Switch to light mode'
  );
}

if (themeBtn) {
  updateIcon();

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcon();
  });
}
