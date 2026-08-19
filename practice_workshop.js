(() => {
  'use strict';
  const all = window.PRACTICE_WORKSHOP_DATA || {};
  const rawLang = (document.documentElement.lang || 'ru').toLowerCase();
  const lang = rawLang.startsWith('he') ? 'he' : rawLang.startsWith('en') ? 'en' : 'ru';
  const ui = all.ui?.[lang] || all.ui?.ru;
  const scenarios = all.scenarios || [];
  if (!ui || !scenarios.length) return;

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const local = obj => obj?.[lang] || obj?.ru || '';
  const categoryLabel = key => ui[key] || key;
  const mapData = window.SPIRITUAL_MAP_DATA?.[lang] || window.SPIRITUAL_MAP_DATA?.ru;
  const sourceData = window.SOURCE_LIBRARY_DATA || {};
  const sourceById = Object.fromEntries((sourceData.sources || []).map(s => [s.id, s]));
  const mapById = Object.fromEntries((mapData?.nodes || []).map(n => [n.id, n]));
  const homeFile = lang === 'he' ? 'he.html' : lang === 'en' ? 'en.html' : 'index.html';
  const mapFile = lang === 'he' ? 'spiritual_map_he.html' : lang === 'en' ? 'spiritual_map_en.html' : 'spiritual_map.html';
  const libraryFile = lang === 'he' ? 'source_library_he.html' : lang === 'en' ? 'source_library_en.html' : 'source_library.html';
  const ptichaFile = lang === 'he' ? 'pticha_he.html' : lang === 'en' ? 'pticha_en.html' : 'pticha.html';

  $$('[data-ui]').forEach(el => {
    const key = el.dataset.ui;
    if (ui[key] != null) el.textContent = ui[key];
  });

  const sourceTitle = source => source?.[`title_${lang}`] || source?.title_ru || '';
  const sourceUrl = source => (source?.url || '#').replace('{lang}', lang);
  const completeKey = 'kabbalah.practice.completed.v1';
  let completed = new Set();
  try { completed = new Set(JSON.parse(localStorage.getItem(completeKey) || '[]')); } catch {}

  const progressCount = $('#progressCount');
  function paintProgress() {
    progressCount.textContent = `${completed.size} / ${scenarios.length}`;
    $$('.pw-card').forEach(card => card.classList.toggle('completed', completed.has(card.dataset.scenario)));
  }

  const filters = ['all','connection','governance','prayer','study','perception'];
  let activeFilter = 'all';
  const filterHost = $('#categoryFilters');
  filters.forEach(key => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pw-filter' + (key === 'all' ? ' active' : '');
    b.textContent = ui[key];
    b.dataset.filter = key;
    b.addEventListener('click', () => {
      activeFilter = key;
      $$('.pw-filter').forEach(x => x.classList.toggle('active', x === b));
      applyFilter();
    });
    filterHost.appendChild(b);
  });

  const grid = $('#scenarioGrid');
  scenarios.forEach((scenario, index) => {
    const card = document.createElement('article');
    card.className = 'pw-card';
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.dataset.scenario = scenario.id;
    card.dataset.category = scenario.category;
    card.innerHTML = `<div class="pw-card-meta"><span>${categoryLabel(scenario.category)}</span><span>${String(index + 1).padStart(2,'0')}</span></div><h3>${local(scenario.title)}</h3><p>${local(scenario.short)}</p><span class="pw-card-open">${ui.open}</span>`;
    const open = () => openScenario(scenario);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    grid.appendChild(card);
  });
  function applyFilter() {
    $$('.pw-card').forEach(card => card.classList.toggle('hidden', activeFilter !== 'all' && card.dataset.category !== activeFilter));
  }

  const backdrop = $('#workBackdrop');
  const panel = $('#workbench');
  const close = $('#workClose');
  const workTitle = $('#workTitle');
  const workCategory = $('#workCategory');
  const stepLabel = $('#stepLabel');
  const stepProgress = $('#stepProgress');
  const stepKind = $('#stepKind');
  const stepHeading = $('#stepHeading');
  const stepText = $('#stepText');
  const reflection = $('#reflection');
  const prev = $('#prevStep');
  const next = $('#nextStep');
  const linked = $('#linkedArea');
  const sourceLinks = $('#sourceLinks');
  const mapLinks = $('#mapLinks');
  const doneBox = $('#doneBox');
  const markDone = $('#markDone');
  const steps = ['truth','trap','principle','work','ten','ask','action'];
  let current = null, stepIndex = 0, lastFocus = null;
  const notes = {};

  function saveNote() {
    if (!current) return;
    notes[`${current.id}:${stepIndex}`] = reflection.value;
  }
  function restoreNote() {
    reflection.value = notes[`${current.id}:${stepIndex}`] || '';
    reflection.placeholder = ui.reflectionPlaceholder;
  }
  function buildLinks(scenario) {
    sourceLinks.innerHTML = '';
    (scenario.sources || []).forEach(id => {
      const source = sourceById[id];
      if (!source) return;
      const direct = document.createElement('a');
      direct.className = 'pw-link primary';
      direct.href = sourceUrl(source);
      direct.target = '_blank';
      direct.rel = 'noopener noreferrer';
      direct.textContent = sourceTitle(source);
      sourceLinks.appendChild(direct);

      const library = document.createElement('a');
      library.className = 'pw-link';
      library.href = `${libraryFile}?source=${encodeURIComponent(id)}`;
      library.textContent = ui.libraryOpen;
      sourceLinks.appendChild(library);
    });
    mapLinks.innerHTML = '';
    (scenario.nodes || []).forEach(id => {
      const node = mapById[id];
      if (!node) return;
      const a = document.createElement('a');
      a.className = 'pw-link';
      a.href = `${mapFile}?node=${encodeURIComponent(id)}`;
      a.textContent = `${ui.mapOpen}: ${node.title}`;
      mapLinks.appendChild(a);
    });
  }
  function renderStep() {
    const key = steps[stepIndex];
    workCategory.textContent = categoryLabel(current.category);
    workTitle.textContent = local(current.title);
    stepLabel.textContent = `${ui.step} ${stepIndex + 1} ${ui.of} ${steps.length}`;
    stepProgress.style.width = `${((stepIndex + 1) / steps.length) * 100}%`;
    stepKind.textContent = categoryLabel(current.category);
    stepHeading.textContent = ui[key];
    stepText.textContent = local(current[key]);
    restoreNote();
    prev.disabled = stepIndex === 0;
    next.textContent = stepIndex === steps.length - 1 ? ui.finish : ui.next;
    linked.classList.toggle('open', stepIndex >= 2);
    doneBox.classList.remove('open');
    markDone.textContent = completed.has(current.id) ? ui.completed : ui.markDone;
    next.style.display = '';
    prev.style.display = '';
  }
  function openScenario(scenario) {
    current = scenario;
    stepIndex = 0;
    lastFocus = document.activeElement;
    buildLinks(scenario);
    renderStep();
    backdrop.classList.add('open');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    close.focus();
    const url = new URL(window.location.href);
    url.searchParams.set('state', scenario.id);
    history.replaceState(null,'',url);
  }
  function closeScenario() {
    saveNote();
    backdrop.classList.remove('open');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    const url = new URL(window.location.href);
    url.searchParams.delete('state');
    history.replaceState(null,'',url);
    if (lastFocus?.focus) lastFocus.focus();
  }

  prev.addEventListener('click', () => { if (stepIndex > 0) { saveNote(); stepIndex--; renderStep(); } });
  next.addEventListener('click', () => {
    saveNote();
    if (stepIndex < steps.length - 1) { stepIndex++; renderStep(); return; }
    linked.classList.add('open');
    doneBox.classList.add('open');
    next.style.display = 'none';
    prev.style.display = 'none';
  });
  markDone.addEventListener('click', () => {
    if (!current) return;
    completed.add(current.id);
    localStorage.setItem(completeKey, JSON.stringify([...completed]));
    markDone.textContent = ui.completed;
    paintProgress();
  });
  close.addEventListener('click', closeScenario);
  backdrop.addEventListener('click', closeScenario);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && panel.classList.contains('open')) closeScenario(); });

  $('#resetProgress').addEventListener('click', () => {
    completed = new Set();
    localStorage.removeItem(completeKey);
    markDone.textContent = ui.markDone;
    paintProgress();
  });
  $('#randomState').addEventListener('click', () => {
    const pool = activeFilter === 'all' ? scenarios : scenarios.filter(s => s.category === activeFilter);
    if (!pool.length) return;
    openScenario(pool[Math.floor(Math.random() * pool.length)]);
  });

  document.querySelector('.pw-brand').href = homeFile;
  const navLinks = $$('.pw-nav > a');
  if (navLinks[0]) navLinks[0].href = homeFile;
  if (navLinks[1]) navLinks[1].href = mapFile;
  if (navLinks[2]) navLinks[2].href = libraryFile;
  if (navLinks[3]) navLinks[3].href = ptichaFile;

  paintProgress();
  const initial = new URLSearchParams(location.search).get('state');
  if (initial) {
    const scenario = scenarios.find(s => s.id === initial);
    if (scenario) setTimeout(() => openScenario(scenario), 80);
  }
})();