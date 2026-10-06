import { createFileRoute, Link } from "@tanstack/react-router";
import heroShirt from "@/assets/hero-shirt.png";
import { designs } from "@/data/designs";
import { Bolt, SectionTitle } from "@/components/riola/Bolt";
import { DesignCard } from "@/components/riola/DesignCard";
import { SilhouetteCarousel } from "@/components/riola/SilhouetteCarousel";
import { MeasurementSection } from "@/components/riola/MeasurementSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RIOLA — Catálogo de diseños y siluetas" },
      { name: "description", content: "Explora los diseños, siluetas, colores y tabla de medidas de RIOLA." },
      { property: "og:title", content: "RIOLA — Catálogo de diseños y siluetas" },
      { property: "og:description", content: "Explora los diseños, siluetas, colores y tabla de medidas de RIOLA." },
    ],
  }),
  component: HomeView,
});

function HomeView() {
  return (
    <main className="view-enter mx-auto max-w-6xl space-y-28 px-5 pb-28 pt-10 md:space-y-36">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          Personaliza
          <br />
          <span className="inline-flex items-center gap-2 text-primary">
            tu diseño <Bolt className="h-12 w-12 lg:h-16 lg:w-16" />
          </span>
        </h1>
        <div className="relative">
          <svg viewBox="0 0 400 300" aria-hidden="true" className="absolute inset-0 h-full w-full fill-primary">
            <path d="M60 20 L110 120 L80 125 L140 240 L95 140 L125 135 Z" />
            <path d="M330 30 L300 130 L330 128 L270 270 L320 150 L290 152 Z" />
            <path d="M20 200 L90 190 L70 215 L150 205 Z" opacity=".7" />
            <path d="M380 220 L310 200 L330 230 L250 215 Z" opacity=".7" />
          </svg>
          <img src={heroShirt} alt="Camiseta negra RIOLA" width={1200} height={912} className="relative mx-auto w-full max-w-md drop-shadow-2xl" />
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <SectionTitle>DISEÑOS</SectionTitle>
          <Link to="/disenos" className="shrink-0 text-xs font-semibold text-muted-foreground hover:text-foreground">
            <span className="text-primary">+</span> Ver todos los diseños
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {designs.slice(0, 10).map((d) => (
            <DesignCard key={d.id} design={d} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>SILUETAS</SectionTitle>
        <SilhouetteCarousel />
      </section>

      <MeasurementSection />
    </main>
  );
}
