import "./ComplianceOverview.css";
import { useEffect, useState } from "react";
import { getCompliance } from "../../api/complianceApi";
import ComplianceScore from "./ComplianceScore";
import ComplianceDonutChart from "./ComplianceDonutChart";
import OverviewCard from "./OverviewCard";
import { ClipboardDocumentCheckIcon, ExclamationTriangleIcon, ShieldExclamationIcon, DocumentChartBarIcon } from "@heroicons/react/24/outline";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ComplianceOverview() {
	const [complianceData, setComplianceData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {
		loadCompliance();
	}, []);
	async function loadCompliance() {
		try {
			const data = await getCompliance();
			setComplianceData(data);
		} catch (err) {
			console.log(err);
			setError("Unable to load compliance data.");
		} finally {
			setLoading(false);
		}
	}
	// ==========================
	// Calculations
	// ===========================
	const totalRecords = complianceData.length;
	const completed = complianceData.filter((item) => item.status === "Completed").length;
	const pending = complianceData.filter((item) => item.status === "Pending").length;
	const highRisk = complianceData.filter((item) => item.risk_level === "High").length;
	const mediumRisk = complianceData.filter((item) => item.risk_level === "Medium").length;
	const lowRisk = complianceData.filter((item) => item.risk_level === "Low").length;
	const averageScore = totalRecords > 0 ? Math.round(complianceData.reduce((sum, item) => sum + item.compliance_score, 0) / totalRecords) : 0;
	const chartData = [
		{
			name: "Completed",
			value: completed,
			color: "#22C55E"
		},
		{
			name: "Pending",
			value: pending,
			color: "#F59E0B"
		},
		{
			name: "High Risk",
			value: highRisk,
			color: "#EF4444"
		},
		{
			name: "Medium Risk",
			value: mediumRisk,
			color: "#8B5CF6"
		},
		{
			name: "Low Risk",
			value: lowRisk,
			color: "#3B82F6"
		}
	];
	if (loading) {
		return /* @__PURE__ */ _jsx("h2", { children: "Loading Compliance Data..." });
	}
	if (error) {
		return /* @__PURE__ */ _jsx("h2", { children: error });
	}
	return /* @__PURE__ */ _jsxs("div", {
		className: "overview-wrapper",
		children: [
			/* @__PURE__ */ _jsx("div", {
				className: "score-section",
				children: /* @__PURE__ */ _jsx(ComplianceScore, { score: averageScore })
			}),
			/* @__PURE__ */ _jsx("div", {
				className: "chart-section",
				children: /* @__PURE__ */ _jsx(ComplianceDonutChart, { data: chartData })
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "cards-section",
				children: [
					/* @__PURE__ */ _jsx(OverviewCard, {
						title: "Total Records",
						value: totalRecords,
						subtitle: "Compliance Records",
						icon: /* @__PURE__ */ _jsx(ClipboardDocumentCheckIcon, {}),
						bgColor: "#ECFDF5",
						iconColor: "#10B981"
					}),
					/* @__PURE__ */ _jsx(OverviewCard, {
						title: "Pending",
						value: pending,
						subtitle: "Awaiting Completion",
						icon: /* @__PURE__ */ _jsx(ExclamationTriangleIcon, {}),
						bgColor: "#FFF7ED",
						iconColor: "#F59E0B"
					}),
					/* @__PURE__ */ _jsx(OverviewCard, {
						title: "High Risk",
						value: highRisk,
						subtitle: "Immediate Attention",
						icon: /* @__PURE__ */ _jsx(ShieldExclamationIcon, {}),
						bgColor: "#FEF2F2",
						iconColor: "#EF4444"
					}),
					/* @__PURE__ */ _jsx(OverviewCard, {
						title: "Completed",
						value: completed,
						subtitle: "Successfully Closed",
						icon: /* @__PURE__ */ _jsx(DocumentChartBarIcon, {}),
						bgColor: "#EFF6FF",
						iconColor: "#2563EB"
					})
				]
			})
		]
	});
}
export default ComplianceOverview;
