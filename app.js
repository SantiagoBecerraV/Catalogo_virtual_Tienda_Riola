/* RIOLA — Catálogo. Vanilla JS con enrutado por hash:
   #/  ·  #/disenos  ·  #/siluetas/:categoria  ·  #/seleccion
   Los datos viven en catalog.js (inventario real de imágenes). */

const catalog = window.RIOLA_CATALOG;
const app = document.getElementById("app");

if (!catalog) {
  app.textContent = "No se pudo cargar el catálogo (catalog.js).";
  throw new Error("[RIOLA] catalog.js no cargó");
}

const { models, designs, silhouettes } = catalog;

/* ---------- Utilidades ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
// Las rutas reales contienen espacios, tildes y paréntesis: se codifican al renderizar.
const url = (path) => encodeURI(path);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const designById = new Map(designs.map((d) => [d.id, d]));
const photoById = new Map(silhouettes.flatMap((c) => c.photos.map((p) => [p.id, { photo: p, category: c }])));
const categoryById = new Map(silhouettes.map((c) => [c.id, c]));

/* ---------- Estado único de selección ---------- */
const STORAGE_KEY = "riola-selection";
const state = { designId: null, silhouetteId: null };

try {
  const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  if (designById.has(saved.designId)) state.designId = saved.designId;
  if (photoById.has(saved.silhouetteId)) state.silhouetteId = saved.silhouetteId;
} catch {}

const persist = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

const selectedDesign = () => designById.get(state.designId) || null;
const selectedSilhouette = () => photoById.get(state.silhouetteId) || null;

/* ---------- Tallas y medidas ----------
   PENDIENTE DE CONFIRMAR: estos valores vienen del proyecto original, donde se generaban con una fórmula
   (paso de 4/2/1 cm por talla). No hay una tabla de medidas verificada en el repositorio, por lo que
   se presentan como orientativas. Sustituir por las medidas reales de RIOLA cuando existan. */
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const buildRows = (w, l, s, step = [4, 2, 1]) =>
  SIZES.map((size, i) => ({ size, width: w + i * step[0], length: l + i * step[1], sleeve: s === null ? null : s + i * step[2] }));

const measurements = {
  normal: { tab: "Silueta Normal", rows: buildRows(46, 68, 20) },
  "oversize-unicolor": { tab: "Oversize unicolor", rows: buildRows(54, 70, 24) },
  "oversize-acid-wash": { tab: "Oversize acid wash", rows: buildRows(55, 71, 25) },
  "manga-sisa": { tab: "Manga sisa acid wash", rows: buildRows(50, 69, null, [4, 2, 0]) },
  busos: { tab: "Buzos", rows: buildRows(56, 66, 60) },
};
let measureCat = silhouettes[0].id;

/* ---------- Plantillas ---------- */
const ICONS = {
  prev: '<path d="m15 18-6-6 6-6"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
  back: '<path d="m12 19-7-7 7-7M19 12H5"/>',
};

const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true">${ICONS[name]}</svg>`;

const img = (item, { alt, eager = false, priority = false } = {}) =>
  `<img src="${url(item.src)}" alt="${esc(alt ?? item.alt ?? item.label)}" width="${item.width}" height="${item.height}"
    ${eager ? 'loading="eager"' : 'loading="lazy"'} decoding="async"${priority ? ' fetchpriority="high"' : ""} />`;

// Rayito original de RIOLA (mismo trazado del proyecto original).
const bolt = (cls = "") =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" class="bolt ${cls}"><path d="M14 1 4 14h6l-2 9 11-14h-6.5L14 1Z"/></svg>`;

const stateText = (on) => (on ? "✓ Seleccionado" : "Seleccionar");

// Tarjeta seleccionable: un <button> con aria-pressed (kind: "design" | "silhouette").
const selectCard = (kind, item, alt) => {
  const on = (kind === "design" ? state.designId : state.silhouetteId) === item.id;
  return `
  <button type="button" class="card${on ? " is-selected" : ""}" data-select="${kind}" data-id="${item.id}" aria-pressed="${on}">
    <span class="frame frame-product">${img(item, { alt })}</span>
    <span class="card-meta">
      <span class="card-label">${esc(item.label)}</span>
      <span class="card-state">${stateText(on)}</span>
    </span>
  </button>`;
};

const designCard = (d) => selectCard("design", d, `${d.label}: diseño gráfico RIOLA`);
const photoCard = (p) => selectCard("silhouette", p, p.alt);

