"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

const MIN_SCORE = 1180;
const MAX_SCORE = 1580;
const READING_MIN = 560;
const READING_MAX = 800;
const MATH_MIN = 480;
const MATH_MAX = 780;
const SCALE_MAX = 800;

const bars = [
  { start: 0, max: 0.4, tone: "blue" },
  { start: 0.04, max: 0.48, tone: "blue" },
  { start: 0.08, max: 0.55, tone: "blue" },
  { start: 0.12, max: 0.64, tone: "blue" },
  { start: 0.18, max: 0.8, tone: "orange" },
  { start: 0.24, max: 0.9, tone: "orange" },
  { start: 0.3, max: 1, tone: "orange" },
] as const;

function Bar({ start, max, tone, progress }: (typeof bars)[number] & { progress: ReturnType<typeof useMotionValue<number>> }) {
  const height = useTransform(progress, [0, start, 1], [0, 0, max]);
  const heightPct = useTransform(height, (v) => `${v * 100}%`);

  return (
    <div className="flex h-full w-full items-end">
      <motion.div
        style={{ height: heightPct }}
        className={`w-full rounded-t-md ${
          tone === "blue"
            ? "bg-gradient-to-t from-blue-primary to-blue-elevated"
            : "bg-gradient-to-t from-orange-accent to-orange-soft"
        }`}
      />
    </div>
  );
}

function ProgressRow({
  label,
  value,
  progress,
  tone,
}: {
  label: string;
  value: number;
  progress: number;
  tone: "blue" | "orange";
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[12px] font-medium text-text-secondary">
        <span>{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${
            tone === "blue" ? "bg-blue-elevated" : "bg-orange-accent"
          }`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

export function DashboardPreview() {
  const progress = useMotionValue(0);
  const [score, setScore] = useState(MIN_SCORE);
  const [reading, setReading] = useState(READING_MIN);
  const [math, setMath] = useState(MATH_MIN);

  useEffect(() => {
    const controls = animate(progress, [0, 1, 1, 0], {
      duration: 5,
      times: [0, 0.55, 0.85, 1],
      ease: ["easeOut", "easeInOut", "easeIn"],
      repeat: Infinity,
      onUpdate: (v) => {
        setScore(Math.round(MIN_SCORE + v * (MAX_SCORE - MIN_SCORE)));
        setReading(Math.round(READING_MIN + v * (READING_MAX - READING_MIN)));
        setMath(Math.round(MATH_MIN + v * (MATH_MAX - MATH_MIN)));
      },
    });
    return () => controls.stop();
  }, [progress]);

  return (
    <div className="w-full max-w-[340px] rounded-3xl border border-white/[0.08] bg-[linear-gradient(160deg,rgba(27,48,123,0.5)_0%,rgba(10,16,36,0.97)_70%)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-secondary">
          Projected SAT score
        </p>
        <span className="rounded-full bg-orange-accent/15 px-2.5 py-1 text-[11px] font-bold text-orange-soft">
          ▲ +400
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-[44px] font-black leading-none tracking-[-0.03em] text-white">
          {score}
        </span>
        <span className="text-[15px] font-medium text-text-tertiary">/ 1600</span>
      </div>

      <div className="mt-6 flex h-24 items-end gap-2">
        {bars.map((bar, i) => (
          <Bar key={i} {...bar} progress={progress} />
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <ProgressRow
          label="Reading & Writing"
          value={reading}
          progress={reading / SCALE_MAX}
          tone="blue"
        />
        <ProgressRow label="Math" value={math} progress={math / SCALE_MAX} tone="orange" />
      </div>
    </div>
  );
}
