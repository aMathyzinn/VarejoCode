"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, X, Cloud, Code, ArrowRight } from "lucide-react";
import { useWaterTransition } from "@/components/WaterTransition";
import { URLS } from "@/lib/constants";

const plans = [
  {
    name: "Plano Hospedado",
    subtitle: "Praticidade total",
    icon: Cloud,
    popular: true,
    savings: "Até 70% mais barato",
    priceType: "variable",
    priceExample: "A partir de R$ 297",
    priceNote: "+ mensalidade a partir de R$ 49/mês",
    description: "Entrada acessível + mensalidade. Hospedagem, suporte e manutenção inclusos.",
    features: [
      { text: "Hospedagem completa incluída", included: true },
      { text: "Suporte técnico contínuo", included: true },
      { text: "Manutenções gratuitas", included: true },
      { text: "Monitoramento 24/7", included: true },
      { text: "Atualizações incluídas", included: true },
      { text: "Acesso ao código-fonte", included: false },
    ],
    color: "from-black to-gray-800",
    cta: "Solicitar Orçamento",
  },
  {
    name: "Plano Source",
    subtitle: "Controle total",
    icon: Code,
    popular: false,
    savings: null,
    priceType: "variable",
    priceExample: "A partir de R$ 597",
    priceNote: "pagamento único, sem mensalidade",
    description: "Pagamento único. Código-fonte 100% seu, hospede onde quiser.",
    features: [
      { text: "Código-fonte 100% seu", included: true },
      { text: "Controle completo do projeto", included: true },
      { text: "Hospeda onde quiser", included: true },
      { text: "Documentação técnica completa", included: true },
      { text: "Hospedagem incluída", included: false },
      { text: "Suporte contínuo", included: false },
    ],
    color: "from-gray-700 to-gray-900",
    cta: "Solicitar Orçamento",
  },
];

const comparisonData = [
  { feature: "Investimento inicial", hosted: "A partir de R$ 297", source: "A partir de R$ 597", highlight: false },
  { feature: "Mensalidade", hosted: "A partir de R$ 49/mês", source: "Não tem", highlight: false },
  { feature: "Código-fonte", hosted: "Não incluído", source: "100% seu", highlight: false },
  { feature: "Hospedagem", hosted: "✅ Incluída", source: "Você escolhe onde", highlight: false },
  { feature: "Suporte", hosted: "Ilimitado (4h resposta)", source: "30 dias pós-entrega", highlight: false },
  { feature: "Manutenções & bugs", hosted: "✅ Gratuitas", source: "Orçadas separado", highlight: false },
  { feature: "Revisões", hosted: "✅ Ilimitadas", source: "3 rodadas inclusas", highlight: false },
  { feature: "Prazo médio de entrega", hosted: "7 a 15 dias úteis", source: "7 a 15 dias úteis", highlight: false },
  { feature: "Nota fiscal", hosted: "✅ Emitida", source: "✅ Emitida", highlight: false },
  { feature: "Cancelamento", hosted: "Sem multa, a qualquer momento", source: "Não aplicável", highlight: false },
  { feature: "Migração entre planos", hosted: "Pode migrar pro Source", source: "Pode contratar suporte", highlight: false },
  { feature: "Ideal para", hosted: "Quem quer praticidade", source: "Quem quer controle total", highlight: false },
];

const priceExamples = [
  { project: "Bot Discord simples", hosted: "R$ 80 + R$ 30/mês", source: "R$ 150", time: "2-3 dias" },
  { project: "Landing Page", hosted: "R$ 297 + R$ 49/mês", source: "R$ 597", time: "3-5 dias" },
  { project: "Site institucional (5 pág.)", hosted: "R$ 497 + R$ 65/mês", source: "R$ 997", time: "7-10 dias" },
  { project: "E-commerce básico", hosted: "R$ 797 + R$ 99/mês", source: "R$ 1.597", time: "15-20 dias" },
  { project: "App mobile (Android)", hosted: "R$ 1.297 + R$ 149/mês", source: "R$ 2.597", time: "30-45 dias" },
  { project: "Automação Python", hosted: "R$ 197 + R$ 39/mês", source: "R$ 397", time: "2-5 dias" },
];

export default memo(function PricingSection() {
  const { triggerTransition } = useWaterTransition();

  return (
    <section id="planos" className="section-padding bg-white dark:bg-discord-darkest relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-discord-blurple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />
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
            Preços Transparentes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Modelos de Contratação
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta às suas necessidades
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                    ⭐ Mais Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <div className={`relative h-full bg-white dark:bg-discord-dark rounded-2xl p-8 border-2 flex flex-col ${
                plan.popular 
                  ? "border-black dark:border-white shadow-xl shadow-black/10 dark:shadow-white/10" 
                  : "border-gray-200 dark:border-gray-800 shadow-lg"
              }`}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg`}>
                    <plan.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {plan.subtitle}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="mb-2">
                    <span className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
                      Preço Base
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {plan.priceExample}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{plan.priceNote}</p>
                  {plan.savings && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-discord-green/10 border border-discord-green/20 mb-3">
                      <span className="text-xs font-bold text-discord-green">💰 {plan.savings}</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-discord-green/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-discord-green" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <X className="w-3 h-3 text-red-500" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  onClick={triggerTransition}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all mt-auto cursor-pointer ${
                    plan.popular
                      ? "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                      : "border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Price Examples Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Exemplos de Preços por Projeto
          </h3>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8">Valores reais praticados — projetos complexos podem variar</p>

          <div className="bg-white dark:bg-discord-dark rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-discord-darker">
                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Tipo de Projeto</th>
                    <th className="px-5 py-4 text-center text-sm font-semibold text-black dark:text-white">
                      <div className="flex items-center justify-center gap-1.5"><Cloud className="w-4 h-4" />Hospedado</div>
                    </th>
                    <th className="px-5 py-4 text-center text-sm font-semibold text-black dark:text-white">
                      <div className="flex items-center justify-center gap-1.5"><Code className="w-4 h-4" />Source</div>
                    </th>
                    <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Prazo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {priceExamples.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-discord-darker/50 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{row.project}</td>
                      <td className="px-5 py-4 text-sm text-center text-gray-700 dark:text-gray-300 font-semibold">{row.hosted}</td>
                      <td className="px-5 py-4 text-sm text-center text-gray-700 dark:text-gray-300 font-semibold">{row.source}</td>
                      <td className="px-5 py-4 text-sm text-center text-gray-500 dark:text-gray-400">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">* Valores de referência. Orçamento final definido após análise do escopo no Discord.</p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Comparação Detalhada
          </h3>
          
          <div className="bg-white dark:bg-discord-dark rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-discord-darker">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Característica
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-black dark:text-white">
                      <div className="flex items-center justify-center gap-2">
                        <Cloud className="w-4 h-4" />
                        Hospedado
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-black dark:text-white">
                      <div className="flex items-center justify-center gap-2">
                        <Code className="w-4 h-4" />
                        Source
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-discord-darker/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600 dark:text-gray-400">
                        {row.hosted}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600 dark:text-gray-400">
                        {row.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Nota */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8 max-w-3xl mx-auto"
        >
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
              💡 Como funciona o orçamento?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Os preços acima são referências base. Projetos com mais funcionalidades, integrações ou design personalizado podem ter valor diferente. 
              Entre no Discord, descreva seu projeto e receba um orçamento detalhado e sem compromisso em até 24h. 
              <strong className="text-gray-700 dark:text-gray-300">Orçamento gratuito, sem cartão de crédito.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
