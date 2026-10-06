export type GarmentShape = "normal" | "oversize" | "hoodie" | "longsleeve" | "tank";

export interface ColorVariant {
  id: string;
  name: string;
  /** CSS color for the fabric */
  fabric: string;
  /** CSS color for the RIOLA print */
  print: string;
}

export interface Silhouette {
  id: string;
  name: string;
  title: string;
  description: string;
  shape: GarmentShape;
  variants: ColorVariant[];
}

const negra: ColorVariant = { id: "negra", name: "Negra", fabric: "oklch(0.17 0 0)", print: "oklch(0.89 0.18 98)" };
const blanca: ColorVariant = { id: "blanca", name: "Blanca", fabric: "oklch(0.98 0 0)", print: "oklch(0.17 0 0)" };
const amarilla: ColorVariant = { id: "amarilla", name: "Amarilla", fabric: "oklch(0.89 0.18 98)", print: "oklch(0.17 0 0)" };
const roja: ColorVariant = { id: "roja", name: "Roja", fabric: "oklch(0.6 0.23 25)", print: "oklch(0.98 0 0)" };
const gris: ColorVariant = { id: "gris", name: "Gris", fabric: "oklch(0.55 0 0)", print: "oklch(0.89 0.18 98)" };

export const silhouettes: Silhouette[] = [
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

export const getSilhouette = (id: string) => silhouettes.find((s) => s.id === id);
