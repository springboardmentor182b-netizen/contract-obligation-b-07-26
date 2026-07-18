import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Active", value: 124, color: "#22C55E" },
  { name: "Pending", value: 36, color: "#3B82F6" },
  { name: "Under Review", value: 28, color: "#F59E0B" },
  { name: "Draft", value: 19, color: "#9CA3AF" },
  { name: "Expired", value: 12, color: "#EF4444" },
];

export default function ContractStatus() {
  return (
    <div className="contract-status-card">

      <div className="chart-header">
        <div>
          <h2>Contract Status</h2>
          <p>Current distribution</p>
        </div>
      </div>

      <div className="status-content">

        <div className="status-chart">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.map((item, index) => (
                  <Cell
                    key={index}
                    fill={item.color}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="status-list">

          {data.map((item, index) => (

            <div className="status-row" key={index}>

              <div className="status-left">

                <span
                  className="status-color"
                  style={{ background: item.color }}
                ></span>

                <span>{item.name}</span>

              </div>

              <strong>{item.value}</strong>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}