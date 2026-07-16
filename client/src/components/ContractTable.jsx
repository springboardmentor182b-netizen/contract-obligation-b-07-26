import React from "react";
import { FiEdit2, FiMoreHorizontal } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import SearchBar from "./SearchBar";
import "./ContractTable.css";

  const ContractTable = ({
  contracts,
  statusFilter,
  categoryFilter,
  searchTerm,
  setSearchTerm,
}) => {

  const filteredData = contracts.filter((contract) => {

    const matchesStatus =
      statusFilter === "All" || contract.status === statusFilter;

    const matchesCategory =
    categoryFilter === "All" ||
    contract.category === categoryFilter;

    const matchesSearch =
      contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="table-container">

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeFilter={statusFilter}
        setActiveFilter={() => {}}
      />

      <div className="table-responsive">
        <table className="contract-table">

          <thead>
            <tr>
              <th>CONTRACT</th>
              <th>PARTY</th>
              <th>DEPT</th>
              <th>STATUS</th>
              <th>VALUE</th>
              <th>EXPIRY</th>
              <th>VERSION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className="contract-name">{row.name}</div>
                  <div className="contract-id">{row.id}</div>
                </td>

                <td className="text-secondary">{row.party}</td>

                <td className="text-secondary">{row.dept}</td>

                <td>
                  <StatusBadge status={row.status} />
                </td>

                <td className="font-semibold">{row.value}</td>

                <td className="text-secondary">{row.expiry}</td>

                <td className="text-muted">{row.version}</td>

                <td>
                  <div className="action-btns">
                    <button className="action-icon-btn">
                      <FiEdit2 />
                    </button>

                    <button className="action-icon-btn">
                      <FiMoreHorizontal />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ContractTable;