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

const pageFile = window.location.pathname.split('/').pop() || 'index.html';
const documentLanguage = (document.documentElement.lang || '').toLowerCase();
const siteLanguage = pageFile === 'he.html' || documentLanguage.startsWith('he')
  ? 'he'
  : pageFile === 'en.html' || documentLanguage.startsWith('en')
    ? 'en'
    : 'ru';

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
  ru: { play: 'Включить мелодии Бааль Сулама', stop: 'Выключить музыку' },
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
const soundToggle = document.getElementById('soundToggle');

if (soundToggle) {
  const updateMusicLabel = active => {
    const label = active ? musicLabels.stop : musicLabels.play;
    soundToggle.setAttribute('aria-label', label);
    soundToggle.title = label;
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
}
