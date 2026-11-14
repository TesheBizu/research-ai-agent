import React from "react";
import { Database, PlusCircle } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import Card, { CardContent } from "../components/ui/Card.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button.jsx";

export default function SourcesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Source Management"
        description="Inspect raw external evidence, canonical URLs, and factual snippets retrieved through Cala.ai."
        actions={
          <Link to="/research/new">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Gather New Sources
            </Button>
          </Link>
        }
      />

      <Card>
        <CardContent className="p-8">
          <EmptyState
            icon={Database}
            title="No Sources Cataloged"
            description="Normalized evidence passages, document authors, and canonical URLs retrieved via the Cala.ai provider will be indexed and auditable here."
            actionText="Initiate Research Inquiry"
            onAction={() => window.location.href = "/research/new"}
          />
        </CardContent>
      </Card>
    </div>
  );
}

