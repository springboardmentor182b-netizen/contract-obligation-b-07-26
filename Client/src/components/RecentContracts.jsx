import { FaEye, FaEdit, FaDownload } from "react-icons/fa";

const contracts = [
  {
    id: "CTR-2024-001",
    name: "Microsoft Azure Enterprise",
    category: "Vendor",
    dept: "IT",
    owner: "Sarah Chen",
    status: "Active",
    renewal: "2025-03-15",
    version: "v3.1",
  },
  {
    id: "CTR-2024-002",
    name: "Goldman Sachs Services",
    category: "Service",
    dept: "Finance",
    owner: "Marcus Reid",
    status: "Under Review",
    renewal: "2025-06-22",
    version: "v1.0",
  },
  {
    id: "CTR-2024-003",
    name: "Senior VP Employment",
    category: "Employment",
    dept: "HR",
    owner: "Priya Nair",
    status: "Active",
    renewal: "2026-01-10",
    version: "v2.0",
  },
  {
    id: "CTR-2024-004",
    name: "Office Lease - Floor 5",
    category: "Lease",
    dept: "Operations",
    owner: "Tom Weston",
    status: "Expired",
    renewal: "2024-12-31",
    version: "v1.2",
  },
  {
    id: "CTR-2024-005",
    name: "Supplier NDA",
    category: "NDA",
    dept: "Procurement",
    owner: "Dana Kim",
    status: "Active",
    renewal: "2025-09-01",
    version: "v1.0",
  },
  {
    id: "CTR-2024-006",
    name: "SaaS Platform License",
    category: "Vendor",
    dept: "Sales",
    owner: "Alex Ruiz",
    status: "Active",
    renewal: "2025-07-15",
    version: "v4.0",
  },
  {
    id: "CTR-2024-007",
    name: "Strategic Partnership",
    category: "Partnership",
    dept: "Legal",
    owner: "Nia Foster",
    status: "Draft",
    renewal: "2026-03-30",
    version: "v0.3",
  },
  {
    id: "CTR-2024-008",
    name: "Data Processing Agreement",
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
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {contracts.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.name}</td>

                <td>{item.category}</td>

                <td>{item.dept}</td>

                <td>{item.owner}</td>

                <td>
                  <span
                    className={`status ${item.status
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
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

      <div className="table-footer">

        <span>Showing 1–8 of 214 Contracts</span>

        <div className="pagination">
          <button>{"<"}</button>
          <button className="active-page">1</button>
          <button>2</button>
          <button>3</button>
          <button>{">"}</button>
        </div>

      </div>

    </div>
  );
}

export default RecentContracts;