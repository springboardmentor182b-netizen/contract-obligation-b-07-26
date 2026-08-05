import "./WeeklyChart.css";
import { useMemo } from "react";
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

function WeeklyChart({ obligations = [] }) {

  const data = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const toDateKey = (value) => {
      if (!value) return null;
      const text = String(value).slice(0, 10);
      if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return null;
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(today);
      day.setDate(today.getDate() - 6 + index);
      const dateKey = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
      const dueToday = obligations.filter((item) => toDateKey(item.due_date) === dateKey);
      const completedToday = obligations.filter((item) => {
        if (String(item.status || '').toLowerCase() !== 'completed') return false;

        // Older records may not have a completion date, so use their due date as a fallback.
        return toDateKey(item.completion_date || item.due_date) === dateKey;
      });

      return {
        day: day.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' }),
        due: dueToday.length,
        completed: completedToday.length,
      };
    });
  }, [obligations]);

  return (

    <div className="weekly-card">

      <div className="chart-header">

        <h3>Weekly Performance</h3>

        <p>Last 7 days</p>

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
              dataKey="due"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Due"
            />

            <Line
              type="monotone"
              dataKey="completed"
              stroke="#16A34A"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Completed"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default WeeklyChart;
