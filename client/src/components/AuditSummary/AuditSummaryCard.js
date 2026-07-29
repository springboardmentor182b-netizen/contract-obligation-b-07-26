import "./AuditSummaryCard.css";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function AuditSummaryCard({ title, value, subtitle, badge, icon, iconBg, badgeBg, badgeColor }) {
	return /* @__PURE__ */ _jsxs("div", {
		className: "audit-summary-card",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "audit-card-top",
				children: [/* @__PURE__ */ _jsx("div", {
					className: "audit-card-icon",
					style: { background: iconBg },
					children: icon
				}), badge && /* @__PURE__ */ _jsx("span", {
					className: "audit-card-badge",
					style: {
						background: badgeBg,
						color: badgeColor
					},
					children: badge
				})]
			}),
			/* @__PURE__ */ _jsx("h2", {
				className: "audit-card-value",
				children: value
			}),
			/* @__PURE__ */ _jsx("h4", {
				className: "audit-card-title",
				children: title
			}),
			/* @__PURE__ */ _jsx("p", {
				className: "audit-card-subtitle",
				children: subtitle
			})
		]
	});
}
export default AuditSummaryCard;
