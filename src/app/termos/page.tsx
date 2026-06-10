"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  MessageCircle, 
  CreditCard, 
  Clock, 
  Package, 
  RefreshCcw, 
  Shield, 
  Users, 
  AlertTriangle, 
  XCircle, 
  Scale, 
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Bot,
  Globe,
  Smartphone,
  Monitor,
  Code,
  Palette,
  Settings,
  Zap,
  CheckCircle,
  Info,
  BookOpen,
  Hash,
  ArrowUp,
  Menu,
  X,
  Eye,
  ShieldCheck,
  FileCheck
} from "lucide-react";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { URLS } from "@/lib/constants";
import { DiscordIcon } from "@/components/icons";

// Estrutura de navegação dos termos com descrições
const sections = [
  { id: "introducao", title: "Introdução", icon: BookOpen, description: "Sobre a Varejo Code" },
  { id: "natureza", title: "Natureza do Serviço", icon: FileText, description: "Como funcionamos" },
  { id: "servicos-oferecidos", title: "Serviços Oferecidos", icon: Code, description: "O que desenvolvemos" },
  { id: "atendimento", title: "Atendimento", icon: MessageCircle, description: "Canais de comunicação" },
  { id: "orcamento", title: "Orçamento e Escopo", icon: FileText, description: "Definição do projeto" },
  { id: "prazos", title: "Prazos de Entrega", icon: Clock, description: "Estimativas e condições" },
  { id: "pagamento", title: "Pagamento", icon: CreditCard, description: "Formas e condições" },
  { id: "planos", title: "Planos", icon: Package, description: "Hospedado vs Source" },
  { id: "reembolso", title: "Reembolso", icon: RefreshCcw, description: "Política de cancelamento" },
  { id: "entrega", title: "Entrega e Revisões", icon: Package, description: "Processo de entrega" },
  { id: "propriedade", title: "Propriedade Intelectual", icon: Shield, description: "Direitos e licenças" },
  { id: "responsabilidades-cliente", title: "Responsabilidades", icon: Users, description: "Deveres do cliente" },
  { id: "limitacao", title: "Limitações", icon: AlertTriangle, description: "Isenções de responsabilidade" },
  { id: "encerramento", title: "Encerramento", icon: XCircle, description: "Término do serviço" },
  { id: "disposicoes", title: "Disposições Finais", icon: Scale, description: "Considerações gerais" },
];

// Resumo executivo dos pontos principais
const keyPoints = [
  { icon: MessageCircle, title: "Atendimento via Discord", description: "Todo contato é feito exclusivamente pelo servidor oficial" },
  { icon: CreditCard, title: "Pagamento Antecipado", description: "Projeto inicia após confirmação do pagamento via PIX" },
  { icon: RefreshCcw, title: "Sem Reembolso", description: "Não há reembolso após início do desenvolvimento" },
  { icon: Shield, title: "Propriedade do Código", description: "Código-fonte só é entregue no Plano Source" },
];

