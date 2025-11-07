// 🧩 Lista de questões da Fase 2
const questions = [
  { image: "imgfase2/imageaviao.jpg", answer: "A", options: ["A", "B", "C"] },
  { image: "imgfase2/imagebalao.jpg", answer: "B", options: ["D", "B", "F"] },
  { image: "imgfase2/imagebola.jpg", answer: "B", options: ["Y", "E", "B"] },
  { image: "imgfase2/imagecaixa.jpg", answer: "C", options: ["K", "C", "X"] },
  { image: "imgfase2/imagepeixe.jpg", answer: "P", options: ["P", "J", "G"] },
  { image: "imgfase2/imageurso.jpg", answer: "U", options: ["A", "O", "U"] }
];

// Variáveis de controle
let score = 0;
let correctCount = 0;

// Elementos da interface
const grid = document.getElementById("image-grid");
const scoreDisplay = document.getElementById("score");
const nextPhaseButton = document.getElementById("next-phase-button");
const backPhaseButton = document.getElementById("back-phase-button");
const btnLer = document.getElementById("ler-enunciado");

// Sons do jogo
const somAcerto = new Audio("sons/acerto.mp3");
const somErro = new Audio("sons/erro.mp3");
const somVitoria = new Audio("sons/vitoria.mp3");
const somEstrela = new Audio("sons/estrela.mp3");

// Leitura do enunciado (botão de fala)
btnLer.addEventListener("click", () => {
  const fala = new SpeechSynthesisUtterance("Com qual letra começa o nome deste objeto ou animal?");
  fala.lang = "pt-BR";
  fala.rate = 1;
  fala.pitch = 1;
  window.speechSynthesis.speak(fala);
});

// Função para criar um card com imagem e opções
function createCard(question, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = question.image;
  img.alt = `Imagem ${index + 1}`;

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  const feedbackDiv = document.createElement("p");
  feedbackDiv.classList.add("feedback");
  feedbackDiv.style.marginTop = "10px";
  feedbackDiv.style.fontSize = "16px";
  feedbackDiv.style.color = "#444";

  question.options.forEach(letter => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = letter;

    btn.addEventListener("click", () => {
      if (btn.disabled) return;

      feedbackDiv.classList.remove("correct", "wrong");

      if (btn.textContent === question.answer) {
        btn.classList.add("correct");
        feedbackDiv.textContent = "Acertou!";
        feedbackDiv.classList.add("correct");
        somAcerto.play();
        score++;
        correctCount++;

        // Desabilita todos os botões dessa questão
        const allButtons = optionsDiv.querySelectorAll(".option");
        allButtons.forEach(b => (b.disabled = true));

        checkIfAllCorrect();
      } else {
        btn.classList.add("wrong");
        feedbackDiv.textContent = "Errado! Tente novamente.";
        feedbackDiv.classList.add("wrong");
        somErro.play();
        btn.disabled = true;
      }
    });

    optionsDiv.appendChild(btn);
  });

  card.appendChild(img);
  card.appendChild(optionsDiv);
  card.appendChild(feedbackDiv);
  grid.appendChild(card);
}

// Verifica se todas as respostas estão corretas
function checkIfAllCorrect() {
  if (correctCount === questions.length) {
    scoreDisplay.classList.remove("hidden");
    scoreDisplay.innerHTML = `
      <strong>Parabéns! Você acertou todas as palavras!</strong><br>
      Total de acertos: ${score} de ${questions.length}
    `;
    somVitoria.play();
    nextPhaseButton.classList.remove("hidden");
  }
}

// ▶ Navegação entre fases
nextPhaseButton.addEventListener("click", () => {
  window.location.href = "fase3.html"; // Próxima fase
});

backPhaseButton.addEventListener("click", () => {
  window.location.href = "fase1.html"; // Voltar à Fase 1
});

// Inicializa o jogo
function loadAllCards() {
  questions.forEach((q, idx) => createCard(q, idx));
}
loadAllCards();

// Efeito visual de estrelas no logo
const logo = document.getElementById("logo-cruzeiro");
const starsContainer = document.getElementById("stars-container");

logo.addEventListener("click", () => {
  somEstrela.currentTime = 0; // reinicia o som se clicar várias vezes
  somEstrela.play();          // toca o som da estrela
  createFireworkStars(20);    // cria as partículas visuais
});

function createFireworkStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.left = `${logo.offsetLeft + logo.clientWidth / 2}px`;
    star.style.top = `${logo.offsetTop + logo.clientHeight / 2}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 150;
    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";

    star.style.setProperty("--x", x);
    star.style.setProperty("--y", y);

    starsContainer.appendChild(star);
    star.addEventListener("animationend", () => star.remove());
  }
}
