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
// Detalhado a partir da planilha do assessor (out/2026). Horários são sugestões.
const ITINERARY = [
  {
    n: 1, date: "5", region: "borgonha", tag: "Borgonha",
    title: "Chegada & dia livre",
    items: [
      `<span class="t">Tarde</span> Chegada e check-in — dia livre. <strong>Hostellerie de Levernois</strong> (5 min de Beaune). <a href="${HOTEL_BORGONHA}" target="_blank" rel="noopener">📍 Mapa</a>`,
      `<span class="t">19h30</span> Jantar — <strong>La Table de Levernois</strong> (restaurante estrelado do hotel). 🍷`,
    ],
    note: "Dia livre: caminhada pelo parque do hotel ou primeira volta a pé por Beaune. Ajuste do fuso.",
  },
  {
    n: 2, date: "6", region: "borgonha", tag: "Borgonha",
    title: "Corton de bike, Meursault & Côte de Nuits",
    items: [
      `<span class="t">9h00</span> Passeio de bike (e-bike do hotel) pela <strong>Montagne de Corton</strong> — Savigny, Pernand-Vergelesses, Aloxe-Corton, Ladoix.`,
      `<span class="t">13h00</span> Almoço — <strong>Le Soufflot</strong> (Meursault).`,
      `<span class="t">16h00</span> Visita — <strong>Domaine Marc Roy</strong> (Gevrey) ou <strong>Sylvain Pataille</strong> (Marsannay).`,
      `<span class="t">19h30</span> Jantar — <strong>Bistrot Lucien</strong> (Gevrey) ou <strong>Au Fil du Clos</strong> (Meursault). 🍷`,
    ],
    note: "Escolher só uma visita (as duas no mesmo fim de tarde fica corrido). Levar corta-vento — manhãs de outubro entre 6 e 10 °C.",
  },
  {
    n: 3, date: "7", region: "borgonha", tag: "Borgonha",
    title: "Beaune",
    items: [
      `<span class="t">10h00</span> Centrinho de Beaune — Place Carnot, Rue Monge, muralhas.`,
      `<span class="t">11h00</span> Museu — <strong>Hôtel-Dieu / Hospices de Beaune</strong> (~1h15 com audioguia).`,
      `<span class="t">13h00</span> Almoço livre em Beaune (algo leve).`,
      `<span class="t">15h30</span> Visita — <strong>Philippe Pacalet</strong> (a confirmar).`,
      `<span class="t">19h30</span> Jantar — <strong>La Lune</strong>. 🥂`,
    ],
    note: "Confirme o Pacalet (agenda disputada) e reserve o La Lune já — casa minúscula.",
  },
  {
    n: 4, date: "8", region: "champagne", tag: "Champagne",
    title: "Borgonha → Champagne (Côte des Bar)",
    items: [
      `<span class="t">9h30</span> Check-out e saída para a Champagne (Levernois → Gyé ~2h15).`,
      `<span class="t">12h30</span> Almoço — <strong>Le Garde Champêtre</strong> (Gyé-sur-Seine, Côte des Bar).`,
      `<span class="t">16h30</span> Visita — <strong>Champagne Doyard</strong> (Vertus) ou <strong>Pol Roger</strong> (Épernay).`,
      `<span class="t">18h30</span> Check-in — <strong>Domaine Les Crayères</strong>, Reims. <a href="${HOTEL_CHAMPAGNE}" target="_blank" rel="noopener">📍 Mapa</a>`,
      `<span class="t">20h00</span> Jantar — <strong>Brasserie Le Jardin</strong> (hotel). 🥂`,
    ],
    note: "La Garde Champêtre serve almoço na quinta (menu €35). Com o almoço em Gyé, só cabe uma visita à tarde.",
  },
  {
    n: 5, date: "9", region: "champagne", tag: "Champagne",
    title: "Reims",
    items: [
      `<span class="t">9h30</span> <strong>Catedral de Notre-Dame de Reims</strong> (vitrais de Chagall) e o Palais du Tau.`,
      `<span class="t">10h30</span> Passeio — Rue de Tambour, Place du Forum, Halles du Boulingrin.`,
      `<span class="t">11h30</span> Loja — <strong>Le Pressoir</strong> (cave com degustação).`,
      `<span class="t">13h00</span> Almoço — <strong>Le Bocal</strong> ou <strong>Brasserie du Boulingrin</strong> (a definir).`,
      `<span class="t">16h00</span> Visita — <strong>Veuve Clicquot</strong> (opcional, em Reims).`,
      `<span class="t">20h00</span> Jantar — <strong>Au Bon Manger</strong> (cave à manger). 🍷`,
      `<span class="t">22h00</span> Drinks — <strong>The Glue Pot</strong> ou <strong>Le Wine Bar by Le Vintage</strong>. 🍸`,
    ],
    note: "A Veuve Clicquot fica em Reims (não em Épernay) — encaixada aqui na tarde livre. Sexta tem mercado nas Halles du Boulingrin.",
  },
  {
    n: 6, date: "10", region: "champagne", tag: "Champagne",
    title: "Reims & Épernay",
    items: [
      `<span class="t">10h30</span> Visita — <strong>Maison Ruinart</strong> (confirmada, grupo de 7).`,
      `<span class="t">12h15</span> Ida a Épernay (D951, pela Montagne de Reims).`,
      `<span class="t">13h00</span> Almoço — <strong>Sacré Bistro</strong>.`,
      `<span class="t">15h00</span> L'Avenue de Champagne + <strong>Château Perrier</strong> (Musée du Vin).`,
      `<span class="t">16h30</span> Visita — <strong>Moët & Chandon / Dom Pérignon</strong>.`,
      `<span class="t">20h30</span> Jantar — <strong>La Grande Georgette</strong> (em Reims). 🥂`,
    ],
    note: "Dia apertado: peça para a Ruinart terminar até 12h15 (almoço em Épernay encerra às 14h). Ruinart é a única visita já confirmada.",
  },
  {
    n: 7, date: "11", region: "paris", tag: "Paris",
    title: "Reims → Paris",
    items: [
      `<span class="t">Manhã</span> Manhã tranquila em Reims e check-out.`,
      `<span class="t">≈12h00</span> <strong>TGV Reims → Paris Est</strong> (direto, 46 min).`,
      `<span class="t">Tarde</span> Paris — domingo, reserve o jantar com antecedência.`,
    ],
    note: "Alternativa: trem ~17h, se preferirem visita/almoço em Reims. Comprar no SNCF Connect; devolver o carro em Reims antes.",
  },
  {
    n: 8, date: "12", region: "paris", tag: "Paris",
    title: "Volta a São Paulo",
    items: [
      `<span class="t">A definir</span> Voo <strong>Paris (CDG) → São Paulo (GRU)</strong>. Centro → CDG: 45–60 min.`,
      `Estar no aeroporto 3h antes.`,
    ],
    note: "Vinhos na mala despachada — proteja bem as garrafas. Fim da viagem, profitez bien ! 🥂",
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
