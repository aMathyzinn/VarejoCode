import { SOCIAL_IMAGE } from "@/lib/constants";
import TechOrbitSection from "@/components/sections/TechOrbitSection";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Tecnologias usadas nos projetos | VarejoCode" },
  description: "Tecnologias usadas pela VarejoCode em sites, bots, APIs, automações e aplicativos, conforme o escopo de cada projeto.",
  alternates: { canonical: "/tecnologias/" },
  openGraph: {
    images: [SOCIAL_IMAGE],
    url: "/tecnologias/",
    title: "Tecnologias usadas nos projetos | VarejoCode",
    description: "Tecnologias usadas em sites, bots, APIs, automações e aplicativos da VarejoCode.",
  },
};

export default function TecnologiasPage() {
  return (
    <>
      <TechOrbitSection />
      <Footer />
    </>
  );
}
