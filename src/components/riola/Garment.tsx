import type { GarmentShape } from "@/data/silhouettes";

const PATHS: Record<GarmentShape, string> = {
  normal: "M70 30 L50 36 L22 60 L36 84 L52 74 L52 172 L148 172 L148 74 L164 84 L178 60 L150 36 L130 30 Q100 46 70 30 Z",
  oversize: "M66 30 L40 38 L10 78 L30 98 L46 86 L44 176 L156 176 L154 86 L170 98 L190 78 L160 38 L134 30 Q100 46 66 30 Z",
  hoodie: "M74 34 Q72 10 100 8 Q128 10 126 34 L152 42 L172 96 L184 160 L164 164 L150 104 L150 176 L50 176 L50 104 L36 164 L16 160 L28 96 L48 42 Z",
  longsleeve: "M70 30 L50 36 L30 70 L16 170 L34 172 L52 92 L52 172 L148 172 L148 92 L166 172 L184 170 L170 70 L150 36 L130 30 Q100 46 70 30 Z",
  tank: "M72 24 L62 26 Q64 62 50 74 L52 176 L148 176 L150 74 Q136 62 138 26 L128 24 Q122 54 100 54 Q78 54 72 24 Z",
};

export function Garment({
  shape,
  fabric,
  print,
  className = "",
  label,
}: {
  shape: GarmentShape;
  fabric: string;
  print: string;
  className?: string;
  label: string;
}) {
  return (
    <svg viewBox="0 0 200 190" role="img" aria-label={label} className={className}>
      <path d={PATHS[shape]} style={{ fill: fabric }} className="stroke-garment-line/40" strokeWidth={1.5} strokeLinejoin="round" />
      {shape === "hoodie" && (
        <path d="M70 140 L130 140 L136 166 L64 166 Z" fill="none" className="stroke-garment-line/30" strokeWidth={1.2} />
      )}
      <text
        x="100"
        y={shape === "hoodie" ? 92 : 82}
        textAnchor="middle"
        style={{ fill: print, fontFamily: "Permanent Marker, cursive" }}
        fontSize="17"
        transform={`rotate(-6 100 ${shape === "hoodie" ? 92 : 82})`}
      >
        RIOLA
      </text>
    </svg>
  );
}
