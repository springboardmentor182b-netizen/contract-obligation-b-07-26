import {
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaUserSlash,
} from "react-icons/fa";

const dashboardCardData = [
  {
    title: "TOTAL USERS",
    value: "247",
    subtitle: "+12 this month",
    icon: FaUsers,
    color: "blue",
  },
  {
    title: "ACTIVE USERS",
    value: "198",
    subtitle: "80.2% of total",
    icon: FaUserCheck,
    color: "green",
  },
  {
    title: "NEW REGISTRATIONS",
    value: "31",
    subtitle: "+8 vs last month",
    icon: FaUserPlus,
    color: "purple",
  },
  {
    title: "BLOCKED USERS",
    value: "18",
    subtitle: "7.3% of total",
    icon: FaUserSlash,
    color: "red",
  },
];

export default dashboardCardData;