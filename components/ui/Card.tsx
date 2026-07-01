"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-3xl border border-white/[0.08] bg-[linear-gradient(135deg,rgba(27,48,123,0.4)_0%,rgba(10,16,36,0.9)_100%)] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-[border-color] duration-200 hover:border-orange-accent/40 ${className}`}
    >
      {children}
    </motion.div>
  );
}
