const storyParts = [
  "Era uma vez uma pessoa chamada {{nome}}...",
  "Que buscava sua primeira oportunidade como Jovem Aprendiz.",
  "Um dia, após muitos processos e entrevistas consegue o tão sonhado emprego!",
  "Mas mal sabia que sua jornada tinha acabado de começar...",
  "Você agora se encontra diante da primeira tarefa. Como você vai se comportar?",
  "Com o tempo, o jovem vai crescendo no ambiente de trabalho, enfrentando os desafios diários...",
  "E ao final, ele descobre o quão longe ele pode ir!"
];

let currentPart = 0;
let nomeJogador = "";
let setorEscolhido = "";

const nomeInput = document.getElementById("nomeJogador");
const storyText = document.getElementById("storyText");
const nextBtn = document.getElementById("nextBtn");
const popup = document.getElementById("popup");
const jogo = document.getElementById("jogo");
const nomeSpan = document.getElementById("nome"); 
const setorSpan = document.getElementById("setorEscolhido");
const setorSelect = document.getElementById("setorSelect");

const perguntasComuns = [
  {
    pergunta: "Seu gerente pede para você realizar uma tarefa que nunca fez antes",
    opcoes: [
      "A) Peço ajuda ao gerente",
      "B) Tento resolver sozinho",
      "C) Peço ajuda ao colega de setor",
      "D) Deixo para depois"
    ]
  },
  {
    pergunta: "Seu gerente pede para você participar de um projeto com o seu setor, mas o prazo está apertado, como você lidaria?",
    opcoes: [
      "A) Foco totalmente no que precisa ser feito",
      "B) Tento organizar meu tempo o máximo possível",
      "C) Peço ajuda ao time",
      "D) Me organizo mal e não entrego nada"
    ]
  },
  {
    pergunta: "Uma grande demanda aparece, você prefere trabalhar em equipe ou sozinho?",
    opcoes: [
      "A) Prefiro trabalhar sozinho para focar melhor",
      "B) Gosto de trabalhar em equipe, trocando ideias",
      "C) Depende da tarefa",
      "D) Não gosto de trabalhar"
    ]
  },
  {
    pergunta: "Como você se comporta em situações de pressão?",
    opcoes: [
      "A) Fico ansioso, mas tento dar o melhor de mim",
      "B) Tento manter a calma e resolver o problema",
      "C) Peço ajuda imediatamente",
      "D) Tento fugir do problema"
    ]
  },
  {
    pergunta: "Qual é a sua maior força como colaborador?",
    opcoes: [
      "A) Minha comunicação clara e direta",
      "B) Minha capacidade de organização",
      "C) Minha habilidade em resolver problemas rapidamente",
      "D) Minha habilidade em me comunicar mal"
    ]
  }
];

