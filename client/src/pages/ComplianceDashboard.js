import { useState, useEffect } from "react";
import "./ComplianceDashboard.css";
import Header from "../components/Header/Header";
import KPICard from "../components/KPI/KPICard";
import ComplianceOverview from "../components/ComplianceOverview/ComplianceOverview";
import MissedObligations from "../components/MissedObligations/MissedObligations";
import ComplianceReports from "../components/ComplianceReports/ComplianceReports";
import RiskIndicators from "../components/RiskIndicator/RiskIndicator";
import AuditSummary from "../components/AuditSummary/AuditSummary";
import ComplianceHistory from "../components/ComplianceHistory/ComplianceHistory";
import { getDashboardKPIs } from "../api/kpiApi";
import { ShieldCheckIcon, DocumentChartBarIcon, ExclamationTriangleIcon, ClipboardDocumentCheckIcon, ExclamationCircleIcon, ClockIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ComplianceDashboard() {
	const [activeTab, setActiveTab] = useState("overview");
	const [kpis, setKpis] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		loadKPIs();
	}, []);
	async function loadKPIs() {
		try {
			const data = await getDashboardKPIs();
			setKpis(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}
	if (loading) {
		return /* @__PURE__ */ _jsx("h2", { children: "Loading Dashboard..." });
	}
	const kpiCards = [
		{
			title: "Compliance Score",
			value: `${kpis.compliance_score}%`,
			badge: "Average",
			icon: /* @__PURE__ */ _jsx(ShieldCheckIcon, {}),
			iconBg: "#10B981",
			badgeBg: "#DCFCE7",
			badgeColor: "#15803D"
		},
		{
			title: "Reports Ready",
			value: kpis.reports_ready,
			badge: "Ready",
			icon: /* @__PURE__ */ _jsx(DocumentChartBarIcon, {}),
			iconBg: "#2563EB",
			badgeBg: "#DBEAFE",
			badgeColor: "#1D4ED8"
		},
		{
			title: "Missed Obligations",
			value: kpis.missed_obligations,
			badge: "Overall",
			icon: /* @__PURE__ */ _jsx(ExclamationTriangleIcon, {}),
			iconBg: "#F59E0B",
			badgeBg: "#FEF3C7",
			badgeColor: "#B45309"
		},
		{
			title: "Audit Findings",
			value: kpis.audit_findings,
			badge: "Audits",
			icon: /* @__PURE__ */ _jsx(ClipboardDocumentCheckIcon, {}),
			iconBg: "#8B5CF6",
			badgeBg: "#EDE9FE",
			badgeColor: "#6D28D9"
		},
		{
			title: "High Risks",
			value: kpis.high_risks,
			badge: "Critical",
			icon: /* @__PURE__ */ _jsx(ExclamationCircleIcon, {}),
			iconBg: "#EF4444",
			badgeBg: "#FEE2E2",
			badgeColor: "#B91C1C"
		},
		{
			title: "Pending Reviews",
			value: kpis.pending_reviews,
			badge: "Pending",
			icon: /* @__PURE__ */ _jsx(ClockIcon, {}),
			iconBg: "#EAB308",
			badgeBg: "#FEF9C3",
			badgeColor: "#A16207"
		},
		{
			title: "Compliance History",
			value: kpis.history_records,
			badge: "Records",
			icon: /* @__PURE__ */ _jsx(DocumentDuplicateIcon, {}),
			iconBg: "#14B8A6",
			badgeBg: "#CCFBF1",
			badgeColor: "#0F766E"
		}
	];
	const tabs = [
		{
			key: "overview",
			label: "Compliance Overview",
			component: /* @__PURE__ */ _jsx(ComplianceOverview, {})
		},
		{
			key: "missed",
			label: "Missed Obligations",
			component: /* @__PURE__ */ _jsx(MissedObligations, {})
		},
		{
			key: "reports",
			label: "Compliance Reports",
			component: /* @__PURE__ */ _jsx(ComplianceReports, {})
		},
		{
			key: "risk",
			label: "Risk Indicators",
			component: /* @__PURE__ */ _jsx(RiskIndicators, {})
		},
		{
			key: "audit",
			label: "Audit Summary",
			component: /* @__PURE__ */ _jsx(AuditSummary, {})
		},
		{
			key: "history",
			label: "Compliance History",
			component: /* @__PURE__ */ _jsx(ComplianceHistory, {})
		}
	];
	return /* @__PURE__ */ _jsxs("div", {
		className: "dashboard-page",
		children: [
			/* @__PURE__ */ _jsx(Header, {}),
			/* @__PURE__ */ _jsx("div", {
				className: "kpi-row",
				children: kpiCards.map((card, index) => /* @__PURE__ */ _jsx(KPICard, { ...card }, index))
			}),
			/* @__PURE__ */ _jsx("div", {
				className: "dashboard-tabs",
				children: tabs.map((tab) => /* @__PURE__ */ _jsx("span", {
					className: activeTab === tab.key ? "active-tab" : "",
					onClick: () => setActiveTab(tab.key),
					children: tab.label
				}, tab.key))
			}),
			/* @__PURE__ */ _jsx("div", {
				className: "tab-content",
				children: tabs.find((tab) => tab.key === activeTab)?.component
			})
		]
	});
}
export default ComplianceDashboard;
