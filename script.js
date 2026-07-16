const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);

  const path = document.querySelector('.path');
  const progress = document.getElementById('pathProgress');
  if (path && progress) {
    const rect = path.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * .3)));
    progress.style.width = `${ratio * 100}%`;
  }
}, { passive: true });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .1 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});

const nav = document.querySelector('.nav');
const pageFile = window.location.pathname.split('/').pop() || 'index.html';
const documentLanguage = (document.documentElement.lang || '').toLowerCase();
const siteLanguage = pageFile === 'he.html' || documentLanguage.startsWith('he') ? 'he' : pageFile === 'en.html' || documentLanguage.startsWith('en') ? 'en' : 'ru';
const ptichaConfig = {
  ru: { href: 'pticha.html', link: 'Птиха', author: 'Бааль Сулам', title: 'Птиха понятным языком', description: 'Восемь последовательных уроков с пояснениями, картой процесса и вопросами для повторения.', button: 'Открыть учебный конспект' },
  he: { href: 'pticha_he.html', link: 'פתיחה', author: 'בעל הסולם', title: 'פתיחה בשפה ברורה', description: 'שמונה שיעורים רצופים עם הסברים, מפת תהליך ושאלות לחזרה.', button: 'לפתוח את מדריך הלימוד' },
  en: { href: 'pticha_en.html', link: 'Pticha', author: 'Baal HaSulam', title: 'Pticha in clear language', description: 'Eight connected lessons with explanations, a process map, and review questions.', button: 'Open the study guide' }
}[siteLanguage];

if (nav && !nav.querySelector(`a[href="${ptichaConfig.href}"]`) && !document.body.classList.contains('ptichapage')) {
  const link = document.createElement('a');
  link.href = ptichaConfig.href;
  link.textContent = ptichaConfig.link;
  link.style.display = 'inline-flex';
  const languageLink = nav.querySelector('a[href="index.html"], a[href="he.html"], a[href="en.html"]');
  nav.insertBefore(link, languageLink || null);
}

const sourceList = document.querySelector('.source-list');
if (sourceList && !sourceList.querySelector('[data-pticha-card]')) {
  const card = document.createElement('article');
  card.className = 'source-item reveal visible';
  card.dataset.ptichaCard = 'true';
  card.innerHTML = `<span>${ptichaConfig.author}</span><h3>${ptichaConfig.title}</h3><p>${ptichaConfig.description}</p><a class="button ghost" href="${ptichaConfig.href}">${ptichaConfig.button}</a>`;
  sourceList.appendChild(card);
}

const states = {
  distance: [
    ['Назовите правду', 'Спокойно признайте: сейчас мое желание разделяет меня с другими, и я не могу изменить его напрямую.'],
    ['Включите товарищей', 'Представьте, что каждый тоже борется с собственной природой. Найдите хотя бы одно их стремление, которое вы хотите поддержать.'],
    ['Соберите просьбу', 'Обратитесь к Источнику: дай нам силу поднять важность связи выше личного отдаления и почувствовать одно общее желание.']
  ],
  conflict: [
    ['Отделите факт от эго', 'Назовите то, что произошло, без обвинения. Затем признайте внутренний расчет, который требует доказать вашу правоту.'],
    ['Поставьте связь выше победы', 'Спросите себя: какое действие сейчас сохранит направление к объединению, даже если мое мнение не принято?'],
    ['Попросите новую форму', 'Обратитесь к Источнику: помоги нам использовать разногласие не для разделения, а для построения более высокой связи.']
  ],
  emptiness: [
    ['Не убегайте от пустоты', 'Признайте отсутствие вкуса и сил. Не требуйте немедленного приятного наполнения.'],
    ['Возьмите важность у среды', 'Вспомните товарища, источник или момент, когда цель была живой. Позвольте общей цели говорить вместо текущего чувства.'],
    ['Просите желание', 'Обратитесь к Источнику: дай мне не наполнение, а недостаток к связи, просьбе и отдаче.']
  ]
};

const stateButtons = [...document.querySelectorAll('.state-picker button')];
const practiceTitle = document.getElementById('practiceTitle');
const practiceText = document.getElementById('practiceText');
const practiceLabel = document.getElementById('practiceLabel');
const practiceProgress = document.getElementById('practiceProgress');
const reflection = document.getElementById('reflection');
const previousButton = document.getElementById('prevStep');
const nextButton = document.getElementById('nextStep');

