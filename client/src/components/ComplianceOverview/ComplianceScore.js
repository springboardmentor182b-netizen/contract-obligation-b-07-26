import "./ComplianceScore.css";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ComplianceScore({ score = 0 }) {
	const percentage = Math.round(score);
	const radius = 95;
	const stroke = 12;
	const normalizedRadius = radius - stroke;
	const circumference = normalizedRadius * 2 * Math.PI;
	const offset = circumference - percentage / 100 * circumference;
	return /* @__PURE__ */ _jsxs("div", {
		className: "compliance-score-card",
		children: [/* @__PURE__ */ _jsx("p", {
			className: "score-title",
			children: "OVERALL COMPLIANCE SCORE"
		}), /* @__PURE__ */ _jsxs("div", {
			className: "score-circle",
			children: [/* @__PURE__ */ _jsxs("svg", {
				width: "220",
				height: "220",
				children: [/* @__PURE__ */ _jsx("circle", {
					className: "bg-circle",
					strokeWidth: stroke,
					r: normalizedRadius,
					cx: "110",
					cy: "110"
				}), /* @__PURE__ */ _jsx("circle", {
					className: "progress-circle",
					strokeWidth: stroke,
					strokeDasharray: circumference,
					strokeDashoffset: offset,
					r: normalizedRadius,
					cx: "110",
					cy: "110"
				})]
			}), /* @__PURE__ */ _jsxs("div", {
				className: "score-text",
				children: [/* @__PURE__ */ _jsx("h1", { children: percentage }), /* @__PURE__ */ _jsx("span", { children: "%" })]
			})]
		})]
	});
}
export default ComplianceScore;
