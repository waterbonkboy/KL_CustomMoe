// Настройки API для Cloudflare Worker
const API_BASE = "https://custom-level-api.likirill.workers.dev";
const DEFAULT_PLACEHOLDER = "assets/placeholder.png";

// --- БАЗА ДАННЫХ ПРОТИВНИКОВ И ПЕРСОНАЖЕЙ ---
const ENEMIES_BOSSES = [
    { id: "argenti", name: "Аргенти", icon: "assets/bosses/argenti.png", monster_id: 3024010, defaultLevel: 95 },
    { id: "argenti_complete", name: "Аргенти (Complete)", icon: "assets/bosses/argenti_complete.png", monster_id: 3024011, defaultLevel: 95 },
    { id: "kafka", name: "Кафка", icon: "assets/bosses/kafka.png", monster_id: 2004010, defaultLevel: 95 },
    { id: "kafka_complete", name: "Кафка (Complete)", icon: "assets/bosses/kafka.png", monster_id: 2004011, defaultLevel: 95 },
    { id: "kafka_illusory", name: "Кафка Иллюзорная", icon: "assets/bosses/kafka.png", monster_id: 2004013, defaultLevel: 95 },
    { id: "sem_roya", name: "Сэм Роя", icon: "assets/bosses/sem_roya.png", monster_id: 3024030, defaultLevel: 95 },
    { id: "bronya", name: "Броня", icon: "assets/bosses/bronya.png", monster_id: 100403003, defaultLevel: 95 },
    { id: "bronya_illusory", name: "Броня Иллюзорная", icon: "assets/bosses/bronya.png", monster_id: 1004032, defaultLevel: 95 },
    { id: "avantyurin", name: "Авантюрин", icon: "assets/bosses/avantyurin.png", monster_id: 8034010, defaultLevel: 95 },
    { id: "avantyurin_complete", name: "Авантюрин (Complete)", icon: "assets/bosses/avantyurin.png", monster_id: 8034011, defaultLevel: 95 },
    { id: "kokoliya", name: "Коколия", icon: "assets/bosses/kokoliya.png", monster_id: 1004013, defaultLevel: 95 },
    { id: "gepard", name: "Гепард", icon: "assets/bosses/gepard.png", monster_id: 1004020, defaultLevel: 95 },
    { id: "gepard_complete", name: "Гепард (Complete)", icon: "assets/bosses/gepard.png", monster_id: 1004022, defaultLevel: 95 },
    { id: "gepard_illusory", name: "Гепард Иллюзорный", icon: "assets/bosses/gepard.png", monster_id: 1004024, defaultLevel: 95 },
    { id: "haul", name: "Хауль", icon: "assets/bosses/haul.png", monster_id: 2034010, defaultLevel: 95 },
    { id: "haul_complete", name: "Хауль (Complete)", icon: "assets/bosses/haul.png", monster_id: 203401201, defaultLevel: 95 },
    { id: "haul_dirty", name: "Хауль Грязный", icon: "assets/bosses/haul.png", monster_id: 2034015, defaultLevel: 95 },
    { id: "temnyy_rytsar", name: "Темный Рыцарь", icon: "assets/bosses/temnyy_rytsar.png", monster_id: 4034010, defaultLevel: 95 },
    { id: "manekeny", name: "Манекены", icon: "assets/bosses/manekeny.png", monster_id: 3004012, defaultLevel: 95 },
    { id: "manekeny_complete", name: "Манекены (Complete)", icon: "assets/bosses/manekeny.png", monster_id: 3004013, defaultLevel: 95 },
    { id: "duh_pamyati", name: "Дух Памяти", icon: "assets/bosses/duh_pamyati.png", monster_id: 4064010, defaultLevel: 95 },
    { id: "duh_pamyati_complete", name: "Дух Памяти (Complete)", icon: "assets/bosses/duh_pamyati.png", monster_id: 4064011, defaultLevel: 95 },
    { id: "bezumnyy_korol", name: "Безумный Король", icon: "assets/bosses/bezumnyy_korol.png", monster_id: 4014010, defaultLevel: 95 },
    { id: "bezumnyy_korol_complete", name: "Безумный Король (Complete)", icon: "assets/bosses/bezumnyy_korol.png", monster_id: 4014015, defaultLevel: 95 },
    { id: "mem_zony", name: "Мем Зоны", icon: "assets/bosses/mem_zony.png", monster_id: 3014020, defaultLevel: 95 },
    { id: "mem_zony_complete", name: "Мем Зоны (Complete)", icon: "assets/bosses/mem_zony.png", monster_id: 3014022, defaultLevel: 95 },
    { id: "olen", name: "Олень", icon: "assets/bosses/olen.png", monster_id: 2024010, defaultLevel: 95 },
    { id: "olen_complete", name: "Олень (Complete)", icon: "assets/bosses/olen.png", monster_id: 2024011, defaultLevel: 95 },
    { id: "olen_illusory", name: "Олень Иллюзорный", icon: "assets/bosses/olen.png", monster_id: 2024013, defaultLevel: 95 },
    { id: "pollyuks", name: "Поллюкс", icon: "assets/bosses/pollyuks.png", monster_id: 4014030, defaultLevel: 95 },
    { id: "pollyuks_complete", name: "Поллюкс (Complete)", icon: "assets/bosses/pollyuks.png", monster_id: 4014031, defaultLevel: 95 },
    { id: "sem", name: "Сэм", icon: "assets/bosses/sem.png", monster_id: 3024020, defaultLevel: 95 },
    { id: "sem_complete", name: "Сэм (Complete)", icon: "assets/bosses/sem.png", monster_id: 3024023, defaultLevel: 95 },
    { id: "iskra_offishal", name: "Искра Оффишал", icon: "assets/bosses/iskra_offishal.png", monster_id: 5014010, defaultLevel: 95 },
    { id: "svarog", name: "Сварог", icon: "assets/bosses/svarog.png", monster_id: 1014010, defaultLevel: 95 },
    { id: "svarog_complete", name: "Сварог (Complete)", icon: "assets/bosses/svarog".png", monster_id: 1014011, defaultLevel: 95 },
    { id: "televizory", name: "Телевизоры", icon: "assets/bosses/televizory.png", monster_id: 3004020, defaultLevel: 95 },
    { id: "televizory_complete", name: "Телевизоры (Complete)", icon: "assets/bosses/televizory.png", monster_id: 3004022, defaultLevel: 95 },
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

let appSettings = { autoSave: false };
let currentActiveWaveIndex = null;
let currentActiveSlotIndex = null;
let currentEnemyTab = 'bosses';
let pendingPurchaseId = null;
let charPickerMode = 'ban';

// --- ИНИЦИАЛИЗАЦИЯ ---
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    setupEventListeners();
    renderAll();
    initTooltip();
    initParticlesEngine();
});

