"use client";

import { useHoy } from "@/hooks/useHoy";
import { linkWhatsapp } from "@/lib/precio";
import { WhatsappIcon } from "./icons";

const BASE =
  "inline-flex items-center justify-center min-h-[44px] border-[3px] border-negro font-etiqueta uppercase tracking-[0.12em] text-sm shadow-dura transition-transform duration-150 ease-golpe active:translate-x-[3px] active:translate-y-[3px] active:shadow-dura-sm";

export function WhatsappButton({
  variant = "secondary",
}: {
  variant?: "primary" | "secondary";
}) {
  const dia = useHoy();
  const href = linkWhatsapp(dia);

  const superficie = variant === "primary" ? "bg-amarillo" : "bg-white";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`${BASE} ${superficie} text-negro px-6 py-3`}
    >
      Escribinos por WhatsApp
    </a>
  );
}

export function WhatsappIconLink() {
  const dia = useHoy();
  return (
    <a
      href={linkWhatsapp(dia)}
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      className="flex items-center justify-center w-11 h-11 text-white shrink-0"
    >
      <WhatsappIcon className="w-6 h-6" />
    </a>
  );
}
