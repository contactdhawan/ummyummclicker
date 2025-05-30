// ========== GAME STATE ==========
const gameState = {
  lollipops: 0,
  lps: 0,
  clickBonus: 0,
  clicks: 0,
  buildings: [],
  clickBuildings: [],
  upgrades: [],
  achievements: [],
  shadowAchievements: [],
  prestige: {
    cores: 0,
    resurrections: 0,
    lastCoreTime: Date.now()
  },
  giftsSent: 0,
  giftsReceived: 0,
  goldenBunnies: 0,
  wrathEnabled: false,
  name: "",
  hacked: false,
  lastTick: Date.now()
};

// ========== BUILDINGS ==========
const buildingTypes = [
  { name: "Burrow", baseCost: 15, baseLps: 0.1 },
  { name: "Jelly Farm", baseCost: 100, baseLps: 1 },
  { name: "Cotton Candy Field", baseCost: 500, baseLps: 5 },
  { name: "Chocolate Mine", baseCost: 1500, baseLps: 10 },
  { name: "Lick Launcher", baseCost: 5000, baseLps: 25 },
  { name: "BunBot", baseCost: 20000, baseLps: 75 },
  { name: "Candy Lab", baseCost: 100000, baseLps: 150 },
  { name: "Quantum Warren", baseCost: 300000, baseLps: 500 },
  { name: "Licorice Reactor", baseCost: 1000000, baseLps: 1500 },
  { name: "Gummy Foundry", baseCost: 5000000, baseLps: 4000 },
  { name: "Bunny Colony", baseCost: 20000000, baseLps: 9000 },
  { name: "Sugar Mill", baseCost: 100000000, baseLps: 18000 },
  { name: "Candy Cyclotron", baseCost: 500000000, baseLps: 35000 },
  { name: "Buniversal Core", baseCost: 2500000000, baseLps: 70000 },
  { name: "Sweet Shipyard", baseCost: 10000000000, baseLps: 140000 },
  { name: "Plush Planet", baseCost: 50000000000, baseLps: 280000 },
  { name: "Caramel Comet", baseCost: 200000000000, baseLps: 560000 },
  { name: "Nougat Nebula", baseCost: 1000000000000, baseLps: 1100000 },
  { name: "Fudge Forge", baseCost: 5000000000000, baseLps: 2200000 },
  { name: "Sprinkle Station", baseCost: 20000000000000, baseLps: 4400000 },
  { name: "Sugar Sun", baseCost: 100000000000000, baseLps: 8800000 },
  { name: "Candyverse Gateway", baseCost: 500000000000000, baseLps: 15000000 },
  { name: "Bunnyverse Node", baseCost: 1e15, baseLps: 25000000 },
  { name: "Lollipop Lattice", baseCost: 5e15, baseLps: 40000000 },
  { name: "Hyper Hive", baseCost: 1e16, baseLps: 70000000 },
  { name: "Pastel Portal", baseCost: 5e16, baseLps: 1e8 },
  { name: "Sweet Singularity", baseCost: 1e17, baseLps: 2e8 },
  { name: "Candy Code Compiler", baseCost: 5e17, baseLps: 4e8 },
  { name: "Divine Dessert", baseCost: 1e18, baseLps: 8e8 },
  { name: "Final Flavor", baseCost: 5e18, baseLps: 1.6e9 }
];

// ========== CLICK BUILDINGS ==========
const clickBuildingTypes = [
  { name: "Paw Pad", baseCost: 100, baseClickBonus: 0.5 },
  { name: "Sugar Nail", baseCost: 500, baseClickBonus: 1 },
  { name: "Bunny Ring", baseCost: 1200, baseClickBonus: 2 },
  { name: "Lick Knuckle", baseCost: 3000, baseClickBonus: 4 },
  { name: "Caramel Claw", baseCost: 7000, baseClickBonus: 6 },
  { name: "Gummy Gauntlet", baseCost: 15000, baseClickBonus: 10 },
  { name: "Sticky Slap Glove", baseCost: 30000, baseClickBonus: 16 },
  { name: "Candy Grip Enhancer", baseCost: 60000, baseClickBonus: 25 },
  { name: "Fudge Finger Extension", baseCost: 120000, baseClickBonus: 40 },
  { name: "Marshmallow Mitt", baseCost: 250000, baseClickBonus: 60 },
  { name: "Neon Bunny Fist", baseCost: 500000, baseClickBonus: 90 },
  { name: "Atomic Tappinator", baseCost: 1000000, baseClickBonus: 140 },
  { name: "Jellystrike Controller", baseCost: 2000000, baseClickBonus: 200 },
  { name: "Peppermint Plunger", baseCost: 4000000, baseClickBonus: 300 },
  { name: "Stickyburst Gauntlet", baseCost: 8000000, baseClickBonus: 450 },
  { name: "Quantum Tap Accelerator", baseCost: 16000000, baseClickBonus: 650 },
  { name: "Bunny Palm Cannon", baseCost: 30000000, baseClickBonus: 900 },
  { name: "Lickstorm Conductor", baseCost: 60000000, baseClickBonus: 1250 },
  { name: "Bunnyforce Enhancer", baseCost: 120000000, baseClickBonus: 1800 },
  { name: "Galactic Paw Amplifier", baseCost: 250000000, baseClickBonus: 2500 },
  { name: "Warp Glove", baseCost: 500000000, baseClickBonus: 3400 },
  { name: "Singularity Snapper", baseCost: 1e9, baseClickBonus: 4500 },
  { name: "Sugar Pulse Engine", baseCost: 2e9, baseClickBonus: 6000 },
  { name: "Cosmic Click Frame", baseCost: 4e9, baseClickBonus: 8000 },
  { name: "Multitap Matrix", baseCost: 8e9, baseClickBonus: 10000 },
  { name: "Caramel Converter", baseCost: 1.6e10, baseClickBonus: 12500 },
  { name: "Tap Horizon Field", baseCost: 3e10, baseClickBonus: 16000 },
  { name: "Infinite Bunny Glove", baseCost: 6e10, baseClickBonus: 20000 },
  { name: "Candy Click Engine", baseCost: 1.2e11, baseClickBonus: 25000 },
  { name: "Final Tap Protocol", baseCost: 5e11, baseClickBonus: 30000 }
];

// ========== INITIALIZATION ==========
function initBuildings() {
  gameState.buildings = buildingTypes.map(b => ({ ...b, count: 0 }));
  gameState.clickBuildings = clickBuildingTypes.map(c => ({ ...c, count: 0 }));
}

function calculateLps() {
  let total = 0;
  gameState.buildings.forEach(b => {
    total += b.baseLps * b.count;
  });
  gameState.lps = total * (1 + (gameState.prestige.cores * 0.01));
}

function calculateClickBonus() {
  let total = 0;
  gameState.clickBuildings.forEach(b => {
    total += b.baseClickBonus * b.count;
  });
  gameState.clickBonus = total * (1 + (gameState.prestige.cores * 0.01));
}

// ========== CLICK ==========
function clickBunny() {
  const amount = 1 + gameState.clickBonus;
  gameState.lollipops += amount;
  gameState.clicks++;
  updateDisplay();
  maybeSpawnGolden();
  animateClickBunnyDrop();
}

document.addEventListener("input", () => {
  const nameInput = document.getElementById("playerName");
  if (nameInput && nameInput.value !== gameState.name) {
    gameState.name = nameInput.value;
    checkNameAchievement();
  }
});

function updateDisplay() {
  document.getElementById("lollipops").textContent = `Lollipops: ${Math.floor(gameState.lollipops)}`;
  document.getElementById("lps").textContent = `Lollipops per second: ${gameState.lps.toFixed(1)}`;
}
// ========== BUILDING DISPLAY ==========
function buyBuilding(index) {
  const b = gameState.buildings[index];
  const cost = Math.floor(b.baseCost * Math.pow(1.15, b.count));
  if (gameState.lollipops >= cost) {
    gameState.lollipops -= cost;
    b.count++;
    calculateLps();
    updateBuildings();
    updateDisplay();
  }
}

function updateBuildings() {
  const container = document.getElementById("buildings-list");
  container.innerHTML = "";
  gameState.buildings.forEach((b, i) => {
    const cost = Math.floor(b.baseCost * Math.pow(1.15, b.count));
    const div = document.createElement("div");
    div.className = "building-entry";
    div.onclick = () => buyBuilding(i);

    const img = document.createElement("img");
    img.src = `img/buildings/${b.name.toLowerCase().replace(/ /g, "-")}.png`;
    const span = document.createElement("span");
    span.textContent = `${b.name} (${b.count}) - ${cost} LP`;

    div.appendChild(img);
    div.appendChild(span);
    container.appendChild(div);
  });
}

// ========== CLICK BUILDING DISPLAY ==========
function buyClickBuilding(index) {
  const b = gameState.clickBuildings[index];
  const cost = Math.floor(b.baseCost * Math.pow(1.15, b.count));
  if (gameState.lollipops >= cost) {
    gameState.lollipops -= cost;
    b.count++;
    calculateClickBonus();
    updateClickBuildings();
    updateDisplay();
  }
}

function updateClickBuildings() {
  const container = document.getElementById("click-buildings-list");
  container.innerHTML = "";
  gameState.clickBuildings.forEach((b, i) => {
    const cost = Math.floor(b.baseCost * Math.pow(1.15, b.count));
    const div = document.createElement("div");
    div.className = "click-building-entry";
    div.onclick = () => buyClickBuilding(i);

    const img = document.createElement("img");
    img.src = `img/clickbuildings/${b.name.toLowerCase().replace(/ /g, "-")}.png`;
    const span = document.createElement("span");
    span.textContent = `${b.name} (${b.count}) - ${cost} LP`;

    div.appendChild(img);
    div.appendChild(span);
    container.appendChild(div);
  });
}

// ========== UPGRADE SYSTEM ==========
const globalUpgrades = [
  {
    name: "Sugar Boost",
    cost: 1000,
    effect: () => { gameState.lps *= 1.1 },
    unlocked: () => gameState.lollipops >= 1000
  },
  {
    name: "Click Multiplier",
    cost: 2000,
    effect: () => { gameState.clickBonus *= 1.2 },
    unlocked: () => gameState.clickBuildings[0]?.count >= 5
  }
];

function updateUpgrades() {
  const tab = document.getElementById("upgrades-tab");
  tab.innerHTML = "";
  globalUpgrades.forEach(upg => {
    if (upg.unlocked() && !gameState.upgrades.includes(upg.name)) {
      const div = document.createElement("div");
      div.className = "upgrade-entry";
      div.onclick = () => {
        if (gameState.lollipops >= upg.cost) {
          gameState.lollipops -= upg.cost;
          gameState.upgrades.push(upg.name);
          upg.effect();
          updateUpgrades();
          updateDisplay();
        }
      };
      const img = document.createElement("img");
      img.src = `img/upgrades/${upg.name.toLowerCase().replace(/ /g, "-")}.png`;
      const span = document.createElement("span");
      span.textContent = `${upg.name} - ${upg.cost} LP`;
      div.appendChild(img);
      div.appendChild(span);
      tab.appendChild(div);
    }
  });
}

// ========== ACHIEVEMENTS ==========
const achievementList = [
  { name: "First Click", icon: "first-click.png", condition: () => gameState.clicks >= 1 },
  { name: "One Thousand Pops", icon: "1000-lp.png", condition: () => gameState.lollipops >= 1000 },
  { name: "Building Owner", icon: "building.png", condition: () => gameState.buildings.some(b => b.count >= 1) }
];

