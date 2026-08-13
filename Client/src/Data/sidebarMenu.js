import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  ClipboardList,
  RefreshCw,
  ShieldCheck,
  BarChart3,
  ClipboardCheck,
  Bell,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export const mainMenu = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Contract Repository", path: "/repository", icon: FolderOpen },
  { name: "Contract Management", path: "/management", icon: FileText },
  { name: "Obligation Tracking", path: "/tracking", icon: ClipboardList },
  { name: "Renewal Management", path: "/renewals", icon: RefreshCw },
  { name: "Compliance Monitoring", path: "/compliance", icon: ShieldCheck },
  { name: "Reports & Export", path: "/reports", icon: BarChart3 },
  { name: "Audit Logs", path: "/audit", icon: ClipboardCheck },
];

export const accountMenu = [
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "User Management", path: "/users", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const logoutMenu = {
  name: "Logout",
  icon: LogOut,
};