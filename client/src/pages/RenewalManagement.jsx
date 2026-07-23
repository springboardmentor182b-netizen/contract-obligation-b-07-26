import React from "react";

const stats = [
  { title: "Upcoming Renewals", value: "15", color: "#2563eb" },
  { title: "In Progress", value: "8", color: "#f59e0b" },
  { title: "Expired", value: "3", color: "#ef4444" },
  { title: "Renewed", value: "24", color: "#10b981" },
];

const contracts = [
  {
    days: 180,
    company: "ABC Corporation",
    type: "Software License",
    start: "Jan 01, 2025",
    end: "Dec 31, 2025",
    progress: 65,
    id: "CTR-003",
    status: "Upcoming",
    urgent: "",
    value: "$96,000",
    expiry: "Dec 31, 2025",
  },
  {
    days: 90,
    company: "XYZ Technologies",
    type: "Service Contract",
    start: "Mar 01, 2025",
    end: "Feb 28, 2026",
    progress: 40,
    id: "CTR-004",
    status: "In Progress",
    urgent: "Urgent",
    value: "$3,200,000",
    expiry: "Sep 9, 2025",
  },
  {
  days: 67,
  company: "Manufacturing Supply Agreement",
  type: "Supply Contract",
  start: "Apr 15, 2025",
  end: "Sep 30, 2025",
  progress: 55,
  id: "CTR-005",
  status: "Upcoming",
  urgent: "Urgent",
  value: "$780,000",
  expiry: "Sep 30, 2025",
},
{
  days: 88,
  company: "Vendor Distribution Agreement",
  type: "Distribution Contract",
  start: "May 10, 2025",
  end: "Sep 30, 2025",
  progress: 48,
},
{
  days: 180,
  company: "Legal Services Engagement",
  type: "Legal Contract",
  start: "Jan 01, 2025",
  end: "Dec 31, 2025",
  progress: 72,
},
];

const renewals = [
  {
    id: "RN-1001",
    contract: "Software License",
    client: "ABC Corp",
    status: "Upcoming",
    renewal: "31 Dec 2025",
  },
  {
    id: "RN-1002",
    contract: "Service Agreement",
    client: "XYZ Ltd",
    status: "In Progress",
    renewal: "20 Sep 2025",
  },
  {
    id: "RN-1003",
    contract: "Maintenance",
    client: "Delta Pvt Ltd",
    status: "Expired",
    renewal: "15 Jul 2025",
  },
];

export default function RenewalManagement() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <aside
        style={{
          width: "240px",
          background: "#0f172a",
          color: "white",
          padding: "25px",
        }}
      >
        <h2>ContractIQ</h2>

        <div style={{ marginTop: "30px" }}>
          <p>Dashboard</p>
          <p>Contracts</p>
          <p style={{ color: "#60a5fa" }}>Renewal Management</p>
          <p>Users</p>
          <p>Reports</p>
          <p>Settings</p>
        </div>
      </aside>

      <main style={{ flex: 1, padding: "30px" }}>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  }}
>
  <div>
    <h1 style={{ margin: 0 }}>Renewal Management</h1>
    <p style={{ color: "#666", marginTop: "5px" }}>
      Track contract expirations and manage renewal workflows
    </p>
  </div>

  <button
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    + Schedule Renewal
  </button>
</div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            marginBottom: "25px",
          }}
        >
          <input
            placeholder="Search contracts..."
            style={{
              width: "320px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />

          <select
            style={{
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            <option>All Status</option>
            <option>Upcoming</option>
            <option>Expired</option>
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {stats.map((item) => (
            <div
              key={item.title}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                borderLeft: `6px solid ${item.color}`,
              }}
            >
              <h2>{item.value}</h2>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {contracts.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  background: "#e0f2fe",
                  color: "#0369a1",
                  padding: "12px",
                  borderRadius: "8px",
                  minWidth: "90px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {item.days}
                <br />
                DAYS
              </div>

              <div style={{ flex: 1, marginLeft: "20px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
  <span style={{ color: "#888", fontSize: "12px" }}>{item.id}</span>

  <span style={{ color: "#2563eb", fontSize: "12px" }}>
    {item.status}
  </span>

  {item.urgent && (
    <span style={{ color: "#f59e0b", fontSize: "12px" }}>
      ⚠ Urgent
    </span>
  )}
</div>

<h3 style={{ margin: "6px 0" }}>{item.company}</h3>

                <p style={{ margin: "8px 0" }}>{item.type}</p>

                <p style={{ color: "#666", margin: "4px 0" }}>
                  Start : {item.start}
                </p>

                <p style={{ color: "#666", margin: "4px 0" }}>
                  End : {item.end}
                </p>
                <p
  style={{
    fontSize: "12px",
    color: "#888",
    marginTop: "10px",
    marginBottom: "5px",
  }}
>
  Time Remaining
</p>

                <div
                  style={{
                    background: "#e5e7eb",
                    height: "8px",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      width: `${item.progress}%`,
                      background: "#2563eb",
                      height: "8px",
                      borderRadius: "5px",
                    }}
                  ></div>
                </div>
              </div>
              <div
              style={{
    textAlign: "right",
    minWidth: "150px",
  }}
>
  <p style={{ margin: "0", fontWeight: "bold" }}>
    {item.value}
  </p>

  <p style={{ margin: "6px 0", color: "#666" }}>
    {item.expiry}
  </p>
  </div>
              <button
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginLeft: "20px",
                }}
              >
                Initiate Renewal
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#fff",
            marginTop: "30px",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2>Renewal List</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "15px",
            }}
          >
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Contract</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Client</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Renewal Date</th>
              </tr>
            </thead>

            <tbody>
              {renewals.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "12px" }}>{item.id}</td>
                  <td style={{ padding: "12px" }}>{item.contract}</td>
                  <td style={{ padding: "12px" }}>{item.client}</td>
                  <td style={{ padding: "12px" }}>{item.status}</td>
                  <td style={{ padding: "12px" }}>{item.renewal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      </main>
    </div>
  );
}