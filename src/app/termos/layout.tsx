import { SOCIAL_IMAGE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Termos de Serviço | VarejoCode" },
  description: "Termos que regem a contratação dos serviços de desenvolvimento da VarejoCode.",
  alternates: { canonical: "/termos/" },
  openGraph: {
    images: [SOCIAL_IMAGE],
    url: "/termos/",
    title: "Termos de Serviço | VarejoCode",
    description: "Termos que regem a contratação dos serviços de desenvolvimento da VarejoCode.",
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
