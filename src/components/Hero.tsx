import { NEGOCIO } from "@/data/negocio";
import { WhatsappButton } from "./WhatsappButton";

export function Hero() {
  return (
    <section
      id="inicio"
      className="franjas en-rojo relative overflow-hidden px-4 pt-14 pb-16 md:pt-20 md:pb-24 text-center"
    >
      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="font-etiqueta text-amarillo tracking-[0.12em] text-[15px] uppercase mb-4">
          {NEGOCIO.lema}
        </p>
        <h1 className="font-titular text-white uppercase leading-[0.9] mb-6 text-[clamp(2.25rem,9vw,5rem)]">
          {NEGOCIO.claim}
        </h1>
        <p className="font-titular text-white uppercase leading-snug mb-8 text-[clamp(1.125rem,4vw,1.5rem)]">
          Ropa, electrónicos, hogar, coleccionables, videojuegos y más — todo
          con precio de liquidación.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#categorias"
            className="inline-flex items-center justify-center min-h-[44px] border-[3px] border-negro bg-amarillo px-6 py-3 font-etiqueta uppercase tracking-[0.12em] text-negro text-sm shadow-dura transition-transform duration-150 ease-golpe active:translate-x-[3px] active:translate-y-[3px] active:shadow-dura-sm"
          >
            Ver categorías
          </a>
          <WhatsappButton variant="secondary" />
        </div>
      </div>
    </section>
  );
}
