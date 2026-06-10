"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Users,
  Zap,
  ShieldCheck,
  TrendingDown,
  MessageCircle,
  DollarSign,
  Wrench,
  Star,
  CheckCircle,
  AlertCircle,
  Heart,
} from "lucide-react";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { URLS } from "@/lib/constants";
import { DiscordIcon } from "@/components/icons";
import { useWaterTransition } from "@/components/WaterTransition";
import Link from "next/link";

const reasons = [
  {
    icon: DollarSign,
    title: "Sem plataforma no meio",
    color: "from-green-500 to-emerald-600",
    description:
      "Em sites como 99Freelas ou Workana, o freelancer paga de 10% a 20% de taxa por projeto — isso vai direto no seu orçamento. Aqui é tudo direto via Discord e PIX. Zero comissão pra terceiro.",
    saving: "Até R$ 200 a menos por projeto",
  },
  {
    icon: Building2,
    title: "Sem escritório nem overhead",
    color: "from-blue-500 to-indigo-600",
    description:
      "Agência tradicional tem aluguel, funcionário CLT, contador, CNPJ grande, marketing caro... tudo isso vai pro seu orçamento. A VarejoCode opera de forma enxuta — equipe remota, sem estrutura pesada.",
    saving: "Estrutura leve = preço leve",
  },
  {
    icon: Users,
    title: "Modelo de assinatura (Plano Hospedado)",
    color: "from-purple-500 to-violet-600",
    description:
      "No Plano Hospedado, você paga um valor menor pra entrar e depois uma mensalidade. Isso permite que a gente cobre menos na largada porque a gente tem receita contínua. Todo mundo ganha.",
    saving: "Entrada mais acessível pra você",
  },
  {
    icon: Zap,
    title: "Processo rápido e direto",
    color: "from-yellow-500 to-orange-500",
    description:
      "Não tem reunião de briefing de 3 horas, proposta em PDF de 20 páginas, revisão de contrato com advogado. É Discord → orçamento → PIX → desenvolvimento. Menos burocracia = menos custo operacional.",
    saving: "Agilidade que reduz custos",
  },
  {
    icon: Wrench,
    title: "Ferramentas modernas e eficientes",
    color: "from-pink-500 to-rose-600",
    description:
      "Usamos tecnologias atuais que permitem desenvolver mais rápido sem abrir mão da qualidade. O que antes levava semanas, hoje leva dias. Eficiência vira preço menor pra você.",
    saving: "Tecnologia moderna = entrega rápida",
  },
];

const myths = [
  {
    myth: "\"Barato assim deve ser código genérico de template\"",
    truth:
      "Cada projeto é desenvolvido do zero, personalizado pra você. Não é WordPress com tema comprado, não é Wix. É código real, na stack certa pra cada necessidade.",
  },
  {
    myth: "\"Vão sumir depois de receber o pagamento\"",
    truth:
      "Operamos com ticket aberto no Discord. Você acompanha tudo em tempo real. No Plano Hospedado, a gente depende da sua mensalidade — sumir não faz sentido pra nenhum dos dois lados.",
  },
  {
    myth: "\"Deve ter alguma pegadinha no contrato\"",
    truth:
      "Sem contrato cheio de letra miúda. Os termos são claros: Plano Hospedado tem mensalidade, Plano Source é pagamento único. Nada de multa escondida, nada de cláusula surpresa.",
  },
  {
    myth: "\"Qualidade baixa pra justificar o preço\"",
    truth:
      "Preço baixo não é sinal de qualidade baixa — é sinal de custo operacional baixo. A entrega é a mesma. O que muda é que você não está pagando pelo escritório de São Paulo nem pela taxa da plataforma.",
  },
];

