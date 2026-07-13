import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import api from "../../api";

const RiskTrendChart = () => {
  const [riskTrend, setRiskTrend] = useState([]);

  useEffect(() => {
    loadRiskTrend();
  }, []);

  const loadRiskTrend = async () => {
    try {
      const response = await api.get("/dashboard/risk-trend");

      // Create extra demo series so the chart resembles the Figma
      const data = [
  {
    month: "Jan",
    low: 88,
    medium: 10,
    high: 4,
  },
  {
    month: "Feb",
    low: 86,
    medium: 12,
    high: 5,
  },
  {
    month: "Mar",
    low: 84,
    medium: 10,
    high: 6,
  },
  {
    month: "Apr",
    low: 87,
    medium: 9,
    high: 5,
  },
  {
    month: "May",
    low: 89,
    medium: 8,
    high: 4,
  },
  {
    month: "Jun",
    low: 91,
    medium: 7,
    high: 3,
  },
];

setRiskTrend(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chart-card">
      <h3 style={{ marginBottom: "20px" }}>
        Risk Trend (H1 2024)
      </h3>

      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart
          data={riskTrend}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Legend />
            <Area
    type="linear"
    dataKey="low"
      fill="#DFF5F2"
      fillOpacity={0.8}
  stroke="none"
/>
          <Line
            type="linear"
            dataKey="high"
            stroke="#EF4444"
            strokeWidth={3}
            dot={{ r: 4 }}
           name="High Risk"
          />

          <Line
          type="linear"
            dataKey="medium"
            stroke="#F59E0B"
            strokeWidth={3}
            dot={{ r: 4 }}
           name="Medium Risk"
          />

         <Line
           type="linear"
            dataKey="low"
            stroke="#22C55E"
            strokeWidth={3}
            dot={{ r: 4 }}
           name="Low Risk"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskTrendChart;