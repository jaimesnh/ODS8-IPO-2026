const state = {
  xpCurrent: 750,
  xpTotal: 1000,
  answer: null,
  locale: "es",
  bonusClaimed: false,
  quizIndex: 0,
  answeredByLocale: {},
};

const i18n = {
  es: {
    "header.subtitle": "Retos",
    "header.title": "Nivel 12",
    "header.status": "Defensor Pro",
    "hero.badge": "Reto semanal",
    "hero.title": "Green CEO",
    "hero.description":
      "Equilibra beneficio y planeta en este simulador inmersivo.",
    "hero.cta": "Jugar ahora",
    "progress.label": "Tu progreso",
    "progress.bonus": "+250 XP para Oro",
    "progress.bonusClaimed": "XP añadida",
    "trivia.eyebrow": "Hora de trivia",
    "trivia.title": "Leyes laborales",
    "trivia.viewAll": "Ver todo",
    "trivia.question":
      "¿Cuál es el máximo legal de horas semanales sin horas extra?",
    "trivia.swipe": "Desliza para la siguiente pregunta",
    "trivia.counter": "Pregunta {current}/{total}",
    "trivia.correct": "Correcto. +{xp} XP",
    "trivia.incorrect": "Respuesta incorrecta. Prueba otra.",
    "trivia.reveal": "La respuesta correcta es: {answer}.",
    "trivia.locked": "Ya respondiste esta pregunta.",
    "quickwins.title": "Logros rápidos",
    "quickwins.item1.title": "Corre la voz",
    "quickwins.item1.subtitle": "Comparte tu puntuación de impacto",
    "quickwins.item2.title": "Check-in diario",
    "quickwins.item2.subtitle": "Completado hoy",
    "quickwins.claimed": "Reclamado",
    "nav.home": "Inicio",
    "nav.action": "Acción",
    "nav.challenges": "Retos",
    "nav.profile": "Perfil",
    "toast.correct": "Correcto. +50 XP",
    "toast.incorrect": "Respuesta incorrecta. Prueba otra.",
    "toast.xp": "XP añadida",
  },
  en: {
    "header.subtitle": "Challenges",
    "header.title": "Level 12",
    "header.status": "Pro Advocate",
    "hero.badge": "Weekly Challenge",
    "hero.title": "Green CEO",
    "hero.description":
      "Balance profit & planet in this immersive decision simulator.",
    "hero.cta": "Play Now",
    "progress.label": "Your progress",
    "progress.bonus": "+250 XP to Gold",
    "progress.bonusClaimed": "XP added",
    "trivia.eyebrow": "Trivia Time",
    "trivia.title": "Labor Laws",
    "trivia.viewAll": "View All",
    "trivia.question":
      "What is the maximum legal working hours per week without overtime?",
    "trivia.swipe": "Swipe for next question",
    "trivia.counter": "Question {current}/{total}",
    "trivia.correct": "Correct. +{xp} XP",
    "trivia.incorrect": "Incorrect answer. Try another.",
    "trivia.reveal": "The correct answer is: {answer}.",
    "trivia.locked": "You already answered this question.",
    "quickwins.title": "Quick Wins",
    "quickwins.item1.title": "Spread the word",
    "quickwins.item1.subtitle": "Share your impact score",
    "quickwins.item2.title": "Daily sign-in",
    "quickwins.item2.subtitle": "Completed today",
    "quickwins.claimed": "Claimed",
    "nav.home": "Home",
    "nav.action": "Action",
    "nav.challenges": "Challenges",
    "nav.profile": "Profile",
    "toast.correct": "Correct. +50 XP",
    "toast.incorrect": "Incorrect answer. Try another.",
    "toast.xp": "XP added",
  },
};

const quizData = {
  es: [
    {
      question: "¿Cuál es el máximo legal de horas semanales sin horas extra?",
      options: ["35", "40", "48"],
      suffix: "Horas",
      correctIndex: 1,
      xp: 50,
    },
    {
      question: "¿Qué norma regula los derechos laborales en España?",
      options: ["Estatuto de los Trabajadores", "Código Penal", "Constitución"],
      suffix: "",
      correctIndex: 0,
      xp: 50,
    },
    {
      question: "¿Qué significa un contrato indefinido?",
      options: ["Sin fecha de fin", "Solo 3 meses", "Trabajo temporal"],
      suffix: "",
      correctIndex: 0,
      xp: 50,
    },
    {
      question: "¿Cuántas horas de descanso mínimo hay entre jornadas?",
      options: ["8", "12", "16"],
      suffix: "Horas",
      correctIndex: 1,
      xp: 50,
    },
  ],
  en: [
    {
      question: "What is the maximum legal working hours per week without overtime?",
      options: ["35", "40", "48"],
      suffix: "Hours",
      correctIndex: 1,
      xp: 50,
    },
    {
      question: "Which statute sets core labor rights in Spain?",
      options: ["Workers Statute", "Criminal Code", "Constitution"],
      suffix: "",
      correctIndex: 0,
      xp: 50,
    },
    {
      question: "What does an open-ended contract mean?",
      options: ["No end date", "Only 3 months", "Temporary work"],
      suffix: "",
      correctIndex: 0,
      xp: 50,
    },
    {
      question: "Minimum rest time between workdays?",
      options: ["8", "12", "16"],
      suffix: "Hours",
      correctIndex: 1,
      xp: 50,
    },
  ],
};

