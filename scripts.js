// Настройки API для Cloudflare Worker
// ВАЖНО: Убедись, что тут стоит твоя ссылка на Worker!
const API_BASE = "https://custom-level-api.likirill.workers.dev";

// --- БАЗА ДАННЫХ (Пулы по умолчанию) ---
const DEFAULT_PLACEHOLDER = "assets/placeholder.png";

const ENEMIES_BOSSES = [
    { id: "argenti", name: "Аргенти", icon: "assets/bosses/argenti.png", monster_id: 3024010, defaultLevel: 95 },
    { id: "argenti_complete", name: "Аргенти (Complete)", icon: "assets/bosses/argenti_complete.png", monster_id: 3024011, defaultLevel: 95 },
    { id: "kafka", name: "Кафка", icon: "assets/bosses/kafka.png", monster_id: 2004010, defaultLevel: 95 },
    { id: "kafka_complete", name: "Кафка (Complete)", icon: "assets/bosses/kafka_complete.png", monster_id: 2004011, defaultLevel: 95 },
    { id: "kafka_illusory", name: "Кафка Иллюзорная", icon: "assets/bosses/kafka_illusory.png", monster_id: 2004013, defaultLevel: 95 },
    { id: "sem_roya", name: "Сэм Роя", icon: "assets/bosses/sem_roya.png", monster_id: 3024030, defaultLevel: 95 },
    { id: "bronya", name: "Броня", icon: "assets/bosses/bronya.png", monster_id: 100403003, defaultLevel: 95 },
    { id: "bronya_illusory", name: "Броня Иллюзорная", icon: "assets/bosses/bronya_illusory.png", monster_id: 1004032, defaultLevel: 95 },
    { id: "avantyurin", name: "Авантюрин", icon: "assets/bosses/avantyurin.png", monster_id: 8034010, defaultLevel: 95 },
    { id: "avantyurin_complete", name: "Авантюрин (Complete)", icon: "assets/bosses/avantyurin_complete.png", monster_id: 8034011, defaultLevel: 95 },
    { id: "kokoliya", name: "Коколия", icon: "assets/bosses/kokoliya.png", monster_id: 1004013, defaultLevel: 95 },
    { id: "gepard", name: "Гепард", icon: "assets/bosses/gepard.png", monster_id: 1004020, defaultLevel: 95 },
    { id: "gepard_complete", name: "Гепард (Complete)", icon: "assets/bosses/gepard_complete.png", monster_id: 1004022, defaultLevel: 95 },
    { id: "gepard_illusory", name: "Гепард Иллюзорный", icon: "assets/bosses/gepard_illusory.png", monster_id: 1004024, defaultLevel: 95 },
    { id: "haul", name: "Хауль", icon: "assets/bosses/haul.png", monster_id: 2034010, defaultLevel: 95 },
    { id: "haul_complete", name: "Хауль (Complete)", icon: "assets/bosses/haul_complete.png", monster_id: 203401201, defaultLevel: 95 },
    { id: "haul_dirty", name: "Хауль Грязный", icon: "assets/bosses/haul_dirty.png", monster_id: 2034015, defaultLevel: 95 },
    { id: "temnyy_rytsar", name: "Темный Рыцарь", icon: "assets/bosses/temnyy_rytsar.png", monster_id: 4034010, defaultLevel: 95 },
    { id: "manekeny", name: "Манекены", icon: "assets/bosses/manekeny.png", monster_id: 3004012, defaultLevel: 95 },
    { id: "manekeny_complete", name: "Манекены (Complete)", icon: "assets/bosses/manekeny_complete.png", monster_id: 3004013, defaultLevel: 95 },
    { id: "duh_pamyati", name: "Дух Памяти", icon: "assets/bosses/duh_pamyati.png", monster_id: 4064010, defaultLevel: 95 },
    { id: "duh_pamyati_complete", name: "Дух Памяти (Complete)", icon: "assets/bosses/duh_pamyati_complete.png", monster_id: 4064011, defaultLevel: 95 },
    { id: "bezumnyy_korol", name: "Безумный Король", icon: "assets/bosses/bezumnyy_korol.png", monster_id: 4014010, defaultLevel: 95 },
    { id: "bezumnyy_korol_complete", name: "Безумный Король (Complete)", icon: "assets/bosses/bezumnyy_korol_complete.png", monster_id: 4014015, defaultLevel: 95 },
    { id: "mem_zony", name: "Мем Зоны", icon: "assets/bosses/mem_zony.png", monster_id: 3014020, defaultLevel: 95 },
    { id: "mem_zony_complete", name: "Мем Зоны (Complete)", icon: "assets/bosses/mem_zony_complete.png", monster_id: 3014022, defaultLevel: 95 },
    { id: "olen", name: "Олень", icon: "assets/bosses/olen.png", monster_id: 2024010, defaultLevel: 95 },
    { id: "olen_complete", name: "Олень (Complete)", icon: "assets/bosses/olen_complete.png", monster_id: 2024011, defaultLevel: 95 },
    { id: "olen_illusory", name: "Олень Иллюзорный", icon: "assets/bosses/olen_illusory.png", monster_id: 2024013, defaultLevel: 95 },
    { id: "pollyuks", name: "Поллюкс", icon: "assets/bosses/pollyuks.png", monster_id: 4014030, defaultLevel: 95 },
    { id: "pollyuks_complete", name: "Поллюкс (Complete)", icon: "assets/bosses/pollyuks_complete.png", monster_id: 4014031, defaultLevel: 95 },
    { id: "sem", name: "Сэм", icon: "assets/bosses/sem.png", monster_id: 3024020, defaultLevel: 95 },
    { id: "sem_complete", name: "Сэм (Complete)", icon: "assets/bosses/sem_complete.png", monster_id: 3024023, defaultLevel: 95 },
    { id: "iskra_offishal", name: "Искра Оффишал", icon: "assets/bosses/iskra_offishal.png", monster_id: 5014010, defaultLevel: 95 },
    { id: "svarog", name: "Сварог", icon: "assets/bosses/svarog.png", monster_id: 1014010, defaultLevel: 95 },
    { id: "svarog_complete", name: "Сварог (Complete)", icon: "assets/bosses/svarog_complete.png", monster_id: 1014011, defaultLevel: 95 },
    { id: "televizory", name: "Телевизоры", icon: "assets/bosses/televizory.png", monster_id: 3004020, defaultLevel: 95 },
    { id: "televizory_complete", name: "Телевизоры (Complete)", icon: "assets/bosses/televizory_complete.png", monster_id: 3004022, defaultLevel: 95 },
    { id: "zandar", name: "Зандар", icon: "assets/bosses/zandar.png", monster_id: 4044010, defaultLevel: 95 }
];

