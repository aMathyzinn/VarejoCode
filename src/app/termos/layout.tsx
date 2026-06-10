import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Serviço",
  description: "Termos de Serviço da Varejo Code. Leia atentamente os termos e condições que regem a prestação de serviços de desenvolvimento de software, design e soluções digitais.",
  openGraph: {
    title: "Termos de Serviço | VarejoCode",
    description: "Termos de Serviço da Varejo Code. Leia atentamente os termos e condições que regem a prestação de serviços.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
