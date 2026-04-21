"use client";

import React, { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  hint,
  error,
  icon,
  className = "",
  type = "text",
  ...rest
}: InputProps) {
  const id = useId();
  const [showPwd, setShowPwd] = useState(false);
  const isPwd = type === "password";
  const inputType = isPwd ? (showPwd ? "text" : "password") : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={rest.id ?? id}
          className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5"
        >
          {label}
        </label>
      )}
      <div
        className={`relative flex items-center border ${
          error ? "border-red-500" : "border-[#E6E8EB]"
        } bg-white rounded-xl focus-within:border-[#147A6B] focus-within:ring-2 focus-within:ring-[#147A6B]/20 transition-all`}
      >
        {icon && (
          <span className="pl-4 text-[#4A4A4A] pointer-events-none">{icon}</span>
        )}
        <input
          id={rest.id ?? id}
          type={inputType}
          {...rest}
          className={`flex-1 bg-transparent px-4 py-3 text-[15px] text-[#1A1A1A] placeholder-[#9AA0A6] outline-none ${className}`}
        />
        {isPwd && (
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            aria-label={showPwd ? "Hide password" : "Show password"}
            className="px-3 text-[#4A4A4A] hover:text-[#147A6B] transition-colors"
          >
            {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {hint && !error && <p className="mt-1.5 text-xs text-[#4A4A4A]">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
