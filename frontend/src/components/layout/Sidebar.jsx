import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  FileText,
  Database,
  Settings,
  Sparkles,
  X
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "New Research", path: "/research/new", icon: PlusCircle },
  { name: "Research History", path: "/research/history", icon: History },
  { name: "Generated Reports", path: "/reports", icon: FileText },
  { name: "Source Management", path: "/sources", icon: Database },
  { name: "Settings", path: "/settings", icon: Settings }
];

export default function Sidebar({ isOpen, onClose }) {
  // Close drawer on Escape key press and manage body scroll lock on mobile
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile backdrop with click-to-close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        id="app-sidebar"
        role="dialog"
        aria-modal={isOpen ? "true" : undefined}
        aria-label="Navigation Sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto shadow-xl lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800">
          <NavLink
            to="/"
            onClick={() => onClose && onClose()}
            className="flex items-center gap-2.5 font-bold text-white text-lg tracking-tight"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>ResearchAI</span>
          </NavLink>
          <button
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden focus:outline-none focus:ring-2 focus:ring-slate-500"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info badge */}
        <div className="p-4 border-t border-slate-800">
          <div className="p-3 bg-slate-800/60 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Phase: Foundation</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">MERN · Cala.ai · LLM</p>
          </div>
        </div>
      </aside>
    </>
  );
}
