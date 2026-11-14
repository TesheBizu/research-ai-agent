import React from "react";

const VARIANTS = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500",
  secondary: "bg-slate-800 hover:bg-slate-900 text-white shadow-sm focus:ring-slate-700",
  outline: "border border-slate-300 hover:bg-slate-100 text-slate-700 bg-white focus:ring-slate-400",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400",
  danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500"
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs font-medium rounded-md",
  md: "px-4 py-2 text-sm font-medium rounded-lg",
  lg: "px-5 py-2.5 text-base font-medium rounded-lg"
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  onClick,
  icon: Icon,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}

