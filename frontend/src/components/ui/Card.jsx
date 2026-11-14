import React from "react";

export default function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-xs ${
        hover ? "hover:border-slate-300 hover:shadow-sm transition-all" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`p-5 pb-3 border-b border-slate-100 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-base font-semibold text-slate-900 ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = "" }) {
  return <p className={`text-sm text-slate-500 mt-1 ${className}`}>{children}</p>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return <div className={`p-5 pt-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl ${className}`}>{children}</div>;
}

