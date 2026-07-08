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
// Borgonha (5→8) e depois Champagne (8→11), retorno a Paris no dia 11.
const ITINERARY = [
  {
    n: 1, date: "5", region: "borgonha", tag: "Borgonha",
    title: "Paris → Borgonha",
    items: [
      "Saída de Paris rumo à Borgonha (TGV Paris–Dijon ~1h35, ou carro ~3h).",
      `Check-in no hotel da Borgonha. <a href="${HOTEL_BORGONHA}" target="_blank" rel="noopener">📍 Ver no mapa</a>`,
      "Dijon: Palais des Ducs, Rue des Forges e o mercado Les Halles.",
      "Jantar borguinhonhês: œufs en meurette ou bœuf bourguignon. 🍷",
    ],
    note: "Prove a mostarda de Dijon na fonte e o pain d'épices.",
  },
  {
    n: 2, date: "6", region: "borgonha", tag: "Borgonha",
    title: "Côte de Nuits — os grandes tintos",
    items: [
      "Estrada dos Grands Crus: Gevrey-Chambertin, Chambolle-Musigny, Vosne-Romanée.",
      "Foto no muro do lendário La Romanée-Conti (visita só de fora).",
      "Degustação de Pinot Noir num domaine de Nuits-Saint-Georges.",
      "Clos de Vougeot: castelo e história da viticultura dos monges cistercienses.",
    ],
    note: "Outubro veste as vinhas de tons dourados e avermelhados — leve a câmera. Reserve os domaines com antecedência.",
  },
  {
    n: 3, date: "7", region: "borgonha", tag: "Borgonha",
    title: "Beaune & Côte de Beaune",
    items: [
      "Hospices de Beaune (Hôtel-Dieu) e seu telhado de telhas vitrificadas.",
      "Marché aux Vins ou Patriarche: degustação em caves antigas com tastevin.",
      "Pommard e Volnay (tintos elegantes); Meursault e Puligny-Montrachet (os grandes brancos).",
      "Compras: leve garrafas direto do produtor.",
    ],
    note: "Beaune é compacta e perfeita a pé — coração vinícola da Borgonha.",
  },
  {
    n: 4, date: "8", region: "champagne", tag: "Champagne",
    title: "Borgonha → Champagne (Reims)",
    items: [
      "Transferência da Borgonha para a Champagne (~3h de carro; ou trem via Paris).",
      `Check-in no <strong>Domaine Les Crayères</strong>, castelo 5★ em Reims. <a href="${HOTEL_CHAMPAGNE}" target="_blank" rel="noopener">📍 Ver no mapa</a>`,
      "Catedral de Reims (UNESCO), onde os reis franceses eram coroados.",
      "Primeira taça de champagne na Place Drouet d'Erlon. 🥂",
    ],
    note: "Domaine Les Crayères — Relais & Châteaux num parque de 7 hectares, com restaurante estrelado Michelin. 64 Bd Henry Vasnier, 51100 Reims.",
  },
  {
    n: 5, date: "9", region: "champagne", tag: "Champagne",
    title: "Reims — as grandes maisons",
    items: [
      "Visita com degustação em uma grande maison: Taittinger, Ruinart ou Veuve Clicquot.",
      "Caves em giz (crayères) escavadas pelos romanos — frias, leve casaco.",
      "Tarde pelo centro histórico de Reims, cafés e a Place Drouet d'Erlon.",
      "Jantar com harmonização de champagnes brut e blanc de blancs.",
    ],
    note: "Confirme horários das maisons — algumas só recebem com hora marcada.",
  },
  {
    n: 6, date: "10", region: "champagne", tag: "Champagne",
    title: "Épernay & Avenue de Champagne",
    items: [
      "Avenue de Champagne, com km de caves sob os pés: Moët & Chandon, Perrier-Jouët, Pol Roger.",
      "Hautvillers: abadia onde Dom Pérignon trabalhou o método champenoise.",
      "Almoço numa vila da Côte des Blancs entre vinhedos de Chardonnay.",
      "Visita a um récoltant-manipulant (pequeno produtor) para contraste com as grandes marcas.",
    ],
    note: "Reserve o récoltant com antecedência — são famílias, não recebem sem aviso.",
  },
  {
    n: 7, date: "11", region: "paris", tag: "Paris",
    title: "Retorno a Paris",
    items: [
      "Manhã livre na Champagne; última taça e compras.",
      "Retorno a Paris (TGV Reims–Paris ~45 min, ou carro).",
      "Deixe folga para trânsito e, se houver voo, check-in internacional.",
    ],
    note: "Fim da rota Borgonha & Champagne — profitez bien !",
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
