const wordList = ["CADERNO", "TESOURA", "LOUSA", "MOCHILA", "RÉGUA", "LÁPIS"];
const gridSize = 10;
const grid = document.getElementById("grid");
const wordUl = document.getElementById("words-to-find");
const messageDiv = document.getElementById("message");
const foundInfoDiv = document.getElementById("found-info");
const finishButton = document.getElementById("finish-button");
const voltarButton = document.getElementById("voltar");

// Sons
const somAcerto = document.getElementById("som-acerto");
const somErro = document.getElementById("som-erro");
const somVitoria = document.getElementById("som-vitoria");

let selectedCells = [];
let selectedCoords = [];
let foundWords = [];

function generateGrid() {
  const board = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));

  // Coloca as palavras horizontal ou vertical
  wordList.forEach(word => {
    let placed = false;
    while (!placed) {
      const direction = Math.random() < 0.5 ? 'H' : 'V';
      const row = Math.floor(Math.random() * (direction === 'H' ? gridSize : gridSize - word.length));
      const col = Math.floor(Math.random() * (direction === 'H' ? gridSize - word.length : gridSize));
      let fits = true;

      for (let i = 0; i < word.length; i++) {
        const r = direction === 'H' ? row : row + i;
        const c = direction === 'H' ? col + i : col;
        if (board[r][c] !== "" && board[r][c] !== word[i]) {
          fits = false;
          break;
        }
      }

      if (fits) {
        for (let i = 0; i < word.length; i++) {
          const r = direction === 'H' ? row : row + i;
          const c = direction === 'H' ? col + i : col;
          board[r][c] = word[i];
        }
        placed = true;
      }
    }
  });

  // Preenche o restante com letras aleatórias
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (board[i][j] === "") {
        board[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  // Cria o tabuleiro
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = board[i][j];
      cell.dataset.row = i;
      cell.dataset.col = j;

      cell.addEventListener("mousedown", handleStart);
      cell.addEventListener("mouseenter", handleEnter);
      cell.addEventListener("mouseup", handleEnd);

      grid.appendChild(cell);
    }
  }

  // Exibe as palavras
  wordList.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    li.id = `word-${word}`;
    wordUl.appendChild(li);
  });
}

function handleStart(e) {
  clearSelection();
  selectCell(e.target);
  document.addEventListener("mouseup", handleEnd);
}

function handleEnter(e) {
  if (e.buttons === 1) selectCell(e.target);
}

function handleEnd() {
  let selectedWord = selectedCells.map(c => c.textContent).join("");
  let reversedWord = selectedWord.split("").reverse().join("");

  if ((wordList.includes(selectedWord) || wordList.includes(reversedWord)) &&
      !foundWords.includes(selectedWord) && !foundWords.includes(reversedWord)) {

    const found = wordList.includes(selectedWord) ? selectedWord : reversedWord;

    selectedCells.forEach(c => {
      c.classList.remove("selected");
      c.classList.add("correct");
    });

    foundWords.push(found);
    document.getElementById(`word-${found}`).classList.add("found");
    showFoundWordInfo(found);
    somAcerto.play();

    if (foundWords.length === wordList.length) {
      messageDiv.textContent = "Parabéns, você encontrou todas as palavras!";
      finishButton.style.display = "inline-block";
      somVitoria.play();
    }

  } else {
    selectedCells.forEach(c => c.classList.add("wrong"));
    somErro.play();

    setTimeout(() => {
      selectedCells.forEach(c => {
        c.classList.remove("wrong");
        c.classList.remove("selected");
      });
      selectedCells = [];
      selectedCoords = [];
    }, 500);
  }

  document.removeEventListener("mouseup", handleEnd);
}

function selectCell(cell) {
  if (!cell.classList.contains("cell") || selectedCells.includes(cell)) return;
  cell.classList.add("selected");
  selectedCells.push(cell);
  selectedCoords.push({ row: +cell.dataset.row, col: +cell.dataset.col });
}

function clearSelection() {
  selectedCells.forEach(c => c.classList.remove("selected"));
  selectedCells = [];
  selectedCoords = [];
}

function showFoundWordInfo(word) {
  foundInfoDiv.innerHTML = "";
  const img = document.createElement("img");
  img.src = `imgfase5/${word}.jpg`;
  img.alt = word;

  const phrase = document.createElement("p");
  phrase.textContent = `Você encontrou a palavra "${word}"!`;

  foundInfoDiv.appendChild(img);
  foundInfoDiv.appendChild(phrase);
}

generateGrid();

// Finalizar jogo
finishButton.addEventListener("click", () => {
  window.location.href = "creditos.html";
});

// Voltar à fase anterior
voltarButton.addEventListener("click", () => {
  window.location.href = "fase4.html";
});

// Narrador
const botaoOuvir = document.getElementById("ouvir");

function narrarInstrucoes() {
  const texto = "Olá! Bem-vindo! Nesta fase, você vai brincar de caça-palavras. Observe as palavras que estão na lista e procure encontrá-las no quadro de letras. Clique e arraste com o mouse para selecionar cada palavra. Boa sorte!";
  
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 1; // velocidade normal
  fala.pitch = 1; // tom de voz natural
  window.speechSynthesis.cancel(); // interrompe qualquer fala anterior
  window.speechSynthesis.speak(fala);
}

botaoOuvir.addEventListener("click", narrarInstrucoes);
