import { DocumentTextIcon, ClockIcon, ClipboardDocumentCheckIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import "./KPICard.css";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function KPICard({ title, value, badge, icon }) {
	return /* @__PURE__ */ _jsxs("div", {
		className: "kpi-card",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "top",
				children: [/* @__PURE__ */ _jsx("div", {
					className: "icon",
					children: icon
				}), /* @__PURE__ */ _jsx("span", {
					className: "badge",
					children: badge
				})]
			}),
			/* @__PURE__ */ _jsx("h2", { children: value }),
			/* @__PURE__ */ _jsx("p", { children: title })
		]
	});
}
export default KPICard;
