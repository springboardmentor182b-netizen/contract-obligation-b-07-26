import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function AuditTrendChart({ data = [] }) {
	return /* @__PURE__ */ _jsx("div", {
		style: {
			width: "100%",
			height: 340
		},
		children: /* @__PURE__ */ _jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ _jsxs(LineChart, {
				data,
				margin: {
					top: 10,
					right: 20,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ _jsx(CartesianGrid, {
						strokeDasharray: "4 4",
						stroke: "#E5E7EB"
					}),
					/* @__PURE__ */ _jsx(XAxis, {
						dataKey: "month",
						tick: {
							fill: "#64748B",
							fontSize: 13
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ _jsx(YAxis, {
						allowDecimals: false,
						tick: {
							fill: "#64748B",
							fontSize: 13
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ _jsx(Tooltip, { contentStyle: {
						borderRadius: "10px",
						border: "1px solid #E5E7EB",
						boxShadow: "0 4px 12px rgba(0,0,0,.08)"
					} }),
					/* @__PURE__ */ _jsx(Line, {
						type: "monotone",
						dataKey: "completed",
						stroke: "#2563EB",
						strokeWidth: 3,
						dot: {
							r: 5,
							fill: "#2563EB",
							stroke: "#FFFFFF",
							strokeWidth: 2
						},
						activeDot: { r: 7 }
					})
				]
			})
		})
	});
}
export default AuditTrendChart;
