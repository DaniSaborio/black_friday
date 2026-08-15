import {
  LINK_GOOGLE_MAPS,
  LINK_MAPA_EMBED,
  LINK_WAZE,
  NEGOCIO,
} from "@/data/negocio";

const BTN_BASE =
  "inline-flex items-center justify-center min-h-[44px] border-[3px] border-negro px-5 py-3 font-etiqueta uppercase tracking-[0.12em] text-negro text-sm shadow-dura transition-transform duration-150 ease-golpe active:translate-x-[3px] active:translate-y-[3px] active:shadow-dura-sm";

export function DondeEstamos() {
  return (
    <section id="donde-estamos" className="bg-white px-4 py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        <span className="inline-block bg-negro text-white font-etiqueta text-[13px] tracking-[0.12em] uppercase px-[10px] py-[3px]">
          Dónde estamos
        </span>
        <div className="grid md:grid-cols-2 gap-10 mt-6 items-start">
          <div>
            <h2 className="font-display text-negro uppercase leading-none mb-5 text-[clamp(1.75rem,6vw,3rem)]">
              Vení a ver
            </h2>
            <p className="font-cuerpo text-base mb-2">
              <strong>Dirección:</strong> {NEGOCIO.direccion}.
            </p>
            <p className="font-cuerpo text-base mb-6">
              <strong>Horario:</strong> {NEGOCIO.horario}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={LINK_WAZE}
                target="_blank"
                rel="noopener"
                className={`${BTN_BASE} bg-white`}
              >
                Abrir en Waze
              </a>
              <a
                href={LINK_GOOGLE_MAPS}
                target="_blank"
                rel="noopener"
                className={`${BTN_BASE} bg-amarillo`}
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
          <div className="w-full aspect-[4/3] border-[3px] border-negro">
            <iframe
              src={LINK_MAPA_EMBED}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa: Catedral de Ciudad Quesada, San Carlos"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
