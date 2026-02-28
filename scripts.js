// Настройки API для Cloudflare Worker
// Обязательно замените этот URL на ваш реальный после деплоя воркера!
const API_BASE = "https://your-worker-url.workers.dev";

// --- БАЗА ДАННЫХ (Пулы по умолчанию) ---
const DEFAULT_PLACEHOLDER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='64' height='64' fill='%232d3436'/><text x='50%' y='50%' font-family='Arial' font-size='24' fill='%23636e72' dominant-baseline='middle' text-anchor='middle'>?</text></svg>";

const ENEMIES_BOSSES = [
    { id: "boss_01", name: "Stellar Devourer", element: "Physical", defaultLevel: 95, icon: "assets/enemies/boss_stellar.png" },
    { id: "boss_02", name: "Void Knight", element: "Electro", defaultLevel: 90, icon: "assets/enemies/boss_void.png" }
];

const ENEMIES_WEEKLY = [
    { id: "week_01", name: "Abyssal Dragon", element: "Water", defaultLevel: 95, icon: "assets/enemies/week_dragon.png" },
    { id: "week_02", name: "Crimson Witch", element: "Fire", defaultLevel: 95, icon: "assets/enemies/week_witch.png" }
];

const CHARACTERS = [
    { id: "char_01", name: "Aria", element: "Fire", icon: "assets/chars/aria.png" },
    { id: "char_02", name: "Kael", element: "Water", icon: "assets/chars/kael.png" },
    { id: "char_03", name: "Nova", element: "Electro", icon: "assets/chars/nova.png" },
    { id: "char_04", name: "Zane", element: "Physical", icon: "assets/chars/zane.png" }
];

const SPECIAL_CHALLENGES = [
    {
        id: "sc_giga_trash",
        name: "ГИГА ЧАТ МУСОРНЫЙ БАК",
        price: "499₸",
        description: "Мусорный бак с 2 000 000 HP. Появляется как особый противник/ивент.",
        effect: { type: "spawn_special", hp: 2000000 }
    }
];

// --- СОСТОЯНИЕ ПРИЛОЖЕНИЯ ---
let state = {
    levelName: "My Custom Level",
    waves: [
        { enemies: [] }, { enemies: [] }, { enemies: [] }, { enemies: [] }
    ],
    party: [null, null, null, null],
    challenges: { unlocked: [], active: [] },
    meta: { createdAt: new Date().toISOString(), version: 1 }
};

let customEnemiesPool = [];
let appSettings = { autoSave: false };

// Переменные интерфейса
let currentActiveWaveIndex = null;
let currentActiveSlotIndex = null;
let currentEnemyTab = 'bosses';
let pendingPurchaseId = null;

// --- ИНИЦИАЛИЗАЦИЯ ---
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    setupEventListeners();
    renderAll();
});

function getImagePath(path) {
    return path || DEFAULT_PLACEHOLDER;
}

window.imgError = function(image) {
    image.onerror = "";
    image.src = DEFAULT_PLACEHOLDER;
    return true;
}

// --- РЕНДЕРИНГ ---
function renderAll() {
    document.getElementById('level-name-input').value = state.levelName;
    document.getElementById('autosave-toggle').checked = appSettings.autoSave;
    renderParty();
    renderWaves();
    renderChallenges();
    triggerAutoSave();
}

function renderParty() {
    const container = document.getElementById('party-container');
    container.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
        const char = state.party[i];
        const slot = document.createElement('div');
        slot.className = 'char-slot';
        
        if (char) {
            slot.innerHTML = `
                <img src="${getImagePath(char.icon)}" alt="${char.name}" onerror="imgError(this)">
                <button class="btn-remove-char" onclick="removeCharacter(${i}, event)">✕</button>
            `;
        } else {
            slot.innerHTML = `<span style="color:var(--text-muted); font-size:24px;">+</span>`;
            slot.onclick = () => openCharacterPicker(i);
        }
        container.appendChild(slot);
    }
}

