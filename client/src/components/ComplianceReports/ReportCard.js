import "./ReportCard.css";
import { DocumentTextIcon, EyeIcon, ArrowDownTrayIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ReportCard({ id, title, department, generated, size, status, onPreview, onPDF, onExcel }) {
	const statusClass = status?.toLowerCase();
	return /* @__PURE__ */ _jsxs("div", {
		className: "report-card",
		children: [/* @__PURE__ */ _jsxs("div", {
			className: "report-left",
			children: [/* @__PURE__ */ _jsx("div", {
				className: "report-icon",
				children: /* @__PURE__ */ _jsx(DocumentTextIcon, {})
			}), /* @__PURE__ */ _jsxs("div", {
				className: "report-info",
				children: [
					/* @__PURE__ */ _jsxs("div", {
						className: "report-title-row",
						children: [/* @__PURE__ */ _jsx("h3", { children: title }), /* @__PURE__ */ _jsx("span", {
							className: `report-status ${statusClass}`,
							children: status
						})]
					}),
					/* @__PURE__ */ _jsx("p", {
						className: "department",
						children: department
					}),
					/* @__PURE__ */ _jsxs("p", {
						className: "report-meta",
						children: [
							"Generated ",
							generated,
							/* @__PURE__ */ _jsx("span", { children: "•" }),
							size
						]
					})
				]
			})]
		}), /* @__PURE__ */ _jsxs("div", {
			className: "report-actions",
			children: [
				/* @__PURE__ */ _jsxs("button", {
					className: "preview-btn",
					onClick: onPreview,
					children: [/* @__PURE__ */ _jsx(EyeIcon, {}), "Preview"]
				}),
				/* @__PURE__ */ _jsxs("button", {
					className: "pdf-btn",
					onClick: () => onPDF(id),
					children: [/* @__PURE__ */ _jsx(ArrowDownTrayIcon, {}), "PDF"]
				}),
				/* @__PURE__ */ _jsxs("button", {
					className: "excel-btn",
					onClick: () => onExcel(id),
					children: [/* @__PURE__ */ _jsx(TableCellsIcon, {}), "Excel"]
				})
			]
		})]
	});
}
export default ReportCard;