function getImagePath(path) { return path || DEFAULT_PLACEHOLDER; }
window.imgError = function(image) {
    if (image.src.includes(DEFAULT_PLACEHOLDER)) return true;
    image.onerror = null;
    image.src = DEFAULT_PLACEHOLDER;
    return true;
}

// --- УМНАЯ ПОДСКАЗКА SU ---
function initTooltip() {
    const tooltip = document.getElementById('smart-tooltip');
    const isClosed = localStorage.getItem('su_tooltip_closed');
    
    if (isClosed === 'true') {
        tooltip.classList.add('hidden');
        return;
    }
    tooltip.classList.remove('hidden');
    
    const savedX = localStorage.getItem('su_tooltip_x');
    const savedY = localStorage.getItem('su_tooltip_y');
    if (savedX && savedY) {
        tooltip.style.left = savedX + 'px';
        tooltip.style.top = savedY + 'px';
    } else {
        tooltip.style.left = '20px';
        tooltip.style.top = '70px';
    }

    const header = document.getElementById('tooltip-drag-handle');
    let isDragging = false, startX, startY, initialX, initialY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX; startY = e.clientY;
        initialX = tooltip.offsetLeft; initialY = tooltip.offsetTop;
        document.body.style.userSelect = 'none';
    });
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        let newX = initialX + (e.clientX - startX);
        let newY = initialY + (e.clientY - startY);
        newX = Math.max(0, Math.min(newX, window.innerWidth - tooltip.offsetWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - tooltip.offsetHeight));
        tooltip.style.left = newX + 'px';
        tooltip.style.top = newY + 'px';
    });
    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = 'auto';
            localStorage.setItem('su_tooltip_x', tooltip.style.left.replace('px', ''));
            localStorage.setItem('su_tooltip_y', tooltip.style.top.replace('px', ''));
        }
    });
}
function closeTooltip() {
    document.getElementById('smart-tooltip').classList.add('hidden');
    localStorage.setItem('su_tooltip_closed', 'true');
}
function showTooltip() {
    document.getElementById('smart-tooltip').classList.remove('hidden');
    localStorage.setItem('su_tooltip_closed', 'false');
    initTooltip();
}

