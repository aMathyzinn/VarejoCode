"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Briefcase,
  ShoppingCart,
  MessageSquare,
  Download,
  Shield,
  BookOpen,
  CreditCard,
} from "lucide-react";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { useWaterTransition } from "@/components/WaterTransition";
import { DiscordIcon } from "@/components/icons";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface ProjectFeature {
  icon: React.ElementType;
  label: string;
}

interface ProjectMetric {
  label: string;
  value: string;
  sub?: string;
}

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  stack: string[];
  features: ProjectFeature[];
  metrics?: ProjectMetric[];
  desktopImage: string;
  mobileImage: string;
  url?: string;
  highlight?: boolean;
  comingSoon?: boolean;
}

// ─── Dados dos projetos ────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: "amathyzin",
    name: "aMathyzin.com.br",
    tagline: "Plataforma de otimização de PC & gaming tools",
    description:
      "Portal completo voltado para gamers brasileiros que buscam melhor desempenho nos seus PCs. O site oferece packs de otimização gratuitos e premium, tutoriais, downloads e ferramentas exclusivas para jogos como Roblox e Valorant. Acumula mais de 300 mil downloads, 1,2 mil membros no Discord e 7,5 mil inscritos no YouTube desde 2020.",
    category: "Website & E-commerce",
    tags: ["Plataforma", "Gaming", "E-commerce", "Community"],
    stack: ["Next.js", "TypeScript", "PHP", "Discord API", "PIX API", "Stripe"],
    features: [
      { icon: Shield, label: "Sistema de registro e login complexo" },
      { icon: BookOpen, label: "Blog integrado" },
      { icon: MessageSquare, label: "Integração nativa com Discord" },
      { icon: Download, label: "Página de downloads" },
      { icon: ShoppingCart, label: "Sistema de vendas" },
      { icon: CreditCard, label: "PIX + Stripe" },
    ],
    metrics: [
      { label: "Downloads", value: "300k+", sub: "packs otimização" },
      { label: "Membros Discord", value: "1,2k+" },
      { label: "YouTube", value: "7,5k", sub: "inscritos" },
      { label: "No ar desde", value: "2020" },
    ],
    desktopImage: "/amathyzin.com.br.webp",
    mobileImage: "/amathyzin.com.br.mobile.webp",
    url: "https://amathyzin.com.br",
    highlight: true,
  },
  {
    id: "discord-bot-moderation",
    name: "ModBot Pro",
    tagline: "Bot de moderação e gestão para servidor Discord de 15k membros",
    description:
      "Bot completo desenvolvido para um servidor de games com 15 mil membros. Inclui sistema de moderação automática com detecção de spam e palavras proibidas, sistema de tickets com categorias, economia virtual com loja e ranking, cargos automáticos por tempo de servidor e integração com webhooks para notificações de novos membros.",
    category: "Bot Discord",
    tags: ["Bot", "Discord", "Moderação", "Economia"],
    stack: ["Python", "discord.py", "PostgreSQL", "Redis", "Docker"],
    features: [
      { icon: Shield, label: "Moderação automática inteligente" },
      { icon: MessageSquare, label: "Sistema de tickets por categoria" },
      { icon: CreditCard, label: "Economia virtual com loja" },
      { icon: BookOpen, label: "Ranking e sistema de níveis" },
      { icon: Download, label: "Logs completos de moderação" },
      { icon: ShoppingCart, label: "Cargos automáticos" },
    ],
    metrics: [
      { label: "Membros no server", value: "15k+" },
      { label: "Tickets/mês", value: "500+" },
      { label: "Uptime", value: "99,9%" },
      { label: "Prazo", value: "5 dias" },
    ],
    desktopImage: "/amathyzin.com.br.webp",
    mobileImage: "/amathyzin.com.br.mobile.webp",
    comingSoon: true,
  },
  {
    id: "landing-page-clinica",
    name: "Clínica Estética Premium",
    tagline: "Landing page com agendamento online para clínica de estética",
    description:
      "Landing page completa para clínica de estética em São Paulo. Design clean e profissional com seções de serviços, galeria antes/depois, depoimentos de clientes, formulário de agendamento integrado com Google Calendar e WhatsApp Business. Otimizada para SEO local e carregamento em menos de 2 segundos.",
    category: "Landing Page",
    tags: ["Landing Page", "SEO", "Agendamento", "Mobile First"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Google Calendar API", "WhatsApp API"],
    features: [
      { icon: Shield, label: "SEO local otimizado" },
      { icon: MessageSquare, label: "Integração com WhatsApp Business" },
      { icon: BookOpen, label: "Galeria antes/depois interativa" },
      { icon: Download, label: "Agendamento com Google Calendar" },
      { icon: ShoppingCart, label: "Depoimentos com fotos reais" },
      { icon: CreditCard, label: "Core Web Vitals 90+" },
    ],
    metrics: [
      { label: "Core Web Vitals", value: "94" },
      { label: "Agendamentos/mês", value: "200+" },
      { label: "Conversão", value: "+38%", sub: "vs site anterior" },
      { label: "Prazo", value: "7 dias" },
    ],
    desktopImage: "/amathyzin.com.br.webp",
    mobileImage: "/amathyzin.com.br.mobile.webp",
    comingSoon: true,
  },
  {
    id: "sistema-gestao-pedidos",
    name: "PedidoFácil",
    tagline: "Sistema web de gestão de pedidos para restaurante com 3 filiais",
    description:
      "Sistema completo de gestão de pedidos para rede de restaurantes com 3 filiais no interior de São Paulo. Painel administrativo com dashboard em tempo real, gestão de cardápio, controle de estoque básico, emissão de comandas digitais, relatórios de faturamento por período e integração com impressora térmica via WebSocket.",
    category: "Sistema Web",
    tags: ["Sistema", "Gestão", "Dashboard", "Tempo Real"],
    stack: ["React", "Node.js", "PostgreSQL", "WebSocket", "Prisma", "Chart.js"],
    features: [
      { icon: Shield, label: "Dashboard em tempo real" },
      { icon: ShoppingCart, label: "Gestão de cardápio online" },
      { icon: CreditCard, label: "Relatórios de faturamento" },
      { icon: MessageSquare, label: "Comandas digitais por mesa" },
      { icon: Download, label: "Integração com impressora térmica" },
      { icon: BookOpen, label: "Controle de estoque básico" },
    ],
    metrics: [
      { label: "Filiais", value: "3" },
      { label: "Pedidos/dia", value: "150+" },
      { label: "Erro de pedido", value: "-80%", sub: "vs papel" },
      { label: "Prazo", value: "18 dias" },
    ],
    desktopImage: "/amathyzin.com.br.webp",
    mobileImage: "/amathyzin.com.br.mobile.webp",
    comingSoon: true,
  },
];

