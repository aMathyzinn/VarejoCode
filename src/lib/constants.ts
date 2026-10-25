// URLs centralizadas
export const URLS = {
  DISCORD_INVITE: "https://discord.gg/THE7mm5uVk",
  WHATSAPP: "https://wa.me/5521979035423",
  GITHUB: "https://github.com/varejocode",
  INSTAGRAM: "https://instagram.com/varejocode",
  YOUTUBE: "https://www.youtube.com/channel/UCLaIqYLe4bOMTildmX4UCUA",
  WEBSITE: "https://varejocode.com.br",
  EMAIL: "project@varejocode.com.br",
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
  DEFAULT_TITLE: "VarejoCode | Desenvolvimento sob demanda para negócios online",
  DESCRIPTION: "Sites, bots, APIs, apps e automações para negócios online. Escopo, valor e prazo combinados antes de começar.",
  OG_IMAGE: "/banner.png",
  FAVICON: "/favicon/favicon.ico",
} as const;

// Navegação
export const NAV_LINKS = [
  { href: "/#servicos", label: "Soluções" },
  { href: "/portfolio/", label: "Projetos" },
  { href: "/#processo", label: "Processo" },
  { href: "/#planos", label: "Formatos" },
  { href: "/#faq", label: "Dúvidas" },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  servicos: [
    { label: "Bots Discord", href: "/#servicos" },
    { label: "Websites", href: "/#servicos" },
    { label: "Apps Mobile", href: "/#servicos" },
    { label: "Apps Desktop", href: "/#servicos" },
  ],
  empresa: [
    { label: "Como contratar", href: "/por-que-barato" },
    { label: "Processo", href: "/#processo" },
    { label: "Formatos", href: "/#planos" },
    { label: "Projetos", href: "/portfolio/" },
    { label: "Dúvidas", href: "/#faq" },
  ],
  suporte: [
    { label: "WhatsApp", href: URLS.WHATSAPP },
    { label: "Discord", href: URLS.DISCORD_INVITE },
    { label: "E-mail", href: `mailto:${URLS.EMAIL}` },
    { label: "Abrir Ticket", href: URLS.DISCORD_INVITE },
  ],
  legal: [
    { label: "Termos de Serviço", href: "/termos" },
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Como funciona a contratação", href: "/por-que-barato" },
  ],
} as const;

export const SOCIAL_IMAGE = { url: "/banner.png", width: 1200, height: 630, alt: "VarejoCode: sites, sistemas e automações" };
