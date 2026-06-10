"use client";

import { memo, useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Package, Star, Clock, Quote, MapPin, Briefcase } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: 150,
    suffix: "+",
    label: "Projetos Entregues",
    color: "text-black dark:text-white",
  },
  {
    icon: Users,
    value: 80,
    suffix: "+",
    label: "Clientes Atendidos",
    color: "text-black dark:text-white",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "",
    label: "Avaliação Média",
    color: "text-black dark:text-white",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "h",
    label: "Tempo de Resposta",
    color: "text-black dark:text-white",
  },
];

const testimonials = [
  {
    name: "Rafael Costa",
    role: "Dono de loja online",
    location: "São Paulo, SP",
    avatar: "RC",
    project: "E-commerce",
    content: "Em menos de uma semana tive meu e-commerce funcionando com pagamento integrado. Paguei R$ 797 pelo Plano Hospedado e economizei mais de R$ 2.000 em relação ao que orçamentei em agências. Suporte via Discord resolve qualquer dúvida em poucas horas.",
    rating: 5,
  },
  {
    name: "Ana Beatriz",
    role: "Streamer e criadora de conteúdo",
    location: "Curitiba, PR",
    avatar: "AB",
    project: "Bot Discord",
    content: "Meu servidor Discord tinha 8k membros e precisava de moderação automática, sistema de pontos e comandos customizados. O bot ficou exatamente como imaginei, em 3 dias. Recomendo demais para quem tem comunidade online.",
    rating: 5,
  },
  {
    name: "Pedro Henrique",
    role: "Freelancer de TI",
    location: "Belo Horizonte, MG",
    avatar: "PH",
    project: "Sistema web (Plano Source)",
    content: "Peguei o Plano Source para um sistema de gestão para um cliente meu. O código veio bem estruturado, documentado e fácil de entender. Consegui personalizar tudo depois sem problema. Ótimo custo-benefício comparado a contratar outro dev.",
    rating: 5,
  },
  {
    name: "Mariana Silva",
    role: "Nutricionista",
    location: "Rio de Janeiro, RJ",
    avatar: "MS",
    project: "Landing Page",
    content: "Precisava de um site profissional para captar clientes e não entendia nada de tecnologia. A equipe me guiou em tudo, desde as cores até os textos. Ficou lindo e já estou recebendo contatos pelo formulário. Valeu cada centavo!",
    rating: 5,
  },
  {
    name: "Lucas Ferreira",
    role: "Gestor de comunidade",
    location: "Florianópolis, SC",
    avatar: "LF",
    project: "Automação Discord",
    content: "Automatizei todo o onboarding do meu servidor com um bot personalizado. Antes levava horas configurando roles manualmente, agora é tudo automático. O melhor foi o preço: paguei menos que uma mensalidade de MEI e o bot é meu pra sempre.",
    rating: 5,
  },
];

const AnimatedCounter = memo(function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)}{suffix}
    </span>
  );
});

export default memo(function StatsSection() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-discord-darker relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="container-max relative z-10">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white dark:bg-discord-dark rounded-2xl p-6 text-center border-2 border-gray-100 dark:border-gray-800 hover:border-discord-blurple/30 dark:hover:border-discord-blurple/30 shadow-lg hover:shadow-xl hover:shadow-discord-blurple/5 transition-all duration-300">
                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-discord-blurple/10 to-purple-500/10 dark:from-discord-blurple/20 dark:to-purple-500/20 mb-4 text-discord-blurple">
                  <stat.icon className="w-6 h-6" />
                </div>
                
                {/* Value */}
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                
                {/* Label */}
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-discord-blurple/10 dark:bg-discord-blurple/20 border border-discord-blurple/30 text-discord-blurple text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" />
              Depoimentos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              O que nossos <span className="gradient-text">clientes</span> dizem
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Histórias reais de quem já transformou suas ideias em projetos com a VarejoCode
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative bg-white dark:bg-discord-dark rounded-2xl p-6 border-2 border-gray-100 dark:border-gray-800 hover:border-discord-blurple/30 dark:hover:border-discord-blurple/30 shadow-lg hover:shadow-2xl hover:shadow-discord-blurple/10 transition-all duration-300 group"
              >
                {/* Quote icon decoration */}
                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <Quote className="w-16 h-16 text-discord-blurple" />
                </div>
                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 leading-relaxed relative z-10">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-start gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-discord-blurple to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-sm font-bold">{testimonial.avatar}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {testimonial.role}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-discord-blurple/10 dark:bg-discord-blurple/20 text-discord-blurple font-semibold">
                        <Briefcase className="w-3 h-3" />
                        {testimonial.project}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
