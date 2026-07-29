import "./AuditSummary.css";
import { useEffect, useState } from "react";
import { getAudits } from "../../api/auditApi";
import { CheckCircleIcon, ClipboardDocumentCheckIcon, ClockIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import AuditSummaryCard from "./AuditSummaryCard";
import AuditTrendChart from "./AuditTrendChart";
import AuditTable from "./AuditTable";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function AuditSummary() {
	const [auditData, setAuditData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {
		loadAudits();
	}, []);
	const loadAudits = async () => {
		try {
			const data = await getAudits();
			setAuditData(data);
		} catch (err) {
			console.log(err);
			setError("Unable to load audit data.");
		} finally {
			setLoading(false);
		}
	};
	// ==========================
	// KPI Calculations
	// ==========================
	const totalAudits = auditData.length;
	const completedAudits = auditData.filter((item) => item.status === "Completed").length;
	const openAudits = auditData.filter((item) => item.status === "Open").length;
	const highSeverity = auditData.filter((item) => item.severity === "High").length;
	// Average Resolution (Demo)
	const averageResolution = totalAudits > 0 ? Math.round(auditData.reduce((sum) => sum + 14, 0) / totalAudits) : 0;
	// ==========================
	// Monthly Chart Data
	// ==========================
	const monthMap = {
		"01": "Jan",
		"02": "Feb",
		"03": "Mar",
		"04": "Apr",
		"05": "May",
		"06": "Jun",
		"07": "Jul",
		"08": "Aug",
		"09": "Sep",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec"
	};
	const grouped = {};
	auditData.forEach((audit) => {
		if (!audit.audit_date) return;
		const month = monthMap[audit.audit_date.substring(5, 7)];
		grouped[month] = (grouped[month] || 0) + 1;
	});
	const chartData = Object.keys(grouped).map((month) => ({
		month,
		completed: grouped[month]
	}));
	if (loading) {
		return /* @__PURE__ */ _jsx("h2", { children: "Loading Audit Data..." });
	}
	if (error) {
		return /* @__PURE__ */ _jsx("h2", { children: error });
	}
	return /* @__PURE__ */ _jsxs("div", {
		className: "audit-summary-page",
		children: [
			/* @__PURE__ */ _jsx("div", {
				className: "audit-summary-header",
				children: /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h2", { children: "Audit Summary" }), /* @__PURE__ */ _jsx("p", { children: "Monitor audit performance, findings, resolution progress and compliance activities across the organization." })] })
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "audit-kpi-row",
				children: [
					/* @__PURE__ */ _jsx(AuditSummaryCard, {
						title: "Completed Audits",
						value: completedAudits,
						subtitle: "Successfully Closed",
						badge: `${completedAudits}`,
						icon: /* @__PURE__ */ _jsx(CheckCircleIcon, {}),
						iconBg: "#DCFCE7",
						badgeBg: "#DCFCE7",
						badgeColor: "#15803D"
					}),
					/* @__PURE__ */ _jsx(AuditSummaryCard, {
						title: "High Severity",
						value: highSeverity,
						subtitle: "Require Immediate Attention",
						badge: "High",
						icon: /* @__PURE__ */ _jsx(ClipboardDocumentCheckIcon, {}),
						iconBg: "#FEF3C7",
						badgeBg: "#FEF3C7",
						badgeColor: "#CA8A04"
					}),
					/* @__PURE__ */ _jsx(AuditSummaryCard, {
						title: "Open Audits",
						value: openAudits,
						subtitle: "Currently Active",
						badge: "Running",
						icon: /* @__PURE__ */ _jsx(ClockIcon, {}),
						iconBg: "#DBEAFE",
						badgeBg: "#DBEAFE",
						badgeColor: "#2563EB"
					}),
					/* @__PURE__ */ _jsx(AuditSummaryCard, {
						title: "Avg Resolution",
						value: `${averageResolution}`,
						subtitle: "Days",
						badge: "Average",
						icon: /* @__PURE__ */ _jsx(CalendarDaysIcon, {}),
						iconBg: "#F3E8FF",
						badgeBg: "#F3E8FF",
						badgeColor: "#7C3AED"
					})
				]
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "audit-content-row",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "audit-chart-card",
					children: [/* @__PURE__ */ _jsx("div", {
						className: "chart-header",
						children: /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h3", { children: "Monthly Audit Trend" }), /* @__PURE__ */ _jsx("p", { children: "Audits performed month-wise." })] })
					}), /* @__PURE__ */ _jsx(AuditTrendChart, { data: chartData })]
				}), /* @__PURE__ */ _jsxs("div", {
					className: "audit-table-card",
					children: [/* @__PURE__ */ _jsx("div", {
						className: "table-header",
						children: /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h3", { children: "Recent Audits" }), /* @__PURE__ */ _jsx("p", { children: "Latest audit records from the database." })] })
					}), /* @__PURE__ */ _jsx(AuditTable, { data: auditData })]
				})]
			})
		]
	});
}
export default AuditSummary;
