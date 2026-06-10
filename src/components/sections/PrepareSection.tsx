"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Circle,
  MessageSquare,
  Palette,
  Clock,
  DollarSign,
  Target,
  ArrowRight,
} from "lucide-react";
import { useWaterTransition } from "@/components/WaterTransition";
import { DiscordIcon } from "@/components/icons";

const checklistItems = [
  {
    icon: Target,
    title: "Objetivo do projeto",
    description: "Sabe qual problema quer resolver ou resultado quer atingir?",
    examples: ["Aumentar vendas", "Automatizar processo", "Criar presença online"],
  },
  {
    icon: Palette,
    title: "Referências visuais",
    description: "Tem exemplos de sites/apps que você gosta ou quer algo parecido?",
    examples: ["Cores preferidas", "Sites de referência", "Estilo desejado"],
  },
  {
    icon: MessageSquare,
    title: "Conteúdo e textos",
    description: "Já tem os textos, logo e imagens que precisam aparecer no projeto?",
    examples: ["Textos das páginas", "Logo em PNG/SVG", "Fotos ou ilustrações"],
  },
  {
    icon: Clock,
    title: "Prazo desejado",
    description: "Tem alguma data importante para o projeto estar pronto?",
    examples: ["Lançamento de produto", "Evento agendado", "Sem pressa definida"],
  },
  {
    icon: DollarSign,
    title: "Orçamento em mente",
    description: "Tem noção de quanto pode investir? Isso ajuda a sugerir o melhor plano.",
    examples: ["Plano Hospedado (a partir)", "Plano Source (código)", "Projeto sob demanda"],
  },
];

export default memo(function PrepareSection() {
  const { triggerTransition } = useWaterTransition();

  return (
    <section className="section-padding bg-white dark:bg-discord-darkest relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-100 dark:bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm font-semibold mb-4">
            Antes de pedir orçamento
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Prepare-se para seu projeto
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Quanto mais informações você trouxer, mais rápido e preciso será o orçamento.
            Não se preocupe — você não precisa ter tudo pronto!
          </p>
        </motion.div>

        {/* Checklist */}
        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          {checklistItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-discord-dark border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center mt-0.5">
                <item.icon className="w-5 h-5 text-white dark:text-black" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                    >
                      <Circle className="w-1.5 h-1.5 fill-current" />
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm">
            Mesmo sem tudo pronto, nossa equipe te guia pelo processo 👇
          </p>
          <motion.button
            onClick={triggerTransition}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 btn-primary cursor-pointer"
          >
            <DiscordIcon className="w-5 h-5" />
            Começar meu projeto agora
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-3">
            Orçamento gratuito · Sem compromisso · Resposta em até 24h
          </p>
        </motion.div>
      </div>
    </section>
  );
});
