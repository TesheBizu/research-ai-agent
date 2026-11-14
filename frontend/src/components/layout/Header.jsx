import React from "react";
import { Menu, Search, Bell, User } from "lucide-react";

export default function Header({ onMenuClick, title = "Dashboard" }) {
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
        >
          <Bell className="w-4 h-4" />
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full absolute top-2 right-2" />
        </button>

        {/* User profile placeholder */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-slate-800 leading-tight">Research User</div>
            <div className="text-[10px] text-slate-500">Demo Session</div>
          </div>
        </div>
      </div>
    </header>
  );
}

