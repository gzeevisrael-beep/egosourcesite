(() => {
  'use strict';

  const langRaw = (document.documentElement.lang || 'ru').toLowerCase();
  const lang = langRaw.startsWith('he') ? 'he' : langRaw.startsWith('en') ? 'en' : 'ru';
  const sourcePrefix = `https://kabbalahmedia.info/${lang}/sources/`;

  const copy = {
    ru: {
      bridgeNav: 'Мост к работе',
      directSource: 'Открыть текст Птихи',
      note: '<strong>Точность чтения.</strong> Формулировки в схемах, итогах и карточках этого конспекта являются учебными объяснениями. Если рядом нет прямой ссылки на первоисточник, их не следует воспринимать как дословную цитату Бааль Сулама или Рабаша.',
      title: 'От строения миров к работе человека',
      intro: 'Птиха описывает причинную систему света и желания. Нельзя механически переносить названия духовных ступеней на характер, тело или бытовые эмоции. Практический мост появляется там, где изученный закон направляет человека к правильному намерению, связи и просьбе.',
      cards: [
        ['Получающий остаётся получающим', 'Материал творения не превращается в материал Творца. Желание получать остаётся. Исправляется форма его использования, то есть намерение.'],
        ['Экран не равен силе воли', 'Нельзя приказать себе обрести масах. Человек готовит недостаток, окружение и направление, а исправляющая сила приходит свыше.'],
        ['Ступени не являются психологическими ярлыками', 'Хохма, Бина, парцуф, мир или парса описывают духовные отношения между светом и кли. До постижения это карта высшей системы, а не диагноз самому себе.'],
        ['Средняя линия сохраняет две стороны', 'Человек обязан прикладывать усилие как будто работа зависит от него, и вместе с этим учиться относить управление и результат к единому Источнику.'],
        ['Десятка показывает разбиение в практической форме', 'Не потому, что товарищи обязаны стать одинаковыми. Напротив, различия дают материал, над которым можно строить одно направление и общий недостаток.'],
        ['Молитва завершает выяснение', 'Правильное понимание не заканчивается знанием схемы. Оно должно привести к недостатку в силе отдачи, связи и исправления общего кли.']
      ],
      formula: 'Свет создаёт желание. Желание раскрывает различие формы. Исправление не уничтожает получение, а меняет намерение. Разбиение раскрывает отдельность. Связь и общая просьба готовят место для исправляющего света.',
      sourcesTitle: 'Проверить по первоисточникам',
      sources: [
        ['Птиха, полный текст', 'kB3eD83I'],
        ['Предисловие к Птихе', 'h3FdlLJY'],
        ['Шамати 217', 'RS6B9xHs'],
        ['Статьи Рабаша', 'rQ6sIUZK'],
        ['Предисловие к книге Зоар', 'ALlyoveA']
      ],
      progressTitle: 'Пройдено уроков',
      done: 'Отметить урок как пройденный',
      undone: 'Урок пройден'
    },
    he: {
      bridgeNav: 'גשר לעבודה',
      directSource: 'פתיחת טקסט הפתיחה',
      note: '<strong>דיוק בקריאה.</strong> הניסוחים בתרשימים, בסיכומים ובכרטיסים הם הסברים לימודיים. כאשר אין לידם קישור ישיר למקור, אין לראות בהם ציטוט מילולי מבעל הסולם או מרב״ש.',
      title: 'ממבנה העולמות לעבודת האדם',
      intro: 'הפתיחה מתארת מערכת סיבתית של אור ורצון. אין להלביש באופן מכני שמות של מדרגות רוחניות על אופי, גוף או רגשות יומיומיים. הגשר המעשי נבנה כאשר החוק הנלמד מכוון לכוונה נכונה, לחיבור ולבקשה.',
      cards: [
        ['המקבל נשאר מקבל', 'חומר הנברא אינו הופך לחומר של הבורא. הרצון לקבל נשאר. התיקון הוא בצורת השימוש בו, כלומר בכוונה.'],
        ['מסך אינו כוח רצון רגיל', 'אי אפשר לצוות על עצמנו לרכוש מסך. האדם מכין חיסרון, סביבה וכיוון, וכוח התיקון מגיע מלמעלה.'],
        ['מדרגות אינן תוויות פסיכולוגיות', 'חכמה, בינה, פרצוף, עולם או פרסה מתארים יחסים רוחניים בין אור וכלי. לפני השגה זו מפת המערכת העליונה, לא אבחון עצמי.'],
        ['הקו האמצעי שומר על שני הצדדים', 'האדם חייב להתאמץ כאילו העבודה תלויה בו, וביחד עם זאת ללמוד לייחס את ההנהגה ואת התוצאה למקור האחד.'],
        ['העשירייה מגלה את השבירה בצורה מעשית', 'לא מפני שהחברים צריכים להיות זהים. דווקא ההבדלים נותנים חומר שמעליו אפשר לבנות כיוון אחד וחיסרון משותף.'],
        ['התפילה משלימה את הבירור', 'הבנה נכונה אינה מסתיימת בידיעת התרשים. עליה להביא לחיסרון לכוח השפעה, לחיבור ולתיקון הכלי המשותף.']
      ],
      formula: 'האור יוצר רצון. הרצון מגלה שינוי צורה. התיקון אינו מבטל את הקבלה אלא משנה את הכוונה. השבירה מגלה נפרדות. החיבור והבקשה המשותפת מכינים מקום למאור המחזיר למוטב.',
      sourcesTitle: 'בדיקה במקורות',
      sources: [
        ['פתיחה, הטקסט המלא', 'kB3eD83I'],
        ['הקדמה לפתיחה', 'h3FdlLJY'],
        ['שמעתי 217', 'RS6B9xHs'],
        ['מאמרי רב״ש', 'rQ6sIUZK'],
        ['הקדמה לספר הזוהר', 'ALlyoveA']
      ],
      progressTitle: 'שיעורים שהושלמו',
      done: 'סימון השיעור כהושלם',
      undone: 'השיעור הושלם'
    },
    en: {
      bridgeNav: 'Bridge to practice',
      directSource: 'Open the Pticha text',
      note: '<strong>Reading precision.</strong> The wording in diagrams, summaries, and cards is explanatory study material. When there is no direct primary source link beside it, it should not be treated as a verbatim quotation from Baal HaSulam or Rabash.',
      title: 'From the structure of the worlds to human work',
      intro: 'Pticha describes a causal system of light and desire. Spiritual degrees should not be mechanically projected onto personality, the body, or everyday emotions. The practical bridge appears when a studied law directs a person toward correct intention, connection, and request.',
      cards: [
        ['The receiver remains a receiver', 'The substance of the creature does not become the substance of the Creator. The will to receive remains. What is corrected is its form of use, the intention.'],
        ['A screen is not ordinary willpower', 'A person cannot command a masach into existence. One prepares the lack, the environment, and the direction, while the correcting force comes from above.'],
        ['Degrees are not psychological labels', 'Hochma, Bina, Partzuf, world, and Parsa describe spiritual relations between light and vessel. Before attainment they are a map of the higher system, not a self diagnosis.'],
        ['The middle line preserves both sides', 'A person must exert effort as though the work depends on them, while learning to attribute governance and the result to the one Source.'],
        ['The ten reveals the shattering in practical form', 'Not because the friends should become identical. Differences provide the material above which one direction and a common lack can be built.'],
        ['Prayer completes the clarification', 'Correct understanding does not end in knowing the diagram. It should lead to a need for the force of bestowal, connection, and correction of the common vessel.']
      ],
      formula: 'Light creates desire. Desire reveals disparity of form. Correction does not erase reception, but changes the intention. Shattering reveals separateness. Connection and a common request prepare a place for the reforming light.',
      sourcesTitle: 'Check against the primary sources',
      sources: [
        ['Pticha, full text', 'kB3eD83I'],
        ['Preface to Pticha', 'h3FdlLJY'],
        ['Shamati 217', 'RS6B9xHs'],
        ['Rabash articles', 'rQ6sIUZK'],
        ['Preface to The Book of Zohar', 'ALlyoveA']
      ],
      progressTitle: 'Lessons completed',
      done: 'Mark lesson complete',
      undone: 'Lesson completed'
    }
  }[lang];

  const makeSourceUrl = id => `${sourcePrefix}${id}`;

  function addDirectSourceButton() {
    const actions = document.querySelector('.ptichahero .hero-actions');
    if (!actions || actions.querySelector('.archive-source-direct')) return;
    const a = document.createElement('a');
    a.className = 'button ghost archive-source-direct';
    a.href = makeSourceUrl('kB3eD83I');
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = copy.directSource;
    actions.appendChild(a);
  }

  function addAccuracyNote() {
    const note = document.querySelector('.studynote');
    if (!note || note.querySelector('.pticha-archive-note')) return;
    const div = document.createElement('div');
    div.className = 'pticha-archive-note';
    div.innerHTML = copy.note;
    note.appendChild(div);
  }

  function addBridgeNav() {
    const nav = document.querySelector('.site-header .nav');
    if (nav && !nav.querySelector('a[href="#bridge"]')) {
      const a = document.createElement('a');
      a.href = '#bridge';
      a.textContent = copy.bridgeNav;
      const mapLink = nav.querySelector('a[href="#map"]');
      nav.insertBefore(a, mapLink || null);
    }
    const side = document.querySelector('.studysidebar');
    if (side && !side.querySelector('a[href="#bridge"]')) {
      const a = document.createElement('a');
      a.href = '#bridge';
      a.textContent = copy.bridgeNav;
      const mapLink = side.querySelector('a[href="#map"]');
      side.insertBefore(a, mapLink || null);
    }
  }

  function addBridge() {
    if (document.getElementById('bridge')) return;
    const map = document.getElementById('map');
    if (!map) return;
    const section = document.createElement('section');
    section.className = 'studysection reveal visible pticha-bridge';
    section.id = 'bridge';
    const cards = copy.cards.map((item, i) => `
      <article class="bridge-card">
        <span class="bridge-no">${String(i + 1).padStart(2, '0')}</span>
        <h3>${item[0]}</h3>
        <p>${item[1]}</p>
      </article>`).join('');
    const sources = copy.sources.map(([label, id]) => `<a class="button ghost" href="${makeSourceUrl(id)}" target="_blank" rel="noopener noreferrer">${label}</a>`).join('');
    section.innerHTML = `
      <h1>${copy.title}</h1>
      <p class="bridge-intro">${copy.intro}</p>
      <div class="bridge-grid">${cards}</div>
      <div class="bridge-formula">${copy.formula}</div>
      <h2>${copy.sourcesTitle}</h2>
      <div class="bridge-sources">${sources}</div>`;
    map.parentNode.insertBefore(section, map);
  }

  function refineGlossary() {
    const replacements = {
      ru: {
        'Творец': 'Постигаемый Корень и источник света. О сущности самой по себе каббала не говорит. В отношении творения Он раскрывается через отдачу, любовь и управление.',
        'Кли': 'Желание получать. Духовная форма кли определяется также намерением и возможностью использовать желание ради отдачи.',
        'Мир': 'Степень скрытия и раскрытия высшего управления относительно постигающего, а не физическая область пространства.',
        'Адам Ришон': 'Единая система связи душ, общее кли, чьи части после разбиения ощущают себя раздельными.',
        'Исправление': 'Изменение формы использования желания. Желание получать не уничтожается, исправляется намерение над ним.'
      },
      he: {
        'בורא': 'השורש המושג ומקור האור. על עצמותו אין הקבלה מדברת. כלפי הנברא הוא מתגלה דרך השפעה, אהבה והנהגה.',
        'כלי': 'רצון לקבל. הצורה הרוחנית של הכלי נקבעת גם על ידי הכוונה והיכולת להשתמש ברצון על מנת להשפיע.',
        'עולם': 'מידת הסתרה וגילוי של ההנהגה העליונה כלפי המשיג, ולא אזור פיזי במרחב.',
        'אדם הראשון': 'מערכת אחת של קשר בין הנשמות, כלי משותף שחלקיו מרגישים את עצמם נפרדים לאחר השבירה.',
        'תיקון': 'שינוי צורת השימוש ברצון. הרצון לקבל אינו מתבטל, אלא הכוונה שעליו מתוקנת.'
      },
      en: {
        'Creator': 'The attained Root and source of the light. Kabbalah does not speak about His essence in itself. Relative to the creature He is revealed through bestowal, love, and governance.',
        'Kli': 'The will to receive. The spiritual form of a vessel is also determined by intention and by the ability to use desire in order to bestow.',
        'World': 'A degree of concealment and revelation of higher governance relative to the attaining person, not a physical region of space.',
        'Adam HaRishon': 'The single system of connection among the souls, the common vessel whose parts feel separate after the shattering.',
        'Correction': 'A change in the form of using desire. The will to receive is not erased. The intention over it is corrected.'
      }
    }[lang];
    if (!replacements) return;
    document.querySelectorAll('#terms .studytable tbody tr').forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length < 2) return;
      const key = cells[0].textContent.trim();
      if (replacements[key]) cells[1].textContent = replacements[key];
    });
  }

  function addProgress() {
    const content = document.querySelector('.studycontent');
    const lessons = [...document.querySelectorAll('.lesson[id]')];
    if (!content || !lessons.length || content.querySelector('.pticha-progress-box')) return;
    const storageKey = `pticha.progress.${lang}`;
    let completed = [];
    try { completed = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { completed = []; }
    const done = new Set(Array.isArray(completed) ? completed : []);

    const box = document.createElement('div');
    box.className = 'pticha-progress-box';
    box.innerHTML = `<div class="pticha-progress-head"><strong>${copy.progressTitle}</strong><span class="pticha-progress-count"></span></div><div class="pticha-progress-track"><span></span></div>`;
    content.insertBefore(box, content.firstElementChild);

    const update = () => {
      const count = lessons.filter(l => done.has(l.id)).length;
      box.querySelector('.pticha-progress-count').textContent = `${count} / ${lessons.length}`;
      box.querySelector('.pticha-progress-track span').style.width = `${lessons.length ? (count / lessons.length) * 100 : 0}%`;
      localStorage.setItem(storageKey, JSON.stringify([...done]));
    };

    lessons.forEach(lesson => {
      const body = lesson.querySelector('.lessonbody');
      if (!body) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'study-done';
      const paint = () => {
        const isDone = done.has(lesson.id);
        button.setAttribute('aria-pressed', String(isDone));
        button.textContent = isDone ? copy.undone : copy.done;
      };
      button.addEventListener('click', () => {
        if (done.has(lesson.id)) done.delete(lesson.id); else done.add(lesson.id);
        paint();
        update();
      });
      paint();
      body.insertBefore(button, body.firstChild);
    });
    update();
  }


  function addWorkMapNav() {
    const config = {
      ru: { href: 'spiritual_map.html', label: 'Карта работы' },
      he: { href: 'spiritual_map_he.html', label: 'מפת העבודה' },
      en: { href: 'spiritual_map_en.html', label: 'Work map' }
    }[lang];
    const nav = document.querySelector('.site-header .nav');
    if (nav && !nav.querySelector(`a[href="${config.href}"]`)) {
      const a = document.createElement('a');
      a.href = config.href;
      a.textContent = config.label;
      const home = nav.querySelector('a[href="index.html"], a[href="he.html"], a[href="en.html"]');
      nav.insertBefore(a, home ? home.nextSibling : nav.firstChild);
    }
    const side = document.querySelector('.studysidebar');
    if (side && !side.querySelector(`a[href="${config.href}"]`)) {
      const a = document.createElement('a');
      a.href = config.href;
      a.textContent = config.label;
      const sourceBack = side.querySelector('.sourceback');
      side.insertBefore(a, sourceBack || null);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    addDirectSourceButton();
    addWorkMapNav();
    addAccuracyNote();
    addBridgeNav();
    addBridge();
    refineGlossary();
    addProgress();
  });
})();
