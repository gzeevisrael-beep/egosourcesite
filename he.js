const states = {
  distance: [
    ["להכיר באמת", "להכיר בשקט שהרצון לקבל מושל בי כעת ומרחיק אותי מן החיבור, ושאין בידי לשנותו ישירות."],
    ["להיכלל בחברים", "לזכור שגם החברים נאבקים בטבעם. למצוא לפחות שאיפה אחת שלהם שאני רוצה לתמוך בה."],
    ["לבנות בקשה", "לפנות אל המקור: תן לנו כוח להעלות את חשיבות החיבור מעל ההתרחקות האישית ולהרגיש רצון משותף אחד."]
  ],
  conflict: [
    ["להפריד בין העובדה לאגו", "לתאר את מה שקרה ללא האשמה, ולהכיר בחשבון הפנימי שרוצה להוכיח שאני צודק."],
    ["להעמיד את החיבור מעל הניצחון", "לשאול: איזו פעולה תשמור עכשיו על הכיוון לחיבור, גם כאשר דעתי אינה מתקבלת?"],
    ["לבקש צורה חדשה", "לפנות אל המקור: עזור לנו להשתמש במחלוקת לא לפירוד, אלא לבניית קשר גבוה יותר."]
  ],
  emptiness: [
    ["לא לברוח מן הריקנות", "להכיר בכך שאין כרגע טעם וכוחות, בלי לדרוש מיד מילוי נעים."],
    ["לקבל חשיבות מן הסביבה", "להיזכר בחבר, במקור או ברגע שבו המטרה הייתה חיה, ולתת למטרה המשותפת לדבר במקום ההרגשה הנוכחית."],
    ["לבקש רצון", "לפנות אל המקור: תן לי לא מילוי, אלא חיסרון לחיבור, לתפילה ולהשפעה."]
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
  label.textContent = `בירור ${currentStep + 1} מתוך 3`;
  progress.style.width = `${(currentStep + 1) * 33.333}%`;
  prev.disabled = currentStep === 0;
  next.textContent = currentStep === 2 ? "סיום" : "המשך";
  reflection.placeholder =
    currentStep === 2
      ? "נסחו בקשה משותפת..."
      : "כתבו משפט כן אחד...";
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

buttons[0].classList.add("active");

next.addEventListener("click", () => {
  if (currentStep < 2) {
    currentStep++;
    reflection.value = "";
    renderPractice();
  } else {
    title.textContent = "הבקשה נבנתה";
    text.textContent =
      "הישארו כמה רגעים בכוונה המשותפת. אל תבדקו את התוצאה בתוך ההרגשה האישית, אלא שמרו על הכיוון לחיבור.";
    label.textContent = "העבודה הושלמה";
    next.textContent = "להתחיל מחדש";

    next.onclick = () => {
      currentStep = 0;
      next.onclick = null;
      renderPractice();
    };
  }
});

prev.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    reflection.value = "";
    renderPractice();
  }
});
