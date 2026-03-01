// Настройки API для Cloudflare Worker
// Обязательно замените этот URL на ваш реальный после деплоя воркера!
const API_BASE = "https://custom-level-api.likirill.workers.dev";

// --- БАЗА ДАННЫХ (Пулы по умолчанию) ---
// CHANGE: Обновлен путь к плейсхолдеру при ошибке загрузки картинки
const DEFAULT_PLACEHOLDER = "assets/placeholder.png";

// CHANGE: Полностью заменен пул обычных боссов
const ENEMIES_BOSSES = [
    { id: "argenti", name: "Аргенти", icon: "assets/bosses/argenti.png", element: null, tags: [], defaultLevel: 95 },
    { id: "semroya", name: "СэмРоя", icon: "assets/bosses/semroya.png", element: null, tags: [], defaultLevel: 95 },
    { id: "bronya", name: "Броня", icon: "assets/bosses/bronya.png", element: null, tags: [], defaultLevel: 95 },
    { id: "avantyurin", name: "Авантюрин", icon: "assets/bosses/avantyurin.png", element: null, tags: [], defaultLevel: 95 },
    { id: "kokoliya", name: "Коколия", icon: "assets/bosses/kokoliya.png", element: null, tags: [], defaultLevel: 95 },
    { id: "glaz", name: "Глаз", icon: "assets/bosses/glaz.png", element: null, tags: [], defaultLevel: 95 },
    { id: "gepard", name: "Гепард", icon: "assets/bosses/gepard.png", element: null, tags: [], defaultLevel: 95 },
    { id: "haul", name: "Хауль", icon: "assets/bosses/haul.png", element: null, tags: [], defaultLevel: 95 },
    { id: "kafka", name: "Кафка", icon: "assets/bosses/kafka.png", element: null, tags: [], defaultLevel: 95 },
    { id: "temnyy_rytsar", name: "Темный Рыцарь", icon: "assets/bosses/temnyy_rytsar.png", element: null, tags: [], defaultLevel: 95 },
    { id: "manekeny", name: "Манекены", icon: "assets/bosses/manekeny.png", element: null, tags: [], defaultLevel: 95 },
    { id: "duh_pamyati", name: "Дух Памяти", icon: "assets/bosses/duh_pamyati.png", element: null, tags: [], defaultLevel: 95 },
    { id: "bezumnyy_korol_razdora", name: "Безумный Король раздора", icon: "assets/bosses/bezumnyy_korol_razdora.png", element: null, tags: [], defaultLevel: 95 },
    { id: "mem_zony", name: "Мем Зоны", icon: "assets/bosses/mem_zony.png", element: null, tags: [], defaultLevel: 95 },
    { id: "olen", name: "Олень", icon: "assets/bosses/olen.png", element: null, tags: [], defaultLevel: 95 },
    { id: "pollyuks", name: "Поллюкс", icon: "assets/bosses/pollyuks.png", element: null, tags: [], defaultLevel: 95 },
    { id: "sem", name: "Сэм", icon: "assets/bosses/sem.png", element: null, tags: [], defaultLevel: 95 },
    { id: "iskra_offishal", name: "Искра Оффишал", icon: "assets/bosses/iskra_offishal.png", element: null, tags: [], defaultLevel: 95 },
    { id: "svarog", name: "Сварог", icon: "assets/bosses/svarog.png", element: null, tags: [], defaultLevel: 95 },
    { id: "televizory", name: "Телевизоры", icon: "assets/bosses/televizory.png", element: null, tags: [], defaultLevel: 95 },
    { id: "yan", name: "ЯньЦин", icon: "assets/bosses/yan.png", element: null, tags: [], defaultLevel: 95 },
    { id: "zandar", name: "Зандар", icon: "assets/bosses/zandar.png", element: null, tags: [], defaultLevel: 95 }

];