const ENEMIES_WEEKLY = [
    { id: "zver_sudnogo_dnya", name: "Зверь Судного Дня", icon: "assets/weekly/zver_sudnogo_dnya.png", monster_id: 8015012, defaultLevel: 95 },
    { id: "bolshaya_mama_kokoliya", name: "Большая Мама Коколия", icon: "assets/weekly/bolshaya_mama_kokoliya.png", monster_id: 1005013, defaultLevel: 95 },
    { id: "fantiliya", name: "Фантилия", icon: "assets/weekly/fantiliya.png", monster_id: 801502201, defaultLevel: 95 },
    { id: "korolevskiy_zhuk", name: "Королевский Жук", icon: "assets/weekly/korolevskiy_zhuk.png", monster_id: 8025011, defaultLevel: 95 },
    { id: "voskresene", name: "Воскресенье", icon: "assets/weekly/voskresene.png", monster_id: 3025012, defaultLevel: 95 },
    { id: "ten_fey_syao", name: "Тень Фэй Сяо", icon: "assets/weekly/ten_fey_syao.png", monster_id: 2035010, defaultLevel: 95 },
    { id: "akvila", name: "Аквила", icon: "assets/weekly/akvila.png", monster_id: 401501101, defaultLevel: 95 },
    { id: "stalesklep", name: "Сталесклеп", icon: "assets/weekly/stalesklep.png", monster_id: 4035010, defaultLevel: 95 }
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
    { id:"luocha", name:"Лоча", icon:"assets/chars/luocha.png" },
    { id:"dan_heng_il", name:"Дань Хэн Пожиратель Луны", icon:"assets/chars/dan_heng_il.png" },
    { id:"jiaoqiu", name:"Цзяоцю", icon:"assets/chars/jiaoqiu.png" },
    { id:"argenti", name:"Аргенти", icon:"assets/chars/argenti.png" },
    { id:"jade", name:"Яшма", icon:"assets/chars/jade.png" },
    { id:"boothill", name:"Бутхилл", icon:"assets/chars/boothill.png" },
    { id:"rappa", name:"Раппа", icon:"assets/chars/rappa.png" },
    { id:"great_herta", name:"Великая Герта", icon:"assets/chars/great_herta.png" },
    { id:"midei", name:"Мидей", icon:"assets/chars/midei.png" },
    { id:"anaksa", name:"Анакса", icon:"assets/chars/anaksa.png" },
    { id:"gisilensa", name:"Гисиленса", icon:"assets/chars/gisilensa.png" }
];

