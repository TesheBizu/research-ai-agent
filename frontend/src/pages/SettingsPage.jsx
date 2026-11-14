import React, { useState } from "react";
import PageHeader from "../components/ui/PageHeader.jsx";
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { Info, Check } from "lucide-react";

export default function SettingsPage() {
  const [defaultMode, setDefaultMode] = useState("standard");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure research execution defaults, interface preferences, and API connectivity parameters."
      />

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Research Execution Defaults</CardTitle>
            <CardDescription>
              Select the initial investigation depth applied to newly created research tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Default Research Mode
              </label>
              <select
                value={defaultMode}
                onChange={(e) => setDefaultMode(e.target.value)}
                className="w-full sm:w-80 rounded-lg border border-slate-300 p-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              >
                <option value="quick">Quick (1–2 subquestions, fast overview)</option>
                <option value="standard">Standard (3–5 subquestions, balanced analysis)</option>
                <option value="deep">Deep (6–10 subquestions, exhaustive investigation)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API & Backend Integration</CardTitle>
            <CardDescription>
              Connectivity configuration defined in frontend environment variables.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Backend API Endpoint (`VITE_API_BASE_URL`)
              </span>
              <code className="inline-block px-3 py-1.5 bg-slate-100 rounded-md text-xs font-mono text-slate-800 border border-slate-200">
                {import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}
              </code>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Full user profile synchronization and cloud preferences will be activated during the authentication stage.</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" variant="primary" size="md">
            Save Preferences (Preview)
          </Button>
          {saved && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <Check className="w-4 h-4" /> Preferences captured locally.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

