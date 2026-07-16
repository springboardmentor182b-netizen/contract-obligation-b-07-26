import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {useState, useEffect}from "react";
import { getComplianceLevels } from "../api/dashboardApi";

function ComplianceLevels() {
  const [data, setData] = useState([]);

useEffect(() => {
  async function fetchComplianceLevels() {
    try {
      const response = await getComplianceLevels();

      const colors = {
        "Compliant": "#22C55E",
        "Pending": "#F59E0B",
        "Delayed": "#F97316",
        "Non-Compliant": "#DC2626",
        "High Risk": "#7C3AED",
      };

      const formattedData = response.map((item) => ({
        ...item,
        color: colors[item.name] || "#8884d8",
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching compliance levels:", error);
    }
  }

  fetchComplianceLevels();
}, []);
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