import React from "react";
import { FileText, PlusCircle } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import Card, { CardContent } from "../components/ui/Card.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button.jsx";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Generated Reports"
        description="Browse, read, and export synthesized research reports with traceable citations and discrepancy analysis."
        actions={
          <Link to="/research/new">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Create Report
            </Button>
          </Link>
        }
      />

      <Card>
        <CardContent className="p-8">
          <EmptyState
            icon={FileText}
            title="No Synthesized Reports Yet"
            description="Completed research reports with verified citations, comparative analysis matrices, and exportable Markdown will be listed here."
            actionText="Start a Research Task"
            onAction={() => window.location.href = "/research/new"}
          />
        </CardContent>
      </Card>
    </div>
  );
}

