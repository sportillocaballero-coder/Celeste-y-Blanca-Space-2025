/* ================================================================ */
/* SCRIPT PRINCIPAL DEL JUEGO EDUCATIVO GAMECARD                  */
/* ================================================================ */
/* 
 * Este script maneja la lógica básica del juego educativo sobre meteoritos.
 * Incluye:
 * - Sistema de puntuación del jugador
 * - Inicialización del juego
 * - Eventos de botones interactivos
 * - Base para futuras funcionalidades del juego
 */

console.log("GameCard base cargada correctamente.");

// Variables básicas del juego
let score = 0;
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const gameScreen = document.querySelector(".game-screen");

/* ================================================================ */
/* FUNCIÓN: INICIAR NUEVA PARTIDA                                 */
/* ================================================================ */
/* 
 * Reinicia el juego a su estado inicial y prepara la pantalla
 * para comenzar una nueva sesión de juego.
 */
function iniciarJuego() {
  score = 0;
  actualizarPuntaje();
  gameScreen.innerHTML = "<p>🚀 Juego iniciado... próximamente misiones espaciales interactivas.</p>";
}

/* ================================================================ */
/* FUNCIÓN: ACTUALIZAR MARCADOR DE PUNTOS                         */
/* ================================================================ */
/* 
 * Actualiza la visualización del puntaje actual del jugador
 * en la interfaz de usuario.
 */
function actualizarPuntaje() {
  scoreDisplay.textContent = score;
}

/* ================================================================ */
/* EVENT LISTENER: BOTÓN DE INICIAR JUEGO                         */
/* ================================================================ */
// Evento botón iniciar
startBtn.addEventListener("click", iniciarJuego);