const SPECIAL_CHALLENGES = [
    { id: "sc_giga_trash", name: "Гига чат: Мусорный бак", price_rub: 20, description: "Добавляет особого противника: мусорный бак с 2 000 000 HP.", effect: { type: "spawn_special", hp: 2000000 } },
    { id: "sc_double_hp_all", name: "Удвоить HP всем противникам", price_rub: 200, description: "Повышает HP всем противникам в 2 раза.", effect: { type: "mult_hp_all", multiplier: 2 } },
    { id: "sc_olezha_27", name: "Олежа 27", price_rub: 20, description: "20 волн светофоров ???", effect: { type: "custom_note", note: "20 волн светофоров ???" } },
    { id: "sc_hayato_live", name: "Хаято живи", price_rub: 30, description: "Добавить Жуань Мэй в команду и не дать ей погибнуть.", effect: { type: "mission", required_character_id: "ruan_mei", condition: "survive" } },
    { id: "sc_winter_falls", name: "Винтер Фолс", price_rub: 20, description: "Добавить Март 7 в отряд.", effect: { type: "force_character", character_id: "march_7" } },
    { id: "sc_kindergarten_sun", name: "Детский Садик: Солнышко", price_rub: 100, description: "Использовать на уровне только мелких персонажей.", effect: { type: "rule", rule: "only_small_characters" } },
    { id: "sc_factions_one", name: "Фракции: одна на выбор", price_rub: 100, description: "Можно использовать только одну фракцию на выбор.", effect: { type: "choose_one_faction", options: ["Лофу", "Сяньчжоу", "Станция Герта", "Златиусы", "Другое"] } },
    { id: "sc_angry_milo", name: "Злой Майло", price_rub: 80, description: "Пройти уровень без 1 персонажа (один слот команды недоступен).", effect: { type: "team_restriction", disabled_slots: 1 } }
];

// --- СОСТОЯНИЕ ПРИЛОЖЕНИЯ ---
let state = {
    levelName: "Мой кастомный уровень",
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
    updateActiveModifiersBanner();
    triggerAutoSave();
}

function updateActiveModifiersBanner() {
    const banner = document.getElementById('active-modifiers-banner');
    const textSpan = document.getElementById('active-modifiers-text');
    if (state.challenges.active.length > 0) {
        const activeNames = state.challenges.active.map(id => {
            const ch = SPECIAL_CHALLENGES.find(c => c.id === id);
            return ch ? ch.name : id;
        }).join(' • ');
        
        // Предупреждение для "Злого Майло"
        if (state.challenges.active.includes('sc_angry_milo')) {
            textSpan.innerHTML = activeNames + ' <span style="color: #ff4757; margin-left: 10px;">⚠ Один слот персонажа заблокирован (Злой Майло)</span>';
        } else {
            textSpan.innerText = activeNames;
        }
        
        banner.style.display = 'block';
    } else {
        banner.style.display = 'none';
    }
}

