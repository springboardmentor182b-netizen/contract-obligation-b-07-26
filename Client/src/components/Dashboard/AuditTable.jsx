import React from "react";
import { audits } from "../../Data/dashboardData";

const AuditTable = () => {

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "badge completed";

      case "In Progress":
        return "badge progress";

      case "Terminated":
        return "badge failed";

      default:
        return "badge";
    }
  };

  return (
    <div className="table-card">

      <h2>Recent Audits</h2>

      <table className="audit-table">

        <thead>

          <tr>
            <th>Audit</th>
            <th>Department</th>
            <th>Auditor</th>
            <th>Status</th>
            <th>Score</th>
          </tr>

        </thead>

        <tbody>

          {audits.map((audit, index) => (

            <tr key={index}>

              <td>{audit.audit}</td>

              <td>{audit.department}</td>

              <td>{audit.auditor}</td>

              <td>

                <span className={getStatusClass(audit.status)}>
                  {audit.status}
                </span>

              </td>

              <td>
                <strong>{audit.score}</strong>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AuditTable;