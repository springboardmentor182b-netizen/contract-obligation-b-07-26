import "./ComplianceDonutChart.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ComplianceDonutChart({ data = [] }) {
	return /* @__PURE__ */ _jsxs("div", {
		className: "status-card",
		children: [/* @__PURE__ */ _jsx("h3", { children: "Status Distribution" }), /* @__PURE__ */ _jsxs("div", {
			className: "status-body",
			children: [/* @__PURE__ */ _jsx("div", {
				className: "status-chart",
				children: /* @__PURE__ */ _jsx(ResponsiveContainer, {
					width: "100%",
					height: 260,
					children: /* @__PURE__ */ _jsxs(PieChart, { children: [/* @__PURE__ */ _jsx(Pie, {
						data,
						dataKey: "value",
						nameKey: "name",
						innerRadius: 60,
						outerRadius: 95,
						paddingAngle: 3,
						children: data.map((item, index) => /* @__PURE__ */ _jsx(Cell, { fill: item.color }, index))
					}), /* @__PURE__ */ _jsx(Tooltip, {})] })
				})
			}), /* @__PURE__ */ _jsx("div", {
				className: "status-legend",
				children: data.map((item, index) => /* @__PURE__ */ _jsxs("div", {
					className: "legend-row",
					children: [/* @__PURE__ */ _jsxs("div", {
						className: "legend-left",
						children: [/* @__PURE__ */ _jsx("span", {
							className: "legend-dot",
							style: { background: item.color }
						}), /* @__PURE__ */ _jsx("span", { children: item.name })]
					}), /* @__PURE__ */ _jsx("div", {
						className: "legend-right",
						children: /* @__PURE__ */ _jsx("span", { children: item.value })
					})]
				}, index))
			})]
		})]
	});
}
export default ComplianceDonutChart;
