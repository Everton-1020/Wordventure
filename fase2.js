const questions = [
  { image: "imgfase2/imageaviao.jpg", answer: "A", options: ["A", "B", "C"] },
  { image: "imgfase2/imagebalao.jpg", answer: "B", options: ["D", "B", "F"] },
  { image: "imgfase2/imagebola.jpg", answer: "B", options: ["Y", "E", "B"] },
  { image: "imgfase2/imagecaixa.jpg", answer: "C", options: ["K", "C", "X"] },
  { image: "imgfase2/imagepeixe.jpg", answer: "P", options: ["P", "J", "G"] },
  { image: "imgfase2/imageurso.jpg", answer: "U", options: ["A", "O", "U"] }
];

let score = 0;
let correctCount = 0;

const grid = document.getElementById("image-grid");
const scoreDisplay = document.getElementById("score");
const nextPhaseButton = document.getElementById("next-phase-button");

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
        score++;
        correctCount++;

        const allButtons = optionsDiv.querySelectorAll(".option");
        allButtons.forEach(b => b.disabled = true);

        checkIfAllCorrect();
      } else {
        btn.classList.add("wrong");
        feedbackDiv.textContent = "Errado! A letra está incorreta. Tente novamente.";
        feedbackDiv.classList.add("wrong");
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

function checkIfAllCorrect() {
  if (correctCount === questions.length) {
    scoreDisplay.classList.remove("hidden");
    scoreDisplay.innerHTML = `<strong>Você acertou todas as palavras!</strong><br>Total de acertos: ${score} de ${questions.length}`;

    nextPhaseButton.classList.remove("hidden");
  }
}

nextPhaseButton.addEventListener("click", () => {
  // Redirecionar para a próxima fase - ajuste o caminho conforme necessário
  window.location.href = "fase3.html";
});

function loadAllCards() {
  questions.forEach((q, idx) => createCard(q, idx));
}

loadAllCards();

const logo = document.getElementById("logo-cruzeiro");
const starsContainer = document.getElementById("stars-container");

logo.addEventListener("click", () => {
  createFireworkStars(20); // Aumentei para 20 estrelas para parecer mais fogos
});

function createFireworkStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Posiciona no centro da logo (ajuste se necessário)
    star.style.left = `${logo.offsetLeft + logo.clientWidth / 2}px`;
    star.style.top = `${logo.offsetTop + logo.clientHeight / 2}px`;

    // Ângulo aleatório
    const angle = Math.random() * Math.PI * 2;

    // Distância aleatória (ex: entre 150px e 300px)
    const distance = 150 + Math.random() * 150;

    // Direções X e Y
    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";

    // Definimos como variáveis CSS
    star.style.setProperty("--x", x);
    star.style.setProperty("--y", y);

    // Adiciona ao container
    starsContainer.appendChild(star);

    // Remove do DOM após animação
    star.addEventListener("animationend", () => {
      star.remove();
    });
  }
}


