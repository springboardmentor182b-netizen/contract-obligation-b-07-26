import React, { useEffect, useState } from "react";
import BASE_URL, { getObligations } from "../api/api";
import "./ObligationTracker.css";
import Header from "../components/Header/Header";
import KPICard from "../components/KPI/KPICard";
import SearchFilters from "../components/SearchFilters/SearchFilters";
import ObligationTable from "../components/Table/ObligationTable";
import Calendar from "../components/Calendar/Calendar";
import UpcomingDeadlines from "../components/UpcomingDeadlines/UpcomingDeadlines";
import WeeklyChart from "../components/Charts/WeeklyChart";
import AddObligationModal from "../components/AddObligationModal";
import { DocumentTextIcon, ClockIcon, ClipboardDocumentCheckIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ObligationTracker() {
	const [obligations, setObligations] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("");
	const [priority, setPriority] = useState("");
	const [kpis, setKpis] = useState({
		total: 0,
		in_progress: 0,
		pending: 0,
		completed: 0,
		overdue: 0,
		risk: 0,
		compliance: 0
	});
	useEffect(() => {
		getObligations().then((data) => {
			setObligations(data);
		}).catch((err) => console.log(err));
	}, []);
	useEffect(() => {
		fetch(`${BASE_URL}/dashboard/kpis`).then((response) => response.json()).then((data) => {
			setKpis(data);
		}).catch((error) => console.log(error));
	}, []);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	return /* @__PURE__ */ _jsxs("div", {
		className: "tracker-page",
		children: [
			/* @__PURE__ */ _jsx(Header, {
				openModal,
				obligations
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "kpi-row",
				children: [
					/* @__PURE__ */ _jsx(KPICard, {
						title: "Total",
						value: kpis.total,
						badge: "+5",
						icon: /* @__PURE__ */ _jsx(DocumentTextIcon, { className: "kpi-icon" })
					}),
					/* @__PURE__ */ _jsx(KPICard, {
						title: "In Progress",
						value: kpis.in_progress,
						badge: "Live",
						icon: /* @__PURE__ */ _jsx(ClockIcon, { className: "kpi-icon" })
					}),
					/* @__PURE__ */ _jsx(KPICard, {
						title: "Pending",
						value: kpis.pending,
						badge: "New",
						icon: /* @__PURE__ */ _jsx(ClipboardDocumentCheckIcon, { className: "kpi-icon" })
					}),
					/* @__PURE__ */ _jsx(KPICard, {
						title: "Completed",
						value: kpis.completed,
						badge: "+3",
						icon: /* @__PURE__ */ _jsx(CheckCircleIcon, { className: "kpi-icon" })
					}),
					/* @__PURE__ */ _jsx(KPICard, {
						title: "Overdue",
						value: kpis.overdue,
						badge: "Alert",
						icon: /* @__PURE__ */ _jsx(ExclamationCircleIcon, { className: "kpi-icon" })
					}),
					/* @__PURE__ */ _jsx(KPICard, {
						title: "Risk",
						value: kpis.risk,
						badge: "Watch",
						icon: /* @__PURE__ */ _jsx(ExclamationTriangleIcon, { className: "kpi-icon" })
					}),
					/* @__PURE__ */ _jsx(KPICard, {
						title: "Compliance",
						value: `${kpis.compliance}%`,
						badge: "+6%",
						icon: /* @__PURE__ */ _jsx(ShieldCheckIcon, { className: "kpi-icon" })
					})
				]
			}),
			/* @__PURE__ */ _jsx(SearchFilters, {
				search,
				setSearch,
				status,
				setStatus,
				priority,
				setPriority
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "dashboard-content",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "left-content",
					children: [/* @__PURE__ */ _jsx(ObligationTable, {
						search,
						status,
						priority
					}), /* @__PURE__ */ _jsx("div", {
						className: "bottom-widgets",
						children: /* @__PURE__ */ _jsx("div", {
							className: "chart-section",
							children: /* @__PURE__ */ _jsx(WeeklyChart, {})
						})
					})]
				}), /* @__PURE__ */ _jsxs("div", {
					className: "right-content",
					children: [/* @__PURE__ */ _jsx(Calendar, {}), /* @__PURE__ */ _jsx(UpcomingDeadlines, {})]
				})]
			}),
			/* @__PURE__ */ _jsx(AddObligationModal, {
				isOpen: isModalOpen,
				onClose: closeModal
			})
		]
	});
}
export default ObligationTracker;
