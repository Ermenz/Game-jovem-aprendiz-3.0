const storyParts = [
    "Era uma vez um jovem chamado {{nome}}...",
    "Que buscava sua primeira oportunidade como Jovem Aprendiz.",
    "Um dia, após muitos processos e entrevistas ele consegue o tão sonhado emprego!",
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
      pergunta: "Como você reage a uma tarefa que nunca fez antes?",
      opcoes: [
        { texto: "A) Peço ajuda ao gerente", impacto: 10 },
        { texto: "B) Tento resolver sozinho", impacto: 5 },
        { texto: "C) Peço ajuda ao colega de setor", impacto: 0 },
        { texto: "D) Deixo para depois", impacto: -10 }
      ]
    },
    {
      pergunta: "Como lida com prazos apertados?",
      opcoes: [
        { texto: "A) Foco totalmente no que precisa ser feito", impacto: 10 },
        { texto: "B) Tento organizar meu tempo o máximo possível", impacto: 5 },
        { texto: "C) Peço mais tempo para a entrega", impacto: -5 },
        { texto: "D) Peço ajuda ao time", impacto: 0 }
      ]
    },
    // Adicione mais perguntas conforme necessário
  ];
  
  const perguntasSetor = {
    TI: [
      {
        pergunta: "Você encontrou um erro no sistema, o que faz?",
        opcoes: [
          { texto: "A) Tento corrigir o erro sozinho", impacto: 5 },
          { texto: "B) Peço ajuda ao time de TI", impacto: 10 },
          { texto: "C) Comento com meu gerente e espero instruções", impacto: 0 },
          { texto: "D) Deixo o erro e continuo com meu trabalho", impacto: -10 }
        ]
      },
      // Adicione mais perguntas conforme necessário
    ],
    Marketing: [
      // Adicione perguntas específicas de marketing aqui
    ],
    RH: [
      // Adicione perguntas específicas de RH aqui
    ],
    Logística: [
      // Adicione perguntas específicas de logística aqui
    ],
    Financeiro: [
      // Adicione perguntas específicas de financeiro aqui
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
  
    // Embaralhar as opções de resposta
    const opcoesEmbaralhadas = embaralharOpcoes(perguntaAtual.opcoes);
    
    escolha1.textContent = opcoesEmbaralhadas[0].texto;
    escolha2.textContent = opcoesEmbaralhadas[1].texto;
    escolha3.textContent = opcoesEmbaralhadas[2].texto;
    escolha4.textContent = opcoesEmbaralhadas[3].texto;
  
    // Definindo as opções de respostas baseadas na pergunta
    escolha1.onclick = () => tomarDecisao(0, opcoesEmbaralhadas);
    escolha2.onclick = () => tomarDecisao(1, opcoesEmbaralhadas);
    escolha3.onclick = () => tomarDecisao(2, opcoesEmbaralhadas);
    escolha4.onclick = () => tomarDecisao(3, opcoesEmbaralhadas);
  }
  
  // Função para embaralhar as opções de forma aleatória
  function embaralharOpcoes(opcoes) {
    const opcoesEmbaralhadas = [...opcoes];
    for (let i = opcoesEmbaralhadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opcoesEmbaralhadas[i], opcoesEmbaralhadas[j]] = [opcoesEmbaralhadas[j], opcoesEmbaralhadas[i]];
    }
    return opcoesEmbaralhadas;
  }
  
  function tomarDecisao(escolha, opcoesEmbaralhadas) {
    const resultado = document.getElementById("resultado");
    const resp = parseInt(document.getElementById("resp").textContent);
  
    // Impacto da decisão, baseado na opção escolhida
    const impacto = opcoesEmbaralhadas[escolha].impacto;
    
    if (impacto > 0) {
      resultado.textContent = `Você tomou a decisão certa. +${impacto} responsabilidade!`;
    } else {
      resultado.textContent = `Essa escolha teve consequências... ${impacto} responsabilidade.`;
    }
  
    document.getElementById("resp").textContent = resp + impacto;
  
    perguntaIndex++;
    if (perguntaIndex < perguntasComuns.length + perguntasSetor[setorEscolhido].length) {
      atualizarTela();
    } else {
      resultado.textContent = "Parabéns, você completou o desafio!";
    }
  }
  