import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import NewResearchPage from "./pages/NewResearchPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import SourcesPage from "./pages/SourcesPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="research/new" element={<NewResearchPage />} />
          <Route path="research/history" element={<HistoryPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="sources" element={<SourcesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

