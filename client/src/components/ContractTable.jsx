import React from "react";
import { FiEdit2, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import SearchBar from "./SearchBar";
import "./ContractTable.css";

const ContractTable = ({
  contracts,
  searchTerm,
  setSearchTerm,
  onEdit,
  onDelete,
}) => {
  const filteredData = contracts.filter((contract) => {
    const matchesSearch =
      contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contract_id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="table-container">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="table-responsive">
        <table className="contract-table">
          <thead>
            <tr>
              <th>CONTRACT</th>
              <th>PARTY</th>
              <th>DEPARTMENT</th>
              <th>STATUS</th>
              <th>VALUE</th>
              <th>EXPIRY</th>
              <th>VERSION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="contract-name">{row.name}</div>
                    <div className="contract-id">{row.contract_id}</div>
                  </td>

                  <td>{row.party}</td>

                  <td>{row.department}</td>

                  <td>
                    <StatusBadge status={row.status} />
                  </td>

                  <td>
                    {row.value
                      ? `$${Number(row.value).toLocaleString()}`
                      : "-"}
                  </td>

                  <td>
                    {row.expiry
                      ? new Date(row.expiry).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>{row.version}</td>

                  <td>
                    <div className="action-btns">
                      <button
                        className="action-icon-btn"
                        onClick={() => onEdit(row)}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="action-icon-btn delete-btn"
                        onClick={() => onDelete(row.id)}
                      >
                        <FiTrash2 />
                      </button>

                      <button className="action-icon-btn">
                        <FiMoreHorizontal />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No contracts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractTable;