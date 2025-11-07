const questions = [
  {
    question: "João tem 5 maçãs e ganha mais 3 de um amigo. Quantas maçãs ele tem agora?",
    image: "imgfase3/historia1.png",
    options: ["7", "8", "9"],
    correct: "8",
    explanation: "João tinha 5 maçãs e ganhou mais 3. 5 + 3 = 8."
  },
  {
    question: "Maria tem R$ 20,00. Ela compra um lanche por R$ 7,00. Quanto sobra?",
    image: "imgfase3/historia2.png",
    options: ["13", "12", "14"],
    correct: "13",
    explanation: "Maria começou com R$ 20,00 e gastou R$ 7,00. 20 - 7 = 13."
  },
  {
    question: "Ana tem 10 balas. Ela dá 2 balas para cada um de seus 3 amigos. Com quantas balas ela fica?",
    image: "imgfase3/historia3.png",
    options: ["8", "6", "4"],
    correct: "4",
    explanation: "Ana deu 2 balas para cada um dos 3 amigos: 2 + 2 + 2 = 6. Ela começou com 10. 10 - 6 = 4."
  }
];

let currentQuestion = 0;
let score = 0;

// Elementos principais
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const answerOptions = document.getElementById("answer-options");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");
const lerBtn = document.getElementById("ler-btn");
const voltarBtn = document.getElementById("voltar-btn");

// Áudios (pasta sons)
const acertoSound = new Audio("sons/acerto.mp3");
const erroSound = new Audio("sons/erro.mp3");
const vitoriaSound = new Audio("sons/vitoria.mp3");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  questionImage.src = q.image;
  answerOptions.innerHTML = "";
  nextBtn.style.display = "none";

  const explanationText = document.getElementById("explanation-text");
  explanationText.style.display = "none";
  explanationText.textContent = "";

  nextBtn.textContent = (currentQuestion === questions.length - 1) ? "Finalizar" : "Próxima";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => checkAnswer(btn, q.correct));
    answerOptions.appendChild(btn);
  });
}

function checkAnswer(button, correctAnswer) {
  const buttons = document.querySelectorAll(".answer-btn");
  const explanationText = document.getElementById("explanation-text");
  const current = questions[currentQuestion];

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === button) {
      btn.classList.add("wrong");
    }
  });

  if (button.textContent === correctAnswer) {
    score++;
    acertoSound.play();
  } else {
    erroSound.play();
  }

  explanationText.textContent = current.explanation;
  explanationText.style.display = "block";
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    nextBtn.style.display = "none";
    showResult();
  }
});

function showResult() {
  document.getElementById("explanation-text").textContent = "";
  resultContainer.style.display = "block";
  scoreDisplay.textContent = score;
  totalDisplay.textContent = questions.length;

  const bonusBtn = document.getElementById("bonus-btn");
  const nextPhaseBtn = document.getElementById("next-phase-btn");

  if (score === questions.length) {
    bonusBtn.style.display = "inline-block";
    nextPhaseBtn.style.display = "none";
    vitoriaSound.play();
    alert("Parabéns! Você acertou todas e desbloqueou a Fase Bônus!");
  } else {
    bonusBtn.style.display = "none";
    nextPhaseBtn.style.display = "inline-block";
  }
}

// Leitura da pergunta
lerBtn.addEventListener("click", () => {
  const fala = new SpeechSynthesisUtterance(questionText.textContent);
  fala.lang = "pt-BR";
  fala.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(fala);
});

// Voltar
voltarBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "fase2.html";
  }, 1500);
});

loadQuestion();
