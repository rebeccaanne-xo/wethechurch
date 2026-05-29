/**
 * join.js
 * ─────────────────────────────────────
 * Job:      Join the community — signup and info page — interactivity
 * Connects: Loaded by join/index.html
 */

// ── SCROLL REVEAL ────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── FORM SUBMISSION ──────────────────────────────────────────────────────
// REPLACE THIS URL with your Google Apps Script Web App URL after deploying
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyw9EEatC51taTAvbdhaydh608O2SWKHrHgUqzCyoHkg7Z0loEKXUQ5B13LGDwKzP2GVQ/exec';

function submitForm() {
  const name      = document.getElementById('input-name').value.trim();
  const email     = document.getElementById('input-email').value.trim();
  const newsletter = document.getElementById('newsletter-check').checked;
  const btn       = document.getElementById('submit-btn');
  const errEl     = document.getElementById('email-error');

  // Validate
  errEl.style.display = 'none';
  if(!name || !email) return;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errEl.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending…';

  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, newsletter, source: 'landing-page', timestamp: new Date().toISOString() })
  })
  .then(() => {
    document.getElementById('join-form').style.display = 'none';
    document.getElementById('success-msg').style.display = 'block';
  })
  .catch(() => {
    btn.disabled = false;
    btn.textContent = 'Join We The Church →';
    alert('Something went wrong. Please try again or email us directly.');
  });
}

// ── COPY EMAIL ───────────────────────────────────────────────────────────
function copyEmail() {
  navigator.clipboard.writeText('rebeccaannexo@gmail.com').then(() => {
    const tip = document.getElementById('copy-tip');
    if(!tip) return;
    tip.style.display = 'block';
    setTimeout(() => { tip.style.display = 'none'; }, 2000);
  });
}

// Allow Enter key on inputs
document.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('keydown', e => { if(e.key === 'Enter') submitForm(); });
});