const xpCurrentEl = document.getElementById("xp-current");
const xpTotalEl = document.getElementById("xp-total");
const progressFill = document.getElementById("progress-fill");
const progressTrack = document.querySelector(".progress-track");
const answers = document.querySelectorAll(".answer");
const hint = document.getElementById("answer-hint");
const toast = document.getElementById("toast");
const playButton = document.getElementById("play-now");
const bonusButton = document.getElementById("bonus-xp");
const xpButtons = document.querySelectorAll(".quickwin-xp[data-xp]");
const questionTitle = document.getElementById("question-title");
const quizCounter = document.getElementById("quiz-counter");
const nextQuestionButton = document.getElementById("next-question");
const quizCard = document.querySelector(".quiz");
const weeklyModal = document.getElementById("weekly-modal");
const modalCloseButtons = document.querySelectorAll("[data-close='true']");
const meterPlanet = document.getElementById("meter-planet");
const meterPeople = document.getElementById("meter-people");
const meterProfit = document.getElementById("meter-profit");
const meterPlanetValue = document.getElementById("meter-planet-value");
const meterPeopleValue = document.getElementById("meter-people-value");
const meterProfitValue = document.getElementById("meter-profit-value");
const simStep = document.getElementById("sim-step");
const simCounter = document.getElementById("sim-counter");
const simQuestion = document.getElementById("sim-question");
const simActions = document.getElementById("sim-actions");
const simResult = document.getElementById("sim-result");
const simSummary = document.getElementById("sim-summary");
const simClaim = document.getElementById("sim-claim");
const simReset = document.getElementById("sim-reset");

function setLocale(locale) {
  state.locale = i18n[locale] ? locale : "es";
  document.documentElement.lang = state.locale;
  const dictionary = i18n[state.locale];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dictionary[key]) {
      el.textContent = dictionary[key];
    }
  });

  renderQuestion();
}

