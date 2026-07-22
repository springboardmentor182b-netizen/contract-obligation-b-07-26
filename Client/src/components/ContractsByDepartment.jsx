import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useEffect,useState } from "react";
import { getContractsByDepartment } from "../api/dashboardApi";

function ContractsByDepartment() {
  const[data, setData] = useState([]);

  useEffect(() => {
    async function fetchDepartments(){
      try{
        const response = await getContractsByDepartment();
        setData(response);
      } catch (error){
        console.error("Error fetching contracts by department:",error);
      }
    }
    fetchDepartments();
  },[]);
  return (
    <div 
      className="compliance-card"
      style={{paddingTop:"12px", paddingBottom:"12px"}}
    >

      <div className="chart-header">
        <div>
          <h2>Contracts by Department</h2>
          <p>Active contracts by business unit</p>
        </div>

      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={220}>
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

export default ContractsByDepartment;