// ─── Componente de card de projeto ────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative bg-white dark:bg-discord-dark rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden"
    >
      {project.highlight && (
        <div className="absolute top-5 left-5 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold tracking-wide">
            ★ Destaque
          </span>
        </div>
      )}
      {project.comingSoon && (
        <div className="absolute top-5 left-5 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-discord-blurple text-white text-xs font-bold tracking-wide">
            🔒 Screenshot em breve
          </span>
        </div>
      )}

      <div
        className={`grid lg:grid-cols-2 gap-0 ${
          !isEven ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* ── Info ── */}
        <div
          className={`flex flex-col justify-center p-8 md:p-12 ${
            !isEven ? "lg:[direction:ltr]" : ""
          }`}
        >
          {/* Categoria */}
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            {project.category}
          </span>

          {/* Título */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {project.name}
          </h2>
          <p className="text-base font-medium text-gray-500 dark:text-gray-400 mb-4">
            {project.tagline}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Descrição */}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6">
            {project.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {project.features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400"
              >
                <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                </span>
                {label}
              </div>
            ))}
          </div>

          {/* Stack */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-black/5 dark:bg-white/10 text-gray-800 dark:text-gray-200 border border-black/10 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Métricas de resultado */}
          {project.metrics && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Resultados
              </p>
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-gray-50 dark:bg-discord-darker rounded-xl px-3 py-2.5 border border-gray-100 dark:border-gray-800"
                  >
                    <p className="text-xl font-black text-gray-900 dark:text-white leading-tight">{m.value}</p>
                    <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 leading-tight mt-0.5">{m.label}</p>
                    {m.sub && <p className="text-[10px] text-gray-400 dark:text-gray-600">{m.sub}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-secondary w-fit text-sm"
            >
              Ver projeto
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* ── Mockup ── */}
        <div
          className={`relative flex items-center justify-center bg-gray-50 dark:bg-discord-darker p-8 md:p-12 min-h-[380px] overflow-hidden ${
            !isEven ? "lg:[direction:ltr]" : ""
          }`}
        >
          {/* Glow de fundo */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 dark:to-transparent" />

          {/* comingSoon overlay */}
          {project.comingSoon && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gray-100/90 dark:bg-discord-dark/90 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-discord-blurple/10 dark:bg-discord-blurple/20 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-discord-blurple" />
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">Preview do projeto</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-[200px]">
                Screenshot será adicionado em breve
              </p>
            </div>
          )}

          {/* Desktop mockup */}
          <div className="relative w-full max-w-sm">
            {/* Barra de janela */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-t-xl border border-gray-300 dark:border-gray-700 border-b-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="flex-1 mx-3 h-4 rounded bg-gray-300 dark:bg-gray-700 flex items-center px-2">
                <span className="text-[8px] text-gray-500 dark:text-gray-400 truncate">
                  {project.url?.replace("https://", "") ?? project.id}
                </span>
              </div>
            </div>

            {/* Tela desktop */}
            <div className="relative overflow-hidden rounded-b-xl border border-gray-300 dark:border-gray-700 border-t-0 shadow-2xl">
              <Image
                src={project.desktopImage}
                alt={`${project.name} — versão desktop`}
                width={560}
                height={360}
                className="w-full object-cover object-top"
                sizes="(max-width: 768px) 90vw, 500px"
              />
            </div>

            {/* Phone frame — sobreposto à direita */}
            <div className="absolute -right-6 bottom-4 w-[88px] z-10">
              {/* Corpo do celular */}
              <div className="relative rounded-[22px] border-[3px] border-gray-800 dark:border-gray-300 bg-gray-900 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-gray-900 rounded-b-lg z-10" />
                {/* Tela mobile */}
                <Image
                  src={project.mobileImage}
                  alt={`${project.name} — versão mobile`}
                  width={200}
                  height={370}
                  className="w-full object-cover object-top"
                  sizes="100px"
                />
                {/* Reflexo */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              </div>
              {/* Botão lateral simulado */}
              <div className="absolute -right-[5px] top-10 w-[4px] h-8 bg-gray-700 dark:bg-gray-400 rounded-r-full" />
              <div className="absolute -left-[5px] top-8 w-[4px] h-6 bg-gray-700 dark:bg-gray-400 rounded-l-full" />
              <div className="absolute -left-[5px] top-16 w-[4px] h-6 bg-gray-700 dark:bg-gray-400 rounded-l-full" />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Página principal ──────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const { triggerTransition } = useWaterTransition();

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-discord-darkest pt-20">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 animated-gradient opacity-60" />
          <div className="absolute inset-0 noise" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-black/10 dark:bg-white/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-800/10 dark:bg-gray-200/10 rounded-full blur-3xl animate-float-medium" />

          <div className="container-max relative z-10 px-4 md:px-8 text-center">
            {/* Breadcrumb */}
            <div className="flex justify-center mb-6">
              <Breadcrumb items={[{ label: "Portfólio" }]} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 text-black dark:text-white text-sm font-semibold mb-6">
                <Briefcase className="w-4 h-4" />
                Nosso trabalho em prática
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Projetos que{" "}
                <span className="gradient-text">falam por si</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Apps, sites, sistemas e soluções desenvolvidas pela VarejoCode para clientes reais —
                do design ao deploy, com tecnologia de ponta.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={triggerTransition}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <DiscordIcon className="w-5 h-5" />
                  Quero um projeto assim
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <Link
                  href="/#servicos"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Ver serviços
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Lista de projetos ── */}
        <section className="py-20">
          <div className="container-max px-4 md:px-8">
            {/* Cabeçalho da seção */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  Projetos desenvolvidos
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {projects.length} projeto{projects.length !== 1 ? "s" : ""} publicado
                  {projects.length !== 1 ? "s" : ""} · mais em breve
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Todos", "Website", "E-commerce", "App", "Parceria"].map((filter) => (
                  <span
                    key={filter}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-default ${
                      filter === "Todos"
                        ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                        : "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Cards */}
            <div className="space-y-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* Placeholder — mais projetos em breve */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-12 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Mais projetos chegando
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-600 max-w-sm mx-auto">
                Novos projetos de clientes e parcerias serão exibidos aqui conforme forem publicados.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-gray-50 dark:bg-discord-darker">
          <div className="container-max px-4 md:px-8 max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-black dark:bg-white flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Briefcase className="w-8 h-8 text-white dark:text-black" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                O próximo pode ser o seu
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                Desenvolvemos sites, apps, bots e sistemas sob medida. Sem burocracia, sem
                contrato abusivo — tudo via Discord.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={triggerTransition}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center justify-center gap-2 text-lg cursor-pointer"
                >
                  <DiscordIcon className="w-6 h-6" />
                  Falar no Discord
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <Link
                  href="/#planos"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Ver planos e preços
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
