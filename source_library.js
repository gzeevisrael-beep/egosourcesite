
(() => {
  'use strict';
  const data = window.SOURCE_LIBRARY_DATA || {};
  const langRaw = (document.documentElement.lang || 'ru').toLowerCase();
  const lang = langRaw.startsWith('he') ? 'he' : langRaw.startsWith('en') ? 'en' : 'ru';
  const ui = data.ui?.[lang] || data.ui?.ru;
  if (!ui) return;
  const sources = data.sources || [];
  const paths = data.paths || [];
  const $ = sel => document.querySelector(sel);
  const $$ = sel => [...document.querySelectorAll(sel)];
  const localized = (item, field) => item[`${field}_${lang}`] || item[`${field}_ru`] || '';
  const urlFor = item => item.url.replace('{lang}', lang);
  const mapFile = lang === 'he' ? 'spiritual_map_he.html' : lang === 'en' ? 'spiritual_map_en.html' : 'spiritual_map.html';
  const labels = {
    author: {baal:ui.baal,rabash:ui.rabash,rashbi:ui.rashbi,ari:ui.ari},
    corpus: {method:ui.method,connection:ui.connection,system:ui.system,zohar:ui.zohar,shamati:ui.shamati,prayer:ui.prayer,letters:ui.letters},
    level: {core:ui.core,deep:ui.deep,extended:ui.extended}
  };
  const mapTitles = {};
  const mapData = window.SPIRITUAL_MAP_DATA?.[lang] || window.SPIRITUAL_MAP_DATA?.ru;
  (mapData?.nodes || []).forEach(n => mapTitles[n.id] = n.title);

  const set = (sel, value, html=false) => { const el=$(sel); if(el) html ? el.innerHTML=value : el.textContent=value; };
  set('[data-ui="kicker"]',ui.kicker); set('[data-ui="title"]',ui.title); set('[data-ui="lead"]',ui.lead);
  set('[data-ui="routes"]',ui.routes); set('[data-ui="catalog"]',ui.catalog); set('[data-ui="note"]',ui.note); set('[data-ui="footer"]',ui.footer);
  $$('[data-ui="home"]').forEach(e=>e.textContent=ui.home); $$('[data-ui="map"]').forEach(e=>e.textContent=ui.map); $$('[data-ui="pticha"]').forEach(e=>e.textContent=ui.pticha); $$('[data-ui="circle"]').forEach(e=>e.textContent=ui.circle);

  const sourceById = Object.fromEntries(sources.map(s=>[s.id,s]));
  const pathGrid = $('#pathGrid');
  const routeView = $('#routeView');
  const routeList = $('#routeList');
  paths.forEach(path => {
    const btn=document.createElement('button'); btn.type='button'; btn.className='lib-path';
    btn.innerHTML=`<h3>${localized(path,'title')}</h3><p>${localized(path,'desc')}</p><span>${ui.routeOpen}</span>`;
    btn.addEventListener('click',()=>{
      routeList.innerHTML='';
      path.items.forEach(id=>{
        const s=sourceById[id]; if(!s) return;
        const chip=document.createElement('button'); chip.type='button'; chip.className='lib-route-chip'; chip.textContent=localized(s,'title');
        chip.addEventListener('click',()=>document.querySelector(`[data-source="${id}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}));
        routeList.appendChild(chip);
      });
      routeView.classList.add('open');
      routeView.scrollIntoView({behavior:'smooth',block:'nearest'});
    });
    pathGrid.appendChild(btn);
  });

  const filters = [
    ['all',ui.all],['baal',ui.baal],['rabash',ui.rabash],['rashbi',ui.rashbi],['ari',ui.ari],
    ['method',ui.method],['connection',ui.connection],['system',ui.system],['zohar',ui.zohar],['shamati',ui.shamati],['prayer',ui.prayer]
  ];
  let active='all', query='';
  const filterHost=$('#filterHost');
  filters.forEach(([value,label])=>{
    const b=document.createElement('button'); b.type='button'; b.className='lib-filter'+(value==='all'?' active':''); b.textContent=label; b.dataset.filter=value;
    b.addEventListener('click',()=>{active=value; $$('.lib-filter').forEach(x=>x.classList.toggle('active',x===b)); applyFilter();}); filterHost.appendChild(b);
  });
  const search=$('#librarySearch'); search.placeholder=ui.search; search.addEventListener('input',()=>{query=search.value.trim().toLocaleLowerCase(); applyFilter();});

  const grid=$('#sourceGrid');
  sources.forEach(s=>{
    const card=document.createElement('article'); card.className='source-card'; card.dataset.source=s.id; card.dataset.author=s.author; card.dataset.corpus=s.corpus;
    card.dataset.search=[localized(s,'title'),localized(s,'why'),labels.author[s.author],labels.corpus[s.corpus],...(s.topics||[]).map(t=>mapTitles[t]||t)].join(' ').toLocaleLowerCase();
    const mapLinks=(s.topics||[]).map(id=>`<a href="${mapFile}?node=${encodeURIComponent(id)}">${mapTitles[id]||id}</a>`).join('');
    card.innerHTML=`<div class="source-meta"><span class="source-pill">${labels.author[s.author]||s.author}</span><span class="source-pill">${labels.corpus[s.corpus]||s.corpus}</span><span class="source-pill">${labels.level[s.level]||s.level}</span></div><h3>${localized(s,'title')}</h3><p>${localized(s,'why')}</p><div class="map-links">${mapLinks}</div><div class="source-actions"><a class="lib-btn primary" href="${urlFor(s)}" target="_blank" rel="noopener noreferrer">${ui.open}</a></div>`;
    grid.appendChild(card);
  });
  const empty=$('#emptyState'); empty.textContent=ui.noResults;
  function applyFilter(){ let visible=0; $$('.source-card').forEach(card=>{ const filterMatch=active==='all'||card.dataset.author===active||card.dataset.corpus===active; const queryMatch=!query||card.dataset.search.includes(query); const show=filterMatch&&queryMatch; card.classList.toggle('hidden',!show); if(show) visible++; }); empty.classList.toggle('show',visible===0); }

  const requestedSource = new URLSearchParams(location.search).get('source');
  if (requestedSource) {
    const target = document.querySelector(`[data-source="${CSS.escape(requestedSource)}"]`);
    if (target) {
      target.classList.add('source_highlight');
      setTimeout(() => target.scrollIntoView({behavior:'smooth', block:'center'}), 80);
    }
  }
})();
