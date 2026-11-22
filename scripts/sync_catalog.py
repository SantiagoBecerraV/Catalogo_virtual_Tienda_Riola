#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RIOLA — Script de sincronización y automatización del catálogo de diseños.
Sincroniza assets/Diseños_riola/, assets/Diseños_riola/opt/, assets_manifest.json y app.js.
"""

import sys
import os
import re
import json
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow (PIL) no está instalado. Instálalo con: pip install Pillow")
    sys.exit(1)

# Configuraciones
VALID_EXTENSIONS = {'.jpeg', '.jpg', '.png', '.webp'}
THUMB_MAX_SIZE = (450, 450)
WEBP_QUALITY = 82
WEBP_METHOD = 6

def natural_sort_key(s: str):
    """Orden natural para nombres de archivo como 'Diseño_nuevo2.jpeg' < 'Diseño_nuevo10.jpeg'."""
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

def sync_catalog():
    # Resolver directorio raíz del proyecto
    script_dir = Path(__file__).resolve().parent
    root_dir = script_dir.parent
    designs_dir = root_dir / "assets" / "Diseños_riola"
    opt_dir = designs_dir / "opt"
    manifest_path = root_dir / "assets_manifest.json"
    app_path = root_dir / "app.js"

    if not designs_dir.exists():
        print(f"ERROR: No se encontró la carpeta de diseños en: {designs_dir}")
        sys.exit(1)

    opt_dir.mkdir(parents=True, exist_ok=True)

    # 1. Leer manifiesto actual para preservar el orden histórico
    manifest_data = {}
    current_manifest_designs = []
    if manifest_path.exists():
        try:
            with open(manifest_path, "r", encoding="utf-8") as f:
                manifest_data = json.load(f)
            current_manifest_designs = manifest_data.get("designs", [])
        except Exception as e:
            print(f"ADVERTENCIA: No se pudo leer {manifest_path}: {e}")

    # Fallback si manifest no tenía designs: intentar extraer de app.js
    if not current_manifest_designs and app_path.exists():
        try:
            with open(app_path, "r", encoding="utf-8") as f:
                app_content = f.read()
            match = re.search(r'const DESIGNS = \[(.*?)\];', app_content, re.DOTALL)
            if match:
                for line in match.group(1).split("\n"):
                    line = line.strip()
                    if line.startswith('"') and not line.startswith('//'):
                        current_manifest_designs.append(line.rstrip(',').strip('"'))
        except Exception as e:
            print(f"ADVERTENCIA: No se pudo extraer lista desde app.js: {e}")

    # 2. Escanear archivos físicos válidos en assets/Diseños_riola/
    # (ignora opt/, subdirectorios, archivos ocultos y archivos no de imagen)
    disk_files = {}
    for entry in designs_dir.iterdir():
        if entry.is_file():
            if entry.name.startswith('.'):
                continue
            if entry.name.endswith('_thumb.webp'):
                continue
            if entry.suffix.lower() in VALID_EXTENSIONS:
                disk_files[entry.name] = entry

    # 3. Detectar eliminados, conservados y nuevos
    disk_names_set = set(disk_files.keys())
    
    # Diseños activos conservando su orden previo
    active_designs = []
    seen = set()
    for name in current_manifest_designs:
        if name in disk_names_set and name not in seen:
            active_designs.append(name)
            seen.add(name)

    # Diseños eliminados
    deleted_designs = [name for name in current_manifest_designs if name not in disk_names_set]

    # Diseños nuevos (no estaban en el manifiesto)
    new_designs = [name for name in disk_names_set if name not in seen]
    new_designs.sort(key=natural_sort_key)

    # Lista consolidada determinista
    for nd in new_designs:
        active_designs.append(nd)
        seen.add(nd)

    # 4. Procesamiento de miniaturas WebP
    generated_count = 0
    modified_count = 0
    skipped_count = 0
    errors_list = []

    # Eliminar miniaturas obsoletas de archivos eliminados
    for del_name in deleted_designs:
        stem = Path(del_name).stem
        orphaned_thumb = opt_dir / f"{stem}_thumb.webp"
        if orphaned_thumb.exists():
            try:
                orphaned_thumb.unlink()
            except Exception as e:
                errors_list.append(f"Error al eliminar miniatura huérfana {orphaned_thumb.name}: {e}")

    # Generar o actualizar miniaturas de diseños activos
    for design_name in active_designs:
        orig_file = disk_files[design_name]
        stem = orig_file.stem
        thumb_file = opt_dir / f"{stem}_thumb.webp"

        is_new = design_name in new_designs
        needs_generation = False
        is_modification = False

        if not thumb_file.exists():
            needs_generation = True
        else:
            try:
                orig_mtime = orig_file.stat().st_mtime
                thumb_mtime = thumb_file.stat().st_mtime
                thumb_size = thumb_file.stat().st_size
                if thumb_size == 0 or orig_mtime > thumb_mtime:
                    needs_generation = True
                    is_modification = not is_new
            except Exception as e:
                needs_generation = True

        if needs_generation:
            try:
                with Image.open(orig_file) as img:
                    # Preservar modo de color
                    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                        img_converted = img.convert("RGBA")
                    else:
                        img_converted = img.convert("RGB")
                    
                    # Redimensionar conservando proporción exacta sin recortes
                    img_converted.thumbnail(THUMB_MAX_SIZE, Image.LANCZOS)
                    img_converted.save(thumb_file, "WEBP", quality=WEBP_QUALITY, method=WEBP_METHOD)

                generated_count += 1
                if is_modification:
                    modified_count += 1
            except Exception as e:
                errors_list.append(f"Error al procesar '{design_name}': {e}")
        else:
            skipped_count += 1

    # 5. Sincronizar assets_manifest.json
    manifest_updated = False
    if manifest_data.get("designs") != active_designs:
        manifest_data["designs"] = active_designs
        try:
            with open(manifest_path, "w", encoding="utf-8") as f:
                json.dump(manifest_data, f, ensure_ascii=False, indent=2)
            manifest_updated = True
        except Exception as e:
            errors_list.append(f"Error al escribir {manifest_path.name}: {e}")

    # 6. Sincronizar app.js
    app_updated = False
    if app_path.exists():
        try:
            with open(app_path, "r", encoding="utf-8") as f:
                app_code = f.read()

            # Formatear el nuevo array DESIGNS
            designs_code_lines = ["  const DESIGNS = ["]
            for idx, d in enumerate(active_designs):
                comma = "," if idx < len(active_designs) - 1 else ""
                designs_code_lines.append(f'    "{d}"{comma}')
            designs_code_lines.append("  ];")
            new_designs_block = "\n".join(designs_code_lines)

            # Buscar y reemplazar el bloque const DESIGNS = [ ... ];
            pattern = r'  const DESIGNS = \[\n(?:.|\n)*?\n  \];'
            if re.search(pattern, app_code):
                updated_app_code = re.sub(pattern, new_designs_block, app_code, count=1)
                if updated_app_code != app_code:
                    with open(app_path, "w", encoding="utf-8") as f:
                        f.write(updated_app_code)
                    app_updated = True
            else:
                errors_list.append("No se encontró el bloque 'const DESIGNS = [ ... ];' en app.js para actualizar")
        except Exception as e:
            errors_list.append(f"Error al actualizar app.js: {e}")

    # 7. Resumen estructurado
    print("=" * 60)
    print("        RIOLA — Sincronización del Catálogo de Diseños")
    print("=" * 60)
    print(f"📁 Directorio analizado : assets/Diseños_riola/")
    print(f"📦 Diseños totales      : {len(active_designs)}")
    print(f"✨ Diseños nuevos       : {len(new_designs)}")
    print(f"🗑️  Diseños eliminados   : {len(deleted_designs)}")
    print(f"🔄 Diseños modificados  : {modified_count}")
    print(f"⚡ Miniaturas generadas : {generated_count}")
    print(f"⏩ Archivos omitidos    : {skipped_count} (ya optimizados)")
    print(f"⚠️  Errores encontrados  : {len(errors_list)}")
    if errors_list:
        print("\nDetalle de errores:")
        for err in errors_list:
            print(f"  - {err}")
    print("-" * 60)
    
    files_synced = []
    if manifest_updated:
        files_synced.append("assets_manifest.json")
    if app_updated:
        files_synced.append("app.js")
    
    if files_synced:
        print(f"💾 Archivos sincronizados: {', '.join(files_synced)}")
    else:
        print("✔️  Todo está al día. No se requirieron modificaciones en archivos de código.")
    print("=" * 60)

    if errors_list:
        sys.exit(1)
    sys.exit(0)

if __name__ == "__main__":
    sync_catalog()
