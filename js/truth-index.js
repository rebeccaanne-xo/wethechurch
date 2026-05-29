/**
 * truth-index.js
 * ─────────────────────────────────────
 * Job:      Truth series index page — interactivity
 * Connects: Loaded by truth/truth-index/index.html
 */

const searchInput = document.getElementById('topic-search');
  const noResults = document.getElementById('no-results');

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.topic-card');
    const categories = document.querySelectorAll('.category');
    let totalVisible = 0;

    cards.forEach(function(card) {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const desc = (card.querySelector('.topic-card-desc') || {}).innerText || '';
      const tag = (card.querySelector('.topic-card-tag') || {}).innerText || '';
      const match = !query || title.includes(query) || desc.toLowerCase().includes(query) || tag.toLowerCase().includes(query);
      card.style.display = match ? '' : 'none';
      if (match) totalVisible++;
    });

    categories.forEach(function(cat) {
      const visibleCards = cat.querySelectorAll('.topic-card:not([style*="display: none"])');
      cat.style.display = visibleCards.length ? '' : 'none';
    });

    noResults.style.display = totalVisible === 0 ? 'block' : 'none';
  });

  function clearSearch() {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
  }