function renderWaves() {
    const container = document.getElementById('waves-container');
    container.innerHTML = '';

    state.waves.forEach((wave, wIndex) => {
        const waveCard = document.createElement('div');
        waveCard.className = 'wave-card glass';
        
        const content = document.createElement('div');
        content.className = 'wave-content';
        content.innerHTML = `<div class="wave-header"><h3>Wave ${wIndex + 1}</h3></div>`;
        
        const grid = document.createElement('div');
        grid.className = 'enemies-grid';
        
        wave.enemies.forEach((enemy, eIndex) => {
            const eCard = document.createElement('div');
            eCard.className = 'enemy-card';
            eCard.innerHTML = `
                <button class="btn-remove-enemy" onclick="removeEnemy(${wIndex}, ${eIndex})" title="Remove">✕</button>
                <img src="${getImagePath(enemy.icon)}" alt="${enemy.name}" onerror="imgError(this)">
                <div class="name" title="${enemy.name}">${enemy.name}</div>
                <input type="number" class="enemy-level" value="${enemy.level}" min="1" max="95" 
                       onchange="updateEnemyLevel(${wIndex}, ${eIndex}, this.value)">
            `;
            grid.appendChild(eCard);
        });

        const addBtn = document.createElement('button');
        addBtn.className = 'add-enemy-btn';
        addBtn.innerHTML = '+';
        addBtn.onclick = () => openEnemyPicker(wIndex);
        grid.appendChild(addBtn);

        content.appendChild(grid);
        waveCard.appendChild(content);

        const controls = document.createElement('div');
        controls.className = 'wave-controls';
        controls.innerHTML = `
            <button class="btn btn-secondary" onclick="moveWave(${wIndex}, -1)" ${wIndex === 0 ? 'disabled' : ''}>↑</button>
            <button class="btn btn-secondary" onclick="moveWave(${wIndex}, 1)" ${wIndex === state.waves.length - 1 ? 'disabled' : ''}>↓</button>
            <button class="btn btn-danger" onclick="removeWave(${wIndex})">🗑</button>
        `;
        waveCard.appendChild(controls);

        container.appendChild(waveCard);
    });
}

// --- ЛОГИКА ВОЛН И ВРАГОВ ---
function addWave() {
    state.waves.push({ enemies: [] });
    renderAll();
}

function removeWave(index) {
    if(confirm('Delete this wave?')) {
        state.waves.splice(index, 1);
        renderAll();
    }
}

function moveWave(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= state.waves.length) return;
    const temp = state.waves[index];
    state.waves[index] = state.waves[newIndex];
    state.waves[newIndex] = temp;
    renderAll();
}

function removeEnemy(wIndex, eIndex) {
    state.waves[wIndex].enemies.splice(eIndex, 1);
    renderAll();
}

function updateEnemyLevel(wIndex, eIndex, newLevel) {
    let lvl = parseInt(newLevel) || 95;
    if (lvl > 95) lvl = 95;
    if (lvl < 1) lvl = 1;
    state.waves[wIndex].enemies[eIndex].level = lvl;
    triggerAutoSave();
    renderAll();
}

// --- ПИКЕР ВРАГОВ ---
function openEnemyPicker(wIndex) {
    currentActiveWaveIndex = wIndex;
    document.getElementById('enemy-picker-modal').classList.remove('hidden');
    switchEnemyTab('bosses'); 
}

function switchEnemyTab(tabId) {
    currentEnemyTab = tabId;
    
    document.querySelectorAll('.sidebar .tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    const form = document.getElementById('custom-enemy-form');
    const grid = document.getElementById('enemy-grid');
    const toolbar = document.getElementById('enemy-toolbar');

    if (tabId === 'custom-create') {
        form.classList.remove('hidden');
        grid.classList.add('hidden');
        toolbar.classList.add('hidden');
    } else {
        form.classList.add('hidden');
        grid.classList.remove('hidden');
        toolbar.classList.remove('hidden');
        renderEnemyPickerList();
    }
}

function renderEnemyPickerList() {
    const grid = document.getElementById('enemy-grid');
    const search = document.getElementById('enemy-search').value.toLowerCase();
    const sort = document.getElementById('enemy-sort').value;
    const filter = document.getElementById('enemy-filter').value;

    let pool = [];
    if (currentEnemyTab === 'bosses') pool = [...ENEMIES_BOSSES];
    else if (currentEnemyTab === 'weekly') pool = [...ENEMIES_WEEKLY];
    else if (currentEnemyTab === 'custom-list') pool = [...customEnemiesPool];

    let filtered = pool.filter(e => {
        const matchesSearch = e.name.toLowerCase().includes(search);
        const matchesFilter = filter === 'all' || e.element === filter;
        return matchesSearch && matchesFilter;
    });

    if (sort === 'az') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') filtered.sort((a, b) => b.name.localeCompare(a.name));

    grid.innerHTML = '';
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-muted); grid-column: 1/-1;">No enemies found.</p>';
        return;
    }

    filtered.forEach(enemy => {
        const card = document.createElement('div');
        card.className = 'picker-card';
        const sliderId = `slider_${enemy.id}_${Date.now()}`;
        const valId = `val_${enemy.id}_${Date.now()}`;
        
        card.innerHTML = `
            <img src="${getImagePath(enemy.icon)}" alt="${enemy.name}" onerror="imgError(this)">
            <div class="name"><strong>${enemy.name}</strong></div>
            ${enemy.element ? `<div class="element">${enemy.element}</div>` : ''}
            <div class="level-selector">
                <label>Level: <span id="${valId}">${enemy.defaultLevel}</span></label>
                <input type="range" id="${sliderId}" min="1" max="95" value="${enemy.defaultLevel}" class="level-slider" oninput="document.getElementById('${valId}').innerText = this.value">
            </div>
            <button class="btn btn-primary w-100" onclick="handleAddEnemyFromPicker('${enemy.id}', '${enemy.name}', '${enemy.icon}', '${sliderId}')">Add</button>
        `;
        grid.appendChild(card);
    });
}

