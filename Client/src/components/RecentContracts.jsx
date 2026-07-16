import { FaEye, FaEdit, FaDownload } from "react-icons/fa";
import {useState, useEffect} from "react";
import {getRecentContracts} from "../api/dashboardApi";

function RecentContracts() {
  const [contracts, setContracts] = useState([]);

useEffect(() => {
  async function fetchContracts() {
    try {
      const response = await getRecentContracts();
      setContracts(response);
    } catch (error) {
      console.error("Error fetching recent contracts:", error);
    }
  }

  fetchContracts();
}, []);
  return (
    <div className="recent-contracts">

      <div className="table-header">
        <div>
          <h2>Recent Contracts</h2>
          <p className="table-subtitle">
            Latest across all categories
          </p>
        </div>

        <button className="view-all-btn">
          View All
        </button>
      </div>

      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Contract ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Dept</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Renewal</th>
              <th>Ver</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {contracts.map((item) => (

              <tr key={item.contract_id}>

                <td>{item.contract_id}</td>

                <td title={item.name}>{item.name}</td>

                <td>{item.category}</td>

                <td>{item.department}</td>

                <td>{item.owner}</td>

                <td>
                  <span
                    className={`status ${item.status
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    <span className="status-dot"></span>
                    {item.status}
                  </span>
                </td>

                <td>-</td>

                <td>{item.renewal_version}</td>

                <td>
                  <div className="action-icons">
                    <FaEye />
                    <FaEdit />
                    <FaDownload />
                  </div>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default RecentContracts;