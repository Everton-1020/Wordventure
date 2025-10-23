const question = {
  question: "Um esquilo guardou 20 nozes em sua árvore. Depois, ele encontrou mais 9 nozes. Quantas nozes o esquilo tem agora?",
  image: "imgfase3/bonus.png", 
  options: ["27", "29", "30"],
  correct: "29",
  explanation: "O esquilo tinha 20 nozes e achou mais 9, (20 + 9 = 29), Agora ele tem 29 nozes!"
};

const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const answerOptions = document.getElementById("answer-options");
const explanationText = document.getElementById("explanation-text");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  questionText.textContent = question.question;
  questionImage.src = question.image;
  answerOptions.innerHTML = "";
  explanationText.style.display = "none";
  explanationText.textContent = "";
  nextBtn.style.display = "none";

  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => checkAnswer(btn, question.correct));
    answerOptions.appendChild(btn);
  });
}

function checkAnswer(button, correctAnswer) {
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === button) {
      btn.classList.add("wrong");
    }
  });

  explanationText.textContent = question.explanation;
  explanationText.style.display = "block";
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  // Leva o usuário para a fase 4 após responder a fase bônus
  window.location.href = "fase4.html";
});

// Inicializa a questão ao carregar a página
loadQuestion();
