"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";

const scattered = ["Khan", "UWorld", "Bluebook", "Notes", "Sheets"];

export function Solution() {
  return (
    <AnimatedSection className="px-5 md:px-16">
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-orange-accent">
          The Fly Prep way
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-[56px]">
          One platform. One method.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-text-secondary">
          Fly Prep replaces the chaos with a system. Built for students aiming
          1400+. Designed to be the last SAT tool you&apos;ll open.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
              Before
            </p>
            <div className="flex flex-wrap justify-center gap-2 opacity-60">
              {scattered.map((app) => (
                <span
                  key={app}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-text-secondary"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          <Card className="flex flex-col items-center gap-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-orange-accent">
              After
            </p>
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-primary to-orange-accent">
              <Logo size={44} />
            </div>
            <p className="text-[15px] font-semibold text-white">Fly Prep Dashboard</p>
          </Card>
        </div>
      </div>
    </AnimatedSection>
  );
}