function updateProgress() {
  xpCurrentEl.textContent = state.xpCurrent;
  xpTotalEl.textContent = state.xpTotal;
  const percentage = Math.min((state.xpCurrent / state.xpTotal) * 100, 100);
  progressFill.style.width = `${percentage}%`;
  progressTrack.setAttribute("aria-valuenow", `${state.xpCurrent}`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

const weeklySteps = [
  {
    question: "Cambias a proveedores con menor huella ambiental.",
    options: [
      {
        label: "Mantener el cambio",
        impact: { planet: 20, people: 10, profit: -15 },
      },
      {
        label: "Volver al proveedor anterior",
        impact: { planet: -18, people: -12, profit: 16 },
      },
    ],
  },
  {
    question: "Subes salarios por encima del minimo legal.",
    options: [
      {
        label: "Aplicar subida gradual",
        impact: { planet: 0, people: 18, profit: -12 },
      },
      {
        label: "Mantener salarios actuales",
        impact: { planet: 0, people: -16, profit: 12 },
      },
    ],
  },
  {
    question: "Inviertes en tecnologia eficiente y formacion interna.",
    options: [
      {
        label: "Invertir ahora",
        impact: { planet: 16, people: 10, profit: -10 },
      },
      {
        label: "Aplazar la inversion",
        impact: { planet: -12, people: -8, profit: 12 },
      },
    ],
  },
  {
    question: "Implementas una jornada mas flexible para conciliacion.",
    options: [
      {
        label: "Aplicar horario flexible",
        impact: { planet: 6, people: 16, profit: -8 },
      },
      {
        label: "Mantener horario rigido",
        impact: { planet: -4, people: -14, profit: 10 },
      },
    ],
  },
  {
    question: "Refuerzas auditorias de proveedores externos.",
    options: [
      {
        label: "Auditar de forma trimestral",
        impact: { planet: 14, people: 14, profit: -10 },
      },
      {
        label: "Auditar solo en incidentes",
        impact: { planet: -12, people: -12, profit: 10 },
      },
    ],
  },
];

const weeklyState = {
  stepIndex: 0,
  planet: 50,
  people: 50,
  profit: 50,
  completed: false,
};

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function updateMeters() {
  meterPlanet.style.width = `${weeklyState.planet}%`;
  meterPeople.style.width = `${weeklyState.people}%`;
  meterProfit.style.width = `${weeklyState.profit}%`;
  meterPlanetValue.textContent = `${weeklyState.planet}%`;
  meterPeopleValue.textContent = `${weeklyState.people}%`;
  meterProfitValue.textContent = `${weeklyState.profit}%`;
}

function setWeeklyCompletion() {
  weeklyState.completed = true;
  const now = new Date().toISOString();
  localStorage.setItem("weeklyChallengeCompletedAt", now);
}

function resetWeeklyCompletion() {
  weeklyState.completed = false;
  localStorage.removeItem("weeklyChallengeCompletedAt");
  updateWeeklyCtaState();
}

function isWeeklyLocked() {
  const stored = localStorage.getItem("weeklyChallengeCompletedAt");
  if (!stored) {
    return false;
  }
  const last = new Date(stored).getTime();
  const diffDays = (Date.now() - last) / (1000 * 60 * 60 * 24);
  return diffDays < 7;
}

function renderWeeklyStep() {
  updateMeters();
  if (weeklyState.completed || isWeeklyLocked()) {
    simStep.hidden = true;
    simResult.hidden = false;
    simSummary.textContent =
      "Has completado el reto semanal. Vuelve la proxima semana para un nuevo desafio.";
    simClaim.hidden = true;
    updateWeeklyCtaState();
    return;
  }

  const current = weeklySteps[weeklyState.stepIndex];
  if (!current) {
    simStep.hidden = true;
    simResult.hidden = false;
    simSummary.textContent =
      "Has completado el reto semanal. Vuelve la proxima semana para un nuevo desafio.";
    simClaim.hidden = true;
    updateWeeklyCtaState();
    return;
  }

  simCounter.textContent = `Decision ${weeklyState.stepIndex + 1} de ${weeklySteps.length}`;
  simQuestion.textContent = current.question;
  simActions.innerHTML = "";
  current.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "step-choice";
    button.textContent = option.label;
    button.addEventListener("click", () => {
      weeklyState.planet = clamp(weeklyState.planet + option.impact.planet);
      weeklyState.people = clamp(weeklyState.people + option.impact.people);
      weeklyState.profit = clamp(weeklyState.profit + option.impact.profit);
      weeklyState.stepIndex += 1;

      if (weeklyState.stepIndex >= weeklySteps.length) {
        simStep.hidden = true;
        simResult.hidden = false;
        simSummary.textContent =
          "Has equilibrado los tres pilares con decisiones responsables.";
      } else {
        renderWeeklyStep();
      }
    });
    simActions.appendChild(button);
  });
}

function updateWeeklyCtaState() {
  const locked = isWeeklyLocked();
  if (locked) {
    playButton.querySelector("span:last-child").textContent = "Reto completado";
  } else {
    playButton.querySelector("span:last-child").textContent =
      i18n[state.locale]["hero.cta"];
  }
}

function openWeeklyModal() {
  weeklyModal.hidden = false;
  weeklyState.stepIndex = 0;
  weeklyState.planet = 50;
  weeklyState.people = 50;
  weeklyState.profit = 50;
  simStep.hidden = false;
  simResult.hidden = true;
  simClaim.hidden = false;
  if (isWeeklyLocked()) {
    simStep.hidden = true;
    simResult.hidden = false;
    simSummary.textContent =
      "Has completado el reto semanal. Puedes reiniciarlo para seguir testeando.";
    simClaim.hidden = true;
    updateWeeklyCtaState();
    return;
  }
  renderWeeklyStep();
}

function closeWeeklyModal() {
  weeklyModal.hidden = true;
}

function getCurrentQuizSet() {
  return quizData[state.locale] || quizData.es;
}

function getAnsweredMap() {
  if (!state.answeredByLocale[state.locale]) {
    state.answeredByLocale[state.locale] = {};
  }
  return state.answeredByLocale[state.locale];
}

function renderQuestion() {
  const quizSet = getCurrentQuizSet();
  const question = quizSet[state.quizIndex];
  if (!question) {
    return;
  }

  const answeredMap = getAnsweredMap();
  const isLocked = Boolean(answeredMap[state.quizIndex]);

  questionTitle.textContent = question.question;
  const counterTemplate = i18n[state.locale]["trivia.counter"];
  quizCounter.textContent = counterTemplate
    .replace("{current}", state.quizIndex + 1)
    .replace("{total}", quizSet.length);

  answers.forEach((answerEl, index) => {
    const optionText = question.options[index] || "";
    const suffixText = question.suffix || "";
    const spans = answerEl.querySelectorAll("span");
    if (spans[0]) {
      spans[0].textContent = optionText;
    }
    if (spans[1]) {
      spans[1].textContent = suffixText;
      spans[1].style.visibility = suffixText ? "visible" : "hidden";
    }
    answerEl.setAttribute("aria-checked", "false");
    answerEl.dataset.answer = `${index}`;
    answerEl.disabled = isLocked;
  });

  hint.textContent = isLocked ? i18n[state.locale]["trivia.locked"] : "";
}

