import { Download, PlusCircle } from "lucide-react";

import KpiStrip from "../components/Compliance/KpiStrip";
import ComplianceTabs from "../components/Compliance/ComplianceTabs";
import OverallScoreCard from "../components/Compliance/OverallScoreCard";
import StatusBreakdownCard from "../components/Compliance/StatusBreakdownCard";
import QuickStatsGrid from "../components/Compliance/QuickStatsGrid";
import ComplianceTrendChart from "../components/Compliance/ComplianceTrendChart";
import DepartmentScores from "../components/Compliance/DepartmentScores";
import TopRiskIndicators from "../components/Compliance/TopRiskIndicators";
import MissedObligationsList from "../components/Compliance/MissedObligationsList";
import AuditSummaryGrid from "../components/Compliance/AuditSummaryGrid";
import ComplianceTable from "../components/ComplianceTable";

import {
  summary,
  kpis,
  complianceTabs,
  statusBreakdown,
  quickStats,
  departmentScores,
  topRiskIndicators,
  missedObligations,
  auditSummary,
  contracts,
} from "../Data/mockData";

const ComplianceMonitoring = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Compliance Monitoring</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Real-time compliance health across all contracts, departments, and obligations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full border border-[#ECE7DE] bg-white px-5 py-2.5 text-sm font-medium text-[#1F2937] hover:bg-[#FFFDF8]">
            <Download size={16} />
            Export Dashboard
          </button>
          <button className="flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-medium text-[#1F2937] hover:brightness-105">
            <PlusCircle size={16} />
            Log Finding
          </button>
        </div>
      </div>

      <KpiStrip kpis={kpis} />

      <ComplianceTabs tabs={complianceTabs} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <OverallScoreCard score={summary.overallScore} deltaLabel="+2.1% vs last quarter" />
        <StatusBreakdownCard data={statusBreakdown} />
        <QuickStatsGrid stats={quickStats} />
      </div>

      <ComplianceTrendChart trend={summary.trend} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DepartmentScores data={departmentScores} />
        <TopRiskIndicators items={topRiskIndicators} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MissedObligationsList items={missedObligations} />
        <AuditSummaryGrid items={auditSummary} />
      </div>

      <ComplianceTable contracts={contracts} />
    </div>
  );
};

export default ComplianceMonitoring;
