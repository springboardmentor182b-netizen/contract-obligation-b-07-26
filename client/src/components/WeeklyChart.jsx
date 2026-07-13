import "./WeeklyChart.css";

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

  const data = [

    {
      day: "Monday",
      completed: 5,
      pending: 2
    },

    {
      day: "Tuesday",
      completed: 8,
      pending: 4
    },

    {
      day: "Wednesday",
      completed: 10,
      pending: 3
    },

    {
      day: "Thursday",
      completed: 15,
      pending: 5
    },

    {
      day: "Friday",
      completed: 18,
      pending: 4
    },

    {
      day: "Saturday",
      completed: 16,
      pending: 2
    },

    {
      day: "Sunday",
      completed: 20,
      pending: 1
    }

  ];

  return (

    <div className="weekly-card">

      <div className="chart-header">

        <h3>Weekly Performance</h3>

        <p>This Week</p>

      </div>
      <div className="chart-container">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <LineChart
          data={data}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
          />

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
          />

          <Line
            type="monotone"
            dataKey="pending"
            stroke="#F59E0B"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

        </LineChart>

      </ResponsiveContainer>
      </div>
    </div>

  );

}

export default WeeklyChart;