function checkAchievements() {
  achievementList.forEach(ach => {
    if (ach.condition() && !gameState.achievements.includes(ach.name)) {
      gameState.achievements.push(ach.name);
      document.getElementById("news").textContent = `🏆 Achievement Unlocked: ${ach.name}`;
    }
  });
}

function updateAchievements() {
  const tab = document.getElementById("achievements-tab");
  tab.innerHTML = "";
  achievementList.forEach(ach => {
    const div = document.createElement("div");
    div.className = "achievement-entry";
    const img = document.createElement("img");
    img.src = `img/achievements/${ach.icon}`;
    if (!gameState.achievements.includes(ach.name)) {
      img.classList.add("shadow");
    }
    const span = document.createElement("span");
    span.textContent = ach.name;
    div.appendChild(img);
    div.appendChild(span);
    tab.appendChild(div);
  });
}

// ========== SHADOW ACHIEVEMENTS ==========
function checkNameAchievement() {
  const name = gameState.name.toLowerCase();
  if ((name === "anirudh" || name === "ani bunny") && !gameState.shadowAchievements.includes("Name Trick")) {
    gameState.shadowAchievements.push("Name Trick");
    gameState.lps *= 0.75;
    document.getElementById("news").textContent = "👤 Shadow achievement unlocked: Nice name, but that’s not you, is it?";
  } else if (!(name === "anirudh" || name === "ani bunny") && gameState.shadowAchievements.includes("Name Trick")) {
    gameState.lps /= 0.75;
    gameState.shadowAchievements = gameState.shadowAchievements.filter(a => a !== "Name Trick");
  }
}

function sayopensesame() {
  if (!gameState.shadowAchievements.includes("Bunny Hacker")) {
    gameState.shadowAchievements.push("Bunny Hacker");
    document.getElementById("news").textContent = "👤 Shadow achievement: Good bunnies work. Smart bunnies hack.";
    gameState.hacked = true;
  }
}

// ========== TABS ==========
function switchTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.style.display = "none";
  });
  document.getElementById(`${tabId}-tab`).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#tab-buttons button").forEach(button => {
    button.addEventListener("click", () => {
      switchTab(button.getAttribute("data-tab"));
    });
  });
});
// ========== STATS TAB ==========
function updateStats() {
  const tab = document.getElementById("stats-tab");
  tab.innerHTML = `
    <p>Total Clicks: ${gameState.clicks}</p>
    <p>Total Lollipops: ${Math.floor(gameState.lollipops)}</p>
    <p>Lollipops per Second: ${gameState.lps.toFixed(1)}</p>
    <p>Lollipops per Click: ${(1 + gameState.clickBonus).toFixed(1)}</p>
    <p>Golden Bunnies: ${gameState.goldenBunnies}</p>
    <p>Resurrections: ${gameState.prestige.resurrections}</p>
    <p>Bunny Cores: ${gameState.prestige.cores}</p>
    <p>Gifts Sent: ${gameState.giftsSent}</p>
    <p>Gifts Received: ${gameState.giftsReceived}</p>
    <p>Shadow Achievements: ${gameState.shadowAchievements.length}</p>
  `;
}

// ========== SAVE / LOAD ==========
function manualSave() {
  localStorage.setItem("umyum_save", JSON.stringify(gameState));
}

function loadGame() {
  const data = localStorage.getItem("umyum_save");
  if (data) {
    try {
      Object.assign(gameState, JSON.parse(data));
      calculateLps();
      calculateClickBonus();
      updateBuildings();
      updateClickBuildings();
      updateUpgrades();
      updateAchievements();
      updateStats();
      updateDisplay();
      showPrestigeTab();
    } catch (e) {
      console.error("Load failed:", e);
    }
  }
}

