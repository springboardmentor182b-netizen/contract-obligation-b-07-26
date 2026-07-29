import "./AuditTable.css";
import { useState } from "react";
import { MagnifyingGlassIcon, FunnelIcon, EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function AuditTable({ data = [] }) {
	const [search, setSearch] = useState("");
	// Ensure data is always an array
	const audits = Array.isArray(data) ? data : [];
	// Filter → Sort → Show only latest 3
	const filtered = audits.filter((item) => {
		return item.audit_name?.toLowerCase().includes(search.toLowerCase()) || item.department?.toLowerCase().includes(search.toLowerCase()) || item.status?.toLowerCase().includes(search.toLowerCase());
	}).sort((a, b) => new Date(b.id) - new Date(a.id)).slice(0, 3);
	return /* @__PURE__ */ _jsxs("div", {
		className: "audit-table-container",
		children: [/* @__PURE__ */ _jsxs("div", {
			className: "audit-toolbar",
			children: [/* @__PURE__ */ _jsxs("div", {
				className: "audit-search",
				children: [/* @__PURE__ */ _jsx(MagnifyingGlassIcon, { className: "toolbar-icon" }), /* @__PURE__ */ _jsx("input", {
					type: "text",
					placeholder: "Search audit...",
					value: search,
					onChange: (e) => setSearch(e.target.value)
				})]
			}), /* @__PURE__ */ _jsxs("button", {
				className: "audit-filter",
				children: [/* @__PURE__ */ _jsx(FunnelIcon, { className: "toolbar-icon" }), "Filter"]
			})]
		}), /* @__PURE__ */ _jsxs("table", {
			className: "audit-table",
			children: [/* @__PURE__ */ _jsx("thead", { children: /* @__PURE__ */ _jsxs("tr", { children: [
				/* @__PURE__ */ _jsx("th", { children: "ID" }),
				/* @__PURE__ */ _jsx("th", { children: "Audit Name" }),
				/* @__PURE__ */ _jsx("th", { children: "Department" }),
				/* @__PURE__ */ _jsx("th", { children: "Severity" }),
				/* @__PURE__ */ _jsx("th", { children: "Status" }),
				/* @__PURE__ */ _jsx("th", { children: "Audit Date" }),
				/* @__PURE__ */ _jsx("th", { children: "Action" })
			] }) }), /* @__PURE__ */ _jsx("tbody", { children: filtered.length > 0 ? filtered.map((audit) => /* @__PURE__ */ _jsxs("tr", { children: [
				/* @__PURE__ */ _jsx("td", { children: audit.id }),
				/* @__PURE__ */ _jsx("td", { children: audit.audit_name }),
				/* @__PURE__ */ _jsx("td", { children: audit.department }),
				/* @__PURE__ */ _jsx("td", { children: /* @__PURE__ */ _jsx("span", {
					className: `severity-badge ${audit.severity?.toLowerCase()}`,
					children: audit.severity
				}) }),
				/* @__PURE__ */ _jsx("td", { children: /* @__PURE__ */ _jsx("span", {
					className: `status-badge ${audit.status?.toLowerCase().replace(/\s/g, "-")}`,
					children: audit.status
				}) }),
				/* @__PURE__ */ _jsx("td", { children: audit.audit_date }),
				/* @__PURE__ */ _jsx("td", { children: /* @__PURE__ */ _jsxs("div", {
					className: "action-buttons",
					children: [/* @__PURE__ */ _jsx("button", {
						className: "view-btn",
						children: /* @__PURE__ */ _jsx(EyeIcon, { className: "action-icon" })
					}), /* @__PURE__ */ _jsx("button", {
						className: "edit-btn",
						children: /* @__PURE__ */ _jsx(PencilSquareIcon, { className: "action-icon" })
					})]
				}) })
			] }, audit.id)) : /* @__PURE__ */ _jsx("tr", { children: /* @__PURE__ */ _jsx("td", {
				colSpan: "7",
				style: {
					textAlign: "center",
					padding: "20px",
					color: "#64748B"
				},
				children: "No audit records found."
			}) }) })]
		})]
	});
}
export default AuditTable;
