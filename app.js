/* ============================================================
   Borgonha & Champagne — app da viagem (5–12 dez)
   Sem dependências. Dados do diário ficam no localStorage.
   ============================================================ */

/* ---------- Config da viagem ---------- */
// Mês da viagem (0 = jan … 11 = dez). Ajuste aqui se mudar o mês.
const TRIP_MONTH = 9;           // outubro
const TRIP_MONTH_LABEL = "out"; // rótulo curto exibido nas datas
const TRIP_START_DAY = 5;       // saída de Paris → Borgonha
const HOTEL_BORGONHA = "https://maps.app.goo.gl/Koe4asrhXTtxscNJ9?g_st=ic";
const HOTEL_CHAMPAGNE = "https://www.google.com/maps/search/?api=1&query=Domaine%20Les%20Crayeres%2064%20Bd%20Henry%20Vasnier%2051100%20Reims";

/* ---------- Roteiro dia a dia ---------- */
// Borgonha (5→7), ida a Reims dia 8, Champagne (8→10), Paris dia 11, volta a SP dia 12.
const ITINERARY = [
  {
    n: 1, date: "5", region: "borgonha", tag: "Borgonha",
    title: "Chegada · dia livre",
    items: [
      "Dia livre para chegar e sentir a Borgonha sem pressa.",
      "Sugestão: primeira volta pelos arredores de Beaune e pelas vinhas.",
      `Jantar no hotel — <strong>Hostellerie de Levernois</strong>. <a href="${HOTEL_BORGONHA}" target="_blank" rel="noopener">📍 Ver no mapa</a> 🍷`,
    ],
    note: "Dia mais tranquilo para se ajustar do fuso antes das degustações.",
  },
  {
    n: 2, date: "6", region: "borgonha", tag: "Borgonha",
    title: "Corton de bike & Gevrey",
    items: [
      "Passeio de bicicleta pela colina de Corton (Aloxe-Corton).",
      "Almoço no <strong>Le Soufflot</strong>.",
      "Degustação: <strong>Domaine Marc Roy</strong> (Gevrey-Chambertin) ou <strong>Sylvain Pataille</strong> (Marsannay).",
      "Jantar: <strong>Bistrot Lucien</strong> ou <strong>Au Fil du Clos</strong>. 🍷",
    ],
    note: "Corton é o grande cru que dá tinto e branco — dia de Pinot Noir da Côte de Nuits.",
  },
  {
    n: 3, date: "7", region: "borgonha", tag: "Borgonha",
    title: "Beaune",
    items: [
      "Manhã no centrinho de Beaune.",
      "Museu (Hospices de Beaune / Hôtel-Dieu ou o Musée du Vin).",
      "Degustação: <strong>Philippe Pacalet</strong>.",
      "Jantar: <strong>La Lune</strong>. 🥂",
    ],
    note: "Beaune é compacta e perfeita a pé — coração vinícola da Borgonha.",
  },
  {
    n: 4, date: "8", region: "champagne", tag: "Champagne",
    title: "Ida para Reims",
    items: [
      "Viagem da Borgonha para Reims (Champagne).",
      "Almoço no caminho: <strong>La Garde Champêtre</strong> (Côte des Bar).",
      "Visita: <strong>Champagne Doyard</strong> ou <strong>Pomerol</strong>.",
      `Check-in no <strong>Domaine Les Crayères</strong>, em Reims. <a href="${HOTEL_CHAMPAGNE}" target="_blank" rel="noopener">📍 Ver no mapa</a>`,
      "Jantar no hotel — <strong>Le Jardin</strong> (brasserie de Les Crayères). 🥂",
    ],
    note: "La Garde Champêtre fica no meio do caminho, na Côte des Bar — ótima parada para o almoço.",
  },
  {
    n: 5, date: "9", region: "champagne", tag: "Champagne",
    title: "Reims: cidade, catedral & Ruinart",
    items: [
      "Passeio pela cidade — <strong>Rue de Tambour</strong>.",
      "Loja: <strong>Le Pressoir</strong>.",
      "Visita à <strong>Catedral de Reims</strong> (UNESCO).",
      "Visita à <strong>Ruinart</strong> com almoço.",
      "Jantar: <strong>La Grande Georgette</strong>; depois um drink no <strong>The Glue Pot</strong> ou <strong>Le Wine Bar by Le Vintage</strong>. 🍸",
    ],
    note: "Ruinart é a maison de champagne mais antiga (1729). Obs.: a visita aparece também no dia 10 — confirme em qual dia fica.",
  },
  {
    n: 6, date: "10", region: "champagne", tag: "Champagne",
    title: "Ruinart & Épernay",
    items: [
      "Visita à <strong>Ruinart</strong> — 10:30.",
      "Ida a Épernay: <strong>L'Avenue de Champagne</strong>.",
      "Almoço: <strong>Sacré Bistro</strong>.",
      "<strong>Le Château Perrier</strong> — Musée du Vin de Champagne.",
      "Visitas: <strong>Dom Pérignon</strong> / <strong>Veuve Clicquot</strong>.",
      "Jantar: <strong>Au Bon Manger</strong>. 🥂",
    ],
    note: "Avenue de Champagne: quilômetros de grandes maisons com caves sob os pés.",
  },
  {
    n: 7, date: "11", region: "paris", tag: "Paris",
    title: "Ida a Paris",
    items: [
      "Viagem de Reims a Paris (TGV ~45 min, ou carro).",
      "⏰ Definir o horário da ida a Paris.",
      "Tarde/noite livre em Paris.",
    ],
    note: "Falta definir o horário de saída para Paris — me diga que eu marco aqui.",
  },
  {
    n: 8, date: "12", region: "paris", tag: "Paris",
    title: "Volta a São Paulo",
    items: [
      "Retorno de Paris a São Paulo. ✈️",
      "Deixe folga para o check-in internacional e o trânsito até o aeroporto.",
    ],
    note: "Fim da viagem Borgonha & Champagne — profitez bien ! 🥂",
  },
];

