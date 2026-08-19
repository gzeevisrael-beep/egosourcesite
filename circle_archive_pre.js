(() => {
  'use strict';
  const key = 'circle.fixed.content';
  const oldRef = 'https://kabbalahmedia.info/ru/sources/VyDjtKiN';
  const oldTitle = 'Бааль Сулам. Статья на окончание книги Зоар';
  const newData = {
    sourceTitle: 'Бааль Сулам. Шамати 217. Если не я себе, то кто мне',
    sourceRef: 'https://kabbalahmedia.info/ru/sources/RS6B9xHs',
    sourceText: '«Человек должен исполнять всю свою работу в свойстве: «Если не я себе, то кто мне».»\n\nПосле усилия важно выяснять всё происходящее как находящееся под единым управлением. Полный текст открывайте по ссылке на Каббала Медиа.'
  };
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return;
    const data = JSON.parse(raw);
    const isOldDefault = data.sourceRef === oldRef || data.sourceTitle === oldTitle;
    if (!isOldDefault) return;
    Object.assign(data, newData);
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
})();
