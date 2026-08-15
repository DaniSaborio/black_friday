"use client";

import type { ReactNode } from "react";
import { type DiaSemana, ORDEN_SEMANA, PRECIOS } from "@/data/negocio";
import { useHoy } from "@/hooks/useHoy";
import {
  formatColones,
  formatDuracion,
  formatMonto,
  msHastaMedianocheCR,
} from "@/lib/precio";

function LineaManana({
  diaActual,
}: {
  diaActual: DiaSemana | null;
}): ReactNode {
  if (!diaActual) return "Cargando…";

  if (diaActual === "jueves") {
    return (
      <>
        Hoy es el precio más bajo de la semana. El viernes vuelve a{" "}
        <span className="font-display">
          {formatColones(PRECIOS.viernes.cajones)}
        </span>
        .
      </>
    );
  }

  const indiceHoy = ORDEN_SEMANA.indexOf(diaActual);
  const diaSiguiente = ORDEN_SEMANA[(indiceHoy + 1) % ORDEN_SEMANA.length];
  return (
    <>
      Mañana baja a{" "}
      <span className="font-display">
        {formatColones(PRECIOS[diaSiguiente].cajones)}
      </span>{" "}
      · faltan{" "}
      <span className="font-display">
        {formatDuracion(msHastaMedianocheCR())}
      </span>
    </>
  );
}

export function CajonesPrecioDelDia() {
  const diaActual = useHoy();

  return (
    <section
      id="cajones"
      className="en-rojo bg-rojo relative overflow-hidden px-4 py-16 md:py-20 text-center"
    >
      <div className="relative z-10 max-w-3xl mx-auto">
        <span className="inline-block bg-negro text-white font-etiqueta text-[13px] tracking-[0.12em] uppercase px-[10px] py-[3px] mb-6">
          Cajones · solo en tienda
        </span>
        <p className="font-etiqueta text-amarillo tracking-[0.12em] text-[15px] uppercase mb-4">
          {diaActual ? `HOY ES ${diaActual.toUpperCase()}` : "Cargando…"}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-10 mb-6">
          <div>
            <p className="font-display text-white leading-[0.85] text-[clamp(2.5rem,11vw,4.5rem)]">
              <span className="text-amarillo">₡</span>
              {diaActual ? formatMonto(PRECIOS[diaActual].cajones) : "0"}
            </p>
            <p className="font-etiqueta text-amarillo tracking-[0.12em] text-sm uppercase">
              Cajones
            </p>
          </div>
          <div>
            <p className="font-display text-white leading-[0.85] text-[clamp(2.5rem,11vw,4.5rem)]">
              <span className="text-amarillo">₡</span>
              {diaActual ? formatMonto(PRECIOS[diaActual].ropa) : "0"}
            </p>
            <p className="font-etiqueta text-amarillo tracking-[0.12em] text-sm uppercase">
              Ropa
            </p>
          </div>
        </div>

        <p
          className="font-cuerpo font-semibold text-white text-base md:text-lg"
          aria-live="polite"
        >
          <LineaManana diaActual={diaActual} />
        </p>
      </div>
    </section>
  );
}
