"use client";

import { useCarrito } from "@/context/CarritoContext";
import { calcularCantidadTotal } from "@/lib/carrito";
import { CartIcon } from "./icons";

export function CarritoBoton() {
  const { items, setAbierto } = useCarrito();
  const cantidad = calcularCantidadTotal(items);

  return (
    <button
      type="button"
      onClick={() => setAbierto(true)}
      aria-label={`Ver carrito${cantidad > 0 ? `, ${cantidad} producto${cantidad === 1 ? "" : "s"}` : ""}`}
      className="relative flex items-center justify-center w-11 h-11 text-white shrink-0"
    >
      <CartIcon className="w-6 h-6" />
      {cantidad > 0 && (
        <span
          aria-hidden="true"
          className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-amarillo text-negro font-etiqueta text-[10px] leading-none border-2 border-negro"
        >
          {cantidad}
        </span>
      )}
    </button>
  );
}
