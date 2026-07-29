import "./RiskSummaryCard.css";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function RiskSummaryCard({ title, value, badge, icon, iconBg, badgeBg, badgeColor }) {
	return /* @__PURE__ */ _jsxs("div", {
		className: "risk-summary-card",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "risk-summary-top",
				children: [/* @__PURE__ */ _jsx("div", {
					className: "risk-summary-icon",
					style: { background: iconBg },
					children: icon
				}), /* @__PURE__ */ _jsx("span", {
					className: "risk-summary-badge",
					style: {
						background: badgeBg,
						color: badgeColor
					},
					children: badge
				})]
			}),
			/* @__PURE__ */ _jsx("h2", { children: value }),
			/* @__PURE__ */ _jsx("p", { children: title })
		]
	});
}
export default RiskSummaryCard;
