"use client";

import { memo, useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  Database,
  FileCode,
  Smartphone,
  Palette,
  Cloud,
  Globe,
  Cpu,
  Layers,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Logo from "@/components/Logo";
import { DiscordIcon } from "@/components/icons";
import { useWaterTransition } from "@/components/WaterTransition";

type IconComp = React.ComponentType<{ className?: string }>;

interface Tech {
  label: string;
  sublabel: string;
  Icon: IconComp;
}

const techs: Tech[] = [
  { label: "Discord",     sublabel: "Bots & Tickets",      Icon: DiscordIcon as IconComp },
  { label: "React",       sublabel: "Next.js & Web",        Icon: Code2 },
  { label: "Python",      sublabel: "Automações & IA",      Icon: Terminal },
  { label: "TypeScript",  sublabel: "Full Stack Tipado",    Icon: FileCode },
  { label: "Node.js",     sublabel: "APIs & Backends",      Icon: Globe },
  { label: "Mobile",      sublabel: "iOS & Android",        Icon: Smartphone },
  { label: "Database",    sublabel: "SQL & NoSQL",           Icon: Database },
  { label: "Cloud",       sublabel: "AWS, Vercel & GCP",    Icon: Cloud },
  { label: "UI/UX",       sublabel: "Design & Branding",    Icon: Palette },
  { label: "DevOps",      sublabel: "CI/CD & Docker",       Icon: Cpu },
  { label: "Micro-SaaS",  sublabel: "Produtos Escaláveis",  Icon: Layers },
  { label: "Integrações", sublabel: "APIs & Webhooks",      Icon: Globe },
];

interface CurveLine {
  path: string;
  dotX: number;
  dotY: number;
}

/** Direct bezier for top-row cards: hub ↘ card top */
function buildTopCurve(
  hubCx: number,
  hubBottom: number,
  cardCx: number,
  cardTop: number,
): CurveLine {
  if (Math.abs(cardCx - hubCx) < 2) {
    return { path: `M ${hubCx} ${hubBottom} L ${hubCx} ${cardTop}`, dotX: hubCx, dotY: cardTop };
  }
  const jY = hubBottom + (cardTop - hubBottom) * 0.35;
  const path = `M ${hubCx} ${hubBottom} C ${hubCx} ${jY}, ${cardCx} ${jY}, ${cardCx} ${cardTop}`;
  return { path, dotX: cardCx, dotY: cardTop };
}

/** Routed bezier for bottom-row cards: hub → side edge → between rows → card.
 *  Goes around the outside of the grid so it never overlaps top-row cards. */
function buildBottomCurve(
  hubCx: number,
  hubBottom: number,
  cardCx: number,
  cardTop: number,
  gridLeft: number,
  gridRight: number,
  row1Bottom: number,
): CurveLine {
  const isLeft = cardCx <= hubCx;
  const pad = 24; // how far outside the grid the line goes
  const sideX = isLeft ? gridLeft - pad : gridRight + pad;

  // Key Y positions
  const branchY = hubBottom + (row1Bottom - hubBottom) * 0.25; // start branching outward
  const midY = (branchY + row1Bottom) * 0.5; // midpoint along the side
  const gapY = row1Bottom + (cardTop - row1Bottom) * 0.5; // between rows
  const r = 16; // corner rounding radius

  // 5-segment path with smooth rounded corners:
  // 1. Hub → down to branch point
  // 2. Curve out to the side edge
  // 3. Down along the side edge past row 1
  // 4. Curve inward between the rows
  // 5. Down to card top
  const path = [
    `M ${hubCx} ${hubBottom}`,
    // go down a bit then curve outward to the side
    `C ${hubCx} ${branchY}, ${sideX} ${branchY}, ${sideX} ${midY}`,
    // go down along the side to past row 1
    `L ${sideX} ${gapY - r}`,
    // round corner inward
    `Q ${sideX} ${gapY}, ${sideX + (isLeft ? r : -r)} ${gapY}`,
    // horizontal to near card X
    `L ${cardCx + (isLeft ? -r : r)} ${gapY}`,
    // round corner down to card
    `Q ${cardCx} ${gapY}, ${cardCx} ${gapY + r}`,
    // straight down to card top
    `L ${cardCx} ${cardTop}`,
  ].join(" ");

  return { path, dotX: cardCx, dotY: cardTop };
}

// Subtle swing animation for "hanging" cards
const swingVariants = {
  hidden: { opacity: 0, y: -12, rotate: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, delay: 0.3 + i * 0.06, ease: "easeOut" },
  }),
};

