import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WaterTransitionProvider } from "@/components/WaterTransition";
import Navbar from "@/components/Navbar";
import FloatingButton from "@/components/FloatingButton";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://varejocode.com.br'),
  title: {
    default: "VarejoCode - Desenvolvimento sob demanda via Discord | Brasil",
    template: "%s | VarejoCode"
  },
  description: "Plataforma brasileira de desenvolvimento de software via Discord. Desenvolvimento sem burocracia e sem taxas abusivas. Bots Discord, Websites, Apps Mobile e Desktop, Automações Python e muito mais. Economize até 70% comparado a 99Freelas, Workana e GetNinjas.",
  keywords: ["desenvolvimento", "discord", "freelance brasil", "websites", "bots discord", "aplicativos", "programação", "bot discord personalizado", "desenvolvimento web", "python automação", "react native", "next.js", "landing page", "e-commerce", "desenvolvimento de software", "freelas brasil", "programador discord", "desenvolvedor freelancer", "criar site barato", "bot discord brasil", "desenvolvimento react", "app mobile", "desenvolvimento sob demanda", "programação python"],
  authors: [{ name: "VarejoCode", url: "https://varejocode.com.br" }],
  creator: "VarejoCode",
  publisher: "VarejoCode",
  other: {
    'contact:email': 'contato@varejocode.com.br',
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
    siteName: "VarejoCode - Desenvolvimento via Discord",
    title: "VarejoCode - Desenvolvimento sob demanda via Discord | Brasil",
    description: "Plataforma brasileira de desenvolvimento de software via Discord. Sem burocracia, sem taxas abusivas. Bots Discord, Sites, Apps e Automações. Economize até 70%!",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "VarejoCode - Desenvolvimento sob demanda via Discord",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VarejoCode - Desenvolvimento sob demanda via Discord | Brasil",
    description: "Desenvolvimento de software sem burocracia via Discord. Bots Discord, Websites, Apps Mobile/Desktop, Automações Python. Economize até 70% comparado a outras plataformas!",
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* CSS Crítico inline para evitar render-blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box;margin:0;padding:0}
            html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;scroll-behavior:smooth}
            body{min-height:100vh;background:#121212;color:#fff;font-family:var(--font-inter),system-ui,-apple-system,sans-serif}
            .gradient-text{background:linear-gradient(135deg,#fff 0%,#e0e0e0 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
            .container-max{max-width:80rem;margin:0 auto}
            .btn-primary{background:#000;color:#fff;font-weight:600;padding:.75rem 1.5rem;border-radius:.75rem;display:inline-flex;align-items:center;gap:.5rem}
            @media(prefers-color-scheme:light){body{background:#fff;color:#000}.gradient-text{background:linear-gradient(135deg,#000 0%,#404040 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}}
          `
        }} />
        {/* Preconnect para recursos externos - ordem otimizada */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://discord.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        {/* Preload da fonte crítica */}
        <link 
          rel="preload" 
          href="/_next/static/media/e4af272ccee01ff0-s.p.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        {/* Preload de imagens críticas LCP */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" fetchPriority="high" />
        <StructuredData />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <WaterTransitionProvider>
            <div className="relative min-h-screen bg-white dark:bg-discord-darkest overflow-x-hidden">
              <Navbar />
              <main>{children}</main>
              <FloatingButton />
            </div>
          </WaterTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
