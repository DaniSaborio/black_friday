"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type BusquedaContextValue = {
  termino: string;
  setTermino: (termino: string) => void;
};

const BusquedaContext = createContext<BusquedaContextValue | null>(null);

export function BusquedaProvider({ children }: { children: ReactNode }) {
  const [termino, setTermino] = useState("");
  return (
    <BusquedaContext.Provider value={{ termino, setTermino }}>
      {children}
    </BusquedaContext.Provider>
  );
}

export function useBusqueda(): BusquedaContextValue {
  const ctx = useContext(BusquedaContext);
  if (!ctx) {
    throw new Error("useBusqueda debe usarse dentro de <BusquedaProvider>");
  }
  return ctx;
}
