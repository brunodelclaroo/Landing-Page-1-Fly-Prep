"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const apps = ["Khan Academy", "UWorld", "Bluebook", "Notes app", "Spreadsheet"];

export function Problem() {
  return (
    <AnimatedSection className="px-5 md:px-16">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 md:flex-row md:items-start">
        <div className="max-w-xl text-center md:text-left">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-orange-accent">
            The problem
          </p>
          <h2 className="mt-4 text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-[56px]">
            5 apps. 0 direction.
          </h2>
          <div className="mt-6 space-y-1 text-[16px] leading-relaxed text-text-secondary md:text-[17px]">
            <p>Khan for videos.</p>
            <p>UWorld for questions.</p>
            <p>Bluebook for tests.</p>
            <p>A notebook for mistakes.</p>
            <p>A spreadsheet for progress.</p>
          </div>
          <p className="mt-6 text-[16px] leading-relaxed text-text-secondary md:text-[17px]">
            That&apos;s how most students prep for the SAT.
            <br />
            It works. Barely. Slowly.
          </p>
          <p className="mt-4 text-[18px] font-semibold text-white">You deserve better.</p>
        </div>

        <div className="relative flex w-full max-w-[300px] flex-col gap-2">
          {apps.map((app, i) => (
            <motion.div
              key={app}
              initial={{ opacity: 0, x: 20, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{
                opacity: [0, 1, 0.6, 1],
                x: 0,
                filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
              }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/5 px-4 py-3"
              style={{ marginLeft: `${i * 8}px` }}
            >
              <span className="text-[14px] font-medium text-text-secondary">{app}</span>
              <span className="h-2 w-2 rounded-full bg-orange-accent/70" />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
