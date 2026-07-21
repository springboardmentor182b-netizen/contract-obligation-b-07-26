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
  return (
    <div className="department-card">
      <h2>Contracts by Department</h2>
      {departments.map((d, i) => (
        <div className="level" key={i}>
          <div className="level-text">
            <span>{d.name} ({d.total} contracts)</span>
            <span>{d.compliance}%</span>
          </div>
          <div className="progress">
            <div className={levelClass(d.compliance)} style={{ width: `${d.compliance}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContractsByDepartment;const departments = [
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
  return (
    <div className="department-card">
      <h2>Contracts by Department</h2>
      {departments.map((d, i) => (
        <div className="level" key={i}>
          <div className="level-text">
            <span>{d.name} ({d.total} contracts)</span>
            <span>{d.compliance}%</span>
          </div>
          <div className="progress">
            <div className={levelClass(d.compliance)} style={{ width: `${d.compliance}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContractsByDepartment;