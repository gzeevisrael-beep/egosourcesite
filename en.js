document.addEventListener("DOMContentLoaded", () => {
  const states = {
    distance: [
      ["Name the truth", "Quietly acknowledge that the will to receive is ruling me now and distancing me from connection, and that I cannot change it directly."],
      ["Include the friends", "Remember that the friends are also struggling with their nature. Find at least one aspiration in them that you want to support."],
      ["Build a request", "Turn to the Source: Give us the strength to raise the importance of connection above personal distance and to feel one common desire."]
    ],
    conflict: [
      ["Separate the fact from the ego", "Describe what happened without blame, and recognize the inner calculation that demands that I prove I am right."],
      ["Place connection above victory", "Ask: What action can preserve our direction toward connection now, even when my opinion is not accepted?"],
      ["Ask for a new form", "Turn to the Source: Help us use the disagreement not for separation, but for building a higher connection."]
    ],
    emptiness: [
      ["Do not run from the emptiness", "Acknowledge that there is no taste or strength now, without demanding immediate pleasant fulfillment."],
      ["Receive importance from the environment", "Recall a friend, a source, or a moment when the goal felt alive, and let the common goal speak instead of the present feeling."],
      ["Ask for a desire", "Turn to the Source: Give me not fulfillment, but a lack for connection, prayer, and bestowal."]
    ]
  };

  let selectedState = "distance";
  let currentStep = 0;
  const buttons = [...document.querySelectorAll(".state-picker button")];
  const title = document.getElementById("practiceTitle");
  const text = document.getElementById("practiceText");
  const label = document.getElementById("practiceLabel");
  const progress = document.getElementById("practiceProgress");
  const reflection = document.getElementById("reflection");
  const prev = document.getElementById("prevStep");
  const next = document.getElementById("nextStep");

  function renderPractice() {
    const [stepTitle, stepText] = states[selectedState][currentStep];
    title.textContent = stepTitle;
    text.textContent = stepText;
    label.textContent = `Clarification ${currentStep + 1} of 3`;
    progress.style.width = `${(currentStep + 1) * 33.333}%`;
    prev.disabled = currentStep === 0;
    next.textContent = currentStep === 2 ? "Finish" : "Continue";
    reflection.placeholder = currentStep === 2 ? "Formulate a common request..." : "Write one honest sentence...";
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      selectedState = button.dataset.state;
      currentStep = 0;
      reflection.value = "";
      renderPractice();
    });
  });

  prev.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep -= 1;
      reflection.value = "";
      renderPractice();
    }
  });

  next.addEventListener("click", () => {
    if (currentStep < 2) {
      currentStep += 1;
      reflection.value = "";
      renderPractice();
      return;
    }
    title.textContent = "The request has been formed";
    text.textContent = "Remain for a few moments in the common intention. Do not measure the result inside the personal feeling; preserve the direction toward connection.";
    label.textContent = "Practice completed";
    next.textContent = "Start again";
    next.onclick = () => {
      currentStep = 0;
      reflection.value = "";
      next.onclick = null;
      renderPractice();
    };
  });

  if (buttons.length) {
    buttons[0].classList.add("active");
    renderPractice();
  }
});
