import type { ItemCarrito } from "@/context/CarritoContext";
import { NEGOCIO, PRODUCTOS } from "@/data/negocio";
import { formatColones } from "./precio";

export function buscarProducto(productoId: string) {
  return PRODUCTOS.find((p) => p.id === productoId) ?? null;
}

export function calcularTotal(items: ItemCarrito[]): number {
  return items.reduce((total, item) => {
    const producto = buscarProducto(item.productoId);
    return producto ? total + producto.precio * item.cantidad : total;
  }, 0);
}

export function calcularCantidadTotal(items: ItemCarrito[]): number {
  return items.reduce((total, item) => total + item.cantidad, 0);
}

export function mensajeWhatsappCarrito(items: ItemCarrito[]): string {
  if (items.length === 0) {
    return `Hola, quiero saber más sobre ${NEGOCIO.nombre}.`;
  }
  const lineas = items.map((item) => {
    const producto = buscarProducto(item.productoId);
    if (!producto) return null;
    return `• ${item.cantidad}x ${producto.nombre} — ${formatColones(producto.precio * item.cantidad)}`;
  });
  const total = calcularTotal(items);
  return [
    `Hola, quiero apartar estos productos de ${NEGOCIO.nombre}:`,
    ...lineas.filter((l): l is string => l !== null),
    `Total estimado: ${formatColones(total)}`,
    "¿Me confirman disponibilidad?",
  ].join("\n");
}

export function linkWhatsappCarrito(items: ItemCarrito[]): string {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensajeWhatsappCarrito(items))}`;
}