export default function PorQueBararoPage() {
  const { triggerTransition } = useWaterTransition();
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-discord-darkest pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 animated-gradient opacity-60" />
          <div className="absolute inset-0 noise" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-black/10 dark:bg-white/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-800/10 dark:bg-gray-200/10 rounded-full blur-3xl animate-float-medium" />

          <div className="container-max relative z-10 px-4 md:px-8 text-center">
            {/* Breadcrumb */}
            <div className="flex justify-center mb-6">
              <Breadcrumb items={[{ label: "Por que tão barato?" }]} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 text-black dark:text-white text-sm font-semibold mb-6">
                <TrendingDown className="w-4 h-4" />
                Transparência total
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Sim, é barato.{" "}
                <span className="gradient-text">E é de verdade.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Entendemos que preço baixo pode gerar desconfiança — afinal, desenvolvimento de software
                costuma ser caro. Aqui você vai entender exatamente por que a VarejoCode consegue cobrar menos
                sem abrir mão da qualidade.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={triggerTransition}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <DiscordIcon className="w-5 h-5" />
                  Quero testar
                  <ArrowRight className="w-4 h-4" />
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

        {/* Contexto informal */}
        <section className="py-16 bg-gray-50 dark:bg-discord-darker">
          <div className="container-max px-4 md:px-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-discord-dark rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">Vamos ser diretos</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Sem enrolação</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  A gente sabe que quando você vê um site completo por R$ 200 ou um bot de Discord por R$ 80, a primeira reação é:{" "}
                  <strong className="text-gray-900 dark:text-white">&ldquo;que pegadinha tem aqui?&rdquo;</strong>.
                  Faz todo sentido desconfiar — no mercado de freela e agência, esses valores seriam impensáveis.
                </p>
                <p>
                  Mas a VarejoCode não opera como agência tradicional nem como freela avulso. A gente cortou
                  tudo que encarece o serviço sem agregar valor pro cliente: sem plataforma de freelance
                  sugando porcentagem, sem escritório pago, sem processo burocrático, sem intermediários.
                </p>
                <p>
                  O resultado é um preço real, justo, que cabe no bolso — e entrega profissional do mesmo jeito.
                  É assim que a gente opera, foi assim que a gente nasceu, e é assim que vai continuar.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Os 5 motivos */}
        <section className="py-20 bg-white dark:bg-discord-darkest">
          <div className="container-max px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm font-semibold mb-4">
                Os motivos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Por que conseguimos cobrar menos?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Não é mágica. É modelo de negócio. Aqui estão os reais motivos:
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative bg-white dark:bg-discord-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow ${
                    index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <reason.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {reason.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                      {reason.saving}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparativo simples */}
        <section className="py-20 bg-gray-50 dark:bg-discord-darker">
          <div className="container-max px-4 md:px-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Na prática, onde vai o seu dinheiro?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Mesma entrega, estrutura de custo completamente diferente
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Agência tradicional */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-discord-dark rounded-2xl p-6 border border-red-200 dark:border-red-900/30 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Agência / Freela tradicional</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {[
                    "💸 Taxa da plataforma: ~15% do valor",
                    "🏢 Aluguel de escritório embutido",
                    "📋 Horas de reunião e burocracia",
                    "👔 Equipe CLT com encargos",
                    "📣 Verba de marketing alta",
                    "💳 Taxa de processamento de pagamento",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Exemplo — site 5 páginas</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">R$ 1.200 – R$ 3.500</p>
                  <p className="text-xs text-red-500 mt-1">+ taxas de manutenção mensal</p>
                </div>
              </motion.div>

              {/* VarejoCode */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white dark:bg-discord-dark rounded-2xl p-6 border-2 border-black dark:border-white shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-black dark:text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">VarejoCode</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {[
                    "✅ Zero taxa de plataforma",
                    "✅ Operação remota, sem aluguel",
                    "✅ Atendimento direto via Discord",
                    "✅ Equipe enxuta e especializada",
                    "✅ Crescimento por indicação e comunidade",
                    "✅ Pagamento direto via PIX (sem taxa)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/40">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Exemplo — site 5 páginas</p>
                  <p className="text-2xl font-bold text-black dark:text-white">R$ 497</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-semibold">
                    + R$ 65/mês (hospedagem + suporte inclusos)
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tabela de preços por tipo de projeto */}
        <section className="py-20 bg-white dark:bg-discord-darkest">
          <div className="container-max px-4 md:px-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm font-semibold mb-4">
                Referência de preços
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Quanto custa cada tipo de projeto?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Valores médios de mercado comparados com os preços reais da VarejoCode. Todos os projetos incluem suporte via Discord.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-discord-darker border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-300 w-48">Projeto</th>
                    <th className="text-center px-5 py-4 font-semibold text-red-600 dark:text-red-400">Agência / Freela</th>
                    <th className="text-center px-5 py-4 font-semibold text-gray-900 dark:text-white bg-green-50 dark:bg-green-900/10">
                      VarejoCode — Hospedado
                    </th>
                    <th className="text-center px-5 py-4 font-semibold text-gray-900 dark:text-white">
                      VarejoCode — Source
                    </th>
                    <th className="text-center px-5 py-4 font-semibold text-gray-500 dark:text-gray-400">Prazo</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-discord-dark divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    {
                      name: "Site 5 páginas",
                      market: "R$ 1.200 – R$ 3.500",
                      hosted: "R$ 497 + R$ 65/mês",
                      source: "R$ 1.297",
                      deadline: "7–10 dias",
                    },
                    {
                      name: "Landing Page",
                      market: "R$ 400 – R$ 1.200",
                      hosted: "R$ 197 + R$ 45/mês",
                      source: "R$ 497",
                      deadline: "3–5 dias",
                    },
                    {
                      name: "E-commerce simples",
                      market: "R$ 2.500 – R$ 8.000",
                      hosted: "R$ 997 + R$ 95/mês",
                      source: "R$ 2.497",
                      deadline: "10–20 dias",
                    },
                    {
                      name: "Bot Discord",
                      market: "R$ 300 – R$ 1.500",
                      hosted: "R$ 149 + R$ 49/mês",
                      source: "R$ 397",
                      deadline: "3–7 dias",
                    },
                    {
                      name: "App Mobile (MVP)",
                      market: "R$ 8.000 – R$ 25.000",
                      hosted: "R$ 1.997 + R$ 149/mês",
                      source: "R$ 4.997",
                      deadline: "30–60 dias",
                    },
                    {
                      name: "Automação Python",
                      market: "R$ 500 – R$ 3.000",
                      hosted: "R$ 297 + R$ 49/mês",
                      source: "R$ 697",
                      deadline: "5–10 dias",
                    },
                    {
                      name: "Sistema Web (CRUD)",
                      market: "R$ 3.000 – R$ 12.000",
                      hosted: "R$ 1.297 + R$ 99/mês",
                      source: "R$ 2.997",
                      deadline: "15–30 dias",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-discord-darker transition-colors">
                      <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white">{row.name}</td>
                      <td className="px-5 py-4 text-center text-red-600 dark:text-red-400 font-medium">{row.market}</td>
                      <td className="px-5 py-4 text-center bg-green-50/50 dark:bg-green-900/5">
                        <span className="font-bold text-gray-900 dark:text-white">{row.hosted}</span>
                      </td>
                      <td className="px-5 py-4 text-center font-medium text-gray-700 dark:text-gray-300">{row.source}</td>
                      <td className="px-5 py-4 text-center text-gray-500 dark:text-gray-400">{row.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <p className="text-xs text-center text-gray-400 dark:text-gray-600 mt-4">
              * Valores de mercado são estimativas baseadas em pesquisa de preços em plataformas como Workana e GetNinjas. Preços VarejoCode são valores de entrada — projetos complexos podem variar. Solicite orçamento sem compromisso.
            </p>
          </div>
        </section>

        {/* Desmontando os mitos */}
        <section className="py-20 bg-gray-50 dark:bg-discord-darker">
          <div className="container-max px-4 md:px-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm font-semibold mb-4">
                Desmistificando
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                &ldquo;Mas e se...&rdquo;
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                As dúvidas mais comuns de quem ainda não conhece a gente
              </p>
            </motion.div>

            <div className="space-y-4">
              {myths.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-gray-50 dark:bg-discord-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic mb-3">{item.myth}</p>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">{item.truth}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 bg-gray-50 dark:bg-discord-darker">
          <div className="container-max px-4 md:px-8 max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-black dark:bg-white flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-white dark:text-black" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Pode ficar tranquilo
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                Valores acessíveis não são sinal de serviço ruim — são sinal de um modelo pensado
                pra você não pagar mais do que precisa. Se ainda tiver dúvida, vem conversar no
                Discord. Sem compromisso, sem pressão.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  onClick={triggerTransition}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center justify-center gap-2 text-lg cursor-pointer"
                >
                  <DiscordIcon className="w-6 h-6" />
                  Tirar dúvidas no Discord
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <Link
                  href="/"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Voltar ao site
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  Sem contrato abusivo
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Entrega garantida
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-blue-500" />
                  Suporte real
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
