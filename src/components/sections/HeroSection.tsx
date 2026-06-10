"use client";

import { memo, useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import Image from "next/image";
import { DiscordIcon, CheckCircleIcon } from "@/components/icons";
import { URLS, ANIMATION_CONFIG } from "@/lib/constants";
import { useWaterTransition } from "@/components/WaterTransition";

export default memo(function HeroSection() {
  const { triggerTransition } = useWaterTransition();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Memoizar mensagens para evitar recriação
  const messages = useMemo(() => [
    { id: 1, type: "user", delay: 0.5 },
    { id: 2, type: "bot", delay: 1.5, hasTyping: true },
    { id: 3, type: "user", delay: 3.5 },
    { id: 4, type: "bot", delay: 5, hasTyping: true },
    { id: 5, type: "user", delay: 7 },
    { id: 6, type: "bot", delay: 8.5, hasTyping: true },
    { id: 7, type: "user", delay: 10.5 },
    { id: 8, type: "bot", delay: 12 },
  ], []);

  const TYPING_DELAY_MS = 1500;

  // Auto-scroll quando nova mensagem aparece
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [currentMessage, isTyping]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    messages.forEach((msg) => {
      const timeout = setTimeout(() => {
        if (msg.hasTyping) {
          setIsTyping(true);
          const typingTimeout = setTimeout(() => {
            setIsTyping(false);
            setCurrentMessage(msg.id);
          }, TYPING_DELAY_MS);
          timeouts.push(typingTimeout);
        } else {
          setCurrentMessage(msg.id);
        }
      }, msg.delay * 1000);
      timeouts.push(timeout);
    });
    
    // Cleanup para evitar memory leaks
    return () => {
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas uma vez no mount


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects - CSS only, no JS animation */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 noise" />
      
      {/* Floating Orbs - Usando CSS animations em vez de Framer Motion para reduzir TBT */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-black/10 dark:bg-white/10 rounded-full blur-3xl animate-float-slow"
        style={{ transform: 'translateZ(0)' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-800/10 dark:bg-gray-200/10 rounded-full blur-3xl animate-float-medium"
        style={{ transform: 'translateZ(0)', animationDelay: '-2s' }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-48 h-48 bg-gray-600/10 dark:bg-gray-400/10 rounded-full blur-3xl animate-float-fast"
        style={{ transform: 'translateZ(0)', animationDelay: '-4s' }}
      />

      <div className="container-max relative z-10 px-4 md:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Removido initial animation para LCP */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 text-black dark:text-white mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Desenvolvimento direto via Discord</span>
            </div>

            {/* Headline - Elemento LCP crítico - SEM animação JS */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Desenvolvimento sob demanda{" "}
              <span className="gradient-text">sem contratos abusivos</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-5 max-w-2xl mx-auto lg:mx-0">
              Mensalidade fixa • Desenvolvimento contínuo • Modelo recorrente • Não vendemos código fonte
            </p>

            {/* Social Proof Strip */}
            <div className="flex flex-wrap items-center gap-3 mb-6 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 shadow-sm">
                <span className="text-yellow-500 text-sm">★★★★★</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">4.9</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">(80+ clientes)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/20 shadow-sm">
                <CheckCircleIcon className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-semibold text-gray-900 dark:text-white">150+ projetos entregues</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <motion.button
                onClick={triggerTransition}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group btn-primary flex items-center justify-center gap-2 cursor-pointer"
              >
                <DiscordIcon className="w-5 h-5" />
                Ver quanto custa meu projeto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <a
                href="#como-funciona"
                className="btn-secondary flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform"
              >
                Como funciona
                <Play className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 justify-center lg:justify-start">
              <span className="flex items-center gap-1">
                <CheckCircleIcon className="w-3 h-3 text-green-500" />
                Sem cartão
              </span>
              <span className="flex items-center gap-1">
                <CheckCircleIcon className="w-3 h-3 text-green-500" />
                Sem compromisso
              </span>
              <span className="flex items-center gap-1">
                <CheckCircleIcon className="w-3 h-3 text-green-500" />
                Atendimento imediato
              </span>
            </div>
          </div>

          {/* Right Content - Discord Mockup */}
          <div className="relative animate-fade-in">
            <div className="relative mx-auto max-w-lg">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-300 rounded-2xl blur-2xl opacity-20 scale-105" />
              
              {/* Discord Window */}
              <div className="relative glass dark:bg-discord-dark/90 rounded-2xl overflow-hidden shadow-2xl border border-gray-200/20 dark:border-white/10">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100/50 dark:bg-discord-darker border-b border-gray-200/20 dark:border-white/10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-sm text-gray-500 dark:text-gray-400">
                    VarejoCode - Discord
                  </div>
                </div>

                {/* Discord Content */}
                <div className="p-4 space-y-4">
                  {/* Channel Header */}
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-200/20 dark:border-white/10">
                    <span className="text-xl">#</span>
                    <span className="font-semibold text-gray-900 dark:text-white">ticket-joao-001</span>
                    <span className="px-2 py-0.5 text-xs bg-discord-green/20 text-discord-green rounded-full">Aberto</span>
                  </div>

                  {/* Messages */}
                  <div ref={messagesContainerRef} className="space-y-4 max-h-96 overflow-y-auto scroll-smooth">
                    <AnimatePresence>
                      {/* Message 1 - User */}
                      {currentMessage >= 1 && (
                        <motion.div
                          key="message-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image 
                              src="/user.webp" 
                              alt="Foto de perfil do cliente" 
                              width={32} 
                              height={32} 
                              sizes="32px"
                              className="rounded-full w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-gray-900 dark:text-white">João Silva</span>
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="mt-1 text-sm text-gray-700 dark:text-gray-300"
                            >
                              Olá! Tô procurando alguém pra fazer um site pra minha empresa. Vocês conseguem me ajudar com isso?
                            </motion.p>
                          </div>
                        </motion.div>
                      )}

                      {/* Message 2 - Bot */}
                      {currentMessage >= 2 && (
                        <motion.div
                          key="message-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image 
                              src="/icon.webp" 
                              alt="VarejoCode Bot" 
                              width={32} 
                              height={32} 
                              sizes="32px"
                              className="rounded-full w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-discord-blurple">VarejoCode</span>
                              <span className="px-1.5 py-0.5 text-[10px] bg-discord-blurple text-white rounded">BOT</span>
                            </div>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="mt-1 text-sm text-gray-700 dark:text-gray-300"
                            >
                              Olá João! Claro, vou te ajudar com prazer! 😊<br/><br/>
                              Pra eu fazer um orçamento bem certinho, me conta: quantas páginas você tá pensando? E tem alguma funcionalidade específica que você precisa?
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      {/* Message 3 - User */}
                      {currentMessage >= 3 && (
                        <motion.div
                          key="message-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image 
                              src="/user.webp" 
                              alt="Foto de perfil do cliente" 
                              width={32} 
                              height={32} 
                              sizes="32px"
                              className="rounded-full w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-gray-900 dark:text-white">João Silva</span>
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="mt-1 text-sm text-gray-700 dark:text-gray-300"
                            >
                              Então, eu preciso de umas 5 páginas: Home, Sobre Nós, Serviços, Portfólio e Contato. Nada muito complexo não, mas eu queria algo moderno sabe? E que funcione bem no celular também.
                            </motion.p>
                          </div>
                        </motion.div>
                      )}

                      {/* Message 4 - Bot */}
                      {currentMessage >= 4 && (
                        <motion.div
                          key="message-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image 
                              src="/icon.webp" 
                              alt="VarejoCode Bot" 
                              width={32} 
                              height={32} 
                              sizes="32px"
                              className="rounded-full w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-discord-blurple">VarejoCode</span>
                              <span className="px-1.5 py-0.5 text-[10px] bg-discord-blurple text-white rounded">BOT</span>
                            </div>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="mt-1 p-3 bg-gray-100/50 dark:bg-discord-darker rounded-lg text-sm text-gray-800 dark:text-gray-200"
                            >
                              <p className="font-semibold mb-2">💼 ORÇAMENTO PERSONALIZADO</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                                Perfeito! Pra um site com 5 páginas, moderno e 100% responsivo, tenho duas opções pra você:
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                <strong>Plano Hospedado:</strong> R$ 497 de entrada + R$ 65/mês<br/>
                                (Inclui hospedagem, domínio e manutenção - sem dor de cabeça!)<br/><br/>
                                <strong>Plano Source:</strong> R$ 1.297 (pagamento único)<br/>
                                (Você fica com todo o código-fonte do site)
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      {/* Message 5 - User */}
                      {currentMessage >= 5 && (
                        <motion.div
                          key="message-5"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image 
                              src="/user.webp" 
                              alt="Foto de perfil do cliente" 
                              width={32} 
                              height={32} 
                              sizes="32px"
                              className="rounded-full w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-gray-900 dark:text-white">João Silva</span>
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="mt-1 text-sm text-gray-700 dark:text-gray-300"
                            >
                              Legal! Gostei das opções. E quanto tempo leva pra ficar pronto? Tô com um prazo apertado aqui...
                            </motion.p>
                          </div>
                        </motion.div>
                      )}

                      {/* Message 6 - Bot */}
                      {currentMessage >= 6 && (
                        <motion.div
                          key="message-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image 
                              src="/icon.webp" 
                              alt="VarejoCode Bot" 
                              width={32} 
                              height={32} 
                              sizes="32px"
                              className="rounded-full w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-discord-blurple">VarejoCode</span>
                              <span className="px-1.5 py-0.5 text-[10px] bg-discord-blurple text-white rounded">BOT</span>
                            </div>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="mt-1 text-sm text-gray-700 dark:text-gray-300"
                            >
                              Tranquilo! O prazo é de 7 a 10 dias úteis depois que o pagamento for confirmado. Assim que você aprovar, seu projeto já entra direto na nossa fila de desenvolvimento! 🚀
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      {/* Message 7 - User */}
                      {currentMessage >= 7 && (
                        <motion.div
                          key="message-7"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image 
                              src="/user.webp" 
                              alt="Foto de perfil do cliente" 
                              width={32} 
                              height={32} 
                              sizes="32px"
                              className="rounded-full w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-gray-900 dark:text-white">João Silva</span>
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="mt-1 text-sm text-gray-700 dark:text-gray-300"
                            >
                              Show! Acho que vou de Plano Hospedado mesmo, parece ser a melhor opção pra mim. Como é que eu faço o pagamento?
                            </motion.p>
                          </div>
                        </motion.div>
                      )}

                      {/* Message 8 - Bot with Payment */}
                      {currentMessage >= 8 && (
                        <motion.div
                          key="message-8"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image 
                              src="/icon.webp" 
                              alt="VarejoCode Bot" 
                              width={32} 
                              height={32} 
                              sizes="32px"
                              className="rounded-full w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-discord-blurple">VarejoCode</span>
                              <span className="px-1.5 py-0.5 text-[10px] bg-discord-blurple text-white rounded">BOT</span>
                            </div>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="mt-1 p-3 bg-discord-green/20 border border-discord-green/30 rounded-lg text-sm"
                            >
                              <p className="font-semibold text-discord-green mb-2">✅ Excelente escolha, João!</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Já vou gerar seu QR Code PIX aqui. Assim que o pagamento de R$ 497 cair, seu projeto entra automaticamente na fila de desenvolvimento! 🚀<br/><br/>
                                Qualquer dúvida, é só chamar!
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          key="typing-indicator"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image 
                              src="/icon.webp" 
                              alt="VarejoCode Bot" 
                              width={32} 
                              height={32} 
                              sizes="32px"
                              className="rounded-full w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-discord-blurple">VarejoCode</span>
                              <span className="px-1.5 py-0.5 text-[10px] bg-discord-blurple text-white rounded">BOT</span>
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-gray-500 dark:text-gray-400">
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                              >
                                •
                              </motion.span>
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                              >
                                •
                              </motion.span>
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                              >
                                •
                              </motion.span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-discord-green text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg"
              >
                Online 🟢
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-3 bg-black dark:bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
});
