"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Database, 
  Lock, 
  Share2, 
  Cookie, 
  UserCheck, 
  Bell, 
  Trash2, 
  Scale, 
  ChevronRight,
  ExternalLink,
  Globe,
  Code,
  CheckCircle,
  Info,
  BookOpen,
  Hash,
  ArrowUp,
  Menu,
  X,
  FileCheck,
  ShieldCheck,
  AlertTriangle,
  Mail,
  Server,
  Users,
  Clock,
  FileText,
  Key,
  Fingerprint,
  MessageCircle
} from "lucide-react";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { URLS } from "@/lib/constants";
import { DiscordIcon } from "@/components/icons";

// Estrutura de navegação da política
const sections = [
  { id: "introducao", title: "Introdução", icon: BookOpen, description: "Sobre esta política" },
  { id: "dados-coletados", title: "Dados Coletados", icon: Database, description: "Quais informações coletamos" },
  { id: "uso-dados", title: "Uso dos Dados", icon: Eye, description: "Como utilizamos suas informações" },
  { id: "compartilhamento", title: "Compartilhamento", icon: Share2, description: "Com quem compartilhamos" },
  { id: "armazenamento", title: "Armazenamento", icon: Server, description: "Como armazenamos seus dados" },
  { id: "seguranca", title: "Segurança", icon: Lock, description: "Proteção das informações" },
  { id: "cookies", title: "Cookies", icon: Cookie, description: "Uso de cookies e tecnologias" },
  { id: "direitos", title: "Seus Direitos", icon: UserCheck, description: "Controle sobre seus dados" },
  { id: "retencao", title: "Retenção de Dados", icon: Clock, description: "Tempo de armazenamento" },
  { id: "menores", title: "Menores de Idade", icon: Users, description: "Política para menores" },
  { id: "alteracoes", title: "Alterações", icon: Bell, description: "Atualizações desta política" },
  { id: "contato", title: "Contato", icon: Mail, description: "Como nos contatar" },
];

// Resumo executivo dos pontos principais
const keyPoints = [
  { icon: Database, title: "Dados Mínimos", description: "Coletamos apenas informações essenciais para prestação dos serviços" },
  { icon: Lock, title: "Dados Protegidos", description: "Suas informações são armazenadas com segurança e criptografia" },
  { icon: Share2, title: "Sem Venda de Dados", description: "Nunca vendemos suas informações pessoais a terceiros" },
  { icon: UserCheck, title: "Você no Controle", description: "Você pode solicitar acesso, correção ou exclusão dos seus dados" },
];

// Tipos de dados coletados
const dataTypes = [
  {
    category: "Dados de Identificação",
    icon: Fingerprint,
    color: "from-blue-500 to-blue-600",
    items: [
      "Nome de usuário do Discord",
      "ID do Discord",
      "Avatar (quando disponível)",
      "E-mail (quando fornecido)"
    ]
  },
  {
    category: "Dados de Comunicação",
    icon: MessageCircle,
    color: "from-green-500 to-emerald-600",
    items: [
      "Mensagens em tickets",
      "Histórico de conversas",
      "Arquivos compartilhados",
      "Feedbacks e avaliações"
    ]
  },
  {
    category: "Dados de Projeto",
    icon: Code,
    color: "from-purple-500 to-violet-600",
    items: [
      "Descrição do projeto",
      "Requisitos técnicos",
      "Materiais fornecidos",
      "Preferências de design"
    ]
  },
  {
    category: "Dados de Pagamento",
    icon: Key,
    color: "from-amber-500 to-orange-600",
    items: [
      "Chave PIX utilizada",
      "Comprovantes de pagamento",
      "Histórico de transações",
      "Valores acordados"
    ]
  }
];

export default function PrivacidadePage() {
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
          className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
          style={{ width: `${readProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center"
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
                          ? "bg-green-600 text-white"
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
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-max relative z-10">
          {/* Breadcrumb */}
          <div className="flex justify-center mb-6">
            <Breadcrumb items={[{ label: "Política de Privacidade" }]} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              Proteção de Dados
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Política de Privacidade
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Sua privacidade é importante para nós. Esta política explica como coletamos, 
              usamos e protegemos suas informações pessoais.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-gray-700">
                <FileCheck className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{sections.length} seções</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-gray-700">
                <Eye className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">~8 min de leitura</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 dark:border-green-500/30">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Atualizado: Janeiro 2026</span>
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
              🔒 Resumo dos Pontos Principais
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
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-green-600" />
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
                    <span className="text-xs font-bold text-green-600">{Math.round(readProgress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300"
                      style={{ width: `${readProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Seção {currentSectionIndex + 1} de {sections.length}
                  </p>
                </div>

                <div className="bg-white dark:bg-discord-dark rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-600" />
                    Índice
                  </h3>
                  <nav className="space-y-1 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
                    {sections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-200 group ${
                          activeSection === section.id
                            ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                          activeSection === section.id 
                            ? "bg-white/20 text-white" 
                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-green-500/20 group-hover:text-green-600"
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
                    <ExternalLink className="w-4 h-4 text-green-600" />
                    Links Rápidos
                  </h4>
                  <div className="space-y-2">
                    <a
                      href="/termos"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <Scale className="w-5 h-5 group-hover:text-green-600 transition-colors" />
                      <span className="flex-1">Termos de Serviço</span>
                    </a>
                    <a
                      href={URLS.DISCORD_INVITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <DiscordIcon className="w-5 h-5 group-hover:text-green-600 transition-colors" />
                      <span className="flex-1">Servidor Discord</span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                    <a
                      href="/"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <Globe className="w-5 h-5 group-hover:text-green-600 transition-colors" />
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
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 dark:border-green-500/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Compromisso com sua Privacidade</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      A Varejo Code está comprometida em proteger sua privacidade. Esta política descreve como tratamos suas informações pessoais em conformidade com a LGPD (Lei Geral de Proteção de Dados).
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
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Início</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Introdução
                        </h2>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-discord-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
                        A <strong className="text-gray-900 dark:text-white">Varejo Code</strong> valoriza a privacidade de seus clientes e 
                        visitantes. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações 
                        pessoais quando você utiliza nossos serviços de desenvolvimento de software via Discord.
                      </p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 rounded-xl p-5">
                      <div className="flex gap-3">
                        <Info className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800 dark:text-green-300 m-0 mb-2">Aplicabilidade</h4>
                          <p className="text-green-700 dark:text-green-400 text-sm m-0">
                            Esta política aplica-se a todos os serviços prestados pela Varejo Code, incluindo interações no servidor 
                            Discord, sites desenvolvidos e quaisquer outras plataformas relacionadas aos nossos serviços.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 1. Dados Coletados */}
                <section id="dados-coletados" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <Database className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Seção 1</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Dados Coletados
                        </h2>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      Coletamos apenas os dados necessários para prestar nossos serviços de forma eficiente. 
                      Abaixo estão as categorias de informações que podemos coletar:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {dataTypes.map((type, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          <div className={`h-2 bg-gradient-to-r ${type.color}`} />
                          <div className="p-5">
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                                <type.icon className="w-5 h-5 text-white" />
                              </div>
                              <h4 className="font-bold text-gray-900 dark:text-white m-0">{type.category}</h4>
                            </div>
                            <ul className="space-y-2 m-0">
                              {type.items.map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-5">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800 dark:text-amber-300 m-0 mb-2">Dados Sensíveis</h4>
                          <p className="text-amber-700 dark:text-amber-400 text-sm m-0">
                            <strong>Não coletamos</strong> dados sensíveis como origem racial, convicções religiosas, 
                            opiniões políticas, dados de saúde ou orientação sexual. Evite compartilhar essas informações 
                            em nossos canais de comunicação.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 2. Uso dos Dados */}
                <section id="uso-dados" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-purple-500 uppercase tracking-wider">Seção 2</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Uso dos Dados
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-600" />
                            2.1 — Finalidades do Tratamento
                          </h4>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                            Utilizamos seus dados pessoais para as seguintes finalidades:
                          </p>
                          <ul className="space-y-3 m-0">
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Prestação de serviços:</strong> Desenvolver e entregar os projetos contratados</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Comunicação:</strong> Manter contato durante o desenvolvimento do projeto</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Suporte técnico:</strong> Resolver dúvidas e problemas técnicos</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Processamento de pagamentos:</strong> Gerenciar transações e emitir comprovantes</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Melhoria de serviços:</strong> Analisar feedbacks para aprimorar nossa oferta</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Obrigações legais:</strong> Cumprir exigências fiscais e regulatórias</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-600" />
                            2.2 — Base Legal
                          </h4>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0">
                            O tratamento de seus dados é realizado com base nas seguintes hipóteses legais previstas na LGPD: 
                            <strong> execução de contrato</strong> (quando você contrata nossos serviços), 
                            <strong> legítimo interesse</strong> (para melhorar nossos serviços) e 
                            <strong> cumprimento de obrigação legal</strong> (para fins fiscais e regulatórios).
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 3. Compartilhamento */}
                <section id="compartilhamento" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                        <Share2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Seção 3</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Compartilhamento de Dados
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 rounded-xl p-5">
                        <div className="flex gap-3">
                          <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-green-800 dark:text-green-300 m-0 mb-2">Compromisso de Não Venda</h4>
                            <p className="text-green-700 dark:text-green-400 text-sm m-0">
                              A Varejo Code <strong>NUNCA vende, aluga ou comercializa</strong> suas informações pessoais 
                              a terceiros para fins de marketing ou qualquer outro propósito comercial.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-600" />
                            3.1 — Quando Podemos Compartilhar
                          </h4>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                            Podemos compartilhar seus dados <strong>apenas</strong> nas seguintes situações:
                          </p>
                          <ul className="space-y-3 m-0">
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Processadores de pagamento:</strong> Para processar transações PIX de forma segura</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Serviços de hospedagem:</strong> Para hospedar projetos no Plano Hospedado</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Obrigações legais:</strong> Quando exigido por lei ou ordem judicial</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Com seu consentimento:</strong> Quando você autorizar expressamente</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 4. Armazenamento */}
                <section id="armazenamento" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                        <Server className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wider">Seção 4</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Armazenamento de Dados
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-600" />
                            4.1 — Localização dos Dados
                          </h4>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0">
                            Seus dados são armazenados em servidores seguros localizados no <strong>Brasil</strong> e/ou em 
                            países que ofereçam nível adequado de proteção de dados. As comunicações via Discord são 
                            armazenadas de acordo com a política de privacidade do Discord.
                          </p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-600" />
                            4.2 — Backups
                          </h4>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0">
                            Realizamos backups periódicos dos dados de projetos para garantir a continuidade dos serviços. 
                            Esses backups são protegidos com as mesmas medidas de segurança aplicadas aos dados originais.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 5. Segurança */}
                <section id="seguranca" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-green-500 uppercase tracking-wider">Seção 5</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Segurança dos Dados
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-600" />
                            5.1 — Medidas de Proteção
                          </h4>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                            Implementamos diversas medidas técnicas e organizacionais para proteger seus dados:
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Lock className="w-5 h-5 text-green-500" />
                                <span className="font-semibold text-gray-900 dark:text-white">Criptografia</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                                Dados transmitidos e armazenados com criptografia de ponta a ponta
                              </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Key className="w-5 h-5 text-green-500" />
                                <span className="font-semibold text-gray-900 dark:text-white">Controle de Acesso</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                                Acesso restrito apenas a colaboradores autorizados
                              </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Server className="w-5 h-5 text-green-500" />
                                <span className="font-semibold text-gray-900 dark:text-white">Servidores Seguros</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                                Infraestrutura protegida com firewalls e monitoramento
                              </p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-5 h-5 text-green-500" />
                                <span className="font-semibold text-gray-900 dark:text-white">Boas Práticas</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                                Seguimos padrões de segurança da indústria
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-5">
                        <div className="flex gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-amber-800 dark:text-amber-300 m-0 mb-2">Nenhum Sistema é 100% Seguro</h4>
                            <p className="text-amber-700 dark:text-amber-400 text-sm m-0">
                              Embora nos esforcemos para proteger seus dados, nenhum método de transmissão ou armazenamento 
                              eletrônico é completamente seguro. Não podemos garantir segurança absoluta.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 6. Cookies */}
                <section id="cookies" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                        <Cookie className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Seção 6</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Cookies e Tecnologias Similares
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-600" />
                            6.1 — O que são Cookies
                          </h4>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0">
                            Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita nosso site. 
                            Eles nos ajudam a melhorar sua experiência de navegação e a entender como você interage com nosso conteúdo.
                          </p>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-600" />
                            6.2 — Tipos de Cookies Utilizados
                          </h4>
                        </div>
                        <div className="p-5">
                          <ul className="space-y-3 m-0">
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Cookies essenciais:</strong> Necessários para o funcionamento básico do site</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Cookies de preferências:</strong> Salvam suas configurações (como tema escuro/claro)</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Cookies analíticos:</strong> Nos ajudam a entender como o site é utilizado</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl p-5">
                        <div className="flex gap-3">
                          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 m-0 mb-2">Controle de Cookies</h4>
                            <p className="text-blue-700 dark:text-blue-400 text-sm m-0">
                              Você pode gerenciar ou desativar cookies através das configurações do seu navegador. 
                              Note que desativar cookies pode afetar a funcionalidade do site.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 7. Seus Direitos */}
                <section id="direitos" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                        <UserCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Seção 7</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Seus Direitos (LGPD)
                        </h2>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      De acordo com a Lei Geral de Proteção de Dados (LGPD), você possui os seguintes direitos sobre seus dados pessoais:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                            <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white m-0 mb-1">Acesso</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                              Solicitar confirmação e acesso aos dados que possuímos sobre você
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white m-0 mb-1">Correção</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                              Solicitar a correção de dados incompletos ou desatualizados
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                            <Trash2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white m-0 mb-1">Exclusão</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                              Solicitar a eliminação de dados desnecessários ou tratados irregularmente
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                            <Share2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white m-0 mb-1">Portabilidade</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                              Solicitar a transferência de seus dados para outro fornecedor
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white m-0 mb-1">Informação</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                              Ser informado sobre com quem seus dados são compartilhados
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                            <X className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white m-0 mb-1">Revogação</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                              Revogar consentimento anteriormente fornecido
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 rounded-xl p-5">
                      <div className="flex gap-3">
                        <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800 dark:text-green-300 m-0 mb-2">Como Exercer seus Direitos</h4>
                          <p className="text-green-700 dark:text-green-400 text-sm m-0">
                            Para exercer qualquer um desses direitos, abra um ticket no nosso servidor do Discord 
                            ou entre em contato por e-mail. Responderemos sua solicitação em até 15 dias úteis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 8. Retenção de Dados */}
                <section id="retencao" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-teal-500 uppercase tracking-wider">Seção 8</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Retenção de Dados
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-600" />
                            8.1 — Período de Retenção
                          </h4>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                            Mantemos seus dados pelo tempo necessário para:
                          </p>
                          <ul className="space-y-3 m-0">
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Dados de projetos:</strong> Durante a vigência do projeto + 5 anos após conclusão</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Dados fiscais:</strong> 5 anos (obrigação legal)</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span><strong>Comunicações:</strong> Enquanto o ticket estiver ativo + 1 ano após encerramento</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold text-gray-900 dark:text-white m-0 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-green-600" />
                            8.2 — Exclusão de Dados
                          </h4>
                        </div>
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0">
                            Após o período de retenção, seus dados serão <strong>anonimizados ou excluídos</strong> de forma segura, 
                            exceto quando houver obrigação legal de mantê-los por período maior.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 9. Menores de Idade */}
                <section id="menores" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-pink-500 uppercase tracking-wider">Seção 9</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Menores de Idade
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                            Nossos serviços são destinados a <strong>maiores de 18 anos</strong> ou menores com autorização dos 
                            responsáveis legais. Não coletamos intencionalmente dados de menores de 13 anos.
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 m-0">
                            Se você é pai/mãe ou responsável e acredita que seu filho nos forneceu dados pessoais, 
                            entre em contato imediatamente para que possamos tomar as medidas necessárias.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 10. Alterações */}
                <section id="alteracoes" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/25">
                        <Bell className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider">Seção 10</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Alterações nesta Política
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                            Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas 
                            práticas ou por exigências legais. Quando fizermos alterações significativas:
                          </p>
                          <ul className="space-y-3 m-0">
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              Atualizaremos a data de &quot;última atualização&quot; no topo desta página
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              Poderemos notificar via Discord sobre mudanças importantes
                            </li>
                            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              O uso contínuo dos serviços constitui aceitação das alterações
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 11. Contato */}
                <section id="contato" className="mb-16 scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-500/25">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Seção 11</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                          Contato
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white dark:bg-discord-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-5">
                          <p className="text-gray-700 dark:text-gray-300 m-0 mb-4">
                            Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade 
                            ou ao tratamento de seus dados pessoais, entre em contato conosco:
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <a
                              href={URLS.DISCORD_INVITE}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-4 p-4 bg-discord-blurple/10 rounded-xl hover:bg-discord-blurple/20 transition-colors"
                            >
                              <div className="w-12 h-12 rounded-xl bg-discord-blurple flex items-center justify-center">
                                <DiscordIcon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <span className="block font-semibold text-gray-900 dark:text-white">Discord</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Abra um ticket</span>
                              </div>
                            </a>
                            <a
                              href={`mailto:${URLS.EMAIL}`}
                              className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition-colors"
                            >
                              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
                                <Mail className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <span className="block font-semibold text-gray-900 dark:text-white">E-mail</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{URLS.EMAIL}</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* Rodapé da Política */}
                <section className="border-t border-gray-200 dark:border-gray-700 pt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 mb-6 shadow-xl shadow-green-500/30">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      VAREJO CODE
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                      Sua privacidade é nossa prioridade.
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
                      Dúvidas sobre privacidade? Entre em contato pelo Discord ou e-mail.
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
            className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
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
