"use client";

import { memo, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, CreditCard, Package } from "lucide-react";
import { DiscordIcon } from "@/components/icons";
import { ANIMATION_CONFIG } from "@/lib/constants";

const steps = [
  {
    icon: DiscordIcon,
    title: "Entre no Discord",
    description: "Acesse nosso servidor e abra um ticket. Sem cadastro, sem burocracia.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: FileText,
    title: "Descreva seu projeto",
    description: "Explique o que você precisa. Nossa equipe analisa e envia uma proposta personalizada.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: CreditCard,
    title: "Receba e pague",
    description: "Escolha entre plano hospedado ou source. Pague via PIX instantâneo.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Package,
    title: "Receba seu projeto",
    description: "Acompanhe o desenvolvimento e receba seu projeto pronto com suporte.",
    color: "from-green-500 to-green-600",
  },
];

export default memo(function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, ANIMATION_CONFIG.STEP_INTERVAL);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={sectionRef} id="como-funciona" className="section-padding bg-white dark:bg-discord-darkest relative overflow-hidden">{/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-discord-blurple/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-discord-blurple/50 to-transparent" />

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
            Como funciona?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Do primeiro contato à entrega em 4 passos simples
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
            {/* Background line */}
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 opacity-30" />
            
            {/* Animated progress line */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-green-500 origin-left"
              initial={{ width: "0%" }}
              animate={{ 
                width: `${((activeStep + 1) / steps.length) * 100}%`
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative"
                >
                  {/* Step Number */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      y: isActive ? -5 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative mx-auto w-20 h-20 mb-6"
                  >
                    {/* Glow Effect - mais forte quando ativo */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 0.8 : isPast ? 0.5 : 0.4,
                        scale: isActive ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl`}
                    />
                    
                    {/* Icon Container */}
                    <motion.div
                      animate={{
                        boxShadow: isActive 
                          ? "0 20px 40px -10px rgba(0, 0, 0, 0.4)" 
                          : "0 10px 20px -5px rgba(0, 0, 0, 0.2)",
                      }}
                      transition={{ duration: 0.4 }}
                      className={`relative w-full h-full bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center transition-all`}
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          rotate: isActive ? [0, -10, 10, -10, 0] : 0,
                        }}
                        transition={{ 
                          scale: { duration: 0.4 },
                          rotate: { duration: 0.6, ease: "easeInOut" }
                        }}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </motion.div>

                    {/* Step Number Badge */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        backgroundColor: isActive 
                          ? "rgb(34, 197, 94)" 
                          : isPast 
                            ? "rgb(59, 130, 246)" 
                            : "rgb(255, 255, 255)",
                      }}
                      transition={{ duration: 0.4 }}
                      className="absolute -top-2 -right-2 w-7 h-7 dark:bg-discord-dark rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100 dark:border-gray-700"
                    >
                      <motion.span
                        animate={{
                          color: isActive || isPast ? "rgb(255, 255, 255)" : "rgb(17, 24, 39)",
                        }}
                        className="text-sm font-bold dark:text-white"
                      >
                        {index + 1}
                      </motion.span>
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : isPast ? 0.9 : 0.7,
                      y: isActive ? -5 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Arrow - Desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      animate={{
                        opacity: isPast ? 1 : 0.3,
                        x: isActive ? [0, 5, 0] : 0,
                      }}
                      transition={{
                        opacity: { duration: 0.4 },
                        x: { duration: 0.6, repeat: isActive ? Infinity : 0 }
                      }}
                      className="hidden lg:block absolute top-10 -right-4 text-gray-300 dark:text-gray-700"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
