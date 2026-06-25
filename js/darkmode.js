/* darkmode.js — dark / light theme toggle with Lucide icons */

const themeBtn = document.getElementById('theme');

// Apply saved preference immediately (before paint)
(function applyStoredTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
  }
})();

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}