// Serviços detalhados
const servicesDetails = [
  {
    icon: Bot,
    title: "Bots Discord",
    description: "Desenvolvimento de bots personalizados para servidores Discord com funcionalidades sob medida.",
    features: [
      "Comandos slash e prefix personalizados",
      "Sistemas de moderação automatizada",
      "Economia virtual e sistemas de ranking",
      "Integração com APIs externas",
      "Sistemas de tickets e suporte",
      "Bots de música e entretenimento"
    ],
    color: "from-discord-blurple to-blue-600"
  },
  {
    icon: Globe,
    title: "Sites e Landing Pages",
    description: "Criação de sites institucionais, portfólios, landing pages e e-commerces com design moderno.",
    features: [
      "Design responsivo (mobile-first)",
      "Otimização para SEO",
      "Integração com sistemas de pagamento",
      "Painel administrativo",
      "Formulários de contato",
      "Analytics e métricas"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Desenvolvimento de aplicativos para Android e iOS com tecnologias nativas ou híbridas.",
    features: [
      "Apps nativos (Kotlin/Swift)",
      "Apps híbridos (React Native/Flutter)",
      "Integração com APIs",
      "Notificações push",
      "Armazenamento offline",
      "Publicação nas lojas"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Monitor,
    title: "Sistemas Desktop",
    description: "Aplicações desktop multiplataforma para Windows, Mac e Linux.",
    features: [
      "Electron e frameworks nativos",
      "Interface intuitiva",
      "Banco de dados local/remoto",
      "Atualizações automáticas",
      "Integração com hardware",
      "Geração de relatórios"
    ],
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Code,
    title: "Automações Python",
    description: "Scripts de automação, web scraping, análise de dados e bots para outras plataformas.",
    features: [
      "Web scraping e coleta de dados",
      "Automação de tarefas repetitivas",
      "Bots para WhatsApp/Telegram",
      "Integração com APIs",
      "Análise e processamento de dados",
      "Relatórios automatizados"
    ],
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Zap,
    title: "Desenvolvimento Web Full-Stack",
    description: "Aplicações web completas com front-end e back-end de alta performance.",
    features: [
      "React, Next.js, Vue.js",
      "Node.js, Python, PHP",
      "Bancos de dados SQL/NoSQL",
      "APIs RESTful e GraphQL",
      "Autenticação e segurança",
      "Deploy e CI/CD"
    ],
    color: "from-amber-500 to-yellow-600"
  },
  {
    icon: Palette,
    title: "Design e Identidade Visual",
    description: "Criação de logos, identidade visual completa, UI/UX design e materiais gráficos.",
    features: [
      "Criação de logos",
      "Manual de identidade visual",
      "UI/UX Design",
      "Artes para redes sociais",
      "Protótipos interativos",
      "Design system"
    ],
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Settings,
    title: "Soluções Customizadas",
    description: "Projetos especiais e integrações sob medida para necessidades específicas.",
    features: [
      "Integrações com APIs",
      "Webhooks e automações",
      "Dashboards personalizados",
      "Sistemas de gestão",
      "Migrações de dados",
      "Consultoria técnica"
    ],
    color: "from-gray-600 to-slate-700"
  }
];

export default function TermosPage() {
  const [activeSection, setActiveSection] = useState("introducao");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Observar scroll para destacar seção ativa e progresso de leitura
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      // Calcular progresso de leitura
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setReadProgress(Math.min(progress, 100));
      
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentSectionIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-discord-blurple to-purple-600"
          style={{ width: `${readProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-discord-blurple text-white shadow-lg flex items-center justify-center"
        aria-label="Menu de navegação"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-discord-dark z-50 overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Navegação</h3>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-1">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeSection === section.id
                          ? "bg-discord-blurple text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-medium truncate">{section.title}</span>
                        <span className="block text-xs opacity-70 truncate">{section.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-discord-darker dark:to-discord-darkest overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-discord-blurple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-max relative z-10">
          {/* Breadcrumb */}
          <div className="flex justify-center mb-6">
            <Breadcrumb items={[{ label: "Termos de Serviço" }]} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm font-semibold mb-6">
              <Scale className="w-4 h-4" />
              Documentação Legal
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Termos de Serviço
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Leia atentamente os termos e condições que regem a prestação de serviços da Varejo Code. 
              Ao utilizar nossos serviços, você concorda com todos os termos aqui descritos.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-gray-700">
                <FileCheck className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{sections.length} seções</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-gray-700">
                <Eye className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">~10 min de leitura</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-discord-blurple/10 dark:bg-discord-blurple/20 border border-discord-blurple/20 dark:border-discord-blurple/30">
                <Clock className="w-5 h-5 text-discord-blurple" />
                <span className="text-sm font-medium text-discord-blurple">Atualizado: Janeiro 2026</span>
              </div>
            </div>
          </motion.div>

          {/* Key Points Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center mb-6">
              📋 Resumo dos Pontos Principais
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-discord-dark border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-discord-blurple/10 dark:bg-discord-blurple/20 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-discord-blurple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{point.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-discord-darkest">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Navigation - Desktop */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block lg:w-80 flex-shrink-0"
            >
              <div className="lg:sticky lg:top-24 space-y-4">
                {/* Progress Indicator */}
                <div className="bg-white dark:bg-discord-dark rounded-2xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Progresso de leitura</span>
                    <span className="text-xs font-bold text-discord-blurple">{Math.round(readProgress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-discord-blurple to-purple-600 transition-all duration-300"
                      style={{ width: `${readProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Seção {currentSectionIndex + 1} de {sections.length}
                  </p>
                </div>

                <div className="bg-white dark:bg-discord-dark rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-discord-blurple" />
                    Índice
                  </h3>
                  <nav className="space-y-1 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
                    {sections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-200 group ${
                          activeSection === section.id
                            ? "bg-discord-blurple text-white shadow-lg shadow-discord-blurple/25"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                          activeSection === section.id 
                            ? "bg-white/20 text-white" 
                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-discord-blurple/20 group-hover:text-discord-blurple"
                        }`}>
                          {index + 1}
                        </span>
                        <span className="truncate flex-1">{section.title}</span>
                        {activeSection === section.id && (
                          <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Quick Links */}
                <div className="bg-white dark:bg-discord-dark rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-discord-blurple" />
                    Links Rápidos
                  </h4>
                  <div className="space-y-2">
                    <a
                      href={URLS.DISCORD_INVITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <DiscordIcon className="w-5 h-5 group-hover:text-discord-blurple transition-colors" />
                      <span className="flex-1">Servidor Discord</span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                    <a
                      href="/"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <Globe className="w-5 h-5 group-hover:text-discord-blurple transition-colors" />
                      <span className="flex-1">Página Inicial</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Content */}
            <motion.main
              ref={contentRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 min-w-0"
            >
              {/* Acceptance Banner */}
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-discord-blurple/10 to-purple-500/10 border border-discord-blurple/20 dark:border-discord-blurple/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-discord-blurple/20 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-discord-blurple" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Acordo de Termos</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ao utilizar nossos serviços, abrir um ticket ou efetuar pagamento, você declara que leu e concorda integralmente com todos os termos descritos nesta página.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* Introdução */}
                <section id="introducao" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-discord-blurple to-purple-600 flex items-center justify-center shadow-lg shadow-discord-blurple/25">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-discord-blurple uppercase tracking-wider">Início</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Introdução
                        </h2>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-discord-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
                        A <strong className="text-gray-900 dark:text-white">Varejo Code</strong> é uma plataforma de prestação de serviços digitais sob demanda, 
                        especializada em desenvolvimento de software, design e soluções tecnológicas. Nossa operação é realizada 
                        exclusivamente através do Discord, proporcionando uma experiência de atendimento ágil e sem burocracia.
                      </p>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-5">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800 dark:text-amber-300 m-0 mb-2">Importante</h4>
                          <p className="text-amber-700 dark:text-amber-400 text-sm m-0">
                            Ao abrir um ticket, solicitar orçamento ou efetuar qualquer pagamento, o cliente declara que 
                            leu, compreendeu e concorda integralmente com todos os termos aqui descritos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 1. Natureza do Serviço */}
                <section id="natureza" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Seção 1</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Natureza do Serviço
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          1.1 — Prestação de Serviços Digitais
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          A Varejo Code presta serviços de <strong>desenvolvimento de software</strong>, <strong>design gráfico</strong>, 
                          <strong>automação</strong>, e <strong>soluções digitais personalizadas</strong> sob demanda. Cada projeto é 
                          tratado de forma individual, com escopo e prazo definidos especificamente para atender às necessidades do cliente.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          1.2 — Discord como Canal de Comunicação
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                          O Discord é utilizado <strong>exclusivamente como meio de comunicação e atendimento</strong>, não sendo o 
                          produto final. A plataforma permite:
                        </p>
                        <ul className="space-y-2 m-0">
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Comunicação direta e em tempo real
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Sistema de tickets privados para cada projeto
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Histórico completo de conversas
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Compartilhamento de arquivos e previews
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          1.3 — Não Somos uma Comunidade Social
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          A Varejo Code <strong>não atua como comunidade social</strong>, fórum público ou rede de interação entre usuários. 
                          O servidor do Discord é destinado exclusivamente para fins comerciais de prestação de serviços.
                        </p>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 2. Serviços Oferecidos */}
                <section id="servicos-oferecidos" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wider">Seção 2</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Serviços Oferecidos
                        </h2>
                      </div>
                    </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    A Varejo Code oferece uma ampla gama de serviços de desenvolvimento e design. Abaixo você encontra 
                    detalhes sobre cada categoria de serviço disponível:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {servicesDetails.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                              <service.icon className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white m-0">{service.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 m-0">{service.description}</p>
                          <div className="space-y-2">
                            {service.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl p-5">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 m-0 mb-2">Serviços Personalizados</h4>
                        <p className="text-blue-700 dark:text-blue-400 text-sm m-0">
                          Não encontrou o que procura? Entre em contato! Desenvolvemos soluções personalizadas para 
                          atender necessidades específicas. Abra um ticket no Discord e descreva seu projeto.
                        </p>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 3. Atendimento e Comunicação */}
                <section id="atendimento" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-green-500 uppercase tracking-wider">Seção 3</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Atendimento e Comunicação
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          3.1 — Canal Oficial de Atendimento
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                          Todo atendimento ocorre <strong>exclusivamente por meio de tickets</strong> abertos no servidor oficial do Discord.
                          Este é o único canal reconhecido para:
                        </p>
                        <ul className="space-y-2 m-0">
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Solicitação de orçamentos
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Negociação de projetos
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Acompanhamento do desenvolvimento
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Suporte técnico
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Entrega de projetos
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          3.2 — Canais Não Oficiais
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          <strong>Mensagens privadas (DMs)</strong>, contatos por outras redes sociais ou qualquer outra forma de 
                          comunicação fora do servidor oficial <strong>não são considerados canais oficiais</strong> e não geram 
                          obrigações contratuais.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          3.3 — Responsabilidade do Cliente
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          O cliente é responsável por fornecer informações <strong>claras, completas e objetivas</strong> sobre o projeto. 
                          Informações incompletas ou incorretas podem afetar o escopo, prazo e valor final do projeto.
                        </p>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-xl p-5">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-red-800 dark:text-red-300 m-0 mb-2 flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            3.4 — Tickets Inativos
                          </h4>
                          <p className="text-red-700 dark:text-red-400 text-sm m-0">
                            Tickets sem resposta do cliente por mais de <strong>48 horas</strong> poderão ser encerrados automaticamente, 
                            sem aviso adicional. Recomendamos manter comunicação ativa durante o desenvolvimento do projeto.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 4. Orçamento e Escopo */}
                <section id="orcamento" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-purple-500 uppercase tracking-wider">Seção 4</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Orçamento e Escopo
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          4.1 — Definição de Escopo
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                          Todo projeto possui um <strong>escopo definido</strong> com base nas informações fornecidas pelo cliente. 
                          O escopo inclui:
                        </p>
                        <ul className="space-y-2 m-0">
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Lista de funcionalidades a serem desenvolvidas
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Especificações técnicas do projeto
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Prazo estimado de entrega
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Valor total acordado
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          4.2 — Mudanças de Escopo
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                          Alterações fora do escopo acordado caracterizam <strong>mudança de escopo</strong> e poderão gerar novo orçamento. 
                          São consideradas mudanças de escopo:
                        </p>
                        <ul className="space-y-2 m-0">
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            Adição de novas funcionalidades não previstas
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            Alterações estruturais no projeto
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            Mudança de tecnologias ou plataformas
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            Integrações adicionais não acordadas
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          4.3 — Ajustes vs. Mudanças
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                          <strong>Ajustes</strong> se limitam a correções e refinamentos dentro do escopo aprovado:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <h5 className="font-semibold text-green-800 dark:text-green-300 m-0 mb-2">✓ Ajustes (incluídos)</h5>
                            <ul className="text-sm text-green-700 dark:text-green-400 space-y-1 m-0">
                              <li>Correção de bugs</li>
                              <li>Refinamentos visuais menores</li>
                              <li>Ajustes de textos</li>
                              <li>Melhorias de performance</li>
                            </ul>
                          </div>
                          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                            <h5 className="font-semibold text-red-800 dark:text-red-300 m-0 mb-2">✗ Mudanças (novo orçamento)</h5>
                            <ul className="text-sm text-red-700 dark:text-red-400 space-y-1 m-0">
                              <li>Novas funcionalidades</li>
                              <li>Redesign completo</li>
                              <li>Novas integrações</li>
                              <li>Alterações estruturais</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 5. Prazos */}
                <section id="prazos" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Seção 5</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Prazos de Entrega
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          5.1 — Estimativas de Prazo
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          Os prazos informados são <strong>estimativas</strong> e podem variar conforme a complexidade do projeto, 
                          tempo de resposta do cliente e fatores técnicos imprevistos.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          5.2 — Início da Contagem
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                          A contagem de prazo inicia <strong>somente após</strong>:
                        </p>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center text-white font-bold text-sm">1</div>
                            <span className="text-gray-700 dark:text-gray-300">Escopo aprovado pelo cliente</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center text-white font-bold text-sm">2</div>
                            <span className="text-gray-700 dark:text-gray-300">Pagamento confirmado</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center text-white font-bold text-sm">3</div>
                            <span className="text-gray-700 dark:text-gray-300">Todas as informações necessárias fornecidas</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-5">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800 dark:text-amber-300 m-0 mb-2 flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            5.3 — Atrasos por Falta de Resposta
                          </h4>
                          <p className="text-amber-700 dark:text-amber-400 text-sm m-0">
                            Atrasos causados por falta de resposta do cliente <strong>não são de responsabilidade</strong> da Varejo Code. 
                            O prazo pode ser estendido proporcionalmente ao tempo de inatividade do cliente.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 6. Pagamento */}
                <section id="pagamento" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-green-500 uppercase tracking-wider">Seção 6</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Pagamento
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          6.1 — Forma de Pagamento
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                          O pagamento é realizado de forma <strong>antecipada</strong>, conforme valor acordado no ticket. 
                          Aceitamos as seguintes formas de pagamento:
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                            💰 PIX (Instantâneo)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          6.2 — Início do Desenvolvimento
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          O início do desenvolvimento ocorre <strong>somente após a confirmação do pagamento</strong>. 
                          Nosso sistema de bot no Discord confirma automaticamente os pagamentos via PIX.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          6.3 — Plataformas de Pagamento
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          A Varejo Code pode utilizar <strong>plataformas de pagamento terceirizadas</strong> para processar transações 
                          PIX de forma segura e automatizada.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                </section>

                {/* 7. Planos de Contratação */}
                <section id="planos" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Seção 7</span>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                        Planos de Contratação
                      </h2>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    A Varejo Code oferece dois modelos de contratação para atender diferentes necessidades:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Plano Hospedado */}
                    <div className="bg-white dark:bg-discord-dark rounded-xl border-2 border-black dark:border-white overflow-hidden">
                      <div className="p-5 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white dark:bg-black flex items-center justify-center">
                            <Package className="w-5 h-5 text-black dark:text-white" />
                          </div>
                          <div>
                            <span className="text-xs text-gray-300 dark:text-gray-600 uppercase tracking-wider">Recomendado</span>
                            <h4 className="font-bold text-white dark:text-black m-0">Plano Hospedado</h4>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 m-0">
                          Praticidade total — nós cuidamos de tudo para você.
                        </p>
                        <ul className="space-y-3 m-0">
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            Hospedagem completa incluída
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            Suporte técnico contínuo e ilimitado
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            Manutenções e correções gratuitas
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            Monitoramento 24/7
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            Atualizações incluídas
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            Código-fonte não incluído
                          </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Modelo de pagamento:</span>
                          <p className="text-sm font-medium text-gray-900 dark:text-white m-0">
                            Setup (negociável) + Mensalidade
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Plano Source */}
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 bg-gradient-to-r from-gray-700 to-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                            <Code className="w-5 h-5 text-gray-900" />
                          </div>
                          <div>
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Controle total</span>
                            <h4 className="font-bold text-white m-0">Plano Source</h4>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 m-0">
                          Projeto 100% seu, sem compromissos mensais.
                        </p>
                        <ul className="space-y-3 m-0">
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            Código-fonte 100% seu
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            Controle completo do projeto
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            Hospede onde preferir
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            Documentação técnica completa
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            Hospedagem não incluída
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            Suporte contínuo não incluído
                          </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Modelo de pagamento:</span>
                          <p className="text-sm font-medium text-gray-900 dark:text-white m-0">
                            Pagamento único (negociável)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl p-5">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 m-0 mb-2">Migração entre Planos</h4>
                        <p className="text-blue-700 dark:text-blue-400 text-sm m-0">
                          É possível migrar do <strong>Plano Hospedado</strong> para o <strong>Plano Source</strong> a qualquer momento, 
                          pagando a diferença de valor. Consulte nossa equipe para mais detalhes.
                        </p>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 8. Reembolso e Cancelamento */}
                <section id="reembolso" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/25">
                        <RefreshCcw className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">Seção 8</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Reembolso e Cancelamento
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-xl p-5">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-red-800 dark:text-red-300 m-0 mb-2 flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            8.1 — Política de Não Reembolso
                          </h4>
                          <p className="text-red-700 dark:text-red-400 text-sm m-0">
                            <strong>Não há reembolso</strong> após o início do desenvolvimento do projeto. Esta política existe 
                            pois recursos já foram alocados e trabalho já foi realizado.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          8.2 — Análise de Reembolso Excepcional
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          Caso o projeto <strong>ainda não tenha sido iniciado</strong>, o reembolso poderá ser analisado de forma 
                          excepcional. Cada caso será avaliado individualmente pela equipe.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          8.3 — Abandono do Projeto
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          O abandono do projeto por parte do cliente resultará no <strong>encerramento do atendimento sem reembolso</strong>. 
                          Considera-se abandono a falta de comunicação por período superior a 7 dias após notificações da equipe.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          8.4 — Cancelamento de Mensalidade (Plano Hospedado)
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          No <strong>Plano Hospedado</strong>, o cliente pode cancelar a mensalidade a qualquer momento, sem multas. 
                          Ao cancelar, o serviço de hospedagem será desativado. O cliente pode retornar quando desejar ou migrar 
                          para o Plano Source pagando a diferença.
                        </p>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 9. Entrega e Revisões */}
                <section id="entrega" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-teal-500 uppercase tracking-wider">Seção 9</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Entrega e Revisões
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          9.1 — Entrega Conforme Escopo
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          A entrega será realizada <strong>conforme o escopo acordado</strong>. Entregas podem ser feitas de forma 
                          parcial (em etapas) ou completa, dependendo da natureza e tamanho do projeto.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          9.2 — Período de Revisão
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                          O cliente terá um período para revisar o material entregue e solicitar ajustes dentro do escopo. 
                          Durante este período:
                        </p>
                        <ul className="space-y-2 m-0">
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Teste todas as funcionalidades
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Reporte bugs ou problemas encontrados
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            Solicite ajustes dentro do escopo
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          9.3 — Aprovação Final
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          Após a <strong>aprovação final</strong> do cliente, o projeto é considerado concluído e o ticket será 
                          encerrado. Quaisquer modificações após este ponto serão tratadas como novo projeto ou manutenção 
                          (conforme o plano contratado).
                        </p>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 10. Propriedade Intelectual */}
                <section id="propriedade" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/25">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider">Seção 10</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Propriedade Intelectual
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-5">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800 dark:text-amber-300 m-0 mb-2 flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            10.1 — Código-Fonte no Plano Hospedado
                          </h4>
                          <p className="text-amber-700 dark:text-amber-400 text-sm m-0">
                            Salvo acordo explícito em contrário, o código-fonte <strong>NÃO é entregue</strong> ao cliente no 
                            Plano Hospedado. O cliente adquire apenas o direito de uso do produto final entregue.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          10.2 — Direito de Uso
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          O cliente adquire o <strong>direito de uso</strong> do produto final entregue, podendo utilizá-lo para 
                          os fins acordados. Este direito é pessoal e intransferível, salvo acordo prévio.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          10.3 — Propriedade da Varejo Code
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          A Varejo Code mantém a <strong>propriedade intelectual</strong> do código, estruturas internas, 
                          métodos e soluções utilizadas no desenvolvimento (exceto no Plano Source, onde o código é transferido).
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          10.4 — Reutilização de Conhecimento
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          A Varejo Code poderá reutilizar <strong>estruturas internas, padrões de código e conhecimentos técnicos</strong> 
                          em outros projetos. Isso não inclui dados ou informações específicas do cliente.
                        </p>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 11. Responsabilidades do Cliente */}
                <section id="responsabilidades-cliente" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Seção 11</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Responsabilidades do Cliente
                        </h2>
                      </div>
                    </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    O cliente se compromete a cumprir as seguintes responsabilidades durante todo o processo:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 mb-1">Informações Corretas</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                            Fornecer informações corretas e completas sobre o projeto e suas necessidades.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 mb-1">Respostas em Tempo Hábil</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                            Responder dentro de prazos razoáveis às solicitações da equipe.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 mb-1">Teste e Validação</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                            Testar e validar o material entregue dentro do período de revisão.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 mb-1">Uso Legal</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                            Garantir que o uso do projeto não viole leis, direitos de terceiros ou termos de plataformas externas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 12. Limitação de Responsabilidade */}
                <section id="limitacao" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center shadow-lg shadow-gray-500/25">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Seção 12</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Limitação de Responsabilidade
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          12.1 — Isenção de Responsabilidade
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                          A Varejo Code <strong>não se responsabiliza</strong> por:
                        </p>
                        <ul className="space-y-3 m-0">
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Uso indevido</strong> do produto entregue pelo cliente ou terceiros</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Falhas causadas por serviços de terceiros</strong> (APIs, servidores, provedores)</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Mudanças em APIs, plataformas ou políticas externas</strong> após a entrega</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Perdas financeiras</strong> decorrentes do uso ou não uso do projeto</span>
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Danos indiretos</strong> ou consequenciais de qualquer natureza</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-5">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800 dark:text-amber-300 m-0 mb-2 flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            12.2 — Sem Garantia de Resultados
                          </h4>
                          <p className="text-amber-700 dark:text-amber-400 text-sm m-0">
                            Não há garantia de <strong>resultados comerciais, financeiros ou de performance</strong>. O sucesso do 
                            projeto depende de diversos fatores externos ao desenvolvimento.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 13. Encerramento do Atendimento */}
                <section id="encerramento" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25">
                        <XCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">Seção 13</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Encerramento do Atendimento
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          13.1 — Direito de Encerramento
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                          A Varejo Code reserva-se o direito de <strong>encerrar atendimentos</strong> unilateralmente em caso de:
                        </p>
                        <ul className="space-y-3 m-0">
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            Descumprimento destes termos de serviço
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            Comunicação abusiva, agressiva ou desrespeitosa
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            Tentativas de fraude ou má-fé
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            Solicitação de projetos ilegais ou antiéticos
                          </li>
                          <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            Inatividade prolongada sem justificativa
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-xl p-5">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-red-800 dark:text-red-300 m-0 mb-2 flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            13.2 — Consequências do Encerramento
                          </h4>
                          <p className="text-red-700 dark:text-red-400 text-sm m-0">
                            O encerramento do atendimento <strong>não gera obrigação de reembolso</strong>, salvo decisão interna 
                            da equipe. Qualquer trabalho já realizado permanece de propriedade da Varejo Code.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* 14. Disposições Finais */}
                <section id="disposicoes" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-500/25">
                        <Scale className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Seção 14</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Disposições Finais
                        </h2>
                      </div>
                    </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          14.1 — Atualizações dos Termos
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          Estes termos podem ser <strong>atualizados a qualquer momento</strong> sem aviso prévio. 
                          Recomendamos verificar periodicamente esta página para estar ciente de eventuais alterações.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          14.2 — Concordância Automática
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          A continuidade do uso da plataforma após alterações nos termos implica em 
                          <strong>concordância automática</strong> com as novas condições.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          14.3 — Canal de Dúvidas
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          Em caso de dúvidas sobre estes termos, utilize <strong>exclusivamente os canais oficiais</strong> de 
                          atendimento no servidor do Discord.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                          <Hash className="w-4 h-4 text-discord-blurple" />
                          14.4 — Legislação Aplicável
                        </h4>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-700 dark:text-gray-300 m-0">
                          Estes termos são regidos pela <strong>legislação brasileira</strong>. Qualquer disputa será resolvida 
                          no foro da comarca de domicílio da Varejo Code.
                        </p>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                </section>

                {/* Rodapé dos Termos */}
                <section className="border-t border-gray-200 dark:border-gray-700 pt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-discord-blurple to-purple-600 mb-6 shadow-xl shadow-discord-blurple/30">
                      <Code className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      VAREJO CODE
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                      Desenvolvimento ágil. Resultado real.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                      <a
                        href={URLS.DISCORD_INVITE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-discord-blurple hover:bg-discord-blurple-dark text-white font-semibold rounded-xl transition-colors shadow-lg shadow-discord-blurple/25"
                      >
                        <DiscordIcon className="w-5 h-5" />
                        Entrar no Discord
                      </a>
                      <a
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-colors"
                      >
                        <Globe className="w-5 h-5" />
                        Voltar ao Início
                      </a>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ao usar nossos serviços, você concorda com estes termos. <br className="hidden sm:block" />
                      Dúvidas? Entre em contato pelo nosso Discord.
                    </p>
                  </motion.div>
                </section>
              </div>
            </motion.main>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-discord-blurple hover:bg-discord-blurple-dark text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
