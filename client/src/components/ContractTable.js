import React from "react";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import "./ContractTable.css";

const ContractTable = ({ contracts, onView, onEdit, onDelete }) => {
  const displayData = contracts;

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="contract-table">
          <thead>
            <tr>
              <th>CONTRACT</th><th>PARTY</th><th>DEPARTMENT</th><th>STATUS</th>
              <th>VALUE</th><th>EXPIRY</th><th>VERSION</th><th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {displayData.length > 0 ? displayData.map((row) => (
              <tr key={row.id}>
                <td><div className="contract-name">{row.name}</div><div className="contract-id">{row.contract_id}</div></td>
                <td>{row.party}</td><td>{row.department}</td><td><StatusBadge status={row.status} /></td>
                <td>{row.value ? `$${Number(row.value).toLocaleString()}` : "-"}</td>
                <td>{row.expiry ? new Date(row.expiry).toLocaleDateString() : "-"}</td><td>{row.version}</td>
                <td><div className="action-btns">
                  <button className="action-icon-btn" type="button" title="View contract" aria-label={`View ${row.name}`} onClick={() => onView(row)}><FiEye /></button>
                  <button className="action-icon-btn" type="button" title="Edit contract" aria-label={`Edit ${row.name}`} onClick={() => onEdit(row)}><FiEdit2 /></button>
                  <button className="action-icon-btn delete-btn" type="button" title="Delete contract" aria-label={`Delete ${row.name}`} onClick={() => onDelete(row.id)}><FiTrash2 /></button>
                </div></td>
              </tr>
            )) : <tr><td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>No contracts found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractTable;
