"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface LiveCounterProps {
  taken: number;
  total: number;
}

export function LiveCounter({ taken, total }: LiveCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayTaken, setDisplayTaken] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, taken, {
      type: "spring",
      stiffness: 60,
      damping: 16,
      onUpdate: (v) => setDisplayTaken(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, taken]);

  const pct = Math.min((displayTaken / total) * 100, 100);

  return (
    <div ref={ref} className="w-full max-w-sm">
      <div className="flex items-baseline justify-between font-mono text-sm text-text-secondary">
        <span>Founder spots</span>
        <span className="text-lg font-bold text-white">
          {displayTaken}
          <span className="text-text-tertiary"> / {total}</span>
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-accent to-orange-soft transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
