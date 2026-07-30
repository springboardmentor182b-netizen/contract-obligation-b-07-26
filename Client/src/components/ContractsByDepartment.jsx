import { useEffect, useState } from "react";
import { getContractsByDepartment } from "../api/dashboardApi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ContractsByDepartment() {

  const [data, setData] = useState([]);

  useEffect(() => {

    async function fetchDepartments() {

      try {
        const response = await getContractsByDepartment();

        setData(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDepartments();
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <div className="chart-title">
      <h3>Contracts by Department</h3>
      <span>Active contracts by business unit</span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid
           vertical={false}
           stroke="#F1F5F9"
          />
          <XAxis dataKey="department" tick={{fill:"#374151", fontSize:13}} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="compliance" fill="#F59E0B" radius={[6,6,0,0]} barSize={97} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ContractsByDepartment;