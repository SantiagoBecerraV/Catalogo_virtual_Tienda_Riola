# RIOLA — Catálogo Virtual

Sitio web y catálogo estático oficial de RIOLA Streetwear (Bucaramanga, Colombia).
Arquitectura ligera, optimizada para rendimiento móvil y compatible con GitHub Pages.

## Estructura principal

- `index.html` — Estructura semántica y preloads críticos de rendimiento.
- `styles.css` — Sistema de diseño responsive, variables CSS y modos claro/oscuro.
- `app.js` — Lógica vanilla modular, datos de catálogo, visor y navegación.
- `assets/Diseños_riola/` — Imágenes originales de estampados y diseños.
- `assets/Diseños_riola/opt/` — Miniaturas WebP optimizadas para carga progresiva.
- `assets_manifest.json` — Manifiesto unificado de recursos.
- `scripts/sync_catalog.py` — Automatización y sincronización del catálogo.

---

## Mantenimiento y Actualización del Catálogo

El catálogo de diseños se gestiona de forma automatizada mediante un único comando:

```bash
npm run catalog:sync
```
*(Alternativa directa: `python scripts/sync_catalog.py`)*

### 1. Añadir nuevos diseños
1. Coloca las imágenes (`.jpeg`, `.jpg`, `.png`, `.webp`) en `assets/Diseños_riola/`.
2. Ejecuta `npm run catalog:sync`.
3. El script detectará los nuevos archivos, generará sus miniaturas WebP en `assets/Diseños_riola/opt/` (preservando proporciones) y actualizará las referencias.

### 2. Eliminar diseños antiguos
1. Borra los archivos que desees retirar de `assets/Diseños_riola/`.
2. Ejecuta `npm run catalog:sync`.
3. El script eliminará automáticamente las referencias en el catálogo y purgará las miniaturas WebP huérfanas en `opt/`.

### 3. Archivos modificados automáticamente por el comando
- `assets_manifest.json` — Sincroniza la lista de diseños bajo `"designs"`.
- `app.js` — Actualiza el array `DESIGNS`.
- `assets/Diseños_riola/opt/` — Crea nuevas miniaturas WebP o elimina miniaturas huérfanas.

*(Las imágenes originales nunca son alteradas ni eliminadas por el script).*

### 4. Comprobación local
Abre `index.html` en el navegador (o levanta un servidor local: `python -m http.server 8000`) y comprueba:
- Vista general de inicio y vista completa de diseños (`#disenos`).
- Ampliación en el visor (lightbox) con clic en cualquier tarjeta.
- Enlace oficial de WhatsApp (+57 311 465 2883) en la sección de contacto y pie de página.

### 5. Publicación en GitHub Pages
Para desplegar las actualizaciones en producción:

```bash
git add .
git commit -m "feat(catalog): actualizacion de disenos y sincronizacion"
git push
```
*(GitHub Pages actualizará el sitio automáticamente desde la rama conectada).*
