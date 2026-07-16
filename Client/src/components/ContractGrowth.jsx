import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FaCalendarAlt } from "react-icons/fa";
import {useEffect,useState}from "react";
import { getContractGrowth } from "../api/dashboardApi";


export default function ContractGrowth() {
  const[data, setData]=useState([]);

  useEffect(()=>{
    async function fetchGrowth(){
      try{
        const response=await getContractGrowth();
        setData(response);
      }catch(error){
        console.error("Error fetching contract growth:",error);
      }
    }
    fetchGrowth();
  },[]);

  return (
    <div className="contract-growth-card">

      <div className="contract-growth-header">
        <div>
          <h2>Contract Growth</h2>
          <p>Total vs. active — 2024</p>
        </div>

        <div className="year-filter">
          <FaCalendarAlt />
          <span>2024</span>
        </div>
      </div>

      <div className="growth-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid
              stroke="#F1F5F9"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 220]}
              ticks={[0, 55, 110, 165, 220]}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                background: "#fff",
              }}
              labelStyle={{
                fontWeight: 700,
                fontSize: 18,
                color: "#111827",
              }}
              formatter={(value, name) => [
                value,
                name === "total" ? "🟠 Total" : "🟢 Active",
              ]}
            />

            {/* Total Line */}
            <Line
              type="natural"
              dataKey="total"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeOpacity={0.35}
              dot={false}
              activeDot={{
                r: 7,
                fill: "#F59E0B",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />

            {/* Active Line */}
            <Line
              type="natural"
              dataKey="active"
              stroke="#16A34A"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 7,
                fill: "#16A34A",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="growth-legend">

        <div className="legend-item">
          <span className="legend-dot total"></span>
          <span>Total</span>
        </div>

        <div className="legend-item">
          <span className="legend-dot active"></span>
          <span>Active</span>
        </div>

      </div>

    </div>
  );
}