// --- ЧАСТИЦЫ SU ---
function initParticlesEngine() {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [], isTabActive = true, animationFrameId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    }
    function createParticles() {
        particles = [];
        const count = window.innerWidth < 768 ? 30 : 80;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: Math.random() * -0.5 - 0.2,
                r: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }
    function draw() {
        if (!isTabActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.y < 0) p.y = canvas.height;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(145, 175, 255, ${p.alpha})`;
            ctx.shadowBlur = 5; ctx.shadowColor = "rgba(91, 124, 255, 0.8)";
            ctx.fill(); ctx.shadowBlur = 0;
        });
        animationFrameId = requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => {
        isTabActive = !document.hidden;
        if (isTabActive) draw(); else cancelAnimationFrame(animationFrameId);
    });
    resize(); draw();
}

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
function isWeeklyBoss(monsterId) {
    return ENEMIES_WEEKLY.some(e => e.monster_id === monsterId || e.monster_id === parseInt(monsterId));
}

function updateCalculator() {
    const wavesCount = state.waves.length;
    const extraWaves = Math.max(0, wavesCount - 4);
    const extraWavesPrice = extraWaves * 10;
    
    let modsPrice = 0;
    state.challenges.active.forEach(challengeId => {
        const ch = SPECIAL_CHALLENGES.find(c => c.id === challengeId);
        if (ch) modsPrice += ch.price_rub;
    });
    
    const total = 50 + extraWavesPrice + modsPrice;
    
    document.getElementById('calc-waves-count').innerText = wavesCount;
    document.getElementById('calc-extra-waves').innerText = extraWavesPrice;
    document.getElementById('calc-mods').innerText = modsPrice;
    document.getElementById('calc-total').innerText = total;
    document.getElementById('calc-extra-row').style.display = extraWavesPrice > 0 ? 'block' : 'none';
}

function copyTotalPrice() {
    const total = document.getElementById('calc-total').innerText;
    navigator.clipboard.writeText(`${total} ₽`).then(() => { alert("Сумма скопирована: " + total + " ₽"); });
}

// --- ЛОГИКА ВЫБОРА БАНОВ ---
function toggleBanCharacter(charId) {
    const existingIndex = state.bannedCharacters.findIndex(c => c && c.id === charId);
    if (existingIndex > -1) {
        state.bannedCharacters[existingIndex] = null;
    } else {
        const validCount = state.bannedCharacters.filter(c => c).length;
        if (validCount < 4) {
            const char = OWNED_CHARACTERS.find(c => c.id === charId);
            const emptySlot = state.bannedCharacters.indexOf(null);
            if (emptySlot > -1) {
                state.bannedCharacters[emptySlot] = char;
            } else if (state.bannedCharacters.length < 4) {
                state.bannedCharacters.push(char);
            }
        }
    }
    triggerAutoSave();
    renderAll();
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

// --- РЕНДЕРИНГ ---
function renderAll() {
    document.getElementById('level-name-input').value = state.levelName;
    document.getElementById('autosave-toggle').checked = appSettings.autoSave;
    renderCharacters();
    renderWaves();
    renderChallenges();
    updateActiveModifiersBanner();
    updateCalculator();
    triggerAutoSave();
}

function updateActiveModifiersBanner() {
    const banner = document.getElementById('active-modifiers-banner');
    const textSpan = document.getElementById('active-modifiers-text');
    const countSpan = document.getElementById('su-modifiers-count');
    
    const count = state.challenges.active.length;
    if (count > 0) {
        countSpan.innerText = `Модификаторов: ${count} ${state.challenges.active.includes('sc_angry_milo') ? '⚠️' : ''}`;
        countSpan.classList.remove('hidden');

        const activeNames = state.challenges.active.map(id => {
            const ch = SPECIAL_CHALLENGES.find(c => c.id === id);
            return ch ? ch.name : id;
        }).join(' • ');
        
        if (state.challenges.active.includes('sc_angry_milo')) {
            textSpan.innerHTML = activeNames + ' <span style="color: #ff4757; margin-left: 10px;">⚠ Один слот заблокирован (Злой Майло)</span>';
        } else {
            textSpan.innerText = activeNames;
        }
        banner.style.display = 'block';
    } else {
        countSpan.classList.add('hidden');
        banner.style.display = 'none';
    }
}

function renderCharacters() {
    // 1. Отрисовка выбранных банов (верхний ряд)
    const bContainer = document.getElementById('banned-container');
    bContainer.innerHTML = '';
    
    const currentBans = state.bannedCharacters.filter(c => c);
    const banCountEl = document.getElementById('ban-count');
    if (banCountEl) banCountEl.innerText = currentBans.length;

    for (let i = 0; i < 4; i++) {
        const char = state.bannedCharacters[i];
        const slot = document.createElement('div');
        slot.className = 'char-slot';
        
        if (char) {
            slot.innerHTML = `
                <img src="${getImagePath(char.icon)}" alt="${char.name}" onerror="imgError(this)" title="${char.name}">
                <button class="btn-remove-char" onclick="removeBannedCharacter(${i}, event)" title="Убрать из бана">✕</button>
            `;
        } else {
            slot.innerHTML = `<span style="color:var(--text-muted); font-size:24px; opacity: 0.5;">?</span>`;
        }
        bContainer.appendChild(slot);
    }

    // 2. Отрисовка сетки выбора персонажей для бана
    const grid = document.getElementById('inline-ban-grid');
    const searchEl = document.getElementById('inline-ban-search');
    const sortEl = document.getElementById('inline-ban-sort');
    
    if (grid && searchEl && sortEl) {
        const search = searchEl.value.toLowerCase();
        const sort = sortEl.value;

        let filtered = OWNED_CHARACTERS.filter(c => c.name.toLowerCase().includes(search));

        if (sort === 'az') filtered.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === 'za') filtered.sort((a, b) => b.name.localeCompare(a.name));
        if (sort === 'eid_desc') filtered.sort((a, b) => (b.eidolons || 0) - (a.eidolons || 0));
        if (sort === 'eid_asc') filtered.sort((a, b) => (a.eidolons || 0) - (b.eidolons || 0));

        grid.innerHTML = '';
        const banCount = currentBans.length;

        filtered.forEach(char => {
            const isBanned = currentBans.some(bc => bc.id === char.id);
            const isDisabled = !isBanned && banCount >= 4;

            const card = document.createElement('div');
            card.className = `char-card-inline ${isBanned ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`;
            card.title = `${char.name} (Эйдолонов: ${char.eidolons || 0})`;
            
            card.innerHTML = `
                <div class="char-icon-wrapper">
                    <img src="${getImagePath(char.icon)}" alt="${char.name}" onerror="imgError(this)">
                    ${isBanned ? '<div class="check-mark">✕</div>' : ''}
                </div>
                <div class="char-info-box">
                    <div class="name">${char.name}</div>
                    <div class="eidolons">Эйдолонов: <span>${char.eidolons || 0}</span></div>
                </div>
            `;
            if (!isDisabled || isBanned) {
                card.onclick = () => toggleBanCharacter(char.id);
            }
            grid.appendChild(card);
        });
    }

    // 3. Отрисовка Анлоков
    const counterEl = document.getElementById('unlocked-counter');
    if (counterEl) counterEl.innerText = `(Разблокировано: ${state.unlockedCharacters.length})`;

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
                           onchange="updateEnemyMaxHp(${wIndex}, ${eIndex}, this.value)" title="Max HP (0 = авто)">
                </div>
            `;
            grid.appendChild(eCard);
        });

        const addBtn = document.createElement('button');
        addBtn.className = 'add-enemy-btn';
        addBtn.innerHTML = '+';
        addBtn.onclick = () => openEnemyPicker(wIndex);
        grid.appendChild(addBtn);

        content.appendChild(grid); waveCard.appendChild(content);

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