function exportSave() {
  const code = btoa(JSON.stringify(gameState));
  prompt("Copy this save code:", code);
}

function importSave() {
  const code = prompt("Paste your save code:");
  try {
    Object.assign(gameState, JSON.parse(atob(code)));
    calculateLps();
    calculateClickBonus();
    updateBuildings();
    updateClickBuildings();
    updateUpgrades();
    updateAchievements();
    updateStats();
    showPrestigeTab();
    updateDisplay();
  } catch {
    alert("Invalid save code.");
  }
}

// ========== GIFT SYSTEM ==========
const usedGiftCodes = new Set();

function createGift() {
  const amount = parseInt(document.getElementById("giftAmount").value);
  if (amount && amount > 0 && amount <= gameState.lollipops) {
    gameState.lollipops -= amount;
    gameState.giftsSent++;
    const code = btoa(JSON.stringify({ amount, id: Date.now() }));
    document.getElementById("giftCode").value = code;
    updateDisplay();
  } else {
    alert("Invalid amount!");
  }
}

function acceptGift() {
  const code = document.getElementById("giftInput").value;
  try {
    const data = JSON.parse(atob(code));
    if (!usedGiftCodes.has(data.id)) {
      gameState.lollipops += data.amount;
      gameState.giftsReceived++;
      usedGiftCodes.add(data.id);
      document.getElementById("giftMessage").textContent = `🎁 Received ${data.amount} lollipops!`;
      updateDisplay();
    } else {
      document.getElementById("giftMessage").textContent = "This gift has already been used.";
    }
  } catch {
    document.getElementById("giftMessage").textContent = "Invalid gift code.";
  }
}

// ========== PRESTIGE ==========
function showPrestigeTab() {
  const tab = document.getElementById("prestige-tab");
  if (gameState.lollipops >= 1e12) {
    tab.innerHTML = `
      <h4>Bunny Resurrection</h4>
      <p>Reset everything for permanent Bunny Cores.</p>
      <p>Cores: ${gameState.prestige.cores}</p>
      <p><button onclick="doAscend()">Ascend</button></p>
    `;
  } else {
    tab.innerHTML = `<p>🔒 You need at least 1 trillion lollipops to ascend.</p>`;
  }
}

function doAscend() {
  const gained = Math.floor(gameState.lollipops / 1e11);
  if (confirm(`Reset for ${gained} Bunny Cores?`)) {
    gameState.prestige.cores += gained;
    gameState.prestige.resurrections++;
    Object.assign(gameState, {
      lollipops: 0, lps: 0, clickBonus: 0, clicks: 0,
      upgrades: [], achievements: [], goldenBunnies: 0,
      buildings: buildingTypes.map(b => ({ ...b, count: 0 })),
      clickBuildings: clickBuildingTypes.map(c => ({ ...c, count: 0 }))
    });
    calculateLps();
    calculateClickBonus();
    updateBuildings();
    updateClickBuildings();
    updateUpgrades();
    updateAchievements();
    updateDisplay();
    showPrestigeTab();
    document.getElementById("news").textContent = `🌀 Ascended! You gained ${gained} Bunny Cores!`;
  }
}

// ========== PASSIVE BUNNY CORE ==========
function checkPassiveCoreGrowth() {
  const now = Date.now();
  const msSinceLast = now - gameState.prestige.lastCoreTime;
  if (msSinceLast >= 1000 * 60 * 60 * 18) {
    gameState.prestige.cores++;
    gameState.prestige.lastCoreTime = now;
    document.getElementById("news").textContent = `✨ A Bunny Core has grown!`;
  }
}

