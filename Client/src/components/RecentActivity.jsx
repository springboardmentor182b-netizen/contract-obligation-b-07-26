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
    title: "Contract uploaded",
    description:
      "Goldman Sachs Advisory Services uploaded by Marcus Reid",
    time: "2 min ago",
  },
  {
    icon: <FaCheckCircle />,
    title: "Contract approved",
    description:
      "SaaS Platform License – Salesforce approved by CEO",
    time: "18 min ago",
  },
  {
    icon: <FaClock />,
    title: "Renewal reminder sent",
    description:
      "Office Lease – Floor 12 & 13 renewal reminder dispatched",
    time: "1 hr ago",
  },
  {
    icon: <FaExclamationTriangle />,
    title: "Compliance issue detected",
    description:
      "Data Processing Agreement flagged for GDPR gap",
    time: "3 hr ago",
  },
  {
    icon: <FaUserPlus />,
    title: "New user added",
    description:
      "Priya Nair added as Contract Owner role",
    time: "Yesterday",
  },
  {
    icon: <FaHistory />,
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
        <div>
          <h2>Recent Activity</h2>
          
        </div>
      </div>

      {activities.map((item, index) => (
        <div className="activity-item" key={index}>

          <div className="activity-icon">
            {item.icon}
          </div>

          <div className="activity-content">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>

          <span className="activity-time">
            {item.time}
          </span>

        </div>
      ))}

    </div>
  );
}

export default RecentActivity;