import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WaterTransitionProvider } from "@/components/WaterTransition";
import Navbar from "@/components/Navbar";
import FloatingButton from "@/components/FloatingButton";
import StructuredData from "@/components/StructuredData";
import RouteTransition from "@/components/RouteTransition";
import ScrollExperience from "@/components/ScrollExperience";
import "lenis/dist/lenis.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://varejocode.com.br'),
  title: {
    default: "VarejoCode | Desenvolvimento sob demanda para negócios online",
    template: "%s | VarejoCode"
  },
  description: "Sites, bots de Discord, APIs, apps e automações para negócios online. Atendimento direto por WhatsApp, e-mail ou Discord, com escopo, valor e prazo combinados antes de começar.",
  keywords: ["desenvolvimento sob demanda", "desenvolvimento para negócios online", "site profissional", "bot Discord personalizado", "API personalizada", "automação de processos", "aplicativo mobile", "desenvolvimento web", "freelancer de tecnologia"],
  authors: [{ name: "VarejoCode", url: "https://varejocode.com.br" }],
  creator: "VarejoCode",
  publisher: "VarejoCode",
  other: {
    'contact:email': 'project@varejocode.com.br',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://varejocode.com.br",
    siteName: "VarejoCode",
    title: "VarejoCode | Desenvolvimento sob demanda para negócios online",
    description: "Sites, bots de Discord, APIs, apps e automações, com escopo, valor e prazo combinados antes de começar.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "VarejoCode - Desenvolvimento sob demanda",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VarejoCode | Desenvolvimento sob demanda para negócios online",
    description: "Sites, bots de Discord, APIs, apps e automações. Comece por WhatsApp, e-mail ou Discord.",
    images: ["/banner.png"],
    creator: "@varejocode",
    site: "@varejocode",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://varejocode.com.br",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#070707" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* CSS Crítico inline para evitar render-blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box;margin:0;padding:0}
            html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            body{min-height:100vh;background:#121212;color:#fff;font-family:var(--font-inter),system-ui,-apple-system,sans-serif}
            .gradient-text{background:linear-gradient(135deg,#fff 0%,#e0e0e0 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
            .container-max{max-width:80rem;margin:0 auto}
            .btn-primary{background:#000;color:#fff;font-weight:600;padding:.75rem 1.5rem;border-radius:.75rem;display:inline-flex;align-items:center;gap:.5rem}
            @media(prefers-color-scheme:light){body{background:#fff;color:#000}.gradient-text{background:linear-gradient(135deg,#000 0%,#404040 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}}
          `
        }} />
        <link rel="dns-prefetch" href="https://discord.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        {/* Preload de imagens críticas LCP */}
        <link rel="preload" href="/varejocode-logo.png" as="image" type="image/png" fetchPriority="high" />
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange={false}
        >
          <WaterTransitionProvider>
            <div className="relative min-h-screen bg-discord-darkest overflow-x-hidden">
              <ScrollExperience />
              <Navbar />
              <RouteTransition>{children}</RouteTransition>
              <FloatingButton />
            </div>
          </WaterTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
