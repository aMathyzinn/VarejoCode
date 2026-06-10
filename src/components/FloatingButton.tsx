"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { useWaterTransition } from "@/components/WaterTransition";

export default memo(function FloatingButton() {
  const { triggerTransition } = useWaterTransition();

  return (
    <motion.button
      onClick={triggerTransition}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black font-semibold py-4 px-6 rounded-full shadow-2xl hover:shadow-black/50 transition-all duration-300 cursor-pointer"
      aria-label="Falar com atendente no Discord"
    >
      <Logo size={24} className="filter brightness-0" />
      <span className="hidden sm:inline">Falar com Atendente</span>
    </motion.button>
  );
});
