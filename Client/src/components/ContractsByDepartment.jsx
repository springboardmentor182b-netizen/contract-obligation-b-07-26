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
  console.log("ContractsByDepartment rendered");

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("useEffect started");

    async function fetchDepartments() {
      console.log("Fetching department data...");

      try {
        const response = await getContractsByDepartment();

        console.log("API Response:", response);

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
      <h2>Contracts by Department</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="contracts" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ContractsByDepartment;