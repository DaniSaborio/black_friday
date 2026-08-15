export type DiaSemana =
  | "viernes"
  | "sábado"
  | "domingo"
  | "lunes"
  | "martes"
  | "miércoles"
  | "jueves";

export type Categoria = "cajones" | "ropa";

export const ORDEN_SEMANA: DiaSemana[] = [
  "viernes",
  "sábado",
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
];

export const ETIQUETA_DIA: Record<DiaSemana, string> = {
  viernes: "Viernes",
  sábado: "Sábado",
  domingo: "Domingo",
  lunes: "Lunes",
  martes: "Martes",
  miércoles: "Miércoles",
  jueves: "Jueves",
};

export const PRECIOS: Record<DiaSemana, Record<Categoria, number>> = {
  viernes: { cajones: 9900, ropa: 7900 },
  sábado: { cajones: 7900, ropa: 6900 },
  domingo: { cajones: 5900, ropa: 5900 },
  lunes: { cajones: 3900, ropa: 3900 },
  martes: { cajones: 2900, ropa: 2900 },
  miércoles: { cajones: 1500, ropa: 1900 },
  jueves: { cajones: 700, ropa: 900 },
};

// Categorías reales de la vitrina, confirmadas por el cliente.
// TODO: el cliente mencionó "etc" — confirmar si falta alguna categoría antes de publicar.
export const CATEGORIAS = [
  { nombre: "Ropa", detalle: "Ropa de liquidación para toda la familia." },
  {
    nombre: "Electrónicos y tecnología",
    detalle: "Gadgets, accesorios y aparatos electrónicos.",
  },
  { nombre: "Hogar y cocina", detalle: "Artículos para la casa y la cocina." },
  {
    nombre: "Coleccionables y figuras",
    detalle: "Figuras y artículos de colección.",
  },
  { nombre: "Videojuegos", detalle: "Videojuegos y accesorios." },
] as const;

export type NombreCategoria = (typeof CATEGORIAS)[number]["nombre"];

// Productos de ejemplo quemados para mostrar cómo se ve el catálogo de la
// tienda. Son inventados para la demo del diseño — antes de publicar hay que
// reemplazarlos por el inventario real del cliente.
// TODO: pedir al cliente su catálogo real (nombre, precio, categoría) y
// reemplazar estos productos de ejemplo.
export const PRODUCTOS = [
  {
    id: "p1",
    nombre: "Audífonos inalámbricos",
    categoria: "Electrónicos y tecnología",
    precio: 12000,
  },
  {
    id: "p2",
    nombre: "Parlante Bluetooth",
    categoria: "Electrónicos y tecnología",
    precio: 18500,
  },
  {
    id: "p3",
    nombre: "Cargador rápido USB-C",
    categoria: "Electrónicos y tecnología",
    precio: 6500,
  },
  {
    id: "p4",
    nombre: "Chaqueta de mezclilla",
    categoria: "Ropa",
    precio: 9500,
  },
  { id: "p5", nombre: "Tenis deportivos", categoria: "Ropa", precio: 15000 },
  { id: "p6", nombre: "Suéter unisex", categoria: "Ropa", precio: 6900 },
  {
    id: "p7",
    nombre: "Set de sartenes",
    categoria: "Hogar y cocina",
    precio: 21000,
  },
  { id: "p8", nombre: "Licuadora", categoria: "Hogar y cocina", precio: 17500 },
  {
    id: "p9",
    nombre: "Juego de vasos",
    categoria: "Hogar y cocina",
    precio: 5500,
  },
  {
    id: "p10",
    nombre: "Figura de acción",
    categoria: "Coleccionables y figuras",
    precio: 8000,
  },
  {
    id: "p11",
    nombre: "Funko Pop",
    categoria: "Coleccionables y figuras",
    precio: 6500,
  },
  {
    id: "p12",
    nombre: "Control para consola",
    categoria: "Videojuegos",
    precio: 14000,
  },
  {
    id: "p13",
    nombre: "Videojuego usado",
    categoria: "Videojuegos",
    precio: 9000,
  },
] satisfies Array<{
  id: string;
  nombre: string;
  categoria: NombreCategoria;
  precio: number;
}>;

export const NEGOCIO = {
  nombre: "Black Friday Outlet",
  // Marca corta para la marca de agua tipográfica gigante del footer — el
  // nombre completo no entra bien a ese tamaño.
  marcaCorta: "OUTLET",
  lema: "Black Friday, siempre",
  claim: "Líderes en importación y liquidación",
  direccion: "125 mts este de la Catedral, Ciudad Quesada, San Carlos",
  // TODO: pedir al cliente el número real de WhatsApp (formato 506XXXXXXXX, sin +)
  whatsapp: "506XXXXXXXX",
  // TODO: confirmar horario real con el cliente, incluyendo si cierran algún día
  horario: "Lunes a domingo, 9:00 a.m. – 6:00 p.m.",
  redes: {
    facebook: "#", // TODO: pedir el link real de Facebook
    instagram: "#", // TODO: pedir el link real de Instagram
    tiktok: "#", // TODO: pedir el link real de TikTok
  },
} as const;

export const DESTINO =
  "125 mts este de la Catedral, Ciudad Quesada, San Carlos, Costa Rica";
export const LINK_GOOGLE_MAPS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(DESTINO)}`;
export const LINK_WAZE = `https://waze.com/ul?q=${encodeURIComponent(DESTINO)}&navigate=yes`;
export const LINK_MAPA_EMBED =
  "https://www.google.com/maps?q=Catedral%20de%20Ciudad%20Quesada%2C%20San%20Carlos%2C%20Costa%20Rica&output=embed";