if (stateButtons.length && practiceTitle && practiceText && practiceLabel && practiceProgress && reflection && previousButton && nextButton) {
  let selectedState = 'distance';
  let currentStep = 0;

  const renderPractice = () => {
    const [stepTitle, stepText] = states[selectedState][currentStep];
    practiceTitle.textContent = stepTitle;
    practiceText.textContent = stepText;
    practiceLabel.textContent = `Шаг ${currentStep + 1} из 3`;
    practiceProgress.style.width = `${(currentStep + 1) * 33.333}%`;
    previousButton.disabled = currentStep === 0;
    nextButton.textContent = currentStep === 2 ? 'Завершить' : 'Продолжить';
    reflection.placeholder = currentStep === 2 ? 'Сформулируйте общую просьбу...' : 'Запишите одну честную фразу...';
  };

  stateButtons.forEach(button => {
    button.addEventListener('click', () => {
      stateButtons.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      selectedState = button.dataset.state;
      currentStep = 0;
      reflection.value = '';
      renderPractice();
    });
  });

  stateButtons[0].classList.add('active');

  nextButton.addEventListener('click', () => {
    if (currentStep < 2) {
      currentStep += 1;
      reflection.value = '';
      renderPractice();
      return;
    }

    practiceTitle.textContent = 'Обращение собрано';
    practiceText.textContent = 'Останьтесь на несколько мгновений в общем намерении. Не проверяйте результат внутри личного ощущения. Сохраните направление к связи.';
    practiceLabel.textContent = 'Практика завершена';
    nextButton.textContent = 'Начать заново';
    nextButton.onclick = () => {
      currentStep = 0;
      reflection.value = '';
      nextButton.onclick = null;
      renderPractice();
    };
  });

  previousButton.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep -= 1;
      reflection.value = '';
      renderPractice();
    }
  });
}

const canvas = document.getElementById('field');
if (canvas) {
  const context = canvas.getContext('2d');
  let particles = [];

  const resizeCanvas = () => {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    particles = Array.from({ length: Math.min(55, Math.floor(window.innerWidth / 24)) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .12,
      vy: (Math.random() - .5) * .12,
      r: Math.random() * 1.4 + .3
    }));
  };

  const drawField = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = 'rgba(230, 218, 188, .48)';
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fill();
    });
    requestAnimationFrame(drawField);
  };

  resizeCanvas();
  drawField();
  window.addEventListener('resize', resizeCanvas);
}

const musicLabels = {
  ru: { play: 'Включить музыку Бааль Сулама', stop: 'Выключить музыку' },
  en: { play: 'Play Baal HaSulam melodies', stop: 'Stop music' },
  he: { play: 'להפעיל מניגוני בעל הסולם', stop: 'לכבות את המוזיקה' }
}[siteLanguage];
const melodies = [
  { title: 'Nigun', src: 'music/baal-hasulam-nigun.mp3' },
  { title: 'Bnei Heichala', src: 'music/baal-hasulam-bnei-heichala.mp3' },
  { title: 'Tzadik ke Tamar', src: 'music/baal-hasulam-tzadik-ke-tamar.mp3' }
];
let musicPlayer;
let melodyIndex = 0;
let soundToggle = document.getElementById('soundToggle');
if (!soundToggle) {
  soundToggle = document.createElement('button');
  soundToggle.id = 'soundToggle';
  soundToggle.className = 'sound-toggle floating';
  soundToggle.type = 'button';
  soundToggle.innerHTML = '<span></span><span></span><span></span><b></b>';
  soundToggle.setAttribute('aria-pressed', 'false');
  document.body.appendChild(soundToggle);
}
const updateMusicLabel = active => {
  const label = active ? musicLabels.stop : musicLabels.play;
  soundToggle.setAttribute('aria-label', label);
  soundToggle.title = label;
  const caption = soundToggle.querySelector('b');
  if (caption) caption.textContent = active ? `Baal HaSulam · ${melodies[melodyIndex].title}` : label;
};
updateMusicLabel(false);

soundToggle.addEventListener('click', async () => {
  const active = soundToggle.getAttribute('aria-pressed') === 'true';
  if (active) {
    musicPlayer?.pause();
    musicPlayer = null;
    soundToggle.setAttribute('aria-pressed', 'false');
    updateMusicLabel(false);
    return;
  }
  musicPlayer = new Audio(melodies[melodyIndex].src);
  musicPlayer.volume = .28;
  musicPlayer.addEventListener('ended', () => {
    melodyIndex = (melodyIndex + 1) % melodies.length;
    musicPlayer.src = melodies[melodyIndex].src;
    updateMusicLabel(true);
    musicPlayer.play().catch(() => {});
  });
  try {
    await musicPlayer.play();
    soundToggle.setAttribute('aria-pressed', 'true');
    updateMusicLabel(true);
  } catch {
    musicPlayer = null;
    soundToggle.setAttribute('aria-pressed', 'false');
    updateMusicLabel(false);
  }
});

const trackedSections = [...document.querySelectorAll('.studysection[id], .lesson[id]')];
const sideLinks = [...document.querySelectorAll('.studysidebar a[href^="#"]')];
if (trackedSections.length && sideLinks.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    sideLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-20% 0px -65% 0px' });
  trackedSections.forEach(section => sectionObserver.observe(section));
}
