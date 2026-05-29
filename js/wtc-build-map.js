/**
 * wtc-build-map.js
 * ─────────────────────────────────────
 * Job:      Internal build map and site planning tool — interactivity
 * Connects: Loaded by wtc-build-map/index.html
 */

function switchTab(id, btn) {
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-'+id).classList.add('active');
}
function toggleStep(el) {
  el.classList.toggle('open');
}
function toggleFlow(el) {
  const trigger = el.querySelector('.flow-trigger');
  if(trigger) trigger.style.display = trigger.style.display === 'none' ? 'block' : 'none';
}
