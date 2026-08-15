const PASOS = [
  "Llega mercadería nueva cada semana. Cajones importados y ropa de liquidación, distintos cada vez.",
  "El precio arranca alto el viernes y baja todos los días, hasta el jueves.",
  "El jueves es el precio más bajo de la semana — pero ya casi no queda nada. Lo que sobrevive hasta el jueves es lo que nadie más quiso llevarse.",
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-negro px-4 py-16 md:py-20">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block bg-white text-negro font-etiqueta text-[13px] tracking-[0.12em] uppercase px-[10px] py-[3px]">
          Cómo funciona
        </span>
        <h2 className="font-titular text-white uppercase leading-[0.9] mt-6 mb-10 text-[clamp(2.25rem,9vw,5rem)]">
          Así bajan los cajones
        </h2>
        <ol className="space-y-8">
          {PASOS.map((paso, i) => (
            <li key={paso} className="flex gap-5">
              <span className="font-display text-amarillo text-4xl leading-none shrink-0">
                {i + 1}
              </span>
              <p className="font-cuerpo text-white text-base md:text-lg pt-1">
                {paso}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
