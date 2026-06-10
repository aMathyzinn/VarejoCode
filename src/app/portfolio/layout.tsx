import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfólio | VarejoCode",
  description: "Conheça os projetos desenvolvidos pela VarejoCode — apps, sites, sistemas e soluções criadas para clientes reais. Parcerias e projetos próprios.",
  openGraph: {
    title: "Portfólio | VarejoCode",
    description: "Conheça os projetos desenvolvidos pela VarejoCode — apps, sites, sistemas e soluções criadas para clientes reais.",
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
