/**
 * index.js
 * ─────────────────────────────────────
 * Job:      We The Church — home page — interactivity
 * Connects: Loaded by ./index.html
 */

function toggleNav() {
    const links = document.getElementById('nav-links');
    links.classList.toggle('open');
  }
  // Close nav when a link is clicked on mobile
  document.querySelectorAll('#nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('nav-links').classList.remove('open');
    });
  });
