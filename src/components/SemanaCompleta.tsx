"use client";

import { useState } from "react";
import {
  type Categoria,
  ETIQUETA_DIA,
  ORDEN_SEMANA,
  PRECIOS,
} from "@/data/negocio";
import { useHoy } from "@/hooks/useHoy";
import { formatMonto } from "@/lib/precio";

const TAB_BASE =
  "min-h-[44px] px-4 font-etiqueta text-[13px] tracking-[0.12em] uppercase";

export function SemanaCompleta() {
  const diaActual = useHoy();
  const [categoria, setCategoria] = useState<Categoria>("cajones");
  const indiceHoy = diaActual ? ORDEN_SEMANA.indexOf(diaActual) : -1;

  return (
    <section id="semana" className="bg-white px-4 py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <span className="inline-block bg-negro text-white font-etiqueta text-[13px] tracking-[0.12em] uppercase px-[10px] py-[3px]">
          La semana completa
        </span>
        <div className="flex items-end justify-between flex-wrap gap-4 mt-6 mb-4">
          <h2 className="font-display text-negro uppercase leading-none text-[clamp(1.75rem,6vw,3rem)]">
            Toda la semana,
            <br />
            un solo lugar
          </h2>
          <fieldset className="inline-flex border-[3px] border-negro shrink-0 m-0 p-0">
            <legend className="sr-only">Elegí categoría</legend>
            <button
              type="button"
              aria-pressed={categoria === "cajones"}
              onClick={() => setCategoria("cajones")}
              className={`${TAB_BASE} ${categoria === "cajones" ? "bg-negro text-white" : "bg-white text-negro"}`}
            >
              Cajones
            </button>
            <button
              type="button"
              aria-pressed={categoria === "ropa"}
              onClick={() => setCategoria("ropa")}
              className={`${TAB_BASE} border-l-[3px] border-negro ${categoria === "ropa" ? "bg-negro text-white" : "bg-white text-negro"}`}
            >
              Ropa
            </button>
          </fieldset>
        </div>
        <p className="font-cuerpo text-base mb-8">
          Precio válido solo en tienda física para cajones y ropa, sujeto a
          disponibilidad del día.
        </p>

        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-7 md:overflow-visible">
          {ORDEN_SEMANA.map((dia, indice) => {
            const esHoy = indice === indiceHoy;
            const estado =
              indiceHoy === -1
                ? undefined
                : esHoy
                  ? "hoy"
                  : indice < indiceHoy
                    ? "pasado"
                    : "futuro";
            return (
              <article
                key={dia}
                data-estado={estado}
                className="insignia relative shrink-0 w-[140px] snap-center md:w-auto"
              >
                {esHoy && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amarillo text-negro font-etiqueta text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 border-2 border-negro">
                    HOY
                  </span>
                )}
                <p className="font-etiqueta text-amarillo tracking-[0.12em] text-[13px] uppercase">
                  {ETIQUETA_DIA[dia]}
                </p>
                <p className="font-display text-white leading-none text-[clamp(1.5rem,7vw,2.5rem)]">
                  <span className="text-amarillo">₡</span>
                  {formatMonto(PRECIOS[dia][categoria])}
                </p>
                <p className="font-etiqueta text-amarillo tracking-[0.12em] text-[13px] uppercase">
                  {categoria === "cajones" ? "Cajones" : "Ropa"}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