// ========== FLOATING BUNNY ==========
function animateClickBunnyDrop() {
  const bunny = document.createElement("img");
  bunny.src = "img/bunny.png";
  bunny.style.position = "absolute";
  bunny.style.width = "32px";
  bunny.style.left = Math.random() * 150 + 50 + "px";
  bunny.style.top = "100px";
  bunny.style.opacity = "1";
  bunny.style.transition = "top 1s ease, opacity 1s ease";
  bunny.style.zIndex = 1000;
  document.body.appendChild(bunny);

  setTimeout(() => {
    bunny.style.top = "500px";
    bunny.style.opacity = "0";
  }, 10);

  setTimeout(() => {
    bunny.remove();
  }, 1000);
}

// ========== GOLDEN BUNNIES ==========
function maybeSpawnGolden() {
  if (Math.random() < 0.01) {
    const bonus = Math.floor(gameState.lps * 10 + 50);
    gameState.lollipops += bonus;
    gameState.goldenBunnies++;
    document.getElementById("news").textContent = `🌟 Golden Bunny! You gained ${bonus} lollipops!`;
    updateDisplay();
  }
}

// ========== BUNNYPEDIA ==========
function updateBunnypedia() {
  const tab = document.getElementById("bunnypedia-tab");
  tab.innerHTML = "<h4>📖 Bunnypedia</h4>";

  tab.innerHTML += "<h5>Discovered Buildings:</h5>";
  gameState.buildings.forEach(b => {
    if (b.count > 0) {
      tab.innerHTML += `<p>${b.name} (${b.count})</p>`;
    }
  });

  tab.innerHTML += "<h5>Click Buildings:</h5>";
  gameState.clickBuildings.forEach(b => {
    if (b.count > 0) {
      tab.innerHTML += `<p>${b.name} (${b.count})</p>`;
    }
  });

  tab.innerHTML += "<h5>Upgrades:</h5>";
  gameState.upgrades.forEach(u => {
    tab.innerHTML += `<p>${u}</p>`;
  });

  tab.innerHTML += "<h5>Achievements:</h5>";
  gameState.achievements.forEach(a => {
    tab.innerHTML += `<p>${a}</p>`;
  });

  tab.innerHTML += "<h5>Shadow Achievements:</h5>";
  gameState.shadowAchievements.forEach(a => {
    tab.innerHTML += `<p style="color: purple;">${a}</p>`;
  });
}

// ========== PROGRESS BAR ==========
function updateProgress() {
  const earned = gameState.achievements.length + gameState.shadowAchievements.length;
  const total = 100;
  const percent = Math.min(100, (earned / total) * 100);
  document.getElementById("progress-bar-fill").style.width = percent + "%";
}

// ========== NEWS ==========
const newsLines = [
  "Bunnies nibble on reality itself.",
  "Scientists discover that jelly is sentient.",
  "Golden bunny spotted in local warren!",
  "Quantum lick field destabilizing…",
  "The Candyverse is expanding faster than expected!",
  "Licorice reactor hits critical sweetness levels!",
  "Sugar economy crashes, gummy bailouts incoming.",
  "Sweetness levels approaching singularity!",
  "Is your bunny plotting to overthrow you?"
];

function randomNews() {
  const line = newsLines[Math.floor(Math.random() * newsLines.length)];
  document.getElementById("news").textContent = line;
}

// ========== GAME LOOP ==========
function gameLoop() {
  const now = Date.now();
  const delta = (now - gameState.lastTick) / 1000;
  gameState.lollipops += gameState.lps * delta;
  gameState.lastTick = now;

  checkAchievements();
  checkPassiveCoreGrowth();
  updateDisplay();
  updateStats();
  updateProgress();
}

// ========== START ==========
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bunny").addEventListener("click", clickBunny);

  initBuildings();
  loadGame();
  updateBuildings();
  updateClickBuildings();
  updateUpgrades();
  updateAchievements();
  updateStats();
  updateBunnypedia();
  updateProgress();
  switchTab("stats");
  showPrestigeTab();

  setInterval(gameLoop, 1000 / 30);   // 30 FPS
  setInterval(randomNews, 10000);     // Every 10s
  setInterval(manualSave, 15000);     // Every 15s
});