function renderCharacters() {
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

    const counterEl = document.getElementById('unlocked-counter');
    if (counterEl) {
        counterEl.innerText = `(Разблокировано: ${state.unlockedCharacters.length})`;
    }

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
        content.innerHTML = `<div class="wave-header"><h3>Волна ${wIndex + 1}</h3></div>`;
        
        const grid = document.createElement('div');
        grid.className = 'enemies-grid';
        
        wave.enemies.forEach((enemy, eIndex) => {
            const eCard = document.createElement('div');
            eCard.className = 'enemy-card';
            eCard.innerHTML = `
                <button class="btn-remove-enemy" onclick="removeEnemy(${wIndex}, ${eIndex})" title="Удалить">✕</button>
                <img src="${getImagePath(enemy.icon)}" alt="${enemy.name}" onerror="imgError(this)">
                <div class="name" title="${enemy.name}">${enemy.name}</div>
                <div style="font-size:0.7rem; color:var(--text-muted);">ID: ${enemy.monster_id || '?'}</div>
                <div style="display:flex; width:100%; gap:2px; margin-top:5px;">
                    <input type="number" class="enemy-level" style="flex:1; padding:2px; width:45%;" value="${enemy.level}" min="1" max="95" 
                           onchange="updateEnemyLevel(${wIndex}, ${eIndex}, this.value)" title="Уровень">
                    <input type="number" class="enemy-level" style="flex:1; padding:2px; width:45%; color:#ff6b81;" value="${enemy.max_hp || 0}" min="0" 
                           onchange="updateEnemyMaxHp(${wIndex}, ${eIndex}, this.value)" title="Max HP (0 = по умолчанию)">
                </div>
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
    if(confirm('Удалить эту волну?')) {
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

function updateEnemyMaxHp(wIndex, eIndex, newHp) {
    let hp = parseInt(newHp) || 0;
    if (hp < 0) hp = 0;
    state.waves[wIndex].enemies[eIndex].max_hp = hp;
    triggerAutoSave();
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
        grid.innerHTML = '<p style="color:var(--text-muted); grid-column: 1/-1;">Противники не найдены.</p>';
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
            <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom: 2px;">ID: ${enemy.monster_id || 'custom'}</div>
            ${enemy.element ? `<div class="element">${enemy.element}</div>` : ''}
            <div class="level-selector">
                <label>Уровень: <span id="${valId}">${enemy.defaultLevel}</span></label>
                <input type="range" id="${sliderId}" min="1" max="95" value="${enemy.defaultLevel}" class="level-slider" oninput="document.getElementById('${valId}').innerText = this.value">
            </div>
            <button class="btn btn-primary w-100" onclick="handleAddEnemyFromPicker('${enemy.id}', '${enemy.name}', '${enemy.icon}', '${sliderId}', ${enemy.monster_id || 0})">Добавить</button>
        `;
        grid.appendChild(card);
    });
}

function handleAddEnemyFromPicker(id, name, icon, sliderId, monster_id) {
    const levelVal = document.getElementById(sliderId).value;
    addEnemyToCurrentWave(id, name, parseInt(levelVal), icon, monster_id);
}

function addEnemyToCurrentWave(id, name, level, icon, monster_id) {
    if (currentActiveWaveIndex !== null) {
        state.waves[currentActiveWaveIndex].enemies.push({
            id: id,
            name: name,
            level: level || 95,
            icon: icon,
            monster_id: monster_id || 0,
            max_hp: 0
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

    if (!name) { alert("Пожалуйста, введите имя"); return; }

    const newEnemy = {
        id: "custom_" + Date.now(),
        name: name,
        element: element,
        defaultLevel: level,
        icon: icon,
        monster_id: 0
    };

    customEnemiesPool.push(newEnemy);
    
    addEnemyToCurrentWave(newEnemy.id, newEnemy.name, newEnemy.defaultLevel, newEnemy.icon, newEnemy.monster_id);
    
    document.getElementById('ce-name').value = '';
    document.getElementById('ce-element').value = '';
    document.getElementById('ce-icon').value = '';
}

// --- ПИКЕР ПЕРСОНАЖЕЙ ---
function openCharacterPicker(mode, slotIndex = null) {
    charPickerMode = mode;
    currentActiveSlotIndex = slotIndex;
    
    const title = document.getElementById('char-picker-title');
    title.innerText = mode === 'ban' ? 'Выбрать персонажа для бана' : 'Разблокировать персонажа';
    
    document.getElementById('label-filter-banned').style.display = mode === 'ban' ? 'flex' : 'none';
    document.getElementById('char-filter-banned').checked = false; 
    
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
        const btnText = charPickerMode === 'ban' ? (isAlreadyBanned ? 'Забанен' : 'Забанить') : 'Разблокировать';

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
            buttonHTML = `<button class="btn btn-primary w-100" onclick="openPurchaseModal('${challenge.id}')">Купить</button>`;
        } else if (isActive) {
            buttonHTML = `
                <div style="text-align:center; color: #4cd137; font-weight:bold; margin-bottom:5px;">Активно ✅</div>
                <button class="btn btn-danger w-100" onclick="toggleChallenge('${challenge.id}')">Убрать</button>
            `;
        } else {
            buttonHTML = `<button class="btn btn-secondary w-100" style="border-color: var(--accent); color: var(--accent);" onclick="toggleChallenge('${challenge.id}')">Активировать</button>`;
        }

        card.innerHTML = `
            ${!isUnlocked ? `<div class="challenge-price">${challenge.price_rub} ₽</div>` : ''}
            <h4>${challenge.name}</h4>
            <p>${challenge.description}</p>
            <div style="margin-top: auto;">${buttonHTML}</div>
        `;
        container.appendChild(card);
    });
}

