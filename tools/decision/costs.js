(function () {
  const filters = document.getElementById('cost-filters');
  const table = document.getElementById('cost-table');
  if (!filters || !table) return;
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  filters.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-c]');
    if (!btn) return;
    const c = btn.dataset.c;
    filters.querySelectorAll('button').forEach((b) => b.classList.toggle('is-on', b === btn));
    rows.forEach((row) => {
      row.hidden = c !== 'all' && row.dataset.cat !== c;
    });
  });
})();
