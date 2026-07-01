"use client";

import { Logo } from "@/components/ui/Logo";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  function scrollToForm() {
    trackEvent("hero_cta_click");
    document.getElementById("founder-access")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-base/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-16">
        <Logo withWordmark className="text-white" />
        <button
          type="button"
          onClick={scrollToForm}
          className="hidden items-center rounded-full border border-white/20 px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:border-orange-accent md:inline-flex"
        >
          Join waitlist
        </button>
      </div>
    </header>
  );
}
