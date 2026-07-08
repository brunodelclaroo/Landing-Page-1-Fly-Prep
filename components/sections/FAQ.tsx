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
    id: "founder-access",
    question: "What does Founder Access include?",
    answer:
      "Founder Access gives the first 100 members early access to Fly Prep and a 30% lifetime discount when pricing goes live. Once those 100 spots are filled, this offer is gone for good.",
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
      "Pricing hasn't been announced yet. Founder members get priority access before public launch, a say in what we build first, and the first 100 lock in 30% off for life. Free to join Founder Access.",
  },
  {
    id: "closes",
    question: "When does founder access close?",
    answer:
      "When 100 members join — and with it, the 30% lifetime discount.",
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
