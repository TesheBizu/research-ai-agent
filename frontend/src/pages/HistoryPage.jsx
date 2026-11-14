import React from "react";
import { History, PlusCircle } from "lucide-react";
import PageHeader from "../components/ui/PageHeader.jsx";
import Card, { CardContent } from "../components/ui/Card.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button.jsx";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Research History"
        description="Review previous research inquiries, inspection trajectories, execution timestamps, and completion statuses."
        actions={
          <Link to="/research/new">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              New Research
            </Button>
          </Link>
        }
      />

      <Card>
        <CardContent className="p-8">
          <EmptyState
            icon={History}
            title="No Research History Available"
            description="Your past research investigations, query plans, and execution statuses will be recorded and displayed here once research tasks are created."
            actionText="Initiate New Research"
            onAction={() => window.location.href = "/research/new"}
          />
        </CardContent>
      </Card>
    </div>
  );
}