function addWave() { state.waves.push({ enemies: [] }); renderAll(); }
function removeWave(index) { if(confirm('Удалить эту волну?')) { state.waves.splice(index, 1); renderAll(); } }
function moveWave(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= state.waves.length) return;
    const temp = state.waves[index]; state.waves[index] = state.waves[newIndex]; state.waves[newIndex] = temp;
    renderAll();
}
function removeEnemy(wIndex, eIndex) { state.waves[wIndex].enemies.splice(eIndex, 1); renderAll(); }
function updateEnemyLevel(wIndex, eIndex, newLevel) {
    let lvl = parseInt(newLevel) || 95; if (lvl > 95) lvl = 95; if (lvl < 1) lvl = 1;
    state.waves[wIndex].enemies[eIndex].level = lvl; triggerAutoSave(); renderAll();
}
function updateEnemyMaxHp(wIndex, eIndex, newHp) {
    let hp = parseInt(newHp) || 0; if (hp < 0) hp = 0;
    state.waves[wIndex].enemies[eIndex].max_hp = hp; triggerAutoSave();
}

// --- ПИКЕР ВРАГОВ (Enemy Picker) ---
function openEnemyPicker(wIndex) {
    currentActiveWaveIndex = wIndex;
    document.getElementById('enemy-picker-modal').classList.remove('hidden');
    switchEnemyTab('bosses'); 
}

