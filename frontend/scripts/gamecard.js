/* ===========================================================
   GAMECARD.JS — Planetary defense mini-game
   -----------------------------------------------------------
   Description:
   - 5 random attack meteorites
   - 4 defenses (DART, NEO, 1033, Collaboration)
   - 3 Earth lives, win by surviving 5 rounds
   - Dynamic scoring (+100 / -50 / +200 combo)
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const gameArea = document.querySelector(".game-screen");

  // ==================== GAME AUDIO ====================
  let bgAudio = null;

  /**
   * Initializes and plays the game's background audio
   * @returns {void} Returns no value, but assigns an Audio object to bgAudio
   */
  const initAudio = () => {
    bgAudio = new Audio("assets/audio/gamecard.mp3");
    bgAudio.volume = 0.4;
    bgAudio.loop = true;
    bgAudio.play().catch(() => {
      console.warn("Audio was blocked by browser until user interacts.");
    });
  };

  /**
   * Stops and restarts the game's background audio
   * @returns {void} Returns no value, modifies audio state
   */
  const stopAudio = () => {
    if (bgAudio) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    }
  };

  // ==================== GAME CONFIGURATION ====================
  const meteors = [
    { id: "apophis", name: "Apophis", size: "L", speed: 12.6, img: "assets/cards/CB_Card_front--Apophis.png", type: "Siliceous" },
    { id: "yr4", name: "2024 YR4", size: "M", speed: 18.0, img: "assets/cards/CB_Card_front--2024YR4.png", type: "Apollo rocky" },
    { id: "chicxculub", name: "Chicxculub", size: "S", speed: 19.2, img: "assets/cards/CB_Card_front--Chicxculub-FE.png", type: "Chondrite" },
    { id: "bennu", name: "Bennu", size: "M", speed: 28.0, img: "assets/cards/CB_Card_front--Bennu.png", type: "Carbonaceous" },
    { id: "vesta", name: "4 Vesta (frag.)", size: "XL", speed: 22.0, img: "assets/cards/CB_Card_front--Vesta.png", type: "Rocky (V)" },
  ];

  const defenses = [
    { id: "dart", name: "DART", kind: "kinetic", img: "assets/cards/CB_Card_front-POCO-DART.png", text: "Effective against S/M." },
    { id: "neo", name: "NEO Surveyor", kind: "survey", img: "assets/cards/CB_Card_front-POCO-NEO.png", text: "Reduces effective size." },
    { id: "1033", name: "1033 Gravitational", kind: "1033", img: "assets/cards/CB_Card_front-POCO-1033.png", text: "Effective against M/L if v ≤ 20." },
    { id: "collab", name: "International Collaboration", kind: "collab", img: "assets/cards/CB_Card_front-POCO-Collab.png", text: "Allows playing 2 defenses." },
  ];

  const sizeOrder = ["S", "M", "L", "XL"];

  // ==================== DYNAMIC VARIABLES ====================
  let round = 1;
  let earthHP = 3;
  let score = 0;
  let wins = 0;
  let selected = [];
  let collabActive = false;
  let meteor = null;
  let resolved = false;

  // ==================== MAIN FUNCTIONS ====================
  /**
   * Selects a random meteorite from the meteorites array
   * @returns {Object} Meteorite object with properties: id, name, size, speed, img, type
   */
  const randomMeteor = () => meteors[Math.floor(Math.random() * meteors.length)];

  // ==================== FUNCTION TO UPDATE LIVES ====================
  /**
   * Updates the display of Earth's lives in the DOM
   * @returns {void} Returns no value, modifies the innerHTML of the HP element
   */
  const updateHPDisplay = () => {
    const hpElement = document.getElementById("hp");
    if (hpElement) {
      hpElement.innerHTML = "❤".repeat(earthHP) + "♡".repeat(3 - earthHP);
    }
  };

  /**
   * Renders the complete game board with all its elements
   * @returns {void} Returns no value, modifies the innerHTML of gameArea and calls other rendering functions
   */
  const renderBoard = () => {
    gameArea.innerHTML = `
      <div class="status-bar">
        <p>🌍 Lives: <span id="hp">${"❤".repeat(earthHP)}${"♡".repeat(3 - earthHP)}</span></p>
        <p>🌀 Round: ${round}/5</p>
        <p>🏆 Points: <span id="score">${score}</span></p>
      </div>

      <div class="meteor-zone">
        <div class="card meteor-card" id="meteor">
          <img src="${meteor.img || "/assets/cards/meteor_placeholder.png"}" alt="${meteor.name}">
          <div class="card-info">
            <h3>${meteor.name}</h3>
            <p>${meteor.type}</p>
            <p>Size: ${meteor.size}</p>
            <p>Speed: ${meteor.speed} km/s</p>
          </div>
        </div>
      </div>

      <h3 class="defense-title">Select your defense</h3>
      <div class="defense-grid"></div>

      <div class="controls">
        <button id="resolve-btn" class="btn">Resolve round</button>
        <button id="next-btn" class="btn disabled">Next</button>
        <button id="reset-btn" class="btn hidden">Reset</button>
      </div>

      <div class="result-text" id="result-text"></div>
    `;

    renderDefenses();
    attachEvents();
  };

  /**
   * Renders defense cards in the grid
   * @returns {void} Returns no value, creates DOM elements and adds them to the defense grid
   */
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

  /**
   * Attaches event listeners to interactive game elements
   * @returns {void} Returns no value, configures event handlers
   */
  const attachEvents = () => {
    document.querySelectorAll(".defense-card").forEach((card) => {
      card.addEventListener("click", () => selectDefense(card));
    });

    document.getElementById("resolve-btn").addEventListener("click", resolveRound);
    document.getElementById("next-btn").addEventListener("click", nextRound);
    document.getElementById("reset-btn").addEventListener("click", resetGame);
  };

  // ==================== DEFENSE SELECTION ====================
  /**
   * Handles selection and deselection of defense cards
   * @param {HTMLElement} cardEl - DOM element of the clicked card
   * @returns {void} Returns no value, modifies the 'selected' array and card CSS classes
   */
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

  // ==================== CORRECTED RESULTS LOGIC ====================
  /**
   * Calculates the effective size of the meteorite considering NEO Surveyor effect
   * @param {string} baseSize - Original meteorite size (S, M, L, XL)
   * @param {boolean} hasSurvey - Whether NEO Surveyor is being used
   * @returns {string} Effective meteorite size after applying NEO Surveyor
   */
  const effectiveSize = (baseSize, hasSurvey) => {
    if (!hasSurvey) return baseSize;
    const idx = sizeOrder.indexOf(baseSize);
    return sizeOrder[Math.max(0, idx - 1)];
  };

  /**
   * Resolves the current round applying combat logic between defenses and meteorite
   * @returns {void} Returns no value, but modifies game state (score, lives, etc.)
   */
  const resolveRound = () => {
    if (resolved || selected.length === 0) return;

    const resultText = document.getElementById("result-text");
    const usingSurvey = selected.includes("neo");
    const usingDart = selected.includes("dart");
    const using1033 = selected.includes("1033");
    const effSize = effectiveSize(meteor.size, usingSurvey);
    let success = false;
    let comboBonus = false;

    // Main rules
    if (usingDart && (effSize === "S" || effSize === "M")) success = true;
    if (!success && using1033 && (effSize === "M" || effSize === "L") && meteor.speed <= 20) success = true;

    // Special collaboration
    if (!success && selected.includes("collab") && usingSurvey && (usingDart || using1033)) {
      success = Math.random() < 0.6;
      comboBonus = success;
    }

    // Result - CORRECTED VALIDATION
    if (success) {
      resultText.textContent = "✅ Successful defense! Earth is safe.";
      wins++;
      score += 100 + (comboBonus ? 200 : 0);
      animateSuccess();
    } else {
      resultText.textContent = "💥 Failed impact. Earth suffers damage.";
      earthHP = Math.max(0, earthHP - 1);
      score = Math.max(0, score - 50);
      animateFail();
    }

    updateScore();
    updateHPDisplay();
    resolved = true;
    document.getElementById("resolve-btn").classList.add("disabled");
    
    // CORRECTED: Always enable "Next" after resolving
    document.getElementById("next-btn").classList.remove("disabled");

    checkGameOver();
  };

  /**
   * Executes success animation when defense is successful
   * @returns {void} Returns no value, adds and removes CSS animation class
   */
  const animateSuccess = () => {
    const meteorEl = document.getElementById("meteor");
    meteorEl.classList.add("explode");
    setTimeout(() => meteorEl.classList.remove("explode"), 1000);
  };

  /**
   * Executes failure animation when defense fails
   * @returns {void} Returns no value, adds and removes CSS animation class
   */
  const animateFail = () => {
    const meteorEl = document.getElementById("meteor");
    meteorEl.classList.add("shake");
    setTimeout(() => meteorEl.classList.remove("shake"), 1000);
  };

  // ==================== CORRECTED FLOW CONTROL ====================
  /**
   * Advances to the next game round
   * @returns {void} Returns no value, resets round variables and renders new state
   */
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

  /**
   * Checks if the game has ended (victory or defeat) and updates the interface
   * @returns {void} Returns no value, modifies DOM elements and stops audio according to result
   */
  const checkGameOver = () => {
    const resetBtn = document.getElementById("reset-btn");
    const nextBtn = document.getElementById("next-btn");
    const resultText = document.getElementById("result-text");

    if (earthHP <= 0) {
      resultText.textContent = "☠️ Game over — Earth was impacted.";
      nextBtn.classList.add("disabled");
      resetBtn.classList.remove("hidden");
      stopAudio(); // Stop music when losing
    } else if (wins >= 5) {
      resultText.textContent = "🌎 Victory! You defended Earth for 5 rounds.";
      nextBtn.classList.add("disabled");
      resetBtn.classList.remove("hidden");
      stopAudio(); // Stop music when winning
    }
  };

  /**
   * Completely resets the game to its initial state
   * @returns {void} Returns no value, resets all state variables and restarts audio
   */
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
    stopAudio(); // Stop previous music
    initAudio(); // Restart music
    renderBoard();
  };

  /**
   * Updates the score display in the DOM
   * @returns {void} Returns no value, modifies the textContent of the score element
   */
  const updateScore = () => {
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
      scoreElement.textContent = score;
    }
  };

  // ==================== CORRECTED GAME START ====================
  startBtn.addEventListener("click", () => {
    // Start game audio
    initAudio();
    
    // Start first round
    meteor = randomMeteor();
    startBtn.style.display = "none";
    renderBoard();
  });
});