import { type DiaSemana, ETIQUETA_DIA, NEGOCIO, PRECIOS } from "@/data/negocio";

// Fuerza el separador de miles a "." sin importar qué separador
// devuelva el motor Intl del navegador, para garantizar siempre ₡1.500.
export function formatMonto(monto: number): string {
  const partes = new Intl.NumberFormat("es-CR").formatToParts(monto);
  return partes.map((p) => (p.type === "group" ? "." : p.value)).join("");
}

export function formatColones(monto: number): string {
  return `₡${formatMonto(monto)}`;
}

export function obtenerDiaActual(): DiaSemana {
  return new Intl.DateTimeFormat("es-CR", {
    weekday: "long",
    timeZone: "America/Costa_Rica",
  }).format(new Date()) as DiaSemana;
}

export function msHastaMedianocheCR(): number {
  const partes = new Intl.DateTimeFormat("es-CR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Costa_Rica",
  }).formatToParts(new Date());
  const obtener = (tipo: string) =>
    Number(partes.find((p) => p.type === tipo)?.value ?? 0);
  const h = obtener("hour") % 24;
  const m = obtener("minute");
  const s = obtener("second");
  return ((23 - h) * 3600 + (59 - m) * 60 + (60 - s)) * 1000;
}

export function formatDuracion(ms: number): string {
  const totalMin = Math.max(0, Math.ceil(ms / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h}h ${m}m`;
}

export function mensajeWhatsapp(diaActual: DiaSemana | null): string {
  if (!diaActual) return `Hola, quiero saber más sobre ${NEGOCIO.nombre}.`;
  const precio = formatColones(PRECIOS[diaActual].cajones);
  return `Hola, quiero saber más sobre ${NEGOCIO.nombre}. Vi que hoy (${ETIQUETA_DIA[diaActual].toLowerCase()}) el precio está en ${precio} en cajones.`;
}

export function linkWhatsapp(diaActual: DiaSemana | null): string {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensajeWhatsapp(diaActual))}`;
}
