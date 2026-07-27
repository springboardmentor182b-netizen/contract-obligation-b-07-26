import "./WeeklyChart.css";
import { useEffect, useState } from "react";
import BASE_URL from "../../api/api";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function WeeklyChart() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetch(`${BASE_URL}/dashboard/weekly-chart`).then((response) => response.json()).then((result) => {
			setData(result);
			setLoading(false);
		}).catch((error) => {
			console.error(error);
			setLoading(false);
		});
	}, []);
	if (loading) {
		return /* @__PURE__ */ _jsx("div", {
			className: "weekly-card",
			children: /* @__PURE__ */ _jsx("h3", { children: "Loading Weekly Chart..." })
		});
	}
	return /* @__PURE__ */ _jsxs("div", {
		className: "weekly-card",
		children: [/* @__PURE__ */ _jsxs("div", {
			className: "chart-header",
			children: [/* @__PURE__ */ _jsx("h3", { children: "Weekly Performance" }), /* @__PURE__ */ _jsx("p", { children: "This Week" })]
		}), /* @__PURE__ */ _jsx("div", {
			className: "chart-container",
			children: /* @__PURE__ */ _jsx(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ _jsxs(LineChart, {
					data,
					children: [
						/* @__PURE__ */ _jsx(CartesianGrid, { strokeDasharray: "3 3" }),
						/* @__PURE__ */ _jsx(XAxis, { dataKey: "day" }),
						/* @__PURE__ */ _jsx(YAxis, {}),
						/* @__PURE__ */ _jsx(Tooltip, {}),
						/* @__PURE__ */ _jsx(Legend, {
							verticalAlign: "bottom",
							align: "center",
							iconType: "line"
						}),
						/* @__PURE__ */ _jsx(Line, {
							type: "monotone",
							dataKey: "completed",
							stroke: "#2563EB",
							strokeWidth: 3,
							dot: { r: 5 },
							activeDot: { r: 8 },
							name: "Completed"
						}),
						/* @__PURE__ */ _jsx(Line, {
							type: "monotone",
							dataKey: "pending",
							stroke: "#F59E0B",
							strokeWidth: 3,
							dot: { r: 5 },
							activeDot: { r: 8 },
							name: "Pending"
						})
					]
				})
			})
		})]
	});
}

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function WeeklyChart() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {

    fetch(`${BASE_URL}/dashboard/weekly-chart`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <div className="weekly-card">
        <h3>Loading Weekly Chart...</h3>
      </div>
    );
  }

  return (

    <div className="weekly-card">

      <div className="chart-header">

        <h3>Weekly Performance</h3>

        <p>This Week</p>

      </div>

      <div className="chart-container">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="line"
            />

            <Line
              type="monotone"
              dataKey="completed"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Completed"
            />

            <Line
              type="monotone"
              dataKey="pending"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Pending"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}


export default WeeklyChart;
