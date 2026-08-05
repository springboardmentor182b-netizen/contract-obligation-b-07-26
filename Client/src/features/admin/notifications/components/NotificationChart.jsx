import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import { getChartData } from "../services/chartService";

const colors = [
  "#3B82F6",
  "#60A5FA",
  "#F59E0B",
  "#EF4444",
  "#10B981",
  "#8B5CF6",
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#ffffff",
          padding: "12px 16px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,.12)",
          border: "1px solid #E5E7EB",
        }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            color: "#111827",
          }}
        >
          {label}
        </p>

        <p
          style={{
            margin: "6px 0 0",
            color: "#2563EB",
            fontWeight: 600,
          }}
        >
          {payload[0].value} Notifications
        </p>
      </div>
    );
  }

  return null;
}

function NotificationChart() {
  const [chartData, setChartData] = useState([]);

  const loadChartData = async () => {
    try {
      const res = await getChartData();

      const formattedData = res.data.map((item) => ({
        status: item._id,
        total: item.total,
      }));

      setChartData(formattedData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadChartData();
  }, []);

  return (
    <div
      className="card border-0 shadow-sm rounded-4"
      style={{ height: "100%" }}
    >
      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <div>

            <h4 className="fw-bold mb-1">
              Notification Activity
            </h4>

            <p className="text-secondary mb-0">
              Notifications by Status
            </p>

          </div>

          <div className="text-end">

            <h5 className="text-success fw-bold mb-0">
              Live
            </h5>

            <small className="text-muted">
              MongoDB Data
            </small>

          </div>

        </div>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 0,
              left: -20,
              bottom: 0,
            }}
          >

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="status"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
            />

            <YAxis hide />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: "rgba(37,99,235,.06)",
              }}
            />

            <Bar
              dataKey="total"
              radius={[12, 12, 0, 0]}
              animationDuration={1200}
            >
              {chartData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />

              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>
    </div>
  );
}

export default NotificationChart;