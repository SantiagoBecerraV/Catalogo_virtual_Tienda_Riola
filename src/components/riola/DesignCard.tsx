import type { Design } from "@/data/designs";

export function DesignCard({ design, aspect = "aspect-[4/3]" }: { design: Design; aspect?: string }) {
  return (
    <figure className="group overflow-hidden rounded-md border border-border bg-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
      <img
        src={design.image}
        alt={design.name}
        loading="lazy"
        width={816}
        height={816}
        className={`${aspect} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
      />
      <figcaption className="sr-only">{design.name}</figcaption>
    </figure>
  );
}
