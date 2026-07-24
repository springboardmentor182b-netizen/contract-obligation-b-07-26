import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {useEffect, useState} from "react";
import {getContractStatus} from "../api/dashboardApi";

export default function ContractStatus() {
  const[data, setData] = useState([]);

  useEffect(() => {
    async function fetchStatus(){
      try{
        const response = await getContractStatus();

        const colors = {
          Active:"#22C55E",
          Pending:"#3B82F6",
          "Under Review":"#F59E0B",
          Draft:"#9CA3AF",
          Expired:"#EF4444",
        };
        const formatted = response.map((item) => ({
          name:item.status,
          value:item.count,
          color:colors[item.status] || "#9CA3AF",
        }));
        setData(formatted);
      }catch(error){
        console.error("Error fetching contract status:",error);
      }
    }
    fetchStatus();
  },[]);
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
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="40%"
                cy="38%"
                innerRadius={45}
                outerRadius={70}
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