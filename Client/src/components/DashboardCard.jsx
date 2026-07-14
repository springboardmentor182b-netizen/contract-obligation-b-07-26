import {
  FaFileContract,
  FaCheckCircle,
  FaClipboardCheck,
  FaCalendarAlt,
  FaTasks,
  FaShieldAlt,
} from "react-icons/fa";

function DashboardCard({ title, value, percent }) {
  const cardMap = {
    "Total Contracts": {
      icon: <FaFileContract />,
      bg: "#EEF2FF",
      color: "#4F46E5",
      percentColor: "#16A34A",
    },

    "Active Contracts": {
      icon: <FaCheckCircle />,
      bg: "#DCFCE7",
      color: "#16A34A",
      percentColor: "#16A34A",
    },

    "Under Review": {
      icon: <FaClipboardCheck />,
      bg: "#FEF3C7",
      color: "#D97706",
      percentColor: "#16A34A",
    },

    "Upcoming Renewals": {
      icon: <FaCalendarAlt />,
      bg: "#FEE2E2",
      color: "#DC2626",
      percentColor: "#DC2626",
    },

    "Pending Obligations": {
      icon: <FaTasks />,
      bg: "#E0F2FE",
      color: "#0284C7",
      percentColor: "#16A34A",
    },

    "Compliance Rate": {
      icon: <FaShieldAlt />,
      bg: "#F3E8FF",
      color: "#9333EA",
      percentColor: "#16A34A",
    },
  };

  const item = cardMap[title];

  return (
    <div className="dashboard-card">

      <span
        className="card-percent"
        style={{ color: item.percentColor }}
      >
        {percent}
      </span>

      <div
        className="card-icon"
        style={{
          background: item.bg,
          color: item.color,
        }}
      >
        {item.icon}
      </div>

      <h2>{value}</h2>

      <p>{title}</p>

    </div>
  );
}

export default DashboardCard;