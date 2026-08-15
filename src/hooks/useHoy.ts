"use client";

import { useEffect, useState } from "react";
import type { DiaSemana } from "@/data/negocio";
import { obtenerDiaActual } from "@/lib/precio";

const INTERVALO_MS = 30_000;

// Empieza en null (coincide con el render del servidor) y se llena en el
// cliente: la skill pide calcular el día en America/Costa_Rica en el
// navegador, nunca desde el reloj del servidor ni un "hoy" fijo.
//
// El "tick" es aparte del día a propósito: React no vuelve a renderizar si
// setState recibe el mismo string (el día casi siempre es igual entre
// llamadas), y sin ese re-render el contador de horas/minutos se congela
// hasta la medianoche. El tick, al ser siempre distinto, fuerza el refresco.
export function useHoy(): DiaSemana | null {
  const [dia, setDia] = useState<DiaSemana | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const actualizar = () => {
      setDia(obtenerDiaActual());
      setTick((t) => t + 1);
    };
    actualizar();
    const id = setInterval(actualizar, INTERVALO_MS);
    return () => clearInterval(id);
  }, []);

  return dia;
}