function switchEnemyTab(tabId) {
    currentEnemyTab = tabId;
    document.querySelectorAll('.picker-tabs .tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    const weeklyWarning = document.getElementById('weekly-warning');
    if (weeklyWarning) weeklyWarning.style.display = (tabId === 'weekly') ? 'block' : 'none';
    renderEnemyPickerList();

    const grid = document.getElementById('enemy-grid');
    grid.classList.remove('tab-enter'); void grid.offsetWidth; grid.classList.add('tab-enter');
}

function renderEnemyPickerList() {
    const grid = document.getElementById('enemy-grid');
    const search = document.getElementById('enemy-search').value.toLowerCase();
    const sort = document.getElementById('enemy-sort').value;
    const filter = document.getElementById('enemy-filter').value;

    let pool = currentEnemyTab === 'bosses' ? [...ENEMIES_BOSSES] : [...ENEMIES_WEEKLY];
    let filtered = pool.filter(e => {
        const matchesSearch = e.name.toLowerCase().includes(search);
        const matchesFilter = filter === 'all' || e.element === filter;
        return matchesSearch && matchesFilter;
    });

    if (sort === 'az') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') filtered.sort((a, b) => b.name.localeCompare(a.name));

    const currentWaveIndex = currentActiveWaveIndex || 0;
    const currentWave = state.waves[currentWaveIndex];
    const totalEnemiesInWave = currentWave ? currentWave.enemies.length : 0;
    const weeklyCountInWave = currentWave ? currentWave.enemies.filter(e => isWeeklyBoss(e.monster_id)).length : 0;

    const waveCounterEl = document.getElementById('ep-wave-counter');
    const totalCounterEl = document.getElementById('ep-total-counter');
    const weeklyCounterEl = document.getElementById('ep-weekly-counter');
    
    if (waveCounterEl) waveCounterEl.innerText = `Волна: ${currentWaveIndex + 1}`;
    if (totalCounterEl) totalCounterEl.innerText = `Всего: ${totalEnemiesInWave}/5`;
    if (weeklyCounterEl) weeklyCounterEl.innerText = `Еж.: ${weeklyCountInWave}/3`;

    grid.innerHTML = '';
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-muted); grid-column: 1/-1; padding: 20px;">Противники не найдены.</p>';
        return;
    }

    filtered.forEach(enemy => {
        const sliderId = `slider_${enemy.id}_${Date.now()}`;
        const valId = `val_${enemy.id}_${Date.now()}`;
        
        const isThisWeekly = isWeeklyBoss(enemy.monster_id);
        let btnDisabled = false, btnText = "Добавить", btnClass = "btn-primary";

        if (totalEnemiesInWave >= 5) { btnDisabled = true; btnText = "Лимит 5"; btnClass = "btn-secondary"; }
        else if (isThisWeekly && weeklyCountInWave >= 3) { btnDisabled = true; btnText = "Лимит 3 еж."; btnClass = "btn-secondary"; }
        
        const card = document.createElement('div');
        card.className = 'enemy-picker-card';
        
        card.innerHTML = `
            <img src="${getImagePath(enemy.icon)}" alt="${enemy.name}" onerror="imgError(this)">
            <div class="name">${enemy.name}</div>
            <div class="enemy-id">ID: ${enemy.monster_id || '?'}</div>
            ${enemy.element ? `<div style="font-size:0.8rem; color:var(--hsr-accent);">${enemy.element}</div>` : ''}
            
            <div class="level-selector">
                <label style="font-size:0.85rem; margin-bottom:8px;">Уровень: <span id="${valId}" style="color:var(--hsr-gold); font-weight:bold;">${enemy.defaultLevel}</span></label>
                <input type="range" id="${sliderId}" min="1" max="95" value="${enemy.defaultLevel}" class="level-slider" oninput="document.getElementById('${valId}').innerText = this.value" style="width:100%; cursor:pointer;">
            </div>
            
            <button class="btn ${btnClass} btn-add" onclick="handleAddEnemyFromPicker('${enemy.id}', '${enemy.name}', '${enemy.icon}', '${sliderId}', ${enemy.monster_id || 0})" ${btnDisabled ? 'disabled' : ''}>${btnText}</button>
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
        const currentWave = state.waves[currentActiveWaveIndex];
        if (currentWave.enemies.length >= 5) { alert("Лимит: максимум 5 противников на волну!"); return; }
        if (isWeeklyBoss(monster_id)) {
            const weeklyCount = currentWave.enemies.filter(e => isWeeklyBoss(e.monster_id)).length;
            if (weeklyCount >= 3) { alert("Лимит: максимум 3 еженедельных босса на волну!"); return; }
        }
        currentWave.enemies.push({ id, name, level: level || 95, icon, monster_id: monster_id || 0, max_hp: 0 });
        closeModal('enemy-picker-modal'); renderAll();
    }
}

// --- ПИКЕР ПЕРСОНАЖЕЙ (Только Анлоки) ---
function openCharacterPicker(mode, slotIndex = null) {
    charPickerMode = mode; currentActiveSlotIndex = slotIndex;
    const title = document.getElementById('char-picker-title');
    title.innerText = 'Разблокировать персонажа';
    
    document.getElementById('char-picker-modal').classList.remove('hidden');
    renderCharPickerList();
}

function renderCharPickerList() {
    const grid = document.getElementById('char-grid');
    const search = document.getElementById('char-search').value.toLowerCase();
    const sort = document.getElementById('char-sort').value;

    const pool = LOCKED_CHARACTERS;
    let filtered = pool.filter(c => c.name.toLowerCase().includes(search));

    if (sort === 'az') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') filtered.sort((a, b) => b.name.localeCompare(a.name));

    grid.innerHTML = '';
    filtered.forEach(char => {
        const card = document.createElement('div');
        card.className = 'picker-card';
        card.innerHTML = `
            <img src="${getImagePath(char.icon)}" alt="${char.name}" onerror="imgError(this)">
            <div class="name"><strong>${char.name}</strong></div>
            <button class="btn btn-primary w-100" onclick="selectCharacter('${char.id}')" style="margin-top:auto;">Выбрать</button>
        `;
        grid.appendChild(card);
    });
}

function selectCharacter(charId) {
    const char = LOCKED_CHARACTERS.find(c => c.id === charId);
    if (!char) return;

    const alreadyExists = state.unlockedCharacters.find(c => c.id === char.id);
    if (!alreadyExists) state.unlockedCharacters.push({ ...char });
    
    triggerAutoSave(); closeModal('char-picker-modal'); renderAll();
}

// --- ЧЕЛЛЕНДЖИ ---
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
            <div style="margin-top: auto; width:100%;">${buttonHTML}</div>
        `;
        container.appendChild(card);
    });
}

