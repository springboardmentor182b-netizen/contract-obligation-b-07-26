import "./WeeklyChart.css";
import { useEffect, useState } from "react";
import BASE_URL from "../../api/api";
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
