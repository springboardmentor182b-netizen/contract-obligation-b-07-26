import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

function colorFor(score) {
  if (score >= 85) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  return "#EF4444";
}

export default function DepartmentScores({ data }) {
  return (
    <div className="rounded-2xl border border-[#ECE7DE] bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-[#1F2937]">
        Department Compliance Scores
      </h3>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barSize={18}>
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#98A2B3" }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="department"
              width={80}
              tick={{ fontSize: 12, fill: "#374151" }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="score" radius={[0, 6, 6, 0]}>
              {data.map((entry) => (
                <Cell key={entry.department} fill={colorFor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
