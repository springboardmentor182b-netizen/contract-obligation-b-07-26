import "./ObligationCard.css";
import { ExclamationTriangleIcon, UserCircleIcon, BuildingOffice2Icon, CalendarDaysIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ObligationCard({ id, title, contract, department, owner, dueDate, overdue, priority, status }) {
	return /* @__PURE__ */ _jsxs("div", {
		className: "obligation-card",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "obligation-header",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "header-left",
					children: [/* @__PURE__ */ _jsxs("span", {
						className: `priority ${priority?.toLowerCase()}`,
						children: [/* @__PURE__ */ _jsx(ExclamationTriangleIcon, { className: "priority-icon" }), priority]
					}), /* @__PURE__ */ _jsx("span", {
						className: "obligation-id",
						children: id
					})]
				}), /* @__PURE__ */ _jsx("span", {
					className: `status ${status?.toLowerCase().replace(/\s/g, "-")}`,
					children: status
				})]
			}),
			/* @__PURE__ */ _jsx("h3", {
				className: "obligation-title",
				children: title
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "details-grid",
				children: [
					/* @__PURE__ */ _jsxs("div", {
						className: "detail-item",
						children: [/* @__PURE__ */ _jsx(DocumentTextIcon, { className: "detail-icon" }), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("label", { children: "Contract" }), /* @__PURE__ */ _jsx("p", { children: contract })] })]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "detail-item",
						children: [/* @__PURE__ */ _jsx(BuildingOffice2Icon, { className: "detail-icon" }), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("label", { children: "Department" }), /* @__PURE__ */ _jsx("p", { children: department })] })]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "detail-item",
						children: [/* @__PURE__ */ _jsx(UserCircleIcon, { className: "detail-icon" }), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("label", { children: "Owner" }), /* @__PURE__ */ _jsx("p", { children: owner })] })]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "detail-item",
						children: [/* @__PURE__ */ _jsx(CalendarDaysIcon, { className: "detail-icon" }), /* @__PURE__ */ _jsxs("div", { children: [
							/* @__PURE__ */ _jsx("label", { children: "Due Date" }),
							/* @__PURE__ */ _jsx("p", { children: dueDate }),
							/* @__PURE__ */ _jsx("span", {
								className: "overdue-text",
								children: overdue
							})
						] })]
					})
				]
			})
		]
	});
}
export default ObligationCard;
