import {
  FaUpload,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUserPlus,
  FaHistory,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaUpload />,
    color: "#3b82f6",
    bg: "#eff6ff",
    title: "Contract uploaded",
    description:
      "Goldman Sachs Advisory Services uploaded by Marcus Reid",
    time: "2 min ago",
  },
  {
    icon: <FaCheckCircle />,
    color: "#22c55e",
    bg: "#ecfdf5",
    title: "Contract approved",
    description:
      "SaaS Platform License – Salesforce approved by CEO",
    time: "18 min ago",
  },
  {
    icon: <FaClock />,
    color: "#f59e0b",
    bg: "#fff7ed",
    title: "Renewal reminder sent",
    description:
      "Office Lease – Floor 12 & 13 renewal reminder dispatched",
    time: "1 hr ago",
  },
  {
    icon: <FaExclamationTriangle />,
    color: "#ef4444",
    bg: "#fef2f2",
    title: "Compliance issue detected",
    description:
      "Data Processing Agreement flagged for GDPR gap",
    time: "3 hr ago",
  },
  {
    icon: <FaUserPlus />,
    color: "#8b5cf6",
    bg: "#f5f3ff",
    title: "New user added",
    description:
      "Priya Nair added as Contract Owner role",
    time: "Yesterday",
  },
  {
    icon: <FaHistory />,
    color: "#f97316",
    bg: "#fff7ed",
    title: "Version updated",
    description:
      "Senior VP Employment Agreement updated to v2.0",
    time: "Yesterday",
  },
];

function RecentActivity() {
  return (
    <div className="recent-activity">

      <div className="activity-header">
        <h2>Recent Activity</h2>

        <span className="view-all">
          View all
        </span>
      </div>

      {activities.map((item, index) => (
        <div className="activity-item" key={index}>

          <div
            className="activity-icon"
            style={{
              backgroundColor: item.bg,
              color: item.color,
            }}
          >
            {item.icon}
          </div>

          <div className="activity-content">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <span className="activity-time">
              {item.time}
            </span>
          </div>

        </div>
      ))}

    </div>
  );
}

export default RecentActivity;