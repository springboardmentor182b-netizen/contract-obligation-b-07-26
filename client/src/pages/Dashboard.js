import { useEffect, useMemo, useState } from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const API_BASE_URL = "http://127.0.0.1:8000";
const reportMetricConfig = [
	{
		label: "Total Contracts",
		tone: "blue",
		icon: "doc",
		getValue: () => 0
	},
	{
		label: "Active",
		tone: "green",
		icon: "check",
		getValue: () => 0
	},
	{
		label: "Expiring 30D",
		tone: "orange",
		icon: "alert",
		getValue: () => 0
	},
	{
		label: "Total Value",
		tone: "purple",
		icon: "money",
		getValue: () => 0
	},
	{
		label: "Compliance",
		tone: "teal",
		icon: "shield",
		getValue: () => 0
	},
	{
		label: "Pending Review",
		tone: "red",
		icon: "clock",
		getValue: () => 0
	}
];
const navItems = [
	{
		label: "Dashboard",
		icon: "dashboard"
	},
	{
		label: "Contracts",
		icon: "contracts"
	},
	{
		label: "Repository",
		icon: "repository"
	},
	{
		label: "Obligations",
		icon: "obligations"
	},
	{
		label: "Renewals",
		icon: "renewals"
	},
	{
		label: "Compliance",
		icon: "compliance"
	},
	{
		label: "Reports",
		icon: "reports"
	},
	{
		label: "Notifications",
		icon: "notifications"
	},
	{
		label: "Audit Logs",
		icon: "audit"
	},
	{
		label: "Users",
		icon: "users"
	},
	{
		label: "Settings",
		icon: "settings"
	}
];
const statusBreakdownConfig = [
	{
		label: "Active",
		color: "#10b981",
		keys: ["active"]
	},
	{
		label: "Under Review",
		color: "#f59e0b",
		keys: ["under review", "review"]
	},
	{
		label: "Draft",
		color: "#cbd5e1",
		keys: ["draft"]
	},
	{
		label: "Approved",
		color: "#2563eb",
		keys: ["approved", "generated"]
	},
	{
		label: "Expired",
		color: "#fb7185",
		keys: ["expired"]
	},
	{
		label: "Terminated",
		color: "#e11d48",
		keys: ["terminated"]
	}
];
export function Dashboard({ userRole }) {
	const [activeView, setActiveView] = useState("Dashboard");
	const [currentUser, setCurrentUser] = useState(null);
	const [reports, setReports] = useState([]);
	const [reportsStatus, setReportsStatus] = useState("idle");
	const isReportsView = activeView === "Reports";
	const pageTitle = isReportsView ? "Reports Dashboard" : "Dashboard";
	const breadcrumb = isReportsView ? "Reports" : "Dashboard";
	const profileName = currentUser?.name || currentUser?.email || "";
	const profileInitials = getInitials(profileName);
	const profileRole = currentUser?.role || userRole || "";
	const welcomeText = isReportsView ? `Welcome back${profileName ? `, ${profileName}` : ""}. Here's your reporting activity today.` : `Welcome back${profileName ? `, ${profileName}` : ""}. Here's what's happening today.`;
	const metrics = useMemo(() => reportMetricConfig.map((metric) => ({
		...metric,
		value: metric.getValue(reports)
	})), [reports]);
	const statusBreakdown = useMemo(() => {
		const counts = statusBreakdownConfig.map((statusItem) => {
			const value = reports.filter((report) => {
				const status = String(report.status || "").toLowerCase();
				return statusItem.keys.includes(status);
			}).length;
			return {
				...statusItem,
				value
			};
		});
		const maxValue = Math.max(...counts.map((item) => item.value), 0);
		return counts.map((item) => ({
			...item,
			width: maxValue > 0 ? `${item.value / maxValue * 100}%` : "0%"
		}));
	}, [reports]);
	useEffect(() => {
		const token = window.localStorage.getItem("contractiq_token");
		if (!token) {
			return;
		}
		let isMounted = true;
		fetch(`${API_BASE_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
			if (!response.ok) {
				throw new Error("Unable to load user");
			}
			return response.json();
		}).then((data) => {
			if (isMounted) {
				setCurrentUser(data);
			}
		}).catch(() => {
			if (isMounted) {
				setCurrentUser(null);
			}
		});
		return () => {
			isMounted = false;
		};
	}, []);
	useEffect(() => {
		if (!isReportsView || reportsStatus !== "idle") {
			return;
		}
		const token = window.localStorage.getItem("contractiq_token");
		if (!token) {
			return;
		}
		let isMounted = true;
		setReportsStatus("loading");
		fetch(`${API_BASE_URL}/api/reports`, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
			if (!response.ok) {
				throw new Error("Unable to load reports");
			}
			return response.json();
		}).then((data) => {
			if (isMounted) {
				setReports(Array.isArray(data) ? data : []);
				setReportsStatus("success");
			}
		}).catch(() => {
			if (isMounted) {
				setReports([]);
				setReportsStatus("error");
			}
		});
		return () => {
			isMounted = false;
		};
	}, [isReportsView, reportsStatus]);
	return /* @__PURE__ */ _jsxs("main", {
		className: "contract-dashboard",
		children: [/* @__PURE__ */ _jsxs("aside", {
			className: "dashboard-sidebar",
			children: [
				/* @__PURE__ */ _jsxs("div", {
					className: "sidebar-brand",
					children: [/* @__PURE__ */ _jsx("span", {
						className: "sidebar-logo",
						children: "C"
					}), /* @__PURE__ */ _jsx("strong", { children: "ContractIQ" })]
				}),
				/* @__PURE__ */ _jsx("nav", {
					className: "sidebar-nav",
					"aria-label": "Dashboard navigation",
					children: navItems.map((item) => /* @__PURE__ */ _jsxs("button", {
						className: activeView === item.label ? "nav-item active" : "nav-item",
						onClick: () => setActiveView(item.label),
						type: "button",
						children: [/* @__PURE__ */ _jsx("span", {
							className: `nav-icon ${item.icon}`,
							"aria-hidden": "true"
						}), /* @__PURE__ */ _jsx("span", { children: item.label })]
					}, item.label))
				}),
				/* @__PURE__ */ _jsxs("div", {
					className: "sidebar-user",
					children: [/* @__PURE__ */ _jsx("span", {
						className: "user-avatar",
						children: profileInitials
					}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("strong", { children: profileName }), /* @__PURE__ */ _jsx("small", { children: profileRole })] })]
				})
			]
		}), /* @__PURE__ */ _jsxs("section", {
			className: "dashboard-workspace",
			children: [/* @__PURE__ */ _jsxs("header", {
				className: "topbar",
				children: [
					/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsxs("p", { children: ["ContractIQ / ", /* @__PURE__ */ _jsx("strong", { children: breadcrumb })] }), /* @__PURE__ */ _jsx("h1", { children: pageTitle })] }),
					/* @__PURE__ */ _jsxs("label", {
						className: "dashboard-search",
						children: [/* @__PURE__ */ _jsx("span", { children: "Search" }), /* @__PURE__ */ _jsx("input", {
							placeholder: "Search...",
							type: "search"
						})]
					}),
					/* @__PURE__ */ _jsx("button", {
						className: "notification-button",
						type: "button",
						"aria-label": "Notifications",
						children: /* @__PURE__ */ _jsx("span", {
							"aria-hidden": "true",
							children: "!"
						})
					}),
					/* @__PURE__ */ _jsxs("button", {
						className: "profile-button",
						type: "button",
						children: [/* @__PURE__ */ _jsx("span", { children: profileInitials }), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("strong", { children: profileName }), /* @__PURE__ */ _jsx("small", { children: profileRole })] })]
					})
				]
			}), /* @__PURE__ */ _jsxs("div", {
				className: "dashboard-content",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "dashboard-title-row",
					children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h2", { children: pageTitle }), /* @__PURE__ */ _jsx("p", { children: welcomeText })] }), /* @__PURE__ */ _jsxs("div", {
						className: "dashboard-actions",
						children: [/* @__PURE__ */ _jsx("button", {
							className: "export-button",
							type: "button",
							children: "Export Report"
						}), isReportsView ? /* @__PURE__ */ _jsx("button", {
							className: "new-contract-button",
							type: "button",
							children: "+ New Report"
						}) : null]
					})]
				}), isReportsView ? /* @__PURE__ */ _jsxs(_Fragment, { children: [
					/* @__PURE__ */ _jsx("section", {
						className: "metrics-grid",
						"aria-label": "Reports dashboard metrics",
						children: metrics.map((metric) => /* @__PURE__ */ _jsxs("article", {
							className: "metric-card",
							children: [
								/* @__PURE__ */ _jsx("span", {
									className: `metric-icon ${metric.tone} ${metric.icon}`,
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ _jsx("span", {
									className: metric.tone === "orange" || metric.tone === "red" ? "trend down" : "trend",
									children: "↑"
								}),
								/* @__PURE__ */ _jsx("strong", { children: metric.value }),
								/* @__PURE__ */ _jsx("p", { children: metric.label })
							]
						}, metric.label))
					}),
					/* @__PURE__ */ _jsxs("section", {
						className: "recent-card",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "section-heading",
								children: [/* @__PURE__ */ _jsx("h3", { children: "Recent Reports" }), /* @__PURE__ */ _jsx("button", {
									type: "button",
									children: "View all →"
								})]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "contracts-table",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "table-row table-head",
									children: [
										/* @__PURE__ */ _jsx("span", { children: "Report" }),
										/* @__PURE__ */ _jsx("span", { children: "Type" }),
										/* @__PURE__ */ _jsx("span", { children: "Status" }),
										/* @__PURE__ */ _jsx("span", { children: "Value" }),
										/* @__PURE__ */ _jsx("span", { children: "Due Date" })
									]
								}), reports.map((item) => {
									const title = item.name || item.title || "";
									const owner = item.owner || item.generated_by || "";
									const type = item.report_type || item.type || "";
									const status = item.status || "";
									const value = item.value || item.amount || "";
									const dueDate = item.due_date || item.dueDate || "";
									return /* @__PURE__ */ _jsxs("div", {
										className: "table-row",
										children: [
											/* @__PURE__ */ _jsxs("span", { children: [/* @__PURE__ */ _jsx("strong", { children: title }), /* @__PURE__ */ _jsx("small", { children: owner })] }),
											/* @__PURE__ */ _jsx("span", { children: type ? /* @__PURE__ */ _jsx("mark", { children: type }) : "" }),
											/* @__PURE__ */ _jsx("span", { children: status ? /* @__PURE__ */ _jsx("em", { children: status }) : "" }),
											/* @__PURE__ */ _jsx("span", { children: /* @__PURE__ */ _jsx("strong", { children: value }) }),
											/* @__PURE__ */ _jsx("span", { children: dueDate })
										]
									}, item.id);
								})]
							}),
							reportsStatus === "loading" ? /* @__PURE__ */ _jsx("p", {
								className: "empty-table-message",
								children: "Loading reports..."
							}) : null,
							reportsStatus === "error" ? /* @__PURE__ */ _jsx("p", {
								className: "empty-table-message",
								children: "Unable to load reports."
							}) : null
						]
					}),
					/* @__PURE__ */ _jsxs("section", {
						className: "status-breakdown-card",
						children: [/* @__PURE__ */ _jsx("h3", { children: "Status Breakdown" }), /* @__PURE__ */ _jsx("div", {
							className: "status-breakdown-list",
							children: statusBreakdown.map((item) => /* @__PURE__ */ _jsxs("div", {
								className: "status-breakdown-row",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "status-breakdown-meta",
									children: [/* @__PURE__ */ _jsx("span", { children: item.label }), /* @__PURE__ */ _jsx("strong", { children: item.value })]
								}), /* @__PURE__ */ _jsx("div", {
									className: "status-track",
									children: /* @__PURE__ */ _jsx("span", { style: {
										backgroundColor: item.color,
										width: item.width
									} })
								})]
							}, item.label))
						})]
					})
				] }) : null]
			})]
		})]
	});
}
function getInitials(value) {
	if (!value) {
		return "";
	}
	return value.split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("");
}
