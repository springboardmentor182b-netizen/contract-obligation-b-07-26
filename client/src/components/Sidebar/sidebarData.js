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
    to: "/",
  },
  {
    title: "Contracts",
    icon: FaFileContract,
    to: "/contracts",
  },
  {
    title: "Repository",
    icon: FaFolderOpen,
    to: "/repository",
  },
  {
    title: "Obligations",
    icon: FaClipboardList,
    badge: 7,
    to: "/obligations",
  },
  {
    title: "Renewals",
    icon: FaSyncAlt,
    to: "/renewals",
  },
  {
    title: "Compliance",
    icon: FaCheckCircle,
    to: "/compliance",
  },
  {
    title: "Reports",
    icon: FaChartBar,
    to: "/reports",
  },
  {
    title: "Notifications",
    icon: FaBell,
    badge: 14,
    to: "/notifications",
  },
  {
    title: "Users",
    icon: FaUsers,
    to: "/users",
  },
  {
    title: "Audit Logs",
    icon: FaHistory,
    to: "/audit-logs",
  },
  {
    title: "Settings",
    icon: FaCog,
    to: "/settings",
  },
];

export default sidebarData;