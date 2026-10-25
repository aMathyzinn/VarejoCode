"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { DiscordIcon, CheckCircleIcon } from "@/components/icons";
import { useWaterTransition } from "@/components/WaterTransition";
import { URLS } from "@/lib/constants";

export default memo(function CTASection() {
  const { triggerTransition } = useWaterTransition();

  return (
    <section className="section-padding bg-gray-50 dark:bg-discord-darker relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-discord-blurple/10 via-transparent to-brand-accent/10" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-discord-blurple/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Orçamento gratuito em até 24h</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Pronto para começar{" "}
            <span className="gradient-text">seu projeto</span>?
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 max-w-xl mx-auto">
            Entre no Discord, descreva o que você precisa e receba um orçamento com escopo, prazo e valor em até 24h. Sem cadastro, sem cartão, sem compromisso.
          </p>

          {/* Urgency */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Vagas limitadas por mês — atendemos projetos por ordem de chegada
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={triggerTransition}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group btn-primary text-lg flex items-center gap-3 px-8 py-4 cursor-pointer"
            >
              <DiscordIcon className="w-6 h-6" />
              Pedir Orçamento Grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Alternative Contact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Prefere e-mail?
            </p>
            <a 
              href="mailto:project@varejocode.com.br"
              className="inline-flex items-center gap-2 text-base font-semibold text-black dark:text-white hover:underline hover:text-discord-blurple dark:hover:text-discord-blurple transition-colors"
            >
              📧 project@varejocode.com.br
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10 text-sm text-gray-500 dark:text-gray-400"
          >
            <span className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-discord-green" />
              Orçamento 100% gratuito
            </span>
            <span className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-discord-green" />
              Sem compromisso de contratação
            </span>
            <span className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-discord-green" />
              Resposta em até 24h
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});