function openPurchaseModal(challengeId) {
    const challenge = SPECIAL_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return;
    
    pendingPurchaseId = challengeId;
    document.getElementById('purchase-text').innerHTML = `Разблокировать <strong>${challenge.name}</strong> за ${challenge.price_rub} ₽?`;
    document.getElementById('enemy-picker-modal').classList.add('hidden'); 
    document.getElementById('char-picker-modal').classList.add('hidden');
    document.getElementById('purchase-modal').classList.remove('hidden');
    
    document.getElementById('btn-confirm-purchase').onclick = () => {
        if (pendingPurchaseId) {
            state.challenges.unlocked.push(pendingPurchaseId);
            if (!state.challenges.active.includes(pendingPurchaseId)) {
                state.challenges.active.push(pendingPurchaseId);
            }
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
    document.getElementById('char-filter-banned').addEventListener('change', renderCharPickerList);

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
function buildExportPayload() {
    return {
        level_name: state.levelName,
        battle_config: {
            battle_type: "Default",
            monsters: state.waves.map(wave => 
                wave.enemies.map(e => ({
                    level: parseInt(e.level) || 95,
                    monster_id: parseInt(e.monster_id) || 0,
                    max_hp: parseInt(e.max_hp) || 0
                }))
            )
        },
        banned_characters: state.bannedCharacters.map(c => c ? c.id : null),
        unlocked_characters: state.unlockedCharacters.map(c => c.id),
        active_challenges: state.challenges.active
    };
}

function restoreStateFromJson(parsed) {
    state.levelName = parsed.level_name || parsed.levelName || "Импортированный уровень";
    
    // Обработка волн (новый battle_config.monsters ИЛИ старый waves)
    if (parsed.battle_config && Array.isArray(parsed.battle_config.monsters)) {
        const fullEnemyPool = [...ENEMIES_BOSSES, ...ENEMIES_WEEKLY, ...customEnemiesPool];
        state.waves = parsed.battle_config.monsters.map(floor => {
            return {
                enemies: floor.map(m => {
                    const baseEnemy = fullEnemyPool.find(e => e.monster_id === m.monster_id);
                    return {
                        id: baseEnemy ? baseEnemy.id : `unknown_${m.monster_id}`,
                        name: baseEnemy ? baseEnemy.name : `Неизвестный (${m.monster_id})`,
                        icon: baseEnemy ? baseEnemy.icon : DEFAULT_PLACEHOLDER,
                        level: m.level || 95,
                        monster_id: m.monster_id,
                        max_hp: m.max_hp || 0
                    };
                })
            };
        });
    } else if (parsed.waves) {
        state.waves = parsed.waves; // Легаси поддержка
    }

    // Обработка банов
    if (parsed.banned_characters) {
        state.bannedCharacters = parsed.banned_characters.map(id => id ? OWNED_CHARACTERS.find(c => c.id === id) || {id, name:id, icon:DEFAULT_PLACEHOLDER} : null);
    } else {
        state.bannedCharacters = parsed.bannedCharacters || parsed.party || [null, null, null, null];
    }

    // Обработка анлоков
    if (parsed.unlocked_characters) {
        state.unlockedCharacters = parsed.unlocked_characters.map(id => LOCKED_CHARACTERS.find(c => c.id === id) || {id, name:id, icon:DEFAULT_PLACEHOLDER});
    } else {
        state.unlockedCharacters = parsed.unlockedCharacters || [];
    }

    // Обработка модификаторов
    state.challenges.active = parsed.active_challenges || [];
    if (parsed.activeChallenges && Array.isArray(parsed.activeChallenges)) {
        state.challenges.active = parsed.activeChallenges.map(ch => ch.id || ch); // Легаси
    }
    state.challenges.unlocked = [...new Set([...state.challenges.unlocked, ...state.challenges.active])];
    
    renderAll();
}

function exportJson() {
    const payload = buildExportPayload();
    const exportData = {
        ...payload,
        customPool: customEnemiesPool 
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
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
            if (parsed.customPool) customEnemiesPool = parsed.customPool;
            restoreStateFromJson(parsed);
            alert("Уровень успешно импортирован!");
        } catch (error) {
            alert("Ошибка при разборе JSON");
            console.error(error);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; 
}

function resetLevel() {
    if(confirm("Вы уверены, что хотите сбросить весь прогресс?")) {
        state = {
            levelName: "Мой кастомный уровень",
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
                if (!state.bannedCharacters && state.party) {
                    state.bannedCharacters = state.party;
                    state.unlockedCharacters = [];
                }
                customEnemiesPool = parsed.customEnemiesPool || [];
            }
        }
    } catch (e) {
        console.error("Ошибка загрузки сохранений", e);
    }
}

async function sendLevel() {
    const hasEnemies = state.waves.some(w => w.enemies && w.enemies.length > 0);
    if (!hasEnemies) {
        alert("Нельзя отправить пустой уровень! Добавьте противников.");
        return;
    }

    const payload = buildExportPayload();
    const exportData = {
        ...payload,
        customPool: customEnemiesPool 
    };

    const jsonStr = JSON.stringify(exportData);
    
    const sizeInBytes = new Blob([jsonStr]).size;
    if (sizeInBytes > 50 * 1024) {
        alert("Размер файла слишком большой! Максимум 50KB.");
        return;
    }

    const btn = document.getElementById('btn-send-level');
    const originalText = btn.innerText;
    btn.innerText = "Отправка...";
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/levels`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonStr
        });

        if (!response.ok) throw new Error("Сервер отклонил уровень");

        const data = await response.json();
        
        document.getElementById('ticket-display').innerText = data.ticket;
        document.getElementById('ticket-modal').classList.remove('hidden');
    } catch (error) {
        alert("Ошибка отправки уровня: " + error.message);
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

async function findLevelByTicket() {
    const input = document.getElementById('ticket-input');
    const ticket = input.value.trim().toUpperCase();

    if (!ticket) {
        alert("Введите корректный тикет (напр. LVL-XXXXXX)");
        return;
    }

    const btn = document.getElementById('btn-find-ticket');
    const originalText = btn.innerText;
    btn.innerText = "🔍...";
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/levels/${ticket}`);
        
        if (response.status === 404) {
            alert("Тикет не найден или истек срок действия.");
            return;
        }
        if (!response.ok) throw new Error("Ошибка загрузки уровня");

        const parsed = await response.json();
        if (parsed.customPool) customEnemiesPool = parsed.customPool;
        restoreStateFromJson(parsed);
        
        alert(`Уровень "${state.levelName}" успешно загружен!`);
        input.value = ''; 
    } catch (error) {
        alert("Ошибка загрузки уровня: " + error.message);
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

function copyTicket() {
    const ticketText = document.getElementById('ticket-display').innerText;
    navigator.clipboard.writeText(ticketText).then(() => {
        const btn = document.getElementById('btn-copy-ticket');
        btn.innerText = "Скопировано!";
        setTimeout(() => btn.innerText = "Скопировать тикет", 2000);
    });

}

