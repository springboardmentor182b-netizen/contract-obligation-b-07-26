import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function RiskDepartmentChart({ risks }) {
	const colorMap = {
		Legal: "#EF4444",
		Finance: "#F97316",
		Operations: "#FACC15",
		IT: "#3B82F6",
		HR: "#22C55E",
		Procurement: "#8B5CF6",
		Compliance: "#14B8A6"
	};
	// Count risks by department
	const departmentCounts = risks.reduce((acc, risk) => {
		const department = risk.department;
		if (acc[department]) {
			acc[department] += 1;
		} else {
			acc[department] = 1;
		}
		return acc;
	}, {});
	// Convert object to array for Recharts
	const chartData = Object.keys(departmentCounts).map((department) => ({
		department,
		risks: departmentCounts[department],
		color: colorMap[department] || "#64748B"
	}));
	return /* @__PURE__ */ _jsx("div", {
		style: {
			width: "100%",
			height: 320
		},
		children: /* @__PURE__ */ _jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ _jsxs(BarChart, {
				data: chartData,
				layout: "vertical",
				margin: {
					top: 10,
					right: 20,
					left: 10,
					bottom: 10
				},
				children: [
					/* @__PURE__ */ _jsx(CartesianGrid, {
						strokeDasharray: "3 3",
						horizontal: false
					}),
					/* @__PURE__ */ _jsx(XAxis, {
						type: "number",
						tick: { fill: "#64748B" }
					}),
					/* @__PURE__ */ _jsx(YAxis, {
						dataKey: "department",
						type: "category",
						tick: { fill: "#334155" },
						width: 110
					}),
					/* @__PURE__ */ _jsx(Tooltip, {}),
					/* @__PURE__ */ _jsx(Bar, {
						dataKey: "risks",
						radius: [
							0,
							8,
							8,
							0
						],
						barSize: 18,
						children: chartData.map((entry, index) => /* @__PURE__ */ _jsx(Cell, { fill: entry.color }, index))
					})
				]
			})
		})
	});
}
export default RiskDepartmentChart;