function handleAddEnemyFromPicker(id, name, icon, sliderId) {
    const levelVal = document.getElementById(sliderId).value;
    addEnemyToCurrentWave(id, name, parseInt(levelVal), icon);
}

function addEnemyToCurrentWave(id, name, level, icon) {
    if (currentActiveWaveIndex !== null) {
        state.waves[currentActiveWaveIndex].enemies.push({
            id: id,
            name: name,
            level: level || 95,
            icon: icon
        });
        closeModal('enemy-picker-modal');
        renderAll();
    }
}

function createCustomEnemy() {
    const name = document.getElementById('ce-name').value.trim();
    const level = parseInt(document.getElementById('ce-level').value) || 95;
    const element = document.getElementById('ce-element').value.trim();
    const icon = document.getElementById('ce-icon').value.trim();

    if (!name) { alert("Please enter a name"); return; }

    const newEnemy = {
        id: "custom_" + Date.now(),
        name: name,
        element: element,
        defaultLevel: level,
        icon: icon
    };

    customEnemiesPool.push(newEnemy);
    
    addEnemyToCurrentWave(newEnemy.id, newEnemy.name, newEnemy.defaultLevel, newEnemy.icon);
    
    document.getElementById('ce-name').value = '';
    document.getElementById('ce-element').value = '';
    document.getElementById('ce-icon').value = '';
}

// --- ПИКЕР ПЕРСОНАЖЕЙ ---
function openCharacterPicker(slotIndex) {
    currentActiveSlotIndex = slotIndex;
    document.getElementById('char-picker-modal').classList.remove('hidden');
    renderCharPickerList();
}

function renderCharPickerList() {
    const grid = document.getElementById('char-grid');
    const search = document.getElementById('char-search').value.toLowerCase();
    const sort = document.getElementById('char-sort').value;

    let filtered = CHARACTERS.filter(c => c.name.toLowerCase().includes(search));

    if (sort === 'az') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') filtered.sort((a, b) => b.name.localeCompare(a.name));

    grid.innerHTML = '';
    filtered.forEach(char => {
        const card = document.createElement('div');
        card.className = 'picker-card';
        card.innerHTML = `
            <img src="${getImagePath(char.icon)}" alt="${char.name}" onerror="imgError(this)">
            <div class="name"><strong>${char.name}</strong></div>
            <button class="btn btn-primary w-100" onclick="selectCharacter('${char.id}')">Select</button>
        `;
        grid.appendChild(card);
    });
}

function selectCharacter(charId) {
    const char = CHARACTERS.find(c => c.id === charId);
    if (char && currentActiveSlotIndex !== null) {
        state.party[currentActiveSlotIndex] = { ...char };
        closeModal('char-picker-modal');
        renderAll();
    }
}

function removeCharacter(slotIndex, event) {
    event.stopPropagation();
    state.party[slotIndex] = null;
    renderAll();
}

