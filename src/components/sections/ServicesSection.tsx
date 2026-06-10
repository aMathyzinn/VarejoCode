"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Globe, 
  Smartphone, 
  Monitor, 
  Code, 
  Zap, 
  Palette, 
  Settings,
  ArrowRight
} from "lucide-react";
import { DiscordIcon } from "@/components/icons";
import { URLS } from "@/lib/constants";
import { useWaterTransition } from "@/components/WaterTransition";

const services = [
  {
    icon: Bot,
    title: "Bots Discord",
    description: "Bots personalizados com comandos, moderação automática, economia virtual, sistemas de níveis e muito mais.",
    color: "from-discord-blurple to-blue-600",
    examples: ["Moderação", "Música", "Economia", "RPG", "Tickets"],
    ctaLabel: "Pedir orçamento de bot",
    featured: true,
  },
  {
    icon: Globe,
    title: "Sites & Landing Pages",
    description: "Sites institucionais, e-commerce, portfólios e landing pages com design moderno e responsivo.",
    color: "from-blue-500 to-cyan-500",
    examples: ["E-commerce", "Institucional", "Portfólio", "Blog"],
    ctaLabel: "Quero um site",
    featured: true,
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Apps nativos e híbridos para Android e iOS com interface intuitiva e performance otimizada.",
    color: "from-green-500 to-emerald-500",
    examples: ["Android", "iOS", "React Native", "Flutter"],
    ctaLabel: "Quero um app mobile",
    featured: false,
  },
  {
    icon: Monitor,
    title: "Sistemas Desktop",
    description: "Aplicações desktop multiplataforma para Windows, Mac e Linux com Electron ou nativas.",
    color: "from-purple-500 to-violet-500",
    examples: ["Windows", "MacOS", "Linux", "Electron"],
    ctaLabel: "Quero um app desktop",
    featured: false,
  },
  {
    icon: Code,
    title: "Automações Python",
    description: "Scripts de automação, web scraping, análise de dados, bots para WhatsApp/Telegram e APIs.",
    color: "from-yellow-500 to-orange-500",
    examples: ["Web Scraping", "APIs", "Automação", "Bots"],
    ctaLabel: "Quero uma automação",
    featured: true,
  },
  {
    icon: Zap,
    title: "Desenvolvimento Web",
    description: "Aplicações web full-stack com React, Next.js, Node.js e TypeScript de alta performance.",
    color: "from-amber-500 to-yellow-600",
    examples: ["React", "Next.js", "Node.js", "TypeScript"],
    ctaLabel: "Quero um sistema web",
    featured: false,
  },
  {
    icon: Palette,
    title: "Design & Identidade",
    description: "Criação de logos, identidade visual completa, UI/UX design e artes para redes sociais.",
    color: "from-pink-500 to-rose-500",
    examples: ["Logo", "UI/UX", "Branding", "Social Media"],
    ctaLabel: "Quero um design",
    featured: false,
  },
  {
    icon: Settings,
    title: "Soluções Customizadas",
    description: "Integrações com APIs, webhooks, dashboards personalizados e qualquer solução sob medida.",
    color: "from-gray-600 to-slate-700",
    examples: ["Integrações", "Dashboards", "APIs", "Custom"],
    ctaLabel: "Solicitar orçamento",
    featured: false,
  },
];

export default memo(function ServicesSection() {
  const { triggerTransition } = useWaterTransition();
  return (
    <section id="servicos" className="section-padding bg-gray-50 dark:bg-discord-darker relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-discord-blurple/5 via-transparent to-discord-blurple/5"
        />
      </div>

      <div className="container-max relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm font-semibold mb-4">
            O que desenvolvemos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Serviços Oferecidos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Soluções completas de desenvolvimento para todas as suas necessidades
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* Featured Badge */}
              {service.featured && (
                <div className="absolute -top-3 -right-3 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                    ⭐ Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <div className="relative h-full bg-white dark:bg-discord-dark rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 overflow-hidden group-hover:-translate-y-2 flex flex-col">
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Animated Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className={`w-full h-full bg-gradient-to-br ${service.color} rounded-full blur-2xl`} />
                </div>
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.examples.map((example, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {example}
                    </span>
                  ))}
                </div>

                {/* Individual CTA */}
                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                  <motion.button
                    onClick={triggerTransition}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <DiscordIcon className="w-4 h-4" />
                    {service.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 rounded-2xl p-8 md:p-10 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
              }} />
            </div>

            <div className="relative text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-black mb-4">
                Não encontrou o que precisa?
              </h3>
              <p className="text-white/90 dark:text-black/80 mb-6 max-w-2xl mx-auto text-lg">
                Desenvolvemos <span className="font-bold underline decoration-2 underline-offset-4">qualquer tipo de projeto</span> sob demanda. 
                Entre em contato e receba um orçamento personalizado em até 24h!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={triggerTransition}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white dark:bg-black text-black dark:text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <DiscordIcon className="w-6 h-6" />
                  Solicitar Orçamento Gratuito
                </motion.button>
                <div className="flex items-center gap-2 text-white/80 dark:text-black/70 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Respondemos em até 24h</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