/* ---------- Frases em francês ---------- */
const PHRASES = [
  {
    group: "No básico",
    list: [
      { fr: "Bonjour ! / Bonsoir !", pt: "Bom dia! / Boa noite!", io: "bõ-JUR / bõ-SUÁR" },
      { fr: "S'il vous plaît", pt: "Por favor", io: "sil vu PLÉ" },
      { fr: "Merci beaucoup", pt: "Muito obrigado(a)", io: "mer-SI bô-KÚ" },
      { fr: "Pardon, parlez-vous anglais ?", pt: "Desculpe, você fala inglês?", io: "par-DÕ, par-lê-VU ã-GLÉ" },
      { fr: "L'addition, s'il vous plaît", pt: "A conta, por favor", io: "la-di-si-Õ sil vu PLÉ" },
    ],
  },
  {
    group: "No restaurante",
    list: [
      { fr: "Une table pour deux, s'il vous plaît", pt: "Uma mesa para dois, por favor", io: "ün TÁBL pur DÊ" },
      { fr: "Qu'est-ce que vous recommandez ?", pt: "O que você recomenda?", io: "kés-kê vu rê-ko-mã-DÊ" },
      { fr: "Je voudrais le menu du jour", pt: "Eu queria o menu do dia", io: "jê vu-DRÊ lê mê-NÜ dü JUR" },
      { fr: "C'était délicieux !", pt: "Estava delicioso!", io: "sê-TÉ dê-li-si-Ê" },
      { fr: "Je suis végétarien(ne)", pt: "Sou vegetariano(a)", io: "jê süí vê-jê-ta-ri-Ẽ" },
    ],
  },
  {
    group: "Na vinícola",
    list: [
      { fr: "Nous avons une réservation pour la dégustation", pt: "Temos reserva para a degustação", io: "nu-za-võ ün rê-zer-va-si-Õ" },
      { fr: "Quels cépages, s'il vous plaît ?", pt: "Quais as uvas, por favor?", io: "kél sê-PÁJ" },
      { fr: "De quel millésime ?", pt: "De qual safra?", io: "dê kél mi-lê-ZÍM" },
      { fr: "Peut-on acheter des bouteilles ?", pt: "Podemos comprar garrafas?", io: "pê-tõ ash-TÊ dê bu-TÊI" },
      { fr: "À votre santé ! / Santé !", pt: "À sua saúde! / Saúde!", io: "a votr sã-TÊ" },
    ],
  },
];

/* ============================================================
   Render — roteiro
   ============================================================ */
const TRIP_YEAR = 2026;
const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
function fmtDate(day) {
  const wd = WEEKDAYS[new Date(TRIP_YEAR, TRIP_MONTH, Number(day)).getDay()];
  return `${wd} · ${day} ${TRIP_MONTH_LABEL}`;
}

function renderDays() {
  const box = document.getElementById("days");
  box.innerHTML = ITINERARY.map((d, i) => `
    <article class="day${i === 0 ? " is-open" : ""}" data-i="${i}">
      <button class="day__head" aria-expanded="${i === 0}">
        <span class="day__num"><small>Dia</small><b>${d.n}</b></span>
        <span class="day__meta">
          <span class="day__date">${fmtDate(d.date)}</span>
          <span class="day__title">${d.title}</span>
        </span>
        <span class="day__tag ${d.region}">${d.tag}</span>
        <span class="day__chev">›</span>
      </button>
      <div class="day__body">
        <div class="day__body-inner">
          <ul>${d.items.map((it) => `<li>${it}</li>`).join("")}</ul>
          <p class="day__note">${d.note}</p>
        </div>
      </div>
    </article>`).join("");

  box.querySelectorAll(".day__head").forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = btn.closest(".day");
      const open = day.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
}

