"use client";

import { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showStrength?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, showStrength, value = "", onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [capsLockActive, setCapsLockActive] = useState(false);

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      setCapsLockActive(e.getModifierState("CapsLock"));
    };

    const strValue = typeof value === "string" ? value : "";

    // Simple strength evaluator
    const getStrength = (val: string) => {
      if (!val) return 0;
      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      return score;
    };

    const strength = getStrength(strValue);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark/80 dark:text-brand-light/80">
              {label}
            </label>
            {capsLockActive && (
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
                Caps Lock On
              </span>
            )}
          </div>
        )}

        <div className="relative">
          <input
            {...props}
            ref={ref}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            onKeyUp={handleKeyUp}
            className={cn(
              "w-full px-4 py-3 pr-11 rounded-xl border border-brand-dark/15 dark:border-white/15 bg-white dark:bg-[#1E1717] text-brand-dark dark:text-brand-light placeholder-brand-dark/40 dark:placeholder-brand-light/40 text-sm focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
          />

          {/* Password Visibility Toggle Button */}
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-brand-dark/60 dark:text-brand-light/60 hover:text-brand-dark dark:hover:text-brand-light hover:bg-brand-dark/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Eye-Slash Icon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            ) : (
              // Eye Icon
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Optional Strength Bar */}
        {showStrength && strValue.length > 0 && (
          <div className="space-y-1 pt-1">
            <div className="grid grid-cols-4 gap-1.5 h-1">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    strength >= step
                      ? strength <= 1
                        ? "bg-red-500"
                        : strength <= 2
                        ? "bg-amber-500"
                        : strength <= 3
                        ? "bg-yellow-500"
                        : "bg-emerald-500"
                      : "bg-brand-dark/10 dark:bg-white/10"
                  )}
                />
              ))}
            </div>
            <p className="text-[10px] text-right text-brand-dark/60 dark:text-brand-light/60">
              {strength <= 1 ? "Weak" : strength <= 2 ? "Moderate" : strength <= 3 ? "Strong" : "Very Strong"}
            </p>
          </div>
        )}

        {error && (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
