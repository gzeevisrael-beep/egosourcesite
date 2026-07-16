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
if (nav && !nav.querySelector('a[href="pticha.html"]') && !document.body.classList.contains('ptichapage')) {
  const link = document.createElement('a');
  link.href = 'pticha.html';
  link.textContent = 'Птиха';
  link.style.display = 'inline-flex';
  const languageLink = nav.querySelector('a[href="index.html"]');
  nav.insertBefore(link, languageLink || null);
}

const sourceList = document.querySelector('.source-list');
if (sourceList && !sourceList.querySelector('[data-pticha-card]')) {
  const card = document.createElement('article');
  card.className = 'source-item reveal visible';
  card.dataset.ptichaCard = 'true';
  card.innerHTML = `
    <span>Бааль Сулам</span>
    <h3>Птиха понятным языком</h3>
    <p>Восемь последовательных уроков с пояснениями, картой процесса и вопросами для повторения.</p>
    <a class="button ghost" href="pticha.html">Открыть учебный конспект</a>
  `;
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

let audioContext;
let oscillator;
let gain;
const soundToggle = document.getElementById('soundToggle');

soundToggle?.addEventListener('click', async () => {
  const active = soundToggle.getAttribute('aria-pressed') === 'true';
  if (active) {
    gain?.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + .4);
    setTimeout(() => oscillator?.stop(), 450);
    soundToggle.setAttribute('aria-pressed', 'false');
    return;
  }

  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = audioContext.createOscillator();
  gain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = 174;
  gain.gain.value = .0001;
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(.025, audioContext.currentTime + 1.2);
  soundToggle.setAttribute('aria-pressed', 'true');
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
