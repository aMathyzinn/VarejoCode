import { SOCIAL_IMAGE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Política de Privacidade | VarejoCode" },
  description: "Como a VarejoCode trata os dados pessoais recebidos em seus canais e serviços.",
  alternates: { canonical: "/privacidade/" },
  openGraph: {
    images: [SOCIAL_IMAGE],
    url: "/privacidade/",
    title: "Política de Privacidade | VarejoCode",
    description: "Como a VarejoCode trata os dados pessoais recebidos em seus canais e serviços.",
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