// --- ЧЕЛЛЕНДЖИ (CHALLENGES) ---
function renderChallenges() {
    const container = document.getElementById('challenges-container');
    container.innerHTML = '';

    SPECIAL_CHALLENGES.forEach(challenge => {
        const isUnlocked = state.challenges.unlocked.includes(challenge.id);
        const isActive = state.challenges.active.includes(challenge.id);

        const card = document.createElement('div');
        card.className = `challenge-card ${isActive ? 'active' : ''}`;
        
        let buttonHTML = '';
        if (!isUnlocked) {
            buttonHTML = `<button class="btn btn-primary w-100" onclick="openPurchaseModal('${challenge.id}')">Unlock / Buy</button>`;
        } else if (isActive) {
            buttonHTML = `<button class="btn btn-secondary w-100" onclick="toggleChallenge('${challenge.id}')">Deactivate</button>`;
        } else {
            buttonHTML = `<button class="btn btn-secondary w-100" style="border-color: var(--accent); color: var(--accent);" onclick="toggleChallenge('${challenge.id}')">Activate</button>`;
        }

        card.innerHTML = `
            ${!isUnlocked ? `<div class="challenge-price">${challenge.price}</div>` : ''}
            <h4>${challenge.name}</h4>
            <p>${challenge.description}</p>
            ${buttonHTML}
        `;
        container.appendChild(card);
    });
}

function openPurchaseModal(challengeId) {
    const challenge = SPECIAL_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return;
    
    pendingPurchaseId = challengeId;
    document.getElementById('purchase-text').innerHTML = `Unlock <strong>${challenge.name}</strong> for ${challenge.price}?`;
    document.getElementById('enemy-picker-modal').classList.add('hidden'); 
    document.getElementById('char-picker-modal').classList.add('hidden');
    document.getElementById('purchase-modal').classList.remove('hidden');
    
    document.getElementById('btn-confirm-purchase').onclick = () => {
        if (pendingPurchaseId) {
            state.challenges.unlocked.push(pendingPurchaseId);
            closeModal('purchase-modal');
            renderAll();
        }
    };
}

function toggleChallenge(challengeId) {
    const index = state.challenges.active.indexOf(challengeId);
    if (index > -1) {
        state.challenges.active.splice(index, 1);
    } else {
        state.challenges.active.push(challengeId);
    }
    triggerAutoSave();
    renderAll();
}

// --- УТИЛИТЫ И СОБЫТИЯ ---
function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    currentActiveWaveIndex = null;
    currentActiveSlotIndex = null;
    pendingPurchaseId = null;
}

function setupEventListeners() {
    document.getElementById('level-name-input').addEventListener('change', (e) => {
        state.levelName = e.target.value;
        triggerAutoSave();
    });

    document.getElementById('btn-add-wave').addEventListener('click', addWave);

    document.querySelectorAll('.sidebar .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchEnemyTab(e.target.dataset.tab));
    });

    document.getElementById('enemy-search').addEventListener('input', renderEnemyPickerList);
    document.getElementById('enemy-sort').addEventListener('change', renderEnemyPickerList);
    document.getElementById('enemy-filter').addEventListener('change', renderEnemyPickerList);

    document.getElementById('btn-create-custom').addEventListener('click', createCustomEnemy);

    document.getElementById('char-search').addEventListener('input', renderCharPickerList);
    document.getElementById('char-sort').addEventListener('change', renderCharPickerList);

    document.getElementById('btn-export').addEventListener('click', exportJson);
    document.getElementById('btn-import').addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('import-file').addEventListener('change', importJson);
    document.getElementById('btn-reset').addEventListener('click', resetLevel);
    
    document.getElementById('autosave-toggle').addEventListener('change', (e) => {
        appSettings.autoSave = e.target.checked;
        localStorage.setItem('levelBuilderSettings', JSON.stringify(appSettings));
        if(appSettings.autoSave) saveState();
        else localStorage.removeItem('levelBuilderSave');
    });

    // Cloudflare API кнопки
    document.getElementById('btn-send-level').addEventListener('click', sendLevel);
    document.getElementById('btn-find-ticket').addEventListener('click', findLevelByTicket);
    document.getElementById('btn-copy-ticket').addEventListener('click', copyTicket);

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
}

