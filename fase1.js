const validWords = ["PATO", "GATO", "SAPO", "VACA"];

let selectedElements = [];
let selectedParts = [];
let selectedWords = [];
let matchedWords = [];

// Sons
const somAcerto = new Audio("sons/acerto.mp3");
const somErro = new Audio("sons/erro.mp3");
const somVitoria = new Audio("sons/vitoria.mp3"); // 🔊 novo som de vitória

function lerEnunciado() {
  const enunciadoEl = document.getElementById("enunciado");
  if (!enunciadoEl) return;

  const texto = enunciadoEl.textContent.replace("🔊", "").trim();
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 1;
  fala.pitch = 1;

  const vozes = window.speechSynthesis.getVoices();
  const vozPt = vozes.find(v => v.lang.startsWith("pt")) || vozes[0];
  fala.voice = vozPt;
  window.speechSynthesis.speak(fala);
}

function selectCard(element) {
  if (element.classList.contains("matched") || selectedParts.length >= 2) return;

  element.classList.add("selected");
  selectedParts.push(element.getAttribute("data-part"));
  selectedWords.push(element.getAttribute("data-word"));
  selectedElements.push(element);

  if (selectedParts.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [part1, part2] = selectedParts;
  const [word1, word2] = selectedWords;
  const fullWord = part1 + part2;
  const result = document.getElementById("result");

  if (word1 !== word2) {
    selectedElements.forEach(el => el.classList.add("incorrect"));
    result.textContent = "As imagens não combinam. Tente novamente!";
    result.className = "result-message error";
    somErro.play();
  } 
  else if (validWords.includes(fullWord) && word1 === word2) {
    selectedElements.forEach(el => el.classList.add("correct", "matched"));
    result.textContent = `Parabéns! Você formou: ${fullWord}`;
    result.className = "result-message success";
    somAcerto.play();
    matchedWords.push(fullWord);

    if (matchedWords.length === validWords.length) {
      // 🔊 toca o som de vitória e mostra o botão
      setTimeout(() => {
        somVitoria.play();
        result.textContent = "Você completou todas as palavras!";
        document.getElementById("next-phase-btn").style.display = "inline-block";
      }, 1000);
    }
  } 
  else {
    selectedElements.forEach(el => el.classList.add("incorrect"));
    result.textContent = "Essa palavra não existe. Tente novamente!";
    result.className = "result-message error";
    somErro.play();
  }

  setTimeout(() => {
    selectedElements.forEach(el => {
      if (!el.classList.contains("matched")) {
        el.classList.remove("selected", "incorrect");
      }
    });
    resetSelection();
  }, 1500);
}

function resetSelection() {
  selectedElements = [];
  selectedParts = [];
  selectedWords = [];
  if (matchedWords.length < validWords.length) {
    document.getElementById("result").textContent = "";
  }
}
