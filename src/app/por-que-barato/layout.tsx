import { SOCIAL_IMAGE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Como funciona a contratação | VarejoCode" },
  description: "Entenda como a VarejoCode organiza atendimento, escopo, preço e suporte em projetos sob demanda.",
  alternates: { canonical: "/por-que-barato/" },
  openGraph: {
    images: [SOCIAL_IMAGE],
    url: "/por-que-barato/",
    title: "Como funciona a contratação | VarejoCode",
    description: "Entenda como a VarejoCode organiza atendimento, escopo, preço e suporte em projetos sob demanda.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PorQueBararoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
