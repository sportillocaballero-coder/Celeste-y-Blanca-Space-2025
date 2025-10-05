/* ===========================================================
   GAMECARD.JS — Mini-juego de defensa planetaria
   Compatible con Celeste & Blanca Space (sin frameworks)
   -----------------------------------------------------------
   Autor: Santiago / Celeste & Blanca Space Team
   Descripción:
   - 5 meteoritos de ataque aleatorios
   - 4 defensas (DART, NEO, 1033, Colaboración)
   - 3 vidas de la Tierra, gana al superar 5 rondas
   - Puntaje dinámico (+100 / -50 / +200 combo)
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const gameArea = document.querySelector(".game-screen");

  // ==================== AUDIO DEL JUEGO ====================
  let bgAudio = null;

  const initAudio = () => {
    bgAudio = new Audio("assets/audio/gamecard.mp3");
    bgAudio.volume = 0.4;
    bgAudio.loop = true;
    bgAudio.play().catch(() => {
      console.warn("El audio fue bloqueado por el navegador hasta que el usuario interactúe.");
    });
  };

  const stopAudio = () => {
    if (bgAudio) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    }
  };

  // ==================== CONFIGURACIÓN DEL JUEGO ====================
  const meteors = [
    { id: "apophis", name: "Apophis", size: "L", speed: 12.6, img: "assets/cards/CB_Card_front--Apophis.png", type: "Silicáceo" },
    { id: "yr4", name: "2024 YR4", size: "M", speed: 18.0, img: "assets/cards/CB_Card_front--2024YR4.png", type: "Apollo rocoso" },
    { id: "chicxculub", name: "Chicxculub", size: "S", speed: 19.2, img: "assets/cards/CB_Card_front--Chicxculub-FE.png", type: "Condrita" },
    { id: "bennu", name: "Bennu", size: "M", speed: 28.0, img: "assets/cards/CB_Card_front--Bennu.png", type: "Carbonáceo" },
    { id: "vesta", name: "4 Vesta (frag.)", size: "XL", speed: 22.0, img: "assets/cards/CB_Card_front--Vesta.png", type: "Rocoso (V)" },
  ];

  const defenses = [
    { id: "dart", name: "DART", kind: "kinetic", img: "assets/cards/CB_Card_front-POCO-DART.png", text: "Eficaz contra S/M." },
    { id: "neo", name: "NEO Surveyor", kind: "survey", img: "assets/cards/CB_Card_front-POCO-NEO.png", text: "Reduce el tamaño efectivo." },
    { id: "1033", name: "1033 Gravitacional", kind: "1033", img: "assets/cards/CB_Card_front-POCO-1033.png", text: "Eficaz contra M/L si v ≤ 20." },
    { id: "collab", name: "Colaboración Internacional", kind: "collab", img: "assets/cards/CB_Card_front-POCO-Collab.png", text: "Permite jugar 2 defensas." },
  ];

  const sizeOrder = ["S", "M", "L", "XL"];

  // ==================== VARIABLES DINÁMICAS ====================
  let round = 1;
  let earthHP = 3;
  let score = 0;
  let wins = 0;
  let selected = [];
  let collabActive = false;
  let meteor = null;
  let resolved = false;

  // ==================== FUNCIONES PRINCIPALES ====================
  const randomMeteor = () => meteors[Math.floor(Math.random() * meteors.length)];

  // ==================== FUNCIÓN PARA ACTUALIZAR VIDAS ====================
  const updateHPDisplay = () => {
    const hpElement = document.getElementById("hp");
    if (hpElement) {
      hpElement.innerHTML = "❤".repeat(earthHP) + "♡".repeat(3 - earthHP);
    }
  };

  const renderBoard = () => {
    gameArea.innerHTML = `
      <div class="status-bar">
        <p>🌍 Vidas: <span id="hp">${"❤".repeat(earthHP)}${"♡".repeat(3 - earthHP)}</span></p>
        <p>🌀 Ronda: ${round}/5</p>
        <p>🏆 Puntos: <span id="score">${score}</span></p>
      </div>

      <div class="meteor-zone">
        <div class="card meteor-card" id="meteor">
          <img src="${meteor.img || "/assets/cards/meteor_placeholder.png"}" alt="${meteor.name}">
          <div class="card-info">
            <h3>${meteor.name}</h3>
            <p>${meteor.type}</p>
            <p>Tamaño: ${meteor.size}</p>
            <p>Velocidad: ${meteor.speed} km/s</p>
          </div>
        </div>
      </div>

      <h3 class="defense-title">Seleccioná tu defensa</h3>
      <div class="defense-grid"></div>

      <div class="controls">
        <button id="resolve-btn" class="btn">Resolver ronda</button>
        <button id="next-btn" class="btn disabled">Siguiente</button>
        <button id="reset-btn" class="btn hidden">Reiniciar</button>
      </div>

      <div class="result-text" id="result-text"></div>
    `;

    renderDefenses();
    attachEvents();
  };

  const renderDefenses = () => {
    const grid = document.querySelector(".defense-grid");
    grid.innerHTML = "";
    defenses.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.classList.add("card", "defense-card");
      cardEl.dataset.id = card.id;
      cardEl.innerHTML = `
        <img src="${card.img || "/assets/cards/card_placeholder.png"}" alt="${card.name}">
        <div class="card-info">
          <h4>${card.name}</h4>
          <p>${card.text}</p>
        </div>
      `;
      grid.appendChild(cardEl);
    });
  };

  const attachEvents = () => {
    document.querySelectorAll(".defense-card").forEach((card) => {
      card.addEventListener("click", () => selectDefense(card));
    });

    document.getElementById("resolve-btn").addEventListener("click", resolveRound);
    document.getElementById("next-btn").addEventListener("click", nextRound);
    document.getElementById("reset-btn").addEventListener("click", resetGame);
  };

  // ==================== SELECCIÓN DE DEFENSAS ====================
  const selectDefense = (cardEl) => {
    if (resolved) return;
    const id = cardEl.dataset.id;
    if (selected.includes(id)) {
      selected = selected.filter((x) => x !== id);
      if (id === "collab") collabActive = false;
      cardEl.classList.remove("selected");
      return;
    }

    const canSelect = collabActive ? selected.length < 2 : selected.length < 1;
    if (!canSelect) return;

    if (id === "collab") collabActive = true;
    selected.push(id);
    cardEl.classList.add("selected");
  };

  // ==================== LÓGICA DE RESULTADOS CORREGIDA ====================
  const effectiveSize = (baseSize, hasSurvey) => {
    if (!hasSurvey) return baseSize;
    const idx = sizeOrder.indexOf(baseSize);
    return sizeOrder[Math.max(0, idx - 1)];
  };

  const resolveRound = () => {
    if (resolved || selected.length === 0) return;

    const resultText = document.getElementById("result-text");
    const usingSurvey = selected.includes("neo");
    const usingDart = selected.includes("dart");
    const using1033 = selected.includes("1033");
    const effSize = effectiveSize(meteor.size, usingSurvey);
    let success = false;
    let comboBonus = false;

    // Reglas principales
    if (usingDart && (effSize === "S" || effSize === "M")) success = true;
    if (!success && using1033 && (effSize === "M" || effSize === "L") && meteor.speed <= 20) success = true;

    // Colaboración especial
    if (!success && selected.includes("collab") && usingSurvey && (usingDart || using1033)) {
      success = Math.random() < 0.6;
      comboBonus = success;
    }

    // Resultado - VALIDACIÓN CORREGIDA
    if (success) {
      resultText.textContent = "✅ ¡Defensa exitosa! La Tierra está a salvo.";
      wins++;
      score += 100 + (comboBonus ? 200 : 0);
      animateSuccess();
    } else {
      resultText.textContent = "💥 Impacto fallido. La Tierra sufre daños.";
      earthHP = Math.max(0, earthHP - 1);
      score = Math.max(0, score - 50);
      animateFail();
    }

    updateScore();
    updateHPDisplay();
    resolved = true;
    document.getElementById("resolve-btn").classList.add("disabled");
    
    // CORREGIDO: Siempre habilitar "Siguiente" después de resolver
    document.getElementById("next-btn").classList.remove("disabled");

    checkGameOver();
  };

  const animateSuccess = () => {
    const meteorEl = document.getElementById("meteor");
    meteorEl.classList.add("explode");
    setTimeout(() => meteorEl.classList.remove("explode"), 1000);
  };

  const animateFail = () => {
    const meteorEl = document.getElementById("meteor");
    meteorEl.classList.add("shake");
    setTimeout(() => meteorEl.classList.remove("shake"), 1000);
  };

  // ==================== CONTROL DE FLUJO CORREGIDO ====================
  const nextRound = () => {
    if (!resolved) return;
    if (wins >= 5 || earthHP <= 0) {
      checkGameOver();
      return;
    }
    
    round++;
    selected = [];
    collabActive = false;
    resolved = false;
    meteor = randomMeteor();
    renderBoard();
  };

  const checkGameOver = () => {
    const resetBtn = document.getElementById("reset-btn");
    const nextBtn = document.getElementById("next-btn");
    const resultText = document.getElementById("result-text");

    if (earthHP <= 0) {
      resultText.textContent = "☠️ Fin del juego — La Tierra fue impactada.";
      nextBtn.classList.add("disabled");
      resetBtn.classList.remove("hidden");
      stopAudio(); // Detener música al perder
    } else if (wins >= 5) {
      resultText.textContent = "🌎 ¡Victoria! Defendiste la Tierra 5 rondas.";
      nextBtn.classList.add("disabled");
      resetBtn.classList.remove("hidden");
      stopAudio(); // Detener música al ganar
    }
  };

  const resetGame = () => {
    round = 1;
    earthHP = 3;
    score = 0;
    wins = 0;
    selected = [];
    collabActive = false;
    resolved = false;
    meteor = randomMeteor();
    updateScore();
    stopAudio(); // Detener música anterior
    initAudio(); // Reiniciar música
    renderBoard();
  };

  const updateScore = () => {
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
      scoreElement.textContent = score;
    }
  };

  // ==================== INICIO DEL JUEGO CORREGIDO ====================
  startBtn.addEventListener("click", () => {
    // Iniciar audio del juego
    initAudio();
    
    // Iniciar la primera ronda
    meteor = randomMeteor();
    startBtn.style.display = "none";
    renderBoard();
  });
});