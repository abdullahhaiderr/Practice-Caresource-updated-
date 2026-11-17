"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import {
  contactFormSchema,
  serviceOptions,
  type ContactFormValues,
} from "@/lib/contact-schema";

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
  "mt-2 min-h-12 w-full rounded-xl border border-brand-border bg-brand-background px-4 py-3 text-brand-dark placeholder:text-brand-slate/65 transition-colors focus:border-brand-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25";
const labelClass = "block text-sm font-bold text-brand-dark";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-brand-accent-ink">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const captchaContainerRef = useRef<HTMLDivElement>(null);
  const captchaWidgetRef = useRef<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
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
    if (!turnstileSiteKey || !captchaReady || !captchaContainerRef.current) return;
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
  }, [captchaReady, updateCaptchaToken]);

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
        for (const [field, message] of Object.entries(result.errors ?? {})) {
          if (field in values && message) {
            setError(field as keyof ContactFormValues, {
              type: "server",
              message,
            });
          }
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
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
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
          <FieldError
            id="practiceName-error"
            message={errors.practiceName?.message}
          />
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
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>

        <div>
          <label className={labelClass} htmlFor="specialty">
            Practice specialty <span aria-hidden="true">*</span>
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
            This helps us understand the type of workflow you want to discuss. It is not a list of confirmed service specialties.
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
          <FieldError
            id="serviceInterestedIn-error"
            message={errors.serviceInterestedIn?.message}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          How can we support your practice? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          maxLength={2000}
          placeholder="Share your general business goals or the workflow you would like to discuss."
          className={`${fieldClass} min-h-36 resize-y`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error message-hint" : "message-hint"}
          {...register("message")}
        />
        <p id="message-hint" className="mt-2 text-sm leading-relaxed text-brand-slate">
          Business inquiries only. Do not submit patient names, dates of birth, medical record details, insurance identifiers, protected health information (PHI), or other sensitive patient data.
        </p>
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {captchaRequired ? (
        <div className="rounded-2xl border border-brand-border bg-brand-background-wash/45 p-4">
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={() => setCaptchaReady(true)}
            onError={() => setCaptchaError("The security check could not be loaded. Refresh the page and try again.")}
          />
          <p className="mb-3 text-sm font-semibold text-brand-dark">Complete the security check before sending.</p>
          <div ref={captchaContainerRef} />
          {captchaError ? (
            <p role="alert" className="mt-2 text-sm font-semibold text-brand-accent-ink">{captchaError}</p>
          ) : null}
          <input type="hidden" {...register("turnstileToken")} />
        </div>
      ) : (
        <input type="hidden" {...register("turnstileToken")} />
      )}

      <div className="flex items-start gap-3">
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
          className="flex items-start gap-3 rounded-2xl border border-brand-border bg-brand-background-wash/45 p-4 text-sm leading-relaxed text-brand-dark"
        >
          {submitStatus.type === "success" ? (
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-accent-ink" aria-hidden="true" />
          ) : (
            <AlertCircle size={20} className="mt-0.5 shrink-0 text-brand-accent-ink" aria-hidden="true" />
          )}
          <p>{submitStatus.message}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-brand-slate">
          Required fields are marked *. Email receipts are sent when the email provider accepts the request.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || (captchaRequired && !turnstileToken)}
          className="w-full shrink-0 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin motion-reduce:animate-none" size={18} aria-hidden="true" />
              Sending…
            </>
          ) : (
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              Send inquiry
              <Send size={17} aria-hidden="true" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