// CHANGE: Полностью заменен пул еженедельных боссов
const ENEMIES_WEEKLY = [
    { id: "zver_sudnogo_dnya", name: "Зверь Судного Дня", icon: "assets/weekly/zver_sudnogo_dnya.png", element: null, tags: [], defaultLevel: 95 },
    { id: "bolshaya_mama_kokoliya", name: "Большая Мама Коколия", icon: "assets/weekly/bolshaya_mama_kokoliya.png", element: null, tags: [], defaultLevel: 95 },
    { id: "fantiliya", name: "Фантилия", icon: "assets/weekly/fantiliya.png", element: null, tags: [], defaultLevel: 95 },
    { id: "korolevskiy_zhuk", name: "Королевский Жук", icon: "assets/weekly/korolevskiy_zhuk.png", element: null, tags: [], defaultLevel: 95 },
    { id: "voskresene", name: "Воскресенье", icon: "assets/weekly/voskresene.png", element: null, tags: [], defaultLevel: 95 },
    { id: "ten_fey_syao", name: "Тень Фэй Сяо", icon: "assets/weekly/ten_fey_syao.png", element: null, tags: [], defaultLevel: 95 },
    { id: "akvila", name: "Аквила", icon: "assets/weekly/akvila.png", element: null, tags: [], defaultLevel: 95 },
    { id: "stalesklep", name: "Сталесклеп", icon: "assets/weekly/stalesklep.png", element: null, tags: [], defaultLevel: 95 }
];

