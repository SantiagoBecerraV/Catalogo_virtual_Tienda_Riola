import { useState } from "react";
import { measurementTabs, measurements, type MeasurementTab } from "@/data/measurements";
import { SectionTitle } from "./Bolt";

function Diagram() {
  return (
    <svg viewBox="0 0 220 190" className="w-full max-w-[240px]" role="img" aria-label="Diagrama de medidas: A ancho, B largo, C manga">
      <path
        d="M80 30 L58 36 L26 62 L42 88 L60 78 L60 172 L160 172 L160 78 L178 88 L194 62 L162 36 L140 30 Q110 46 80 30 Z"
        className="fill-background stroke-foreground"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <g className="stroke-primary fill-primary" strokeWidth={2}>
        <line x1="62" y1="96" x2="158" y2="96" />
        <line x1="40" y1="40" x2="40" y2="172" transform="translate(-12 0)" />
        <line x1="166" y1="40" x2="190" y2="60" />
      </g>
      <g className="fill-foreground" fontSize="12" fontWeight={700}>
        <text x="106" y="90">A</text>
        <text x="16" y="110">B</text>
        <text x="184" y="44">C</text>
      </g>
    </svg>
  );
}

export function MeasurementSection() {
  const [selectedMeasurementTab, setSelectedMeasurementTab] = useState<MeasurementTab>("Silueta Normal");
  const rows = measurements[selectedMeasurementTab];

  return (
    <section aria-labelledby="medidas">
      <div id="medidas">
        <SectionTitle>Tabla de Medidas</SectionTitle>
      </div>
      <div role="tablist" className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {measurementTabs.map((tab) => {
          const active = tab === selectedMeasurementTab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedMeasurementTab(tab)}
              className={`shrink-0 rounded-sm border px-4 py-2 text-xs font-semibold transition-colors sm:flex-1 ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid items-center gap-8 md:grid-cols-[240px_1fr]">
        <div className="flex flex-col items-center gap-2 rounded-md border border-border bg-surface p-4">
          <Diagram />
          <p className="text-xs text-muted-foreground">Las medidas pueden variar ±1 cm.</p>
        </div>
        <div key={selectedMeasurementTab} className="view-enter overflow-x-auto rounded-md border border-border">
          <table className="w-full text-center text-sm">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                {["Talla", "A (Ancho)", "B (Largo)", "C (Manga)"].map((h) => (
                  <th key={h} className="px-3 py-2 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.size} className="border-t border-border">
                  <td className="px-3 py-2 font-bold">{r.size}</td>
                  <td className="px-3 py-2 text-muted-foreground">{r.width}</td>
                  <td className="px-3 py-2 text-muted-foreground">{r.length}</td>
                  <td className="px-3 py-2 text-muted-foreground">{r.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
