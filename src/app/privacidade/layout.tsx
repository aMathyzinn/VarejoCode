import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade da Varejo Code. Saiba como coletamos, usamos e protegemos suas informações pessoais em nossos serviços de desenvolvimento.",
  openGraph: {
    title: "Política de Privacidade | VarejoCode",
    description: "Política de Privacidade da Varejo Code. Saiba como tratamos seus dados pessoais.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacidadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
