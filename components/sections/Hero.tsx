"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ScoreChart } from "@/components/ui/ScoreChart";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { FloatingBadge } from "@/components/ui/FloatingBadge";
import { Logo } from "@/components/ui/Logo";
import { trackEvent } from "@/lib/analytics";

const pills = ["AI Tutor", "Real Analytics", "Exclusive Questions"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Hero() {
  function scrollToForm() {
    trackEvent("hero_cta_click");
    document.getElementById("founder-access")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-16 md:px-16 md:pb-32 md:pt-24">
      <MeshBackground />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-blue-elevated/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-40 -z-10 h-80 w-80 rounded-full bg-orange-accent/20 blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-xl flex-col items-center text-center md:items-start md:text-left"
        >
          <motion.button
            variants={item}
            type="button"
            onClick={scrollToForm}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-accent/30 bg-orange-accent/10 px-4 py-1.5 text-[12px] font-semibold text-orange-soft transition-colors hover:border-orange-accent/60"
          >
            🔥 Founder access open — 40% off for life
          </motion.button>

          <motion.div variants={item} className="flex items-center gap-2">
            <Logo iconClassName="h-4 w-4" className="text-orange-accent" />
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-orange-accent">
              Fly Prep — SAT prep, redesigned
            </p>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-4 text-[48px] font-black leading-[1.02] tracking-[-0.04em] text-white md:text-[88px]"
          >
            The SAT platform built for 1500+.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-[18px] leading-relaxed text-text-secondary md:text-[20px]"
          >
            Verified content. AI tutor. Real analytics. One platform. One method.
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <Button variant="primary" onClick={scrollToForm}>
              Join the founder waitlist →
            </Button>
          </motion.div>

          <motion.p variants={item} className="mt-4 text-[13px] text-text-tertiary">
            Free. No credit card. WhatsApp updates.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-2 md:justify-start">
            {pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/[0.08] bg-white/5 px-3 py-1.5 text-[12px] font-medium text-text-secondary"
              >
                {pill}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex max-h-[60vh] w-full max-w-[300px] justify-center md:max-h-none"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-orange-accent/20 blur-[80px]"
          />
          <div className="relative aspect-[9/19] w-full max-w-[280px] rounded-[42px] border border-white/10 bg-[linear-gradient(160deg,#1B307B_0%,#0A1024_70%)] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="flex h-full flex-col items-center justify-center rounded-[30px] border border-white/[0.06] bg-base/60 px-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-secondary">
                Fly Prep Dashboard
              </p>
              <div className="mt-6">
                <ScoreChart />
              </div>
            </div>
          </div>

          <FloatingBadge className="hidden -left-16 top-6 md:flex" duration={4}>
            🎯 Personal study plan
          </FloatingBadge>
          <FloatingBadge className="hidden -right-14 bottom-16 md:flex" duration={4.5} delay={0.8}>
            📊 Real-time analytics
          </FloatingBadge>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-16 flex justify-center md:mt-24"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
