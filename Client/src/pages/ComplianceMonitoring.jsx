import { useEffect, useState } from "react";
import TopRiskIndicators from "../components/compliance/TopRiskIndicators";
import AuditSummaryGrid from "../components/compliance/AuditSummaryGrid";
import DepartmentScores from "../components/compliance/DepartmentScores";
import MissedObligationsList from "../components/compliance/MissedObligationsList";
import ComplianceTabs from "../components/compliance/ComplianceTabs";
import { 
  ShieldCheck, AlertTriangle, FileText, AlertCircle, 
  Building2, FileSpreadsheet, Download, Plus, TrendingUp, Loader2, AlertOctagon 
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

export default function ComplianceMonitoring() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/v1/compliance/dashboard", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}: Failed to fetch compliance metrics.`);
        }

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Compliance API Error:", err);
        setError(err.message || "Failed to load compliance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, []);

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#FAF9F6] text-gray-600 gap-3">
        <Loader2 className="animate-spin text-[#F59E0B]" size={36} />
        <p className="font-semibold text-sm">Fetching real-time compliance metrics...</p>
      </div>
    );
  }

  // 2. Error State (When Backend Service is down or returning 500)
  if (error || !dashboardData) {
    return (
      <div className="p-8 bg-[#FAF9F6] min-h-screen">
        <div className="max-w-xl mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4">
          <AlertOctagon className="text-red-600 shrink-0 mt-0.5" size={24} />
          <div>
            <h3 className="font-bold text-red-900 text-base">Unable to Connect to Backend Service</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <p className="text-xs text-red-500 mt-3">
              Ensure your FastAPI server is running on <code className="bg-red-100 px-1 py-0.5 rounded">http://localhost:8000</code>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Destructure real fetched data
  const { kpis, statusBreakdown, trend, department_scores, top_risks, missed_obligations, audit_summary } = dashboardData;

  return (
    <div className="p-8 space-y-6 bg-[#FAF9F6] min-h-screen text-[#1F2937]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Compliance Monitoring</h1>
          <p className="text-sm text-[#6B7280]">
            Real-time compliance health across all contracts, departments, and obligations.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm font-medium hover:bg-gray-50 shadow-sm">
            <Download size={16} /> Export Dashboard
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] text-white rounded-xl text-sm font-medium hover:bg-[#D97706] shadow-sm">
            <Plus size={16} /> Log Finding
          </button>
        </div>
      </div>

      {/* Top Real KPI Stat Cards */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#ECE7DE] shadow-sm">
          <div className="flex justify-between items-center text-[#10B981]">
            <ShieldCheck size={20} />
            <span className="text-xs font-semibold bg-[#ECFDF5] px-2 py-0.5 rounded-full">+2.1%</span>
          </div>
          <p className="text-2xl font-bold mt-2">{kpis?.score ?? 0}%</p>
          <p className="text-xs text-[#6B7280]">Compliance Score</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#ECE7DE] shadow-sm">
          <div className="flex justify-between items-center text-[#EF4444]">
            <AlertTriangle size={20} />
            <span className="text-xs font-semibold bg-[#FEF2F2] text-[#EF4444] px-2 py-0.5 rounded-full">↑2 new</span>
          </div>
          <p className="text-2xl font-bold mt-2">{kpis?.openRisks ?? 0}</p>
          <p className="text-xs text-[#6B7280]">Open Risks</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#ECE7DE] shadow-sm">
          <div className="flex justify-between items-center text-[#F59E0B]">
            <FileText size={20} />
            <span className="text-xs font-semibold bg-[#FFFBEB] text-[#D97706] px-2 py-0.5 rounded-full">Open</span>
          </div>
          <p className="text-2xl font-bold mt-2">{kpis?.auditFindings ?? 0}</p>
          <p className="text-xs text-[#6B7280]">Audit Findings</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#ECE7DE] shadow-sm">
          <div className="flex justify-between items-center text-[#8B5CF6]">
            <AlertCircle size={20} />
            <span className="text-xs font-semibold bg-[#F5F3FF] text-[#7C3AED] px-2 py-0.5 rounded-full">Urgent</span>
          </div>
          <p className="text-2xl font-bold mt-2">{kpis?.missedObligations ?? 0}</p>
          <p className="text-xs text-[#6B7280]">Missed Obligations</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#ECE7DE] shadow-sm">
          <div className="flex justify-between items-center text-[#3B82F6]">
            <Building2 size={20} />
            <span className="text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full">+3% MoM</span>
          </div>
          <p className="text-2xl font-bold mt-2">{kpis?.deptAvgScore ?? 0}%</p>
          <p className="text-xs text-[#6B7280]">Dept Avg Score</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#ECE7DE] shadow-sm">
          <div className="flex justify-between items-center text-[#10B981]">
            <FileSpreadsheet size={20} />
            <span className="text-xs font-semibold bg-[#ECFDF5] text-[#10B981] px-2 py-0.5 rounded-full">Available</span>
          </div>
          <p className="text-2xl font-bold mt-2">{kpis?.reportsReady ?? 0}</p>
          <p className="text-xs text-[#6B7280]">Reports Ready</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ComplianceTabs
        tabs={[
          "Compliance Overview",
          "Risk Indicators",
          "Audit Summary",
          "Dept Performance",
          "Missed Obligations",
          "Compliance History",
        ]}
      />

      {/* Donut Score & Status Breakdown */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 bg-white p-6 rounded-2xl border border-[#ECE7DE] shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-xs font-bold text-[#9CA3AF] tracking-wider uppercase mb-4">Overall Compliance Score</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ value: kpis?.score ?? 0 }, { value: 100 - (kpis?.score ?? 0) }]} innerRadius={55} outerRadius={70} startAngle={90} endAngle={-270} dataKey="value">
                  <Cell fill="#10B981" />
                  <Cell fill="#E5E7EB" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="text-3xl font-extrabold text-[#111827]">{kpis?.score ?? 0}</span>
              <span className="text-sm font-semibold text-[#6B7280]">%</span>
            </div>
          </div>
          <span className="mt-4 px-3 py-1 bg-[#ECFDF5] text-[#10B981] font-medium text-xs rounded-full">Excellent</span>
          <p className="text-xs text-[#9CA3AF] mt-2">+2.1% vs last quarter</p>
        </div>

        <div className="col-span-8 bg-white p-6 rounded-2xl border border-[#ECE7DE] shadow-sm flex items-center justify-between">
          <div className="w-1/2">
            <h3 className="text-base font-semibold text-[#111827] mb-4">Status Breakdown</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusBreakdown || []} innerRadius={50} outerRadius={75} dataKey="value">
                    {(statusBreakdown || []).map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="w-1/2 space-y-2">
            {(statusBreakdown || []).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-[#374151]">{item.name}</span>
                </div>
                <div className="flex gap-3 text-[#6B7280]">
                  <span className="font-semibold text-[#111827]">{item.value}</span>
                  <span>· {item.percent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score Trend Chart */}
      <div className="bg-white p-6 rounded-2xl border border-[#ECE7DE] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#111827]">Compliance Score Trend</h3>
            <p className="text-xs text-[#9CA3AF]">Monthly compliance score across all contracts — 2024</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#ECFDF5] text-[#10B981] rounded-full flex items-center gap-1">
              <TrendingUp size={12} /> ↑ 11 pts YTD
            </span>
            <span className="text-xs font-medium border border-[#E5E7EB] px-3 py-1 rounded-lg">📅 2024</span>
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend || []}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} dot={{ r: 3, fill: "#10B981" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Nested Components Receiving Real API Data */}
      <div className="grid grid-cols-2 gap-6">
        <DepartmentScores data={department_scores || []} />
        <TopRiskIndicators items={top_risks || []} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <MissedObligationsList items={missed_obligations || []} />
        <AuditSummaryGrid items={audit_summary || []} />
      </div>
    </div>
  );
}