function openPurchaseModal(challengeId) {
    const challenge = SPECIAL_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return;
    pendingPurchaseId = challengeId;
    document.getElementById('purchase-text').innerHTML = `Разблокировать <br><br><strong>${challenge.name}</strong><br><br> за ${challenge.price_rub} ₽?`;
    document.getElementById('purchase-modal').classList.remove('hidden');
    
    document.getElementById('btn-confirm-purchase').onclick = () => {
        if (pendingPurchaseId) {
            state.challenges.unlocked.push(pendingPurchaseId);
            if (!state.challenges.active.includes(pendingPurchaseId)) state.challenges.active.push(pendingPurchaseId);
            closeModal('purchase-modal'); renderAll();
        }
    };
}

function toggleChallenge(challengeId) {
    const index = state.challenges.active.indexOf(challengeId);
    if (index > -1) state.challenges.active.splice(index, 1);
    else state.challenges.active.push(challengeId);
    triggerAutoSave(); renderAll();
}

// --- УТИЛИТЫ ---
function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    currentActiveWaveIndex = null; currentActiveSlotIndex = null; pendingPurchaseId = null;
}

function setupEventListeners() {
    const nameInput = document.getElementById('level-name-input');
    nameInput.addEventListener('input', (e) => { state.levelName = e.target.value; triggerAutoSave(); closeTooltip(); });
    nameInput.addEventListener('focus', closeTooltip);
    
    document.getElementById('btn-add-wave').addEventListener('click', addWave);
    document.querySelectorAll('.picker-tabs .tab-btn').forEach(btn => { btn.addEventListener('click', (e) => switchEnemyTab(e.target.dataset.tab)); });
    
    document.getElementById('enemy-search').addEventListener('input', renderEnemyPickerList);
    document.getElementById('enemy-sort').addEventListener('change', renderEnemyPickerList);
    document.getElementById('enemy-filter').addEventListener('change', renderEnemyPickerList);
    
    document.getElementById('char-search').addEventListener('input', renderCharPickerList);
    document.getElementById('char-sort').addEventListener('change', renderCharPickerList);
    
    const inlineBanSearch = document.getElementById('inline-ban-search');
    const inlineBanSort = document.getElementById('inline-ban-sort');
    if (inlineBanSearch) inlineBanSearch.addEventListener('input', renderCharacters);
    if (inlineBanSort) inlineBanSort.addEventListener('change', renderCharacters);

    document.getElementById('btn-export').addEventListener('click', exportJson);
    document.getElementById('btn-import').addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('import-file').addEventListener('change', importJson);
    document.getElementById('btn-reset').addEventListener('click', resetLevel);
    
    document.getElementById('autosave-toggle').addEventListener('change', (e) => {
        appSettings.autoSave = e.target.checked;
        localStorage.setItem('levelBuilderSettings', JSON.stringify(appSettings));
        if(appSettings.autoSave) saveState(); else localStorage.removeItem('levelBuilderSave');
    });

    document.getElementById('btn-send-level').addEventListener('click', sendLevel);
    document.getElementById('btn-find-ticket').addEventListener('click', findLevelByTicket);
    document.getElementById('btn-copy-ticket').addEventListener('click', copyTicket);

    window.addEventListener('click', (e) => { if (e.target.classList.contains('modal')) closeModal(e.target.id); });
}

