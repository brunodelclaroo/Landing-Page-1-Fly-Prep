"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

const MIN_SCORE = 1180;
const MAX_SCORE = 1500;
const CHART_TOP = 30;
const CHART_BOTTOM = 190;
const BAR_MAX_HEIGHT = CHART_BOTTOM - CHART_TOP;

export function ScoreChart() {
  const progress = useMotionValue(0);
  const [displayScore, setDisplayScore] = useState(MIN_SCORE);

  const barHeight = useTransform(progress, (v) => 20 + v * (BAR_MAX_HEIGHT - 20));
  const barY = useTransform(barHeight, (h) => CHART_BOTTOM - h);

  useEffect(() => {
    const controls = animate(progress, [0, 1, 1, 0], {
      duration: 5,
      times: [0, 0.5, 0.85, 1],
      ease: ["easeOut", "easeInOut", "easeIn"],
      repeat: Infinity,
      onUpdate: (v) => setDisplayScore(Math.round(MIN_SCORE + v * (MAX_SCORE - MIN_SCORE))),
    });
    return () => controls.stop();
  }, [progress]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-secondary">
          Projected score
        </p>
        <p className="text-4xl font-black tracking-[-0.03em] text-white">
          {displayScore}
        </p>
      </div>
      <svg viewBox="0 0 200 220" className="h-40 w-32" aria-hidden>
        <line
          x1="10"
          y1={CHART_BOTTOM}
          x2="190"
          y2={CHART_BOTTOM}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <motion.rect
          x="70"
          width="60"
          rx="10"
          y={barY}
          height={barHeight}
          fill="url(#score-gradient)"
        />
        <defs>
          <linearGradient id="score-gradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#F77335" />
            <stop offset="100%" stopColor="#FFB88A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
