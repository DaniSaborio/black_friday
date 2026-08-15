"use client";

import { useCarrito } from "@/context/CarritoContext";
import {
  buscarProducto,
  calcularTotal,
  linkWhatsappCarrito,
} from "@/lib/carrito";
import { formatColones } from "@/lib/precio";
import { CloseIcon, MinusIcon, PlusIcon } from "./icons";

export function CarritoPanel() {
  const { items, cambiarCantidad, quitar, abierto, setAbierto } = useCarrito();

  if (!abierto) return null;

  const total = calcularTotal(items);

  return (
    <>
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={() => setAbierto(false)}
        className="fixed inset-0 z-[60] bg-negro/70"
      />
      <aside
        aria-label="Carrito de compras"
        className="fixed inset-y-0 right-0 z-[70] w-full sm:w-[420px] bg-white border-l-[3px] border-negro flex flex-col"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b-[3px] border-negro bg-negro shrink-0">
          <p className="font-titular text-white uppercase text-lg">Tu pedido</p>
          <button
            type="button"
            onClick={() => setAbierto(false)}
            aria-label="Cerrar carrito"
            className="flex items-center justify-center w-11 h-11 text-white"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <p className="font-cuerpo text-concreto">
              Tu carrito está vacío. Agregá productos desde la vitrina.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => {
                const producto = buscarProducto(item.productoId);
                if (!producto) return null;
                return (
                  <li
                    key={item.productoId}
                    className="flex gap-3 border-[3px] border-negro p-3"
                  >
                    <div className="franjas w-16 h-16 shrink-0 flex items-center justify-center border-[3px] border-negro">
                      <span className="font-display text-white/80 text-xl">
                        {producto.nombre.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-titular text-negro text-xs uppercase leading-tight break-words">
                        {producto.nombre}
                      </p>
                      <p className="font-cuerpo text-concreto text-xs mt-0.5">
                        {formatColones(producto.precio)} c/u
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() =>
                            cambiarCantidad(item.productoId, item.cantidad - 1)
                          }
                          aria-label="Quitar una unidad"
                          className="flex items-center justify-center w-8 h-8 border-[2px] border-negro"
                        >
                          <MinusIcon className="w-3 h-3" />
                        </button>
                        <span className="font-etiqueta text-sm w-6 text-center">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            cambiarCantidad(item.productoId, item.cantidad + 1)
                          }
                          aria-label="Agregar una unidad"
                          className="flex items-center justify-center w-8 h-8 border-[2px] border-negro"
                        >
                          <PlusIcon className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => quitar(item.productoId)}
                          className="ml-auto font-etiqueta text-[11px] tracking-[0.12em] uppercase text-rojo-profundo underline"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                    <p className="font-display text-negro text-base shrink-0">
                      {formatColones(producto.precio * item.cantidad)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t-[3px] border-negro px-4 py-4 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <p className="font-etiqueta text-[13px] tracking-[0.12em] uppercase">
                Total estimado
              </p>
              <p className="font-display text-negro text-2xl">
                {formatColones(total)}
              </p>
            </div>
            <p className="font-cuerpo text-concreto text-xs mb-4">
              Este pedido se confirma por WhatsApp — sujeto a disponibilidad en
              tienda, la mercadería cambia cada semana.
            </p>
            <a
              href={linkWhatsappCarrito(items)}
              target="_blank"
              rel="noopener"
              className="min-h-11 w-full flex items-center justify-center border-[3px] border-negro bg-amarillo px-6 py-3 font-etiqueta uppercase tracking-[0.12em] text-negro text-sm shadow-dura transition-transform duration-150 ease-golpe active:translate-x-[3px] active:translate-y-[3px] active:shadow-dura-sm"
            >
              Finalizar por WhatsApp
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
