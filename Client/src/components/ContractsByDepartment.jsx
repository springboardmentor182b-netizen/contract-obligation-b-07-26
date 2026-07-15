import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { department: "Legal", contracts: 72 },
  { department: "Finance", contracts: 58 },
  { department: "HR", contracts: 43 },
  { department: "IT", contracts: 41 },
];

function ContractsByDepartment() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2>Contracts by Department</h2>

      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="department" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="contracts" fill="#4F46E5" />
      </BarChart>
    </div>
  );
}

export default ContractsByDepartment;