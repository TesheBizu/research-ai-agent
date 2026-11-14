import React from "react";
import Button from "./Button.jsx";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-slate-300 ${className}`}>
      {Icon && (
        <div className="w-12 h-12 mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-base font-medium text-slate-900">{title}</h3>
      {description && <p className="text-sm text-slate-500 max-w-sm mt-1">{description}</p>}
      {actionText && onAction && (
        <div className="mt-4">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}

