/* ==========================================================================
   RIOLA — Catálogo Virtual & Landing Oficial (Vanilla JS Modular)
   Streetwear Santandereano — Hecho con Buena Vibra ⚡
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- DATOS AUTÉNTICOS DEL REPOSITORIO ---------- */
  // Helpers para rutas optimizadas WebP
  const optWebp = (folder, filename) => {
    const stem = filename.replace(/\.(jpe?g|png)$/i, '');
    return encodeURI(folder + 'opt/' + stem + '_thumb.webp');
  };
  const optFullWebp = (folder, filename) => {
    // Para lightbox: intentar versión optimizada; si no existe usa original
    const stem = filename.replace(/\.(jpe?g|png)$/i, '');
    const optPath = folder + 'opt/' + stem + '_thumb.webp';
    return encodeURI(optPath);
  };

  // Enlace oficial de WhatsApp con mensaje inicial predeterminado
  const WA_RIOLA_URL = 'https://wa.me/573114652883?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20de%20RIOLA%20y%20quisiera%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20prendas%20y%20dise%C3%B1os.';

  // Enlace oficial de Instagram de RIOLA
  const INSTAGRAM_RIOLA_URL = 'https://www.instagram.com/riola_oficial?lqvp=ZDNlZDc0MzIxNw==';

  const MODELS = ["WhatsApp Image 2026-10-03 at 5.03.31 PM.jpeg", "WhatsApp Image 2026-10-03 at 5.03.38 PM (1).jpeg", "WhatsApp Image 2026-10-03 at 5.03.38 PM (2).jpeg", "WhatsApp Image 2026-10-03 at 5.03.38 PM (3).jpeg", "WhatsApp Image 2026-10-03 at 5.03.38 PM.jpeg"];

  const DESIGNS = [
    "WhatsApp Image 2026-10-03 at 12.34.44 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.45 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.45 AM (2).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.45 AM (3).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.45 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.46 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.46 AM (2).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.46 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.47 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.47 AM (2).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.47 AM (3).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.47 AM (4).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.47 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.48 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.48 AM (2).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.48 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.49 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.49 AM (2).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.49 AM (3).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.49 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.50 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.50 AM (2).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.50 AM (3).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.50 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.51 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.51 AM (2).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.51 AM (3).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.51 AM (4).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.51 AM (5).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.52 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.52 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.53 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.53 AM (2).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.53 AM (3).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.53 AM (4).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.53 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.54 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.54 AM (2).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.54 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.55 AM (1).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.55 AM (2).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.55 AM (3).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.55 AM (4).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.55 AM (5).jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.55 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.34.56 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.35.30 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.36.01 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.36.14 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.36.23 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.36.30 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.36.39 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.36.48 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.36.56 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.37.04 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.37.13 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.37.44 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.38.18 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.38.58 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.39.13 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.39.29 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.40.07 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.40.47 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.40.59 AM.jpeg",
    "WhatsApp Image 2026-10-03 at 12.41.14 AM.jpeg",
    "Diseño_nuevo.jpeg",
    "Diseño_nuevo2.jpeg",
    "Diseño_nuevo3.jpeg",
    "Diseño_nuevo4.jpeg",
    "Diseño_nuevo5.jpeg",
    "Diseño_nuevo6.jpeg",
    "Diseño_nuevo7.jpeg",
    "Diseño_nuevo8.jpeg",
    "Diseño_nuevo9.jpeg"
  ];

  const SILHOUETTES = {
    normal: {
      id: 'normal',
      name: 'Silueta Normal',
      badge: 'Corte Clásico Regular',
      measureType: 'normal',
      description: 'Silueta clásica de corte estándar y ajuste cómodo. Confeccionada en algodón de peso medio con cuello redondo en rib reforzado. Perfecta para el día a día.',
      measureNote: 'Variación aproximada de ±1 a 2 cm.',
      measurements: [
        { size: 'XS', pecho: '46 cm', cintura: '44 cm', largo: '70 cm' },
        { size: 'S',  pecho: '48 cm', cintura: '46 cm', largo: '72 cm' },
        { size: 'M',  pecho: '50 cm', cintura: '48 cm', largo: '73 cm' },
        { size: 'L',  pecho: '52 cm', cintura: '50 cm', largo: '77 cm' },
        { size: 'XL', pecho: '56 cm', cintura: '54 cm', largo: '79 cm' },
        { size: '2XL',pecho: '60 cm', cintura: '58 cm', largo: '78 cm' },
        { size: '3XL',pecho: '66 cm', cintura: '64 cm', largo: '79 cm' }
      ],
      images: ["WhatsApp Image 2026-10-03 at 11.27.07 PM.jpeg", "WhatsApp Image 2026-10-03 at 11.27.09 PM (1).jpeg", "WhatsApp Image 2026-10-03 at 11.27.09 PM (2).jpeg", "WhatsApp Image 2026-10-03 at 11.27.09 PM (3).jpeg", "WhatsApp Image 2026-10-03 at 11.27.09 PM (4).jpeg", "WhatsApp Image 2026-10-03 at 11.27.09 PM.jpeg", "WhatsApp Image 2026-10-03 at 11.27.10 PM.jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (1).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (10).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (11).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (12).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (13).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (14).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (15).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (16).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (17).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (18).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (19).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (2).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (20).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (21).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (3).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (4).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (5).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (6).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (7).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (8).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM (9).jpeg", "WhatsApp Image 2026-10-03 at 11.27.11 PM.jpeg", "WhatsApp Image 2026-10-03 at 11.27.12 PM.jpeg"].map(f => 'assets/Siluetas_riola/Silueta_normal/' + f)
    },
    'oversize-acid': {
      id: 'oversize-acid',
      name: 'Oversize Acid Wash',
      badge: 'Lavado Mineral Artesanal',
      measureType: 'oversize',
      description: 'Hombros caídos, corte amplio y proceso artesanal de acid wash mineral. Cada prenda adquiere un deslavado irrepetible con textura y máxima actitud de calle.',
      measureNote: 'Medidas aproximadas. Corte Oversize Unisex.',
      measurements: [
        { size: 'S',   a: '52 cm', b: '71 cm' },
        { size: 'M',   a: '54 cm', b: '73 cm' },
        { size: 'L',   a: '57 cm', b: '75 cm' },
        { size: 'XL',  a: '60 cm', b: '77 cm' },
        { size: 'XXL', a: '63 cm', b: '79 cm' }
      ],
      images: ["WhatsApp Image 2026-10-04 at 12.02.29 AM (1).jpeg", "WhatsApp Image 2026-10-04 at 12.02.29 AM (2).jpeg", "WhatsApp Image 2026-10-04 at 12.02.29 AM.jpeg", "WhatsApp Image 2026-10-04 at 12.02.30 AM (1).jpeg", "WhatsApp Image 2026-10-04 at 12.02.30 AM (2).jpeg", "WhatsApp Image 2026-10-04 at 12.02.30 AM (3).jpeg", "WhatsApp Image 2026-10-04 at 12.02.30 AM.jpeg"].map(f => 'assets/Siluetas_riola/Silueta_oversize_acid_wash/' + f)
    },
    'oversize-unicolor': {
      id: 'oversize-unicolor',
      name: 'Oversize Unicolor',
      badge: 'Corte Amplio Contemporáneo',
      measureType: 'oversize',
      description: 'Silueta holgada contemporánea en tonos sólidos profundos. Hombros caídos, tela de alto gramaje con caída impecable y libertad total.',
      measureNote: 'Medidas aproximadas. Corte Oversize Unisex.',
      measurements: [
        { size: 'S',   a: '52 cm', b: '71 cm' },
        { size: 'M',   a: '54 cm', b: '73 cm' },
        { size: 'L',   a: '57 cm', b: '75 cm' },
        { size: 'XL',  a: '60 cm', b: '77 cm' },
        { size: 'XXL', a: '63 cm', b: '79 cm' }
      ],
      images: ["WhatsApp Image 2026-10-03 at 11.39.08 PM (1).jpeg", "WhatsApp Image 2026-10-03 at 11.39.08 PM (2).jpeg", "WhatsApp Image 2026-10-03 at 11.39.08 PM (3).jpeg", "WhatsApp Image 2026-10-03 at 11.39.08 PM (4).jpeg", "WhatsApp Image 2026-10-03 at 11.39.08 PM (5).jpeg", "WhatsApp Image 2026-10-03 at 11.39.08 PM.jpeg", "WhatsApp Image 2026-10-03 at 11.39.09 PM (1).jpeg", "WhatsApp Image 2026-10-03 at 11.39.09 PM.jpeg"].map(f => 'assets/Siluetas_riola/Silueta_oversize_unicolor/' + f)
    },
    'manga-sisa': {
      id: 'manga-sisa',
      name: 'Manga Sisa Acid Wash',
      badge: 'Corte Rebelde sin Mangas',
      measureType: 'oversize',
      description: 'Sisa amplia con terminación rústica y proceso de acid wash. Diseñada para climas cálidos y entrenamientos con máxima frescura y estilo santandereano.',
      measureNote: 'Medidas aproximadas.',
      measurements: [
        { size: 'S',  a: '52 cm', b: '71 cm' },
        { size: 'M',  a: '54 cm', b: '73 cm' },
        { size: 'L',  a: '57 cm', b: '75 cm' },
        { size: 'XL', a: '60 cm', b: '77 cm' }
      ],
      images: ["WhatsApp Image 2026-10-04 at 12.08.34 AM (1).jpeg", "WhatsApp Image 2026-10-04 at 12.08.34 AM (2).jpeg", "WhatsApp Image 2026-10-04 at 12.08.34 AM (3).jpeg", "WhatsApp Image 2026-10-04 at 12.08.34 AM.jpeg"].map(f => 'assets/Siluetas_riola/Silueta_manza_siza/' + f)
    },
    buzos: {
      id: 'buzos',
      name: 'Buzos (Hoodies)',
      badge: 'Franela Pesada con Capucha',
      measureType: 'buzos',
      description: 'Capucha con forro reforzado, bolsillo delantero tipo canguro y franela perchada de alto gramaje. Abrigo, durabilidad y porte urbano para días frescos.',
      measureNote: 'Guía Acid Wash Oversized con Capucha. Medidas en cm.',
      measurements: [
        { size: 'S',   hombros: '58 cm', torso: '79 cm', largo: '59 cm', manga: '40 cm' },
        { size: 'M',   hombros: '60 cm', torso: '81 cm', largo: '64 cm', manga: '42 cm' },
        { size: 'L',   hombros: '62 cm', torso: '83 cm', largo: '66 cm', manga: '44 cm' },
        { size: 'XL',  hombros: '64 cm', torso: '85 cm', largo: '68 cm', manga: '46 cm' },
        { size: '2XL', hombros: '66 cm', torso: '87 cm', largo: '70 cm', manga: '48 cm' }
      ],
      images: ["WhatsApp Image 2026-10-04 at 12.11.41 AM (1).jpeg", "WhatsApp Image 2026-10-04 at 12.11.41 AM.jpeg"].map(f => 'assets/Siluetas_riola/Silueta_busos/' + f)
    }
  };

  /* ---------- ESTADO DE LA APLICACIÓN ---------- */


  const state = {
    theme: 'dark',
    activeSilhouette: 'normal',
    activeGarmentImage: null,
    visibleDesignsCount: 8,   // PERF: reducido de 16 a 8 en carga inicial
    batchSize: 16,
    mobileMenuOpen: false,
    lightboxImage: null,
    lightboxTitle: '',
    currentView: 'home'  // 'home' | 'designs'
  };

  /* ---------- ICONOS SVG REUTILIZABLES ---------- */
  const boltSvg = (cls = '') =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" class="bolt ${cls}"><path d="M13 2 4 14h6l-2 8 11-13h-6.5L13 2Z"/></svg>`;

  const iconSun = () =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41m11.32-11.32 1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/></svg>`;

  const iconMoon = () =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z"/></svg>`;

  const iconMenu = () =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;

  const iconClose = () =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  const iconExpand = () =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`;

  /* Diagrama anatómico de medidas (type-aware) */
  const measurementDiagramSvg = (type) => {
    const showSleeve = type === 'buzos';
    const aLabel = type === 'normal' ? 'A' : 'A';
    const bLabel = 'B';
    return `
    <svg viewBox="0 0 220 190" role="img" aria-label="Guía de medidas anatómicas: A ancho, B largo, C manga">
      <path d="M80 30 L58 36 L26 62 L42 88 L60 78 L60 172 L160 172 L160 78 L178 88 L194 62 L162 36 L140 30 Q110 46 80 30 Z"
        style="fill:var(--surface-elevated);stroke:var(--foreground);stroke-opacity:0.6" stroke-width="2" stroke-linejoin="round"/>
      <g style="stroke:var(--primary);fill:var(--primary)" stroke-width="2.5">
        <line x1="62" y1="96" x2="158" y2="96"/>
        <line x1="38" y1="40" x2="38" y2="172" transform="translate(-8 0)"/>
        <line x1="166" y1="40" x2="190" y2="60"/>
      </g>
      <g style="fill:var(--foreground)" font-size="13" font-weight="900" font-family="var(--font-sans)">
        <text x="105" y="90" text-anchor="middle">A</text>
        <text x="20" y="110" text-anchor="middle">B</text>
        <text x="184" y="46" text-anchor="middle">C</text>
      </g>
    </svg>`;
  };

  /* ---------- RENDERIZADO DE COMPONENTES ---------- */

  /* 1. Header */
  const renderHeader = () => `
    <header class="site-header">
      <div class="container header-inner">
        <a href="#inicio" class="brand" aria-label="RIOLA — Inicio">
          <span class="brand-logo-badge">
            <img src="assets/Logo_riola.jpg" alt="Logo RIOLA" class="brand-logo-img" width="38" height="38" />
          </span>
          <div class="brand-text-wrap">
            <span class="brand-name">RIOLA</span>
            <span class="brand-sub">Since 2022 • Bucaramanga</span>
          </div>
        </a>

        <nav class="nav-desktop" aria-label="Navegación principal">
          <a href="#inicio" class="nav-link active">Inicio</a>
          <a href="#disenos" class="nav-link">Diseños</a>
          <a href="#identidad" class="nav-link">Identidad</a>
          <a href="#prendas" class="nav-link">Prendas & Tallas</a>
          <a href="#contacto" class="nav-link">Contacto</a>
        </nav>

        <div class="header-actions">
          <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Cambiar tema" title="Cambiar tema">
            <span class="theme-icon">${state.theme === 'dark' ? iconSun() : iconMoon()}</span>
            <span class="theme-text">${state.theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
          </button>

          <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="${state.mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}" aria-expanded="${state.mobileMenuOpen}" aria-controls="mobile-nav-panel">
            <span class="hamburger-box" aria-hidden="true">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-nav-panel" class="mobile-nav-panel ${state.mobileMenuOpen ? 'open' : ''}" aria-label="Menú móvil">
        <a href="#inicio" class="mobile-nav-link">Inicio</a>
        <a href="#disenos" class="mobile-nav-link">Diseños Gráficos</a>
        <a href="#identidad" class="mobile-nav-link">Identidad RIOLA</a>
        <a href="#prendas" class="mobile-nav-link">Prendas & Tallas</a>
        <a href="#contacto" class="mobile-nav-link">Contacto</a>
      </div>
    </header>`;

  /* 2. Ticker de Marca */
  const renderBrandTicker = () => `
    <div class="brand-ticker" aria-hidden="true">
      <div class="ticker-track">
        HECHO CON BUENA VIBRA ⚡ • DE BUCARAMANGA PA'L MUNDO 🌍 • ¡MELOOO CARAMELOOOO! ⚡ • ENVÍOS A TODA COLOMBIA 🇨🇴 🚀 • STREETWEAR SANTANDEREANO • EDICIONES DE AUTOR • HECHO CON BUENA VIBRA ⚡ • DE BUCARAMANGA PA'L MUNDO 🌍 • ¡MELOOO CARAMELOOOO! ⚡ • ENVÍOS A TODA COLOMBIA 🇨🇴 🚀 •
      </div>
    </div>`;

  /* 3. Hero Principal */
  const renderHero = () => {
    const heroWebp = optWebp('assets/Modelos_riola/', MODELS[0]);
    const heroFallback = encodeURI('assets/Modelos_riola/' + MODELS[0]);
    return `
    <section id="inicio" class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-badge">
            ${boltSvg()} Streetwear Santandereano • De Bucaramanga pa'l mundo
          </div>
          <h1 class="hero-title">
            HECHO CON<br />
            <span class="hero-title-accent">BUENA VIBRA ${boltSvg()}</span>
          </h1>
          <p class="hero-description">
            Moda urbana de autor nacida en Bucaramanga. Ropa con personalidad, humor regional auténtico y la esencia de la calle. Cada prenda está confeccionada para romper la rutina con la mejor energía.
          </p>
          <div class="hero-ctas">
            <a href="#disenos" class="btn btn-primary">
              EXPLORAR DISEÑOS ${boltSvg()}
            </a>
            <a href="#prendas" class="btn btn-secondary">
              VER PRENDAS & TALLAS
            </a>
          </div>
        </div>

        <div class="hero-visual-wrap">
          <div class="hero-visual-card">
            <picture>
              <source srcset="${heroWebp}" type="image/webp" />
              <img
                src="${heroFallback}"
                alt="Modelo streetwear luciendo prenda oficial RIOLA"
                class="hero-img"
                width="600"
                height="800"
                loading="eager"
                decoding="sync"
                fetchpriority="high"
              />
            </picture>
            <div class="hero-visual-overlay">
              <div>
                <div class="hero-overlay-tag">RIOLA ⚡</div>
                <div class="hero-overlay-sub">Colección Oficial • Bucaramanga</div>
              </div>
              <span style="background: var(--primary); color: var(--primary-foreground); padding: 0.35rem 0.8rem; border-radius: 9999px; font-weight: 900; font-size: 0.75rem; letter-spacing: 0.05em;">
                ORIGINAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  };

  /* 4. Catálogo Mixto */
  const renderCatalog = () => {
    const visibleDesigns = DESIGNS.slice(0, state.visibleDesignsCount);
    const hasMore = state.visibleDesignsCount < DESIGNS.length;

    // Fotos editoriales destacadas para alternar en el catálogo (versión WebP optimizada)
    const editorialModel1 = optWebp('assets/Modelos_riola/', MODELS[1] || MODELS[0]);
    const editorialModel2 = optWebp('assets/Modelos_riola/', MODELS[2] || MODELS[0]);
    const editorialFallback1 = encodeURI('assets/Modelos_riola/' + (MODELS[1] || MODELS[0]));
    const editorialFallback2 = encodeURI('assets/Modelos_riola/' + (MODELS[2] || MODELS[0]));

    let itemsHtml = '';

    visibleDesigns.forEach((designFile, idx) => {
      // Inserción editorial 1 tras 4 diseños
      if (idx === 4) {
        itemsHtml += `
          <div class="featured-editorial-card">
            <div class="featured-editorial-media">
              <picture><source srcset="${editorialModel1}" type="image/webp" /><img src="${editorialFallback1}" alt="Lookbook RIOLA en la calle" loading="lazy" decoding="async" /></picture>
            </div>
            <div class="featured-editorial-content">
              <span class="featured-editorial-badge">LOOKBOOK RIOLA</span>
              <h3 class="featured-editorial-title">Actitud de calle y berraquera</h3>
              <p class="featured-editorial-sub">Prendas diseñadas para aguantar el trote con siluetas confortables y estampados de alta resistencia.</p>
            </div>
          </div>`;
      }

      // Inserción editorial 2 tras 12 diseños
      if (idx === 12) {
        itemsHtml += `
          <div class="featured-editorial-card">
            <div class="featured-editorial-media">
              <picture><source srcset="${editorialModel2}" type="image/webp" /><img src="${editorialFallback2}" alt="Detalle urbano prenda RIOLA" loading="lazy" decoding="async" /></picture>
            </div>
            <div class="featured-editorial-content">
              <span class="featured-editorial-badge">DETALLE & TEXTURA</span>
              <h3 class="featured-editorial-title">Lavados únicos • Corte Oversize</h3>
              <p class="featured-editorial-sub">Cada prenda acid wash pasa por procesos manuales que garantizan un acabado irrepetible.</p>
            </div>
          </div>`;
      }

      const imgPath = encodeURI('assets/Diseños_riola/' + designFile);
      const imgThumb = optWebp('assets/Diseños_riola/', designFile);
      const designNumber = String(idx + 1).padStart(2, '0');
      // Las primeras 4 tarjetas (potencialmente visibles) no usan lazy
      const lazyAttr = idx < 4 ? 'eager' : 'lazy';

      itemsHtml += `
        <article class="design-card" data-design="${imgPath}" data-title="Diseño RIOLA #${designNumber}" role="button" tabindex="0" aria-label="Ver Diseño #${designNumber}">
          <div class="design-card-media">
            <picture>
              <source srcset="${imgThumb}" type="image/webp" />
              <img
                src="${imgPath}"
                alt="Estampado auténtico RIOLA #${designNumber}"
                loading="${lazyAttr}"
                decoding="async"
                width="450"
                height="450"
              />
            </picture>
          </div>
          <div class="design-card-footer">
            <span class="design-card-tag">DISEÑO #${designNumber}</span>
            <span class="design-card-action">
              Ampliar ${iconExpand()}
            </span>
          </div>
        </article>`;
    });

    return `
    <section id="catalogo" class="section">
      <div class="container">
        <div class="section-head">
          <span class="section-tag">${boltSvg()} Portafolio Gráfico</span>
          <h2 class="section-title">Catálogo de Diseños</h2>
          <p class="section-desc">
            Explora nuestros estampados de autor: frases santandereanas, humor urbano e ilustraciones con personalidad. Haz clic sobre cualquier tarjeta para ampliarla en alta resolución.
          </p>
        </div>

        <div class="catalog-stats-bar">
          <div class="catalog-counter">
            <span>Mostrando:</span>
            <span class="count-badge">${visibleDesigns.length} de ${DESIGNS.length} diseños</span>
          </div>
          <span style="font-size: 0.8rem; text-transform: uppercase;">Colección Auténtica ⚡</span>
        </div>

        <div class="mixed-grid">
          ${itemsHtml}
        </div>

        ${hasMore ? `
        <div class="catalog-load-wrap">
          <button id="load-more-designs-btn" class="btn btn-secondary">
            VER MÁS DISEÑOS (+${Math.min(state.batchSize, DESIGNS.length - state.visibleDesignsCount)}) ${boltSvg()}
          </button>
        </div>` : ''}
      </div>
    </section>`;
  };

  /* 5. Sección Identidad RIOLA */
  const renderIdentity = () => `
    <section id="identidad" class="section section-alt">
      <div class="container">
        <div class="section-head">
          <span class="section-tag">${boltSvg()} Cultura & Origen</span>
          <h2 class="section-title">Identidad Santandereana</h2>
          <p class="section-desc">
            RIOLA no es una marca genérica. Nacimos en Bucaramanga con la misión de vestir la calle con humor, carácter y berraquera regional.
          </p>
        </div>

        <div class="identity-grid">
          <div class="identity-card">
            <div class="identity-card-icon">📍</div>
            <h3>De Bucaramanga pa'l Mundo</h3>
            <p>
              Reivindicamos el dialecto, las costumbres y la fuerza de Santander. Nuestras prendas llevan frases que resuenan en el parche y reflejan la identidad local sin rodeos.
            </p>
            <div class="identity-quote">«¡Melooo carameloooo! ⚡»</div>
          </div>

          <div class="identity-card">
            <div class="identity-card-icon">⚡</div>
            <h3>Hecho con Buena Vibra</h3>
            <p>
              El rayo amarillo representa la energía y el optimismo con el que producimos cada pieza. No hacemos ropa en serie: estampamos ideas que conectan con la gente real.
            </p>
            <div class="identity-quote">«Energía de la calle 24/7»</div>
          </div>

          <div class="identity-card">
            <div class="identity-card-icon">📦</div>
            <h3>Envíos a Todo el País</h3>
            <p>
              Desde nuestros talleres en Bucaramanga despachamos a cualquier rincón de Colombia. Confección honesta, materiales resistentes y garantía de satisfacción.
            </p>
            <div class="identity-quote">«Enviamos a todo lado! 🇨🇴 🚀»</div>
          </div>
        </div>
      </div>
    </section>`;

  /* 6. Sección Prendas y Guía de Tallas Integrada */
  const renderPrendasAndTallas = () => {
    const active = SILHOUETTES[state.activeSilhouette] || SILHOUETTES.normal;
    const currentImg = state.activeGarmentImage || active.images[0];

    const tabsHtml = Object.keys(SILHOUETTES).map(key => {
      const s = SILHOUETTES[key];
      const isSelected = key === state.activeSilhouette;
      return `<button
        class="silhouette-tab"
        role="tab"
        aria-selected="${isSelected}"
        data-silhouette="${s.id}">
        ${s.name}
      </button>`;
    }).join('');

    const thumbsHtml = active.images.map((imgUrl, i) => {
      const isActive = imgUrl === currentImg;
      // Detectar carpeta para ruta de thumb WebP
      const folderMatch = imgUrl.match(/^(assets\/Siluetas_riola\/[^/]+\/)/);
      const folder = folderMatch ? folderMatch[1] : '';
      const filename = imgUrl.split('/').pop();
      const thumbWebp = folder ? optWebp(folder, filename) : encodeURI(imgUrl);
      return `
        <div class="garment-thumb ${isActive ? 'active' : ''}" data-img="${encodeURI(imgUrl)}" role="button" tabindex="0" aria-label="Variante ${i+1}" aria-selected="${isActive}">
          <picture>
            <source srcset="${thumbWebp}" type="image/webp" />
            <img src="${encodeURI(imgUrl)}" alt="Variante ${active.name} ${i+1}" loading="lazy" width="64" height="64" />
          </picture>
        </div>`;
    }).join('');

    // Build table headers and rows based on measureType
    const mt = active.measureType || 'normal';
    let tableHead = '';
    let tableRows = '';
    if (mt === 'normal') {
      tableHead = '<tr><th>Talla</th><th>Pecho</th><th>Cintura</th><th>Largo</th></tr>';
      tableRows = active.measurements.map(m => `
        <tr><td>${m.size}</td><td>${m.pecho}</td><td>${m.cintura}</td><td>${m.largo}</td></tr>
      `).join('');
    } else if (mt === 'oversize') {
      tableHead = '<tr><th>Talla</th><th>A — Ancho pecho</th><th>B — Largo hombro</th></tr>';
      tableRows = active.measurements.map(m => `
        <tr><td>${m.size}</td><td>${m.a}</td><td>${m.b}</td></tr>
      `).join('');
    } else if (mt === 'buzos') {
      tableHead = '<tr><th>Talla</th><th>Hombros</th><th>Torso</th><th>Largo</th><th>Manga</th></tr>';
      tableRows = active.measurements.map(m => `
        <tr><td>${m.size}</td><td>${m.hombros}</td><td>${m.torso}</td><td>${m.largo}</td><td>${m.manga}</td></tr>
      `).join('');
    }

    return `
    <section id="prendas" class="section">
      <div class="container">
        <div class="section-head">
          <span class="section-tag">${boltSvg()} Siluetas Reales & Ajuste</span>
          <h2 class="section-title">Prendas & Guía de Tallas</h2>
          <p class="section-desc">
            Selecciona una silueta para ver su fotografía real en stock, características de confección y las medidas exactas en centímetros para elegir tu talla ideal.
          </p>
        </div>

        <!-- Selector de Siluetas -->
        <div class="silhouette-selector" role="tablist" aria-label="Tipos de prenda RIOLA">
          ${tabsHtml}
        </div>

        <!-- Panel de Prenda Activa con Medidas -->
        <div class="garment-showcase">
          <!-- 1. Nombre de la silueta (Encabezado móvil en orden 1) -->
          <div class="garment-mobile-header">
            <h3 class="garment-title">${active.name}</h3>
          </div>

          <!-- Columna Imagen y Variantes (Orden 2 y 3 en móvil) -->
          <div class="garment-visuals">
            <!-- 2. Fotografía principal -->
            <div class="garment-main-frame">
              <picture id="garment-main-picture">
                ${(() => {
                  const f = currentImg.match(/^(assets\/Siluetas_riola\/[^/]+\/)/);
                  const folder = f ? f[1] : '';
                  const fn = currentImg.split('/').pop();
                  const webp = folder ? optWebp(folder, fn) : '';
                  return webp ? `<source srcset="${webp}" type="image/webp" />` : '';
                })()}
                <img
                  id="garment-main-img"
                  src="${encodeURI(currentImg)}"
                  alt="Prenda auténtica RIOLA: ${active.name}"
                  loading="eager"
                  width="420"
                  height="420"
                />
              </picture>
              <span class="garment-badge-strip">${active.badge}</span>
            </div>

            <!-- 3. Variantes y colores disponibles -->
            <div class="garment-thumbs-wrap">
              <div class="garment-thumbs-title">Variantes y colores en catálogo (${active.images.length} disponibles):</div>
              <div class="garment-thumbs">
                ${thumbsHtml}
              </div>
            </div>
          </div>

          <!-- Columna Información y Tabla de Medidas (Orden 4, 5, 6, 7 en móvil) -->
          <div class="garment-info-wrap">
            <div class="garment-desktop-header">
              <h3 class="garment-title">${active.name}</h3>
            </div>
            <!-- 4. Descripción breve -->
            <p class="garment-desc">${active.description}</p>

            <div class="garment-specs-grid">
              <div class="spec-item">
                <span class="spec-label">Origen</span>
                <span class="spec-val">Bucaramanga, Col.</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Acabado</span>
                <span class="spec-val">Costuras reforzadas</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Variación</span>
                <span class="spec-val">± 1 cm en confección</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Tolerancia</span>
                <span class="spec-val">Lavado pre-encogido</span>
              </div>
            </div>

            <!-- Medidas y Diagrama -->
            <div class="measure-box">
              <div class="diagram-inline">
                ${measurementDiagramSvg(mt)}
                <div class="diagram-legend">
                  ${mt === 'normal' ? '<p><strong>A:</strong> Ancho de pecho</p><p><strong>B:</strong> Cintura</p><p><strong>C:</strong> Largo total</p>' : ''}
                  ${mt === 'oversize' ? '<p><strong>A:</strong> Ancho de pecho (axila a axila)</p><p><strong>B:</strong> Largo desde hombro</p>' : ''}
                  ${mt === 'buzos' ? '<p><strong>A:</strong> Hombros</p><p><strong>B:</strong> Torso</p><p><strong>C:</strong> Largo / Manga</p>' : ''}
                </div>
              </div>

              <div class="table-responsive">
                <table class="measure-table">
                  <thead>
                    ${tableHead}
                  </thead>
                  <tbody>
                    ${tableRows}
                  </tbody>
                </table>
              </div>
              ${active.measureNote ? `<p class="measure-note">${active.measureNote}</p>` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>`;
  };

  /* 7. Contacto y Footer */
  const renderFooter = () => `
    <section id="contacto" class="section section-alt">
      <div class="container">
        <div class="footer-cta-box">
          <h2 class="footer-cta-title">¿Tienes preguntas sobre el catálogo?</h2>
          <p class="footer-cta-desc">
            Escríbenos directamente para consultar disponibilidad de siluetas, nuevos lanzamientos o envíos a tu ciudad.
          </p>
          <div class="footer-channels">
            <a
              href="${INSTAGRAM_RIOLA_URL}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              SEGUIR EN INSTAGRAM @riola_oficial
            </a>
            <a
              href="${WA_RIOLA_URL}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-secondary"
              aria-label="Comunícate por WhatsApp con RIOLA (+57 311 465 2883)"
            >
              COMUNÍCATE POR WHATSAPP
            </a>
          </div>
        </div>

        <footer class="site-footer">
          <div class="footer-grid">
            <div class="footer-brand-col">
              <div class="brand">
                <span class="brand-logo-badge">
                  <img src="assets/Logo_riola.jpg" alt="Logo RIOLA" class="brand-logo-img" width="38" height="38" />
                </span>
                <span class="brand-name">RIOLA</span>
              </div>
              <p class="footer-about">
                Marca de ropa urbana originaria de Bucaramanga, Santander, Colombia. Confección honesta, frases santandereanas y el lema: «HECHO CON BUENA VIBRA ⚡».
              </p>
            </div>

            <div class="footer-nav-col">
              <h4>Secciones</h4>
              <ul class="footer-links-list">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#catalogo">Catálogo de Diseños</a></li>
                <li><a href="#identidad">Identidad RIOLA</a></li>
                <li><a href="#prendas">Prendas & Tallas</a></li>
              </ul>
            </div>

            <div class="footer-nav-col">
              <h4>Canales Oficiales</h4>
              <ul class="footer-links-list">
                <li>
                  <a href="${INSTAGRAM_RIOLA_URL}" target="_blank" rel="noopener noreferrer">
                    Instagram @riola_oficial
                  </a>
                </li>
                <li>
                  <a href="${WA_RIOLA_URL}" target="_blank" rel="noopener noreferrer">
                    WhatsApp Oficial (+57 311 465 2883)
                  </a>
                </li>
                <li><span>Bucaramanga, Santander</span></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom-bar">
            <div>&copy; ${new Date().getFullYear()} RIOLA. Todos los derechos reservados. Catálogo visual de muestra.</div>
            <div>HECHO CON BUENA VIBRA ⚡ — Bucaramanga pa'l mundo</div>
          </div>
        </footer>
      </div>
    </section>`;

  /* 8. Lightbox Modal */
  const renderLightbox = () => `
    <div id="lightbox-backdrop" class="lightbox-backdrop ${state.lightboxImage ? 'active' : ''}" role="dialog" aria-modal="true" aria-label="Visor de Imagen">
      <div class="lightbox-dialog">
        <button id="lightbox-close-btn" class="lightbox-close-btn" aria-label="Cerrar visor">
          &times;
        </button>
        <div class="lightbox-image-wrap">
          <img id="lightbox-img" src="${state.lightboxImage || ''}" alt="${state.lightboxTitle}" />
        </div>
        <div class="lightbox-caption">
          <span id="lightbox-caption-text">${state.lightboxTitle}</span>
          <span style="color: var(--primary);">RIOLA ⚡</span>
        </div>
      </div>
    </div>`;

  /* 9. Vista dedicada de Diseños */
  const renderDesignsView = () => {
    const visibleDesigns = DESIGNS.slice(0, state.visibleDesignsCount);
    const hasMore = state.visibleDesignsCount < DESIGNS.length;
    let cardsHtml = '';
    visibleDesigns.forEach((designFile, idx) => {
      const imgPath = encodeURI('assets/Diseños_riola/' + designFile);
      const imgThumb = optWebp('assets/Diseños_riola/', designFile);
      const designNumber = String(idx + 1).padStart(2, '0');
      const lazyAttr2 = idx < 4 ? 'eager' : 'lazy';
      cardsHtml += `
        <article class="design-card" data-design="${imgPath}" data-title="Diseño RIOLA #${designNumber}" role="button" tabindex="0" aria-label="Ver Diseño #${designNumber}">
          <div class="design-card-media">
            <picture>
              <source srcset="${imgThumb}" type="image/webp" />
              <img src="${imgPath}" alt="Estampado auténtico RIOLA #${designNumber}" loading="${lazyAttr2}" decoding="async" width="450" height="450" />
            </picture>
          </div>
          <div class="design-card-footer">
            <span class="design-card-tag">DISEÑO #${designNumber}</span>
            <span class="design-card-action">Ampliar ${iconExpand()}</span>
          </div>
        </article>`;
    });
    return `
    <div class="designs-view-page">
      <header class="designs-view-header">
        <div class="container designs-view-header-inner">
          <a href="#inicio" class="designs-view-back" data-nav-home="1">
            ${boltSvg()} Volver al inicio
          </a>
          <span class="brand-name">RIOLA ⚡ DISEÑOS</span>
          <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Cambiar tema">
            <span class="theme-icon">${state.theme === 'dark' ? iconSun() : iconMoon()}</span>
            <span class="theme-text">${state.theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
          </button>
        </div>
      </header>
      <main>
        <section class="section">
          <div class="container">
            <div class="section-head">
              <span class="section-tag">${boltSvg()} Portafolio Completo</span>
              <h1 class="section-title">Catálogo de Diseños</h1>
              <p class="section-desc">Todos los estampados auténticos RIOLA — frases santandereanas, humor urbano e ilustraciones con personalidad.</p>
            </div>
            <div class="catalog-stats-bar">
              <div class="catalog-counter">
                <span>Mostrando:</span>
                <span class="count-badge">${visibleDesigns.length} de ${DESIGNS.length} diseños</span>
              </div>
              <span style="font-size:0.8rem;text-transform:uppercase;">Colección Auténtica ⚡</span>
            </div>
            <div class="mixed-grid designs-only-grid">
              ${cardsHtml}
            </div>
            ${hasMore ? `
            <div class="catalog-load-wrap">
              <button id="load-more-designs-btn" class="btn btn-secondary">
                VER MÁS DISEÑOS (+${Math.min(state.batchSize, DESIGNS.length - state.visibleDesignsCount)}) ${boltSvg()}
              </button>
            </div>` : ''}
          </div>
        </section>
      </main>
      ${renderLightbox()}
    </div>`;
  };

  /* ---------- RENDERIZADO GLOBAL ---------- */
  const app = document.getElementById('app');

  const renderApp = () => {
    if (state.currentView === 'designs') {
      app.innerHTML = renderDesignsView();
    } else {
      app.innerHTML = `
        ${renderHeader()}
        ${renderBrandTicker()}
        <main>
          ${renderHero()}
          ${renderCatalog()}
          ${renderIdentity()}
          ${renderPrendasAndTallas()}
        </main>
        ${renderFooter()}
        ${renderLightbox()}
      `;
    }
    bindEvents();
  };

  /* ---------- INTERACTIVIDAD Y EVENTOS ---------- */
  const bindEvents = () => {
    // 1. Selector de Tema
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(state.theme);
        themeBtn.querySelector('.theme-icon').innerHTML = state.theme === 'dark' ? iconSun() : iconMoon();
        themeBtn.querySelector('.theme-text').textContent = state.theme === 'dark' ? 'Claro' : 'Oscuro';
      });
    }

    // 2. Menú Móvil con microanimación y control de accesibilidad
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobilePanel = document.getElementById('mobile-nav-panel');

    const setMenuOpen = (open) => {
      state.mobileMenuOpen = open;
      if (mobilePanel) mobilePanel.classList.toggle('open', open);
      if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      }
    };

    if (menuBtn && mobilePanel) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setMenuOpen(!state.mobileMenuOpen);
      });

      mobilePanel.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          setMenuOpen(false);
        });
      });

      // Cerrar al pulsar fuera del panel y del botón
      document.addEventListener('click', (e) => {
        if (state.mobileMenuOpen && !mobilePanel.contains(e.target) && !menuBtn.contains(e.target)) {
          setMenuOpen(false);
        }
      });
    }

    // 3. Botón Ver más diseños
    const loadMoreBtn = document.getElementById('load-more-designs-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        state.visibleDesignsCount = Math.min(state.visibleDesignsCount + state.batchSize, DESIGNS.length);
        renderApp();
        const catalogoEl = document.getElementById('catalogo');
        if (catalogoEl) {
          const cards = catalogoEl.querySelectorAll('.design-card');
          if (cards.length > 0) {
            cards[cards.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });
    }

    // 4. Selector de Siluetas y Miniaturas
    const prendaTabs = document.querySelectorAll('.silhouette-tab');
    prendaTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const id = tab.dataset.silhouette;
        if (id && id !== state.activeSilhouette) {
          state.activeSilhouette = id;
          state.activeGarmentImage = null;
          renderApp();
          const prendasEl = document.getElementById('prendas');
          if (prendasEl) {
            prendasEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Centrar horizontalmente la pestaña de silueta activa dentro del selector si se desborda (sin desplazar la ventana)
    const activeTab = document.querySelector('.silhouette-tab[aria-selected="true"]');
    const selector = document.querySelector('.silhouette-selector');
    if (selector && activeTab) {
      const scrollPos = activeTab.offsetLeft - (selector.clientWidth / 2) + (activeTab.clientWidth / 2);
      selector.scrollLeft = Math.max(0, scrollPos);
    }

    // Función centralizada para actualizar la variante visual de prenda
    const updateGarmentVariant = (imgUrl) => {
      state.activeGarmentImage = decodeURI(imgUrl);
      const pictureEl = document.getElementById('garment-main-picture');
      if (!pictureEl) return;

      const folderMatch = state.activeGarmentImage.match(/^(assets\/Siluetas_riola\/[^/]+\/)/);
      const folder = folderMatch ? folderMatch[1] : '';
      const filename = state.activeGarmentImage.split('/').pop();
      const thumbWebp = folder ? optWebp(folder, filename) : '';
      const active = SILHOUETTES[state.activeSilhouette] || SILHOUETTES.normal;

      // Actualiza sincronizadamente tanto source srcset (WebP) como img src (fallback)
      // Reemplazar el contenido de picture fuerza al navegador a re-evaluar la imagen
      // eliminando el bug donde source srcset antiguo bloqueaba la actualización del img src.
      pictureEl.innerHTML = `
        ${thumbWebp ? `<source srcset="${thumbWebp}" type="image/webp" />` : ''}
        <img
          id="garment-main-img"
          src="${encodeURI(state.activeGarmentImage)}"
          alt="Prenda auténtica RIOLA: ${active.name}"
          loading="eager"
          width="420"
          height="420"
          class="garment-img-swap"
        />
      `;
    };

    const thumbs = document.querySelectorAll('.garment-thumb');
    thumbs.forEach(thumb => {
      const selectVariant = () => {
        const imgUrl = thumb.dataset.img;
        if (imgUrl) {
          const decoded = decodeURI(imgUrl);
          const active = SILHOUETTES[state.activeSilhouette] || SILHOUETTES.normal;
          const current = state.activeGarmentImage || active.images[0];
          if (decoded !== current) {
            updateGarmentVariant(imgUrl);
            thumbs.forEach(t => {
              const isTarget = t === thumb;
              t.classList.toggle('active', isTarget);
              t.setAttribute('aria-selected', isTarget ? 'true' : 'false');
            });
          }
        }
      };

      thumb.addEventListener('click', selectVariant);
      thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectVariant();
        }
      });
    });

    // 5. Clic en Tarjetas de Diseño (Lightbox)
    const designCards = document.querySelectorAll('.design-card');
    designCards.forEach(card => {
      const openModal = () => {
        const imgPath = card.dataset.design;
        const title = card.dataset.title;
        openLightbox(imgPath, title);
      };

      card.addEventListener('click', openModal);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal();
        }
      });
    });

    // 6. Cerrar Lightbox
    const closeBtn = document.getElementById('lightbox-close-btn');
    const backdrop = document.getElementById('lightbox-backdrop');
    if (closeBtn && backdrop) {
      closeBtn.addEventListener('click', closeLightbox);
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeLightbox();
      });
    }

    // 7. Volver al inicio desde designs view
    document.querySelectorAll('[data-nav-home]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        state.currentView = 'home';
        history.pushState(null, '', '#inicio');
        renderApp();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // 8. Interceptar links que van a #disenos (delegado)
    document.querySelectorAll('a[href="#disenos"]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        state.currentView = 'designs';
        state.visibleDesignsCount = 16;
        history.pushState(null, '', '#disenos');
        renderApp();
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    });
  };

  const openLightbox = (imgUrl, title) => {
    state.lightboxImage = imgUrl;
    state.lightboxTitle = title || 'Diseño RIOLA ⚡';
    const backdrop = document.getElementById('lightbox-backdrop');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption-text');

    if (backdrop && img) {
      img.src = imgUrl;  // imgUrl already encoded at render time
      if (caption) caption.textContent = state.lightboxTitle;
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    state.lightboxImage = null;
    const backdrop = document.getElementById('lightbox-backdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.lightboxImage) {
        closeLightbox();
      }
      if (state.mobileMenuOpen) {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobilePanel = document.getElementById('mobile-nav-panel');
        if (menuBtn && mobilePanel) {
          state.mobileMenuOpen = false;
          mobilePanel.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.setAttribute('aria-label', 'Abrir menú');
          menuBtn.focus();
        }
      }
    }
  });

  // Hash routing: listen for hash changes (back/forward button support)
  const handleHashChange = () => {
    const hash = window.location.hash;
    if (hash === '#disenos') {
      state.currentView = 'designs';
      state.visibleDesignsCount = 16;  // reset pagination
      renderApp();
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (state.currentView === 'designs') {
      state.currentView = 'home';
      renderApp();
    }
  };

  window.addEventListener('hashchange', handleHashChange);

  /* ---------- TEMA Y ARRANQUE ---------- */
  const THEME_KEY = 'riola-theme';

  const applyTheme = (theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  };

  let savedTheme = 'dark';
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      savedTheme = stored;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      savedTheme = 'light';
    }
  } catch {}

  state.theme = savedTheme;
  applyTheme(state.theme);

  // Render inicial
  renderApp();

})();
