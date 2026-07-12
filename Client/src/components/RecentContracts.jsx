import { FaEye, FaEdit, FaDownload } from "react-icons/fa";

const contracts = [
  {
    id: "CTR-2024-001",
    name: "Microsoft Azure Enterprise Agreement",
    category: "Vendor",
    dept: "IT",
    owner: "Sarah Chen",
    status: "Active",
    renewal: "2025-03-15",
    version: "v3.1",
  },
  {
    id: "CTR-2024-002",
    name: "Goldman Sachs Advisory Services",
    category: "Service",
    dept: "Finance",
    owner: "Marcus Reid",
    status: "Under Review",
    renewal: "2025-06-22",
    version: "v1.0",
  },
  {
    id: "CTR-2024-003",
    name: "Senior VP Employment Agreement",
    category: "Employment",
    dept: "HR",
    owner: "Priya Nair",
    status: "Active",
    renewal: "2026-01-10",
    version: "v2.0",
  },
  {
    id: "CTR-2024-004",
    name: "Office Lease - Floor 12 & 13",
    category: "Lease",
    dept: "Operations",
    owner: "Tom Weston",
    status: "Expired",
    renewal: "2024-12-31",
    version: "v1.2",
  },
  {
    id: "CTR-2024-005",
    name: "Supplier NDA - Techparts Ltd",
    category: "NDA",
    dept: "Procurement",
    owner: "Dana Kim",
    status: "Active",
    renewal: "2025-09-01",
    version: "v1.0",
  },
  {
    id: "CTR-2024-006",
    name: "SaaS Platform License - Salesforce",
    category: "Vendor",
    dept: "Sales",
    owner: "Alex Ruiz",
    status: "Active",
    renewal: "2025-07-15",
    version: "v4.0",
  },
  {
    id: "CTR-2024-007",
    name: "Strategic Partnership - Deloitte",
    category: "Partnership",
    dept: "Legal",
    owner: "Nia Foster",
    status: "Draft",
    renewal: "2026-03-30",
    version: "v0.3",
  },
  {
    id: "CTR-2024-008",
    name: "Data Processing Agreement - EU",
    category: "Compliance",
    dept: "Legal",
    owner: "James Park",
    status: "Active",
    renewal: "2025-05-20",
    version: "v2.1",
  },
];

function RecentContracts() {
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

              <tr key={item.id}>

                <td>{item.id}</td>

                <td title={item.name}>{item.name}</td>

                <td>{item.category}</td>

                <td>{item.dept}</td>

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

                <td>{item.renewal}</td>

                <td>{item.version}</td>

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