"use client";

import { useBusqueda } from "@/context/BusquedaContext";
import { SearchIcon } from "./icons";

export function BuscadorProductos({ className = "" }: { className?: string }) {
  const { termino, setTermino } = useBusqueda();

  return (
    <label className={`relative flex items-center ${className}`}>
      <span className="sr-only">Buscar productos</span>
      <SearchIcon className="pointer-events-none absolute left-3 w-4 h-4 text-negro/50" />
      <input
        type="search"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder="Buscar productos…"
        className="w-full min-h-11 border-[3px] border-negro bg-white pl-9 pr-3 font-cuerpo text-sm text-negro placeholder-negro/50 focus-visible:border-amarillo"
      />
    </label>
  );
}
