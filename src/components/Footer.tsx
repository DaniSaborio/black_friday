import { LINK_GOOGLE_MAPS, NEGOCIO } from "@/data/negocio";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "./icons";

export function Footer() {
  return (
    <footer className="bg-carbon relative overflow-hidden px-4 py-16 md:py-20">
      <p className="marca-agua" aria-hidden="true">
        {NEGOCIO.marcaCorta}
      </p>
      <div className="relative z-10 max-w-4xl mx-auto grid gap-10 md:grid-cols-2 md:items-center text-center md:text-left">
        <div>
          <p className="font-titular text-white text-xl mb-2">
            {NEGOCIO.nombre}
          </p>
          <p className="font-etiqueta text-amarillo text-xs tracking-[0.12em] uppercase mb-6">
            {NEGOCIO.lema}
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href={NEGOCIO.redes.facebook}
              aria-label="Facebook"
              className="w-11 h-11 flex items-center justify-center text-white"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
              href={NEGOCIO.redes.instagram}
              aria-label="Instagram"
              className="w-11 h-11 flex items-center justify-center text-white"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href={NEGOCIO.redes.tiktok}
              aria-label="TikTok"
              className="w-11 h-11 flex items-center justify-center text-white"
            >
              <TiktokIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="md:text-right">
          <p className="font-etiqueta text-white text-xs tracking-[0.12em] uppercase mb-2">
            Dónde estamos
          </p>
          <a
            href={LINK_GOOGLE_MAPS}
            target="_blank"
            rel="noopener"
            className="font-cuerpo text-concreto text-sm underline underline-offset-4 hover:text-white"
          >
            {NEGOCIO.direccion}
          </a>
        </div>
      </div>
    </footer>
  );
}
