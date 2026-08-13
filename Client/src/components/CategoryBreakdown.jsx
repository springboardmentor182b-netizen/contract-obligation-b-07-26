import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function CategoryBreakdown({ data }) {
  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-card">
      <p className="mb-4 text-sm font-medium text-ink-soft">
        Compliance by Category
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barSize={14}>
            <CartesianGrid horizontal={false} stroke="#EAECF0" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#98A2B3" }} />
            <YAxis
              type="category"
              dataKey="category"
              width={110}
              tick={{ fontSize: 12, fill: "#475467" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E4E7EC",
                fontSize: 12,
              }}
            />
            <Bar dataKey="compliant" stackId="a" fill="#12805C" name="Compliant" />
            <Bar dataKey="atRisk" stackId="a" fill="#B54708" name="At Risk" />
            <Bar dataKey="expired" stackId="a" fill="#B42318" name="Expired" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
