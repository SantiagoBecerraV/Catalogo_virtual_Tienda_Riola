// Comprueba el inventario de imágenes: node scripts/check-assets.mjs
// - Cada ruta de catalog.js existe en disco con la capitalización exacta (válido en servidores sensibles a mayúsculas).
// - Todas las imágenes de assets/ están en el catálogo o figuran como excluidas con motivo.
// - Los ids son únicos y no hay referencias locales rotas en index.html / app.js / styles.css.
// - No existe ningún mecanismo de texto libre (input, textarea, contenteditable).
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const fail = (m) => errors.push(m);

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "catalog.js"), "utf8"), sandbox);
const c = sandbox.window.RIOLA_CATALOG;

// Existencia exacta (comparando cada segmento con readdir, no con el sistema de archivos del SO)
const existsExact = (rel) => {
  let dir = root;
  for (const seg of rel.split("/")) {
    if (!fs.existsSync(dir) || !fs.readdirSync(dir).includes(seg)) return false;
    dir = path.join(dir, seg);
  }
  return true;
};

const items = [
  ...c.models.map((x) => ["modelo", x]),
  ...c.designs.map((x) => ["diseño", x]),
  ...c.silhouettes.flatMap((s) => s.photos.map((x) => ["silueta", x])),
];

const ids = new Set();
for (const [kind, it] of items) {
  if (ids.has(it.id)) fail(`id duplicado: ${it.id}`);
  ids.add(it.id);
  if (!existsExact(it.src)) fail(`${kind} ${it.id}: no existe (o difiere en mayúsculas/tildes): ${it.src}`);
  if (!it.width || !it.height) fail(`${kind} ${it.id}: faltan dimensiones`);
  if (!(it.alt || it.label)) fail(`${kind} ${it.id}: sin texto alternativo ni etiqueta`);
}

// Cobertura: todo archivo de imagen bajo assets/ debe estar catalogado o excluido
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
const onDisk = walk(path.join(root, "assets"))
  .filter((f) => /\.(jpe?g|png|webp|gif|svg|ico)$/i.test(f))
  .map((f) => path.relative(root, f).split(path.sep).join("/"));
const covered = new Set([...items.map(([, x]) => x.src), ...c.excludedDesigns.map((x) => x.src)]);
for (const f of onDisk) if (!covered.has(f)) fail(`imagen sin catalogar ni excluir: ${f}`);
for (const e of c.excludedDesigns) if (!e.reason) fail(`exclusión sin motivo: ${e.src}`);

// Referencias locales literales en HTML/CSS/JS
for (const file of ["index.html", "app.js", "styles.css"]) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  const refs = [...text.matchAll(/(?:src|href|url\()\s*=?\s*["']?(assets\/[^"')\s]+)/g)].map((m) => decodeURI(m[1]));
  for (const r of refs) if (!existsExact(r)) fail(`${file}: referencia rota ${r}`);
}

// Sin texto libre
for (const file of ["index.html", "app.js"]) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  if (/<(input|textarea)\b|contenteditable|prompt\(/i.test(text)) fail(`${file}: posible entrada de texto libre`);
}

console.log(
  `Catálogo: ${c.models.length} modelos, ${c.designs.length} diseños (+${c.excludedDesigns.length} excluidos), ` +
    `${c.silhouettes.map((s) => `${s.id}:${s.photos.length}`).join(", ")}; ${onDisk.length} imágenes en disco.`,
);
if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log("✓ Rutas, inventario y ausencia de texto libre verificados.");
