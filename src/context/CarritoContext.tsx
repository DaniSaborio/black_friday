"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

export type ItemCarrito = {
  productoId: string;
  cantidad: number;
};

type CarritoContextValue = {
  items: ItemCarrito[];
  agregar: (productoId: string) => void;
  quitar: (productoId: string) => void;
  cambiarCantidad: (productoId: string, cantidad: number) => void;
  vaciar: () => void;
  abierto: boolean;
  setAbierto: (abierto: boolean) => void;
};

const CarritoContext = createContext<CarritoContextValue | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [abierto, setAbierto] = useState(false);

  // No abre el panel al agregar: interrumpiría agregar varios productos
  // seguidos desde la grilla. El contador en el ícono del header ya avisa.
  const agregar = (productoId: string) => {
    setItems((actual) => {
      const existente = actual.find((i) => i.productoId === productoId);
      if (existente) {
        return actual.map((i) =>
          i.productoId === productoId ? { ...i, cantidad: i.cantidad + 1 } : i,
        );
      }
      return [...actual, { productoId, cantidad: 1 }];
    });
  };

  const quitar = (productoId: string) => {
    setItems((actual) => actual.filter((i) => i.productoId !== productoId));
  };

  const cambiarCantidad = (productoId: string, cantidad: number) => {
    if (cantidad < 1) {
      quitar(productoId);
      return;
    }
    setItems((actual) =>
      actual.map((i) => (i.productoId === productoId ? { ...i, cantidad } : i)),
    );
  };

  const vaciar = () => setItems([]);

  return (
    <CarritoContext.Provider
      value={{
        items,
        agregar,
        quitar,
        cambiarCantidad,
        vaciar,
        abierto,
        setAbierto,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito(): CarritoContextValue {
  const ctx = useContext(CarritoContext);
  if (!ctx) {
    throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  }
  return ctx;
}
