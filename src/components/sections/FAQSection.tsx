"use client";

import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import Image from "next/image";
import { ANIMATION_CONFIG } from "@/lib/constants";

const faqs = [
  {
    question: "Por que via Discord?",
    answer: "O Discord é uma plataforma que você já conhece e provavelmente já usa. Não precisa criar conta em mais uma plataforma, aprender nova interface ou lidar com sistemas burocráticos. Entre direto no servidor, abra um ticket e fale diretamente com nossa equipe. Simples assim."
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Aceitamos pagamento via PIX, que é instantâneo e sem taxas. Após negociar seu projeto no ticket, nosso bot gera automaticamente um QR Code PIX. Você paga, o sistema confirma em tempo real, e seu projeto entra na fila de desenvolvimento. Para projetos maiores, parcelamos em até 3x via PIX combinado no ticket."
  },
  {
    question: "Vocês emitem nota fiscal (NF)?",
    answer: "Para pessoas físicas, emitimos recibo formal detalhado. Estamos em processo de formalização com CNPJ em abertura, e assim que a documentação estiver pronta, emitiremos NF-e para todos os projetos. Caso precise de dados específicos no recibo, basta informar no ticket antes de fechar o orçamento."
  },
  {
    question: "Quanto tempo leva um projeto?",
    answer: "Depende da complexidade. Exemplos de prazos médios: bot simples (2-3 dias), landing page (3-5 dias), site institucional 5 páginas (7-10 dias), e-commerce básico (15-20 dias), app mobile (30-45 dias). Sempre informamos o prazo exato antes de você confirmar — e cumprimos o que prometemos."
  },
  {
    question: "Qual a diferença entre os planos Hospedado e Source?",
    answer: "No Plano Hospedado, nós cuidamos de tudo: hospedagem, manutenção, suporte contínuo. Você paga um setup menor e uma mensalidade acessível. No Plano Source, você paga um valor único maior e recebe o código-fonte completo, hospedando onde quiser e tendo controle total. Ideal para quem tem equipe técnica própria."
  },
  {
    question: "Posso cancelar a mensalidade do plano hospedado?",
    answer: "Sim! Sem multa ou burocracia. Se cancelar, apenas retiramos a hospedagem do ar. Você pode voltar quando quiser ou migrar para o plano Source pagando a diferença proporcional. Não existe fidelidade mínima nem taxa de cancelamento."
  },
  {
    question: "Quantas revisões estão incluídas?",
    answer: "No Plano Hospedado, revisões são ilimitadas e fazem parte do suporte contínuo — ajustamos o que precisar enquanto você for cliente. No Plano Source, incluímos até 3 rodadas de revisão após a entrega, dentro do escopo original acordado. Alterações de escopo são orçadas separadamente."
  },
  {
    question: "Vocês fazem manutenção e atualizações?",
    answer: "No Plano Hospedado, manutenções e correções de bugs são gratuitas e ilimitadas. No Plano Source, manutenções são cobradas separadamente, mas você tem autonomia para fazer modificações por conta própria. Oferecemos também contratos de manutenção avulsos para clientes Source."
  },
  {
    question: "O que acontece se eu não gostar do resultado?",
    answer: "Trabalhamos com aprovação por etapas: você valida o layout antes de codificarmos, e valida o protótipo antes de finalizar. Isso evita surpresas no final. Se mesmo assim algo não estiver certo, trabalhamos nas revisões inclusas até chegar no resultado esperado. Não iniciamos o desenvolvimento sem sua aprovação prévia."
  },
  {
    question: "Vocês têm CNPJ? É uma empresa formal?",
    answer: "Estamos em processo de formalização com CNPJ em abertura. Operamos com contratos claros, emissão de recibo formal e total transparência. Não somos um freela avulso — somos uma empresa em crescimento com processos definidos, equipe dedicada e histórico de entregas."
  },
  {
    question: "Como funciona o suporte?",
    answer: "Todo suporte é feito via Discord, no seu ticket privado. No Plano Hospedado, o suporte é ilimitado e contínuo — geralmente respondemos em até 24h. No Plano Source, oferecemos suporte inicial de 30 dias para dúvidas sobre deploy e uso do código."
  },
  {
    question: "Posso ver projetos que vocês já fizeram?",
    answer: "Sim! Temos um portfólio na página /portfolio com projetos reais entregues. No Discord, também compartilhamos previews e demos de projetos anteriores no canal #portfólio. Caso precise ver algo específico (ex: um e-commerce, um bot de moderação), peça no ticket e mostramos exemplos similares."
  },
  {
    question: "E se eu precisar de algo que não está na lista de serviços?",
    answer: "Manda a ideia no Discord! Analisamos qualquer tipo de projeto digital — se não fazemos internamente, temos parceiros especializados. Nada de 'não atendemos': ou fazemos, ou indicamos quem faz melhor."
  },
  {
    question: "Preciso ter tudo pronto antes de pedir orçamento?",
    answer: "Não! Você não precisa ter logo, textos ou referências prontas. Nossa equipe te guia em todo o processo. O ideal é ter uma ideia clara do objetivo (ex: vender produtos, captar leads, automatizar processos), mas mesmo sem isso, conversamos no Discord e ajudamos a definir o escopo juntos."
  },
  {
    question: "Quanto mais informação eu trouxer, melhor o orçamento?",
    answer: "Sim! Se você já tiver referências visuais (sites que gosta), conteúdo (textos, imagens), prazo desejado e orçamento em mente, conseguimos fazer uma proposta mais precisa e rápida. Mas se não tiver nada disso, sem problema — vamos construindo juntos no ticket."
  },
  {
    question: "Tem algum custo para solicitar orçamento?",
    answer: "Zero. Entrar no Discord, abrir ticket e receber orçamento é completamente gratuito e sem compromisso. Você só paga se decidir fechar o projeto. O orçamento é detalhado, com escopo, prazo e valor — sem cobrar pela proposta."
  }
];

