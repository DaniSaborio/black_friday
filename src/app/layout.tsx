import type { Metadata } from "next";
import { Anton, Archivo_Black, Barlow, Oswald } from "next/font/google";
import { BusquedaProvider } from "@/context/BusquedaContext";
import { CarritoProvider } from "@/context/CarritoContext";
import "./globals.css";

// Nombres de variable "en bruto": distintos de los tokens --font-display /
// --font-titular / --font-etiqueta / --font-cuerpo que define @theme en
// globals.css, para que ese bloque los pueda referenciar con var(...) sin
// caer en una referencia circular.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

const oswald = Oswald({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-oswald",
});

const barlow = Barlow({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Black Friday Outlet — Líderes en importación y liquidación",
  description:
    "Black Friday Outlet, tienda de importación y liquidación en Ciudad Quesada, San Carlos. Ropa, electrónicos, hogar, coleccionables y más.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CR"
      className={`${anton.variable} ${archivoBlack.variable} ${oswald.variable} ${barlow.variable}`}
    >
      <body className="bg-white text-negro">
        <BusquedaProvider>
          <CarritoProvider>{children}</CarritoProvider>
        </BusquedaProvider>
      </body>
    </html>
  );
}
