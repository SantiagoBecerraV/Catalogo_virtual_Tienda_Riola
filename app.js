/* RIOLA — Catálogo. Vanilla JS con enrutado por hash (#/, #/disenos, #/siluetas/:id). */

/* ---------- Datos ---------- */
const designs = [
  ["Tokyo Oni", "d1"],
  ["Red Dragon", "d2"],
  ["Space", "d3"],
  ["Good Vibes", "d4"],
  ["X Smile", "d5"],
  ["Fuji", "d6"],
  ["Never Give Up", "d7"],
  ["No Future", "d8"],
  ["Los Angeles", "d9"],
  ["Great Wave", "d10"],
  ["Red Eye", "d11"],
].map(([name, file]) => ({ name, image: `assets/designs/${file}.jpg` }));

const negra = { name: "Negra", fabric: "oklch(0.17 0 0)", print: "oklch(0.89 0.18 98)" };
const blanca = { name: "Blanca", fabric: "oklch(0.98 0 0)", print: "oklch(0.17 0 0)" };
const amarilla = { name: "Amarilla", fabric: "oklch(0.89 0.18 98)", print: "oklch(0.17 0 0)" };
const roja = { name: "Roja", fabric: "oklch(0.6 0.23 25)", print: "oklch(0.98 0 0)" };
const gris = { name: "Gris", fabric: "oklch(0.55 0 0)", print: "oklch(0.89 0.18 98)" };

