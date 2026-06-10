import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Por que tão barato? | VarejoCode",
  description: "Entenda por que os preços da VarejoCode são tão mais baixos que o mercado — sem mistério, sem pegadinha. Transparência total sobre como nosso modelo funciona.",
  openGraph: {
    title: "Por que tão barato? | VarejoCode",
    description: "Entenda por que os preços da VarejoCode são tão mais baixos que o mercado — sem mistério, sem pegadinha.",
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
