// URLs centralizadas
export const URLS = {
  DISCORD_INVITE: "https://discord.gg/THE7mm5uVk",
  GITHUB: "https://github.com/varejocode",
  INSTAGRAM: "https://instagram.com/varejocode",
  YOUTUBE: "https://www.youtube.com/channel/UCLaIqYLe4bOMTildmX4UCUA",
  WEBSITE: "https://varejocode.com.br",
  EMAIL: "contato@varejocode.com.br",
} as const;

// Constantes de performance
export const ANIMATION_CONFIG = {
  LOGO_GRID_COUNT: 15, // Reduzido de 60
  CAROUSEL_LOGOS_PER_ROW: 10, // Reduzido de 40
  TYPING_DELAY: 2500,
  STEP_INTERVAL: 2500,
} as const;

// Constantes de SEO
export const SEO = {
  SITE_NAME: "VarejoCode",
  DEFAULT_TITLE: "VarejoCode - Desenvolvimento sob demanda via Discord | Brasil",
  DESCRIPTION: "Plataforma brasileira de desenvolvimento de software via Discord. Sem burocracia, sem taxas abusivas. Bots Discord, Sites, Apps Mobile/Desktop, Automações Python. Economize até 70%!",
  OG_IMAGE: "/banner.png",
  FAVICON: "/favicon/favicon.ico",
} as const;

// Navegação
export const NAV_LINKS = [
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#servicos", label: "Serviços" },
  { href: "#planos", label: "Planos" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "#faq", label: "FAQ" },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  servicos: [
    { label: "Bots Discord", href: "#servicos" },
    { label: "Websites", href: "#servicos" },
    { label: "Apps Mobile", href: "#servicos" },
    { label: "Apps Desktop", href: "#servicos" },
  ],
  empresa: [
    { label: "Sobre Nós", href: "/por-que-barato" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Planos e Preços", href: "#planos" },
    { label: "Portfólio", href: "/portfolio" },
    { label: "FAQ", href: "#faq" },
  ],
  suporte: [
    { label: "Discord", href: URLS.DISCORD_INVITE },
    { label: "E-mail", href: `mailto:${URLS.EMAIL}` },
    { label: "Abrir Ticket", href: URLS.DISCORD_INVITE },
  ],
  legal: [
    { label: "Termos de Serviço", href: "/termos" },
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Por que tão barato?", href: "/por-que-barato" },
  ],
} as const;
