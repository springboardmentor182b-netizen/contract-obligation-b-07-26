import "./MissedObligations.css";
import { useEffect, useState } from "react";
import { getMissedObligations } from "../../api/missedObligationApi";
import { ExclamationTriangleIcon, ClockIcon, ExclamationCircleIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import KPICard from "../KPI/KPICard";
import ObligationCard from "./ObligationCard";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function MissedObligations() {
	const [search, setSearch] = useState("");
	const [obligations, setObligations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {
		loadObligations();
	}, []);
	async function loadObligations() {
		try {
			const data = await getMissedObligations();
			setObligations(data);
		} catch (err) {
			console.log(err);
			setError("Unable to load missed obligations.");
		} finally {
			setLoading(false);
		}
	}
	// ==========================
	// KPI Calculations
	// ===========================
	const totalMissed = obligations.length;
	const critical = obligations.filter((item) => item.priority === "High").length;
	const overdue = obligations.filter((item) => item.status === "Overdue").length;
	const dueSoon = obligations.filter((item) => item.status === "Pending" || item.status === "Due Soon").length;
	// ===========================
	// Search + Latest 3
	// ===========================
	const filtered = obligations.filter((item) => item.obligation_name?.toLowerCase().includes(search.toLowerCase()) || item.department?.toLowerCase().includes(search.toLowerCase()) || item.owner?.toLowerCase().includes(search.toLowerCase())).sort((a, b) => new Date(b.due_date) - new Date(a.due_date)).slice(0, 4);
	if (loading) {
		return /* @__PURE__ */ _jsx("h2", { children: "Loading Missed Obligations..." });
	}
	if (error) {
		return /* @__PURE__ */ _jsx("h2", { children: error });
	}
	return /* @__PURE__ */ _jsxs("div", {
		className: "missed-page",
		children: [
			/* @__PURE__ */ _jsx("div", {
				className: "missed-header",
				children: /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h2", { children: "Missed Obligations" }), /* @__PURE__ */ _jsx("p", { children: "Monitor overdue obligations, identify risks, and resolve pending compliance tasks." })] })
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "summary-row",
				children: [
					/* @__PURE__ */ _jsx(KPICard, {
						title: "Total Missed",
						value: totalMissed,
						badge: "Overall",
						icon: /* @__PURE__ */ _jsx(ClockIcon, {}),
						iconBg: "#2563EB",
						badgeBg: "#DBEAFE",
						badgeColor: "#1D4ED8"
					}),
					/* @__PURE__ */ _jsx(KPICard, {
						title: "Critical",
						value: critical,
						badge: "High",
						icon: /* @__PURE__ */ _jsx(ExclamationTriangleIcon, {}),
						iconBg: "#EF4444",
						badgeBg: "#FEE2E2",
						badgeColor: "#B91C1C"
					}),
					/* @__PURE__ */ _jsx(KPICard, {
						title: "Overdue",
						value: overdue,
						badge: "Action",
						icon: /* @__PURE__ */ _jsx(ExclamationCircleIcon, {}),
						iconBg: "#F97316",
						badgeBg: "#FFEDD5",
						badgeColor: "#C2410C"
					}),
					/* @__PURE__ */ _jsx(KPICard, {
						title: "Due Soon",
						value: dueSoon,
						badge: "Next",
						icon: /* @__PURE__ */ _jsx(ClockIcon, {}),
						iconBg: "#14B8A6",
						badgeBg: "#CCFBF1",
						badgeColor: "#0F766E"
					})
				]
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "toolbar",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "search-box",
					children: [/* @__PURE__ */ _jsx(MagnifyingGlassIcon, { className: "search-icon" }), /* @__PURE__ */ _jsx("input", {
						type: "text",
						placeholder: "Search obligation...",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}), /* @__PURE__ */ _jsxs("button", {
					className: "filter-btn",
					children: [/* @__PURE__ */ _jsx(FunnelIcon, { className: "filter-icon" }), "Filter"]
				})]
			}),
			/* @__PURE__ */ _jsx("div", {
				className: "obligation-list",
				children: filtered.length > 0 ? filtered.map((item) => /* @__PURE__ */ _jsx(ObligationCard, {
					id: item.id,
					title: item.obligation_name,
					contract: item.contract,
					department: item.department,
					owner: item.owner,
					dueDate: item.due_date,
					overdue: `${item.missed_days} Days Missed`,
					priority: item.priority,
					status: item.status
				}, item.id)) : /* @__PURE__ */ _jsx("div", {
					style: {
						width: "100%",
						textAlign: "center",
						padding: "40px",
						color: "#64748B",
						fontWeight: "500"
					},
					children: "No missed obligations found."
				})
			})
		]
	});
}
export default MissedObligations;
