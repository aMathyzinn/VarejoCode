import { SOCIAL_IMAGE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Portfólio de sites, bots e sistemas | VarejoCode" },
  description: "Conheça os projetos selecionados da VarejoCode, com contexto, funcionalidades, tecnologias e resultados publicados.",
  alternates: { canonical: "/portfolio/" },
  openGraph: {
    images: [SOCIAL_IMAGE],
    url: "/portfolio/",
    title: "Portfólio de sites, bots e sistemas | VarejoCode",
    description: "Projetos selecionados da VarejoCode, com contexto, funcionalidades, tecnologias e resultados publicados.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