const photoFigure = (m, { eager = false, priority = false, ratio = "ratio-portrait" } = {}) => `
  <figure class="editorial">
    <span class="frame ${ratio}">${img(m, { eager, priority })}</span>
  </figure>`;

const sectionHead = (title, linkHtml = "", tag = "h2") => `
  <div class="section-head">
    <${tag} class="section-title">${bolt()}${title}</${tag}>
    ${linkHtml}
  </div>`;

const backLink = () => `<a href="#/" class="back-link">${icon("back")} Volver</a>`;

const measureDiagram = () => `
  <svg viewBox="0 0 220 190" role="img" aria-label="Diagrama de medidas: A ancho, B largo, C manga">
    <path d="M80 30 L58 36 L26 62 L42 88 L60 78 L60 172 L160 172 L160 78 L178 88 L194 62 L162 36 L140 30 Q110 46 80 30 Z" class="dg-shape" stroke-width="2" stroke-linejoin="round"/>
    <g class="dg-line" stroke-width="2">
      <line x1="62" y1="96" x2="158" y2="96"/>
      <line x1="28" y1="40" x2="28" y2="172"/>
      <line x1="166" y1="40" x2="190" y2="60"/>
    </g>
    <g class="dg-tag"><circle cx="110" cy="84" r="9"/><circle cx="12" cy="106" r="9"/><circle cx="186" cy="36" r="9"/></g>
    <g class="dg-text" font-size="12" font-weight="700" text-anchor="middle">
      <text x="110" y="88">A</text><text x="12" y="110">B</text><text x="186" y="40">C</text>
    </g>
  </svg>`;

const measureTable = (id) => {
  const m = measurements[id];
  const cell = (v) => (v === null ? "—" : v);
  return `
  <div class="table-wrap" tabindex="0" role="region" aria-label="Tabla de medidas en centímetros: ${esc(m.tab)}">
    <table>
      <caption class="sr-only">Medidas orientativas en centímetros — ${esc(m.tab)}</caption>
      <thead><tr><th scope="col">Talla</th><th scope="col">A · Ancho (cm)</th><th scope="col">B · Largo (cm)</th><th scope="col">C · Manga (cm)</th></tr></thead>
      <tbody>${m.rows
        .map((r) => `<tr><th scope="row">${r.size}</th><td>${r.width}</td><td>${r.length}</td><td>${cell(r.sleeve)}</td></tr>`)
        .join("")}</tbody>
    </table>
  </div>`;
};

const measureSection = (id) => `
  <section class="section" aria-labelledby="medidas-title">
    ${sectionHead(`<span id="medidas-title">Tabla de Medidas</span>`)}
    <div role="tablist" class="tabs" aria-label="Categoría de silueta" id="measure-tabs">
      ${silhouettes
        .map(
          (c) =>
            `<button type="button" role="tab" class="tab" id="mtab-${c.id}" data-mtab="${c.id}" aria-selected="${c.id === id}" aria-controls="measure-panel" tabindex="${c.id === id ? 0 : -1}">${esc(measurements[c.id].tab)}</button>`,
        )
        .join("")}
    </div>
    <div class="measure-layout">
      <div class="diagram-box">
        ${measureDiagram()}
        <ul class="legend"><li><b>A</b> Ancho</li><li><b>B</b> Largo</li><li><b>C</b> Manga</li></ul>
      </div>
      <div id="measure-panel" role="tabpanel" aria-labelledby="mtab-${id}">
        <div id="measure-table" class="fade-in">${measureTable(id)}</div>
        <p class="note-small">Guía de tallas orientativa, en centímetros; valores pendientes de confirmación por RIOLA. No indica disponibilidad ni stock. «—» significa que la medida no aplica.</p>
      </div>
    </div>
  </section>`;

const setMeasureCat = (id, focus = false) => {
  measureCat = id;
  document.querySelectorAll("[data-mtab]").forEach((t) => {
    const on = t.dataset.mtab === id;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    if (on && focus) t.focus();
  });
  const holder = document.getElementById("measure-table");
  if (!holder) return;
  document.getElementById("measure-panel").setAttribute("aria-labelledby", `mtab-${id}`);
  holder.innerHTML = measureTable(id);
  holder.classList.remove("fade-in");
  void holder.offsetWidth;
  holder.classList.add("fade-in");
};

