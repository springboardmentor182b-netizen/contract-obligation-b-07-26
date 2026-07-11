import "./ContractTable.css";
import contracts from "../data/contracts";
import { FiEdit2, FiMoreHorizontal } from "react-icons/fi";

function ContractTable({ searchTerm }) {

  const filteredContracts = contracts.filter((contract) =>
    contract.contract.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <table className="contract-table">

        <thead>
          <tr>
            <th>Contract</th>
            <th>Party</th>
            <th>Department</th>
            <th>Status</th>
            <th>Value</th>
            <th>Expiry</th>
            <th>Version</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredContracts.map((contract) => (
            <tr key={contract.id}>
              <td>
                <strong>{contract.contract}</strong>
                <br />
                <small>{contract.id}</small>
              </td>

              <td>{contract.party}</td>

              <td>{contract.department}</td>

              <td>
                <span
                  className={`status ${contract.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {contract.status}
                </span>
              </td>

              <td>{contract.value}</td>

              <td>{contract.expiry}</td>

              <td>{contract.version}</td>

              <td className="actions">
                <button className="action-btn">
                  <FiEdit2 />
                </button>

                <button className="action-btn">
                  <FiMoreHorizontal />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default ContractTable;