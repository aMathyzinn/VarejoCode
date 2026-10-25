"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { URLS } from "@/lib/constants";
import { useWaterTransition } from "@/components/WaterTransition";

export default function FloatingButton() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isFinalVisible, setIsFinalVisible] = useState(false);
  const { triggerWhatsAppTransition } = useWaterTransition();

  useEffect(() => {
    const hero = document.querySelector(".vc-stage");
    const finalCta = document.querySelector(".vc-final");
    if (!hero || !finalCta) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 0.1 },
    );
    const finalObserver = new IntersectionObserver(
      ([entry]) => setIsFinalVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    heroObserver.observe(hero);
    finalObserver.observe(finalCta);
    return () => {
      heroObserver.disconnect();
      finalObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isPastHero && !isFinalVisible && (
        <motion.a
          href={URLS.WHATSAPP}
          onClick={triggerWhatsAppTransition}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="fixed bottom-5 right-4 z-50 flex min-h-12 min-w-12 items-center justify-center gap-3 rounded-full border border-white/30 bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_6px_14px_rgba(0,0,0,.28)] transition-colors hover:bg-white/85 sm:bottom-6 sm:right-6"
          aria-label="Pedir orçamento no WhatsApp"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span className="hidden sm:inline">Pedir orçamento</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
