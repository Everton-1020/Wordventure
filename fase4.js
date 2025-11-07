const fases = [
  { palavra: "MAÇÃ", imagem: "imgfase4/maca.jpg" },
  { palavra: "PIPA", imagem: "imgfase4/pipa.jpg" },
  { palavra: "LIVRO", imagem: "imgfase4/livro.jpg" },
  { palavra: "ROBÔ", imagem: "imgfase4/robo.jpg" }
];

let faseAtual = 0;
let letrasSelecionadas = [];

const espacosDiv = document.getElementById("espacos");
const letrasDiv = document.getElementById("letras");
const imagemPalavra = document.getElementById("palavra-img");
const confirmarBtn = document.getElementById("confirmar");
const proximaBtn = document.getElementById("proxima");
const refazerBtn = document.getElementById("refazer");
const somAcerto = document.getElementById("som-acerto");
const somErro = document.getElementById("som-erro");
const somVitoria = document.getElementById("som-vitoria");

iniciarFase(faseAtual);

function iniciarFase(indice) {
  const fase = fases[indice];
  const palavra = fase.palavra;
  const letrasDaPalavra = palavra.split("");
  const letrasExtras = gerarLetrasExtras(letrasDaPalavra, 4);
  const letrasDisponiveis = shuffleArray([...letrasDaPalavra, ...letrasExtras]);

  letrasSelecionadas = [];
  espacosDiv.innerHTML = "";
  letrasDiv.innerHTML = "";
  imagemPalavra.src = fase.imagem;
  proximaBtn.disabled = true;
  refazerBtn.style.display = "none";

  for (let i = 0; i < palavra.length; i++) {
    const span = document.createElement("span");
    span.classList.add("letra-espaco");
    span.dataset.index = i;
    espacosDiv.appendChild(span);
  }

  letrasDisponiveis.forEach((letra, idx) => {
    const div = document.createElement("div");
    div.classList.add("letra-opcao");
    div.textContent = letra;
    div.dataset.index = idx;
    div.addEventListener("click", () => selecionarLetra(div));
    letrasDiv.appendChild(div);
  });
}

function selecionarLetra(divLetra) {
  const letra = divLetra.textContent;
  const espacos = [...espacosDiv.children];
  const proximoEspaco = espacos.find(e => e.textContent === "");

  if (proximoEspaco) {
    proximoEspaco.textContent = letra;
    letrasSelecionadas[proximoEspaco.dataset.index] = letra;
    divLetra.style.visibility = "hidden";
  }
}

confirmarBtn.addEventListener("click", () => {
  const espacos = [...espacosDiv.children];
  const palavraCerta = fases[faseAtual].palavra;
  let acertou = true;

  espacos.forEach((span, i) => {
    const letra = span.textContent;
    span.classList.remove("correto", "errado");

    if (letra === palavraCerta[i]) {
      span.classList.add("correto");
    } else {
      span.classList.add("errado");
      acertou = false;
    }
  });

  if (acertou) {
    somAcerto.play();
    proximaBtn.disabled = false;
    refazerBtn.style.display = "none";

    if (faseAtual === fases.length - 1) {
      somVitoria.play();
      proximaBtn.textContent = "Próxima Fase";
      document.getElementById("mensagem-final").textContent =
        "Parabéns! Você completou todas as palavras!";
      confirmarBtn.style.display = "none";
      refazerBtn.style.display = "none";
    }
  } else {
    somErro.play();
    refazerBtn.style.display = "inline-block";
  }
});

refazerBtn.addEventListener("click", () => {
  const espacos = [...espacosDiv.children];
  espacos.forEach(span => {
    span.textContent = "";
    span.classList.remove("correto", "errado");
  });

  const letras = [...letrasDiv.children];
  letras.forEach(div => {
    div.style.visibility = "visible";
  });

  letrasSelecionadas = [];
  refazerBtn.style.display = "none";
});

proximaBtn.addEventListener("click", () => {
  if (faseAtual < fases.length - 1) {
    faseAtual++;
    iniciarFase(faseAtual);
  } else {
    window.location.href = "fase5.html";
  }
});

// Botão de voltar à fase anterior
document.getElementById("voltar").addEventListener("click", () => {
  window.location.href = "fase3.html";
});

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function gerarLetrasExtras(letrasOriginais, quantidade) {
  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃÕÔÉÁÍÚÊ".split("");
  const extras = [];

  while (extras.length < quantidade) {
    const letra = alfabeto[Math.floor(Math.random() * alfabeto.length)];
    if (!letrasOriginais.includes(letra) && !extras.includes(letra)) {
      extras.push(letra);
    }
  }

  return extras;
}

// Narrador
const botaoOuvir = document.getElementById("ouvir");

function narrarInstrucoes() {
  const texto = "Olá! Bem-vindo ao Letrinha por Letrinha! Nesta fase, você deve observar a imagem e formar a palavra correta escolhendo as letras na ordem certa. Clique nas letras para preencher os espaços e depois confirme sua resposta. Vamos lá!";
  
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 1; // velocidade da fala
  fala.pitch = 1; // tom de voz
  window.speechSynthesis.cancel(); // interrompe qualquer fala anterior
  window.speechSynthesis.speak(fala);
}

botaoOuvir.addEventListener("click", narrarInstrucoes);

