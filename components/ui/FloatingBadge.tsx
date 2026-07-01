"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingBadgeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export function FloatingBadge({
  children,
  className = "",
  duration = 4,
  delay = 0,
}: FloatingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: 0.6 + delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay: 0.6 + delay },
      }}
      className={`absolute flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-[linear-gradient(135deg,rgba(27,48,123,0.6)_0%,rgba(10,16,36,0.95)_100%)] px-4 py-3 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
