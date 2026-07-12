import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Compliant",
    value: 142,
    color: "#22C55E",
  },
  {
    name: "Pending",
    value: 28,
    color: "#F59E0B",
  },
  {
    name: "Delayed",
    value: 19,
    color: "#F97316",
  },
  {
    name: "Non-Compliant",
    value: 11,
    color: "#DC2626",
  },
  {
    name: "High Risk",
    value: 6,
    color: "#7C3AED",
  },
];

function ComplianceLevels() {
  return (
    <div className="compliance-card">

      <div className="chart-header">
        <div>
          <h2>Compliance Levels</h2>
          <p>Organisation-wide</p>
        </div>
      </div>

      <div className="compliance-content">

        <div className="pie-chart">

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={95}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>
         </div>
        </div>

        <div className="compliance-legend">

          {data.map((item, index) => (

            <div
              className="legend-row"
              key={index}
            >

              <div className="legend-left">

                <span
                  className="legend-dot"
                  style={{
                    backgroundColor: item.color,
                  }}
                ></span>

                <span className="legend-name">
                  {item.name}
                </span>

              </div>

              <span className="legend-value">
                {item.value}
              </span>

            </div>

          ))}

        </div>

      </div>

  );
}

export default ComplianceLevels;