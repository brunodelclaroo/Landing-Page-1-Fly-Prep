import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FAQItem } from "@/components/ui/FAQItem";

const faqs = [
  {
    id: "live",
    question: "Is Fly Prep live now?",
    answer:
      "We're in active build. Founder members will get access to each tool as it launches, starting August 2026. You'll be the first in.",
  },
  {
    id: "khan",
    question: "How is this different from Khan Academy?",
    answer:
      "Khan is the floor — free videos and practice. Fly Prep is the method on top: verified questions built to match the real SAT, AI tutor for personalized explanations, analytics that show you exactly where you're losing points.",
  },
  {
    id: "questions",
    question: "Where do the questions come from?",
    answer:
      "Every Fly Prep question is exclusive — crafted internally to match real SAT patterns from official sources (College Board, Bluebook). We don't reuse questions from other platforms.",
  },
  {
    id: "cost",
    question: "What does Fly Prep cost?",
    answer:
      "Founder members get 40% off for life. Regular pricing announced at launch. Free to join the waitlist.",
  },
  {
    id: "closes",
    question: "When does founder access close?",
    answer: "When 100 members join.",
  },
];

export function FAQ() {
  return (
    <AnimatedSection className="px-5 md:px-16">
      <div className="mx-auto max-w-[720px]">
        <h2 className="text-center text-[36px] font-extrabold tracking-[-0.03em] text-white md:text-[48px]">
          Questions?
        </h2>
        <div className="mt-10">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
