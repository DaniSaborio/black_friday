import { CajonesPrecioDelDia } from "@/components/CajonesPrecioDelDia";
import { CarritoPanel } from "@/components/CarritoPanel";
import { ComoFunciona } from "@/components/ComoFunciona";
import { DeDondeViene } from "@/components/DeDondeViene";
import { DondeEstamos } from "@/components/DondeEstamos";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SemanaCompleta } from "@/components/SemanaCompleta";
import { Vitrina } from "@/components/Vitrina";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SemanaCompleta />
        <CajonesPrecioDelDia />
        <Vitrina />
        <ComoFunciona />
        <DeDondeViene />
        <DondeEstamos />
      </main>
      <Footer />
      <CarritoPanel />
    </>
  );
}
