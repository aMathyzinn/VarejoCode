"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const traditional = [
  { text: "Cadastros complexos", icon: "❌" },
  { text: "Verificação de documentos", icon: "📋" },
  { text: "Taxas de 10-20% por projeto", icon: "💸" },
  { text: "Contas VIP caras", icon: "👑" },
  { text: "Preços inflacionados", icon: "📈" },
];

const varejocode = [
  { text: "Entre direto no Discord", icon: "🚀" },
  { text: "Zero burocracia", icon: "✨" },
  { text: "Sem taxas por projeto", icon: "🎯" },
  { text: "Pagamento direto via PIX", icon: "⚡" },
  { text: "Preços até 70% menores", icon: "💰" },
];

export default memo(function ComparisonSection() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-discord-darker relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235865F2' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }} />
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Por que escolher a{" "}
            <span className="gradient-text">VarejoCode</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sem burocracia, sem taxas abusivas, sem intermediários caros
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto md:items-stretch md:auto-rows-fr">
          {/* Traditional Platforms */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-white dark:bg-discord-dark rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col w-full h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Plataformas Tradicionais
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    99Freelas, Workana, etc.
                  </p>
                </div>
              </div>

              <ul className="space-y-4 flex-grow">
                {traditional.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 group p-3 rounded-lg bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800/30 transition-all duration-300"
                  >
                    <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-red-700 dark:text-red-400 font-medium">{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Price Example */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-8 p-5 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Exemplo: Website</p>
                  <span className="text-xs bg-red-200 dark:bg-red-800/40 px-2 py-1 rounded-full text-red-700 dark:text-red-300">Caro</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  R$ 1.200
                </p>
                <p className="text-sm text-red-500 font-medium">+ 15% de taxa (R$ 180)</p>
                <div className="mt-3 pt-3 border-t-2 border-red-300 dark:border-red-700">
                  <p className="text-base text-gray-700 dark:text-gray-300 font-semibold">Total: <span className="text-2xl font-bold text-red-600 dark:text-red-500">R$ 1.380</span></p>
                </div>
                <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800/30 -mx-5 -mb-5 px-5 pb-5 rounded-b-xl bg-red-50/50 dark:bg-red-900/10">
                  <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-2">⚠️ Custos extras:</p>
                  <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      Cobrança por cada alteração
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      Suporte técnico adicional pago
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      Manutenção mensal obrigatória
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* VarejoCode */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-discord-blurple/20 to-brand-accent/20 rounded-2xl blur-xl" />
            <div className="relative bg-white dark:bg-discord-dark rounded-2xl p-8 border-2 border-black dark:border-white shadow-xl shadow-black/10 dark:shadow-white/10 flex flex-col w-full h-full">
              {/* Popular Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-black dark:bg-white text-white dark:text-black text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                  ⭐ Recomendado
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Check className="w-6 h-6 text-black dark:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    VarejoCode
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Desenvolvimento via Discord
                  </p>
                </div>
              </div>

              <ul className="space-y-4 flex-grow">
                {varejocode.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="relative flex items-center gap-3 group p-3 rounded-lg bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-900/10 dark:to-blue-900/10 border border-green-200/50 dark:border-green-700/20 hover:border-green-300 dark:hover:border-green-600/40 hover:shadow-lg hover:shadow-green-500/20 dark:hover:shadow-green-500/10 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-blue-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform relative z-10">
                      {item.icon}
                    </div>
                    <span className="text-gray-800 dark:text-gray-200 font-semibold relative z-10 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">{item.text}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Price Example */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8 p-5 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border-2 border-green-300 dark:border-green-700/50 shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Exemplo: Website</p>
                  <span className="text-xs bg-green-200 dark:bg-green-800/60 px-2 py-1 rounded-full text-green-700 dark:text-green-300 font-bold">💰 Econômico</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="text-3xl font-bold text-black dark:text-white">
                    R$ 497
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400">+ R$ 65/mês</p>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Zero taxas extras!
                </p>
                <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800/30 -mx-5 -mb-5 px-5 pb-5 rounded-b-xl bg-green-50/30 dark:bg-green-900/10">
                  <p className="text-sm font-bold text-green-700 dark:text-green-300 mb-1">💰 Você economiza:</p>
                  
                  {/* Valor com brush stroke background */}
                  <div className="relative inline-block">
                    {/* Brush stroke SVG */}
                    <svg 
                      className="absolute inset-0 w-full h-full -z-0"
                      viewBox="0 0 200 60" 
                      preserveAspectRatio="none"
                      style={{ 
                        left: '-8px', 
                        right: '-8px', 
                        width: 'calc(100% + 16px)',
                        top: '-4px',
                        height: 'calc(100% + 8px)'
                      }}
                    >
                      <path 
                        d="M5,30 Q10,20 25,25 T50,30 Q75,35 100,28 T150,32 Q170,28 195,30" 
                        fill="none" 
                        stroke="#22c55e" 
                        strokeWidth="40" 
                        strokeLinecap="round"
                        opacity="0.25"
                      />
                    </svg>
                    <p className="text-2xl font-black text-green-600 dark:text-green-400 relative z-10 px-2">R$ 883</p>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 mb-3">Em comparação com plataformas tradicionais</p>
                  
                  <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">✨ Incluso no preço:</p>
                  <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Alterações ilimitadas sem custo extra
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Suporte direto via Discord 24/7
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Hospedagem e domínio inclusos
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-400 dark:text-gray-600 mt-10 max-w-2xl mx-auto"
        >
          * Taxas de 10–20% baseadas nas comissões cobradas por plataformas como Workana (15%) e GetNinjas (15–20%) em dezembro de 2024.
          A estimativa de economia de até 70% considera projetos simples comparados com cotações médias nessas plataformas.
          Valores podem variar conforme o escopo do projeto.
        </motion.p>
      </div>
    </section>
  );
});
