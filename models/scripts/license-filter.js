(function () {
  const grid = document.getElementById('license-grid');
  if (!grid) return;
  const search = document.getElementById('lic-search');
  const usage = document.getElementById('lic-usage');
  const type = document.getElementById('lic-type');
  const strict = document.getElementById('lic-strict');
  const count = document.getElementById('lic-count');
  const cards = Array.from(grid.querySelectorAll('.license-card'));
  const total = cards.length;

  function apply() {
    const q = (search.value || '').trim().toLowerCase();
    const u = usage.value;
    const t = type.value;
    const onlyYes = strict.checked;
    let shown = 0;
    cards.forEach((card) => {
      const commercial = card.dataset.commercial;
      const attribution = card.dataset.attribution;
      let ok = true;
      if (q && !card.dataset.text.includes(q)) ok = false;
      if (t !== 'all' && card.dataset.type !== t) ok = false;
      if (onlyYes && commercial !== 'yes') ok = false;
      if (u === 'internal' && commercial === 'no') ok = false;
      if (u === 'client' && commercial !== 'yes') ok = false;
      if (u === 'redistribute' && !(commercial === 'yes' && attribution === 'yes')) ok = false;
      card.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = '显示 ' + shown + ' / ' + total + ' 条。未知的许可保留在结果里并标“需确认”，不替你删掉。';
  }

  [search, usage, type, strict].forEach((el) => el.addEventListener('input', apply));
  [usage, type, strict].forEach((el) => el.addEventListener('change', apply));
  apply();
})();
