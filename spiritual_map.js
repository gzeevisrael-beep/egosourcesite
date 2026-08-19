(() => {
  'use strict';
  const dataAll = window.SPIRITUAL_MAP_DATA || {};
  const lang = (document.documentElement.lang || 'ru').toLowerCase().startsWith('he') ? 'he' : (document.documentElement.lang || '').toLowerCase().startsWith('en') ? 'en' : 'ru';
  const data = dataAll[lang] || dataAll.ru;
  if (!data) return;
  const ui = data.ui;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const byId = Object.fromEntries(data.nodes.map(node => [node.id, node]));

  const setText = (selector, value) => {
    const el = $(selector);
    if (el) el.textContent = value;
  };
  const setHTML = (selector, value) => {
    const el = $(selector);
    if (el) el.innerHTML = value;
  };

  setText('[data-ui="brand"]', ui.brand);
  setText('[data-ui="home"]', ui.home);
  setText('[data-ui="pticha"]', ui.pticha);
  setText('[data-ui="circle"]', ui.circle);
  setText('[data-ui="kicker"]', ui.kicker);
  setHTML('[data-ui="title"]', ui.title);
  setText('[data-ui="lead"]', ui.lead);
  setText('[data-ui="start"]', ui.start);
  setText('[data-ui="all-topics"]', ui.allTopics);
  setText('[data-ui="orbit"]', ui.orbit);
  setText('[data-ui="states-kicker"]', ui.statesKicker);
  setText('[data-ui="states-title"]', ui.statesTitle);
  setText('[data-ui="states-lead"]', ui.statesLead);
  setText('[data-ui="topics-kicker"]', ui.topicsKicker);
  setText('[data-ui="topics-title"]', ui.topicsTitle);
  setText('[data-ui="topics-lead"]', ui.topicsLead);
  setText('[data-ui="flow-kicker"]', ui.flowKicker);
  setText('[data-ui="flow-title"]', ui.flowTitle);
  setText('[data-ui="footer"]', ui.footer);

  const statesHost = $('#stateGrid');
  const routeHost = $('#routeBox');
  const routeList = $('#routeList');
  const routeTitle = $('#routeTitle');
  if (routeTitle) routeTitle.textContent = ui.route;

  data.states.forEach(state => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'map-state';
    button.dataset.state = state.id;
    button.innerHTML = `<strong>${state.title}</strong><span>${state.desc}</span>`;
    button.addEventListener('click', () => {
      $$('.map-state').forEach(item => item.classList.toggle('active', item === button));
      routeList.innerHTML = '';
      state.route.forEach((id, index) => {
        const node = byId[id];
        if (!node) return;
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'map-route-node';
        chip.textContent = node.title;
        chip.addEventListener('click', () => openDetail(node));
        routeList.appendChild(chip);
        if (index < state.route.length - 1) {
          const arrow = document.createElement('span');
          arrow.className = 'map-route-arrow';
          arrow.textContent = document.documentElement.dir === 'rtl' ? '←' : '→';
          routeList.appendChild(arrow);
        }
      });
      routeHost.classList.add('visible');
      routeHost.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    statesHost.appendChild(button);
  });

  const filtersHost = $('#mapFilters');
  const filterValues = ['all', 'foundation', 'governance', 'connection', 'correction'];
  let activeFilter = 'all';
  let query = '';
  filterValues.forEach(value => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'map-filter' + (value === 'all' ? ' active' : '');
    button.dataset.filter = value;
    button.textContent = ui[value];
    button.addEventListener('click', () => {
      activeFilter = value;
      $$('.map-filter').forEach(item => item.classList.toggle('active', item === button));
      applyFilter();
    });
    filtersHost.appendChild(button);
  });

  const search = $('#mapSearch');
  if (search) {
    search.placeholder = ui.search;
    search.addEventListener('input', () => {
      query = search.value.trim().toLocaleLowerCase();
      applyFilter();
    });
  }

  const grid = $('#mapGrid');
  data.nodes.forEach((node, index) => {
    const article = document.createElement('article');
    article.className = 'map-node';
    article.dataset.layer = node.layer;
    article.dataset.node = node.id;
    article.dataset.search = [node.title,node.summary,node.revealed,node.principle,node.work,node.ask].join(' ').toLocaleLowerCase();
    article.tabIndex = 0;
    article.setAttribute('role', 'button');
    article.innerHTML = `<span class="map-node-index">${String(index + 1).padStart(2,'0')}</span><span class="map-node-layer">${data.layers[node.layer]}</span><h3>${node.title}</h3><p>${node.summary}</p><span class="map-node-open">${ui.open}</span>`;
    const handler = () => openDetail(node);
    article.addEventListener('click', handler);
    article.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handler();
      }
    });
    grid.appendChild(article);
  });

  function applyFilter() {
    $$('.map-node').forEach(card => {
      const layerMatch = activeFilter === 'all' || card.dataset.layer === activeFilter;
      const queryMatch = !query || card.dataset.search.includes(query);
      card.classList.toggle('hidden', !(layerMatch && queryMatch));
    });
  }

  const backdrop = $('#detailBackdrop');
  const panel = $('#detailPanel');
  const closeButton = $('#detailClose');
  let lastFocus = null;

  function openDetail(node) {
    lastFocus = document.activeElement;
    setText('#detailMeta', data.layers[node.layer]);
    setText('#detailTitle', node.title);
    setText('#detailRevealedLabel', ui.revealed);
    setText('#detailRevealed', node.revealed);
    setText('#detailPrincipleLabel', ui.principle);
    setText('#detailPrinciple', node.principle);
    setText('#detailWorkLabel', ui.work);
    setText('#detailWork', node.work);
    setText('#detailAskLabel', ui.ask);
    setText('#detailAsk', node.ask);
    setText('#detailSourceLabel', ui.source);
    setText('#detailSourceTitle', node.sourceTitle);
    setText('#detailSourceNote', ui.sourceNote);
    const source = $('#detailSourceLink');
    source.href = node.sourceUrl;
    source.textContent = ui.sourceButton;
    backdrop.classList.add('open');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }

  function closeDetail() {
    backdrop.classList.remove('open');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }
  closeButton.addEventListener('click', closeDetail);
  backdrop.addEventListener('click', closeDetail);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && panel.classList.contains('open')) closeDetail();
  });


  function openNodeFromLocation() {
    const params = new URLSearchParams(window.location.search);
    const nodeId = params.get('node') || (window.location.hash.startsWith('#node=') ? decodeURIComponent(window.location.hash.slice(6)) : '');
    const node = byId[nodeId];
    if (!node) return;
    const card = document.querySelector(`[data-node="${CSS.escape(nodeId)}"]`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => openDetail(node), 180);
  }

  const flow = $('#flowGrid');
  ui.flow.forEach((title,index) => {
    const div = document.createElement('div');
    div.className = 'map-flow-step';
    div.innerHTML = `<b>${index + 1}. ${title}</b><span>${ui.flowText[index]}</span>`;
    flow.appendChild(div);
  });
  openNodeFromLocation();
})();
