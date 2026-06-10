/* Esports at Oregon State — shared scripts */



// Duplicate ticker content for a seamless loop
(function () {
  const track = document.getElementById('tickerTrack');
  if (track) track.innerHTML += track.innerHTML;
})();

// Event filters (events page only)
(function () {
  const filters = document.querySelectorAll('.filter');
  if (!filters.length) return;
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const f = btn.dataset.filter;
      document.querySelectorAll('.match').forEach(m => {
        m.style.display = (f === 'all' || m.dataset.game.split(' ').includes(f)) ? '' : 'none';
      });
      // Hide week labels with no visible matches
      document.querySelectorAll('.week-label').forEach(label => {
        let el = label.nextElementSibling, any = false;
        while (el && el.classList.contains('match')) {
          if (el.style.display !== 'none') any = true;
          el = el.nextElementSibling;
        }
        label.style.display = any ? '' : 'none';
      });
    });
  });
})();

// Scroll reveals
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        observer.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
})();
