// scripts/gamecard.js

console.log("GameCard base cargada correctamente.");

// Variables básicas
let score = 0;
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const gameScreen = document.querySelector(".game-screen");

// Inicialización básica
function iniciarJuego() {
  score = 0;
  actualizarPuntaje();
  gameScreen.innerHTML = "<p>🚀 Juego iniciado... próximamente misiones espaciales interactivas.</p>";
}

// Actualizar puntaje
function actualizarPuntaje() {
  scoreDisplay.textContent = score;
}

// Evento botón iniciar
startBtn.addEventListener("click", iniciarJuego);