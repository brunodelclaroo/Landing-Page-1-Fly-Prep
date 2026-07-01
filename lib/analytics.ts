declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export type AnalyticsEvent =
  | "lp_view"
  | "hero_cta_click"
  | "form_start"
  | "form_submit_success"
  | "form_submit_error"
  | "sticky_cta_click"
  | "faq_expand";

export function trackEvent(
  event: AnalyticsEvent,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || !window.plausible) return;
  window.plausible(event, props ? { props } : undefined);
}
