import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getSilhouette, silhouettes } from "@/data/silhouettes";
import { SectionTitle } from "@/components/riola/Bolt";
import { Garment } from "@/components/riola/Garment";

export const Route = createFileRoute("/siluetas/$id")({
  loader: ({ params }) => {
    const silhouette = getSilhouette(params.id);
    if (!silhouette) throw notFound();
    return { silhouette };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "No encontrado — RIOLA" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.silhouette;
    return {
      meta: [
        { title: `${s.title} — RIOLA` },
        { name: "description", content: s.description },
        { property: "og:title", content: `${s.title} — RIOLA` },
        { property: "og:description", content: s.description },
      ],
    };
  },
  component: GarmentDetailView,
});

function GarmentDetailView() {
  const { silhouette } = Route.useLoaderData();
  return (
    <main key={silhouette.id} className="view-enter mx-auto max-w-5xl px-5 pb-24 pt-8">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <SectionTitle as="h1">{silhouette.title}</SectionTitle>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">{silhouette.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {silhouettes.map((s) => (
          <Link
            key={s.id}
            to="/siluetas/$id"
            params={{ id: s.id }}
            className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary data-[status=active]:border-primary data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
          >
            {s.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {silhouette.variants.map((v) => (
          <figure key={v.id} className="group flex flex-col items-center gap-3">
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded-md border border-border bg-surface p-6 transition-all group-hover:border-primary">
              <Garment
                shape={silhouette.shape}
                fabric={v.fabric}
                print={v.print}
                label={`${silhouette.title} ${v.name}`}
                className="h-full w-auto drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="text-sm font-semibold">{v.name}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
