import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: "📚",
    title: "Exclusive question bank",
    body: "Every question crafted from real SAT patterns. Built from official sources.",
  },
  {
    icon: "🧠",
    title: "AI tutor",
    body: "Explains your mistakes. Adapts to your gaps. Speaks your language.",
  },
  {
    icon: "📊",
    title: "Real analytics",
    body: "See exactly which topics are losing you points. By subject. By type. By pattern.",
  },
  {
    icon: "🎯",
    title: "Personal study plan",
    body: "Based on your baseline + target score. Adjusts weekly.",
  },
  {
    icon: "🔥",
    title: "Mistake review",
    body: "Every wrong answer becomes a lesson. Automatically categorized.",
  },
  {
    icon: "⚡",
    title: "Friend rankings",
    body: "Compete with people on the same path. Because elite isn't solo.",
  },
];

export function Features() {
  return (
    <AnimatedSection className="px-5 md:px-16">
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-orange-accent">
          What&apos;s inside
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-[56px]">
          Every tool a 1500+ scorer needs.
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-4 text-left md:grid-cols-3 md:gap-6">
          {features.map((f) => (
            <Card key={f.title} className="flex flex-col gap-3">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="text-[20px] font-bold tracking-[-0.02em] text-white md:text-[22px]">
                {f.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-text-secondary md:text-[15px]">
                {f.body}
              </p>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-lg text-[13px] text-text-tertiary">
          Some features are in active development. Founder members get access as
          each launches.
        </p>
      </div>
    </AnimatedSection>
  );
}
