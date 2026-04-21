import React from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-ring cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#C44D28] text-white hover:bg-[#a6401f] shadow-soft hover:shadow-lift active:translate-y-[1px]",
  secondary:
    "bg-[#147A6B] text-white hover:bg-[#0D5A50] shadow-soft hover:shadow-lift active:translate-y-[1px]",
  outline:
    "border-2 border-[#147A6B] text-[#147A6B] hover:bg-[#147A6B] hover:text-white",
  ghost: "text-[#147A6B] hover:bg-[#147A6B]/10",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
