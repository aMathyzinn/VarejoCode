import TechOrbitSection from "@/components/sections/TechOrbitSection";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tecnologias | VarejoCode",
  description: "Conheça as tecnologias que utilizamos: React, Next.js, Python, Discord Bots, Node.js, Mobile e muito mais. Stack moderna e sempre atualizada.",
};

export default function TecnologiasPage() {
  return (
    <>
      <TechOrbitSection />
      <Footer />
    </>
  );
}
