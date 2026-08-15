// Solo texto, nunca los logos: Amazon, eBay, Target, Wish, SHEIN y Best Buy
// son marcas registradas — usar sus isotipos en el sitio puede leerse como
// afiliación oficial, que este negocio no tiene.
const TIENDAS = ["Amazon", "eBay", "Target", "Wish", "SHEIN", "Best Buy"];

export function DeDondeViene() {
  return (
    <section className="en-rojo bg-rojo px-4 py-16 md:py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <span className="inline-block bg-negro text-white font-etiqueta text-[13px] tracking-[0.12em] uppercase px-[10px] py-[3px]">
          De dónde viene
        </span>
        <p className="font-titular text-white uppercase leading-tight mt-6 text-[clamp(1.5rem,6vw,2.75rem)]">
          Mercadería de liquidación de las principales tiendas de Estados Unidos
        </p>
        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2 mt-6">
          {TIENDAS.map((tienda) => (
            <li
              key={tienda}
              className="font-etiqueta text-white text-xs tracking-[0.12em] uppercase border-2 border-white/40 px-3 py-1"
            >
              {tienda}
            </li>
          ))}
        </ul>
        <p className="font-etiqueta text-amarillo tracking-[0.12em] uppercase text-sm mt-6">
          Lo mejor, antes de que se acabe
        </p>
      </div>
    </section>
  );
}