export default memo(function TechOrbitSection() {
  const { triggerTransition } = useWaterTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [curves, setCurves] = useState<CurveLine[]>([]);

  const updateCurves = useCallback(() => {
    const container = containerRef.current;
    const hub = hubRef.current;
    if (!container || !hub) return;

    const cr = container.getBoundingClientRect();
    const hr = hub.getBoundingClientRect();
    const hubCx = hr.left + hr.width / 2 - cr.left;
    const hubBottom = hr.bottom - cr.top;

    // Collect all card rects
    const cardRects = cardRefs.current.map((card) => {
      if (!card) return null;
      const r = card.getBoundingClientRect();
      return {
        cx: r.left + r.width / 2 - cr.left,
        top: r.top - cr.top,
        bottom: r.bottom - cr.top,
        left: r.left - cr.left,
        right: r.right - cr.left,
      };
    });

    // Determine which row each card is on by Y position
    const validCards = cardRects.filter(Boolean) as NonNullable<(typeof cardRects)[0]>[];
    if (validCards.length === 0) return;

    const minTop = Math.min(...validCards.map((c) => c.top));
    // Cards whose top is more than 40px below the first card are "bottom row"
    const row1Cards = validCards.filter((c) => c.top - minTop < 40);
    const row1Bottom = Math.max(...row1Cards.map((c) => c.bottom));
    const gridLeft = Math.min(...validCards.map((c) => c.left));
    const gridRight = Math.max(...validCards.map((c) => c.right));

    const newCurves: CurveLine[] = [];
    cardRects.forEach((card) => {
      if (!card) return;
      const isBottomRow = card.top - minTop >= 40;
      if (isBottomRow) {
        newCurves.push(buildBottomCurve(hubCx, hubBottom, card.cx, card.top, gridLeft, gridRight, row1Bottom));
      } else {
        newCurves.push(buildTopCurve(hubCx, hubBottom, card.cx, card.top));
      }
    });
    setCurves(newCurves);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateCurves, 200);
    window.addEventListener("resize", updateCurves);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateCurves);
    };
  }, [updateCurves]);

  return (
    <section
      id="tecnologias"
      className="section-padding bg-white dark:bg-discord-darkest relative overflow-hidden"
    >
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
      </div>

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm font-semibold mb-4">
            Stack Moderna
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tecnologia de ponta,{" "}
            <span className="gradient-text">sempre atualizada</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ferramentas modernas para projetos rápidos, seguros e escaláveis
          </p>
        </motion.div>

        {/* Center hub + grid with connecting lines */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* SVG curved connecting lines from hub bottom to each card top */}
          {curves.length > 0 && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1, overflow: "visible" }}
            >
              {curves.map((curve, i) => (
                <motion.path
                  key={i}
                  d={curve.path}
                  strokeWidth={1.5}
                  fill="none"
                  strokeLinecap="round"
                  className="stroke-gray-300/60 dark:stroke-gray-600/60"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    pathLength: { duration: 0.8, delay: 0.3 + i * 0.05, ease: "easeInOut" },
                    opacity: { duration: 0.3, delay: 0.3 + i * 0.05 },
                  }}
                />
              ))}
              {/* Small dots at card connection points */}
              {curves.map((curve, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={curve.dotX}
                  cy={curve.dotY}
                  r={3}
                  className="fill-gray-300 dark:fill-gray-600"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                />
              ))}
              {/* Animated pulse traveling along each line */}
              {curves.map((curve, i) => (
                <circle key={`pulse-${i}`} r={2} className="fill-gray-400 dark:fill-gray-500">
                  <animateMotion
                    dur={`${2.5 + i * 0.15}s`}
                    repeatCount="indefinite"
                    path={curve.path}
                    begin={`${i * 0.2}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0.7;0"
                    dur={`${2.5 + i * 0.15}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.2}s`}
                  />
                </circle>
              ))}
            </svg>
          )}

          {/* Central logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-16 flex flex-col items-center relative z-10"
          >
            <div ref={hubRef} className="relative">
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-gray-200 dark:border-gray-700"
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ margin: -8 }}
              />
              <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                <Logo size={48} />
              </div>
            </div>
            <p className="mt-3 text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-widest uppercase">
              VarejoCode
            </p>
          </motion.div>

          {/* Tech grid — cards hang from lines */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 relative z-10">
            {techs.map((tech, i) => {
              const { Icon } = tech;
              return (
                <motion.div
                  key={tech.label}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={swingVariants}
                  style={{ transformOrigin: "top center" }}
                  whileHover={{
                    y: -8,
                    rotate: 0,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300, damping: 15 },
                  }}
                  className="group relative flex flex-col items-center text-center p-4 md:p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-discord-dark hover:border-discord-blurple/30 dark:hover:border-discord-blurple/30 hover:bg-white dark:hover:bg-discord-dark transition-all duration-300 hover:shadow-xl hover:shadow-discord-blurple/10"
                >
                  {/* Pin dot — where the line connects */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-discord-blurple/20 dark:bg-discord-blurple/30 border-2 border-discord-blurple/50 dark:border-discord-blurple/60 z-20 group-hover:bg-discord-blurple group-hover:border-discord-blurple transition-all duration-300" />

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-discord-blurple/10 to-purple-500/10 dark:from-discord-blurple/20 dark:to-purple-500/20 border border-discord-blurple/20 dark:border-discord-blurple/30 flex items-center justify-center mb-3 mt-1 group-hover:from-discord-blurple/20 group-hover:to-purple-500/20 dark:group-hover:from-discord-blurple/30 dark:group-hover:to-purple-500/30 group-hover:border-discord-blurple/40 group-hover:shadow-lg group-hover:shadow-discord-blurple/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-discord-blurple group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Label */}
                  <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight group-hover:text-discord-blurple dark:group-hover:text-discord-blurple transition-colors duration-300">
                    {tech.label}
                  </p>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1 leading-tight">
                    {tech.sublabel}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom highlights */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            {[
              { icon: Zap, value: "12+", label: "Tecnologias" },
              { icon: Shield, value: "99.9%", label: "Uptime garantido" },
              { icon: Cpu, value: "< 2s", label: "Tempo de resposta" },
            ].map((stat) => (
              <motion.div 
                key={stat.label} 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-discord-dark transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-discord-blurple/10 to-purple-500/10 dark:from-discord-blurple/20 dark:to-purple-500/20 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-discord-blurple" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{stat.value}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA de conversão */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-discord-blurple/5 to-purple-500/5 dark:from-discord-blurple/10 dark:to-purple-500/10 border-2 border-discord-blurple/20 dark:border-discord-blurple/30"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-discord-blurple/10 dark:bg-discord-blurple/20 border border-discord-blurple/30 text-discord-blurple text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Pronto para começar?
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white max-w-md">
                Já decidiu qual tecnologia precisa?
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg">
                Nossa equipe está pronta para transformar sua ideia em realidade. Peça seu orçamento sem compromisso.
              </p>
              <motion.button
                onClick={triggerTransition}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-discord-blurple hover:bg-discord-blurple/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-discord-blurple/30 transition-all duration-200 cursor-pointer mt-2"
              >
                <DiscordIcon className="w-5 h-5" />
                Falar com a equipe
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