// --- ИМПОРТ / ЭКСПОРТ / СОХРАНЕНИЕ ---
function exportJson() {
    state.meta.updatedAt = new Date().toISOString();
    const exportData = {
        ...state,
        customPool: customEnemiesPool 
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "custom-level.json");
    document.body.appendChild(downloadAnchorNode); 
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importJson(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const parsed = JSON.parse(e.target.result);
            if (parsed.waves && parsed.party) {
                state = {
                    levelName: parsed.levelName || "Imported Level",
                    waves: parsed.waves,
                    party: parsed.party,
                    challenges: parsed.challenges || { unlocked: [], active: [] },
                    meta: parsed.meta || state.meta
                };
                customEnemiesPool = parsed.customPool || [];
                renderAll();
                alert("Level imported successfully!");
            } else {
                alert("Invalid JSON format");
            }
        } catch (error) {
            alert("Error parsing JSON");
        }
    };
    reader.readAsText(file);
    event.target.value = ''; 
}

function resetLevel() {
    if(confirm("Are you sure you want to reset everything?")) {
        state = {
            levelName: "My Custom Level",
            waves: [{ enemies: [] }, { enemies: [] }, { enemies: [] }, { enemies: [] }],
            party: [null, null, null, null],
            challenges: { unlocked: [], active: [] },
            meta: { createdAt: new Date().toISOString(), version: 1 }
        };
        customEnemiesPool = [];
        renderAll();
    }
}

function triggerAutoSave() {
    if (appSettings.autoSave) saveState();
}

function saveState() {
    const saveObj = { state, customEnemiesPool };
    localStorage.setItem('levelBuilderSave', JSON.stringify(saveObj));
}

function loadState() {
    try {
        const savedSettings = localStorage.getItem('levelBuilderSettings');
        if (savedSettings) appSettings = JSON.parse(savedSettings);

        if (appSettings.autoSave) {
            const savedData = localStorage.getItem('levelBuilderSave');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                state = parsed.state;
                customEnemiesPool = parsed.customEnemiesPool || [];
            }
        }
    } catch (e) {
        console.error("Failed to load state", e);
    }
}

// --- ЛОГИКА CLOUDFLARE API ---
async function sendLevel() {
    const hasEnemies = state.waves.some(w => w.enemies && w.enemies.length > 0);
    if (!hasEnemies) {
        alert("Cannot send an empty level! Add some enemies first.");
        return;
    }

    state.meta.updatedAt = new Date().toISOString();
    const exportData = {
        ...state,
        customPool: customEnemiesPool 
    };

    const jsonStr = JSON.stringify(exportData);
    
    const sizeInBytes = new Blob([jsonStr]).size;
    if (sizeInBytes > 50 * 1024) {
        alert("Level file is too large! Maximum allowed size is 50KB.");
        return;
    }

    const btn = document.getElementById('btn-send-level');
    const originalText = btn.innerText;
    btn.innerText = "Sending...";
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/levels`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonStr
        });

        if (!response.ok) throw new Error("Server rejected the level");

        const data = await response.json();
        
        document.getElementById('ticket-display').innerText = data.ticket;
        document.getElementById('ticket-modal').classList.remove('hidden');
    } catch (error) {
        alert("Failed to send level: " + error.message);
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

async function findLevelByTicket() {
    const input = document.getElementById('ticket-input');
    const ticket = input.value.trim().toUpperCase();

    if (!ticket) {
        alert("Please enter a valid ticket (e.g. LVL-XXXXXX)");
        return;
    }

    const btn = document.getElementById('btn-find-ticket');
    const originalText = btn.innerText;
    btn.innerText = "🔍...";
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/levels/${ticket}`);
        
        if (response.status === 404) {
            alert("Ticket not found or has expired.");
            return;
        }
        if (!response.ok) throw new Error("Failed to fetch level");

        const parsed = await response.json();

        if (parsed.waves && parsed.party) {
            state = {
                levelName: parsed.levelName || "Imported Level",
                waves: parsed.waves,
                party: parsed.party,
                challenges: parsed.challenges || { unlocked: [], active: [] },
                meta: parsed.meta || state.meta
            };
            customEnemiesPool = parsed.customPool || [];
            renderAll();
            alert(`Level "${state.levelName}" loaded successfully!`);
            input.value = ''; 
        } else {
            alert("Downloaded data is corrupted or invalid.");
        }
    } catch (error) {
        alert("Error loading level: " + error.message);
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

function copyTicket() {
    const ticketText = document.getElementById('ticket-display').innerText;
    navigator.clipboard.writeText(ticketText).then(() => {
        const btn = document.getElementById('btn-copy-ticket');
        btn.innerText = "Copied!";
        setTimeout(() => btn.innerText = "Copy Ticket", 2000);
    });
}