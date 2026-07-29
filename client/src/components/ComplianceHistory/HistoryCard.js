import "./HistoryCard.css";
import { ShieldCheckIcon, ClipboardDocumentCheckIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function HistoryCard({ activity, department, activityDate, status }) {
	const getStatusClass = () => {
		switch (status) {
			case "Completed": return "completed";
			case "Closed": return "closed";
			case "Approved": return "approved";
			case "Pending": return "pending";
			case "Critical": return "critical";
			default: return "";
		}
	};
	const getIcon = () => {
		switch (status) {
			case "Completed": return /* @__PURE__ */ _jsx(ShieldCheckIcon, {});
			case "Closed": return /* @__PURE__ */ _jsx(ClipboardDocumentCheckIcon, {});
			case "Approved": return /* @__PURE__ */ _jsx(CheckCircleIcon, {});
			case "Pending": return /* @__PURE__ */ _jsx(ClockIcon, {});
			case "Critical": return /* @__PURE__ */ _jsx(ExclamationTriangleIcon, {});
			default: return /* @__PURE__ */ _jsx(ShieldCheckIcon, {});
		}
	};
	const getColor = () => {
		switch (status) {
			case "Completed": return "#2563EB";
			case "Closed": return "#10B981";
			case "Approved": return "#059669";
			case "Pending": return "#F59E0B";
			case "Critical": return "#EF4444";
			default: return "#2563EB";
		}
	};
	const getBackground = () => {
		switch (status) {
			case "Completed": return "#DBEAFE";
			case "Closed": return "#DCFCE7";
			case "Approved": return "#D1FAE5";
			case "Pending": return "#FEF3C7";
			case "Critical": return "#FEE2E2";
			default: return "#DBEAFE";
		}
	};
	return /* @__PURE__ */ _jsxs("div", {
		className: "history-item",
		children: [/* @__PURE__ */ _jsx("div", {
			className: "history-dot",
			style: { background: getColor() }
		}), /* @__PURE__ */ _jsx("div", {
			className: "history-card",
			children: /* @__PURE__ */ _jsxs("div", {
				className: "history-card-left",
				children: [/* @__PURE__ */ _jsx("div", {
					className: "history-icon",
					style: {
						background: getBackground(),
						color: getColor()
					},
					children: getIcon()
				}), /* @__PURE__ */ _jsxs("div", {
					className: "history-info",
					children: [
						/* @__PURE__ */ _jsxs("div", {
							className: "history-title-row",
							children: [/* @__PURE__ */ _jsx("h3", { children: activity }), /* @__PURE__ */ _jsx("span", {
								className: `history-status ${getStatusClass()}`,
								children: status
							})]
						}),
						/* @__PURE__ */ _jsx("p", {
							className: "history-department",
							children: department
						}),
						/* @__PURE__ */ _jsx("p", {
							className: "history-date",
							children: activityDate
						})
					]
				})]
			})
		})]
	});
}
export default HistoryCard;
