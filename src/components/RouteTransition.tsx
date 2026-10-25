"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const routeOrder = ["/", "/portfolio", "/tecnologias", "/por-que-barato", "/termos", "/privacidade"];

function normalisePath(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function getDirection(previousPath: string, nextPath: string) {
  const previousIndex = routeOrder.indexOf(normalisePath(previousPath));
  const nextIndex = routeOrder.indexOf(normalisePath(nextPath));

  if (previousIndex === -1 || nextIndex === -1) return 1;
  return nextIndex >= previousIndex ? 1 : -1;
}

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const previousPathRef = useRef(pathname);
  const directionRef = useRef(0);

  if (previousPathRef.current !== pathname) {
    directionRef.current = getDirection(previousPathRef.current, pathname);
    previousPathRef.current = pathname;
  }

  const direction = directionRef.current;

  const travelDistance = reduceMotion ? 0 : 52;

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      <motion.main
        key={pathname}
        className="vc-route-transition"
        custom={direction}
        initial="enter"
        animate="center"
        exit="exit"
        onAnimationComplete={(definition) => {
          if (definition !== "center") return;

          // Resolve the anchor after the destination page has mounted.
          const targetId = window.location.hash.slice(1);
          const target = targetId ? document.getElementById(targetId) : null;
          if (target) {
            target.scrollIntoView({ block: "start" });
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          }
        }}
        variants={{
          enter: (travelDirection: number) => ({ opacity: 0, x: travelDirection * travelDistance }),
          center: { opacity: 1, x: 0 },
          exit: (travelDirection: number) => ({ opacity: 0, x: travelDirection * -travelDistance }),
        }}
        transition={{ duration: reduceMotion ? 0.12 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