// --- ИМПОРТ / ЭКСПОРТ (battle_config) ---
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
    if (parsed.battle_config && Array.isArray(parsed.battle_config.monsters)) {
        const fullEnemyPool = [...ENEMIES_BOSSES, ...ENEMIES_WEEKLY];
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
    } else if (parsed.waves) { state.waves = parsed.waves; }

    if (parsed.banned_characters) {
        state.bannedCharacters = parsed.banned_characters.map(id => id ? OWNED_CHARACTERS.find(c => c.id === id) || {id, name:id, icon:DEFAULT_PLACEHOLDER} : null);
    } else { state.bannedCharacters = parsed.bannedCharacters || parsed.party || [null, null, null, null]; }
    
    while(state.bannedCharacters.length < 4) state.bannedCharacters.push(null);
    state.bannedCharacters = state.bannedCharacters.slice(0, 4);

    if (parsed.unlocked_characters) {
        state.unlockedCharacters = parsed.unlocked_characters.map(id => LOCKED_CHARACTERS.find(c => c.id === id) || {id, name:id, icon:DEFAULT_PLACEHOLDER});
    } else { state.unlockedCharacters = parsed.unlockedCharacters || []; }

    state.challenges.active = parsed.active_challenges || [];
    if (parsed.activeChallenges && Array.isArray(parsed.activeChallenges)) { state.challenges.active = parsed.activeChallenges.map(ch => ch.id || ch); }
    state.challenges.unlocked = [...new Set([...state.challenges.unlocked, ...state.challenges.active])];
    renderAll();
}

