"use client";

import { useMemo, useState } from "react";
import { useBusqueda } from "@/context/BusquedaContext";
import { CATEGORIAS, type NombreCategoria, PRODUCTOS } from "@/data/negocio";
import { formatColones } from "@/lib/precio";
import { BotonAgregarCarrito } from "./BotonAgregarCarrito";

const TODAS = "Todas" as const;
type Filtro = NombreCategoria | typeof TODAS;

const TAB_BASE =
  "shrink-0 min-h-11 px-4 border-[3px] border-negro font-etiqueta text-[13px] tracking-[0.12em] uppercase";

export function Vitrina() {
  const { termino } = useBusqueda();
  const [categoriaActiva, setCategoriaActiva] = useState<Filtro>(TODAS);

  const productos = useMemo(() => {
    const t = termino.trim().toLowerCase();
    return PRODUCTOS.filter((p) => {
      const coincideCategoria =
        categoriaActiva === TODAS || p.categoria === categoriaActiva;
      const coincideTermino =
        !t ||
        p.nombre.toLowerCase().includes(t) ||
        p.categoria.toLowerCase().includes(t);
      return coincideCategoria && coincideTermino;
    });
  }, [termino, categoriaActiva]);

  return (
    <section id="categorias" className="bg-white px-4 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <span className="inline-block bg-negro text-white font-etiqueta text-[13px] tracking-[0.12em] uppercase px-[10px] py-[3px]">
          La vitrina
        </span>
        <h2 className="font-display text-negro uppercase leading-none mt-6 mb-6 text-[clamp(1.75rem,6vw,3rem)]">
          Lo que vas a encontrar
        </h2>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-8 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          <button
            type="button"
            onClick={() => setCategoriaActiva(TODAS)}
            aria-pressed={categoriaActiva === TODAS}
            className={`${TAB_BASE} ${categoriaActiva === TODAS ? "bg-negro text-white" : "bg-white text-negro"}`}
          >
            Todas
          </button>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.nombre}
              type="button"
              onClick={() => setCategoriaActiva(cat.nombre)}
              aria-pressed={categoriaActiva === cat.nombre}
              className={`${TAB_BASE} ${categoriaActiva === cat.nombre ? "bg-negro text-white" : "bg-white text-negro"}`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {productos.length === 0 ? (
          <p className="font-cuerpo text-concreto">
            No encontramos productos con ese nombre.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productos.map((producto) => (
              <article
                key={producto.id}
                className="flex flex-col border-[3px] border-negro bg-white shadow-dura"
              >
                <div
                  aria-hidden="true"
                  className="franjas aspect-square flex items-center justify-center border-b-[3px] border-negro"
                >
                  <span className="font-display text-white/80 text-4xl">
                    {producto.nombre.charAt(0)}
                  </span>
                </div>
                <div className="p-3 flex flex-col gap-1 flex-1">
                  <p className="font-etiqueta text-rojo-profundo text-[10px] tracking-[0.12em] uppercase">
                    {producto.categoria}
                  </p>
                  <p className="font-titular text-negro text-xs uppercase leading-tight break-words">
                    {producto.nombre}
                  </p>
                  <p className="font-display text-negro text-lg mt-1">
                    {formatColones(producto.precio)}
                  </p>
                </div>
                <BotonAgregarCarrito productoId={producto.id} />
              </article>
            ))}
          </div>
        )}

        <p className="font-cuerpo text-concreto text-sm mt-6">
          Productos de ejemplo para mostrar el diseño — la mercadería real
          cambia cada semana.
        </p>
      </div>
    </section>
  );
}