/* ---------- Vistas ---------- */
const homeCategoryPhotos = (catId) => {
  const c = categoryById.get(catId);
  return c.photos.map((p) => `<div class="track-item">${photoCard(p)}</div>`).join("");
};

let homeCat = silhouettes[0].id;

const homeView = () => `
  <main id="main" tabindex="-1" class="view-enter page">
    <section class="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" class="display">Elige tu diseño y silueta ${bolt("bolt-lg")}</h1>
      <p class="lead">Explora los diseños RIOLA, mira las siluetas disponibles y guarda tu selección mientras navegas.</p>
      <div class="actions">
        <a href="#/disenos" class="btn">Ver diseños</a>
        <a href="#/siluetas/${silhouettes[0].id}" class="btn">Ver siluetas</a>
        <a href="#/medidas" class="btn">Tallas y medidas</a>
      </div>
      <div class="split">
        ${photoFigure(models[1], { eager: true, priority: true, ratio: "ratio-hero" })}
        ${photoFigure(models[0], { eager: true, ratio: "ratio-hero" })}
      </div>
    </section>

    <section class="section" aria-labelledby="home-designs">
      ${sectionHead(
        `<span id="home-designs">Diseños</span>`,
        `<a href="#/disenos" class="link">Ver los ${designs.length} diseños</a>`,
      )}
      <div class="grid">${designs.slice(0, 8).map(designCard).join("")}</div>
    </section>

    <section class="section" aria-labelledby="home-silhouettes">
      ${sectionHead(
        `<span id="home-silhouettes">Siluetas</span>`,
        `<a href="#/siluetas/${silhouettes[0].id}" class="link">Ver todas las siluetas</a>`,
      )}
      <div class="tabs" role="group" aria-label="Categorías de siluetas">
        ${silhouettes
          .map(
            (c) =>
              `<button type="button" class="tab" data-home-cat="${c.id}" aria-pressed="${c.id === homeCat}">${esc(c.name)}<span class="tab-count">${c.photos.length}</span></button>`,
          )
          .join("")}
      </div>
      <div class="carousel">
        <button type="button" class="icon-btn" data-scroll="-1" aria-label="Fotografías anteriores">${icon("prev")}</button>
        <div class="track" id="home-track" role="region" aria-label="Fotografías de la categoría" tabindex="0">${homeCategoryPhotos(homeCat)}</div>
        <button type="button" class="icon-btn" data-scroll="1" aria-label="Fotografías siguientes">${icon("next")}</button>
      </div>
    </section>

    ${measureSection(measureCat)}

    <section class="section" aria-labelledby="home-models">
      ${sectionHead(`<span id="home-models">Modelos RIOLA</span>`)}
      <div class="grid grid-3">${models.slice(2).map((m) => photoFigure(m, { ratio: "ratio-portrait" })).join("")}</div>
    </section>
  </main>`;

const designsView = () => `
  <main id="main" tabindex="-1" class="view-enter page">
    ${backLink()}
    ${sectionHead("Diseños", "", "h1")}
    <p class="lead">${designs.length} diseños. Selecciona uno para sumarlo a tu selección; luego elige una silueta.</p>
    <div class="grid grid-spaced">${designs.map(designCard).join("")}</div>
  </main>`;

const silhouetteView = (c) => `
  <main id="main" tabindex="-1" class="view-enter page">
    ${backLink()}
    ${sectionHead(esc(c.name), "", "h1")}
    <p class="lead">${esc(c.garment)} · ${c.photos.length} ${c.photos.length === 1 ? "fotografía" : "fotografías"}. Selecciona una silueta concreta.</p>
    <div class="actions actions-top"><a href="#/medidas/${c.id}" class="btn">Ver tallas y medidas</a></div>
    <nav class="tabs" aria-label="Categorías de siluetas">
      ${silhouettes
        .map(
          (o) =>
            `<a href="#/siluetas/${o.id}" class="tab"${o.id === c.id ? ' aria-current="page"' : ""}>${esc(o.name)}<span class="tab-count">${o.photos.length}</span></a>`,
        )
        .join("")}
    </nav>
    <div class="grid grid-spaced">${c.photos.map(photoCard).join("")}</div>
  </main>`;

const summarySlot = (title, body, { emptyText, emptyHref, emptyCta }) =>
  body
    ? `<section class="summary-slot" aria-label="${title}">${body}</section>`
    : `<section class="summary-slot" aria-label="${title}">
         <h2 class="slot-title">${title}</h2>
         <div class="frame frame-product frame-empty"><span>${emptyText}</span></div>
         <div class="actions"><a href="${emptyHref}" class="btn">${emptyCta}</a></div>
       </section>`;

