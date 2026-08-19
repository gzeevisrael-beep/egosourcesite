const states = {
  distance: [
    ['Назовите правду', 'Спокойно признайте: сейчас мое желание разделяет меня с другими, и я не могу изменить его напрямую.'],
    ['Включите товарищей', 'Представьте, что каждый тоже работает со своей природой. Найдите хотя бы одно стремление товарищей, важность которого вы хотите принять.'],
    ['Соберите просьбу', 'Обратитесь к Источнику: дай нам силу поднять важность связи выше личного отдаления и построить одно общее желание.']
  ],
  conflict: [
    ['Отделите факт от личного расчета', 'Назовите то, что произошло, без обвинения. Затем увидьте внутренний расчет, который требует доказать вашу правоту.'],
    ['Поставьте связь выше победы', 'Спросите себя: какое действие сейчас сохранит направление к объединению, даже если мое мнение не принято?'],
    ['Попросите среднюю линию', 'Обратитесь к Источнику: помоги нам не использовать разногласие для разделения, а построить над ним более высокую связь.']
  ],
  emptiness: [
    ['Не убегайте от пустоты', 'Признайте отсутствие вкуса и сил, не требуя немедленного приятного наполнения.'],
    ['Возьмите важность у среды', 'Вспомните товарища, источник или момент, когда цель была живой. Пусть важность общей цели станет выше текущего ощущения.'],
    ['Просите желание', 'Обратитесь к Источнику: дай мне не приятное состояние, а недостаток к связи, просьбе и отдаче.']
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
  renderPractice();

  previousButton.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep -= 1;
      reflection.value = '';
      renderPractice();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentStep < 2) {
      currentStep += 1;
      reflection.value = '';
      renderPractice();
      return;
    }

    practiceTitle.textContent = 'Обращение собрано';
    practiceText.textContent = 'Останьтесь на несколько мгновений в общем намерении. Не измеряйте результат личным ощущением. Сохраните направление к связи.';
    practiceLabel.textContent = 'Практика завершена';
    nextButton.textContent = 'Начать заново';

    nextButton.onclick = () => {
      currentStep = 0;
      reflection.value = '';
      nextButton.onclick = null;
      renderPractice();
    };
  });
}
