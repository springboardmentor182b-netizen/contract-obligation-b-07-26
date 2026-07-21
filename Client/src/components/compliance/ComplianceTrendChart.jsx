import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ComplianceTrendChart({ trend }) {
  // trend is a short list like [{month, score}, ...]; pad to a full Jan-Dec series
  // for display, carrying the last known score forward when data isn't provided yet.
  const byMonth = Object.fromEntries(trend.map((t) => [t.month, t.score]));
  let last = trend[0]?.score ?? 0;
  const data = MONTHS.map((month) => {
    if (byMonth[month] !== undefined) last = byMonth[month];
    return { month, score: byMonth[month] ?? last };
  });

  return (
    <div className="rounded-2xl border border-[#ECE7DE] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#1F2937]">
            Compliance Score Trend
          </h3>
          <p className="text-sm text-[#6B7280]">
            Monthly compliance score across all contracts &mdash; 2024
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#E7F6EF] px-3 py-1 text-xs font-medium text-[#12805C]">
            &uarr; 11 pts YTD
          </span>
          <span className="rounded-full border border-[#ECE7DE] px-3 py-1 text-xs font-medium text-[#374151]">
            2024
          </span>
        </div>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ECE7DE" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#98A2B3" }} axisLine={false} tickLine={false} />
            <YAxis
              domain={[70, 100]}
              tick={{ fontSize: 12, fill: "#98A2B3" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #ECE7DE", fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#22C55E"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#22C55E" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
