import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { roleData } from "./chartData";

const COLORS = [
  "#2563EB",
  "#8B5CF6",
  "#CBD5E1",
  "#22C55E",
  "#F59E0B",
];

const RoleDistribution = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

      <h2 className="text-lg font-semibold">
        Role Distribution
      </h2>

      <p className="text-gray-500 text-sm mb-5">
        Users by assigned role
      </p>

      <ResponsiveContainer width="100%" height={260}>

        <PieChart>

          <Pie
            data={roleData}
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {roleData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

      <div className="mt-4 space-y-2">

        {roleData.map((role, index) => (

          <div
            key={role.name}
            className="flex justify-between items-center"
          >

            <div className="flex items-center gap-2">

              <span
                className="w-3 h-3 rounded-full"
                style={{
                  background: COLORS[index],
                }}
              ></span>

              <span>{role.name}</span>

            </div>

            <span>{role.value}</span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RoleDistribution;