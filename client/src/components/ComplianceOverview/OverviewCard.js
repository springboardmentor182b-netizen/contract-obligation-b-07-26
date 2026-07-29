import "./OverviewCard.css";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function OverviewCard({ title, value, subtitle, icon, bgColor, iconColor }) {
	return /* @__PURE__ */ _jsxs("div", {
		className: "overview-card",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "card-top",
				children: [/* @__PURE__ */ _jsx("div", {
					className: "overview-icon",
					style: { background: bgColor },
					children: /* @__PURE__ */ _jsx("div", {
						style: { color: iconColor },
						children: icon
					})
				}), /* @__PURE__ */ _jsx("h2", { children: value })]
			}),
			/* @__PURE__ */ _jsx("h3", { children: title }),
			/* @__PURE__ */ _jsx("p", { children: subtitle })
		]
	});
}
export default OverviewCard;
