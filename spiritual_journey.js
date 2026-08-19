(() => {
  'use strict';
  const D = window.SPIRITUAL_JOURNEY_DATA || {};
  const raw = (document.documentElement.lang || 'ru').toLowerCase();
  const lang = raw.startsWith('he') ? 'he' : raw.startsWith('en') ? 'en' : 'ru';
  const ui = D.ui?.[lang] || D.ui?.ru;
  const stages = D.stages || [];
  const entries = D.entrypoints || [];
  if (!ui || !stages.length) return;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const local = (obj, field) => obj?.[lang]?.[field] || obj?.ru?.[field] || '';
  const libFile = lang === 'he' ? 'source_library_he.html' : lang === 'en' ? 'source_library_en.html' : 'source_library.html';
  const mapFile = lang === 'he' ? 'spiritual_map_he.html' : lang === 'en' ? 'spiritual_map_en.html' : 'spiritual_map.html';
  const practiceFile = lang === 'he' ? 'practice_workshop_he.html' : lang === 'en' ? 'practice_workshop_en.html' : 'practice_workshop.html';
  const sourceData = window.SOURCE_LIBRARY_DATA || {};
  const sourceById = Object.fromEntries((sourceData.sources || []).map(s => [s.id, s]));
  const sourceTitle = s => s?.[`title_${lang}`] || s?.title_ru || '';
  const storageKey = `spiritual.journey.visited.${lang}`;
  let visited = new Set();
  try { visited = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]')); } catch {}
  let current = 0;

  const set = (sel, text) => { const el = $(sel); if (el) el.textContent = text; };
  set('[data-ui="kicker"]', ui.kicker); set('[data-ui="title"]', ui.title); set('[data-ui="lead"]', ui.lead);
  set('[data-ui="home"]', ui.home); set('[data-ui="map"]', ui.map); set('[data-ui="library"]', ui.library); set('[data-ui="practice"]', ui.practice); set('[data-ui="pticha"]', ui.pticha); set('[data-ui="circle"]', ui.circle);
  set('[data-ui="not_ladder_title"]', ui.not_ladder_title); set('[data-ui="not_ladder"]', ui.not_ladder);
  set('[data-ui="choose_title"]', ui.choose_title); set('[data-ui="choose_lead"]', ui.choose_lead); set('[data-ui="cycle_title"]', ui.cycle_title); set('[data-ui="footer"]', ui.footer);
  set('#prevStage', ui.prev); set('#nextStage', ui.next); set('#resetMarks', ui.reset);

  const entryGrid = $('#entryGrid');
  entries.forEach(item => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'entry_btn'; b.textContent = item[lang] || item.ru;
    b.addEventListener('click', () => { const idx = stages.findIndex(s => s.id === item.stage); if (idx >= 0) { current = idx; render(); $('#routeShell')?.scrollIntoView({behavior:'smooth',block:'start'}); } });
    entryGrid?.appendChild(b);
  });

  const cycle = $('#cycleGrid');
  (ui.cycle_items || []).forEach(text => { const d = document.createElement('div'); d.className='cycle_item'; d.textContent=text; cycle?.appendChild(d); });

  const tabs = $('#stageTabs');
  stages.forEach((s, i) => { const b=document.createElement('button'); b.type='button'; b.className='stage_tab'; b.textContent=String(i+1); b.title=local(s,'title'); b.addEventListener('click',()=>{current=i;render();}); tabs?.appendChild(b); });

  function save(){ localStorage.setItem(storageKey, JSON.stringify([...visited])); }
  function render(){
    const s=stages[current]; if(!s) return;
    set('#stageMeta', `${ui.stage} ${current+1} ${ui.of} ${stages.length}`);
    set('#stageTitle', local(s,'title')); set('#stageQuestion', local(s,'q'));
    set('#clarificationLabel', ui.clarification); set('#clarificationText', local(s,'c'));
    set('#workLabel', ui.work); set('#workText', local(s,'w'));
    set('#dangerLabel', ui.danger); set('#dangerText', local(s,'d'));
    set('#requestLabel', ui.request); set('#requestText', local(s,'r')); set('#sourcesLabel', ui.sources);
    const host=$('#sourceChips'); host.innerHTML='';
    (s.sources||[]).forEach(id=>{ const source=sourceById[id]; if(!source)return; const a=document.createElement('a'); a.className='source_chip'; a.href=`${libFile}?source=${encodeURIComponent(id)}`; a.textContent=sourceTitle(source); host.appendChild(a); });
    const map=$('#mapAction'); map.href=`${mapFile}?node=${encodeURIComponent(s.node)}`; map.textContent=ui.open_map;
    const practice=$('#practiceAction'); practice.href=`${practiceFile}?state=${encodeURIComponent(s.practice)}`; practice.textContent=ui.open_practice;
    const mark=$('#markStage'); const done=visited.has(s.id); mark.textContent=done?ui.visited_done:ui.visited; mark.classList.toggle('marked',done);
    $$('.stage_tab').forEach((b,i)=>{ b.classList.toggle('active',i===current); b.classList.toggle('visited',visited.has(stages[i].id)); });
    $('#prevStage').disabled=current===0; $('#nextStage').disabled=current===stages.length-1;
    const pct=Math.round((visited.size/stages.length)*100); $('#progressFill').style.width=`${pct}%`; set('#progressText',`${ui.progress}: ${visited.size} ${ui.of} ${stages.length}`);
    const params=new URLSearchParams(location.search); if(params.get('stage')!==s.id){ params.set('stage',s.id); history.replaceState(null,'',`${location.pathname}?${params.toString()}`); }
  }
  $('#prevStage')?.addEventListener('click',()=>{if(current>0){current--;render();$('#routeShell')?.scrollIntoView({behavior:'smooth',block:'start'});}});
  $('#nextStage')?.addEventListener('click',()=>{if(current<stages.length-1){current++;render();$('#routeShell')?.scrollIntoView({behavior:'smooth',block:'start'});}});
  $('#markStage')?.addEventListener('click',()=>{const id=stages[current].id; visited.has(id)?visited.delete(id):visited.add(id);save();render();});
  $('#resetMarks')?.addEventListener('click',()=>{visited.clear();save();render();});
  const requested=new URLSearchParams(location.search).get('stage'); const idx=stages.findIndex(s=>s.id===requested); if(idx>=0)current=idx;
  render();
})();