// Componente memoizado para logo row
const LogoRow = memo(function LogoRow({ duration, top }: { duration: number; top: string }) {
  const logos = useMemo(() => [...Array(ANIMATION_CONFIG.CAROUSEL_LOGOS_PER_ROW)], []);
  
  return (
    <div className={`absolute ${top} left-0 w-full h-20`}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex gap-12 items-center h-full absolute"
        style={{ width: "200%" }}
      >
        {logos.map((_, i) => (
          <div key={i} className="flex-shrink-0 w-16 h-16 relative">
            <Image src="/logo.png" alt="" fill className="object-contain" loading="lazy" />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white dark:from-discord-darkest to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white dark:from-discord-darkest to-transparent z-10 pointer-events-none" />
    </div>
  );
});

export default memo(function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase();
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <section id="faq" className="section-padding bg-white dark:bg-discord-darkest relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-discord-blurple/50 to-transparent" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 dark:bg-white/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-white/5 dark:bg-white/5 rounded-full blur-3xl"
      />

      {/* Animated Logo Grid Carousel Background - Otimizado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 blur-sm">
        <LogoRow duration={20} top="top-[15%]" />
        <LogoRow duration={25} top="top-[35%]" />
        <LogoRow duration={30} top="top-[55%]" />
        <LogoRow duration={22} top="top-[75%]" />
      </div>

      <div className="container-max relative z-10">
        {/* Header centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-discord-blurple/10 dark:bg-discord-blurple/20 border border-discord-blurple/30 text-discord-blurple text-sm font-semibold mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            Dúvidas Frequentes
          </motion.span>
          
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
          >
            Tire suas <span className="gradient-text">dúvidas</span> aqui
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            Não encontrou o que procurava? Sem problema! Nossa equipe está sempre disponível no Discord para te ajudar.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar dúvidas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-discord-dark border border-gray-200 dark:border-gray-800 focus:border-discord-blurple dark:focus:border-discord-blurple focus:outline-none focus:ring-2 focus:ring-discord-blurple/20 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all duration-200"
              aria-label="Buscar perguntas frequentes"
            />
          </motion.div>
        </motion.div>

        {/* Grid de 2 colunas com perguntas balanceadas */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Coluna esquerda */}
          <div className="space-y-4">
            {filteredFaqs.slice(0, Math.ceil(filteredFaqs.length / 2)).map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-5 bg-white dark:bg-discord-dark rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-discord-blurple/30 dark:hover:border-discord-blurple/30 hover:shadow-lg hover:shadow-discord-blurple/5 transition-all duration-200 group"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white pr-4 flex-1 group-hover:text-discord-blurple dark:group-hover:text-discord-blurple transition-colors duration-200">
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                      openIndex === index 
                        ? "bg-discord-blurple text-white" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-discord-blurple/10 group-hover:text-discord-blurple"
                    }`}>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Coluna direita */}
          <div className="space-y-4">
            {filteredFaqs.slice(Math.ceil(filteredFaqs.length / 2)).map((faq, index) => {
              const actualIndex = index + Math.ceil(filteredFaqs.length / 2);
              return (
                <motion.div
                  key={actualIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === actualIndex ? null : actualIndex)}
                    className="w-full text-left p-5 bg-white dark:bg-discord-dark rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-discord-blurple/30 dark:hover:border-discord-blurple/30 hover:shadow-lg hover:shadow-discord-blurple/5 transition-all duration-200 group"
                    aria-expanded={openIndex === actualIndex}
                    aria-controls={`faq-answer-${actualIndex}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white pr-4 flex-1 group-hover:text-discord-blurple dark:group-hover:text-discord-blurple transition-colors duration-200">
                        {faq.question}
                      </h3>
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                        openIndex === actualIndex 
                          ? "bg-discord-blurple text-white" 
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-discord-blurple/10 group-hover:text-discord-blurple"
                      }`}>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openIndex === actualIndex ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <AnimatePresence>
                      {openIndex === actualIndex && (
                        <motion.div
                          id={`faq-answer-${actualIndex}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
