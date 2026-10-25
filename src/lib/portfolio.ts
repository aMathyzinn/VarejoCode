export type PortfolioFilter = "Todos" | "Websites" | "E-commerce" | "Apps" | "Sistemas" | "Bots / Automações" | "Landing Pages";
export const portfolioFilters: PortfolioFilter[] = ["Todos", "Websites", "E-commerce", "Apps", "Sistemas", "Bots / Automações", "Landing Pages"];

export interface PortfolioProject {
  id: string;
  name: string;
  category: string;
  filters: PortfolioFilter[];
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
  published: boolean;
  status?: string;
  urlLabel?: string;
  caseNote?: string;
  caseButtonLabel?: string;
  problem: string;
  delivery: string;
  url?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "amathyzin", name: "aMathyzin.com.br", category: "E-commerce", filters: ["Websites", "E-commerce", "Sistemas"],
    tagline: "Plataforma própria, do conteúdo à venda",
    description: "Conteúdo, distribuição de software, contas e produtos digitais conectados a uma operação desenvolvida sob medida.",
    features: ["Contas e acesso Premium", "Blog e downloads integrados", "APIs e autenticação para apps", "Pagamentos e entrega digital", "Controle de acesso por dispositivo", "Painel administrativo próprio"],
    stack: ["Next.js", "TypeScript", "PHP", "MySQL", "Stripe", "PIX"],
    metrics: [{ value: "2020", label: "Início do projeto" }, { value: "Web + apps", label: "Ecossistema conectado" }, { value: "Painel próprio", label: "Gestão centralizada" }],
    published: true,
    problem: "Conectar conteúdo, distribuição de software, usuários e vendas sem fragmentar a experiência em serviços isolados.",
    delivery: "Plataforma com contas, blog, downloads, produtos Premium, pagamentos e gestão administrativa. A infraestrutura inclui APIs, autenticação para aplicativos e controle de acesso aos produtos por conta e dispositivo.",
    url: "https://amathyzin.com.br",
  },
  {
    id: "organiccord", name: "OrganicCord", category: "Aplicativo desktop", filters: ["Apps"],
    tagline: "Cliente de Discord para desktop, com múltiplas contas",
    description: "Cliente open source e não oficial para Windows, com conversas, comunidades, presença e chamadas de voz em uma experiência desktop própria.",
    features: ["Múltiplas contas no mesmo aplicativo", "Servidores, canais, DMs e presença", "Chamadas de voz em DMs e canais", "Notificações nativas, temas e atalhos"],
    stack: ["Tauri 2", "Rust", "React", "TypeScript"], metrics: [], published: true,
    status: "Beta pública",
    caseNote: "Cliente não oficial para Windows. Chamadas de vídeo e compartilhamento de tela ainda não estão disponíveis.",
    caseButtonLabel: "Ver detalhes do projeto",
    problem: "Usar várias contas e acompanhar conversas, comunidades e chamadas de voz em uma experiência desktop do Discord.",
    delivery: "Cliente desktop open source para Windows, construído com Tauri 2, Rust, React e TypeScript. O projeto inclui sessões multi-conta, mensagens diretas, servidores, amigos e presença, chamadas de voz, notificações nativas, temas e atalhos. Está em beta pública e não oferece chamadas de vídeo ou compartilhamento de tela.",
    url: "https://github.com/aMathyzinn/OrganicCord", urlLabel: "Abrir repositório no GitHub",
  },
  {
    id: "ticketx", name: "Ticketx Bot", category: "Bot para Discord", filters: ["Bots / Automações"],
    tagline: "Atendimento por tickets, configurado dentro do Discord",
    description: "Bot open source multi-servidor que organiza o suporte em painéis, categorias e formulários personalizáveis, com uma central administrativa visual no Discord.",
    features: ["Múltiplos painéis configuráveis por servidor", "Categorias, equipes por cargo e formulários", "Abertura, claim, reabertura e gestão de participantes", "Transcrições HTML armazenadas localmente", "Logs de auditoria e estatísticas por servidor", "Central administrativa visual com autorização revalidada"],
    stack: ["TypeScript", "discord.js", "Discord Components V2", "SQLite"], metrics: [], published: true,
    status: "Código aberto",
    problem: "Organizar o suporte de comunidades Discord com fluxos configuráveis e ferramentas administrativas acessíveis pela própria plataforma.",
    delivery: "Bot de tickets multi-servidor. Cada servidor pode configurar painéis, categorias, equipes e formulários; a equipe acompanha tickets e registros pela central visual. O projeto usa SQLite com modo WAL e gera transcrições HTML locais, sem serviço externo.",
    url: "https://github.com/aMathyzinn/Ticketx-bot", urlLabel: "Ver repositório no GitHub",
  },
  {
    id: "infoclass", name: "InfoClass", category: "Aplicativo mobile", filters: ["Apps"],
    tagline: "A rotina escolar organizada em um app",
    description: "Aplicativo para organizar matérias, lembretes e materiais de estudo, desenvolvido para a apresentação de um projeto de faculdade de um cliente.",
    features: ["Fluxo de boas-vindas", "Cadastro de matérias", "Lembretes escolares", "Registro de materiais", "Materiais salvos", "Perfil e configurações"],
    stack: ["Kotlin", "Dart"], metrics: [], published: true,
    status: "Projeto acadêmico",
    caseNote: "Telas do aplicativo disponíveis nos detalhes do projeto.",
    caseButtonLabel: "Ver telas do app",
    problem: "Reunir informações da rotina escolar em uma experiência móvel clara para apresentar a proposta do cliente na faculdade.",
    delivery: "Aplicativo mobile feito em Kotlin e Dart. A apresentação visual mostra as telas de início, boas-vindas, ações para matérias e lembretes, além da área de perfil e materiais.",
  },
];
