const validWords = ["PATO", "GATO", "SAPO", "VACA"]; // adicione mais aqui

let selectedElements = [];
let selectedParts = [];
let selectedWords = [];
let matchedWords = [];

function selectCard(element) {
  if (element.classList.contains("matched") || selectedParts.length >= 2) return;

  selectedParts.push(element.getAttribute("data-part"));
  selectedWords.push(element.getAttribute("data-word"));
  selectedElements.push(element);

  element.style.border = "3px solid blue";

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
    // Erro: sílabas de palavras diferentes
    selectedElements.forEach(el => el.style.border = "3px solid red");
    result.textContent = " As imagens não combinam. Tente novamente!";
    result.style.color = "red";
  } else if (validWords.includes(fullWord) && word1 === word2) {
    // Acerto: palavra correta e imagens da mesma palavra
    selectedElements.forEach(el => {
      el.style.border = "3px solid green";
      el.classList.add("matched");
    });

    result.textContent = ` Parabéns! Você formou: ${fullWord}`;
    result.style.color = "green";

    matchedWords.push(fullWord);

    if (matchedWords.length === validWords.length) {
      setTimeout(() => {
        result.textContent = " Você completou todas as palavras!";
       const nextButton = document.getElementById("next-phase-btn");
    nextButton.style.display = "inline-block";}, 1000);
    }
  } else {
    // Erro: palavra inválida mesmo com mesmas imagens
    selectedElements.forEach(el => el.style.border = "3px solid red");
    result.textContent = " Essa palavra não existe. Tente novamente!";
    result.style.color = "red";
  }

  setTimeout(() => {
    selectedElements.forEach(el => {
      if (!el.classList.contains("matched")) {
        el.style.border = "2px solid #ccc";
      }
    });
    resetSelection();
  }, 1500);
}

function resetSelection() {
  selectedElements = [];
  selectedParts = [];
  selectedWords = [];

  // Só limpa a mensagem se o jogo ainda não terminou
  if (matchedWords.length < validWords.length) {
    document.getElementById("result").textContent = "";
  }
}

