"use client";

import { useEffect, useRef, useState } from "react";

type WaveDividerProps = {
  tone?: "to-light" | "to-dark";
  className?: string;
};

export function WaveDivider({ tone = "to-light", className = "" }: WaveDividerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = rootRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "80px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const fill = tone === "to-dark" ? "rgb(var(--cs-navy))" : "rgb(var(--cs-background))";
  return (
    <div ref={rootRef} aria-hidden="true" className={`wave-divider pointer-events-none relative h-14 w-full overflow-hidden sm:h-20 ${visible ? "wave-divider--visible" : ""} ${className}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 100" preserveAspectRatio="none" focusable="false">
        <path className="wave-divider__layer wave-divider__layer--one" d="M0 24 C180 66 320 75 510 48 C700 20 900 6 1080 32 C1230 54 1350 65 1440 36 V100 H0 Z" fill={fill} opacity=".35" />
        <path className="wave-divider__layer wave-divider__layer--two" d="M0 48 C170 18 335 16 510 48 C685 80 850 84 1035 60 C1200 38 1320 34 1440 54 V100 H0 Z" fill={fill} opacity=".62" />
        <path className="wave-divider__layer wave-divider__layer--three" d="M0 68 C180 47 350 48 535 69 C720 88 900 90 1080 74 C1240 60 1340 57 1440 70 V100 H0 Z" fill={fill} />
      </svg>
    </div>
  );
}