function changeQuestion(direction) {
  const quizSet = getCurrentQuizSet();
  const total = quizSet.length;
  const nextIndex = (state.quizIndex + direction + total) % total;
  state.quizIndex = nextIndex;
  renderQuestion();
}

function handleAnswerClick(event) {
  const button = event.currentTarget;
  const value = Number.parseInt(button.dataset.answer, 10);
  const quizSet = getCurrentQuizSet();
  const question = quizSet[state.quizIndex];
  const answeredMap = getAnsweredMap();

  if (answeredMap[state.quizIndex]) {
    hint.textContent = i18n[state.locale]["trivia.locked"];
    showToast(i18n[state.locale]["trivia.locked"]);
    return;
  }

  answers.forEach((item) => {
    item.setAttribute("aria-checked", "false");
  });
  button.setAttribute("aria-checked", "true");
  state.answer = value;

  if (!question) {
    return;
  }

  if (value === question.correctIndex) {
    const xpGain = question.xp || 0;
    state.xpCurrent = Math.min(state.xpCurrent + xpGain, state.xpTotal);
    const correctMessage = i18n[state.locale]["trivia.correct"].replace(
      "{xp}",
      `${xpGain}`
    );
    hint.textContent = correctMessage;
    showToast(correctMessage);
    updateProgress();
    answeredMap[state.quizIndex] = true;
    renderQuestion();
    clearTimeout(handleAnswerClick.advanceId);
    handleAnswerClick.advanceId = setTimeout(() => {
      changeQuestion(1);
    }, 900);
  } else {
    const incorrectMessage = i18n[state.locale]["trivia.incorrect"];
    const revealMessage = i18n[state.locale]["trivia.reveal"].replace(
      "{answer}",
      question.options[question.correctIndex]
    );
    hint.textContent = `${incorrectMessage} ${revealMessage}`;
    showToast(incorrectMessage);
    answeredMap[state.quizIndex] = true;
    renderQuestion();
  }
}

answers.forEach((answer) => {
  answer.addEventListener("click", handleAnswerClick);
});

playButton.addEventListener("click", () => {
  openWeeklyModal();
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeWeeklyModal();
  });
});

weeklyModal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeWeeklyModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !weeklyModal.hidden) {
    closeWeeklyModal();
  }
});

simClaim.addEventListener("click", () => {
  if (weeklyState.completed || isWeeklyLocked()) {
    closeWeeklyModal();
    return;
  }
  weeklyState.completed = true;
  state.xpCurrent = Math.min(state.xpCurrent + 100, state.xpTotal);
  updateProgress();
  setWeeklyCompletion();
  simClaim.hidden = true;
  updateWeeklyCtaState();
  showToast("Reto semanal completado. +100 XP");
});

simReset.addEventListener("click", () => {
  resetWeeklyCompletion();
  openWeeklyModal();
});

nextQuestionButton.addEventListener("click", () => {
  changeQuestion(1);
});

let swipeStartX = null;
quizCard.addEventListener("pointerdown", (event) => {
  swipeStartX = event.clientX;
});

quizCard.addEventListener("pointerup", (event) => {
  if (swipeStartX === null) {
    return;
  }
  const deltaX = event.clientX - swipeStartX;
  swipeStartX = null;
  if (Math.abs(deltaX) < 40) {
    return;
  }
  if (deltaX < 0) {
    changeQuestion(1);
  } else {
    changeQuestion(-1);
  }
});

bonusButton.addEventListener("click", () => {
  if (state.bonusClaimed) {
    return;
  }

  state.bonusClaimed = true;
  state.xpCurrent = Math.min(state.xpCurrent + 250, state.xpTotal);
  bonusButton.setAttribute("aria-pressed", "true");
  bonusButton.querySelector("span").textContent =
    i18n[state.locale]["progress.bonusClaimed"];
  updateProgress();
  showToast(i18n[state.locale]["progress.bonusClaimed"]);
});

xpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.getAttribute("aria-disabled") === "true") {
      return;
    }

    const xpValue = Number.parseInt(button.dataset.xp, 10) || 0;
    if (xpValue > 0) {
      state.xpCurrent = Math.min(state.xpCurrent + xpValue, state.xpTotal);
      updateProgress();
      showToast(i18n[state.locale]["toast.xp"]);
    }

    button.classList.add("muted");
    button.setAttribute("aria-disabled", "true");
    button.textContent = i18n[state.locale]["quickwins.claimed"];
  });
});

setLocale(state.locale);
updateProgress();
renderQuestion();
updateWeeklyCtaState();

window.setLocale = setLocale;
