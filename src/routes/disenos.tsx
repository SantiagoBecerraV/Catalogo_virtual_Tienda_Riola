import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { designs } from "@/data/designs";
import { SectionTitle } from "@/components/riola/Bolt";
import { DesignCard } from "@/components/riola/DesignCard";

export const Route = createFileRoute("/disenos")({
  head: () => ({
    meta: [
      { title: "Todos los Diseños — RIOLA" },
      { name: "description", content: "Galería completa de diseños gráficos de RIOLA." },
      { property: "og:title", content: "Todos los Diseños — RIOLA" },
      { property: "og:description", content: "Galería completa de diseños gráficos de RIOLA." },
    ],
  }),
  component: DesignsView,
});

const ASPECTS = ["aspect-square", "aspect-[4/3]", "aspect-[3/4]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]"];

function DesignsView() {
  return (
    <main className="view-enter mx-auto max-w-6xl px-5 pb-24 pt-8">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <SectionTitle as="h1">Todos los Diseños</SectionTitle>
      <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
        {designs.map((d, i) => (
          <DesignCard key={d.id} design={d} aspect={ASPECTS[i % ASPECTS.length]} />
        ))}
      </div>
    </main>
  );
}
