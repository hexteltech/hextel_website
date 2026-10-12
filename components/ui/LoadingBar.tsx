"use client";

import { useEffect, useState } from "react";

export default function LoadingBar() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast snappy feedback on initial mount without artificial blocking delays
    const timer1 = requestAnimationFrame(() => setProgress(100));
    const timer2 = setTimeout(() => setLoading(false), 220);

    return () => {
      cancelAnimationFrame(timer1);
      clearTimeout(timer2);
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
        className="h-full bg-gradient-to-r from-brand-accent via-amber-400 to-brand-accent transition-all duration-200 ease-out shadow-[0_0_10px_rgba(212,163,98,0.8)]"
        style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
      />
    </div>
  );
}
