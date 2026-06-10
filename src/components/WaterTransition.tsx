"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiscordIcon } from "@/components/icons";
import { URLS } from "@/lib/constants";

interface WaterTransitionContextType {
  triggerTransition: (e: ReactMouseEvent) => void;
}

const WaterTransitionContext = createContext<WaterTransitionContextType | null>(null);

export function useWaterTransition() {
  const ctx = useContext(WaterTransitionContext);
  if (!ctx) throw new Error("useWaterTransition must be used within WaterTransitionProvider");
  return ctx;
}

// SVG wave path for the top of the water
function WaterWaves({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute -top-[60px] left-0 w-[200%] h-[80px] pointer-events-none"
      animate={{ x: [0, "-50%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,40 C120,80 240,0 360,40 C480,80 600,0 720,40 C840,80 960,0 1080,40 C1200,80 1320,0 1440,40 L1440,80 L0,80 Z"
          fill="#5865F2"
          fillOpacity="0.9"
        />
      </svg>
    </motion.div>
  );
}

function WaterWaves2({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute -top-[40px] left-0 w-[200%] h-[60px] pointer-events-none"
      animate={{ x: ["-25%", "-75%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear", delay }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,30 C180,60 360,0 540,30 C720,60 900,0 1080,30 C1260,60 1440,0 1440,30 L1440,60 L0,60 Z"
          fill="#4752C4"
          fillOpacity="0.7"
        />
      </svg>
    </motion.div>
  );
}

// Bubble particles
function Bubbles() {
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 4 + Math.random() * 12,
    delay: Math.random() * 2,
    duration: 1.5 + Math.random() * 2,
  }));

  return (
    <>
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            bottom: 0,
          }}
          initial={{ y: 0, opacity: 0.6 }}
          animate={{ y: -300, opacity: 0 }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

export function WaterTransitionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"filling" | "logo" | "done">("filling");
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cleanup = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const triggerTransition = useCallback(
    (e: ReactMouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setPhase("filling");
      setActive(true);

      cleanup();

      // After water fills, show logo
      const t1 = setTimeout(() => setPhase("logo"), 1400);
      // Open Discord in new tab & start exit
      const t2 = setTimeout(() => {
        window.open(URLS.DISCORD_INVITE, "_blank", "noopener,noreferrer");
      }, 2800);
      // Close overlay
      const t3 = setTimeout(() => {
        setPhase("done");
        setActive(false);
      }, 3200);

      timeoutsRef.current = [t1, t2, t3];
    },
    [cleanup]
  );

  // Calculate maximum distance from origin to screen corner for the circle radius
  const maxRadius =
    typeof window !== "undefined"
      ? Math.sqrt(
          Math.max(origin.x, window.innerWidth - origin.x) ** 2 +
            Math.max(origin.y, window.innerHeight - origin.y) ** 2
        ) * 1.2
      : 2000;

  return (
    <WaterTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            key="water-overlay"
            className="fixed inset-0 z-[9999] pointer-events-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Water fill — circle expanding from button origin */}
            <motion.div
              className="absolute inset-0 bg-[#5865F2] overflow-hidden"
              initial={{
                clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
              }}
              animate={{
                clipPath: `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`,
              }}
              transition={{
                duration: 1.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Wave decorations on top edge */}
              <WaterWaves delay={0} />
              <WaterWaves2 delay={0.3} />

              {/* Bubbles */}
              <Bubbles />

              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#5865F2] via-[#4752C4] to-[#3C45A5]" />
            </motion.div>

            {/* Center content — Discord logo + text */}
            <AnimatePresence>
              {phase === "logo" && (
                <motion.div
                  key="discord-center"
                  className="absolute inset-0 flex flex-col items-center justify-center z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Pulsing glow behind logo */}
                  <motion.div
                    className="absolute w-40 h-40 rounded-full bg-white/20 blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Discord logo */}
                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                  >
                    <DiscordIcon className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-2xl" />
                  </motion.div>

                  {/* Text */}
                  <motion.p
                    className="mt-6 text-white text-xl md:text-2xl font-semibold tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    Enviando você para o Discord...
                  </motion.p>

                  {/* Loading dots */}
                  <motion.div
                    className="flex gap-2 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-white/70"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </WaterTransitionContext.Provider>
  );
}