const perguntasSetor = {
  TI: [
    {
      pergunta: "Você encontrou um erro no sistema, o que faz?",
      opcoes: [
        "A) Tento corrigir o erro sozinho",
        "B) Peço ajuda ao time de TI",
        "C) Comento com meu gerente e espero instruções",
        "D) Deixo o erro e continuo com meu trabalho"
      ]
    },
    {
      pergunta: "Você tem uma sugestão de melhoria para o sistema, como você a apresenta?",
      opcoes: [
        "A) Apresento ao meu gerente diretamente",
        "B) Envio um e-mail detalhado com a sugestão",
        "C) Discutiria com a equipe de TI antes de apresentar",
        "D) Fico com medo e não falo nada"
      ]
    }
  ],
  Marketing: [
    {
      pergunta: "Você precisa criar uma campanha para promover um evento dentro da empresa, o que você faz?",
      opcoes: [
        "A) Faço uma pesquisa sobre o público alvo e crio o conteúdo",
        "B) Peço ideias para a equipe de marketing",
        "C) Pergunto ao gerente o que ele deseja na campanha",
        "D) Copio uma campanha que já vi antes"
      ]
    },
    {
      pergunta: "Como você lida com feedbacks negativos sobre sua campanha?",
      opcoes: [
        "A) Tiro lições do feedback e tento melhorar",
        "B) Fico chateado, mas aceito o feedback",
        "C) Tento justificar minha escolha de campanha",
        "D) Ignoro o feedback e sigo em frente"
      ]
    }
  ],
  RH: [
    {
      pergunta: "Como você lida com um colega que não está cumprindo suas tarefas?",
      opcoes: [
        "A) Converso com ele para entender o que está acontecendo",
        "B) Peço para o gerente tomar providências",
        "C) Tento assumir a tarefa dele",
        "D) Ignoro e foco nas minhas tarefas"
      ]
    },
    {
      pergunta: "Você precisa realizar um treinamento, como organiza isso?",
      opcoes: [
        "A) Planejo o treinamento e envio para a equipe",
        "B) Peço para o gerente planejar e organizar tudo",
        "C) Contrato uma consultoria externa",
        "D) Deixo para o último momento"
      ]
    }
  ],
  Logística: [
    {
      pergunta: "O estoque está em desordem, o que você faz?",
      opcoes: [
        "A) Arrumo o estoque sozinho",
        "B) Chamo o gerente para organizar",
        "C) Falo para outra pessoa fazer",
        "D) Não faço nada"
      ]
    },
    {
      pergunta: "Você percebeu um erro na entrega, o que faz?",
      opcoes: [
        "A) Tento corrigir o erro sozinho",
        "B) Aviso o gerente imediatamente",
        "C) Peço ajuda à equipe de logística",
        "D) Deixo o erro passar"
      ]
    }
  ],
  Financeiro: [
    {
      pergunta: "Como você verifica e organiza relatórios financeiros?",
      opcoes: [
        "A) Reviso tudo de forma organizada",
        "B) Peço ajuda a alguém mais experiente",
        "C) Uso ferramentas de software para me ajudar",
        "D) Delego a tarefa para outra pessoa sem tentar resolver"
      ]
    },
    {
      pergunta: "Você percebeu um erro no lançamento de uma nota, o que faz?",
      opcoes: [
        "A) Corrijo o erro imediatamente",
        "B) Informo o gerente sobre o erro",
        "C) Peço ajuda à equipe financeira",
        "D) Deixo o erro passar"
      ]
    }
  ]
};

let respostas = [];
let perguntaIndex = 0;

nextBtn.addEventListener("click", () => {
  if (!nomeJogador) {
    nomeJogador = nomeInput.value.trim();
    if (nomeJogador === "") {
      alert("Digite seu nome!");
      return;
    }
    nomeSpan.textContent = nomeJogador;
    storyText.textContent = storyParts[currentPart].replace("{{nome}}", nomeJogador);
    currentPart++;
    nomeInput.style.display = "none";
  } else if (currentPart < storyParts.length) {
    storyText.textContent = storyParts[currentPart];
    currentPart++;

    if (currentPart === storyParts.length) {
      nextBtn.textContent = "Começar Jornada";
      setorSelect.style.display = "block";
    }
  } else if (setorSelect.style.display === "block") {
    setorEscolhido = setorSelect.value;
    if (setorEscolhido === "") {
      alert("Escolha um setor para começar a jornada!");
      return;
    }
    setorSpan.textContent = setorEscolhido;
    popup.style.display = "none";
    jogo.style.display = "block";
    atualizarTela();
  }
});

function atualizarTela() {
  const tituloFase = document.getElementById("titulo-fase");
  const descricaoFase = document.getElementById("descricao-fase");
  const escolha1 = document.getElementById("escolha1");
  const escolha2 = document.getElementById("escolha2");
  const escolha3 = document.getElementById("escolha3");
  const escolha4 = document.getElementById("escolha4");

  let perguntaAtual;
  
  if (perguntaIndex < perguntasComuns.length) {
    perguntaAtual = perguntasComuns[perguntaIndex]; // Pergunta comum
  } else {
    const setorPerguntas = perguntasSetor[setorEscolhido];
    perguntaAtual = setorPerguntas[perguntaIndex - perguntasComuns.length]; // Pergunta do setor
  }

  tituloFase.textContent = `Desafio no setor de ${setorEscolhido}`;
  descricaoFase.textContent = perguntaAtual.pergunta;

  escolha1.textContent = perguntaAtual.opcoes[0];
  escolha2.textContent = perguntaAtual.opcoes[1];
  escolha3.textContent = perguntaAtual.opcoes[2];
  escolha4.textContent = perguntaAtual.opcoes[3];

  // Definindo as opções de respostas baseadas na pergunta
  escolha1.onclick = () => tomarDecisao(0);
  escolha2.onclick = () => tomarDecisao(1);
  escolha3.onclick = () => tomarDecisao(2);
  escolha4.onclick = () => tomarDecisao(3);
}

