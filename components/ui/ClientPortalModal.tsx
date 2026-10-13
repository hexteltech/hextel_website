"use client";

import { useState, useEffect } from "react";
import PasswordInput from "./PasswordInput";

export default function ClientPortalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-client-portal", handleOpen);
    return () => window.removeEventListener("open-client-portal", handleOpen);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !accessCode) {
      setStatus("error");
      setFeedback("Please enter both email and access password.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    setTimeout(() => {
      setStatus("success");
      setFeedback("Authentication successful! Welcome to the client environment demo.");
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/75 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Client NDA & Project Portal"
    >
      <div
        className="w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-2xl bg-brand-light dark:bg-[#1A1414] border border-brand-dark/15 dark:border-white/15 p-5 sm:p-8 shadow-2xl text-brand-dark dark:text-brand-light space-y-5 sm:space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold">Client NDA Portal</h3>
              <p className="text-xs text-brand-dark/60 dark:text-brand-light/60">Gated repository & deliverables</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-brand-dark/60 dark:text-brand-light/60 hover:text-brand-dark dark:hover:text-brand-light hover:bg-brand-dark/5 dark:hover:bg-white/5"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {status === "success" ? (
          <div className="space-y-4 py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center text-xl font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-heading font-bold text-base">Access Granted</h4>
              <p className="text-xs text-brand-dark/70 dark:text-brand-light/70 mt-1">{feedback}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setIsOpen(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-dark dark:bg-brand-accent text-brand-light dark:text-brand-dark text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all"
            >
              Continue to Workspace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-brand-dark/80 dark:text-brand-light/80">
                Authorized Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@enterprise.com"
                className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#1E1717] text-brand-dark dark:text-brand-light placeholder-brand-dark/40 dark:placeholder-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
              />
            </div>

            <PasswordInput
              label="Access Password / Key"
              placeholder="Enter confidential passkey"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              showStrength
              required
            />

            {status === "error" && (
              <p className="text-xs text-red-500 font-medium">{feedback}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all bg-brand-dark text-brand-light dark:bg-brand-accent dark:text-brand-dark hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <span>Unlock Protected Deliverables</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
