import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function StatusBreakdownCard({ data }) {
  return (
    <div className="rounded-2xl border border-[#ECE7DE] bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#98A2B3]">
        Status Breakdown
      </p>

      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
        <div className="h-40 w-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="label"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={2}
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="w-full space-y-2.5">
          {data.map((item) => (
            <li key={item.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#374151]">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
              <span className="text-[#6B7280]">
                {item.count} &middot; {item.percentage}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