function exportJson() {
    const payload = buildExportPayload();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "custom-level.json");
    document.body.appendChild(downloadAnchorNode); downloadAnchorNode.click(); downloadAnchorNode.remove();
}

function importJson(event) {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const parsed = JSON.parse(e.target.result);
            restoreStateFromJson(parsed);
            alert("Уровень успешно импортирован!");
        } catch (error) { alert("Ошибка при разборе JSON"); }
    };
    reader.readAsText(file); event.target.value = ''; 
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
        renderAll();
    }
}

function triggerAutoSave() { if (appSettings.autoSave) saveState(); }
function saveState() { localStorage.setItem('levelBuilderSave', JSON.stringify({ state })); }
function loadState() {
    try {
        const savedSettings = localStorage.getItem('levelBuilderSettings');
        if (savedSettings) appSettings = JSON.parse(savedSettings);
        if (appSettings.autoSave) {
            const savedData = localStorage.getItem('levelBuilderSave');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                state = parsed.state;
                if (!state.bannedCharacters && state.party) { state.bannedCharacters = state.party; state.unlockedCharacters = []; }
                while(state.bannedCharacters.length < 4) state.bannedCharacters.push(null);
            }
        }
    } catch (e) { console.error("Ошибка загрузки сохранений", e); }
}

async function sendLevel() {
    const hasEnemies = state.waves.some(w => w.enemies && w.enemies.length > 0);
    if (!hasEnemies) { alert("Нельзя отправить пустой уровень! Добавьте противников."); return; }

    const payload = buildExportPayload();
    const jsonStr = JSON.stringify(payload);
    
    if (new Blob([jsonStr]).size > 50 * 1024) { alert("Размер файла слишком большой! Максимум 50KB."); return; }

    const btn = document.getElementById('btn-send-level');
    const originalText = btn.innerText; btn.innerText = "Отправка..."; btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/levels`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: jsonStr });
        if (!response.ok) throw new Error("Сервер отклонил уровень");
        const data = await response.json();
        document.getElementById('ticket-display').innerText = data.ticket;
        document.getElementById('ticket-modal').classList.remove('hidden');
    } catch (error) { alert("Ошибка отправки уровня: " + error.message); } 
    finally { btn.innerText = originalText; btn.disabled = false; }
}

async function findLevelByTicket() {
    const input = document.getElementById('ticket-input');
    const ticket = input.value.trim().toUpperCase();
    if (!ticket) { alert("Введите корректный тикет (напр. LVL-XXXXXX)"); return; }

    const btn = document.getElementById('btn-find-ticket');
    const originalText = btn.innerText; btn.innerText = "🔍..."; btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/levels/${ticket}`);
        if (response.status === 404) { alert("Тикет не найден или истек срок действия."); return; }
        if (!response.ok) throw new Error("Ошибка загрузки уровня");

        const parsed = await response.json();
        restoreStateFromJson(parsed);
        alert(`Уровень "${state.levelName}" успешно загружен!`);
        input.value = ''; 
    } catch (error) { alert("Ошибка загрузки уровня: " + error.message); } 
    finally { btn.innerText = originalText; btn.disabled = false; }
}

function copyTicket() {
    const ticketText = document.getElementById('ticket-display').innerText;
    navigator.clipboard.writeText(ticketText).then(() => {
        const btn = document.getElementById('btn-copy-ticket');
        btn.innerText = "Скопировано!";
        setTimeout(() => btn.innerText = "Скопировать тикет", 2000);
    });

}
