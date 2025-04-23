function verificarFinal() {
 
  
  const resp = parseInt(document.getElementById("resp").textContent);
  const pont = parseInt(document.getElementById("pont").textContent);
  const com = parseInt(document.getElementById("com").textContent);
  const desem = parseInt(document.getElementById("desem").textContent);

  // Resultados
  let finalText = "";

  if (resp > 70 && pont > 70 && com > 70 && desem > 70) {
    finalText = "Final Excelente: Você foi promovido e se tornou referência na empresa!";
  } else if (resp > 50 && desem > 50) {
    finalText = "Final Bom: Você teve um bom desempenho e foi efetivado.";
  } else if (resp > 30) {
    finalText = "Final Médio: Você teve dificuldades, mas aprendeu com a jornada.";
  } else {
    finalText = "Final Ruim: Você não conseguiu se adaptar e saiu do programa.";
  }

  console.log(finalText);
  document.getElementById("resultadoFinal").innerText = finalText;

 
  document.getElementById("telaJogo").style.display = "none";
  document.getElementById("telaResultado").style.display = "block";
}
