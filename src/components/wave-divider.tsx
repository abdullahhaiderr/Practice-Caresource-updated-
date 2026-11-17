"use client";

import { useEffect, useRef, useState } from "react";

type WaveDividerProps = {
  className?: string;
};

/** Three decorative SVG wave layers that pause when they leave the viewport. */
export function WaveDivider({ className = "" }: WaveDividerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "80px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={[
        "wave-divider pointer-events-none relative h-16 w-full overflow-hidden sm:h-20 lg:h-24",
        isVisible ? "wave-divider--visible" : "",
        className,
      ].filter(Boolean).join(" ")}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
        <path className="wave-divider__layer wave-divider__layer--one" d="M0 36 C180 82 330 94 520 65 C720 34 890 4 1080 35 C1230 60 1330 75 1440 45 V120 H0 Z" fill="rgb(var(--cs-sky) / 0.18)" />
        <path className="wave-divider__layer wave-divider__layer--two" d="M0 58 C170 24 330 20 500 52 C680 86 840 102 1010 70 C1190 36 1310 30 1440 58 V120 H0 Z" fill="rgb(var(--cs-mint) / 0.14)" />
        <path className="wave-divider__layer wave-divider__layer--three" d="M0 78 C190 52 350 52 530 76 C720 102 880 108 1060 86 C1220 67 1330 62 1440 78 V120 H0 Z" fill="rgb(var(--cs-accent) / 0.08)" />
      </svg>
    </div>
  );
}