const OWNED_CHARACTERS = [
    { id: "mart_7", name: "Март 7", icon: "assets/chars/mart_7.png", eidolons: 6 },
    { id: "himeko", name: "Химеко", icon: "assets/chars/himeko.png", eidolons: 1 },
    { id: "velt", name: "Вельт", icon: "assets/chars/velt.png", eidolons: 2 },
    { id: "kafka", name: "Кафка", icon: "assets/chars/kafka.png", eidolons: 0 },
    { id: "serebryanyy_volk", name: "Серебряный Волк", icon: "assets/chars/serebryanyy_volk.png", eidolons: 0 },
    { id: "arlan", name: "Арлан", icon: "assets/chars/arlan.png", eidolons: 6 },
    { id: "asta", name: "Аста", icon: "assets/chars/asta.png", eidolons: 6 },
    { id: "gerta", name: "Герта", icon: "assets/chars/gerta.png", eidolons: 6 },
    { id: "seyber", name: "Сэйбер", icon: "assets/chars/seyber.png", eidolons: 0 },
    { id: "archer", name: "Арчер", icon: "assets/chars/archer.png", eidolons: 0 },
    { id: "bronya", name: "Броня", icon: "assets/chars/bronya.png", eidolons: 5 },
    { id: "zele", name: "Зеле", icon: "assets/chars/zele.png", eidolons: 1 },
    { id: "serval", name: "Сервал", icon: "assets/chars/serval.png", eidolons: 6 },
    { id: "gepard", name: "Гепард", icon: "assets/chars/gepard.png", eidolons: 2 },
    { id: "natasha", name: "Наташа", icon: "assets/chars/natasha.png", eidolons: 6 },
    { id: "pelageya", name: "Пелагея", icon: "assets/chars/pelageya.png", eidolons: 6 },
    { id: "klara", name: "Клара", icon: "assets/chars/klara.png", eidolons: 2 },
    { id: "sampo", name: "Сампо", icon: "assets/chars/sampo.png", eidolons: 6 },
    { id: "huk", name: "Хук", icon: "assets/chars/huk.png", eidolons: 6 },
    { id: "rys", name: "Рысь", icon: "assets/chars/rys.png", eidolons: 6 },
    { id: "luka", name: "Лука", icon: "assets/chars/luka.png", eidolons: 6 },
    { id: "topaz", name: "Топаз", icon: "assets/chars/topaz.png", eidolons: 0 },
    { id: "tsintszyue", name: "ЦинЦюэ", icon: "assets/chars/tsintszyue.png", eidolons: 6 },
    { id: "tinyun", name: "Тиньюнь", icon: "assets/chars/tinyun.png", eidolons: 6 },
    { id: "general", name: "Генерал", icon: "assets/chars/general.png", eidolons: 0 },
    { id: "bleyd", name: "Блэйд", icon: "assets/chars/bleyd.png", eidolons: 1 },
    { id: "su_shan", name: "Су Шан", icon: "assets/chars/su_shan.png", eidolons: 6 },
    { id: "yuykun", name: "ЮйКун", icon: "assets/chars/yuykun.png", eidolons: 6 },
    { id: "fu_syuan", name: "Фу Сюань", icon: "assets/chars/fu_syuan.png", eidolons: 6 },
    { id: "yan_tsin", name: "Янь Цин", icon: "assets/chars/yan_tsin.png", eidolons: 3 },
    { id: "guynayfen", name: "Гуйнайфэнь", icon: "assets/chars/guynayfen.png", eidolons: 6 },
    { id: "baylu", name: "Байлу", icon: "assets/chars/baylu.png", eidolons: 3 },
    { id: "tszinlyu", name: "ЦзинЛю", icon: "assets/chars/tszinlyu.png", eidolons: 1 },
    { id: "syuey", name: "Сюэй", icon: "assets/chars/syuey.png", eidolons: 6 },
    { id: "hanya", name: "Ханья", icon: "assets/chars/hanya.png", eidolons: 6 },
    { id: "hoho", name: "Хохо", icon: "assets/chars/hoho.png", eidolons: 0 },
    { id: "fey_syao", name: "Фэй сяо", icon: "assets/chars/fey_syao.png", eidolons: 0 },
    { id: "yun_li", name: "Юнь Ли", icon: "assets/chars/yun_li.png", eidolons: 0 },
    { id: "linsha", name: "Линша", icon: "assets/chars/linsha.png", eidolons: 0 },
    { id: "motsze", name: "Моцзэ", icon: "assets/chars/motsze.png", eidolons: 6 },
    { id: "fuga", name: "ФуГа", icon: "assets/chars/fuga.png", eidolons: 0 },
    { id: "gallaher", name: "Галлахер", icon: "assets/chars/gallaher.png", eidolons: 0 },
    { id: "zhuan_mey", name: "Жуань Мэй", icon: "assets/chars/zhuan_mey.png", eidolons: 1 },
    { id: "avantyurin_char", name: "Авантюрин", icon: "assets/chars/avantyurin.png", eidolons: 0 },
    { id: "doktor_ratsio", name: "Доктор Рацио", icon: "assets/chars/doktor_ratsio.png", eidolons: 0 },
    { id: "iskorka", name: "Искорка", icon: "assets/chars/iskorka.png", eidolons: 0 },
    { id: "chernyy_lebed", name: "Черный Лебедь", icon: "assets/chars/chernyy_lebed.png", eidolons: 0 },
    { id: "aheron", name: "Ахерон", icon: "assets/chars/aheron.png", eidolons: 0 },
    { id: "zaryanka", name: "Зарянка", icon: "assets/chars/zaryanka.png", eidolons: 0 },
    { id: "svetlyachok", name: "Светлячок", icon: "assets/chars/svetlyachok.png", eidolons: 0 },
    { id: "misha", name: "Миша", icon: "assets/chars/misha.png", eidolons: 6 },
    { id: "voskresene_char", name: "Воскресенье", icon: "assets/chars/voskresene.png", eidolons: 0 },
    { id: "konstantsiya", name: "Констанция", icon: "assets/chars/konstantsiya.png", eidolons: 0 },
    { id: "aglaya", name: "Аглая", icon: "assets/chars/aglaya.png", eidolons: 0 },
    { id: "tribbi", name: "Трибби", icon: "assets/chars/tribbi.png", eidolons: 0 },
    { id: "tsifer", name: "Цифер", icon: "assets/chars/tsifer.png", eidolons: 0 },
    { id: "kastoriya", name: "Кастория", icon: "assets/chars/kastoriya.png", eidolons: 1 },
    { id: "faenon", name: "Фаенон", icon: "assets/chars/faenon.png", eidolons: 0 },
    { id: "giatsina", name: "Гиацина", icon: "assets/chars/giatsina.png", eidolons: 0 },
    { id: "keridra", name: "Керидра", icon: "assets/chars/keridra.png", eidolons: 0 },
    { id: "temen", name: "Темень", icon: "assets/chars/temen.png", eidolons: 0 },
    { id: "danhen_schit", name: "ДаньХэн Щит", icon: "assets/chars/danhen_schit.png", eidolons: 0 },
    { id: "kirena", name: "Кирена", icon: "assets/chars/kirena.png", eidolons: 4 },
    { id: "yao_guan", name: "Яо Гуан", icon: "assets/chars/yao_guan.png", eidolons: 0 },
    { id: "puteshestvennik", name: "Путешественник", icon: "assets/chars/puteshestvennik.png", eidolons: 6 },
    { id: "dan_hey", name: "Дань Хэй", icon: "assets/chars/dan_hey.png", eidolons: 6 }
];

