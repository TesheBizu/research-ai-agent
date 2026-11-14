import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  Database,
  History,
  Info
} from "lucide-react";
import Card, { CardContent } from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium mb-4 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Autonomous Investigation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome to ResearchAI
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Formulate complex research questions, automatically plan targeted factual inquiries, retrieve verified external evidence via Cala.ai, and generate structured reports with verifiable citations.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/research/new">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Start New Research
              </Button>
            </Link>
            <Link to="/research/history">
              <Button variant="outline" size="lg" className="border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700">
                View Past Sessions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* System Architecture Overview Cards */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Architecture Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Autonomous Planning</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Decomposes broad topics into specific factual subquestions, eliminating redundant queries through semantic deduplication.
            </p>
          </Card>

          <Card className="p-5">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Verified Cala Retrieval</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Retrieves authoritative domain knowledge via Cala.ai provider abstraction, preserving raw evidence snippets and source metadata.
            </p>
          </Card>

          <Card className="p-5">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Two-Tier Citation Auditing</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Validates source existence in MongoDB and checks claim-to-evidence support to prevent hallucinated citations and ungrounded assertions.
            </p>
          </Card>
        </div>
      </div>

      {/* Recent Research Activity Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Recent Research Sessions
          </h3>
          <span className="text-xs text-slate-400">Live Status: Connected</span>
        </div>

        <Card>
          <CardContent className="p-6">
            <EmptyState
              icon={History}
              title="No Research Sessions Yet"
              description="Your initiated research tasks, planning trajectories, and finalized analytical reports will appear here."
              actionText="Create First Research Inquiry"
              onAction={() => window.location.href = "/research/new"}
            />
          </CardContent>
        </Card>
      </div>

      {/* Notice Banner */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Development Notice:</span> The backend foundation (Stage 3) and frontend foundation (Stage 4) are configured. Agent workflow endpoints (`POST /api/research`) and live streaming execution will be wired during subsequent stages.
        </div>
      </div>
    </div>
  );
}

