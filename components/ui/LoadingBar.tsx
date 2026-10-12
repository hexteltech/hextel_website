"use client";

import { useEffect, useState } from "react";

export default function LoadingBar() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initial mount loading animation
    const timer1 = setTimeout(() => setProgress(35), 100);
    const timer2 = setTimeout(() => setProgress(75), 350);
    const timer3 = setTimeout(() => setProgress(100), 600);
    const timer4 = setTimeout(() => setLoading(false), 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className="h-full bg-gradient-to-r from-brand-accent via-amber-400 to-brand-accent transition-all duration-300 ease-out shadow-[0_0_10px_rgba(212,163,98,0.8)]"
        style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
      />
    </div>
  );
}