function tomarDecisao(escolha) {
  const resultado = document.getElementById("resultado");
  let resp = parseInt(document.getElementById("resp").textContent);
  let desem = parseInt(document.getElementById("desem").textContent);
  let com = parseInt(document.getElementById("com").textContent);
  let pon = parseInt(document.getElementById("pont").textContent);

  if (escolha === 0) {
    resultado.textContent = "Você tomou a decisão certa. +10 responsabilidade, +5 comunicação, +2 desempenho,!";
    resp += 10;
    com += 5;
    desem += 2;
    pon += 0;
  } else if (escolha === 1) {
    resultado.textContent = "Essa escolha teve consequências negativas. +10 responsabilidade, +2 comunicação, +2 desempenho.";
    resp += 10;
    com += 2;
    desem += 2;
    pon -= 0;
  } else if (escolha === 2) {
    resultado.textContent = "Você tomou a decisão certa. +5 responsabilidade, +3 comunicação, +4 desempenho.";
    resp += 5;
    com += 3;
    desem += 4;
    pon += 0;
  } else if (escolha === 3) {
    resultado.textContent = "Essa escolha teve consequências... -10 responsabilidade, -4 comunicação, -5 desempenho.";
    resp -= 10;
    com -= 4;
    desem -= 5;
    pon -= 0;
  }

  // Atualiza os valores na interface
  document.getElementById("resp").textContent = resp;
  document.getElementById("com").textContent = com;
  document.getElementById("desem").textContent = desem;
  document.getElementById("pont").textContent = pon;

  // Avança para a próxima pergunta
  perguntaIndex++;

  if (perguntaIndex < perguntasComuns.length + perguntasSetor[setorEscolhido].length) {
    atualizarTela();
  } else {
    if (resp > 50 && desem > 50 && com > 50 && pon > 50) {
      lançarConfetes();
      mostrarMensagemFinal();
    } else {
      mostrarMensagemNaoEfetivado();
    }

    // 🔒 Bloqueia os botões após o fim do jogo
    document.getElementById("escolha1").disabled = true;
    document.getElementById("escolha2").disabled = true;
    document.getElementById("escolha3").disabled = true;
    document.getElementById("escolha4").disabled = true;
  }

  function lançarConfetes() {
    const container = document.getElementById("confetti-container");

    function criarConfete() {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");

      const cores = ["#ff0", "#0f0", "#0ff", "#f0f", "#f00", "#00f"];
      confetti.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
      confetti.style.opacity = Math.random();

      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }

    for (let i = 0; i < 100; i++) {
      setTimeout(criarConfete, i * 50);
    }
  }
}




function selecionarIcone(src) {
  const iconeEscolhido = document.getElementById("iconeEscolhido");
  iconeEscolhido.src = src;
  iconeEscolhido.style.display = "block";
  document.getElementById("seletorIcones").style.display = "none";
}

function selecionarIcone(src) {
  const iconeEscolhido = document.getElementById("iconeEscolhido");
  iconeEscolhido.src = src;
  iconeEscolhido.style.display = "block";
  document.getElementById("seletorIcones").style.display = "none";
}

// Mostra os ícones após o setor ser selecionado
document.getElementById("nextBtn").addEventListener("click", () => {
  const nome = document.getElementById("nomeJogador").value;
  const setor = document.getElementById("setorSelect").value;

  if (nome && setor) {
    document.getElementById("seletorIcones").style.display = "block";
    
  }
});



// Exemplo de função que mostra a mensagem final
function mostrarMensagemFinal() {
  const mensagemFinal = document.getElementById('mensagemFinal');
  mensagemFinal.style.display = 'block'; // Torna a mensagem visível
}



function mostrarMensagemNaoEfetivado() {
  const naoEfetivadoMensagem = document.getElementById('naoEfetivado');
  naoEfetivadoMensagem.style.display = 'block';
}

