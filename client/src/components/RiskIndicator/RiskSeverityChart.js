import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function RiskSeverityChart({ risks }) {
	const severityData = [
		{
			name: "Critical",
			value: risks.filter((risk) => risk.severity === "Critical").length,
			color: "#EF4444"
		},
		{
			name: "High",
			value: risks.filter((risk) => risk.severity === "High").length,
			color: "#F97316"
		},
		{
			name: "Medium",
			value: risks.filter((risk) => risk.severity === "Medium").length,
			color: "#FACC15"
		},
		{
			name: "Low",
			value: risks.filter((risk) => risk.severity === "Low").length,
			color: "#22C55E"
		}
	];
	return /* @__PURE__ */ _jsx("div", {
		style: {
			width: "100%",
			height: 320
		},
		children: /* @__PURE__ */ _jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ _jsxs(PieChart, { children: [
				/* @__PURE__ */ _jsx(Pie, {
					data: severityData,
					dataKey: "value",
					nameKey: "name",
					cx: "50%",
					cy: "50%",
					innerRadius: 70,
					outerRadius: 110,
					paddingAngle: 4,
					children: severityData.map((entry, index) => /* @__PURE__ */ _jsx(Cell, { fill: entry.color }, index))
				}),
				/* @__PURE__ */ _jsx(Tooltip, {}),
				/* @__PURE__ */ _jsx(Legend, {
					verticalAlign: "bottom",
					iconType: "circle"
				})
			] })
		})
	});
}
export default RiskSeverityChart;
