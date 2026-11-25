(function () {
  const filters = document.getElementById('guide-filters');
  if (!filters) return;
  const groups = Array.from(document.querySelectorAll('.guide-group'));
  filters.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-g]');
    if (!btn) return;
    const g = btn.dataset.g;
    filters.querySelectorAll('button').forEach((b) => b.classList.toggle('is-on', b === btn));
    groups.forEach((group) => {
      group.hidden = g !== 'all' && group.dataset.group !== g;
    });
  });
})();
