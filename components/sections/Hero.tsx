"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ScoreChart } from "@/components/ui/ScoreChart";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  function scrollToForm() {
    trackEvent("hero_cta_click");
    document.getElementById("founder-access")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-20 md:px-16 md:pb-24 md:pt-28">
      <MeshBackground />
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex max-w-xl flex-col items-center text-center md:items-start md:text-left"
        >
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-orange-accent">
            Fly Prep — SAT prep, redesigned
          </p>
          <h1 className="mt-4 text-[48px] font-black leading-[1.02] tracking-[-0.04em] text-white md:text-[88px]">
            The SAT platform built for 1500+.
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-text-secondary md:text-[20px]">
            Verified content. AI tutor. Real analytics. One platform. One method.
          </p>
          <div className="mt-8">
            <Button variant="primary" onClick={scrollToForm}>
              Join the founder waitlist →
            </Button>
          </div>
          <p className="mt-4 text-[13px] text-text-tertiary">
            Free. No credit card. WhatsApp updates.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex max-h-[60vh] w-full max-w-[300px] justify-center md:max-h-none"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
