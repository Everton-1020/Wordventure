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

// Inicializa o jogo com a primeira fase
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

  // Cria os espaços vazios
  for (let i = 0; i < palavra.length; i++) {
    const span = document.createElement("span");
    span.classList.add("letra-espaco");
    span.dataset.index = i;
    espacosDiv.appendChild(span);
  }

  // Cria as letras embaralhadas
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
    proximaBtn.disabled = false;
    refazerBtn.style.display = "none"; // Oculta botão refazer

    if (faseAtual === fases.length - 1) {
      // Última fase — mostra parabéns e esconde botões
      proximaBtn.textContent = "Próxima Frase";
      document.getElementById("mensagem-final").textContent =
        "Parabéns! Você completou todas as palavras!";
      confirmarBtn.style.display = "none";
      refazerBtn.style.display = "none"; // garante que continue escondido
    }

  } else {
    // Sempre mostra o botão "Refazer" se houve erro
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
    // Redireciona para a próxima fase externa
    window.location.href = "fase5.html";
  }
});


// Utilitários
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
