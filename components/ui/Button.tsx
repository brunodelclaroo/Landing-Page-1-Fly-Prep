"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  isLoading?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 min-h-11 text-[15px] font-semibold transition-[filter,transform,border-color] duration-200 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "text-white bg-gradient-to-r from-orange-accent to-[#FF8B4A] shadow-[0_8px_24px_rgba(247,115,53,0.4)] hover:brightness-110",
  secondary:
    "text-white bg-transparent border border-white/20 hover:border-orange-accent",
};

export function Button({
  variant = "primary",
  children,
  className = "",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...(props as Record<string, unknown>)}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        children
      )}
    </motion.button>
  );
}
