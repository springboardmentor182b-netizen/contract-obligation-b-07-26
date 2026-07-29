import "./RiskIndicator.css";
import { useEffect, useState } from "react";
import { PlusIcon, ExclamationTriangleIcon, ShieldExclamationIcon, ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { getRisks } from "../../api/riskApi";
import RiskSummaryCard from "./RiskSummaryCard";
import RiskSeverityChart from "./RiskSeverityChart";
import RiskDepartmentChart from "./RiskDepartmentChart";
import AddRiskModal from "./AddRiskModal";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function RiskIndicator() {
	const [risks, setRisks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		loadRisks();
	}, []);
	async function loadRisks() {
		try {
			const data = await getRisks();
			setRisks(data);
		} catch (err) {
			console.log(err);
			setError("Unable to load risks.");
		} finally {
			setLoading(false);
		}
	}
	// ==========================
	// KPI Calculations
	// ===============================
	const openRisks = risks.filter((risk) => risk.status !== "Resolved").length;
	const criticalRisks = risks.filter((risk) => risk.severity === "Critical").length;
	const mediumRisks = risks.filter((risk) => risk.severity === "Medium").length;
	const resolvedRisks = risks.filter((risk) => risk.status === "Resolved").length;
	if (loading) {
		return /* @__PURE__ */ _jsx("h2", { children: "Loading Risk Indicators..." });
	}
	if (error) {
		return /* @__PURE__ */ _jsx("h2", { children: error });
	}
	return /* @__PURE__ */ _jsxs("div", {
		className: "risk-page",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "risk-header",
				children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h2", { children: "Risk Indicators" }), /* @__PURE__ */ _jsx("p", { children: "Analyze compliance risks across contracts, departments and obligations." })] }), /* @__PURE__ */ _jsxs("button", {
					className: "risk-btn",
					onClick: () => setShowModal(true),
					children: [/* @__PURE__ */ _jsx(PlusIcon, { className: "risk-btn-icon" }), "Add Risk"]
				})]
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "risk-summary",
				children: [
					/* @__PURE__ */ _jsx(RiskSummaryCard, {
						title: "Open Risks",
						value: openRisks,
						badge: "Overall",
						icon: /* @__PURE__ */ _jsx(ExclamationTriangleIcon, {}),
						iconBg: "#DBEAFE",
						badgeBg: "#DBEAFE",
						badgeColor: "#2563EB"
					}),
					/* @__PURE__ */ _jsx(RiskSummaryCard, {
						title: "Critical",
						value: criticalRisks,
						badge: "High",
						icon: /* @__PURE__ */ _jsx(ShieldExclamationIcon, {}),
						iconBg: "#FEE2E2",
						badgeBg: "#FEE2E2",
						badgeColor: "#DC2626"
					}),
					/* @__PURE__ */ _jsx(RiskSummaryCard, {
						title: "Medium",
						value: mediumRisks,
						badge: "Monitor",
						icon: /* @__PURE__ */ _jsx(ExclamationCircleIcon, {}),
						iconBg: "#FEF3C7",
						badgeBg: "#FEF3C7",
						badgeColor: "#CA8A04"
					}),
					/* @__PURE__ */ _jsx(RiskSummaryCard, {
						title: "Resolved",
						value: resolvedRisks,
						badge: "Closed",
						icon: /* @__PURE__ */ _jsx(CheckCircleIcon, {}),
						iconBg: "#DCFCE7",
						badgeBg: "#DCFCE7",
						badgeColor: "#15803D"
					})
				]
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "risk-chart-grid",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "risk-chart-card",
					children: [/* @__PURE__ */ _jsx("h3", { children: "Risk Severity Distribution" }), /* @__PURE__ */ _jsx(RiskSeverityChart, { risks })]
				}), /* @__PURE__ */ _jsxs("div", {
					className: "risk-chart-card",
					children: [/* @__PURE__ */ _jsx("h3", { children: "Department Risk Analysis" }), /* @__PURE__ */ _jsx(RiskDepartmentChart, { risks })]
				})]
			}),
			showModal && /* @__PURE__ */ _jsx(AddRiskModal, {
				close: () => setShowModal(false),
				refresh: loadRisks
			})
		]
	});
}
export default RiskIndicator;
