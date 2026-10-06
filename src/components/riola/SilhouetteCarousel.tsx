import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { silhouettes } from "@/data/silhouettes";
import { Garment } from "./Garment";

export function SilhouetteCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 220, behavior: "smooth" });
  return (
    <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
      <button onClick={() => scroll(-1)} aria-label="Anterior" className="rounded-full p-2 hover:bg-muted">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div ref={ref} className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none]">
        {silhouettes.map((s) => (
          <Link
            key={s.id}
            to="/siluetas/$id"
            params={{ id: s.id }}
            className="group flex w-36 shrink-0 snap-start flex-col items-center gap-2 sm:w-40"
          >
            <span className="flex aspect-square w-full items-center justify-center rounded-md border-2 border-border bg-surface p-3 transition-all group-hover:-translate-y-1 group-hover:border-primary">
              <Garment shape={s.shape} fabric={s.variants[0]!.fabric} print={s.variants[0]!.print} label={s.name} className="h-full w-full" />
            </span>
            <span className="text-xs font-semibold">{s.name}</span>
          </Link>
        ))}
      </div>
      <button onClick={() => scroll(1)} aria-label="Siguiente" className="rounded-full p-2 hover:bg-muted">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
