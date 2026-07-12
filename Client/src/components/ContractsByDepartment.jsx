import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { department: "Legal", compliance: 54 },
  { department: "Procurement", compliance: 38 },
  { department: "HR", compliance: 29 },
  { department: "Finance", compliance: 43 },
  { department: "IT", compliance: 22 },
  { department: "Operations", compliance:18},
];

function ComplianceLevels() {
  return (
    <div className="compliance-card">

      <div className="chart-header">
        <div>
          <h2>Contracts by Department</h2>
          <p>Active contracts by business unit</p>
        </div>

      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />

            <XAxis
            dataKey="department"
            axisLine={false}
            tickLine={false} 
            />

            <YAxis
             domain={[0, 60]} 
             axisLine={false}
             tickLine={false}
             tickMargin={10}/>

            <Tooltip />

            <Bar
              dataKey="compliance"
              fill="#F59E0B"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ComplianceLevels;