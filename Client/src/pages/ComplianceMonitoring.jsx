import { useState } from "react";
import { Download, PlusCircle } from "lucide-react";

import KpiStrip from "../components/compliance/KpiStrip";
import ComplianceTabs from "../components/compliance/ComplianceTabs";
import OverallScoreCard from "../components/compliance/OverallScoreCard";
import StatusBreakdownCard from "../components/compliance/StatusBreakdownCard";
import QuickStatsGrid from "../components/compliance/QuickStatsGrid";
import ComplianceTrendChart from "../components/compliance/ComplianceTrendChart";
import DepartmentScores from "../components/compliance/DepartmentScores";
import TopRiskIndicators from "../components/compliance/TopRiskIndicators";
import MissedObligationsList from "../components/compliance/MissedObligationsList";
import AuditSummaryGrid from "../components/compliance/AuditSummaryGrid";
import ComplianceHistoryTable from "../components/compliance/ComplianceHistoryTable";
import ComplianceDocsTable from "../components/compliance/ComplianceDocsTable";
import { LoadingCard, ErrorCard } from "../components/compliance/StateCards";
import ComplianceTable from "../components/ComplianceTable";

import useFetch from "../hooks/useFetch";
import {
  getComplianceOverview,
  getRiskIndicators,
  getAuditSummary,
  getDepartmentScores,
  getMissedObligations,
  getComplianceHistory,
  getComplianceDocuments,
  getComplianceContracts,
} from "../services/complianceApi";

const TABS = [
  "Compliance Overview",
  "Risk Indicators",
  "Audit Summary",
  "Dept Performance",
  "Missed Obligations",
  "Compliance History",
  "Compliance Docs",
];

function Section({ loading, error, onRetry, children }) {
  if (loading) return <LoadingCard />;
  if (error) return <ErrorCard onRetry={onRetry} />;
  return children;
}

const ComplianceMonitoring = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const overview = useFetch(getComplianceOverview);
  const risks = useFetch(getRiskIndicators);
  const audits = useFetch(getAuditSummary);
  const departments = useFetch(getDepartmentScores);
  const missed = useFetch(getMissedObligations);
  const history = useFetch(getComplianceHistory);
  const docs = useFetch(getComplianceDocuments);
  const contracts = useFetch(getComplianceContracts);

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 md:p-8 space-y-6 overflow-x-hidden">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Compliance Monitoring
          </h1>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Real-time compliance health across all contracts, departments, and obligations.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition">
            <Download size={15} />
            Export Dashboard
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-sm hover:bg-amber-400 transition">
            <PlusCircle size={15} />
            Log Finding
          </button>
        </div>
      </div>

      {/* Top Metric Strip */}
      {overview.data && <KpiStrip kpis={overview.data.kpis} />}

      {/* Tab Navigation */}
      <ComplianceTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {/* Dynamic Tab Content */}
      {activeTab === "Compliance Overview" && (
        <div className="space-y-6">
          <Section loading={overview.loading} error={overview.error} onRetry={overview.refetch}>
            {overview.data && (
              <>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <OverallScoreCard
                    score={overview.data.overallScore}
                    totalContracts={overview.data.totalContracts}
                  />
                  <StatusBreakdownCard data={overview.data.statusBreakdown} />
                  <QuickStatsGrid quickStats={overview.data.quickStats} />
                </div>
                <ComplianceTrendChart trend={overview.data.trend} />
              </>
            )}
          </Section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Section loading={departments.loading} error={departments.error} onRetry={departments.refetch}>
              {departments.data && <DepartmentScores data={departments.data} />}
            </Section>
            <Section loading={risks.loading} error={risks.error} onRetry={risks.refetch}>
              {risks.data && (
                <TopRiskIndicators
                  items={risks.data.slice(0, 4)}
                  onViewAll={() => setActiveTab("Risk Indicators")}
                />
              )}
            </Section>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Section loading={missed.loading} error={missed.error} onRetry={missed.refetch}>
              {missed.data && (
                <MissedObligationsList
                  items={missed.data.slice(0, 3)}
                  onViewAll={() => setActiveTab("Missed Obligations")}
                />
              )}
            </Section>
            <Section loading={audits.loading} error={audits.error} onRetry={audits.refetch}>
              {audits.data && <AuditSummaryGrid summary={audits.data} />}
            </Section>
          </div>

          <Section loading={contracts.loading} error={contracts.error} onRetry={contracts.refetch}>
            {contracts.data && <ComplianceTable contracts={contracts.data} />}
          </Section>
        </div>
      )}

      {activeTab === "Risk Indicators" && (
        <Section loading={risks.loading} error={risks.error} onRetry={risks.refetch}>
          {risks.data && <TopRiskIndicators items={risks.data} />}
        </Section>
      )}

      {activeTab === "Audit Summary" && (
        <Section loading={audits.loading} error={audits.error} onRetry={audits.refetch}>
          {audits.data && <AuditSummaryGrid summary={audits.data} />}
        </Section>
      )}

      {activeTab === "Dept Performance" && (
        <Section loading={departments.loading} error={departments.error} onRetry={departments.refetch}>
          {departments.data && <DepartmentScores data={departments.data} />}
        </Section>
      )}

      {activeTab === "Missed Obligations" && (
        <Section loading={missed.loading} error={missed.error} onRetry={missed.refetch}>
          {missed.data && <MissedObligationsList items={missed.data} />}
        </Section>
      )}

      {activeTab === "Compliance History" && (
        <Section loading={history.loading} error={history.error} onRetry={history.refetch}>
          {history.data && <ComplianceHistoryTable rows={history.data} />}
        </Section>
      )}

      {activeTab === "Compliance Docs" && (
        <Section loading={docs.loading} error={docs.error} onRetry={docs.refetch}>
          {docs.data && <ComplianceDocsTable rows={docs.data} />}
        </Section>
      )}
    </div>
  );
};

export default ComplianceMonitoring;