/* ============================================================
   Render — frases
   ============================================================ */
function renderPhrases() {
  const box = document.getElementById("phrases");
  box.innerHTML = PHRASES.map((g) => `
    <div class="phrase-group">
      <h3>${g.group}</h3>
      ${g.list.map((p) => `
        <button class="phrase" data-say="${p.fr.replace(/"/g, "&quot;")}">
          <span>
            <span class="phrase__fr">${p.fr}</span><br>
            <span class="phrase__pt">${p.pt}</span>
            <span class="phrase__io">[${p.io}]</span>
          </span>
          <span class="phrase__spk">🔊</span>
        </button>`).join("")}
    </div>`).join("");

  box.querySelectorAll(".phrase").forEach((btn) => {
    btn.addEventListener("click", () => speak(btn.dataset.say));
  });
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fr-FR";
  u.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

/* ============================================================
   Diário de vinhos (localStorage)
   ============================================================ */
const STORE_KEY = "bc_wine_journal_v1";
let currentRating = 0;

function loadWines() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
  catch { return []; }
}
function saveWines(list) {
  localStorage.setItem(STORE_KEY, JSON.stringify(list));
}

function renderWines() {
  const list = loadWines();
  const ul = document.getElementById("winelist");
  const count = document.getElementById("winecount");

  count.textContent = list.length
    ? `${list.length} ${list.length === 1 ? "vinho registrado" : "vinhos registrados"}`
    : "";

  if (!list.length) {
    ul.innerHTML = `<li class="empty">Nenhum vinho ainda. Registre a primeira taça! 🍷</li>`;
    return;
  }

  ul.innerHTML = list.map((w) => `
    <li class="wine">
      <button class="wine__del" data-id="${w.id}" aria-label="Excluir">✕</button>
      <div class="wine__top">
        <span class="wine__name">${esc(w.name)}</span>
        <span class="wine__stars">${"★".repeat(w.rating)}${"☆".repeat(5 - w.rating)}</span>
      </div>
      <div class="wine__sub">${[esc(w.maker), esc(w.year)].filter(Boolean).join(" · ")}</div>
      <span class="wine__region">${esc(w.region)}</span>
      ${w.notes ? `<p class="wine__notes">${esc(w.notes)}</p>` : ""}
    </li>`).join("");

  ul.querySelectorAll(".wine__del").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = loadWines().filter((w) => w.id !== btn.dataset.id);
      saveWines(next);
      renderWines();
    });
  });
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function setupWineForm() {
  const form = document.getElementById("wineform");
  const stars = document.getElementById("w-stars");

  stars.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      currentRating = Number(b.dataset.v);
      paintStars();
    });
    b.addEventListener("mouseenter", () => paintStars(Number(b.dataset.v)));
  });
  stars.addEventListener("mouseleave", () => paintStars());

  function paintStars(hover) {
    const v = hover || currentRating;
    stars.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("on", Number(b.dataset.v) <= v);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("w-name").value.trim();
    if (!name) return;

    const entry = {
      id: String(Date.now()) + Math.round(performance.now()),
      name,
      maker: document.getElementById("w-maker").value.trim(),
      year: document.getElementById("w-year").value.trim(),
      region: document.getElementById("w-region").value,
      rating: currentRating || 0,
      notes: document.getElementById("w-notes").value.trim(),
    };

    const list = loadWines();
    list.unshift(entry);
    saveWines(list);

    form.reset();
    currentRating = 0;
    paintStars();
    renderWines();
  });
}

/* ============================================================
   Tabs
   ============================================================ */
function setupTabs() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      tabs.forEach((x) => x.classList.remove("is-active"));
      t.classList.add("is-active");
      document.querySelectorAll(".panel").forEach((p) => p.classList.remove("is-active"));
      document.getElementById("tab-" + t.dataset.tab).classList.add("is-active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

/* ============================================================
   Contagem regressiva até 5 dez 2026
   ============================================================ */
function setupCountdown() {
  const target = new Date(TRIP_YEAR, TRIP_MONTH, TRIP_START_DAY, 0, 0, 0);
  const el = { d: document.getElementById("cd-days"), h: document.getElementById("cd-hours"), m: document.getElementById("cd-mins") };

  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      el.d.textContent = "0"; el.h.textContent = "0"; el.m.textContent = "0";
      document.querySelector(".hero__dates").textContent = "A viagem começou — profitez bien ! 🥂";
      return;
    }
    const mins = Math.floor(diff / 60000);
    el.d.textContent = Math.floor(mins / 1440);
    el.h.textContent = Math.floor((mins % 1440) / 60);
    el.m.textContent = mins % 60;
  }
  tick();
  setInterval(tick, 30000);
}

/* ---------- Boot ---------- */
renderDays();
renderPhrases();
renderWines();
setupWineForm();
setupTabs();
setupCountdown();
