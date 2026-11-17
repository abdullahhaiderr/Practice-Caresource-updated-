"use client";

import { useEffect, useState } from "react";

type StoredPreference = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "practice-care-source-privacy-preferences-v1";

export function PrivacyPreferences() {
  const [ready, setReady] = useState(false);
  const [hasSavedPreference, setHasSavedPreference] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    try {
      const savedValue = window.localStorage.getItem(STORAGE_KEY);
      if (savedValue) {
        const saved = JSON.parse(savedValue) as Partial<StoredPreference>;
        if (typeof saved.analytics === "boolean") {
          setAnalyticsAllowed(saved.analytics);
          setHasSavedPreference(true);
        }
      }
    } catch {
      setStatusMessage("This browser does not allow saved privacy preferences. Optional analytics remain off.");
    } finally {
      setReady(true);
    }
  }, []);

  function savePreferences(allowAnalytics: boolean) {
    const preference: StoredPreference = {
      necessary: true,
      analytics: allowAnalytics,
      updatedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preference));
      setAnalyticsAllowed(allowAnalytics);
      setHasSavedPreference(true);
      setStatusMessage(
        allowAnalytics
          ? "Your preference is saved. Optional analytics are not currently active on this site."
          : "Your preference is saved. Optional analytics remain off.",
      );
      setPanelOpen(false);
    } catch {
      setAnalyticsAllowed(false);
      setStatusMessage(
        "Your browser could not save this preference. Optional analytics remain off for this visit.",
      );
      setPanelOpen(false);
    }
  }

  return (
    <>
      {ready && !hasSavedPreference && !panelOpen ? (
        <section
          aria-label="Privacy choices"
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-4xl rounded-2xl border border-brand-border bg-white p-5 text-brand-dark shadow-2xl sm:bottom-6 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-lg font-semibold">Your privacy choices</h2>
              <p className="mt-1 text-sm leading-relaxed text-brand-slate">
                Optional analytics are not currently active on this site. Choose whether to allow them if they are added later. Your preference is stored in this browser.
              </p>
              <a
                href="/privacy-policy"
                className="mt-2 inline-flex min-h-8 items-center text-xs font-bold text-brand-accent-ink underline underline-offset-4 hover:text-brand-dark"
              >
                Read the privacy policy
              </a>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPanelOpen(true)}
                className="min-h-10 rounded-pill border border-brand-border px-4 text-sm font-bold text-brand-dark hover:bg-brand-background-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
              >
                Manage
              </button>
              <button
                type="button"
                onClick={() => savePreferences(false)}
                className="min-h-10 rounded-pill border border-brand-border px-4 text-sm font-bold text-brand-dark hover:bg-brand-background-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
              >
                Keep off
              </button>
              <button
                type="button"
                onClick={() => savePreferences(true)}
                className="min-h-10 rounded-pill bg-brand-accent px-4 text-sm font-bold text-white hover:bg-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink focus-visible:ring-offset-2"
              >
                Allow optional
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {panelOpen ? (
        <section
          aria-labelledby="privacy-preferences-title"
          className="fixed inset-x-4 bottom-4 z-[81] mx-auto max-w-xl rounded-2xl border border-brand-border bg-white p-5 text-brand-dark shadow-2xl sm:bottom-6 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="privacy-preferences-title" className="font-display text-xl font-semibold">
                Privacy preferences
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-brand-slate">
                Essential storage is used to remember this choice. Optional analytics are currently disabled and no analytics tool is loaded by this version of the site.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close privacy preferences"
              onClick={() => setPanelOpen(false)}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-brand-border text-lg hover:bg-brand-background-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
            >
              ×
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-brand-border bg-brand-background-wash/35 p-4">
              <p className="text-sm font-bold">Essential site functions</p>
              <p className="mt-1 text-sm leading-relaxed text-brand-slate">
                Always enabled. This control uses browser storage to remember your privacy preference.
              </p>
              <span className="mt-2 inline-flex rounded-pill bg-brand-mint/15 px-3 py-1 text-xs font-bold text-brand-dark">
                Always on
              </span>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-border p-4">
              <input
                type="checkbox"
                checked={analyticsAllowed}
                onChange={(event) => setAnalyticsAllowed(event.target.checked)}
                className="mt-1 size-5 shrink-0 accent-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
              />
              <span>
                <span className="block text-sm font-bold">Optional analytics</span>
                <span className="mt-1 block text-sm leading-relaxed text-brand-slate">
                  Not currently active. This preference records whether you would allow optional analytics if they are introduced. Saving it does not turn on tracking.
                </span>
              </span>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => savePreferences(false)}
              className="min-h-10 rounded-pill border border-brand-border px-4 text-sm font-bold text-brand-dark hover:bg-brand-background-wash"
            >
              Reject optional
            </button>
            <button
              type="button"
              onClick={() => savePreferences(analyticsAllowed)}
              className="min-h-10 rounded-pill bg-brand-accent px-4 text-sm font-bold text-white hover:bg-brand-accent-hover"
            >
              Save preferences
            </button>
          </div>
        </section>
      ) : null}

      {ready ? (
        <div className="fixed bottom-4 right-4 z-[79] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2 sm:bottom-6 sm:right-6">
          <button
            type="button"
            onClick={() => {
              setPanelOpen(true);
              setStatusMessage("");
            }}
            className="rounded-pill border border-brand-border bg-white px-4 py-2 text-xs font-bold text-brand-dark shadow-card hover:bg-brand-background-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-ink"
          >
            Privacy preferences
          </button>
          {statusMessage ? (
            <p role="status" className="max-w-sm rounded-xl border border-brand-border bg-white px-4 py-3 text-xs leading-relaxed text-brand-dark shadow-card">
              {statusMessage}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
