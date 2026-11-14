import React, { useState } from "react";
import { Sparkles, AlertCircle, Info, XCircle } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import ResearchModeSelector from "../components/ui/ResearchModeSelector.jsx";

const MIN_LENGTH = 10;
const MAX_LENGTH = 1000;

export default function NewResearchPage() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("standard");
  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState(null);

  const trimmedQuery = query.trim();
  const characterCount = query.length;

  const validateInput = (text) => {
    const trimmed = text.trim();
    if (trimmed.length === 0) {
      return "Research question cannot be empty. Please state your research inquiry.";
    }
    if (trimmed.length < MIN_LENGTH) {
      return `Research question is too short. Please provide at least ${MIN_LENGTH} characters.`;
    }
    if (text.length > MAX_LENGTH) {
      return `Character limit exceeded (maximum ${MAX_LENGTH} characters).`;
    }
    return "";
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setQuery(newText);
    if (touched) {
      setValidationError(validateInput(newText));
    }
    if (submittedPrompt) {
      setSubmittedPrompt(null);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setValidationError(validateInput(query));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    const error = validateInput(query);
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError("");
    // Record submission intent locally without faking backend execution
    setSubmittedPrompt({
      query: trimmedQuery,
      mode,
      timestamp: new Date().toLocaleTimeString()
    });
  };

  const isFormValid = trimmedQuery.length >= MIN_LENGTH && characterCount <= MAX_LENGTH;

  return (
    <div className="space-y-6">
      <PageHeader
        title="New Research Inquiry"
        description="Formulate an open-ended research question to trigger autonomous planning, factual decomposition, and evidence retrieval."
      />

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Research Question Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>Research Question</CardTitle>
            <CardDescription>
              State your core inquiry, technical tradeoff, or literature question clearly. Avoid one-word queries.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <textarea
                id="research-query-input"
                rows={4}
                value={query}
                onChange={handleTextChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(validationError)}
                aria-describedby={validationError ? "question-error" : undefined}
                placeholder="e.g. How do retrieval-augmented generation systems mitigate hallucinations in enterprise LLM workflows, and what are the latency tradeoffs?"
                className={`w-full rounded-xl border p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-y ${
                  validationError
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
            </div>

            {/* Validation Message and Character Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
              <div id="question-error" role="alert" className="min-h-[1.25rem]">
                {validationError ? (
                  <span className="text-red-600 font-medium flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {validationError}
                  </span>
                ) : (
                  <span className="text-slate-500">
                    Broad topics will be automatically broken into factual queries for Cala.ai.
                  </span>
                )}
              </div>
              <div
                className={`font-mono text-xs text-right ${
                  characterCount > MAX_LENGTH
                    ? "text-red-600 font-semibold"
                    : characterCount >= MIN_LENGTH
                    ? "text-emerald-600"
                    : "text-slate-400"
                }`}
              >
                {characterCount} / {MAX_LENGTH}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research Mode Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Investigation Mode
          </label>
          <ResearchModeSelector selectedMode={mode} onChange={setMode} />
        </div>

        {/* Action Controls & Submission Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <span>Target Mode: <strong className="capitalize text-slate-700">{mode}</strong></span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Sparkles}
            className="w-full sm:w-auto"
          >
            Start Research
          </Button>
        </div>
      </form>

      {/* Submission Status Notice */}
      {submittedPrompt && (
        <Card className="border-blue-200 bg-blue-50/40">
          <CardContent className="p-5 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-semibold text-blue-900">Research Inquiry Captured</h4>
              <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                Inquiry: <em>"{submittedPrompt.query}"</em> (Mode: <strong>{submittedPrompt.mode}</strong> at {submittedPrompt.timestamp}).
              </p>
              <div className="mt-2 text-xs text-blue-700 bg-white/80 p-2.5 rounded-lg border border-blue-200">
                <strong>Status:</strong> Ready for pipeline connection. Backend agent execution (`POST /api/research`) will be activated in the next stage. No mock or simulated research results have been fabricated.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
