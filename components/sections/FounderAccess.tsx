"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { waitlistSchema, type WaitlistInput } from "@/lib/schemas";
import { formatBrazilianWhatsapp } from "@/lib/phone-mask";
import { trackEvent } from "@/lib/analytics";

export function FounderAccess() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successName, setSuccessName] = useState<string | null>(null);
  const hasStartedRef = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { firstName: "", whatsapp: "+55" },
  });

  function handleFocusStart() {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackEvent("form_start");
  }

  async function onSubmit(values: WaitlistInput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      trackEvent("form_submit_success");
      setSuccessName(values.firstName);
    } catch (err) {
      trackEvent("form_submit_error");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <AnimatedSection id="founder-access" className="px-5 md:px-16">
      <div className="mx-auto max-w-[720px] rounded-3xl border border-white/[0.08] bg-[linear-gradient(135deg,rgba(27,48,123,0.35)_0%,rgba(10,16,36,0.95)_100%)] p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:p-14">
        <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-orange-accent">
          Founder access — first 100 members
        </p>
        <h2 className="mt-4 text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-[48px]">
          Get in before everyone else.
        </h2>

        <div className="mx-auto mt-6 max-w-md text-left text-[15px] leading-relaxed text-text-secondary">
          <p>The first 100 founder members get:</p>
          <ul className="mt-3 space-y-2">
            <li>→ Priority access before public launch</li>
            <li>→ Direct WhatsApp updates</li>
            <li>→ Vote on features before they ship</li>
            <li>→ Access as each tool launches (not all at once)</li>
          </ul>
          <p className="mt-4 text-white">
            Once the first 100 are in, early access closes. Forever.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-sm items-center gap-3 rounded-2xl border border-orange-accent/30 bg-orange-accent/10 px-5 py-4 text-left">
          <span className="text-xl" aria-hidden>
            ⚡
          </span>
          <p className="text-[14px] font-medium text-orange-soft">
            Founder spots are limited — secure yours before they&apos;re gone.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-sm">
          <AnimatePresence mode="wait">
            {successName ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center gap-4 py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-accent text-2xl text-white"
                >
                  ✓
                </motion.div>
                <p className="text-[17px] font-semibold text-white">
                  Welcome, {successName}. We&apos;ll be in touch on WhatsApp within
                  48h.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                onFocus={handleFocusStart}
                className="flex flex-col gap-4 text-left"
                noValidate
              >
                <FormField
                  label="First name"
                  placeholder="Alex"
                  autoComplete="given-name"
                  error={errors.firstName?.message}
                  {...register("firstName")}
                />
                <FormField
                  label="WhatsApp number"
                  placeholder="+55 (11) 98765-4321"
                  inputMode="tel"
                  autoComplete="tel"
                  error={errors.whatsapp?.message}
                  {...register("whatsapp")}
                  value={watch("whatsapp")}
                  onChange={(e) =>
                    setValue("whatsapp", formatBrazilianWhatsapp(e.target.value), {
                      shouldValidate: true,
                    })
                  }
                />
                {submitError && (
                  <p className="text-[13px] text-red-400">{submitError}</p>
                )}
                <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full">
                  I want early access →
                </Button>
                <p className="text-center text-[12px] leading-relaxed text-text-tertiary">
                  Free to join the waitlist. Early access opens in August. We
                  only send updates via WhatsApp — no spam.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-white/[0.08] bg-white/5 px-4 py-2 text-[12px] text-text-secondary">
            🔒 We&apos;ll never spam
          </span>
          <span className="rounded-full border border-white/[0.08] bg-white/5 px-4 py-2 text-[12px] text-text-secondary">
            📱 Opt out anytime
          </span>
        </div>
      </div>
    </AnimatedSection>
  );
}