const LOCKED_CHARACTERS = [
    { id: "example_locked", name: "Скрытый Герой", icon: "assets/chars/example.png" }
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
    bannedCharacters: [null, null, null, null],
    unlockedCharacters: [],
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
let charPickerMode = 'ban'; // 'ban' или 'unlock'

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
    if (image.src.includes(DEFAULT_PLACEHOLDER)) return true;
    image.onerror = null;
    image.src = DEFAULT_PLACEHOLDER;
    return true;
}

// --- РЕНДЕРИНГ ---
function renderAll() {
    document.getElementById('level-name-input').value = state.levelName;
    document.getElementById('autosave-toggle').checked = appSettings.autoSave;
    renderCharacters();
    renderWaves();
    renderChallenges();
    triggerAutoSave();
}

function renderCharacters() {
    // 1. Рендер Banned Characters
    const bContainer = document.getElementById('banned-container');
    bContainer.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
        const char = state.bannedCharacters[i];
        const slot = document.createElement('div');
        slot.className = 'char-slot';
        
        if (char) {
            slot.innerHTML = `
                <img src="${getImagePath(char.icon)}" alt="${char.name}" onerror="imgError(this)" title="${char.name}">
                <button class="btn-remove-char" onclick="removeBannedCharacter(${i}, event)">✕</button>
            `;
        } else {
            slot.innerHTML = `<span style="color:var(--text-muted); font-size:24px;">+</span>`;
            slot.onclick = () => openCharacterPicker('ban', i);
        }
        bContainer.appendChild(slot);
    }

    // 2. Рендер Unlocked Characters
    const uContainer = document.getElementById('unlocked-container');
    uContainer.innerHTML = '';
    
    state.unlockedCharacters.forEach((char, index) => {
        const slot = document.createElement('div');
        slot.className = 'char-slot';
        slot.innerHTML = `
            <img src="${getImagePath(char.icon)}" alt="${char.name}" onerror="imgError(this)" title="${char.name}">
            <button class="btn-remove-char" onclick="removeUnlockedCharacter(${index}, event)">✕</button>
        `;
        uContainer.appendChild(slot);
    });
}

function removeBannedCharacter(slotIndex, event) {
    event.stopPropagation();
    state.bannedCharacters[slotIndex] = null;
    triggerAutoSave();
    renderAll();
}

