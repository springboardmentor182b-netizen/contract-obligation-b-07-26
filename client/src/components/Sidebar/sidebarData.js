import {
  FaHome,
  FaFileContract,
  FaFolderOpen,
  FaClipboardList,
  FaSyncAlt,
  FaCheckCircle,
  FaChartBar,
  FaBell,
  FaUsers,
  FaHistory,
  FaCog,
} from "react-icons/fa";

const sidebarData = [
  {
    title: "Dashboard",
    icon: FaHome,
  },
  {
    title: "Contracts",
    icon: FaFileContract,
  },
  {
    title: "Repository",
    icon: FaFolderOpen,
  },
  {
    title: "Obligations",
    icon: FaClipboardList,
    badge: 7,
  },
  {
    title: "Renewals",
    icon: FaSyncAlt,
  },
  {
    title: "Compliance",
    icon: FaCheckCircle,
  },
  {
    title: "Reports",
    icon: FaChartBar,
  },
  {
    title: "Notifications",
    icon: FaBell,
    badge: 14,
  },
  {
    title: "Users",
    icon: FaUsers,
  },
  {
    title: "Audit Logs",
    icon: FaHistory,
  },
  {
    title: "Settings",
    icon: FaCog,
  },
];

export default sidebarData;