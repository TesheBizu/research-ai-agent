import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, User, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";

export default function Header({ onMenuClick, title = "Dashboard" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-slate-800 tracking-tight hidden sm:block">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search placeholder */}
        <div className="relative hidden md:block w-64 lg:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            readOnly
            placeholder="Search reports and sources... (Preview)"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-600 cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Notifications placeholder */}
        <button
          type="button"
          disabled
          className="p-2 text-slate-400 hover:text-slate-600 rounded-lg cursor-not-allowed relative"
          title="Notifications placeholder"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full absolute top-2 right-2" />
        </button>

        {/* Authenticated User Profile & Logout */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium text-xs shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden xl:block text-left max-w-[160px]">
            <div className="text-xs font-semibold text-slate-800 leading-tight truncate">
              {user?.name || "Authenticated User"}
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              {user?.email || ""}
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-label="Log out"
            title="Log out"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">{isLoggingOut ? "Signing out..." : "Logout"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
