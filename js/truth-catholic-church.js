/**
 * truth-catholic-church.js
 * ─────────────────────────────────────
 * Job:      Truth page: The Catholic Church — interactivity
 * Connects: Loaded by truth/catholic-church/index.html
 */

function shareFacebook(e) {
    e.preventDefault();
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank', 'width=600,height=400');
  }
  function shareInstagram(e) {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(function() {
      alert('Link copied! Open Instagram and paste it in your story or bio.');
    });
  }
  function shareTwitter(e) {
    e.preventDefault();
    var title = document.querySelector('h1') ? document.querySelector('h1').innerText : document.title;
    window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent('What does the Bible actually say about ' + title + '? — We The Church'), '_blank', 'width=600,height=400');
  }
  function shareEmail(e) {
    e.preventDefault();
    var title = document.querySelector('h1') ? document.querySelector('h1').innerText : document.title;
    window.location.href = 'mailto:?subject=What does the Bible say about ' + encodeURIComponent(title) + '&body=Thought you might find this helpful: ' + encodeURIComponent(window.location.href);
  }
  function copyLink(btn) {
    navigator.clipboard.writeText(window.location.href).then(function() {
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span>';
      btn.classList.add('copied');
      setTimeout(function() {
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>Copy Link</span>';
        btn.classList.remove('copied');
      }, 2000);
    });
  }