function removeUnlockedCharacter(index, event) {
    event.stopPropagation();
    state.unlockedCharacters.splice(index, 1);
    triggerAutoSave();
    renderAll();
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

// --- ПИКЕР ПЕРСОНАЖЕЙ (НОВЫЙ) ---
function openCharacterPicker(mode, slotIndex = null) {
    charPickerMode = mode;
    currentActiveSlotIndex = slotIndex;
    
    const title = document.getElementById('char-picker-title');
    title.innerText = mode === 'ban' ? 'Select Character to Ban' : 'Unlock Character';
    
    // Показываем фильтр "Show banned" только для режима банов
    document.getElementById('label-filter-banned').style.display = mode === 'ban' ? 'flex' : 'none';
    document.getElementById('char-filter-banned').checked = false; // сбрасываем фильтр
    
    document.getElementById('char-picker-modal').classList.remove('hidden');
    renderCharPickerList();
}

function renderCharPickerList() {
    const grid = document.getElementById('char-grid');
    const search = document.getElementById('char-search').value.toLowerCase();
    const sort = document.getElementById('char-sort').value;
    const showBannedOnly = document.getElementById('char-filter-banned').checked;

    const pool = charPickerMode === 'ban' ? OWNED_CHARACTERS : LOCKED_CHARACTERS;
    
    let filtered = pool.filter(c => c.name.toLowerCase().includes(search));

    if (charPickerMode === 'ban' && showBannedOnly) {
        filtered = filtered.filter(c => state.bannedCharacters.some(bc => bc && bc.id === c.id));
    }

    if (sort === 'az') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') filtered.sort((a, b) => b.name.localeCompare(a.name));

    grid.innerHTML = '';
    filtered.forEach(char => {
        const card = document.createElement('div');
        card.className = 'picker-card';
        
        const eidolonsHtml = (charPickerMode === 'ban' && char.eidolons !== undefined) 
            ? `<div style="font-size:0.75rem; color:var(--text-muted); margin-bottom: 4px;">Эйдолонов: <span style="color:var(--accent);">${char.eidolons}</span></div>` 
            : '';

        const isAlreadyBanned = charPickerMode === 'ban' && state.bannedCharacters.some(bc => bc && bc.id === char.id);
        const btnClass = isAlreadyBanned ? 'btn-danger' : 'btn-primary';
        const btnText = charPickerMode === 'ban' ? (isAlreadyBanned ? 'Banned' : 'Ban') : 'Unlock';

        card.innerHTML = `
            <img src="${getImagePath(char.icon)}" alt="${char.name}" onerror="imgError(this)">
            <div class="name"><strong>${char.name}</strong></div>
            ${eidolonsHtml}
            <button class="btn ${btnClass} w-100" onclick="selectCharacter('${char.id}')">
                ${btnText}
            </button>
        `;
        grid.appendChild(card);
    });
}

function selectCharacter(charId) {
    const pool = charPickerMode === 'ban' ? OWNED_CHARACTERS : LOCKED_CHARACTERS;
    const char = pool.find(c => c.id === charId);
    
    if (!char) return;

    if (charPickerMode === 'ban' && currentActiveSlotIndex !== null) {
        state.bannedCharacters[currentActiveSlotIndex] = { ...char };
    } else if (charPickerMode === 'unlock') {
        const alreadyExists = state.unlockedCharacters.find(c => c.id === char.id);
        if (!alreadyExists) {
            state.unlockedCharacters.push({ ...char });
        }
    }
    
    triggerAutoSave();
    closeModal('char-picker-modal');
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
    document.getElementById('char-filter-banned').addEventListener('change', renderCharPickerList); // Новый фильтр

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
            if (parsed.waves) {
                state = {
                    levelName: parsed.levelName || "Imported Level",
                    waves: parsed.waves,
                    bannedCharacters: parsed.bannedCharacters || parsed.party || [null, null, null, null],
                    unlockedCharacters: parsed.unlockedCharacters || [],
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
            bannedCharacters: [null, null, null, null],
            unlockedCharacters: [],
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
                // Восстановление обратной совместимости
                if (!state.bannedCharacters && state.party) {
                    state.bannedCharacters = state.party;
                    state.unlockedCharacters = [];
                }
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

        if (parsed.waves) {
            state = {
                levelName: parsed.levelName || "Imported Level",
                waves: parsed.waves,
                bannedCharacters: parsed.bannedCharacters || parsed.party || [null, null, null, null],
                unlockedCharacters: parsed.unlockedCharacters || [],
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
