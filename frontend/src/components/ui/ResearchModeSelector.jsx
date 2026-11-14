import React from "react";
import { Zap, Compass, Layers, Check } from "lucide-react";

const MODES = [
  {
    id: "quick",
    name: "Quick Mode",
    icon: Zap,
    badge: "1-2 Subquestions",
    description: "Rapid factual overview with concise findings and minimal retrieval latency.",
    accent: "blue"
  },
  {
    id: "standard",
    name: "Standard Mode",
    icon: Compass,
    badge: "3-5 Subquestions (Default)",
    description: "Balanced multi-angle research, pairwise conflict detection, and structured synthesis.",
    accent: "indigo"
  },
  {
    id: "deep",
    name: "Deep Mode",
    icon: Layers,
    badge: "6-10 Subquestions",
    description: "Exhaustive cross-source investigation, comprehensive trade-off matrix, and gap discovery.",
    accent: "violet"
  }
];

export default function ResearchModeSelector({ selectedMode, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Select research execution mode"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {MODES.map((mode) => {
        const isSelected = selectedMode === mode.id;
        const Icon = mode.icon;

        return (
          <button
            key={mode.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(mode.id)}
            className={`cursor-pointer rounded-xl p-4 border text-left relative flex flex-col justify-between transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
              isSelected
                ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70"
            }`}
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? "bg-blue-600 text-white shadow-xs" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5">
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      isSelected ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {mode.badge}
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-slate-900">{mode.name}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{mode.description}</p>
            </div>
            <div className="w-full mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Execution Depth</span>
              <span className={`font-semibold capitalize ${isSelected ? "text-blue-600" : "text-slate-600"}`}>
                {mode.id}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
