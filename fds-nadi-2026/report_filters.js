(() => {
  const sites = [...document.querySelectorAll('.site')];
  const search = document.querySelector('#search');
  const state = document.querySelector('#state');
  const band = document.querySelector('#band');
  const count = document.querySelector('#count');
  const empty = document.querySelector('#empty');
  function filter() {
    const query = search.value.trim().toLowerCase();
    let locations = 0, records = 0;
    for (const site of sites) {
      const show = (!state.value || site.dataset.state === state.value)
        && (!band.value || site.dataset.band === band.value)
        && site.dataset.search.includes(query);
      site.hidden = !show;
      if (show) { locations++; records += Number(site.dataset.records); }
    }
    count.textContent = `${locations} locations · ${records} FDS records · nearest NADI first`;
    empty.hidden = locations !== 0;
  }
  search.addEventListener('input', filter);
  state.addEventListener('change', filter);
  band.addEventListener('change', filter);
  filter();
})();
