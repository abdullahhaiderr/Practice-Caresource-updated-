"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import {
  contactFormSchema,
  serviceOptions,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

type SubmitStatus =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-brand-dark placeholder:text-brand-slate/65 transition-colors focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20";
const labelClass = "block text-sm font-bold text-brand-navy";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-brand-accent-ink">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [focusField, setFocusField] = useState<keyof ContactFormValues | null>(null);
  const captchaContainerRef = useRef<HTMLDivElement>(null);
  const captchaWidgetRef = useRef<string | null>(null);
  const reducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    setFocus,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      practiceName: "",
      email: "",
      phone: "",
      specialty: "",
      serviceInterestedIn: "",
      message: "",
      consent: false,
      website: "",
      turnstileToken: "",
    },
  });

  const updateCaptchaToken = useCallback(
    (token: string) => {
      setValue("turnstileToken", token, {
        shouldDirty: true,
        shouldValidate: true,
      });
      if (token) setCaptchaError("");
    },
    [setValue],
  );

  useEffect(() => {
    if (step !== 2 || !turnstileSiteKey || !captchaReady || !captchaContainerRef.current) return;
    if (!window.turnstile || captchaWidgetRef.current) return;

    try {
      captchaWidgetRef.current = window.turnstile.render(captchaContainerRef.current, {
        sitekey: turnstileSiteKey,
        theme: "light",
        callback: updateCaptchaToken,
        "expired-callback": () => {
          updateCaptchaToken("");
          setCaptchaError("The security check expired. Please complete it again.");
        },
        "error-callback": () => {
          updateCaptchaToken("");
          setCaptchaError("The security check could not be completed. Refresh the page and try again.");
        },
      });
    } catch {
      setCaptchaError("The security check could not be loaded. Refresh the page and try again.");
    }

    return () => {
      if (captchaWidgetRef.current && window.turnstile) {
        window.turnstile.remove(captchaWidgetRef.current);
        captchaWidgetRef.current = null;
      }
    };
  }, [captchaReady, step, updateCaptchaToken]);

  useEffect(() => {
    if (!focusField) return;
    setFocus(focusField);
    setFocusField(null);
  }, [focusField, setFocus, step]);

  async function moveToDetails() {
    const valid = await trigger(
      ["fullName", "practiceName", "email", "phone"],
      { shouldFocus: true },
    );
    if (valid) {
      setSubmitStatus(null);
      setStep(2);
    }
  }

  function handleFirstStepSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void moveToDetails();
  }

  async function onSubmit(values: ContactFormValues) {
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok) {
        const serverErrors = Object.entries(result.errors ?? {});
        for (const [field, message] of serverErrors) {
          if (field in values && message) {
            setError(field as keyof ContactFormValues, {
              type: "server",
              message,
            });
          }
        }
        const firstStepError = serverErrors.find(([field]) =>
          ["fullName", "practiceName", "email", "phone"].includes(field),
        );
        if (firstStepError) {
          setStep(1);
          setFocusField(firstStepError[0] as keyof ContactFormValues);
        }
        setSubmitStatus({
          type: "error",
          message:
            result.message ??
            "We couldn't send your request. Please review the form and try again.",
        });
        return;
      }

      setSubmitStatus({
        type: "success",
        message:
          result.message ??
          "Your request has been sent to Practice Care Source.",
      });
      reset();
      setStep(1);

      if (captchaWidgetRef.current && window.turnstile) {
        window.turnstile.reset(captchaWidgetRef.current);
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "We couldn't send your request right now. Please check your connection or email us directly.",
      });
    }
  }

  const captchaRequired = Boolean(turnstileSiteKey);
  const turnstileToken = watch("turnstileToken");

  return (
    <form
      noValidate
      onSubmit={step === 1 ? handleFirstStepSubmit : handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent-ink">
            Step {step} of 2
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-brand-navy">
            {step === 1 ? "Your contact details" : "The support you’re exploring"}
          </h3>
        </div>
        <span className="rounded-full border border-brand-border bg-brand-background-wash/60 px-3 py-1.5 text-xs font-bold text-brand-slate">
          {step === 1 ? "About you" : "Your enquiry"}
        </span>
      </div>

      <div
        className="grid h-1.5 grid-cols-2 gap-2 overflow-hidden rounded-full bg-brand-background-wash"
        role="progressbar"
        aria-label="Contact form progress"
        aria-valuemin={1}
        aria-valuemax={2}
        aria-valuenow={step}
      >
        <span className={step >= 1 ? "rounded-full bg-brand-accent" : "rounded-full bg-transparent"} />
        <span className={step >= 2 ? "rounded-full bg-brand-accent" : "rounded-full bg-transparent"} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === 1 ? (
          <motion.div
            key="contact-details"
            initial={reducedMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div>
              <label className={labelClass} htmlFor="fullName">
                Full name <span aria-hidden="true">*</span>
              </label>
              <input
                id="fullName"
                autoComplete="name"
                className={fieldClass}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                {...register("fullName")}
              />
              <FieldError id="fullName-error" message={errors.fullName?.message} />
            </div>

            <div>
              <label className={labelClass} htmlFor="practiceName">
                Practice or organization <span aria-hidden="true">*</span>
              </label>
              <input
                id="practiceName"
                autoComplete="organization"
                className={fieldClass}
                aria-invalid={Boolean(errors.practiceName)}
                aria-describedby={errors.practiceName ? "practiceName-error" : undefined}
                {...register("practiceName")}
              />
              <FieldError id="practiceName-error" message={errors.practiceName?.message} />
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                Work email <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={fieldClass}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              <FieldError id="email-error" message={errors.email?.message} />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">
                Phone number <span className="font-normal text-brand-slate">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Add a number if you prefer"
                className={fieldClass}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                {...register("phone")}
              />
              <p id="phone-hint" className="mt-2 text-xs leading-relaxed text-brand-slate">
                You can leave this blank and continue by email.
              </p>
              <FieldError id="phone-error" message={errors.phone?.message} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="enquiry-details"
            initial={reducedMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="specialty">
                  Practice specialty <span className="font-normal text-brand-slate">(optional)</span>
                </label>
                <input
                  id="specialty"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your practice specialty"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.specialty)}
                  aria-describedby={errors.specialty ? "specialty-error" : "specialty-hint"}
                  {...register("specialty")}
                />
                <p id="specialty-hint" className="mt-2 text-xs leading-relaxed text-brand-slate">
                  Add this only if it helps explain the workflow you want to discuss.
                </p>
                <FieldError id="specialty-error" message={errors.specialty?.message} />
              </div>

              <div>
                <label className={labelClass} htmlFor="serviceInterestedIn">
                  Service of interest <span aria-hidden="true">*</span>
                </label>
                <select
                  id="serviceInterestedIn"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.serviceInterestedIn)}
                  aria-describedby={errors.serviceInterestedIn ? "serviceInterestedIn-error" : undefined}
                  {...register("serviceInterestedIn")}
                >
                  <option value="">Choose a service</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
                <FieldError id="serviceInterestedIn-error" message={errors.serviceInterestedIn?.message} />
              </div>
            </div>

            <div className="rounded-2xl border border-brand-accent/20 bg-brand-background-wash/55 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-brand-sky/15 text-brand-navy">
                  <AlertCircle size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-brand-navy">Business enquiries only — please do not include PHI</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-slate">
                    Do not submit patient names, dates of birth, medical record details, insurance identifiers, protected health information, or other sensitive patient data.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="message">
                What would you like to discuss? <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                maxLength={2000}
                placeholder="Share your general business goals or the workflow you would like to discuss."
                className={`${fieldClass} min-h-36 resize-y`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : "message-hint"}
                {...register("message")}
              />
              <p id="message-hint" className="mt-2 text-xs leading-relaxed text-brand-slate">
                A general description is enough. Please do not include patient or confidential record details.
              </p>
              <FieldError id="message-error" message={errors.message?.message} />
            </div>

            {captchaRequired ? (
              <div className="rounded-2xl border border-brand-border bg-white p-4">
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                  strategy="afterInteractive"
                  onReady={() => setCaptchaReady(true)}
                  onError={() => setCaptchaError("The security check could not be loaded. Refresh the page and try again.")}
                />
                <p className="mb-3 text-sm font-semibold text-brand-navy">Complete the security check before sending.</p>
                <div ref={captchaContainerRef} />
                {captchaError ? (
                  <p role="alert" className="mt-2 text-sm font-semibold text-brand-accent-ink">{captchaError}</p>
                ) : null}
                <input type="hidden" {...register("turnstileToken")} />
              </div>
            ) : (
              <input type="hidden" {...register("turnstileToken")} />
            )}

            <div className="flex items-start gap-3 rounded-xl border border-brand-border p-4">
              <input
                id="consent"
                type="checkbox"
                className="mt-1 size-5 shrink-0 rounded border-brand-border accent-brand-accent-ink focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                {...register("consent")}
              />
              <div>
                <label htmlFor="consent" className="text-sm leading-relaxed text-brand-dark">
                  I agree that Practice Care Source may contact me about this business inquiry. <span aria-hidden="true">*</span>
                </label>
                <FieldError id="consent-error" message={errors.consent?.message} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {submitStatus ? (
        <div
          role={submitStatus.type === "success" ? "status" : "alert"}
          aria-live="polite"
          className="flex items-start gap-3 rounded-2xl border border-brand-border bg-brand-background-wash/55 p-4 text-sm leading-relaxed text-brand-dark"
        >
          {submitStatus.type === "success" ? (
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-accent-ink" aria-hidden="true" />
          ) : (
            <AlertCircle size={20} className="mt-0.5 shrink-0 text-brand-accent-ink" aria-hidden="true" />
          )}
          <div>
            <p>{submitStatus.message}</p>
            {submitStatus.type === "error" ? (
              <a href={`mailto:${siteConfig.contactEmail}`} className="mt-2 inline-flex font-bold text-brand-accent-ink underline underline-offset-4">
                Email us directly
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-brand-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        {step === 1 ? (
          <>
            <p className="text-xs leading-relaxed text-brand-slate">Start with your contact details. No account is needed.</p>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Continue <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => { setSubmitStatus(null); setStep(1); }}
              disabled={isSubmitting}
              className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full px-4 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-background-wash disabled:opacity-50"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Back
            </button>
            <div className="flex flex-col gap-3 sm:items-end">
              <p className="text-xs leading-relaxed text-brand-slate">Required fields are marked *. You can leave your phone and specialty blank.</p>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || (captchaRequired && !turnstileToken)}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin motion-reduce:animate-none" size={18} aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    Send inquiry <Send size={17} aria-hidden="true" />
                  </span>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
