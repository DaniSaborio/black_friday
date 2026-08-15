"use client";

import { useState } from "react";
import { NEGOCIO } from "@/data/negocio";
import { BuscadorProductos } from "./BuscadorProductos";
import { CarritoBoton } from "./CarritoBoton";
import { CloseIcon, MenuIcon } from "./icons";
import { WhatsappIconLink } from "./WhatsappButton";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#categorias", label: "Categorías" },
  { href: "#cajones", label: "Cajones" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#donde-estamos", label: "Dónde estamos" },
];

export function Header() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-negro">
      <div className="h-16 flex items-center justify-between gap-4 px-4 md:px-8">
        <a
          href="#inicio"
          className="font-titular text-white text-sm sm:text-lg md:text-xl uppercase tracking-tight shrink-0"
        >
          {NEGOCIO.nombre}
        </a>

        <nav
          aria-label="Secciones"
          className="hidden md:flex items-center gap-6"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-etiqueta text-white text-[13px] tracking-[0.12em] uppercase hover:text-amarillo"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 shrink-0">
          <CarritoBoton />
          <WhatsappIconLink />
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden flex items-center justify-center w-11 h-11 text-white"
          >
            {abierto ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Buscador: siempre visible y centrado, mobile first — el corazón de
          un e-commerce no se esconde detrás de un menú. */}
      <div className="bg-white border-t-[3px] border-b-[3px] border-negro px-4 py-3">
        <BuscadorProductos className="max-w-xl mx-auto" />
      </div>

      {abierto && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setAbierto(false)}
            className="md:hidden fixed inset-0 z-40 bg-negro/70"
          />
          <div
            id="menu-movil"
            className="md:hidden relative z-50 bg-negro border-b-[3px] border-white/10 px-4 py-2"
          >
            <nav aria-label="Secciones" className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setAbierto(false)}
                  className="min-h-11 flex items-center font-etiqueta text-white text-sm tracking-[0.12em] uppercase border-b border-white/10 last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
