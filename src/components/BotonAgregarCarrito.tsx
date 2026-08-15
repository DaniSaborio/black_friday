"use client";

import { useEffect, useState } from "react";
import { useCarrito } from "@/context/CarritoContext";

export function BotonAgregarCarrito({ productoId }: { productoId: string }) {
  const { agregar } = useCarrito();
  const [confirmado, setConfirmado] = useState(false);

  useEffect(() => {
    if (!confirmado) return;
    const id = setTimeout(() => setConfirmado(false), 900);
    return () => clearTimeout(id);
  }, [confirmado]);

  return (
    <button
      type="button"
      onClick={() => {
        agregar(productoId);
        setConfirmado(true);
      }}
      className={`min-h-11 w-full font-etiqueta text-[11px] tracking-[0.12em] uppercase transition-colors duration-150 ${
        confirmado
          ? "bg-amarillo text-negro"
          : "bg-negro text-white hover:bg-carbon"
      }`}
    >
      {confirmado ? "✓ Agregado" : "Agregar"}
    </button>
  );
}