const silhouettes = [
  {
    id: "normal",
    name: "Normal",
    title: "Camiseta Silueta Normal",
    description: "Silueta clásica, ajuste cómodo. Ideal para el día a día.",
    shape: "normal",
    variants: [negra, blanca, amarilla, roja],
  },
  {
    id: "oversize",
    name: "Oversize",
    title: "Camiseta Oversize",
    description: "Hombros caídos y caída amplia. Actitud urbana.",
    shape: "oversize",
    variants: [negra, blanca, amarilla, roja],
  },
  {
    id: "hoodie",
    name: "Hoodie",
    title: "Hoodie RIOLA",
    description: "Capucha, bolsillo canguro y abrigo para la calle.",
    shape: "hoodie",
    variants: [negra, blanca, gris, roja],
  },
  {
    id: "manga-larga",
    name: "Manga larga",
    title: "Camiseta Manga Larga",
    description: "Misma esencia, mangas completas para días frescos.",
    shape: "longsleeve",
    variants: [negra, blanca, amarilla, roja],
  },
  {
    id: "sin-mangas",
    name: "Sin mangas",
    title: "Camiseta Sin Mangas",
    description: "Sisa amplia y libertad total de movimiento.",
    shape: "tank",
    variants: [negra, blanca, amarilla, roja],
  },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const buildRows = (w, l, s, step = [4, 2, 1]) =>
  SIZES.map((size, i) => ({
    size,
    width: `${w + i * step[0]} cm`,
    length: `${l + i * step[1]} cm`,
    sleeve: `${s + i * step[2]} cm`,
  }));

const measurements = {
  "Silueta Normal": buildRows(46, 68, 20),
  "Oversize unicolor": buildRows(54, 70, 24),
  "Oversize acid wash": buildRows(55, 71, 25),
  "Manga sisa acid wash": buildRows(50, 69, 0, [4, 2, 0]).map((r) => ({ ...r, sleeve: "—" })),
  Buzos: buildRows(56, 66, 60),
};
const measurementTabs = Object.keys(measurements);

const GARMENT_PATHS = {
  normal: "M70 30 L50 36 L22 60 L36 84 L52 74 L52 172 L148 172 L148 74 L164 84 L178 60 L150 36 L130 30 Q100 46 70 30 Z",
  oversize: "M66 30 L40 38 L10 78 L30 98 L46 86 L44 176 L156 176 L154 86 L170 98 L190 78 L160 38 L134 30 Q100 46 66 30 Z",
  hoodie: "M74 34 Q72 10 100 8 Q128 10 126 34 L152 42 L172 96 L184 160 L164 164 L150 104 L150 176 L50 176 L50 104 L36 164 L16 160 L28 96 L48 42 Z",
  longsleeve: "M70 30 L50 36 L30 70 L16 170 L34 172 L52 92 L52 172 L148 172 L148 92 L166 172 L184 170 L170 70 L150 36 L130 30 Q100 46 70 30 Z",
  tank: "M72 24 L62 26 Q64 62 50 74 L52 176 L148 176 L150 74 Q136 62 138 26 L128 24 Q122 54 100 54 Q78 54 72 24 Z",
};

/* ---------- Componentes (devuelven strings HTML) ---------- */
const ICONS = {
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41m11.32-11.32 1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/>',
  back: '<path d="m12 19-7-7 7-7M19 12H5"/>',
  prev: '<path d="m15 18-6-6 6-6"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
};

const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

const bolt = (cls = "") =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" class="bolt ${cls}"><path d="M14 1 4 14h6l-2 9 11-14h-6.5L14 1Z"/></svg>`;

const sectionTitle = (text, tag = "h2") => `<${tag} class="section-title">${bolt()}${text}</${tag}>`;

const designCard = (d, aspect = "") => `
  <figure class="design-card">
    <img src="${d.image}" alt="${d.name}" loading="lazy" width="816" height="816" class="${aspect}" />
    <figcaption class="sr-only">${d.name}</figcaption>
  </figure>`;

const garment = ({ shape, fabric, print }, label) => {
  const textY = shape === "hoodie" ? 92 : 82;
  return `
  <svg viewBox="0 0 200 190" role="img" aria-label="${label}">
    <path d="${GARMENT_PATHS[shape]}" style="fill:${fabric}" class="garment-line" stroke-width="1.5" stroke-linejoin="round"/>
    ${shape === "hoodie" ? '<path d="M70 140 L130 140 L136 166 L64 166 Z" fill="none" class="garment-line" stroke-width="1.2"/>' : ""}
    <text x="100" y="${textY}" text-anchor="middle" style="fill:${print};font-family:'Permanent Marker',cursive" font-size="17" transform="rotate(-6 100 ${textY})">RIOLA</text>
  </svg>`;
};

const measurementDiagram = () => `
  <svg viewBox="0 0 220 190" role="img" aria-label="Diagrama de medidas: A ancho, B largo, C manga">
    <path d="M80 30 L58 36 L26 62 L42 88 L60 78 L60 172 L160 172 L160 78 L178 88 L194 62 L162 36 L140 30 Q110 46 80 30 Z"
      style="fill:var(--background);stroke:var(--foreground)" stroke-width="2" stroke-linejoin="round"/>
    <g style="stroke:var(--primary);fill:var(--primary)" stroke-width="2">
      <line x1="62" y1="96" x2="158" y2="96"/>
      <line x1="40" y1="40" x2="40" y2="172" transform="translate(-12 0)"/>
      <line x1="166" y1="40" x2="190" y2="60"/>
    </g>
    <g style="fill:var(--foreground)" font-size="12" font-weight="700">
      <text x="106" y="90">A</text><text x="16" y="110">B</text><text x="184" y="44">C</text>
    </g>
  </svg>`;

/* ---------- Vistas ---------- */
const homeView = () => `
  <main class="view-enter page page-home">
    <section class="hero">
      <h1>
        Personaliza<br />
        <span class="hero-accent">tu diseño ${bolt()}</span>
      </h1>
      <div class="hero-art">
        <svg viewBox="0 0 400 300" aria-hidden="true" class="hero-sparks">
          <path d="M60 20 L110 120 L80 125 L140 240 L95 140 L125 135 Z"/>
          <path d="M330 30 L300 130 L330 128 L270 270 L320 150 L290 152 Z"/>
          <path d="M20 200 L90 190 L70 215 L150 205 Z" opacity=".7"/>
          <path d="M380 220 L310 200 L330 230 L250 215 Z" opacity=".7"/>
        </svg>
        <img src="assets/hero-shirt.png" alt="Camiseta negra RIOLA" width="1200" height="912" />
      </div>
    </section>

    <section>
      <div class="section-head">
        ${sectionTitle("DISEÑOS")}
        <a href="#/disenos" class="link-muted"><span>+</span> Ver todos los diseños</a>
      </div>
      <div class="design-grid">${designs.slice(0, 10).map((d) => designCard(d)).join("")}</div>
    </section>

    <section>
      ${sectionTitle("SILUETAS")}
      <div class="carousel">
        <button class="carousel-btn" data-scroll="-1" aria-label="Anterior">${icon("prev")}</button>
        <div class="carousel-track" id="carousel-track">
          ${silhouettes
            .map(
              (s) => `
            <a href="#/siluetas/${s.id}" class="silhouette-link">
              <span class="silhouette-thumb">${garment({ shape: s.shape, ...s.variants[0] }, s.name)}</span>
              <span>${s.name}</span>
            </a>`,
            )
            .join("")}
        </div>
        <button class="carousel-btn" data-scroll="1" aria-label="Siguiente">${icon("next")}</button>
      </div>
    </section>

    <section aria-labelledby="medidas">
      <div id="medidas">${sectionTitle("Tabla de Medidas")}</div>
      <div role="tablist" class="tabs" id="measure-tabs"></div>
      <div class="measure-layout">
        <div class="diagram-box">
          ${measurementDiagram()}
          <p>Las medidas pueden variar ±1 cm.</p>
        </div>
        <div class="table-wrap view-enter" id="measure-table"></div>
      </div>
    </section>
  </main>`;

const designsView = () => {
  const aspects = ["ar-square", "", "ar-tall", "", "ar-square", "ar-tall"];
  return `
  <main class="view-enter page page-wide">
    <a href="#/" class="back-link">${icon("back")} Volver</a>
    ${sectionTitle("Todos los Diseños", "h1")}
    <div class="design-masonry">
      ${designs.map((d, i) => designCard(d, aspects[i % aspects.length])).join("")}
    </div>
  </main>`;
};

const silhouetteView = (s) => `
  <main class="view-enter page page-detail">
    <a href="#/" class="back-link">${icon("back")} Volver</a>
    ${sectionTitle(s.title, "h1")}
    <p class="silhouette-desc">${s.description}</p>
    <div class="pills">
      ${silhouettes
        .map((o) => `<a href="#/siluetas/${o.id}" class="pill${o.id === s.id ? " active" : ""}">${o.name}</a>`)
        .join("")}
    </div>
    <div class="variants">
      ${s.variants
        .map(
          (v) => `
        <figure class="variant">
          <div class="variant-frame">${garment({ shape: s.shape, ...v }, `${s.title} ${v.name}`)}</div>
          <figcaption>${v.name}</figcaption>
        </figure>`,
        )
        .join("")}
    </div>
  </main>`;

const notFoundView = () => `
  <div class="not-found">
    <div>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La página que buscas no existe o fue movida.</p>
      <a href="#/" class="btn">Ir al inicio</a>
    </div>
  </div>`;

/* ---------- Header y tema ---------- */
const THEME_KEY = "riola-theme";

const applyTheme = (dark) => {
  document.documentElement.classList.toggle("dark", dark);
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.setAttribute("aria-checked", String(dark));
  btn.setAttribute("aria-label", dark ? "Activar modo claro" : "Activar modo oscuro");
  btn.querySelector(".theme-icon").innerHTML = icon(dark ? "sun" : "moon");
  btn.querySelector(".theme-label").textContent = dark ? "Modo Claro" : "Modo Oscuro";
};

const headerHtml = () => `
  <header class="site-header">
    <div class="header-inner">
      <a href="#/" class="brand" aria-label="RIOLA inicio">
        <span class="brand-name">RIOLA</span>${bolt()}
      </a>
      <nav class="main-nav">
        <a href="#/" class="nav-link" data-nav="home">Inicio</a>
        <a href="#/disenos" class="nav-link" data-nav="disenos">Diseños</a>
        <a href="#/siluetas/normal" class="nav-link" data-nav="siluetas">Siluetas</a>
      </nav>
      <button id="theme-toggle" role="switch" class="theme-toggle">
        <span class="theme-icon"></span>
        <span class="theme-label"></span>
        <span class="theme-track"><span class="theme-thumb"></span></span>
      </button>
    </div>
  </header>`;

/* ---------- Router ---------- */
const app = document.getElementById("app");

const setMeta = (title, description) => {
  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute("content", description);
};

const route = () => {
  const path = location.hash.replace(/^#/, "") || "/";
  let section = "";
  let html;

  if (path === "/") {
    section = "home";
    html = homeView();
    setMeta("RIOLA — Catálogo de diseños y siluetas", "Explora los diseños, siluetas, colores y tabla de medidas de RIOLA.");
  } else if (path === "/disenos") {
    section = "disenos";
    html = designsView();
    setMeta("Todos los Diseños — RIOLA", "Galería completa de diseños gráficos de RIOLA.");
  } else if (path.startsWith("/siluetas/") && silhouettes.some((s) => s.id === path.slice(10))) {
    const s = silhouettes.find((x) => x.id === path.slice(10));
    section = "siluetas";
    html = silhouetteView(s);
    setMeta(`${s.title} — RIOLA`, s.description);
  } else {
    html = notFoundView();
    setMeta("No encontrado — RIOLA", "Página no encontrada.");
  }

  document.getElementById("view").innerHTML = html;
  document.querySelectorAll(".nav-link").forEach((a) => a.classList.toggle("active", a.dataset.nav === section));
  if (section === "home") initHome();
  window.scrollTo(0, 0);
};

/* ---------- Interacciones de la home ---------- */
const initHome = () => {
  const track = document.getElementById("carousel-track");
  document.querySelectorAll("[data-scroll]").forEach((btn) =>
    btn.addEventListener("click", () => track.scrollBy({ left: Number(btn.dataset.scroll) * 220, behavior: "smooth" })),
  );

  const tabs = document.getElementById("measure-tabs");
  const table = document.getElementById("measure-table");

  const renderMeasurements = (selected) => {
    tabs.innerHTML = measurementTabs
      .map((t) => `<button role="tab" class="tab" aria-selected="${t === selected}" data-tab="${t}">${t}</button>`)
      .join("");
    table.innerHTML = `
      <table>
        <thead><tr>${["Talla", "A (Ancho)", "B (Largo)", "C (Manga)"].map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>
          ${measurements[selected]
            .map((r) => `<tr><td>${r.size}</td><td>${r.width}</td><td>${r.length}</td><td>${r.sleeve}</td></tr>`)
            .join("")}
        </tbody>
      </table>`;
    // reinicia la animación de entrada de la tabla
    table.classList.remove("view-enter");
    void table.offsetWidth;
    table.classList.add("view-enter");
  };

  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-tab]");
    if (tab) renderMeasurements(tab.dataset.tab);
  });
  renderMeasurements(measurementTabs[0]);
};

/* ---------- Arranque ---------- */
app.innerHTML = `${headerHtml()}<div id="view"></div>`;

let darkSaved = false;
try {
  darkSaved = localStorage.getItem(THEME_KEY) === "dark";
} catch {}
applyTheme(darkSaved);

document.getElementById("theme-toggle").addEventListener("click", () => {
  const dark = !document.documentElement.classList.contains("dark");
  applyTheme(dark);
  try {
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  } catch {}
});

window.addEventListener("hashchange", route);
route();
