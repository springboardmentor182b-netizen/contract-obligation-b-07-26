import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { registrationData } from "./chartData";

const RegistrationChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-semibold">
            Registration Trend
          </h2>

          <p className="text-gray-500 text-sm">
            New users per month — 2026
          </p>
        </div>

        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
          +28.9%
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={registrationData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="users"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistrationChart;