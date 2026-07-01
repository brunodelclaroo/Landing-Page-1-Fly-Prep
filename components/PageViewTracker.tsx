"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function PageViewTracker() {
  useEffect(() => {
    trackEvent("lp_view");
  }, []);

  return null;
}