const summaryContent = () => {
  const d = selectedDesign();
  const s = selectedSilhouette();
  const designBody = d
    ? `<h2 class="slot-title">Diseño</h2>
       <span class="frame frame-product">${img(d, { alt: `${d.label}: diseño gráfico RIOLA`, eager: true })}</span>
       <p class="slot-label">${esc(d.label)}</p>
       <div class="actions">
         <a href="#/disenos" class="btn">Cambiar diseño</a>
         <button type="button" class="btn btn-fill" data-clear="design">Quitar</button>
       </div>`
    : "";
  const silBody = s
    ? `<h2 class="slot-title">Silueta</h2>
       <span class="frame frame-product">${img(s.photo, { eager: true })}</span>
       <p class="slot-label">${esc(s.category.name)} · ${esc(s.photo.label)}</p>
       <div class="actions">
         <a href="#/siluetas/${s.category.id}" class="btn">Cambiar silueta</a>
         <a href="#/medidas/${s.category.id}" class="btn">Ver tallas y medidas</a>
         <button type="button" class="btn btn-fill" data-clear="silhouette">Quitar</button>
       </div>`
    : "";
  const any = d || s;
  return `
    <div class="summary-grid">
      ${summarySlot("Diseño", designBody, { emptyText: "Aún no elegiste un diseño", emptyHref: "#/disenos", emptyCta: "Elegir diseño" })}
      ${summarySlot("Silueta", silBody, { emptyText: "Aún no elegiste una silueta", emptyHref: `#/siluetas/${silhouettes[0].id}`, emptyCta: "Elegir silueta" })}
    </div>
    <p class="note">Diseño y silueta se muestran por separado: este catálogo no simula el estampado sobre la prenda.</p>
    ${any ? `<div class="actions"><button type="button" class="btn" data-clear="all">Limpiar selección</button></div>` : ""}
    ${s ? measureSection(s.category.id) : `<p class="note">Elige una silueta para consultar su tabla de tallas y medidas.</p>`}`;
};

const summaryView = () => `
  <main id="main" tabindex="-1" class="view-enter page">
    ${backLink()}
    ${sectionHead("Tu selección", "", "h1")}
    <p class="lead">Revisa el diseño y la silueta que elegiste. Puedes cambiarlos o quitarlos en cualquier momento.</p>
    <div id="summary" tabindex="-1">${summaryContent()}</div>
  </main>`;

const measuresView = () => `
  <main id="main" tabindex="-1" class="view-enter page">
    ${backLink()}
    ${sectionHead("Tallas y medidas", "", "h1")}
    <p class="lead">Consulta la guía de tallas de cada categoría de silueta.</p>
    ${measureSection(measureCat)}
  </main>`;

const notFoundView = () => `
  <main id="main" tabindex="-1" class="view-enter page not-found">
    <h1 class="display">Página no encontrada</h1>
    <p class="lead">La página que buscas no existe o fue movida.</p>
    <div class="actions"><a href="#/" class="btn">Ir al inicio</a></div>
  </main>`;

/* ---------- Header y barra de selección ---------- */
const headerHtml = () => `
  <header class="site-header">
    <div class="header-inner">
      <a href="#/" class="brand" aria-label="RIOLA, inicio"><span class="brand-name">RIOLA</span>${bolt()}</a>
      <nav class="main-nav" aria-label="Principal">
        <a href="#/" class="nav-link" data-nav="home">Inicio</a>
        <a href="#/disenos" class="nav-link" data-nav="disenos">Diseños</a>
        <a href="#/siluetas/${silhouettes[0].id}" class="nav-link" data-nav="siluetas">Siluetas</a>
        <a href="#/medidas" class="nav-link" data-nav="medidas">Tallas</a>
      </nav>
      <a href="#/seleccion" class="nav-link nav-selection" data-nav="seleccion">Selección <span id="sel-count">(0/2)</span></a>
    </div>
  </header>`;

const barHtml = () => `
  <aside id="selection-bar" class="selection-bar" aria-label="Resumen de tu selección" hidden></aside>
  <p id="live" class="sr-only" role="status" aria-live="polite"></p>`;

const barSlot = (kind, item, label, href, cta) =>
  item
    ? `<div class="bar-slot">
         <span class="bar-thumb">${img(item, { alt: "" })}</span>
         <span class="bar-text"><span class="bar-kind">${kind}</span><span class="bar-label">${esc(label)}</span></span>
         <button type="button" class="btn btn-fill" data-clear="${kind === "Diseño" ? "design" : "silhouette"}" aria-label="Quitar ${kind.toLowerCase()}">Quitar</button>
       </div>`
    : `<div class="bar-slot">
         <span class="bar-text"><span class="bar-kind">${kind}</span><span class="bar-label bar-empty">Sin elegir</span></span>
         <a href="${href}" class="btn">${cta}</a>
       </div>`;

const renderBar = () => {
  const bar = document.getElementById("selection-bar");
  const d = selectedDesign();
  const s = selectedSilhouette();
  const show = (d || s) && currentSection !== "seleccion";
  bar.hidden = !show;
  document.body.classList.toggle("has-selection", Boolean(show));
  if (!show) return;
  bar.innerHTML = `
    <div class="bar-inner">
      ${barSlot("Diseño", d, d?.label, "#/disenos", "Elegir")}
      ${barSlot("Silueta", s?.photo, s && `${s.category.name} · ${s.photo.label}`, `#/siluetas/${silhouettes[0].id}`, "Elegir")}
      <div class="bar-actions">
        ${s ? `<a href="#/medidas/${s.category.id}" class="btn">Tallas</a>` : ""}
        <a href="#/seleccion" class="btn">Ver resumen</a>
        <button type="button" class="btn btn-fill" data-clear="all">Limpiar</button>
      </div>
    </div>`;
};

/* ---------- Selección: una sola fuente de verdad ---------- */
const announce = (msg) => {
  document.getElementById("live").textContent = msg;
};

const syncSelection = () => {
  document.querySelectorAll("[data-select]").forEach((btn) => {
    const current = btn.dataset.select === "design" ? state.designId : state.silhouetteId;
    const on = current === btn.dataset.id;
    btn.setAttribute("aria-pressed", String(on));
    btn.classList.toggle("is-selected", on);
    btn.querySelector(".card-state").textContent = stateText(on);
  });
  const count = Number(Boolean(state.designId)) + Number(Boolean(state.silhouetteId));
  document.getElementById("sel-count").textContent = `(${count}/2)`;
  const summary = document.getElementById("summary");
  if (summary) summary.innerHTML = summaryContent();
  renderBar();
  persist();
};

const toggleSelect = (kind, id) => {
  const key = kind === "design" ? "designId" : "silhouetteId";
  state[key] = state[key] === id ? null : id;
  if (kind === "silhouette" && state[key]) measureCat = photoById.get(id).category.id;
  syncSelection();
  if (document.getElementById("measure-table")) setMeasureCat(measureCat);
  if (state[key]) {
    const label = kind === "design" ? designById.get(id).label : `${photoById.get(id).category.name}, ${photoById.get(id).photo.label}`;
    announce(`${kind === "design" ? "Diseño" : "Silueta"} seleccionado: ${label}`);
  } else {
    announce(`${kind === "design" ? "Diseño" : "Silueta"} quitado de la selección`);
  }
};

const clearSelection = (which) => {
  if (which === "design" || which === "all") state.designId = null;
  if (which === "silhouette" || which === "all") state.silhouetteId = null;
  syncSelection();
  announce(which === "all" ? "Selección limpiada" : "Elemento quitado de la selección");
  const summary = document.getElementById("summary");
  if (summary) summary.focus({ preventScroll: true });
};

/* ---------- Router ---------- */
// Enlaces antiguos (categorías ficticias anteriores) → categorías reales.
const LEGACY_SILHOUETTES = {
  oversize: "oversize-unicolor",
  hoodie: "busos",
  "sin-mangas": "manga-sisa",
  "manga-larga": "normal",
};

let currentSection = "";
let firstRender = true;

const setMeta = (title, description) => {
  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute("content", description);
};

const route = () => {
  const path = location.hash.replace(/^#/, "") || "/";
  let html;
  let section = "";

  const catMatch = path.match(/^\/siluetas\/([^/]+)\/?$/);

  if (path === "/") {
    section = "home";
    html = homeView();
    setMeta("RIOLA — Catálogo de diseños y siluetas", "Explora los diseños y siluetas de RIOLA y guarda tu selección.");
  } else if (path === "/disenos") {
    section = "disenos";
    html = designsView();
    setMeta("Diseños — RIOLA", "Galería de diseños gráficos de RIOLA.");
  } else if (path === "/siluetas") {
    location.replace(`#/siluetas/${silhouettes[0].id}`);
    return;
  } else if (catMatch && LEGACY_SILHOUETTES[catMatch[1]]) {
    location.replace(`#/siluetas/${LEGACY_SILHOUETTES[catMatch[1]]}`);
    return;
  } else if (catMatch && categoryById.has(catMatch[1])) {
    const c = categoryById.get(catMatch[1]);
    section = "siluetas";
    html = silhouetteView(c);
    setMeta(`${c.name} — RIOLA`, `Fotografías de siluetas ${c.name} de RIOLA.`);
  } else if (/^\/medidas(\/[^/]+)?\/?$/.test(path)) {
    const id = path.split("/")[2];
    if (id && !categoryById.has(id)) {
      html = notFoundView();
    } else {
      if (id) measureCat = id;
      section = "medidas";
      html = measuresView();
      setMeta("Tallas y medidas — RIOLA", "Guía de tallas y medidas orientativas por categoría de silueta RIOLA.");
    }
  } else if (path === "/seleccion") {
    section = "seleccion";
    html = summaryView();
    setMeta("Tu selección — RIOLA", "Diseño y silueta que elegiste en el catálogo RIOLA.");
  } else {
    html = notFoundView();
    setMeta("No encontrado — RIOLA", "Página no encontrada.");
  }

  currentSection = section;
  document.getElementById("view").innerHTML = html;
  document.querySelectorAll(".nav-link").forEach((a) => {
    if (a.dataset.nav === section) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (section === "home") initHome();
  renderBar();
  window.scrollTo(0, 0);
  if (!firstRender) document.getElementById("main")?.focus({ preventScroll: true });
  firstRender = false;
};

/* ---------- Interacciones de la home ---------- */
const initHome = () => {
  const track = document.getElementById("home-track");

  document.querySelectorAll("[data-scroll]").forEach((btn) =>
    btn.addEventListener("click", () =>
      track.scrollBy({ left: Number(btn.dataset.scroll) * track.clientWidth * 0.8, behavior: reducedMotion() ? "auto" : "smooth" }),
    ),
  );

  document.querySelectorAll("[data-home-cat]").forEach((btn) =>
    btn.addEventListener("click", () => {
      homeCat = btn.dataset.homeCat;
      document.querySelectorAll("[data-home-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      track.innerHTML = homeCategoryPhotos(homeCat);
      track.scrollLeft = 0;
      track.classList.remove("fade-in");
      void track.offsetWidth; // reinicia la transición de entrada
      track.classList.add("fade-in");
    }),
  );
};

/* ---------- Arranque ---------- */
app.innerHTML = `${headerHtml()}<div id="view"></div>${barHtml()}`;

document.addEventListener("click", (e) => {
  const sel = e.target.closest("[data-select]");
  if (sel) return toggleSelect(sel.dataset.select, sel.dataset.id);
  const mtab = e.target.closest("[data-mtab]");
  if (mtab) return setMeasureCat(mtab.dataset.mtab);
  const clear = e.target.closest("[data-clear]");
  if (clear) return clearSelection(clear.dataset.clear);
  if (e.target.closest("[data-skip]")) {
    e.preventDefault(); // evita que "#main" choque con el router por hash
    document.getElementById("main")?.focus();
  }
});

// Pestañas de medidas: flechas, Inicio y Fin
document.addEventListener("keydown", (e) => {
  const tab = e.target.closest?.("[data-mtab]");
  if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
  e.preventDefault();
  const ids = silhouettes.map((c) => c.id);
  let i = ids.indexOf(tab.dataset.mtab);
  i = e.key === "Home" ? 0 : e.key === "End" ? ids.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + ids.length) % ids.length;
  setMeasureCat(ids[i], true);
});

// Un error de carga no se oculta: se marca el recuadro y se registra la ruta fallida.
document.addEventListener(
  "error",
  (e) => {
    const el = e.target;
    if (!(el instanceof HTMLImageElement)) return;
    el.closest(".frame, .bar-thumb")?.classList.add("is-missing");
    console.error("[RIOLA] Imagen no encontrada:", el.getAttribute("src"));
  },
  true,
);

window.addEventListener("hashchange", route);
route();
syncSelection();
