import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Features } from "@/components/sections/Features";
import { FounderAccess } from "@/components/sections/FounderAccess";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";
import { PageViewTracker } from "@/components/PageViewTracker";

export default function Home() {
  return (
    <main className="relative">
      <PageViewTracker />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <FounderAccess />
      <FAQ />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
