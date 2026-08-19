(() => {
  'use strict';

  const sources = [
    ['Шамати 1. Нет никого кроме Него', 'https://kabbalahmedia.info/ru/sources/hFeGidcS'],
    ['Шамати 217. Если не я себе, то кто мне', 'https://kabbalahmedia.info/ru/sources/RS6B9xHs'],
    ['Рабаш. Порядок собрания', 'https://kabbalahmedia.info/ru/sources/oR4gtgR7'],
    ['Рабаш. Важность молитвы многих', 'https://kabbalahmedia.info/ru/sources/0G3JOBRv']
  ];

  function addTopLinks() {
    const bar = document.querySelector('.topbarIn');
    if (!bar || bar.querySelector('[data-archive-home]')) return;
    const home = document.createElement('a');
    home.className = 'btn ghost archiveTopLink';
    home.href = 'index.html';
    home.dataset.archiveHome = '1';
    home.innerHTML = '<span>Главная</span>';
    const pticha = document.createElement('a');
    pticha.className = 'btn ghost archiveTopLink';
    pticha.href = 'pticha.html';
    pticha.innerHTML = '<span>Птиха</span>';
    const workMap = document.createElement('a');
    workMap.className = 'btn ghost archiveTopLink';
    workMap.href = 'spiritual_map.html';
    workMap.innerHTML = '<span>Карта работы</span>';
    const brand = bar.querySelector('.brand');
    if (brand) {
      brand.after(home, workMap, pticha);
    } else {
      bar.prepend(pticha);
      bar.prepend(workMap);
      bar.prepend(home);
    }
  }

  function addMethodSection() {
    if (document.getElementById('archiveMethod')) return;
    const format = document.getElementById('format');
    if (!format) return;
    const section = document.createElement('section');
    section.id = 'archiveMethod';
    section.className = 'archiveMethod';
    section.innerHTML = `
      <div class="wrap">
        <div class="sectionHead">
          <div class="kicker">Внутренняя рамка встречи</div>
          <h2>Круг не исправляет товарищей. Он строит общий недостаток.</h2>
          <p class="lead">Архив наших выяснений сводит метод к одной рабочей последовательности. Состояние приходит свыше. Ответственность человека начинается в отношении, усилии и заботе о связи. Различия не стираются, а становятся материалом для общего обращения.</p>
        </div>
        <div class="archiveMethodGrid">
          <div class="archiveMethodCard"><b>1. Источник состояния</b><span>Мысль, желание, помеха и подъём не используются для обвинения себя или товарища. Сначала выясняем их как материал, данный для работы.</span></div>
          <div class="archiveMethodCard"><b>2. Моя ответственность</b><span>Фраза «всё от Творца» не отменяет усилие. Я отвечаю за то, к какой цели направляю раскрытое состояние.</span></div>
          <div class="archiveMethodCard"><b>3. Товарищ не объект исправления</b><span>Не объясняем другому, что он должен понять. Проверяем, какое отношение к нему мне нужно построить ради общей цели.</span></div>
          <div class="archiveMethodCard"><b>4. Различия сохраняются</b><span>Общая точка не означает одинаковые мнения. Чем больше различий включается в одно устремление, тем богаче общий сосуд.</span></div>
          <div class="archiveMethodCard"><b>5. Центр круга</b><span>Собираем не консенсус, а общий хисарон. Что нам не хватает, чтобы подняться над личным расчётом и удержать связь.</span></div>
          <div class="archiveMethodCard"><b>6. Завершение в просьбе</b><span>Хорошая встреча заканчивается не выводом «мы всё поняли», а более точной совместной потребностью в силе соединения.</span></div>
        </div>
        <div class="archiveFrame">Средняя линия здесь не компромисс между двумя мнениями. Она требует удержать одновременно усилие человека и единство управления, а соединение этих противоположностей просить свыше.</div>
        <div class="archiveSourceBar">
          <strong>Опорные первоисточники для ведущего</strong>
          <div class="archiveSourceLinks">${sources.map(([label, url]) => `<a class="btn ghost" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`).join('')}</div>
          <div class="archiveSourceNote">Текст внутри сценария служит рабочей опорой. Для подготовки и проверки формулировок открывайте полный первоисточник.</div>
        </div>
      </div>`;
    format.parentNode.insertBefore(section, format);

    const nav = document.querySelector('.navIn');
    if (nav && !nav.querySelector('a[href="#archiveMethod"]')) {
      const link = document.createElement('a');
      link.href = '#archiveMethod';
      link.textContent = 'Внутренняя рамка';
      nav.prepend(link);
    }
  }

  function makeSourceRefClickable() {
    const host = document.getElementById('sourceRefView');
    if (!host) return;
    const paint = () => {
      if (host.querySelector('a')) return;
      const text = host.textContent.trim();
      if (!/^https?:\/\//i.test(text)) return;
      host.textContent = '';
      const a = document.createElement('a');
      a.className = 'sourceOpenLink';
      a.href = text;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Открыть полный первоисточник';
      host.appendChild(a);
    };
    paint();
    const observer = new MutationObserver(() => {
      queueMicrotask(paint);
    });
    observer.observe(host, { childList: true, characterData: true, subtree: true });
  }

  function addPreflight() {
    const circleCard = document.querySelector('.circleCard');
    if (!circleCard || circleCard.querySelector('.archivePreflight')) return;
    const items = [
      'Я не собираюсь исправлять ответы товарищей.',
      'Источник важнее моего объяснения.',
      'Различия в круге являются материалом для связи.',
      'Итог встречи должен привести к общей просьбе.'
    ];
    const box = document.createElement('div');
    box.className = 'archivePreflight';
    box.innerHTML = items.map((text, i) => `<label class="archiveCheck"><input type="checkbox" data-archive-check="${i}"><span>${text}</span></label>`).join('');
    circleCard.appendChild(box);
    const key = 'circle.archive.preflight';
    let state = [];
    try { state = JSON.parse(localStorage.getItem(key) || '[]'); } catch { state = []; }
    box.querySelectorAll('input').forEach((input, i) => {
      input.checked = Boolean(state[i]);
      input.addEventListener('change', () => {
        const values = [...box.querySelectorAll('input')].map(x => x.checked);
        localStorage.setItem(key, JSON.stringify(values));
      });
    });
  }

  function addSourceNote() {
    const sourceText = document.getElementById('sourceTextView');
    if (!sourceText || sourceText.parentElement.querySelector('[data-source-note]')) return;
    const p = document.createElement('div');
    p.dataset.sourceNote = '1';
    p.className = 'archiveSourceNote';
    p.textContent = 'Если текст на странице сокращён или пересказан, не используйте его как дословную цитату. Для чтения источника откройте ссылку ниже.';
    sourceText.after(p);
  }

  document.addEventListener('DOMContentLoaded', () => {
    addTopLinks();
    addMethodSection();
    makeSourceRefClickable();
    addPreflight();
    addSourceNote();
  });
})();
