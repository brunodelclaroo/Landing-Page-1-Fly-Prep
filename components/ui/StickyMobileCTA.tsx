"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? scrolled / scrollable : 0;
      setVisible(pct > 0.3);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    trackEvent("sticky_cta_click");
    document.getElementById("founder-access")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-base/95 p-4 backdrop-blur-lg md:hidden"
        >
          <button
            type="button"
            onClick={handleClick}
            className="flex min-h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-accent to-[#FF8B4A] px-6 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(247,115,53,0.4)] active:scale-[0.98]"
          >
            Claim Founder Access →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
