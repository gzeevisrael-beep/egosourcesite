const header = document.querySelector('.site-header');
const progress = document.getElementById('pathProgress');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
  const path = document.querySelector('.path');
  const rect = path.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.3)));
  progress.style.width = `${ratio * 100}%`;
}, { passive: true });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  observer.observe(el);
});

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

let selectedState = 'distance';
let currentStep = 0;
const stateButtons = [...document.querySelectorAll('.state-picker button')];
const title = document.getElementById('practiceTitle');
const text = document.getElementById('practiceText');
const label = document.getElementById('practiceLabel');
const practiceProgress = document.getElementById('practiceProgress');
const reflection = document.getElementById('reflection');
const prev = document.getElementById('prevStep');
const next = document.getElementById('nextStep');

function renderPractice() {
  const [stepTitle, stepText] = states[selectedState][currentStep];
  title.textContent = stepTitle;
  text.textContent = stepText;
  label.textContent = `Шаг ${currentStep + 1} из 3`;
  practiceProgress.style.width = `${(currentStep + 1) * 33.333}%`;
  prev.disabled = currentStep === 0;
  next.textContent = currentStep === 2 ? 'Завершить' : 'Продолжить';
  reflection.placeholder = currentStep === 2 ? 'Сформулируйте общую просьбу...' : 'Запишите одну честную фразу...';
}

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

next.addEventListener('click', () => {
  if (currentStep < 2) {
    currentStep += 1;
    reflection.value = '';
    renderPractice();
  } else {
    title.textContent = 'Обращение собрано';
    text.textContent = 'Останьтесь на несколько мгновений в общем намерении. Не проверяйте результат внутри личного ощущения. Сохраните направление к связи.';
    label.textContent = 'Практика завершена';
    next.textContent = 'Начать заново';
    next.onclick = () => {
      currentStep = 0;
      reflection.value = '';
      next.onclick = null;
      renderPractice();
    };
  }
});
prev.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep -= 1;
    reflection.value = '';
    renderPractice();
  }
});

const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  particles = Array.from({ length: Math.min(55, Math.floor(window.innerWidth / 24)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - .5) * .12,
    vy: (Math.random() - .5) * .12,
    r: Math.random() * 1.4 + .3
  }));
}
function drawField() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = 'rgba(230, 218, 188, .48)';
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
  });
  requestAnimationFrame(drawField);
}
resizeCanvas(); drawField();
window.addEventListener('resize', resizeCanvas);

let audioContext;
let oscillator;
let gain;
const soundToggle = document.getElementById('soundToggle');
soundToggle.addEventListener('click', async () => {
  const active = soundToggle.getAttribute('aria-pressed') === 'true';
  if (active) {
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + .4);
    setTimeout(() => oscillator?.stop(), 450);
    soundToggle.setAttribute('aria-pressed', 'false');
    return;
  }
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = audioContext.createOscillator();
  gain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = 174;
  gain.gain.value = 0.0001;
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(0.025, audioContext.currentTime + 1.2);
  soundToggle.setAttribute('aria-pressed', 'true');
});
