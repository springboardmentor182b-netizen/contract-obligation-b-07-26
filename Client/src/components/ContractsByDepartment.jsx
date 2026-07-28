const departments = [
  { name: "Legal", total: 52, compliance: 94 },
  { name: "Procurement", total: 68, compliance: 88 },
  { name: "Human Resources", total: 34, compliance: 81 },
  { name: "Finance", total: 60, compliance: 90 },
];

function levelClass(pct) {
  if (pct >= 90) return "excellent";
  if (pct >= 75) return "good";
  return "warning";
}

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