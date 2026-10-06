export type MeasurementTab =
  | "Silueta Normal"
  | "Oversize unicolor"
  | "Oversize acid wash"
  | "Manga sisa acid wash"
  | "Buzos";

export interface MeasurementRow {
  size: string;
  width: string;
  length: string;
  sleeve: string;
}

export const measurementTabs: MeasurementTab[] = [
  "Silueta Normal",
  "Oversize unicolor",
  "Oversize acid wash",
  "Manga sisa acid wash",
  "Buzos",
];

const build = (sizes: string[], w: number, l: number, s: number, step: [number, number, number] = [4, 2, 1]): MeasurementRow[] =>
  sizes.map((size, i) => ({
    size,
    width: `${w + i * step[0]} cm`,
    length: `${l + i * step[1]} cm`,
    sleeve: `${s + i * step[2]} cm`,
  }));

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const measurements: Record<MeasurementTab, MeasurementRow[]> = {
  "Silueta Normal": build(SIZES, 46, 68, 20),
  "Oversize unicolor": build(SIZES, 54, 70, 24),
  "Oversize acid wash": build(SIZES, 55, 71, 25),
  "Manga sisa acid wash": build(SIZES, 50, 69, 0, [4, 2, 0]).map((r) => ({ ...r, sleeve: "—" })),
  Buzos: build(SIZES, 56, 66, 60, [4, 2, 1]),
};
